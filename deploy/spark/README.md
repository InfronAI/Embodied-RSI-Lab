# DGX Spark deployment

These are **generic templates**, not a copy of a running server's configuration. Replace the example hostname, account, project path, and proxy ports for your environment. Keep actual settings outside Git.

## Runtime layout

- Example checkout: `/opt/embodied-lab`, owned by a dedicated `embodied-lab` account.
- `.venv`: web application and simulator; `.venv-rsi`: CUDA inference/training.
- `hub/`: optional private model cache; `artifacts/`: private experiments and checkpoints.
- Backend: loopback `127.0.0.1:8092`; public path: `https://lab.example.com/simulation`.
- Remote experiments use this host; operator machines can edit source without running a second simulation service.

```text
Browser → authenticated HTTPS gateway → loopback proxy
  /simulation, /static, /workbench, lab API → 127.0.0.1:8092
  other routes → optional pre-existing homepage
```

## 1. Backend and Web UI

Follow [installation](../../docs/INSTALLATION.md) in the destination checkout, including Python 3.12, Node 22.12+, `npm ci`, and `npm run build`. Recreate environments on ARM Linux; do not copy macOS or x86 virtual environments.

Install OSMesa and set it before startup:

```bash
sudo apt-get update
sudo apt-get install -y libosmesa6
export MUJOCO_GL=osmesa
```

CUDA remains enabled for the model. OSMesa is used because EGL crashed with the loaded CUDA policy during GB10 validation. `devices.py` creates the CUDA primary context before loading CPU checkpoint tensors; the upstream loader patch releases unused CPU weights before GPU allocation.

## 2. GB10 CUDA environment

Run the base bootstrap first to fetch the pinned RSI source and apply the idempotent loader patch. Then install the dedicated GPU environment with both constraint files:

```bash
.venv/bin/python scripts/bootstrap.py
uv venv --python 3.12 .venv-rsi
uv pip install --python .venv-rsi/bin/python \
  -c constraints-simulation.txt -c deploy/spark/constraints-gb10.txt \
  -e . -e vendor/RSI-Jev
```

The additional constraints describe the tested PyTorch 2.13 / CUDA 13 runtime. Verify the driver and actual package/device versions on your host. Prepare the required model cache before setting `HF_HUB_OFFLINE=1`. Neither model weights nor training records are downloaded by cloning this repository.

## 3. Service configuration

Prepare the service account and ensure it owns the checkout, cache, and artifact directories. Adapt `embodied-lab.service` if you choose a different layout. Copy `lab-config.example.json` to private `lab-config.json` and select the intended store.

```bash
sudo install -m 600 deploy/spark/embodied-lab.env.example /etc/embodied-lab.env
sudoedit /etc/embodied-lab.env
sudo install -m 644 deploy/spark/embodied-lab.service /etc/systemd/system/embodied-lab.service
sudo systemctl daemon-reload
sudo systemctl enable --now embodied-lab
```

The environment template contains a placeholder HTTPS origin. Set the actual origin, or leave it empty for local-only access. The bundled service runs as `embodied-lab` from `/opt/embodied-lab`; that account and directory must already exist. `Restart=on-failure` and `KillMode=control-group` manage the service and its worker processes.

## 4. Authenticated HTTPS gateway

`spark-gateway.conf` demonstrates an HTTPS tunnel reaching a loopback nginx listener on **8088**, with an optional existing homepage on **8089**. These are example ports. Adapt the topology before installation; a server with no existing homepage can replace the fallback route with a redirect to `/simulation`.

`lab-proxy.conf` authenticates every lab route and forwards to port 8092. For HTTP Basic authentication, create a separate login interactively; the password is not passed in command arguments:

```bash
sudo apt-get install -y nginx apache2-utils
# -c creates a NEW file; omit it when updating an existing password file.
sudo htpasswd -cB /etc/nginx/embodied-lab.htpasswd operator
sudo chown root:www-data /etc/nginx/embodied-lab.htpasswd
sudo chmod 640 /etc/nginx/embodied-lab.htpasswd
sudo install -m 644 deploy/spark/lab-proxy.conf /etc/nginx/snippets/embodied-lab-proxy.conf
sudo install -m 644 deploy/spark/spark-gateway.conf /etc/nginx/sites-available/embodied-lab.conf
sudo ln -s /etc/nginx/sites-available/embodied-lab.conf /etc/nginx/sites-enabled/embodied-lab.conf
sudo nginx -t
sudo systemctl reload nginx
```

Configure the HTTPS gateway/tunnel separately. The example sets forwarded protocol to `https` because its listener is reached only by the trusted local HTTPS tunnel. For direct TLS termination in nginx, configure certificates and forwarding for that layout. Retain host/origin validation and verify that unauthenticated requests cannot reach lab APIs. Do not expose the backend port directly.

Back up existing gateway configuration before changing it. Keep unrelated homepage and inference services running; this repository does not require replacing them.

## 5. Verify and operate

```bash
sudo systemctl status embodied-lab nginx
sudo journalctl -u embodied-lab -n 100 --no-pager
curl --noproxy '*' -fsS http://127.0.0.1:8092/health
sudo systemctl restart embodied-lab
```

Check authenticated browser access, model connections, language switching, camera rendering, and existing homepage routes. Cold model loading and the first robot-geometry download may take minutes depending on memory pressure and network throughput.

For a fresh model, use `scripts/verify_rsi_inference.py` after preparing the cache. For a **migrated deployed model with its original training dataset present**, run:

```bash
MUJOCO_GL=osmesa EMBODIED_RSI_DEVICE=cuda HF_HUB_OFFLINE=1 \
  HF_HUB_CACHE="$PWD/hub" .venv-rsi/bin/python deploy/spark/verify_models.py
```

This requires `lab-config.json`, a valid current deployment, and the dataset referenced by its checkpoint. It performs transfer rollouts, an in-memory training update, and incremental/hierarchical RGB-D probes, restores the scorer, and verifies that the checkpoint hash is unchanged. It writes an ignored deployment report; it is not a convergence or release evaluation.

## Data migration and rollback

Use consistent SQLite backups. Keep checkpoint bytes unchanged; use a private `migration-paths.json` for previous roots. Clear active collection intentions in imported snapshots. Start new remote experiments explicitly.

Back up artifact stores separately from code. Restore the previous code, environment, and proxy configuration for rollback; do not overwrite experiment history with an old source snapshot. Source updates should not use a broad `rsync --delete` over caches, stores, or private settings.
