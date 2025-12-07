"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play } from "lucide-react";
import { useCelebrationSound } from "@/hooks/use-celebration-sound";
import { type SoundType } from "@/lib/celebration/sounds";

const SOUND_PREVIEWS: { type: SoundType; label: string; emoji: string }[] = [
  { type: "checkin", label: "打卡", emoji: "✓" },
  { type: "celebration", label: "庆祝", emoji: "🎉" },
  { type: "milestone", label: "里程碑", emoji: "🏆" },
  { type: "shine", label: "发光感", emoji: "✨" },
];

export function SoundSettings() {
  const { config, toggleEnabled, setVolume, play } = useCelebrationSound();

  const handlePreview = (type: SoundType) => {
    // 临时启用音效来预览
    if (!config.enabled) {
      // 直接播放，不改变设置
      const audio = new Audio(`/sounds/${type}.mp3`);
      audio.volume = config.volume;
      void audio.play().catch(() => undefined);
    } else {
      play(type);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {config.enabled ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5 text-muted-foreground" />
          )}
          <CardTitle className="text-base">音效设置</CardTitle>
        </div>
        <CardDescription>配置庆祝时刻的音效反馈</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 音效开关 */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>启用音效</Label>
            <p className="text-muted-foreground text-sm">
              打卡和庆祝时播放音效
            </p>
          </div>
          <Switch checked={config.enabled} onCheckedChange={toggleEnabled} />
        </div>

        {/* 音量调节 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>音量</Label>
            <span className="text-muted-foreground text-sm">
              {Math.round(config.volume * 100)}%
            </span>
          </div>
          <Slider
            value={[config.volume * 100]}
            onValueChange={([value]) => setVolume((value ?? 50) / 100)}
            max={100}
            step={5}
            disabled={!config.enabled}
            className="w-full"
          />
        </div>

        {/* 音效预览 */}
        <div className="space-y-3">
          <Label>预览音效</Label>
          <div className="grid grid-cols-2 gap-2">
            {SOUND_PREVIEWS.map(({ type, label, emoji }) => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => handlePreview(type)}
                className="justify-start"
              >
                <Play className="mr-2 h-3 w-3" />
                <span className="mr-1">{emoji}</span>
                {label}
              </Button>
            ))}
          </div>
          <p className="text-muted-foreground text-xs">
            点击按钮试听各类音效
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
