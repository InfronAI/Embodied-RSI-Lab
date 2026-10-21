"""Relocate artifact references without modifying immutable checkpoint contents."""
from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path


@lru_cache(maxsize=1)
def aliases():
    root = Path(__file__).resolve().parents[2]
    config = root / "migration-paths.json"
    if not config.is_file():
        return {}
    return {prefix: str(root) for prefix in json.loads(config.read_text()).get("previous_roots", [])}


def relocate(value):
    if isinstance(value, str):
        for previous, current in aliases().items():
            if value == previous or value.startswith(previous + "/"):
                return current + value[len(previous):]
        return value
    if isinstance(value, dict):
        return {key: relocate(item) for key, item in value.items()}
    if isinstance(value, list):
        return [relocate(item) for item in value]
    return value
