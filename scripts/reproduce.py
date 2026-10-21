"""Run the documented experiments in isolated stores and retain all evidence.

Use the RSI environment. Download the pinned models before running offline.
Historical autonomous trajectories are not distributed with this repository;
the verification stage therefore collects new original-model attempts first.
"""
from __future__ import annotations

import argparse
import importlib.metadata
import json
import os
import platform
import signal
import subprocess
import sys
import time
from pathlib import Path

from embodied_rsi.storage import Store, dumps, write_json

REPO = Path(__file__).resolve().parents[1]
REVISION = "f9248caceb89caf2e6c968ea33bf0d6eb7f957b0"
STAGES = ("collect", "verification", "transfer", "legacy", "code", "parity")


def collect(args):
    import numpy as np

    from embodied_rsi.exploration import ExplorationMemory, ExploringPolicy
    from embodied_rsi.monitor import Monitor
    from embodied_rsi.sim import episode
    from embodied_rsi.task_rsi import RSILearner

    if args.store.exists():
        raise FileExistsError("Collection needs a fresh store")
    store = Store(args.store)
    learner = RSILearner(args.baseline)
    memory = ExplorationMemory(store, "rsi")
    policy = ExploringPolicy(learner, memory)
    protocol = {"baseline": str(args.baseline), "revision": REVISION,
                "episode_protocol": learner.episode_protocol, "seed_start": 0,
                "max_attempts": args.episodes, "stop_after_successes": args.successes,
                "max_steps": args.max_steps, "randomize_scene": args.randomize_scene,
                "sampling": "one NumPy RNG per scene seed, as in the live simulation",
                "source": "new autonomous original-model attempts; no teacher initialization"}
    run = store.create("explore", "rsi", protocol)
    directory = store.run_dir(run)
    write_json(directory / "protocol.json", protocol)
    successes = 0
    try:
        with Monitor(store, run), (directory / "episodes.jsonl").open("w") as output:
            for seed in range(args.episodes):
                result = episode("transfer", seed, policy, max_steps=args.max_steps,
                                 label_mode="none", rng=np.random.default_rng(seed),
                                 randomize_scene=args.randomize_scene,
                                 replay_directory=directory / "replays")
                result.update(source_policy="rsi", checkpoint=str(args.baseline),
                              model_version="RSI-Jev v1.0-0.8b / " + REVISION[:12])
                result["exploration_update"] = memory.observe(result)
                output.write(dumps(result) + "\n")
                output.flush()
                successes += int(result["success"])
                store.event(run, "episode", {k: v for k, v in result.items() if k != "records"})
                print(dumps({"stage": "collection", "episodes": seed + 1,
                             "successes": successes, "seed": seed,
                             "success": result["success"], "steps": result["steps"]}), flush=True)
                if args.successes and successes >= args.successes:
                    break
        summary = {"episodes": seed + 1, "successful_episodes": successes,
                   "success_rate": successes / (seed + 1),
                   "episodes_file": str(directory / "episodes.jsonl"), "protocol": protocol}
        store.finish(run, summary=summary)
        write_json(store.root / "collection.json", summary)
        if args.successes and successes < args.successes:
            raise RuntimeError(f"Collected only {successes}/{args.successes} requested successes")
    except BaseException as exc:
        store.finish(run, "cancelled" if isinstance(exc, KeyboardInterrupt) else "failed",
                     {"error": str(exc), "successful_episodes": successes})
        raise


