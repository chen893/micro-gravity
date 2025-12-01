/**
 * 月报生成定时任务
 * 每月最后一天晚 8 点执行
 * Vercel Cron: 0 20 L * *
 */

import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { generateMonthlyReport, type MonthlyReportData } from "@/lib/ai/report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    for (const user of users) {
      try {
        const habits = await db.habit.findMany({
          where: { userId: user.id },
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

        const milestones = await db.milestone.findMany({
          where: {
            habit: { userId: user.id },
            achievedAt: {
              gte: periodStart,
              lte: periodEnd,
            },
          },
          include: {
            habit: { select: { name: true } },
          },
        });

        // 获取上月数据
        const previousPeriodStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1,
        );
        const previousPeriodEnd = new Date(
          now.getFullYear(),
          now.getMonth(),
          0,
          23,
          59,
          59,
        );
        const previousLogs = await db.habitLog.findMany({
          where: {
            habit: { userId: user.id },
            loggedAt: {
              gte: previousPeriodStart,
              lte: previousPeriodEnd,
            },
          },
          select: { completed: true },
        });

        const previousCompletionRate =
          previousLogs.length > 0
            ? Math.round(
                (previousLogs.filter((l) => l.completed).length /
                  previousLogs.length) *
                  100,
              )
            : undefined;

        // 计算周报摘要
        const weeklyReports = [];
        let weekStart = new Date(periodStart);
        let weekNumber = 1;

        while (weekStart < periodEnd) {
          const weekEnd = new Date(
            Math.min(
              weekStart.getTime() + 7 * 24 * 60 * 60 * 1000,
              periodEnd.getTime(),
            ),
          );
          const weekLogs = logs.filter(
            (l) => l.loggedAt >= weekStart && l.loggedAt < weekEnd,
          );

          const completed = weekLogs.filter((l) => l.completed).length;
          const completionRate =
            weekLogs.length > 0
              ? Math.round((completed / weekLogs.length) * 100)
              : 0;

          weeklyReports.push({
            weekNumber,
            summary: {
              completionRate,
              rateChange: 0,
              activeHabits: habits.length,
              longestStreak: 0,
              totalCheckins: completed,
              perfectDays: 0,
            },
          });

          weekStart = weekEnd;
          weekNumber++;
        }

        const reportData: MonthlyReportData = {
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
          weeklyReports,
          milestones: milestones.map((m) => ({
            habitName: m.habit.name,
            type: m.type,
            achievedAt: m.achievedAt,
          })),
        };

        const report = await generateMonthlyReport(reportData);

        await db.report.create({
          data: {
            userId: user.id,
            type: "MONTHLY",
            periodStart,
            periodEnd,
            summary: report.summary,
            highlights: report.monthHighlights,
            patterns: report.keyInsights,
            suggestions: report.nextMonthFocus,
            goals: report.weeklyTrend,
          },
        });

        results.push({ userId: user.id, success: true });
      } catch (error) {
        console.error(
          `Failed to generate monthly report for user ${user.id}:`,
          error,
        );
        results.push({ userId: user.id, success: false, error: String(error) });
      }
    }

    return NextResponse.json({
      message: "Monthly reports generated",
      total: users.length,
      results,
    });
  } catch (error) {
    console.error("Monthly report cron error:", error);
    return NextResponse.json(
      { error: "Failed to generate monthly reports" },
      { status: 500 },
    );
  }
}
