"""Execution settings shared by collection, replay fitting and release evaluation."""
from __future__ import annotations

import json

CONTROL_MODES = ("skills", "incremental", "hierarchical")
OBSERVATION_MODES = ("privileged", "rgbd")
DEFAULT_EXECUTION = {"control_mode": "skills", "observation_mode": "privileged", "camera_views": []}


def execution_settings(value=None):
    value = value or {}
    unknown = set(value) - set(DEFAULT_EXECUTION)
    if unknown:
        raise ValueError("Unknown execution settings: " + ", ".join(sorted(unknown)))
    control = value.get("control_mode", "skills")
    observation = value.get("observation_mode", "privileged")
    if control not in CONTROL_MODES:
        raise ValueError("Unknown control mode")
    if observation == "vision":
        raise ValueError("当前 RSI checkpoint 仅支持文本／结构化状态，不能直接输入图像；请选择 RGB-D 视觉或仿真真值")
    if observation not in OBSERVATION_MODES:
        raise ValueError("Unknown observation mode")
    cameras = value.get("camera_views")
    if cameras is None:
        cameras = ["external", "wrist"] if observation == "rgbd" else []
    if not isinstance(cameras, (list, tuple)) or any(v not in {"external", "wrist"} for v in cameras):
        raise ValueError("相机视角只能是 external 或 wrist")
    if len(cameras) != len(set(cameras)):
        raise ValueError("相机视角不能重复")
    if observation == "rgbd" and not cameras:
        raise ValueError("RGB-D 观测至少需要启用一个相机")
    return {"control_mode": control, "observation_mode": observation,
            "camera_views": [view for view in ("external", "wrist") if view in cameras]}


def execution_key(value=None):
    return json.dumps(execution_settings(value), sort_keys=True, separators=(",", ":"))


def episode_execution(episode):
    return execution_settings(episode.get("execution") or episode.get("episode_protocol", {}).get("execution") or {
        "control_mode": episode.get("control_mode", "skills"),
        "observation_mode": episode.get("observation_mode", "privileged"),
        "camera_views": episode.get("camera_views", []),
    })
