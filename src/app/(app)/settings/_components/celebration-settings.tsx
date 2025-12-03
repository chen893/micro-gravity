"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Star,
  StarOff,
  Check,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

const categoryLabels: Record<string, string> = {
  VERBAL: "口头",
  PHYSICAL: "肢体",
  MENTAL: "心理",
  SENSORY: "感官",
};

export function CelebrationSettings() {
  const utils = api.useUtils();

  // 使用组合查询获取所有设置数据（单次请求）
  const { data: settingsData, isLoading } =
    api.celebration.getSettingsData.useQuery();

  // 从组合数据中解构
  const methods = settingsData?.methods;
  const favorites = settingsData?.favorites;
  const defaultMethod = settingsData?.defaultMethod;
  const recommended = settingsData?.recommended;
  const stats = settingsData?.stats;

  // Mutations - 使用组合查询失效
  const addFavoriteMutation = api.celebration.addFavorite.useMutation({
    onSuccess: () => {
      void utils.celebration.getSettingsData.invalidate();
      toast.success("已添加到收藏");
    },
    onError: () => toast.error("添加失败"),
  });

  const removeFavoriteMutation = api.celebration.removeFavorite.useMutation({
    onSuccess: () => {
      void utils.celebration.getSettingsData.invalidate();
      toast.success("已取消收藏");
    },
    onError: () => toast.error("取消失败"),
  });

  const setDefaultMutation = api.celebration.setDefault.useMutation({
    onSuccess: () => {
      void utils.celebration.getSettingsData.invalidate();
      toast.success("已设为默认");
    },
    onError: () => toast.error("设置失败"),
  });

  const isFavorite = (methodId: string) =>
    favorites?.some((f) => f.celebrationMethodId === methodId);

  const isDefault = (methodId: string) => defaultMethod?.id === methodId;

  const handleToggleFavorite = (methodId: string) => {
    if (isFavorite(methodId)) {
      removeFavoriteMutation.mutate({ methodId });
    } else {
      addFavoriteMutation.mutate({ methodId });
    }
  };

  const handleSetDefault = (methodId: string) => {
    setDefaultMutation.mutate({ methodId });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-base">庆祝方式</CardTitle>
        </div>
        <CardDescription>
          管理你的庆祝方式偏好，收藏喜欢的方式
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 统计信息 */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 rounded-lg border p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.totalCelebrations}</p>
              <p className="text-muted-foreground text-xs">庆祝次数</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {stats.avgShineScore.toFixed(1)}
              </p>
              <p className="text-muted-foreground text-xs">平均发光感</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.celebrationRate}%</p>
              <p className="text-muted-foreground text-xs">庆祝率</p>
            </div>
          </div>
        )}

        {/* 推荐的庆祝方式 */}
        {recommended && recommended.length > 0 && (
          <>
            <div>
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">推荐给你</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommended.slice(0, 6).map((method, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer py-1.5"
                    title={method.reason}
                  >
                    {method.emoji} {method.content}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* 收藏的方式 */}
        {favorites && favorites.length > 0 && (
          <>
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <h4 className="font-medium">我的收藏</h4>
                <span className="text-muted-foreground text-sm">
                  ({favorites.length})
                </span>
              </div>
              <div className="space-y-2">
                {favorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {fav.celebrationMethod.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-medium">
                          {fav.celebrationMethod.content}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {categoryLabels[fav.celebrationMethod.category] ??
                              fav.celebrationMethod.category}
                          </Badge>
                          <span className="text-muted-foreground text-xs">
                            使用 {fav.useCount} 次
                          </span>
                          {fav.isDefault && (
                            <Badge className="text-xs">默认</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!fav.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleSetDefault(fav.celebrationMethodId)
                          }
                          disabled={setDefaultMutation.isPending}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleToggleFavorite(fav.celebrationMethodId)
                        }
                        disabled={removeFavoriteMutation.isPending}
                      >
                        <StarOff className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* 所有方式 */}
        <div>
          <h4 className="mb-3 font-medium">所有庆祝方式</h4>
          {Object.entries(categoryLabels).map(([category, label]) => {
            const categoryMethods = methods?.filter(
              (m) => m.category === category,
            );
            if (!categoryMethods?.length) return null;

            return (
              <div key={category} className="mb-4">
                <p className="text-muted-foreground mb-2 text-sm">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {categoryMethods.map((method) => (
                    <Button
                      key={method.id}
                      variant={isFavorite(method.id) ? "default" : "outline"}
                      size="sm"
                      className="h-auto py-1.5"
                      onClick={() => handleToggleFavorite(method.id)}
                      disabled={
                        addFavoriteMutation.isPending ||
                        removeFavoriteMutation.isPending
                      }
                    >
                      {(addFavoriteMutation.isPending ||
                        removeFavoriteMutation.isPending) && (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      )}
                      {method.emoji} {method.content}
                      {isFavorite(method.id) && (
                        <Star className="ml-1 h-3 w-3 fill-current" />
                      )}
                      {isDefault(method.id) && (
                        <Badge variant="secondary" className="ml-1 text-xs">
                          默认
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
