"""RSI rollout using the same sensor and motor primitives as the model workbench.

The model chooses every subgoal and motor channel. Ground truth is used only for
physics, collision checks and outcome auditing when RGB-D is selected.
"""
from __future__ import annotations

import copy
import hashlib
import json
import time
from pathlib import Path

import numpy as np

from .stage_prompts import instructions_for

PROTOCOL = "configured-rsi-v1"


def configured_episode(task, seed, policy, settings, protocol, *, max_steps=20, label_mode="none",
                       intervention=False, rng=None, on_frame=None, on_step=None,
                       randomize_scene=False, world_factory=None, on_decision=None,
                       state_transform=None, replay_directory=None, on_action=None,
                       staged_prompts=None, trace=None, on_observation=None):
    from embodied_jev.physics import RobotWorld
    from embodied_jev.planning import candidates, baseline_phase
    from embodied_jev.incremental import incremental_candidates, planning_state, baseline_choice, PLANNING_INSTRUCTIONS
    from embodied_jev.hierarchical import (SUBGOALS, SUBGOAL_INSTRUCTIONS, hierarchy_state,
        motor_questions, assemble_motion, baseline_subgoal, baseline_channels)
    from embodied_jev.perception import VisualObserver, ImageObserver, PerceptionUnavailable
    from .grasp import GraspWorld
    from .scenes import DISTRIBUTION, scene_config
    from .sim import PHASES, INSTRUCTIONS, criteria_for, execute
    from .stage_prompts import PickPlaceStages, STAGES, PROTOCOL as STAGED_PROTOCOL

    if label_mode not in {"none", "teacher"}:
        raise ValueError("Configured control supports successful replay or explicit teacher labels")
    factory = world_factory or (GraspWorld if protocol["strict_grasp"] else RobotWorld)
    world = factory(task, seed, scene_config(task, seed) if randomize_scene else None)
    mode = settings["control_mode"]
    staged = protocol["staged_prompts"] if staged_prompts is None else staged_prompts
    controller = PickPlaceStages() if mode == "skills" and staged and task == "transfer" else None
    observer = None
    if settings["camera_views"]:
        observer_type = VisualObserver if settings["observation_mode"] == "rgbd" else ImageObserver
        observer = observer_type(world, camera_views=settings["camera_views"])
    started = time.perf_counter()
    group = f"{task}:{seed}:{int(intervention)}"
    identity = hashlib.sha256(f"{group}:{started}".encode()).hexdigest()[:20]
    camera_history, records, latencies = [], [], []
    archived = set()
    poses = None
    if replay_directory is not None:
        from .trajectory_replay import PoseRecorder
        poses, render_frame = PoseRecorder(), on_frame
        def capture_frame(current):
            poses.capture(current)
            if render_frame:
                render_frame(current)
        capture_frame.capture_only = render_frame is None
        on_frame = capture_frame
    failure, drops = None, 0

    def observe(step):
        capture = None
        try:
            measured = observer.observe() if observer else world.observe()
        finally:
            if observer:
                capture = observer.camera_snapshot()
                if capture:
                    metadata = copy.deepcopy(capture["metadata"])
                    if metadata["capture_id"] not in archived:
                        archived.add(metadata["capture_id"])
                        files = {}
                        if replay_directory is not None:
                            directory = Path(replay_directory) / f"{identity}-cameras"
                            directory.mkdir(parents=True, exist_ok=True)
                            for view, frame in capture["views"].items():
                                files[view] = {}
                                for channel in ("rgb", "depth"):
                                    name = f"{metadata['capture_id']}-{view}-{channel}.png"
                                    (directory / name).write_bytes(frame[channel])
                                    files[view][channel] = f"{directory.name}/{name}"
                        camera_history.append({"step": step, "metadata": metadata, "files": files})
                    if on_observation:
                        on_observation(None, capture)
        if settings["observation_mode"] == "privileged":
            measured = world.observe()
        if on_observation:
            on_observation(measured, capture)
        if trace:
            trace("perception", {"task": task, "seed": seed, "step": step,
                  "execution": settings, "observation_mode": settings["observation_mode"],
                  "observation": measured, "scene_hash": world.scene_hash})
        return measured

    def state(observed, control=None):
        keep = ("task", "units", "source", "tcp", "object", "destination", "gripper", "held",
                "finger_contacts", "grasp_secured", "support_contact", "relative_geometry", "visual_barrier", "perception")
        return {"task_id": task, "observation": {k: copy.deepcopy(observed[k]) for k in keep if k in observed},
                "execution": copy.deepcopy(settings),
                "environment": {"required_stable_grasp_s": .16} if hasattr(world, "diagnostics") else {},
                **({"control": control} if control else {})}

    def choose(step, question_state, criteria, default=None, channel="action"):
        keys = list(criteria)
        np.random.default_rng(seed * 101 + step * 7 + len(channel)).shuffle(keys)
        criteria = {key: criteria[key] for key in keys}
        context = {"task": task, "seed": seed, "step": step, "channel": channel, "execution": settings}
        if trace:
            trace("decision_request", {**context, "state": question_state, "criteria": criteria,
                  "instructions": instructions_for(question_state, INSTRUCTIONS)})
        if on_decision:
            on_decision(world, question_state, criteria, step)
        begin = time.perf_counter()
        probabilities = np.asarray(policy.predict(question_state, criteria), dtype=float) if policy else None
        latency = (time.perf_counter() - begin) * 1000
        latencies.append(latency)
        if probabilities is not None:
            if (probabilities.shape != (len(keys),) or not np.isfinite(probabilities).all()
                    or (probabilities < 0).any() or abs(probabilities.sum() - 1) > .001):
                raise ValueError("Invalid policy probabilities")
            probabilities /= probabilities.sum()
            selected = keys[int(rng.choice(len(keys), p=probabilities)) if rng is not None else int(np.argmax(probabilities))]
        else:
            if default not in criteria:
                raise ValueError("No valid rule action")
            selected = default
        row = {"state": question_state, "criteria": criteria, "choice": selected, "channel": channel,
               "instructions": instructions_for(question_state, INSTRUCTIONS),
               "probabilities": probabilities.tolist() if probabilities is not None else None,
               "latency_ms": latency}
        if getattr(policy, "last_model_probabilities", None) is not None:
            row.update(model_probabilities=policy.last_model_probabilities.tolist(), exploration=copy.deepcopy(policy.last_details))
        if trace:
            trace("decision_response", {**context, **{k: v for k, v in row.items() if k != "state"},
                  "selection_mode": "sample" if rng is not None else "argmax" if policy else "teacher"})
        return row

    def motor_state(observed, instructions, stage, **details):
        return {**state(observed, {"protocol": PROTOCOL, "stage": stage, "instructions": instructions}), **details}

    try:
        if hasattr(policy, "reset"):
            policy.reset()
        if on_frame:
            on_frame(world)
        for step in range(max_steps):
            if poses:
                poses.step = step
            if world.success():
                break
            if intervention and step == 1:
                world.perturb("object_shift", [.015, -.01])
                if observer:
                    observer.invalidate()
            observed = observe(step)
            before = world.observe()  # Outcome audit only, never supplied to an RGB-D decision.
            decisions = []
            if mode == "skills":
                current = state(observed, controller.update(observed) if controller else None)
                current["recent_outcomes"] = [{"choice": r["choice"], "executed": r["executed"],
                    "rejection": r["rejection"], "held": r["observed_after"]["held"]} for r in records[-3:]]
                if state_transform and settings["observation_mode"] == "privileged":
                    current = state_transform(world, current)
                phases = STAGES[controller.stage][1] if controller else PHASES
                options = {phase: candidates(world, phase, preview=False, observation=observed)[0] for phase in phases}
                options = {key: option for key, option in options.items()
                           if np.all(np.asarray(option.target) >= [.20, -.32, .02]) and np.all(np.asarray(option.target) <= [.65, .34, .42])}
                if not options:
                    failure = "no_valid_action"
                    break
                choice = choose(step, current, criteria_for(options), baseline_phase(None, observed) if policy is None else None)
                selected = options[choice["choice"]]
            elif mode == "incremental":
                history = [{**r, "before": r["observed_before"], "after": r["observed_after"]} for r in records]
                evidence = planning_state(observed, history)
                current = motor_state(observed, PLANNING_INSTRUCTIONS, "incremental", planning=evidence)
                options = incremental_candidates(observed)
                legal = {option.id: option for option in options if option.admitted}
                menu = {key: json.dumps({"delta_xyz": (np.asarray(option.target)-observed["tcp"]).round(5).tolist(),
                        "gripper": option.gripper, "seconds": option.seconds}) for key, option in legal.items()}
                choice = choose(step, current, menu, baseline_choice(observed, options) if policy is None else None)
                selected = legal[choice["choice"]]
            else:
                history = [{**r, "after": r["observed_after"]} for r in records]
                hierarchy = hierarchy_state(observed, history)
                current = motor_state(observed, SUBGOAL_INSTRUCTIONS, "subgoal", hierarchy=hierarchy)
                intent = choose(step, current, SUBGOALS, baseline_subgoal(hierarchy) if policy is None else None, "subgoal")
                decisions.append(intent)
                motors, questions = motor_questions(hierarchy, intent["choice"])
                defaults = baseline_channels(motors) if policy is None else {}
                channels = {}
                for channel, question in questions.items():
                    channel_state = motor_state(observed, question["instructions"], f"{intent['choice']}:{channel}", hierarchy=motors)
                    channels[channel] = choose(step, channel_state, question["criteria"], defaults.get(channel), channel)
                    decisions.append(channels[channel])
                selected, assembled = assemble_motion(observed, motors, channels)
                choice = {"state": current, "choice": selected.id, "criteria": {}, "probabilities": None,
                          "latency_ms": sum(d["latency_ms"] for d in decisions), "decisions": decisions,
                          "intent": intent}
            action = assembled if mode == "hierarchical" else selected.serialise()
            if on_action:
                on_action({**choice, "step": step, "action": action})
            executed, rejection = execute(world, selected, on_frame) if selected.admitted else (False, selected.rejection)
            if trace:
                trace("trajectory_preview", {"task": task, "seed": seed, "step": step,
                    "choice": choice["choice"], "candidate": action, "executed": executed,
                    "rejection": rejection, "check": "simulator safety filter; predictions are not model inputs"})
            after = world.observe()
            observed_after = observe(step)
            drops += int(before["held"] and not after["held"] and selected.gripper != "open")
            row = {**choice, "step": step, "action": action, "before": before, "after": after,
                   "observed_before": observed, "observed_after": observed_after,
                   "audit_source": "privileged simulator outcome; excluded from policy input",
                   "executed": executed, "rejection": rejection,
                   "label_source": label_mode, "gold": None, "branch_scores": None}
            if label_mode == "teacher" and not decisions:
                row["gold"] = [float(key == row["choice"]) for key in row["criteria"]]
            records.append(row)
            if trace:
                trace("action_detail", {"task": task, "seed": seed, **row})
            if on_step:
                on_step(row)
            if rejection == "collision":
                failure = "collision"
                break
            if len(records) >= 3 and all(r["choice"] == row["choice"] and
                np.linalg.norm(np.asarray(r["after"]["tcp"]) - r["before"]["tcp"]) < .001 and
                np.linalg.norm(np.asarray(r["after"]["object"]) - r["before"]["object"]) < .001 for r in records[-3:]):
                failure = "stalled"
                break
    except PerceptionUnavailable as exc:
        failure = "perception_unavailable"
        if trace:
            trace("perception_failed", {"message": str(exc), "execution": settings, "fallback": False})
    finally:
        if observer:
            observer.close()
    success = world.success()
    result = {"schema_version": 1, "task": task, "seed": seed, "group": group, "episode_id": identity,
              "scene_distribution": DISTRIBUTION if randomize_scene else "upstream-default",
              "scene_config": world.scene_config, "scene_hash": world.scene_hash,
              "policy_version": PROTOCOL, **settings, "execution": settings,
              "episode_protocol": {"staged_prompts": bool(controller), "strict_grasp": hasattr(world, "diagnostics"), "execution": settings},
              "success": success, "failure": None if success else failure or "budget_exhausted",
              "steps": len(records), "collisions": int(world.unsafe_contacts > 0), "drops": drops,
              "rejections": sum(not r["executed"] for r in records), "wall_seconds": time.perf_counter() - started,
              "latency_p95_ms": float(np.percentile(latencies, 95)) if latencies else 0.,
              "records": records, "camera_captures": camera_history}
    if hasattr(world, "diagnostics"):
        result.update(stages=world.diagnostics(), success_definition="strict_grasp_v1", input_contract="grasp-observation-v1")
    if controller:
        result.update(control_protocol=STAGED_PROTOCOL, stage_transitions=controller.transitions)
    if poses:
        result["replay"] = poses.save(Path(replay_directory), result)
    return result
