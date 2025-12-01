/**
 * 成就触发引擎
 * 检测用户行为并触发相应徽章解锁
 */

import type { PrismaClient } from "generated/prisma";
import { BADGE_DEFINITIONS, type UnlockCondition } from "./badges";

// ============ 类型定义 ============

/**
 * 检测上下文 - 传递给各检测函数的数据
 */
interface DetectionContext {
  userId: string;
  habitId?: string;
  db: PrismaClient;
}

/**
 * 解锁结果
 */
export interface UnlockResult {
  badgeCode: string;
  badgeName: string;
  badgeIcon: string;
  habitId?: string;
  isNew: boolean; // 是否是新解锁的
}

// ============ 核心检测函数 ============

/**
 * 检测所有可能的徽章解锁
 * 在关键事件（打卡、创建习惯等）后调用
 */
export async function checkBadgeUnlocks(
  ctx: DetectionContext,
): Promise<UnlockResult[]> {
  const results: UnlockResult[] = [];

  // 获取用户已有的徽章
  const existingBadges = await ctx.db.userBadge.findMany({
    where: { userId: ctx.userId },
    select: { badgeId: true, badge: { select: { code: true } } },
  });
  const existingCodes = new Set(existingBadges.map((ub) => ub.badge.code));

  // 遍历所有徽章定义，检测是否满足条件
  for (const badgeDef of BADGE_DEFINITIONS) {
    // 跳过已获得的徽章
    if (existingCodes.has(badgeDef.code)) continue;

    // 检测是否满足解锁条件
    const unlocked = await checkCondition(badgeDef.unlockCondition, ctx);

    if (unlocked.satisfied) {
      // 获取或创建徽章记录（使用 upsert）
      const badge = await ctx.db.badge.upsert({
        where: { code: badgeDef.code },
        update: {}, // 已存在则不更新
        create: {
          code: badgeDef.code,
          name: badgeDef.name,
          description: badgeDef.description,
          icon: badgeDef.icon,
          rarity: badgeDef.rarity,
          category: badgeDef.category,
          // 将 unlockCondition 转为纯 JSON 对象
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          unlockCondition: JSON.parse(JSON.stringify(badgeDef.unlockCondition)),
        },
      });

      // 创建用户徽章
      await ctx.db.userBadge.create({
        data: {
          userId: ctx.userId,
          badgeId: badge.id,
          habitId: unlocked.habitId,
        },
      });

      results.push({
        badgeCode: badgeDef.code,
        badgeName: badgeDef.name,
        badgeIcon: badgeDef.icon,
        habitId: unlocked.habitId,
        isNew: true,
      });
    }
  }

  return results;
}

/**
 * 检测单个条件是否满足
 */
async function checkCondition(
  condition: UnlockCondition,
  ctx: DetectionContext,
): Promise<{ satisfied: boolean; habitId?: string }> {
  switch (condition.type) {
    case "FIRST_HABIT":
      return checkFirstHabit(ctx);

    case "FIRST_CHECKIN":
      return checkFirstCheckin(ctx);

    case "FIRST_SHINE":
      return checkFirstShine(ctx);

    case "STREAK":
      return checkStreak(ctx, condition.value ?? 7, condition.habitSpecific);

    case "TOTAL_CELEBRATIONS":
      return checkTotalCelebrations(ctx, condition.value ?? 10);

    case "AVG_SHINE_SCORE":
      return checkAvgShineScore(ctx, condition.value ?? 4);

    case "PERFECT_DAY":
      return checkPerfectDay(ctx);

    case "PERFECT_WEEK":
      return checkPerfectWeek(ctx);

    case "COMEBACK":
      return checkComeback(ctx, condition.value ?? 7);

    case "RECIPE_COUNT":
      return checkRecipeCount(ctx, condition.value ?? 5);

    default:
      return { satisfied: false };
  }
}

// ============ 具体检测函数 ============

/**
 * 检测：创建第一个习惯
 */
