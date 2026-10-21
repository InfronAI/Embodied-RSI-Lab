# Secrets, private configuration, and publication

The public repository contains source, tests, reusable templates, and reviewed documentation. It does not distribute deployment credentials, server topology, private experiment stores, weights, or migration backups.

## Keep private

- API keys, tokens, SSH keys, passwords, keyring exports, and authentication hashes.
- Actual `.env`, `lab-config.json`, `migration-paths.json`, operator `AGENTS.md`, and deployment overrides.
- Internal domains, VPN addresses, SSH usernames, personal home paths, and private endpoint URLs.
- Runtime databases, traces, conversations, checkpoints, model caches, and archived workspaces.

Use examples with placeholders such as `lab.example.com`, `/opt/embodied-lab`, and the dedicated service account `embodied-lab`. Real values belong in protected files on the host.

## Before publishing

```bash
git diff --cached --stat
python scripts/check_publication.py --staged
gitleaks dir --redact --max-archive-depth 3 .
gitleaks git --redact .
```

The publication check rejects private runtime files and common machine-specific metadata. Gitleaks detects common secret formats in content/history. Inspect images, videos, and archives separately; no scanner proves every sensitive datum is absent.

The integrated publication uses a reviewed source snapshot on top of this repository's initial commit. Original copyright notices and links are preserved without importing old workspace Git metadata or migration archives.

## Deployment boundary

Bind to loopback and use authenticated HTTPS. Set the exact `EMBODIED_LAB_PUBLIC_ORIGIN`; retain origin checks. Run as an unprivileged service user, protect the environment file, and preserve unrelated services when installing the gateway.

## Reporting

Report suspected exposure privately to the maintainers through an available private GitHub security channel. Do not include secrets in public issues. Revoke or rotate exposed credentials before removing their traces from files and history.
