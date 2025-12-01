# CLAUDE.md

本文件为 Claude Code 在处理本仓库时提供项目指导。

## 项目概述

**micro-gravity** 是一个基于**福格行为模型（B=MAP）**的智能习惯管理系统。

核心理念：**"情绪创造习惯，庆祝是习惯养成的肥料"**

### MAP 模型

| 要素 | 含义 | 系统实现 |
|------|------|---------|
| **M** (Motivation) | 动机 | AI 动机诊断与个性化激励 |
| **A** (Ability) | 能力 | 微习惯设计与难度动态调整 |
| **P** (Prompt) | 提示 | 锚点习惯与情境触发系统 |

**当前版本**：v1.5 已完成，v2.0 开发中（福格对齐增强版）

## 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器（Turbopack）

# 构建
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器

# 代码质量
pnpm check            # lint + 类型检查
pnpm lint             # ESLint
pnpm lint:fix         # ESLint 自动修复
pnpm typecheck        # TypeScript 类型检查
pnpm format:write     # Prettier 格式化

# 数据库
pnpm db:generate      # 创建迁移（prisma migrate dev）
pnpm db:push          # 推送 schema（不创建迁移）
pnpm db:studio        # Prisma Studio
```

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router + Turbopack) |
| 前端 | React 19, TypeScript, Tailwind CSS v4, shadcn/ui |
| AI | Vercel AI SDK v6 (ai@beta), @ai-sdk/react |
| API | tRPC v11 |
| 数据库 | Prisma ORM, PostgreSQL |
| 认证 | NextAuth.js v5 |
| 可视化 | Recharts |

## 项目结构

```
src/
├── app/
│   ├── (app)/                    # 认证后页面
│   │   ├── dashboard/            # 仪表盘
│   │   ├── habits/               # 习惯管理
│   │   │   ├── page.tsx          # 习惯列表
│   │   │   ├── new/page.tsx      # 创建习惯
│   │   │   └── [id]/             # 习惯详情
│   │   ├── analytics/            # 数据分析
│   │   ├── coach/                # AI 教练
│   │   ├── reports/              # 报告中心
│   │   └── settings/             # 设置
│   ├── (auth)/                   # 认证页面
│   └── api/
│       ├── chat/route.ts         # AI 对话端点
│       └── cron/                 # 定时任务
├── components/
│   ├── ui/                       # shadcn/ui 组件
│   ├── layout/                   # 布局组件
│   ├── charts/                   # Recharts 图表组件
│   └── break-habit/              # 坏习惯戒除组件
├── server/api/
│   ├── routers/                  # tRPC 路由
│   │   ├── habit.ts              # 习惯 CRUD
│   │   ├── log.ts                # 打卡记录
│   │   ├── report.ts             # 周期报告
│   │   ├── analytics.ts          # 进阶分析
│   │   ├── insights.ts           # 数据洞察
│   │   └── reminder.ts           # 提醒
│   ├── root.ts                   # 路由注册
│   └── trpc.ts                   # tRPC 配置
├── lib/
│   ├── ai/                       # AI 功能模块
│   │   ├── prompts.ts            # 系统提示词
│   │   ├── model.ts              # 模型配置
│   │   ├── reminder.ts           # 提醒生成
│   │   ├── motivation.ts         # 动机维护
│   │   ├── ability.ts            # 任务拆解
│   │   ├── break-habit.ts        # 坏习惯分析
│   │   ├── insights.ts           # 数据洞察
│   │   ├── analytics.ts          # 进阶分析
│   │   └── report.ts             # 报告生成
│   ├── types.ts                  # Zod schemas
│   └── utils.ts                  # 工具函数
└── trpc/                         # 客户端 tRPC
```

## AI SDK 使用规范（v6）

### 模型配置

AI SDK v6 使用 Vercel AI Gateway，支持直接使用字符串指定模型：

```typescript
// 直接使用字符串格式：provider/model-name
model: 'openai/gpt-4o'

