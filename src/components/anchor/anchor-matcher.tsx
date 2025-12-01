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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Anchor,
  Loader2,
  MapPin,
  Clock,
  Link2,
  Check,
  ChevronRight,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnchorMatch, AnchorValidation } from "@/lib/ai/anchor-matching";

interface AnchorMatcherProps {
  targetBehavior: string;
  matches: AnchorMatch[];
  selectedAnchor: string | null;
  validation: AnchorValidation | null;
  isLoadingMatches: boolean;
  isLoadingValidation: boolean;
  onGenerateMatches: () => void;
  onSelectAnchor: (anchor: string) => void;
  onValidateAnchor: (anchor: string) => void;
  onComplete: (anchor: string) => void;
}

export function AnchorMatcher({
  targetBehavior,
  matches,
  selectedAnchor,
  validation,
  isLoadingMatches,
  isLoadingValidation,
  onGenerateMatches,
  onSelectAnchor,
  onValidateAnchor,
  onComplete,
}: AnchorMatcherProps) {
  const [customAnchor, setCustomAnchor] = useState("");

  const handleSelectAnchor = (anchor: string) => {
    onSelectAnchor(anchor);
    onValidateAnchor(anchor);
  };

  const handleCustomAnchor = () => {
    if (customAnchor.trim()) {
      handleSelectAnchor(customAnchor.trim());
    }
  };

  const isValid = validation?.isReliable ?? false;
  const canProceed =
    selectedAnchor && (isValid || (validation?.reliabilityScore ?? 0) >= 5);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
          <Anchor className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">智能锚点匹配</h2>
        <p className="text-muted-foreground mt-2">
          为「{targetBehavior}」找到最佳触发时机
        </p>
      </div>

      {matches.length === 0 && !isLoadingMatches ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 text-center">
              AI 将基于你的日程，推荐最适合的锚点
            </p>
            <Button onClick={onGenerateMatches}>
              <Anchor className="mr-2 h-4 w-4" />
              生成锚点推荐
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* 推荐锚点列表 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">推荐锚点</CardTitle>
              <CardDescription>
                基于三维匹配（位置×频率×主题）为你推荐
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingMatches ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                  <span className="text-muted-foreground ml-2">分析中...</span>
                </div>
              ) : (
                <ScrollArea className="h-[280px]">
                  <div className="space-y-3 pr-4">
                    {matches.map((match, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectAnchor(match.anchorName)}
                        className={cn(
                          "w-full rounded-lg border p-4 text-left transition-all",
                          selectedAnchor === match.anchorName
                            ? "border-primary bg-primary/5 ring-primary ring-2"
                            : "hover:bg-muted/50",
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {match.anchorName}
                              </span>
                              {selectedAnchor === match.anchorName && (
                                <Check className="text-primary h-4 w-4" />
                              )}
                            </div>
                            <p className="text-muted-foreground mt-1 text-sm">
                              {match.recipePreview}
                            </p>
                          </div>
                          <Badge
                            variant={
                              match.matchScore >= 8 ? "default" : "secondary"
                            }
                            className="ml-2"
                          >
                            {match.matchScore}/10
                          </Badge>
                        </div>

                        {/* 三维匹配说明 */}
                        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                          <div className="text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">
                              {match.matchReasons.location}
                            </span>
                          </div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="truncate">
                              {match.matchReasons.frequency}
                            </span>
                          </div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Link2 className="h-3 w-3" />
                            <span className="truncate">
                              {match.matchReasons.theme}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* 自定义锚点 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">或者自定义锚点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customAnchor}
                  onChange={(e) => setCustomAnchor(e.target.value)}
                  placeholder="输入你想要的锚点行为..."
                  className="bg-background flex-1 rounded-md border px-3 py-2 text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCustomAnchor}
                  disabled={!customAnchor.trim() || isLoadingValidation}
                >
                  验证
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 验证结果 */}
          {selectedAnchor && (
            <Card
              className={cn(
                "border-2",
                isLoadingValidation
                  ? "border-muted"
                  : isValid
                    ? "border-green-200 dark:border-green-800"
                    : validation?.reliabilityScore &&
                        validation.reliabilityScore >= 5
                      ? "border-amber-200 dark:border-amber-800"
                      : "border-red-200 dark:border-red-800",
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  {isLoadingValidation ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      验证中...
                    </>
                  ) : (
                    <>
                      {isValid ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                      )}
                      锚点验证：{selectedAnchor}
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              {validation && !isLoadingValidation && (
                <CardContent className="space-y-3">
                  {/* 可靠性进度条 */}
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">可靠性评分</span>
                      <span className="font-medium">
                        {validation.reliabilityScore}/10
                      </span>
                    </div>
                    <Progress
                      value={validation.reliabilityScore * 10}
                      className={cn(
                        "h-2",
                        validation.reliabilityScore >= 8
                          ? "[&>div]:bg-green-500"
                          : validation.reliabilityScore >= 5
                            ? "[&>div]:bg-amber-500"
                            : "[&>div]:bg-red-500",
                      )}
                    />
                  </div>

                  {/* 问题与建议 */}
                  {validation.concerns.length > 0 && (
                    <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950/30">
                      <p className="mb-1 text-xs font-medium text-amber-800 dark:text-amber-200">
                        潜在问题
                      </p>
                      <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-300">
                        {validation.concerns.map((concern, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span>•</span>
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {validation.suggestions.length > 0 && (
                    <div className="flex items-start gap-2 text-sm">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <div className="text-muted-foreground space-y-1">
                        {validation.suggestions.map((suggestion, i) => (
                          <p key={i}>{suggestion}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 备选锚点 */}
                  {validation.alternativeAnchors &&
                    validation.alternativeAnchors.length > 0 && (
                      <div>
                        <p className="text-muted-foreground mb-2 text-xs">
                          备选锚点：
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {validation.alternativeAnchors.map((alt, i) => (
                            <Button
                              key={i}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSelectAnchor(alt)}
                            >
                              {alt}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                </CardContent>
              )}
            </Card>
          )}

          {/* 继续按钮 */}
          <Button
            onClick={() => selectedAnchor && onComplete(selectedAnchor)}
            disabled={!canProceed || isLoadingValidation}
            className="w-full"
          >
            使用此锚点继续
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
