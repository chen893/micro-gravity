"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface CompletionData {
  date: Date | string;
  rate: number;
  completed: number;
  total: number;
}

interface CompletionChartProps {
  data: CompletionData[];
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export function CompletionChart({
  data,
  isLoading = false,
  title = "完成率趋势",
  description = "每日习惯完成率变化",
}: CompletionChartProps) {
  const chartData = data.map((item) => ({
    date: format(new Date(item.date), "M/d", { locale: zhCN }),
    fullDate: format(new Date(item.date), "yyyy年M月d日", { locale: zhCN }),
    rate: item.rate,
    completed: item.completed,
    total: item.total,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
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
                        <div className="text-muted-foreground text-xs">
                          完成率: {data.rate}%
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {data.completed}/{data.total} 个习惯
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorRate)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
