"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface HeatmapData {
  dayOfWeek: number;
  hourOfDay: number;
  completionRate: number;
  avgDuration?: number | null;
}

interface TimeHeatmapProps {
  data: HeatmapData[];
  isLoading?: boolean;
  title?: string;
  description?: string;
}

const dayNames = ["日", "一", "二", "三", "四", "五", "六"];
const hourLabels = ["0", "3", "6", "9", "12", "15", "18", "21"];

export function TimeHeatmap({
  data,
  isLoading = false,
  title = "时间热力图",
  description = "显示不同时间段的习惯完成情况",
}: TimeHeatmapProps) {
  // 将数据转换为二维矩阵
  const heatmapMatrix = useMemo(() => {
    const matrix: (number | null)[][] = Array.from({ length: 7 }, () =>
      Array.from({ length: 24 }, () => null),
    );

    data.forEach((item) => {
      if (
        item.dayOfWeek >= 0 &&
        item.dayOfWeek <= 6 &&
        item.hourOfDay >= 0 &&
        item.hourOfDay <= 23
      ) {
        matrix[item.dayOfWeek]![item.hourOfDay] = item.completionRate;
      }
    });

    return matrix;
  }, [data]);

  // 获取颜色
  const getColor = (value: number | null): string => {
    if (value === null) return "bg-muted";
    if (value === 0) return "bg-red-100 dark:bg-red-950";
    if (value < 25) return "bg-red-200 dark:bg-red-900";
    if (value < 50) return "bg-amber-200 dark:bg-amber-900";
    if (value < 75) return "bg-lime-200 dark:bg-lime-900";
    if (value < 100) return "bg-green-300 dark:bg-green-800";
    return "bg-green-500 dark:bg-green-600";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
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
        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            {/* 小时标签 */}
            <div className="mb-1 flex pl-8">
              {hourLabels.map((hour) => (
                <div
                  key={hour}
                  className="text-muted-foreground flex-1 text-center text-xs"
                  style={{ width: `${100 / 8}%` }}
                >
                  {hour}时
                </div>
              ))}
            </div>

            {/* 热力图网格 */}
            <div className="space-y-1">
              {heatmapMatrix.map((row, dayIndex) => (
                <div key={dayIndex} className="flex items-center gap-1">
                  {/* 星期标签 */}
                  <div className="text-muted-foreground w-7 pr-1 text-right text-xs">
                    周{dayNames[dayIndex]}
                  </div>
                  {/* 每小时的格子 */}
                  <div className="flex flex-1 gap-[2px]">
                    {row.map((value, hourIndex) => (
                      <div
                        key={hourIndex}
                        className={`aspect-square flex-1 rounded-sm ${getColor(
                          value,
                        )} hover:ring-primary transition-colors hover:ring-1`}
                        title={
                          value !== null
                            ? `周${dayNames[dayIndex]} ${hourIndex}:00 - ${hourIndex + 1}:00\n完成率: ${value}%`
                            : `周${dayNames[dayIndex]} ${hourIndex}:00 - ${hourIndex + 1}:00\n无数据`
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 图例 */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <span className="text-muted-foreground text-xs">低</span>
              <div className="flex gap-[2px]">
                {[
                  "bg-red-200 dark:bg-red-900",
                  "bg-amber-200 dark:bg-amber-900",
                  "bg-lime-200 dark:bg-lime-900",
                  "bg-green-300 dark:bg-green-800",
                  "bg-green-500 dark:bg-green-600",
                ].map((color, i) => (
                  <div key={i} className={`h-4 w-4 rounded-sm ${color}`} />
                ))}
              </div>
              <span className="text-muted-foreground text-xs">高</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
