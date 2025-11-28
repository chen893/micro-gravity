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
import {
  AlertTriangle,
  CheckCircle2,
  Flame,
  Heart,
  Shield,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface RelapseManagerProps {
  habitId: string;
  targetDaysClean?: number;
}

export function RelapseManager({ habitId, targetDaysClean = 7 }: RelapseManagerProps) {
  const { data: relapseData, isLoading } = api.analytics.getRelapseAnalysis.useQuery(
    { habitId, targetDaysClean },
    { staleTime: 60 * 1000 } // 1分钟缓存
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">复发管理</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!relapseData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">复发管理</CardTitle>
          <CardDescription>暂无数据</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            开始记录触发时刻后，这里将显示复发分析
          </p>
        </CardContent>
      </Card>
    );
  }

  const {
    isRelapse,
    daysSinceLastRelapse,
    relapseCount,
    relapsePattern,
    recoveryAdvice,
    streakProgress,
  } = relapseData;

  const progressPercent = Math.min((daysSinceLastRelapse / targetDaysClean) * 100, 100);
  const isOnTrack = daysSinceLastRelapse >= targetDaysClean;

  return (
    <div className="space-y-4">
      {/* 当前状态卡片 */}
      <Card className={isRelapse ? "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20" : "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20"}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {isRelapse ? (
                <>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  复发期
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 text-green-500" />
                  恢复期
                </>
              )}
            </CardTitle>
            <Badge variant={isRelapse ? "destructive" : "default"}>
              {isOnTrack ? "已达标" : `还需 ${targetDaysClean - daysSinceLastRelapse} 天`}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 连续天数 */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{daysSinceLastRelapse}</div>
              <div className="text-sm text-muted-foreground">天未复发</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold">{relapseCount}</div>
              <div className="text-sm text-muted-foreground">累计复发</div>
            </div>
          </div>

          {/* 进度条 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>目标进度</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>开始</span>
              <span>目标: {targetDaysClean}天</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 复发模式分析 */}
      {relapsePattern && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-amber-500" />
              复发模式
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{relapsePattern}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              了解你的复发模式有助于提前预防
            </p>
          </CardContent>
        </Card>
      )}

      {/* 恢复建议 */}
      {recoveryAdvice && recoveryAdvice.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="h-4 w-4 text-pink-500" />
              恢复建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recoveryAdvice.map((advice, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-green-500" />
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* 阶段进度 */}
      {streakProgress && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              坚持阶段
            </CardTitle>
            <CardDescription>
              每个阶段都是一次胜利
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {streakProgress.milestones.map((milestone) => (
                <div
                  key={milestone.days}
                  className={`flex flex-col items-center rounded-lg border p-2 ${
                    milestone.reached
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                      : "border-muted"
                  }`}
                >
                  <div
                    className={`text-lg font-bold ${
                      milestone.reached ? "text-green-600" : "text-muted-foreground"
                    }`}
                  >
                    {milestone.days}
                  </div>
                  <div className="text-xs text-muted-foreground">天</div>
                  {milestone.reached && (
                    <CheckCircle2 className="mt-1 h-4 w-4 text-green-500" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              {streakProgress.nextMilestone
                ? `距离下一个里程碑还有 ${streakProgress.nextMilestone - daysSinceLastRelapse} 天`
                : "太棒了！你已经达成所有里程碑！"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* 趋势分析 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            抵抗力趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {relapseData.resistanceRate ?? 0}%
              </div>
              <div className="text-xs text-muted-foreground">总体抵抗率</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {relapseData.recentResistanceRate ?? 0}%
              </div>
              <div className="text-xs text-muted-foreground">近7天抵抗率</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${
                (relapseData.rateChange ?? 0) >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {(relapseData.rateChange ?? 0) >= 0 ? "+" : ""}
                {relapseData.rateChange ?? 0}%
              </div>
              <div className="text-xs text-muted-foreground">变化趋势</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
