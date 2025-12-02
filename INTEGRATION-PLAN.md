# 功能集成计划

**基于 v2.0 迭代计划的代码审查与集成方案**

---

| 文档信息 | |
|---------|---|
| 生成日期 | 2025-12-03 |
| 基于版本 | v2.0 开发中 |
| 目的 | 识别已实现但未集成的功能，规划集成工作 |

---

## 一、问题概述

通过代码审查发现，`src/lib` 和 `src/server` 目录中存在大量**已实现但未被前端调用**的功能。这些功能与迭代计划高度相关，需要完成前端集成工作。

### 1.1 问题统计

| 类别 | 数量 | 影响 |
|-----|------|-----|
| 完全未使用的 tRPC 路由 | 4 个 | 后端功能无法使用 |
| 部分未使用的 tRPC 程序 | 30+ 个 | 功能不完整 |
| 未集成的 AI 模块 | 3+ 个 | 智能功能缺失 |

---

## 二、迭代计划功能对照

### 2.1 Phase 3: 提示系统升级 - routine.ts ❌ 完全未使用

**迭代计划目标**：
- 日程清单工具
- 锚点智能匹配
- 锚点验证检查

**已实现的后端功能** (`src/server/api/routers/routine.ts`)：

| 程序名 | 功能 | 使用状态 |
|-------|------|---------|
| `getAll` | 获取用户日程 | ❌ 未使用 |
| `saveTimeSlot` | 保存时间段 | ❌ 未使用 |
| `saveAll` | 批量保存日程 | ❌ 未使用 |
| `extractActivities` | 从描述提取活动 | ❌ 未使用 |
| `matchAnchors` | 锚点智能匹配 | ❌ 未使用 |
| `validateAnchor` | 验证锚点可靠性 | ❌ 未使用 |
| `suggestFromRoutine` | 从日程建议锚点 | ❌ 未使用 |
| `designPearlHabit` | 设计珍珠习惯 | ❌ 未使用 |

**对应 AI 模块** (`src/lib/ai/anchor-matching.ts`)：
- `extractRoutineActivities()` - 从描述中提取日常活动
- `matchAnchors()` - 智能匹配锚点
- `validateAnchor()` - 验证锚点可靠性
- `suggestAnchorsFromRoutine()` - 从日程建议锚点
- `designPearlHabit()` - 设计珍珠习惯

**需要创建的前端组件**：
```
src/components/anchor/
├── daily-routine.tsx       # 日程清单
├── anchor-matcher.tsx      # 锚点匹配器（已存在但需检查）
└── pearl-habit-wizard.tsx  # 珍珠习惯设计向导
```

---

### 2.2 Phase 7: 习惯进阶系统 - phase.ts ❌ 完全未使用

**迭代计划目标**：
- 阶段路径设计
- 弹性打卡机制
- 自然进阶提示
- 退阶保护

**已实现的后端功能** (`src/server/api/routers/phase.ts`)：

| 程序名 | 功能 | 使用状态 |
|-------|------|---------|
| `designPhases` | AI 设计阶段路径 | ❌ 未使用 |
| `checkAdvanceReadiness` | 检测进阶准备度 | ❌ 未使用 |
| `advancePhase` | 执行进阶 | ❌ 未使用 |
| `retreatPhase` | 执行退阶 | ❌ 未使用 |
| `getPhaseHistory` | 获取阶段历史 | ❌ 未使用 |
| `getCurrentPhase` | 获取当前阶段 | ❌ 未使用 |
| `suggestNextPhase` | 建议下一阶段 | ❌ 未使用 |
| `evaluatePhaseReadiness` | 评估阶段准备 | ❌ 未使用 |

**对应 AI/Lib 模块**：
- `src/lib/ai/phase-design.ts` - 阶段路径设计
- `src/lib/habit/advance-detection.ts` - 进阶信号检测
- `src/lib/habit/retreat-detection.ts` - 退阶保护检测

**需要创建的前端组件**：
```
src/components/phase/
├── phase-path.tsx          # 阶段路径展示
├── flexible-checkin.tsx    # 弹性打卡界面（已存在但需集成）
├── advance-prompt.tsx      # 进阶提示
└── retreat-prompt.tsx      # 退阶提示
```

**需要修改的页面**：
- `src/app/(app)/habits/[id]/page.tsx` - 显示阶段信息和进阶提示

---

