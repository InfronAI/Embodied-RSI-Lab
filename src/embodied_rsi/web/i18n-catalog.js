// Shared UI messages. Placeholders preserve runtime values; raw model data is not translated.
globalThis.EmbodiedMessages = [
  [
    "移至物体上方",
    "Move above object"
  ],
  [
    "下降对准",
    "Align and descend"
  ],
  [
    "闭合夹爪",
    "Close gripper"
  ],
  [
    "抬升物体",
    "Lift object"
  ],
  [
    "移向目标",
    "Move to target"
  ],
  [
    "降低放置",
    "Lower to place"
  ],
  [
    "松开夹爪",
    "Open gripper"
  ],
  [
    "向上撤离",
    "Retract upward"
  ],
  [
    "张开重试",
    "Open and retry"
  ],
  [
    "完成",
    "Complete"
  ],
  [
    "逐步 XYZ 决策",
    "Incremental XYZ decision"
  ],
  [
    "分层 XYZ 决策",
    "Hierarchical XYZ decision"
  ],
  [
    "尚未开始",
    "Not started"
  ],
  [
    "已就绪",
    "Ready"
  ],
  [
    "等待运行",
    "Waiting to run"
  ],
  [
    "运行中",
    "Running"
  ],
  [
    "已暂停",
    "Paused"
  ],
  [
    "全部结束",
    "All finished"
  ],
  [
    "已停止",
    "Stopped"
  ],
  [
    "任务成功",
    "Task succeeded"
  ],
  [
    "低于决策门槛",
    "Below decision threshold"
  ],
  [
    "预算耗尽",
    "Budget exhausted"
  ],
  [
    "执行异常",
    "Execution error"
  ],
  [
    "决策停滞",
    "Decision stalled"
  ],
  [
    "腕部",
    "Wrist"
  ],
  [
    "外部",
    "External"
  ],
  [
    "与",
    " and "
  ],
  [
    "同一任务 · 独立决策",
    "Same task · Independent decisions"
  ],
  [
    "模型对比",
    "Compare"
  ],
  [
    "相同起点，观察不同模型如何选择和执行。实时画面各自推进，回放按仿真时间对齐。",
    "Compare how models choose and act from the same starting point. Live views advance independently; replays align by simulation time."
  ],
  [
    "对比设置",
    "Comparison settings"
  ],
  [
    "选择 2–3 个模型",
    "Select 2–3 models"
  ],
  [
    "共同任务",
    "Shared task"
  ],
  [
    "搬运入盘",
    "Transfer to tray"
  ],
  [
    "方块堆叠",
    "Stack blocks"
  ],
  [
    "越障搬运",
    "Transfer over obstacle"
  ],
  [
    "运行方式",
    "Run mode"
  ],
  [
    "依次运行 · 更省资源",
    "Sequential · Lower resource use"
  ],
  [
    "并行运行 · 最多 2 路",
    "Parallel · Up to 2 lanes"
  ],
  [
    "比较数量",
    "Number of models"
  ],
  [
    "2 个模型",
    "2 models"
  ],
  [
    "3 个模型",
    "3 models"
  ],
  [
    "共同执行参数",
    "Shared execution settings"
  ],
  [
    "随机种子",
    "Random seed"
  ],
  [
    "动作预算",
    "Action budget"
  ],
  [
    "概率门槛",
    "Probability threshold"
  ],
  [
    "执行速度",
    "Execution speed"
  ],
  [
    "共同动作决策",
    "Shared action mode"
  ],
  [
    "预设技能选择",
    "Skill selection"
  ],
  [
    "逐步 XYZ · 闭环规划",
    "Incremental XYZ · Closed-loop planning"
  ],
  [
    "分层 XYZ · 子目标规划",
    "Hierarchical XYZ · Subgoal planning"
  ],
  [
    "共同观测来源",
    "Shared observation source"
  ],
  [
    "仿真真值 · 默认",
    "Simulator state · Default"
  ],
  [
    "RGB-D 视觉 · 实验",
    "RGB-D vision · Experimental"
  ],
  [
    "直接图像 · 多模态模型",
    "Direct images · Multimodal model"
  ],
  [
    "共同启用相机",
    "Shared cameras"
  ],
  [
    "无相机",
    "No cameras"
  ],
  [
    "仅外部相机",
    "External camera only"
  ],
  [
    "仅腕部相机",
    "Wrist camera only"
  ],
  [
    "双相机",
    "Both cameras"
  ],
  [
    "动作预演",
    "Action preview"
  ],
  [
    "低置信度人工介入",
    "Human intervention on low confidence"
  ],
  [
    "门槛仅用于原生候选概率。RGB-D 模式发送检测坐标；直接图像模式发送所选相机的 RGB 及机器人自身状态，不提供物体/目标坐标，需要逐步 XYZ 和支持图像的 Chat / Claude 模型。各路独立采集观测。",
    "The threshold applies only to native candidate probabilities. RGB-D sends detected coordinates. Direct images send RGB from selected cameras and robot state, without object or target coordinates; this requires incremental XYZ and a vision-capable Chat / Claude model. Each lane captures its own observations."
  ],
  [
    "无相机 · 模型使用仿真真值，非视觉输入。",
    "No cameras · The model uses simulator state, not vision."
  ],
  [
    "API 地址和 Key 继承默认连接或「模型配置」。这里可覆盖模型 ID；填写名称不代表账号已获使用权限。未配置 API 时可先用两个规则基线体验。",
    "API URL and key come from the default connection or Models. You may override the model ID here; entering an ID does not grant access. Try two rule baselines if no API is configured."
  ],
  [
    "开始对比",
    "Start comparison"
  ],
  [
    "暂停",
    "Pause"
  ],
  [
    "停止",
    "Stop"
  ],
  [
    "导出记录",
    "Export records"
  ],
  [
    "实时 · 各路独立推进",
    "Live · Lanes advance independently"
  ],
  [
    "播放回放",
    "Play replay"
  ],
  [
    "对比统一仿真时间轴",
    "Shared simulation timeline"
  ],
  [
    "返回实时",
    "Back to live"
  ],
  [
    "选择模型后开始对比，真实场景和决策会显示在这里。",
    "Choose models and start a comparison to see their scenes and decisions here."
  ],
  [
    "模型 {0}",
    "Model {0}"
  ],
  [
    "决策接口",
    "Decision interface"
  ],
  [
    "模型 {2} 决策接口",
    "Model {2} interface"
  ],
  [
    "模型 ID",
    "Model ID"
  ],
  [
    "可选覆盖",
    "Optional override"
  ],
  [
    "模型 {5} 模型 ID",
    "Model {5} ID"
  ],
  [
    "继承已有配置",
    "Use saved settings"
  ],
  [
    "{0}相机仅供查看；模型使用仿真真值，非视觉输入。",
    "{0} camera is for preview only; the model uses simulator state."
  ],
  [
    "每路独立采集{0}相机观测。",
    "Each lane captures its own {0} camera observations."
  ],
  [
    "已关闭相机，模型使用仿真真值（非视觉输入）。",
    "Cameras off; the model uses simulator state, not vision."
  ],
  [
    "共同场景：{0} · 待开始时应用于所有模型。",
    "Shared scene: {0} · Applied to all models when started."
  ],
  [
    "自定义预设",
    "Custom preset"
  ],
  [
    "重新运行",
    "Run again"
  ],
  [
    "继续",
    "Resume"
  ],
  [
    "规则选择 · 无模型概率",
    "Rule selection · No model probabilities"
  ],
  [
    "候选 token 分数归一化",
    "Normalized candidate token scores"
  ],
  [
    "官方 API 返回候选概率",
    "Candidate probabilities from the official API"
  ],
  [
    "结构化 API 返回候选概率",
    "Candidate probabilities from the structured API"
  ],
  [
    "结构化选择 · 不提供候选概率",
    "Structured selection · No candidate probabilities"
  ],
  [
    "工具选择 · 不提供候选概率",
    "Tool selection · No candidate probabilities"
  ],
  [
    "等待决策",
    "Waiting for a decision"
  ],
  [
    "{0} · 已选择",
    "{0} · Selected"
  ],
  [
    "回放 {0} s{1}",
    "Replay {0} s{1}"
  ],
  [
    "· 末帧",
    "· Final frame"
  ],
  [
    "模型输入 · {0} RGB + 自身状态；物体/目标由图像判断",
    "Model input · {0} RGB + robot state; objects and targets inferred from images"
  ],
  [
    "模型输入 · RGB-D 检测坐标 + 接触传感器",
    "Model input · RGB-D detections + contact sensors"
  ],
  [
    "非视觉输入 · 仿真真值{0}",
    "State input · Simulator state{0}"
  ],
  [
    "；相机仅供查看",
    "; cameras for preview only"
  ],
  [
    "；无相机",
    "; no cameras"
  ],
  [
    "该仿真时刻的决策",
    "Decision at this simulation time"
  ],
  [
    "上一条选择 · 新决策计算中",
    "Previous choice · Computing next decision"
  ],
  [
    "当前决策",
    "Current decision"
  ],
  [
    "行动意图",
    "Action intent"
  ],
  [
    "阶段选择",
    "Phase selection"
  ],
  [
    "未提供行动意图",
    "No action intent provided"
  ],
  [
    "正常执行",
    "Normal execution"
  ],
  [
    "减速执行",
    "Slow execution"
  ],
  [
    "保持不动",
    "Hold position"
  ],
  [
    "等待选择",
    "Waiting for selection"
  ],
  [
    "{0} · 夹爪{1}",
    "{0} · Gripper: {1}"
  ],
  [
    "ΔXYZ 未记录",
    "ΔXYZ not recorded"
  ],
  [
    "张开",
    "Open"
  ],
  [
    "闭合",
    "Closed"
  ],
  [
    "保持",
    "Hold"
  ],
  [
    "模型尚未提供视觉依据",
    "No visual reasoning provided yet"
  ],
  [
    "本步输入为结构化观测",
    "This step uses structured observations"
  ],
  [
    "双侧抓持",
    "Two-sided grasp"
  ],
  [
    "单侧接触",
    "One-sided contact"
  ],
  [
    "无物体接触",
    "No object contact"
  ],
  [
    "无模型调用",
    "No model calls"
  ],
  [
    "整轮累计统计（非该帧）",
    "Episode totals (not this frame)"
  ],
  [
    "本路累计统计",
    "Lane totals"
  ],
  [
    "调用 {0} 次 · 输入 {1} / 输出 {2} tokens · 时长 {3} s",
    "{0} calls · {1} input / {2} output tokens · {3} s"
  ],
  [
    "本路已到达当前录制末帧。",
    "This lane has reached its last recorded frame."
  ],
  [
    "加载场景…",
    "Loading scene…"
  ],
  [
    "模型 {1} · {2}",
    "Model {1} · {2}"
  ],
  [
    "复位视角",
    "Reset view"
  ],
  [
    "俯视",
    "Top view"
  ],
  [
    "动作输出",
    "Action output"
  ],
  [
    "本步动作",
    "Current action"
  ],
  [
    "视觉依据",
    "Visual reasoning"
  ],
  [
    "物理成功与规划能力需分别检验。",
    "Physical success and planning ability need separate evaluation."
  ],
  [
    "末端 X / Y / Z · m",
    "End effector X / Y / Z · m"
  ],
  [
    "夹爪 / 接触",
    "Gripper / Contact"
  ],
  [
    "仿真时间",
    "Simulation time"
  ],
  [
    "本次推理耗时",
    "Inference latency"
  ],
  [
    "{0} 机械臂三维场景",
    "{0} robot scene"
  ],
  [
    "共同录制 {0} s · 最长 {1} s",
    "Shared recording {0} s · Longest {1} s"
  ],
  [
    "比较已更新，请检查当前状态后再操作。",
    "Comparison changed. Check its current state before continuing."
  ],
  [
    "直接图像需要「逐步 XYZ」动作决策。请修改共同执行参数。",
    "Direct images require incremental XYZ. Update the shared execution settings."
  ],
  [
    "直接图像要求每一路使用支持图像的 Chat 或 Claude 模型，请修改模型接口。",
    "Every lane must use a vision-capable Chat or Claude model for direct images. Change the model interfaces."
  ],
  [
    "比较已更新，请检查当前状态后再创建。",
    "Comparison changed. Check its current state before creating another."
  ],
  [
    "请先在实验台配置该模型连接，再开始对比。",
    "Configure this model connection in the workbench first."
  ],
  [
    "{0} 路 · {1} · {2}",
    "{0} lanes · {1} · {2}"
  ],
  [
    "最多两路并行",
    "Up to two parallel lanes"
  ],
  [
    "依次运行",
    "Sequential"
  ],
  [
    "暂停未完成，请稍后再回放。",
    "Pause is pending. Wait before replaying."
  ],
  [
    "录制回放 · 按统一仿真时间对齐",
    "Recorded replay · Aligned by simulation time"
  ],
  [
    "暂停回放",
    "Pause replay"
  ],
  [
    "请先停止模型对比，再修改预设或模型。",
    "Stop the comparison before changing presets or models."
  ],
  [
    "预设已填入共同设置，点击开始后才会创建场景和调用模型。",
    "Preset loaded into shared settings. The scene and model calls start only when you click Start."
  ],
  [
    "模型配置已失效，请重新选择。",
    "This model configuration is no longer available. Select another."
  ],
  [
    "已填入模型 1；其余模型可在对比设置中选择。尚未调用模型。",
    "Model 1 selected. Choose other models in comparison settings. No model calls made."
  ],
  [
    "{0}必须是 JSON 对象。",
    "{0} must be a JSON object."
  ],
  [
    "{0}不能包含非有限数值。",
    "{0} must contain only finite numbers."
  ],
  [
    "{0}不能超过 8 KB。",
    "{0} must not exceed 8 KB."
  ],
  [
    "{0}需要有效的 JSON。",
    "{0} requires valid JSON."
  ],
  [
    "不是支持的 embodied-jev-preset-v1 预设。",
    "Unsupported preset; expected embodied-jev-preset-v1."
  ],
  [
    "预设只能包含名称、任务、场景与额外要求，不能包含模型连接或密钥。",
    "Presets may contain only a name, task, scene, and extra requirements, without model connections or keys."
  ],
  [
    "请填写有效名称并选择基础任务模板。",
    "Enter a valid name and choose a base task template."
  ],
  [
    "场景配置",
    "Scene configuration"
  ],
  [
    "额外决策要求",
    "Extra decision requirements"
  ],
  [
    "场景配置含不支持的字段；仅支持 name、source_xy、target_xy、barrier_height。",
    "Unsupported scene fields. Only name, source_xy, target_xy, and barrier_height are allowed."
  ],
  [
    "场景名称必须是 80 字以内的文字。",
    "Scene names must be text up to 80 characters."
  ],
  [
    "场景坐标需要为 [X, Y]：X 在 0.30–0.58，Y 在 -0.28–0.28 米之间。",
    "Scene coordinates must be [X, Y]: X from 0.30 to 0.58, Y from -0.28 to 0.28 metres."
  ],
  [
    "障碍高度仅适用于越障任务，范围为 0.02–0.16 米。",
    "Obstacle height applies only to obstacle transfer and must be 0.02–0.16 metres."
  ],
  [
    "预设检测到密钥字段；请通过模型连接管理凭据。",
    "Key fields detected in the preset. Manage credentials through model connections."
  ],
  [
    "模型配置",
    "Models"
  ],
  [
    "用于模型测试与模型对比",
    "For model tests and comparisons"
  ],
  [
    "刷新",
    "Refresh"
  ],
  [
    "＋ 新建配置",
    "＋ New configuration"
  ],
  [
    "模型连接管理",
    "Model connections"
  ],
  [
    "连接位置筛选",
    "Filter by connection location"
  ],
  [
    "全部",
    "All"
  ],
  [
    "本机接口",
    "Local endpoints"
  ],
  [
    "远端 API",
    "Remote APIs"
  ],
  [
    "搜索模型配置",
    "Search model configurations"
  ],
  [
    "搜索名称、模型或接口地址",
    "Search name, model, or endpoint"
  ],
  [
    "应用到",
    "Apply to"
  ],
  [
    "模型测试",
    "Model Test"
  ],
  [
    "模型对比 · 模型 1",
    "Comparison · Model 1"
  ],
  [
    "默认连接",
    "Default connections"
  ],
  [
    "每种接口类型一个",
    "One per interface type"
  ],
  [
    "已保存配置",
    "Saved configurations"
  ],
  [
    "没有匹配的配置。",
    "No matching configurations."
  ],
  [
    "清除筛选",
    "Clear filters"
  ],
  [
    "任务与场景预设",
    "Task and scene presets"
  ],
  [
    "保存 / 导入 / 导出 JSON",
    "Save / Import / Export JSON"
  ],
  [
    "已保存的预设",
    "Saved presets"
  ],
  [
    "新预设",
    "New preset"
  ],
  [
    "预设名称",
    "Preset name"
  ],
  [
    "基础任务",
    "Base task"
  ],
  [
    "物体 X · m",
    "Object X · m"
  ],
  [
    "留空按种子生成",
    "Leave blank to generate from seed"
  ],
  [
    "物体 Y · m",
    "Object Y · m"
  ],
  [
    "目标 X · m",
    "Target X · m"
  ],
  [
    "目标 Y · m",
    "Target Y · m"
  ],
  [
    "障碍高度 · m",
    "Obstacle height · m"
  ],
  [
    "额外决策要求 · user_context JSON",
    "Extra requirements · user_context JSON"
  ],
  [
    "JSON 中请勿填写 API Key、密码或私人凭据。额外要求独立追加，不会覆盖实测位置、接触或成功条件。规则基线不读取自然语言指令；全新任务语义与机器人类型需要通过代码扩展。场景是否可达、安全，以后端校验为准。",
    "Do not include API keys, passwords, or private credentials in JSON. Extra requirements are appended without overriding measured positions, contacts, or success conditions. The rule baseline does not read natural-language instructions. New task semantics or robot types require code changes. The backend validates reachability and safety."
  ],
  [
    "应用预设",
    "Apply preset"
  ],
  [
    "保存到浏览器",
    "Save in browser"
  ],
  [
    "导入 JSON",
    "Import JSON"
  ],
  [
    "导出 JSON",
    "Export JSON"
  ],
  [
    "输入测试",
    "Input test"
  ],
  [
    "只选择候选，不移动机器人",
    "Select candidates without moving the robot"
  ],
  [
    "决策模型",
    "Decision model"
  ],
  [
    "模型 ID · 可选覆盖",
    "Model ID · Optional override"
  ],
  [
    "观察数据 · JSON",
    "Observation · JSON"
  ],
  [
    "决策问题",
    "Decision question"
  ],
  [
    "候选 · key → 描述 JSON",
    "Candidates · key → description JSON"
  ],
  [
    "测试一次决策",
    "Test one decision"
  ],
  [
    "此处是独立输入实验，不执行机械臂控制。规则基线固定选择第一个候选，用于检查输入流程，不验证语义。",
    "This is an isolated input test with no robot control. The rule baseline always chooses the first candidate to verify the input flow, without evaluating semantics."
  ],
  [
    "模型返回与实际输入",
    "Model response and actual input"
  ],
  [
    "请检查场景参数范围。",
    "Check the scene parameter ranges."
  ],
  [
    "物体 X 和 Y 需要一起填写，或同时留空。",
    "Enter both object X and Y, or leave both blank."
  ],
  [
    "请填写目标 X 和 Y。",
    "Enter target X and Y."
  ],
  [
    "正在处理…",
    "Processing…"
  ],
  [
    "已保存到本浏览器，未运行推理。",
    "Saved in this browser. No inference run."
  ],
  [
    "预设文件过大。",
    "Preset file is too large."
  ],
  [
    "已导入预设草稿；点击应用才会改变场景。",
    "Preset draft imported. Apply it to change the scene."
  ],
  [
    "预设已应用，尚未运行推理。",
    "Preset applied. No inference run."
  ],
  [
    "配置列表已更新。",
    "Configuration list updated."
  ],
  [
    "已选择测试模型；点击「测试一次决策」后才会发起请求。",
    "Test model selected. A request is sent only after clicking Test one decision."
  ],
  [
    "已选择默认连接，尚未调用模型。",
    "Default connection selected. No model calls made."
  ],
  [
    "已选择模型配置，尚未调用模型。",
    "Model configuration selected. No model calls made."
  ],
  [
    "正在测试一次决策，机器人不会移动…",
    "Testing one decision. The robot will not move…"
  ],
  [
    "候选",
    "Candidates"
  ],
  [
    "请提供 2–12 个候选，每个描述必须是非空字符串。",
    "Provide 2–12 candidates, each with a non-empty description."
  ],
  [
    "请填写决策问题。",
    "Enter a decision question."
  ],
  [
    "观察数据",
    "Observation data"
  ],
  [
    "选择 {0} · {1}",
    "Selected {0} · {1}"
  ],
  [
    "输入测试完成，机器人未执行动作。",
    "Input test complete. No robot action executed."
  ],
  [
    "待配置",
    "Needs configuration"
  ],
  [
    "已验证",
    "Verified"
  ],
  [
    "验证失败",
    "Verification failed"
  ],
  [
    "已配置 · 未验证",
    "Configured · Not verified"
  ],
  [
    "请检查接口配置",
    "Check the endpoint configuration"
  ],
  [
    "保存配置后，可通过输入测试验证模型响应。",
    "Save the configuration, then use the input test to verify model responses."
  ],
  [
    "接口地址",
    "Endpoint URL"
  ],
  [
    "未设置地址",
    "No URL set"
  ],
  [
    "未填写",
    "Not specified"
  ],
  [
    "● 已配置",
    "● Configured"
  ],
  [
    "未配置 · 必填",
    "Not configured · Required"
  ],
  [
    "未配置 · 按服务要求填写",
    "Not configured · Depends on service"
  ],
  [
    "本机已保存",
    "Saved locally"
  ],
  [
    "本次服务有效",
    "For this server session"
  ],
  [
    "编辑",
    "Edit"
  ],
  [
    "配置",
    "Configure"
  ],
  [
    "用于对比",
    "Use in comparison"
  ],
  [
    "用于实验",
    "Use in model test"
  ],
  [
    "个连接",
    "connections"
  ],
  [
    "已配置",
    "Configured"
  ],
  [
    "保存配置与验证连接分别操作",
    "Save configurations and verify connections separately"
  ],
  [
    "暂无具名配置。点击「新建配置」，保存同一平台的多个模型。",
    "No named configurations yet. Click New configuration to save multiple models from one provider."
  ],
  [
    "Embodied Lab · 模型测试",
    "Embodied Lab · Model Test"
  ],
  [
    "待命",
    "Idle"
  ],
  [
    "等待人工处理",
    "Awaiting human intervention"
  ],
  [
    "验证通过",
    "Verified successfully"
  ],
  [
    "就绪",
    "Ready"
  ],
  [
    "决策中",
    "Deciding"
  ],
  [
    "执行中",
    "Executing"
  ],
  [
    "读取反馈",
    "Reading feedback"
  ],
  [
    "行知",
    "Embodied Lab"
  ],
  [
    "具身决策实验室",
    "Embodied decision lab"
  ],
  [
    "工作模式",
    "Workspace mode"
  ],
  [
    "实验台",
    "Workbench"
  ],
  [
    "扩展",
    "Extensions"
  ],
  [
    "实验参数",
    "Experiment settings"
  ],
  [
    "导出实验记录",
    "Export experiment"
  ],
  [
    "实验任务",
    "Experiment task"
  ],
  [
    "关闭参数",
    "Close settings"
  ],
  [
    "模型连接",
    "Model connection"
  ],
  [
    "离线 · 确定性策略",
    "Offline · Deterministic policy"
  ],
  [
    "低于决策门槛时暂停，等待人工处理。",
    "Pause below the decision threshold and wait for human intervention."
  ],
  [
    "动作决策方式",
    "Action mode"
  ],
  [
    "选择预设技能，技能内部轨迹由程序执行。",
    "Choose a skill; the program executes the trajectory within it."
  ],
  [
    "观测来源",
    "Observation source"
  ],
  [
    "直接读取仿真中的物体位置。",
    "Read object positions directly from the simulator."
  ],
  [
    "启用相机",
    "Cameras"
  ],
  [
    "输入状态",
    "Input state"
  ],
  [
    "实时观测",
    "Live observations"
  ],
  [
    "位置",
    "Position"
  ],
  [
    "等待观测",
    "Waiting for observations"
  ],
  [
    "执行设置",
    "Execution settings"
  ],
  [
    "预演 / 速度 / 预算",
    "Preview / Speed / Budget"
  ],
  [
    "决策门槛",
    "Decision threshold"
  ],
  [
    "外部评测扰动",
    "External evaluation perturbation"
  ],
  [
    "不施加扰动",
    "No perturbation"
  ],
  [
    "移动方块",
    "Shift block"
  ],
  [
    "移动目标",
    "Shift target"
  ],
  [
    "在指定动作后注入外部位移，用于观察后续调整。它不是模型动作；设置在重置或开始实验时应用。",
    "Apply an external displacement after the specified action to observe subsequent adjustments. This is not a model action. Settings apply when resetting or starting an experiment."
  ],
  [
    "第几步后",
    "After action"
  ],
  [
    "X 位移 / m",
    "X displacement / m"
  ],
  [
    "Y 位移 / m",
    "Y displacement / m"
  ],
  [
    "打乱候选顺序",
    "Shuffle candidates"
  ],
  [
    "逐步 XYZ 模式按种子重排动作菜单，用于检查选择是否依赖排列位置。",
    "In incremental XYZ mode, reorder the action menu by seed to test dependence on candidate order."
  ],
  [
    "7 自由度 · 双指夹爪",
    "7 DOF · Parallel gripper"
  ],
  [
    "实验视图",
    "Experiment view"
  ],
  [
    "{13} 场景",
    "{13} Scene"
  ],
  [
    "{14} 视觉",
    "{14} Vision"
  ],
  [
    "{15} 观测",
    "{15} Observations"
  ],
  [
    "{16} 决策",
    "{16} Decisions"
  ],
  [
    "{19}物体稳定 · 夹爪已撤离",
    "{19}Object stable · Gripper retracted"
  ],
  [
    "加载机器人场景…",
    "Loading robot scene…"
  ],
  [
    "末端 X",
    "End effector X"
  ],
  [
    "末端 Y",
    "End effector Y"
  ],
  [
    "末端 Z",
    "End effector Z"
  ],
  [
    "物体抬升",
    "Object lift"
  ],
  [
    "播放轨迹",
    "Play trajectory"
  ],
  [
    "轨迹时间轴",
    "Trajectory timeline"
  ],
  [
    "运行实验",
    "Run experiment"
  ],
  [
    "单步执行",
    "Single step"
  ],
  [
    "停止实验",
    "Stop experiment"
  ],
  [
    "重置实验",
    "Reset experiment"
  ],
  [
    "决策与执行记录",
    "Decisions and execution records"
  ],
  [
    "实时 · 等待开始",
    "Live · Waiting to start"
  ],
  [
    "等待开始",
    "Waiting to start"
  ],
  [
    "01 · 操作阶段",
    "01 · Operation phase"
  ],
  [
    "02 · 执行动作",
    "02 · Execution action"
  ],
  [
    "尚无候选动作",
    "No candidate actions yet"
  ],
  [
    "执行前 · 结构化观测",
    "Before action · Structured observation"
  ],
  [
    "执行后 · 结构化观测",
    "After action · Structured observation"
  ],
  [
    "候选与模型返回",
    "Candidates and model response"
  ],
  [
    "本步模型输入",
    "Model input for this step"
  ],
  [
    "物理反馈",
    "Physics feedback"
  ],
  [
    "夹爪状态",
    "Gripper state"
  ],
  [
    "双侧接触",
    "Two-sided contact"
  ],
  [
    "目标支撑接触",
    "Target support contact"
  ],
  [
    "稳定时长",
    "Stable duration"
  ],
  [
    "执行记录",
    "Execution records"
  ],
  [
    "0 步",
    "0 steps"
  ],
  [
    "暂无执行记录",
    "No execution records yet"
  ],
  [
    "运行日志",
    "Runtime logs"
  ],
  [
    "0 条",
    "0 entries"
  ],
  [
    "仅展示最近 12 条，完整日志可随实验导出。",
    "Showing the latest 12 entries. Export the experiment for the full log."
  ],
  [
    "调用 0 次",
    "0 calls"
  ],
  [
    "输入 0 tokens",
    "0 input tokens"
  ],
  [
    "连接中",
    "Connecting"
  ],
  [
    "物理仿真 500 Hz",
    "Physics simulation 500 Hz"
  ],
  [
    "仿真真值 · 几何与接触",
    "Simulator state · Geometry and contacts"
  ],
  [
    "实验 / —",
    "Experiment / —"
  ],
  [
    "关闭模型连接",
    "Close model connection"
  ],
  [
    "接口类型",
    "Interface type"
  ],
  [
    "OpenAI 兼容 API",
    "OpenAI-compatible API"
  ],
  [
    "Claude 原生 API",
    "Claude native API"
  ],
  [
    "Jev / 结构化决策 API",
    "Jev / Structured decision API"
  ],
  [
    "配置名称",
    "Configuration name"
  ],
  [
    "保存具名配置时填写",
    "Required for a named configuration"
  ],
  [
    "例如：OpenAI · GPT6",
    "For example: OpenAI · GPT6"
  ],
  [
    "Base URL / 接口地址",
    "Base URL / Endpoint"
  ],
  [
    "平台提供的模型名称",
    "Model name provided by the service"
  ],
  [
    "未配置",
    "Not configured"
  ],
  [
    "JSON 模式",
    "JSON mode"
  ],
  [
    "填入 OpenAI 官方示例",
    "Use official OpenAI example"
  ],
  [
    "管理 TypeSafe Key ↗",
    "Manage TypeSafe key ↗"
  ],
  [
    "申请访问 ↗",
    "Request access ↗"
  ],
  [
    "接口说明 ↗",
    "API documentation ↗"
  ],
  [
    "正在读取本机存储状态…",
    "Reading local storage status…"
  ],
  [
    "尚未验证",
    "Not verified yet"
  ],
  [
    "另存为具名配置时请重新填写 Key；不会复制默认连接的密钥。",
    "Enter the key again when saving a named configuration. The default connection key is not copied."
  ],
  [
    "另存为模型配置",
    "Save as model configuration"
  ],
  [
    "{27}测试调用",
    "{27}Test connection"
  ],
  [
    "保存连接",
    "Save connection"
  ],
  [
    "相机视觉观测",
    "Camera observations"
  ],
  [
    "相机最近观测",
    "Latest camera capture"
  ],
  [
    "相机通道",
    "Camera channel"
  ],
  [
    "深度",
    "Depth"
  ],
  [
    "相机视角",
    "Camera view"
  ],
  [
    "外部相机",
    "External camera"
  ],
  [
    "腕部相机",
    "Wrist camera"
  ],
  [
    "外部相机 · 固定机位",
    "External camera · Fixed position"
  ],
  [
    "颜色检测已知物体，结合深度估计位置；夹爪与接触来自传感器。动作预演仍使用仿真安全筛选。",
    "Known objects are detected by color and localized with depth; gripper and contact states come from sensors. Action previews still use simulator safety checks."
  ],
  [
    "选择「RGB-D 视觉」并重置实验后，显示实际相机画面。",
    "Select RGB-D vision and reset the experiment to see actual camera images."
  ],
  [
    "最近感知帧",
    "Latest perception frame"
  ],
  [
    "RGB-D · 颜色检测",
    "RGB-D · Color detection"
  ],
  [
    "感知耗时",
    "Perception latency"
  ],
  [
    "采集时刻",
    "Capture time"
  ],
  [
    "可见物体",
    "Visible objects"
  ],
  [
    "重试读取",
    "Retry"
  ],
  [
    "下载观测帧",
    "Download observation frames"
  ],
  [
    "全部 RGB 视角 + SHA-256 清单 · ZIP",
    "All RGB views + SHA-256 manifest · ZIP"
  ],
  [
    "这里显示最近一次感知画面；场景页展示当前仿真。此模式支持已知颜色物体，尚不具备通用视觉识别能力。",
    "This shows the latest perception capture; Scene shows the current simulation. This mode supports known colored objects, not general visual recognition."
  ],
  [
    "页面已更新或模块加载失败",
    "Page updated or module failed to load"
  ],
  [
    "刷新后可重新加载界面。未保存的配置需要重新填写，当前仿真实验不会因刷新而重置。",
    "Refresh to reload the interface. Unsaved settings must be entered again; the current simulation is not reset by refreshing."
  ],
  [
    "刷新页面重试",
    "Refresh and retry"
  ],
  [
    "正在加载模型对比…",
    "Loading model comparison…"
  ],
  [
    "模型对比加载失败，可点击刷新页面重试。",
    "Model comparison failed to load. Refresh to retry."
  ],
  [
    "正在加载扩展…",
    "Loading extensions…"
  ],
  [
    "扩展页面加载失败，可点击刷新页面重试。",
    "Extensions failed to load. Refresh to retry."
  ],
  [
    "请先停止当前实验，再应用预设。",
    "Stop the current experiment before applying a preset."
  ],
  [
    "预设未应用，已保留原实验。请检查场景校验提示。",
    "Preset not applied; the original experiment is preserved. Check the scene validation message."
  ],
  [
    "请先停止当前实验，再切换模型配置。",
    "Stop the current experiment before changing model configuration."
  ],
  [
    "模型配置未应用，请检查服务提示。",
    "Model configuration not applied. Check the server message."
  ],
  [
    "本轮模型输入",
    "Model input for this episode"
  ],
  [
    "本步模型说明 · 用于检查决策依据",
    "Model explanation · Inspect decision reasoning"
  ],
  [
    "选中动作",
    "Selected action"
  ],
  [
    "输入图像",
    "Input images"
  ],
  [
    "参数或服务异常",
    "Configuration or service error"
  ],
  [
    "仿真画面 /",
    "Simulation view /"
  ],
  [
    "读取已采集画面…",
    "Reading captured images…"
  ],
  [
    "MuJoCo 相机实际 RGB 画面",
    "Actual RGB image from MuJoCo camera"
  ],
  [
    "MuJoCo 相机实际深度画面",
    "Actual depth image from MuJoCo camera"
  ],
  [
    "{0} · 最近感知帧{1}",
    "{0} · Latest perception frame{1}"
  ],
  [
    "· 腕部相机",
    "· Wrist camera"
  ],
  [
    "这张感知帧已更新或读取失败，请重试。",
    "This perception frame changed or could not be read. Retry."
  ],
  [
    "腕部相机 · 随机械臂移动",
    "Wrist camera · Moves with the arm"
  ],
  [
    "RGB 图像 → 多模态模型",
    "RGB images → Multimodal model"
  ],
  [
    "RGB 相机预览 · 不发送模型",
    "RGB camera preview · Not sent to the model"
  ],
  [
    "空间关系",
    "Spatial relations"
  ],
  [
    "用途",
    "Usage"
  ],
  [
    "由图像判断",
    "Inferred from images"
  ],
  [
    "仅预览",
    "Preview only"
  ],
  [
    "相机仅供查看；模型使用仿真真值，非视觉输入。",
    "Cameras are for preview only; the model uses simulator state."
  ],
  [
    "模型直接接收 RGB 图像；不提供物体或目标坐标。",
    "The model receives RGB images directly, without object or target coordinates."
  ],
  [
    "遮挡或未检测到：{0}",
    "Occluded or not detected: {0}"
  ],
  [
    "当前已知物体可见",
    "Known objects are visible"
  ],
  [
    "等待检测结果",
    "Waiting for detection results"
  ],
  [
    "模型接收{0}相机图像。",
    "The model receives {0} camera images."
  ],
  [
    "{0}相机用于 RGB-D 位置估计，模型接收检测坐标。",
    "{0} cameras estimate RGB-D positions; the model receives detected coordinates."
  ],
  [
    "{0}每步先选子目标，再选 XYZ 方向和夹爪；程序计算几何与短步幅度。",
    "{0} selects a subgoal, then XYZ directions and gripper state each step; the program computes geometry and short motion magnitudes."
  ],
  [
    "规则对照",
    "Rule reference"
  ],
  [
    "模型",
    "Model"
  ],
  [
    "{0}每步选择 XYZ 位移与夹爪动作，执行后重新观测。是否能规划须由实验检验。",
    "{0} selects XYZ displacement and gripper actions each step, then observes again. Planning ability must be tested experimentally."
  ],
  [
    "规则基线",
    "Rule baseline"
  ],
  [
    "发送{0} RGB 图像及机器人自身状态，不提供物体/目标坐标。需要逐步 XYZ 和支持图像的 Chat / Claude 模型。",
    "Send {0} RGB images and robot state without object or target coordinates. Requires incremental XYZ and a vision-capable Chat / Claude model."
  ],
  [
    "发送颜色检测与深度估计的物体坐标；模型不直接接收图像。",
    "Send object coordinates estimated from color and depth. The model does not receive images directly."
  ],
  [
    "模型读取仿真中的物体位置，不接收图像（非视觉输入）。",
    "The model reads object positions from the simulator and receives no images."
  ],
  [
    "模型输入 · {0} RGB + 自身状态",
    "Model input · {0} RGB + Robot state"
  ],
  [
    "RGB-D 感知 + 接触传感器",
    "RGB-D perception + Contact sensors"
  ],
  [
    "非视觉输入 · 仿真真值与接触",
    "State input · Simulator geometry and contacts"
  ],
  [
    "{0} RGB 图像直接送入多模态模型。模型结合末端位置、夹爪与接触反馈判断空间关系，再选择下一步动作；不提供物体和目标坐标。",
    "{0} RGB images go directly to the multimodal model. It uses end-effector position, gripper state, and contact feedback to infer spatial relations and select the next action; object and target coordinates are not provided."
  ],
  [
    "颜色检测已知物体，结合深度估计位置；模型接收检测坐标，夹爪与接触来自传感器。动作预演仍使用仿真安全筛选。",
    "Known objects are detected by color and localized with depth. The model receives detected coordinates; gripper and contact states come from sensors. Action previews still use simulator safety checks."
  ],
  [
    "相机仅供查看仿真画面；本轮模型读取仿真真值，不发送图像。",
    "Cameras preview the simulation only. This episode uses simulator state without sending images to the model."
  ],
  [
    "当前未启用相机；本轮模型读取仿真真值，属于非视觉实验。",
    "Cameras are disabled. This episode uses simulator state and is not a vision experiment."
  ],
  [
    "正在回放轨迹；这里仍是最近一次感知画面。",
    "Trajectory replay is active; this still shows the latest perception capture."
  ],
  [
    "相机在决策与动作边界采集，等待模型返回时画面暂停，并非实时视频。",
    "Images are captured at decision and action boundaries. The image pauses while awaiting the model; this is not live video."
  ],
  [
    "此模式支持已知颜色物体，尚不具备通用视觉识别能力。",
    "This mode supports known colored objects, not general visual recognition."
  ],
  [
    "外部相机机位固定。",
    "The external camera is fixed."
  ],
  [
    "腕部相机随机械臂移动。",
    "The wrist camera moves with the arm."
  ],
  [
    "每步图像与简短视觉依据可随实验导出。",
    "Export the experiment to include step images and brief visual reasoning."
  ],
  [
    "图像仅用于查看，不发送给模型。",
    "Images are for preview only and are not sent to the model."
  ],
  [
    "等待感知采集",
    "Waiting for perception capture"
  ],
  [
    "尚无相机画面。感知就绪后将在这里显示。",
    "No camera image yet. It will appear when perception is ready."
  ],
  [
    "选择「RGB-D 视觉」或「直接图像」会启用相机；也可在「启用相机」中单独开启预览。",
    "Selecting RGB-D vision or Direct images enables cameras. You can also enable previews independently under Cameras."
  ],
  [
    "相机画面暂不可用",
    "Camera images temporarily unavailable"
  ],
  [
    "读取观测帧…",
    "Reading observation frames…"
  ],
  [
    "观测帧下载失败，请重试。",
    "Observation download failed. Retry."
  ],
  [
    "历史第 {0} 步 · 执行前观测",
    "Historical step {0} · Before-action observation"
  ],
  [
    "回放观测",
    "Replay observation"
  ],
  [
    "最近 RGB-D 位置估计 · 接触传感器",
    "Latest RGB-D position estimate · Contact sensors"
  ],
  [
    "仿真真值 · 位置与接触",
    "Simulator state · Positions and contacts"
  ],
  [
    "末端",
    "End effector"
  ],
  [
    "方块",
    "Block"
  ],
  [
    "目标",
    "Target"
  ],
  [
    "夹爪{0} · {1}",
    "Gripper {0} · {1}"
  ],
  [
    "未接触物体",
    "No object contact"
  ],
  [
    "当前子目标",
    "Current subgoal"
  ],
  [
    "· 历史",
    "· Historical"
  ],
  [
    "· 上一条",
    "· Previous"
  ],
  [
    "历史输出 · 第 {0} 步",
    "Historical output · Step {0}"
  ],
  [
    "历史",
    "History"
  ],
  [
    "加载中",
    "Loading"
  ],
  [
    "历史记录 · {0} s",
    "Historical record · {0} s"
  ],
  [
    "上一条决策 · {0}",
    "Previous decision · {0}"
  ],
  [
    "正在计算新决策",
    "Computing next decision"
  ],
  [
    "正在加载 MiniCPM5-2B 权重",
    "Loading MiniCPM5-2B weights"
  ],
  [
    "实时 · 正在计算新决策",
    "Live · Computing next decision"
  ],
  [
    "实时 · {0}",
    "Live · {0}"
  ],
  [
    "首次加载模型",
    "Initial model load"
  ],
  [
    "本步子目标与执行指令",
    "Subgoal and execution commands"
  ],
  [
    "模型未提供行动意图",
    "The model provided no action intent"
  ],
  [
    "等待模型决策",
    "Waiting for model decision"
  ],
  [
    "等待本步图像记录",
    "Waiting for this step's images"
  ],
  [
    "未发送图像",
    "No images sent"
  ],
  [
    "回放物理反馈",
    "Replay physics feedback"
  ],
  [
    "实时物理反馈",
    "Live physics feedback"
  ],
  [
    "正在查看该步记录，三维场景保持{0}。{1}",
    "Viewing this step's record; the 3D scene remains in {0}. {1}"
  ],
  [
    "轨迹回放",
    "Trajectory replay"
  ],
  [
    "实时显示",
    "Live view"
  ],
  [
    "旧记录未保存完整候选，仅显示已选动作。",
    "Older record has no full candidate list; showing the selected action only."
  ],
  [
    "保留上一次完整选择，新结果返回后自动更新。",
    "Keeping the previous complete choice until the new result arrives."
  ],
  [
    "每个通道单独选择；四组概率不合成为整步概率，也不代表任务成功率。",
    "Each channel is selected independently. The four probability groups are not a joint step probability or a task success rate."
  ],
  [
    "{0}逐步选择位移和夹爪动作；物理成功不等于已验证规划能力。",
    "{0} selects displacement and gripper actions step by step. Physical success does not establish planning ability."
  ],
  [
    "候选由任务控制器生成；概率不代表任务成功率。",
    "Candidates come from the task controller. Their probabilities are not task success rates."
  ],
  [
    "运行实验后查看动作选择。",
    "Run an experiment to view action selection."
  ],
  [
    "API 选择与公布概率排序不一致；本步保留 API 返回的选择与原始概率。",
    "The API choice differs from its probability ranking. Both the returned choice and original probabilities are preserved."
  ],
  [
    "单一可行阶段 · 无模型调用",
    "Single feasible phase · No model call"
  ],
  [
    "规则选择",
    "Rule selection"
  ],
  [
    "已选择",
    "Selected"
  ],
  [
    "已拦截",
    "Blocked"
  ],
  [
    "未选择",
    "Not selected"
  ],
  [
    "等待模型返回候选选择…",
    "Waiting for the model's candidate selection…"
  ],
  [
    "该接口只返回动作选择，不提供候选概率。",
    "This interface returns an action choice without candidate probabilities."
  ],
  [
    "规则基线不使用候选概率门槛。",
    "The rule baseline does not use a candidate probability threshold."
  ],
  [
    "点击继续运行，将从当前状态重新决策。",
    "Click Resume to make a new decision from the current state."
  ],
  [
    "低于门槛也继续执行；碰撞与可达性检查仍有效。",
    "Continue below the threshold; collision and reachability checks still apply."
  ],
  [
    "外部评测扰动：{0}，不是模型动作。",
    "External evaluation perturbation: {0}, not a model action."
  ],
  [
    "{0} 条{1}",
    "{0} entries{1}"
  ],
  [
    "· {0} 条提醒",
    "· {0} notices"
  ],
  [
    "{1} · 第 {2} 步",
    "{1} · Step {2}"
  ],
  [
    "暂无运行日志",
    "No runtime logs yet"
  ],
  [
    "远程 · TypeSafe API",
    "Remote · TypeSafe API"
  ],
  [
    "本地 · 候选概率",
    "Local · Candidate probabilities"
  ],
  [
    "本地 · 首次决策加载权重",
    "Local · Weights load on first decision"
  ],
  [
    "正在加载权重 · {0}",
    "Loading weights · {0}"
  ],
  [
    "本地就绪 · {0} · 候选概率",
    "Local model ready · {0} · Candidate probabilities"
  ],
  [
    "加载失败 · {0}",
    "Load failed · {0}"
  ],
  [
    "请检查服务日志",
    "Check server logs"
  ],
  [
    "已注入 {0} 次外部评测扰动；详见运行日志。",
    "Applied {0} external evaluation perturbations; see runtime logs."
  ],
  [
    "步",
    "steps"
  ],
  [
    "暂停实验",
    "Pause experiment"
  ],
  [
    "继续实验",
    "Resume experiment"
  ],
  [
    "调用",
    "Calls"
  ],
  [
    "次",
    "times"
  ],
  [
    "输入",
    "Input"
  ],
  [
    "查看第 {3} 步决策：{4}",
    "View step {3} decision: {4}"
  ],
  [
    "第 {7} 步 · {8}{9}",
    "Step {7} · {8}{9}"
  ],
  [
    "目标支撑",
    "Target support"
  ],
  [
    "位置已更新",
    "Position updated"
  ],
  [
    "· 拦截",
    "· Blocked"
  ],
  [
    "个候选",
    "candidates"
  ],
  [
    "生成式接口不提供原生候选概率",
    "Generative interfaces do not provide native candidate probabilities"
  ],
  [
    "● 已连接",
    "● Connected"
  ],
  [
    "外部评测扰动时刻必须为第 1–199 步后。",
    "External perturbations must occur after steps 1–199."
  ],
  [
    "外部评测扰动的 X / Y 位移必须在 ±0.06 米内，且不能同时为零。",
    "External X / Y shifts must be within ±0.06 metres and cannot both be zero."
  ],
  [
    "直接图像需要「逐步 XYZ」动作决策。请先切换动作决策方式。",
    "Direct images require incremental XYZ. Change the action mode first."
  ],
  [
    "直接图像需要支持图像的 Chat 或 Claude 模型。请先配置并选择模型连接。",
    "Direct images require a vision-capable Chat or Claude model. Configure and select a model connection first."
  ],
  [
    "兼容 API",
    "Compatible API"
  ],
  [
    "结构化 API",
    "Structured API"
  ],
  [
    "新配置草稿 · 尚未保存或验证",
    "New draft · Not saved or verified"
  ],
  [
    "草稿已修改 · 尚未保存或验证",
    "Draft changed · Not saved or verified"
  ],
  [
    "编辑模型配置",
    "Edit model configuration"
  ],
  [
    "新建模型配置",
    "New model configuration"
  ],
  [
    "更新模型配置",
    "Update configuration"
  ],
  [
    "保存模型配置",
    "Save configuration"
  ],
  [
    "留空 Key 仅在接口地址保持相同时保留原密钥。更新配置不会自动开始实验。",
    "A blank key preserves the saved key only if the endpoint URL is unchanged. Updating configuration does not start an experiment."
  ],
  [
    "留空保留已配置密钥",
    "Leave blank to keep the saved key"
  ],
  [
    "官方 Jev 当前采用邀请制：先申请访问，获批后创建 TypeSafe Key。地址已锁定；jev-latest 跟随官方更新，对比时可固定版本，如 jev-1.13.0。",
    "Official Jev access is currently invite-only: request access, then create a TypeSafe key after approval. The URL is fixed. jev-latest follows official updates; pin a version such as jev-1.13.0 for comparisons."
  ],
  [
    "Claude 原生 Messages API，使用 Anthropic Key。测试时会显示服务返回的模型名称。",
    "Claude native Messages API uses an Anthropic key. The test displays the model name returned by the service."
  ],
  [
    "填写平台提供的 Base URL 和模型 ID。普通聊天兼容接口不能替代 Jev 专用决策接口。",
    "Enter the provider's Base URL and model ID. A standard chat-compatible endpoint cannot replace Jev's decision endpoint."
  ],
  [
    "填写完整的结构化决策接口地址；服务需要返回候选动作及其概率。",
    "Enter the full structured decision endpoint. The service must return candidate actions and their probabilities."
  ],
  [
    "已填入官方示例，尚未调用。填写自己的 Key 后可测试；模型权限以账号为准。",
    "Official example filled in; no request sent. Enter your key to test. Model access depends on your account."
  ],
  [
    "正在测试调用…",
    "Testing connection…"
  ],
  [
    "正在保存…",
    "Saving…"
  ],
  [
    "验证失败 · {0}",
    "Verification failed · {0}"
  ],
  [
    "调用通过 · {0} · {1} ms{2}",
    "Call successful · {0} · {1} ms{2}"
  ],
  [
    "请为模型配置起一个名字。",
    "Give this model configuration a name."
  ],
  [
    "正在保存模型配置…",
    "Saving model configuration…"
  ],
  [
    "{0} · 未调用模型。",
    "{0} · No model calls made."
  ],
  [
    "连接已断开",
    "Disconnected"
  ],
  [
    "场景加载失败",
    "Scene failed to load"
  ],
  [
    "已安全保存在本机",
    "Saved securely on this machine"
  ],
  [
    "仅保存在本次服务进程",
    "Saved for this server process only"
  ],
  [
    "配置保存在本机，Key 由系统钥匙串保护。刷新页面或重启服务后可以继续使用。",
    "Configuration is stored locally, with keys protected by the system keychain. It remains available after refreshing or restarting the service."
  ],
  [
    "当前仅保存在服务进程中，重启服务后需要重新配置。",
    "Stored in the current server process only. Reconfigure after restarting the service."
  ],
  [
    "刷新页面",
    "Refresh page"
  ],
  [
    "{0} 刷新页面不会丢失配置。",
    "{0} Refreshing the page preserves your configuration."
  ],
  [
    "· 未配置",
    "· Not configured"
  ],
  [
    "X 方向",
    "X direction"
  ],
  [
    "Y 方向",
    "Y direction"
  ],
  [
    "Z 方向",
    "Z direction"
  ],
  [
    "夹爪",
    "Gripper"
  ],
  [
    "负方向",
    "Negative direction"
  ],
  [
    "正方向",
    "Positive direction"
  ],
  [
    "等待四个动作通道的决策…",
    "Waiting for four action-channel decisions…"
  ],
  [
    "未提供概率",
    "No probabilities provided"
  ],
  [
    "MuJoCo 机械臂三维场景",
    "MuJoCo 3D robot scene"
  ],
  [
    "三维渲染上下文已丢失，请刷新页面",
    "3D rendering context lost. Refresh the page."
  ],
  [
    "运行状态",
    "Run status"
  ],
  [
    "观测",
    "Observations"
  ],
  [
    "候选 / 规划",
    "Candidates / Planning"
  ],
  [
    "决策",
    "Decisions"
  ],
  [
    "模型调用",
    "Model calls"
  ],
  [
    "安全检查",
    "Safety checks"
  ],
  [
    "动作",
    "Actions"
  ],
  [
    "物理帧",
    "Physics frames"
  ],
  [
    "结果判定",
    "Outcome evaluation"
  ],
  [
    "页面请求",
    "Page requests"
  ],
  [
    "决策测试",
    "Decision test"
  ],
  [
    "连接测试",
    "Connection test"
  ],
  [
    "内部运行日志",
    "Internal runtime logs"
  ],
  [
    "正在连接日志流",
    "Connecting to log stream"
  ],
  [
    "只暂停日志刷新，机器人继续运行",
    "Pause log updates only; the robot keeps running"
  ],
  [
    "暂停刷新",
    "Pause updates"
  ],
  [
    "清空当前视图，服务端保留的日志仍可导出",
    "Clear the current view; server logs remain available for export"
  ],
  [
    "清空视图",
    "Clear view"
  ],
  [
    "复制本页已接收且符合筛选条件的日志",
    "Copy received logs matching the current filters"
  ],
  [
    "复制筛选结果",
    "Copy filtered logs"
  ],
  [
    "导出 JSONL",
    "Export JSONL"
  ],
  [
    "搜索运行日志",
    "Search runtime logs"
  ],
  [
    "搜索事件、实验 ID、输入或返回内容…",
    "Search event, episode ID, input, or response…"
  ],
  [
    "日志级别",
    "Log level"
  ],
  [
    "全部级别",
    "All levels"
  ],
  [
    "DEBUG 细节",
    "DEBUG Details"
  ],
  [
    "INFO 信息",
    "INFO Information"
  ],
  [
    "WARN 警告",
    "WARN Warnings"
  ],
  [
    "ERROR 错误",
    "ERROR Errors"
  ],
  [
    "日志阶段",
    "Log phase"
  ],
  [
    "全部阶段",
    "All phases"
  ],
  [
    "日志来源",
    "Log source"
  ],
  [
    "全部来源",
    "All sources"
  ],
  [
    "跟随最新",
    "Follow latest"
  ],
  [
    "运行日志条目",
    "Runtime log entries"
  ],
  [
    "包含决策输入 / 返回与物理帧；密钥脱敏，图片仅记录摘要。最多保留 6,000 条 / 16 MiB。",
    "Includes decision inputs, responses, and physics frames. Keys are redacted and images summarized. Retains up to 6,000 entries / 16 MiB."
  ],
  [
    "显示更早记录",
    "Show earlier records"
  ],
  [
    "服务",
    "Service"
  ],
  [
    "步 {0}",
    "Step {0}"
  ],
  [
    "{0} 条匹配 / {1} 条已接收",
    "{0} matches / {1} received"
  ],
  [
    "没有符合筛选条件的日志。",
    "No logs match these filters."
  ],
  [
    "等待新的运行日志；开始实验后会持续输出内部步骤。",
    "Waiting for new logs. Starting an experiment streams internal steps here."
  ],
  [
    "服务已重启，重新读取日志",
    "Service restarted; reading logs again"
  ],
  [
    "正在追赶日志…",
    "Catching up with logs…"
  ],
  [
    "● 实时连接",
    "● Live connection"
  ],
  [
    "物理帧按约 25 Hz 输出；密钥脱敏，图片仅记录摘要。保留上限 6,000 条 / 16 MiB。{0}",
    "Physics frames are logged at about 25 Hz. Keys are redacted and images summarized. Retains up to 6,000 entries / 16 MiB. {0}"
  ],
  [
    "已轮转 {0} 条旧记录。",
    "{0} older entries rotated out."
  ],
  [
    "日志连接中断，自动重试（{0}）",
    "Log connection interrupted; retrying ({0})"
  ],
  [
    "超时",
    "Timed out"
  ],
  [
    "恢复刷新",
    "Resume updates"
  ],
  [
    "已暂停刷新 · 仿真继续运行",
    "Updates paused · Simulation continues"
  ],
  [
    "正在恢复日志",
    "Resuming log stream"
  ],
  [
    "已清空视图，服务端记录仍可导出。",
    "View cleared. Server records remain available for export."
  ],
  [
    "已复制 {0} 条筛选结果。",
    "Copied {0} matching entries."
  ],
  [
    "浏览器未允许复制，请使用导出 JSONL。",
    "Clipboard access denied. Use Export JSONL instead."
  ],
  [
    "暂无训练指标",
    "No training metrics yet"
  ],
  [
    "训练指标曲线",
    "Training metrics chart"
  ],
  [
    "选中第 {4} 步",
    "Selected step {4}"
  ],
  [
    "验证损失 {0}",
    "Validation loss {0}"
  ],
  [
    "第 {0} 步",
    "Step {0}"
  ],
  [
    "训练中",
    "Training"
  ],
  [
    "示范初始化",
    "Demonstration initialization"
  ],
  [
    "整局策略梯度",
    "Episode policy gradient"
  ],
  [
    "成功轨迹重放",
    "Successful trajectory replay"
  ],
  [
    "当前实验暂无异常记录",
    "No alerts in this experiment"
  ],
  [
    "暂无实验",
    "No experiments yet"
  ],
  [
    "选择实验查看训练过程",
    "Select an experiment to view training"
  ],
  [
    "任务完成率 {0} · 最佳更新 {1}",
    "Task success {0} · Best update {1}"
  ],
  [
    "{0} · {1} 动作",
    "{0} · {1} actions"
  ],
  [
    "任务完成",
    "Task complete"
  ],
  [
    "任务未完成",
    "Task incomplete"
  ],
  [
    "部署 {0}",
    "Deployment {0}"
  ],
  [
    "自动闭环 · {0}",
    "Automatic learning loop · {0}"
  ],
  [
    "示范预热 · 单步准确率 {0}",
    "Demonstration warm-up · Step accuracy {0}"
  ],
  [
    "{0} 局 · 成功率 {1}",
    "{0} episodes · Success rate {1}"
  ],
  [
    "成功率 {0} · {1}",
    "Success rate {0} · {1}"
  ],
  [
    "达标",
    "Passed"
  ],
  [
    "未晋级",
    "Not promoted"
  ],
  [
    "{0} · 完成率 {1} · {2} 样本",
    "{0} · Success {1} · {2} samples"
  ],
  [
    "模型探索 · {0}/{1} 完成 · {2}",
    "Model exploration · {0}/{1} complete · {2}"
  ],
  [
    "搬运入盘多轮测试 · {0}",
    "Multi-round transfer test · {0}"
  ],
  [
    "RSI 自我提升 · {0}",
    "RSI self-improvement · {0}"
  ],
  [
    "暂无实验。点击「启动实验」开始采集与训练。",
    "No experiments yet. Open Advanced experiment to start collection and training."
  ],
  [
    "无 GPU 读数",
    "No GPU reading"
  ],
  [
    "设备未报告（统一内存）",
    "Device not reported (unified memory)"
  ],
  [
    "尚未晋级",
    "Not promoted yet"
  ],
  [
    "选择数据集",
    "Select dataset"
  ],
  [
    "自动接续当前部署模型／初始 RSI 模型",
    "Continue from the deployed model / initial RSI model"
  ],
  [
    "{0} · {1} · {2} 样本",
    "{0} · {1} · {2} samples"
  ],
  [
    "模型成功轨迹",
    "Model's successful trajectories"
  ],
  [
    "{0} · {1} · {2}/{3} 成功",
    "{0} · {1} · {2}/{3} succeeded"
  ],
  [
    "选择探索批次",
    "Select exploration batch"
  ],
  [
    "RSI 尚未通过发布评测",
    "RSI has not passed release evaluation"
  ],
  [
    "{0} · RSI 加载验证通过",
    "{0} · RSI load check passed"
  ],
  [
    "参考模型 {0} 保留",
    "Reference model {0} retained"
  ],
  [
    "等待自动部署",
    "Waiting for automatic deployment"
  ],
  [
    "{1} · {2} 任务完成率",
    "{1} · {2} task success rate"
  ],
  [
    "暂无自动部署记录",
    "No automatic deployments yet"
  ],
  [
    "新场景验证中",
    "Validating new scenes"
  ],
  [
    "拟合训练中",
    "Fitting model"
  ],
  [
    "任务训练中",
    "Task training"
  ],
  [
    "轨迹采集中",
    "Collecting trajectories"
  ],
  [
    "部署检查中",
    "Checking deployment"
  ],
  [
    "模型初始化中",
    "Initializing model"
  ],
  [
    "处理中",
    "Processing"
  ],
  [
    "停止后台任务",
    "Stop background job"
  ],
  [
    "后台模型迭代",
    "Background model iteration"
  ],
  [
    "停止采集后，已启动的训练与验证会继续。全部阶段结束后，后台任务才算完成。",
    "Training and validation continue after collection stops. The background job finishes only when every stage is complete."
  ],
  [
    "当前实验超过 60 秒没有心跳，请检查训练进程。",
    "No heartbeat for over 60 seconds. Check the training process."
  ],
  [
    "RSI 独立任务完成率",
    "RSI independent task success rate"
  ],
  [
    "参考实验完成率（非 RSI）",
    "Reference experiment success (not RSI)"
  ],
  [
    "最新同批 {0} → {1}",
    "Latest paired batch {0} → {1}"
  ],
  [
    "尚无 RSI 独立任务评测 · 参考模型单独报告",
    "No independent RSI evaluation yet · Reference models reported separately"
  ],
  [
    "{0} 个独立场景 · {1}",
    "{0} independent scenes · {1}"
  ],
  [
    "已通过发布门槛",
    "Passed release gate"
  ],
  [
    "候选未发布",
    "Candidate not released"
  ],
  [
    "完整任务 · 三类机械臂场景",
    "Full task · Three robot scene types"
  ],
  [
    "通过晋级标准",
    "Promotion criteria passed"
  ],
  [
    "保留当前版本",
    "Keep current version"
  ],
  [
    "父模型",
    "Parent model"
  ],
  [
    "候选模型",
    "Candidate model"
  ],
  [
    "提升 95% 区间：{2} ～ {3} 个百分点",
    "95% improvement interval: {2} to {3} percentage points"
  ],
  [
    "评测数量",
    "Evaluation count"
  ],
  [
    "评测任务覆盖",
    "Task coverage"
  ],
  [
    "成功率提升",
    "Success rate gain"
  ],
  [
    "提升置信区间",
    "Improvement confidence interval"
  ],
  [
    "各任务无退化",
    "No task regressions"
  ],
  [
    "风险不增加",
    "No increased risk"
  ],
  [
    "尝试总局数",
    "Episodes attempted"
  ],
  [
    "成功轨迹",
    "Successful trajectories"
  ],
  [
    "示范集",
    "Demonstration set"
  ],
  [
    "训练动作样本",
    "Training action samples"
  ],
  [
    "失败轨迹",
    "Failed trajectories"
  ],
  [
    "模型完成的任务",
    "Tasks completed by the model"
  ],
  [
    "初始化样本",
    "Initialization samples"
  ],
  [
    "当前没有成功轨迹，训练尚未开始。",
    "No successful trajectories yet. Training has not started."
  ],
  [
    "{0} · {1}:{2} · {3} 动作 · {4} · {5}",
    "{0} · {1}:{2} · {3} actions · {4} · {5}"
  ],
  [
    "✓ 完成",
    "✓ Complete"
  ],
  [
    "✗ 失败",
    "✗ Failed"
  ],
  [
    "稳定完成",
    "Stable completion"
  ],
  [
    "此筛选条件下暂无轨迹。",
    "No trajectories match this filter."
  ],
  [
    "① RSI 探索与轨迹收集",
    "① RSI exploration and collection"
  ],
  [
    "② 成功轨迹重放训练",
    "② Successful trajectory replay training"
  ],
  [
    "③ 完整任务成功率评测",
    "③ Full-task success evaluation"
  ],
  [
    "④ 提升后自动部署",
    "④ Deploy after improvement"
  ],
  [
    "① 示范初始化（可跳过）",
    "① Demonstration initialization (optional)"
  ],
  [
    "② 完整任务奖励训练",
    "② Full-task reward training"
  ],
  [
    "③ 独立任务完成率评测",
    "③ Independent task success evaluation"
  ],
  [
    "④ 达标后自动部署",
    "④ Deploy after passing the gate"
  ],
  [
    "④ 未发布 · 保留当前模型",
    "④ Not released · Current model retained"
  ],
  [
    "没有成功轨迹，跳过训练并保留失败数据",
    "No successful trajectories; training skipped and failure data retained"
  ],
  [
    "评测未证明提升，继续使用当前模型",
    "Evaluation did not establish improvement; keep the current model"
  ],
  [
    "优化模型已自动部署",
    "Improved model deployed automatically"
  ],
  [
    "采集模型轨迹",
    "Collecting model trajectories"
  ],
  [
    "成功轨迹训练中",
    "Training on successful trajectories"
  ],
  [
    "独立随机场景评测中",
    "Evaluating independent random scenes"
  ],
  [
    "正在验证并部署",
    "Validating and deploying"
  ],
  [
    "启动 RSI 自我提升，收集模型完成的任务轨迹后训练。",
    "Start RSI self-improvement to collect successful model trajectories and train on them."
  ],
  [
    "连接中断",
    "Connection interrupted"
  ],
  [
    "测试完成",
    "Test complete"
  ],
  [
    "测试失败",
    "Test failed"
  ],
  [
    "测试运行中",
    "Test running"
  ],
  [
    "仅搬运入盘 · {0} 轮 · 每轮 {1} 局采集 / {2} 对新场景发布评测 · 最后 {3} 个保留场景",
    "Transfer only · {0} rounds · {1} collection episodes / {2} paired new-scene release tests per round · {3} final holdout scenes"
  ],
  [
    "学习轮",
    "Learning round"
  ],
  [
    "本轮自主成功",
    "Autonomous successes this round"
  ],
  [
    "累计成功轨迹",
    "Total successful trajectories"
  ],
  [
    "训练样本",
    "Training samples"
  ],
  [
    "选中更新步",
    "Selected update step"
  ],
  [
    "新场景候选 / 当前",
    "New scenes: candidate / current"
  ],
  [
    "发布结果",
    "Release outcome"
  ],
  [
    "已发布",
    "Released"
  ],
  [
    "无成功数据 · 未训练",
    "No successful data · Not trained"
  ],
  [
    "未证明提升 · 保留当前",
    "No demonstrated gain · Current model retained"
  ],
  [
    "{0} · 真正发布 {1} 次 · 蓝色为选中候选、绿色为实际运行版本。选中第 0 步表示训练未改善开发集完成率，保留训练前权重。",
    "{0} · {1} actual releases · Blue: selected candidate; green: running version. Step 0 means training did not improve development-set success, so pre-training weights were kept."
  ],
  [
    "不预设成功率上升；候选退化、持平和未通过发布均如实保留。",
    "No assumed upward trend. Regressions, ties, and failed release gates remain in the record."
  ],
  [
    "相同保留场景完成率：{0}",
    "Success on identical holdout scenes: {0}"
  ],
  [
    "最终保留场景审计 {0}：{1}/{2} · {3} 成功",
    "Final holdout audit {0}: {1}/{2} · {3} success"
  ],
  [
    "正在采集、训练和独立发布评测；所有轮次完成后才开启固定场景审计。",
    "Collection, training, and independent release evaluation are in progress. Fixed-scene auditing starts after all rounds finish."
  ],
  [
    "Embodied Lab · 训练报告",
    "Embodied Lab · Training Report"
  ],
  [
    "◈ 机械臂模拟",
    "◈ Robot simulation"
  ],
  [
    "◉ 模型训练",
    "◉ Model training"
  ],
  [
    "▤ 实验记录",
    "▤ Experiment records"
  ],
  [
    "◇ 版本评测",
    "◇ Version evaluation"
  ],
  [
    "本地实验工作台",
    "Local experiment workbench"
  ],
  [
    "训练与任务表现",
    "Training and task performance"
  ],
  [
    "清空旧记录，从原始 RSI 开始，只验证把物体放入盘子的任务。",
    "Start from the original RSI with cleared records and evaluate transfer-to-tray tasks only."
  ],
  [
    "机械臂模拟",
    "Robot simulation"
  ],
  [
    "＋ 启动实验",
    "＋ Start experiment"
  ],
  [
    "模型训练",
    "Model training"
  ],
  [
    "最新独立任务完成率",
    "Latest independent task success"
  ],
  [
    "等待完整任务评测",
    "Waiting for full-task evaluation"
  ],
  [
    "与父模型配对提升",
    "Paired gain over parent model"
  ],
  [
    "同一批未见场景 · 百分点",
    "Same unseen scenes · Percentage points"
  ],
  [
    "累计采集完整轨迹",
    "Total complete trajectories"
  ],
  [
    "成功与失败均保留",
    "Successes and failures retained"
  ],
  [
    "当前实验检测事件",
    "Alerts in current experiment"
  ],
  [
    "梯度 · 任务退化 · 资源",
    "Gradients · Task regression · Resources"
  ],
  [
    "Transformer 参数变化 · 三维结构",
    "Transformer parameter changes · 3D structure"
  ],
  [
    "正在加载可视化脚本和真实参数记录…",
    "Loading visualization and recorded parameters…"
  ],
  [
    "搬运入盘 · 多轮验证",
    "Transfer to tray · Multi-round validation"
  ],
  [
    "原始模型 → 自主成功轨迹 → 训练 → 独立发布评测 → 固定场景审计",
    "Original model → Autonomous successes → Training → Independent release evaluation → Fixed-scene audit"
  ],
  [
    "等待实验",
    "Waiting for experiment"
  ],
  [
    "所有轮次训练结束后，才使用同一组保留场景比较 V0、V1、V2、V3。",
    "Compare V0, V1, V2, and V3 on the same holdout scenes only after all training rounds finish."
  ],
  [
    "检验是否逐轮提高，保留下降、持平和未发布的结果。",
    "Check improvement across rounds, keeping regressions, ties, and unreleased results."
  ],
  [
    "训练过程",
    "Training progress"
  ],
  [
    "选择实验",
    "Select experiment"
  ],
  [
    "最佳开发完成率",
    "Best development success"
  ],
  [
    "最近训练 loss",
    "Latest training loss"
  ],
  [
    "选中检查点",
    "Selected checkpoint"
  ],
  [
    "完整任务完成率",
    "Full-task success rate"
  ],
  [
    "● 独立开发场景",
    "● Independent development scenes"
  ],
  [
    "● 训练探索场景",
    "● Training exploration scenes"
  ],
  [
    "训练更新次数",
    "Training updates"
  ],
  [
    "训练 loss",
    "Training loss"
  ],
  [
    "● 训练损失",
    "● Training loss"
  ],
  [
    "● 验证损失（如有）",
    "● Validation loss (if available)"
  ],
  [
    "loss 用于诊断训练",
    "Loss diagnoses training"
  ],
  [
    "按任务完成率选择模型",
    "Select models by task success"
  ],
  [
    "梯度与单步诊断",
    "Gradients and step diagnostics"
  ],
  [
    "训练目标",
    "Training objective"
  ],
  [
    "单步标签准确率",
    "Step label accuracy"
  ],
  [
    "梯度范数",
    "Gradient norm"
  ],
  [
    "初始化标签准确率",
    "Initialization label accuracy"
  ],
  [
    "独立任务评测",
    "Independent task evaluation"
  ],
  [
    "每批同场景配对；不同场景分布不作同测试集纵向比较。",
    "Each batch uses paired scenes. Different scene distributions are not treated as the same longitudinal test set."
  ],
  [
    "等待评测",
    "Waiting for evaluation"
  ],
  [
    "● 候选模型",
    "● Candidate model"
  ],
  [
    "● 同批父模型",
    "● Paired parent model"
  ],
  [
    "等待 RSI 评测",
    "Waiting for RSI evaluation"
  ],
  [
    "完成训练后进行独立配对评测。",
    "Independent paired evaluation follows training."
  ],
  [
    "自动学习闭环",
    "Automatic learning loop"
  ],
  [
    "达到采集阈值后自动训练。",
    "Training starts automatically at the collection threshold."
  ],
  [
    "RSI 部署版本",
    "Deployed RSI version"
  ],
  [
    "运行健康",
    "Runtime health"
  ],
  [
    "5s 刷新",
    "Refreshes every 5s"
  ],
  [
    "GPU 未报告",
    "GPU not reported"
  ],
  [
    "内存",
    "Memory"
  ],
  [
    "设备与版本详情",
    "Device and version details"
  ],
  [
    "GPU 温度",
    "GPU temperature"
  ],
  [
    "显存",
    "GPU memory"
  ],
  [
    "参考模型",
    "Reference model"
  ],
  [
    "数据集",
    "Datasets"
  ],
  [
    "最近检测事件",
    "Recent alerts"
  ],
  [
    "暂无异常记录",
    "No alerts yet"
  ],
  [
    "训练数据",
    "Training data"
  ],
  [
    "仅回放模型自己完成的任务动作。",
    "Replay only actions from tasks the model completed itself."
  ],
  [
    "查看训练数据集",
    "View training dataset"
  ],
  [
    "等待成功轨迹",
    "Waiting for successful trajectories"
  ],
  [
    "采集轨迹与失败诊断",
    "Collected trajectories and failure diagnostics"
  ],
  [
    "查看完整任务结果、场景和动作记录。",
    "Inspect complete task outcomes, scenes, and action records."
  ],
  [
    "全部结果",
    "All outcomes"
  ],
  [
    "仅成功轨迹",
    "Successful trajectories only"
  ],
  [
    "仅失败轨迹",
    "Failed trajectories only"
  ],
  [
    "上一页",
    "Previous page"
  ],
  [
    "下一页",
    "Next page"
  ],
  [
    "等待 RSI 探索",
    "Waiting for RSI exploration"
  ],
  [
    "历史实验",
    "Experiment history"
  ],
  [
    "实验",
    "Experiment"
  ],
  [
    "后端",
    "Backend"
  ],
  [
    "状态",
    "Status"
  ],
  [
    "主要结果",
    "Main result"
  ],
  [
    "时间",
    "Time"
  ],
  [
    "部署记录",
    "Deployment history"
  ],
  [
    "暂无部署记录",
    "No deployments yet"
  ],
  [
    "真实物理轨迹 · 完整任务评测 · 通过门槛后更新",
    "Real physics trajectories · Full-task evaluation · Update after passing gates"
  ],
  [
    "启动实验",
    "Start experiment"
  ],
  [
    "关闭",
    "Close"
  ],
  [
    "任务在后台运行，监控记录会实时出现。RSI 自我提升会探索并只使用模型自己完成任务的轨迹训练。没有成功轨迹时跳过训练，保留失败数据。评测证明提升后自动部署。",
    "Jobs run in the background with live monitoring. RSI explores and trains only on tasks it completes itself. Without successful trajectories, training is skipped and failures are retained. Deployment follows demonstrated evaluation improvement."
  ],
  [
    "实验类型",
    "Experiment type"
  ],
  [
    "搬运入盘验证：原始 RSI → 3 轮采集训练 → 审计",
    "Transfer validation: original RSI → 3 collection/training rounds → Audit"
  ],
  [
    "RSI 自我提升：探索 → 成功轨迹 → 训练 → 发布",
    "RSI self-improvement: Explore → Successful trajectories → Train → Release"
  ],
  [
    "任务",
    "Task"
  ],
  [
    "把物体放进盘子 · 仅此任务",
    "Put the object in the tray · This task only"
  ],
  [
    "训练后端",
    "Training backend"
  ],
  [
    "RSI-Jev · GPU 决策模型",
    "RSI-Jev · GPU decision model"
  ],
  [
    "Compact · CPU 参考模型",
    "Compact · CPU reference model"
  ],
  [
    "父模型／评测模型",
    "Parent / Evaluation model"
  ],
  [
    "从初始模型开始",
    "Start from the initial model"
  ],
  [
    "探索每任务场景数",
    "Exploration scenes per task"
  ],
  [
    "每轮独立发布场景数",
    "Independent release scenes per round"
  ],
  [
    "策略更新次数／预热步数",
    "Policy updates / Warm-up steps"
  ],
  [
    "自动闭环轮数",
    "Automatic learning rounds"
  ],
  [
    "最终保留场景数",
    "Final holdout scenes"
  ],
  [
    "场景起始种子",
    "Starting scene seed"
  ],
  [
    "开始运行",
    "Start run"
  ],
  [
    "正在加载训练报告…",
    "Loading training report…"
  ],
  [
    "报告加载失败",
    "Report failed to load"
  ],
  [
    "训练报告",
    "Training report"
  ],
  [
    "高级实验",
    "Advanced experiment"
  ],
  [
    "回到实时画面 ↑",
    "Back to live view ↑"
  ],
  [
    "报告内容",
    "Report sections"
  ],
  [
    "概览",
    "Overview"
  ],
  [
    "训练曲线",
    "Training curves"
  ],
  [
    "参数变化",
    "Parameter changes"
  ],
  [
    "独立评测",
    "Independent evaluation"
  ],
  [
    "轮次对比",
    "Round comparison"
  ],
  [
    "历史记录",
    "History"
  ],
  [
    "报告加载失败：{0}",
    "Report failed to load: {0}"
  ],
  [
    "重新加载",
    "Reload"
  ],
  [
    "模块加载失败：{0}。点击当前标签可重试。",
    "Module failed to load: {0}. Click the current tab to retry."
  ],
  [
    "全过程日志",
    "End-to-end logs"
  ],
  [
    "感知 → 决策 → 轨迹过滤 → 拟合训练 → 评测 → 部署",
    "Perception → Decisions → Trajectory filtering → Fitting → Evaluation → Deployment"
  ],
  [
    "日志过程",
    "Log process"
  ],
  [
    "全部过程",
    "All processes"
  ],
  [
    "感知探测",
    "Perception"
  ],
  [
    "决策选择",
    "Decision selection"
  ],
  [
    "轨迹过滤",
    "Trajectory filtering"
  ],
  [
    "拟合训练",
    "Model fitting"
  ],
  [
    "模型部署",
    "Model deployment"
  ],
  [
    "物理执行",
    "Physics execution"
  ],
  [
    "系统状态",
    "System status"
  ],
  [
    "按运行 ID 筛选日志",
    "Filter logs by run ID"
  ],
  [
    "运行 ID（可选）",
    "Run ID (optional)"
  ],
  [
    "搜索全过程日志",
    "Search end-to-end logs"
  ],
  [
    "搜索模型、步骤、场景或失败原因",
    "Search model, step, scene, or failure reason"
  ],
  [
    "回到最新",
    "Back to latest"
  ],
  [
    "导出全部 JSONL",
    "Export all JSONL"
  ],
  [
    "读取持久化记录…",
    "Reading persisted records…"
  ],
  [
    "较新记录",
    "Newer records"
  ],
  [
    "较早记录",
    "Older records"
  ],
  [
    "{0} 条",
    "{0} entries"
  ],
  [
    "场景 {0}",
    "Scene {0}"
  ],
  [
    "暂无匹配记录。流程实际执行后，会在这里出现。",
    "No matching records. They will appear as stages execute."
  ],
  [
    "日志暂不可用：{0}，自动重试。",
    "Logs temporarily unavailable: {0}. Retrying automatically."
  ],
  [
    "视图已暂停",
    "View paused"
  ],
  [
    "正在查看历史",
    "Viewing history"
  ],
  [
    "实时更新",
    "Live updates"
  ],
  [
    "· 记录保存在服务器，刷新不丢失。每页 100 条，可翻页或导出全部；展开查看完整字段。",
    "· Records are saved on the server and survive refreshes. 100 per page; browse or export all. Expand a record for full fields."
  ],
  [
    "日志连接中断：{0}，自动重试。",
    "Log connection interrupted: {0}. Retrying automatically."
  ],
  [
    "逐条 replay · 采集轨迹动画",
    "Trajectory replay · Collected episodes"
  ],
  [
    "成功与失败均可回放。原始关节状态回放与历史动作重建分别标注。",
    "Replay successes and failures. Original joint-state recordings and historical action reconstructions are labeled separately."
  ],
  [
    "选择 replay 采集批次",
    "Select replay collection batch"
  ],
  [
    "等待轨迹",
    "Waiting for trajectories"
  ],
  [
    "选中 replay 的机械臂动画",
    "Robot animation for selected replay"
  ],
  [
    "选择一条轨迹，回放机械臂的完整尝试。",
    "Select a trajectory to replay the full attempt."
  ],
  [
    "播放",
    "Play"
  ],
  [
    "Replay 动画帧",
    "Replay animation frame"
  ],
  [
    "播放速度",
    "Playback speed"
  ],
  [
    "腕部视角",
    "Wrist view"
  ],
  [
    "{2} · 场景 {3}",
    "{2} · Scene {3}"
  ],
  [
    "{4} · {5} 动作 · {6}",
    "{4} · {5} actions · {6}"
  ],
  [
    "{7} · ▶ 查看动画",
    "{7} · ▶ View replay"
  ],
  [
    "✓ 成功",
    "✓ Success"
  ],
  [
    "✗ 未完成",
    "✗ Incomplete"
  ],
  [
    "稳定放入托盘",
    "Placed stably in tray"
  ],
  [
    "当前筛选没有轨迹",
    "No trajectories match this filter"
  ],
  [
    "· 被拒绝",
    "· Rejected"
  ],
  [
    "初始状态",
    "Initial state"
  ],
  [
    "帧 {0}/{1} · {2} s",
    "Frame {0}/{1} · {2} s"
  ],
  [
    "准备 replay，历史轨迹正在校验与重建…",
    "Preparing replay; validating and reconstructing the historical trajectory…"
  ],
  [
    "✓ 任务成功",
    "✓ Task succeeded"
  ],
  [
    "稳定入盘",
    "Stable placement in tray"
  ],
  [
    "原始回放：采集时保存的逐帧关节状态。",
    "Original replay: per-frame joint states saved during collection."
  ],
  [
    "历史重建：按原始动作重新模拟，已逐步校验末端与物体位置；不是当时录制的视频。",
    "Historical reconstruction: re-simulated from original actions, with end-effector and object positions checked step by step. This is not a video recorded at the time."
  ],
  [
    "该 replay 无法播放",
    "This replay cannot be played"
  ],
  [
    "外部视角",
    "External view"
  ],
  [
    "进行中",
    "In progress"
  ],
  [
    "失败",
    "Failed"
  ],
  [
    "已取消",
    "Cancelled"
  ],
  [
    "连续采集 · 按模型版本分轮",
    "Continuous collection · Rounds by model version"
  ],
  [
    "记录每局完成后的累计成功率；换模型后另起一轮，服务重启继续累计。探索采集与独立评测分别统计。",
    "Records cumulative success after each episode. A new model starts a new round; totals survive server restarts. Exploration and independent evaluation are tracked separately."
  ],
  [
    "导出 CSV ↓",
    "Export CSV ↓"
  ],
  [
    "运行模型",
    "Running model"
  ],
  [
    "完整尝试",
    "Complete attempts"
  ],
  [
    "成功",
    "Success"
  ],
  [
    "采集成功率",
    "Collection success rate"
  ],
  [
    "决策方式",
    "Decision mode"
  ],
  [
    "逐局任务执行记录 · 每局结果与累计成功率",
    "Episode execution records · Outcomes and cumulative success"
  ],
  [
    "显示最近 50 局；全部记录可导出 CSV。累计成功率在各模型版本内单独计算。",
    "Showing the latest 50 episodes; export all as CSV. Cumulative success is computed separately for each model version."
  ],
  [
    "模型轮次",
    "Model round"
  ],
  [
    "本版本第几局",
    "Episode within version"
  ],
  [
    "场景",
    "Scene"
  ],
  [
    "任务结果",
    "Task outcome"
  ],
  [
    "累计成功 / 总局数",
    "Successes / Total episodes"
  ],
  [
    "累计成功率",
    "Cumulative success"
  ],
  [
    "完成时间",
    "Completion time"
  ],
  [
    "加载记录中…",
    "Loading records…"
  ],
  [
    "导出逐局成功率与场景种子 ↓",
    "Export episode success and scene seeds ↓"
  ],
  [
    "每轮训练与任务完成率对比",
    "Training and task success by round"
  ],
  [
    "Loss 为训练 batch 损失。每轮使用新的配对评测场景；以本轮候选与父模型的差值判断提升。",
    "Loss is measured per training batch. Each round uses new paired evaluation scenes; improvement is the candidate–parent difference within that round."
  ],
  [
    "训练轮",
    "Training round"
  ],
  [
    "动作样本 / 成功轨迹",
    "Action samples / Successful trajectories"
  ],
  [
    "Loss 首次 → 末次",
    "First → Last loss"
  ],
  [
    "已记录更新",
    "Recorded updates"
  ],
  [
    "开发完成率 前 → 选中",
    "Development success: Before → Selected"
  ],
  [
    "选中更新",
    "Selected update"
  ],
  [
    "评测 候选 / 父模型",
    "Evaluation: Candidate / Parent"
  ],
  [
    "配对进度",
    "Paired progress"
  ],
  [
    "同批提升",
    "Paired gain"
  ],
  [
    "历史轮次保留原有每 5 步记录；新启动的训练每次更新记录 loss。没有记录的点不补写。",
    "Historical rounds retain their five-step records. New training logs loss at every update. Missing points are not filled in."
  ],
  [
    "导出全部已记录 loss ↓",
    "Export all recorded loss ↓"
  ],
  [
    "等待记录",
    "Waiting for records"
  ],
  [
    "每个模型版本的逐局采集成功率",
    "Per-episode collection success by model version"
  ],
  [
    "每轮训练的 loss 曲线",
    "Training loss by round"
  ],
  [
    "局",
    "episodes"
  ],
  [
    "局（各版本独立累计）",
    "episodes (counted per version)"
  ],
  [
    "次更新",
    "updates"
  ],
  [
    "指定模型",
    "Selected model"
  ],
  [
    "V0 · 初始模型",
    "V0 · Initial model"
  ],
  [
    "· 正在运行",
    "· Running"
  ],
  [
    "随机探索",
    "Random exploration"
  ],
  [
    "确定性决策",
    "Deterministic decisions"
  ],
  [
    "等待机械臂完成第一局采集",
    "Waiting for the first collection episode to finish"
  ],
  [
    "已部署 V{0}",
    "Deployed V{0}"
  ],
  [
    "未通过 · 保留当前模型",
    "Gate failed · Current model retained"
  ],
  [
    "评测中",
    "Evaluating"
  ],
  [
    "评测{0}",
    "Evaluation {0}"
  ],
  [
    "通过 · 等待部署",
    "Passed · Waiting for deployment"
  ],
  [
    "第 {1} 轮",
    "Round {1}"
  ],
  [
    "（临时）",
    "(provisional)"
  ],
  [
    "等待第一轮训练",
    "Waiting for the first training round"
  ],
  [
    "第 {0} 轮",
    "Round {0}"
  ],
  [
    "第 {2} 局",
    "Episode {2}"
  ],
  [
    "等待第一局完整任务结果",
    "Waiting for the first complete task outcome"
  ],
  [
    "记录更新：{0} · 每 5 秒保存到本机",
    "Records updated: {0} · Saved locally every 5 seconds"
  ],
  [
    "{0}/{1} 对场景 · {2}",
    "{0}/{1} paired scenes · {2}"
  ],
  [
    "未发布",
    "Not released"
  ],
  [
    "{0}/{1} 局完成",
    "{0}/{1} episodes complete"
  ],
  [
    "每轮在同一批新场景比较候选与父模型；半透明点为进行中的结果。",
    "Each round compares candidate and parent on the same new scenes. Translucent points show evaluations in progress."
  ],
  [
    "各运行版本的探索采集成绩；成功局数 ÷ 已完成局数。",
    "Exploration performance by running version: successful episodes divided by completed episodes."
  ],
  [
    "当轮父模型",
    "Parent for this round"
  ],
  [
    "训练后候选",
    "Trained candidate"
  ],
  [
    "探索采集成功率",
    "Exploration success rate"
  ],
  [
    "等待第一轮成绩",
    "Waiting for the first round's results"
  ],
  [
    "完成采集和训练后，真实评测结果会显示在这里。",
    "Actual evaluation results appear after collection and training."
  ],
  [
    "每轮如实记录，包含持平、下降与未发布。",
    "Every round is retained, including ties, regressions, and unreleased candidates."
  ],
  [
    "历史轮次任务成功率曲线",
    "Task success across historical rounds"
  ],
  [
    "完整任务成功率，按真实记录绘制",
    "Full-task success rate from recorded results"
  ],
  [
    "· 临时成绩",
    "· Provisional result"
  ],
  [
    "{0} · 最新{1} {2}{3} · {4}",
    "{0} · Latest {1} {2}{3} · {4}"
  ],
  [
    "已记录 {0} 轮学习",
    "{0} learning rounds recorded"
  ],
  [
    "已记录 {0} 个运行版本",
    "{0} running versions recorded"
  ],
  [
    "采集",
    "Collection"
  ],
  [
    "（评测中）",
    "(evaluating)"
  ],
  [
    "当前模型",
    "Current model"
  ],
  [
    "RSI 每轮变化",
    "RSI changes by round"
  ],
  [
    "每轮配对比较父模型与候选模型；通过发布门槛后切换版本。",
    "Each round pairs the parent and candidate. Switch versions only after passing the release gate."
  ],
  [
    "运行模型版本与采集成功率",
    "Running model versions and collection success"
  ],
  [
    "上方为随机探索采集成功率；每轮发布依据下方独立配对评测。",
    "Above: random-exploration success. Releases depend on the independent paired evaluation below."
  ],
  [
    "查看全部轮次、回放与成功率曲线 →",
    "View all rounds, replays, and success curves →"
  ],
  [
    "· 第 {0} 轮学习",
    "· Learning round {0}"
  ],
  [
    "训练",
    "Training"
  ],
  [
    "评测",
    "Evaluation"
  ],
  [
    "更新",
    "Update"
  ],
  [
    "{4}/{5} 局成功",
    "{4}/{5} successful episodes"
  ],
  [
    "已发布 V{0}",
    "Released V{0}"
  ],
  [
    "已中止 · 未发布",
    "Aborted · Not released"
  ],
  [
    "通过 · 等待更新",
    "Passed · Waiting for update"
  ],
  [
    "等待最终结果",
    "Waiting for final result"
  ],
  [
    "第 {3} 轮",
    "Round {3}"
  ],
  [
    "训练 loss · 首次 → 末次",
    "Training loss · First → Last"
  ],
  [
    "{7} / {8} 次更新{9}",
    "{7} / {8} updates{9}"
  ],
  [
    "任务成功率 · 父模型 → 候选{10}",
    "Task success · Parent → Candidate{10}"
  ],
  [
    "真实成功轨迹",
    "Actual successful trajectories"
  ],
  [
    "{15} 局 / {16} 动作样本",
    "{15} episodes / {16} action samples"
  ],
  [
    "· 选中第 {0} 步",
    "· Selected step {0}"
  ],
  [
    "{0} / {1} 配对场景",
    "{0} / {1} paired scenes"
  ],
  [
    "训练后独立评测",
    "Independent evaluation after training"
  ],
  [
    "等待第一轮训练。采集成功轨迹满额后自动开始。",
    "Waiting for the first training round. Starts automatically when enough successful trajectories are collected."
  ],
  [
    "运行模型 V{0}",
    "Running model V{0}"
  ],
  [
    "指定运行模型",
    "Selected running model"
  ],
  [
    "运行模型待确认",
    "Running model not confirmed"
  ],
  [
    "· 准备首次学习",
    "· Preparing first training round"
  ],
  [
    "{0}第 {1} 局",
    "{0} episode {1}"
  ],
  [
    "本次",
    "This session"
  ],
  [
    "本版本",
    "This version"
  ],
  [
    "等待第一局任务",
    "Waiting for the first episode"
  ],
  [
    "数据采集",
    "Data collection"
  ],
  [
    "持续采集中",
    "Collecting continuously"
  ],
  [
    "等待采集",
    "Waiting for collection"
  ],
  [
    "{0}/{1} 成功 · {2}",
    "{0}/{1} succeeded · {2}"
  ],
  [
    "等待完整轨迹",
    "Waiting for complete trajectories"
  ],
  [
    "机械臂仿真",
    "Robot simulation"
  ],
  [
    "模型训练中",
    "Model training in progress"
  ],
  [
    "等待下一轮",
    "Waiting for the next round"
  ],
  [
    "第 {0} 轮 · 更新 {1}/{2} · loss {3}",
    "Round {0} · Update {1}/{2} · Loss {3}"
  ],
  [
    "成功轨迹达到阈值后启动",
    "Starts when successful trajectories reach the threshold"
  ],
  [
    "配对评测中",
    "Paired evaluation in progress"
  ],
  [
    "等待候选模型",
    "Waiting for candidate model"
  ],
  [
    "{0}/{1} 对 · 当前候选 {2}",
    "{0}/{1} pairs · Current candidate {2}"
  ],
  [
    "同场景比较候选与父模型",
    "Compare candidate and parent on identical scenes"
  ],
  [
    "验证并部署中",
    "Validating and deploying"
  ],
  [
    "当前运行版本",
    "Currently running version"
  ],
  [
    "评测通过后更新",
    "Update after passing evaluation"
  ],
  [
    "本次任务",
    "Current task"
  ],
  [
    "{0} · 完整任务成功率",
    "{0} · Full-task success rate"
  ],
  [
    "最近一局",
    "Latest episode"
  ],
  [
    "{0} 成功 / {1} 局 · {2} 失败",
    "{0} successes / {1} episodes · {2} failures"
  ],
  [
    "等待本版本完成第一局任务",
    "Waiting for this version's first completed task"
  ],
  [
    "场景 {0} · {1}",
    "Scene {0} · {1}"
  ],
  [
    "尚无结果",
    "No result yet"
  ],
  [
    "本次任务已保存；上方历史轮次展示独立评测结果。",
    "This task is saved. Historical rounds above show independent evaluation results."
  ],
  [
    "每局完成后持久保存，训练页查看逐局记录与轮次对比",
    "Each completed episode is persisted. View episode records and round comparisons in the report."
  ],
  [
    "{0} 局 · {1} 成功 · {2} 失败",
    "{0} episodes · {1} successes · {2} failures"
  ],
  [
    "等待当前模型完成采集",
    "Waiting for the current model to finish collection"
  ],
  [
    "记录暂时不可用 · {0}",
    "Records temporarily unavailable · {0}"
  ],
  [
    "上一局模型",
    "Previous episode's model"
  ],
  [
    "模型来源",
    "Model source"
  ],
  [
    "规则策略",
    "Rule policy"
  ],
  [
    "本地模型",
    "Local model"
  ],
  [
    "待确认",
    "Unconfirmed"
  ],
  [
    "模型加载中…",
    "Loading model…"
  ],
  [
    "尚未启动",
    "Not started yet"
  ],
  [
    "等待本局模型加载完成",
    "Waiting for this episode's model to load"
  ],
  [
    "启动后显示实际运行模型",
    "Actual running model appears after start"
  ],
  [
    "正在本机执行规则",
    "Executing rules locally"
  ],
  [
    "正在本机推理",
    "Running local inference"
  ],
  [
    "已暂停 · 本局模型保持锁定",
    "Paused · Episode model remains fixed"
  ],
  [
    "正在停止",
    "Stopping"
  ],
  [
    "本局已结束",
    "Episode finished"
  ],
  [
    "不使用模型权重",
    "No model weights used"
  ],
  [
    "下次启动：{0}{1}",
    "Next run: {0}{1}"
  ],
  [
    "待选择",
    "Not selected"
  ],
  [
    "未选择检查点",
    "No checkpoint selected"
  ],
  [
    "暂无已记录数据",
    "No recorded data yet"
  ],
  [
    "{3} 次更新",
    "{3} updates"
  ],
  [
    "开发集完成率",
    "Development-set success"
  ],
  [
    "训练 Loss",
    "Training Loss"
  ],
  [
    "{3} · 第 {4} 步 · {5}",
    "{3} · Step {4} · {5}"
  ],
  [
    "跟随最新轮次",
    "Follow latest round"
  ],
  [
    "第 {1} 轮 · {2}",
    "Round {1} · {2}"
  ],
  [
    "已完成",
    "Completed"
  ],
  [
    "等待第一轮成功轨迹训练。",
    "Waiting for the first successful-trajectory training round."
  ],
  [
    "训练开始后显示实际优化指标。",
    "Actual optimization metrics appear after training starts."
  ],
  [
    "尚无训练与独立评测记录。",
    "No training or independent evaluation records yet."
  ],
  [
    "{0} 个动作样本",
    "{0} action samples"
  ],
  [
    "起始 {0}",
    "Starting {0}"
  ],
  [
    "开发完成率 {0}",
    "Development success {0}"
  ],
  [
    "训练更新进度",
    "Training update progress"
  ],
  [
    "第 {2} 轮 · {3}",
    "Round {2} · {3}"
  ],
  [
    "训练完成",
    "Training complete"
  ],
  [
    "训练失败",
    "Training failed"
  ],
  [
    "更新速度",
    "Update speed"
  ],
  [
    "学习率",
    "Learning rate"
  ],
  [
    "未记录",
    "Not recorded"
  ],
  [
    "开发完成率",
    "Development success"
  ],
  [
    "初始 {0}",
    "Initial {0}"
  ],
  [
    "开发集",
    "Development set"
  ],
  [
    "等待训练参数",
    "Waiting for training parameters"
  ],
  [
    "配对样本数量",
    "Paired sample count"
  ],
  [
    "任务覆盖",
    "Task coverage"
  ],
  [
    "完成率提升",
    "Success rate improvement"
  ],
  [
    "置信区间",
    "Confidence interval"
  ],
  [
    "任务退化检查",
    "Task regression check"
  ],
  [
    "风险检查",
    "Risk check"
  ],
  [
    "发布门槛",
    "Release gate"
  ],
  [
    "通过",
    "Passed"
  ],
  [
    "未通过，保留当前模型",
    "Failed; keep current model"
  ],
  [
    "未通过",
    "Failed"
  ],
  [
    "已记录 {0} 轮，发布 {1} 个版本。最新独立评测：父模型 {2} → 候选 {3}{4}。{5}Loss 与独立完成率分别展示；当前未设置自动收敛判定。",
    "{0} rounds recorded, {1} versions released. Latest independent evaluation: parent {2} → candidate {3}{4}. {5}Loss and independent success are shown separately; no automatic convergence criterion is configured."
  ],
  [
    "（尚未完成）",
    "(not complete yet)"
  ],
  [
    "本轮未通过发布门槛。",
    "This round did not pass the release gate."
  ],
  [
    "[已隐藏]",
    "[redacted]"
  ],
  [
    "[图像内容省略]",
    "[image omitted]"
  ],
  [
    "{0} 条匹配",
    "{0} matching entries"
  ],
  [
    "实时采集 · 最新记录在上方",
    "Live collection · Newest records first"
  ],
  [
    "· 步 {0}",
    "· Step {0}"
  ],
  [
    "暂无匹配记录",
    "No matching records"
  ],
  [
    "部分作业日志暂不可用，自动重试",
    "Some job logs are unavailable; retrying automatically"
  ],
  [
    "视图已暂停 · 后台继续采集",
    "View paused · Background collection continues"
  ],
  [
    "学习记录 · {0} · 每 5 秒同步",
    "Learning records · {0} · Sync every 5 seconds"
  ],
  [
    "学习记录连接中断 · 保留上次数据，自动重试",
    "Learning-record connection interrupted · Keeping previous data and retrying"
  ],
  [
    "实验室功能",
    "Lab navigation"
  ],
  [
    "自主训练",
    "Self-Evolving Training"
  ],
  [
    "任务配置",
    "Task settings"
  ],
  [
    "场景种子",
    "Scene seed"
  ],
  [
    "RSI 自动更新",
    "RSI automatic updates"
  ],
  [
    "指定 RSI 检查点",
    "Choose RSI checkpoint"
  ],
  [
    "初始 RSI-Jev",
    "Initial RSI-Jev"
  ],
  [
    "当前部署模型",
    "Currently deployed model"
  ],
  [
    "检查点",
    "Checkpoint"
  ],
  [
    "选择模型",
    "Select model"
  ],
  [
    "实际使用的模型",
    "Actual model in use"
  ],
  [
    "读取运行状态…",
    "Reading run status…"
  ],
  [
    "等待连接",
    "Waiting for connection"
  ],
  [
    "版本",
    "Version"
  ],
  [
    "执行与观测",
    "Execution and observations"
  ],
  [
    "仿真真值",
    "Simulator state"
  ],
  [
    "直接图像 · 当前 RSI 不支持",
    "Direct images · Unsupported by current RSI"
  ],
  [
    "正在读取训练后端支持的模式…",
    "Reading training backend capabilities…"
  ],
  [
    "模型相机观测",
    "Model camera observations"
  ],
  [
    "未启用模型相机；中央画面为仿真预览。",
    "No model cameras enabled; the center view previews the simulation."
  ],
  [
    "连续采集",
    "Continuous collection"
  ],
  [
    "随机任务",
    "Random tasks"
  ],
  [
    "随机场景",
    "Random scenes"
  ],
  [
    "自动训练与评测",
    "Automatic training and evaluation"
  ],
  [
    "等待采集状态",
    "Waiting for collection status"
  ],
  [
    "训练阈值",
    "Training thresholds"
  ],
  [
    "新增轨迹",
    "New trajectories"
  ],
  [
    "最少成功",
    "Minimum successes"
  ],
  [
    "训练更新数",
    "Training updates"
  ],
  [
    "本次采集",
    "Current collection"
  ],
  [
    "0 局 · 0 成功 · 0 失败",
    "0 episodes · 0 successes · 0 failures"
  ],
  [
    "模型与执行信息",
    "Model and execution details"
  ],
  [
    "动作决策",
    "Action decisions"
  ],
  [
    "模型相机",
    "Model cameras"
  ],
  [
    "部署版本",
    "Deployed version"
  ],
  [
    "本局版本",
    "Episode version"
  ],
  [
    "请求协议",
    "Request protocol"
  ],
  [
    "等待请求",
    "Waiting for request"
  ],
  [
    "执行方式",
    "Execution mode"
  ],
  [
    "探索反馈",
    "Exploration feedback"
  ],
  [
    "渲染",
    "Rendering"
  ],
  [
    "机械臂实时画面",
    "Live robot view"
  ],
  [
    "连接场景…",
    "Connecting to scene…"
  ],
  [
    "等待模型",
    "Waiting for model"
  ],
  [
    "等待任务",
    "Waiting for task"
  ],
  [
    "MuJoCo 实时渲染的机械臂与任务场景",
    "Live MuJoCo rendering of the robot and task scene"
  ],
  [
    "0 动作",
    "0 actions"
  ],
  [
    "▶ 开始任务",
    "▶ Start task"
  ],
  [
    "Ⅱ 暂停",
    "Ⅱ Pause"
  ],
  [
    "单步",
    "Step"
  ],
  [
    "■ 停止采集",
    "■ Stop collection"
  ],
  [
    "重置",
    "Reset"
  ],
  [
    "回放",
    "Replay"
  ],
  [
    "0 帧",
    "0 frames"
  ],
  [
    "实时",
    "Live"
  ],
  [
    "相机",
    "Camera"
  ],
  [
    "旋转",
    "Rotation"
  ],
  [
    "距离",
    "Distance"
  ],
  [
    "运行与学习面板",
    "Execution and learning panel"
  ],
  [
    "右侧功能",
    "Inspector tabs"
  ],
  [
    "优化",
    "Optimize"
  ],
  [
    "迭代",
    "Iterations"
  ],
  [
    "收敛",
    "Trends"
  ],
  [
    "日志",
    "Logs"
  ],
  [
    "决策时间线",
    "Decision timeline"
  ],
  [
    "模型观测 · 仿真真值",
    "Model observation · Simulator state"
  ],
  [
    "夹持",
    "Grasp"
  ],
  [
    "末端 / m",
    "End effector / m"
  ],
  [
    "物体 / m",
    "Object / m"
  ],
  [
    "本局结果",
    "Episode outcome"
  ],
  [
    "等待执行",
    "Waiting for execution"
  ],
  [
    "训练进度",
    "Training progress"
  ],
  [
    "训练轮次",
    "Training round"
  ],
  [
    "导出 Loss CSV ↓",
    "Export Loss CSV ↓"
  ],
  [
    "优化状态",
    "Optimization status"
  ],
  [
    "训练参数",
    "Training parameters"
  ],
  [
    "读取迭代记录…",
    "Reading iteration records…"
  ],
  [
    "完成率与收敛",
    "Success and convergence"
  ],
  [
    "成功率统计来源",
    "Success-rate source"
  ],
  [
    "独立评测 · 父模型 / 候选",
    "Independent evaluation · Parent / Candidate"
  ],
  [
    "探索采集 · 模型版本",
    "Exploration collection · Model version"
  ],
  [
    "各轮训练 Loss",
    "Training loss by round"
  ],
  [
    "导出轮次 CSV ↓",
    "Export rounds CSV ↓"
  ],
  [
    "实时仿真",
    "Live simulation"
  ],
  [
    "当前训练轮次",
    "Current training round"
  ],
  [
    "已接收的全部日志",
    "All received logs"
  ],
  [
    "搜索事件或详情",
    "Search events or details"
  ],
  [
    "连接日志中…",
    "Connecting to logs…"
  ],
  [
    "可展开输入、候选、返回与训练事件；每组日志最多保留 1,000 条 / 2 MiB，显示最新 100 条。刷新后实时快照重新采集。",
    "Expand inputs, candidates, responses, and training events. Each log group retains up to 1,000 entries / 2 MiB, displaying the latest 100. Live snapshots are collected again after refresh."
  ],
  [
    "同步学习记录…",
    "Syncing learning records…"
  ],
  [
    "查看完整报告 ↓",
    "View full report ↓"
  ],
  [
    "查看训练曲线、独立评测与轨迹记录",
    "View training curves, independent evaluation, and trajectories"
  ],
  [
    "加载报告",
    "Load report"
  ],
  [
    "模型配置、测试与对比",
    "Model configurations, tests, and comparisons"
  ],
  [
    "后端更新中，执行配置暂不可用；请稍后刷新。",
    "Backend updating; execution settings are temporarily unavailable. Refresh shortly."
  ],
  [
    "模型选择技能，程序执行技能轨迹。",
    "The model selects a skill; the program executes its trajectory."
  ],
  [
    "每步重新观测，模型选择固定 XYZ 小步或夹爪动作。",
    "Observe again each step; the model chooses a fixed XYZ increment or gripper action."
  ],
  [
    "每步由模型选择子目标，再分别决定 X / Y / Z 与夹爪。",
    "Each step, the model selects a subgoal, then X / Y / Z and gripper commands independently."
  ],
  [
    "使用已选相机的 RGB-D 检测坐标；检测失败不回退到真值。",
    "Use RGB-D detections from selected cameras. Detection failures never fall back to simulator state."
  ],
  [
    "使用仿真真值；所选相机仅作观测预览。",
    "Use simulator state; selected cameras provide previews only."
  ],
  [
    "RGB-D 检测坐标",
    "RGB-D detected coordinates"
  ],
  [
    "模型观测 · RGB-D{0}",
    "Model observation · RGB-D{0}"
  ],
  [
    "· 检测不可用",
    "· Detection unavailable"
  ],
  [
    "RGB-D 定位",
    "RGB-D localization"
  ],
  [
    "启动后显示所选相机的实际采集画面。",
    "Actual captures from selected cameras appear after starting."
  ],
  [
    "{3}相机实际 RGB 观测",
    "Actual RGB observation from {3} camera"
  ],
  [
    "用于 RGB-D 定位",
    "Used for RGB-D localization"
  ],
  [
    "相机观测读取失败：{0}",
    "Camera observation could not be read: {0}"
  ],
  [
    "夹持物体",
    "Holding object"
  ],
  [
    "夹爪闭合",
    "Gripper closed"
  ],
  [
    "夹爪打开",
    "Gripper open"
  ],
  [
    "对齐物体",
    "Align with object"
  ],
  [
    "下降到抓取位置",
    "Descend to grasp"
  ],
  [
    "移向目标盘",
    "Move to target tray"
  ],
  [
    "撤离物体",
    "Retract from object"
  ],
  [
    "张开夹爪重试",
    "Open gripper and retry"
  ],
  [
    "机械臂已暂停",
    "Robot paused"
  ],
  [
    "模型正在选择下一个动作",
    "Model choosing the next action"
  ],
  [
    "正在执行模型动作",
    "Executing model action"
  ],
  [
    "上一个动作已完成",
    "Previous action completed"
  ],
  [
    "等待开始任务",
    "Waiting to start task"
  ],
  [
    "根据当前物体、夹爪和目标位置决定下一步",
    "Choose the next step from current object, gripper, and target positions"
  ],
  [
    "开始任务后，实时观察模型如何操控机械臂",
    "Start a task to watch the model control the robot live"
  ],
  [
    "第 {0} 个动作",
    "Action {0}"
  ],
  [
    "子目标",
    "Subgoal"
  ],
  [
    "Ⅱ 已暂停",
    "Ⅱ Paused"
  ],
  [
    "模型推理中…",
    "Model inference…"
  ],
  [
    "▶ 动作执行中…",
    "▶ Executing action…"
  ],
  [
    "✓ 已执行",
    "✓ Executed"
  ],
  [
    "未执行",
    "Not executed"
  ],
  [
    "等待模型选择动作",
    "Waiting for action selection"
  ],
  [
    "场景 {0} · {1} 已完成{2}",
    "Scene {0} · {1} completed{2}"
  ],
  [
    "· 1 进行中",
    "· 1 in progress"
  ],
  [
    "正在加载模型…",
    "Loading model…"
  ],
  [
    "等待本局首次决策…",
    "Waiting for the episode's first decision…"
  ],
  [
    "开始一局任务，观察模型如何选择和执行动作。",
    "Start a task to see how the model selects and executes actions."
  ],
  [
    "切换视角中…",
    "Switching camera…"
  ],
  [
    "切换外部视角",
    "Switch to external view"
  ],
  [
    "切换腕部视角",
    "Switch to wrist view"
  ],
  [
    "{0} · 场景 {1} · {2}",
    "{0} · Scene {1} · {2}"
  ],
  [
    "堆叠物体",
    "Stack objects"
  ],
  [
    "RSI 检查点",
    "RSI checkpoint"
  ],
  [
    "部署模型",
    "Deployed model"
  ],
  [
    "{0} 个失败动作已反馈",
    "{0} failed actions fed back"
  ],
  [
    "失败经验用于后续探索",
    "Failure experience informs later exploration"
  ],
  [
    "等待模型请求",
    "Waiting for model request"
  ],
  [
    "后台学习闭环运行中 · {0} · {1}",
    "Background learning loop running · {0} · {1}"
  ],
  [
    "采集继续",
    "Collection continues"
  ],
  [
    "采集已停止",
    "Collection stopped"
  ],
  [
    "后台作业运行中",
    "Background job running"
  ],
  [
    "自动训练未启用",
    "Automatic training disabled"
  ],
  [
    "新增 {0}/{1} 局 · 成功 {2}/{3} 局 · 满额自动训练",
    "New episodes {0}/{1} · Successes {2}/{3} · Train when thresholds are met"
  ],
  [
    "正在停止…",
    "Stopping…"
  ],
  [
    "▶ 继续",
    "▶ Resume"
  ],
  [
    "✓ 任务完成",
    "✓ Task complete"
  ],
  [
    "未完成 · {0}",
    "Incomplete · {0}"
  ],
  [
    "暂停中",
    "Paused"
  ],
  [
    "等待任务结果",
    "Waiting for task outcome"
  ],
  [
    "{0} 帧",
    "{0} frames"
  ],
  [
    "回放 · 第 {0} 帧",
    "Replay · Frame {0}"
  ],
  [
    "获取物体",
    "Acquire object"
  ],
  [
    "搬运",
    "Transfer"
  ],
  [
    "放置",
    "Place"
  ],
  [
    "对齐",
    "Align"
  ],
  [
    "下降",
    "Descend"
  ],
  [
    "抓取",
    "Grasp"
  ],
  [
    "抬升",
    "Lift"
  ],
  [
    "降低",
    "Lower"
  ],
  [
    "释放",
    "Release"
  ],
  [
    "撤离",
    "Retract"
  ],
  [
    "重试",
    "Retry"
  ],
  [
    "· 当前阶段：{0}",
    "· Current phase: {0}"
  ],
  [
    "选择 RSI 模型",
    "Select RSI model"
  ],
  [
    "自我提升",
    "Self-improvement"
  ],
  [
    "初始化",
    "Initialization"
  ],
  [
    "服务未连接",
    "Service disconnected"
  ],
  [
    "Transformer 三维结构 · 真实参数更新",
    "Transformer 3D structure · Actual parameter updates"
  ],
  [
    "真实模块结构与参数快照。冻结主干保持静止，训练头的颜色、光强和参数高度来自已记录的权重变化。",
    "Actual module structure and parameter snapshots. The frozen backbone stays fixed; the training head's color, intensity, and parameter height reflect recorded weight changes."
  ],
  [
    "参数记录训练轮次",
    "Training round for parameter records"
  ],
  [
    "参数张量",
    "Parameter tensor"
  ],
  [
    "参数显示方式",
    "Parameter display mode"
  ],
  [
    "相对初始权重增量",
    "Change from initial weights"
  ],
  [
    "本次更新增量",
    "Current update delta"
  ],
  [
    "权重数值",
    "Weight values"
  ],
  [
    "读取参数记录",
    "Reading parameter records"
  ],
  [
    "Transformer 主干、QKV 投影、交叉注意力和真实参数增量的三维展示",
    "3D view of Transformer backbone, QKV projections, cross-attention, and actual parameter deltas"
  ],
  [
    "等待参数快照",
    "Waiting for parameter snapshots"
  ],
  [
    "蓝色负值 · 红色正值 · 拖动旋转",
    "Blue: negative · Red: positive · Drag to rotate"
  ],
  [
    "快照对应步数",
    "Snapshot step"
  ],
  [
    "本次变化 Δ L2",
    "Current change Δ L2"
  ],
  [
    "相对初始 Δ L2",
    "Change from initial Δ L2"
  ],
  [
    "冻结主干",
    "Frozen backbone"
  ],
  [
    "参数历史回放：选择快照",
    "Parameter history replay: select snapshot"
  ],
  [
    "循环回放",
    "Loop replay"
  ],
  [
    "逐步参数历史从后续训练开始采集。旧轮次仅比较父模型与选中检查点。",
    "Step-by-step parameter history is collected for new training. Older rounds compare parent and selected checkpoints only."
  ],
  [
    "播放历史回放",
    "Play history"
  ],
  [
    "返回最新快照",
    "Latest snapshot"
  ],
  [
    "{0} · {1} 个冻结参数",
    "{0} · {1} frozen parameters"
  ],
  [
    "TRANSFORMER · {0} 层",
    "TRANSFORMER · {0} layers"
  ],
  [
    "等待模型结构",
    "Waiting for model structure"
  ],
  [
    "FROZEN / 主干冻结",
    "FROZEN / Backbone frozen"
  ],
  [
    "真实抽样 · {0} 点",
    "Actual samples · {0} points"
  ],
  [
    "模块连线表示结构连接；颜色与高度来自真实参数，非注意力分数。",
    "Lines show structural connections. Colors and heights reflect actual parameters, not attention scores."
  ],
  [
    "训练已完成",
    "Training completed"
  ],
  [
    "训练已取消",
    "Training cancelled"
  ],
  [
    "训练状态未知",
    "Unknown training status"
  ],
  [
    "暂停历史回放",
    "Pause history"
  ],
  [
    "历史回放中",
    "Playing history"
  ],
  [
    "最终快照",
    "Final snapshot"
  ],
  [
    "最新快照",
    "Latest snapshot"
  ],
  [
    "历史快照 · 已暂停",
    "Historical snapshot · Paused"
  ],
  [
    "等待训练",
    "Waiting for training"
  ],
  [
    "暂无参数记录",
    "No parameter records yet"
  ],
  [
    "父检查点",
    "Parent checkpoint"
  ],
  [
    "初始",
    "Initial"
  ],
  [
    "检测到变化",
    "Change detected"
  ],
  [
    "{0} 组 · 冻结",
    "{0} groups · Frozen"
  ],
  [
    "实际权重数值",
    "Actual weight values"
  ],
  [
    "实际权重增量",
    "Actual weight deltas"
  ],
  [
    "历史缺少参数记录，等待后续训练",
    "Missing historical parameter records; waiting for new training"
  ],
  [
    "参数历史回放 · 快照 {0}/{1} · 张量 {2} · {3} 个参数 · L2 {4}",
    "Parameter history · Snapshot {0}/{1} · Tensor {2} · {3} parameters · L2 {4}"
  ],
  [
    "无参数记录",
    "No parameter records"
  ],
  [
    "快照 {0}/{1}，对应第 {2} 步",
    "Snapshot {0}/{1}, corresponding to step {2}"
  ],
  [
    "参数记录暂不可用",
    "Parameter records temporarily unavailable"
  ],
  [
    "来源：每次优化器更新后的真实快照。只显示抽样参数，变化范数使用完整张量计算。",
    "Source: actual snapshots after each optimizer update. Only sampled parameters are shown; change norms use the full tensors."
  ],
  [
    "历史数据：仅父模型与选中检查点的真实权重对比，未记录的中间更新无法还原。",
    "Historical data: actual weights from the parent and selected checkpoints only. Unrecorded intermediate updates cannot be reconstructed."
  ],
  [
    "该轮没有参数快照。后续训练自动记录，不生成虚构的参数变化。",
    "No snapshots for this round. Future training records them automatically; parameter changes are never fabricated."
  ],
  [
    "参数记录不可用",
    "Parameter records unavailable"
  ],
  [
    "训练开始后显示真实参数；目前没有训练轮次。",
    "Actual parameters appear after training starts; no training rounds yet."
  ],
  [
    "连接失败",
    "Connection failed"
  ],
  [
    "无法读取训练记录：{0}。可点击重新加载。",
    "Cannot read training records: {0}. Click Reload to retry."
  ],
  [
    "相机只能选择 external 或 wrist",
    "Cameras must be external or wrist"
  ],
  [
    "相机视角不能重复",
    "Camera views must not be duplicated"
  ],
  [
    "视觉观测至少需要一种相机；无相机请使用 privileged 结构化状态模式",
    "Vision requires at least one camera; use privileged structured state without cameras"
  ],
  [
    "扰动需要 kind、after_cycle 和 delta_xy",
    "Perturbations require kind, after_cycle, and delta_xy"
  ],
  [
    "未知扰动类型",
    "Unknown perturbation type"
  ],
  [
    "扰动时刻必须为 1–199 步",
    "Perturbations must occur after steps 1–199"
  ],
  [
    "扰动 XY 位移必须在 ±0.06 米内",
    "XY perturbations must be within ±0.06 metres"
  ],
  [
    "扰动位移不能全为零",
    "Perturbation displacement cannot be zero"
  ],
  [
    "初始化实验配置",
    "Initialize experiment configuration"
  ],
  [
    "实验已就绪",
    "Experiment ready"
  ],
  [
    "读取观测与相机状态",
    "Read observations and camera state"
  ],
  [
    "动作反馈与物理成功判定",
    "Action feedback and physical success check"
  ],
  [
    "评测扰动后的物理状态",
    "Physics state after evaluation perturbation"
  ],
  [
    "检查所选动作的安全性",
    "Check selected action safety"
  ],
  [
    "动作安全检查完成",
    "Action safety check complete"
  ],
  [
    "候选动作概率低于设定门槛，等待人工处理",
    "Candidate probability is below the threshold; awaiting human intervention"
  ],
  [
    "直接图像模式需要逐步 XYZ 控制和支持图像的 OpenAI 兼容或 Claude 接口",
    "Direct images require incremental XYZ and a vision-capable OpenAI-compatible or Claude interface"
  ],
  [
    "低置信度处理设置",
    "Low-confidence handling settings"
  ],
  [
    "外部评测扰动：",
    "External evaluation perturbation:"
  ],
  [
    "，发生于动作 ",
    ", after action "
  ],
  [
    " 后",
    " after"
  ],
  [
    "正在根据当前观测规划一个短步动作",
    "Planning a short action from the current observation"
  ],
  [
    "短步候选与工作区检查",
    "Short-action candidates and workspace checks"
  ],
  [
    "正在根据当前状态选择子目标",
    "Selecting a subgoal from the current state"
  ],
  [
    "合成 XYZ 与夹爪通道指令",
    "Assemble XYZ and gripper channel commands"
  ],
  [
    "所选短步未通过可执行性检查",
    "Selected short action failed execution checks"
  ],
  [
    "连续三次相同短步未产生位姿或接触变化，已停止；没有切换规则策略。",
    "Three identical short actions produced no pose or contact change. Stopped without switching to a rule policy."
  ],
  [
    "开始",
    "Start"
  ],
  [
    "决策低于门槛，暂停执行",
    "Decision below threshold; execution paused"
  ],
  [
    "物理成功条件验证通过",
    "Physical success conditions verified"
  ],
  [
    "物理帧：关节、控制量与接触反馈",
    "Physics frames: joints, controls, and contact feedback"
  ],
  [
    "实验已停止",
    "Experiment stopped"
  ],
  [
    "正在选择操作阶段",
    "Selecting operation phase"
  ],
  [
    "生成候选并进行安全预演",
    "Generate candidates and run safety previews"
  ],
  [
    "候选动作与准入结果",
    "Candidate actions and admission results"
  ],
  [
    "子目标 ",
    "Subgoal "
  ],
  [
    "：正在选择 XYZ 与夹爪通道",
    ": selecting XYZ and gripper channels"
  ],
  [
    "开始执行：",
    "Start executing:"
  ],
  [
    "决策返回（停止后的结果不会执行）",
    "Decision received (results after stopping are not executed)"
  ],
  [
    "决策返回",
    "Decision received"
  ],
  [
    "模型决策失败",
    "Model decision failed"
  ],
  [
    "实际策略输入",
    "Actual policy input"
  ],
  [
    "物理成功条件尚未满足",
    "Physical success conditions not yet met"
  ],
  [
    "动作预演未找到可执行的前进动作",
    "Action preview found no executable forward action"
  ],
  [
    "连续三次重复选择未带来位姿或接触变化，已停止推理；请查看历史决策后重置。",
    "Three repeated choices produced no pose or contact change. Inference stopped; inspect decision history before resetting."
  ],
  [
    "已达到动作预算",
    "Action budget reached"
  ],
  [
    "没有工作区内的短步动作",
    "No short actions within the workspace"
  ],
  [
    "动作通道概率低于设定门槛：",
    "Action-channel probability below threshold:"
  ],
  [
    "所选动作的仿真预演发生机械臂与台面或障碍接触",
    "The selected action's preview detected arm contact with the table or an obstacle"
  ],
  [
    "所选短步目标不可达",
    "Selected short-action target is unreachable"
  ],
  [
    "完成短步：",
    "Short action completed:"
  ],
  [
    "阶段",
    "Phase"
  ],
  [
    "模型决策失败（",
    "Model decision failed ("
  ],
  [
    "），请查看模型连接测试结果。",
    "). Check the model connection test results."
  ],
  [
    "完成动作：",
    "Action completed:"
  ],
  [
    "执行层检测到台面或障碍接触，已停止",
    "Execution detected contact with the table or an obstacle and stopped"
  ],
  [
    "模型接口请求失败：HTTP ",
    "Model request failed: HTTP "
  ],
  [
    "；请在模型连接中测试配置。",
    "; test the configuration under model connections."
  ],
  [
    "模型接口请求失败：",
    "Model request failed:"
  ],
  [
    "；请检查连接。",
    "; check the connection."
  ],
  [
    "请选择 2–3 路模型进行比较。",
    "Select 2–3 models to compare."
  ],
  [
    "未找到该模型配置，请刷新配置列表。",
    "Model configuration not found. Refresh the configuration list."
  ],
  [
    "模型配置与所选接口类型不一致。",
    "Model configuration does not match the selected interface type."
  ],
  [
    "规则基线和本地 MiniCPM 使用固定模型，不支持模型名覆盖。",
    "The rule baseline and local MiniCPM use fixed models and do not support model-name overrides."
  ],
  [
    " 需要有效的模型名称。",
    " requires a valid model name."
  ],
  [
    " 需要有效的 API 地址。",
    " requires a valid API URL."
  ],
  [
    " 尚未配置 API Key。",
    " has no API key configured."
  ],
  [
    "比较模式或模型数量无效。",
    "Invalid comparison mode or model count."
  ],
  [
    "模型对比状态更新",
    "Model comparison status update"
  ],
  [
    "回放时间必须是非负有限秒数。",
    "Replay time must be a finite, non-negative number of seconds."
  ],
  [
    " 尚未配置，请先在模型连接中完成配置。",
    " is not configured. Complete its model connection first."
  ],
  [
    "此比较已结束，请创建新的比较。",
    "This comparison has finished. Create a new one."
  ],
  [
    "各路使用独立仿真；模型每轮选择子目标，再选择 XYZ 与夹爪通道。",
    "Each lane uses independent physics. Every cycle selects a subgoal, then XYZ and gripper channels."
  ],
  [
    "RGB-D 估计位置用于决策输入；接触反馈、预演安全过滤和最终评分仍来自仿真。",
    "RGB-D position estimates are used for decisions. Contact feedback, preview safety checks, and final scoring still come from simulation."
  ],
  [
    "本地 MiniCPM 共享权重与推理锁；并行模式下 MiniCPM 推理仍串行执行。",
    "Local MiniCPM shares weights and an inference lock; MiniCPM inference remains sequential in parallel mode."
  ],
  [
    "并行最多运行两路；共享硬件与网络，耗时不能视为隔离环境性能基准。",
    "At most two lanes run in parallel. Hardware and network are shared, so latency is not an isolated benchmark."
  ],
  [
    "未找到该比较通道。",
    "Comparison lane not found."
  ],
  [
    "各路使用独立仿真；逐步规划每轮选择一个短步并重新观测。",
    "Each lane uses independent physics. Incremental planning chooses one short action and observes again each cycle."
  ],
  [
    "各路使用独立仿真；阶段选择完成后才进行动作选择。",
    "Each lane uses independent physics. Phase selection precedes action selection."
  ],
  [
    "已启用相机的原始 RGB 直接进入模型；不提供物体或目标坐标。",
    "Raw RGB from enabled cameras goes directly to the model, without object or target coordinates."
  ],
  [
    "连接测试未完成：请检查模型服务状态后重试。",
    "Connection test incomplete. Check model service status and retry."
  ],
  [
    "连接测试超时：请检查网络或模型服务负载，稍后重试。",
    "Connection test timed out. Check network or model service load and retry later."
  ],
  [
    "无法连接模型服务：请检查 API 地址、网络和本地服务是否已启动。",
    "Cannot reach the model service. Check the API URL, network, and whether the local service is running."
  ],
  [
    "响应格式不符合决策接口：请检查所选接口类型、模型和结构化输出支持。",
    "Response does not match the decision interface. Check interface type, model, and structured-output support."
  ],
  [
    "尚未测试。保存配置不会验证 API。",
    "Not tested. Saving a configuration does not verify the API."
  ],
  [
    "输入包含已保存的 API Key，请移除凭证后再提交。",
    "Input contains a saved API key. Remove credentials before submitting."
  ],
  [
    "认证失败（HTTP 401）：请检查 API Key 是否正确或已过期。",
    "Authentication failed (HTTP 401). Check whether the API key is correct or expired."
  ],
  [
    "访问被拒绝（HTTP 403）：请确认账号已获 API 和所选模型的访问权限。",
    "Access denied (HTTP 403). Confirm access to the API and selected model."
  ],
  [
    "未找到接口或模型（HTTP 404）：请检查 API 地址和模型名称。",
    "Endpoint or model not found (HTTP 404). Check the API URL and model name."
  ],
  [
    "请求受限（HTTP 429）：请检查额度与请求频率，稍后重试。",
    "Rate limited (HTTP 429). Check quota and request rate, then retry later."
  ],
  [
    "服务拒绝了连接测试（HTTP ",
    "Service rejected the connection test (HTTP "
  ],
  [
    "）：请检查地址、模型与 API 配置。",
    "). Check URL, model, and API settings."
  ],
  [
    "请提供包含有限数值的有效 JSON。",
    "Provide valid JSON with finite numbers."
  ],
  [
    "JSON 内容不能超过 ",
    "JSON content must not exceed "
  ],
  [
    "模型配置名称不能为空。",
    "Model configuration name must not be empty."
  ],
  [
    "决策问题不能为空。",
    "Decision question must not be empty."
  ],
  [
    "候选名称需为 1–80 个可见字符，描述需为 1–1000 个字符。",
    "Candidate names must be 1–80 visible characters; descriptions must be 1–1000 characters."
  ],
  [
    "服务暂时不可用（HTTP ",
    "Service temporarily unavailable (HTTP "
  ],
  [
    "）：请稍后重试。",
    "). Retry later."
  ],
  [
    "实验已被其他页面重置，请刷新当前实验状态后再操作。",
    "Another page reset the experiment. Refresh its state before continuing."
  ],
  [
    "已有两个连接或决策测试正在进行，请稍后重试。",
    "Two connection or decision tests are already running. Retry later."
  ],
  [
    "请先填写并保存 API 地址、模型和所需的 API Key，再测试连接。",
    "Save the API URL, model, and required API key before testing the connection."
  ],
  [
    "开始模型连接测试",
    "Start model connection test"
  ],
  [
    "连接测试通过，模型已返回有效候选动作；机器人未执行动作。",
    "Connection test passed: the model returned valid candidates. No robot action executed."
  ],
  [
    "连接测试的输入与返回",
    "Connection test input and response"
  ],
  [
    "已有两个连接测试正在进行，请等待其中一个完成后重试。",
    "Two connection tests are already running. Wait for one to finish."
  ],
  [
    "该实验未启用所选相机视角",
    "This experiment has not enabled the selected camera"
  ],
  [
    "当前实验没有相机观测，请先启用相机。",
    "No camera observations in this experiment. Enable a camera first."
  ],
  [
    "相机帧已更新，请读取最新观测。",
    "Camera frame changed. Read the latest observation."
  ],
  [
    "该感知帧没有所选相机视角",
    "The selected camera is not present in this perception frame"
  ],
  [
    "无法恢复系统保存的连接，当前使用内存模式；未读取其他凭证，也未写入明文 Key。",
    "Saved connections could not be restored. Using memory storage; no other credentials were read and no plaintext key was written."
  ],
  [
    "尚未创建模型比较。",
    "No model comparison created yet."
  ],
  [
    "比较已更新，请刷新比较状态后再操作。",
    "Comparison changed. Refresh its state before continuing."
  ],
  [
    "开始决策测试",
    "Start decision test"
  ],
  [
    "决策测试完成",
    "Decision test complete"
  ],
  [
    "连接测试结果已过期并丢弃",
    "Expired connection test result discarded"
  ],
  [
    "配置或连接测试已更新，此次结果已丢弃，请查看当前状态后重试。",
    "Configuration or connection test changed. This result was discarded; check the current state and retry."
  ],
  [
    "比较已更新，请刷新比较状态后再创建。",
    "Comparison changed. Refresh its state before creating another."
  ],
  [
    "安全存储未完成，本次修改仅保留内存；未写入明文 Key，重启后本次修改不会恢复。",
    "Secure storage did not complete. Changes remain in memory only and will not survive a restart; no plaintext key was written."
  ],
  [
    "规则基线固定选择第一个候选；未调用模型，也未验证语义。",
    "The rule baseline always chooses the first candidate. No model call or semantic validation occurred."
  ],
  [
    "本次只进行了候选决策，没有执行机器人动作。",
    "Only a candidate decision was made. No robot action executed."
  ],
  [
    "决策测试失败",
    "Decision test failed"
  ],
  [
    "比较已停止，仍在等待上一轮请求结束，请稍后重建。",
    "Comparison stopped but the previous request is still pending. Wait before recreating it."
  ],
  [
    "配置已安全保存到本机；Key 位于系统钥匙串，服务重启后可恢复。",
    "Configuration saved securely on this machine. The key is in the system keychain and can be restored after restart."
  ],
  [
    "仅保留在当前服务内存；刷新页面不会丢失，服务重启后需重新配置。",
    "Stored in server memory only. Refreshing preserves it; restarting the service requires reconfiguration."
  ],
  [
    "系统钥匙串不可用或访问被拒绝；本次配置仅保留内存，重启后本次修改不会恢复，未写入明文 Key。",
    "System keychain unavailable or access denied. Configuration stays in memory and will not survive a restart; no plaintext key was written."
  ],
  [
    "配置将保存在本机系统钥匙串与应用配置目录，服务重启后可恢复。",
    "Configuration will be saved in the system keychain and application settings directory for restoration after restart."
  ],
  [
    "本机配置文件无效或无法读取；已使用内存模式，不会读取其中的钥匙串引用或覆盖该文件。",
    "Local configuration is invalid or unreadable. Using memory storage without reading its keychain references or overwriting the file."
  ],
  [
    "当前配置已安全保存；旧系统凭证未能清理，不影响当前配置。",
    "Current configuration saved securely. Old credentials could not be cleaned up; this does not affect the current configuration."
  ],
  [
    "结构化决策 API",
    "Structured decision API"
  ],
  [
    "发送模型请求",
    "Send model request"
  ],
  [
    "等待本地模型并执行推理",
    "Wait for local model and run inference"
  ],
  [
    "本地模型推理完成",
    "Local inference complete"
  ],
  [
    "模型 HTTP 响应",
    "Model HTTP response"
  ],
  [
    "模型请求传输失败",
    "Model request transport failed"
  ],
  [
    "读取感知与场景状态",
    "Read perception and scene state"
  ],
  [
    "提交模型输入与候选",
    "Submit model input and candidates"
  ],
  [
    "模型返回与动作选择",
    "Model response and action selection"
  ],
  [
    "动作预演与碰撞过滤",
    "Action preview and collision filtering"
  ],
  [
    "物理执行结果与前后观测",
    "Execution result with before/after observations"
  ],
  [
    "轨迹筛选结果",
    "Trajectory filtering results"
  ],
  [
    "训练数据筛选汇总",
    "Training data filtering summary"
  ],
  [
    "开始拟合成功轨迹",
    "Start fitting successful trajectories"
  ],
  [
    "按开发场景表现选择检查点",
    "Select checkpoint by development-scene performance"
  ],
  [
    "独立评测发布门槛",
    "Independent evaluation release gate"
  ],
  [
    "部署前模型预热",
    "Model warm-up before deployment"
  ],
  [
    "检查点校验通过",
    "Checkpoint validation passed"
  ],
  [
    "部署版本已更新",
    "Deployed version updated"
  ],
  [
    "更新训练或评测指标",
    "Update training or evaluation metrics"
  ],
  [
    "任务启动",
    "Task started"
  ],
  [
    "任务失败",
    "Task failed"
  ],
  [
    "任务已中断",
    "Task interrupted"
  ],
  [
    "自动训练触发",
    "Automatic training triggered"
  ],
  [
    "采样设备资源",
    "Sample device resources"
  ],
  [
    "当前任务仍在运行，请先停止或等待完成",
    "The current task is still running. Stop it or wait for completion."
  ],
  [
    "逐步／分层 XYZ 需要选择本地 RSI 模型；当前部署的是 Compact 策略",
    "Incremental / hierarchical XYZ requires local RSI; the deployed policy is Compact"
  ],
  [
    "RSI JSON-lines 模型请求",
    "RSI JSON-lines model request"
  ],
  [
    "本机参考策略",
    "Local reference policy"
  ],
  [
    "失败引导探索",
    "Failure-guided exploration"
  ],
  [
    "当前没有运行中的后台任务",
    "No background job is running"
  ],
  [
    "规则示范不计为模型自采成功数据",
    "Rule demonstrations do not count as autonomous model successes"
  ],
  [
    "后台学习闭环已完成",
    "Background learning loop complete"
  ],
  [
    "后台学习闭环已停止",
    "Background learning loop stopped"
  ],
  [
    "后台学习闭环失败，请查看训练记录",
    "Background learning loop failed. Check the training records."
  ],
  [
    "正在加载{0}…",
    "Loading {0}…"
  ],
  [
    "第 {0} 轮学习",
    "Learning round {0}"
  ],
  [
    "当前阶段",
    "Current phase"
  ],
  [
    "外部与腕部",
    "External and wrist"
  ],
  [
    "视觉",
    "Vision"
  ],
  [
    "未验证",
    "Not verified"
  ],
  [
    "已保存的模型配置",
    "Saved model configurations"
  ],
  [
    "把红色方块放进蓝色托盘，松开夹爪并向上撤离。",
    "Put the red block in the blue tray, open the gripper, and retract upward."
  ],
  [
    "{0} / {1} 步",
    "{0} / {1} steps"
  ],
  [
    "{0} 局（各版本独立累计）",
    "{0} episodes (counted per version)"
  ],
  [
    "候选完成率逐轮上升",
    "Candidate success increased across rounds"
  ],
  [
    "任务完成率下降，保留之前的模型",
    "Task success decreased; previous model retained"
  ],
  [
    "记录保存在服务器，刷新不丢失。每页 100 条，可翻页或导出全部；展开查看完整字段。",
    "Records are saved on the server and survive refreshes. 100 per page; browse or export all. Expand a record for full fields."
  ],
  [
    "模型决策失败（{0}），请查看模型连接测试结果。",
    "Model decision failed ({0}). Check the connection test results."
  ],
  [
    "模型接口请求失败：HTTP {0}；请在模型连接中测试配置。",
    "Model request failed: HTTP {0}. Test the configuration under model connections."
  ],
  [
    "模型接口请求失败：{0}；请检查连接。",
    "Model request failed: {0}. Check the connection."
  ],
  [
    "服务拒绝了连接测试（HTTP {0}）：请检查地址、模型与 API 配置。",
    "Service rejected the connection test (HTTP {0}). Check URL, model, and API settings."
  ],
  [
    "服务暂时不可用（HTTP {0}）：请稍后重试。",
    "Service temporarily unavailable (HTTP {0}). Retry later."
  ],
  [
    "JSON 内容不能超过 {0} KB。",
    "JSON content must not exceed {0} KB."
  ],
  [
    "完成动作：{0}",
    "Action completed: {0}"
  ],
  [
    "完成短步：{0}",
    "Short action completed: {0}"
  ],
  [
    "开始执行：{0}",
    "Start executing: {0}"
  ],
  [
    "子目标 {0}：正在选择 XYZ 与夹爪通道",
    "Subgoal {0}: selecting XYZ and gripper channels"
  ],
  [
    "{0} 需要有效的模型名称。",
    "{0} requires a valid model name."
  ],
  [
    "{0} 需要有效的 API 地址。",
    "{0} requires a valid API URL."
  ],
  [
    "{0} 尚未配置 API Key。",
    "{0} has no API key configured."
  ],
  [
    "{0} 尚未配置，请先在模型连接中完成配置。",
    "{0} is not configured. Complete its model connection first."
  ],
  [
    "外部评测扰动：{0}，发生于动作 {1} 后",
    "External evaluation perturbation: {0}, after action {1}"
  ],
  [
    "动作通道概率低于设定门槛：{0}",
    "Action-channel probability below threshold: {0}"
  ],
  [
    "当前 RSI checkpoint 只支持文本／结构化状态；直接图像需要可训练的多模态模型",
    "Current RSI checkpoints support text / structured state only. Direct images require a trainable multimodal model."
  ],
  [
    "直接图像输入未接通本地 RSI；请选择仿真真值或 RGB-D 结构化观测",
    "Direct images are not connected to local RSI. Select simulator state or RGB-D structured observations."
  ],
  [
    "{0} 步",
    "{0} steps"
  ],
  [
    "{0} 局",
    "{0} episodes"
  ],
  [
    "{0} 动作",
    "{0} actions"
  ],
  [
    "{0} 次",
    "{0} calls"
  ],
  [
    "调用 {0} 次",
    "{0} calls"
  ],
  [
    "输入 {0} tokens",
    "{0} input tokens"
  ],
  [
    "已执行",
    "Executed"
  ],
  [
    "动作执行中…",
    "Executing action…"
  ],
  [
    "物体稳定 · 夹爪已撤离",
    "Object stable · Gripper retracted"
  ],
  [
    "正在加载…",
    "Loading…"
  ],
  [
    "记录保存在服务器，刷新不丢失。",
    "Records are saved on the server and survive refreshes."
  ],
  [
    "每页 100 条，可翻页或导出全部；展开查看完整字段。",
    "100 per page; browse or export all. Expand a record for full fields."
  ],
  [
    "尚未完成",
    "Not complete yet"
  ],
  [
    "临时",
    "Provisional"
  ],
  [
    "准备首次学习",
    "Preparing first training round"
  ],
  [
    "把红色方块叠在蓝色方块上，松开夹爪并向上撤离。",
    "Stack the red block on the blue block, open the gripper, and retract upward."
  ],
  [
    "越过中间的障碍，把红色方块放进蓝色托盘，松开夹爪并撤离。",
    "Move over the obstacle, place the red block in the blue tray, open the gripper, and retract."
  ],
  [
    "文档目录",
    "Documentation contents"
  ],
  [
    "本页内容",
    "On this page"
  ],
  [
    "项目概览",
    "Overview"
  ],
  [
    "架构与决策",
    "Architecture & decisions"
  ],
  [
    "自进化训练原理",
    "Self-evolving training"
  ],
  [
    "代码结构",
    "Code map"
  ],
  [
    "阅读与学习路线",
    "Reading path"
  ],
  [
    "安装与运行",
    "Install & run"
  ],
  [
    "复现与验证",
    "Reproduce & verify"
  ],
  [
    "常见问题",
    "Troubleshooting"
  ],
  [
    "项目文档",
    "Project documentation"
  ],
  [
    "从第一个物理动作，到可验证的模型迭代。",
    "From the first physical action to a verifiable model update."
  ],
  [
    "快速开始 ↓",
    "Quick start ↓"
  ],
  [
    "项目概览",
    "Overview"
  ],
  [
    "Embodied Lab 将机械臂仿真、模型测试、多模型对比与本地自进化训练整合到一个工作台。模型选择动作，MuJoCo 计算真实的仿真状态变化，实验记录保留每次决策、执行和模型更新的证据。",
    "Embodied Lab brings robot simulation, model tests, comparisons, and local self-evolving training into one workbench. Models choose actions; MuJoCo computes the resulting simulated physics. Experiment records preserve evidence of each decision, execution, and model update."
  ],
  [
    "入口",
    "Workspace"
  ],
  [
    "适合做什么",
    "Purpose"
  ],
  [
    "模型配置",
    "Models"
  ],
  [
    "保存本地服务或远端 API 连接，管理具名模型与场景预设，执行独立输入测试。",
    "Save local service or remote API connections, manage named models and scene presets, and probe decisions independently."
  ],
  [
    "模型测试",
    "Model Test"
  ],
  [
    "从规则基线开始；观察一个模型在同一任务中的输入、动作、相机和结果。",
    "Start with the rule baseline; inspect one model’s inputs, actions, cameras, and task outcomes."
  ],
  [
    "模型对比",
    "Compare"
  ],
  [
    "在相同场景下顺序运行多个模型，比较结果、延迟与调用记录。",
    "Run models sequentially on matching scenes and compare outcomes, latency, and request records."
  ],
  [
    "自主训练",
    "Self-Evolving Training"
  ],
  [
    "用本地 RSI checkpoint 采集轨迹、筛选成功数据、训练、评测并决定是否部署；完整报告在页面下方。",
    "Use local RSI checkpoints to collect trajectories, filter successful data, train, evaluate, and decide whether to deploy. The full report is below the live console."
  ],
  [
    "当前主训练页面聚焦搬运入盘；模型测试还支持方块堆叠与越障搬运。场景、相机和机械臂均来自仿真，当前工作台不直接控制真实机器人。",
    "The main training page focuses on transfer into a tray. Model Test also supports stacking and obstacle transfer. Scenes, cameras, and the robot are simulated; this workbench does not directly control a physical robot."
  ],
  [
    "架构与决策",
    "Architecture & decisions"
  ],
  [
    "浏览器负责配置、三维展示和报告。统一 Python 服务在同一进程内挂载模型工作台与训练接口，共享物理代码；不需要启动第二个 8090 服务。RSI 推理与训练可使用独立 Python 环境和工作进程。",
    "The browser handles configuration, 3D views, and reports. One Python server mounts model-workbench and training APIs in the same process and shares the physics code; no second service on port 8090 is needed. RSI inference and training can use a separate Python environment and worker processes."
  ],
  [
    "系统架构流程",
    "System architecture flow"
  ],
  [
    "浏览器工作台",
    "Browser workbench"
  ],
  [
    "页面、Three.js 视图、报告与日志",
    "Pages, Three.js views, reports, and logs"
  ],
  [
    "统一 Python 服务",
    "Unified Python server"
  ],
  [
    "模型实验接口",
    "Model experiment APIs"
  ],
  [
    "训练与记录接口",
    "Training and record APIs"
  ],
  [
    "物理、接触、相机、成功条件",
    "Physics, contacts, cameras, success criteria"
  ],
  [
    "决策模型 / RSI 工作进程",
    "Decision models / RSI workers"
  ],
  [
    "候选选择、轨迹拟合",
    "Candidate selection, replay fitting"
  ],
  [
    "实验数据目录",
    "Experiment artifacts"
  ],
  [
    "一次动作如何发生",
    "How one action happens"
  ],
  [
    "观测",
    "Observations"
  ],
  [
    "读取当前坐标、本体与接触状态，或从 RGB-D 相机检测物体坐标。输入不会包含未来回报或教师答案。",
    "Read current coordinates, proprioception, and contacts, or estimate object coordinates from RGB-D cameras. Inputs do not contain future rewards or teacher answers."
  ],
  [
    "决策",
    "Decisions"
  ],
  [
    "构造状态、指令与候选动作。模型返回选择；RSI 或结构化决策接口还可返回候选概率。聊天接口不提供原生候选概率，不能把其自报置信度当作这种概率。",
    "Build state, instructions, and action candidates. The model returns a choice; RSI or typed decision APIs can also return candidate probabilities. Chat APIs do not provide native candidate probabilities; a model’s self-reported confidence is not a substitute."
  ],
  [
    "执行",
    "Execute"
  ],
  [
    "将技能或 XYZ 短步转换为机械臂控制，进行可达性与碰撞检查，然后由 MuJoCo 推进。模型选择的动作可能被拒绝，选择不等于实际执行。",
    "Convert a skill or XYZ increment into robot controls, check reachability and collisions, and advance MuJoCo. A selected action may be rejected; a decision is not proof of execution."
  ],
  [
    "反馈",
    "Observe again"
  ],
  [
    "重新观测动作后的物理状态，记录成功、失败与拒绝原因，再请求下一次决策。任务成功由释放、支撑和撤离等物理条件判定。",
    "Observe the resulting physical state, record success, failure, and rejection reasons, then request the next decision. Physical conditions such as release, support, and withdrawal determine task success."
  ],
  [
    "配置维度",
    "Setting"
  ],
  [
    "模型测试",
    "Model Test"
  ],
  [
    "自主训练",
    "Self-Evolving Training"
  ],
  [
    "动作决策方式",
    "Action mode"
  ],
  [
    "预设技能、逐步 XYZ、分层 XYZ。",
    "Preset skills, incremental XYZ, hierarchical XYZ."
  ],
  [
    "支持相同三种动作模式；分层模式分别记录子目标与运动通道。",
    "Supports the same three modes; hierarchical mode records subgoal and motor decisions separately."
  ],
  [
    "观测来源",
    "Observation source"
  ],
  [
    "仿真真值、RGB-D，或支持图像的模型使用直接图像。",
    "Simulator state, RGB-D, or direct images with an image-capable model."
  ],
  [
    "仿真真值或 RGB-D。当前 RSI 为文本／结构化模型，直接图像明确禁用。",
    "Simulator state or RGB-D. Current RSI checkpoints are text/structured models; direct images are explicitly disabled."
  ],
  [
    "启用相机",
    "Cameras"
  ],
  [
    "无、外部、腕部或双相机，受观测模式约束。",
    "None, external, wrist, or both, subject to observation mode."
  ],
  [
    "相同选择；RGB-D 至少需要一个视角。启用相机预览不表示图像会直接发送给模型。",
    "The same choices; RGB-D requires at least one view. A camera preview does not mean images are sent directly to the model."
  ],
  [
    "RGB-D 先用本地颜色、深度与标定估计坐标，再把结构化检测结果交给模型。必要目标持续不可见时停止，不使用仿真真值补齐。中央三维视图是调试视角，实际模型相机观测是另一组数据。",
    "RGB-D uses local color detection, depth, and calibration to estimate coordinates, then passes structured detections to the model. It stops if required targets remain unavailable instead of filling gaps with simulator truth. The central 3D view is a debugging view; actual model-camera observations are separate."
  ],
  [
    "自进化训练原理",
    "Self-evolving training"
  ],
  [
    "这里的“自进化”是一个可审计的训练与发布循环。默认 self-improve 将成功整局中实际执行的动作作为模仿目标，优化回放交叉熵；冻结 RSI 编码塔，仅更新 scorer 决策头。代码还提供单独的整局策略梯度实验，不能把两种训练目标混为一谈。",
    "“Self-evolving” here means an auditable training and release loop. Default self-improve uses executed actions from successful episodes as imitation targets and minimizes replay cross-entropy. It freezes the RSI encoder tower and updates only the scorer head. Separate episode-level policy-gradient experiments also exist; they use a different objective."
  ],
  [
    "展开查看各阶段",
    "Expand each stage for details"
  ],
  [
    "采集与探索",
    "Collect and explore"
  ],
  [
    "从当前发布的 RSI checkpoint 继续；没有发布版本时使用固定版本的初始 RSI-Jev。探索策略调整动作采样概率并保留失败经验，这一步本身不修改权重。每一局固定模型版本。",
    "Continue from the published RSI checkpoint, or a pinned initial RSI-Jev release when none exists. Exploration adjusts action-sampling probabilities and retains failure experience; this alone does not update weights. Each episode uses a fixed model version."
  ],
  [
    "触发与过滤",
    "Trigger and filter"
  ],
  [
    "同时达到新增整局数与成功局数阈值后触发训练，后台忙时等待。过滤未成功整局、重复轨迹、未执行动作、空抓、失抓与无夹持搬运。教师、代码策略与仅供评测的数据不能伪装成模型自采成功。",
    "Trigger training only when both new-episode and success thresholds are met, waiting if the worker is busy. Exclude failed episodes, duplicates, unexecuted actions, empty grasps, lost grips, and transport without holding. Teacher, code-policy, and evaluation-only data cannot count as model-collected successes."
  ],
  [
    "拟合与开发选点",
    "Fit and select on development scenes"
  ],
  [
    "继承父模型权重，每轮新建优化器；缓存冻结编码特征，训练决策头。用独立开发场景的完整任务表现选择 checkpoint，loss 下降不直接代表机械臂完成率提升。",
    "Inherit parent weights and create a fresh optimizer each round. Cache frozen encoder features and train the decision head. Select a checkpoint using complete tasks on independent development scenes; lower loss does not itself prove better robot task completion."
  ],
  [
    "独立配对评测",
    "Evaluate on independent paired scenes"
  ],
  [
    "在未用于训练与开发的相同新场景上分别运行父模型与候选。当前默认门槛包含至少 90 对、每任务至少 30 对、完成率提升至少 5 个百分点、95% 提升区间下界大于零，以及任务退步和风险限制。具体门槛与结果保存在评测报告。",
    "Run parent and candidate on matching new scenes excluded from training and development. Current default gates include at least 90 pairs, at least 30 per task, a gain of at least 5 percentage points, a positive lower bound of the 95% gain interval, and task-regression and risk limits. The evaluation report records the exact gates and results."
  ],
  [
    "验证与部署",
    "Verify and deploy"
  ],
  [
    "通过门槛后核对 checkpoint 哈希，实际加载并预热，在锁内原子更新模型注册表。下一局才切换到新版本；评测未通过则保留现有发布模型。当前采集模型、训练候选和已发布模型可能是不同版本。",
    "After the gates pass, verify checkpoint hashes, load and warm up the model, and update the registry atomically under a lock. Switch versions at the next episode; a failed evaluation keeps the existing release. The collecting model, training candidate, and published model may be different versions."
  ],
  [
    "动作、观测和相机配置随轨迹、数据集与 checkpoint 保存，并在评测中复用。不同执行配置的数据不会混合。切换协议后需重新采集，旧模式的完成率不能作为新模式的成绩。",
    "Action, observation, and camera settings travel with trajectories, datasets, and checkpoints and are reused during evaluation. Data from different execution settings is not mixed. Collect new data after changing protocols; results from the old mode do not establish performance in the new mode."
  ],
  [
    "打开训练报告，查看数据、参数与发布证据 →",
    "Open the training report to inspect data, parameters, and release evidence →"
  ],
  [
    "代码结构",
    "Code map"
  ],
  [
    "保留两个 Python 包名是为了区分职责和兼容实验记录；它们已经属于同一个 embodied-lab 项目。修改前端源码后重新构建，不要手改生成的网页资源。",
    "The two Python package names separate responsibilities and preserve experiment compatibility. Both belong to one embodied-lab project. Rebuild after editing frontend sources; do not hand-edit generated web assets."
  ],
  [
    "定位",
    "Start here"
  ],
  [
    "职责与重点",
    "Responsibility and what to inspect"
  ],
  [
    "解析统一启动配置，选择实验数据目录与 RSI Python 环境。",
    "Resolve unified startup settings, the artifact directory, and the RSI Python environment."
  ],
  [
    "场景、接触和成功条件；将模型选择接到真实物理执行。",
    "Scenes, contacts, and success criteria; connect model choices to physical execution."
  ],
  [
    "预设技能、XYZ 短步与分层子目标协议。",
    "Preset skills, XYZ increments, and hierarchical subgoal protocols."
  ],
  [
    "模型接口适配、选择校验；相机检测、标定与跟踪。",
    "Model adapters and choice validation; camera detection, calibration, and tracking."
  ],
  [
    "训练闭环的执行配置、仿真桥接与当前状态提示。",
    "Execution settings, simulation integration, and current-state prompts for the learning loop."
  ],
  [
    "SQLite 事件、全过程日志、资源与训练指标。",
    "SQLite events, end-to-end process logs, resources, and training metrics."
  ],
  [
    "统一服务路由、后台作业控制与模型工作台 API。",
    "Unified server routes, background-job controls, and model-workbench APIs."
  ],
  [
    "导航与按需加载、全站语言切换，以及模型测试交互。",
    "Navigation and lazy loading, shared localization, and model-test interactions."
  ],
  [
    "实验数据保存在哪里",
    "Where experiment evidence is saved"
  ],
  [
    "实验根目录由 lab-config.json 的 artifacts 指定，并相对项目目录解析。monitor.sqlite3 存储运行和事件，runs/ 保存各次实验的轨迹、数据清单、checkpoint 与报告。champion-rsi.json 等注册表指向已发布版本，live-session.json 记录连续采集意图。具体文件位置以运行记录为准。",
    "lab-config.json selects the artifact root relative to the project directory. monitor.sqlite3 stores runs and events; runs/ contains per-run trajectories, manifests, checkpoints, and reports. Registries such as champion-rsi.json point to released models, while live-session.json records continuous-collection intent. Consult each run record for its exact file paths."
  ],
  [
    "docs/origins/ 是合并前文档，migration/ 保存迁移材料。阅读旧文档时，启动入口和端口以本页及当前 README 为准；旧目录名不是还需要启动的第二套系统。",
    "docs/origins/ contains pre-merge documents; migration/ preserves migration materials. For startup commands and ports, use this page and the current README. Old directory names do not imply a second system that must be started."
  ],
  [
    "阅读与学习路线",
    "Reading path"
  ],
  [
    "按下面顺序学习，每一步先观察界面和记录，再阅读对应代码。先理解一个动作和一局任务，再追踪一次模型更新。",
    "Follow this order: observe the UI and records first, then read the corresponding code. Understand one action and one complete episode before tracing a model update."
  ],
  [
    "先跑规则基线",
    "Run the rule baseline first"
  ],
  [
    "在模型测试选择搬运入盘和规则基线，固定种子，单步观察抓取、搬运、释放与撤离。确认“动作执行”和“任务成功”是两个不同事件。",
    "In Model Test, select transfer and the rule baseline, fix the seed, and step through grasping, transport, release, and withdrawal. Identify the difference between “action executed” and “task succeeded”."
  ],
  [
    "跟踪一次决策",
    "Trace one decision"
  ],
  [
    "对照输入状态、候选列表、选择、拒绝原因及动作后状态。尝试 XYZ 与分层模式，找到是谁构造候选、是谁做物理执行。",
    "Compare the input state, candidate list, selection, rejection reason, and resulting state. Try XYZ and hierarchical modes; identify which code constructs candidates and which executes physics."
  ],
  [
    "区分三种观测",
    "Separate the observation modes"
  ],
  [
    "对比仿真真值和 RGB-D。查看实际采集相机、检测来源与缺失目标处理；图像模型实验再单独测试直接图像。",
    "Compare simulator state with RGB-D. Inspect actual camera captures, detection sources, and missing-target handling; test direct images separately with an image-capable model."
  ],
  [
    "追踪成功数据到梯度",
    "Trace successful data to gradients"
  ],
  [
    "在日志中选一条成功轨迹，找到过滤记录、训练样本、数据哈希及 loss。查看 scorer 的可训练参数，确认失败探索记忆与权重更新的区别。",
    "Choose a successful trajectory in the logs and locate its filter records, training samples, data hash, and loss. Inspect trainable scorer parameters and distinguish failure-exploration memory from weight updates."
  ],
  [
    "追踪候选到发布",
    "Trace a candidate to release"
  ],
  [
    "在完整报告里对照开发选点、独立配对评测、发布条件和活动 checkpoint 哈希。解释为什么有些训练轮次没有部署新模型。",
    "Use the full report to connect development selection, independent paired evaluation, release gates, and the active checkpoint hash. Explain why some training rounds produce no new deployment."
  ],
  [
    "安装与运行",
    "Install & run"
  ],
  [
    "以下命令从项目根目录执行，适用于 macOS / Linux 的 shell。需要 Git、Python 3.11 或更新版本、uv，以及满足当前 Vite 要求的 Node.js（20.19+ 的 20.x，或 22.12+）。基线不需要 GPU、API Key 或模型权重下载；RSI 首次加载可能下载模型。",
    "Run these commands from the project root in a macOS / Linux shell. Prerequisites: Git, Python 3.11 or newer, uv, and Node.js compatible with the current Vite dependency (20.x at 20.19+, or 22.12+). The baseline needs no GPU, API key, or model-weight download; the first RSI load may download a model."
  ],
  [
    "1. 安装仿真与界面",
    "1. Install simulation and the UI"
  ],
  [
    "全新环境",
    "Fresh environment"
  ],
  [
    "复制命令",
    "Copy commands"
  ],
  [
    "bootstrap 按 upstreams.lock.json 获取上游版本，并用 uv 创建 .venv。启动后打开 http://127.0.0.1:8092/simulation，先进入模型测试运行规则基线。已安装环境通常只需最后一条启动命令。",
    "bootstrap fetches pinned upstream revisions from upstreams.lock.json and uses uv to create .venv. After starting, open http://127.0.0.1:8092/simulation and run the rule baseline in Model Test. An existing installation usually needs only the final startup command."
  ],
  [
    "2. 按需安装本地 RSI 训练环境",
    "2. Add local RSI training when needed"
  ],
  [
    "独立训练环境",
    "Separate training environment"
  ],
  [
    "复制命令",
    "Copy commands"
  ],
  [
    "额外安装创建 .venv-rsi 并安装固定版本的 RSI-Jev 与 PyTorch 依赖。统一启动器检测到 .venv-rsi/bin/python 后，将其用于 RSI 作业。设备由后端选择，也可在启动前设置 EMBODIED_RSI_DEVICE 为 mps、cuda 或 cpu；必须与实际硬件和 PyTorch 支持一致。",
    "The additional installation creates .venv-rsi and installs pinned RSI-Jev plus its PyTorch dependencies. The unified launcher detects .venv-rsi/bin/python and uses it for RSI jobs. The backend selects a device, or you can set EMBODIED_RSI_DEVICE to mps, cuda, or cpu before startup, matching your hardware and PyTorch support."
  ],
  [
    "安装或配置变更后，应在现有任务结束或手动停止后再重启服务。只修改网页静态资源无需重启训练后端。",
    "After installing or changing startup settings, let existing tasks finish or stop them before restarting the server. Editing static UI assets does not require restarting the training backend."
  ],
  [
    "3. 选择数据目录或独立验证端口",
    "3. Choose a data directory or a separate verification port"
  ],
  [
    "默认启动读取 lab-config.json 的 port 与 artifacts。下面用新的实验目录和 8093 端口启动独立工作台，可保留正在使用的 8092 实验；相对数据路径从执行命令的目录解析。",
    "Default startup reads port and artifacts from lab-config.json. The following starts an isolated workbench with a new artifact directory on port 8093, keeping an existing 8092 experiment intact. Relative artifact paths here resolve from the command’s working directory."
  ],
  [
    "隔离工作台",
    "Isolated workbench"
  ],
  [
    "复制命令",
    "Copy commands"
  ],
  [
    "仅验证基线、尚未安装 RSI 时，省略 --rsi-python 参数。打开 http://127.0.0.1:8093/simulation。此命令只启动服务，不会自动开始新的训练。",
    "If you are only testing the baseline and have not installed RSI, omit --rsi-python. Open http://127.0.0.1:8093/simulation. This command starts the server; it does not automatically start new training."
  ],
  [
    "4. 配置模型并运行实验",
    "4. Configure a model and run an experiment"
  ],
  [
    "远端 API 在模型配置页填写接口类型、Base URL、模型 ID 与 Key。保存不调用模型；测试调用和运行实验会发出请求。密钥使用系统凭证存储，不可用时明确标记为仅本次会话。.env.example 仅列出环境变量示例，服务不会自动读取 .env。",
    "For a remote API, enter its interface type, base URL, model ID, and key in Models. Saving does not call the model; connection tests and experiments do. Keys use the system credential store, with session-only status shown if unavailable. .env.example documents environment variables; the server does not automatically load .env."
  ],
  [
    "自主训练使用本地 checkpoint。在执行与观测中选择动作模式、观测与相机，再设定连续采集和训练触发阈值。远端 Jev／Chat 连接用于模型测试与对比，当前不会作为自主训练的可训练模型。",
    "Self-Evolving Training uses local checkpoints. Select action mode, observation source, and cameras under execution settings, then configure continuous collection and training thresholds. Remote Jev/Chat connections serve Model Test and Compare; they are not currently trainable models in Self-Evolving Training."
  ],
  [
    "复现与验证",
    "Reproduce & verify"
  ],
  [
    "先验证物理链路",
    "Verify the physics path first"
  ],
  [
    "两局基线采集",
    "Two baseline episodes"
  ],
  [
    "复制命令",
    "Copy commands"
  ],
  [
    "该命令默认使用规则教师，无需模型请求。检查终端返回的运行 ID、episodes.jsonl 和完成率；它验证物理与记录链路，不证明 RSI 学会了任务，教师轨迹也不计入模型自采成功。",
    "This command uses the rule teacher by default and needs no model requests. Inspect the returned run ID, episodes.jsonl, and completion rate. It verifies physics and recording, not RSI learning; teacher trajectories do not count as model-collected successes."
  ],
  [
    "再复现一轮本地训练",
    "Then reproduce one local training round"
  ],
  [
    "在新的实验目录中选择同一初始 checkpoint，固定任务、场景分布、种子范围、动作预算和执行配置。开启连续采集及自动训练，积累足够成功轨迹，随后跟踪过滤、拟合、开发选点、独立评测和发布记录。没有成功数据时不会凭空生成训练样本。",
    "In a fresh artifact directory, choose the same initial checkpoint and fix the task, scene distribution, seed ranges, action budget, and execution settings. Enable continuous collection and automatic training, accumulate enough successful trajectories, then trace filtering, fitting, development selection, independent evaluation, and deployment. No training samples are invented when successful data is absent."
  ],
  [
    "保存 Git 版本、upstreams.lock.json、环境版本、父模型 SHA256、数据 manifest、评测种子和执行配置。相同种子可复现场景，但远端模型更新、采样和不同硬件仍可能改变最终轨迹。小样本冒烟通过不等于达到默认发布门槛。",
    "Record the Git revision, upstreams.lock.json, environment versions, parent-model SHA256, data manifest, evaluation seeds, and execution settings. Matching seeds reproduce scenes, but remote model updates, sampling, and hardware can still change trajectories. A small smoke test does not establish that the default release gates are met."
  ],
  [
    "开发检查与实验脚本",
    "Development checks and experiment scripts"
  ],
  [
    "构建与验证",
    "Build and verify"
  ],
  [
    "复制命令",
    "Copy commands"
  ],
  [
    "浏览器测试使用独立端口和数据目录。上面的浏览器命令需要已安装 Chrome；完整实验脚本按 --help 选择阶段。修改模型工作台或翻译目录后重新运行 npm run build，再刷新页面；不要在浏览器测试中途重建资源。",
    "Browser tests use separate ports and artifact directories. The browser command above requires installed Chrome. Choose experiment-script stages using --help. After editing the model workbench or message catalog, run npm run build and refresh; do not rebuild assets in the middle of browser tests."
  ],
  [
    "常见问题",
    "Troubleshooting"
  ],
  [
    "为什么采集停止了，self-improve 仍在运行？",
    "Why does self-improve run after collection stops?"
  ],
  [
    "停止采集仅停止前台轨迹生成。已经接受的后台任务会继续训练、评测和部署判断；到页面下方报告查看实际阶段，必要时单独停止后台任务。",
    "Stopping collection ends foreground trajectory generation. An accepted background job continues training, evaluation, and deployment checks. Inspect its actual stage in the report below, or stop the background job separately."
  ],
  [
    "为什么 loss 下降却没有发布新模型？",
    "Why does lower loss produce no new release?"
  ],
  [
    "loss 衡量成功动作的拟合程度。开发场景选择候选，独立新场景与发布门槛决定是否更新；检查评测中的完成率提升、置信区间、任务覆盖和风险条件。",
    "Loss measures fit to successful actions. Development scenes select a candidate; independent scenes and release gates determine deployment. Check gain, confidence interval, task coverage, and risk gates in the evaluation report."
  ],
  [
    "如何确认当前运行的是哪个模型？",
    "How do I identify the running model?"
  ],
  [
    "查看自主训练左侧的当前模型、版本、checkpoint 与 SHA256，再对照本局日志和发布记录。训练中的候选不会在一局中途替换当前模型。",
    "Inspect the current model, version, checkpoint, and SHA256 on the left of Self-Evolving Training, then compare episode logs and release records. A training candidate does not replace the active model midway through an episode."
  ],
  [
    "为什么配置了 API，训练页仍要求本地模型？",
    "Why does training still require a local model after API setup?"
  ],
  [
    "远端接口只提供推理调用，不暴露当前训练器需要的可微参数。当前自主训练适配本地文本／结构化 RSI checkpoint；图像或远端可训练模型需要另外实现训练接口。",
    "A remote inference endpoint does not expose the differentiable parameters required by this trainer. Current Self-Evolving Training supports local text/structured RSI checkpoints. Image-based or remotely trainable models need an additional training integration."
  ],
  [
    "uv、RSI 环境或模型资源找不到怎么办？",
    "What if uv, the RSI environment, or model assets are missing?"
  ],
  [
    "先确认在项目根目录运行，uv 在 PATH 中，且 bootstrap 已成功完成。训练检查 .venv-rsi/bin/python；首次模型加载需能下载对应权重，已有离线权重则检查 checkpoint 路径与哈希。以终端错误和全过程日志定位具体失败步骤。",
    "Confirm the project root, uv on PATH, and successful bootstrap. For training, check .venv-rsi/bin/python. First model use needs access to the required weights; for offline weights, check checkpoint paths and hashes. Use terminal errors and process logs to locate the failing step."
  ],
  [
    "页面空白、资源过期或端口被占用怎么办？",
    "What if the UI is blank, assets are stale, or the port is busy?"
  ],
  [
    "先完成 npm ci 与 npm run build，再刷新页面。确认打开统一服务的 /simulation；已有服务占用端口时，使用上面的隔离端口命令。正在执行训练时不要为了刷新界面重启后台。",
    "Complete npm ci and npm run build, then refresh. Use /simulation on the unified server. If another service owns the port, use the isolated-port command above. Do not restart active training just to refresh the UI."
  ],
  [
    "为什么日志 JSON 或模型回复没有翻译？",
    "Why do log JSON and model responses keep their original language?"
  ],
  [
    "语言切换覆盖导航、表单、图表说明、状态、日志摘要和文档。模型名称、用户输入、模型原始回复、原始 JSON 与代码保持原样，便于复现和核对。界面语言默认英文，并在浏览器保存选择。",
    "Language switching covers navigation, forms, chart explanations, statuses, log summaries, and documentation. Model names, user inputs, original model responses, raw JSON, and code keep their original text for reproducibility. The UI defaults to English and saves the language choice in the browser."
  ],
  [
    "继续阅读仓库文档",
    "Continue in the repository documentation"
  ],
  [
    "统一入口与使用说明",
    "Unified startup and usage"
  ],
  [
    "学习闭环与接口",
    "Learning-loop architecture and APIs"
  ],
  [
    "模型协议与技术细节",
    "Model protocols and technical details"
  ],
  [
    "相机与视觉观测",
    "Cameras and visual observations"
  ],
  [
    "动作规划协议",
    "Action-planning protocols"
  ],
  [
    "验证目标与实验设计",
    "Validation goals and experiment design"
  ],
  [
    "回到文档顶部 ↑",
    "Back to documentation top ↑"
  ],
  [
    "文档",
    "Doc"
  ],
  [
    "文档加载失败",
    "Documentation failed to load"
  ],
  [
    "已复制命令",
    "Commands copied"
  ],
  [
    "无法自动复制，请选中命令后复制。",
    "Automatic copy is unavailable. Select and copy the commands manually."
  ],
  [
    "实验 / {0}",
    "EPISODE / {0}"
  ],
  [
    "SQLite · JSONL · 检查点",
    "SQLite · JSONL · checkpoints"
  ],
  [
    "夹爪张开",
    "GRIPPER OPEN"
  ],
  [
    "夹爪闭合",
    "GRIPPER CLOSED"
  ],
  [
    "物体已抓住",
    "OBJECT GRASPED"
  ],
  [
    "TRANSFORMER / 参数更新",
    "TRANSFORMER / PARAMETER UPDATES"
  ],
  [
    "Q · 查询",
    "Q · Query"
  ],
  [
    "K · 键",
    "K · Key"
  ],
  [
    "V · 值",
    "V · Value"
  ],
  [
    "输入投影",
    "IN PROJECTION"
  ],
  [
    "注意力输出",
    "ATTENTION OUT"
  ],
  [
    "动作评分",
    "ACTION SCORE"
  ],
  [
    "状态失效",
    "Stale"
  ],
  [
    "未通过发布",
    "Release rejected"
  ],
  [
    "{0} 次实验",
    "{0} runs"
  ],
  [
    "{0} 步/秒",
    "{0} steps/s"
  ],
  [
    "{0} 训练样本",
    "{0} training samples"
  ],
  [
    "超过 120 秒没有训练指标",
    "No training metric for more than 120 seconds"
  ],
  [
    "主机内存使用率超过 90%",
    "Host memory exceeds 90%"
  ],
  [
    "GPU 显存使用率超过 95%",
    "GPU memory exceeds 95%"
  ],
  [
    "GPU 温度超过 85°C",
    "GPU temperature exceeds 85°C"
  ],
  [
    "Loss 超过近期均值的 4 倍",
    "Loss exceeds 4× recent mean"
  ],
  [
    "验证损失超过最新训练损失的 2 倍",
    "Validation loss exceeds 2× latest training loss"
  ],
  [
    "裁剪前梯度范数超过 100",
    "Pre-clip gradient norm exceeds 100"
  ],
  [
    "训练出现非有限值：{0}",
    "Non-finite training values: {0}"
  ],
  [
    "项目背景",
    "Project background"
  ],
  [
    "Embodied Lab 关注一个具体问题：模型能否根据当前环境选择动作，完成真实推进的物理任务，并利用自己产生的有效经验改进下一版模型？这里的环境是 MuJoCo 仿真中的 Franka Panda 机械臂，主要训练任务是把桌面方块抓起、搬运并放入目标盘。",
    "Embodied Lab asks a concrete question: can a model choose actions from the current environment, complete a task in a running physics simulation, and use its own useful experience to improve the next model version? The environment is a simulated Franka Panda arm in MuJoCo. The main training task is to grasp a tabletop cube, carry it, and place it in a target tray."
  ],
  [
    "会描述“抓取并放下”只是起点。闭合夹爪后可能没有碰到方块，移动手臂时可能失抓，方块进入目标区域也可能尚未稳定。因此，本项目把模型的选择、执行器实际做了什么，以及物理环境最终发生了什么分别记录，让每次成功和失败都能沿着证据追溯。",
    "Describing “pick it up and put it down” is only a starting point. Closed fingers may miss the cube, a grasp may fail during transport, and an object inside the target area may still be moving. The project records the model’s choice, what the controller actually executed, and what happened in the physical environment separately, so both success and failure can be traced to evidence."
  ],
  [
    "现在的工作台融合了两部分代码：embodied_jev 提供模型接口、感知、动作协议和物理实验；embodied_rsi 提供轨迹采集、数据筛选、拟合训练、独立评测与部署。embodied_lab 是统一启动入口。保留 Python 包名便于区分职责与兼容历史记录，运行时只需要一个 8092 服务。",
    "The workbench combines two codebases: embodied_jev provides model adapters, perception, action protocols, and physical experiments; embodied_rsi provides trajectory collection, data filtering, fitting, independent evaluation, and deployment. embodied_lab is the unified launcher. The Python package names preserve clear responsibilities and compatibility with historical records; the integrated workbench needs only one service on port 8092."
  ],
  [
    "决策能力如何测量？",
    "How do we measure decision quality?"
  ],
  [
    "固定场景、动作接口和观测来源，检查模型是否依据实际反馈行动。记录程序提供了哪些技能和几何信息，才能解释完成率代表哪一种能力。",
    "Fix the scene, action interface, and observation source, then check whether the model acts on actual feedback. Record the skills and geometry supplied by the program so the completion rate can be interpreted in context."
  ],
  [
    "成功经验如何进入学习？",
    "How does successful experience become training data?"
  ],
  [
    "把完整成功局中的真实决策转换为训练样本，追踪数据来源与过滤原因。探索时改变采样策略和训练时更新模型参数，是两种独立操作。",
    "Convert real decisions from complete successful episodes into training examples, tracking provenance and filtering reasons. Changing the sampling strategy during exploration and updating model parameters during training are separate operations."
  ],
  [
    "怎样证明新版本更好？",
    "What demonstrates that a new version is better?"
  ],
  [
    "让父模型与候选模型在相同的新场景上独立评测，再检查提升、置信区间与风险条件。训练 loss 或一段漂亮的回放不足以决定发布。",
    "Evaluate the parent and candidate on the same new scenes, then inspect the improvement, confidence interval, and risk conditions. Training loss or an impressive replay alone cannot determine a release."
  ],
  [
    "当前工作台研究的是受约束的桌面仿真闭环：任务规则、候选动作和部分几何知识由程序定义。它不直接控制真实机器人；仿真中的表现也不能直接证明真实硬件、任意物体或开放任务上的效果。阅读时始终同时查看模型能力与系统给予它的条件。",
    "The current workbench studies a constrained tabletop simulation loop: the program defines task rules, action candidates, and some geometric knowledge. It does not directly control a physical robot, and simulation results do not establish performance on hardware, arbitrary objects, or open-ended tasks. Read model performance together with the conditions supplied by the system."
  ],
  [
    "可以把本项目读成两条互相连接的链路：一条链路让模型在环境里连续行动，另一条链路把这些行动变成下一轮模型更新的依据。浏览器负责配置与观察，后端负责实际执行、保存证据和管理模型版本。",
    "Read the project as two connected loops: one lets a model act repeatedly in an environment; the other turns those actions into evidence for a model update. The browser configures and presents experiments, while the backend executes them, stores evidence, and manages model versions."
  ],
  [
    "章节内导航",
    "Navigate this chapter"
  ],
  [
    "任务与边界",
    "Tasks and scope"
  ],
  [
    "核心概念",
    "Core concepts"
  ],
  [
    "工作区关系",
    "Workspaces"
  ],
  [
    "两个闭环",
    "Two loops"
  ],
  [
    "一局实例",
    "An episode"
  ],
  [
    "如何看结果",
    "Reading results"
  ],
  [
    "复现证据",
    "Reproducibility"
  ],
  [
    "任务、输入与输出",
    "Tasks, inputs, and outputs"
  ],
  [
    "一次实验的输入不只有模型名称，还包括任务、场景种子与随机化规则、动作模式、观测来源、相机和动作预算。模型在这些条件下选择动作，物理仿真产生接触、位姿与成败结果。输出既有可视回放，也有可供审计的请求、响应、轨迹、指标和文件；只有训练闭环才会产生新的模型权重。",
    "An experiment is defined by more than a model name: it also includes the task, scene seed and randomization rules, action mode, observation source, cameras, and action budget. The model chooses actions under these conditions, and the physics simulation produces contacts, poses, and outcomes. Outputs include visual replays as well as auditable requests, responses, trajectories, metrics, and files. New model weights are produced only by the training loop."
  ],
  [
    "目标与差异",
    "Goal and distinction"
  ],
  [
    "当前用途",
    "Current use"
  ],
  [
    "搬运入盘 · transfer",
    "Place in tray · transfer"
  ],
  [
    "抓取方块、保持夹持搬到目标盘、释放并撤离。严格协议还审计稳定抓取、抬升、搬运与掉落。",
    "Grasp the cube, carry it while held, release it into the tray, and withdraw. The strict protocol additionally audits stable grasp, lift, transport, and drops."
  ],
  [
    "自主训练的主任务，也可用于模型测试与对比。",
    "The main self-evolving training task; also available in Model Test and Compare."
  ],
  [
    "方块堆叠 · stack",
    "Stack cubes · stack"
  ],
  [
    "把方块放到另一方块上，目标高度与支撑面不同；只到达水平坐标并不代表完成。",
    "Place the cube on another cube. The target height and support surface differ; reaching the horizontal coordinates alone does not complete the task."
  ],
  [
    "模型测试与对比；是否进入某次评测以运行配置为准。",
    "Model Test and Compare; inclusion in an evaluation depends on that run’s configuration."
  ],
  [
    "越障搬运 · barrier",
    "Transfer over a barrier · barrier"
  ],
  [
    "搬运路径需要避开障碍物，同时保持夹持。目标位置相似时，路径条件仍会改变。",
    "Transport the cube while maintaining its grasp and avoiding an obstacle. Similar destinations can require different paths."
  ],
  [
    "用于观察路径选择、碰撞和失败恢复。",
    "Useful for examining path selection, collisions, and recovery."
  ],
  [
    "任务 ID 对应代码中的成功条件。输入一段新的自然语言目标，不会自动创建新的物理场景或修改成功判定；增加新任务需要同步修改环境、动作协议、评价规则与测试。",
    "A task ID selects the success conditions implemented in code. Entering a new natural-language goal does not automatically create a physical scene or change the success test. Adding a task requires changes to the environment, action protocol, evaluation rules, and tests."
  ],
  [
    "先分清这些实验单位",
    "Distinguish the units of an experiment"
  ],
  [
    "概念",
    "Concept"
  ],
  [
    "在本项目中的含义",
    "Meaning in this project"
  ],
  [
    "策略 / 模型",
    "Policy / model"
  ],
  [
    "根据观测与候选作出选择的组件。规则基线、远端 API 和本地 RSI 都能提供选择，但只有已接入训练器的本地模型参与当前权重更新。",
    "The component that chooses among candidates from an observation. A rule baseline, remote API, or local RSI model can supply choices, but only local models integrated with the trainer participate in the current weight updates."
  ],
  [
    "候选 / 决策",
    "Candidate / decision"
  ],
  [
    "候选是程序定义的一项合法选择；决策是模型对一组候选的回答。候选顺序、说明和输入状态都是实验协议的一部分。",
    "A candidate is an option defined by the program; a decision is the model’s answer to a candidate set. Candidate order, descriptions, and input state are all part of the experiment protocol."
  ],
  [
    "动作步 / 整局",
    "Action step / episode"
  ],
  [
    "动作步是一次控制尝试，可能执行也可能被拒绝；整局从场景初始化开始，到成功、失败、预算耗尽或停止结束。一局包含多步，一个物理动作也可能需要多次模型决策。",
    "An action step is a control attempt that may execute or be rejected. An episode starts with scene initialization and ends in success, failure, an exhausted budget, or a stop. Episodes contain multiple steps, and a physical action can require multiple model decisions."
  ],
  [
    "运行 / 训练轮次",
    "Run / training round"
  ],
  [
    "运行 ID 把配置、整局、事件和产物关联起来。一轮训练则包括取数、拟合、开发选点和独立评测；它不是一局机械臂任务，也不是一次优化器更新。",
    "A run ID connects configuration, episodes, events, and artifacts. A training round includes data selection, fitting, development selection, and independent evaluation. It is neither one robot episode nor one optimizer update."
  ],
  [
    "检查点 / 发布版本",
    "Checkpoint / release"
  ],
  [
    "检查点保存权重与元数据；发布版本是通过验收、登记为可供后续推理使用的检查点。训练候选存在不代表它已上线。",
    "A checkpoint stores weights and metadata. A release is a checkpoint that has passed acceptance and been registered for subsequent inference. The existence of a training candidate does not mean it is deployed."
  ],
  [
    "从配置到实验，再到自进化",
    "From configuration to experiments and self-evolution"
  ],
  [
    "保存本地服务或远端 API 连接、具名模型与任务预设；用独立决策探针检查接口。保存配置不发送模型请求，也不训练模型。",
    "Save local or remote API connections, named models, and task presets; check an interface with an isolated decision probe. Saving a configuration neither sends a model request nor trains a model."
  ],
  [
    "运行规则基线或一个模型，查看它实际收到的观测、选择的候选、执行前后状态和失败原因。先在这里确认协议与接口。",
    "Run a rule baseline or a single model, inspect the observations it actually received, its chosen candidates, states before and after execution, and failure reasons. Establish the protocol and interface here first."
  ],
  [
    "在对应场景和约定配置下顺序运行多个模型，比较完整任务结果、调用数与延迟。对比前确认动作、观测和预算一致。",
    "Run several models sequentially on corresponding scenes and agreed settings; compare complete-task outcomes, request counts, and latency. Check that action modes, observations, and budgets match first."
  ],
  [
    "用本地 RSI checkpoint 连续采集，达到条件后筛选成功数据、拟合、评测并决定是否发布。右侧查看过程，下方完整报告核对每轮数据与模型证据。",
    "Collect continuously with a local RSI checkpoint. Once the conditions are met, filter successful data, fit a candidate, evaluate it, and decide whether to release it. Follow the process on the right and inspect each round’s data and model evidence in the full report below."
  ],
  [
    "这些页面共享服务与底层实现，但不是同一局实验。模型测试、对比和自主训练分别管理自己的会话或任务；切换页面不会把一个远端连接自动变成可训练模型，也不会自动继承所有实验参数。应在目标页面确认本次使用的模型和执行配置。",
    "These pages share a service and underlying implementation, but they are not one episode. Model Test, Compare, and Self-Evolving Training manage their own sessions or jobs. Switching pages does not turn a remote connection into a trainable model or automatically transfer every experiment setting. Confirm the active model and execution settings in the destination workspace."
  ],
  [
    "实时控制闭环与模型更新闭环",
    "The control loop and the model update loop"
  ],
  [
    "一局之内：观察 → 选择 → 执行 → 再观察",
    "Within an episode: observe → choose → execute → observe again"
  ],
  [
    "当前模型依据物体、夹爪和接触反馈选择下一步。执行失败会成为下一次输入的一部分；探索策略可以调整采样偏好，但这条链路本身不做反向传播。自主训练中的每一局固定所用的模型版本。",
    "The current model chooses the next step from object, gripper, and contact feedback. Failed execution can inform the next input. An exploration policy may change sampling preferences, but this loop itself performs no backpropagation. Each self-evolving training episode pins its model version."
  ],
  [
    "跨越多局：筛选 → 拟合 → 评测 → 发布",
    "Across episodes: filter → fit → evaluate → release"
  ],
  [
    "完整成功局形成回放样本。训练器继承父模型权重，更新决策头；开发集选出候选，再用独立场景与父模型配对比较。通过门槛的版本才供后续整局使用，失败的候选仍保留报告。",
    "Complete successful episodes supply replay examples. The trainer inherits the parent weights and updates the decision head. Development evaluation selects a candidate, followed by paired comparison with the parent on independent scenes. Only an accepted version is used by subsequent episodes; rejected candidates still retain their reports."
  ],
  [
    "当前默认 self-improve 更接近“按物理结果筛选的自模仿学习”：成功轨迹提供动作标签，失败轨迹用于诊断与探索记忆。它不会把每次失败直接当作一个梯度更新，也不意味着系统会自行改变任务定义或训练算法。仓库中的独立策略梯度实验使用另一套训练目标。",
    "The default self-improve workflow is outcome-filtered self-imitation: successful trajectories supply action labels, while failures support diagnosis and exploration memory. Each failure does not directly produce a gradient update, and the system does not autonomously rewrite task definitions or training algorithms. The repository’s separate policy-gradient experiments use a different objective."
  ],
  [
    "沿着一次搬运理解数据流",
    "Follow one transfer through the data flow"
  ],
  [
    "下面是用于理解流程的示例，不是一次新测得的实验结果。选择搬运入盘、固定种子、预设技能与仿真真值后，系统先初始化场景，模型通常需要依次完成接近、下降、闭爪、抬升、搬运、下降、释放和撤离。具体顺序由当前协议与真实反馈决定。",
    "The following is an explanatory example, not a newly measured experiment. With transfer, a fixed seed, preset skills, and simulator state selected, the system initializes the scene. The model typically needs to approach, descend, close, lift, carry, lower, release, and withdraw. The current protocol and actual feedback determine the sequence."
  ],
  [
    "看输入",
    "Inspect the input"
  ],
  [
    "闭爪之前，核对方块位置、TCP、夹爪状态、接触与候选说明。不要只凭中央视图猜测模型看到了什么。",
    "Before closing, inspect the cube position, TCP, gripper state, contacts, and candidate descriptions. The central view alone does not tell you what the model saw."
  ],
  [
    "看结果",
    "Inspect the outcome"
  ],
  [
    "即使模型选择抓取、动作也执行完成，双指没有形成稳定接触仍可能是空抓。下一步应依据新的观测，不能把“选择了抓取”当作“已经抓住”。",
    "Even if grasping was selected and the command executed, the fingers may have failed to establish stable contact. The next decision must use the new observation; choosing to grasp does not establish that the object is held."
  ],
  [
    "看整局",
    "Inspect the episode"
  ],
  [
    "最终必须满足该协议的物理成功条件。中途出现一次看似正确的动作，不会让失败整局自动成为成功回放训练数据。",
    "The final outcome must satisfy that protocol’s physical success conditions. A seemingly correct intermediate action does not turn a failed episode into successful replay training data."
  ],
  [
    "看版本",
    "Inspect the version"
  ],
  [
    "成功轨迹通过过滤后可能进入后续训练。候选还要通过新场景评测；发布记录和下一局的 checkpoint 哈希才能说明新模型实际开始服务。",
    "An accepted successful trajectory may enter later training. The candidate must still pass evaluation on new scenes. The release record and the next episode’s checkpoint hash show when the new model actually enters service."
  ],
  [
    "完成率、loss 和延迟分别说明什么",
    "What completion rate, loss, and latency tell you"
  ],
  [
    "指标",
    "Metric"
  ],
  [
    "如何解释",
    "How to interpret it"
  ],
  [
    "描述当前采样策略、场景和预算下获得成功整局的比例。它可能受探索、场景难度和筛选影响，不能直接替代独立评测成绩。",
    "The fraction of successful episodes under the current sampling policy, scenes, and budget. Exploration, scene difficulty, and selection affect it; it cannot replace independent evaluation."
  ],
  [
    "回放 loss",
    "Replay loss"
  ],
  [
    "衡量模型对保留下来的成功动作标签拟合得如何。loss 下降并不保证多步闭环稳定，也不能单独触发模型发布。",
    "Measures how well the model fits retained successful action labels. A lower loss does not establish stable multi-step behavior and cannot by itself authorize a release."
  ],
  [
    "配对完成率提升",
    "Paired completion-rate gain"
  ],
  [
    "父模型与候选在相同独立场景上的完成率差。需一起看样本数、任务覆盖、置信区间和退步情况；例如 40% 到 50% 是提升 10 个百分点。",
    "The difference between candidate and parent completion rates on the same independent scenes. Read it with sample size, task coverage, confidence intervals, and regressions. For example, 40% to 50% is a gain of 10 percentage points."
  ],
  [
    "模型耗时与整局耗时",
    "Model latency and episode duration"
  ],
  [
    "一次请求的等待时间、决策次数、物理推进和渲染时间是不同开销。分层动作可能包含多个请求；不能只拿单次 API 延迟评价整局效率。",
    "Request latency, decision count, physics stepping, and rendering contribute different costs. Hierarchical actions may involve several requests; one API latency is not a measure of whole-episode efficiency."
  ],
  [
    "候选概率",
    "Candidate probability"
  ],
  [
    "表示模型在这组输入与候选下的选择分布，不是任务成功率。改变候选集合、提示或动作模式后，数值不能直接横向比较。",
    "Describes the model’s choice distribution for this input and candidate set, not task success probability. Values are not directly comparable after changing candidates, prompts, or action modes."
  ],
  [
    "一项结果应能追溯到哪些证据",
    "Evidence needed to trace a result"
  ],
  [
    "首先定位运行 ID 和整局 ID，再核对模型版本与 SHA256、任务与场景哈希、动作／观测／相机配置、成功协议、请求与响应、执行前后状态以及终止原因。训练结果还需要数据 manifest、父模型、训练参数、开发选点和独立评测记录。种子只负责场景的一部分可重复性，不能替代这些信息。",
    "Start with the run and episode IDs, then check the model version and SHA256, task and scene hash, action/observation/camera settings, success protocol, requests and responses, before/after states, and termination reason. Training results also require the data manifest, parent model, training settings, development selection, and independent evaluation record. A seed captures only part of reproducibility; it does not replace this evidence."
  ],
  [
    "学习时先解释清楚一个决策为什么被选中、是否执行、产生什么后果，再读整轮训练报告。这样能把网页上的曲线和动画对应到真实的数据与代码，而不是把画面流畅程度当作模型能力。",
    "When learning the project, first explain why one decision was selected, whether it executed, and what happened next. Then read an entire training report. This connects charts and animations to actual data and code instead of treating smooth visualization as evidence of model ability."
  ],
  [
    "理解架构时，沿着数据的归属阅读：谁保存真实环境、谁决定模型可见的观测、谁构造候选、谁执行动作、谁判定成功、谁有权发布新模型。界面把这些过程放在一起展示，但代码中的职责与生命周期是分开的。",
    "Follow data ownership to understand the architecture: who holds the physical environment, who determines the model’s observation, who builds candidates, who executes actions, who judges success, and who can release a new model. The interface presents these processes together, while the code keeps their responsibilities and lifecycles separate."
  ],
  [
    "系统分层",
    "System layers"
  ],
  [
    "进程与会话",
    "Processes and sessions"
  ],
  [
    "单步数据流",
    "One action step"
  ],
  [
    "三种动作模式",
    "Action modes"
  ],
  [
    "观测与相机",
    "Observations"
  ],
  [
    "模型与概率",
    "Models and probabilities"
  ],
  [
    "执行与成功",
    "Execution and success"
  ],
  [
    "如何接入训练",
    "Training integration"
  ],
  [
    "日志与代码定位",
    "Tracing the code"
  ],
  [
    "系统分层与数据方向",
    "System layers and data flow"
  ],
  [
    "配置、Three.js 视图、MuJoCo 画面、报告与日志",
    "Configuration, Three.js views, MuJoCo frames, reports, and logs"
  ],
  [
    "模型接口与 RSI 工作进程",
    "Model adapters and RSI workers"
  ],
  [
    "选择、概率、推理、拟合与评测",
    "Choices, probabilities, inference, fitting, and evaluation"
  ],
  [
    "层级",
    "Layer"
  ],
  [
    "承担的职责与边界",
    "Responsibilities and boundaries"
  ],
  [
    "浏览器表示层",
    "Browser presentation"
  ],
  [
    "提交配置与控制意图，读取状态、日志和报告。Three.js 根据后端状态绘制模型测试场景；自主训练画面来自 MuJoCo 渲染。浏览器动画不承担物理计算或模型训练。",
    "Submits configuration and control intent, then reads state, logs, and reports. Three.js draws Model Test scenes from backend state; self-evolving training frames are rendered by MuJoCo. Browser animation does not perform physics or model training."
  ],
  [
    "服务与调度层",
    "Service and scheduling"
  ],
  [
    "FastAPI 挂载两个接口域，管理实验会话、采集线程、训练作业和持久记录。读取状态与启动任务是不同请求；页面刷新不是一次训练指令。",
    "FastAPI mounts the two API namespaces and manages experiment sessions, collection threads, training jobs, and persistent records. Reading state and starting a job are different requests; refreshing a page is not a training instruction."
  ],
  [
    "决策协议层",
    "Decision protocols"
  ],
  [
    "从观测构造模型输入与候选，通过适配器调用模型，校验选择与概率。技能、XYZ 和分层 XYZ 在这一层定义模型实际承担的决策。",
    "Constructs model inputs and candidates from observations, invokes a model adapter, and validates choices and probabilities. Skills, XYZ, and hierarchical XYZ define the decisions assigned to the model at this layer."
  ],
  [
    "物理执行层",
    "Physical execution"
  ],
  [
    "把目标位置和夹爪命令转换为关节控制，推进 MuJoCo，检测接触、掉落和任务完成。模型输出不能直接修改成功标记。",
    "Converts target positions and gripper commands into joint control, steps MuJoCo, and checks contacts, drops, and task completion. Model output cannot directly set the success flag."
  ],
  [
    "学习与发布层",
    "Learning and release"
  ],
  [
    "消费带来源与协议的轨迹，产生候选 checkpoint，执行开发与独立评测，再通过注册表切换活动版本。训练文件存在与部署成功是不同事件。",
    "Consumes trajectories with provenance and protocols, produces candidate checkpoints, runs development and independent evaluations, then switches the active version through the registry. A training artifact and a successful deployment are separate events."
  ],
  [
    "服务、物理线程与模型工作进程",
    "The service, physics threads, and model workers"
  ],
  [
    "统一启动器读取 lab-config.json，再创建训练控制台服务，并在 /workbench 挂载模型实验服务。两者在同一个服务进程里运行，复用物理和感知代码；各会话仍有各自的场景、当前步骤与运行状态。切换模型测试和自主训练，不会把前一页的机械臂位置转移到后一页。",
    "The launcher reads lab-config.json, creates the training dashboard service, and mounts the model experiment service at /workbench. They run in one service process and reuse physics and perception code, but their sessions retain their own scenes, steps, and runtime state. Switching between Model Test and Self-Evolving Training does not transfer the arm’s pose between those sessions."
  ],
  [
    "自主训练的仿真线程负责物理推进与渲染。RSI 推理可交给独立 Python 子进程，通过标准输入／输出中的 JSON 行传递状态、候选与概率；这样主服务不必使用同一个 PyTorch 环境。后台 self-improve 则是另一类作业，具有独立阶段、进程与日志。",
    "The self-evolving simulation thread owns physics stepping and rendering. RSI inference can run in a separate Python process, exchanging state, candidates, and probabilities as JSON lines over standard input/output, so the main service does not need the same PyTorch environment. A background self-improve job has its own stages, process, and logs."
  ],
  [
    "页面跳转或关闭浏览器不会等同于停止后端任务。暂停、停止采集和停止后台训练具有不同作用域：停止生成新轨迹后，已经启动的训练仍可继续评测。重新打开页面应以服务返回的状态为准；恢复已保存模型也不等于恢复上一轮优化器的全部中间状态。",
    "Navigation or closing the browser is not equivalent to stopping backend work. Pause, stop collection, and stop background training have different scopes: an accepted training job can continue through evaluation after collection stops. On reopening the page, use the state returned by the service. Reloading saved model weights also does not imply restoring every intermediate optimizer state."
  ],
  [
    "一次动作：从状态到可验证的物理结果",
    "One action: from state to a verifiable physical outcome"
  ],
  [
    "采样与投影",
    "Sample and project"
  ],
  [
    "在决策边界读取当前环境。仿真真值直接提供结构化状态；RGB-D 先检测并估计几何；直接图像保留相机像素并限制目标坐标暴露。调试记录和模型输入分别组织。",
    "Read the environment at a decision boundary. Simulator state supplies structured observations; RGB-D first detects objects and estimates geometry; direct-image mode retains camera pixels and restricts target-coordinate exposure. Debug records and model inputs are assembled separately."
  ],
  [
    "组织候选与历史",
    "Build candidates and history"
  ],
  [
    "根据动作协议构造带稳定 ID 的选择，加入允许的近期执行结果、任务说明与必要几何知识。某些协议先过滤或预演候选，另一些只在模型选择后检查执行。",
    "Build choices with stable IDs according to the action protocol, adding permitted recent outcomes, task instructions, and required geometry. Some protocols filter or preview candidates first; others check execution only after selection."
  ],
  [
    "请求模型",
    "Request a decision"
  ],
  [
    "适配器把状态、候选说明和指令发送到所选模型，记录输入、候选顺序、响应和耗时。图像只在支持图像的路径中作为实际请求载荷发送。",
    "The adapter sends state, candidate descriptions, and instructions to the selected model, recording the input, candidate order, response, and latency. Images enter the actual request payload only on a supported image path."
  ],
  [
    "校验与选取",
    "Validate and select"
  ],
  [
    "检查返回的 ID 是否属于本次候选，概率是否有限且满足协议。RSI 评测通常取最大概率，探索可按分布采样；保留原始模型概率与探索调整后的分布。",
    "Check that the returned ID belongs to this candidate set and that probabilities are finite and satisfy the protocol. RSI evaluation normally uses the maximum probability; exploration can sample from a distribution. Preserve both raw model probabilities and any exploration-adjusted distribution."
  ],
  [
    "预演与执行",
    "Preview and execute"
  ],
  [
    "把选择转换为 TCP 目标与夹爪命令，进行工作区、逆运动学和接触检查。通过检查后推进实际世界；不可达或碰撞等问题记录为拒绝，不能把选中动作算作已执行。",
    "Convert the choice into a TCP target and gripper command, with workspace, inverse-kinematics, and contact checks. Advance the actual world after the required checks; record unreachable targets or collisions as rejections. Selection alone is not execution."
  ],
  [
    "反馈与收尾",
    "Observe feedback and finish"
  ],
  [
    "再次观测实际结果，记录位姿、夹持、释放、终止原因与审计数据。若没有结束，下一次决策使用新的状态。整局完成后才确定这条轨迹是否具备后续训练资格。",
    "Observe the actual outcome again and record poses, grasp/release state, termination reasons, and audit data. If the episode continues, the next decision uses the updated state. Eligibility for later training is determined after the episode completes."
  ],
  [
    "运行预算限制一局最多尝试多少步；感知失效、碰撞、反复无进展等条件也可能结束一局。错误必须落到记录里的具体原因。模型输出错误、执行拒绝、任务失败是不同位置的问题，排查时不要只看最后一个“失败”标签。",
    "The action budget limits attempts per episode. Perception failure, collision, or repeated lack of progress can also end an episode. Errors need concrete reasons in the record. Invalid model output, rejected execution, and task failure occur at different points; diagnose beyond the final “failed” label."
  ],
  [
    "三种动作模式，三种不同的决策分工",
    "Three action modes assign different work to the model"
  ],
  [
    "预设技能：模型选择动作意图，程序提供几何路径",
    "Preset skills: model intent, program-defined geometry"
  ],
  [
    "程序根据当前物体与目标位置生成接近、下降、抓取、抬升、搬运、降低、释放、撤离和恢复等技能候选。每个候选带有目标位置、夹爪命令与时长。模型主要决定现在选择哪一种操作；几何路径、夹爪控制和成功规则仍由代码提供。",
    "The program uses current object and target geometry to generate skills such as approach, descend, grasp, lift, carry, lower, release, withdraw, and recover. A candidate includes a target position, gripper command, and duration. The model primarily chooses what to do next; code still provides geometric paths, gripper control, and success rules."
  ],
  [
    "两条技能实现不能视为完全相同：模型测试通常先选阶段、再从该阶段的候选中选动作，并可使用候选预演信息；RSI 根据当前阶段组织技能菜单，新的分阶段协议还可能进一步收窄候选。完成率必须连同阶段规则与候选构造方式一起解释。",
    "The two skill implementations are not identical. Model Test normally selects a phase and then an action within that phase, and can use candidate-preview information. RSI builds a skill menu for the current stage, with newer staged protocols potentially narrowing it further. Interpret completion rates together with stage rules and candidate construction."
  ],
  [
    "逐步 XYZ：模型选择移动轴、方向和尺度",
    "Incremental XYZ: the model chooses axis, direction, and scale"
  ],
  [
    "底层定义 21 个离散命令：X／Y／Z 三轴的正负方向，各有 40、10、2 毫米三档，共 18 个移动；再加张开、闭合与保持。候选只根据当前 TCP 生成，不把预测任务进展作为排名依据。每步移动后重新观测，因此模型需要自己处理多步对齐和闭环纠错。",
    "The underlying command set has 21 discrete options: positive and negative motion along X/Y/Z at 40, 10, or 2 mm, giving 18 translations, plus open, close, and hold. Candidates are generated from the current TCP without ranking them by predicted task progress. Each move is followed by a new observation, so the model handles multi-step alignment and correction."
  ],
  [
    "越界命令不会悄悄裁剪到合法坐标。模型测试可显示这些候选及其拒绝原因；当前 RSI 适配在发出请求前只把允许执行的候选放入菜单。因此“底层有 21 个命令”不代表每次请求都包含 21 个可选项。",
    "Out-of-bounds commands are not silently clipped to valid coordinates. Model Test can show those candidates and their rejection reasons; the current RSI adapter includes only admitted candidates in its request menu. A 21-command vocabulary therefore does not mean every request contains 21 selectable options."
  ],
  [
    "分层 XYZ：先选子目标，再选运动通道",
    "Hierarchical XYZ: choose a subgoal, then motor channels"
  ],
  [
    "模型先在接近、抓取、抬升、搬运、下降、释放、撤离和完成等子目标中选择，再分别回答 X、Y、Z 的负向／保持／正向，以及夹爪张开／保持／闭合。程序根据测得的相对误差确定每轴 2–12 毫米的有界步长，保留模型选择的方向与夹爪命令。",
    "The model first chooses a subgoal such as approach, grasp, lift, carry, lower, release, withdraw, or finish. It then chooses negative/hold/positive for X, Y, and Z, and open/hold/close for the gripper. The program derives bounded 2–12 mm per-axis step magnitudes from measured relative errors while preserving the selected directions and gripper command."
  ],
  [
    "当前 RSI 路径对一次物理动作分别记录子目标与四个通道的决策；模型测试的适配器则可能把四个运动问题合并到一次请求。调用数、决策数和物理步数因此不相等。各通道概率必须分别查看和训练，不能相乘后当作整步成功概率。",
    "The current RSI path records a subgoal decision and four channel decisions for one physical action. A Model Test adapter may batch the four motor questions into one request. Request count, decision count, and physical step count are therefore different. Inspect and train channel probabilities separately; multiplying them does not yield physical-step success probability."
  ],
  [
    "三种模式都由程序定义候选与执行器，模型不直接输出关节力矩或任意可执行代码。技能模式提供更多任务级辅助，XYZ 更强调连续纠错，分层模式拆分意图与方向。比较模型时必须固定模式，不能把不同程序辅助条件下的分数解释成同一种能力。",
    "All three modes use program-defined candidates and controllers; the model does not directly output joint torques or arbitrary executable code. Skills provide more task-level assistance, XYZ places more demand on repeated correction, and hierarchy separates intent from direction. Fix the mode when comparing models; scores under different program assistance do not measure the same capability."
  ],
  [
    "模型看见什么：观测、相机与审计边界",
    "What the model sees: observations, cameras, and audit boundaries"
  ],
  [
    "提供给决策的内容",
    "Decision input"
  ],
  [
    "适用范围与限制",
    "Support and limits"
  ],
  [
    "直接读取环境中的位置、本体与接触信息，按协议投影为结构化输入。它是明确标记的特权观测。",
    "Reads positions, proprioception, and contacts from the simulator, projecting them into protocol-specific structured input. This is explicitly privileged observation."
  ],
  [
    "模型测试和自主训练均支持。开启相机预览不表示图像会进入模型请求。",
    "Supported in Model Test and Self-Evolving Training. Enabling camera previews does not put images into the model request."
  ],
  [
    "RGB-D 检测",
    "RGB-D detection"
  ],
  [
    "对选中相机的颜色与深度图进行检测、标定反投影与坐标估计，再把结构化结果交给模型。",
    "Detects objects in selected color/depth views, back-projects with calibration, and supplies structured position estimates to the model."
  ],
  [
    "两条链路均支持，至少需要一个视角；当前检测依赖已知颜色、尺寸与场景规则。",
    "Supported in both loops and requires at least one view. The current detector relies on known colors, sizes, and scene rules."
  ],
  [
    "直接图像",
    "Direct images"
  ],
  [
    "将相机 RGB 作为原生图像载荷送给支持视觉的模型；保留 TCP、本体与接触反馈，限制物体／目标真值坐标。",
    "Sends camera RGB as native image payloads to a vision-capable model. TCP, proprioception, and contact feedback remain available; object/target ground-truth coordinates are restricted."
  ],
  [
    "当前模型测试的逐步 XYZ 与支持图像的 Chat／Claude 路径可用。本地 RSI 训练仅支持文本／结构化状态，直接图像禁用。",
    "Available in Model Test with incremental XYZ and image-capable Chat/Claude paths. Local RSI training supports text/structured state only; direct images are disabled."
  ],
  [
    "RGB-D 检测器利用已知红色方块、蓝色目标和黄色障碍物的颜色线索，结合深度、相机标定与方块尺寸先验估计位置；它不是通用的已训练目标检测网络。短时遮挡可使用有时效限制的跟踪或夹持传播，必要目标持续不可见时返回 perception_unavailable，不用仿真真值补齐。",
    "The RGB-D detector uses known color cues for the red cube, blue target, and yellow obstacle, together with depth, camera calibration, and cube-size priors. It is not a general trained object-detection network. Brief occlusion may use age-limited tracking or held-object propagation; persistent loss of a required target returns perception_unavailable rather than filling the gap with simulator truth."
  ],
  [
    "外部相机与腕部相机提供不同视角，选择双相机会增加观测内容与处理开销。相机在决策和动作边界采样；这不是把整个渲染视频实时发送给模型。中央自由旋转的三维画面用于调试，应查看实际相机捕获记录及请求载荷来确认模型看到的内容。",
    "External and wrist cameras offer different viewpoints, and enabling both increases observation content and processing cost. Cameras sample at decision and action boundaries; the entire rendered video is not continuously streamed to the model. The freely rotated central 3D view is for debugging. Inspect actual captures and request payloads to establish what the model received."
  ],
  [
    "观察权限还取决于具体协议。RSI 和逐步 XYZ 使用明确的状态投影，排除种子、未来结果和用于审计的成功标签；旧的模型测试技能路径可能包含当前成功状态、场景配置与候选预演元数据。因此不能把所有模式都描述成同一种最小信息输入，应直接检查 decision_request 中的 state、criteria 与图像载荷。",
    "Observation permissions also depend on the protocol. RSI and incremental XYZ use explicit state projections that exclude seeds, future outcomes, and audit success labels. The legacy Model Test skill path can include current success state, scene configuration, and candidate-preview metadata. These modes must not be described as receiving the same minimal input; inspect state, criteria, and image payloads in decision_request."
  ],
  [
    "结果审计仍需要 MuJoCo 真值。轨迹里的 before／after 可用于核验真实接触和终止条件，observed_before／observed_after 则记录传给决策路径的观测。日志含有真值不等于模型请求含有真值；必须沿字段来源核对，尤其是在 RGB-D 实验中。",
    "Outcome auditing still requires MuJoCo truth. Trajectory before/after fields can verify physical contacts and termination, while observed_before/observed_after record observations supplied to the decision path. Ground truth in a log does not imply ground truth in a model request; trace the field provenance, especially for RGB-D experiments."
  ],
  [
    "模型适配、候选概率与人工介入",
    "Model adapters, candidate probabilities, and human intervention"
  ],
  [
    "模型接口不是直接控制机械臂的自由文本通道。适配器把本轮状态、指令与候选转换为所选服务支持的请求，再把回答解析为候选 ID 或概率分布。非法 ID、缺失字段、非有限概率和不符合协议的总和都需要校验；模型名称相同但提示、候选或接口格式不同，实验也可能不同。",
    "The model interface is not a free-text channel directly controlling the arm. Adapters convert the current state, instructions, and candidates into a supported request, then parse the response into candidate IDs or probability distributions. Invalid IDs, missing fields, non-finite probabilities, and invalid totals require validation. The same model name with different prompts, candidates, or interface formats can define a different experiment."
  ],
  [
    "决策来源",
    "Decision source"
  ],
  [
    "如何解读返回值",
    "How to read the response"
  ],
  [
    "使用代码规则给出动作，是检查环境与执行链路的参照。没有实际模型调用，也没有模型原生候选概率；教师产生的数据需要单独标记。",
    "Selects actions with coded rules and serves as a reference for the environment and execution path. It makes no actual model call and supplies no model-native candidate probabilities. Teacher-generated data must be labeled separately."
  ],
  [
    "本地 RSI / 结构化 Jev",
    "Local RSI / structured Jev"
  ],
  [
    "可返回候选概率。RSI 按当前菜单校验分布再进行最大值选择或采样；远端 Jev 的选择与概率分别保留，选择不是最大值时可以报告差异，不能改写为一条不存在的原始回答。",
    "Can provide candidate probabilities. RSI validates the distribution against the current menu before argmax selection or sampling. Remote Jev choices and probabilities are preserved separately; disagreement with the maximum can be reported without rewriting the original response."
  ],
  [
    "Chat / Claude",
    "Chat / Claude"
  ],
  [
    "解析结构化选择或工具返回；没有原生候选概率时不构造一组虚假概率。模型文字中的自报置信度不等于决策分布。",
    "Parses structured selections or tool results. When native candidate probabilities are absent, none are fabricated. Self-reported confidence in text is not the decision distribution."
  ],
  [
    "概率回答的是“在当前输入和候选集合中更倾向选择什么”。它不承诺该动作可达，更不承诺任务最终成功。界面里的说明是模型公开返回的解释或系统记录的证据，不代表访问了模型未公开的内部思考过程。",
    "A probability answers which option the model prefers within the current input and candidate set. It guarantees neither action reachability nor eventual task success. Explanations shown in the interface are public model responses or recorded system evidence, not access to undisclosed internal reasoning."
  ],
  [
    "模型测试中的低置信度人工介入开关，只在接口提供相应候选概率时按门槛暂停。关闭该开关允许继续决策，不会关闭动作执行检查，也不会让 Chat 自动拥有候选概率。感知失效、非法输出和碰撞等错误仍按各自规则处理。",
    "The low-confidence intervention switch in Model Test pauses at the threshold only when the interface supplies the relevant candidate probabilities. Turning it off permits continued decisions; it does not disable execution checks or create probabilities for Chat. Perception failure, invalid output, and collisions still follow their own handling rules."
  ],
  [
    "从 TCP 目标到关节运动，再到成功判定",
    "From TCP targets to joint motion and success checks"
  ],
  [
    "TCP 是机械臂末端控制点。模型选择经过动作协议转换后，得到笛卡尔目标位置与夹爪命令；逆运动学求解满足位置和朝向约束的七关节姿态，再用平滑插值与关节控制推进。基础物理时间步为 0.002 秒，即每模拟秒 500 步；这不是模型每秒请求 500 次，也不保证每模拟秒等于一秒墙钟时间。",
    "TCP is the arm’s tool center point. The action protocol converts a model choice into a Cartesian target and gripper command. Inverse kinematics solves a seven-joint pose under position and orientation constraints, followed by smooth interpolation and joint control. The base physics timestep is 0.002 seconds, or 500 steps per simulated second. This is not 500 model requests per second, nor a guarantee that a simulated second takes one wall-clock second."
  ],
  [
    "运动检查包括有限数值、工作区边界、逆运动学误差和指定部位的接触。RSI 执行器先在克隆世界预演，再执行并继续监测；模型测试按当前候选预演设置与运行时检查处理。检测范围是代码明确列出的几何与接触规则，不能把通过预演解释成真实机器人的完整安全证明。",
    "Motion checks cover finite values, workspace bounds, inverse-kinematics error, and contacts involving specified body parts. The RSI executor previews in a cloned world, then executes with continued monitoring. Model Test uses its configured candidate previews and runtime checks. These checks cover the geometry and contact rules implemented in code; passing a preview is not a complete safety proof for physical hardware."
  ],
  [
    "判定层级",
    "Check"
  ],
  [
    "需要哪些实际证据",
    "Required physical evidence"
  ],
  [
    "动作执行",
    "Action executed"
  ],
  [
    "控制命令通过当前检查并实际推进了环境。它只说明这一步发生了，不说明抓取有效或整局成功。",
    "The command passed the applicable checks and advanced the environment. This establishes that the step happened, not that the grasp was valid or the task succeeded."
  ],
  [
    "基础放置成功",
    "Base placement success"
  ],
  [
    "方块与目标支撑面接触，水平误差小于 25 毫米，速度低于 25 毫米／秒，夹爪张开并稳定至少 0.4 秒，TCP 撤离到至少 170 毫米高度。",
    "The cube contacts the target support, has horizontal error below 25 mm and speed below 25 mm/s, remains stable with the gripper open for at least 0.4 s, and the TCP withdraws to at least 170 mm height."
  ],
  [
    "严格抓取与搬运成功",
    "Strict grasp-and-transfer success"
  ],
  [
    "在基础放置条件之外，审计稳定双指夹持、至少 30 毫米抬升、保持夹持的搬运、目标附近合规释放，以及无掉落、无禁止接触。新 RSI 默认使用此类严格协议。",
    "In addition to base placement, audits stable two-finger grasp, at least 30 mm lift, held transport, valid release near the target, and absence of drops or prohibited contacts. New RSI runs default to this stricter protocol."
  ],
  [
    "历史 checkpoint 可能绑定旧协议，加载时会恢复相应的 episode_protocol。复现实验必须同时核对 success_definition、动作模式、观测配置和场景分布；不能把采用不同成功条件的两个百分比直接比较。",
    "Historical checkpoints may be bound to older protocols, restored through episode_protocol when loaded. Reproduction must check success_definition, action mode, observation settings, and scene distribution together. Percentages measured with different success conditions are not directly comparable."
  ],
  [
    "决策记录怎样接入训练与部署",
    "How decision records enter training and deployment"
  ],
  [
    "轨迹记录的不只是最后一个成功标记，还包括每次请求的状态与候选、原始模型概率、探索策略、选中动作、实际执行情况和物理审计。对分层 XYZ，需要保留子目标与四个运动通道各自的输入和标签，不能把拼出的整体动作当作一次普通分类。",
    "A trajectory contains more than a final success flag: it records request state and candidates, raw model probabilities, exploration strategy, chosen actions, actual execution, and physical audits. Hierarchical XYZ must preserve inputs and labels for the subgoal and each of the four motor channels rather than treating the assembled motion as one ordinary classification."
  ],
  [
    "自动训练同时等待足够的新增整局与新增成功局，后台忙时排队等待，并用处理水位避免重复触发同一批数据。筛选时排除失败、重复、仅评测和来源不合规的轨迹，再检查未执行、空抓、失抓等动作。动作、观测、相机与成功协议随数据一起保存，防止不同条件的样本混用。",
    "Automatic training waits for enough new complete episodes and new successes, waits while background work is busy, and uses a processing watermark to avoid retriggering on the same batch. Filtering removes failed, duplicate, evaluation-only, and ineligible-provenance trajectories, then checks unexecuted actions, empty grasps, and lost grasps. Action, observation, camera, and success protocols accompany the data to prevent incompatible examples from being mixed."
  ],
  [
    "默认训练冻结编码塔，把状态与候选编码缓存起来，只更新 scorer 决策头，使成功回放中的动作获得更高概率。每轮继承父权重并重新创建优化器。开发场景用于选 checkpoint；发布评测另用独立场景，对父模型和候选进行配对比较，避免把用于选点的成绩当作最终验收结果。",
    "Default training freezes the encoder towers, caches state and candidate features, and updates only the scorer head to favor actions from successful replay. Each round inherits parent weights and creates a fresh optimizer. Development scenes select the checkpoint; release evaluation uses separate independent scenes for paired parent/candidate comparison, so selection scores do not become final acceptance results."
  ],
  [
    "候选通过门槛后，部署层核对哈希、加载并预热，再原子更新活动模型注册表。正在进行的一局继续使用已固定的版本，后续新局才获取新发布模型。因此应分别查看“当前采集模型”“训练候选”和“发布模型”，它们不一定相同。详细过滤规则与发布门槛见下一章。",
    "After a candidate passes the gates, deployment verifies its hash, loads and warms it, then atomically updates the active model registry. An in-flight episode keeps its pinned version; subsequent episodes acquire the new release. Inspect the collection model, training candidate, and released model separately—they can differ. The next chapter details filtering and release gates."
  ],
  [
    "从网页现象追到接口、日志和源码",
    "Trace a UI observation through APIs, logs, and source"
  ],
  [
    "观察对象",
    "What to inspect"
  ],
  [
    "读取路径与代码线索",
    "Read path and code pointers"
  ],
  [
    "模型测试状态、相机与请求",
    "Model Test state, cameras, and requests"
  ],
  [
    "沿 server → runtime → policies / perception 查找。",
    "Follow server → runtime → policies / perception."
  ],
  [
    "自主训练实时状态与能力",
    "Live self-evolving state and capabilities"
  ],
  [
    "沿 dashboard → simulation → sim / configured_sim 查找。",
    "Follow dashboard → simulation → sim / configured_sim."
  ],
  [
    "全过程日志与原始事件",
    "Process logs and raw events"
  ],
  [
    "按阶段、运行与整局关联请求、执行、过滤、训练和部署；持久记录由 storage 管理。",
    "Correlate requests, execution, filtering, training, and deployment by stage, run, and episode. storage manages persistent records."
  ],
  [
    "轮次报告与产物",
    "Round reports and artifacts"
  ],
  [
    "对照 artifacts 下的运行目录、JSONL、数据清单、checkpoint 与发布记录。",
    "Compare run directories, JSONL records, data manifests, checkpoints, and release records under artifacts."
  ],
  [
    "诊断“选错动作”时，先看本次 state、候选顺序和原始回答；诊断“选对但没动”时，看 admitted、executed 与 rejection；诊断“动作都做了却不成功”时，看接触、夹持、释放和成功协议；诊断“训练完成但没上线”时，看独立评测与部署门槛。这样的阅读顺序能把问题定位到真正负责的模块。",
    "For “wrong choice,” inspect the request state, candidate order, and raw response. For “right choice but no motion,” inspect admitted, executed, and rejection. For “actions completed but task failed,” inspect contacts, grasp, release, and the success protocol. For “training finished but no release,” inspect independent evaluation and deployment gates. This order locates the module actually responsible."
  ],
  [
    "SQLite 持久事件与 JSONL 轨迹用于过程审计，相机捕获标识和哈希用于核对观测，参数快照用于回看训练变化。历史回放、页面进度动画和真实的新优化器更新是不同事件；判断是否仍在训练，应以后台作业状态和新增训练事件为准。",
    "Persistent SQLite events and JSONL trajectories support process audits; camera capture IDs and hashes verify observations; parameter snapshots show training history. Historical replay, animated UI progress, and actual new optimizer updates are different events. Use background job state and new training events to determine whether training is still running."
  ],
  [
    "后端和 Web UI 需要分别安装依赖，但构建后由同一个 Python 服务提供完整工作台。以下命令适用于 macOS / Linux 的 shell，均从 embodied-lab 项目根目录执行。先完成后端与界面安装，再启动服务；需要本地自进化训练时额外安装 RSI 环境。",
    "The backend and Web UI need separate dependency installation, but one Python service serves the complete workbench after the UI is built. The commands below use a macOS/Linux shell and run from the embodied-lab project root. Install the backend and UI before starting the service; add the RSI environment for local self-evolving training."
  ],
  [
    "环境要求",
    "Prerequisites"
  ],
  [
    "后端安装",
    "Backend installation"
  ],
  [
    "Web UI 安装",
    "Web UI installation"
  ],
  [
    "RSI 训练环境",
    "RSI environment"
  ],
  [
    "启动服务",
    "Start the service"
  ],
  [
    "验证与配置",
    "Verify and configure"
  ],
  [
    "前端开发",
    "Frontend development"
  ],
  [
    "1. 准备工具与版本",
    "1. Prepare tools and versions"
  ],
  [
    "工具 / 环境",
    "Tool / environment"
  ],
  [
    "本项目的要求",
    "Project requirement"
  ],
  [
    "Git 与 uv",
    "Git and uv"
  ],
  [
    "先安装并确保命令在 PATH 中。Git 获取固定的上游代码；uv 创建 Python 环境并安装依赖。",
    "Install both and make their commands available on PATH. Git fetches pinned upstream source; uv creates Python environments and installs dependencies."
  ],
  [
    "Python 3.12",
    "Python 3.12"
  ],
  [
    "下面使用 uv 安装并选择 3.12。虽然项目元数据写的是 Python ≥3.11，但当前 constraints-simulation.txt 固定的 NumPy 要求 ≥3.12；按当前锁定依赖复现时使用 3.12。",
    "The commands below install and select 3.12 with uv. Project metadata declares Python ≥3.11, but NumPy pinned by the current constraints-simulation.txt requires ≥3.12. Use 3.12 to reproduce this pinned environment."
  ],
  [
    "Node.js 与 npm",
    "Node.js and npm"
  ],
  [
    "当前 Vite 支持 Node 20.19+ 的 20.x 或 ≥22.12。使用满足该范围的 Node；npm 随 Node 提供，用于安装和构建 Web UI。",
    "The current Vite package requires Node 20.19+ in the 20.x line or ≥22.12. Use a version in that range; npm comes with Node and installs/builds the Web UI."
  ],
  [
    "图形与模型资源",
    "Rendering and model resources"
  ],
  [
    "规则基线不需要 API Key 或模型权重。MuJoCo 画面仍需要可用的图形后端；本地 RSI 还需 PyTorch 和对应权重，首次加载可能下载模型。",
    "The rule baseline requires no API key or model weights. MuJoCo frames still require a working graphics backend. Local RSI additionally needs PyTorch and the selected weights, which may download on first load."
  ],
  [
    "先检查工具是否可用",
    "Check the tools first"
  ],
  [
    "2. 安装 Python 后端",
    "2. Install the Python backend"
  ],
  [
    "在尚未创建 .venv 的新环境中执行下面的命令。uv 安装 Python 3.12 并建立仿真环境，bootstrap 再按 constraints-simulation.txt 安装本项目与测试依赖，并按 upstreams.lock.json 获取固定上游代码。它不会在这一阶段训练模型。",
    "Use these commands in a fresh environment without an existing .venv. uv installs Python 3.12 and creates the simulation environment. bootstrap then installs this project and test dependencies using constraints-simulation.txt, and fetches pinned upstream source from upstreams.lock.json. This stage does not train a model."
  ],
  [
    "后端 · 全新环境",
    "Backend · fresh environment"
  ],
  [
    "完成后，.venv 提供 FastAPI、Uvicorn、MuJoCo、NumPy 等依赖，以及 embodied-lab、embodied-rsi、embodied-jev 三个命令。普通基线与远端模型实验不要求把 PyTorch 装入这个环境。已有可用 .venv 时无需重新创建；需要更新后端依赖时只运行 bootstrap 安装命令。",
    "After installation, .venv contains dependencies such as FastAPI, Uvicorn, MuJoCo, and NumPy, plus the embodied-lab, embodied-rsi, and embodied-jev commands. Baseline and remote-model experiments do not require PyTorch in this environment. Keep an existing working .venv; when updating backend dependencies, run only the bootstrap installation command."
  ],
  [
    "检查后端导入与入口",
    "Check backend imports and entry point"
  ],
  [
    "3. 安装并构建 Web UI",
    "3. Install and build the Web UI"
  ],
  [
    "仍在项目根目录执行，而不是进入 frontend 子目录。npm ci 按 package-lock.json 安装前端依赖；npm run build 使用 Vite 构建模型工作台资源。Python 依赖安装成功不会自动完成这一步。",
    "Stay in the project root rather than changing into frontend. npm ci installs frontend dependencies from package-lock.json; npm run build uses Vite to build the model workbench assets. Installing Python dependencies does not automatically perform this step."
  ],
  [
    "Web UI · 安装与构建",
    "Web UI · install and build"
  ],
  [
    "前端分成两个源码区域：frontend 包含 Three.js 模型工作台，由 Vite 输出到 src/embodied_jev/web；src/embodied_rsi/web 包含统一导航、训练台、报告、文档与共享翻译，由 Python 服务直接提供。不要手改 Vite 输出的哈希资源文件。",
    "There are two frontend source areas: frontend contains the Three.js model workbench, built by Vite into src/embodied_jev/web; src/embodied_rsi/web contains unified navigation, training views, reports, documentation, and shared translations, served directly by Python. Do not manually edit the generated hashed Vite assets."
  ],
  [
    "构建后无需单独启动 Node 服务，完整页面由 8092 的 Python 后端提供。修改 frontend 或共享翻译目录后重新运行 npm run build，再刷新浏览器；只修改直接提供的文档 HTML／CSS／JS 通常刷新即可。构建会重写输出目录，应在浏览器测试开始前完成。",
    "After building, no separate Node server is needed: the Python backend on 8092 serves the complete page. Rebuild with npm run build after changing frontend or the shared translation catalog, then refresh the browser. Edits only to directly served documentation HTML/CSS/JS usually need a refresh. A build rewrites the output directory, so finish it before running browser tests."
  ],
  [
    "4. 按需安装本地 RSI 训练环境",
    "4. Add local RSI training when needed"
  ],
  [
    "使用规则基线或远端 API 测试时可跳过本节。需要本地 RSI 推理和自进化训练时，在新的 .venv-rsi 中安装固定上游 RSI-Jev 及其 PyTorch 依赖；它与服务环境分离，以减少两套模型依赖之间的冲突。",
    "Skip this section for rule-baseline or remote-API tests. For local RSI inference and self-evolving training, install the pinned RSI-Jev source and its PyTorch dependencies into a new .venv-rsi. Keeping it separate from the service environment reduces conflicts between model dependency sets."
  ],
  [
    "独立 RSI 环境 · 首次安装",
    "Separate RSI environment · first installation"
  ],
  [
    "已有 .venv-rsi 时保留该环境，只在需要更新依赖时运行第二条命令。统一启动器检测到 .venv-rsi/bin/python 后会选择它运行 RSI 工作进程。安装依赖不等于已经下载或训练出可用 checkpoint，首次选择模型后仍可能需要加载权重。",
    "Keep an existing .venv-rsi and use only the second command when dependencies need updating. The unified launcher detects .venv-rsi/bin/python and selects it for RSI workers. Installing dependencies does not mean a usable checkpoint has already been downloaded or trained; selecting a model may still require loading its weights."
  ],
  [
    "设备由后端选择，也可在启动前设置 EMBODIED_RSI_DEVICE 为 mps、cuda 或 cpu，取值必须与硬件和 PyTorch 支持一致。CPU 可用于功能验证，但训练时间取决于模型、样本量和机器；不把某台机器的耗时当作统一要求。",
    "The backend selects a device, or EMBODIED_RSI_DEVICE can be set to mps, cuda, or cpu before startup, matching hardware and PyTorch support. CPU can be used for functional checks, but training time depends on the model, dataset, and machine; timings from one machine are not universal requirements."
  ],
  [
    "5. 启动统一服务与选择数据目录",
    "5. Start the unified service and choose a data directory"
  ],
  [
    "启动完整工作台",
    "Start the full workbench"
  ],
  [
    "保持该终端运行，在浏览器打开 http://127.0.0.1:8092/simulation。此命令读取 lab-config.json 中的 port 和 artifacts，默认数据路径相对于项目根目录。已经安装好的环境通常只需要这一条启动命令；不需要再启动原来的 8090 服务。",
    "Keep this terminal running and open http://127.0.0.1:8092/simulation in the browser. The command reads port and artifacts from lab-config.json, resolving the configured relative data path from the project root. A prepared environment normally needs only this startup command; the former 8090 service is unnecessary."
  ],
  [
    "希望独立学习或保留正在使用的 8092 实验时，使用新的数据目录与端口。下面的命令适用于已安装 RSI 的环境；只做基线时省略 --rsi-python 及其路径。显式 --artifacts 的相对路径从当前执行目录解析。",
    "To learn independently or preserve an experiment already running on 8092, use a new data directory and port. The command below assumes RSI is installed; omit --rsi-python and its path for baseline-only work. An explicit relative --artifacts path is resolved from the working directory."
  ],
  [
    "独立数据目录与 8093 端口",
    "Separate data directory and port 8093"
  ],
  [
    "隔离工作台地址为 http://127.0.0.1:8093/simulation。全新数据目录没有旧的采集与训练状态；复用已有目录则会读取历史、发布模型和已保存的会话意图。安装或 Python 配置变更需要重启时，先结束或停止现有任务；仅更新网页资源不需要重启训练后端。",
    "The isolated workbench is at http://127.0.0.1:8093/simulation. A fresh data directory has no previous collection or training state; reusing a directory reads its history, released models, and saved session intent. Before restarting for installation or Python configuration changes, finish or stop existing tasks. Updating web assets alone does not require a training-backend restart."
  ],
  [
    "6. 验证安装并配置第一个实验",
    "6. Verify installation and configure a first experiment"
  ],
  [
    "在另一个终端检查服务",
    "Check the service from another terminal"
  ],
  [
    "接口应返回 JSON；随后打开完整工作台，检查模型配置、模型测试、自主训练和文档是否能切换。进入模型测试，选择搬运入盘与规则基线，先单步再运行完整一局；观察动作、接触、结果和日志。该步骤不需要远端 API，也不证明本地 RSI 已完成训练。",
    "The endpoint should return JSON. Then open the full workbench and check navigation between Models, Model Test, Self-Evolving Training, and Doc. In Model Test, choose transfer and the rule baseline, step once, then run a complete episode. Inspect motion, contacts, outcome, and logs. This needs no remote API and does not establish that local RSI has been trained."
  ],
  [
    "需要远端决策时，在模型配置页填写接口类型、Base URL、模型 ID 与 API Key，先做独立输入测试。保存不调用模型；测试或运行会发送实际请求。密钥使用系统凭证存储，不可用时明确标记为仅本次会话。.env.example 是变量说明，服务不会自动读取 .env。",
    "For remote decisions, enter the interface type, Base URL, model ID, and API key in Models, then run an isolated input test. Saving makes no model call; testing or running sends actual requests. Keys use the system credential store, with an explicit session-only state when unavailable. .env.example documents variables; the service does not automatically read .env."
  ],
  [
    "需要自进化训练时，确认本地 checkpoint、推理环境与当前模型信息，再设置动作模式、观测来源、相机和采集／训练阈值。远端 Jev／Chat 用于模型测试与对比，当前训练器不会直接更新远端 API 的权重。",
    "For self-evolving training, confirm the local checkpoint, inference environment, and active model information, then select action mode, observation source, cameras, and collection/training thresholds. Remote Jev/Chat connections serve Model Test and Compare; the current trainer cannot directly update remote API weights."
  ],
  [
    "若 API 可读但模型工具页面空白，先检查 npm run build 是否成功及浏览器资源请求；若物理图像失败，检查图形后端。当前代码在 macOS 默认 CGL、Linux 默认 EGL，也允许显式 MUJOCO_GL；Linux 无界面环境需要与所选渲染方式匹配的系统图形库。端口被占用时改用隔离端口，不要为了验证安装终止已有实验。",
    "If the API responds but model tools are blank, check that npm run build succeeded and inspect browser asset requests. For failed physics rendering, check the graphics backend. Current code defaults to CGL on macOS and EGL on Linux, while honoring an explicit MUJOCO_GL. Headless Linux needs system graphics libraries matching the selected renderer. Use an isolated port when one is occupied instead of stopping an existing experiment to verify installation."
  ],
  [
    "7. 可选：开发 Web UI",
    "7. Optional: develop the Web UI"
  ],
  [
    "正常使用完整工作台只需前面的构建与启动。编辑 frontend 中的模型工作台时，可保持 Python 服务运行，再在另一个终端启动 Vite，获得该前端的开发预览。",
    "For normal use, building and starting the unified workbench is sufficient. While editing the model workbench in frontend, keep Python running and start Vite in another terminal for a development preview."
  ],
  [
    "模型工作台的 Vite 开发预览",
    "Vite development preview for model tools"
  ],
  [
    "访问终端输出的 Vite 地址，通常为 http://127.0.0.1:5173。当前代理将 /api 转发到 8092 的 /workbench；若改了后端端口，也要调整 vite.config.js。这个预览只针对模型工作台，统一导航、训练台和 Doc 仍在 8092 的 /simulation 检查。完成修改后重新构建，再验证统一入口。",
    "Open the Vite URL printed in the terminal, normally http://127.0.0.1:5173. Its current proxy forwards /api to /workbench on 8092; changing the backend port also requires updating vite.config.js. This preview covers model tools only. Check unified navigation, training views, and Doc at /simulation on 8092. Rebuild when finished, then verify the integrated entry point."
  ],
  [
    "业务架构图",
    "Business architecture"
  ],
  [
    "从实验准备进入三条业务路径：单模型验证、多模型对比、本地自进化；结果进入证据与验收，发布只影响后续新局。",
    "Experiment preparation leads to three paths: single-model validation, multi-model comparison, and local self-evolution. Results feed evidence and acceptance; releases affect subsequent episodes."
  ],
  [
    "实验准备",
    "Experiment preparation"
  ],
  [
    "三条实验路径",
    "Three experiment paths"
  ],
  [
    "证据、验收与版本更新",
    "Evidence, acceptance, and version updates"
  ],
  [
    "确定实验目标",
    "Define the experiment"
  ],
  [
    "任务 · 场景 · 成功协议",
    "Task · scene · success protocol"
  ],
  [
    "选择搬运、堆叠或越障任务，确定场景、预算和成功条件。不同成功协议的完成率不能直接比较。",
    "Choose transfer, stack, or barrier, with scene, budget, and success conditions. Completion rates under different success protocols are not directly comparable."
  ],
  [
    "配置模型",
    "Configure models"
  ],
  [
    "本地服务 / 远端 API / checkpoint",
    "Local service / remote API / checkpoint"
  ],
  [
    "模型配置保存连接和具名预设，模型测试可用规则或远端接口；自进化训练选择本地 RSI checkpoint。保存配置本身不调用模型。",
    "Models saves connections and named presets. Model Test can use rules or remote APIs; self-evolving training selects a local RSI checkpoint. Saving a configuration makes no model call."
  ],
  [
    "固定实验条件",
    "Fix experiment conditions"
  ],
  [
    "动作 · 观测 · 相机 · 种子",
    "Actions · observations · cameras · seed"
  ],
  [
    "在目标工作区确认执行配置。页面共享实现，但不会自动继承所有参数或共享同一局机械臂状态。",
    "Confirm execution settings in the target workspace. Pages share implementation but do not automatically inherit every setting or share a single robot episode."
  ],
  [
    "单模型决策与物理验证",
    "Single-model decisions and physics"
  ],
  [
    "逐步观察输入、候选、模型选择、执行结果和失败原因。规则基线用于检查物理与记录链路。",
    "Inspect inputs, candidates, model selections, execution, and failure reasons step by step. The rule baseline checks physics and recording."
  ],
  [
    "同场景 · 顺序运行多个模型",
    "Matching scenes · sequential models"
  ],
  [
    "在约定场景和配置下顺序运行模型，对比完整任务表现、调用数和延迟；不同动作协议需要分别解释。",
    "Run models sequentially under agreed scenes and settings. Compare complete-task outcomes, request counts, and latency, interpreting different action protocols separately."
  ],
  [
    "自进化采集",
    "Self-evolving collection"
  ],
  [
    "本地 RSI · 连续整局 · 探索",
    "Local RSI · episodes · exploration"
  ],
  [
    "每局固定模型版本，按所选动作与观测协议采集轨迹。探索调整采样偏好，本身不更新模型权重。",
    "Pin a model version per episode and collect trajectories under the selected action and observation protocol. Exploration adjusts sampling preferences without itself updating weights."
  ],
  [
    "实时反馈与诊断",
    "Live feedback and diagnosis"
  ],
  [
    "相机 · 决策时间线 · 拒绝原因",
    "Cameras · decision timeline · rejection"
  ],
  [
    "对照实际请求和执行前后状态定位问题。选择了动作、执行了动作和完成了任务是三个不同事件。",
    "Trace actual requests and before/after states. Selecting an action, executing it, and completing a task are three different events."
  ],
  [
    "对比结果与回放",
    "Comparison results and replay"
  ],
  [
    "成功率 · 耗时 · 原始记录",
    "Completion · latency · raw records"
  ],
  [
    "保留每个模型的结果和调用记录，支持回放与导出。一次对比不会自动成为本地训练数据。",
    "Retain each model’s results and request records for replay and export. A comparison does not automatically become local training data."
  ],
  [
    "成功数据驱动训练",
    "Train from successful data"
  ],
  [
    "过滤 → 拟合 → 开发选点 → 评测",
    "Filter → fit → develop → evaluate"
  ],
  [
    "同时达到新增整局与成功局门槛后触发后台作业。筛选兼容的模型自采数据，再拟合候选并进行独立评测。",
    "Trigger a background job after both new-episode and new-success thresholds are met. Filter compatible model-collected data, fit a candidate, and evaluate independently."
  ],
  [
    "实验与训练证据",
    "Experiment and training evidence"
  ],
  [
    "日志 · 数据清单 · 轮次报告",
    "Logs · manifests · round reports"
  ],
  [
    "用运行 ID、整局 ID、模型与场景哈希关联输入、动作、过滤、指标和发布记录。失败与未发布候选也保留证据。",
    "Use run/episode IDs and model/scene hashes to connect inputs, actions, filtering, metrics, and release records. Failures and rejected candidates retain evidence too."
  ],
  [
    "发布验收",
    "Release acceptance"
  ],
  [
    "独立配对提升 · 区间 · 风险",
    "Paired gain · interval · risk"
  ],
  [
    "比较父模型与候选在相同独立场景上的表现，核对提升、置信区间、覆盖与风险门槛。loss 下降不等于通过验收。",
    "Compare parent and candidate on matching independent scenes, checking gain, confidence interval, coverage, and risk gates. A lower loss is not acceptance."
  ],
  [
    "活动模型版本",
    "Active model version"
  ],
  [
    "通过则发布；未通过保留当前模型",
    "Release if accepted; otherwise retain"
  ],
  [
    "通过验收后核验哈希、加载预热并更新注册表。当前局保持固定版本，新局才使用新发布模型；未通过则沿用现有版本。",
    "After acceptance, verify the hash, load and warm the model, then update the registry. In-flight episodes keep their version; new episodes use the release. Rejection retains the current version."
  ],
  [
    "未通过：保留当前版本",
    "Not accepted: retain current version"
  ],
  [
    "下一局",
    "Next episode"
  ],
  [
    "系统架构流程图",
    "System architecture"
  ],
  [
    "一个 8092 服务挂载两组接口；物理世界按会话隔离，RSI 推理和训练可运行在独立进程。箭头区分请求、记录和发布后的加载。",
    "One service on 8092 mounts two API namespaces. Physics worlds are session-specific; RSI inference and training can use separate processes. Arrows distinguish requests, records, and loading after release."
  ],
  [
    "浏览器",
    "Browser"
  ],
  [
    "统一服务进程 · Python / FastAPI",
    "Unified service process · Python / FastAPI"
  ],
  [
    "外部服务与子进程",
    "External services and subprocesses"
  ],
  [
    "持久数据与模型产物",
    "Persistent data and model artifacts"
  ],
  [
    "统一工作台 /simulation",
    "Unified workbench /simulation"
  ],
  [
    "配置与控制 · Three.js / MuJoCo 画面 · 报告与 Doc",
    "Configuration and controls · Three.js / MuJoCo frames · reports and Doc"
  ],
  [
    "浏览器发送控制意图并读取状态；物理计算和训练由后端执行。模型工作台来自 frontend 构建，统一页面来自 embodied_rsi/web。",
    "The browser sends control intent and reads state; physics and training run in the backend. Model tools are built from frontend, while unified pages come from embodied_rsi/web."
  ],
  [
    "统一启动与路由",
    "Unified launcher and routing"
  ],
  [
    "embodied_lab → dashboard.create_app → /workbench 挂载",
    "embodied_lab → dashboard.create_app → /workbench mount"
  ],
  [
    "启动器读取端口、数据目录和 RSI 解释器，创建 FastAPI 应用并挂载模型实验接口；不需要第二个 8090 服务。",
    "The launcher reads port, data directory, and RSI interpreter, creates FastAPI, and mounts the model experiment API. A second service on 8090 is unnecessary."
  ],
  [
    "/workbench/api/ · 配置 / 控制 / 对比",
    "/workbench/api/ · config / control / compare"
  ],
  [
    "模型测试、连接管理和多模型对比使用独立的工作台接口域。读取快照和提交控制是不同操作。",
    "Model Test, connection management, and comparison use the workbench API namespace. Reading snapshots and submitting control are separate operations."
  ],
  [
    "/api/ · 仿真 / 作业 / 日志 / 报告",
    "/api/ · simulation / jobs / logs / reports"
  ],
  [
    "统一控制台接口提供自主训练状态、能力、相机、日志、训练作业与轮次报告。",
    "The dashboard API exposes self-evolving simulation state, capabilities, cameras, logs, training jobs, and round reports."
  ],
  [
    "实验会话与模型适配",
    "Sessions and model adapters"
  ],
  [
    "runtime.Session · comparison · policies",
    "runtime.Session · comparison · policies"
  ],
  [
    "每个实验维护自己的场景、候选和执行记录，通过模型适配器调用本地或远端决策服务。对比实验也有独立会话。",
    "Each experiment maintains its scene, candidates, and execution records, calling local or remote decision services through adapters. Comparisons also have independent sessions."
  ],
  [
    "仿真线程与作业调度",
    "Simulation thread and jobs"
  ],
  [
    "Simulation · AutoTrainer · Jobs",
    "Simulation · AutoTrainer · Jobs"
  ],
  [
    "仿真线程拥有实时物理与渲染；AutoTrainer 检查数据触发条件，Jobs 启动后台训练进程。停止采集和停止后台作业是不同控制。",
    "The simulation thread owns live physics and rendering. AutoTrainer checks data thresholds, and Jobs launches background training processes. Stopping collection and stopping a job are separate controls."
  ],
  [
    "共享物理与感知实现 · 各会话独立世界",
    "Shared physics/perception code · separate session worlds"
  ],
  [
    "MuJoCo · IK · 接触审计 · RGB-D / 图像 · 动作协议",
    "MuJoCo · IK · contact audits · RGB-D / images · action protocols"
  ],
  [
    "共享的是代码与协议，模型测试和自主训练不共享同一个机械臂世界。状态投影决定模型输入，仿真真值仍用于独立结果审计。",
    "Code and protocols are shared; Model Test and Self-Evolving Training do not share one arm world. State projection determines model input, while simulator truth remains available for independent outcome audits."
  ],
  [
    "远端模型 / 本地模型服务",
    "Remote / local model services"
  ],
  [
    "HTTP · Jev / Chat / Claude",
    "HTTP · Jev / Chat / Claude"
  ],
  [
    "模型适配器通过配置的服务请求选择与可用概率。密钥不进入实验导出；远端推理连接不提供当前训练器需要的可训练权重。",
    "Adapters request selections and available probabilities from configured services. Keys are excluded from experiment exports; remote inference connections do not provide weights trainable by the current trainer."
  ],
  [
    "RSI 推理工作进程",
    "RSI inference worker"
  ],
  [
    "独立解释器 · stdin/stdout JSONL",
    "Separate interpreter · stdin/stdout JSONL"
  ],
  [
    "RPCPolicy 在独立 Python 进程中加载 checkpoint，交换 state、criteria 和概率。这样服务环境与 RSI / PyTorch 环境可以分开。",
    "RPCPolicy loads a checkpoint in a separate Python process and exchanges state, criteria, and probabilities, separating the service and RSI/PyTorch environments."
  ],
  [
    "self-improve 后台作业",
    "Background self-improve job"
  ],
  [
    "过滤 · 拟合 · 开发 · 配对评测",
    "Filter · fit · develop · paired evaluation"
  ],
  [
    "作业读取合规轨迹、继承父模型权重、拟合候选并评测。即使浏览器关闭或采集停止，已经启动的作业仍可能继续。",
    "The job reads eligible trajectories, inherits parent weights, fits a candidate, and evaluates it. An accepted job may continue after the browser closes or collection stops."
  ],
  [
    "运行与观测存储",
    "Run and observation storage"
  ],
  [
    "SQLite · JSONL · 相机 / 位姿回放",
    "SQLite · JSONL · camera / pose replay"
  ],
  [
    "记录请求、响应、执行、过滤、训练和评测事件，用 ID 与哈希关联。记录中的审计真值与实际发给模型的观测分开核对。",
    "Record requests, responses, execution, filtering, training, and evaluation events, linked by IDs and hashes. Distinguish audit truth in records from observations actually sent to the model."
  ],
  [
    "活动模型注册表",
    "Active model registry"
  ],
  [
    "验证哈希 · 加载预热 · 原子切换",
    "Verify hash · load/warm · atomic switch"
  ],
  [
    "通过验收才更新活动模型；每局固定版本，后续新局获取最新发布。训练候选和当前推理模型可能不同。",
    "Update the active model only after acceptance. Each episode pins a version, and subsequent episodes acquire the latest release. Training candidates and active inference models may differ."
  ],
  [
    "候选与评测产物",
    "Candidate and evaluation artifacts"
  ],
  [
    "checkpoint · manifest · 评测 / 发布报告",
    "Checkpoint · manifest · evaluation / release report"
  ],
  [
    "保存训练参数、数据来源、父模型哈希、候选权重与评测结果。未通过发布条件的候选仍保留产物和失败原因。",
    "Save training settings, data provenance, parent hash, candidate weights, and evaluation outcomes. Candidates rejected for release retain their artifacts and reasons."
  ],
  [
    "HTTP：控制与状态",
    "HTTP: control and state"
  ],
  [
    "HTTP",
    "HTTP"
  ],
  [
    "JSONL",
    "JSONL"
  ],
  [
    "启动作业",
    "Start job"
  ],
  [
    "事件 / 轨迹",
    "Events / traces"
  ],
  [
    "保存产物",
    "Save artifacts"
  ],
  [
    "验收通过",
    "Accepted"
  ],
  [
    "新局加载",
    "Load for a new episode"
  ],
  [
    "详细数据流程图",
    "Detailed data flow"
  ],
  [
    "上半部分是一局中的实时决策反馈，下半部分是跨局的训练与发布。蓝色虚线保存证据，绿色虚线回到后续决策或新局，橙色分支表示拒绝、排除或未通过。",
    "The upper loop covers live decisions within an episode; the lower loop covers training and release across episodes. Blue dashed lines retain evidence, green dashed lines feed subsequent decisions or episodes, and amber branches show rejection, exclusion, or failed acceptance."
  ],
  [
    "局内：观测 → 决策 → 物理反馈",
    "Within an episode: observe → decide → physical feedback"
  ],
  [
    "跨局：成功回放 → 训练 → 独立评测 → 发布",
    "Across episodes: successful replay → training → independent evaluation → release"
  ],
  [
    "实验配置与模型版本",
    "Experiment and model version"
  ],
  [
    "task · seed · execution · checkpoint",
    "task · seed · execution · checkpoint"
  ],
  [
    "读取任务、种子、执行配置与当前 checkpoint，保留成功协议和模型哈希。远端模型实验和本地训练路径要分别标记来源。",
    "Read task, seed, execution settings, and checkpoint, preserving the success protocol and model hash. Remote experiments and local training paths require distinct provenance."
  ],
  [
    "初始化并固定本局版本",
    "Initialize and pin the episode"
  ],
  [
    "scene_hash · episode_id · model SHA256",
    "scene_hash · episode_id · model SHA256"
  ],
  [
    "生成场景并在整局固定模型版本，防止中途部署改变本局策略。场景种子之外还需记录真实场景配置和哈希。",
    "Generate the scene and pin the model for the whole episode so deployment cannot change the policy mid-episode. Record actual scene settings and hash as well as the seed."
  ],
  [
    "感知采样",
    "Sample observations"
  ],
  [
    "真值 / RGB-D / 支持的图像路径",
    "State / RGB-D / supported image path"
  ],
  [
    "按协议采样本体、接触与相机。RGB-D 先检测与估计坐标，直接图像仅在支持的模型测试路径可用；当前本地 RSI 不接受直接图像。",
    "Sample proprioception, contacts, and cameras by protocol. RGB-D detects and estimates coordinates first. Direct images are available only on supported Model Test paths, not current local RSI."
  ],
  [
    "构造模型可见状态",
    "Project the model-visible state"
  ],
  [
    "state · recent_outcomes · 图像载荷",
    "state · recent_outcomes · image payload"
  ],
  [
    "仅把当前协议允许的信息放入请求。RGB-D 决策使用检测坐标，审计真值另存；旧技能路径与 XYZ 的输入信息范围不同。",
    "Include only information allowed by the protocol. RGB-D decisions use detected positions and store audit truth separately. Legacy skills and XYZ expose different input information."
  ],
  [
    "组织候选与指令",
    "Build candidates and instructions"
  ],
  [
    "criteria · 候选顺序 · 动作协议",
    "criteria · candidate order · action protocol"
  ],
  [
    "预设技能提供任务级候选，逐步 XYZ 提供离散移动，分层 XYZ 拆成子目标与四个通道。候选说明与顺序也属于模型输入。",
    "Skills supply task-level candidates; incremental XYZ supplies discrete moves; hierarchical XYZ separates subgoal and four channels. Candidate descriptions and order are part of the model input."
  ],
  [
    "模型请求与回答",
    "Request and model response"
  ],
  [
    "choice · probabilities? · latency",
    "choice · probabilities? · latency"
  ],
  [
    "适配器记录实际请求、选择和耗时。有原生候选概率时保留；Chat 没有这种概率时不虚构，分层通道分别记录。",
    "Adapters record the actual request, selection, and latency. Preserve native candidate probabilities where available; do not fabricate them for Chat. Record hierarchical channels separately."
  ],
  [
    "回答校验与选择",
    "Validate and select"
  ],
  [
    "ID / 概率合法性 · argmax / 探索",
    "ID / probability validity · argmax / exploration"
  ],
  [
    "校验候选 ID 和概率协议，RSI 按评测或探索模式选择。非法回答不能伪装为执行成功；可用概率低于门槛时可按人工介入设置暂停。",
    "Validate candidate IDs and the probability contract, then select by RSI evaluation or exploration mode. Invalid replies cannot become successful execution; low available probabilities may pause according to intervention settings."
  ],
  [
    "预演与物理执行",
    "Preview and physical execution"
  ],
  [
    "TCP / 夹爪 → IK → MuJoCo",
    "TCP / gripper → IK → MuJoCo"
  ],
  [
    "执行适用的边界、IK 和接触检查，再推进物理。动作可能被拒绝；记录 executed 与 rejection，并保留实际结果，不替换成模型期望结果。",
    "Apply the relevant bounds, IK, and contact checks, then advance physics. Actions can be rejected. Record executed and rejection along with actual outcomes, not intended outcomes."
  ],
  [
    "新观测与物理审计",
    "New observation and audit"
  ],
  [
    "observed_after · after · success",
    "observed_after · after · success"
  ],
  [
    "分别记录模型可见反馈和用于结果审计的仿真状态。仍有预算且未终止时回到感知；成功、失败或停止则结束整局。",
    "Record model-visible feedback separately from simulator state used for auditing. Return to observation while budget remains and no terminal condition holds; success, failure, or stopping ends the episode."
  ],
  [
    "拒绝、失败与排除记录",
    "Rejections, failures, and exclusions"
  ],
  [
    "诊断 / 探索记忆 · 不冒充成功样本",
    "Diagnosis / exploration · no false successes"
  ],
  [
    "非法输出、动作拒绝、感知失败和轨迹过滤各保留原因。暂停可人工恢复；失败或不合规数据不会作为当前成功回放目标进入拟合。",
    "Keep reasons for invalid output, rejected actions, perception failure, and filtering. A pause may be resumed by a person; failed or ineligible data cannot enter fitting as successful replay targets."
  ],
  [
    "持久整局与事件",
    "Persist episodes and events"
  ],
  [
    "SQLite · episodes.jsonl · 捕获哈希",
    "SQLite · episodes.jsonl · capture hashes"
  ],
  [
    "以运行和整局标识串联观测、请求、回答、执行与终止结果。采集数据是否可训练仍需后续筛选，不能只看文件存在。",
    "Link observations, requests, replies, execution, and termination by run and episode IDs. Collected data still requires eligibility checks; a file’s existence does not make it trainable."
  ],
  [
    "整局终止与结果",
    "Episode termination and outcome"
  ],
  [
    "success · failure_reason · protocol",
    "success · failure_reason · protocol"
  ],
  [
    "依据当前成功协议和动作预算给整局结论。严格抓取协议审计抓取、抬升、夹持搬运、释放、无掉落与稳定放置。",
    "Conclude the episode using its success protocol and action budget. Strict grasping audits grasp, lift, held transport, release, no drop, and stable placement."
  ],
  [
    "自动训练触发条件",
    "Automatic training trigger"
  ],
  [
    "新增整局 + 新增成功局 + 空闲作业",
    "New episodes + new successes + idle job"
  ],
  [
    "同时达到新增数据门槛且后台可用才触发训练；处理水位防止同一批数据重复触发。未达标时继续等待采集。",
    "Trigger only after new-data thresholds are met and background capacity is available. A processing watermark prevents repeated triggers on the same batch; otherwise wait for more collection."
  ],
  [
    "成功轨迹与动作筛选",
    "Filter trajectories and actions"
  ],
  [
    "来源 · 去重 · 协议 · 执行审计",
    "Provenance · dedupe · protocol · audit"
  ],
  [
    "只保留兼容协议的模型自采成功整局，排除失败、重复、教师、仅评测与不合规动作；分层决策保留各通道标签。",
    "Retain model-collected successful episodes with compatible protocols. Exclude failures, duplicates, teacher/evaluation-only data, and ineligible actions; preserve separate hierarchical channel labels."
  ],
  [
    "训练样本与数据清单",
    "Training examples and manifest"
  ],
  [
    "state · criteria · target · SHA256",
    "state · criteria · target · SHA256"
  ],
  [
    "把通过过滤的真实选择变成回放目标，保存来源、配置与数据哈希。不同动作、观测或成功协议的数据不混合。",
    "Turn accepted actual selections into replay targets and save provenance, settings, and data hashes. Do not mix incompatible action, observation, or success protocols."
  ],
  [
    "继承父模型并拟合",
    "Inherit parent weights and fit"
  ],
  [
    "冻结编码塔 · 更新 scorer · 新优化器",
    "Frozen encoders · scorer updates · new optimizer"
  ],
  [
    "默认 self-improve 缓存冻结编码特征，用成功动作回放交叉熵更新决策头。每轮重新创建优化器，并记录真实 loss 与参数变化。",
    "Default self-improve caches frozen features and updates the scorer with successful-action replay cross-entropy. Each round creates a fresh optimizer and records actual loss and parameter changes."
  ],
  [
    "开发场景选择检查点",
    "Select a checkpoint on development scenes"
  ],
  [
    "完整任务表现 → 候选 checkpoint",
    "Complete-task outcomes → candidate checkpoint"
  ],
  [
    "开发场景用于从本轮更新中选择候选。选择依据是实际完整任务表现；更低训练 loss 不自动代表更好候选。",
    "Development scenes select a candidate from the round’s updates using complete-task outcomes. Lower training loss does not automatically make a better candidate."
  ],
  [
    "同新场景：父模型 ↔ 候选",
    "Same new scenes: parent ↔ candidate"
  ],
  [
    "用未参与训练和开发选点的独立场景，配对运行父模型与候选，计算提升区间、任务覆盖和风险指标。",
    "Use independent scenes excluded from training and development selection. Run parent and candidate in pairs to measure improvement intervals, task coverage, and risk."
  ],
  [
    "发布门槛判断",
    "Check release gates"
  ],
  [
    "样本数 · 提升 · 区间 · 退步 / 风险",
    "Sample size · gain · interval · regression / risk"
  ],
  [
    "按本次评测配置逐项验收。通过和未通过都保留报告；系统不会为了展示收敛而强制发布候选。",
    "Check every gate against this evaluation’s configuration. Preserve reports whether accepted or rejected; the system does not force a release to make a curve look convergent."
  ],
  [
    "核验与原子部署",
    "Verify and deploy atomically"
  ],
  [
    "哈希 → 加载 → 预热 → 注册表",
    "Hash → load → warm → registry"
  ],
  [
    "确认 checkpoint 字节与哈希，实际加载并预热，成功后在锁内原子更新活动注册表。部署失败保留原因与现有版本。",
    "Verify checkpoint bytes and hash, actually load and warm the model, then atomically update the active registry under a lock. Deployment failure preserves the reason and current version."
  ],
  [
    "下一局使用新版本",
    "Use the release next episode"
  ],
  [
    "发布 ID · checkpoint · 本局版本固定",
    "Release ID · checkpoint · pinned episode"
  ],
  [
    "发布后只影响后续新局。当前局继续使用固定 checkpoint，日志与报告可以核对模型切换确实发生在哪一局。",
    "A release affects subsequent episodes only. The current episode keeps its checkpoint, and logs/reports identify the episode where the version actually changed."
  ],
  [
    "保留父模型并继续采集",
    "Retain parent and continue collecting"
  ],
  [
    "保存未发布候选与失败证据",
    "Keep rejected candidate and evidence"
  ],
  [
    "未通过门槛时保持当前发布模型，保存候选和评测记录。可以继续采集更多成功数据，再开始下一轮训练。",
    "When gates fail, retain the current released model and keep candidate/evaluation records. Further successful collection can supply another training round."
  ],
  [
    "有效",
    "Valid"
  ],
  [
    "错误 / 暂停",
    "Error / pause"
  ],
  [
    "继续下一步",
    "Next step"
  ],
  [
    "局结束",
    "Episode ends"
  ],
  [
    "接纳",
    "Admit"
  ],
  [
    "排除",
    "Exclude"
  ],
  [
    "下一局加载新 checkpoint",
    "Load the new checkpoint next episode"
  ],
  [
    "现在的工作台融合了两部分代码：",
    "The workbench combines two codebases:"
  ],
  [
    "提供模型接口、感知、动作协议和物理实验；",
    "provides model adapters, perception, action protocols, and physical experiments;"
  ],
  [
    "提供轨迹采集、数据筛选、拟合训练、独立评测与部署。embodied_lab 是统一启动入口。保留 Python 包名便于区分职责与兼容历史记录，运行时只需要一个 8092 服务。",
    "provides trajectory collection, data filtering, fitting, independent evaluation, and deployment. embodied_lab is the unified launcher. The Python package names preserve clear responsibilities and compatibility with historical records; the integrated workbench needs only one service on port 8092."
  ],
  [
    "架构与流程图",
    "Architecture diagrams"
  ],
  [
    "从业务、系统到数据的三张图",
    "Three views: business, system, and data"
  ],
  [
    "先从业务架构理解各工作区的关系，再用系统架构定位接口、进程与存储，最后沿数据流程追踪一次决策如何进入训练和发布。点击节点查看说明与源码位置；可放大、滚动或展开图表。",
    "Start with business architecture to understand the workspaces, use system architecture to locate APIs, processes, and storage, then follow the data flow from decisions to training and release. Select a node for its explanation and source files; zoom, scroll, or expand the diagram."
  ],
  [
    "架构图类型",
    "Architecture diagram views"
  ],
  [
    "图表缩放",
    "Diagram zoom"
  ],
  [
    "缩小图表",
    "Zoom out"
  ],
  [
    "放大图表",
    "Zoom in"
  ],
  [
    "适应宽度",
    "Fit width"
  ],
  [
    "原始尺寸",
    "Actual size"
  ],
  [
    "展开图表",
    "Expand diagram"
  ],
  [
    "收起图表",
    "Collapse diagram"
  ],
  [
    "图表画布，可滚动查看",
    "Diagram canvas; scroll to explore"
  ],
  [
    "图例",
    "Legend"
  ],
  [
    "主流程",
    "Main flow"
  ],
  [
    "记录与产物",
    "Records and artifacts"
  ],
  [
    "反馈 / 新局",
    "Feedback / new episode"
  ],
  [
    "拒绝 / 未通过",
    "Rejected / not accepted"
  ],
  [
    "点击节点查看说明；放大后可滚动查看。",
    "Select a node for details; scroll to explore when zoomed in."
  ],
  [
    "当前节点",
    "Selected node"
  ],
  [
    "对应源码",
    "Source files"
  ],
  [
    "Embodied Lab 是一个机械臂决策与学习实验台。",
    "Embodied Lab is a robot decision and learning workbench."
  ],
  [
    " 模型根据环境选择动作，MuJoCo 验证物理结果，成功经验用于训练下一版模型。主任务是用 Franka Panda 抓取方块并放入目标盘。",
    " A model chooses actions, MuJoCo verifies physical outcomes, and successful experience trains the next version. The main task is to pick up a cube with a Franka Panda arm and place it in a tray."
  ],
  [
    "选择动作、执行动作、完成任务是三件事。",
    "Choosing an action, executing it, and completing a task are different events."
  ],
  [
    " 闭爪可能空抓，搬运可能失抓，到达目标也可能尚未稳定。系统分别记录模型选择、实际执行和最终结果，让成败可追溯。",
    " Fingers can close on empty space, a grasp can fail, and an object at the target can still be unstable. Separate records make each outcome traceable."
  ],
  [
    "固定场景、动作与观测，检查模型是否依据真实反馈行动；同时记录程序提供的技能与几何辅助。",
    "Fix scenes, actions, and observations; check whether the model responds to actual feedback. Record the skills and geometry supplied by the program."
  ],
  [
    "把完整成功局中的真实决策转成训练样本。",
    "Turn real decisions from successful episodes into training examples. "
  ],
  [
    "探索改变采样，训练更新权重。",
    "Exploration changes sampling; training updates weights."
  ],
  [
    "在相同新场景上比较父模型与候选，检查提升、置信区间与风险；训练 loss 不能单独决定发布。",
    "Compare parent and candidate on matching new scenes, checking gain, confidence intervals, and risk. Training loss alone cannot determine a release."
  ],
  [
    "研究范围：受约束的桌面仿真。",
    "Scope: constrained tabletop simulation."
  ],
  [
    " 任务、候选动作与部分几何知识由程序定义；当前不控制真实机器人，仿真成绩也不能直接外推到真实硬件或开放任务。",
    " The program defines tasks, candidates, and some geometry. The workbench does not control physical robots; simulation results do not establish hardware or open-task performance."
  ],
  [
    "两个闭环，共用一条证据链。",
    "Two loops share one evidence trail."
  ],
  [
    " 局内循环负责观察、决策与执行；跨局循环负责筛选、训练、评测与发布。浏览器展示过程，后端执行并保存记录。",
    " The episode loop observes, decides, and executes. The learning loop filters, trains, evaluates, and releases. The browser presents the process; the backend executes and records it."
  ],
  [
    "实验条件 = 模型 + 任务 + 场景 + 执行配置。",
    "An experiment = model + task + scene + execution settings."
  ],
  [
    " 配置包括种子、动作、观测、相机与预算。输出包括物理结果、回放、请求记录和指标；进入训练闭环才会生成新权重。",
    " Settings include seed, actions, observations, cameras, and budget. Outputs include outcomes, replay, requests, and metrics; new weights require the training loop."
  ],
  [
    "任务 ID 决定成功条件。",
    "The task ID selects the success conditions."
  ],
  [
    " 新的文字指令不会自动改写场景或评分规则；新增任务需同步实现环境、动作协议和评价。",
    " A new text instruction does not rewrite scenes or scoring. New tasks need environment, action-protocol, and evaluation changes."
  ],
  [
    "共享代码，不共享同一局实验。",
    "The code is shared; episodes are separate."
  ],
  [
    " 测试、对比与训练各自管理会话；切换页面后需确认当前模型和参数。远端推理连接不会自动成为可训练模型。",
    " Testing, comparison, and training manage their own sessions. Confirm model and settings after switching workspaces. A remote inference connection is not automatically trainable."
  ],
  [
    "依据物体、夹爪与接触反馈选择下一步；失败结果进入后续观测。",
    "Choose the next step from object, gripper, and contact feedback; failures inform later observations. "
  ],
  [
    "每局固定模型版本",
    "Each episode pins its model version"
  ],
  [
    "，探索只调整采样。",
    "; exploration only adjusts sampling."
  ],
  [
    "成功整局形成回放样本，训练器更新决策头。开发集选出候选，独立场景决定是否发布；",
    "Successful episodes supply replay examples for the decision head. Development evaluation selects a candidate; independent evaluation decides release. "
  ],
  [
    "新版本从下一局生效。",
    "New versions take effect from the next episode."
  ],
  [
    "默认方法：按物理结果筛选的自模仿学习。",
    "Default method: outcome-filtered self-imitation."
  ],
  [
    " 成功轨迹提供动作标签，失败轨迹支持诊断与探索；失败本身不直接触发梯度更新。独立策略梯度实验使用另一套目标。",
    " Successful trajectories supply action labels; failures support diagnosis and exploration, rather than directly triggering gradients. Separate policy-gradient experiments use a different objective."
  ],
  [
    "示例，不是新测得的成绩。",
    "An illustration, not a new measured result."
  ],
  [
    " 固定种子、技能模式与仿真真值后，一局通常经历接近、抓取、抬升、搬运、释放和撤离；实际顺序取决于协议与反馈。",
    " With a fixed seed, skills, and simulator state, an episode typically approaches, grasps, lifts, carries, releases, and withdraws. Protocol and feedback determine the actual sequence."
  ],
  [
    "核对物体、TCP、夹爪、接触和候选。",
    "Inspect object, TCP, gripper, contacts, and candidates. "
  ],
  [
    "中央视图不等于模型输入。",
    "The central view is not the model input."
  ],
  [
    "闭爪不等于抓住。",
    "Closing is not grasping."
  ],
  [
    " 检查双指接触与夹持状态，再决定下一步。",
    " Check two-finger contact and held state before the next step."
  ],
  [
    "按当前协议判定整局成功；局部动作正确，不会让失败整局成为成功训练数据。",
    "Judge whole-episode success under its protocol. A correct intermediate action does not make a failed episode successful training data."
  ],
  [
    "轨迹通过过滤才进入训练；候选通过评测才发布。对照下一局的 checkpoint 哈希确认切换。",
    "Filtering admits trajectories to training; evaluation admits candidates to release. Confirm the switch using the next episode’s checkpoint hash."
  ],
  [
    "先找运行 ID 与整局 ID。",
    "Start with run and episode IDs."
  ],
  [
    " 再核对模型／场景哈希、执行配置、成功协议、请求、动作结果与终止原因。训练还需数据清单、父模型、训练参数和独立评测记录。",
    " Check model/scene hashes, execution settings, success protocol, requests, outcomes, and termination. Training also needs data manifests, parent weights, settings, and independent evaluation records."
  ],
  [
    "阅读顺序：一个决策 → 一局任务 → 一轮训练。",
    "Read one decision → one episode → one training round."
  ],
  [
    " 先解释选择、执行和后果，再把曲线对应到数据与模型版本。",
    " Explain the choice, execution, and outcome first, then connect charts to data and model versions."
  ],
  [
    "抓取、夹持搬运、释放并撤离；严格协议还检查抬升、掉落和稳定放置。",
    "Grasp, carry while held, release, and withdraw. Strict protocols also check lift, drops, and stable placement."
  ],
  [
    "放到另一方块上；目标高度与支撑面不同。",
    "Place on another cube, with a different target height and support surface."
  ],
  [
    "避开障碍物，同时保持夹持；终点相似，路径要求可能不同。",
    "Avoid the obstacle while maintaining the grasp. Similar endpoints can require different paths."
  ],
  [
    "根据观测从候选中选择。规则、本地或远端模型均可决策；当前权重更新仅适配本地 RSI。",
    "Chooses candidates from observations. Rules, local models, and remote models can decide; current weight updates support local RSI."
  ],
  [
    "候选是程序定义的选项，决策是模型的回答；顺序、说明与状态共同组成输入。",
    "Candidates are program-defined options; a decision is the model’s answer. Order, descriptions, and state define the input."
  ],
  [
    "动作步是一次可能执行或被拒绝的尝试。整局从初始化到终止，包含多步；一步也可能有多次决策。",
    "A step is an attempt that can execute or be rejected. An episode runs from initialization to termination and contains many steps; one step can involve multiple decisions."
  ],
  [
    "运行 ID 关联配置、事件与产物。一轮训练包括取数、拟合、开发选点和独立评测。",
    "A run ID links settings, events, and artifacts. A training round selects data, fits, selects a checkpoint, and evaluates independently."
  ],
  [
    "检查点保存权重和元数据；发布版本是通过验收、供后续推理使用的检查点。",
    "A checkpoint stores weights and metadata. A release is an accepted checkpoint for subsequent inference."
  ],
  [
    "保存连接与预设，用决策探针检查接口。保存不调用模型，也不训练。",
    "Save connections and presets; check the interface with a decision probe. Saving neither calls nor trains a model."
  ],
  [
    "运行一个模型或基线，查看真实输入、选择、执行和失败原因。",
    "Run one model or baseline; inspect actual inputs, choices, execution, and failures."
  ],
  [
    "固定场景、动作、观测与预算，顺序比较模型的整局结果、调用数和耗时。",
    "Fix scenes, actions, observations, and budget, then compare whole-episode outcomes, request counts, and duration sequentially."
  ],
  [
    "本地 RSI 连续采集，达标后过滤、拟合、评测与发布。右侧看过程，下方看完整报告。",
    "Collect with local RSI; once thresholds are met, filter, fit, evaluate, and release. Follow progress on the right and full reports below."
  ],
  [
    "当前场景、预算与探索策略下的成功比例，不等同于独立评测成绩。",
    "Success under current scenes, budget, and exploration; not the independent evaluation score."
  ],
  [
    "对成功动作标签的拟合误差；下降不保证多步任务完成率提升。",
    "Fit error on successful action labels. Lower loss does not guarantee better multi-step completion."
  ],
  [
    "同一批独立场景中，候选与父模型的完成率差。结合样本数、置信区间和退步情况阅读；40% → 50% 是提升 10 个百分点。",
    "Candidate minus parent completion rate on matching independent scenes. Read with sample size, confidence interval, and regressions. 40% → 50% is a gain of 10 percentage points."
  ],
  [
    "请求等待、调用数、物理和渲染分别计时。分层一步可能有多个请求，单次 API 延迟不能代表整局效率。",
    "Request latency, request count, physics, and rendering are separate costs. One hierarchical step can need several requests; API latency alone does not measure episode efficiency."
  ],
  [
    "当前输入与候选下的选择分布，不是任务成功概率。改动提示、候选或动作模式后不宜直接比较。",
    "The choice distribution for this input and candidate set, not task success probability. Changed prompts, candidates, or modes limit direct comparison."
  ],
  [
    "模型选择动作，程序约束执行，物理环境判定结果。",
    "The model chooses, the program constrains execution, and physics determines the outcome."
  ],
  [
    " 按这三个职责阅读架构，再追踪证据如何进入训练与发布。",
    " Follow these responsibilities, then trace the evidence into training and release."
  ],
  [
    "业务图看关系，系统图看分工，数据图看流转。",
    "Business shows relationships, system shows responsibilities, data shows flow."
  ],
  [
    " 点击节点查看说明和源码；支持放大、滚动与展开。",
    " Select nodes for explanations and source files. Zoom, scroll, or expand to explore."
  ],
  [
    "一个服务，多组会话。",
    "One service, multiple sessions."
  ],
  [
    " 启动器读取 lab-config.json，创建控制台并挂载 /workbench。两部分复用物理代码，但各自维护场景、步骤和状态。",
    " The launcher reads lab-config.json, creates the dashboard, and mounts /workbench. The components reuse physics code but maintain separate scenes, steps, and state."
  ],
  [
    "物理、推理、训练分别调度。",
    "Physics, inference, and training are scheduled separately."
  ],
  [
    " 仿真线程推进与渲染；RSI 子进程通过 JSON 行交换状态、候选和概率；self-improve 作业独立执行训练与评测。",
    " The simulation thread steps and renders; an RSI subprocess exchanges state, candidates, and probabilities as JSON lines; self-improve runs training and evaluation as a separate job."
  ],
  [
    "关闭页面不会停止后台。",
    "Closing the page does not stop backend work."
  ],
  [
    " 暂停、停止采集和停止训练各有作用域。重新打开时以服务状态为准；加载 checkpoint 也不等于恢复全部优化器状态。",
    " Pause, stop collection, and stop training have different scopes. Read service state on reopening; loading a checkpoint does not restore every optimizer state."
  ],
  [
    "读取当前状态或相机。真值直接投影，RGB-D 先检测，图像模式发送像素；审计数据与模型输入分开。",
    "Read state or cameras. Project simulator state, detect from RGB-D, or send image pixels. Keep audit data separate from model input."
  ],
  [
    "按协议组织候选 ID、说明和近期结果。是否预先过滤或预演，取决于动作模式。",
    "Build candidate IDs, descriptions, and recent outcomes. Action mode determines filtering and preview before selection."
  ],
  [
    "发送状态、指令与候选，记录顺序、回答和耗时。只有支持图像的路径才发送图片。",
    "Send state, instructions, and candidates; record order, response, and latency. Send images only on supported paths."
  ],
  [
    "验证 ID 与概率。RSI 评测通常取最大值，探索可采样；保留原始概率和调整后的分布。",
    "Validate IDs and probabilities. RSI evaluation normally uses argmax; exploration may sample. Preserve raw and adjusted distributions."
  ],
  [
    "转换为 TCP 与夹爪命令，检查边界、IK 和接触，再执行。",
    "Convert to TCP and gripper commands, check bounds, IK, and contacts, then execute. "
  ],
  [
    "选中不等于执行。",
    "Selection is not execution."
  ],
  [
    "记录新的位姿、夹持、释放和终止原因，继续决策或结束整局。训练资格在整局结束后判断。",
    "Record new poses, grasp/release state, and termination. Continue deciding or end the episode; judge training eligibility afterward."
  ],
  [
    "先定位失败发生在哪一层。",
    "Locate the layer where failure occurred."
  ],
  [
    " 非法回答、执行拒绝、感知失效、碰撞和预算耗尽各有原因，不能只看最终“失败”标签。",
    " Invalid replies, rejected execution, perception loss, collision, and exhausted budgets have distinct causes beyond the final “failed” label."
  ],
  [
    "模型选操作，程序给路径。",
    "The model chooses an operation; the program supplies its path."
  ],
  [
    " 候选包括接近、抓取、抬升、搬运、释放等技能，带目标位置、夹爪命令和时长。几何路径与成功规则由代码定义。",
    " Skills such as approach, grasp, lift, carry, and release include target position, gripper command, and duration. Code defines geometry and success rules."
  ],
  [
    "模型测试通常先选阶段，再选动作，可使用候选预演信息；RSI 根据当前阶段组织技能菜单。比较完成率时需同时核对阶段约束和候选构造。",
    "Model Test normally selects a phase, then an action, and may use preview information. RSI builds a skill menu for the current stage. Compare completion rates together with stage constraints and candidate construction."
  ],
  [
    "21 个离散命令：18 个移动 + 张开、闭合、保持。",
    "21 commands: 18 translations plus open, close, and hold."
  ],
  [
    " 三轴正负方向各有 40、10、2 毫米三档。模型逐步对齐并纠错，候选不按预测进展排名。",
    " Each axis has positive/negative moves at 40, 10, and 2 mm. The model aligns and corrects step by step; candidates are not ranked by predicted progress."
  ],
  [
    "越界命令不裁剪。模型测试可展示被拒候选；RSI 请求只包含允许执行的项，所以一次请求不一定有 21 项。",
    "Out-of-bounds moves are not clipped. Model Test may show rejected candidates; RSI requests contain admitted options only, so a request need not have all 21 commands."
  ],
  [
    "先选子目标，再选 X／Y／Z 与夹爪。",
    "Choose a subgoal, then X/Y/Z and gripper commands."
  ],
  [
    " 模型决定方向和开合，程序根据相对误差给出每轴 2–12 毫米步长，保留所选方向。",
    " The model selects directions and finger action; the program derives 2–12 mm per-axis magnitudes from relative error while preserving those choices."
  ],
  [
    "RSI 分别记录子目标和四个通道；模型测试可把通道问题合并请求。",
    "RSI records the subgoal and four channels separately; Model Test may batch channel questions. "
  ],
  [
    "调用数、决策数、物理步数不同",
    "Requests, decisions, and physical steps are different counts"
  ],
  [
    "，通道概率也不能相乘为成功率。",
    ", and multiplying channel probabilities does not yield success probability."
  ],
  [
    "固定动作模式，再比较模型。",
    "Fix the action mode before comparing models."
  ],
  [
    " 技能、XYZ 与分层模式提供的程序辅助不同；它们都使用预定义控制器，不直接生成关节力矩或任意代码。",
    " Skills, XYZ, and hierarchy provide different program assistance. All use predefined controllers rather than direct joint torques or arbitrary code."
  ],
  [
    "RGB-D 是已知场景中的几何检测。",
    "RGB-D estimates geometry in a known scene."
  ],
  [
    " 它使用颜色、深度、标定和尺寸先验；短时遮挡可跟踪，必要目标持续不可见则报错，不回退到真值。",
    " It uses colors, depth, calibration, and size priors. Brief occlusion may be tracked; persistent loss of a required target fails without falling back to ground truth."
  ],
  [
    "启用相机不等于把图像交给模型。",
    "Enabling a camera does not imply sending images to the model."
  ],
  [
    " 相机在决策／动作边界采样，实际发送内容取决于观测协议。中央三维视图用于调试，模型输入以捕获记录和请求为准。",
    " Sampling occurs at decision/action boundaries; the observation protocol determines the payload. The central 3D view is for debugging; captures and requests establish model input."
  ],
  [
    "RSI 与逐步 XYZ 使用状态投影；旧模型测试技能路径可包含当前成功状态、场景和预演信息。",
    "RSI and incremental XYZ project state; legacy Model Test skills may include current success, scene, and preview information. "
  ],
  [
    "以实际请求为准",
    "Use the actual request as evidence"
  ],
  [
    "，核对 state、criteria 与图像载荷。",
    ": inspect state, criteria, and image payloads."
  ],
  [
    "审计真值与模型观测分开。",
    "Audit truth and model observations are separate."
  ],
  [
    " before／after 用于核验物理结果，observed_before／observed_after 记录观测。日志出现真值，不代表它进入了模型请求。",
    " before/after verify physics; observed_before/observed_after record observations. Ground truth in a log does not establish its presence in a request."
  ],
  [
    "适配器把回答变成可校验的选择。",
    "Adapters turn responses into validated choices."
  ],
  [
    " 请求包含状态、指令与候选；返回值需校验 ID、字段和概率。更换提示、候选或接口格式，就可能改变实验条件。",
    " Requests contain state, instructions, and candidates; replies require ID, field, and probability checks. Changing prompts, candidates, or formats can change the experiment."
  ],
  [
    "候选概率是选择偏好，不是任务成功率。",
    "Candidate probability measures choice preference, not task success."
  ],
  [
    " 高概率仍可能不可达或执行失败。界面解释来自公开回答与运行证据，不是模型未公开的内部思考。",
    " A high-probability action can still be unreachable or fail. UI explanations use public responses and runtime evidence, not undisclosed internal reasoning."
  ],
  [
    "人工介入只控制低概率暂停。",
    "Human intervention controls low-probability pauses only."
  ],
  [
    " 接口须提供相应候选概率；关闭开关不关闭执行检查。非法输出、感知失效和碰撞仍按各自规则处理。",
    " The interface must supply candidate probabilities. Turning it off leaves execution checks active; invalid output, perception loss, and collisions retain their own handling."
  ],
  [
    "TCP 是末端控制点，IK 把目标位置转成关节姿态。",
    "TCP is the tool center point; IK converts its target into a joint pose."
  ],
  [
    " 控制器用平滑插值推进 MuJoCo。物理步长为 0.002 秒，即每模拟秒 500 步，不等于模型请求频率或墙钟速度。",
    " The controller advances MuJoCo with smooth interpolation. A 0.002 s timestep means 500 physics steps per simulated second, not model request frequency or wall-clock speed."
  ],
  [
    "检查数值、边界、IK 误差与指定接触。RSI 先克隆预演再执行，模型测试按配置检查。",
    "Check values, bounds, IK error, and specified contacts. RSI previews in a clone before execution; Model Test follows its settings. "
  ],
  [
    "检查覆盖范围由代码定义",
    "Code defines the check coverage"
  ],
  [
    "，通过预演不构成真实硬件的完整安全证明。",
    "; passing a preview is not a complete hardware safety proof."
  ],
  [
    "成绩必须连同协议比较。",
    "Compare scores together with their protocols."
  ],
  [
    " 旧 checkpoint 会恢复绑定的 episode_protocol；复现时核对成功条件、动作、观测与场景分布。",
    " Older checkpoints restore their episode_protocol. Reproduction must check success conditions, actions, observations, and scene distribution."
  ],
  [
    "训练需要完整决策证据。",
    "Training needs complete decision evidence."
  ],
  [
    " 保留状态、候选、原始概率、探索策略、选择、执行与审计；分层模式分别保存子目标和各通道标签。",
    " Retain state, candidates, raw probabilities, exploration, choice, execution, and audit. Hierarchical mode stores subgoal and channel labels separately."
  ],
  [
    "先达阈值，再筛选。",
    "Meet thresholds, then filter."
  ],
  [
    " 新增整局与成功局同时达标才触发；排除失败、重复、仅评测和来源不合规的数据，再审计动作。执行与成功协议随数据保存。",
    " Both new episodes and new successes must qualify. Exclude failures, duplicates, evaluation-only and ineligible sources, then audit actions. Preserve execution and success protocols with the data."
  ],
  [
    "冻结编码塔，只训练 scorer。",
    "Freeze the encoders; train the scorer only."
  ],
  [
    " 每轮继承父权重、新建优化器；开发集选 checkpoint，独立配对评测决定是否发布。",
    " Each round inherits parent weights and creates a new optimizer. Development selects a checkpoint; independent paired evaluation decides release."
  ],
  [
    "发布前核验，下一局切换。",
    "Verify before release; switch next episode."
  ],
  [
    " 核对哈希、加载预热后原子更新注册表。采集模型、训练候选与发布模型可能不同，应分别查看。",
    " Check the hash, load and warm, then atomically update the registry. Collection models, training candidates, and releases may differ; inspect each separately."
  ],
  [
    "选错看输入，没动看拒绝，未完成看物理，未发布看验收。",
    "Wrong choice: inspect input. No motion: inspect rejection. No success: inspect physics. No release: inspect acceptance."
  ],
  [
    " 依次核对 state／候选／回答、executed／rejection、接触与成功协议、独立评测门槛。",
    " Check state/candidates/reply, executed/rejection, contacts/success protocol, then independent evaluation gates."
  ],
  [
    "历史回放不等于仍在训练。",
    "Historical replay is not ongoing training."
  ],
  [
    " SQLite／JSONL 保存过程，相机哈希核对观测，参数快照展示历史。是否仍在训练，以作业状态和新增训练事件为准。",
    " SQLite/JSONL preserve the process, camera hashes verify observations, and parameter snapshots show history. Job state and new training events establish ongoing work."
  ],
  [
    "成功经验训练候选，独立评测决定发布。",
    "Successful experience trains a candidate; independent evaluation decides release."
  ],
  [
    " 默认 self-improve 用成功动作回放交叉熵训练 scorer，编码塔保持冻结；独立策略梯度实验使用另一套目标。",
    " Default self-improve trains the scorer with successful-action replay cross-entropy and frozen encoders. Separate policy-gradient experiments use a different objective."
  ],
  [
    "从当前发布模型继续，无发布版本则用固定初始 RSI-Jev。",
    "Continue from the current release, or a pinned initial RSI-Jev if none exists. "
  ],
  [
    "探索改变采样，不改权重；每局固定版本。",
    "Exploration changes sampling, not weights; every episode pins its version."
  ],
  [
    "新增整局和成功局同时达标才触发。排除失败、重复、未执行、空抓、失抓与无夹持搬运；教师、代码策略和仅评测数据不计入模型自采成功。",
    "Trigger after both new-episode and new-success thresholds. Exclude failure, duplication, unexecuted actions, empty/lost grasps, and unheld transport. Teacher, coded-policy, and evaluation-only data do not count as model-collected success."
  ],
  [
    "继承父权重，每轮新建优化器；缓存冻结特征，仅训练决策头。",
    "Inherit parent weights, create a fresh optimizer, cache frozen features, and train only the decision head. "
  ],
  [
    "开发场景按完整任务表现选 checkpoint。",
    "Development scenes select checkpoints by complete-task outcomes."
  ],
  [
    "用独立新场景配对比较父模型与候选。",
    "Pair parent and candidate on independent new scenes. "
  ],
  [
    "默认至少 90 对、每任务 30 对、提升 5 个百分点、95% 提升区间下界大于零",
    "Defaults require at least 90 pairs, 30 per task, a 5-point gain, and a positive lower bound of the 95% improvement interval"
  ],
  [
    "，并检查退步与风险；以本次评测报告为准。",
    ", plus regression/risk checks. The run’s evaluation report is authoritative."
  ],
  [
    "通过验收后核对哈希、加载预热，再原子更新注册表。",
    "After acceptance, verify the hash, load and warm, then atomically update the registry. "
  ],
  [
    "新模型从下一局生效；未通过则保留当前版本。",
    "Use the new model from the next episode; otherwise retain the current release."
  ],
  [
    "协议随数据与 checkpoint 保存。",
    "Protocols travel with data and checkpoints."
  ],
  [
    " 评测复用动作、观测和相机设置；不同配置不混训，切换协议需重新采集并评测。",
    " Evaluation reuses action, observation, and camera settings. Do not mix incompatible configurations; collect and evaluate again after a protocol change."
  ],
  [
    "按职责找代码：embodied_lab 启动，embodied_jev 执行实验，embodied_rsi 管理学习闭环。",
    "Find code by responsibility: embodied_lab launches, embodied_jev runs experiments, embodied_rsi manages learning."
  ],
  [
    " 它们属于同一项目；前端修改后重新构建。",
    " They belong to one project. Rebuild after frontend changes."
  ],
  [
    "artifacts 是实验数据根目录。",
    "artifacts is the experiment data root."
  ],
  [
    " lab-config.json 指定默认路径；monitor.sqlite3 存事件，runs/ 存轨迹、数据清单、检查点和报告。注册表指向发布模型，live-session.json 保存采集意图。",
    " lab-config.json sets its default path. monitor.sqlite3 stores events; runs/ stores trajectories, manifests, checkpoints, and reports. Registries identify releases; live-session.json preserves collection intent."
  ],
  [
    "docs/origins/ 保留旧文档，migration/ 保留迁移材料。",
    "docs/origins/ holds earlier documentation; migration/ holds migration records. "
  ],
  [
    "启动命令以本页和当前 README 为准。",
    "Use this page and the current README for startup commands."
  ],
  [
    "先运行、再看记录、最后读代码。",
    "Run it, inspect the records, then read the code."
  ],
  [
    " 按“基线 → 决策 → 观测 → 训练 → 发布”理解完整闭环。",
    " Follow baseline → decisions → observations → training → release."
  ],
  [
    "固定种子，单步运行搬运基线，观察抓取到撤离；区分动作执行与任务成功。",
    "Fix a seed and step through the transfer baseline from grasp to withdrawal. Distinguish action execution from task success."
  ],
  [
    "对照输入、候选、选择、拒绝和动作后状态；再切换 XYZ 与分层模式看分工差异。",
    "Compare input, candidates, choice, rejection, and post-action state. Switch to XYZ and hierarchy to see how responsibilities change."
  ],
  [
    "对比真值与 RGB-D 的数据来源、相机和缺失目标处理；支持视觉的模型再测试直接图像。",
    "Compare state and RGB-D provenance, cameras, and missing-target handling. Test direct images separately with a supported vision model."
  ],
  [
    "沿一条成功轨迹找到过滤记录、训练样本、数据哈希与 loss，再确认 scorer 的可训练参数。",
    "Trace one successful trajectory through filtering, examples, data hash, and loss, then inspect the scorer’s trainable parameters."
  ],
  [
    "对照开发选点、独立评测、发布门槛和 checkpoint 哈希，解释候选为何发布或被保留。",
    "Compare development selection, independent evaluation, release gates, and checkpoint hash to explain acceptance or rejection."
  ],
  [
    "分别安装后端与 Web UI，由一个 Python 服务提供完整页面。",
    "Install backend and Web UI separately; one Python service serves the full page."
  ],
  [
    " 以下命令在项目根目录执行，适用 macOS / Linux；本地训练额外安装 RSI 环境。",
    " Run these macOS/Linux commands from the project root. Add the RSI environment for local training."
  ],
  [
    "首次安装：创建 .venv，再运行 bootstrap。",
    "First install: create .venv, then run bootstrap."
  ],
  [
    " 脚本按 constraints-simulation.txt 安装依赖，按 upstreams.lock.json 获取固定上游代码。",
    " The script installs dependencies from constraints-simulation.txt and fetches pinned source from upstreams.lock.json."
  ],
  [
    "安装后获得 FastAPI、MuJoCo 等依赖及三个项目命令。",
    "Installation provides FastAPI, MuJoCo, and the three project commands. "
  ],
  [
    "已有 .venv 无需重建",
    "Keep an existing .venv"
  ],
  [
    "，更新依赖只运行 bootstrap；基线和远端测试不需在此安装 PyTorch。",
    " and run only bootstrap to update dependencies. Baseline and remote tests need no PyTorch here."
  ],
  [
    "在项目根目录执行。",
    "Run from the project root."
  ],
  [
    " npm ci 按锁文件安装，npm run build 构建 Web UI；后端安装不会自动完成这一步。",
    " npm ci installs from the lockfile; npm run build builds the UI. Backend installation does not perform this step."
  ],
  [
    "frontend 构建模型工具，embodied_rsi/web 提供统一页面。",
    "frontend builds model tools; embodied_rsi/web serves unified pages."
  ],
  [
    " Vite 输出到 src/embodied_jev/web；导航、训练、报告、Doc 和翻译由 Python 直接提供。修改源码，不手改生成文件。",
    " Vite outputs to src/embodied_jev/web. Python directly serves navigation, training, reports, Doc, and translations. Edit source rather than generated files."
  ],
  [
    "构建后只需启动 Python 服务。",
    "After building, start only the Python service."
  ],
  [
    " 改动 frontend 或共享翻译后重新构建；直接提供的文档文件通常刷新即可。先完成构建，再运行浏览器测试。",
    " Rebuild frontend or shared-catalog changes; directly served documentation usually needs a refresh. Finish builds before browser tests."
  ],
  [
    "本地 RSI 推理／训练需要独立 .venv-rsi。",
    "Local RSI inference/training needs a separate .venv-rsi."
  ],
  [
    " 安装固定 RSI-Jev 与 PyTorch；规则基线和远端 API 实验可跳过。",
    " Install pinned RSI-Jev and PyTorch. Skip this for rule-baseline and remote-API experiments."
  ],
  [
    "已有环境只需按需运行第二条安装命令。启动器自动检测 .venv-rsi/bin/python；",
    "For an existing environment, run only the second installation command when needed. The launcher detects .venv-rsi/bin/python. "
  ],
  [
    "安装依赖不等于已有模型权重",
    "Installed dependencies do not include model weights"
  ],
  [
    "，首次加载可能下载 checkpoint。",
    "; first load may download a checkpoint."
  ],
  [
    "设备默认自动选择，也可用 EMBODIED_RSI_DEVICE 指定 mps、cuda 或 cpu，须匹配硬件与 PyTorch。训练耗时取决于模型、数据和设备。",
    "Device selection is automatic, or set EMBODIED_RSI_DEVICE to mps, cuda, or cpu to match hardware and PyTorch. Training time depends on model, data, and device."
  ],
  [
    "打开 http://127.0.0.1:8092/simulation。",
    "Open http://127.0.0.1:8092/simulation."
  ],
  [
    " 保持终端运行；端口和数据目录来自 lab-config.json，默认相对路径以项目根目录为基准。",
    " Keep the terminal running. lab-config.json sets the port and data directory; default relative paths resolve from the project root."
  ],
  [
    "用新目录和 8093 端口隔离实验。",
    "Isolate experiments with a new directory and port 8093."
  ],
  [
    " 仅跑基线时省略 --rsi-python 及路径；显式 --artifacts 的相对路径以当前工作目录为基准。",
    " Omit --rsi-python and its path for baseline-only use. Explicit relative --artifacts paths resolve from the working directory."
  ],
  [
    "隔离地址：http://127.0.0.1:8093/simulation。新目录从空白状态开始，已有目录会读取历史模型和会话意图。",
    "Isolated URL: http://127.0.0.1:8093/simulation. New directories start empty; existing ones restore model history and session intent. "
  ],
  [
    "网页更新无需重启后端",
    "Web updates need no backend restart"
  ],
  [
    "；依赖变更需重启时先结束当前任务。",
    "; finish current tasks before restarting for dependency changes."
  ],
  [
    "接口应返回 JSON。然后进入模型测试，用固定种子的搬运基线单步并跑完一局，检查动作、接触、结果与日志。",
    "Expect JSON, then step and complete a transfer baseline with a fixed seed in Model Test. Inspect motion, contacts, outcome, and logs. "
  ],
  [
    "这验证环境，不代表 RSI 已学会任务。",
    "This verifies the environment, not RSI learning."
  ],
  [
    "在模型配置填写接口类型、Base URL、模型 ID 和 Key，再做输入测试。",
    "Enter interface type, Base URL, model ID, and key in Models, then test an input. "
  ],
  [
    "保存不调用，测试与运行会请求模型。",
    "Saving makes no call; testing and running do."
  ],
  [
    " 密钥使用系统凭证存储；不可用时仅保留本次会话。.env 不自动加载。",
    " Keys use system credentials or session-only storage when unavailable. .env is not loaded automatically."
  ],
  [
    "训练前确认本地 checkpoint 与解释器，再设定动作、观测、相机和采集／训练阈值。",
    "Confirm the local checkpoint and interpreter, then set actions, observations, cameras, and collection/training thresholds. "
  ],
  [
    "当前训练器不更新远端 API 权重。",
    "The current trainer cannot update remote API weights."
  ],
  [
    "页面空白先查构建和资源请求；画面失败再查图形后端。默认 macOS 用 CGL、Linux 用 EGL，MUJOCO_GL 可覆盖。无界面 Linux 需对应图形库；端口冲突改用隔离端口。",
    "For a blank page, check builds and assets; for missing frames, check rendering. Defaults are CGL on macOS and EGL on Linux, overridable with MUJOCO_GL. Headless Linux needs matching graphics libraries; use an isolated port on conflict."
  ],
  [
    "Vite 用于模型工具的开发预览。",
    "Vite previews model tools during development."
  ],
  [
    " 保持 Python 服务运行，在另一个终端启动下面的命令。",
    " Keep Python running and start this command in another terminal."
  ],
  [
    "打开终端给出的地址，通常为 http://127.0.0.1:5173。/api 代理到 8092 的 /workbench，改端口需同步 vite.config.js。",
    "Open the printed URL, usually http://127.0.0.1:5173. /api proxies to /workbench on 8092; port changes require vite.config.js updates. "
  ],
  [
    "完整工作台仍在 8092 /simulation",
    "The full workbench remains at 8092 /simulation"
  ],
  [
    "；修改完成后构建并验证集成页面。",
    ". Rebuild and verify the integrated page when finished."
  ],
  [
    "先验证物理与记录链路。",
    "Verify physics and recording first."
  ],
  [
    " 该命令使用规则教师，无需模型请求；检查运行 ID、episodes.jsonl 和完成率。教师轨迹不计入模型自采成功。",
    " This rule-teacher command makes no model request. Check the run ID, episodes.jsonl, and completion rate. Teacher trajectories do not count as model-collected success."
  ],
  [
    "固定起点与协议，再运行闭环。",
    "Fix the starting point and protocol, then run the loop."
  ],
  [
    " 用新目录、相同初始 checkpoint、任务、种子范围和预算。采集足够成功数据后，跟踪过滤、拟合、开发选点、独立评测与发布。",
    " Use a new directory with matching initial checkpoint, task, seed range, and budget. After enough successful collection, trace filtering, fitting, development selection, independent evaluation, and release."
  ],
  [
    "保存 Git／上游版本、环境、父模型哈希、数据清单、评测种子和执行配置。",
    "Save Git/upstream versions, environment, parent hash, data manifest, evaluation seeds, and execution settings. "
  ],
  [
    "同种子不保证同轨迹",
    "The same seed does not guarantee the same trajectory"
  ],
  [
    "：模型版本、采样和硬件仍有影响；冒烟通过也不等于达到发布门槛。",
    ": model versions, sampling, and hardware matter. A smoke test does not establish release readiness."
  ],
  [
    "浏览器测试使用独立端口和数据目录，需要已安装 Chrome。完整实验按 --help 选择阶段；",
    "Browser tests use an isolated port and data directory and require installed Chrome. Select full-experiment stages with --help. "
  ],
  [
    "先构建，再测试",
    "Build before testing"
  ],
  [
    "，不要中途重建资源。",
    "; do not rebuild assets mid-test."
  ],
  [
    "采集与训练是两个任务。",
    "Collection and training are separate tasks."
  ],
  [
    " 已启动的 self-improve 会继续；在下方报告查看阶段，必要时单独停止作业。",
    " Accepted self-improve jobs continue. Check the stage in the report below and stop the job separately if needed."
  ],
  [
    "loss 衡量拟合，独立评测决定发布。",
    "Loss measures fitting; independent evaluation determines release."
  ],
  [
    " 检查提升、置信区间、任务覆盖和风险门槛。",
    " Check gain, confidence interval, task coverage, and risk gates."
  ],
  [
    "核对左侧模型、版本、checkpoint 与 SHA256，再对照本局日志。",
    "Check the model, version, checkpoint, and SHA256 on the left against episode logs. "
  ],
  [
    "训练候选不会在局中替换当前模型。",
    "A training candidate does not replace the model mid-episode."
  ],
  [
    "远端 API 提供推理，不提供当前训练器可更新的参数。",
    "Remote APIs provide inference, not parameters this trainer can update."
  ],
  [
    " 自主训练适配本地文本／结构化 RSI；其他模型需另接训练接口。",
    " Self-evolving training supports local text/structured RSI; other models need a training adapter."
  ],
  [
    "检查项目根目录、uv 的 PATH 和 bootstrap 结果，再核对 .venv-rsi/bin/python、checkpoint 路径与哈希。下载或加载失败以终端和过程日志为准。",
    "Check the project root, uv on PATH, and bootstrap result, then .venv-rsi/bin/python and the checkpoint path/hash. Use terminal and process logs for download or loading failures."
  ],
  [
    "完成 npm ci 和 npm run build，再刷新 /simulation。端口占用时使用独立端口；",
    "Run npm ci and npm run build, then refresh /simulation. Use an isolated port if needed. "
  ],
  [
    "刷新界面无需重启正在训练的后端。",
    "Refreshing the UI does not require restarting a training backend."
  ],
  [
    "界面翻译，原始证据保留。",
    "Translate the interface; preserve raw evidence."
  ],
  [
    " 模型 ID、用户输入、原始回复、JSON 和代码保持原样。默认英文，语言选择保存在浏览器。",
    " Model IDs, user input, raw replies, JSON, and code remain unchanged. English is the default; the browser stores your preference."
  ],
  [
    "使用 Python 3.12。当前锁定的 NumPy 要求 ≥3.12，虽然项目元数据的最低声明仍是 3.11。",
    "Use Python 3.12. The pinned NumPy requires ≥3.12, although project metadata still declares a 3.11 minimum."
  ],
  [
    "Node 20.x 的 20.19+，或 ≥22.12；npm 用于安装和构建 UI。",
    "Node 20.19+ in the 20.x line, or ≥22.12. npm installs and builds the UI."
  ],
  [
    "提交控制并读取状态。Three.js 绘制测试场景，MuJoCo 提供训练画面；物理和训练由后端执行。",
    "Submits control and reads state. Three.js draws test scenes; MuJoCo supplies training frames. The backend handles physics and training."
  ],
  [
    "管理接口、会话、采集线程、作业与记录。读取状态不会启动训练。",
    "Manages APIs, sessions, collection threads, jobs, and records. Reading state does not start training."
  ],
  [
    "构造输入与候选、调用模型并校验回答。动作模式决定模型承担哪些选择。",
    "Builds inputs/candidates, invokes the model, and validates replies. Action mode defines the choices assigned to the model."
  ],
  [
    "执行关节控制，推进 MuJoCo，检测接触与成功。模型不能直接改写成功标记。",
    "Executes joint control, steps MuJoCo, and checks contacts and success. The model cannot directly set success."
  ],
  [
    "筛选轨迹、训练候选、独立评测并更新活动注册表。候选存在不代表已部署。",
    "Filters trajectories, trains candidates, evaluates independently, and updates the registry. A candidate is not necessarily deployed."
  ],
  [
    "代码来源：",
    "Code origins:"
  ],
  [
    "负责模型接口、感知与物理实验；",
    "provides model adapters, perception, and physics;"
  ],
  [
    "负责采集、训练、评测与部署。embodied_lab 统一启动，一个 8092 服务提供完整工作台。",
    "provides collection, training, evaluation, and deployment. embodied_lab launches the complete workbench as one service on 8092."
  ],
  [
    "展开：两条技能路径的差异",
    "Details: the two skill implementations"
  ],
  [
    "展开：为什么候选数量会变化",
    "Details: why candidate counts change"
  ],
  [
    "展开：如何统计请求与通道概率",
    "Details: request counts and channel probabilities"
  ],
  [
    "展开：各协议的观测权限",
    "Details: observation permissions by protocol"
  ],
  [
    "展开：执行检查覆盖什么",
    "Details: execution-check coverage"
  ],
  [
    "展开：页面、渲染与端口排查",
    "Details: assets, rendering, and ports"
  ],
  [
    "实验路径",
    "Experiments"
  ]
];
