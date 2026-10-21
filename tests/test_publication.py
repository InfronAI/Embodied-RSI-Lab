"""Publication checks run without models, servers, or the simulator."""
import gzip
import importlib.util
import io
from pathlib import Path
import subprocess
import sys
import zipfile

SCRIPT = Path(__file__).resolve().parents[1] / "scripts/check_publication.py"
spec = importlib.util.spec_from_file_location("publication", SCRIPT)
publication = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publication)


def test_private_configuration_is_not_an_example():
    for name in [".env", ".env.production", "lab-config.json", "migration/archive.tar.gz", "hub/weights.bin"]:
        assert publication.private_path(name)
    for name in [".env.example", "lab-config.example.json", "deploy/spark/embodied-lab.env.example"]:
        assert not publication.private_path(name)


def test_archived_private_metadata_is_inspected():
    private = b"/" + b"home" + b"/private-operator/project/"
    assert publication.inspect_content("report.json.gz", gzip.compress(private))
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w") as archive:
        archive.writestr(".env", "EXAMPLE=value")
        archive.writestr("report.txt", private)
    result = publication.inspect_content("export.zip", buffer.getvalue())
    assert any(rule == "private file inside archive" for _, rule in result)
    assert any(rule == "personal home path" for _, rule in result)


def test_staged_check_reads_index_instead_of_clean_working_copy(tmp_path):
    subprocess.run(["git", "init", "-q", str(tmp_path)], check=True)
    report = tmp_path / "report.txt"
    report.write_text("/" + "home" + "/private-operator/project/")
    subprocess.run(["git", "add", "report.txt"], cwd=tmp_path, check=True)
    report.write_text("public example\n")
    staged = subprocess.run([sys.executable, str(SCRIPT), "--staged"], cwd=tmp_path, capture_output=True)
    working = subprocess.run([sys.executable, str(SCRIPT)], cwd=tmp_path, capture_output=True)
    assert staged.returncode == 1
    assert working.returncode == 0
