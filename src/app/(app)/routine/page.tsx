"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sun,
  Briefcase,
  Sunset,
  Moon,
  Plus,
  Trash2,
  Wand2,
  Sparkles,
  Anchor,
  Shell,
  Loader2,
  Save,
} from "lucide-react";
import { toast } from "sonner";

type TimeSlot = "MORNING" | "WORK" | "EVENING" | "NIGHT";
type Frequency = "DAILY" | "WEEKDAYS" | "WEEKENDS" | "OCCASIONAL";

interface RoutineActivity {
  name: string;
  time?: string;
  frequency: Frequency;
  location?: string;
}

const TIME_SLOT_CONFIG: Record<
  TimeSlot,
  { label: string; icon: React.ReactNode; description: string }
> = {
  MORNING: {
    label: "早晨",
    icon: <Sun className="h-5 w-5 text-orange-500" />,
    description: "起床到出门前",
  },
  WORK: {
    label: "工作",
    icon: <Briefcase className="h-5 w-5 text-blue-500" />,
    description: "工作/学习时间",
  },
  EVENING: {
    label: "傍晚",
    icon: <Sunset className="h-5 w-5 text-amber-500" />,
    description: "下班后到晚餐",
  },
  NIGHT: {
    label: "夜晚",
    icon: <Moon className="h-5 w-5 text-indigo-500" />,
    description: "晚餐后到睡前",
  },
};

const FREQUENCY_LABELS: Record<Frequency, string> = {
  DAILY: "每天",
  WEEKDAYS: "工作日",
  WEEKENDS: "周末",
  OCCASIONAL: "偶尔",
};

