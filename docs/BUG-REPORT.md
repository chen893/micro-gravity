# Micro-Gravity 项目 Bug 检查报告

> 生成时间: 2025-12-02
> 检查范围: 前端组件、API路由、类型定义、数据库配置

---

## 统计总览

| 类别 | 高优先级 | 中优先级 | 低优先级 | 合计 |
|------|---------|---------|---------|------|
| 前端/UI | 3 | 7 | 3 | 13 |
| API/后端 | 7 | 7 | 4 | 18 |
| 类型/配置 | 3 | 3 | 3 | 9 |
| **总计** | **13** | **17** | **10** | **40** |

---

## 一、高优先级 Bug（需立即修复）

### 1.1 安全性问题 - 权限检查遗漏

#### Bug #1: log.ts - getByHabit 权限检查遗漏
- **文件**: `src/server/api/routers/log.ts` 行 302
- **问题**: 查询缺少用户权限验证，任何用户都可以查询任意习惯的打卡记录
- **影响**: 数据泄露风险
- **修复方案**:
```typescript
// 添加权限验证
const habit = await ctx.db.habit.findFirst({
  where: {
    id: input.habitId,
    userId: ctx.session.user.id,
  },
});
if (!habit) {
  throw new TRPCError({ code: "NOT_FOUND" });
}
```

#### Bug #2: phase.ts - getCurrentPhase 权限检查遗漏
- **文件**: `src/server/api/routers/phase.ts` 行 89-98
- **问题**: 获取习惯阶段时未验证所有权，可能泄露他人习惯信息
- **修复方案**: 使用 `findFirst` 加入 `userId` 检查

#### Bug #3: phase.ts - 多处权限检查遗漏
- **文件**: `src/server/api/routers/phase.ts` 行 134, 189, 249, 310, 374, 407
- **问题**: `assessAdvance`, `assessRetreat`, `advance`, `retreat`, `savePhasePath`, `getSuggestion` 都使用 `findUnique` 而没有验证 `userId`
- **受影响方法**: 共6个方法
- **修复方案**: 全部改用 `findFirst` 并添加 `userId` 条件

#### Bug #4: proliferation.ts - 权限检查遗漏
- **文件**: `src/server/api/routers/proliferation.ts` 行 22, 131, 186
- **问题**: 三个查询都缺少用户权限验证
- **受影响方法**: `assessStability`, `getSuggestions`, `shouldPrompt`

---

### 1.2 数据库关系问题

#### Bug #5: HabitLog 缺失 CelebrationMethod 关联
- **文件**: `prisma/schema.prisma` 行 255-292
- **问题**: HabitLog 模型有 `celebrationMethodId` 字段（行275），但缺失与 CelebrationMethod 的 `@relation` 声明
- **影响**: 数据库外键无法建立，Prisma 客户端无法进行关联查询
- **修复方案**:
```prisma
// 在 HabitLog 模型中添加（行 275 之后）:
celebrationMethod CelebrationMethod? @relation(fields: [celebrationMethodId], references: [id], onDelete: SetNull)
```

#### Bug #6: AnalyticsSnapshot 缺失 habitId 外键约束
- **文件**: `prisma/schema.prisma` 行 371-390
- **问题**: AnalyticsSnapshot 有可选的 `habitId` 字段，但完全缺失与 Habit 的关系定义
- **修复方案**:
```prisma
// 在 AnalyticsSnapshot 模型中添加:
habit Habit? @relation(fields: [habitId], references: [id], onDelete: Cascade)
```

---

### 1.3 前端组件崩溃风险

#### Bug #7: Recipe Step 组件 - 状态同步问题
- **文件**: `src/components/habit-creation/recipe-step.tsx` 行 50-70
- **问题**: `useEffect` 缺失，`editedRecipe` 初始化时使用同步赋值逻辑，当用户返回重新生成 `recipe` 时，`editedRecipe` 可能不会及时更新
- **症状**: 用户修改配方后返回重新生成，看到的仍是旧数据
- **修复方案**: 添加 useEffect hook 监听 recipe 变化并更新 editedRecipe

#### Bug #8: Flash Celebration - 未处理错误
- **文件**: `src/components/celebration/flash-celebration.tsx` 行 55-90
- **问题**: `createMutation` 没有 `onError` 处理，API调用失败时用户界面静默失败
- **修复方案**: 添加 `onError` 回调显示错误提示

#### Bug #9: Achievements Page - 数据缺失处理不完善
- **文件**: `src/app/(app)/achievements/page.tsx` 行 60-70
- **问题**: 当 `badgesData` 为 null 时，`badges?.filter()` 可能在 badges 为 undefined 时崩溃
- **修复方案**: 添加更严格的数据验证 `badges?.filter() ?? []`

---

### 1.4 配置问题

