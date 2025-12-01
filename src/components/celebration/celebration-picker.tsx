"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  getCelebrationsByCategory,
  getCategoryName,
  DEFAULT_QUICK_CELEBRATIONS,
  type CelebrationCategory,
  type CelebrationMethod,
} from "@/lib/celebration/methods";

interface CelebrationPickerProps {
  /**
   * 当前选中的庆祝方式
   */
  value?: CelebrationMethod;
  /**
   * 选择变化回调
   */
  onChange: (method: CelebrationMethod) => void;
  /**
   * 用户收藏的庆祝方式ID列表
   */
  favoriteIds?: string[];
  /**
   * 收藏/取消收藏回调
   */
  onToggleFavorite?: (method: CelebrationMethod) => void;
  /**
   * 是否显示完整列表（默认显示快捷选项）
   */
  expanded?: boolean;
  /**
   * 展开/收起回调
   */
  onExpandedChange?: (expanded: boolean) => void;
}

const CATEGORIES: CelebrationCategory[] = [
  "VERBAL",
  "PHYSICAL",
  "MENTAL",
  "SENSORY",
];

/**
 * 庆祝方式选择器组件
 */
export function CelebrationPicker({
  value,
  onChange,
  favoriteIds = [],
  onToggleFavorite,
  expanded = false,
  onExpandedChange,
}: CelebrationPickerProps) {
  const [activeCategory, setActiveCategory] =
    useState<CelebrationCategory>("VERBAL");

  return (
    <div className="space-y-4">
      {/* 快捷选项（4个默认） */}
      <div className="grid grid-cols-2 gap-3">
        {DEFAULT_QUICK_CELEBRATIONS.map((method, index) => (
          <CelebrationCard
            key={index}
            method={method}
            isSelected={
              value?.content === method.content &&
              value?.category === method.category
            }
            onClick={() => onChange(method)}
            isFavorite={false}
          />
        ))}
      </div>

      {/* 展开更多按钮 */}
      <Button
        variant="ghost"
        className="text-muted-foreground w-full"
        onClick={() => onExpandedChange?.(!expanded)}
      >
        <span>{expanded ? "收起" : "更多庆祝方式"}</span>
        <ChevronDown
          className={cn(
            "ml-2 h-4 w-4 transition-transform",
            expanded && "rotate-180",
          )}
        />
      </Button>

      {/* 完整列表 */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* 分类标签 */}
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="shrink-0"
                >
                  {getCategoryName(category)}
                </Button>
              ))}
            </div>

            {/* 当前分类的庆祝方式 */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {getCelebrationsByCategory(activeCategory).map(
                (method, index) => (
                  <CelebrationCard
                    key={index}
                    method={method}
                    isSelected={
                      value?.content === method.content &&
                      value?.category === method.category
                    }
                    onClick={() => onChange(method)}
                    isFavorite={favoriteIds.includes(method.content)}
                    onToggleFavorite={
                      onToggleFavorite
                        ? () => onToggleFavorite(method)
                        : undefined
                    }
                    compact
                  />
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CelebrationCardProps {
  method: CelebrationMethod;
  isSelected: boolean;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite?: () => void;
  compact?: boolean;
}

/**
 * 单个庆祝方式卡片
 */
export function CelebrationCard({
  method,
  isSelected,
  onClick,
  isFavorite,
  onToggleFavorite,
  compact = false,
}: CelebrationCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 transition-all",
        compact ? "p-2" : "p-3",
        isSelected
          ? "border-primary bg-primary/10 shadow-md"
          : "border-border hover:border-primary/50 hover:bg-muted/50",
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 表情符号 */}
      <span className={cn("text-2xl", compact && "text-xl")}>
        {method.emoji}
      </span>

      {/* 描述文字 */}
      <span
        className={cn(
          "text-center text-sm leading-tight",
          compact && "text-xs",
          isSelected ? "font-medium" : "text-muted-foreground",
        )}
      >
        {method.content}
      </span>

      {/* 选中指示器 */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1"
        >
          <Star className="fill-primary text-primary h-4 w-4" />
        </motion.div>
      )}

      {/* 收藏按钮 */}
      {onToggleFavorite && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={cn(
            "absolute -top-1 -left-1 rounded-full p-1 transition-colors",
            isFavorite
              ? "text-red-500"
              : "text-muted-foreground hover:text-red-500",
          )}
        >
          <Heart className={cn("h-3 w-3", isFavorite && "fill-current")} />
        </button>
      )}
    </motion.button>
  );
}

/**
 * 简化版庆祝方式显示
 */
export function CelebrationDisplay({ method }: { method: CelebrationMethod }) {
  return (
    <div className="bg-muted/50 flex items-center gap-2 rounded-lg px-3 py-2">
      <span className="text-xl">{method.emoji}</span>
      <span className="text-sm">{method.content}</span>
    </div>
  );
}
