"use client";

import { api } from "@/trpc/react";

export function LatestPost() {
  const [hello] = api.post.hello.useSuspenseQuery({ text: "习惯养成" });

  return (
    <div className="w-full max-w-xs">
      <p className="text-white">{hello.greeting}</p>
      <p className="mt-2 text-sm text-gray-400">
        准备好开始你的习惯养成之旅了吗？
      </p>
    </div>
  );
}
