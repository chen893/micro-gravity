# `generateObject` 调用梳理

逐个列出项目里通过 `generateObject` 构建结构化 AI 输出的函数，说明各自承担的角色、约束的 Schema 与主要用途，方便后续统一维护提示词、模型和类型。

说明：每个函数后新增 **状态** 行，区分其是否真能被终端用户触发：

- `ROUTED_UI`：API 已在 `src/app/(app)/...` 页面或组件中调用，且该页面可通过导航路由访问。
- `UNWIRED_API`：tRPC 路由/React 组件存在，但没有任何页面或入口引用，用户暂时触不到。
- `BACKGROUND_AUTOMATION`：仅由定时任务或后台流程触发，但仍直接影响用户体验（例如推送/邮件）。
- `NO_CALLERS`：函数没有调用者，完全闲置。

## src/lib/troubleshoot/habit-doctor.ts

- `deepDiagnose`：用 `diagnosisReportSchema` 和 `mode: 'json'` 约束“习惯医生”诊断报告，结合 PROMPT→ABILITY→MOTIVATION 的排查顺序，把症状数据、用户反馈和最近日志整理成主/次诊断、处方列表和鼓励语。  
  - **状态**：ROUTED_UI —— 通过 `habitDoctor.deepDiagnose`（`src/server/api/routers/habit-doctor.ts:186`）并在习惯详情页组件 `src/app/(app)/habits/[id]_components/habit-detail-content.tsx:544` 中渲染 `<HabitDoctor />`。
- `generatePrescription`：针对不同诊断类别动态插入分类提示，要求 `prescriptionSchema` 列表，生成 2-3 条含步骤、难度和预期见效期的干预建议，作为 deepDiagnose 后的执行指南。  
  - **状态**：ROUTED_UI —— 由同一 `HabitDoctor` UI（`src/components/habit/habit-doctor.tsx:122`）发起 mutation。

## src/lib/ai/ability.ts

- `breakdownHabit`：先计算六维能力和综合难度，再把这些指标连同障碍写入提示，借助 `taskBreakdownSchema` 获得多阶段逐步升级的任务拆解（分析、phases、tips），主打“2 分钟规则”下的能力链设计。  
  - **状态**：NO_CALLERS —— 仓库内无任何引用。

## src/lib/ai/analytics.ts

- `analyzeTimePatterns`：在 `timeHeatmapSchema` 下输出时间热力图、洞察和最优窗口，帮助解释本地统计出的高低完成率时段。  
  - **状态**：ROUTED_UI —— `analytics.getTimePatterns`（`src/server/api/routers/analytics.ts:76` 起）被 `app/(app)/analytics/page.tsx:43` 调用。
- `analyzeMoodCorrelation`：向模型提供情绪提升、触发因子和完成率差异，要求 `moodCorrelationSchema`，得到情绪与习惯完成的关联解读与行动建议。  
  - **状态**：ROUTED_UI —— 页面 `app/(app)/analytics/page.tsx:48` 通过 `api.analytics.getMoodCorrelation` 触发后端 `analyzeMoodCorrelation`。
- `analyzeHabitCorrelations`：汇总多习惯的同日完成数据，用 `habitCorrelationSchema` 得到习惯关系、聚类与堆叠/分离建议。  
  - **状态**：ROUTED_UI —— `app/(app)/analytics/page.tsx:53` 经 `api.analytics.getHabitCorrelations` 使用。
- `predictBreakRisk`：结合完成趋势、难度、心情与 streak，按 `breakRiskSchema` 让 AI 输出风险等级、信号及预防动作，用于预警掉队风险。  
  - **状态**：ROUTED_UI —— 风险卡片来自 `analytics.getDashboard`（`src/server/api/routers/analytics.ts:311` / `:408` 路径），在 `app/(app)/analytics/page.tsx` 的 “risk” tab 展示。

## src/lib/ai/demotivator-analysis.ts

- `analyzeDemotivators`：以 `demotivatorAnalysisSchema` 约束识别结果，分析用户输入中的 FEAR / ANXIETY 等去激励因素，并生成个性化策略与鼓励话术。  
  - **状态**：ROUTED_UI —— 通过 `api.aspiration.analyzeDemotivators`（`src/components/habit-creation/demotivator-step.tsx:74`）出现在 `/habits/new/v2` 向导。

