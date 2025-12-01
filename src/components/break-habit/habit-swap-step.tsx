"use client";

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
import {
  RefreshCw,
  Loader2,
  Heart,
  Lightbulb,
  ChevronRight,
  Clock,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  SwapRecipe,
  NeedAnalysis,
  SubstituteBehavior,
} from "@/lib/ai/habit-swap";
import { DEEP_NEED_LABELS } from "@/lib/ai/habit-swap";

interface HabitSwapStepProps {
  habitName: string;
  needAnalysis: NeedAnalysis | null;
  swapRecipe: SwapRecipe | null;
  isLoading: boolean;
  onGenerate: () => void;
  onComplete: () => void;
}

export function HabitSwapStep({
  habitName,
  needAnalysis,
  swapRecipe,
  isLoading,
  onGenerate,
  onComplete,
}: HabitSwapStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <RefreshCw className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">习惯替换</h2>
        <p className="text-muted-foreground mt-2">
          用健康的行为替代「{habitName}」
        </p>
      </div>

      {!needAnalysis ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4 text-center">
              AI 将分析你的深层需求，并推荐替代行为
            </p>
            <div className="bg-muted/50 mb-4 rounded-lg p-3 text-sm">
              <p className="text-muted-foreground text-center">
                每个坏习惯背后都有一个未被满足的需求。
                <br />
                找到它，用更健康的方式满足它。
              </p>
            </div>
            <Button onClick={onGenerate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4" />
                  分析深层需求
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* 深层需求分析 */}
          <Card className="border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-base">你的深层需求</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {DEEP_NEED_LABELS[needAnalysis.primaryNeed].emoji}{" "}
                  {DEEP_NEED_LABELS[needAnalysis.primaryNeed].name}
                </Badge>
                {needAnalysis.secondaryNeeds.map((need) => (
                  <Badge key={need} variant="outline" className="text-xs">
                    {DEEP_NEED_LABELS[need].emoji} {DEEP_NEED_LABELS[need].name}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                {needAnalysis.needDescription}
              </p>
            </CardContent>
          </Card>

          {/* 替换配方 */}
          {swapRecipe && (
            <>
              {/* 配方公式 */}
              <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
                <CardContent className="py-4">
                  <p className="text-center text-lg font-medium">
                    {swapRecipe.swapFormula}
                  </p>
                </CardContent>
              </Card>

              {/* 替代行为列表 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">推荐的替代行为</CardTitle>
                  <CardDescription>选择最适合你的</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3 pr-4">
                      {swapRecipe.substitutes.map((substitute, index) => (
                        <SubstituteCard key={index} substitute={substitute} />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* 过渡计划 */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <CardTitle className="text-sm">过渡计划</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {swapRecipe.transitionPlan.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {/* 继续按钮 */}
          <Button onClick={onComplete} className="w-full">
            查看完整计划
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function SubstituteCard({ substitute }: { substitute: SubstituteBehavior }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium">{substitute.name}</h4>
          <p className="text-muted-foreground mt-1 text-sm">
            {substitute.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            {substitute.timeRequired}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.round(substitute.effectivenessScore / 2)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted",
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {substitute.needsSatisfied.map((need) => (
          <Badge key={need} variant="secondary" className="text-xs">
            {DEEP_NEED_LABELS[need].emoji}
          </Badge>
        ))}
      </div>
      {substitute.tips && (
        <p className="text-muted-foreground mt-2 text-xs italic">
          💡 {substitute.tips}
        </p>
      )}
    </div>
  );
}
