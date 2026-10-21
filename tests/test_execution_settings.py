"""End-to-end contracts for configurable local RSI execution (no remote API calls)."""
import copy
import json
import time

import numpy as np
import pytest
from fastapi.testclient import TestClient

from embodied_rsi.execution import DEFAULT_EXECUTION, execution_settings
from embodied_rsi.episode_protocol import checkpoint_protocol, episode_protocol, replay_protocol
from embodied_rsi.sim import episode
from embodied_rsi.storage import Store, dumps, write_json


@pytest.mark.parametrize("settings", [
    {"observation_mode": "vision"}, {"control_mode": "unknown"},
    {"observation_mode": "rgbd", "camera_views": []},
    {"camera_views": ["external", "external"]}, {"camera_views": ["unknown"]},
])
def test_invalid_settings_are_rejected(settings):
    with pytest.raises(ValueError):
        execution_settings(settings)


@pytest.mark.parametrize("mode", ["skills", "incremental", "hierarchical"])
@pytest.mark.parametrize("observation", ["privileged", "rgbd"])
def test_all_six_execution_combinations_use_physics_and_record_the_contract(mode, observation, tmp_path):
    settings = execution_settings({"control_mode": mode, "observation_mode": observation,
                                  "camera_views": ["external"] if observation == "rgbd" else []})
    result = episode("transfer", 0, max_steps=1, label_mode="none", execution=settings,
                     replay_directory=tmp_path)
    assert result["steps"] == 1
    assert result["execution"] == settings
    assert result["episode_protocol"]["execution"] == settings
    row = result["records"][0]
    assert row["before"]["tcp"] != row["after"]["tcp"] or row["executed"] is False
    assert row["state"]["execution"] == settings
    if mode == "hierarchical":
        assert [r["channel"] for r in row["decisions"]] == ["subgoal", "x", "y", "z", "gripper"]
        assert set(row["action"]["channels"]) == {"x", "y", "z", "gripper"}
        assert row["probabilities"] is None  # Never invent a joint probability.
    if observation == "rgbd":
        assert row["state"]["observation"]["source"].startswith("RGB-D")
        assert result["camera_captures"]
        for capture in result["camera_captures"]:
            assert set(capture["files"]) == {"external"}
            for name in capture["files"]["external"].values():
                assert (tmp_path / name).read_bytes().startswith(b"\x89PNG")


class UniformModel:
    episode_protocol = {"staged_prompts": False, "strict_grasp": False}
    def __init__(self):
        self.requests = []
    def predict(self, state, criteria):
        self.requests.append((copy.deepcopy(state), dict(criteria)))
        return np.full(len(criteria), 1 / len(criteria))


def test_rgbd_poses_and_skill_targets_never_fall_back_to_truth(monkeypatch):
    from embodied_jev.perception import VisualObserver
    actual = VisualObserver.observe
    fake_positions = {}
    def offset(observer):
        observed = actual(observer)
        observed["object"][0] += .04
        fake_positions["object"] = observed["object"].copy()
        return observed
    monkeypatch.setattr(VisualObserver, "observe", offset)
    model = UniformModel()
    episode("transfer", 0, model, max_steps=1, label_mode="none",
            execution={"observation_mode": "rgbd", "camera_views": ["external"]})
    state, criteria = model.requests[0]
    assert state["observation"]["object"][0] == pytest.approx(json.loads(criteria["approach"])["target_tcp"][0])
    assert state["observation"]["object"][0] > .3
    assert state["observation"]["source"].startswith("RGB-D")


def test_rgbd_failure_is_recorded_and_never_requests_a_model(monkeypatch):
    from embodied_jev.perception import VisualObserver, PerceptionUnavailable
    closed = []
    def fail(self):
        raise PerceptionUnavailable("test occlusion")
    close = VisualObserver.close
    def closing(self):
        closed.append(True)
        return close(self)
    monkeypatch.setattr(VisualObserver, "observe", fail)
    monkeypatch.setattr(VisualObserver, "close", closing)
    model = UniformModel()
    result = episode("transfer", 0, model, max_steps=1, label_mode="none", execution={"observation_mode": "rgbd"})
    assert result["failure"] == "perception_unavailable"
    assert not model.requests and closed == [True]


