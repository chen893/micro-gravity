/**
 * 徽章定义模块
 * 定义所有系统内置徽章及其解锁条件
 */

import type { BadgeRarity } from "generated/prisma";

// ============ 徽章类型定义 ============

/**
 * 解锁条件类型
 */
export type UnlockConditionType =
  | "FIRST_HABIT" // 创建第一个习惯
  | "FIRST_CHECKIN" // 首次打卡
  | "FIRST_SHINE" // 首次发光感评分
  | "STREAK" // 连续天数
  | "TOTAL_CELEBRATIONS" // 累计庆祝次数
  | "AVG_SHINE_SCORE" // 平均发光感评分
  | "PERFECT_DAY" // 完美日（所有习惯全完成）
  | "PERFECT_WEEK" // 完美周
  | "COMEBACK" // 中断后复出
  | "RECIPE_COUNT"; // 微习惯配方数量

/**
 * 解锁条件结构
 */
export interface UnlockCondition {
  type: UnlockConditionType;
  value?: number; // 数值条件（如天数、次数）
  habitSpecific?: boolean; // 是否针对单个习惯
}

/**
 * 徽章定义
 */
export interface BadgeDefinition {
  code: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  category: string;
  unlockCondition: UnlockCondition;
}

// ============ 徽章分类 ============

export const BADGE_CATEGORIES = {
  STARTER: "起步系列",
  STREAK: "连续系列",
  CELEBRATION: "庆祝系列",
  PERFECT: "全勤系列",
  SPECIAL: "特殊系列",
} as const;

// ============ 徽章定义列表 ============

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // ========== 起步系列 ==========
  {
    code: "SPROUT",
    name: "萌芽",
    description: "创建你的第一个习惯",
    icon: "🌱",
    rarity: "COMMON",
    category: BADGE_CATEGORIES.STARTER,
    unlockCondition: { type: "FIRST_HABIT" },
  },
  {
    code: "FIRST_STEP",
    name: "第一步",
    description: "完成首次打卡",
    icon: "👣",
    rarity: "COMMON",
    category: BADGE_CATEGORIES.STARTER,
    unlockCondition: { type: "FIRST_CHECKIN" },
  },
  {
    code: "FIRST_SHINE",
    name: "初次发光",
    description: "首次记录发光感评分",
    icon: "🎉",
    rarity: "COMMON",
    category: BADGE_CATEGORIES.STARTER,
    unlockCondition: { type: "FIRST_SHINE" },
  },

  // ========== 连续系列 ==========
  {
    code: "FLAME_7",
    name: "小火苗",
    description: "单个习惯连续完成7天",
    icon: "🔥",
    rarity: "COMMON",
    category: BADGE_CATEGORIES.STREAK,
    unlockCondition: { type: "STREAK", value: 7, habitSpecific: true },
  },
  {
    code: "FLAME_21",
    name: "燃烧吧",
    description: "单个习惯连续完成21天",
    icon: "🔥🔥",
    rarity: "RARE",
    category: BADGE_CATEGORIES.STREAK,
    unlockCondition: { type: "STREAK", value: 21, habitSpecific: true },
  },
  {
    code: "FLAME_66",
    name: "永恒之火",
    description: "单个习惯连续完成66天",
    icon: "🔥🔥🔥",
    rarity: "EPIC",
    category: BADGE_CATEGORIES.STREAK,
    unlockCondition: { type: "STREAK", value: 66, habitSpecific: true },
  },
  {
    code: "DIAMOND_WILL",
    name: "钻石意志",
    description: "单个习惯连续完成100天",
    icon: "💎",
    rarity: "LEGENDARY",
    category: BADGE_CATEGORIES.STREAK,
    unlockCondition: { type: "STREAK", value: 100, habitSpecific: true },
  },

  // ========== 庆祝系列 ==========
  {
    code: "SHINE_ROOKIE",
    name: "发光新手",
    description: "累计庆祝10次",
    icon: "✨",
    rarity: "COMMON",
    category: BADGE_CATEGORIES.CELEBRATION,
    unlockCondition: { type: "TOTAL_CELEBRATIONS", value: 10 },
  },
  {
    code: "CELEBRATION_PRO",
    name: "庆祝达人",
    description: "累计庆祝50次",
    icon: "🌟",
    rarity: "RARE",
    category: BADGE_CATEGORIES.CELEBRATION,
    unlockCondition: { type: "TOTAL_CELEBRATIONS", value: 50 },
  },
  {
    code: "SHINE_MASTER",
    name: "发光大师",
    description: "平均发光感评分达到4分以上",
    icon: "💫",
    rarity: "EPIC",
    category: BADGE_CATEGORIES.CELEBRATION,
    unlockCondition: { type: "AVG_SHINE_SCORE", value: 4 },
  },

  // ========== 全勤系列 ==========
  {
    code: "PERFECT_DAY",
    name: "完美日",
    description: "单日所有习惯全部完成",
    icon: "⭐",
    rarity: "COMMON",
    category: BADGE_CATEGORIES.PERFECT,
    unlockCondition: { type: "PERFECT_DAY" },
  },
  {
    code: "PERFECT_WEEK",
    name: "完美周",
    description: "连续7天完美日",
    icon: "🏆",
    rarity: "RARE",
    category: BADGE_CATEGORIES.PERFECT,
    unlockCondition: { type: "PERFECT_WEEK" },
  },

  // ========== 特殊系列 ==========
  {
    code: "COMEBACK",
    name: "逆袭者",
    description: "从中断恢复并再次连续7天",
    icon: "💪",
    rarity: "RARE",
    category: BADGE_CATEGORIES.SPECIAL,
    unlockCondition: { type: "COMEBACK", value: 7 },
  },
  {
    code: "RECIPE_DESIGNER",
    name: "配方设计师",
    description: "完成5个微习惯配方设计",
    icon: "🧪",
    rarity: "COMMON",
    category: BADGE_CATEGORIES.SPECIAL,
    unlockCondition: { type: "RECIPE_COUNT", value: 5 },
  },
];

// ============ 辅助函数 ============

/**
 * 获取徽章定义
 */
export function getBadgeDefinition(code: string): BadgeDefinition | undefined {
  return BADGE_DEFINITIONS.find((b) => b.code === code);
}

/**
 * 获取分类下的所有徽章
 */
export function getBadgesByCategory(category: string): BadgeDefinition[] {
  return BADGE_DEFINITIONS.filter((b) => b.category === category);
}

/**
 * 获取稀有度对应的颜色
 */
export function getRarityColor(rarity: BadgeRarity): string {
  const colors: Record<BadgeRarity, string> = {
    COMMON: "text-gray-500",
    RARE: "text-blue-500",
    EPIC: "text-purple-500",
    LEGENDARY: "text-amber-500",
  };
  return colors[rarity];
}

/**
 * 获取稀有度对应的背景色
 */
export function getRarityBgColor(rarity: BadgeRarity): string {
  const colors: Record<BadgeRarity, string> = {
    COMMON: "bg-gray-100 dark:bg-gray-800",
    RARE: "bg-blue-100 dark:bg-blue-900/30",
    EPIC: "bg-purple-100 dark:bg-purple-900/30",
    LEGENDARY: "bg-amber-100 dark:bg-amber-900/30",
  };
  return colors[rarity];
}

/**
 * 获取稀有度中文名称
 */
export function getRarityLabel(rarity: BadgeRarity): string {
  const labels: Record<BadgeRarity, string> = {
    COMMON: "普通",
    RARE: "稀有",
    EPIC: "史诗",
    LEGENDARY: "传说",
  };
  return labels[rarity];
}