#### Bug #10: AI 模型配置与文档不一致
- **文件**: `src/env.js` 行 27-30, `src/lib/ai/model.ts` 行 14-25
- **问题**:
  - CLAUDE.md 指出应使用 AI SDK v6 的字符串格式（如 `'openai/gpt-4o'`）
  - 实际代码使用 `createDeepSeek` 提供商
  - 环境变量使用 `AI_MODEL_API_KEY`，而非 `AI_GATEWAY_API_KEY`
- **影响**: 部署到 Vercel 时模型配置可能失效

---

## 二、中优先级 Bug（需尽快修复）

### 2.1 数据验证问题

#### Bug #11: proliferation.ts - 完成率计算错误
- **文件**: `src/server/api/routers/proliferation.ts` 行 156, 210
- **问题**: `completionRate` 计算有误，用 `completedLogs.length / 14` 而不是 `completedLogs.length / recentLogs.length`
- **修复方案**:
```typescript
const completionRate =
  recentLogs.length > 0 ? completedLogs.length / recentLogs.length : 0;
```

#### Bug #12: proliferation.ts - TODO 未完成（硬编码）
- **文件**: `src/server/api/routers/proliferation.ts` 行 215-217
- **问题**: `shouldPrompt` 方法中硬编码了 `daysSinceLastPrompt = 999` 和 `userDismissedCount = 0`
- **影响**: 繁殖提示逻辑无法正常工作

#### Bug #13: proliferation.ts - TODO 未完成（响应未保存）
- **文件**: `src/server/api/routers/proliferation.ts` 行 244
- **问题**: `recordPromptResponse` 仅打印日志，用户响应未被保存到数据库

---

### 2.2 错误处理缺失

#### Bug #14: HabitCreationWizard - 缺失错误边界
- **文件**: `src/components/habit-creation/habit-creation-wizard.tsx` 行 113-267
- **问题**: 所有 `mutateAsync` 调用都没有 try-catch，API错误会导致整个向导组件崩溃
- **修复方案**: 为每个 `mutateAsync` 包装 try-catch 块

#### Bug #15: demotivator-analysis.ts - AI 错误处理缺失
- **文件**: `src/lib/ai/demotivator-analysis.ts` 行 182-217
- **问题**: `analyzeDemotivators` 函数没有 try-catch，AI API 调用失败会直接抛出异常
- **修复方案**: 添加 try-catch 并提供优雅降级

#### Bug #16: habit-proliferation.ts - AI 错误处理缺失
- **文件**: `src/lib/ai/habit-proliferation.ts` 行 141-185
- **问题**: `generateProliferationSuggestions` 同样没有 try-catch

#### Bug #17: celebration.ts - 错误类型不一致
- **文件**: `src/server/api/routers/celebration.ts` 行 184-185, 231-232
- **问题**: 使用普通 Error 而不是 TRPCError，缺少统一的错误处理
- **修复方案**:
```typescript
throw new TRPCError({
  code: "NOT_FOUND",
  message: "打卡记录不存在或无权限"
});
```

---

### 2.3 竞态条件

#### Bug #18: EasyStrategyStep - 状态竞态条件
- **文件**: `src/components/habit-creation/easy-strategy-step.tsx` 行 44-60
- **问题**: 用户在 API 响应返回前快速点击按钮，`starterStep` 可能仍为 null
- **修复方案**: 添加 disabled 状态检查

#### Bug #19: RecipeStep - 潜在竞态条件
- **文件**: `src/components/habit-creation/recipe-step.tsx` 行 66-90
- **问题**: 条件判断可能在组件多次渲染时触发多次赋值
- **修复方案**: 改用 useEffect 带依赖数组

#### Bug #20: FlexibleCheckin - undefined 显示问题
- **文件**: `src/components/checkin/flexible-checkin.tsx` 行 310-322
- **问题**: `EMOTIONAL_MARKERS.find()` 找不到匹配时返回 undefined，可能显示 "undefined" 文本
- **修复方案**: 添加 fallback `.description ?? ""`

---

### 2.4 性能问题

#### Bug #21: analytics.ts - N+1 查询问题
- **文件**: `src/server/api/routers/analytics.ts` 行 385-429
- **问题**: `getDashboard` 中为每个习惯执行 `predictBreakRisk` 的 Promise.all，可能导致过度查询

---

### 2.5 索引缺失

#### Bug #22: HabitLog 缺失索引
- **文件**: `prisma/schema.prisma` 行 255-292
- **问题**: 缺失庆祝相关查询的索引
- **修复方案**:
```prisma
@@index([createdAt])
@@index([celebrationMethodId])
@@index([userId, celebrationMethodId])
```

---

### 2.6 UI 交互问题

#### Bug #23: HabitCard mutation 错误处理
- **文件**: `src/app/(app)/habits/_components/habits-list.tsx` 行 130-160
- **问题**: 删除、暂停、恢复等操作的 mutation 没有错误回调