def test_hierarchy_records_real_model_calls_for_all_five_trainable_decisions():
    model = UniformModel()
    result = episode("transfer", 1, model, max_steps=1, label_mode="none",
                     execution={"control_mode": "hierarchical"})
    assert len(model.requests) == 5
    row = result["records"][0]
    assert len(row["decisions"]) == 5
    from embodied_rsi.stage_prompts import decision_input
    for decision, (state, criteria) in zip(row["decisions"], model.requests):
        prompt, instructions, options = decision_input(state, criteria, "fallback")
        assert instructions == decision["instructions"] != "fallback"
        assert options == decision["criteria"] and json.loads(prompt)["execution"]["control_mode"] == "hierarchical"
        assert sum(decision["probabilities"]) == pytest.approx(1.)


def replay_fixture(mode="hierarchical"):
    """Explicit synthetic replay fixture for schema tests; never production training data."""
    settings = execution_settings({"control_mode": mode})
    observation = {"task": "transfer", "tcp": [.3, 0, .2], "object": [.3, 0, .04],
                   "destination": [.5, .2, .04], "held": False, "gripper": "open", "support_contact": True}
    decisions = [{"channel": channel, "state": {"task_id": "transfer", "observation": observation,
                 "execution": settings, "control": {"protocol": "configured-rsi-v1", "stage": channel, "instructions": "test " + channel}},
                 "criteria": {"a": "A", "b": "B"}, "choice": "a", "probabilities": [.75, .25], "latency_ms": 1.}
                 for channel in ["subgoal", "x", "y", "z", "gripper"]]
    return {"episode_id": "synthetic-"+mode, "task": "transfer", "seed": 0, "group": "transfer:0:0",
            "execution": settings, "success": True, "source_policy": "synthetic-test-policy",
            "records": [{**decisions[0], "step": 0, "decisions": decisions, "executed": True,
                         "action": {"gripper": "open"}, "before": observation, "after": observation}]}


def test_replay_filters_settings_and_trains_every_hierarchy_question(tmp_path):
    from embodied_rsi.self_improvement import success_dataset
    good, wrong = replay_fixture(), replay_fixture("incremental")
    source = tmp_path / "episodes.jsonl"
    source.write_text(dumps(good)+"\n"+dumps(wrong)+"\n")
    traces = []
    result = success_dataset([source], tmp_path/"dataset", execution=good["execution"], trace=lambda kind, row: traces.append(row))
    assert result["successful_episodes"] == 1 and result["cases"]["train"] == 5
    cases = [json.loads(line) for line in (tmp_path/"dataset/train.jsonl").read_text().splitlines()]
    assert len({case["case_id"] for case in cases}) == 5
    assert [case["provenance"]["channel"] for case in cases] == ["subgoal", "x", "y", "z", "gripper"]
    assert any(row.get("reason") == "execution_settings_mismatch" for row in traces)
    contract = replay_protocol(cases)
    assert contract["execution"] == good["execution"]
    write_json(tmp_path/"checkpoint/meta.json", {"episode_protocol": contract})
    assert checkpoint_protocol(tmp_path/"checkpoint") == contract
    with pytest.raises(ValueError, match="incompatible execution"):
        replay_protocol(cases + [{"state": wrong["records"][0]["state"]}])