// 环境变量配置
// .env
AI_GATEWAY_API_KEY=your-api-key
```

### 核心 API

**1. streamText - 流式对话**
```typescript
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

**2. useChat - 前端 Hook**
```typescript
'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export function ChatComponent() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      sendMessage({ text: input });
      setInput('');
    }}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
    </form>
  );
}
```

**3. generateObject - 结构化输出**
```typescript
import { generateObject } from 'ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: 'openai/gpt-4o',
  schema: z.object({
    suggestion: z.string(),
    confidence: z.number(),
  }),
  prompt: 'Generate a suggestion',
});
```

**4. tool - 工具定义**
```typescript
import { tool } from 'ai';
import { z } from 'zod';

const searchTool = tool({
  description: 'Search for information',
  inputSchema: z.object({
    query: z.string().describe('the search query'),
  }),
  execute: async ({ query }) => {
    return { results: [] };
  },
});
```

### 注意事项

- 流式响应使用 Next.js API Route（`/api/chat`）
- tRPC 用于习惯 CRUD 等标准操作
- AI 生成结构化数据用 `generateObject`

## tRPC 规范

```typescript
// 无需认证
export const publicProcedure = t.procedure;

// 需要认证
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { session: ctx.session } });
});
```

新路由必须在 `src/server/api/root.ts` 注册：

```typescript
export const appRouter = createTRPCRouter({
  habit: habitRouter,
  log: logRouter,
  // 新路由在此添加
});
```

## 数据库模型

核心模型（`prisma/schema.prisma`）：

| 模型 | 用途 |
|------|------|
| `User` | 用户，含动机画像 |
| `Habit` | 习惯（MAP 模型数据） |
| `HabitLog` | 打卡记录 |
| `Conversation` | AI 对话历史 |
| `Report` | 周期报告 |
| `Milestone` | 里程碑成就 |
| `AnalyticsSnapshot` | 分析缓存 |

**Prisma 客户端生成至** `generated/prisma/`

## 类型定义

所有业务类型在 `src/lib/types.ts`，使用 Zod schema：

- `motivationSchema` - 动机配置 (MAP-M)
- `abilitySchema` - 能力配置 (MAP-A)
- `promptSchema` - 提示配置 (MAP-P)
- `habitConfigSchema` - 完整习惯配置
- `phaseConfigSchema` - 渐进式阶段配置
- `triggerRecordSchema` - 触发记录（坏习惯）
- `reportSummarySchema` - 报告摘要

## 环境变量

```env
# AI (Vercel AI Gateway - 直接使用字符串模型格式)
AI_GATEWAY_API_KEY=your-vercel-ai-gateway-key

# 数据库
DATABASE_URL=postgresql://...

# NextAuth
AUTH_SECRET=
AUTH_DISCORD_ID=
AUTH_DISCORD_SECRET=
```

## v2.0 开发计划

详见 `迭代计划.md`，核心阶段：

1. **Phase 1**: 庆祝系统（ABC 中的 C）
2. **Phase 2**: 习惯创建流程重构
3. **Phase 3**: 提示系统升级（锚点习惯）
4. **Phase 4**: 戒除流程标准化
5. **Phase 5**: 体验简化与优化
6. **Phase 7**: 习惯进阶系统
7. **Phase 8**: 成就徽章系统

## 开发约定

1. **组件命名**：使用 PascalCase，文件名用 kebab-case
2. **服务端组件优先**：除非需要交互，否则使用 Server Component
3. **类型安全**：所有 API 输入输出使用 Zod 验证
4. **错误处理**：使用 tRPC 内置错误类型
5. **样式**：Tailwind CSS，避免内联样式对象

## 相关文档

- `迭代计划.md` - v2.0 详细开发计划
- `福格行为模型.md` - 福格理论笔记
- `习惯养成Web应用PRD.md` - 产品需求文档
