# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在处理本仓库代码时提供指导。

## 项目概述

**micro-gravity** 是一个基于**福格行为模型（B=MAP）**的智能习惯管理系统：
- **M（Motivation）**：AI 驱动的动机诊断与个性化激励
- **A（Ability）**：智能任务拆解与难度动态调整
- **P（Prompt）**：情境感知的智能触发系统

当前开发版本：**v1.5 增强版**

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（使用 Turbopack）

# 构建与生产
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器
pnpm preview          # 构建并启动（组合命令）

# 代码质量
pnpm check            # 运行 lint + 类型检查
pnpm lint             # 仅运行 ESLint
pnpm lint:fix         # ESLint 自动修复
pnpm typecheck        # 仅 TypeScript 类型检查
pnpm format:check     # Prettier 格式检查
pnpm format:write     # Prettier 格式修复

# 数据库
pnpm db:generate      # 创建新迁移（prisma migrate dev）
pnpm db:migrate       # 应用迁移（prisma migrate deploy）
pnpm db:push          # 推送 schema（不创建迁移）
pnpm db:studio        # 打开 Prisma Studio
```

## 技术栈

```
Frontend
├── Next.js 15 (App Router + Turbopack)
├── React 19 + TypeScript
├── Tailwind CSS v4 + shadcn/ui
├── @ai-sdk/react (useChat hook)
└── Recharts (数据可视化)

Backend
├── tRPC v11 (类型安全API)
├── Vercel AI SDK (ai package)
├── Prisma ORM (客户端生成至 generated/prisma/)
├── PostgreSQL
├── NextAuth.js v5 (认证)
└── Zod (Schema验证)

