# Installation and running / 安装与运行

Execute setup on the experiment host. The maintained deployment uses DGX Spark; local source editing does not require starting a second experimental service.

## 1. Prerequisites

- Git and [uv](https://docs.astral.sh/uv/getting-started/installation/).
- Python **3.12** for `constraints-simulation.txt`.
- Node.js **22.12+** and npm for the Web UI.
- Linux or macOS; GPU inference additionally needs a compatible PyTorch runtime. Base simulation does not need PyTorch.

On Ubuntu without a desktop:

```bash
sudo apt-get update
sudo apt-get install -y libosmesa6
export MUJOCO_GL=osmesa
```

OSMesa renders on CPU while the model can use CUDA. Do not use the Linux OSMesa setting on macOS. The GB10 deployment uses this combination because EGL crashed alongside the loaded CUDA policy during validation.

## 2. Install the backend

```bash
git clone https://github.com/InfronAI/Embodied-RSI-Lab.git
cd Embodied-RSI-Lab
uv python install 3.12
uv venv --python 3.12 .venv
.venv/bin/python scripts/bootstrap.py
```

Bootstrap installs the integrated project and checks out pinned RSI-Jev code into ignored `vendor/`. Its loader patch releases unused CPU weights before CUDA allocation. Physics is integrated under `src/embodied_jev`; no second server or editable physics checkout is required.

## 3. Install and build the Web UI

```bash
npm ci
npm run build
```

Vite writes the model workbench bundle into `src/embodied_jev/web/`. The unified shell and training pages live under `src/embodied_rsi/web/`. Python serves both. Rebuild after changing `frontend/` or shared modules imported into it.

`npm run dev` starts a development preview with API proxying. It is not the complete production workbench and still needs the backend. Use `/simulation` for integrated navigation and reports.

## 4. Optional RSI environment

```bash
uv venv --python 3.12 .venv-rsi
.venv/bin/python scripts/bootstrap.py --rsi
```

This isolates PyTorch/Transformers from the web and simulator environment. The launcher discovers `.venv-rsi/bin/python` automatically. For **GB10 CUDA 13**, use the additional constraints in [the Spark guide](../deploy/spark/README.md).

First RSI use downloads release and base-model files from Hugging Face. Keep `HF_HUB_OFFLINE` unset until all required files are cached. `upstreams.lock.json` pins source; model revision pinning is a separate experiment setting. The reproduction script pins the documented RSI v1.0 release.

## 5. Configure and start

```bash
cp lab-config.example.json lab-config.json
.venv/bin/embodied-lab serve
```

Ignored `lab-config.json` selects port `8092` and an `artifacts` directory relative to the project root. A fresh checkout has no private history or deployed checkpoint.

Open `http://127.0.0.1:8092/simulation` on the host. For a remote server, use an SSH tunnel or authenticated HTTPS proxy. The backend binds to loopback by default.

For explicit settings:

```bash
.venv/bin/embodied-lab --artifacts artifacts/example dashboard \
  --port 8092 --rsi-python "$PWD/.venv-rsi/bin/python"
```

For a base-only installation, omit `--rsi-python`. Variables in `.env.example` must be exported or supplied through the service environment; that file is not loaded automatically.

## 6. Verify

```bash
curl --noproxy '*' -fsS http://127.0.0.1:8092/health
curl --noproxy '*' -fsS http://127.0.0.1:8092/api/simulation/capabilities
```

Open each workspace and check language switching, rendering, and connection status. A model connection test requests a decision without executing a robot action. First scene downloads and cold model loads can be substantially slower than later requests.

| Symptom | Check |
| --- | --- |
| Missing UI assets | Run `npm ci` and `npm run build`. |
| No headless MuJoCo image | Install `libosmesa6`, set `MUJOCO_GL=osmesa` before startup, inspect logs. |
| RSI unavailable | Check `.venv-rsi/bin/python` and the installed RSI-Jev package. |
| Model download fails | Check access, cache paths, and premature offline mode. |
| Host/origin rejected | Configure the exact HTTPS origin and authenticated proxy. |
| API key disappears after restart | Inspect credential-store status; unavailable keyrings use session storage. |
| Missing experiment history | Check the active artifact directory and private migration mapping. |

Do not copy virtual environments between operating systems or architectures. Recreate them, then copy reviewed source, configuration, and consistent data snapshots.
