# Micro-Gravity

面向 AI 的习惯养成 Web 应用，融合福格行为模型与个性化分析、排障、提醒等能力。Micro-Gravity 通过 Habit Doctor、Focus Map、Break Habit 分析以及庆祝优先的报告，帮助用户设计、执行并持久维持习惯。

---

## 目录

1. [核心特性](#核心特性)  
2. [架构总览](#架构总览)  
3. [目录结构](#目录结构)  
4. [快速开始](#快速开始)  
5. [开发脚本](#开发脚本)  
6. [环境变量](#环境变量)  
7. [项目文档](#项目文档)  
8. [贡献指南](#贡献指南)  
9. [License](#license)

---

## 核心特性

- **Habit Doctor**：AI 生成结构化诊断报告，按 Prompt/Ability/Motivation 排查问题并即时输出处方。
- **Focus Map & Behavior Cluster**：将愿望拆解为高杠杆行为，自动生成 Starter Step、缩小版行为和习惯配方。
- **Break Habit 工具集**：分析触发模式、复发风险与环境因素，并给出可执行的干预建议。
- **Analytics & Insights Hub**：时间热力图、情绪关联、习惯关联、风险预警和 Quick Insights 汇总成仪表盘。
- **庆祝优先的报告**：周报、月报、里程碑报告强调情感强化与迷你胜利。
- **Smart Reminders**：依据动机状态自动生成 Signal / Facilitator / Spark 提醒文案。
- **多语言 PRD**：`docs/` 中保存详细的中文产品文档、计划与整合方案，便于跨团队协作。

---

## 架构总览

| 层级 | 说明 |
| ---- | ---- |
| **App/UI** | 基于 Next.js App Router + shadcn/ui，核心页面包括习惯详情、分析仪表盘、Routine 设计器、习惯创建向导等。 |
| **APIs** | tRPC 路由位于 `src/server/api/routers`，各 AI 模块暴露强类型接口并在 Session 保护下运行。 |
| **AI Modules** | `src/lib/ai/**` 中的模块统一通过 AI SDK 的 `generateObject` + Zod Schema 输出结构化结果。 |
| **Persistence** | Prisma + 数据库（见 `prisma/schema.prisma`），存储习惯、日志、愿望、Routine、提醒等实体。 |
| **Automation** | `src/app/api/cron/*` 中的计划任务负责周报、月报及里程碑推送。 |

---

## 目录结构

```
micro-gravity/
├── docs/               # 所有 Markdown 文档（PRD、计划、参考等）
├── prisma/             # Prisma schema / migrations / seed
├── src/
│   ├── app/            # Next.js App Router 页面
│   ├── components/     # UI 组件与业务组件（habit doctor、break-habit 等）
│   ├── lib/
│   │   ├── ai/         # 各类 AI 模块（analytics、reminders、focus-map...）
│   │   ├── troubleshoot/
│   │   └── types.ts    # 共享 Zod schema 与类型
│   └── server/
│       └── api/routers # tRPC 路由
├── package.json / pnpm-lock.yaml
└── README.md
```

---

## 快速开始

### 前置条件

- **Node.js** ≥ 18  
- **pnpm** ≥ 9（推荐包管理器）  
- 拥有所需 AI 服务（OpenAI、DeepSeek 等）的 API Key 以及数据库连接。

### 安装

```bash
pnpm install
```

### 初始化数据库

```bash
pnpm prisma migrate dev
pnpm prisma db seed   # 可选：导入示例数据
```

### 启动开发服务器

```bash
pnpm dev
```

浏览器访问 `http://localhost:3000`。

---

## 开发脚本

| 命令 | 说明 |
| ---- | ---- |
| `pnpm dev` | 启动 Next.js 开发服务器 |
| `pnpm build` | 生产构建 |
| `pnpm start` | 运行生产服务器 |
| `pnpm lint` | 运行 ESLint |
| `pnpm prisma migrate dev` | 应用本地数据库迁移 |
| `pnpm prisma studio` | 打开 Prisma Studio |

---

## 环境变量

复制 `.env.example` 为 `.env` 并配置：

| 变量 | 说明 |
| ---- | ---- |
| `DATABASE_URL` | 数据库连接字符串 |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | Auth 相关配置 |
| `OPENAI_API_KEY` / 其它模型提供商 | AI SDK 访问密钥 |
| `AI_SDK_TELEMETRY_*` | 可选的遥测配置 |

更多服务端配置请参考代码注释及 `docs/` 文档。

---

## 项目文档

所有 Markdown 文档已归档至 [`docs/`](docs/)：

| 文件 | 简介 |
| ---- | ---- |
| `README.md`（旧版） | 早期项目说明 |
| `INTEGRATION-PLAN.md` | 集成计划与状态 |
| `generate-object-usage.md` | `generateObject` 使用清单与触达状态 |
| `习惯养成Web应用PRD.md` | 中文 PRD |
| `福格行为模型.md` | 福格模型参考 |
| `迭代计划.md`、`BUG-REPORT.md`、`CLAUDE.md` | 迭代计划、缺陷记录、助手配置等 |

建议先阅读 `INTEGRATION-PLAN.md` 了解路线图，再结合 `generate-object-usage.md` 掌握 AI 模块依赖。

---

## 贡献指南

1. Fork & Clone 本仓库  
2. 创建功能分支：`git checkout -b feat/awesome-idea`  
3. 使用 Conventional Commit 风格提交  
4. 确保 `pnpm lint`（及相关测试）通过  
5. 发起 Pull Request，并引用相关文档/议题

---

## License

本项目为内部产品开发所用，未开放公共授权，如有合作或授权需求请联系维护者。

---

祝你习惯养成顺利！✨
