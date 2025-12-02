/**
 * 习惯养成Web应用 - 类型定义
 * 基于福格行为模型 (B=MAP) 的类型系统
 */

import { z } from "zod";

// ============ MAP 模型核心类型 ============

/**
 * 动机类型枚举
 * 基于福格行为模型的三种核心动机
 */
export const motivationTypeEnum = z.enum(["PLEASURE", "HOPE", "SOCIAL"]);
export type MotivationType = z.infer<typeof motivationTypeEnum>;

/**
 * 触发类型枚举
 * SIGNAL - 信号型：简单提醒
 * FACILITATOR - 便利型：降低门槛
 * SPARK - 火花型：激励+指引
 */
export const triggerTypeEnum = z.enum(["SIGNAL", "FACILITATOR", "SPARK"]);
export type TriggerType = z.infer<typeof triggerTypeEnum>;

/**
 * 提醒风格枚举
 */
export const reminderStyleEnum = z.enum(["GENTLE", "FIRM", "PLAYFUL"]);
export type ReminderStyle = z.infer<typeof reminderStyleEnum>;

// ============ v2.0 弹性打卡类型 ============

/**
 * 完成级别枚举（对应 Prisma CompletionLevel）
 */
export const completionLevelEnum = z.enum(["MINIMUM", "STANDARD", "EXCEEDED"]);
export type CompletionLevel = z.infer<typeof completionLevelEnum>;

/**
 * 情感标志枚举（对应 Prisma EmotionalMarker）
 */
export const emotionalMarkerEnum = z.enum([
  "BOREDOM",
  "FRUSTRATION",
  "AVOIDANCE",
  "PAIN",
  "JOY",
  "PRIDE",
]);
export type EmotionalMarker = z.infer<typeof emotionalMarkerEnum>;

// ============ v2.0 习惯繁殖类型 ============

/**
 * 繁殖响应枚举（对应 Prisma ProliferationResponse）
 */
export const proliferationResponseEnum = z.enum([
  "ACCEPTED",
  "DISMISSED",
  "POSTPONED",
]);
export type ProliferationResponse = z.infer<typeof proliferationResponseEnum>;

/**
 * 繁殖建议类型枚举
 */
export const proliferationTypeEnum = z.enum(["GROWTH", "SPAWN"]);
export type ProliferationType = z.infer<typeof proliferationTypeEnum>;

/**
 * 动机配置 (MAP-M)
 * 包含用户的动机类型、深层原因、愿景声明等
 */
export const motivationSchema = z.object({
  primaryType: motivationTypeEnum.describe("主要动机类型"),
  deepReason: z.string().describe("深层原因"),
  visionStatement: z.string().describe("愿景声明"),
  painPoints: z.array(z.string()).optional().describe("痛点列表"),
  motivationScore: z.number().min(1).max(10).describe("当前动机强度 1-10"),
});
export type Motivation = z.infer<typeof motivationSchema>;

/**
 * 能力配置 (MAP-A)
 * 包含当前水平、目标水平、微习惯定义等
 */
export const abilitySchema = z.object({
  currentLevel: z.string().describe("当前水平"),
  targetLevel: z.string().describe("目标水平"),
  microHabit: z.string().describe("微习惯定义"),
  difficultyScore: z.number().min(1).max(10).describe("预估难度 1-10"),
  barriers: z.array(z.string()).optional().describe("障碍列表"),
  simplificationTips: z.array(z.string()).optional().describe("简化建议"),
});
export type Ability = z.infer<typeof abilitySchema>;

/**
 * 提示配置 (MAP-P)
 * 包含锚定习惯、触发类型、偏好时间等
 */
export const promptSchema = z.object({
  anchorHabit: z.string().describe("锚定习惯"),
  triggerType: triggerTypeEnum.describe("触发类型"),
  preferredTime: z.string().describe("偏好时间"),
  contextCues: z.array(z.string()).optional().describe("情境线索"),
  reminderStyle: reminderStyleEnum.optional().describe("提醒风格"),
});
export type Prompt = z.infer<typeof promptSchema>;

/**
 * 完整习惯配置
 * 用于 AI 对话工具创建习惯时的输入
 */
