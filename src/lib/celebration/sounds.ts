/**
 * 庆祝音效系统
 * 提供各种庆祝音效，支持用户设置开关
 */

// 音效类型
export type SoundType =
  | "celebration" // 普通庆祝
  | "milestone" // 里程碑
  | "checkin" // 打卡
  | "shine" // 发光感选择
  | "click"; // 点击

// 音效配置
export interface SoundConfig {
  enabled: boolean;
  volume: number; // 0-1
}

// 默认音效配置
export const DEFAULT_SOUND_CONFIG: SoundConfig = {
  enabled: false, // 默认关闭，用户可在设置中开启
  volume: 0.5,
};

// 音效URL（使用免费音效）
// 注意：这些是占位URL，实际部署时需要替换为真实的音效文件
export const SOUND_URLS: Record<SoundType, string> = {
  celebration: "/sounds/celebration.mp3",
  milestone: "/sounds/milestone.mp3",
  checkin: "/sounds/checkin.mp3",
  shine: "/sounds/shine.mp3",
  click: "/sounds/click.mp3",
};

// 本地存储键
const SOUND_CONFIG_KEY = "micro-gravity-sound-config";

/**
 * 获取音效配置
 */
export function getSoundConfig(): SoundConfig {
  if (typeof window === "undefined") {
    return DEFAULT_SOUND_CONFIG;
  }

  try {
    const stored = localStorage.getItem(SOUND_CONFIG_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<SoundConfig>;
      return { ...DEFAULT_SOUND_CONFIG, ...parsed };
    }
  } catch {
    // ignore
  }

  return DEFAULT_SOUND_CONFIG;
}

/**
 * 保存音效配置
 */
export function saveSoundConfig(config: Partial<SoundConfig>): void {
  if (typeof window === "undefined") return;

  try {
    const current = getSoundConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(SOUND_CONFIG_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/**
 * 播放音效
 */
export function playSound(type: SoundType): void {
  const config = getSoundConfig();
  if (!config.enabled) return;

  try {
    const audio = new Audio(SOUND_URLS[type]);
    audio.volume = config.volume;
    void audio.play().catch(() => {
      // 忽略播放失败（如用户未交互）
    });
  } catch {
    // ignore
  }
}

/**
 * 预加载音效
 */
export function preloadSounds(): void {
  if (typeof window === "undefined") return;

  Object.values(SOUND_URLS).forEach((url) => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = url;
  });
}
