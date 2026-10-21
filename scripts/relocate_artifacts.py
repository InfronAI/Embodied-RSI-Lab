"""Update mutable artifact references after moving a lab; never rewrite checkpoints.

The optional watcher removes an explicitly listed compatibility symlink only after
no process is using it. It never removes a directory or follows an arbitrary link.
"""
from __future__ import annotations

import argparse
import json
import os
import sqlite3
import time
from pathlib import Path


def relocate_artifacts(root, previous, backup=False):
    root = Path(root).resolve()
    previous = str(Path(previous).absolute())
    replaced = {"json": 0, "databases": 0}
    backups = root / "artifacts/migration/path-backups"
    for path in (root / "artifacts").rglob("*.json"):
        if "migration" in path.relative_to(root / "artifacts").parts or "checkpoint" in path.parts:
            continue
        text = path.read_text()
        if previous not in text:
            continue
        json.loads(text)
        if backup:
            target = backups / path.relative_to(root)
            target.parent.mkdir(parents=True, exist_ok=True)
            if not target.exists():
                target.write_text(text)
        updated = text.replace(previous, str(root))
        temporary = path.with_suffix(".relocating")
        temporary.write_text(updated)
        os.replace(temporary, path)
        replaced["json"] += 1
    for path in (root / "artifacts").rglob("monitor.sqlite3"):
        if "migration" in path.relative_to(root / "artifacts").parts:
            continue
        with sqlite3.connect(path, timeout=30) as db:
            if backup:
                target = backups / path.relative_to(root)
                target.parent.mkdir(parents=True, exist_ok=True)
                if not target.exists():
                    with sqlite3.connect(target) as destination:
                        db.backup(destination)
            for table, columns in {"runs": ["config", "summary"], "events": ["payload"]}.items():
                for column in columns:
                    db.execute(f"UPDATE {table} SET {column}=replace({column},?,?) WHERE instr({column},?)>0",
                               (previous, str(root), previous))
            db.commit()
            replaced["databases"] += 1
    return replaced


def users_of_path(previous):
    import psutil
    active = []
    for process in psutil.process_iter(["pid", "cmdline"]):
        if process.pid == os.getpid():
            continue
        args = process.info["cmdline"] or []
        if any(arg == str(previous) or arg.startswith(str(previous) + "/") for arg in args):
            active.append(process.pid)
    return active


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--previous", type=Path, required=True)
    parser.add_argument("--backup", action="store_true")
    parser.add_argument("--watch", action="store_true")
    args = parser.parse_args()
    root = args.root.resolve()
    report = root / "artifacts/migration/path-migration.json"
    report.parent.mkdir(parents=True, exist_ok=True)
    if args.watch:
        if not args.previous.is_symlink() or args.previous.resolve() != root:
            raise ValueError("The compatibility path must be a symlink to this lab")
        while active := users_of_path(args.previous):
            report.write_text(json.dumps({"status": "waiting_for_existing_jobs", "pids": active,
                                         "previous": str(args.previous), "root": str(root)}))
            time.sleep(15)
    result = relocate_artifacts(root, args.previous, args.backup)
    if args.watch:
        if args.previous.is_symlink() and args.previous.resolve() == root:
            args.previous.unlink()
        else:
            raise ValueError("Compatibility path changed; leaving it untouched")
    report.write_text(json.dumps({"status": "complete", "root": str(root), **result}))
    print(json.dumps(result))


if __name__ == "__main__":
    main()
