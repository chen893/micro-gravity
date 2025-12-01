"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";
import { BadgeCard, BadgeProgressHint } from "@/components/badge/badge-card";
import {
  AchievementOverview,
  CategoryProgress,
  BadgeUnlockNotification,
} from "@/components/badge/badge-showcase";
import { BADGE_CATEGORIES } from "@/lib/achievement/badges";
import type { BadgeRarity } from "generated/prisma";

export default function AchievementsPage() {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [showUnlockNotification, setShowUnlockNotification] = useState(false);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<{
    icon: string;
    name: string;
    rarity: BadgeRarity;
    description: string;
  } | null>(null);

  // 获取所有徽章
  const { data: badgesData, isLoading: isLoadingBadges } =
    api.badge.getAll.useQuery();

  // 获取分类统计
  const { data: categoryStats, isLoading: isLoadingStats } =
    api.badge.getCategoryStats.useQuery();

  // 获取最近解锁
  const { data: recentUnlocks } = api.badge.getRecentUnlocks.useQuery({
    limit: 5,
  });

  // 获取下一个徽章提示
  const { data: nextBadgeHints } = api.badge.getNextBadgeHint.useQuery();

  // 检测新解锁
  const checkUnlocksMutation = api.badge.checkUnlocks.useMutation({
    onSuccess: (results) => {
      if (results.length > 0) {
        const first = results[0];
        if (first) {
          const badgeDef = badgesData?.badges.find(
            (b) => b.code === first.badgeCode,
          );
          if (badgeDef) {
            setNewlyUnlockedBadge({
              icon: first.badgeIcon,
              name: first.badgeName,
              rarity: badgeDef.rarity,
              description: badgeDef.description,
            });
            setShowUnlockNotification(true);
          }
        }
      }
    },
  });

  // 处理徽章点击
  const handleBadgeClick = (code: string) => {
    setSelectedBadge(code === selectedBadge ? null : code);
  };

  if (isLoadingBadges || isLoadingStats) {
    return <LoadingSkeleton />;
  }

  const badges = badgesData?.badges ?? [];
  const unlockedCount = badgesData?.unlockedCount ?? 0;
  const totalCount = badgesData?.totalCount ?? 0;

  return (
    <div className="container mx-auto max-w-4xl space-y-6 py-6">
      {/* 页面标题 */}
      <div className="flex items-center gap-3">
        <Trophy className="h-8 w-8 text-amber-500" />
        <div>
          <h1 className="text-2xl font-bold">成就中心</h1>
          <p className="text-muted-foreground">收集徽章，记录你的成长足迹</p>
        </div>
      </div>

      {/* 概览和分类进度 */}
      <div className="grid gap-4 md:grid-cols-2">
        <AchievementOverview
          totalBadges={totalCount}
          unlockedBadges={unlockedCount}
          recentBadges={recentUnlocks?.map((b) => ({
            icon: b.icon,
            name: b.name,
            rarity: b.rarity,
          }))}
        />
        <CategoryProgress categories={categoryStats ?? []} />
      </div>

      {/* 即将解锁提示 */}
      {nextBadgeHints && nextBadgeHints.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">即将解锁</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextBadgeHints.map((hint) => (
              <BadgeProgressHint
                key={hint.code}
                icon={hint.icon}
                name={hint.name}
                progress={hint.progress}
                hint={hint.hint}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* 徽章分类展示 */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="STARTER">起步</TabsTrigger>
          <TabsTrigger value="STREAK">连续</TabsTrigger>
          <TabsTrigger value="CELEBRATION">庆祝</TabsTrigger>
          <TabsTrigger value="PERFECT">全勤</TabsTrigger>
          <TabsTrigger value="SPECIAL">特殊</TabsTrigger>
        </TabsList>

        {/* 全部徽章 */}
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {badges.map((badge) => (
              <BadgeCard
                key={badge.code}
                code={badge.code}
                name={badge.name}
                description={badge.description}
                icon={badge.icon}
                rarity={badge.rarity}
                category={badge.category}
                isUnlocked={badge.isUnlocked}
                unlockedAt={badge.unlockedAt}
                onClick={() => handleBadgeClick(badge.code)}
              />
            ))}
          </div>
        </TabsContent>

        {/* 分类标签页 */}
        {Object.entries(BADGE_CATEGORIES).map(([key, label]) => (
          <TabsContent key={key} value={key} className="mt-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {badges
                .filter((b) => b.category === label)
                .map((badge) => (
                  <BadgeCard
                    key={badge.code}
                    code={badge.code}
                    name={badge.name}
                    description={badge.description}
                    icon={badge.icon}
                    rarity={badge.rarity}
                    category={badge.category}
                    isUnlocked={badge.isUnlocked}
                    unlockedAt={badge.unlockedAt}
                    onClick={() => handleBadgeClick(badge.code)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* 解锁通知弹窗 */}
      {showUnlockNotification && newlyUnlockedBadge && (
        <div onClick={() => setShowUnlockNotification(false)}>
          <BadgeUnlockNotification
            icon={newlyUnlockedBadge.icon}
            name={newlyUnlockedBadge.name}
            rarity={newlyUnlockedBadge.rarity}
            description={newlyUnlockedBadge.description}
          />
        </div>
      )}

      {/* 隐藏的检测触发器（用于测试） */}
      {process.env.NODE_ENV === "development" && (
        <button
          className="bg-primary text-primary-foreground fixed right-4 bottom-4 rounded px-3 py-1 text-xs"
          onClick={() => checkUnlocksMutation.mutate()}
        >
          检测徽章
        </button>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 py-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>

      <Skeleton className="h-12 w-full" />

      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    </div>
  );
}
