"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type SoundType,
  type SoundConfig,
  getSoundConfig,
  saveSoundConfig,
  playSound,
  preloadSounds,
  DEFAULT_SOUND_CONFIG,
} from "@/lib/celebration/sounds";

/**
 * 庆祝音效 Hook
 * 提供音效播放和配置管理
 */
export function useCelebrationSound() {
  const [config, setConfig] = useState<SoundConfig>(DEFAULT_SOUND_CONFIG);

  // 加载配置
  useEffect(() => {
    setConfig(getSoundConfig());
    // 预加载音效
    preloadSounds();
  }, []);

  // 播放音效
  const play = useCallback((type: SoundType) => {
    playSound(type);
  }, []);

  // 更新配置
  const updateConfig = useCallback((updates: Partial<SoundConfig>) => {
    setConfig((prev) => {
      const newConfig = { ...prev, ...updates };
      saveSoundConfig(newConfig);
      return newConfig;
    });
  }, []);

  // 切换音效开关
  const toggleEnabled = useCallback(() => {
    updateConfig({ enabled: !config.enabled });
  }, [config.enabled, updateConfig]);

  // 设置音量
  const setVolume = useCallback(
    (volume: number) => {
      updateConfig({ volume: Math.max(0, Math.min(1, volume)) });
    },
    [updateConfig],
  );

  return {
    config,
    play,
    updateConfig,
    toggleEnabled,
    setVolume,
    isEnabled: config.enabled,
  };
}

/**
 * 播放庆祝音效
 * 用于触发打卡/庆祝时的音效
 */
export function playCelebrationSound(
  type: "checkin" | "celebration" | "milestone" = "celebration",
) {
  playSound(type);
}

/**
 * 播放交互音效
 */
export function playInteractionSound(type: "click" | "shine" = "click") {
  playSound(type);
}