### 2.3 Phase 7: 习惯繁殖 - proliferation.ts ❌ 完全未使用

**迭代计划目标**：
- 习惯繁殖引导
- 关联习惯推荐

**已实现的后端功能** (`src/server/api/routers/proliferation.ts`)：

| 程序名 | 功能 | 使用状态 |
|-------|------|---------|
| `assessStability` | 评估习惯稳定性 | ❌ 未使用 |
| `generateSuggestions` | 生成繁殖建议 | ❌ 未使用 |
| `shouldPrompt` | 判断是否提示 | ❌ 未使用 |

**对应 AI 模块** (`src/lib/ai/habit-proliferation.ts`)：
- `assessHabitStability()` - 评估习惯稳定性
- `generateProliferationSuggestions()` - 生成繁殖建议
- `shouldPromptProliferation()` - 判断是否提示用户

**需要创建的前端组件**：
```
src/components/habit/
└── proliferation-prompt.tsx  # 习惯繁殖提示（已存在但需集成）
```

---

### 2.4 Phase 1/3: 提醒系统 - reminder.ts ❌ 完全未使用

**迭代计划目标**：
- 个性化提醒生成
- 庆祝三时机引导

**已实现的后端功能** (`src/server/api/routers/reminder.ts`)：

| 程序名 | 功能 | 使用状态 |
|-------|------|---------|
| `generate` | 生成个性化提醒 | ❌ 未使用 |
| `generateBatch` | 批量生成提醒 | ❌ 未使用 |
| `getStyleSuggestion` | 获取提醒风格建议 | ❌ 未使用 |

**对应 AI 模块** (`src/lib/ai/reminder.ts`)：
- `generateReminder()` - 生成个性化提醒
- `generateRemindersForHabits()` - 批量生成提醒
- `getReminderStyle()` - 获取提醒风格

**需要集成到**：
- 推送通知系统
- 提醒设置页面

---

### 2.5 Phase 5: 问题诊断 - habit-doctor.ts ❓ 使用待确认

**迭代计划目标**：
- 问题解决优先级调整（提示 → 能力 → 动机）

**已实现的 Lib 模块** (`src/lib/troubleshoot/habit-doctor.ts`)：
- `quickDiagnose()` - 快速诊断
- `deepDiagnose()` - AI 深度诊断
- `generatePrescription()` - 生成处方建议

**需要集成到**：
- 习惯详情页的"帮助"功能
- AI 教练对话

---

## 三、部分未使用的程序

### 3.1 log.ts - 5/10 程序未使用

| 程序名 | 功能 | 集成建议 |
|-------|------|---------|
| `getByDateRange` | 按日期范围查询 | 报告/分析页面 |
| `getTodayStatus` | 今日状态 | Dashboard |
| `update` | 更新打卡 | 打卡编辑功能 |
| `delete` | 删除打卡 | 打卡管理功能 |
| `getStats` | 打卡统计 | 分析页面 |

### 3.2 analytics.ts - 5/9 程序未使用

| 程序名 | 功能 | 集成建议 |
|-------|------|---------|
| `getTimeHeatmap` | 时间热力图 | 进阶分析页面 |
| `getTimePatterns` | 时间模式分析 | 进阶分析页面 |
| `getMoodCorrelation` | 情绪关联分析 | 进阶分析页面 |
| `getHabitCorrelations` | 习惯关联分析 | 进阶分析页面 |
| `getBreakRisk` | 中断风险预测 | 进阶分析页面 |

### 3.3 celebration.ts - 10/14 程序未使用

| 程序名 | 功能 | 集成建议 |
|-------|------|---------|
| `getDbMethods` | 从数据库获取方法 | 庆祝方式管理页面 |
| `getUserFavorites` | 用户收藏 | 庆祝方式管理页面 |
| `addFavorite` | 添加收藏 | 庆祝方式选择器 |
| `removeFavorite` | 移除收藏 | 庆祝方式管理页面 |
| `setDefault` | 设置默认 | 庆祝方式管理页面 |
| `getDefaultMethod` | 获取默认方法 | 快速打卡 |
| `getFlashCelebrations` | 获取闪电庆祝 | 庆祝历史 |
| `getRecommendedMethods` | 推荐方法 | 庆祝引导 |
| `getStats` | 庆祝统计 | 分析页面 |
| `getShineTrend` | 发光感趋势 | 分析页面 |