## src/lib/ai/break-habit.ts

- `analyzeTriggersDeep`：整合触发统计、时间模式和最近记录，通过 `triggerAnalysisSchema` 生成深层需求、替代行为及环境设计建议，应用在 break habit 洞察页。  
  - **状态**：UNWIRED_API —— 虽在 `analytics.getTriggerAnalysis`（`src/server/api/routers/analytics.ts:460`）内调用，前端仅有孤立组件 `src/components/break-habit/trigger-analysis.tsx` 调用 `api.analytics.getTriggerAnalysis`，但该组件未被任何页面导入（`rg` 无匹配），用户无法进入。

## src/lib/ai/break-habit-flow.ts

- `generateBreakFlow`：针对指定坏习惯与触发场景，强制 `breakFlowResultSchema`，一次性产出 Prompt 策略、Ability 摩擦设计与执行顺序概览。  
  - **状态**：NO_CALLERS —— 仅定义于 `break-habit-flow.ts:88`。
- `generatePromptStrategies`：用 `promptStrategySchema` 数组描述 REMOVE/AVOID/IGNORE 各类策略，聚焦提示工程。  
  - **状态**：NO_CALLERS。
- `generateAbilityBarriers`：要求 `abilityBarrierSchema` 列表，让 AI 提供 TIME/MONEY/PHYSICAL/MENTAL/ROUTINE 多维加摩擦点子。  
  - **状态**：NO_CALLERS。
- `evaluateBreakPlan`：把选中的策略/摩擦传给模型，依据 `feasibilityScore`、`strengths` 等字段对方案可行性做審阅，帮助迭代。  
  - **状态**：NO_CALLERS。

## src/lib/ai/report.ts

- `generateWeeklyReport`：在 `weeklyReportSchema` 下生成庆祝优先的周报（summary、celebrationMoments、patterns 等），失败时会退回本地默认值。  
  - **状态**：BACKGROUND_AUTOMATION —— Cron 处理（`src/app/api/cron/weekly-report/route.ts:119`）定期触发。
- `generateMonthlyReport`：利用 `monthlyReportSchema` 汇总周趋势、月度亮点与下月聚焦行动。  
  - **状态**：BACKGROUND_AUTOMATION —— `src/app/api/cron/monthly-report/route.ts:187`。
- `generateMilestoneReport`：通过 `milestoneReportOutputSchema` 写出庆祝文案、旅程回顾和下一阶段建议，用于 7/21/66/100 天里程碑推送。  
  - **状态**：BACKGROUND_AUTOMATION —— `cron/milestone-check/route.ts:66` 负责触发。

## src/lib/ai/anchor-matching.ts

- `extractRoutineActivities`：把用户自然语言日程解析为 `routineActivitySchema` 列表，供后续 anchor 匹配使用。  
  - **状态**：ROUTED_UI —— Routine 管理页 `app/(app)/routine/page.tsx:149` 调用 `api.routine.extractActivities`.
- `matchAnchors`：针对目标行为与频率，输出 `anchorMatchSchema` 数组，用于挑选最佳锚点。  
  - **状态**：ROUTED_UI —— 在 `/habits/new/v2` 向导 `habit-creation-wizard.tsx:106` 中触发 `api.routine.matchAnchors`.
- `validateAnchor`：基于 `anchorValidationSchema` 给出锚点可靠性评分、隐患与备选建议。  
  - **状态**：ROUTED_UI —— 同向导中的 `validateAnchorMutation`.
- `suggestAnchorsFromRoutine`：传入按时段的活动列表，输出最佳时段与候选锚点。  
  - **状态**：ROUTED_UI —— Routine 页面 `app/(app)/routine/page.tsx:500` 使用 `api.routine.suggestFromRoutine`.
- `designPearlHabit`：把烦人的“沙粒”转成触发器，输出包含 trigger/miniAction/reasoning 的“珍珠习惯”。  
  - **状态**：ROUTED_UI —— Routine 页面 `page.tsx:164` 的 `designPearlMutation`.

## src/lib/ai/habit-proliferation.ts