def test_fitting_persists_and_validates_recorded_execution(tmp_path, monkeypatch):
    from embodied_rsi.self_improvement import fit_successes, success_dataset
    fixture = replay_fixture()
    source=tmp_path/"episodes.jsonl";source.write_text(dumps(fixture)+"\n")
    dataset=tmp_path/"dataset";success_dataset([source],dataset,execution=fixture["execution"])
    checked=[]
    def rollout(task, seed, policy, **kwargs):
        checked.append(episode_protocol(policy))
        return {"success":False,"collisions":0,"drops":0,"rejections":0}
    monkeypatch.setattr("embodied_rsi.self_improvement.episode",rollout)
    class SchemaLearner:
        lr=.01
        def snapshot(self): return 0
        def restore(self,state): pass
        def encode_success(self,row): return row
        def imitate(self,batch): return {"loss":1.}
        def save(self,path,metadata): write_json(path/"meta.json",{**metadata,"episode_protocol":self.episode_protocol})
    store=Store(tmp_path/"store")
    run=fit_successes(store,SchemaLearner(),dataset,steps=1,dev_episodes=1,backend="compact",tasks=["transfer"])
    assert len(checked)==2 and all(c["execution"]==fixture["execution"] for c in checked)
    assert checkpoint_protocol(store.run_dir(run)/"checkpoint")["execution"]==fixture["execution"]


def test_auto_training_forwards_exact_execution_to_job(tmp_path):
    from embodied_rsi.auto_training import AutoTrainer
    from embodied_rsi.dashboard import JobRequest
    class Jobs:
        def list(self): return []
        def start(self,request): self.request=request;return {"id":"fake-job"}
    jobs=Jobs();store=Store(tmp_path)
    config={"auto_train":True,"train_every":1,"min_successes":1,"train_steps":1,
            "execution":execution_settings({"control_mode":"hierarchical","observation_mode":"rgbd","camera_views":["external"]})}
    run=store.create("explore","rsi",{})
    AutoTrainer(store,jobs,JobRequest).observe(config,{"episodes":1,"successful_episodes":1},"rsi",None,run)
    assert jobs.request.execution==config["execution"]
    from embodied_rsi.cli import parser
    parsed=parser().parse_args(["self-improve","--execution",json.dumps(config["execution"])])
    assert parsed.execution==config["execution"]


def test_api_validates_settings_before_mutation_and_returns_real_camera_images(tmp_path, monkeypatch):
    from embodied_rsi.dashboard import create_app
    monkeypatch.setenv("EMBODIED_JEV_PERSISTENCE","memory")
    store=Store(tmp_path)
    with TestClient(create_app(store)) as client:
        assert client.get('/api/simulation/capabilities').json()['direct_image_supported'] is False
        for bad in [{"observation_mode":"vision"},{"observation_mode":"rgbd","camera_views":[]}]:
            response=client.post('/api/simulation/control',json={"action":"run",**bad})
            assert response.status_code==400
        assert not (store.root/'live-session.json').exists()
        settings={"control_mode":"hierarchical","observation_mode":"rgbd","camera_views":["external"]}
        response=client.post('/api/simulation/control',json={"action":"run","policy":"teacher",
            "auto_train":False,"continuous":False,"max_steps":1,**settings})
        assert response.status_code==200
        deadline=time.monotonic()+25
        while time.monotonic()<deadline:
            state=client.get('/api/simulation').json()
            if state['status'] in {'completed','failed'}: break
            time.sleep(.05)
        assert state['status']=='completed',state.get('error')
        assert state['execution']==settings
        assert state['result']['execution']==settings
        assert state['sensor_capture']['camera_views']==['external']
        frames=client.get('/api/simulation/cameras').json()
        assert set(frames['views'])=={'external'}
        assert frames['views']['external']['rgb'].startswith('data:image/png;base64,')
        assert json.loads((store.root/'live-session.json').read_text())['config']['execution']==settings