### 3.4 aspiration.ts - 7/14 程序未使用

| 程序名 | 功能 | 集成建议 |
|-------|------|---------|
| `list` | 愿望列表 | 愿望管理页面 |
| `getById` | 获取愿望详情 | 愿望详情页 |
| `selectBehavior` | 选择行为 | 习惯创建流程 |
| `generateRecipe` | 生成配方 | 习惯创建流程 |
| `createHabitFromAspiration` | 从愿望创建习惯 | 习惯创建流程 |
| `recordRehearsal` | 记录演练 | 配方演练功能 |
| `delete` | 删除愿望 | 愿望管理页面 |

### 3.5 badge.ts - 3/8 程序未使用

| 程序名 | 功能 | 集成建议 |
|-------|------|---------|
| `getByCategory` | 按分类获取徽章 | 成就详情页 |
| `getUserBadges` | 用户徽章列表 | 个人中心 |
| `initializeBadges` | 初始化徽章 | 管理功能 |

---

## 四、优先级排序

### P0 - 必须立即集成（影响核心功能）

1. **phase.ts 全部程序**
   - 迭代计划 Phase 7 核心功能
   - 弹性打卡机制依赖此路由
   - 影响习惯进阶体验

2. **routine.ts 核心程序**
   - `matchAnchors` - 锚点匹配
   - `validateAnchor` - 锚点验证
   - 迭代计划 Phase 3 核心功能

3. **celebration.ts 核心程序**
   - `getUserFavorites` - 用户收藏
   - `addFavorite` / `removeFavorite` - 收藏管理
   - `getDefaultMethod` - 快速打卡需要

### P1 - 应该集成（提升用户体验）

4. **proliferation.ts 全部程序**
   - 习惯繁殖是 Phase 7 重要功能
   - 提升长期用户粘性

5. **reminder.ts 全部程序**
   - 个性化提醒提升打卡率
   - 庆祝三时机需要此功能

6. **aspiration.ts 未使用程序**
   - 完善习惯创建流程
   - 配方演练功能

### P2 - 可以延后（增强功能）

7. **analytics.ts 未使用程序**
   - 进阶分析功能
   - 用户可选功能

8. **habit-doctor.ts 集成**
   - 问题诊断功能
   - AI 教练增强

---

## 五、集成工作量估算

| 任务 | 工作量 | 优先级 |
|-----|-------|-------|
| phase.ts 前端集成 | 16h | P0 |
| routine.ts 前端集成 | 12h | P0 |
| celebration.ts 补全集成 | 8h | P0 |
| proliferation.ts 前端集成 | 8h | P1 |
| reminder.ts 前端集成 | 8h | P1 |
| aspiration.ts 补全集成 | 8h | P1 |
| analytics.ts 补全集成 | 6h | P2 |
| habit-doctor.ts 集成 | 4h | P2 |
| **合计** | **70h** | |

---

## 六、建议行动

### 6.1 立即行动

1. **创建阶段管理页面**
   - 在习惯详情页添加阶段信息展示
   - 集成 `phase.ts` 的进阶/退阶功能

2. **完善锚点匹配功能**
   - 在习惯创建流程中集成日程清单
   - 使用 `routine.ts` 的锚点匹配

3. **完善庆祝功能**
   - 创建庆祝方式管理页面
   - 集成收藏和默认设置功能

### 6.2 后续计划

4. 集成习惯繁殖提示
5. 完善提醒系统
6. 补全分析功能

---

## 七、检查清单

### 已实现但未集成的功能清单

- [ ] `phase.ts` - 阶段路径设计
- [ ] `phase.ts` - 进阶检测
- [ ] `phase.ts` - 退阶保护
- [ ] `routine.ts` - 日程清单
- [ ] `routine.ts` - 锚点匹配
- [ ] `routine.ts` - 珍珠习惯
- [ ] `proliferation.ts` - 习惯繁殖
- [ ] `reminder.ts` - 个性化提醒
- [ ] `celebration.ts` - 收藏管理
- [ ] `celebration.ts` - 发光感趋势
- [ ] `aspiration.ts` - 配方演练
- [ ] `analytics.ts` - 进阶分析图表
- [ ] `habit-doctor.ts` - 问题诊断

---

**文档版本**: v1.0
**生成工具**: Claude Code
**下一步**: 按优先级开始 P0 功能集成
