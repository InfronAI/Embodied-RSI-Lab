"""Exercise the migrated CUDA policy without updating the deployed checkpoint."""
from __future__ import annotations

import json
import time
from pathlib import Path

import numpy as np
import torch

from embodied_rsi.deployment import current
from embodied_rsi.devices import release_unused_memory
from embodied_rsi.evaluation import fingerprint
from embodied_rsi.relocation import relocate
from embodied_rsi.sim import episode
from embodied_rsi.storage import Store
from embodied_rsi.task_rsi import RSILearner


def main():
    root = Path(__file__).resolve().parents[2]
    settings = json.loads((root / "lab-config.json").read_text())
    store = Store(root / settings["artifacts"])
    champion = current(store)
    checkpoint = Path(champion["checkpoint"])
    started = time.monotonic()
    actual = fingerprint(checkpoint)
    assert actual == champion["sha256"], "Migrated checkpoint hash differs from its release"
    print("Checkpoint hash verified", flush=True)
    learner = RSILearner(checkpoint, device="cuda")
    print("CUDA checkpoint loaded", flush=True)
    runs = []
    for seed in (42, 123):
        result = episode("transfer", seed, learner, max_steps=20, label_mode="none")
        assert result["records"], "No model decisions produced"
        runs.append({"seed": seed, "success": result["success"], "steps": len(result["records"])})
        print("Physical rollout", runs[-1], flush=True)
    assert any(r["success"] for r in runs), "Neither validation rollout completed the task"
    metadata = relocate(json.loads((checkpoint / "meta.json").read_text()))
    with (Path(metadata["robot_training"]["dataset"]) / "train.jsonl").open() as stream:
        sample = json.loads(next(stream))
    row = {"state": json.loads(sample["state"]), "criteria": sample["questions"][0]["criteria"]}
    before = learner.snapshot()
    encoded = learner.encode_success(row)
    metrics = learner.imitate([(encoded, int(np.argmax(sample["gold"]["action"])))])
    assert all(np.isfinite(value) for value in metrics.values()), "Nonfinite training result"
    changed = any(not torch.equal(value, before[key]) for key, value in learner.snapshot().items())
    assert changed, "Training step did not update the scorer"
    learner.restore(before)
    print("CUDA training step", metrics, flush=True)
    modes = []
    for control in ("incremental", "hierarchical"):
        result = episode("transfer", 42, learner, max_steps=1, label_mode="none", execution={
            "control_mode": control, "observation_mode": "rgbd", "camera_views": ["external", "wrist"],
        })
        assert result["records"], f"No {control} decision produced"
        modes.append({"control_mode": control, "observation_mode": "rgbd", "steps": len(result["records"])})
        print("Camera and control probe", modes[-1], flush=True)
    del encoded, before, learner
    release_unused_memory("cuda")
    assert fingerprint(checkpoint) == actual, "Verification modified the deployed checkpoint"
    report = {
        "checkpoint_sha256": actual, "device": "cuda", "gpu": torch.cuda.get_device_name(0),
        "torch": torch.__version__, "cuda": torch.version.cuda, "rollouts": runs,
        "rgbd_controls": modes, "training": {**metrics, "scorer_updated": changed},
        "checkpoint_unchanged": True, "elapsed_seconds": round(time.monotonic() - started, 2),
    }
    output = root / "artifacts/deployment-verification/model-smoke.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2), flush=True)


if __name__ == "__main__":
    main()
