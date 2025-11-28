# micro-gravity 实现计划

**基于习惯养成Web应用PRD v2.4 的完整实现方案**

---

## 项目当前状态

### 已完成 ✅
- Next.js 15 + App Router + Turbopack 框架搭建
- tRPC v11 + React Query v5 API层配置
- Prisma ORM + PostgreSQL 数据库连接
- NextAuth.js v5 Discord OAuth 认证
- Vercel AI SDK v6 依赖已安装
- TypeScript + Tailwind CSS v4 基础配置
- **第一阶段**: Prisma Schema 扩展 + Zod 类型定义
- **第二阶段**: AI 功能模块（提醒、动机、能力评估、报告生成等）
- **第三阶段**: tRPC 业务路由（habit, log, report, analytics, insights, reminder）
- **第四阶段**: 前端 UI 组件（shadcn/ui + 仪表盘 + 习惯管理 + AI教练 + 分析 + 报告）
- **第五阶段**: 定时任务与集成（Vercel Cron Jobs + Recharts）

### 待实现 ❌
- 习惯详情页面 `/habits/[id]`
- 设置页面 `/settings`
- 更多数据可视化图表（使用 Recharts）
- 通知系统集成
- 生产环境部署优化

---

## 实现阶段规划

### 第一阶段：数据模型与类型定义

#### 1.1 扩展 Prisma Schema
**文件**: `prisma/schema.prisma`

新增模型：
- `HabitType` 枚举 (BUILD, BREAK)
- `HabitStatus` 枚举 (ACTIVE, PAUSED, COMPLETED, ARCHIVED)
- `ConversationType` 枚举 (SETUP, CHECKIN, HELP, REVIEW)
- `ReportType` 枚举 (WEEKLY, MONTHLY, MILESTONE)
- `MilestoneType` 枚举 (DAY_7, DAY_21, DAY_66, DAY_100, CUSTOM)
- `AnalysisType` 枚举 (TIME_HEATMAP, MOOD, CORRELATION, RISK)
- `Habit` 模型 - 习惯核心数据 + MAP模型JSON字段
- `HabitLog` 模型 - 打卡记录
- `Conversation` 模型 - AI对话历史
- `Report` 模型 (v1.5) - 周期报告
- `Milestone` 模型 (v1.5) - 里程碑成就
- `AnalyticsSnapshot` 模型 (v1.5) - 分析缓存

#### 1.2 创建类型定义
**文件**: `src/lib/types.ts`

Zod schemas：
- `motivationSchema` - 动机配置 (MAP-M)
- `abilitySchema` - 能力配置 (MAP-A)
- `promptSchema` - 提示配置 (MAP-P)
- `habitConfigSchema` - 完整习惯配置
- `reminderContextSchema` - 提醒上下文
- `motivationContextSchema` - 动机上下文
- `habitDataSchema` - 数据洞察上下文
- `triggerRecordSchema` - 触发记录(坏习惯)
- `reportSummarySchema` - 报告摘要 (v1.5)
- `phaseConfigSchema` - 渐进式阶段配置

---

### 第二阶段：AI功能模块

#### 2.1 系统提示词
**文件**: `src/lib/ai/prompts.ts`

- `HABIT_COACH_SYSTEM_PROMPT` - 习惯教练主提示词
- `REMINDER_GENERATOR_PROMPT` - 提醒生成提示词
- `MOTIVATION_ENGINE_PROMPT` - 动机引擎提示词
- `ABILITY_ANALYZER_PROMPT` - 能力评估提示词
- `BREAK_HABIT_PROMPT` - 坏习惯分析提示词
- `REPORT_GENERATOR_PROMPT` - 报告生成提示词

#### 2.2 AI功能函数
**文件**: `src/lib/ai/reminder.ts`
- `generateReminder(context)` - 智能提醒生成

**文件**: `src/lib/ai/motivation.ts`
- `generateMotivation(context)` - 动机激励生成
- `detectMotivationDip(logs)` - 动机波动检测

**文件**: `src/lib/ai/ability.ts`
- `breakdownHabit(habit)` - 智能任务拆解
- `assessAbility(config)` - 六维能力评估

**文件**: `src/lib/ai/break-habit.ts`
- `analyzeTriggers(records)` - 触发模式分析
- `generateSubstituteBehaviors(analysis)` - 替代行为建议

**文件**: `src/lib/ai/insights.ts`
- `generateInsights(data)` - 数据洞察生成

