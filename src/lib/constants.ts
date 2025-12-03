/**
 * 习惯养成Web应用 - 常量定义
 * 集中管理业务逻辑中的阈值和配置
 */

// ============ 诊断阈值 ============

/**
 * 习惯医生诊断阈值
 */
export const DIAGNOSIS_THRESHOLDS = {
  /** 完成率低于此值需要深度诊断 */
  COMPLETION_RATE_CRITICAL: 0.5,
  /** 漏打卡天数达到此值需要深度诊断 */
  MISSED_DAYS_CRITICAL: 3,
  /** 完成率达到此值视为健康 */
  COMPLETION_RATE_HEALTHY: 0.7,
  /** 完成率达到此值需要关注 */
  COMPLETION_RATE_ATTENTION: 0.4,
} as const;

// ============ 习惯繁殖阈值 ============

/**
 * 习惯繁殖条件阈值
 */
export const PROLIFERATION_THRESHOLDS = {
  /** 稳定性分数达到此值可以繁殖 */
  STABILITY_SCORE_READY: 80,
  /** 完成率达到此值视为稳定 */
  COMPLETION_RATE_STABLE: 0.8,
  /** 连续天数达到此值视为稳定 */
  CONSECUTIVE_DAYS_STABLE: 7,
  /** 平均难度低于此值视为轻松 */
  AVG_DIFFICULTY_EASY: 3,
  /** 习惯总天数达到此值可以考虑繁殖 */
  TOTAL_DAYS_MINIMUM: 14,
  /** 距离上次提示至少间隔天数 */
  DAYS_BETWEEN_PROMPTS: 7,
  /** 用户连续拒绝次数超过此值停止提示 */
  MAX_DISMISS_COUNT: 3,
} as const;

// ============ 进阶系统阈值 ============

/**
 * 习惯进阶评估阈值
 */
export const ADVANCE_THRESHOLDS = {
  /** 完成率达到此值可以进阶 */
  COMPLETION_RATE_READY: 0.85,
  /** 连续天数达到此值可以进阶 */
  CONSECUTIVE_DAYS_READY: 7,
  /** 平均难度低于此值可以进阶 */
  AVG_DIFFICULTY_READY: 2.5,
  /** "想做更多"次数达到此值表明准备好进阶 */
  WANT_MORE_COUNT_READY: 2,
} as const;

// ============ 时间范围常量 ============

/**
 * 数据查询时间范围（天数）
 */
export const TIME_RANGES = {
  /** 近期分析天数 */
  RECENT_DAYS: 7,
  /** 中期分析天数 */
  MEDIUM_DAYS: 14,
  /** 长期分析天数 */
  LONG_DAYS: 30,
} as const;

// ============ 稳定性计算权重 ============

/**
 * 习惯稳定性评分权重
 */
export const STABILITY_WEIGHTS = {
  /** 完成率权重 */
  COMPLETION_RATE: 0.4,
  /** 连续天数权重 */
  STREAK: 0.25,
  /** 难度评分权重 */
  DIFFICULTY: 0.2,
  /** 情绪平衡权重 */
  EMOTION: 0.15,
} as const;

// ============ UI 相关常量 ============

/**
 * 列表分页限制
 */
export const PAGINATION = {
  /** 默认每页数量 */
  DEFAULT_PAGE_SIZE: 10,
  /** 最大每页数量 */
  MAX_PAGE_SIZE: 50,
  /** 历史记录默认数量 */
  HISTORY_DEFAULT: 10,
} as const;
