"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CelebrationPicker } from "./celebration-picker";
import { ShineScorePicker } from "./shine-score-picker";
import { triggerConfetti } from "./confetti-effect";
import { type CelebrationMethod } from "@/lib/celebration/methods";
import { api } from "@/trpc/react";

interface FlashCelebrationProps {
  /**
   * 按钮变体
   */
  variant?: "default" | "floating" | "compact";
  /**
   * 创建成功回调
   */
  onSuccess?: () => void;
}

/**
 * 闪电庆祝组件
 * 随时为任何良好行为快速庆祝，无需关联习惯
 */
export function FlashCelebration({
  variant = "default",
  onSuccess,
}: FlashCelebrationProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"input" | "celebrate" | "rate">("input");
  const [content, setContent] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<CelebrationMethod>();
  const [shineScore, setShineScore] = useState<number>();
  const [expanded, setExpanded] = useState(false);

  const createMutation = api.celebration.createFlashCelebration.useMutation({
    onSuccess: () => {
      triggerConfetti("normal");
      setOpen(false);
      resetState();
      onSuccess?.();
    },
  });

  const resetState = () => {
    setStep("input");
    setContent("");
    setSelectedMethod(undefined);
    setShineScore(undefined);
    setExpanded(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetState();
    }
  };

  const handleContentSubmit = () => {
    if (!content.trim()) return;
    setStep("celebrate");
  };

  const handleSelectMethod = (method: CelebrationMethod) => {
    setSelectedMethod(method);
    triggerConfetti("normal");
    setTimeout(() => setStep("rate"), 500);
  };

  const handleComplete = () => {
    createMutation.mutate({
      content: content.trim(),
      shineScore,
    });
  };

  const handleSkipCelebration = () => {
    createMutation.mutate({
      content: content.trim(),
    });
  };

  // 不同按钮变体
  const TriggerButton = () => {
    if (variant === "floating") {
      return (
        <Button
          size="lg"
          className="fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-lg"
        >
          <Zap className="h-6 w-6" />
        </Button>
      );
    }

    if (variant === "compact") {
      return (
        <Button variant="outline" size="sm">
          <Zap className="mr-1 h-4 w-4" />
          闪电庆祝
        </Button>
      );
    }

    return (
      <Button variant="outline">
        <Zap className="mr-2 h-4 w-4" />
        闪电庆祝
      </Button>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <TriggerButton />
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            闪电庆祝
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground text-sm">
                发生了什么值得庆祝的事？任何小小的进步都值得认可！
              </p>

              <div className="space-y-2">
                <Input
                  placeholder="例如：今天提前5分钟起床了"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={200}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && content.trim()) {
                      handleContentSubmit();
                    }
                  }}
                />
                <p className="text-muted-foreground text-right text-xs">
                  {content.length}/200
                </p>
              </div>

              {/* 快捷模板 */}
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs">快捷模板：</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TEMPLATES.map((template) => (
                    <Button
                      key={template}
                      variant="outline"
                      size="sm"
                      onClick={() => setContent(template)}
                      className="text-xs"
                    >
                      {template}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleContentSubmit}
                disabled={!content.trim()}
                className="w-full"
              >
                下一步
              </Button>
            </motion.div>
          )}

          {step === "celebrate" && (
            <motion.div
              key="celebrate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-primary/10 rounded-lg p-3 text-center">
                <p className="text-sm">{content}</p>
              </div>

              <div className="text-muted-foreground text-center text-sm">
                <Sparkles className="mb-1 inline h-4 w-4" />{" "}
                选择你喜欢的庆祝方式！
              </div>

              <CelebrationPicker
                value={selectedMethod}
                onChange={handleSelectMethod}
                expanded={expanded}
                onExpandedChange={setExpanded}
              />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("input")}
                  className="flex-1"
                >
                  返回
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSkipCelebration}
                  className="text-muted-foreground flex-1"
                >
                  跳过庆祝
                </Button>
              </div>
            </motion.div>
          )}

          {step === "rate" && (
            <motion.div
              key="rate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {selectedMethod && (
                <div className="bg-primary/10 flex items-center justify-center gap-2 rounded-lg p-3">
                  <span className="text-2xl">{selectedMethod.emoji}</span>
                  <span className="text-sm">{selectedMethod.content}</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="text-muted-foreground text-center text-sm">
                  感受一下此刻的「发光」感：
                </div>
                <ShineScorePicker
                  value={shineScore}
                  onChange={setShineScore}
                  size="lg"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("celebrate")}
                  className="flex-1"
                >
                  返回
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!shineScore || createMutation.isPending}
                  className="flex-1"
                >
                  {createMutation.isPending ? "保存中..." : "完成"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

// 快捷模板
const QUICK_TEMPLATES = [
  "今天提前起床了",
  "完成了一个小任务",
  "保持了好心情",
  "帮助了别人",
  "学习了新东西",
];

/**
 * 浮动闪电庆祝按钮
 */
export function FloatingFlashCelebration({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return <FlashCelebration variant="floating" onSuccess={onSuccess} />;
}
