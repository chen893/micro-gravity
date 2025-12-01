"use client";

import { api } from "@/trpc/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, CheckCircle, Calendar, Flame } from "lucide-react";

export default function AnalyticsPage() {
  const { data: dashboard, isLoading } = api.analytics.getDashboard.useQuery({ days: 30 });
  const { data: insights } = api.insights.getDashboard.useQuery({ days: 30 });

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
        <p className="text-muted-foreground">
          深入了解你的习惯表现和模式
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃习惯</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.summary.totalHabits}</div>
            <p className="text-xs text-muted-foreground">
              过去 {dashboard.summary.periodDays} 天
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总打卡次数</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.summary.completedLogs}</div>
            <p className="text-xs text-muted-foreground">
              共 {dashboard.summary.totalLogs} 次记录
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">完成率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.summary.overallRate}%</div>
            <Progress value={dashboard.summary.overallRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">分析周期</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.summary.periodDays}</div>
            <p className="text-xs text-muted-foreground">天</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">总览</TabsTrigger>
          <TabsTrigger value="habits">习惯表现</TabsTrigger>
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
                {insights?.quickInsights && insights.quickInsights.length > 0 ? (
                  insights.quickInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                      <span>{insight}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
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
                    <Badge variant={habit.type === "BUILD" ? "default" : "secondary"}>
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
                  <p className="text-xs text-muted-foreground">
                    共 {habit.totalLogs} 次打卡
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="space-y-4">
            {dashboard.riskAssessments.map((risk) => (
              <Card key={risk.habitId}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{risk.habitName}</CardTitle>
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
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{factor.factor}</span>
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
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
    LOW: { variant: "outline", icon: <CheckCircle className="h-3 w-3" /> },
    MEDIUM: { variant: "secondary", icon: <AlertTriangle className="h-3 w-3" /> },
    HIGH: { variant: "destructive", icon: <AlertTriangle className="h-3 w-3" /> },
    CRITICAL: { variant: "destructive", icon: <AlertTriangle className="h-3 w-3" /> },
  };

  const defaultConfig = { variant: "outline" as const, icon: <CheckCircle className="h-3 w-3" /> };
  const config = variants[level] ?? defaultConfig;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      {config.icon}
      {level === "LOW" ? "低风险" : level === "MEDIUM" ? "中风险" : level === "HIGH" ? "高风险" : "危险"}
    </Badge>
  );
}

function TimeHeatmap({ data }: { data: Array<{ dayOfWeek: number; hourOfDay: number; completionRate: number; count: number }> }) {
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Create a map for quick lookup
  const heatmapMap = new Map<string, { rate: number; count: number }>();
  data.forEach((d) => {
    heatmapMap.set(`${d.dayOfWeek}-${d.hourOfDay}`, { rate: d.completionRate, count: d.count });
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
          <div key={day} className="text-center text-muted-foreground">
            {day}
          </div>
        ))}
        {hours.filter((h) => h % 4 === 0).map((hour) => (
          <>
            <div key={`label-${hour}`} className="text-right text-muted-foreground pr-1">
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
      <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
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
