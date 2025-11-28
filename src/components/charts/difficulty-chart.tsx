"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface DifficultyData {
  habitName: string;
  avgDifficulty: number;
  completionRate: number;
  totalLogs: number;
}

interface DifficultyChartProps {
  data: DifficultyData[];
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export function DifficultyChart({
  data,
  isLoading = false,
  title = "难度分布",
  description = "各习惯的平均难度与完成率对比",
}: DifficultyChartProps) {
  const chartData = data.map((item) => ({
    habit: item.habitName.length > 8 ? item.habitName.slice(0, 8) + "..." : item.habitName,
    fullName: item.habitName,
    difficulty: item.avgDifficulty,
    completionRate: item.completionRate,
    totalLogs: item.totalLogs,
  }));

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground">暂无难度数据</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 计算平均难度
  const avgDifficulty =
    data.reduce((sum, item) => sum + item.avgDifficulty, 0) / data.length;

  // 找出最难和最简单的习惯
  const hardest = data.reduce((max, item) =>
    item.avgDifficulty > max.avgDifficulty ? item : max
  );
  const easiest = data.reduce((min, item) =>
    item.avgDifficulty < min.avgDifficulty ? item : min
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="outline">平均难度: {avgDifficulty.toFixed(1)}/10</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={chartData}
              margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            >
              <PolarGrid className="stroke-muted" />
              <PolarAngleAxis
                dataKey="habit"
                tick={{ fontSize: 11 }}
                className="text-muted-foreground"
              />
              <PolarRadiusAxis
                domain={[0, 10]}
                tick={{ fontSize: 10 }}
                tickCount={6}
                className="text-muted-foreground"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0]?.payload as typeof chartData[0];
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="text-sm font-medium">{data.fullName}</div>
                        <div className="text-xs text-muted-foreground">
                          平均难度: {data.difficulty.toFixed(1)}/10
                        </div>
                        <div className="text-xs text-muted-foreground">
                          完成率: {data.completionRate}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          打卡次数: {data.totalLogs}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Radar
                name="难度"
                dataKey="difficulty"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 洞察 */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-2">
            <p className="text-xs text-muted-foreground">最难习惯</p>
            <p className="font-medium text-red-700 dark:text-red-300">
              {hardest.habitName}
            </p>
            <p className="text-xs text-muted-foreground">
              难度 {hardest.avgDifficulty.toFixed(1)}/10
            </p>
          </div>
          <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-2">
            <p className="text-xs text-muted-foreground">最易习惯</p>
            <p className="font-medium text-green-700 dark:text-green-300">
              {easiest.habitName}
            </p>
            <p className="text-xs text-muted-foreground">
              难度 {easiest.avgDifficulty.toFixed(1)}/10
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
