"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Target,
  TrendingUp,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import {
  CelebrationSuccessModal,
  FloatingFlashCelebration,
} from "@/components/celebration";
import { SmartReminders } from "./smart-reminders";

export function DashboardContent() {
  const [habits] = api.habit.getActive.useSuspenseQuery();

  if (!habits || habits.length === 0) {
    return <EmptyState />;
  }

  // Calculate overall stats
  const totalHabits = habits.length;
  const completedToday = habits.filter((h) => h.todayCompleted).length;
  const completionRate =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  // Calculate total streak (max streak among habits)
  const maxStreak = Math.max(...habits.map((h) => h.totalCompletedDays), 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日完成</CardTitle>
            <Target className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedToday}/{totalHabits}
            </div>
            <Progress value={completionRate} className="mt-2" />
            <p className="text-muted-foreground mt-1 text-xs">
              完成率 {completionRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃习惯</CardTitle>
            <Flame className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHabits}</div>
            <p className="text-muted-foreground text-xs">正在进行中</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">累计打卡</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maxStreak}</div>
            <p className="text-muted-foreground text-xs">天</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Habits */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>今日习惯</CardTitle>
            <CardDescription>完成今天的习惯，保持连续记录</CardDescription>
          </div>
          <Button asChild>
            <Link href="/habits/new">
              <Plus className="mr-2 h-4 w-4" />
              添加习惯
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {habits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 智能提醒 */}
      <SmartReminders />

      {/* 浮动闪电庆祝按钮 */}
      <FloatingFlashCelebration />
    </div>
  );
}

interface HabitItemProps {
  habit: {
    id: string;
    name: string;
    type: "BUILD" | "BREAK";
    currentPhase: number;
    todayCompleted?: boolean;
    totalCompletedDays: number;
  };
}

// 庆祝弹窗状态类型
interface CelebrationState {
  open: boolean;
  logId: string;
  habitName: string;
  streakDays: number;
  isMilestone: boolean;
  milestoneType?: "DAY_7" | "DAY_21" | "DAY_66" | "DAY_100";
}

function HabitItem({ habit }: HabitItemProps) {
  const utils = api.useUtils();

  // 庆祝弹窗状态
  const [celebration, setCelebration] = useState<CelebrationState>({
    open: false,
    logId: "",
    habitName: "",
    streakDays: 0,
    isMilestone: false,
  });

  const logMutation = api.log.quickLog.useMutation({
    onSuccess: (data) => {
      void utils.habit.getActive.invalidate();
      // 打开庆祝弹窗
      setCelebration({
        open: true,
        logId: data.log.id,
        habitName: data.habitName,
        streakDays: data.streakDays,
        isMilestone: data.isMilestone,
        milestoneType: data.milestoneType,
      });
    },
  });

  // 记录庆祝
  const recordCelebrationMutation =
    api.celebration.recordCelebration.useMutation({
      onSuccess: () => void utils.habit.getActive.invalidate(),
    });

  // 跳过庆祝
  const skipCelebrationMutation = api.celebration.skipCelebration.useMutation();

  const isCompleted = habit.todayCompleted ?? false;

  const handleToggle = () => {
    if (!isCompleted) {
      logMutation.mutate({
        habitId: habit.id,
        completed: true,
      });
    }
  };

  const handleCelebrationSubmit = async (data: {
    methodId?: string;
    shineScore: number;
    note?: string;
  }) => {
    await recordCelebrationMutation.mutateAsync({
      logId: celebration.logId,
      shineScore: data.shineScore,
      note: data.note,
    });
  };

  const handleCelebrationSkip = () => {
    skipCelebrationMutation.mutate({ logId: celebration.logId });
  };

  const handleCloseCelebration = () => {
    setCelebration((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggle}
            disabled={isCompleted || logMutation.isPending}
            className="focus:outline-none"
          >
            {logMutation.isPending ? (
              <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
            ) : isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="text-muted-foreground hover:text-primary h-6 w-6" />
            )}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={
                  isCompleted
                    ? "text-muted-foreground line-through"
                    : "font-medium"
                }
              >
                {habit.name}
              </span>
              <Badge variant={habit.type === "BUILD" ? "default" : "secondary"}>
                {habit.type === "BUILD" ? "养成" : "戒除"}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              第 {habit.currentPhase} 阶段 · 累计 {habit.totalCompletedDays} 天
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/habits/${habit.id}`}>详情</Link>
        </Button>
      </div>

      {/* 庆祝弹窗 */}
      <CelebrationSuccessModal
        open={celebration.open}
        onClose={handleCloseCelebration}
        habitName={celebration.habitName}
        streakDays={celebration.streakDays}
        isMilestone={celebration.isMilestone}
        milestoneType={celebration.milestoneType}
        _logId={celebration.logId}
        onSubmit={handleCelebrationSubmit}
        onSkip={handleCelebrationSkip}
      />
    </>
  );
}

function EmptyState() {
  return (
    <Card className="flex flex-col items-center justify-center py-12">
      <Target className="text-muted-foreground h-12 w-12" />
      <h3 className="mt-4 text-lg font-semibold">还没有习惯</h3>
      <p className="text-muted-foreground mt-2 text-sm">
        开始创建你的第一个习惯，开启改变之旅
      </p>
      <Button className="mt-4" asChild>
        <Link href="/habits/new">
          <Plus className="mr-2 h-4 w-4" />
          创建习惯
        </Link>
      </Button>
    </Card>
  );
}
