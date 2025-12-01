"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Utensils,
  ChevronRight,
  Loader2,
  Anchor,
  Sparkles,
  PartyPopper,
  Lightbulb,
  RefreshCw,
  Wand2,
  MapPin,
  Clock,
  AlertCircle,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnchorMatch, AnchorValidation } from "@/lib/ai/anchor-matching";

interface RecipeStepProps {
  behavior: string;
  recipe: {
    anchor: string;
    behavior: string;
    celebration: string;
    fullRecipe: string;
  } | null;
  isLoading: boolean;
  onGenerate: (anchor: string) => void;
  onComplete: (recipe: {
    anchor: string;
    behavior: string;
    celebration: string;
  }) => void;
  // 新增：智能锚点匹配相关
  smartMatches?: AnchorMatch[];
  validation?: AnchorValidation | null;
  isLoadingMatches?: boolean;
  isLoadingValidation?: boolean;
  onGenerateSmartMatches?: () => void;
  onValidateAnchor?: (anchor: string) => void;
  hasRoutineData?: boolean;
}

const ANCHOR_EXAMPLES = [
  { icon: "☕", text: "喝完早上第一杯水", time: "早晨" },
  { icon: "🍽️", text: "吃完午饭", time: "中午" },
  { icon: "🚿", text: "洗完澡", time: "晚上" },
  { icon: "🛏️", text: "坐到床上", time: "睡前" },
  { icon: "🚪", text: "回到家放下包", time: "下班后" },
  { icon: "📱", text: "放下手机", time: "随时" },
];

