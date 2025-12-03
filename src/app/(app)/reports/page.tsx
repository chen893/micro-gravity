"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Calendar,
  Trophy,
  TrendingUp,
  TrendingDown,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const utils = api.useUtils();

  const { data: reports, isLoading } = api.report.list.useQuery({ limit: 10 });
  const { data: milestones } = api.report.getMilestones.useQuery({});

  const generateWeeklyMutation = api.report.generateWeekly.useMutation({
    onSuccess: () => {
      void utils.report.list.invalidate();
      setIsGenerating(false);
    },
    onError: () => {
      setIsGenerating(false);
    },
  });

  const handleGenerateWeekly = () => {
    setIsGenerating(true);
    generateWeeklyMutation.mutate({});
  };

  if (isLoading) {
    return <ReportsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">报告中心</h2>
          <p className="text-muted-foreground">查看周期报告和里程碑成就</p>
        </div>
        <Button
          onClick={handleGenerateWeekly}
          disabled={isGenerating || generateWeeklyMutation.isPending}
        >
          {isGenerating || generateWeeklyMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              生成周报
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" />
            周期报告
          </TabsTrigger>
          <TabsTrigger value="milestones">
            <Trophy className="mr-2 h-4 w-4" />
            里程碑
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {reports?.reports && reports.reports.length > 0 ? (
            <div className="space-y-4">
              {reports.reports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <Card className="py-12 text-center">
              <FileText className="text-muted-foreground mx-auto h-12 w-12" />
              <h3 className="mt-4 text-lg font-semibold">暂无报告</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                点击 &quot;生成周报&quot; 按钮，创建你的第一份习惯报告
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {milestones && milestones.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {milestones.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
          ) : (
            <Card className="py-12 text-center">
              <Trophy className="text-muted-foreground mx-auto h-12 w-12" />
              <h3 className="mt-4 text-lg font-semibold">暂无里程碑</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                坚持完成习惯，解锁成就徽章
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ReportCardProps {
  report: {
    id: string;
    type: "WEEKLY" | "MONTHLY" | "MILESTONE";
    periodStart: Date;
    periodEnd: Date;
    summary: unknown;
    highlights: unknown;
    isRead: boolean;
    generatedAt: Date;
  };
}

function ReportCard({ report }: ReportCardProps) {
  const summary = report.summary as {
    completionRate?: number;
    rateChange?: number;
    totalCheckins?: number;
    perfectDays?: number;
  } | null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => (window.location.href = `/reports/${report.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge
                variant={report.type === "WEEKLY" ? "default" : "secondary"}
              >
                {report.type === "WEEKLY"
                  ? "周报"
                  : report.type === "MONTHLY"
                    ? "月报"
                    : "里程碑"}
              </Badge>
              {!report.isRead && <Badge variant="destructive">新</Badge>}
            </div>
            <CardTitle className="text-base">
              {formatDate(report.periodStart)} - {formatDate(report.periodEnd)}
            </CardTitle>
          </div>
          <Calendar className="text-muted-foreground h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className="text-muted-foreground text-sm">完成率</p>
            <p className="text-lg font-semibold">
              {summary?.completionRate ?? 0}%
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">变化</p>
            <p className="flex items-center text-lg font-semibold">
              {(summary?.rateChange ?? 0) >= 0 ? (
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              {(summary?.rateChange ?? 0) >= 0 ? "+" : ""}
              {summary?.rateChange ?? 0}%
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">打卡次数</p>
            <p className="text-lg font-semibold">
              {summary?.totalCheckins ?? 0}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">完美天数</p>
            <p className="text-lg font-semibold">{summary?.perfectDays ?? 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MilestoneCardProps {
  milestone: {
    id: string;
    type: string;
    achievedAt: Date;
    streakDays: number;
    celebration: string;
    habit: {
      id: string;
      name: string;
      type: "BUILD" | "BREAK";
    };
  };
}

function MilestoneCard({ milestone }: MilestoneCardProps) {
  const milestoneLabels: Record<string, string> = {
    DAY_7: "7 天成就",
    DAY_21: "21 天里程碑",
    DAY_66: "66 天突破",
    DAY_100: "100 天传奇",
    CUSTOM: "自定义里程碑",
  };

  return (
    <Card className="overflow-hidden">
      <div className="from-primary/10 to-primary/5 bg-gradient-to-r p-4">
        <div className="flex items-center justify-between">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <Badge variant="outline">
            {milestoneLabels[milestone.type] ?? milestone.type}
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="font-semibold">{milestone.habit.name}</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          连续 {milestone.streakDays} 天
        </p>
        <p className="mt-3 text-sm">{milestone.celebration}</p>
        <p className="text-muted-foreground mt-2 text-xs">
          达成于 {new Date(milestone.achievedAt).toLocaleDateString("zh-CN")}
        </p>
      </CardContent>
    </Card>
  );
}

function ReportsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j}>
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="mt-1 h-6 w-12" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
