<div align="center">

# 🌍 Micro-Gravity

**基于福格行为模型的智能习惯养成系统**

*情绪创造习惯，庆祝是习惯养成的肥料*

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vercel AI SDK](https://img.shields.io/badge/AI_SDK-v6-orange)](https://sdk.vercel.ai/)
[![License](https://img.shields.io/badge/License-Private-red)]()

[功能特性](#-核心特性) • [快速开始](#-快速开始) • [技术栈](#-技术栈) • [文档](#-文档导航) • [路线图](#-版本路线图)

</div>

---

## 📖 项目简介

**Micro-Gravity** 是一个融合 AI 技术与行为科学的现代化习惯管理系统，基于斯坦福大学 BJ Fogg 教授的**福格行为模型（B=MAP）**构建。

### 什么是 MAP 模型？

| 要素 | 含义 | 系统实现 |
|:---:|------|---------|
| **M** | Motivation（动机） | AI 动机诊断、个性化激励、情绪追踪 |
| **A** | Ability（能力） | 微习惯设计、难度动态调整、渐进式挑战 |
| **P** | Prompt（提示） | 锚点习惯、情境触发、智能提醒 |

**核心理念**：
- 习惯养成不是靠意志力，而是靠**设计**
- 从**极小**的行为开始，让成功成为必然
- **庆祝**每一次完成，用情绪强化神经回路

> 详细理论请阅读：[`docs/福格行为模型.md`](docs/福格行为模型.md)

---

## ✨ 核心特性

### 🤖 AI 赋能

- **智能习惯医生（Habit Doctor）**
  按 MAP 模型自动诊断习惯停滞原因，生成结构化处方

- **愿望拆解系统（Focus Map）**
  将宏大目标转化为高杠杆行为，自动设计 Starter Step 和习惯配方

- **戒除习惯分析（Break Habit Analyzer）**
  识别触发模式、复发风险，提供基于环境改造的干预建议

- **数据洞察引擎（Insights Hub）**
  时间热力图、情绪关联、习惯关联、风险预警自动生成

### 🎯 习惯管理

- **多类型习惯支持**
  好习惯养成、坏习惯戒除、例行事务管理（Routine）

- **渐进式挑战系统**
  从微习惯开始，分阶段自动升级难度

- **智能提醒（Smart Reminders）**
  根据动机状态生成 Signal / Facilitator / Spark 三类提醒文案

- **习惯繁殖系统**
  一键复制成功习惯模板，加速习惯生态构建

### 📊 数据分析

- **多维度可视化**
  打卡热力图、连续打卡统计、情绪趋势、时段分布

- **周期性报告**
  强调庆祝与迷你胜利的周报、月报、里程碑报告

- **进阶分析面板**
  习惯互相影响分析、最佳打卡时段推荐、停滞风险预警

### 🎉 庆祝系统（v2.0）

- **即时庆祝动画**
  打卡完成时的彩带特效、音效反馈

- **成就徽章体系**
  里程碑徽章、连续打卡徽章、完美一周徽章

- **情绪强化引擎**
  AI 生成个性化庆祝文案，放大积极情绪

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0
- **pnpm** >= 9.0（推荐）
- **PostgreSQL** >= 14
- **AI API Key**（OpenAI / DeepSeek 等）

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/your-org/micro-gravity.git
cd micro-gravity

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env，填写以下关键配置：
# - DATABASE_URL（PostgreSQL 连接字符串）
# - AI_GATEWAY_API_KEY（Vercel AI Gateway 密钥）
# - AUTH_SECRET（运行 openssl rand -base64 32 生成）
# - AUTH_DISCORD_ID / AUTH_DISCORD_SECRET（Discord OAuth）

# 4. 初始化数据库
pnpm db:push              # 推送 schema 到数据库
pnpm db:studio            # （可选）打开 Prisma Studio 查看数据

# 5. 启动开发服务器
pnpm dev

# 6. 访问应用
# 浏览器打开 http://localhost:3000
```

### Docker 快速启动（可选）

```bash
# 启动 PostgreSQL（如果本地没有）
./start-database.sh

# 或使用 Docker Compose
docker-compose up -d
```

---

## 🛠️ 技术栈

### 核心框架

| 技术 | 版本 | 用途 |
|------|:----:|------|
| [Next.js](https://nextjs.org/) | 15.2 | React 全栈框架（App Router + Turbopack） |
| [React](https://react.dev/) | 19 | UI 框架（服务端组件优先） |
| [TypeScript](https://www.typescriptlang.org/) | 5.8 | 类型安全 |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | 原子化 CSS 框架 |

### AI 与 API

| 技术 | 版本 | 用途 |
|------|:----:|------|
| [Vercel AI SDK](https://sdk.vercel.ai/) | v6 (beta) | AI 对话、结构化输出、工具调用 |
| [tRPC](https://trpc.io/) | 11 | 类型安全的 API 层 |
| [Zod](https://zod.dev/) | 3.24 | Schema 验证与类型推断 |

### 数据与认证

| 技术 | 版本 | 用途 |
|------|:----:|------|
| [Prisma](https://www.prisma.io/) | 6.6 | ORM 与数据库迁移 |
| [PostgreSQL](https://www.postgresql.org/) | 14+ | 关系型数据库 |
| [NextAuth.js](https://next-auth.js.org/) | v5 (beta) | 身份认证（OAuth + Session） |

### UI 组件与可视化

| 技术 | 版本 | 用途 |
|------|:----:|------|
| [shadcn/ui](https://ui.shadcn.com/) | latest | 可定制化组件库 |
| [Recharts](https://recharts.org/) | 3.5 | 数据可视化图表 |
| [Framer Motion](https://www.framer.com/motion/) | 12 | 动画与交互 |
| [Lucide Icons](https://lucide.dev/) | latest | 图标库 |

---

## 📁 项目结构

```
micro-gravity/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (app)/                # 认证后页面
│   │   │   ├── dashboard/        # 仪表盘
│   │   │   ├── habits/           # 习惯管理
│   │   │   ├── analytics/        # 数据分析
│   │   │   ├── coach/            # AI 教练
│   │   │   └── aspirations/      # 愿望与目标
│   │   ├── (auth)/               # 认证页面
│   │   └── api/
│   │       ├── chat/             # AI 对话端点（流式）
│   │       ├── trpc/             # tRPC 端点
│   │       └── cron/             # 定时任务
│   │
│   ├── components/               # React 组件
│   │   ├── ui/                   # shadcn/ui 基础组件
│   │   ├── layout/               # 布局组件
│   │   ├── charts/               # 图表封装
│   │   └── break-habit/          # 坏习惯专用组件
│   │
│   ├── server/api/               # tRPC 服务端
│   │   ├── routers/              # 业务路由
│   │   │   ├── habit.ts          # 习惯 CRUD
│   │   │   ├── log.ts            # 打卡记录
│   │   │   ├── analytics.ts      # 数据分析
│   │   │   ├── insights.ts       # 数据洞察
│   │   │   └── aspiration.ts     # 愿望管理
│   │   ├── root.ts               # 路由注册
│   │   └── trpc.ts               # tRPC 配置
│   │
│   ├── lib/
│   │   ├── ai/                   # AI 功能模块
│   │   │   ├── prompts.ts        # 系统提示词
│   │   │   ├── model.ts          # 模型配置
│   │   │   ├── motivation.ts     # 动机维护（M）
│   │   │   ├── ability.ts        # 任务拆解（A）
│   │   │   ├── focus-map.ts      # 愿望拆解
│   │   │   ├── break-habit.ts    # 戒除分析
│   │   │   └── insights.ts       # 洞察生成
│   │   ├── auth.ts               # NextAuth 配置
│   │   ├── db.ts                 # Prisma 客户端
│   │   ├── types.ts              # Zod schemas
│   │   └── utils.ts              # 工具函数
│   │
│   └── trpc/                     # tRPC 客户端
│       ├── server.ts             # 服务端调用
│       └── client.tsx            # 客户端 Provider
│
├── prisma/
│   ├── schema.prisma             # 数据库模型定义
│   └── migrations/               # 数据库迁移文件
│
├── docs/                         # 项目文档
│   ├── DEVELOPER-GUIDE.md        # 开发者入门指南 ⭐
│   ├── 福格行为模型.md            # 理论基础
│   ├── 迭代计划.md                # v2.0 开发计划
│   ├── 习惯养成Web应用PRD.md      # 产品需求文档
│   └── INTEGRATION-PLAN.md       # 集成计划
│
├── .claude/                      # Claude Code 配置
│   └── commands/                 # 自定义 Slash 命令
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md                     # 本文件
```

> 💡 **新手开发者**：请先阅读 [`docs/DEVELOPER-GUIDE.md`](docs/DEVELOPER-GUIDE.md)，30 分钟快速上手开发！

---

## 🎯 核心功能模块

### 1. 习惯创建向导（Habit Creation Wizard）

使用 AI 辅助的多步骤向导，自动生成符合 MAP 模型的习惯配置：

```typescript
// 前端调用示例
const createHabit = trpc.habit.create.useMutation();

await createHabit.mutate({
  name: "每天喝8杯水",
  type: "POSITIVE",
  motivation: {
    level: "HIGH",
    whyImportant: "保持身体健康",
  },
  ability: {
    difficulty: "VERY_EASY",
    timeRequired: 5,
  },
  prompt: {
    anchorHabit: "吃完早餐后",
    location: "厨房",
  },
});
```

### 2. AI 教练对话（Coach Chat）

实时流式对话，支持动机维护、习惯排障、情绪支持：

```typescript
// 使用 Vercel AI SDK v6
import { useChat } from '@ai-sdk/react';

const { messages, sendMessage } = useChat({
  api: '/api/chat',
});
```

### 3. 数据洞察生成（Insights Generation）

AI 自动分析打卡数据，生成结构化洞察：

```typescript
// AI 结构化输出示例
const insights = await trpc.insights.generate.mutate({
  habitId: "xxx",
  timeRange: "last_30_days",
});

// 返回类型（Zod 验证）
type Insights = {
  bestTimeSlot: string;         // "早上 7-9 点"
  emotionPattern: string;        // "周一情绪最低"
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  suggestions: string[];
};
```

### 4. 习惯繁殖系统（Habit Proliferation）

复制成功习惯的 MAP 配置，快速创建相似习惯：

```typescript
const proliferate = trpc.proliferation.create.useMutation();

await proliferate.mutate({
  sourceHabitId: "xxx",
  newHabitName: "每天喝果汁",
  adjustments: {
    timeRequired: 3,  // 调整时长
  },
});
```

---

## 📚 文档导航

### 快速入门

- [**开发者指南**](docs/DEVELOPER-GUIDE.md) - 30 分钟上手开发（必读）
- [快速开始](#-快速开始) - 环境搭建与运行
- [项目结构](#-项目结构) - 目录结构说明

### 产品与设计

- [产品需求文档](docs/习惯养成Web应用PRD.md) - 完整的功能需求
- [福格行为模型](docs/福格行为模型.md) - 理论基础与应用
- [迭代计划](docs/迭代计划.md) - v2.0 开发路线图

### 技术文档

- [集成计划](docs/INTEGRATION-PLAN.md) - AI 模块集成状态
- [AI SDK 使用指南](docs/generate-object-usage.md) - `generateObject` 清单
- [Bug 记录](docs/BUG-REPORT.md) - 已知问题与修复

### API 文档

- [tRPC API 参考](src/server/api/routers/) - 查看各路由源码
- [类型定义](src/lib/types.ts) - Zod schemas 与 TypeScript 类型
- [AI 模块](src/lib/ai/) - AI 功能实现细节

---

## 🗓️ 版本路线图

### ✅ v1.5（已完成）

- [x] 基础习惯 CRUD
- [x] 打卡系统与连续记录
- [x] AI 教练对话
- [x] 数据分析仪表盘
- [x] 周期性报告（周报/月报）
- [x] 智能提醒系统
- [x] 坏习惯戒除工具

### 🚧 v2.0（开发中 - 福格对齐增强版）

| 阶段 | 功能 | 状态 |
|------|------|:----:|
| Phase 1 | 庆祝系统（ABC 中的 C） | ✅ 已完成 |
| Phase 2 | 习惯创建流程重构 | ✅ 已完成 |
| Phase 3 | 提示系统升级（锚点习惯） | 🚧 进行中 |
| Phase 4 | 戒除流程标准化 | 📋 规划中 |
| Phase 5 | 体验简化与优化 | 📋 规划中 |
| Phase 7 | 习惯进阶系统（渐进式挑战） | ✅ 已完成 |
| Phase 8 | 成就徽章系统 | 📋 规划中 |

详细计划请查看：[`docs/迭代计划.md`](docs/迭代计划.md)

### 🔮 v3.0（未来计划）

- [ ] 社区功能（习惯分享、挑战）
- [ ] 多设备同步
- [ ] 移动端 App
- [ ] 习惯市场（模板交易）
- [ ] 团队习惯管理

---

## 🛠️ 开发指南

### 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（Turbopack）
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器

# 代码质量
pnpm check            # lint + 类型检查
pnpm lint             # ESLint 检查
pnpm lint:fix         # ESLint 自动修复
pnpm typecheck        # TypeScript 类型检查
pnpm format:write     # Prettier 格式化

# 数据库
pnpm db:generate      # 创建迁移（prisma migrate dev）
pnpm db:push          # 推送 schema（不创建迁移）
pnpm db:studio        # Prisma Studio 可视化工具
```

### 添加新功能的标准流程

1. **定义数据模型**：编辑 `prisma/schema.prisma`
2. **更新数据库**：运行 `pnpm db:push`
3. **定义类型**：在 `src/lib/types.ts` 中添加 Zod schema
4. **创建 tRPC 路由**：在 `src/server/api/routers/` 中创建路由
5. **注册路由**：在 `src/server/api/root.ts` 中注册
6. **创建 UI 组件**：在 `src/components/` 中实现
7. **集成到页面**：在 `src/app/(app)/` 中使用

详细教程请阅读：[`docs/DEVELOPER-GUIDE.md`](docs/DEVELOPER-GUIDE.md)

### 代码规范

- **组件命名**：PascalCase（如 `HabitCard`）
- **文件命名**：kebab-case（如 `habit-card.tsx`）
- **函数命名**：camelCase（如 `generateSummary`）
- **常量命名**：UPPER_SNAKE_CASE（如 `MAX_HABITS`）

**提交规范**（Conventional Commits）：
```bash
feat(habit): 添加标签功能
fix(ai): 修复提示词生成错误
docs: 更新开发者指南
style: 格式化代码
refactor: 重构习惯创建流程
test: 添加单元测试
chore: 更新依赖
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📖 改进文档
- 🔧 提交代码修复

### 贡献流程

1. **Fork** 本仓库
2. **Clone** 到本地：`git clone https://github.com/your-username/micro-gravity.git`
3. 创建功能分支：`git checkout -b feat/awesome-feature`
4. 提交更改：`git commit -m "feat: add awesome feature"`
5. 推送到分支：`git push origin feat/awesome-feature`
6. 发起 **Pull Request**

### 开发前准备

- 阅读 [`docs/DEVELOPER-GUIDE.md`](docs/DEVELOPER-GUIDE.md)
- 了解 [福格行为模型](docs/福格行为模型.md)
- 查看 [迭代计划](docs/迭代计划.md) 了解当前开发重点
- 确保 `pnpm check` 通过

### 代码审查标准

- ✅ 遵循项目代码规范
- ✅ 包含必要的类型定义（TypeScript）
- ✅ 通过 ESLint 和 TypeScript 检查
- ✅ 包含清晰的提交信息
- ✅ 更新相关文档

---

## 🙏 致谢

### 理论基础

- **BJ Fogg** - 福格行为模型创始人
- **Tiny Habits** - 微习惯理论

### 技术支持

- [Vercel](https://vercel.com/) - Next.js 与 AI SDK
- [Theo Browne](https://twitter.com/t3dotgg) - T3 Stack 创始人
- [shadcn](https://twitter.com/shadcn) - shadcn/ui 作者

### 开源项目

本项目站在以下优秀开源项目的肩膀上：
- Next.js, React, TypeScript
- tRPC, Prisma, Zod
- Tailwind CSS, Radix UI
- Vercel AI SDK

---

## 📄 许可证

本项目为**私有项目**，仅供内部开发使用，未对外授权。

如有合作或授权需求，请联系项目维护者。

---

## 📧 联系方式

- **Issues**：[GitHub Issues](https://github.com/your-org/micro-gravity/issues)
- **Discussions**：[GitHub Discussions](https://github.com/your-org/micro-gravity/discussions)
- **Email**：contact@micro-gravity.dev

---

<div align="center">

**用 AI 与行为科学，让习惯养成变得简单而持久**

Made with ❤️ by Micro-Gravity Team

⭐ 如果这个项目对你有帮助，请给我们一个 Star！

</div>
