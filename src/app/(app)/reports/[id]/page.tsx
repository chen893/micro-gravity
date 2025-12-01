"use client";

import { use } from "react";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  Lightbulb,
  CheckCircle2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface ReportDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ReportDetailPage({ params }: ReportDetailPageProps) {
  const { id } = use(params);

  const { data: report, isLoading } = api.report.getById.useQuery({ id });

  if (isLoading) {
    return <ReportDetailSkeleton />;
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">报告不存在</h2>
        <Button asChild className="mt-4">
          <Link href="/reports">返回报告列表</Link>
        </Button>
      </div>
    );
  }

  const summary = report.summary as {
    completionRate?: number;
    rateChange?: number;
    activeHabits?: number;
    longestStreak?: number;
    totalCheckins?: number;
    perfectDays?: number;
  } | null;

  const highlights = (report.highlights ?? []) as Array<{
    habitId?: string;
    habitName?: string;
    achievement?: string;
    emoji?: string;
    metric?: string;
  }>;

  const patterns = (report.patterns ?? []) as Array<{
    finding?: string;
    implication?: string;
    confidence?: number;
  }>;

  const suggestions = (report.suggestions ?? []) as Array<{
    category?: string;
    suggestion?: string;
    expectedImpact?: string;
  }>;

  const goals = (report.goals ?? []) as Array<{
    goal?: string;
    measurable?: string;
  }>;

  const reportTypeLabels: Record<string, string> = {
    WEEKLY: "周报",
    MONTHLY: "月报",
    MILESTONE: "里程碑报告",
  };

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/reports">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <Badge variant="outline">
              {reportTypeLabels[report.type] ?? report.type}
            </Badge>
          </div>
          <h1 className="pl-11 text-2xl font-bold tracking-tight">
            {format(new Date(report.periodStart), "yyyy年M月d日", {
              locale: zhCN,
            })}{" "}
            - {format(new Date(report.periodEnd), "M月d日", { locale: zhCN })}
          </h1>
          <p className="text-muted-foreground pl-11">
            生成于{" "}
            {format(new Date(report.generatedAt), "yyyy年M月d日 HH:mm", {
              locale: zhCN,
            })}
          </p>
        </div>
      </div>

      {/* 摘要卡片 */}
      {summary && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="完成率"
            value={`${summary.completionRate ?? 0}%`}
            change={summary.rateChange}
            icon={<Target className="h-4 w-4" />}
          />
          <StatCard
            title="活跃习惯"
            value={`${summary.activeHabits ?? 0}`}
            suffix="个"
            icon={<CheckCircle2 className="h-4 w-4" />}
          />
          <StatCard
            title="打卡次数"
            value={`${summary.totalCheckins ?? 0}`}
            suffix="次"
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatCard
            title="完美天数"
            value={`${summary.perfectDays ?? 0}`}
            suffix="天"
            icon={<Star className="h-4 w-4" />}
          />
        </div>
      )}

      {/* 亮点 */}
      {highlights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="h-4 w-4 text-yellow-500" />
              本周亮点
            </CardTitle>
            <CardDescription>值得庆祝的成就</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <span className="text-2xl">{highlight.emoji ?? "🎉"}</span>
                  <div>
                    <div className="font-medium">{highlight.habitName}</div>
                    <div className="text-muted-foreground text-sm">
                      {highlight.achievement}
                    </div>
                    {highlight.metric && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {highlight.metric}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 模式发现 */}
      {patterns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              模式发现
            </CardTitle>
            <CardDescription>基于数据的洞察</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patterns.map((pattern, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <p className="font-medium">{pattern.finding}</p>
                    {pattern.confidence !== undefined && (
                      <Badge variant="outline" className="text-xs">
                        置信度 {Math.round(pattern.confidence * 100)}%
                      </Badge>
                    )}
                  </div>
                  {pattern.implication && (
                    <p className="text-muted-foreground text-sm">
                      含义: {pattern.implication}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 建议 */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-blue-500" />
              改进建议
            </CardTitle>
            <CardDescription>下周可以尝试的优化</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-muted/50 flex items-start gap-3 rounded-lg p-3"
                >
                  <div className="bg-primary text-primary-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs">
                    {index + 1}
                  </div>
                  <div>
                    {suggestion.category && (
                      <Badge variant="outline" className="mb-1 text-xs">
                        {suggestion.category}
                      </Badge>
                    )}
                    <p className="text-sm">{suggestion.suggestion}</p>
                    {suggestion.expectedImpact && (
                      <p className="text-muted-foreground mt-1 text-xs">
                        预期效果: {suggestion.expectedImpact}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 下周目标 */}
      {goals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              下周目标
            </CardTitle>
            <CardDescription>明确的可衡量目标</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {goals.map((goal, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <CheckCircle2 className="text-muted-foreground h-5 w-5" />
                  <div>
                    <p className="font-medium">{goal.goal}</p>
                    {goal.measurable && (
                      <p className="text-muted-foreground text-sm">
                        衡量标准: {goal.measurable}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  suffix?: string;
  change?: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, suffix, change, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          {suffix && (
            <span className="text-muted-foreground text-sm font-normal">
              {suffix}
            </span>
          )}
        </div>
        {change !== undefined && (
          <p
            className={`text-xs ${change >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {change >= 0 ? (
              <TrendingUp className="mr-1 inline h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 inline h-3 w-3" />
            )}
            {change >= 0 ? "+" : ""}
            {change}% 较上周
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ReportDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