async function checkFirstHabit(
  ctx: DetectionContext,
): Promise<{ satisfied: boolean }> {
  const count = await ctx.db.habit.count({
    where: { userId: ctx.userId },
  });
  return { satisfied: count >= 1 };
}

/**
 * 检测：首次打卡
 */
async function checkFirstCheckin(
  ctx: DetectionContext,
): Promise<{ satisfied: boolean }> {
  const count = await ctx.db.habitLog.count({
    where: { userId: ctx.userId, completed: true },
  });
  return { satisfied: count >= 1 };
}

/**
 * 检测：首次发光感评分
 */
async function checkFirstShine(
  ctx: DetectionContext,
): Promise<{ satisfied: boolean }> {
  const count = await ctx.db.habitLog.count({
    where: {
      userId: ctx.userId,
      shineScore: { not: null },
    },
  });
  return { satisfied: count >= 1 };
}

/**
 * 检测：连续天数
 */
async function checkStreak(
  ctx: DetectionContext,
  days: number,
  habitSpecific?: boolean,
): Promise<{ satisfied: boolean; habitId?: string }> {
  if (habitSpecific) {
    // 检测单个习惯的连续天数
    const habits = await ctx.db.habit.findMany({
      where: { userId: ctx.userId, status: "ACTIVE" },
      select: { id: true },
    });

    for (const habit of habits) {
      const streak = await calculateStreak(ctx.db, habit.id);
      if (streak >= days) {
        return { satisfied: true, habitId: habit.id };
      }
    }
    return { satisfied: false };
  } else {
    // 检测任意习惯的连续天数
    const habits = await ctx.db.habit.findMany({
      where: { userId: ctx.userId, status: "ACTIVE" },
      select: { id: true },
    });

    for (const habit of habits) {
      const streak = await calculateStreak(ctx.db, habit.id);
      if (streak >= days) {
        return { satisfied: true };
      }
    }
    return { satisfied: false };
  }
}

/**
 * 计算习惯的当前连续天数
 */
async function calculateStreak(
  db: PrismaClient,
  habitId: string,
): Promise<number> {
  const logs = await db.habitLog.findMany({
    where: { habitId },
    orderBy: { loggedAt: "desc" },
    take: 200, // 最多检查200天
    select: { loggedAt: true, completed: true },
  });

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];
    if (!log) break;

    const logDate = new Date(log.loggedAt);
    logDate.setHours(0, 0, 0, 0);

    // 计算预期日期
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);

    // 检查日期是否连续且已完成
    if (logDate.getTime() === expectedDate.getTime() && log.completed) {
      streak++;
    } else if (!log.completed || logDate.getTime() !== expectedDate.getTime()) {
      // 如果不是昨天的记录或未完成，中断连续
      break;
    }
  }

  return streak;
}

/**
 * 检测：累计庆祝次数
 */
async function checkTotalCelebrations(
  ctx: DetectionContext,
  count: number,
): Promise<{ satisfied: boolean }> {
  const total = await ctx.db.habitLog.count({
    where: {
      userId: ctx.userId,
      celebratedAt: { not: null },
    },
  });
  return { satisfied: total >= count };
}

/**
 * 检测：平均发光感评分
 */
async function checkAvgShineScore(
  ctx: DetectionContext,
  minScore: number,
): Promise<{ satisfied: boolean }> {
  const logs = await ctx.db.habitLog.findMany({
    where: {
      userId: ctx.userId,
      shineScore: { not: null },
    },
    select: { shineScore: true },
    take: 50, // 最近50条有评分的记录
  });

  if (logs.length < 10) {
    // 至少需要10条记录才能评判
    return { satisfied: false };
  }

  const avg =
    logs.reduce((sum, log) => sum + (log.shineScore ?? 0), 0) / logs.length;
  return { satisfied: avg >= minScore };
}

/**
 * 检测：完美日（单日所有习惯全完成）
 */
