"use client";

/**
 * 毛伊习惯引导组件
 * 基于福格行为模型的新用户引导，帮助用户：
 * 1. 理解微习惯的核心理念
 * 2. 体验第一个"毛伊习惯"（超简单的3秒习惯）
 * 3. 学会庆祝的重要性
 *
 * 毛伊习惯：起床后说"今天又是美好的一天！"
 */

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Sun,
  Sparkles,
  Heart,
  ChevronRight,
  PartyPopper,
  Target,
  Lightbulb,
  Check,
} from "lucide-react";

type GuideStep = "intro" | "concept" | "try" | "celebrate" | "complete";

interface MauiHabitGuideProps {
  onComplete: (createMauiHabit: boolean) => void;
  onSkip?: () => void;
}

export function MauiHabitGuide({ onComplete, onSkip }: MauiHabitGuideProps) {
  const [step, setStep] = useState<GuideStep>("intro");
  const [hasTried, setHasTried] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const tryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const celebrateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 清理所有定时器
  useEffect(() => {
    return () => {
      if (tryTimeoutRef.current) clearTimeout(tryTimeoutRef.current);
      if (celebrateTimeoutRef.current) clearTimeout(celebrateTimeoutRef.current);
    };
  }, []);

  const handleTryMaui = () => {
    setHasTried(true);
    // 清理之前的定时器
    if (tryTimeoutRef.current) clearTimeout(tryTimeoutRef.current);
    // 短暂延迟后进入庆祝步骤
    tryTimeoutRef.current = setTimeout(() => setStep("celebrate"), 500);
  };

  const handleCelebrate = () => {
    setHasCelebrated(true);
    setShowConfetti(true);
    // 清理之前的定时器
    if (celebrateTimeoutRef.current) clearTimeout(celebrateTimeoutRef.current);
    // 显示庆祝效果后进入完成步骤
    celebrateTimeoutRef.current = setTimeout(() => {
      setShowConfetti(false);
      setStep("complete");
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case "intro":
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
              <Sun className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">欢迎开始你的习惯之旅！</h2>
              <p className="text-muted-foreground">
                在开始之前，让我们先学习一个让习惯&ldquo;黏住&rdquo;的秘密
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 text-left">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">福格行为模型告诉我们：</span>
                <br />
                习惯养成的关键不是意志力，而是让行为变得
                <span className="font-bold">足够小</span>，小到不可能失败。
              </p>
            </div>
            <Button onClick={() => setStep("concept")} className="gap-2">
              了解更多 <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        );

      case "concept":
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-bold">什么是&ldquo;毛伊习惯&rdquo;？</h2>
              <p className="text-muted-foreground text-sm">
                这是一个超简单的练习习惯，只需3秒钟
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">微小到不可能失败</p>
                  <p className="text-muted-foreground text-sm">
                    起床后，只需要说一句话：&ldquo;今天又是美好的一天！&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Lightbulb className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">目的是&ldquo;感受成功&rdquo;</p>
                  <p className="text-muted-foreground text-sm">
                    不在于这个习惯本身有多大价值，而是让你的大脑记住&ldquo;完成习惯&rdquo;的感觉
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100">
                  <PartyPopper className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">庆祝是关键</p>
                  <p className="text-muted-foreground text-sm">
                    完成后立即庆祝，让大脑释放多巴胺，强化这个行为
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={() => setStep("try")} className="w-full gap-2">
              现在就来试试 <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        );

      case "try":
        return (
          <div className="space-y-6 text-center">
            <div
              className={cn(
                "mx-auto flex h-24 w-24 items-center justify-center rounded-full transition-all duration-500",
                hasTried
                  ? "scale-110 bg-green-500"
                  : "bg-gradient-to-br from-amber-400 to-orange-500"
              )}
            >
              {hasTried ? (
                <Check className="h-12 w-12 text-white" />
              ) : (
                <Sun className="h-12 w-12 text-white" />
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold">来，大声说出来：</h2>
              <p className="text-2xl font-bold text-amber-600">
                &ldquo;今天又是美好的一天！&rdquo;
              </p>
            </div>

            {!hasTried && (
              <p className="text-muted-foreground text-sm">
                真的说出来哦，不是默念。感受自己的声音。
              </p>
            )}

            <Button
              onClick={handleTryMaui}
              disabled={hasTried}
              size="lg"
              className="gap-2"
            >
              {hasTried ? "太棒了！" : "我说完了！"}
            </Button>
          </div>
        );

      case "celebrate":
        return (
          <div className="space-y-6 text-center">
            {showConfetti && (
              <div className="pointer-events-none fixed inset-0 z-50">
                <div className="animate-bounce-slow absolute left-1/4 top-1/4 text-4xl">
                  🎉
                </div>
                <div className="animate-bounce-slow absolute right-1/4 top-1/3 text-4xl delay-100">
                  ✨
                </div>
                <div className="animate-bounce-slow absolute left-1/3 top-1/2 text-4xl delay-200">
                  🌟
                </div>
                <div className="animate-bounce-slow absolute right-1/3 bottom-1/3 text-4xl delay-300">
                  🎊
                </div>
              </div>
            )}

            <div
              className={cn(
                "mx-auto flex h-24 w-24 items-center justify-center rounded-full transition-all duration-500",
                hasCelebrated
                  ? "animate-pulse bg-gradient-to-br from-pink-500 to-purple-600"
                  : "bg-gradient-to-br from-purple-400 to-pink-500"
              )}
            >
              <PartyPopper className="h-12 w-12 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold">现在，庆祝一下！</h2>
              <p className="text-muted-foreground">
                可以挥挥拳头，对自己说&ldquo;Yes!&rdquo;，或者微笑一下
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-4">
              <p className="text-sm text-purple-800">
                <span className="font-semibold">为什么要庆祝？</span>
                <br />
                庆祝会让大脑释放多巴胺，这是习惯养成的&ldquo;肥料&rdquo;。
                <br />
                <span className="text-purple-600">
                  情绪创造习惯，而不是重复。
                </span>
              </p>
            </div>

            <Button
              onClick={handleCelebrate}
              disabled={hasCelebrated}
              size="lg"
              className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {hasCelebrated ? "🎉 感觉真好！" : "我庆祝了！"}
            </Button>
          </div>
        );

      case "complete":
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
              <Heart className="h-10 w-10 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">太棒了！</h2>
              <p className="text-muted-foreground">
                你刚刚完成了第一个微习惯循环：
                <br />
                <span className="font-medium">
                  行为 → 庆祝 → 感觉良好
                </span>
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-4 text-left">
              <p className="text-sm text-green-800">
                <span className="font-semibold">记住这个感觉！</span>
                <br />
                每当你完成一个习惯，都可以用同样的方式庆祝。
                这个小小的仪式会帮助你的大脑记住这个行为。
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => onComplete(true)}
                className="w-full gap-2"
              >
                将&ldquo;毛伊习惯&rdquo;添加为我的第一个习惯
              </Button>
              <Button
                variant="outline"
                onClick={() => onComplete(false)}
                className="w-full"
              >
                我想创建自己的习惯
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-normal text-muted-foreground">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            新手引导
          </span>
          {onSkip && step !== "complete" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="h-auto p-0 text-xs hover:bg-transparent"
            >
              跳过
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>{renderStep()}</CardContent>
    </Card>
  );
}

export default MauiHabitGuide;
