"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Trophy, Sparkles } from "lucide-react";
import type { BadgeRarity } from "generated/prisma";
import { getRarityColor, getRarityBgColor } from "@/lib/achievement/badges";

// ============ 成就概览卡片 ============

interface AchievementOverviewProps {
  totalBadges: number;
  unlockedBadges: number;
  recentBadges?: Array<{
    icon: string;
    name: string;
    rarity: BadgeRarity;
  }>;
}

export function AchievementOverview({
  totalBadges,
  unlockedBadges,
  recentBadges = [],
}: AchievementOverviewProps) {
  const progress = totalBadges > 0 ? (unlockedBadges / totalBadges) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-base">成就徽章</CardTitle>
          </div>
          <Badge variant="secondary">
            {unlockedBadges}/{totalBadges}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 进度条 */}
        <div className="space-y-1">
          <Progress value={progress} className="h-2" />
          <p className="text-muted-foreground text-xs">
            已解锁 {Math.round(progress)}% 的徽章
          </p>
        </div>

        {/* 最近获得的徽章 */}
        {recentBadges.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs">最近获得</p>
            <div className="flex gap-2">
              {recentBadges.slice(0, 5).map((badge, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-lg",
                    getRarityBgColor(badge.rarity),
                  )}
                  title={badge.name}
                >
                  {badge.icon}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============ 分类进度卡片 ============

interface CategoryProgressProps {
  categories: Array<{
    key: string;
    label: string;
    total: number;
    unlocked: number;
    progress: number;
  }>;
}

export function CategoryProgress({ categories }: CategoryProgressProps) {
  const categoryIcons: Record<string, string> = {
    STARTER: "🌱",
    STREAK: "🔥",
    CELEBRATION: "✨",
    PERFECT: "⭐",
    SPECIAL: "💎",
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">分类进度</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.key} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <span>{categoryIcons[cat.key] ?? "🏅"}</span>
                <span>{cat.label}</span>
              </span>
              <span className="text-muted-foreground text-xs">
                {cat.unlocked}/{cat.total}
              </span>
            </div>
            <Progress value={cat.progress} className="h-1.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ============ 徽章网格展示 ============

interface BadgeGridProps {
  badges: Array<{
    code: string;
    name: string;
    icon: string;
    rarity: BadgeRarity;
    isUnlocked: boolean;
  }>;
  onBadgeClick?: (code: string) => void;
}

export function BadgeGrid({ badges, onBadgeClick }: BadgeGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
      {badges.map((badge) => (
        <div
          key={badge.code}
          className={cn(
            "flex flex-col items-center gap-1 rounded-lg p-2 transition-all",
            badge.isUnlocked
              ? "hover:bg-muted/50 cursor-pointer"
              : "opacity-50",
          )}
          onClick={() => badge.isUnlocked && onBadgeClick?.(badge.code)}
          title={badge.name}
        >
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full text-2xl",
              badge.isUnlocked ? getRarityBgColor(badge.rarity) : "bg-muted",
            )}
          >
            {badge.isUnlocked ? badge.icon : "🔒"}
          </div>
          <span
            className={cn(
              "text-center text-xs",
              badge.isUnlocked
                ? getRarityColor(badge.rarity)
                : "text-muted-foreground",
            )}
          >
            {badge.name}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============ 解锁通知组件 ============

interface BadgeUnlockNotificationProps {
  icon: string;
  name: string;
  rarity: BadgeRarity;
  description: string;
  onClose?: () => void;
}

export function BadgeUnlockNotification({
  icon,
  name,
  rarity,
  description,
}: BadgeUnlockNotificationProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        "animate-in fade-in duration-300",
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center rounded-2xl p-8 text-center",
          "animate-in zoom-in-95 duration-300",
          getRarityBgColor(rarity),
          "bg-background shadow-2xl",
        )}
      >
        {/* 闪光效果 */}
        <div className="mb-4 flex items-center gap-2 text-amber-500">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <span className="text-sm font-medium">新成就解锁!</span>
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>

        {/* 徽章图标 */}
        <div
          className={cn(
            "flex h-24 w-24 items-center justify-center rounded-full text-5xl",
            "ring-4 ring-offset-2",
            rarity === "LEGENDARY" && "ring-amber-400",
            rarity === "EPIC" && "ring-purple-400",
            rarity === "RARE" && "ring-blue-400",
            rarity === "COMMON" && "ring-gray-300",
            getRarityBgColor(rarity),
          )}
        >
          {icon}
        </div>

        {/* 徽章名称 */}
        <h3 className="mt-4 text-xl font-bold">{name}</h3>

        {/* 稀有度 */}
        <Badge className={cn("mt-2", getRarityColor(rarity))} variant="outline">
          {rarity === "LEGENDARY" && "传说"}
          {rarity === "EPIC" && "史诗"}
          {rarity === "RARE" && "稀有"}
          {rarity === "COMMON" && "普通"}
        </Badge>

        {/* 描述 */}
        <p className="text-muted-foreground mt-3 max-w-xs text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
