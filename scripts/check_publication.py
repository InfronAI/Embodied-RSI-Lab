"""Check tracked/index content for private runtime files and host metadata.

Reports file names and rule names only. Run Gitleaks separately for credentials.
"""
from __future__ import annotations

import argparse
import gzip
import io
from pathlib import Path
import re
import subprocess
import zipfile

PRIVATE_ROOTS = {"artifacts", "checkpoints", "data", "hub", "models", "migration", "vendor", "node_modules"}
PRIVATE_FILES = {"AGENTS.md", "lab-config.json", "migration-paths.json", "MUJOCO_LOG.TXT"}
PRIVATE_SUFFIXES = {".pem", ".key", ".p12", ".pfx", ".htpasswd", ".db", ".sqlite", ".sqlite3",
                    ".safetensors", ".pt", ".pth", ".ckpt", ".bundle"}
RULES = {
    "personal home path": re.compile(rb"/(?:Users|home)/(?!runner(?:/|\b))[^/\s\"']+/"),
    "private tailnet hostname": re.compile(rb"\b[a-z0-9-]+\.tail[a-z0-9]+\.ts\.net\b", re.I),
    "private key material": re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
}
MAX_BYTES = 64 * 1024 * 1024


def private_path(name):
    path = Path(name)
    return (path.parts[0] in PRIVATE_ROOTS or path.parts[0].startswith(".venv")
            or name in PRIVATE_FILES or name.startswith("deploy/private/")
            or path.suffix in PRIVATE_SUFFIXES or path.name in {".env", "id_rsa", "id_ed25519"}
            or (path.name.startswith(".env.") and path.name != ".env.example"))


def inspect_content(name, data, depth=0):
    findings = []
    if len(data) > MAX_BYTES:
        return [(name, "file exceeds inspection limit; review separately")]
    for rule, pattern in RULES.items():
        if pattern.search(data):
            findings.append((name, rule))
    if depth >= 3:
        return findings
    try:
        if name.endswith(".gz"):
            with gzip.GzipFile(fileobj=io.BytesIO(data)) as stream:
                decoded = stream.read(MAX_BYTES + 1)
            findings.extend(inspect_content(name + "::decoded", decoded, depth + 1))
        elif name.endswith(".zip"):
            with zipfile.ZipFile(io.BytesIO(data)) as archive:
                for member in archive.infolist():
                    if member.is_dir():
                        continue
                    member_name = name + "::" + member.filename
                    if private_path(member.filename):
                        findings.append((member_name, "private file inside archive"))
                    if member.file_size > MAX_BYTES:
                        findings.append((member_name, "archive member exceeds inspection limit"))
                    else:
                        findings.extend(inspect_content(member_name, archive.read(member), depth + 1))
    except (OSError, ValueError, zipfile.BadZipFile):
        findings.append((name, "archive could not be inspected"))
    return findings


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--staged", action="store_true", help="Inspect index bytes, not working-tree bytes")
    args = parser.parse_args()
    root = Path(subprocess.check_output(["git", "rev-parse", "--show-toplevel"], text=True).strip())
    paths = subprocess.check_output(["git", "ls-files", "-z"], cwd=root).decode().split("\0")
    findings = []
    count = 0
    for name in filter(None, paths):
        count += 1
        if private_path(name):
            findings.append((name, "private runtime/configuration file"))
        if args.staged:
            data = subprocess.check_output(["git", "show", ":" + name], cwd=root)
        else:
            path = root / name
            if path.is_symlink():
                findings.append((name, "symlink requires explicit publication review"))
                continue
            data = path.read_bytes()
        findings.extend(inspect_content(name, data))
    for name, rule in findings:
        print(f"{name}: {rule}")
    print(f"Publication check: {count} tracked files; {len(findings)} findings.")
    return int(bool(findings))


if __name__ == "__main__":
    raise SystemExit(main())
