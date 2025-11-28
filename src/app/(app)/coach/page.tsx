"use client";

import { useState } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  { label: "今天状态不好", prompt: "我今天状态不太好，不太想完成习惯，该怎么办？" },
  { label: "想放弃了", prompt: "我感觉坚持太难了，有点想放弃，能给我一些建议吗？" },
  { label: "习惯变简单了", prompt: "我觉得现在的习惯已经很容易了，是不是可以升级一下？" },
  { label: "分析我的进度", prompt: "帮我分析一下我最近的习惯完成情况" },
];

const WELCOME_MESSAGE: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: `你好！我是你的 AI 习惯教练。

我可以帮你：
- 分析习惯完成情况
- 提供个性化建议
- 帮你度过困难时刻
- 调整习惯难度

有什么我可以帮你的吗？`,
    },
  ],
};

export default function CoachPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const allMessages = [WELCOME_MESSAGE, ...messages];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    sendMessage({ text: userMessage });
  };

  const handleQuickPrompt = (prompt: string) => {
    if (isLoading) return;
    sendMessage({ text: prompt });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">AI 教练</h2>
        <p className="text-muted-foreground">
          与你的个人习惯教练对话，获取专属建议
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card className="flex h-[600px] flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">习惯教练</CardTitle>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
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

          <CardContent className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入你的问题或想法..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4" />
                快捷问题
              </CardTitle>
              <CardDescription>
                点击快速开始对话
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {QUICK_PROMPTS.map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleQuickPrompt(item.prompt)}
                  disabled={isLoading}
                >
                  {item.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">教练能力</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">动机激励</Badge>
                <Badge variant="secondary">习惯分析</Badge>
                <Badge variant="secondary">困难支持</Badge>
                <Badge variant="secondary">进度追踪</Badge>
                <Badge variant="secondary">方案调整</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
          const state = part.state;
          // Show loading for streaming/pending states
          if (state === "streaming" || state === "input-streaming") {
            return (
              <div key={index} className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                正在处理...
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
