"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, PartyPopper, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CelebrationPicker } from "./celebration-picker";
import { ShineScorePicker } from "./shine-score-picker";
import { ConfettiEffect, triggerConfetti } from "./confetti-effect";
import { CelebrationTimingTip } from "./celebration-timing-guide";
import { type CelebrationMethod } from "@/lib/celebration/methods";
import { cn } from "@/lib/utils";

interface CelebrationSuccessModalProps {
  /**
   * 是否打开弹窗
   */
  open: boolean;
  /**
   * 关闭弹窗回调
   */
  onClose: () => void;
  /**
   * 习惯名称
   */
  habitName: string;
  /**
   * 当前连续天数
   */
  streakDays: number;
  /**
   * 是否是里程碑（7/21/66/100天）
   */
  isMilestone?: boolean;
  /**
   * 里程碑类型
   */
  milestoneType?: "DAY_7" | "DAY_21" | "DAY_66" | "DAY_100";
  /**
   * 打卡记录ID（用于记录庆祝）
   */
  _logId: string;
  /**
   * 提交庆祝记录回调
   */
  onSubmit: (data: {
    methodId?: string;
    shineScore: number;
    note?: string;
  }) => Promise<void>;
  /**
   * 跳过庆祝回调
   */
  onSkip: () => void;
}

// 里程碑配置
const MILESTONE_CONFIG = {
  DAY_7: {
    title: "🎯 7天成就解锁！",
    subtitle: "你已经坚持了一周，习惯正在形成！",
    color: "from-blue-500 to-cyan-500",
  },
  DAY_21: {
    title: "🌟 21天里程碑！",
    subtitle: "恭喜！你的习惯已经初步养成！",
    color: "from-purple-500 to-pink-500",
  },
  DAY_66: {
    title: "🏆 66天传奇！",
    subtitle: "太棒了！这个习惯已经根深蒂固！",
    color: "from-orange-500 to-red-500",
  },
  DAY_100: {
    title: "👑 100天王者！",
    subtitle: "你是真正的习惯大师！",
    color: "from-yellow-500 to-amber-500",
  },
};

/**
 * 打卡成功庆祝弹窗
 * 整合：彩纸动画 + 庆祝方式选择 + 发光感评分
 */
export function CelebrationSuccessModal({
  open,
  onClose,
  habitName,
  streakDays,
  isMilestone = false,
  milestoneType,
  _logId,
  onSubmit,
  onSkip,
}: CelebrationSuccessModalProps) {
  const [step, setStep] = useState<"celebrate" | "rate">("celebrate");
  const [selectedMethod, setSelectedMethod] = useState<CelebrationMethod>();
  const [shineScore, setShineScore] = useState<number>();
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // 弹窗打开时触发彩纸动画
  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      setStep("celebrate");
      setSelectedMethod(undefined);
      setShineScore(undefined);
      setNote("");
    }
  }, [open]);

  // 选择庆祝方式后进入评分步骤
  const handleSelectMethod = useCallback((method: CelebrationMethod) => {
    setSelectedMethod(method);
    // 再次触发小型彩纸
    triggerConfetti("normal");
    // 短暂延迟后进入评分步骤
    setTimeout(() => setStep("rate"), 500);
  }, []);

  // 提交庆祝记录
  const handleSubmit = async () => {
    if (!shineScore) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        shineScore,
        note: note.trim() || undefined,
      });
      onClose();
    } catch (error) {
      console.error("记录庆祝失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 跳过庆祝
  const handleSkip = () => {
    onSkip();
    onClose();
  };

  const milestoneConfig = milestoneType
    ? MILESTONE_CONFIG[milestoneType]
    : null;

  return (
    <>
      {/* 彩纸动画 */}
      <ConfettiEffect
        trigger={showConfetti}
        intensity={isMilestone ? "milestone" : "normal"}
        onComplete={() => setShowConfetti(false)}
      />

      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent
          className={cn(
            "max-w-md overflow-hidden",
            isMilestone && "border-primary border-2",
          )}
        >
          {/* 里程碑背景渐变 */}
          {isMilestone && milestoneConfig && (
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-10",
                milestoneConfig.color,
              )}
            />
          )}

          <DialogHeader className="relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="mb-2 flex justify-center"
            >
              {isMilestone ? (
                <Trophy className="text-primary h-16 w-16" />
              ) : (
                <PartyPopper className="text-primary h-12 w-12" />
              )}
            </motion.div>

            <DialogTitle className="text-center text-xl">
              {isMilestone && milestoneConfig ? (
                <>
                  <div className="text-2xl font-bold">
                    {milestoneConfig.title}
                  </div>
                  <div className="text-muted-foreground mt-1 text-sm font-normal">
                    {milestoneConfig.subtitle}
                  </div>
                </>
              ) : (
                <>
                  <span className="text-2xl">🎉</span> 太棒了！你做到了！
                </>
              )}
            </DialogTitle>

            {/* 习惯信息 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-center"
            >
              <span className="text-muted-foreground">
                「{habitName}」
                {streakDays > 1 && (
                  <span className="text-primary ml-1 font-medium">
                    第 {streakDays} 天连续完成
                  </span>
                )}
              </span>
            </motion.div>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {step === "celebrate" ? (
              <motion.div
                key="celebrate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4 py-4"
              >
                {/* 庆祝时机提示 */}
                <div className="flex justify-center">
                  <CelebrationTimingTip timing="record" />
                </div>

                <div className="text-muted-foreground text-center text-sm">
                  <Sparkles className="mb-1 inline h-4 w-4" />{" "}
                  用你喜欢的方式庆祝一下！
                </div>

                <CelebrationPicker
                  value={selectedMethod}
                  onChange={handleSelectMethod}
                  expanded={expanded}
                  onExpandedChange={setExpanded}
                />

                {/* 跳过按钮 */}
                <div className="flex justify-center pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                    className="text-muted-foreground text-xs"
                  >
                    跳过庆祝
                    <span className="ml-1 text-xs opacity-60">
                      (庆祝能让习惯更牢固哦)
                    </span>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="rate"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 py-4"
              >
                {/* 显示选中的庆祝方式 */}
                {selectedMethod && (
                  <div className="bg-primary/10 flex items-center justify-center gap-2 rounded-lg p-3">
                    <span className="text-2xl">{selectedMethod.emoji}</span>
                    <span className="text-sm">{selectedMethod.content}</span>
                  </div>
                )}

                {/* 发光感评分 */}
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

                {/* 可选感想 */}
                <div className="space-y-2">
                  <Textarea
                    placeholder="记录此刻的感受（可选）"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="h-20 resize-none"
                    maxLength={200}
                  />
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep("celebrate")}
                    className="flex-1"
                  >
                    返回
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!shineScore || isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "保存中..." : "完成"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * 简化版庆祝弹窗（仅动画和消息）
 */
export function SimpleCelebrationToast({
  habitName,
  streakDays,
}: {
  habitName: string;
  streakDays: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <PartyPopper className="text-primary h-5 w-5" />
      <div>
        <div className="font-medium">「{habitName}」打卡成功！</div>
        {streakDays > 1 && (
          <div className="text-muted-foreground text-sm">
            已连续 {streakDays} 天
          </div>
        )}
      </div>
    </div>
  );
}
