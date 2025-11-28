"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Target, TrendingUp, Calendar } from "lucide-react";

interface HabitStatsCardProps {
  stats?: {
    totalDays: number;
    completedDays: number;
    currentStreak: number;
    longestStreak: number;
    recentRate: number;
    averageDifficulty: number | null;
    completionRate: number;
  };
  isLoading: boolean;
  habitType: "BUILD" | "BREAK";
}

export function HabitStatsCard({ stats, isLoading, habitType }: HabitStatsCardProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="mt-1 h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const streakLabel = habitType === "BUILD" ? "连续完成" : "连续坚持";

  const statCards = [
    {
      title: "当前连续",
      value: stats.currentStreak,
      unit: "天",
      description: stats.currentStreak > 0 ? `${streakLabel} ${stats.currentStreak} 天` : "今天开始新的连续",
      icon: Flame,
      iconColor: stats.currentStreak > 7 ? "text-orange-500" : "text-muted-foreground",
    },
    {
      title: "最长连续",
      value: stats.longestStreak,
      unit: "天",
      description: `历史最佳记录`,
      icon: Target,
      iconColor: "text-blue-500",
    },
    {
      title: "完成率",
      value: stats.completionRate,
      unit: "%",
      description: `共 ${stats.completedDays}/${stats.totalDays} 天`,
      icon: TrendingUp,
      iconColor: stats.completionRate >= 80 ? "text-green-500" : "text-muted-foreground",
    },
    {
      title: "近7天完成率",
      value: stats.recentRate,
      unit: "%",
      description: stats.recentRate >= 80 ? "状态很好！" : "继续加油！",
      icon: Calendar,
      iconColor: stats.recentRate >= 80 ? "text-green-500" : "text-amber-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value}
              <span className="text-sm font-normal text-muted-foreground">
                {stat.unit}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
