"use client";

import { useMemo, useState } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Bot, User, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const WELCOME_MESSAGE: UIMessage = {
  id: "1",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: `你好！我是你的习惯教练。我会帮助你设计一个科学有效的习惯计划。

首先，告诉我：**你想要养成什么习惯，或者戒除什么坏习惯？**

例如：
- 我想养成每天阅读的习惯
- 我想戒掉熬夜刷手机的习惯
- 我想养成早起运动的习惯`,
    },
  ],
};

export default function NewHabitPage() {
  const [input, setInput] = useState("");
  const [habitCreated, setHabitCreated] = useState(false);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const allMessages = useMemo(() => [WELCOME_MESSAGE, ...messages], [messages]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    console.log('text', userMessage)
    sendMessage({ text: userMessage });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/habits">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">创建新习惯</h2>
          <p className="text-muted-foreground">
            与 AI 教练对话，设计适合你的习惯方案
          </p>
        </div>
      </div>

      <Card className="flex h-[600px] flex-col overflow-hidden">
        <CardHeader className="shrink-0 border-b">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">AI 习惯教练</CardTitle>
          </div>
          <CardDescription>
            基于福格行为模型，帮你设计科学的习惯养成方案
          </CardDescription>
        </CardHeader>

        <div className="min-h-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full overflow-hidden">
            <div className="space-y-4 p-4 pb-6">
              {allMessages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">AI 正在思考...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {habitCreated ? (
          <div className="shrink-0 border-t p-4">
            <div className="flex items-center justify-center gap-2 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-950 dark:text-green-300">
              <CheckCircle2 className="h-5 w-5" />
              <span>习惯创建成功！</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/habits">返回列表</Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href="/dashboard">前往仪表盘</Link>
              </Button>
            </div>
          </div>
        ) : (
          <CardContent className="shrink-0 border-t p-4">
            <form onSubmit={onSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入你的回复..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

interface ChatMessageProps {
  message: UIMessage;
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  const renderContent = () => {
    if (message.parts && message.parts.length > 0) {
      return message.parts.map((part, index) => {
        if (part.type === "text") {
          return (
            <div key={index} className="whitespace-pre-wrap">
              {part.text}
            </div>
          );
        }
        // Handle tool invocation parts (type starts with "tool-")
        if (part.type.startsWith("tool-") && "state" in part) {
          const toolType = part.type.replace("tool-", "");
          const state = part.state;

          // Show success for completed states
          if (toolType === "createHabit" && (state === "done" || state === "output-available")) {
            return (
              <div key={index} className="mt-2 rounded-lg border bg-green-50 p-3 dark:bg-green-950">
                <Badge variant="outline" className="mb-2 bg-green-100 text-green-700">
                  习惯已创建
                </Badge>
                <p className="text-sm text-green-700 dark:text-green-300">
                  你的习惯方案已经准备好了！
                </p>
              </div>
            );
          }
          // Show loading for streaming/pending states
          if (state === "streaming" || state === "input-streaming") {
            return (
              <div key={index} className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                正在{toolType === "createHabit" ? "创建习惯" : "处理"}...
              </div>
            );
          }
        }
        return null;
      });
    }
    return null;
  };

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        {renderContent()}
      </div>
    </div>
  );
}
