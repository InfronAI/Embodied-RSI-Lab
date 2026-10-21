# Configuration and data / 配置与数据

## Runtime settings

Copy `lab-config.example.json` to ignored `lab-config.json`. `port` selects the HTTP port; `artifacts` selects the store, relative to the project root unless absolute. Defaults are `8092` and `artifacts`.

Copy `migration-paths.example.json` only when moving an existing store. `previous_roots` maps old project roots to the current checkout at read time. Actual machine paths remain private; checkpoint bytes and hashes must remain unchanged.

## Model connections

Use **Model configuration** to set protocol, endpoint, model ID, and credentials. Named profiles and presets are available to Model test and Model comparison. Saving does not call the model; testing or running does.

`.env.example` documents environment overrides; it is not automatically loaded.

| Variable | Purpose |
| --- | --- |
| `TYPESAFE_API_KEY`, `TYPESAFE_MODEL` | TypeSafe structured decisions |
| `EMBODIED_LOCAL_URL`, `EMBODIED_LOCAL_MODEL`, `EMBODIED_LOCAL_KEY` | Compatible structured decision endpoint |
| `EMBODIED_API_BASE`, `EMBODIED_API_MODEL`, `EMBODIED_API_KEY` | OpenAI-compatible chat |
| `EMBODIED_CLAUDE_BASE`, `EMBODIED_CLAUDE_MODEL`, `ANTHROPIC_API_KEY` | Native Claude adapter |
| `EMBODIED_RSI_DEVICE` | RSI device, such as `cuda`, `mps`, or `cpu` |
| `MUJOCO_GL` | Rendering backend, selected before startup |
| `HF_HUB_CACHE`, `HF_HUB_OFFLINE` | Model cache and optional offline operation |
| `EMBODIED_LAB_PUBLIC_ORIGIN` | Exact HTTPS origin allowed behind an authenticated proxy |

For the local deployed RSI model, use `http://127.0.0.1:8092/v1/systemone`, model `deployed`. A deployed checkpoint is required. This is the current single-action decision interface, not a general chat API.

**Self-Evolving Training trains local RSI checkpoints.** Remote API credentials do not make a chat model trainable by this loop. A fresh repository contains no private deployment registry or model weights.

## Credentials

The application uses the host's system credential store when available. On a headless host without a working keyring session, the UI indicates session-only storage. Protected systemd environment variables are another deployment option.

Do not store secrets in presets, repository JSON, command arguments, screenshots, or exports. Keep actual settings, databases, and migration archives out of Git. Diagnostic redaction does not replace review before sharing evidence.

## Execution and observations

| Setting | Options and implications |
| --- | --- |
| Action mode | `skills`, `incremental`, `hierarchical` |
| Observation | `privileged` simulator state or detected `rgbd` coordinates |
| Model cameras | External, wrist, or both; RGB-D needs at least one |
| Direct image | Compatible visual test adapters only; disabled for current trainable RSI |
| Human intervention | Low-confidence pause applies to providers with native candidate probabilities, not chat self-reported probabilities. |

Settings travel with trajectories, manifests, and checkpoints, and are reused in evaluation. Switching protocols requires compatible new data; reusing initial weights does not preserve the previous protocol's success rate. The debug camera is distinct from model cameras.

## Stores and backups

Stores contain SQLite metadata/events, runs, trajectories, datasets, evaluations, checkpoints, and deployment registries. They can identify private experiments and are ignored by default.

- Use the SQLite backup API or a consistent stopped-service snapshot; an active database copied without its WAL can lose data.
- Keep checkpoints immutable; training writes a new directory.
- Preserve model revision, data provenance, and evaluation with exported results.
- Clear imported active-run intentions when moving hosts to avoid resuming a stale session.
- Training/deployment logs are durable; browser pause only pauses display.

This is a **single-operator research tool**. Host/origin checks are not user authentication. Public access needs an authenticated proxy or access gateway; see [deployment](../deploy/spark/README.md).