async function checkPerfectDay(
  ctx: DetectionContext,
): Promise<{ satisfied: boolean }> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 获取用户所有活跃习惯
  const activeHabits = await ctx.db.habit.count({
    where: { userId: ctx.userId, status: "ACTIVE" },
  });

  if (activeHabits === 0) return { satisfied: false };

  // 获取今日完成的习惯数
  const completedToday = await ctx.db.habitLog.count({
    where: {
      userId: ctx.userId,
      loggedAt: today,
      completed: true,
    },
  });

  return { satisfied: completedToday >= activeHabits };
}

/**
 * 检测：完美周（连续7天完美日）
 */
async function checkPerfectWeek(
  ctx: DetectionContext,
): Promise<{ satisfied: boolean }> {
  // 获取用户所有活跃习惯
  const activeHabits = await ctx.db.habit.count({
    where: { userId: ctx.userId, status: "ACTIVE" },
  });

  if (activeHabits === 0) return { satisfied: false };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 检查最近7天是否都是完美日
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);

    const completedCount = await ctx.db.habitLog.count({
      where: {
        userId: ctx.userId,
        loggedAt: checkDate,
        completed: true,
      },
    });

    if (completedCount < activeHabits) {
      return { satisfied: false };
    }
  }

  return { satisfied: true };
}

/**
 * 检测：中断后复出
 * 条件：之前有过至少7天连续，然后中断（至少3天），再次连续7天
 */
async function checkComeback(
  ctx: DetectionContext,
  days: number,
): Promise<{ satisfied: boolean; habitId?: string }> {
  const habits = await ctx.db.habit.findMany({
    where: { userId: ctx.userId, status: "ACTIVE" },
    select: { id: true },
  });

  for (const habit of habits) {
    const logs = await ctx.db.habitLog.findMany({
      where: { habitId: habit.id },
      orderBy: { loggedAt: "desc" },
      take: 100,
      select: { loggedAt: true, completed: true },
    });

    if (logs.length < days * 2 + 3) continue; // 不够数据判断

    // 分析日志找复出模式
    let currentStreak = 0;
    let hadBreak = false;
    let previousStreak = 0;

    for (const log of logs) {
      if (log.completed) {
        if (!hadBreak) {
          currentStreak++;
        } else {
          previousStreak++;
        }
      } else {
        if (currentStreak >= days && !hadBreak) {
          hadBreak = true;
          // 继续检查之前是否有连续
        } else if (hadBreak && previousStreak >= days) {
          // 找到了复出模式
          return { satisfied: true, habitId: habit.id };
        }
      }
    }

    // 检查当前状态
    if (currentStreak >= days && hadBreak && previousStreak >= days) {
      return { satisfied: true, habitId: habit.id };
    }
  }

  return { satisfied: false };
}

/**
 * 检测：微习惯配方数量
 */
async function checkRecipeCount(
  ctx: DetectionContext,
  count: number,
): Promise<{ satisfied: boolean }> {
  const total = await ctx.db.habit.count({
    where: {
      userId: ctx.userId,
      recipeAnchor: { not: null },
      recipeBehavior: { not: null },
      recipeCelebration: { not: null },
    },
  });
  return { satisfied: total >= count };
}

// ============ 便捷触发函数 ============

/**
 * 打卡后触发检测
 */
export async function triggerAfterCheckin(
  db: PrismaClient,
  userId: string,
  habitId: string,
): Promise<UnlockResult[]> {
  return checkBadgeUnlocks({ db, userId, habitId });
}

/**
 * 创建习惯后触发检测
 */
export async function triggerAfterHabitCreate(
  db: PrismaClient,
  userId: string,
  habitId: string,
): Promise<UnlockResult[]> {
  return checkBadgeUnlocks({ db, userId, habitId });
}

/**
 * 庆祝后触发检测
 */
export async function triggerAfterCelebration(
  db: PrismaClient,
  userId: string,
): Promise<UnlockResult[]> {
  return checkBadgeUnlocks({ db, userId });
}
