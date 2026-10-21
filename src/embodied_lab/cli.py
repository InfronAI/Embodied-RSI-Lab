"""Unified entry point; the RSI CLI remains available for reproducible jobs."""
from __future__ import annotations

import json
import sys
from pathlib import Path


def main():
    from embodied_rsi.cli import main as run
    root = Path(__file__).resolve().parents[2]
    config_path = root / "lab-config.json"
    config = json.loads(config_path.read_text()) if config_path.exists() else {}
    args = sys.argv[1:]
    if not args or args == ["serve"]:
        artifacts = Path(config.get("artifacts", "artifacts"))
        if not artifacts.is_absolute():
            artifacts = root / artifacts
        args = ["--artifacts", str(artifacts), "dashboard", "--port", str(config.get("port", 8092))]
        interpreter = root / ".venv-rsi/bin/python"
        if interpreter.is_file():
            args += ["--rsi-python", str(interpreter)]
    sys.argv = [sys.argv[0], *args]
    run()


if __name__ == "__main__":
    main()
