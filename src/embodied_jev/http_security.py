"""Explicit public origin for deployments behind a trusted local reverse proxy."""
from __future__ import annotations

import os
from urllib.parse import urlsplit

LOCAL_HOSTS = {"localhost", "127.0.0.1", "::1", "testserver"}


def public_origin():
    value = os.environ.get("EMBODIED_LAB_PUBLIC_ORIGIN", "").strip().rstrip("/")
    if not value:
        return None
    url = urlsplit(value)
    if (url.scheme not in {"http", "https"} or not url.hostname or url.username or url.password
            or url.path or url.query or url.fragment):
        raise ValueError("EMBODIED_LAB_PUBLIC_ORIGIN must be an HTTP(S) origin without a path")
    # Accessing port also validates its syntax and range.
    port = url.port
    host = f"[{url.hostname}]" if ":" in url.hostname else url.hostname
    suffix = f":{port}" if port and port != {"http": 80, "https": 443}[url.scheme] else ""
    return f"{url.scheme}://{host}{suffix}"


def request_origin(request):
    return f"{request.url.scheme}://{request.url.netloc}"


def allowed_host(request, configured_origin):
    return request.url.hostname in LOCAL_HOSTS or (
        configured_origin is not None and request_origin(request) == configured_origin)


def workbench_origins(request, configured_origin):
    if configured_origin and request_origin(request) == configured_origin:
        return {configured_origin}
    if request.url.hostname not in LOCAL_HOSTS:
        return set()
    return {f"http://127.0.0.1:{request.url.port}", f"http://localhost:{request.url.port}"}