**文件**: `src/lib/ai/analytics.ts` (v1.5)
- `analyzeTimePatterns(logs)` - 时间热力图分析
- `analyzeMoodCorrelation(logs)` - 情绪关联分析
- `analyzeHabitCorrelations(habits, logs)` - 习惯关联矩阵
- `predictBreakRisk(habit, logs)` - 中断风险预测

**文件**: `src/lib/ai/report.ts` (v1.5)
- `generateWeeklyReport(data)` - 周报生成
- `generateMonthlyReport(data)` - 月报生成
- `generateMilestoneReport(data)` - 里程碑报告

---

### 第三阶段：API层实现

#### 3.1 AI对话端点
**文件**: `src/app/api/chat/route.ts`

- POST 端点处理流式AI对话
- 使用 `streamText` + `convertToModelMessages`
- 实现 `createHabit` 工具 (tool)
- 返回 `toUIMessageStreamResponse()`

#### 3.2 tRPC路由

**文件**: `src/server/api/routers/habit.ts`
- `create` - 创建习惯
- `getById` - 获取单个习惯
- `list` - 获取用户所有习惯
- `update` - 更新习惯配置
- `updatePhase` - 更新当前阶段
- `archive` - 归档习惯
- `delete` - 删除习惯

**文件**: `src/server/api/routers/log.ts`
- `create` - 创建打卡记录
- `getByHabit` - 获取习惯的打卡历史
- `getByDateRange` - 按日期范围查询
- `getStats` - 获取统计数据（连续天数、完成率等）

**文件**: `src/server/api/routers/chat.ts`
- `saveConversation` - 保存对话历史
- `getConversationHistory` - 获取对话历史
- `getRecentConversations` - 获取最近对话

**文件**: `src/server/api/routers/report.ts` (v1.5)
- `getWeeklyReport` - 获取/生成周报
- `getMonthlyReport` - 获取/生成月报
- `getMilestoneReport` - 获取里程碑报告
- `listReports` - 报告历史列表

**文件**: `src/server/api/routers/analytics.ts` (v1.5)
- `getTimeHeatmap` - 时间热力图数据
- `getMoodAnalysis` - 情绪分析
- `getHabitCorrelations` - 习惯关联分析
- `getBreakRiskPrediction` - 中断风险预测

**文件**: `src/server/api/routers/milestone.ts` (v1.5)
- `checkMilestone` - 检查并创建里程碑
- `listMilestones` - 获取里程碑列表
- `shareMilestone` - 生成分享链接

#### 3.3 路由注册
**文件**: `src/server/api/root.ts`
- 注册所有新路由到 `appRouter`

---

### 第四阶段：前端组件

#### 4.1 UI组件库安装
- 安装并配置 shadcn/ui
- 安装 Recharts 数据可视化库
- 安装 Lucide React 图标库

#### 4.2 布局组件
**文件**: `src/app/layout.tsx` (更新)
- 添加全局导航
- 添加用户认证状态显示

**文件**: `src/app/(dashboard)/layout.tsx`
- 仪表盘布局（侧边栏 + 内容区）

#### 4.3 页面组件

**文件**: `src/app/(dashboard)/page.tsx`
- 首页仪表盘（习惯概览、今日任务、快速打卡）

**文件**: `src/app/(dashboard)/habits/page.tsx`
- 习惯列表页

**文件**: `src/app/(dashboard)/habits/[id]/page.tsx`
- 习惯详情页

**文件**: `src/app/(dashboard)/habits/new/page.tsx`
- 新建习惯（AI对话引导）

**文件**: `src/app/(dashboard)/analytics/page.tsx` (v1.5)
- 进阶分析页面

**文件**: `src/app/(dashboard)/reports/page.tsx` (v1.5)
- 报告中心

#### 4.4 功能组件

**目录**: `src/app/_components/`

```
chat/
├── habit-coach.tsx      # AI教练对话主组件
├── message-list.tsx     # 消息列表
├── message-item.tsx     # 单条消息
└── chat-input.tsx       # 输入框

habits/
├── habit-list.tsx       # 习惯列表
├── habit-card.tsx       # 习惯卡片
├── habit-detail.tsx     # 习惯详情
├── habit-form.tsx       # 习惯表单（传统方式）
├── quick-checkin.tsx    # 快速打卡
└── phase-progress.tsx   # 阶段进度

analytics/ (v1.5)
├── time-heatmap.tsx     # 时间热力图
├── mood-chart.tsx       # 情绪趋势图
├── correlation-matrix.tsx # 习惯关联矩阵
├── risk-indicator.tsx   # 风险指示器
└── stats-panel.tsx      # 统计面板

reports/ (v1.5)
├── weekly-report.tsx    # 周报组件
├── monthly-report.tsx   # 月报组件
├── milestone-card.tsx   # 里程碑卡片
└── report-list.tsx      # 报告列表

break-habit/
├── trigger-form.tsx     # 触发记录表单
├── trigger-analysis.tsx # 触发分析展示
└── relapse-manager.tsx  # 复发管理

common/
├── streak-counter.tsx   # 连续天数
├── motivation-boost.tsx # 动机激励弹窗
├── loading.tsx          # 加载状态
└── empty-state.tsx      # 空状态
```