def run(args):
    from serve.release import resolve_ckpt

    from embodied_rsi.devices import rsi_device

    root = args.output.resolve()
    root.mkdir(parents=True, exist_ok=True)
    logs = root / "logs"
    logs.mkdir(exist_ok=True)
    baseline = Path(args.baseline).resolve() if args.baseline else resolve_ckpt("v1.0-0.8b", revision=REVISION)
    status_path = root / "reproduction.json"
    if status_path.exists():
        status = json.loads(status_path.read_text())
    else:
        status = {"created": time.time(), "baseline": str(baseline), "revision": REVISION,
                  "device": rsi_device(), "platform": platform.platform(),
                  "python": platform.python_version(), "stages": {},
                  "packages": {name: importlib.metadata.version(name) for name in (
                      "numpy", "mujoco", "torch", "transformers", "tokenizers", "safetensors",
                      "huggingface-hub", "fastapi", "uvicorn")},
                  "limits": ["Historical training trajectories are absent; verification uses new collection.",
                             "Cross-device numerical equality is not assumed; each result is measured."]}
        write_json(status_path, status)
    python = sys.executable
    cli = [python, "-m", "embodied_rsi.cli"]

    def command(stage, argv, legacy=False):
        previous = status["stages"].get(stage)
        if previous and previous["status"] == "completed":
            print(dumps({"stage": stage, "status": "already_completed"}), flush=True)
            return
        if previous:
            raise RuntimeError(f"Stage {stage} already has incomplete evidence; use a fresh output directory")
        env = dict(os.environ)
        env.update(EMBODIED_RSI_STAGED_PROMPTS="0" if legacy else "1",
                   EMBODIED_RSI_STRICT_GRASP="0" if legacy else "1",
                   PYTHONUNBUFFERED="1", TOKENIZERS_PARALLELISM="false")
        log = logs / f"{stage}.log"
        entry = {"status": "running", "started": time.time(), "command": argv,
                 "log": str(log), "legacy_protocol": legacy}
        status["stages"][stage] = entry
        write_json(status_path, status)
        print(dumps({"stage": stage, "status": "running", "log": str(log)}), flush=True)
        with log.open("w") as output:
            process = subprocess.Popen(argv, cwd=REPO, env=env, stdout=output,
                                       stderr=subprocess.STDOUT, start_new_session=True)
            entry["pid"] = process.pid
            write_json(status_path, status)
            try:
                code = process.wait()
            except BaseException:
                os.killpg(process.pid, signal.SIGINT)
                try:
                    process.wait(timeout=20)
                except subprocess.TimeoutExpired:
                    os.killpg(process.pid, signal.SIGTERM)
                entry.update(status="cancelled", finished=time.time())
                write_json(status_path, status)
                raise
        entry.update(status="completed" if code == 0 else "failed", returncode=code, finished=time.time())
        write_json(status_path, status)
        print(dumps({"stage": stage, "status": entry["status"], "seconds": entry["finished"] - entry["started"]}),
              flush=True)
        if code:
            raise RuntimeError(f"Stage {stage} failed; inspect {log}")

    def collect_command(store, count, successes, max_steps, randomize):
        argv = [python, str(Path(__file__).resolve()), "collect", "--baseline", str(baseline),
                "--store", str(store), "--episodes", str(count), "--successes", str(successes),
                "--max-steps", str(max_steps)]
        return argv + (["--randomize-scene"] if randomize else [])

    def study_command(store):
        return cli + ["--artifacts", str(store), "transfer-study", "--checkpoint", str(baseline),
                      "--rounds", "3", "--explore-episodes", "30", "--steps", "100",
                      "--episodes", "90", "--audit-episodes", "30", "--max-steps", "20"]

    for stage in args.stages:
        if stage == "collect":
            command(stage, collect_command(root / "current-collection", 100, 9, 30, True))
        elif stage == "verification":
            collected = json.loads((root / "current-collection/collection.json").read_text())
            command(stage, [python, str(REPO / "scripts/verify_learning_loop.py"),
                           "--artifacts", str(root / "verification"), "--episodes-file", collected["episodes_file"],
                           "--baseline", str(baseline), "--successes", "9", "--steps", "100",
                           "--audit-episodes", "30"])
        elif stage == "transfer":
            command(stage, study_command(root / "transfer-current"))
        elif stage == "legacy":
            command("legacy-collection", collect_command(root / "transfer-legacy", 12, 0, 20, False), legacy=True)
            command(stage, study_command(root / "transfer-legacy"), legacy=True)
        elif stage == "code":
            deployed = json.loads((root / "verification/champion-rsi.json").read_text())
            command(stage, cli + ["--artifacts", str(root / "code-study"), "code-study",
                                 "--checkpoint", deployed["checkpoint"], "--episodes", "90",
                                 # reserve_suite adds 20,000 for evaluation: match the published scenes.
                                 "--seed-start", "20030000"])
        elif stage == "parity":
            verified = json.loads((root / "verification/verification.json").read_text())
            training = root / "verification/runs" / verified["training"] / "checkpoint/meta.json"
            dataset = json.loads(training.read_text())["dataset"]
            command(stage, [python, str(REPO / "scripts/verify_rsi_inference.py"),
                           "--checkpoint", str(baseline), "--dataset", dataset])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="action", required=True)
    study = sub.add_parser("run")
    study.add_argument("--output", type=Path, required=True)
    study.add_argument("--baseline", type=Path)
    study.add_argument("--stages", choices=STAGES, nargs="+", default=list(STAGES))
    collection = sub.add_parser("collect")
    collection.add_argument("--store", type=Path, required=True)
    collection.add_argument("--baseline", type=Path, required=True)
    collection.add_argument("--episodes", type=int, default=100)
    collection.add_argument("--successes", type=int, default=9)
    collection.add_argument("--max-steps", type=int, default=30)
    collection.add_argument("--randomize-scene", action="store_true")
    args = parser.parse_args()
    if args.action == "collect":
        if args.episodes < 1 or args.successes < 0 or args.max_steps < 1:
            parser.error("Use positive episode/step budgets and a nonnegative success target")
        collect(args)
    else:
        run(args)


if __name__ == "__main__":
    main()
