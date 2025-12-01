"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
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
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface MoodData {
  date: Date | string;
  moodBefore: number | null;
  moodAfter: number | null;
}

interface MoodChartProps {
  data: MoodData[];
  isLoading?: boolean;
  title?: string;
  description?: string;
  averageMoodLift?: number;
}

const moodLabels: Record<number, string> = {
  1: "非常低落",
  2: "低落",
  3: "一般",
  4: "良好",
  5: "非常好",
};

export function MoodChart({
  data,
  isLoading = false,
  title = "情绪变化",
  description = "完成习惯前后的情绪对比",
  averageMoodLift,
}: MoodChartProps) {
  const chartData = data
    .filter((item) => item.moodBefore !== null || item.moodAfter !== null)
    .map((item) => ({
      date: format(new Date(item.date), "M/d", { locale: zhCN }),
      fullDate: format(new Date(item.date), "yyyy年M月d日", { locale: zhCN }),
      moodBefore: item.moodBefore,
      moodAfter: item.moodAfter,
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

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center">
            <p className="text-muted-foreground text-sm">暂无情绪数据</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {averageMoodLift !== undefined && (
            <Badge
              variant={averageMoodLift > 0 ? "default" : "secondary"}
              className="text-sm"
            >
              平均提升: {averageMoodLift > 0 ? "+" : ""}
              {averageMoodLift.toFixed(1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => moodLabels[value as number] ?? ""}
                width={60}
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
                          {data.fullDate}
                        </div>
                        {data.moodBefore !== null && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="h-2 w-2 rounded-full bg-amber-500" />
                            完成前:{" "}
                            {moodLabels[data.moodBefore] ?? data.moodBefore}
                          </div>
                        )}
                        {data.moodAfter !== null && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            完成后:{" "}
                            {moodLabels[data.moodAfter] ?? data.moodAfter}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => (
                  <span className="text-muted-foreground text-sm">
                    {value === "moodBefore" ? "完成前" : "完成后"}
                  </span>
                )}
              />
              <Line
                type="monotone"
                dataKey="moodBefore"
                name="moodBefore"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0, fill: "hsl(var(--chart-2))" }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="moodAfter"
                name="moodAfter"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0, fill: "hsl(var(--chart-1))" }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
