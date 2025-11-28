"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  ListTodo,
  BarChart3,
  MessageCircle,
  FileText,
  Settings,
  Target,
} from "lucide-react";

const navItems = [
  {
    title: "首页",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "我的习惯",
    href: "/habits",
    icon: ListTodo,
  },
  {
    title: "数据分析",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "AI 教练",
    href: "/coach",
    icon: MessageCircle,
  },
  {
    title: "报告",
    href: "/reports",
    icon: FileText,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Target className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">微习惯</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="border-t p-4">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === "/settings"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            设置
          </Link>
        </div>
      </div>
    </aside>
  );
}
