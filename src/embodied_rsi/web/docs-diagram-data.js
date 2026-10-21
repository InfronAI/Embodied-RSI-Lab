// Diagram geometry and descriptions, based on the local implementation.
export const DOC_DIAGRAMS = [
  {
    "id": "business",
    "title": "业务架构图",
    "width": 1200,
    "height": 990,
    "summary": "从实验准备进入三条业务路径：单模型验证、多模型对比、本地自进化；结果进入证据与验收，发布只影响后续新局。",
    "groups": [
      {
        "x": 32,
        "y": 20,
        "width": 1110,
        "height": 190,
        "title": "实验准备"
      },
      {
        "x": 32,
        "y": 260,
        "width": 1110,
        "height": 360,
        "title": "实验路径"
      },
      {
        "x": 32,
        "y": 670,
        "width": 1110,
        "height": 270,
        "title": "证据、验收与版本更新"
      }
    ],
    "nodes": [
      {
        "id": "b-task",
        "x": 52,
        "y": 75,
        "width": 300,
        "height": 110,
        "title": "确定实验目标",
        "hint": "任务 · 场景 · 成功协议",
        "detail": "选择搬运、堆叠或越障任务，确定场景、预算和成功条件。不同成功协议的完成率不能直接比较。",
        "files": [
          "src/embodied_jev/physics.py",
          "src/embodied_rsi/episode_protocol.py"
        ],
        "kind": "control"
      },
      {
        "id": "b-model",
        "x": 432,
        "y": 75,
        "width": 300,
        "height": 110,
        "title": "配置模型",
        "hint": "本地服务 / 远端 API / checkpoint",
        "detail": "模型配置保存连接和具名预设，模型测试可用规则或远端接口；自进化训练选择本地 RSI checkpoint。保存配置本身不调用模型。",
        "files": [
          "src/embodied_jev/connection_store.py",
          "src/embodied_rsi/deployment.py"
        ],
        "kind": "control"
      },
      {
        "id": "b-settings",
        "x": 812,
        "y": 75,
        "width": 300,
        "height": 110,
        "title": "固定实验条件",
        "hint": "动作 · 观测 · 相机 · 种子",
        "detail": "在目标工作区确认执行配置。页面共享实现，但不会自动继承所有参数或共享同一局机械臂状态。",
        "files": [
          "src/embodied_rsi/execution.py",
          "src/embodied_jev/runtime.py"
        ],
        "kind": "control"
      },
      {
        "id": "b-test",
        "x": 52,
        "y": 310,
        "width": 300,
        "height": 110,
        "title": "模型测试",
        "hint": "单模型决策与物理验证",
        "detail": "逐步观察输入、候选、模型选择、执行结果和失败原因。规则基线用于检查物理与记录链路。",
        "files": [
          "src/embodied_jev/runtime.py"
        ],
        "kind": "process"
      },
      {
        "id": "b-compare",
        "x": 432,
        "y": 310,
        "width": 300,
        "height": 110,
        "title": "模型对比",
        "hint": "同场景 · 顺序运行多个模型",
        "detail": "在约定场景和配置下顺序运行模型，对比完整任务表现、调用数和延迟；不同动作协议需要分别解释。",
        "files": [
          "src/embodied_jev/comparison.py"
        ],
        "kind": "process"
      },
      {
        "id": "b-collect",
        "x": 812,
        "y": 310,
        "width": 300,
        "height": 110,
        "title": "自进化采集",
        "hint": "本地 RSI · 连续整局 · 探索",
        "detail": "每局固定模型版本，按所选动作与观测协议采集轨迹。探索调整采样偏好，本身不更新模型权重。",
        "files": [
          "src/embodied_rsi/simulation.py",
          "src/embodied_rsi/exploration.py"
        ],
        "kind": "model"
      },
      {
        "id": "b-live",
        "x": 52,
        "y": 485,
        "width": 300,
        "height": 110,
        "title": "实时反馈与诊断",
        "hint": "相机 · 决策时间线 · 拒绝原因",
        "detail": "对照实际请求和执行前后状态定位问题。选择了动作、执行了动作和完成了任务是三个不同事件。",
        "files": [
          "src/embodied_jev/evidence.py",
          "src/embodied_rsi/process_log.py"
        ],
        "kind": "process"
      },
      {
        "id": "b-report",
        "x": 432,
        "y": 485,
        "width": 300,
        "height": 110,
        "title": "对比结果与回放",
        "hint": "成功率 · 耗时 · 原始记录",
        "detail": "保留每个模型的结果和调用记录，支持回放与导出。一次对比不会自动成为本地训练数据。",
        "files": [
          "src/embodied_jev/comparison.py"
        ],
        "kind": "store"
      },
      {
        "id": "b-improve",
        "x": 812,
        "y": 485,
        "width": 300,
        "height": 110,
        "title": "成功数据驱动训练",
        "hint": "过滤 → 拟合 → 开发选点 → 评测",
        "detail": "同时达到新增整局与成功局门槛后触发后台作业。筛选兼容的模型自采数据，再拟合候选并进行独立评测。",
        "files": [
          "src/embodied_rsi/auto_training.py",
          "src/embodied_rsi/self_improvement.py"
        ],
        "kind": "model"
      },
      {
        "id": "b-evidence",
        "x": 52,
        "y": 730,
        "width": 300,
        "height": 110,
        "title": "实验与训练证据",
        "hint": "日志 · 数据清单 · 轮次报告",
        "detail": "用运行 ID、整局 ID、模型与场景哈希关联输入、动作、过滤、指标和发布记录。失败与未发布候选也保留证据。",
        "files": [
          "src/embodied_rsi/storage.py",
          "src/embodied_rsi/monitor.py"
        ],
        "kind": "store"
      },
      {
        "id": "b-gate",
        "x": 432,
        "y": 730,
        "width": 300,
        "height": 110,
        "title": "发布验收",
        "hint": "独立配对提升 · 区间 · 风险",
        "detail": "比较父模型与候选在相同独立场景上的表现，核对提升、置信区间、覆盖与风险门槛。loss 下降不等于通过验收。",
        "files": [
          "src/embodied_rsi/evaluation.py",
          "src/embodied_rsi/workflow.py"
        ],
        "kind": "gate"
      },
      {
        "id": "b-release",
        "x": 812,
        "y": 730,
        "width": 300,
        "height": 110,
        "title": "活动模型版本",
        "hint": "通过则发布；未通过保留当前模型",
        "detail": "通过验收后核验哈希、加载预热并更新注册表。当前局保持固定版本，新局才使用新发布模型；未通过则沿用现有版本。",
        "files": [
          "src/embodied_rsi/deployment.py"
        ],
        "kind": "model"
      }
    ],
    "edges": [
      {
        "points": [
          [
            352,
            130
          ],
          [
            432,
            130
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            732,
            130
          ],
          [
            812,
            130
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            962,
            185
          ],
          [
            962,
            235
          ],
          [
            202,
            235
          ],
          [
            202,
            310
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            962,
            235
          ],
          [
            582,
            235
          ],
          [
            582,
            310
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            962,
            235
          ],
          [
            962,
            310
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            202,
            420
          ],
          [
            202,
            485
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            582,
            420
          ],
          [
            582,
            485
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            962,
            420
          ],
          [
            962,
            485
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            202,
            595
          ],
          [
            202,
            730
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            582,
            595
          ],
          [
            582,
            645
          ],
          [
            202,
            645
          ],
          [
            202,
            730
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            962,
            595
          ],
          [
            962,
            695
          ],
          [
            582,
            695
          ],
          [
            582,
            730
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            432,
            785
          ],
          [
            352,
            785
          ]
        ],
        "label": "",
        "at": null,
        "kind": "record",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            732,
            785
          ],
          [
            812,
            785
          ]
        ],
        "label": "通过",
        "at": [
          772,
          770
        ],
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            582,
            840
          ],
          [
            582,
            895
          ],
          [
            962,
            895
          ],
          [
            962,
            840
          ]
        ],
        "label": "未通过：保留当前版本",
        "at": [
          772,
          920
        ],
        "kind": "reject",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            1112,
            785
          ],
          [
            1170,
            785
          ],
          [
            1170,
            365
          ],
          [
            1112,
            365
          ]
        ],
        "label": "下一局",
        "at": [
          1160,
          575
        ],
        "kind": "feedback",
        "rotate": -90,
        "both": false
      }
    ]
  },
  {
    "id": "system",
    "title": "系统架构流程图",
    "width": 1200,
    "height": 1240,
    "summary": "一个 8092 服务挂载两组接口；物理世界按会话隔离，RSI 推理和训练可运行在独立进程。箭头区分请求、记录和发布后的加载。",
    "groups": [
      {
        "x": 32,
        "y": 20,
        "width": 1110,
        "height": 175,
        "title": "浏览器"
      },
      {
        "x": 32,
        "y": 235,
        "width": 720,
        "height": 720,
        "title": "统一服务进程 · Python / FastAPI"
      },
      {
        "x": 822,
        "y": 235,
        "width": 330,
        "height": 720,
        "title": "外部服务与子进程"
      },
      {
        "x": 32,
        "y": 1000,
        "width": 1120,
        "height": 200,
        "title": "持久数据与模型产物"
      }
    ],
    "nodes": [
      {
        "id": "s-browser",
        "x": 52,
        "y": 70,
        "width": 1060,
        "height": 100,
        "title": "统一工作台 /simulation",
        "hint": "配置与控制 · Three.js / MuJoCo 画面 · 报告与 Doc",
        "detail": "浏览器发送控制意图并读取状态；物理计算和训练由后端执行。模型工作台来自 frontend 构建，统一页面来自 embodied_rsi/web。",
        "files": [
          "frontend/main.js",
          "src/embodied_rsi/web/lab.js"
        ],
        "kind": "control"
      },
      {
        "id": "s-router",
        "x": 52,
        "y": 285,
        "width": 680,
        "height": 100,
        "title": "统一启动与路由",
        "hint": "embodied_lab → dashboard.create_app → /workbench 挂载",
        "detail": "启动器读取端口、数据目录和 RSI 解释器，创建 FastAPI 应用并挂载模型实验接口；不需要第二个 8090 服务。",
        "files": [
          "src/embodied_lab/cli.py",
          "src/embodied_rsi/dashboard.py"
        ],
        "kind": "control"
      },
      {
        "id": "s-experiment-api",
        "x": 52,
        "y": 450,
        "width": 300,
        "height": 110,
        "title": "模型实验接口",
        "hint": "/workbench/api/ · 配置 / 控制 / 对比",
        "detail": "模型测试、连接管理和多模型对比使用独立的工作台接口域。读取快照和提交控制是不同操作。",
        "files": [
          "src/embodied_jev/server.py"
        ],
        "kind": "process"
      },
      {
        "id": "s-training-api",
        "x": 432,
        "y": 450,
        "width": 300,
        "height": 110,
        "title": "训练与记录接口",
        "hint": "/api/ · 仿真 / 作业 / 日志 / 报告",
        "detail": "统一控制台接口提供自主训练状态、能力、相机、日志、训练作业与轮次报告。",
        "files": [
          "src/embodied_rsi/dashboard.py"
        ],
        "kind": "process"
      },
      {
        "id": "s-session",
        "x": 52,
        "y": 635,
        "width": 300,
        "height": 110,
        "title": "实验会话与模型适配",
        "hint": "runtime.Session · comparison · policies",
        "detail": "每个实验维护自己的场景、候选和执行记录，通过模型适配器调用本地或远端决策服务。对比实验也有独立会话。",
        "files": [
          "src/embodied_jev/runtime.py",
          "src/embodied_jev/policies.py"
        ],
        "kind": "process"
      },
      {
        "id": "s-simulation",
        "x": 432,
        "y": 635,
        "width": 300,
        "height": 110,
        "title": "仿真线程与作业调度",
        "hint": "Simulation · AutoTrainer · Jobs",
        "detail": "仿真线程拥有实时物理与渲染；AutoTrainer 检查数据触发条件，Jobs 启动后台训练进程。停止采集和停止后台作业是不同控制。",
        "files": [
          "src/embodied_rsi/simulation.py",
          "src/embodied_rsi/auto_training.py",
          "src/embodied_rsi/dashboard.py"
        ],
        "kind": "process"
      },
      {
        "id": "s-physics",
        "x": 52,
        "y": 825,
        "width": 680,
        "height": 110,
        "title": "共享物理与感知实现 · 各会话独立世界",
        "hint": "MuJoCo · IK · 接触审计 · RGB-D / 图像 · 动作协议",
        "detail": "共享的是代码与协议，模型测试和自主训练不共享同一个机械臂世界。状态投影决定模型输入，仿真真值仍用于独立结果审计。",
        "files": [
          "src/embodied_jev/physics.py",
          "src/embodied_jev/perception.py",
          "src/embodied_rsi/configured_sim.py"
        ],
        "kind": "process"
      },
      {
        "id": "s-remote",
        "x": 842,
        "y": 450,
        "width": 300,
        "height": 110,
        "title": "远端模型 / 本地模型服务",
        "hint": "HTTP · Jev / Chat / Claude",
        "detail": "模型适配器通过配置的服务请求选择与可用概率。密钥不进入实验导出；远端推理连接不提供当前训练器需要的可训练权重。",
        "files": [
          "src/embodied_jev/policies.py",
          "src/embodied_jev/connection_store.py"
        ],
        "kind": "model"
      },
      {
        "id": "s-inference",
        "x": 842,
        "y": 635,
        "width": 300,
        "height": 110,
        "title": "RSI 推理工作进程",
        "hint": "独立解释器 · stdin/stdout JSONL",
        "detail": "RPCPolicy 在独立 Python 进程中加载 checkpoint，交换 state、criteria 和概率。这样服务环境与 RSI / PyTorch 环境可以分开。",
        "files": [
          "src/embodied_rsi/deployment.py",
          "src/embodied_rsi/inference_worker.py"
        ],
        "kind": "model"
      },
      {
        "id": "s-job",
        "x": 842,
        "y": 825,
        "width": 300,
        "height": 110,
        "title": "self-improve 后台作业",
        "hint": "过滤 · 拟合 · 开发 · 配对评测",
        "detail": "作业读取合规轨迹、继承父模型权重、拟合候选并评测。即使浏览器关闭或采集停止，已经启动的作业仍可能继续。",
        "files": [
          "src/embodied_rsi/self_improvement.py",
          "src/embodied_rsi/task_rsi.py"
        ],
        "kind": "model"
      },
      {
        "id": "s-store",
        "x": 52,
        "y": 1060,
        "width": 300,
        "height": 110,
        "title": "运行与观测存储",
        "hint": "SQLite · JSONL · 相机 / 位姿回放",
        "detail": "记录请求、响应、执行、过滤、训练和评测事件，用 ID 与哈希关联。记录中的审计真值与实际发给模型的观测分开核对。",
        "files": [
          "src/embodied_rsi/storage.py",
          "src/embodied_rsi/process_log.py"
        ],
        "kind": "store"
      },
      {
        "id": "s-registry",
        "x": 432,
        "y": 1060,
        "width": 300,
        "height": 110,
        "title": "活动模型注册表",
        "hint": "验证哈希 · 加载预热 · 原子切换",
        "detail": "通过验收才更新活动模型；每局固定版本，后续新局获取最新发布。训练候选和当前推理模型可能不同。",
        "files": [
          "src/embodied_rsi/deployment.py"
        ],
        "kind": "store"
      },
      {
        "id": "s-artifacts",
        "x": 842,
        "y": 1060,
        "width": 300,
        "height": 110,
        "title": "候选与评测产物",
        "hint": "checkpoint · manifest · 评测 / 发布报告",
        "detail": "保存训练参数、数据来源、父模型哈希、候选权重与评测结果。未通过发布条件的候选仍保留产物和失败原因。",
        "files": [
          "src/embodied_rsi/self_improvement.py",
          "src/embodied_rsi/workflow.py"
        ],
        "kind": "store"
      }
    ],
    "edges": [
      {
        "points": [
          [
            392,
            170
          ],
          [
            392,
            285
          ]
        ],
        "label": "HTTP：控制与状态",
        "at": [
          515,
          222
        ],
        "kind": "flow",
        "rotate": 0,
        "both": true
      },
      {
        "points": [
          [
            202,
            385
          ],
          [
            202,
            450
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            582,
            385
          ],
          [
            582,
            450
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            202,
            560
          ],
          [
            202,
            635
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            582,
            560
          ],
          [
            582,
            635
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            352,
            690
          ],
          [
            392,
            690
          ],
          [
            392,
            597
          ],
          [
            802,
            597
          ],
          [
            802,
            505
          ],
          [
            842,
            505
          ]
        ],
        "label": "HTTP",
        "at": [
          790,
          485
        ],
        "kind": "flow",
        "rotate": 0,
        "both": true
      },
      {
        "points": [
          [
            732,
            690
          ],
          [
            842,
            690
          ]
        ],
        "label": "JSONL",
        "at": [
          786,
          674
        ],
        "kind": "flow",
        "rotate": 0,
        "both": true
      },
      {
        "points": [
          [
            202,
            745
          ],
          [
            202,
            825
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            582,
            745
          ],
          [
            582,
            825
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            582,
            780
          ],
          [
            992,
            780
          ],
          [
            992,
            825
          ]
        ],
        "label": "启动作业",
        "at": [
          930,
          768
        ],
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            202,
            935
          ],
          [
            202,
            1060
          ]
        ],
        "label": "事件 / 轨迹",
        "at": [
          270,
          978
        ],
        "kind": "record",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            992,
            935
          ],
          [
            992,
            1060
          ]
        ],
        "label": "保存产物",
        "at": [
          1052,
          978
        ],
        "kind": "record",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            842,
            1115
          ],
          [
            732,
            1115
          ]
        ],
        "label": "验收通过",
        "at": [
          787,
          1100
        ],
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            732,
            1145
          ],
          [
            780,
            1145
          ],
          [
            780,
            718
          ],
          [
            842,
            718
          ]
        ],
        "label": "新局加载",
        "at": [
          768,
          950
        ],
        "kind": "feedback",
        "rotate": -90,
        "both": false
      }
    ]
  },
  {
    "id": "data",
    "title": "详细数据流程图",
    "width": 1200,
    "height": 1610,
    "summary": "上半部分是一局中的实时决策反馈，下半部分是跨局的训练与发布。蓝色虚线保存证据，绿色虚线回到后续决策或新局，橙色分支表示拒绝、排除或未通过。",
    "groups": [
      {
        "x": 32,
        "y": 55,
        "width": 1110,
        "height": 765,
        "title": "局内：观测 → 决策 → 物理反馈"
      },
      {
        "x": 32,
        "y": 865,
        "width": 1110,
        "height": 735,
        "title": "跨局：成功回放 → 训练 → 独立评测 → 发布"
      }
    ],
    "nodes": [
      {
        "id": "d-config",
        "x": 52,
        "y": 105,
        "width": 300,
        "height": 110,
        "title": "实验配置与模型版本",
        "hint": "task · seed · execution · checkpoint",
        "detail": "读取任务、种子、执行配置与当前 checkpoint，保留成功协议和模型哈希。远端模型实验和本地训练路径要分别标记来源。",
        "files": [
          "src/embodied_rsi/execution.py",
          "src/embodied_rsi/episode_protocol.py"
        ],
        "kind": "control"
      },
      {
        "id": "d-scene",
        "x": 432,
        "y": 105,
        "width": 300,
        "height": 110,
        "title": "初始化并固定本局版本",
        "hint": "scene_hash · episode_id · model SHA256",
        "detail": "生成场景并在整局固定模型版本，防止中途部署改变本局策略。场景种子之外还需记录真实场景配置和哈希。",
        "files": [
          "src/embodied_rsi/simulation.py",
          "src/embodied_jev/physics.py"
        ],
        "kind": "process"
      },
      {
        "id": "d-observe",
        "x": 812,
        "y": 105,
        "width": 300,
        "height": 110,
        "title": "感知采样",
        "hint": "真值 / RGB-D / 支持的图像路径",
        "detail": "按协议采样本体、接触与相机。RGB-D 先检测与估计坐标，直接图像仅在支持的模型测试路径可用；当前本地 RSI 不接受直接图像。",
        "files": [
          "src/embodied_jev/perception.py",
          "src/embodied_rsi/configured_sim.py"
        ],
        "kind": "process"
      },
      {
        "id": "d-project",
        "x": 812,
        "y": 295,
        "width": 300,
        "height": 110,
        "title": "构造模型可见状态",
        "hint": "state · recent_outcomes · 图像载荷",
        "detail": "仅把当前协议允许的信息放入请求。RGB-D 决策使用检测坐标，审计真值另存；旧技能路径与 XYZ 的输入信息范围不同。",
        "files": [
          "src/embodied_jev/evidence.py",
          "src/embodied_jev/incremental.py",
          "src/embodied_rsi/configured_sim.py"
        ],
        "kind": "process"
      },
      {
        "id": "d-candidates",
        "x": 432,
        "y": 295,
        "width": 300,
        "height": 110,
        "title": "组织候选与指令",
        "hint": "criteria · 候选顺序 · 动作协议",
        "detail": "预设技能提供任务级候选，逐步 XYZ 提供离散移动，分层 XYZ 拆成子目标与四个通道。候选说明与顺序也属于模型输入。",
        "files": [
          "src/embodied_jev/planning.py",
          "src/embodied_jev/incremental.py",
          "src/embodied_jev/hierarchical.py"
        ],
        "kind": "process"
      },
      {
        "id": "d-request",
        "x": 52,
        "y": 295,
        "width": 300,
        "height": 110,
        "title": "模型请求与回答",
        "hint": "choice · probabilities? · latency",
        "detail": "适配器记录实际请求、选择和耗时。有原生候选概率时保留；Chat 没有这种概率时不虚构，分层通道分别记录。",
        "files": [
          "src/embodied_jev/policies.py",
          "src/embodied_rsi/policies.py"
        ],
        "kind": "model"
      },
      {
        "id": "d-validate",
        "x": 52,
        "y": 485,
        "width": 300,
        "height": 110,
        "title": "回答校验与选择",
        "hint": "ID / 概率合法性 · argmax / 探索",
        "detail": "校验候选 ID 和概率协议，RSI 按评测或探索模式选择。非法回答不能伪装为执行成功；可用概率低于门槛时可按人工介入设置暂停。",
        "files": [
          "src/embodied_jev/runtime.py",
          "src/embodied_rsi/configured_sim.py"
        ],
        "kind": "gate"
      },
      {
        "id": "d-execute",
        "x": 432,
        "y": 485,
        "width": 300,
        "height": 110,
        "title": "预演与物理执行",
        "hint": "TCP / 夹爪 → IK → MuJoCo",
        "detail": "执行适用的边界、IK 和接触检查，再推进物理。动作可能被拒绝；记录 executed 与 rejection，并保留实际结果，不替换成模型期望结果。",
        "files": [
          "src/embodied_rsi/sim.py",
          "src/embodied_jev/physics.py"
        ],
        "kind": "process"
      },
      {
        "id": "d-feedback",
        "x": 812,
        "y": 485,
        "width": 300,
        "height": 110,
        "title": "新观测与物理审计",
        "hint": "observed_after · after · success",
        "detail": "分别记录模型可见反馈和用于结果审计的仿真状态。仍有预算且未终止时回到感知；成功、失败或停止则结束整局。",
        "files": [
          "src/embodied_rsi/configured_sim.py",
          "src/embodied_rsi/grasp.py"
        ],
        "kind": "process"
      },
      {
        "id": "d-excluded",
        "x": 52,
        "y": 685,
        "width": 300,
        "height": 110,
        "title": "拒绝、失败与排除记录",
        "hint": "诊断 / 探索记忆 · 不冒充成功样本",
        "detail": "非法输出、动作拒绝、感知失败和轨迹过滤各保留原因。暂停可人工恢复；失败或不合规数据不会作为当前成功回放目标进入拟合。",
        "files": [
          "src/embodied_rsi/process_log.py",
          "src/embodied_rsi/exploration.py",
          "src/embodied_rsi/self_improvement.py"
        ],
        "kind": "reject"
      },
      {
        "id": "d-records",
        "x": 432,
        "y": 685,
        "width": 300,
        "height": 110,
        "title": "持久整局与事件",
        "hint": "SQLite · episodes.jsonl · 捕获哈希",
        "detail": "以运行和整局标识串联观测、请求、回答、执行与终止结果。采集数据是否可训练仍需后续筛选，不能只看文件存在。",
        "files": [
          "src/embodied_rsi/storage.py",
          "src/embodied_rsi/process_log.py"
        ],
        "kind": "store"
      },
      {
        "id": "d-episode",
        "x": 812,
        "y": 685,
        "width": 300,
        "height": 110,
        "title": "整局终止与结果",
        "hint": "success · failure_reason · protocol",
        "detail": "依据当前成功协议和动作预算给整局结论。严格抓取协议审计抓取、抬升、夹持搬运、释放、无掉落与稳定放置。",
        "files": [
          "src/embodied_rsi/grasp.py",
          "src/embodied_rsi/sim.py"
        ],
        "kind": "gate"
      },
      {
        "id": "d-trigger",
        "x": 52,
        "y": 920,
        "width": 300,
        "height": 110,
        "title": "自动训练触发条件",
        "hint": "新增整局 + 新增成功局 + 空闲作业",
        "detail": "同时达到新增数据门槛且后台可用才触发训练；处理水位防止同一批数据重复触发。未达标时继续等待采集。",
        "files": [
          "src/embodied_rsi/auto_training.py"
        ],
        "kind": "gate"
      },
      {
        "id": "d-filter",
        "x": 432,
        "y": 920,
        "width": 300,
        "height": 110,
        "title": "成功轨迹与动作筛选",
        "hint": "来源 · 去重 · 协议 · 执行审计",
        "detail": "只保留兼容协议的模型自采成功整局，排除失败、重复、教师、仅评测与不合规动作；分层决策保留各通道标签。",
        "files": [
          "src/embodied_rsi/self_improvement.py"
        ],
        "kind": "gate"
      },
      {
        "id": "d-dataset",
        "x": 812,
        "y": 920,
        "width": 300,
        "height": 110,
        "title": "训练样本与数据清单",
        "hint": "state · criteria · target · SHA256",
        "detail": "把通过过滤的真实选择变成回放目标，保存来源、配置与数据哈希。不同动作、观测或成功协议的数据不混合。",
        "files": [
          "src/embodied_rsi/self_improvement.py"
        ],
        "kind": "store"
      },
      {
        "id": "d-fit",
        "x": 812,
        "y": 1110,
        "width": 300,
        "height": 110,
        "title": "继承父模型并拟合",
        "hint": "冻结编码塔 · 更新 scorer · 新优化器",
        "detail": "默认 self-improve 缓存冻结编码特征，用成功动作回放交叉熵更新决策头。每轮重新创建优化器，并记录真实 loss 与参数变化。",
        "files": [
          "src/embodied_rsi/task_rsi.py"
        ],
        "kind": "model"
      },
      {
        "id": "d-development",
        "x": 432,
        "y": 1110,
        "width": 300,
        "height": 110,
        "title": "开发场景选择检查点",
        "hint": "完整任务表现 → 候选 checkpoint",
        "detail": "开发场景用于从本轮更新中选择候选。选择依据是实际完整任务表现；更低训练 loss 不自动代表更好候选。",
        "files": [
          "src/embodied_rsi/self_improvement.py",
          "src/embodied_rsi/task_rsi.py"
        ],
        "kind": "model"
      },
      {
        "id": "d-evaluate",
        "x": 52,
        "y": 1110,
        "width": 300,
        "height": 110,
        "title": "独立配对评测",
        "hint": "同新场景：父模型 ↔ 候选",
        "detail": "用未参与训练和开发选点的独立场景，配对运行父模型与候选，计算提升区间、任务覆盖和风险指标。",
        "files": [
          "src/embodied_rsi/evaluation.py",
          "src/embodied_rsi/workflow.py"
        ],
        "kind": "gate"
      },
      {
        "id": "d-gate",
        "x": 52,
        "y": 1300,
        "width": 300,
        "height": 110,
        "title": "发布门槛判断",
        "hint": "样本数 · 提升 · 区间 · 退步 / 风险",
        "detail": "按本次评测配置逐项验收。通过和未通过都保留报告；系统不会为了展示收敛而强制发布候选。",
        "files": [
          "src/embodied_rsi/workflow.py"
        ],
        "kind": "gate"
      },
      {
        "id": "d-deploy",
        "x": 432,
        "y": 1300,
        "width": 300,
        "height": 110,
        "title": "核验与原子部署",
        "hint": "哈希 → 加载 → 预热 → 注册表",
        "detail": "确认 checkpoint 字节与哈希，实际加载并预热，成功后在锁内原子更新活动注册表。部署失败保留原因与现有版本。",
        "files": [
          "src/embodied_rsi/deployment.py"
        ],
        "kind": "model"
      },
      {
        "id": "d-next",
        "x": 812,
        "y": 1300,
        "width": 300,
        "height": 110,
        "title": "下一局使用新版本",
        "hint": "发布 ID · checkpoint · 本局版本固定",
        "detail": "发布后只影响后续新局。当前局继续使用固定 checkpoint，日志与报告可以核对模型切换确实发生在哪一局。",
        "files": [
          "src/embodied_rsi/simulation.py",
          "src/embodied_rsi/deployment.py"
        ],
        "kind": "model"
      },
      {
        "id": "d-retain",
        "x": 52,
        "y": 1480,
        "width": 300,
        "height": 110,
        "title": "保留父模型并继续采集",
        "hint": "保存未发布候选与失败证据",
        "detail": "未通过门槛时保持当前发布模型，保存候选和评测记录。可以继续采集更多成功数据，再开始下一轮训练。",
        "files": [
          "src/embodied_rsi/workflow.py"
        ],
        "kind": "reject"
      }
    ],
    "edges": [
      {
        "points": [
          [
            352,
            160
          ],
          [
            432,
            160
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            732,
            160
          ],
          [
            812,
            160
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            962,
            215
          ],
          [
            962,
            295
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            812,
            350
          ],
          [
            732,
            350
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            432,
            350
          ],
          [
            352,
            350
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            202,
            405
          ],
          [
            202,
            485
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            352,
            540
          ],
          [
            432,
            540
          ]
        ],
        "label": "有效",
        "at": [
          392,
          524
        ],
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            732,
            540
          ],
          [
            812,
            540
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            202,
            595
          ],
          [
            202,
            685
          ]
        ],
        "label": "错误 / 暂停",
        "at": [
          270,
          640
        ],
        "kind": "reject",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            1112,
            540
          ],
          [
            1155,
            540
          ],
          [
            1155,
            160
          ],
          [
            1112,
            160
          ]
        ],
        "label": "继续下一步",
        "at": [
          1143,
          350
        ],
        "kind": "feedback",
        "rotate": -90,
        "both": false
      },
      {
        "points": [
          [
            962,
            595
          ],
          [
            962,
            685
          ]
        ],
        "label": "局结束",
        "at": [
          1028,
          641
        ],
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            812,
            740
          ],
          [
            732,
            740
          ]
        ],
        "label": "",
        "at": null,
        "kind": "record",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            352,
            740
          ],
          [
            432,
            740
          ]
        ],
        "label": "",
        "at": null,
        "kind": "record",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            582,
            795
          ],
          [
            582,
            844
          ],
          [
            202,
            844
          ],
          [
            202,
            920
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            352,
            975
          ],
          [
            432,
            975
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            732,
            975
          ],
          [
            812,
            975
          ]
        ],
        "label": "接纳",
        "at": [
          772,
          959
        ],
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            432,
            1002
          ],
          [
            392,
            1002
          ],
          [
            392,
            768
          ],
          [
            352,
            768
          ]
        ],
        "label": "排除",
        "at": [
          380,
          887
        ],
        "kind": "reject",
        "rotate": -90,
        "both": false
      },
      {
        "points": [
          [
            962,
            1030
          ],
          [
            962,
            1110
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            812,
            1165
          ],
          [
            732,
            1165
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            432,
            1165
          ],
          [
            352,
            1165
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            202,
            1220
          ],
          [
            202,
            1300
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            352,
            1355
          ],
          [
            432,
            1355
          ]
        ],
        "label": "通过",
        "at": [
          392,
          1339
        ],
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            732,
            1355
          ],
          [
            812,
            1355
          ]
        ],
        "label": "",
        "at": null,
        "kind": "flow",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            202,
            1410
          ],
          [
            202,
            1480
          ]
        ],
        "label": "未通过",
        "at": [
          261,
          1445
        ],
        "kind": "reject",
        "rotate": 0,
        "both": false
      },
      {
        "points": [
          [
            1112,
            1355
          ],
          [
            1182,
            1355
          ],
          [
            1182,
            32
          ],
          [
            582,
            32
          ],
          [
            582,
            105
          ]
        ],
        "label": "下一局加载新 checkpoint",
        "at": [
          854,
          24
        ],
        "kind": "feedback",
        "rotate": 0,
        "both": false
      }
    ]
  }
];
