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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Bell,
  Dumbbell,
  Heart,
  Loader2,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";

interface HabitDoctorProps {
  habitId: string;
  habitName: string;
}

type DiagnosisCategory = "PROMPT" | "ABILITY" | "MOTIVATION";

const CATEGORY_CONFIG: Record<
  DiagnosisCategory,
  { label: string; icon: React.ReactNode; color: string; description: string }
> = {
  PROMPT: {
    label: "提示问题",
    icon: <Bell className="h-5 w-5" />,
    color: "text-orange-500",
    description: "锚点不稳定或缺少触发线索",
  },
  ABILITY: {
    label: "能力问题",
    icon: <Dumbbell className="h-5 w-5" />,
    color: "text-blue-500",
    description: "行为太难或缺少资源",
  },
  MOTIVATION: {
    label: "动机问题",
    icon: <Heart className="h-5 w-5" />,
    color: "text-red-500",
    description: "缺乏深层驱动力",
  },
};

export function HabitDoctor({ habitId, habitName }: HabitDoctorProps) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [userFeedback, setUserFeedback] = useState("");
  const [diagnosisResult, setDiagnosisResult] = useState<{
    habitName: string;
    mainIssue: {
      category: DiagnosisCategory;
      issue: string;
      confidence: number;
      evidence: string[];
    };
    secondaryIssues: Array<{
      category: DiagnosisCategory;
      issue: string;
      confidence: number;
      evidence: string[];
    }>;
    prescriptions: Array<{
      category: DiagnosisCategory;
      title: string;
      description: string;
      steps: string[];
      difficulty: number;
      expectedTime: string;
    }>;
    encouragement: string;
  } | null>(null);

  // 快速诊断
  const { data: quickResult, isLoading: quickLoading } =
    api.habitDoctor.quickDiagnose.useQuery({ habitId });

  // 深度诊断
  const deepDiagnoseMutation = api.habitDoctor.deepDiagnose.useMutation({
    onSuccess: (data) => {
      setDiagnosisResult(data as typeof diagnosisResult);
      setFeedbackOpen(false);
      setUserFeedback("");
      toast.success("诊断完成");
    },
    onError: () => {
      toast.error("诊断失败，请稍后重试");
    },
  });

  // 生成处方（保留用于未来功能）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _prescriptionMutation =
    api.habitDoctor.generatePrescription.useMutation({
      onSuccess: (prescriptions) => {
        toast.success(`已生成 ${prescriptions.length} 个处方建议`);
      },
      onError: () => {
        toast.error("生成处方失败");
      },
    });

  const handleDeepDiagnose = () => {
    deepDiagnoseMutation.mutate({
      habitId,
      userFeedback: userFeedback || undefined,
    });
  };

  if (quickLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!quickResult) {
    return null;
  }

  const needsHelp = quickResult.needsDeepDiagnosis;
  const category = quickResult.category as DiagnosisCategory;
  const categoryConfig = CATEGORY_CONFIG[category];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-green-600" />
            <CardTitle className="text-base">习惯医生</CardTitle>
          </div>
          {needsHelp ? (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              需要关注
            </Badge>
          ) : (
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              状态良好
            </Badge>
          )}
        </div>
        <CardDescription>基于福格行为模型诊断习惯执行问题</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 快速诊断结果 */}
        <div className="rounded-lg border p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={categoryConfig.color}>
                {categoryConfig.icon}
              </span>
              <span className="font-medium">{categoryConfig.label}</span>
            </div>
            <Badge variant="secondary">
              完成率{" "}
              {Math.round(quickResult.symptoms.recentCompletionRate * 100)}%
            </Badge>
          </div>
          <p className="text-muted-foreground mb-2 text-sm">
            {categoryConfig.description}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">最近7天漏打卡：</span>
              <span className="font-medium">
                {quickResult.symptoms.missedDays}天
              </span>
            </div>
            {quickResult.symptoms.avgDifficulty !== undefined && (
              <div>
                <span className="text-muted-foreground">平均难度：</span>
                <span className="font-medium">
                  {quickResult.symptoms.avgDifficulty.toFixed(1)}/5
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 深度诊断按钮 */}
        {needsHelp && !diagnosisResult && (
          <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Stethoscope className="mr-2 h-4 w-4" />
                开始深度诊断
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>深度诊断「{habitName}」</DialogTitle>
                <DialogDescription>
                  AI 将分析你的打卡记录，找出问题根源并给出针对性建议
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">
                    你觉得是什么原因导致习惯难以坚持？（可选）
                  </label>
                  <Textarea
                    placeholder="例如：总是忘记、太累了、没有动力..."
                    value={userFeedback}
                    onChange={(e) => setUserFeedback(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setFeedbackOpen(false)}
                >
                  取消
                </Button>
                <Button
                  onClick={handleDeepDiagnose}
                  disabled={deepDiagnoseMutation.isPending}
                >
                  {deepDiagnoseMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  开始诊断
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* 深度诊断结果 */}
        {diagnosisResult && (
          <div className="space-y-4">
            {/* 主要问题 */}
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={
                    CATEGORY_CONFIG[diagnosisResult.mainIssue.category].color
                  }
                >
                  {CATEGORY_CONFIG[diagnosisResult.mainIssue.category].icon}
                </span>
                <span className="font-medium">
                  主要问题：
                  {CATEGORY_CONFIG[diagnosisResult.mainIssue.category].label}
                </span>
                <Badge variant="outline">
                  置信度{" "}
                  {Math.round(diagnosisResult.mainIssue.confidence * 100)}%
                </Badge>
              </div>
              <p className="mb-2 text-sm">{diagnosisResult.mainIssue.issue}</p>
              {diagnosisResult.mainIssue.evidence.length > 0 && (
                <div className="text-muted-foreground text-xs">
                  <span className="font-medium">证据：</span>
                  <ul className="mt-1 list-inside list-disc">
                    {diagnosisResult.mainIssue.evidence.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 次要问题 */}
            {diagnosisResult.secondaryIssues.length > 0 && (
              <Accordion type="single" collapsible>
                <AccordionItem value="secondary">
                  <AccordionTrigger className="text-sm">
                    次要问题（{diagnosisResult.secondaryIssues.length}个）
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {diagnosisResult.secondaryIssues.map((issue, i) => (
                        <div key={i} className="rounded-lg border p-3 text-sm">
                          <div className="mb-1 flex items-center gap-2">
                            <span
                              className={CATEGORY_CONFIG[issue.category].color}
                            >
                              {CATEGORY_CONFIG[issue.category].icon}
                            </span>
                            <span className="font-medium">
                              {CATEGORY_CONFIG[issue.category].label}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{issue.issue}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* 处方建议 */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">处方建议</span>
              </div>
              <div className="space-y-3">
                {diagnosisResult.prescriptions.map((rx, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={CATEGORY_CONFIG[rx.category].color}>
                          {CATEGORY_CONFIG[rx.category].icon}
                        </span>
                        <span className="font-medium">{rx.title}</span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-xs">
                        <span>难度 {rx.difficulty}/5</span>
                        <span>·</span>
                        <span>{rx.expectedTime}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2 text-sm">
                      {rx.description}
                    </p>
                    <div className="space-y-1">
                      {rx.steps.map((step, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="text-muted-foreground mt-0.5 h-4 w-4" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 鼓励语 */}
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/20">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                {diagnosisResult.encouragement}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * 习惯健康概览组件
 * 显示所有习惯的健康状态
 */
export function HabitHealthOverview() {
  const { data: overview, isLoading } =
    api.habitDoctor.getHealthOverview.useQuery();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!overview || overview.totalHabits === 0) {
    return null;
  }

  const healthyPercent = Math.round(
    (overview.healthyHabits / overview.totalHabits) * 100,
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-green-600" />
          <CardTitle className="text-base">习惯健康状态</CardTitle>
        </div>
        <CardDescription>基于最近7天的打卡数据分析</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 总体健康度 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">总体健康度</span>
            <span className="text-muted-foreground text-sm">
              {healthyPercent}%
            </span>
          </div>
          <Progress
            value={healthyPercent}
            className={
              healthyPercent >= 70
                ? ""
                : healthyPercent >= 40
                  ? "[&>div]:bg-yellow-500"
                  : "[&>div]:bg-red-500"
            }
          />
        </div>

        {/* 状态分布 */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg border p-3">
            <p className="text-2xl font-bold text-green-600">
              {overview.healthyHabits}
            </p>
            <p className="text-muted-foreground text-xs">健康</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-2xl font-bold text-yellow-600">
              {overview.needsAttention}
            </p>
            <p className="text-muted-foreground text-xs">需关注</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-2xl font-bold text-red-600">
              {overview.critical}
            </p>
            <p className="text-muted-foreground text-xs">危险</p>
          </div>
        </div>

        {/* 需要关注的习惯 */}
        {overview.habitStatuses
          .filter((h) => h.status !== "HEALTHY")
          .slice(0, 3)
          .map((habit) => (
            <div
              key={habit.habitId}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    habit.status === "CRITICAL"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }
                >
                  {habit.status === "CRITICAL" ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium">{habit.habitName}</p>
                  <p className="text-muted-foreground text-xs">
                    完成率 {habit.completionRate}%
                  </p>
                </div>
              </div>
              <Badge variant="outline">
                {
                  CATEGORY_CONFIG[habit.suggestedCategory as DiagnosisCategory]
                    ?.label
                }
              </Badge>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
