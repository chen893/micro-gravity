"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  Bell,
  Shield,
  Palette,
  LogOut,
  Trash2,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklyReport: true,
    milestone: true,
    motivationBoost: false,
  });

  const [reminderTime, setReminderTime] = useState("09:00");
  const [reminderStyle, setReminderStyle] = useState("GENTLE");

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">设置</h2>
        <p className="text-muted-foreground">管理你的账户和应用偏好</p>
      </div>

      {/* 个人资料 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle className="text-base">个人资料</CardTitle>
          </div>
          <CardDescription>管理你的个人信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={session?.user?.image ?? ""} />
              <AvatarFallback>
                {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{session?.user?.name ?? "用户"}</h3>
              <p className="text-sm text-muted-foreground">
                {session?.user?.email ?? ""}
              </p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">显示名称</Label>
              <Input
                id="name"
                defaultValue={session?.user?.name ?? ""}
                placeholder="你的名字"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                defaultValue={session?.user?.email ?? ""}
                disabled
              />
              <p className="text-xs text-muted-foreground">
                邮箱由第三方登录提供，无法修改
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 通知设置 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle className="text-base">通知设置</CardTitle>
          </div>
          <CardDescription>配置你希望收到的通知</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>每日提醒</Label>
                <p className="text-sm text-muted-foreground">
                  每天提醒你完成习惯打卡
                </p>
              </div>
              <Switch
                checked={notifications.dailyReminder}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, dailyReminder: checked }))
                }
              />
            </div>

            {notifications.dailyReminder && (
              <div className="ml-4 grid gap-4 border-l-2 pl-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reminderTime">提醒时间</Label>
                  <Input
                    id="reminderTime"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>提醒风格</Label>
                  <Select value={reminderStyle} onValueChange={setReminderStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GENTLE">温和</SelectItem>
                      <SelectItem value="FIRM">坚定</SelectItem>
                      <SelectItem value="PLAYFUL">有趣</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>周报通知</Label>
                <p className="text-sm text-muted-foreground">
                  每周生成习惯报告时通知你
                </p>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, weeklyReport: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>里程碑通知</Label>
                <p className="text-sm text-muted-foreground">
                  达成里程碑成就时通知你
                </p>
              </div>
              <Switch
                checked={notifications.milestone}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, milestone: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>动机激励</Label>
                <p className="text-sm text-muted-foreground">
                  当检测到动机下降时发送激励消息
                </p>
              </div>
              <Switch
                checked={notifications.motivationBoost}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, motivationBoost: checked }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 外观设置 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <CardTitle className="text-base">外观设置</CardTitle>
          </div>
          <CardDescription>自定义应用的外观主题</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>主题</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setTheme("light")}
              >
                <Sun className="mr-2 h-4 w-4" />
                浅色
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setTheme("dark")}
              >
                <Moon className="mr-2 h-4 w-4" />
                深色
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setTheme("system")}
              >
                <Monitor className="mr-2 h-4 w-4" />
                系统
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 账户安全 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle className="text-base">账户安全</CardTitle>
          </div>
          <CardDescription>管理你的账户安全设置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <p className="font-medium">登录方式</p>
              <p className="text-sm text-muted-foreground">
                通过 Google 账号登录
              </p>
            </div>
            <Button variant="outline" size="sm" disabled>
              已连接
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">退出登录</p>
                <p className="text-sm text-muted-foreground">
                  退出当前账户
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                退出
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-destructive">删除账户</p>
                <p className="text-sm text-muted-foreground">
                  永久删除你的账户和所有数据
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    删除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>确定要删除账户吗？</AlertDialogTitle>
                    <AlertDialogDescription>
                      此操作不可撤销。删除后，你的所有习惯数据、打卡记录、对话历史和报告都将被永久删除。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      确认删除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
