import json

from fastapi import FastAPI
from fastapi.testclient import TestClient

from embodied_jev.diagnostics import RunLog
from embodied_rsi.process_log import install_logs, trace_episode
from embodied_rsi.sim import episode
from embodied_rsi.storage import Store
from embodied_rsi.self_improvement import success_dataset


def log_app(store):
    app = FastAPI()
    log = RunLog()
    install_logs(app, store, log)
    return app, log


def test_durable_logs_pagination_filters_and_complete_export(tmp_path):
    store = Store(tmp_path)
    run = store.create("self-train", "compact", {})
    for step in range(260):
        store.event(run, "metric", {"step": step, "loss": 1 / (step + 1)})
    store.event(run, "trajectory_filter", {"reason": "100%_literal", "accepted": False})
    # A newly opened store reads the same stream, not a browser/session ring buffer.
    app, _ = log_app(Store(tmp_path))
    with TestClient(app) as client:
        first = client.get("/api/lab/logs", params={"phase": "training", "newest": True, "limit": 100}).json()
        assert first["has_more"] and len(first["entries"]) == 100
        second = client.get("/api/lab/logs", params={"phase": "training", "before": first["oldest_cursor"], "limit": 100}).json()
        assert max(row["seq"] for row in second["entries"]) < min(row["seq"] for row in first["entries"])
        matching = client.get("/api/lab/logs", params={"search": "100%_", "phase": "filter"}).json()
        assert len(matching["entries"]) == 1
        exported = client.get("/api/lab/logs/export", params={"run": run, "phase": "training"})
        rows = [json.loads(line) for line in exported.text.splitlines()]
        assert len(rows) == 261 and rows[-1]["payload"]["step"] == 259
        assert client.get("/api/lab/logs?phase=unknown").status_code == 400
        assert client.get("/api/lab/logs?after=1&before=10").status_code == 400


def test_log_sink_keeps_complete_details_and_redacts_keys(tmp_path):
    store = Store(tmp_path)
    app, diagnostics = log_app(store)
    diagnostics.register_secrets(["test-private-key"])
    diagnostics.sink = lambda entry: store.event("workbench", entry["event"], entry)
    diagnostics.emit("decision_request", "model call", category="decision", details={
        "api_key": "test-private-key", "input": "a" * 120000, "message": "error: test-private-key"})
    with TestClient(app) as client:
        body = client.get("/api/lab/logs").json()
        assert len(body["entries"][0]["payload"]["details"]["input"]) == 120000
        assert "test-private-key" not in json.dumps(body)
        assert "test-private-key" not in client.get("/api/lab/logs/export").text


def test_physical_episode_records_inputs_choice_filter_and_feedback(tmp_path):
    store = Store(tmp_path)
    run = store.create("simulation", "teacher", {})
    result = episode("transfer", 0, max_steps=1, trace=trace_episode(store, run, model_version="teacher"))
    rows = {row["kind"]: row["payload"] for row in store.events(run)}
    assert {"perception", "decision_request", "decision_response", "trajectory_preview", "action_detail"} <= rows.keys()
    assert rows["decision_request"]["criteria"]
    assert rows["action_detail"]["before"] and rows["action_detail"]["after"]
    assert rows["decision_response"]["choice"] == result["records"][0]["choice"]
    assert rows["action_detail"]["model_version"] == "teacher"


def test_trajectory_filters_explain_acceptance_failure_and_deduplication(tmp_path):
    from test_success_replay import model_episode
    good = model_episode()
    bad = model_episode(False)
    bad["episode_id"] = "failed-episode"
    source = tmp_path / "episodes.jsonl"
    source.write_text("\n".join(json.dumps(row) for row in [good, bad, good]) + "\n")
    events = []
    success_dataset([source], tmp_path / "dataset", trace=lambda event, payload: events.append((event, payload)))
    reasons = {payload.get("reason") for event, payload in events if event == "trajectory_filter"}
    assert {"terminal_failure", "duplicate_episode", "executed_action_from_successful_model_episode"} <= reasons
    assert events[-1][0] == "filter_summary"


def test_both_engines_and_connection_configuration_share_one_app(tmp_path, monkeypatch):
    from embodied_rsi.dashboard import create_app
    monkeypatch.setenv("EMBODIED_JEV_PERSISTENCE", "memory")
    with TestClient(create_app(Store(tmp_path)), base_url="http://127.0.0.1:8092") as client:
        assert client.get("/").url.path == "/simulation"
        assert client.get("/simulation").status_code == 200
        assert client.get("/api/simulation").status_code == 200
        assert client.get("/workbench/api/config").status_code == 200
        before = client.get("/workbench/api/state").json()
        saved = client.post("/workbench/api/connections", json={
            "provider": "chat", "url": "http://127.0.0.1:1/v1", "model": "local-test",
            "api_key": "private-lab-key", "json_mode": True,
        }, headers={"origin": "http://127.0.0.1:8092"})
        assert saved.status_code == 200
        public = client.get("/workbench/api/connections")
        assert "private-lab-key" not in public.text
        # Saving a connection does not call the configured model.
        assert client.get("/workbench/api/state").json()["model_calls"] == before["model_calls"]
        assert client.post("/workbench/api/connections", json={}, headers={"origin": "http://other.example"}).status_code == 403
        assert "private-lab-key" not in client.get("/api/lab/logs/export").text


def test_public_https_deployment_preserves_host_and_origin_guards(tmp_path, monkeypatch):
    from embodied_rsi.dashboard import create_app
    monkeypatch.setenv("EMBODIED_JEV_PERSISTENCE", "memory")
    monkeypatch.setenv("EMBODIED_LAB_PUBLIC_ORIGIN", "https://lab.example")
    with TestClient(create_app(Store(tmp_path)), base_url="https://lab.example") as client:
        assert client.get("/simulation").status_code == 200
        assert client.get("/api/simulation").status_code == 200
        assert client.post("/workbench/api/connections", json={
            "provider": "chat", "url": "http://127.0.0.1:1/v1", "model": "deployment-test",
        }, headers={"origin": "https://lab.example"}).status_code == 200
        # Invalid input reaches the handler without launching a training job.
        assert client.post("/api/jobs", json={"action": "invalid"},
                           headers={"origin": "https://lab.example"}).status_code == 422
        for path in ("/api/jobs", "/workbench/api/connections"):
            for origin in ("https://attacker.example", "http://lab.example", "https://lab.example:8092"):
                assert client.post(path, json={}, headers={"origin": origin}).status_code == 403
        assert client.get("/simulation", headers={"host": "attacker.example"}).status_code == 403
        assert client.get("http://lab.example/simulation").status_code == 403
        assert client.get("https://lab.example:8092/simulation").status_code == 403


def test_public_access_requires_explicit_configuration(tmp_path, monkeypatch):
    from embodied_rsi.dashboard import create_app
    monkeypatch.setenv("EMBODIED_JEV_PERSISTENCE", "memory")
    monkeypatch.delenv("EMBODIED_LAB_PUBLIC_ORIGIN", raising=False)
    with TestClient(create_app(Store(tmp_path)), base_url="https://lab.example") as client:
        assert client.get("/simulation").status_code == 403
