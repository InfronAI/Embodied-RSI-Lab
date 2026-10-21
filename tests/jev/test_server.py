from fastapi.testclient import TestClient

from embodied_jev.server import create_app


def test_configuration_reset_and_export_contract(monkeypatch):
    monkeypatch.delenv("TYPESAFE_API_KEY", raising=False)
    with TestClient(create_app()) as client:
        assert client.get("/api/config").status_code == 200
        assert client.post("/api/reset", json={"task": "unknown"}).status_code == 422
        assert client.post("/api/reset", json={"provider": "jev"}).status_code == 422
        assert client.post("/api/reset", json={"task": "stack", "seed": 2}).status_code == 200
        assert client.get("/api/export").json()["task"] == "stack"
        assert client.get("/api/replay/-1").status_code == 404
        assert client.get("/api/replay/0").json()["qpos"]
        assert client.post("/api/control/start", json={"threshold": 2}).status_code == 422
        assert client.post("/api/control/stop", json={}).status_code == 200
        assert client.post("/api/control/start", json={}).status_code == 409


def test_cross_origin_commands_rejected():
    with TestClient(create_app()) as client:
        response = client.post("/api/control/start", json={}, headers={"Origin": "https://other.invalid"})
        assert response.status_code == 403
        assert client.get("/api/state").json()["status"] == "idle"


def test_human_intervention_is_persisted_and_can_change_when_resuming():
    app = create_app()
    with TestClient(app) as client:
        state = client.get("/api/state").json()
        assert state["human_intervention"] is True
        response = client.post("/api/reset", json={"expected_episode_id": state["id"],
                               "human_intervention": False, "speed": 4, "max_cycles": 1})
        assert response.status_code == 200
        state = response.json()
        assert state["human_intervention"] is False
        # A stopped low-confidence decision resumes on the same episode.
        with app.state.session.lock:
            app.state.session.status = "uncertain"
        response = client.post("/api/control/step", json={"episode_id": state["id"], "human_intervention": True})
        assert response.status_code == 200
        assert response.json()["id"] == state["id"]
        assert client.get("/api/export").json()["human_intervention"] is True
        assert client.post("/api/control/stop", json={"episode_id": state["id"]}).status_code == 200
