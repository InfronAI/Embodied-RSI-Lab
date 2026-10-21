"""One durable, paginated event stream for experiments and the learning loop."""
from __future__ import annotations

import json

from fastapi import HTTPException, Query
from fastapi.responses import StreamingResponse

PHASES = {
    "perception": "感知探测", "decision": "决策选择", "filter": "轨迹过滤",
    "training": "拟合训练", "evaluation": "独立评测", "deployment": "模型部署",
    "action": "物理执行", "system": "系统状态",
}
TITLES = {
    "perception": "读取感知与场景状态", "decision_request": "提交模型输入与候选",
    "decision_response": "模型返回与动作选择", "trajectory_preview": "动作预演与碰撞过滤",
    "action_detail": "物理执行结果与前后观测", "trajectory_filter": "轨迹筛选结果",
    "filter_summary": "训练数据筛选汇总", "fit_started": "开始拟合成功轨迹",
    "checkpoint_selected": "按开发场景表现选择检查点",
    "release_gate": "独立评测发布门槛", "deployment_warmup": "部署前模型预热",
    "deployment_verified": "检查点校验通过", "deployment_committed": "部署版本已更新",
    "metric": "更新训练或评测指标", "started": "任务启动", "completed": "任务完成",
    "failed": "任务失败", "cancelled": "任务已中断", "episode": "本局结果",
    "auto_training": "自动训练触发", "resources": "采样设备资源",
}

# This expression is shared by filtering, pagination and export; a cursor always refers
# to the SQLite event sequence, including rows written by background training processes.
CATEGORY = """CASE
 WHEN e.kind IN ('perception','perception_failed','observation') OR json_extract(e.payload,'$.category')='observation' THEN 'perception'
 WHEN e.kind IN ('decision_request','decision_response') OR json_extract(e.payload,'$.category') IN ('decision','model','planning') THEN 'decision'
 WHEN e.kind IN ('trajectory_preview','trajectory_filter','filter_summary') OR json_extract(e.payload,'$.category')='safety' THEN 'filter'
 WHEN e.kind='action_detail' OR json_extract(e.payload,'$.category') IN ('action','physics','feedback') THEN 'action'
 WHEN e.kind LIKE 'deployment_%' OR r.kind='deploy' OR json_extract(e.payload,'$.stage')='deploying' THEN 'deployment'
 WHEN e.kind='release_gate' OR r.kind='evaluate' OR json_extract(e.payload,'$.stage')='independent_evaluation' THEN 'evaluation'
 WHEN e.kind IN ('fit_started','checkpoint_selected') OR r.kind IN ('train','self-train','initialize','task-train')
      OR json_extract(e.payload,'$.stage')='success_replay_training' THEN 'training'
 ELSE 'system' END"""


def trace_episode(store, run_id, **context):
    def trace(event, payload):
        store.event(run_id, event, {**context, **payload})
    return trace


def install_logs(app, store, diagnostics):
    def where(after=0, before=None, phase="all", run="", search=""):
        clauses, values = ["e.seq>?"], [after]
        if before is not None:
            clauses.append("e.seq<?")
            values.append(before)
        if phase != "all":
            if phase not in PHASES:
                raise HTTPException(400, "Unknown log phase")
            clauses.append(f"({CATEGORY})=?")
            values.append(phase)
        if run:
            clauses.append("e.run_id=?")
            values.append(run)
        if search:
            clauses.append("(e.kind LIKE ? ESCAPE '\\' OR e.payload LIKE ? ESCAPE '\\' OR e.run_id LIKE ? ESCAPE '\\')")
            escaped = search.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")
            values.extend([f"%{escaped}%"] * 3)
        return " AND ".join(clauses), values

    def read_rows(after=0, before=None, phase="all", run="", search="", limit=100, newest=False):
        condition, values = where(after, before, phase, run, search)
        with store.connect() as db:
            rows = db.execute(
                f"SELECT e.*,r.kind AS run_kind,r.backend,({CATEGORY}) AS phase "
                f"FROM events e LEFT JOIN runs r ON r.id=e.run_id WHERE {condition} "
                f"ORDER BY e.seq {'DESC' if newest else 'ASC'} LIMIT ?",
                [*values, limit]).fetchall()
        result = []
        for row in rows:
            value = dict(row)
            value["payload"] = json.loads(value["payload"])
            payload = value["payload"]
            value["message"] = payload.get("message") or TITLES.get(value["kind"], value["kind"])
            value["level"] = payload.get("level") or payload.get("severity") or (
                "error" if value["kind"] == "failed" else "info")
            value["phase_name"] = PHASES[value["phase"]]
            result.append(diagnostics._clean(value))
        return result

    @app.get("/api/lab/logs")
    def logs(after: int = Query(0, ge=0), before: int | None = Query(None, ge=1),
             phase: str = "all", run: str = "", search: str = Query("", max_length=200),
             limit: int = Query(100, ge=1, le=250), newest: bool = False):
        if before is not None and after:
            raise HTTPException(400, "Use before or after, not both")
        rows = read_rows(after, before, phase, run, search, limit + 1, newest or before is not None)
        more = len(rows) > limit
        rows = rows[:limit]
        with store.connect() as db:
            latest = db.execute("SELECT COALESCE(MAX(seq),0) FROM events").fetchone()[0]
        return {"entries": rows, "has_more": more, "latest": latest,
                "next_cursor": max((r["seq"] for r in rows), default=after),
                "oldest_cursor": min((r["seq"] for r in rows), default=before),
                "phases": PHASES}

    @app.get("/api/lab/logs/export")
    def export(phase: str = "all", run: str = "", search: str = Query("", max_length=200)):
        where(phase=phase, run=run, search=search)  # Validate before sending headers.
        with store.connect() as db:
            end = db.execute("SELECT COALESCE(MAX(seq),0) FROM events").fetchone()[0]

        def content():
            cursor = 0
            while cursor < end:
                rows = read_rows(cursor, end + 1, phase, run, search, 100)
                if not rows:
                    break
                for row in rows:
                    yield json.dumps(row, ensure_ascii=False) + "\n"
                cursor = rows[-1]["seq"]
        return StreamingResponse(content(), media_type="application/x-ndjson",
                                 headers={"Content-Disposition": 'attachment; filename="embodied-lab-process.jsonl"'})
