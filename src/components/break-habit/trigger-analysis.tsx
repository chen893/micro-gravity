"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MapPin,
  Brain,
  Zap,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

interface TriggerAnalysisProps {
  habitId: string;
  habitName: string;
}

const triggerTypeConfig: Record<
  string,
  { label: string; icon: React.ReactNode; color: string }
> = {
  TEMPORAL: {
    label: "时间触发",
    icon: <Clock className="h-4 w-4" />,
    color: "text-blue-500",
  },
  CONTEXTUAL: {
    label: "情境触发",
    icon: <MapPin className="h-4 w-4" />,
    color: "text-green-500",
  },
  EMOTIONAL: {
    label: "情绪触发",
    icon: <Brain className="h-4 w-4" />,
    color: "text-purple-500",
  },
  BEHAVIORAL: {
    label: "行为触发",
    icon: <Zap className="h-4 w-4" />,
    color: "text-orange-500",
  },
};

export function TriggerAnalysis({ habitId, habitName: _habitName }: TriggerAnalysisProps) {
  const {
    data: analysisData,
    isLoading,
    refetch,
    isFetching,
  } = api.analytics.getTriggerAnalysis.useQuery(
    { habitId },
    { staleTime: 5 * 60 * 1000 }, // 5分钟缓存
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">触发模式分析</CardTitle>
          <CardDescription>AI 正在分析你的触发模式...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!analysisData?.analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">触发模式分析</CardTitle>
          <CardDescription>需要更多数据来分析触发模式</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="text-muted-foreground h-12 w-12" />
            <p className="text-muted-foreground mt-4 text-sm">
              记录至少 3 次触发时刻后，AI 将为你分析触发模式
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { analysis, stats } = analysisData;

  return (
    <div className="space-y-4">
      {/* 触发模式概览 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">触发模式分析</CardTitle>
            <CardDescription>
              基于 {stats?.totalRecords ?? 0} 条触发记录的 AI 分析
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={`mr-1 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            刷新
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 模式统计 */}
          {stats?.patternStats && stats.patternStats.length > 0 && (
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                触发类型分布
              </h4>
              <div className="space-y-2">
                {stats.patternStats.map((pattern) => {
                  const config = triggerTypeConfig[pattern.type];
                  return (
                    <div key={pattern.type} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className={config?.color}>{config?.icon}</span>
                          <span>{config?.label}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {pattern.count}次 ({pattern.percentage}%)
                        </span>
                      </div>
                      <Progress value={pattern.percentage} className="h-2" />
                      <div className="text-muted-foreground flex items-center justify-between text-xs">
                        <span>
                          平均强度: {pattern.avgIntensity.toFixed(1)}/10
                        </span>
                        <span>抵抗成功率: {pattern.resistanceRate}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI 识别的模式 */}
          {analysis.patterns && analysis.patterns.length > 0 && (
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-medium">
                <Brain className="h-4 w-4" />
                AI 识别的模式
              </h4>
              <div className="space-y-2">
                {analysis.patterns.map((pattern, index) => {
                  const config = triggerTypeConfig[pattern.type];
                  return (
                    <div
                      key={index}
                      className="space-y-2 rounded-lg border p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={config?.color}>{config?.icon}</span>
                          <span className="font-medium">{config?.label}</span>
                        </div>
                        <Badge variant="outline">
                          置信度 {Math.round(pattern.confidence * 100)}%
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {pattern.description}
                      </p>
                      {pattern.evidence && pattern.evidence.length > 0 && (
                        <div className="text-muted-foreground text-xs">
                          <span className="font-medium">证据：</span>
                          {pattern.evidence.slice(0, 2).join("；")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 深层需求 */}
          {analysis.deepNeed && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/20">
              <h4 className="flex items-center gap-2 text-sm font-medium text-amber-800 dark:text-amber-200">
                <Lightbulb className="h-4 w-4" />
                深层需求分析
              </h4>
              <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                {analysis.deepNeed}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 替代行为建议 */}
      {analysis.substituteBehaviors &&
        analysis.substituteBehaviors.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">替代行为建议</CardTitle>
              <CardDescription>
                当冲动来临时，可以尝试这些替代行为
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {analysis.substituteBehaviors.map((behavior, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-lg border p-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                      {index + 1}
                    </div>
                    <p className="text-sm">{behavior}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      {/* 时间模式洞察 */}
      {stats?.temporalPatterns && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">时间模式</CardTitle>
            <CardDescription>触发冲动的高峰时段</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.temporalPatterns.peakHours.length > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <span className="text-sm">
                  高峰时段：
                  {stats.temporalPatterns.peakHours
                    .map((h) => `${h}:00`)
                    .join("、")}
                </span>
              </div>
            )}
            {stats.temporalPatterns.timeInsights.map((insight, i) => (
              <p key={i} className="text-muted-foreground text-sm">
                • {insight}
              </p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
