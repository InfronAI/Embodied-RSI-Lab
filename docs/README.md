# Project documentation / 项目文档

Start with the current guides below. The Web UI includes a bilingual Docs workspace at `/simulation#docs`, with interactive diagrams and source references.

| Guide | 内容 |
| --- | --- |
| [Project overview](../README.md) / [中文概览](../README.zh-CN.md) | Background, capabilities, learning loop, and scope |
| [Installation and running](INSTALLATION.md) | 后端、Web UI、RSI 安装与启动 |
| [Architecture and data flow](ARCHITECTURE.md) | 业务、系统和数据架构、模块与接口 |
| [Learning and reproduction](LEARNING_GUIDE.md) | 源码阅读、分阶段复现、证据检查 |
| [Configuration and data](CONFIGURATION.md) | 模型、相机、动作协议、密钥和实验目录 |
| [DGX Spark deployment](../deploy/spark/README.md) | GPU、渲染、systemd、反向代理与维护 |
| [Contributing](../CONTRIBUTING.md) | 开发、测试和提交约定 |
| [Security and publication](../SECURITY.md) | 敏感信息隔离、扫描和发布范围 |

## Detailed references

- [Execution and adapters](TECHNICAL_GUIDE.md), [planning](PLANNING.md), [vision](VISION.md), [extension points](EXTENDING.md).
- [Code-policy experiments](CODE_POLICY.md), [validation protocol](VALIDATION.md), [test plan](TEST_PLAN.md).
- [Benchmarks](BENCHMARKS.md), [comparisons](COMPARISON.md), [LIBERO](LIBERO_VISION.md), [optional gallery](../site/README.md).

Some detailed guides originated before integration and describe the standalone `embodied-jev` CLI or legacy port. Use the installation guide above for the unified application. Standalone commands remain available for specialized experiments.

## Origins and historical evidence

[embodied-jev](https://github.com/FBddcz/embodied-jev) and [embodied-rsi](https://github.com/gaohuan2020/embodied-rsi) are the original projects. Original READMEs are preserved under [origins/jev](origins/jev/README.md) and [origins/rsi](origins/rsi/README.md).

`docs/results/`, `docs/media/`, `docs/archive/`, and upstream READMEs are historical references. Their model versions, dates, seeds, success rates, and limits apply to those recorded experiments. They do not describe a fresh checkout's current model or guarantee a new outcome. Private runtime databases, current deployments, weights, and server configuration are not distributed.