def test_release_evaluation_reuses_candidate_settings_for_parent_and_records_scope(tmp_path,monkeypatch):
    from embodied_rsi.workflow import evaluate
    from embodied_rsi.configured_sim import PROTOCOL
    settings=execution_settings({'control_mode':'hierarchical','observation_mode':'rgbd','camera_views':['wrist']})
    class Policy:
        def __init__(self,execution): self.episode_protocol={'staged_prompts':False,'strict_grasp':False,'execution':execution}
    candidate,parent=Policy(settings),Policy(DEFAULT_EXECUTION)
    path=tmp_path/'checkpoint';write_json(path/'meta.json',{'backend':'rsi-jev','episode_protocol':candidate.episode_protocol})
    seen=[]
    def rollout(task,seed,policy,*args,**kwargs):
        seen.append((policy,kwargs['execution']))
        return {'task':task,'seed':seed,'group':f'{task}:{seed}:0','policy_version':PROTOCOL,
                'execution':kwargs['execution'],'episode_protocol':{'execution':kwargs['execution']},
                'success':False,'collisions':0,'drops':0,'rejections':0,'steps':1,'latency_p95_ms':1.}
    monkeypatch.setattr('embodied_rsi.workflow.episode',rollout)
    store=Store(tmp_path/'store')
    run=evaluate(store,candidate,path,parent,'test-parent',['transfer'],[1000001])
    assert seen==[(candidate,settings),(parent,settings)]
    report=json.loads((store.run_dir(run)/'report.json').read_text())
    assert report['execution']==settings
    assert report['scope'].startswith('RGB-D estimates')
    assert not report['gate']['passed']  # A short smoke test never bypasses release evidence.


def test_release_rejects_mixed_execution_settings():
    from embodied_rsi.evaluation import paired_report
    from embodied_rsi.configured_sim import PROTOCOL
    base={'task':'transfer','group':'transfer:0:0','policy_version':PROTOCOL,
          'success':False,'collisions':0,'drops':0,'rejections':0,'steps':1,'latency_p95_ms':1.}
    with pytest.raises(ValueError,match='execution settings mismatch'):
        paired_report([{**base,'execution':execution_settings({'control_mode':'incremental'})}],
                      [{**base,'execution':execution_settings({'control_mode':'hierarchical'})}])


def test_background_process_receives_execution_json_without_shell_interpolation(tmp_path,monkeypatch):
    import sys
    from embodied_rsi.dashboard import Jobs,JobRequest
    calls=[]
    class Process:
        pid=123456
        def poll(self): return None
    def launch(args,**kwargs): calls.append(args);return Process()
    monkeypatch.setattr('embodied_rsi.dashboard.subprocess.Popen',launch)
    settings=execution_settings({'control_mode':'incremental','observation_mode':'rgbd','camera_views':['external']})
    jobs=Jobs(Store(tmp_path),rsi_python=sys.executable)
    jobs.start(JobRequest(action='self-improve',backend='rsi',execution=settings,episodes=90,replay_only=True))
    args=calls[0]
    assert json.loads(args[args.index('--execution')+1])==settings
    assert '--replay-only' in args


def test_configured_release_still_passes_full_gate_and_warms_up_saved_protocol(tmp_path,monkeypatch):
    from embodied_rsi.evaluation import paired_report,fingerprint
    from embodied_rsi.deployment import deploy,current
    from embodied_rsi.configured_sim import PROTOCOL
    settings=execution_settings({'control_mode':'hierarchical','observation_mode':'rgbd','camera_views':['external']})
    protocol={'staged_prompts':False,'strict_grasp':False,'execution':settings}
    rows=[{'group':f'transfer:{i}:0','task':'transfer','seed':i,'policy_version':PROTOCOL,
           'episode_protocol':protocol,'execution':settings,'success':True,'collisions':0,'drops':0,
           'rejections':0,'steps':1,'latency_p95_ms':1.} for i in range(90)]
    report=paired_report(rows,[{**r,'success':False} for r in rows],expected_tasks=['transfer'])
    assert report['gate']['passed'] and report['pairs']==90
    path=tmp_path/'checkpoint';write_json(path/'meta.json',{'backend':'rsi-jev','episode_protocol':protocol})
    report.update(candidate_checkpoint=str(path),candidate_sha256=fingerprint(path))
    report_path=tmp_path/'release.json';write_json(report_path,report)
    model=UniformModel();model.episode_protocol=checkpoint_protocol(path)
    monkeypatch.setattr('embodied_rsi.deployment.load_policy',lambda *args:model)
    store=Store(tmp_path/'store');deployment=deploy(store,report_path)
    assert len(model.requests)==5
    assert all(s['execution']==settings and s['observation']['source'].startswith('RGB-D') for s,c in model.requests)
    assert deployment['warmup']=='passed'
    assert current(store,'rsi')['report']['execution']==settings