export const habitConfigSchema = z.object({
  name: z.string().describe("习惯名称"),
  type: z.enum(["BUILD", "BREAK"]).describe("养成或戒除"),
  category: z.string().optional().describe("习惯分类"),
  motivation: motivationSchema,
  ability: abilitySchema,
  prompt: promptSchema,
});
export type HabitConfig = z.infer<typeof habitConfigSchema>;

// ============ 上下文类型定义 ============

/**
 * 提醒生成上下文
 * 用于生成个性化提醒文案
 */
export const reminderContextSchema = z.object({
  habitId: z.string(),
  habitName: z.string(),
  habitType: z.enum(["BUILD", "BREAK"]),
  motivationType: motivationTypeEnum,
  motivationLevel: z.number().min(1).max(10),
  streakDays: z.number().describe("连续完成天数"),
  recentRate: z.number().min(0).max(100).describe("最近7天完成率"),
  lastCompletedAt: z.date().optional(),
  currentPhase: z.number(),
});
export type ReminderContext = z.infer<typeof reminderContextSchema>;

/**
 * 动机激励上下文
 * 用于生成个性化激励内容
 */
export const motivationContextSchema = z.object({
  habitId: z.string(),
  habitName: z.string(),
  deepReason: z.string(),
  visionStatement: z.string(),
  streakDays: z.number(),
  currentState: z
    .enum(["STRONG", "NORMAL", "DECLINING", "CRITICAL"])
    .describe("当前动机状态"),
  daysSinceStart: z.number(),
  recentCompletionRate: z.number(),
});
export type MotivationContext = z.infer<typeof motivationContextSchema>;

/**
 * 数据洞察上下文
 * 用于生成习惯数据洞察
 */
export const habitDataSchema = z.object({
  habit: z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["BUILD", "BREAK"]),
    currentPhase: z.number(),
    createdAt: z.date(),
  }),
  logs: z.array(
    z.object({
      loggedAt: z.date(),
      completed: z.boolean(),
      difficultyRating: z.number().optional(),
      moodBefore: z.number().optional(),
      moodAfter: z.number().optional(),
    }),
  ),
  stats: z.object({
    totalDays: z.number(),
    completedDays: z.number(),
    currentStreak: z.number(),
    longestStreak: z.number(),
    averageDifficulty: z.number().optional(),
  }),
});
export type HabitData = z.infer<typeof habitDataSchema>;

// ============ 坏习惯戒除类型 ============

/**
 * 触发类型枚举（坏习惯分析）
 */
export const triggerPatternTypeEnum = z.enum([
  "TEMPORAL", // 时间模式
  "CONTEXTUAL", // 情境模式
  "EMOTIONAL", // 情绪模式
  "BEHAVIORAL", // 行为模式
]);
export type TriggerPatternType = z.infer<typeof triggerPatternTypeEnum>;

/**
 * 触发记录 (坏习惯戒除)
 * 记录触发坏习惯的场景
 */
export const triggerRecordSchema = z.object({
  timestamp: z.date(),
  triggerType: triggerPatternTypeEnum,
  context: z.string().describe("触发时的场景描述"),
  location: z.string().optional(),
  emotion: z.string().optional(),
  intensity: z.number().min(1).max(10).describe("冲动强度"),
  resisted: z.boolean().describe("是否成功抵抗"),
  copingStrategy: z.string().optional().describe("使用的应对策略"),
});
export type TriggerRecord = z.infer<typeof triggerRecordSchema>;

/**
 * 触发模式分析结果
 */
export const triggerAnalysisSchema = z.object({
  patterns: z.array(
    z.object({
      type: triggerPatternTypeEnum,
      description: z.string(),
      confidence: z.number().min(0).max(1),
      evidence: z.array(z.string()),
    }),
  ),
  deepNeed: z.string().describe("坏习惯满足的深层需求"),
  substituteBehaviors: z.array(z.string()).describe("替代行为建议"),
  environmentDesign: z.array(z.string()).describe("环境设计建议"),
});
export type TriggerAnalysis = z.infer<typeof triggerAnalysisSchema>;

// ============ v1.5 报告类型定义 ============

/**
 * 报告摘要
 */
