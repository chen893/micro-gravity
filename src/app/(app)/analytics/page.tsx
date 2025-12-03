"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Flame,
  Clock,
  Heart,
  Link2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function AnalyticsPage() {
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  const { data: dashboard, isLoading } = api.analytics.getDashboard.useQuery({
    days: 30,
  });
  const { data: insights } = api.insights.getDashboard.useQuery({ days: 30 });

  // 额外的分析查询
  const { data: timePatterns } = api.analytics.getTimePatterns.useQuery(
    { habitId: selectedHabitId ?? undefined, days: 30 },
    { enabled: !!dashboard },
  );

  const { data: moodCorrelation } = api.analytics.getMoodCorrelation.useQuery(
    { habitId: selectedHabitId ?? "", days: 30 },
    { enabled: !!selectedHabitId },
  );

  const { data: habitCorrelations } =
    api.analytics.getHabitCorrelations.useQuery(
      { days: 30 },
      { enabled: !!dashboard && (dashboard.habits?.length ?? 0) >= 2 },
    );

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  if (!dashboard) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <p className="text-muted-foreground">暂无数据</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">数据分析</h2>
        <p className="text-muted-foreground">深入了解你的习惯表现和模式</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃习惯</CardTitle>
            <Flame className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.summary.totalHabits}
            </div>
            <p className="text-muted-foreground text-xs">
              过去 {dashboard.summary.periodDays} 天
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总打卡次数</CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.summary.completedLogs}
            </div>
            <p className="text-muted-foreground text-xs">
              共 {dashboard.summary.totalLogs} 次记录
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">完成率</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.summary.overallRate}%
            </div>
            <Progress value={dashboard.summary.overallRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">分析周期</CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard.summary.periodDays}
            </div>
            <p className="text-muted-foreground text-xs">天</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">总览</TabsTrigger>
          <TabsTrigger value="habits">习惯表现</TabsTrigger>
          <TabsTrigger value="patterns">模式分析</TabsTrigger>
          <TabsTrigger value="correlations">关联分析</TabsTrigger>
          <TabsTrigger value="risk">风险预警</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Time Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">时间热力图</CardTitle>
                <CardDescription>查看你最活跃的时间段</CardDescription>
              </CardHeader>
              <CardContent>
                <TimeHeatmap data={dashboard.heatmapData} />
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">快速洞察</CardTitle>
                <CardDescription>AI 发现的模式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {insights?.quickInsights &&
                insights.quickInsights.length > 0 ? (
                  insights.quickInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="bg-primary mt-0.5 h-2 w-2 rounded-full" />
                      <span>{insight}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    继续记录习惯，AI 将为你发现更多模式
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="habits" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dashboard.habits.map((habit) => (
              <Card key={habit.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{habit.name}</CardTitle>
                    <Badge
                      variant={habit.type === "BUILD" ? "default" : "secondary"}
                    >
                      {habit.type === "BUILD" ? "养成" : "戒除"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">完成率</span>
                    <span className="font-medium">{habit.completionRate}%</span>
                  </div>
                  <Progress value={habit.completionRate} />
                  <p className="text-muted-foreground text-xs">
                    共 {habit.totalLogs} 次打卡
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    时间模式分析
                  </CardTitle>
                  <CardDescription>发现你的最佳习惯执行时间</CardDescription>
                </div>
                <Select
                  value={selectedHabitId ?? "all"}
                  onValueChange={(v) =>
                    setSelectedHabitId(v === "all" ? null : v)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="选择习惯" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有习惯</SelectItem>
                    {dashboard?.habits.map((habit) => (
                      <SelectItem key={habit.id} value={habit.id}>
                        {habit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {timePatterns && timePatterns.optimalWindows.length > 0 ? (
                <div className="space-y-4">
                  {/* 最佳时间窗口 */}
                  <div className="space-y-3">
                    <p className="font-medium">最佳执行时间窗口</p>
                    {timePatterns.optimalWindows
                      .slice(0, 3)
                      .map((window, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div>
                            <p className="font-medium">
                              {
                                [
                                  "周日",
                                  "周一",
                                  "周二",
                                  "周三",
                                  "周四",
                                  "周五",
                                  "周六",
                                ][window.dayOfWeek]
                              }{" "}
                              {window.startHour}:00 - {window.endHour}:00
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {window.reason}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  {/* AI 洞察 */}
                  {timePatterns.insights &&
                    timePatterns.insights.length > 0 && (
                      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
                        <p className="mb-2 font-medium">时间优化建议</p>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                          {timePatterns.insights.map((insight, i) => (
                            <li key={i}>{insight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ) : (
                <p className="text-muted-foreground py-8 text-center">
                  需要更多数据才能分析时间模式
                </p>
              )}
            </CardContent>
          </Card>

          {/* 情绪相关性分析 */}
          {selectedHabitId && moodCorrelation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  情绪相关性
                </CardTitle>
                <CardDescription>习惯完成与情绪变化的关联</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <p className="text-muted-foreground text-sm">
                      完成前平均情绪
                    </p>
                    <p className="text-2xl font-bold">
                      {moodCorrelation.beforeAfterCorrelation.averageMoodBefore.toFixed(
                        1,
                      )}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-muted-foreground text-sm">
                      完成后平均情绪
                    </p>
                    <p className="text-2xl font-bold">
                      {moodCorrelation.beforeAfterCorrelation.averageMoodAfter.toFixed(
                        1,
                      )}
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-muted-foreground text-sm">情绪提升</p>
                    <p className="text-2xl font-bold text-green-600">
                      +
                      {moodCorrelation.beforeAfterCorrelation.moodLift.toFixed(
                        1,
                      )}
                    </p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {moodCorrelation.beforeAfterCorrelation.significance ===
                      "HIGH"
                        ? "显著"
                        : moodCorrelation.beforeAfterCorrelation
                              .significance === "MEDIUM"
                          ? "中等"
                          : "轻微"}
                    </Badge>
                  </div>
                </div>
                {moodCorrelation.recommendations &&
                  moodCorrelation.recommendations.length > 0 && (
                    <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
                      <p className="mb-2 font-medium">建议</p>
                      <ul className="list-inside list-disc space-y-1 text-sm">
                        {moodCorrelation.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="correlations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                习惯关联分析
              </CardTitle>
              <CardDescription>发现习惯之间的相互影响</CardDescription>
            </CardHeader>
            <CardContent>
              {habitCorrelations &&
              habitCorrelations.correlations.length > 0 ? (
                <div className="space-y-4">
                  {/* 相关性列表 */}
                  <div className="space-y-3">
                    {habitCorrelations.correlations
                      .slice(0, 5)
                      .map((corr, i) => {
                        const habit1Name =
                          dashboard?.habits.find((h) => h.id === corr.habit1Id)
                            ?.name ?? corr.habit1Id;
                        const habit2Name =
                          dashboard?.habits.find((h) => h.id === corr.habit2Id)
                            ?.name ?? corr.habit2Id;
                        return (
                          <div key={i} className="rounded-lg border p-3">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {habit1Name}
                                </span>
                                <span className="text-muted-foreground">↔</span>
                                <span className="font-medium">
                                  {habit2Name}
                                </span>
                              </div>
                              <Badge
                                variant={
                                  corr.relationship === "POSITIVE"
                                    ? "default"
                                    : corr.relationship === "NEGATIVE"
                                      ? "destructive"
                                      : "outline"
                                }
                              >
                                {corr.relationship === "POSITIVE"
                                  ? "正相关"
                                  : corr.relationship === "NEGATIVE"
                                    ? "负相关"
                                    : "无明显关联"}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {corr.insight}
                            </p>
                          </div>
                        );
                      })}
                  </div>

                  {/* 习惯群组 */}
                  {habitCorrelations.clusters &&
                    habitCorrelations.clusters.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium">习惯群组</p>
                        {habitCorrelations.clusters.map((cluster, i) => (
                          <div key={i} className="rounded-lg border p-3">
                            <p className="font-medium">{cluster.name}</p>
                            <p className="text-muted-foreground text-sm">
                              {cluster.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                  {/* 建议 */}
                  {habitCorrelations.suggestions &&
                    habitCorrelations.suggestions.length > 0 && (
                      <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950/20">
                        <p className="mb-2 font-medium">优化建议</p>
                        <div className="space-y-2">
                          {habitCorrelations.suggestions.map((s, i) => (
                            <div key={i} className="text-sm">
                              <Badge variant="outline" className="mr-2">
                                {s.type === "STACK"
                                  ? "堆叠"
                                  : s.type === "SEPARATE"
                                    ? "分开"
                                    : "顺序"}
                              </Badge>
                              <span>{s.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    {(dashboard?.habits?.length ?? 0) < 2
                      ? "需要至少2个活跃习惯才能分析关联性"
                      : "暂无足够数据进行关联分析"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="space-y-4">
            {dashboard.riskAssessments.map((risk) => (
              <Card key={risk.habitId}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {risk.habitName}
                    </CardTitle>
                    <RiskBadge level={risk.overallRisk} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">风险评分</span>
                    <span className="font-medium">{risk.riskScore}/100</span>
                  </div>
                  <Progress
                    value={risk.riskScore}
                    className={
                      risk.riskScore >= 70
                        ? "bg-red-100 [&>div]:bg-red-500"
                        : risk.riskScore >= 50
                          ? "bg-yellow-100 [&>div]:bg-yellow-500"
                          : ""
                    }
                  />
                  {risk.riskFactors && risk.riskFactors.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium">风险因素：</p>
                      {risk.riskFactors.slice(0, 3).map((factor, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-muted-foreground">
                            {factor.factor}
                          </span>
                          <span>{factor.currentStatus}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {dashboard.riskAssessments.length === 0 && (
              <Card className="py-8 text-center">
                <p className="text-muted-foreground">暂无风险预警数据</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RiskBadge({ level }: { level: string }) {
  const variants: Record<
    string,
    {
      variant: "default" | "secondary" | "destructive" | "outline";
      icon: React.ReactNode;
    }
  > = {
    LOW: { variant: "outline", icon: <CheckCircle className="h-3 w-3" /> },
    MEDIUM: {
      variant: "secondary",
      icon: <AlertTriangle className="h-3 w-3" />,
    },
    HIGH: {
      variant: "destructive",
      icon: <AlertTriangle className="h-3 w-3" />,
    },
    CRITICAL: {
      variant: "destructive",
      icon: <AlertTriangle className="h-3 w-3" />,
    },
  };

  const defaultConfig = {
    variant: "outline" as const,
    icon: <CheckCircle className="h-3 w-3" />,
  };
  const config = variants[level] ?? defaultConfig;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      {config.icon}
      {level === "LOW"
        ? "低风险"
        : level === "MEDIUM"
          ? "中风险"
          : level === "HIGH"
            ? "高风险"
            : "危险"}
    </Badge>
  );
}

function TimeHeatmap({
  data,
}: {
  data: Array<{
    dayOfWeek: number;
    hourOfDay: number;
    completionRate: number;
    count: number;
  }>;
}) {
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Create a map for quick lookup
  const heatmapMap = new Map<string, { rate: number; count: number }>();
  data.forEach((d) => {
    heatmapMap.set(`${d.dayOfWeek}-${d.hourOfDay}`, {
      rate: d.completionRate,
      count: d.count,
    });
  });

  const getColor = (rate: number | undefined) => {
    if (rate === undefined) return "bg-muted";
    if (rate >= 80) return "bg-green-500";
    if (rate >= 60) return "bg-green-400";
    if (rate >= 40) return "bg-yellow-400";
    if (rate >= 20) return "bg-orange-400";
    return "bg-red-400";
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-1 text-xs">
        <div />
        {days.map((day) => (
          <div key={day} className="text-muted-foreground text-center">
            {day}
          </div>
        ))}
        {hours
          .filter((h) => h % 4 === 0)
          .map((hour) => (
            <>
              <div
                key={`label-${hour}`}
                className="text-muted-foreground pr-1 text-right"
              >
                {hour}:00
              </div>
              {days.map((_, dayIndex) => {
                const cell = heatmapMap.get(`${dayIndex}-${hour}`);
                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className={`h-4 rounded ${getColor(cell?.rate)}`}
                    title={cell ? `${cell.rate}% (${cell.count}次)` : "无数据"}
                  />
                );
              })}
            </>
          ))}
      </div>
      <div className="text-muted-foreground flex items-center justify-end gap-2 text-xs">
        <span>低</span>
        <div className="flex gap-0.5">
          <div className="h-3 w-3 rounded bg-red-400" />
          <div className="h-3 w-3 rounded bg-orange-400" />
          <div className="h-3 w-3 rounded bg-yellow-400" />
          <div className="h-3 w-3 rounded bg-green-400" />
          <div className="h-3 w-3 rounded bg-green-500" />
        </div>
        <span>高</span>
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-2 h-4 w-48" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="mt-2 h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
