# Contributing / 参与开发

Start with [installation](docs/INSTALLATION.md) and [architecture](docs/ARCHITECTURE.md). Keep Python package responsibilities explicit and update both English and Chinese UI strings.

## Development and validation

The maintained experiments run on a designated DGX Spark host. Source editing and lightweight static/unit checks can run on a developer machine. Run simulations, browser integration tests, model inference, and training on the designated experiment/test host with an isolated artifact directory.

```bash
# Backend checks in the prepared environment
.venv/bin/ruff check --select E9,F821,F822,F823 src tests scripts
.venv/bin/python -m pytest -q

# Web UI build and browser checks
npm ci
npm run build
npx playwright install --with-deps chromium
EMBODIED_TEST_PYTHON="$PWD/.venv/bin/python" npm run test:ui
EMBODIED_TEST_PYTHON="$PWD/.venv/bin/python" npm run test:lab-ui
```

Set `MUJOCO_GL=osmesa` for headless Linux. Browser tests start their own services on 8099 and 8098, use in-memory connection storage, and write ignored test artifacts. Never point them at a live training store. Additional lint/style diagnostics can be run separately; the validation lint gate focuses on syntax and unresolved names in the integrated codebase.

Before publication, stage the intended changes and run:

```bash
python scripts/check_publication.py --staged
gitleaks dir --redact --max-archive-depth 3 .
gitleaks git --redact .
```

See [SECURITY.md](SECURITY.md) for excluded content. Local credentials, deployments, checkpoints, and runtime databases do not belong in commits or issue attachments.

## Changes and experiments

- Describe the concrete behavior change and relevant validation. Include reviewed screenshots for UI changes.
- Preserve observation permissions, action provenance, actual physical execution, and replay. Update the matching dataset/evaluation contract when changing an action protocol.
- Report model revisions, tasks, seeds, execution/camera settings, data sources, and reproduction commands. Keep failed episodes. Distinguish rule/teacher results from model results.
- Do not report candidate probabilities as physical success rates, or training loss as independent improvement.
- Keep copyright and asset licenses intact. New dependencies retain their original licenses.

The optional gallery can be built with `npm run build:site`. Validation and manual GitHub Pages workflows are provided as [opt-in templates](docs/ci/README.md). They require workflow-write permission to activate; uploading this source does not enable them or publish a separate website automatically.
