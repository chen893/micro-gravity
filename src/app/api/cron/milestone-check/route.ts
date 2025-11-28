/**
 * 里程碑检查定时任务
 * 每天晚 9 点执行
 * Vercel Cron: 0 21 * * *
 */

import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { generateMilestoneReport } from "@/lib/ai/report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 里程碑类型
type MilestoneType = "DAY_7" | "DAY_21" | "DAY_66" | "DAY_100";

// 里程碑天数配置
const MILESTONE_DAYS: Record<MilestoneType, number> = {
  DAY_7: 7,
  DAY_21: 21,
  DAY_66: 66,
  DAY_100: 100,
};

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 获取所有活跃习惯
    const habits = await db.habit.findMany({
      where: { status: "ACTIVE" },
      select: {
        id: true,
        name: true,
        type: true,
        userId: true,
        createdAt: true,
        logs: {
          where: { completed: true },
          orderBy: { loggedAt: "desc" },
          select: { loggedAt: true },
        },
        milestones: {
          select: { type: true },
        },
      },
    });

    const results = [];

    for (const habit of habits) {
      // 计算连续天数
      const streakDays = calculateStreak(habit.logs.map((l) => l.loggedAt));
      const achievedMilestones = new Set(habit.milestones.map((m) => m.type));

      // 检查每个里程碑
      for (const milestoneType of Object.keys(MILESTONE_DAYS) as MilestoneType[]) {
        const days = MILESTONE_DAYS[milestoneType];
        if (streakDays >= days && !achievedMilestones.has(milestoneType)) {
          try {
            const report = await generateMilestoneReport({
              habitName: habit.name,
              habitType: habit.type,
              milestoneType,
              streakDays: days,
              startDate: habit.createdAt,
              totalLogs: habit.logs.length,
              completedLogs: habit.logs.length,
            });

            await db.milestone.create({
              data: {
                habitId: habit.id,
                userId: habit.userId,
                type: milestoneType,
                achievedAt: new Date(),
                streakDays: days,
                celebration: report.celebration,
                reflection: report.reflection,
                nextPhase: report.nextPhase ?? undefined,
              },
            });

            results.push({
              habitId: habit.id,
              userId: habit.userId,
              milestone: milestoneType,
              success: true,
            });
          } catch (error) {
            console.error(`Failed to create milestone ${milestoneType} for habit ${habit.id}:`, error);
            results.push({
              habitId: habit.id,
              milestone: milestoneType,
              success: false,
              error: String(error),
            });
          }
        }
      }
    }

    return NextResponse.json({
      message: "Milestone check completed",
      totalHabits: habits.length,
      milestonesCreated: results.filter((r) => r.success).length,
      results,
    });
  } catch (error) {
    console.error("Milestone check cron error:", error);
    return NextResponse.json(
      { error: "Failed to check milestones" },
      { status: 500 }
    );
  }
}

/**
 * 计算连续打卡天数
 */
function calculateStreak(logDates: Date[]): number {
  if (logDates.length === 0) return 0;

  // 按日期排序（从最近到最远）
  const sortedDates = [...logDates].sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let expectedDate = today;

  for (const logDate of sortedDates) {
    const logDay = new Date(logDate);
    logDay.setHours(0, 0, 0, 0);

    // 检查是否是连续的日期
    const diffDays = Math.floor((expectedDate.getTime() - logDay.getTime()) / (24 * 60 * 60 * 1000));

    if (diffDays === 0) {
      streak++;
      expectedDate = new Date(expectedDate.getTime() - 24 * 60 * 60 * 1000);
    } else if (diffDays === 1) {
      // 允许昨天的情况（今天还没打卡）
      streak++;
      expectedDate = new Date(logDay.getTime() - 24 * 60 * 60 * 1000);
    } else {
      // 连续中断
      break;
    }
  }

  return streak;
}