export function RecipeStep({
  behavior,
  recipe,
  isLoading,
  onGenerate,
  onComplete,
  smartMatches = [],
  validation,
  isLoadingMatches = false,
  isLoadingValidation = false,
  onGenerateSmartMatches,
  onValidateAnchor,
  hasRoutineData = false,
}: RecipeStepProps) {
  const [anchor, setAnchor] = useState("");
  const [editedRecipe, setEditedRecipe] = useState<{
    anchor: string;
    behavior: string;
    celebration: string;
  } | null>(null);
  const [showSmartMatches, setShowSmartMatches] = useState(false);

  // 当 recipe 变化时，初始化编辑状态
  if (recipe && !editedRecipe) {
    setEditedRecipe({
      anchor: recipe.anchor,
      behavior: recipe.behavior,
      celebration: recipe.celebration,
    });
  }

  const handleAnchorSelect = (text: string) => {
    setAnchor(text);
    // 如果有验证功能，选择后自动验证
    if (onValidateAnchor) {
      onValidateAnchor(text);
    }
  };

  const handleGenerate = () => {
    if (anchor.trim()) {
      onGenerate(anchor.trim());
    }
  };

  const handleSmartMatch = () => {
    if (onGenerateSmartMatches) {
      setShowSmartMatches(true);
      onGenerateSmartMatches();
    }
  };

  const handleComplete = () => {
    if (editedRecipe) {
      onComplete(editedRecipe);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950">
          <Utensils className="h-8 w-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold">微习惯配方</h2>
        <p className="text-muted-foreground mt-2">
          在【锚点】之后，我会【行为】，然后【庆祝】
        </p>
      </div>

      {!recipe ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">选择锚点行为</CardTitle>
            <CardDescription>
              锚点是你已经有的稳定日常行为，用它来触发新习惯
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">{behavior}</Badge>
                <span className="text-muted-foreground">← 你的目标行为</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                什么已有行为可以作为锚点？
              </label>
              <Input
                value={anchor}
                onChange={(e) => setAnchor(e.target.value)}
                placeholder="例如：喝完早上第一杯水..."
              />
            </div>

            {/* 智能锚点匹配 */}
            {hasRoutineData && onGenerateSmartMatches && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">智能推荐</p>
                  {!showSmartMatches && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSmartMatch}
                      disabled={isLoadingMatches}
                    >
                      {isLoadingMatches ? (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      ) : (
                        <Wand2 className="mr-1 h-3 w-3" />
                      )}
                      基于日程匹配
                    </Button>
                  )}
                </div>

                {showSmartMatches && (
                  <ScrollArea className="h-[180px]">
                    {isLoadingMatches ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
                        <span className="text-muted-foreground ml-2 text-sm">
                          分析中...
                        </span>
                      </div>
                    ) : smartMatches.length > 0 ? (
                      <div className="space-y-2 pr-4">
                        {smartMatches.map((match, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnchorSelect(match.anchorName)}
                            className={cn(
                              "w-full rounded-lg border p-3 text-left transition-all",
                              anchor === match.anchorName
                                ? "border-primary bg-primary/5 ring-primary ring-1"
                                : "hover:bg-muted/50",
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {match.anchorName}
                                  </span>
                                  {anchor === match.anchorName && (
                                    <Check className="text-primary h-4 w-4" />
                                  )}
                                </div>
                                <p className="text-muted-foreground mt-0.5 text-xs">
                                  {match.recipePreview}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  match.matchScore >= 8
                                    ? "default"
                                    : "secondary"
                                }
                                className="ml-2 shrink-0"
                              >
                                {match.matchScore}/10
                              </Badge>
                            </div>
                            <div className="text-muted-foreground mt-2 flex gap-3 text-xs">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {match.matchReasons.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {match.matchReasons.frequency}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground py-4 text-center text-sm">
                        暂无推荐，请尝试常见锚点
                      </p>
                    )}
                  </ScrollArea>
                )}
              </div>
            )}

            {/* 锚点验证结果 */}
            {anchor && validation && !isLoadingValidation && (
              <div
                className={cn(
                  "rounded-lg border p-3",
                  validation.isReliable
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
                    : validation.reliabilityScore >= 5
                      ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30"
                      : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
                )}
              >
                <div className="flex items-center gap-2">
                  {validation.isReliable ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                  )}
                  <span className="text-sm font-medium">
                    锚点可靠性：{validation.reliabilityScore}/10
                  </span>
                </div>
                {validation.concerns.length > 0 && (
                  <ul className="text-muted-foreground mt-2 space-y-1 text-xs">
                    {validation.concerns.slice(0, 2).map((concern, i) => (
                      <li key={i}>• {concern}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {anchor && isLoadingValidation && (
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                验证锚点中...
              </div>
            )}

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">常见锚点参考：</p>
              <ScrollArea className="h-[120px]">
                <div className="grid grid-cols-2 gap-2 pr-4">
                  {ANCHOR_EXAMPLES.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnchorSelect(example.text)}
                      className={cn(
                        "hover:bg-muted flex items-center gap-2 rounded-lg border p-2 text-left text-sm transition-colors",
                        anchor === example.text &&
                          "border-primary bg-primary/5",
                      )}
                    >
                      <span className="text-lg">{example.icon}</span>
                      <div>
                        <p className="font-medium">{example.text}</p>
                        <p className="text-muted-foreground text-xs">
                          {example.time}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950/30">
              <div className="flex items-start gap-2 text-sm">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-amber-800 dark:text-amber-200">
                  好的锚点应该是：每天都会做、时间固定、你记得清楚的行为
                </p>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!anchor.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  生成配方中...
                </>
              ) : (
                <>
                  <Utensils className="mr-2 h-4 w-4" />
                  生成微习惯配方
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">你的微习惯配方</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditedRecipe(null);
                  onGenerate(anchor);
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
            <CardDescription>点击任意部分可以编辑调整</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 配方卡片 */}
            <div className="border-primary/20 from-primary/5 rounded-xl border-2 bg-gradient-to-br to-transparent p-6">
              <div className="space-y-4">
                {/* 锚点 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                    <Anchor className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs font-medium uppercase">
                      在我...之后
                    </p>
                    <Input
                      value={editedRecipe?.anchor ?? ""}
                      onChange={(e) =>
                        setEditedRecipe((prev) =>
                          prev ? { ...prev, anchor: e.target.value } : null,
                        )
                      }
                      className="mt-1 border-dashed"
                    />
                  </div>
                </div>

                {/* 行为 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
                    <Sparkles className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs font-medium uppercase">
                      我会...
                    </p>
                    <Input
                      value={editedRecipe?.behavior ?? ""}
                      onChange={(e) =>
                        setEditedRecipe((prev) =>
                          prev ? { ...prev, behavior: e.target.value } : null,
                        )
                      }
                      className="mt-1 border-dashed"
                    />
                  </div>
                </div>

                {/* 庆祝 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
                    <PartyPopper className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs font-medium uppercase">
                      为了让大脑记住，我要...
                    </p>
                    <Input
                      value={editedRecipe?.celebration ?? ""}
                      onChange={(e) =>
                        setEditedRecipe((prev) =>
                          prev
                            ? { ...prev, celebration: e.target.value }
                            : null,
                        )
                      }
                      className="mt-1 border-dashed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 完整配方文案 */}
            <div className="bg-muted rounded-lg p-4 text-center">
              <p className="text-muted-foreground text-sm italic">
                「在我
                <span className="text-foreground font-medium">
                  {editedRecipe?.anchor}
                </span>
                之后，我会
                <span className="text-foreground font-medium">
                  {editedRecipe?.behavior}
                </span>
                。为了让大脑记住，我要
                <span className="text-foreground font-medium">
                  {editedRecipe?.celebration}
                </span>
                。」
              </p>
            </div>

            <Button
              onClick={handleComplete}
              disabled={
                !editedRecipe?.anchor.trim() ||
                !editedRecipe?.behavior.trim() ||
                !editedRecipe?.celebration.trim()
              }
              className="w-full"
            >
              开始演练配方
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
