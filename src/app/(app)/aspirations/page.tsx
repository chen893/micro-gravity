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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star,
  Plus,
  Trash2,
  Wand2,
  Target,
  CheckCircle,
  Loader2,
  Sparkles,
  ChevronRight,
  Map,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";

const QUADRANT_CONFIG: Record<
  string,
  { label: string; color: string; description: string }
> = {
  GOLDEN: {
    label: "黄金行为",
    color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
    description: "高影响 + 高可行性",
  },
  HIGH_IMPACT: {
    label: "高影响",
    color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
    description: "高影响但难度较大",
  },
  EASY_WIN: {
    label: "快速胜利",
    color: "text-green-600 bg-green-100 dark:bg-green-900/30",
    description: "容易实现但影响一般",
  },
  AVOID: {
    label: "待评估",
    color: "text-gray-600 bg-gray-100 dark:bg-gray-800",
    description: "需要进一步分析",
  },
};

export default function AspirationsPage() {
  const utils = api.useUtils();
  const [createOpen, setCreateOpen] = useState(false);
  const [newAspiration, setNewAspiration] = useState({
    description: "",
    category: "",
  });
  const [selectedAspiration, setSelectedAspiration] = useState<string | null>(
    null,
  );

  // 获取所有愿望
  const { data: aspirations, isLoading } = api.aspiration.list.useQuery();

  // 创建愿望
  const createMutation = api.aspiration.create.useMutation({
    onSuccess: () => {
      toast.success("愿望已创建");
      setCreateOpen(false);
      setNewAspiration({ description: "", category: "" });
      void utils.aspiration.list.invalidate();
    },
    onError: () => toast.error("创建失败"),
  });

  // 删除愿望
  const deleteMutation = api.aspiration.delete.useMutation({
    onSuccess: () => {
      toast.success("愿望已删除");
      void utils.aspiration.list.invalidate();
    },
    onError: () => toast.error("删除失败"),
  });

  const handleCreate = () => {
    if (!newAspiration.description.trim()) return;
    createMutation.mutate({
      description: newAspiration.description,
      category: newAspiration.category || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-2 h-4 w-48" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">愿望管理</h2>
          <p className="text-muted-foreground">
            记录你的愿望，AI 帮你找到实现的最佳行为
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              添加愿望
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新愿望</DialogTitle>
              <DialogDescription>
                描述你想要实现的目标或成为的人
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>愿望描述</Label>
                <Textarea
                  placeholder="例如：我想成为一个更健康的人..."
                  value={newAspiration.description}
                  onChange={(e) =>
                    setNewAspiration((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>分类（可选）</Label>
                <Input
                  placeholder="例如：健康、学习、工作"
                  value={newAspiration.category}
                  onChange={(e) =>
                    setNewAspiration((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                取消
              </Button>
              <Button
                onClick={handleCreate}
                disabled={
                  !newAspiration.description.trim() || createMutation.isPending
                }
              >
                {createMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                创建
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* 愿望列表 */}
      {!aspirations || aspirations.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <Star className="text-muted-foreground h-12 w-12" />
          <h3 className="mt-4 text-lg font-semibold">还没有愿望</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            添加你的第一个愿望，开始探索实现的方法
          </p>
          <Button className="mt-4" onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加愿望
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {aspirations.map((aspiration) => (
            <AspirationCard
              key={aspiration.id}
              aspiration={aspiration}
              isSelected={selectedAspiration === aspiration.id}
              onSelect={() =>
                setSelectedAspiration(
                  selectedAspiration === aspiration.id ? null : aspiration.id,
                )
              }
              onDelete={() => deleteMutation.mutate({ id: aspiration.id })}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      )}

      {/* 选中愿望的详情 */}
      {selectedAspiration && (
        <AspirationDetail aspirationId={selectedAspiration} />
      )}
    </div>
  );
}

function AspirationCard({
  aspiration,
  isSelected,
  onSelect,
  onDelete,
  isDeleting,
}: {
  aspiration: {
    id: string;
    description: string;
    clarified: string | null;
    category: string | null;
    createdAt: Date;
    _count: {
      habits: number;
      behaviorClusters: number;
    };
  };
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        isSelected ? "ring-primary ring-2" : "hover:shadow-md"
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-2 text-base">
              {aspiration.description}
            </CardTitle>
            {aspiration.category && (
              <Badge variant="outline" className="mt-1">
                {aspiration.category}
              </Badge>
            )}
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive h-8 w-8"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除</AlertDialogTitle>
                <AlertDialogDescription>
                  删除后无法恢复，相关的行为探索数据也将被删除。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  删除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        {aspiration.clarified && (
          <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">
            {aspiration.clarified}
          </p>
        )}
        <div className="text-muted-foreground flex items-center gap-4 text-xs">
          <span>
            {format(new Date(aspiration.createdAt), "M月d日", { locale: zhCN })}
          </span>
          {aspiration._count.habits > 0 && (
            <span className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {aspiration._count.habits} 个习惯
            </span>
          )}
          {aspiration._count.behaviorClusters > 0 && (
            <span className="flex items-center gap-1">
              <Map className="h-3 w-3" />
              已探索
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AspirationDetail({ aspirationId }: { aspirationId: string }) {
  const utils = api.useUtils();

  // 获取愿望详情
  const { data: aspiration, isLoading } = api.aspiration.getById.useQuery({
    id: aspirationId,
  });

  // 生成行为集群
  const generateBehaviorsMutation =
    api.aspiration.generateBehaviors.useMutation({
      onSuccess: () => {
        toast.success("行为集群已生成");
        void utils.aspiration.getById.invalidate({ id: aspirationId });
      },
      onError: () => toast.error("生成失败"),
    });

  // 生成焦点地图
  const generateFocusMapMutation = api.aspiration.generateFocusMap.useMutation({
    onSuccess: () => {
      toast.success("焦点地图已生成");
      void utils.aspiration.getById.invalidate({ id: aspirationId });
    },
    onError: () => toast.error("生成失败"),
  });

  // 选择行为
  const selectBehaviorMutation = api.aspiration.selectBehavior.useMutation({
    onSuccess: () => {
      toast.success("已选择行为");
      void utils.aspiration.getById.invalidate({ id: aspirationId });
    },
    onError: () => toast.error("选择失败"),
  });

  if (isLoading) {
    return <Skeleton className="h-64" />;
  }

  if (!aspiration) {
    return null;
  }

  const latestCluster = aspiration.behaviorClusters[0];
  const behaviors = latestCluster?.behaviors as
    | Array<{
        name: string;
        description?: string;
        impactScore?: number;
        feasibilityScore?: number;
        quadrant?: string;
        recommendation?: string;
        isSelected?: boolean;
      }>
    | undefined;

  const focusMapData = latestCluster?.focusMapData as {
    goldenBehavior?:
      | {
          name: string;
          reason?: string;
          microVersion?: string;
        }
      | string;
    summary?: string;
  } | null;

  const goldenBehavior =
    typeof focusMapData?.goldenBehavior === "string"
      ? { name: focusMapData.goldenBehavior }
      : focusMapData?.goldenBehavior;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-base">行为探索</CardTitle>
        </div>
        <CardDescription>使用 AI 探索实现愿望的最佳行为</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 步骤 1: 生成行为集群 */}
        {!latestCluster && (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <Wand2 className="text-muted-foreground mx-auto h-8 w-8" />
            <p className="mt-2 font-medium">魔法棒探索</p>
            <p className="text-muted-foreground text-sm">
              AI 会根据你的愿望生成一系列可能的行为
            </p>
            <Button
              className="mt-4"
              onClick={() =>
                generateBehaviorsMutation.mutate({
                  aspirationId: aspiration.id,
                })
              }
              disabled={generateBehaviorsMutation.isPending}
            >
              {generateBehaviorsMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <Wand2 className="mr-2 h-4 w-4" />
              开始探索
            </Button>
          </div>
        )}

        {/* 步骤 2: 行为列表和焦点地图 */}
        {latestCluster && behaviors && (
          <div className="space-y-4">
            {/* 焦点地图按钮 */}
            {!focusMapData && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  generateFocusMapMutation.mutate({
                    aspirationId: aspiration.id,
                    clusterId: latestCluster.id,
                  })
                }
                disabled={generateFocusMapMutation.isPending}
              >
                {generateFocusMapMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Map className="mr-2 h-4 w-4" />
                生成焦点地图（评估行为）
              </Button>
            )}

            {/* 黄金行为推荐 */}
            {goldenBehavior && (
              <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/20">
                <div className="mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-600" />
                  <span className="font-medium text-amber-800 dark:text-amber-200">
                    推荐黄金行为
                  </span>
                </div>
                <p className="text-sm font-medium">{goldenBehavior.name}</p>
                {goldenBehavior.microVersion && (
                  <p className="text-muted-foreground mt-1 text-xs">
                    {goldenBehavior.microVersion}
                  </p>
                )}
                {goldenBehavior.reason && (
                  <p className="text-muted-foreground mt-1 text-xs">
                    {goldenBehavior.reason}
                  </p>
                )}
                {focusMapData?.summary && (
                  <p className="text-muted-foreground mt-2 text-xs">
                    {focusMapData?.summary}
                  </p>
                )}
              </div>
            )}

            {/* 行为列表 */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="behaviors">
                <AccordionTrigger>
                  查看所有行为（{behaviors.length}个）
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {behaviors.map((behavior, index) => {
                      const quadrantConfig =
                        QUADRANT_CONFIG[behavior.quadrant ?? "AVOID"];
                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-between rounded-lg border p-3 ${
                            behavior.isSelected ? "ring-primary ring-2" : ""
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {behavior.name}
                              </span>
                              {behavior.quadrant && (
                                <Badge
                                  variant="outline"
                                  className={quadrantConfig?.color}
                                >
                                  {quadrantConfig?.label}
                                </Badge>
                              )}
                              {behavior.isSelected && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            {behavior.recommendation && (
                              <p className="text-muted-foreground mt-1 text-xs">
                                {behavior.recommendation}
                              </p>
                            )}
                            {behavior.impactScore !== undefined && (
                              <div className="text-muted-foreground mt-2 flex gap-4 text-xs">
                                <span>影响力: {behavior.impactScore}/10</span>
                                <span>
                                  可行性: {behavior.feasibilityScore}/10
                                </span>
                              </div>
                            )}
                          </div>
                          {!behavior.isSelected && latestCluster && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                selectBehaviorMutation.mutate({
                                  clusterId: latestCluster.id,
                                  behaviorName: behavior.name,
                                })
                              }
                              disabled={selectBehaviorMutation.isPending}
                            >
                              选择
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* 已选择行为 - 创建习惯入口 */}
            {behaviors.some((b) => b.isSelected) && (
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">
                      已选择：{behaviors.find((b) => b.isSelected)?.name}
                    </span>
                  </div>
                  <Button asChild size="sm">
                    <Link
                      href={`/habits/new?aspirationId=${aspiration.id}&behavior=${encodeURIComponent(
                        behaviors.find((b) => b.isSelected)?.name ?? "",
                      )}`}
                    >
                      <ChevronRight className="mr-1 h-4 w-4" />
                      创建习惯
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 已创建的习惯 */}
        {aspiration.habits.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium">相关习惯</p>
            <div className="space-y-2">
              {aspiration.habits.map((habit) => (
                <Link
                  key={habit.id}
                  href={`/habits/${habit.id}`}
                  className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3"
                >
                  <span>{habit.name}</span>
                  <ChevronRight className="text-muted-foreground h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
