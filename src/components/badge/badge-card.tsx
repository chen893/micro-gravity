"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import type { BadgeRarity } from "generated/prisma";
import {
  getRarityColor,
  getRarityBgColor,
  getRarityLabel,
} from "@/lib/achievement/badges";

interface BadgeCardProps {
  code: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  category: string;
  isUnlocked: boolean;
  unlockedAt?: Date | null;
  onClick?: () => void;
}

export function BadgeCard({
  name,
  description,
  icon,
  rarity,
  isUnlocked,
  unlockedAt,
  onClick,
}: BadgeCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isUnlocked ? getRarityBgColor(rarity) : "bg-muted/30 opacity-60",
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* 徽章图标 */}
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full text-2xl",
              isUnlocked ? "bg-background shadow-sm" : "bg-muted",
            )}
          >
            {isUnlocked ? (
              <span>{icon}</span>
            ) : (
              <Lock className="text-muted-foreground h-5 w-5" />
            )}
          </div>

          {/* 徽章信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4
                className={cn(
                  "font-medium",
                  !isUnlocked && "text-muted-foreground",
                )}
              >
                {name}
              </h4>
              <Badge
                variant="outline"
                className={cn("text-xs", getRarityColor(rarity))}
              >
                {getRarityLabel(rarity)}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">{description}</p>
            {isUnlocked && unlockedAt && (
              <p className="text-muted-foreground mt-1 text-xs">
                {new Date(unlockedAt).toLocaleDateString("zh-CN")} 解锁
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 迷你徽章展示（用于列表等场景）
 */
interface MiniBadgeProps {
  icon: string;
  name: string;
  rarity: BadgeRarity;
  isUnlocked?: boolean;
}

export function MiniBadge({
  icon,
  name,
  rarity,
  isUnlocked = true,
}: MiniBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full px-2 py-1",
        isUnlocked ? getRarityBgColor(rarity) : "bg-muted",
      )}
      title={name}
    >
      <span className="text-sm">{isUnlocked ? icon : "🔒"}</span>
      <span
        className={cn(
          "text-xs font-medium",
          isUnlocked ? getRarityColor(rarity) : "text-muted-foreground",
        )}
      >
        {name}
      </span>
    </div>
  );
}

/**
 * 徽章进度提示
 */
interface BadgeProgressHintProps {
  icon: string;
  name: string;
  progress: number;
  hint: string;
}

export function BadgeProgressHint({
  icon,
  name,
  progress,
  hint,
}: BadgeProgressHintProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-lg">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-muted-foreground text-xs">{progress}%</span>
        </div>
        <p className="text-muted-foreground mt-0.5 text-xs">{hint}</p>
        <div className="bg-muted mt-1.5 h-1.5 rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