---

### 第五阶段：定时任务与集成

#### 5.1 Vercel Cron Jobs
**文件**: `vercel.json`
```json
{
  "crons": [
    {
      "path": "/api/cron/weekly-report",
      "schedule": "0 20 * * 0"
    },
    {
      "path": "/api/cron/monthly-report",
      "schedule": "0 20 L * *"
    },
    {
      "path": "/api/cron/milestone-check",
      "schedule": "0 21 * * *"
    }
  ]
}
```

**文件**: `src/app/api/cron/weekly-report/route.ts`
**文件**: `src/app/api/cron/monthly-report/route.ts`
**文件**: `src/app/api/cron/milestone-check/route.ts`

#### 5.2 环境变量
**文件**: `.env.example` (更新)
- 添加 `AI_GATEWAY_API_KEY`

**文件**: `src/env.js` (更新)
- 添加 AI API Key 验证

---

## 文件创建/修改清单

### 新建文件 (按优先级)

#### P0 - 核心基础
1. `prisma/schema.prisma` - 扩展数据模型
2. `src/lib/types.ts` - Zod类型定义
3. `src/lib/ai/prompts.ts` - AI提示词
4. `src/app/api/chat/route.ts` - AI对话端点
5. `src/server/api/routers/habit.ts` - 习惯CRUD
6. `src/server/api/routers/log.ts` - 打卡记录
7. `src/app/_components/chat/habit-coach.tsx` - AI教练

#### P1 - 核心功能
8. `src/lib/ai/reminder.ts` - 提醒生成
9. `src/lib/ai/motivation.ts` - 动机引擎
10. `src/lib/ai/ability.ts` - 能力评估
11. `src/lib/ai/insights.ts` - 数据洞察
12. `src/lib/ai/break-habit.ts` - 坏习惯系统
13. `src/server/api/routers/chat.ts` - 对话历史

#### P2 - v1.5增强
14. `src/lib/ai/analytics.ts` - 进阶分析
15. `src/lib/ai/report.ts` - 报告生成
16. `src/server/api/routers/report.ts` - 报告路由
17. `src/server/api/routers/analytics.ts` - 分析路由
18. `src/server/api/routers/milestone.ts` - 里程碑路由

#### P3 - 前端组件
19. 所有 `src/app/_components/` 下的组件
20. 所有 `src/app/(dashboard)/` 下的页面

### 修改文件
1. `src/server/api/root.ts` - 注册新路由
2. `src/env.js` - 添加AI环境变量
3. `.env.example` - 添加AI配置示例
4. `src/app/layout.tsx` - 添加导航

---

## 实施建议

### 开发顺序
1. **先完成数据层** - Prisma schema + 迁移 + 类型定义
2. **再完成AI层** - 提示词 + AI函数 + /api/chat
3. **然后完成API层** - tRPC路由
4. **最后完成UI层** - 前端组件

### 测试策略
- 每完成一个路由，使用 Prisma Studio 验证数据
- 使用 tRPC Panel 测试API
- AI功能使用控制台日志调试

### 注意事项
1. AI流式响应使用 `/api/chat` 而非 tRPC
2. 使用 `protectedProcedure` 保护所有需要认证的端点
3. JSON字段使用 Zod 验证输入输出
4. 遵循PRD中的代码示例和模式

---

## 确认选择 ✅

1. **UI组件库**: shadcn/ui（PRD推荐，基于Radix UI，高度可定制）
2. **AI模型访问**: Vercel AI Gateway（统一API Key访问多模型）
3. **开发范围**: v1.5 增强版（包含报告系统+进阶分析）
4. **实施方式**: 分阶段实施（数据层→AI层→API层→UI层）

---

**计划版本**: v1.0
**创建日期**: 2025-11-28
**基于PRD版本**: v2.4
