"""App-scoped, bounded execution traces for the local workbench.

Separate from the metadata-only rotating application log. Credentials are
redacted before storage; image bodies and unvalidated upstream responses are
never retained here.
"""
from __future__ import annotations

from collections import deque
from datetime import datetime, timezone
import hashlib
import json
import math
import re
import threading
import uuid


class RunLog:
    def __init__(self, max_entries=6000, max_bytes=16 * 1024 * 1024, max_entry_bytes=96 * 1024):
        self.stream_id = uuid.uuid4().hex
        self.max_entries = max_entries
        self.max_bytes = max_bytes
        self.max_entry_bytes = min(max_entry_bytes, max_bytes)
        self._lock = threading.RLock()
        self._entries = deque()
        self._bytes = 0
        self._sequence = 0
        self._secrets = ()
        self.sink = None

    def register_secrets(self, secrets):
        # Keep retired keys redacted too, including requests still in flight.
        with self._lock:
            self._secrets = tuple(sorted(set(self._secrets) | {s for s in secrets if s}, key=len, reverse=True))

    def _clean(self, value, field=""):
        normalized = re.sub(r"[^a-z]", "", field.lower())
        if normalized in {"key", "apikey", "authorization", "password", "secret",
                          "accesstoken", "refreshtoken", "cookie", "headers"}:
            return "[已隐藏]"
        if isinstance(value, bytes):
            return {"byte_length": len(value), "sha256": hashlib.sha256(value).hexdigest(),
                    "content": "[图像或二进制内容省略]"}
        if isinstance(value, str):
            if value.startswith("data:image/"):
                return {"encoded_length": len(value), "content": "[图像内容省略]"}
            for secret in self._secrets:
                value = value.replace(secret, "[已隐藏]")
            return value
        if isinstance(value, dict):
            if value.get("type") == "base64" and str(value.get("media_type", "")).startswith("image/"):
                return {"type": "base64", "media_type": value["media_type"],
                        "encoded_length": len(value.get("data", "")), "content": "[图像内容省略]"}
            return {self._clean(str(k)): self._clean(v, str(k)) for k, v in value.items()}
        if isinstance(value, (list, tuple)):
            return [self._clean(item) for item in value]
        if value is None or type(value) in {bool, int}:
            return value
        if type(value) is float:
            return value if math.isfinite(value) else str(value)
        return f"[{type(value).__name__}]"

    def emit(self, event, message, *, category="runtime", level="debug", details=None, **context):
        with self._lock:
            self._sequence += 1
            entry = self._clean({
                **context, "id": self._sequence, "time": datetime.now(timezone.utc).isoformat(),
                "event": event, "message": message, "category": category, "level": level,
                "details": details,
            })
            if self.sink is not None:
                # Durable logs retain the full redacted record, before ring-buffer truncation.
                self.sink(entry)
            encoded = json.dumps(entry, ensure_ascii=False, separators=(",", ":")).encode()
            if len(encoded) > self.max_entry_bytes:
                entry["details"] = {"truncated": True, "original_bytes": len(encoded),
                                    "reason": "单条日志超过大小限制",
                                    "preview": json.dumps(entry["details"], ensure_ascii=False)[:self.max_entry_bytes // 12]}
                encoded = json.dumps(entry, ensure_ascii=False, separators=(",", ":")).encode()
            self._entries.append((entry, len(encoded)))
            self._bytes += len(encoded)
            while len(self._entries) > self.max_entries or self._bytes > self.max_bytes:
                _, size = self._entries.popleft()
                self._bytes -= size

    def read(self, after=0, limit=250):
        with self._lock:
            if after > self._sequence:
                after = 0
            oldest = self._entries[0][0]["id"] if self._entries else self._sequence + 1
            entries = [entry for entry, _ in self._entries if entry["id"] > after][:limit]
            cursor = entries[-1]["id"] if entries else max(after, self._sequence)
            # Re-redact in case a key was configured after a row was recorded.
            return self._clean({
                "stream_id": self.stream_id, "entries": entries, "next_cursor": cursor,
                "latest": self._sequence, "oldest": oldest, "has_more": cursor < self._sequence,
                "retained": len(self._entries), "dropped": oldest - 1,
                "missing": max(0, oldest - after - 1),
                "max_entries": self.max_entries, "max_bytes": self.max_bytes,
            })

    def export(self):
        with self._lock:
            return [self._clean(entry) for entry, _ in self._entries]
