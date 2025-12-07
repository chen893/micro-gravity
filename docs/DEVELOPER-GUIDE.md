# Micro-Gravity 开发者快速入门指南

> 一份让你在 30 分钟内上手 Micro-Gravity 系统开发的实战指南

## 目录

- [核心概念](#核心概念)
- [快速启动](#快速启动)
- [技术架构](#技术架构)
- [项目结构](#项目结构)
- [核心功能模块](#核心功能模块)
- [开发工作流](#开发工作流)
- [常见开发任务](#常见开发任务)
- [调试与测试](#调试与测试)
- [疑难解答](#疑难解答)

---

## 核心概念

### 什么是 Micro-Gravity？

Micro-Gravity 是一个基于**福格行为模型（B=MAP）**的智能习惯管理系统。

**核心理念**："情绪创造习惯，庆祝是习惯养成的肥料"

### MAP 模型（必读）

理解 MAP 是开发本系统的基础：

| 要素 | 含义 | 系统实现 | 代码位置 |
|------|------|---------|----------|
| **M** (Motivation) | 动机 | AI 动机诊断与个性化激励 | `src/lib/ai/motivation.ts` |
| **A** (Ability) | 能力 | 微习惯设计与难度动态调整 | `src/lib/ai/ability.ts` |
| **P** (Prompt) | 提示 | 锚点习惯与情境触发系统 | `src/lib/ai/prompts.ts` |

**行为公式**：`行为 (Behavior) = 动机 (M) × 能力 (A) × 提示 (P)`

更多理论请阅读：`docs/福格行为模型.md`

---

## 快速启动

### 1. 环境准备

**必需软件**：
- Node.js >= 18
- pnpm >= 8
- PostgreSQL >= 14

**推荐工具**：
- VS Code + Prisma 插件
- Postman / Bruno（API 测试）

### 2. 项目初始化

```bash
# 1. 克隆项目
git clone <repo-url>
cd micro-gravity

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 填写以下关键配置：
# - DATABASE_URL（PostgreSQL 连接字符串）
# - AI_GATEWAY_API_KEY（Vercel AI Gateway 密钥）
# - AUTH_SECRET（NextAuth 密钥，可运行 openssl rand -base64 32 生成）

# 4. 初始化数据库
pnpm db:push              # 推送 schema 到数据库
pnpm db:studio            # 打开 Prisma Studio 查看数据

# 5. 启动开发服务器
pnpm dev                  # 访问 http://localhost:3000
```

### 3. 验证安装

访问 `http://localhost:3000`，你应该能看到登录页面。

**测试账号创建**：
1. 使用 Discord OAuth 登录（需配置 `AUTH_DISCORD_ID` 和 `AUTH_DISCORD_SECRET`）
2. 或在 Prisma Studio 中手动创建用户记录

---

## 技术架构

### 核心技术栈

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **框架** | Next.js | 15 | App Router + Turbopack |
| **前端** | React | 19 | 服务端组件优先 |
| **语言** | TypeScript | 5.x | 类型安全 |
| **样式** | Tailwind CSS | v4 | 原子化 CSS |
| **UI 组件** | shadcn/ui | - | 可定制组件库 |
| **AI** | Vercel AI SDK | v6 | 对话、结构化输出 |
| **API** | tRPC | v11 | 类型安全 API |
| **数据库** | Prisma + PostgreSQL | - | ORM + 关系型数据库 |
| **认证** | NextAuth.js | v5 | OAuth + Session |
| **图表** | Recharts | - | 数据可视化 |

### 架构图

```
┌─────────────────────────────────────────────────────────┐
│                      用户界面层                          │
│  (Next.js App Router + React Server Components)         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                      API 层                              │
│  ┌──────────────┐              ┌──────────────┐         │
│  │  tRPC API    │              │  AI Chat API │         │
│  │  (习惯CRUD)   │              │  (流式对话)   │         │
│  └──────────────┘              └──────────────┘         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    业务逻辑层                            │
│  ┌──────────────────┐    ┌──────────────────┐          │
│  │  AI 功能模块      │    │  数据处理模块     │          │
│  │  - 动机诊断       │    │  - 数据分析       │          │
│  │  - 任务拆解       │    │  - 报告生成       │          │
│  │  - 提醒生成       │    │  - 洞察挖掘       │          │
│  └──────────────────┘    └──────────────────┘          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    数据持久层                            │
│             Prisma ORM + PostgreSQL                     │
└─────────────────────────────────────────────────────────┘
```

---

## 项目结构

### 目录结构（重点）

```
src/
├── app/                          # Next.js App Router
│   ├── (app)/                    # 认证后页面（布局组）
│   │   ├── dashboard/            # 仪表盘
│   │   ├── habits/               # 习惯管理
│   │   │   ├── page.tsx          # 习惯列表
│   │   │   ├── new/page.tsx      # 创建习惯（AI 辅助）
│   │   │   └── [id]/             # 习惯详情
│   │   ├── analytics/            # 数据分析
│   │   ├── coach/                # AI 教练对话
│   │   └── settings/             # 用户设置
│   ├── (auth)/                   # 认证页面（布局组）
│   │   ├── sign-in/              # 登录页
│   │   └── sign-up/              # 注册页
│   └── api/                      # API 端点
│       ├── chat/route.ts         # 🔥 AI 对话端点（流式）
│       ├── trpc/[trpc]/route.ts  # tRPC 端点
│       └── cron/                 # 定时任务
│
├── components/                   # React 组件
│   ├── ui/                       # 🔥 shadcn/ui 基础组件
│   ├── layout/                   # 布局组件（Header、Sidebar）
│   ├── charts/                   # Recharts 图表封装
│   └── break-habit/              # 坏习惯戒除专用组件
│
├── server/api/                   # 🔥 tRPC 服务端
│   ├── routers/                  # 路由模块
│   │   ├── habit.ts              # 习惯 CRUD
│   │   ├── log.ts                # 打卡记录
│   │   ├── report.ts             # 周期报告
│   │   ├── analytics.ts          # 进阶分析
│   │   ├── insights.ts           # 数据洞察
│   │   └── reminder.ts           # 提醒管理
│   ├── root.ts                   # 🔥 路由注册中心
│   └── trpc.ts                   # tRPC 配置（中间件）
│
├── lib/                          # 工具库
│   ├── ai/                       # 🔥 AI 功能模块
│   │   ├── prompts.ts            # 系统提示词（MAP 理论）
│   │   ├── model.ts              # AI 模型配置
│   │   ├── motivation.ts         # 动机维护（M）
│   │   ├── ability.ts            # 任务拆解（A）
│   │   ├── reminder.ts           # 提醒生成（P）
│   │   ├── break-habit.ts        # 坏习惯分析
│   │   ├── insights.ts           # 数据洞察生成
│   │   └── report.ts             # 报告生成
│   ├── auth.ts                   # NextAuth 配置
│   ├── db.ts                     # Prisma 客户端实例
│   ├── types.ts                  # 🔥 Zod schemas（类型定义）
│   └── utils.ts                  # 工具函数（cn 等）
│
├── trpc/                         # 🔥 tRPC 客户端
│   ├── server.ts                 # 服务端 tRPC 客户端
│   └── client.tsx                # 客户端 Provider
│
└── styles/                       # 样式
    └── globals.css               # Tailwind CSS 入口

prisma/
└── schema.prisma                 # 🔥 数据库模型定义

.claude/
└── commands/                     # Claude Code 自定义命令
```

### 关键文件说明

| 文件 | 用途 | 何时修改 |
|------|------|----------|
| `src/server/api/root.ts` | 注册 tRPC 路由 | 添加新路由时 |
| `src/lib/types.ts` | 业务类型定义（Zod） | 添加新数据结构时 |
| `src/lib/ai/prompts.ts` | AI 系统提示词 | 调整 AI 行为时 |
| `prisma/schema.prisma` | 数据库模型 | 添加新表/字段时 |
| `src/app/api/chat/route.ts` | AI 对话端点 | 修改对话逻辑时 |

---

## 核心功能模块

### 1. 习惯管理（Habit CRUD）

**路由**：`src/server/api/routers/habit.ts`

**核心操作**：

```typescript
// 创建习惯
const habit = await trpc.habit.create.mutate({
  name: "每天喝8杯水",
  type: "POSITIVE",
  category: "HEALTH",
  targetFrequency: 1,
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

// 查询用户所有习惯
const habits = await trpc.habit.list.query();

// 更新习惯
await trpc.habit.update.mutate({ id, data: { ... } });

// 删除习惯
await trpc.habit.delete.mutate({ id });
```

### 2. 打卡系统（Habit Logging）

**路由**：`src/server/api/routers/log.ts`

**核心操作**：

```typescript
// 创建打卡记录
const log = await trpc.log.create.mutate({
  habitId: "xxx",
  completedAt: new Date(),
  emotion: "HAPPY",
  notes: "今天完成得很轻松！",
});

// 查询打卡历史
const logs = await trpc.log.list.query({
  habitId: "xxx",
  startDate: new Date("2025-01-01"),
  endDate: new Date("2025-01-31"),
});
```

### 3. AI 对话系统

**端点**：`src/app/api/chat/route.ts`

**前端使用**：

```tsx
'use client';
import { useChat } from '@ai-sdk/react';

export function CoachChat() {
  const { messages, sendMessage, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>{m.text}</div>
      ))}
      <button
        onClick={() => sendMessage({ text: "我今天没动力锻炼" })}
        disabled={isLoading}
      >
        发送
      </button>
    </div>
  );
}
```

**后端流式响应**：

```typescript
import { streamText, convertToModelMessages } from 'ai';
import { COACH_SYSTEM_PROMPT } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: 'openai/gpt-4o',
    system: COACH_SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

### 4. AI 结构化输出

**使用场景**：动机诊断、任务拆解、数据洞察

**示例**（`src/lib/ai/ability.ts`）：

```typescript
import { generateObject } from 'ai';
import { z } from 'zod';

export async function decomposeHabit(habitDescription: string) {
  const { object } = await generateObject({
    model: 'openai/gpt-4o',
    schema: z.object({
      tinyHabits: z.array(z.object({
        action: z.string(),
        duration: z.number(),
        difficulty: z.enum(['VERY_EASY', 'EASY', 'MEDIUM']),
      })),
      reasoning: z.string(),
    }),
    prompt: `将习惯拆解为微习惯：${habitDescription}`,
  });

  return object;
}
```

---

## 开发工作流

### 1. 添加新功能的标准流程

#### 场景：添加「习惯标签」功能

**步骤 1：定义数据模型**

编辑 `prisma/schema.prisma`：

```prisma
model Tag {
  id        String   @id @default(cuid())
  name      String
  color     String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  habits    Habit[]  @relation("HabitTags")
  createdAt DateTime @default(now())

  @@unique([userId, name])
}

model Habit {
  // ... 现有字段
  tags      Tag[]    @relation("HabitTags")
}
```

**步骤 2：更新数据库**

```bash
pnpm db:push  # 推送 schema 变更
```

**步骤 3：定义 Zod Schema**

编辑 `src/lib/types.ts`：

```typescript
export const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(20),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export type Tag = z.infer<typeof tagSchema>;
```

**步骤 4：创建 tRPC 路由**

创建 `src/server/api/routers/tag.ts`：

```typescript
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { tagSchema } from '@/lib/types';

export const tagRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.tag.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),

  create: protectedProcedure
    .input(tagSchema.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tag.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tag.delete({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),
});
```

**步骤 5：注册路由**

编辑 `src/server/api/root.ts`：

```typescript
import { tagRouter } from './routers/tag';

export const appRouter = createTRPCRouter({
  habit: habitRouter,
  log: logRouter,
  tag: tagRouter,  // 添加这行
  // ...
});
```

**步骤 6：创建 UI 组件**

创建 `src/components/tag-selector.tsx`：

```tsx
'use client';
import { trpc } from '@/trpc/client';

export function TagSelector({ habitId }: { habitId: string }) {
  const { data: tags } = trpc.tag.list.useQuery();
  const createTag = trpc.tag.create.useMutation();

  return (
    <div>
      {tags?.map((tag) => (
        <span key={tag.id} style={{ color: tag.color }}>
          {tag.name}
        </span>
      ))}
      <button onClick={() => createTag.mutate({ name: "健康", color: "#00ff00" })}>
        添加标签
      </button>
    </div>
  );
}
```

**步骤 7：集成到页面**

编辑 `src/app/(app)/habits/[id]/page.tsx`：

```tsx
import { TagSelector } from '@/components/tag-selector';

export default function HabitDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* ... 其他内容 */}
      <TagSelector habitId={params.id} />
    </div>
  );
}
```

### 2. 添加新 AI 功能的流程

#### 场景：添加「每周总结生成」功能

**步骤 1：创建 AI 模块**

创建 `src/lib/ai/weekly-summary.ts`：

```typescript
import { generateObject } from 'ai';
import { z } from 'zod';

const weeklySummarySchema = z.object({
  highlights: z.array(z.string()),
  improvements: z.array(z.string()),
  nextWeekGoals: z.array(z.string()),
  motivationalMessage: z.string(),
});

export async function generateWeeklySummary(weeklyData: {
  completedHabits: number;
  totalHabits: number;
  topPerformingHabit: string;
  strugglingHabit: string;
}) {
  const { object } = await generateObject({
    model: 'openai/gpt-4o',
    schema: weeklySummarySchema,
    prompt: `基于以下数据生成本周总结：
完成习惯数：${weeklyData.completedHabits}/${weeklyData.totalHabits}
表现最好：${weeklyData.topPerformingHabit}
需要改进：${weeklyData.strugglingHabit}`,
  });

  return object;
}
```

**步骤 2：创建 tRPC 路由**

编辑 `src/server/api/routers/report.ts`：

```typescript
import { generateWeeklySummary } from '@/lib/ai/weekly-summary';

export const reportRouter = createTRPCRouter({
  generateWeeklySummary: protectedProcedure
    .input(z.object({ startDate: z.date(), endDate: z.date() }))
    .mutation(async ({ ctx, input }) => {
      // 1. 查询本周数据
      const logs = await ctx.db.habitLog.findMany({
        where: {
          habit: { userId: ctx.session.user.id },
          completedAt: { gte: input.startDate, lte: input.endDate },
        },
        include: { habit: true },
      });

      // 2. 分析数据
      const weeklyData = {
        completedHabits: logs.length,
        totalHabits: await ctx.db.habit.count({
          where: { userId: ctx.session.user.id },
        }),
        topPerformingHabit: "早起",  // 实际需计算
        strugglingHabit: "跑步",
      };

      // 3. 调用 AI 生成总结
      const summary = await generateWeeklySummary(weeklyData);

      // 4. 保存到数据库
      return ctx.db.report.create({
        data: {
          userId: ctx.session.user.id,
          type: 'WEEKLY',
          content: summary,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
    }),
});
```

**步骤 3：前端调用**

```tsx
'use client';
import { trpc } from '@/trpc/client';

export function WeeklySummaryButton() {
  const generateSummary = trpc.report.generateWeeklySummary.useMutation();

  const handleGenerate = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    generateSummary.mutate({
      startDate: weekAgo,
      endDate: today,
    });
  };

  return (
    <button onClick={handleGenerate} disabled={generateSummary.isLoading}>
      {generateSummary.isLoading ? "生成中..." : "生成本周总结"}
    </button>
  );
}
```

---

## 常见开发任务

### 1. 修改 AI 提示词

**位置**：`src/lib/ai/prompts.ts`

```typescript
export const COACH_SYSTEM_PROMPT = `
你是一位专业的习惯教练...

【修改此处以改变 AI 行为】
`;
```

修改后无需重启，API 调用会立即使用新提示词。

### 2. 添加新的 UI 组件

```bash
# 使用 shadcn/ui CLI 添加组件
npx shadcn@latest add tooltip

# 使用组件
import { Tooltip } from '@/components/ui/tooltip';
```

### 3. 修改数据库 Schema

```bash
# 1. 编辑 prisma/schema.prisma
# 2. 推送变更
pnpm db:push

# 3. 如果是生产环境，创建迁移
pnpm db:generate  # 生成迁移文件
```

### 4. 调试 tRPC 请求

**方法 1：使用浏览器 DevTools**

打开 Network 面板，筛选 `/api/trpc`，查看请求/响应。

**方法 2：使用 tRPC 内置日志**

编辑 `src/server/api/trpc.ts`：

```typescript
export const createTRPCContext = async (opts: { headers: Headers }) => {
  console.log('[tRPC] Request:', opts.headers.get('x-trpc-source'));
  // ...
};
```

### 5. 测试 AI 功能

**方法 1：单独测试 AI 模块**

创建 `scripts/test-ai.ts`：

```typescript
import { generateWeeklySummary } from '@/lib/ai/weekly-summary';

async function test() {
  const result = await generateWeeklySummary({
    completedHabits: 15,
    totalHabits: 20,
    topPerformingHabit: "早起",
    strugglingHabit: "跑步",
  });

  console.log(result);
}

test();
```

运行：
```bash
tsx scripts/test-ai.ts
```

**方法 2：使用 API 端点测试**

使用 Postman 发送请求到 `http://localhost:3000/api/trpc/report.generateWeeklySummary`。

---

## 调试与测试

### 开发环境调试

**1. 启用详细日志**

编辑 `.env.local`：

```env
NODE_ENV=development
LOG_LEVEL=debug
```

**2. 使用 React DevTools**

安装浏览器扩展：[React Developer Tools](https://react.dev/learn/react-developer-tools)

**3. 使用 Prisma Studio**

```bash
pnpm db:studio
```

可视化查看和编辑数据库数据。

### 常用命令

```bash
# 类型检查
pnpm typecheck

# Lint 检查
pnpm lint

# 代码格式化
pnpm format:write

# 完整检查
pnpm check  # = lint + typecheck
```

---

## 疑难解答

### 问题 1：tRPC 路由 404

**症状**：调用 `trpc.tag.list.query()` 报错 `NOT_FOUND`。

**解决**：
1. 检查 `src/server/api/root.ts` 是否注册了 `tagRouter`
2. 重启开发服务器（`pnpm dev`）
3. 清除 `.next` 缓存：`rm -rf .next && pnpm dev`

### 问题 2：Prisma 类型不同步

**症状**：TypeScript 报错 `Property 'tags' does not exist on type 'Habit'`。

**解决**：
```bash
# 重新生成 Prisma 客户端
pnpm db:generate
```

### 问题 3：AI 请求超时

**症状**：AI 请求长时间无响应。

**解决**：
1. 检查 `AI_GATEWAY_API_KEY` 是否正确
2. 检查网络连接
3. 增加超时时间：
   ```typescript
   const result = await generateObject({
     model: 'openai/gpt-4o',
     // ... 其他配置
     abortSignal: AbortSignal.timeout(30000),  // 30 秒超时
   });
   ```

### 问题 4：环境变量不生效

**症状**：修改 `.env` 后无变化。

**解决**：
1. 重启开发服务器
2. 检查变量名是否以 `NEXT_PUBLIC_` 开头（客户端变量）
3. 客户端变量示例：
   ```env
   NEXT_PUBLIC_APP_NAME=MicroGravity
   ```

### 问题 5：数据库连接失败

**症状**：`Error: Can't reach database server`。

**解决**：
1. 确保 PostgreSQL 服务运行中
2. 检查 `DATABASE_URL` 格式：
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ```
3. 测试连接：`pnpm db:studio`

---

## 进阶资源

### 推荐阅读

1. **项目文档**
   - `docs/福格行为模型.md` - 理论基础（必读）
   - `docs/迭代计划.md` - v2.0 开发计划
   - `docs/习惯养成Web应用PRD.md` - 产品需求

2. **技术文档**
   - [Next.js 官方文档](https://nextjs.org/docs)
   - [tRPC 官方文档](https://trpc.io/docs)
   - [Vercel AI SDK 文档](https://sdk.vercel.ai/docs)
   - [Prisma 文档](https://www.prisma.io/docs)

3. **内部文档**
   - `ai-sdk-core.md` - AI SDK 核心 API
   - `ai-sdk-ui.md` - AI SDK React Hooks

### 开发规范

1. **代码风格**
   - 使用 Prettier 自动格式化
   - 遵循 ESLint 规则
   - 优先使用函数式组件和 Hooks

2. **命名约定**
   - 组件：`PascalCase`（例：`HabitCard.tsx`）
   - 文件：`kebab-case`（例：`habit-card.tsx`）
   - 函数：`camelCase`（例：`generateSummary`）
   - 常量：`UPPER_SNAKE_CASE`（例：`MAX_HABITS`）

3. **提交规范**
   ```bash
   # 格式：<type>(<scope>): <subject>
   git commit -m "feat(habit): 添加标签功能"
   git commit -m "fix(ai): 修复提示词生成错误"
   git commit -m "docs: 更新开发者指南"
   ```

   **类型**：`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 快速参考

### 常用命令速查

| 命令 | 用途 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm check` | 代码检查（lint + typecheck） |
| `pnpm db:push` | 推送 schema 到数据库 |
| `pnpm db:studio` | 打开 Prisma Studio |
| `pnpm db:generate` | 生成 Prisma 客户端 |

### 目录速查

| 路径 | 用途 |
|------|------|
| `src/app/(app)/` | 认证后页面 |
| `src/server/api/routers/` | tRPC 路由 |
| `src/lib/ai/` | AI 功能模块 |
| `src/components/ui/` | UI 组件 |
| `prisma/schema.prisma` | 数据库模型 |

### API 速查

**tRPC 客户端调用**：
```typescript
const { data } = trpc.habit.list.useQuery();  // 查询
const createHabit = trpc.habit.create.useMutation();  // 变更
```

**AI SDK v6 核心 API**：
- `streamText()` - 流式对话
- `generateObject()` - 结构化输出
- `useChat()` - 前端 Hook
- `tool()` - 工具定义

---

## 联系与反馈

- **项目维护者**：[GitHub Issues](https://github.com/your-repo/issues)
- **技术讨论**：[Discussions](https://github.com/your-repo/discussions)
- **紧急 Bug**：直接联系团队负责人

---

**祝你开发愉快！** 🚀

如有问题，请优先查阅本文档和 `CLAUDE.md`，或在团队频道提问。