#### Bug #24: BadgeUnlockNotification 点击处理问题
- **文件**: `src/components/badge/badge-showcase.tsx` 行 165-190
- **问题**: 弹窗的 click handler 在整个 div 上，可能导致用户无法与弹窗内容交互

---

### 2.7 字段限制问题

#### Bug #25: HabitLog celebrationNote 长度无限制
- **文件**: `prisma/schema.prisma` 行 277
- **问题**: `celebrationNote` 字段无长度限制，可能导致数据库膨胀
- **修复方案**:
```prisma
celebrationNote String? @db.VarChar(500)
```

---

## 三、低优先级 Bug（建议优化）

### 3.1 内存泄漏风险

#### Bug #26: MauiHabitGuide - 定时器未清理
- **文件**: `src/components/onboarding/maui-habit-guide.tsx` 行 44-54
- **问题**: `setTimeout` 没有对应的清理函数，组件卸载前执行会有内存泄漏
- **修复方案**: 使用 useEffect 包装 setTimeout 并返回清理函数

---

### 3.2 代码质量问题

#### Bug #27: insights.ts - 冗余操作符
- **文件**: `src/server/api/routers/insights.ts` 行 345
- **问题**: `filter().slice()` 永远不会返回 null，`?? []` 是冗余的

#### Bug #28: log.ts - 日期处理一致性
- **文件**: `src/server/api/routers/log.ts` 行 145-147
- **问题**: 计算"今天"的逻辑不一致

#### Bug #29: phase.ts - 类型转换安全性
- **文件**: `src/server/api/routers/phase.ts` 行 108
- **问题**: 使用 `as unknown as PhaseConfig[]` 进行类型转换，可能导致运行时错误

---

### 3.3 文档不一致

#### Bug #30: CLAUDE.md 与实现不一致
- **文件**: `CLAUDE.md`
- **问题**:
  - 环境变量文档仍列出 `AUTH_DISCORD_ID` 和 `AUTH_DISCORD_SECRET`
  - 实际代码使用 Google 认证

---

### 3.4 异步操作问题

#### Bug #31: DailyRoutineEditor - 异步错误未捕获
- **文件**: `src/components/routine/daily-routine-editor.tsx` 行 95-110
- **问题**: `onExtractFromText` 的异步操作没有错误捕获

#### Bug #32: Coach Page - undefined parts
- **文件**: `src/app/(app)/coach/page.tsx` 行 280-295
- **问题**: `message.parts` 可能为 undefined，但直接调用 `.map()`

---

### 3.5 类型验证

#### Bug #33: Habit phases 字段未提供类型验证
- **文件**: `prisma/schema.prisma` 行 219
- **问题**: `phases` 字段为 `Json?`，无 schema 验证

#### Bug #34: 类型定义缺失导出
- **文件**: `src/lib/types.ts`
- **问题**: 部分类型（如 CelebrationMoment）定义后未被导入使用

---

## 四、修复优先级建议

### 立即修复（影响安全性和稳定性）
1. Bug #1-4: 补充所有路由的权限检查
2. Bug #5-6: 修复数据库关系定义
3. Bug #7-9: 修复前端组件崩溃风险

### 尽快修复（影响功能完整性）
4. Bug #11-13: 修正数据验证和实现 TODO
5. Bug #14-17: 添加错误处理
6. Bug #18-20: 修复竞态条件

### 优化改进
7. Bug #21-22: 性能优化
8. Bug #26-34: 代码质量改进

---

## 五、关键文件清单

需要修改的文件（按优先级排序）：

| 优先级 | 文件 | Bug 数量 |
|--------|------|---------|
| 高 | `src/server/api/routers/phase.ts` | 7 |
| 高 | `src/server/api/routers/proliferation.ts` | 6 |
| 高 | `prisma/schema.prisma` | 4 |
| 高 | `src/server/api/routers/log.ts` | 2 |
| 中 | `src/components/habit-creation/habit-creation-wizard.tsx` | 1 |
| 中 | `src/components/habit-creation/recipe-step.tsx` | 2 |
| 中 | `src/components/celebration/flash-celebration.tsx` | 1 |
| 中 | `src/lib/ai/demotivator-analysis.ts` | 1 |
| 中 | `src/lib/ai/habit-proliferation.ts` | 1 |
| 中 | `src/server/api/routers/celebration.ts` | 2 |
| 低 | 其他文件 | 13 |

---

## 六、使用说明

根据此文档修复 bug 的建议流程：

1. **第一阶段**：修复所有高优先级安全性问题（Bug #1-4）
2. **第二阶段**：修复数据库 schema 问题（Bug #5-6），运行 `pnpm db:push`
3. **第三阶段**：修复前端组件问题（Bug #7-9, #14, #18-20）
4. **第四阶段**：实现 TODO 功能（Bug #12-13）
5. **第五阶段**：添加错误处理（Bug #15-17）
6. **第六阶段**：优化和代码质量改进

每完成一个阶段后运行 `pnpm typecheck` 确保类型正确。