export const reportSummarySchema = z.object({
  completionRate: z.number(),
  rateChange: z.number().describe("较上周变化"),
  activeHabits: z.number(),
  longestStreak: z.number(),
  totalCheckins: z.number(),
  perfectDays: z.number().describe("全部完成的天数"),
});
export type ReportSummary = z.infer<typeof reportSummarySchema>;

/**
 * 报告亮点
 */
export const reportHighlightSchema = z.object({
  habitId: z.string(),
  habitName: z.string(),
  achievement: z.string(),
  emoji: z.string(),
  metric: z.string().optional().describe("具体数据，如 '连续7天'"),
});
export type ReportHighlight = z.infer<typeof reportHighlightSchema>;

/**
 * 模式发现
 */
export const patternFindingSchema = z.object({
  finding: z.string(),
  implication: z.string(),
  confidence: z.number().min(0).max(1),
  dataPoints: z.number().describe("支撑数据点数量"),
});
export type PatternFinding = z.infer<typeof patternFindingSchema>;

/**
 * 庆祝时刻（v2.0 新增）
 * 基于福格行为模型的"庆祝是习惯养成的肥料"理念
 */
export const celebrationMomentSchema = z.object({
  habitName: z.string(),
  achievement: z.string().describe("值得庆祝的成就"),
  celebrationText: z.string().describe("情感化的庆祝语言"),
  emoji: z.string(),
});
export type CelebrationMoment = z.infer<typeof celebrationMomentSchema>;

/**
 * 周报完整结构 (v2.0 庆祝优先版)
 */
export const weeklyReportSchema = z.object({
  // 核心数据摘要（简化展示）
  summary: reportSummarySchema,
  // 🎉 本周庆祝（最重要！）
  celebrationMoments: z
    .array(celebrationMomentSchema)
    .describe("本周值得庆祝的时刻"),
  // ✨ 亮点时刻
  highlights: z.array(reportHighlightSchema),
  // 💡 轻量洞察（最多2个）
  patterns: z.array(patternFindingSchema),
  // 🎯 下周一件事（只给一个最重要的建议）
  suggestions: z
    .array(
      z.object({
        category: z.enum(["TIMING", "DIFFICULTY", "MOTIVATION", "TRIGGER"]),
        suggestion: z.string(),
        expectedImpact: z.string(),
      }),
    )
    .max(1),
  // 🌟 下周小目标（简单、具体、可达成）
  nextWeekGoals: z
    .array(
      z.object({
        goal: z.string(),
        habitId: z.string().optional(),
        measurable: z.string(),
      }),
    )
    .max(2),
  // 整体鼓励语
  encouragement: z.string().optional().describe("温暖的整体鼓励"),
});
export type WeeklyReport = z.infer<typeof weeklyReportSchema>;

/**
 * 里程碑回顾
 */
export const milestoneReflectionSchema = z.object({
  journey: z.string().describe("历程总结"),
  keyMoments: z.array(z.string()).describe("关键时刻"),
  lessonsLearned: z.array(z.string()).describe("学到的经验"),
  strengthsShown: z.array(z.string()).describe("展现的优势"),
});
export type MilestoneReflection = z.infer<typeof milestoneReflectionSchema>;

// ============ 阶段配置类型 ============

/**
 * 渐进式阶段配置
 * 用于任务拆解和微习惯设计
 */
export const phaseConfigSchema = z.object({
  phase: z.number(),
  name: z.string(),
  duration: z.string().describe("建议持续时间，如 '7天'"),
  microHabit: z.string().describe("微习惯定义"),
  successCriteria: z.string().describe("成功标准"),
  difficultyScore: z.number().min(1).max(10),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
});
export type PhaseConfig = z.infer<typeof phaseConfigSchema>;

/**
 * 任务拆解结果
 */
export const taskBreakdownSchema = z.object({
  analysis: z.string().describe("当前难度分析"),
  phases: z.array(phaseConfigSchema).describe("渐进式阶段"),
  tips: z.array(z.string()).describe("简化建议"),
});
export type TaskBreakdown = z.infer<typeof taskBreakdownSchema>;

// ============ v1.5 分析类型定义 ============

/**
 * 时间热力图分析结果
 */