export default function RoutinePage() {
  const utils = api.useUtils();
  const [activeTab, setActiveTab] = useState<TimeSlot>("MORNING");
  const [editingActivities, setEditingActivities] = useState<
    Record<TimeSlot, RoutineActivity[]>
  >({
    MORNING: [],
    WORK: [],
    EVENING: [],
    NIGHT: [],
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [aiExtractText, setAiExtractText] = useState("");
  const [aiExtractOpen, setAiExtractOpen] = useState(false);
  const [pearlOpen, setPearlOpen] = useState(false);
  const [pearlAnnoyance, setPearlAnnoyance] = useState("");
  const [pearlOutcome, setPearlOutcome] = useState("");

  // 获取所有日程
  const { data: routines, isLoading } = api.routine.getAll.useQuery();

  // 当数据加载完成后初始化编辑状态
  useEffect(() => {
    if (routines) {
      setEditingActivities({
        MORNING: (routines.MORNING as RoutineActivity[]) ?? [],
        WORK: (routines.WORK as RoutineActivity[]) ?? [],
        EVENING: (routines.EVENING as RoutineActivity[]) ?? [],
        NIGHT: (routines.NIGHT as RoutineActivity[]) ?? [],
      });
    }
  }, [routines]);

  // 保存单个时段（保留用于未来单独保存功能）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const saveTimeSlotMutation = api.routine.saveTimeSlot.useMutation({
    onSuccess: () => {
      toast.success("时段已保存");
      void utils.routine.getAll.invalidate();
      setHasChanges(false);
    },
    onError: () => toast.error("保存失败"),
  });

  // 保存所有时段
  const saveAllMutation = api.routine.saveAll.useMutation({
    onSuccess: () => {
      toast.success("所有日程已保存");
      void utils.routine.getAll.invalidate();
      setHasChanges(false);
    },
    onError: () => toast.error("保存失败"),
  });

  // AI 提取活动
  const extractActivitiesMutation = api.routine.extractActivities.useMutation({
    onSuccess: (activities, variables) => {
      // 使用 variables.timeSlot 避免闭包陈旧问题
      const targetSlot = variables.timeSlot as TimeSlot;
      setEditingActivities((prev) => ({
        ...prev,
        [targetSlot]: [...prev[targetSlot], ...(activities as RoutineActivity[])],
      }));
      setHasChanges(true);
      setAiExtractOpen(false);
      setAiExtractText("");
      toast.success(`已提取 ${activities.length} 个活动`);
    },
    onError: () => toast.error("提取失败"),
  });

  // AI 珍珠习惯设计
  const designPearlMutation = api.routine.designPearlHabit.useMutation({
    onSuccess: (result) => {
      setPearlOpen(false);
      setPearlAnnoyance("");
      setPearlOutcome("");
      toast.success("珍珠习惯已生成", {
        description: `${result.pearlHabit}：${result.miniAction}`,
        duration: 8000,
      });
    },
    onError: () => toast.error("生成失败"),
  });

  // 添加活动
  const addActivity = () => {
    setEditingActivities((prev) => ({
      ...prev,
      [activeTab]: [
        ...prev[activeTab],
        { name: "", frequency: "DAILY" as Frequency },
      ],
    }));
    setHasChanges(true);
  };

  // 更新活动
  const updateActivity = (
    index: number,
    field: keyof RoutineActivity,
    value: string,
  ) => {
    setEditingActivities((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((activity, i) =>
        i === index ? { ...activity, [field]: value } : activity,
      ),
    }));
    setHasChanges(true);
  };

  // 删除活动
  const removeActivity = (index: number) => {
    setEditingActivities((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((_, i) => i !== index),
    }));
    setHasChanges(true);
  };

  // 保存所有
  const saveAll = () => {
    const cleanedRoutines = Object.fromEntries(
      Object.entries(editingActivities).map(([slot, activities]) => [
        slot,
        activities.filter((a) => a.name.trim()),
      ]),
    ) as Record<TimeSlot, RoutineActivity[]>;

    saveAllMutation.mutate({ routines: cleanedRoutines });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">日常作息</h2>
          <p className="text-muted-foreground">
            记录你的日常活动，帮助 AI 找到最佳的习惯锚点
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={pearlOpen} onOpenChange={setPearlOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Shell className="mr-2 h-4 w-4" />
                珍珠习惯
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>设计珍珠习惯</DialogTitle>
                <DialogDescription>
                  将生活中的小烦恼转化为正向习惯的触发点
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>让你烦恼的事情</Label>
                  <Textarea
                    placeholder="例如：每次刷手机停不下来..."
                    value={pearlAnnoyance}
                    onChange={(e) => setPearlAnnoyance(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>你希望的结果（可选）</Label>
                  <Input
                    placeholder="例如：能够控制刷手机的时间"
                    value={pearlOutcome}
                    onChange={(e) => setPearlOutcome(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() =>
                    designPearlMutation.mutate({
                      annoyance: pearlAnnoyance,
                      desiredOutcome: pearlOutcome || undefined,
                    })
                  }
                  disabled={!pearlAnnoyance || designPearlMutation.isPending}
                >
                  {designPearlMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  生成珍珠习惯
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {hasChanges && (
            <Button onClick={saveAll} disabled={saveAllMutation.isPending}>
              {saveAllMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <Save className="mr-2 h-4 w-4" />
              保存全部
            </Button>
          )}
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TimeSlot)}
      >
        <TabsList className="grid w-full grid-cols-4">
          {(Object.keys(TIME_SLOT_CONFIG) as TimeSlot[]).map((slot) => (
            <TabsTrigger key={slot} value={slot} className="flex items-center gap-2">
              {TIME_SLOT_CONFIG[slot].icon}
              <span className="hidden sm:inline">
                {TIME_SLOT_CONFIG[slot].label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {(Object.keys(TIME_SLOT_CONFIG) as TimeSlot[]).map((slot) => (
          <TabsContent key={slot} value={slot} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {TIME_SLOT_CONFIG[slot].icon}
                    <div>
                      <CardTitle className="text-base">
                        {TIME_SLOT_CONFIG[slot].label}时段
                      </CardTitle>
                      <CardDescription>
                        {TIME_SLOT_CONFIG[slot].description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={aiExtractOpen} onOpenChange={setAiExtractOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Wand2 className="mr-2 h-4 w-4" />
                          AI 提取
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>AI 提取活动</DialogTitle>
                          <DialogDescription>
                            描述你的日常活动，AI 会自动提取并分类
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea
                          placeholder="例如：早上7点起床，刷牙洗脸后吃早餐，8点出门上班..."
                          value={aiExtractText}
                          onChange={(e) => setAiExtractText(e.target.value)}
                          rows={4}
                        />
                        <DialogFooter>
                          <Button
                            onClick={() =>
                              extractActivitiesMutation.mutate({
                                text: aiExtractText,
                                timeSlot: activeTab,
                              })
                            }
                            disabled={
                              !aiExtractText ||
                              extractActivitiesMutation.isPending
                            }
                          >
                            {extractActivitiesMutation.isPending && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            提取活动
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" onClick={addActivity}>
                      <Plus className="mr-2 h-4 w-4" />
                      添加
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {editingActivities[slot].length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Anchor className="mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      还没有添加{TIME_SLOT_CONFIG[slot].label}活动
                    </p>
                    <p className="text-muted-foreground text-sm">
                      添加你的日常活动，帮助找到习惯锚点
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={addActivity}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      添加第一个活动
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {editingActivities[slot].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-lg border p-4"
                      >
                        <div className="flex-1 space-y-3">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="space-y-1">
                              <Label>活动名称</Label>
                              <Input
                                placeholder="例如：刷牙"
                                value={activity.name}
                                onChange={(e) =>
                                  updateActivity(index, "name", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>时间（可选）</Label>
                              <Input
                                type="time"
                                value={activity.time ?? ""}
                                onChange={(e) =>
                                  updateActivity(index, "time", e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="space-y-1">
                              <Label>频率</Label>
                              <Select
                                value={activity.frequency}
                                onValueChange={(v) =>
                                  updateActivity(index, "frequency", v)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(FREQUENCY_LABELS).map(
                                    ([value, label]) => (
                                      <SelectItem key={value} value={value}>
                                        {label}
                                      </SelectItem>
                                    ),
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <Label>地点（可选）</Label>
                              <Input
                                placeholder="例如：卫生间"
                                value={activity.location ?? ""}
                                onChange={(e) =>
                                  updateActivity(index, "location", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeActivity(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 锚点建议 */}
            <AnchorSuggestions />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function AnchorSuggestions() {
  const [targetBehavior, setTargetBehavior] = useState("");

  const suggestMutation = api.routine.suggestFromRoutine.useMutation();

  const handleSuggest = () => {
    if (!targetBehavior) return;
    suggestMutation.mutate({ targetBehavior });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-base">AI 锚点建议</CardTitle>
        </div>
        <CardDescription>
          输入你想养成的习惯，AI 会从你的日程中推荐最佳锚点
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="例如：每天冥想5分钟"
            value={targetBehavior}
            onChange={(e) => setTargetBehavior(e.target.value)}
          />
          <Button
            onClick={handleSuggest}
            disabled={!targetBehavior || suggestMutation.isPending}
          >
            {suggestMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            获取建议
          </Button>
        </div>

        {suggestMutation.data && (
          <div className="space-y-3">
            {/* 最佳时段 */}
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
              <p className="font-medium text-blue-800 dark:text-blue-200">
                推荐时段：{TIME_SLOT_CONFIG[suggestMutation.data.bestTimeSlot]?.label ?? suggestMutation.data.bestTimeSlot}
              </p>
              <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                {suggestMutation.data.reasoning}
              </p>
            </div>

            {/* 推荐锚点 */}
            {suggestMutation.data.topAnchors.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium">推荐锚点：</p>
                <div className="space-y-2">
                  {suggestMutation.data.topAnchors.map((anchor, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border p-3 text-sm ${
                        i === 0 ? "bg-green-50 dark:bg-green-950/20" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{anchor.anchorName}</span>
                        <Badge variant={i === 0 ? "default" : "secondary"}>
                          匹配度 {anchor.matchScore}/10
                        </Badge>
                      </div>
                      <p className="mt-1 text-muted-foreground">
                        {anchor.recipePreview}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {anchor.tips}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
