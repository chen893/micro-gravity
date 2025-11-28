/**
 * 周报生成定时任务
 * 每周日晚 8 点执行
 * Vercel Cron: 0 20 * * 0
 */

import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { generateWeeklyReport, type ReportInputData } from "@/lib/ai/report";

// Vercel Cron 需要使用此配置
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // 验证 Cron 密钥
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 获取所有有活跃习惯的用户
    const users = await db.user.findMany({
      where: {
        habits: {
          some: {
            status: "ACTIVE",
          },
        },
      },
      select: { id: true },
    });

    const results = [];
    const periodEnd = new Date();
    const periodStart = new Date(periodEnd.getTime() - 7 * 24 * 60 * 60 * 1000);

    for (const user of users) {
      try {
        // 获取用户习惯和日志
        const habits = await db.habit.findMany({
          where: {
            userId: user.id,
            status: { in: ["ACTIVE", "PAUSED"] },
          },
          select: {
            id: true,
            name: true,
            type: true,
            currentPhase: true,
          },
        });

        const logs = await db.habitLog.findMany({
          where: {
            habit: { userId: user.id },
            loggedAt: {
              gte: periodStart,
              lte: periodEnd,
            },
          },
          select: {
            habitId: true,
            loggedAt: true,
            completed: true,
            difficultyRating: true,
            moodBefore: true,
            moodAfter: true,
          },
        });

        // 获取上周数据
        const previousPeriodStart = new Date(periodStart.getTime() - 7 * 24 * 60 * 60 * 1000);
        const previousLogs = await db.habitLog.findMany({
          where: {
            habit: { userId: user.id },
            loggedAt: {
              gte: previousPeriodStart,
              lt: periodStart,
            },
          },
          select: { completed: true },
        });

        const previousCompletionRate =
          previousLogs.length > 0
            ? Math.round((previousLogs.filter((l) => l.completed).length / previousLogs.length) * 100)
            : undefined;

        const reportData: ReportInputData = {
          periodStart,
          periodEnd,
          habits: habits.map((h) => ({
            id: h.id,
            name: h.name,
            type: h.type,
            currentPhase: h.currentPhase,
          })),
          logs: logs.map((l) => ({
            habitId: l.habitId,
            loggedAt: l.loggedAt,
            completed: l.completed,
            difficultyRating: l.difficultyRating,
            moodBefore: l.moodBefore,
            moodAfter: l.moodAfter,
          })),
          previousPeriodStats: previousCompletionRate
            ? { completionRate: previousCompletionRate, longestStreak: 0 }
            : undefined,
        };

        const report = await generateWeeklyReport(reportData);

        // 保存报告
        await db.report.create({
          data: {
            userId: user.id,
            type: "WEEKLY",
            periodStart,
            periodEnd,
            summary: report.summary,
            highlights: report.highlights,
            patterns: report.patterns,
            suggestions: report.suggestions,
            goals: report.nextWeekGoals,
          },
        });

        results.push({ userId: user.id, success: true });
      } catch (error) {
        console.error(`Failed to generate weekly report for user ${user.id}:`, error);
        results.push({ userId: user.id, success: false, error: String(error) });
      }
    }

    return NextResponse.json({
      message: "Weekly reports generated",
      total: users.length,
      results,
    });
  } catch (error) {
    console.error("Weekly report cron error:", error);
    return NextResponse.json(
      { error: "Failed to generate weekly reports" },
      { status: 500 }
    );
  }
}
