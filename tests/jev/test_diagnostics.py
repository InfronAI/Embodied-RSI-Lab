import json
from concurrent.futures import ThreadPoolExecutor

import httpx
import pytest
from fastapi.testclient import TestClient

from embodied_jev.diagnostics import RunLog
from embodied_jev.policies import DecisionPolicy
from embodied_jev.runtime import Session
from embodied_jev.server import create_app


def test_cursor_reports_rotation_and_is_thread_safe():
    log = RunLog(max_entries=30)
    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(lambda n: log.emit("tick", "帧", details={"n": n}), range(100)))
    first = log.read(after=0, limit=11)
    assert [r["id"] for r in first["entries"]] == list(range(71, 82))
    assert first["dropped"] == first["missing"] == 70
    assert first["retained"] == 30 and first["has_more"]
    rest = log.read(first["next_cursor"])
    assert [r["id"] for r in rest["entries"]] == list(range(82, 101))
    assert not rest["has_more"] and rest["missing"] == 0
    assert log.read(rest["next_cursor"])["entries"] == []
    assert log.read(10000)["entries"] == log.read()["entries"]


def test_redaction_before_storage_and_after_key_rotation():
    log = RunLog()
    log.register_secrets(["retired-secret"])
    log.emit("request", "retired-secret", details={
        "api_key": "not-registered", "Authorization": "Bearer other",
        "state": "retired-secret", "image_url": "data:image/png;base64,private-image",
        "source": {"type": "base64", "media_type": "image/png", "data": "private-image"},
        "bytes": b"raw-image", "nested": [{"private": "future-secret"}],
    })
    log.register_secrets(["future-secret"])
    for encoded in [json.dumps(log.read()), json.dumps(log.export())]:
        for secret in ["retired-secret", "future-secret", "not-registered", "Bearer other", "private-image", "raw-image"]:
            assert secret not in encoded
    row = log.export()[0]
    assert row["details"]["bytes"]["byte_length"] == 9
    assert row["details"]["bytes"]["sha256"]


def test_large_entries_are_explicitly_truncated_and_byte_bounded():
    log = RunLog(max_bytes=4000, max_entry_bytes=2000)
    log.emit("long", "长内容", details={"text": "测试" * 10000})
    row = log.read()["entries"][0]
    assert row["details"]["truncated"] is True
    assert len(json.dumps(row, ensure_ascii=False).encode()) < 2000
    for _ in range(20):
        log.emit("tick", "帧", details={"data": "x" * 1000})
    assert log.read()["retained"] < 20 and log.read()["dropped"] > 0


@pytest.mark.parametrize("mode", ["skills", "incremental", "hierarchical"])
def test_real_runtime_records_input_safety_physics_and_feedback(mode):
    log = RunLog()
    session = Session(control_mode=mode, preview=False, speed=0, max_cycles=1, diagnostics=log)
    try:
        session.start()
        session.worker.join(15)
        assert not session.worker.is_alive()
        assert session.cycles == 1, session.message
        rows = log.export()
        names = {r["event"] for r in rows}
        assert {"session_configured", "observation", "decision_started", "decision_finished",
                "decision_input", "preview_started", "action_started", "physics_frame", "action_feedback"} <= names
        assert all(r["episode_id"] == session.id for r in rows)
        frame = next(r["details"] for r in rows if r["event"] == "physics_frame")
        assert frame["qpos"] and frame["qvel"] and frame["ctrl"] and frame["observation"]
        feedback = next(r["details"] for r in rows if r["event"] == "action_feedback")
        assert feedback["after"] == session.history[0]["after"]
    finally:
        session.stop()


def test_http_diagnostics_keep_payload_and_status_but_not_upstream_errors():
    log = RunLog()
    log.register_secrets(["test-secret"])
    policy = DecisionPolicy("chat", {"url": "https://fixture.invalid", "model": "fixture", "key": "test-secret"})
    policy.trace = log.emit
    policy._http_client = httpx.Client(transport=httpx.MockTransport(lambda request:
        httpx.Response(502, text="private upstream response test-secret", request=request)))
    try:
        response = policy._post("https://fixture.invalid", json={"state": "visible", "key": "test-secret"},
                                headers={"Authorization": "Bearer test-secret"})
        assert response.status_code == 502
        encoded = json.dumps(log.export())
        assert "visible" in encoded and "502" in encoded
        assert "private upstream response" not in encoded and "test-secret" not in encoded
    finally:
        policy.close()


def test_api_retains_reset_history_scopes_comparison_and_exports_jsonl():
    with TestClient(create_app()) as client:
        first = client.get("/api/logs").json()
        old_episode = client.get("/api/state").json()["id"]
        new = client.post("/api/reset", json={"task": "stack"}).json()
        page = client.get("/api/logs", params={"after": first["next_cursor"]}).json()
        assert {old_episode, new["id"]} <= {r.get("episode_id") for r in page["entries"]}
        assert page["stream_id"] == first["stream_id"]
        comparison = client.post("/api/comparison", json={"lanes": [{"provider": "baseline"}, {"provider": "baseline"}]}).json()
        exported = client.get("/api/logs/export")
        assert exported.headers["cache-control"] == "no-store"
        rows = [json.loads(line) for line in exported.text.splitlines()]
        lanes = [r for r in rows if r.get("comparison_id") == comparison["id"]]
        assert {"lane-1", "lane-2"} <= {r.get("lane_id") for r in lanes}
        assert all(r["scope"] == "comparison" for r in lanes)
        assert client.get("/api/logs?after=-1").status_code == 422
        assert client.get("/api/logs?limit=501").status_code == 422
        assert client.get("/api/state").json()["id"] == new["id"]
