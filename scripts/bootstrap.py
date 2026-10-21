"""Fetch exact upstream commits and install isolated environments with uv."""
from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path


def run(*args, cwd=None):
    subprocess.run([str(a) for a in args], cwd=cwd, check=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--rsi", action="store_true", help="Also install the dedicated RSI / PyTorch environment")
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    lock = json.loads((root / "upstreams.lock.json").read_text())
    for name, upstream in lock.items():
        if name == "embodied-jev":
            continue  # Integrated in src/embodied_jev; no second editable checkout.
        directory = root / "vendor" / name
        if not directory.exists():
            directory.parent.mkdir(exist_ok=True)
            run("git", "clone", "--depth", "1", upstream["url"], directory)
        actual = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=directory, text=True).strip()
        if actual != upstream["commit"]:
            dirty = subprocess.check_output(["git", "status", "--porcelain"], cwd=directory, text=True)
            if dirty:
                raise RuntimeError(f"Refusing to overwrite modified upstream: {directory}")
            run("git", "fetch", "--depth", "1", "origin", upstream["commit"], cwd=directory)
        run("git", "checkout", "--detach", upstream["commit"], cwd=directory)
        if name == "RSI-Jev":
            patch = root / "deploy/spark/rsi-loader-memory.patch"
            if patch.exists():
                already_applied = subprocess.run(
                    ["git", "apply", "--reverse", "--check", str(patch)], cwd=directory,
                    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                ).returncode == 0
                if not already_applied:
                    run("git", "apply", "--check", patch, cwd=directory)
                    run("git", "apply", patch, cwd=directory)
    env = root / ".venv"
    if not env.exists():
        run("uv", "venv", env)
    run("uv", "pip", "install", "--python", env / "bin/python", "-c", root / "constraints-simulation.txt", "-e", f"{root}[test]")
    if args.rsi:
        env_rsi = root / ".venv-rsi"
        if not env_rsi.exists():
            run("uv", "venv", env_rsi)
        run("uv", "pip", "install", "--python", env_rsi / "bin/python", "-c", root / "constraints-simulation.txt", "-e", root,
            "-e", root / "vendor/RSI-Jev")
    print("Build UI: npm ci && npm run build")
    print("Ready: .venv/bin/embodied-lab serve → http://127.0.0.1:8092/simulation")


if __name__ == "__main__":
    main()