- `generateProliferationSuggestions`：读取稳定度评分与目标期望，按 `proliferationSuggestionsSchema` 输出 GROWTH / SPAWN 建议、微习惯与锚点，辅助习惯扩张。  
  - **状态**：ROUTED_UI —— 习惯详情页（`app/(app)/habits/[id]_components/habit-detail-content.tsx:93` 的 `getSuggestionsMutation`）调用。

## src/lib/ai/reminder.ts

- `generateReminder`：依据动机水平和最近完成率挑选提示类型，要求 `reminderSchema` 并启用 `mode: 'json'`，生成内容、行动指引与 promptType。  
  - **状态**：ROUTED_UI —— Dashboard 的智能提醒卡片 `app/(app)/dashboard/_components/smart-reminders.tsx:39` 调用 `api.reminder.generateBatch`→`generateRemindersForHabits`→`generateReminder`.

## src/lib/ai/phase-design.ts

- `designPhasePath`：在详细设计原则提示下使用 `mode: 'json'`，依 `phasePathSchema` 输出 5-8 个逐级 phase（microHabit、successCriteria、advanceSignals 等）。  
  - **状态**：ROUTED_UI —— 习惯详情页的「设计阶段」弹窗（`app/(app)/habits/[id]_components/habit-detail-content.tsx:104`）触发 `api.phase.designPath`.
- `designQuickPath`：针对简单目标生成 3-5 段短流程，同样由 `phasePathSchema` 约束结构。  
  - **状态**：ROUTED_UI —— 同一页面的 `quickPathMutation`（`habit-detail-content.tsx:119`）。

## src/lib/ai/motivation.ts

- `generateMotivation`：结合动机状态、 streak 与干预时间点，用 `motivationMessageSchema` 产生可执行的激励语、动机类型和行动建议。  
  - **状态**：NO_CALLERS —— 目前无 API/组件引用。

## src/lib/ai/insights.ts

- `generateInsights`：在提供基础统计后，借助 `insightSchema` 生成 3 条“正向强化 / 模式识别 / 优化建议”洞察，若失败回退到本地 heuristics。  
  - **状态**：ROUTED_UI —— `app/(app)/analytics/page.tsx:40` 调用 `api.insights.getDashboard`.

## src/lib/ai/focus-map.ts

- `generateBehaviorCluster`：把愿景转化为 10-15 个候选行为（包含新增、一次性及要停止的行为），供后续筛选。  
  - **状态**：ROUTED_UI —— 愿望页 `app/(app)/aspirations/page.tsx:474` 会调用 `api.aspiration.generateFocusMap`，而行为集群由 `generateBehaviorCluster` 预先生成。
- `generateFocusMap`：依据行为清单和用户约束，产出 `focusMapResultSchema`。  
  - **状态**：ROUTED_UI —— `app/(app)/aspirations/page.tsx:474` 中的 “生成焦点地图” 操作。
- `generateStarterStep`：生成行为的“启动第一步”，返回 starterStep/explanation 结构，引导用户只做最小动作。  
  - **状态**：ROUTED_UI —— Habit Creation Wizard 第 3 步（`habit-creation-wizard.tsx:114`）。
- `generateScaledBehavior`：在 30 秒内可完成的尺度上，提供缩小版行为描述及原因，降低门槛。  
  - **状态**：ROUTED_UI —— 同向导 `habit-creation-wizard.tsx:116`.
- `generateHabitRecipe`：围绕 anchor/behavior/celebration 三要素输出完整微习惯配方文本。  
  - **状态**：ROUTED_UI —— Habit Creation Wizard 末尾步骤 `habit-creation-wizard.tsx:448`。

## src/lib/ai/habit-swap.ts

- `analyzeDeepNeeds`：把坏习惯的触发情境和情绪映射到 `needAnalysisSchema`，识别主要/次要深层需求及证据。  
  - **状态**：NO_CALLERS。
- `generateSwapRecipe`：根据深层需求和偏好，用 `swapRecipeSchema` 输出替代行为列表、swap 公式、过渡计划与成功指标。  
  - **状态**：NO_CALLERS。
- `quickSuggestSubstitutes`：在知道 needType 时快速生成 `substituteBehaviorSchema` 列表（按容易度排序）。  
  - **状态**：NO_CALLERS。
- `generateSwapCard`：把选中的替代行为封装成提醒卡片（标题、触发提醒、行动提示、动机与小贴士），便于即时替换。  
  - **状态**：NO_CALLERS。