Infrastructure
├── Vercel (部署)
└── PostgreSQL (数据库)
```

## 项目结构

```
src/
├── app/                          # Next.js App Router
│   ├── _components/              # 页面组件
│   │   ├── analytics/            # 分析组件（热力图、情绪图表等）
│   │   ├── reports/              # 报告组件（周报、月报、里程碑）
│   │   └── break-habit/          # 坏习惯戒除组件
│   ├── api/
│   │   ├── chat/route.ts         # AI 对话流式端点
│   │   └── cron/                 # Vercel Cron Jobs
│   └── ...
├── server/
│   └── api/
│       ├── routers/              # tRPC 路由
│       │   ├── chat.ts           # AI 对话
│       │   ├── habit.ts          # 习惯 CRUD
│       │   ├── log.ts            # 打卡记录
│       │   ├── report.ts         # 周期报告
│       │   ├── analytics.ts      # 进阶分析
│       │   └── milestone.ts      # 里程碑管理
│       ├── root.ts               # 路由注册
│       └── trpc.ts               # tRPC 上下文和过程
├── lib/
│   ├── ai/
│   │   ├── prompts.ts            # 系统提示词
│   │   ├── reminder.ts           # 提醒生成
│   │   ├── motivation.ts         # 动机维护
│   │   ├── ability.ts            # 任务拆解
│   │   ├── break-habit.ts        # 坏习惯分析
│   │   ├── insights.ts           # 数据洞察
│   │   ├── analytics.ts          # 进阶分析
│   │   └── report.ts             # 报告生成
│   └── types.ts                  # 类型定义（Zod schemas）
├── trpc/                         # 客户端 tRPC 设置
└── styles/                       # 全局样式
```

## AI SDK 使用规范（v6 最新版）

### 模型配置

使用 Vercel AI Gateway 统一管理模型访问，直接使用字符串格式指定模型：

```typescript
// 直接在调用时指定模型，无需单独配置文件
model: 'openai/gpt-4o'
// 或其他模型
model: 'anthropic/claude-sonnet-4-20250514'
```

### 核心 API 模式

**1. streamText - 对话流式响应（API Route）**
```typescript
// app/api/chat/route.ts
import { streamText, convertToModelMessages, UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'openai/gpt-4o',
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

**2. useChat - 前端对话 Hook**
```typescript
'use client';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export function ChatComponent() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  // 发送消息
  sendMessage({ text: input });

  // 渲染消息（使用 parts）
  {messages.map(m => (
    <div key={m.id}>
      {m.parts.map((part, i) => {
        if (part.type === 'text') return <p key={i}>{part.text}</p>;
        if (part.type === 'tool-invocation') return <div key={i}>工具调用: {part.toolName}</div>;
        return null;
      })}
    </div>
  ))}
}
```

**3. generateObject - 结构化输出**
```typescript
import { generateObject } from 'ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: 'openai/gpt-4o',
  system: 'System prompt',
  prompt: 'User prompt',
  schema: z.object({
    field1: z.string(),
    field2: z.number(),
  }),
});
```

**4. tool - 工具定义**
```typescript
import { tool } from 'ai';
import { z } from 'zod';

const myTool = tool({
  description: '工具描述',
  inputSchema: z.object({
    param: z.string().describe('参数描述'),
  }),
  execute: async ({ param }) => {
    // 执行逻辑
    return result;
  },
});
```

**5. 多步骤调用（Agent 模式）**
```typescript
import { streamText, stepCountIs } from 'ai';

const result = streamText({
  model: 'openai/gpt-4o',
  messages: convertToModelMessages(messages),
  tools: { /* ... */ },
  stopWhen: stepCountIs(5), // 最多 5 步
});
```

### AI 流式响应注意事项

- AI 流式响应需要配合 Next.js API Route 使用（`/api/chat`）
- tRPC 主要处理习惯 CRUD 等标准操作
- 使用 `convertToModelMessages()` 转换 UI 消息格式
- 使用 `toUIMessageStreamResponse()` 返回流式响应

## tRPC 规范

- 使用 `publicProcedure` 处理无需认证的端点
- 使用 `protectedProcedure` 处理需要认证的端点（确保 `ctx.session.user` 存在）
- 新路由必须在 `src/server/api/root.ts` 的 `appRouter` 中注册
- 服务端调用使用 `root.ts` 中的 `createCaller`
- tRPC 相关类型应通过 tRPC 导出获取，不要重新定义类型

## 类型定义

所有业务类型定义在 `src/lib/types.ts`，使用 Zod schema：

- `habitConfigSchema` - 完整习惯配置
- `motivationSchema` - 动机配置 (MAP-M)
- `abilitySchema` - 能力配置 (MAP-A)
- `promptSchema` - 提示配置 (MAP-P)
- `reminderContextSchema` - 提醒上下文
- `triggerRecordSchema` - 触发记录（坏习惯）
- `reportSummarySchema` - 报告摘要
- `phaseConfigSchema` - 渐进式阶段配置

## 数据库模型

核心模型（详见 `prisma/schema.prisma`）：

| 模型 | 用途 |
|-----|------|
| `User` | 用户，含动机画像 |
| `Habit` | 习惯，含 MAP 模型数据 |
| `HabitLog` | 打卡记录 |
| `Conversation` | AI 对话历史 |
| `Report` | 周期报告（v1.5） |
| `Milestone` | 里程碑成就（v1.5） |
| `AnalyticsSnapshot` | 分析缓存（v1.5） |

## 环境变量

```env
# AI Gateway（Vercel AI Gateway 统一 API Key）
AI_GATEWAY_API_KEY=your-api-key

# 数据库
DATABASE_URL=postgresql://postgres:123789@localhost:5432/micro_gravity

# NextAuth.js v5
AUTH_SECRET=your-auth-secret
AUTH_DISCORD_ID=your-discord-client-id
AUTH_DISCORD_SECRET=your-discord-client-secret
```

## 功能模块

| 模块 | 描述 | 版本 |
|-----|------|------|
| AI 对话式习惯配置 | 对话引导创建习惯 | v1.0 |
| 智能提醒系统 | 个性化提醒文案生成 | v1.0 |
| 动机维护引擎 | 动机波动检测与激励 | v1.5 |
| 能力评估与任务拆解 | 微习惯设计 | v1.0 |
| 坏习惯戒除系统 | 触发模式分析与复发管理 | v1.5 |
| AI 教练对话 | 多场景对话支持 | v1.0 |
| 数据洞察 | 模式识别与建议 | v1.0 |
| 周期报告系统 | 周报/月报/里程碑报告 | v1.5 |
| 进阶分析系统 | 热力图、情绪分析、风险预测 | v1.5 |

## 外部文档

- **Vercel AI SDK**: 如需访问 Vercel AI SDK 文档，请参见项目根目录下的 `llms.txt` 文件
- **产品需求文档**: 详见 `习惯养成Web应用PRD.md`
