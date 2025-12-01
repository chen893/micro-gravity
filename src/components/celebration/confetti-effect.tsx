"use client";

import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  /**
   * 是否触发动画
   */
  trigger: boolean;
  /**
   * 动画强度: normal(普通打卡) / milestone(里程碑)
   */
  intensity?: "normal" | "milestone";
  /**
   * 动画完成回调
   */
  onComplete?: () => void;
}

/**
 * 彩纸庆祝动画效果组件
 * 使用 canvas-confetti 库实现
 */
export function ConfettiEffect({
  trigger,
  intensity = "normal",
  onComplete,
}: ConfettiEffectProps) {
  const fireConfetti = useCallback(() => {
    if (intensity === "milestone") {
      // 里程碑时的增强动画
      fireMilestoneConfetti();
    } else {
      // 普通打卡的动画
      fireNormalConfetti();
    }

    // 动画完成回调
    if (onComplete) {
      setTimeout(onComplete, intensity === "milestone" ? 3000 : 1500);
    }
  }, [intensity, onComplete]);

  useEffect(() => {
    if (trigger) {
      fireConfetti();
    }
  }, [trigger, fireConfetti]);

  return null; // 纯效果组件，不渲染 DOM
}

/**
 * 普通打卡的彩纸动画
 */
function fireNormalConfetti() {
  const count = 100;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    void confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // 多层次发射，创造丰富效果
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ["#FFD700", "#FFA500", "#FF6347"],
  });

  fire(0.2, {
    spread: 60,
    colors: ["#87CEEB", "#98FB98", "#DDA0DD"],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ["#FF69B4", "#00CED1", "#FFD700"],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ["#FF6347", "#4169E1", "#32CD32"],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ["#FFA500", "#FF69B4", "#00FA9A"],
  });
}

/**
 * 里程碑的增强彩纸动画
 */
function fireMilestoneConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 9999,
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);

    // 从两侧发射
    void confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ["#FFD700", "#FFA500", "#FF6347", "#FF69B4"],
    });

    void confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ["#87CEEB", "#98FB98", "#DDA0DD", "#00CED1"],
    });
  }, 250);
}

/**
 * 手动触发彩纸动画的工具函数
 */
export function triggerConfetti(intensity: "normal" | "milestone" = "normal") {
  if (intensity === "milestone") {
    fireMilestoneConfetti();
  } else {
    fireNormalConfetti();
  }
}

/**
 * 从特定位置触发彩纸（用于按钮点击等场景）
 */
export function triggerConfettiFromElement(
  element: HTMLElement,
  intensity: "normal" | "milestone" = "normal",
) {
  const rect = element.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  if (intensity === "milestone") {
    void confetti({
      particleCount: 150,
      spread: 100,
      origin: { x, y },
      colors: ["#FFD700", "#FFA500", "#FF6347", "#FF69B4", "#87CEEB"],
      zIndex: 9999,
    });
  } else {
    void confetti({
      particleCount: 80,
      spread: 70,
      origin: { x, y },
      colors: ["#FFD700", "#FFA500", "#FF6347"],
      zIndex: 9999,
    });
  }
}