export const timeHeatmapSchema = z.object({
  heatmap: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6),
      hourOfDay: z.number().min(0).max(23),
      completionRate: z.number(),
      avgDuration: z.number().optional(),
    }),
  ),
  insights: z.array(z.string()),
  optimalWindows: z.array(
    z.object({
      dayOfWeek: z.number(),
      startHour: z.number(),
      endHour: z.number(),
      reason: z.string(),
    }),
  ),
});
export type TimeHeatmap = z.infer<typeof timeHeatmapSchema>;

/**
 * 情绪关联分析结果
 */
export const moodCorrelationSchema = z.object({
  beforeAfterCorrelation: z.object({
    averageMoodBefore: z.number(),
    averageMoodAfter: z.number(),
    moodLift: z.number(),
    significance: z.enum(["HIGH", "MEDIUM", "LOW"]),
  }),
  moodTriggers: z.array(
    z.object({
      trigger: z.string(),
      impactOnCompletion: z.number().min(-1).max(1),
      frequency: z.number(),
    }),
  ),
  recommendations: z.array(z.string()),
});
export type MoodCorrelation = z.infer<typeof moodCorrelationSchema>;

/**
 * 习惯关联分析结果
 */
export const habitCorrelationSchema = z.object({
  correlations: z.array(
    z.object({
      habit1Id: z.string(),
      habit2Id: z.string(),
      correlationScore: z.number().min(-1).max(1),
      relationship: z.enum(["POSITIVE", "NEGATIVE", "NEUTRAL"]),
      insight: z.string(),
    }),
  ),
  clusters: z.array(
    z.object({
      name: z.string(),
      habitIds: z.array(z.string()),
      description: z.string(),
    }),
  ),
  suggestions: z.array(
    z.object({
      type: z.enum(["STACK", "SEPARATE", "SEQUENCE"]),
      habits: z.array(z.string()),
      reason: z.string(),
    }),
  ),
});
export type HabitCorrelation = z.infer<typeof habitCorrelationSchema>;

/**
 * 中断风险预测结果
 */
export const breakRiskSchema = z.object({
  overallRisk: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  riskScore: z.number().min(0).max(100),
  riskFactors: z.array(
    z.object({
      factor: z.string(),
      weight: z.number(),
      currentStatus: z.string(),
    }),
  ),
  warningSignals: z.array(
    z.object({
      signal: z.string(),
      detected: z.boolean(),
      lastOccurrence: z.string().optional(),
    }),
  ),
  preventiveActions: z.array(
    z.object({
      action: z.string(),
      priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
      expectedImpact: z.string(),
    }),
  ),
});
export type BreakRisk = z.infer<typeof breakRiskSchema>;

// ============ AI 生成类型 ============

/**
 * 提醒生成结果
 */
export const reminderSchema = z.object({
  content: z.string().describe("提醒文案，30-60字"),
  promptType: triggerTypeEnum,
  actionGuidance: z.string().describe("具体行动指引"),
});
export type Reminder = z.infer<typeof reminderSchema>;

/**
 * 动机激励生成结果
 */
export const motivationMessageSchema = z.object({
  message: z.string().describe("激励文案，50-100字"),
  motivationType: z.enum([
    "PLEASURE_GAIN", // 获得愉悦
    "PAIN_AVOID", // 规避痛苦
    "HOPE_FUTURE", // 希望愿景
    "FEAR_LOSS", // 损失恐惧
    "SOCIAL_PROOF", // 社会认同
  ]),
  actionSuggestion: z.string().describe("下一步行动建议"),
});
export type MotivationMessage = z.infer<typeof motivationMessageSchema>;

/**
 * 数据洞察生成结果
 */
export const insightSchema = z.object({
  positive: z
    .object({
      title: z.string(),
      content: z.string().max(50),
    })
    .describe("正向强化洞察"),
  pattern: z
    .object({
      title: z.string(),
      content: z.string().max(50),
    })
    .describe("模式识别洞察"),
  suggestion: z
    .object({
      title: z.string(),
      content: z.string().max(50),
      action: z.string().describe("具体行动建议"),
    })
    .describe("优化建议洞察"),
});
export type Insight = z.infer<typeof insightSchema>;
