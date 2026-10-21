# Learning and reproduction / 学习与复现

Follow **one observation, one decision, one trajectory, and one candidate release** to connect the UI with Python code and persisted evidence.

## 1. Understand one action

In Model test, choose the rule baseline and transfer task. Step through approach, grasp, lift, transport, release, and retreat. Inspect contacts and task success rather than judging only the animation.

Read in order:

1. [`physics.py`](../src/embodied_jev/physics.py): robot, objects, contacts, observations, success checks.
2. [`planning.py`](../src/embodied_jev/planning.py): skill candidates and previews.
3. [`runtime.py`](../src/embodied_jev/runtime.py): model calls, execution, pause, and replay.
4. [`policies.py`](../src/embodied_jev/policies.py): provider adapters and normalized decisions.

A candidate probability is not the physical task success rate. A rule baseline demonstrates execution, not autonomous model ability.

## 2. Trace the application

Follow [`embodied_lab/cli.py`](../src/embodied_lab/cli.py) → [`dashboard.py`](../src/embodied_rsi/dashboard.py) → [`server.py`](../src/embodied_jev/server.py). The latter is mounted in the same application under `/workbench`.

For the UI, read `src/embodied_rsi/web/lab.js`, `simulation-workspace.js`, and `frontend/lab-entry.js`. The shell uses static JavaScript modules; Vite builds the embedded model workbench. Docs diagrams use data-driven SVG.

## 3. Follow a training trajectory

Read [`sim.py`](../src/embodied_rsi/sim.py), [`execution.py`](../src/embodied_rsi/execution.py), [`configured_sim.py`](../src/embodied_rsi/configured_sim.py), and [`simulation.py`](../src/embodied_rsi/simulation.py). They connect observation permissions and action protocols to shared physics.

Then read [`self_improvement.py`](../src/embodied_rsi/self_improvement.py) and [`task_rsi.py`](../src/embodied_rsi/task_rsi.py). Successful replay uses executed model actions from complete successful episodes. Rejected or unsupported actions are not imitation targets. The default path freezes the base model and fits the scorer, rather than training an entire foundation model.

| Concept | Meaning |
| --- | --- |
| Exploration | Changes action sampling, recording probabilities and history. |
| Filtering | Checks whether recorded actions are valid training evidence. |
| Training | Computes loss, backpropagates, and updates parameters. |
| Development selection | Chooses a training step using full-task completion. |
| Release evaluation | Compares candidate and reference on independent, paired scenes. |
| Deployment | Verifies the checkpoint, warms inference, and atomically switches the registry. |

Finally read [`evaluation.py`](../src/embodied_rsi/evaluation.py), [`workflow.py`](../src/embodied_rsi/workflow.py), and [`deployment.py`](../src/embodied_rsi/deployment.py). Checkpoint identity, evaluation, and publication must agree.

## 4. Reproduce on the experiment host

Use **new artifact directories**. Never overwrite published checkpoints or mix evaluation scenes into training data.

### Physics smoke check

```bash
MUJOCO_GL=osmesa .venv/bin/embodied-rsi \
  --artifacts artifacts/physics-smoke collect \
  --tasks transfer --episodes 2 --max-steps 20
```

This uses default teacher labels. It checks physics and recording; these demonstrations are not autonomous model successes. OSMesa is for headless Linux.

### Small RSI learning cycle

After installing `.venv-rsi` and preparing the model cache:

```bash
MUJOCO_GL=osmesa EMBODIED_RSI_DEVICE=cuda \
.venv-rsi/bin/embodied-rsi --artifacts artifacts/rsi-smoke self-improve \
  --backend rsi --checkpoint v1.0-0.8b \
  --revision f9248caceb89caf2e6c968ea33bf0d6eb7f957b0 \
  --tasks transfer --rounds 1 --explore-episodes 10 \
  --episodes 10 --dev-episodes 3 --steps 5 --max-steps 20
```

This can fail to collect enough successful data or fail release checks. That is a valid diagnostic result. It is insufficient evidence for convergence or a performance claim; do not weaken release thresholds to force success.

### Documented studies

```bash
.venv-rsi/bin/python scripts/reproduce.py --help
.venv-rsi/bin/python scripts/reproduce.py run --help
MUJOCO_GL=osmesa EMBODIED_RSI_DEVICE=cuda \
.venv-rsi/bin/python scripts/reproduce.py run \
  --output artifacts/reproduction-example --stages collect verification
```

The script separates collection, verification, transfer, legacy, code, and inference-parity stages. Check resources and data prerequisites before adding stages. Initial downloads must finish before enabling offline mode.

## 5. Inspect the evidence

Check acceptance/rejection reasons, model and dataset hashes, scene separation, task-level success, parameter changes, inference parity, and deployment status. A completed job may finish without releasing a candidate.

The lower training report includes loss, parameter snapshots, development selection, evaluation, replay, and deployment history. The process log exposes intermediate records. Stopping collection and stopping a background training job are separate actions.

Historical reports describe their recorded configurations. Reproduction applies a documented protocol and measures a new outcome; it does not assume identical results across hardware or versions.
