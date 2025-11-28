"use client";

import { api } from "@/trpc/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Plus, Flame, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

export function DashboardContent() {
  const { data: habits, isLoading } = api.habit.getActive.useQuery();

  if (isLoading) {
    return <div>加载中...</div>;
  }

  if (!habits || habits.length === 0) {
    return <EmptyState />;
  }

  // Calculate overall stats
  const totalHabits = habits.length;
  const completedToday = habits.filter((h) => h.todayCompleted).length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  // Calculate total streak (max streak among habits)
  const maxStreak = Math.max(...habits.map((h) => h.totalCompletedDays), 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日完成</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedToday}/{totalHabits}
            </div>
            <Progress value={completionRate} className="mt-2" />
            <p className="mt-1 text-xs text-muted-foreground">
              完成率 {completionRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃习惯</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHabits}</div>
            <p className="text-xs text-muted-foreground">
              正在进行中
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">累计打卡</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maxStreak}</div>
            <p className="text-xs text-muted-foreground">
              天
            </p>
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

function HabitItem({ habit }: HabitItemProps) {
  const utils = api.useUtils();
  const logMutation = api.log.quickLog.useMutation({
    onSuccess: () => {
      void utils.habit.getActive.invalidate();
    },
  });

  const isCompleted = habit.todayCompleted ?? false;

  const handleToggle = () => {
    if (!isCompleted) {
      logMutation.mutate({
        habitId: habit.id,
        completed: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          disabled={isCompleted || logMutation.isPending}
          className="focus:outline-none"
        >
          {isCompleted ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground hover:text-primary" />
          )}
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className={isCompleted ? "line-through text-muted-foreground" : "font-medium"}>
              {habit.name}
            </span>
            <Badge variant={habit.type === "BUILD" ? "default" : "secondary"}>
              {habit.type === "BUILD" ? "养成" : "戒除"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            第 {habit.currentPhase} 阶段 · 累计 {habit.totalCompletedDays} 天
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/habits/${habit.id}`}>详情</Link>
      </Button>
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="flex flex-col items-center justify-center py-12">
      <Target className="h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">还没有习惯</h3>
      <p className="mt-2 text-sm text-muted-foreground">
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
