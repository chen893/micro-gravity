"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
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
import { Flame } from "lucide-react";

interface StreakData {
  habitId: string;
  habitName: string;
  currentStreak: number;
  longestStreak: number;
}

interface StreakChartProps {
  data: StreakData[];
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export function StreakChart({
  data,
  isLoading = false,
  title = "连续天数",
  description = "各习惯的当前连续与历史最长连续天数",
}: StreakChartProps) {
  const chartData = data.map((item) => ({
    name:
      item.habitName.length > 6
        ? item.habitName.slice(0, 6) + "..."
        : item.habitName,
    fullName: item.habitName,
    current: item.currentStreak,
    longest: item.longestStreak,
  }));

  const maxStreak = Math.max(
    ...data.map((d) => Math.max(d.currentStreak, d.longestStreak)),
    7,
  );

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
            <p className="text-muted-foreground text-sm">暂无连续数据</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 找出最长连续的习惯
  const topStreak = data.reduce((max, item) =>
    item.currentStreak > max.currentStreak ? item : max,
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {topStreak.currentStreak > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-orange-500" />
              {topStreak.habitName}: {topStreak.currentStreak}天
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[0, maxStreak]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={80}
                className="text-muted-foreground"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    const data = payload[0]?.payload as
                      | (typeof chartData)[0]
                      | undefined;
                    if (!data) return null;
                    return (
                      <div className="bg-background rounded-lg border p-2 shadow-sm">
                        <div className="text-sm font-medium">
                          {data.fullName}
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="h-2 w-2 rounded-full bg-orange-500" />
                          当前连续: {data.current}天
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="h-2 w-2 rounded-full bg-blue-500" />
                          历史最长: {data.longest}天
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="longest"
                fill="hsl(var(--chart-2))"
                radius={[0, 4, 4, 0]}
                barSize={20}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-longest-${index}`} fillOpacity={0.3} />
                ))}
              </Bar>
              <Bar
                dataKey="current"
                fill="hsl(var(--chart-1))"
                radius={[0, 4, 4, 0]}
                barSize={20}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-current-${index}`}
                    fill={
                      entry.current >= 7
                        ? "hsl(var(--chart-1))"
                        : "hsl(var(--chart-3))"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 图例 */}
        <div className="mt-2 flex items-center justify-center gap-4">
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]" />
            当前连续
          </div>
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <span
              className="h-2 w-2 rounded-full bg-[hsl(var(--chart-2))]"
              style={{ opacity: 0.3 }}
            />
            历史最长
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
