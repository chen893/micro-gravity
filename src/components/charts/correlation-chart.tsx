"use client";

import {
  Scatter,
  ScatterChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
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
import { Link2, Unlink } from "lucide-react";

interface CorrelationData {
  habit1: string;
  habit2: string;
  correlation: number; // -1 到 1
  coOccurrence: number; // 同时完成的次数
}

interface CorrelationChartProps {
  data: CorrelationData[];
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export function CorrelationChart({
  data,
  isLoading = false,
  title = "习惯相关性",
  description = "不同习惯之间的相关性分析",
}: CorrelationChartProps) {
  // 转换数据为散点图格式
  const chartData = data.map((item, index) => ({
    x: index % 5,
    y: Math.floor(index / 5),
    z: Math.abs(item.correlation) * 100,
    habit1: item.habit1,
    habit2: item.habit2,
    correlation: item.correlation,
    coOccurrence: item.coOccurrence,
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
          <div className="flex h-64 flex-col items-center justify-center gap-2">
            <Unlink className="text-muted-foreground h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              需要至少 2 个习惯才能分析相关性
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 找出强相关和弱相关
  const strongPositive = data.filter((d) => d.correlation > 0.5);
  const strongNegative = data.filter((d) => d.correlation < -0.3);

  const getCorrelationColor = (correlation: number) => {
    if (correlation > 0.5) return "hsl(var(--chart-1))";
    if (correlation > 0.2) return "hsl(var(--chart-2))";
    if (correlation > -0.2) return "hsl(var(--muted-foreground))";
    if (correlation > -0.5) return "hsl(var(--chart-3))";
    return "hsl(var(--destructive))";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 相关性列表 */}
        <div className="space-y-3">
          {data.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: getCorrelationColor(item.correlation),
                  }}
                />
                <span className="text-sm">
                  {item.habit1} ↔ {item.habit2}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    item.correlation > 0.3
                      ? "default"
                      : item.correlation < -0.3
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {item.correlation > 0 ? "+" : ""}
                  {(item.correlation * 100).toFixed(0)}%
                </Badge>
                <span className="text-muted-foreground text-xs">
                  同完成 {item.coOccurrence}次
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 洞察 */}
        {(strongPositive.length > 0 || strongNegative.length > 0) && (
          <div className="mt-4 space-y-2">
            {strongPositive.length > 0 && (
              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950/20">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <Link2 className="h-4 w-4" />
                  强正相关习惯
                </div>
                <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                  {strongPositive
                    .map((d) => `${d.habit1}+${d.habit2}`)
                    .join("、")}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  这些习惯经常一起完成，可以考虑捆绑进行
                </p>
              </div>
            )}
            {strongNegative.length > 0 && (
              <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-300">
                  <Unlink className="h-4 w-4" />
                  互斥习惯
                </div>
                <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                  {strongNegative
                    .map((d) => `${d.habit1}/${d.habit2}`)
                    .join("、")}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  这些习惯难以同时完成，建议分配到不同时段
                </p>
              </div>
            )}
          </div>
        )}

        {/* 图例 */}
        <div className="text-muted-foreground mt-4 flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]" />
            强正相关
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--muted-foreground))]" />
            弱相关
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--destructive))]" />
            负相关
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
