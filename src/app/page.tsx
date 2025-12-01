import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();

  // 已登录用户直接跳转到仪表盘
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* 导航栏 */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-gray-800/50 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                Micro Gravity
              </span>
            </div>
            <Link
              href="/signin"
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:from-blue-600 hover:to-purple-700 hover:shadow-blue-500/40"
            >
              开始使用
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            {/* 标签 */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 dark:border-blue-800 dark:bg-blue-900/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                基于福格行为模型 B=MAP
              </span>
            </div>

            {/* 主标题 */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
              用 AI 的力量
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                重塑你的习惯
              </span>
            </h1>

            {/* 副标题 */}
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-400">
              Micro Gravity
              是一款智能习惯管理系统，结合行为科学和人工智能，帮助你建立持久的好习惯，摆脱困扰的坏习惯。
            </p>

            {/* CTA 按钮 */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signin"
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-purple-700 hover:shadow-blue-500/50"
              >
                免费开始
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <button className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                观看演示
              </button>
            </div>
          </div>

          {/* Hero 图片/插图区域 */}
          <div className="relative mt-20">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-50 to-transparent dark:from-gray-950"></div>
            <div className="relative mx-auto max-w-5xl">
              {/* 模拟仪表盘截图 */}
              <div className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-2xl shadow-gray-200/50 dark:border-gray-800/50 dark:bg-gray-900 dark:shadow-black/50">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 dark:bg-gray-800">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 p-8">
                  {/* 模拟卡片 */}
                  <div className="col-span-2 space-y-6">
                    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:from-blue-900/20 dark:to-purple-900/20">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          今日习惯
                        </div>
                        <div className="text-sm font-medium text-green-600 dark:text-green-400">
                          80% 完成
                        </div>
                      </div>
                      <div className="space-y-3">
                        {["早起冥想", "阅读30分钟", "健身锻炼", "写日记"].map(
                          (habit, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 rounded-lg bg-white p-3 dark:bg-gray-800"
                            >
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${i < 3 ? "border-green-500 bg-green-500" : "border-gray-300 dark:border-gray-600"}`}
                              >
                                {i < 3 && (
                                  <svg
                                    className="h-3 w-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                              <span
                                className={`${i < 3 ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-300"}`}
                              >
                                {habit}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                  {/* 右侧统计 */}
                  <div className="space-y-4">
                    <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-5 dark:from-green-900/20 dark:to-emerald-900/20">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        21
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        连续打卡天数
                      </div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-5 dark:from-purple-900/20 dark:to-pink-900/20">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        92%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        本周完成率
                      </div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 p-5 dark:from-orange-900/20 dark:to-yellow-900/20">
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                        8
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        活跃习惯数
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心特性区域 - MAP 模型 */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              基于科学的行为改变方法
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              福格行为模型揭示了行为发生的三个必要条件：动机、能力和提示。Micro
              Gravity 将这三者完美结合。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Motivation */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 opacity-20 blur-xl transition-opacity group-hover:opacity-30"></div>
              <div className="relative h-full rounded-3xl border border-gray-100 bg-white p-8 transition-colors hover:border-red-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-red-800">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500">
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  M - 动机引擎
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  AI
                  驱动的动机诊断系统，实时检测动机波动，在你最需要的时候提供个性化激励。
                </p>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    动机类型识别
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    个性化激励文案
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    低谷预警系统
                  </li>
                </ul>
              </div>
            </div>

            {/* Ability */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-xl transition-opacity group-hover:opacity-30"></div>
              <div className="relative h-full rounded-3xl border border-gray-100 bg-white p-8 transition-colors hover:border-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-800">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  A - 能力拆解
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  智能任务拆解系统，将大目标分解为微习惯，难度动态调整，让改变从小事开始。
                </p>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    六维能力评估
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    渐进式阶段设计
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    微习惯起步
                  </li>
                </ul>
              </div>
            </div>

            {/* Prompt */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-xl transition-opacity group-hover:opacity-30"></div>
              <div className="relative h-full rounded-3xl border border-gray-100 bg-white p-8 transition-colors hover:border-purple-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-800">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <svg
                    className="h-7 w-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  P - 智能提示
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  情境感知的智能触发系统，在最佳时机提供个性化提醒，让习惯自然融入生活。
                </p>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    锚定行为设计
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    AI 个性化文案
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-purple-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    多渠道提醒
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI 教练特性 */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 dark:border-purple-800 dark:bg-purple-900/30">
                <svg
                  className="h-4 w-4 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  AI 驱动
                </span>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                你的专属 AI 习惯教练
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                通过自然对话，AI
                教练帮助你发现真正的动机，设计合适的习惯，并在旅程中持续陪伴和指导。
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "对话式习惯配置",
                    desc: "通过聊天轻松创建和调整习惯",
                  },
                  { title: "智能数据洞察", desc: "从你的数据中发现隐藏的模式" },
                  { title: "情绪化教练对话", desc: "在困难时刻提供心理支持" },
                  { title: "个性化报告生成", desc: "周报月报里程碑一应俱全" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI 对话示例 */}
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-3xl"></div>
              <div className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      AI 习惯教练
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      在线
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/50"></div>
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-gray-100 p-4 dark:bg-gray-700">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        你好！我是你的 AI
                        习惯教练。我注意到你已经连续21天完成了早起冥想，这是一个很棒的里程碑！要不要把这个习惯升级一下？
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-gradient-to-br from-blue-500 to-purple-500 p-4">
                      <p className="text-sm text-white">
                        好的，我准备好挑战更长的冥想时间了！
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/50"></div>
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-gray-100 p-4 dark:bg-gray-700">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        太棒了！根据渐进式原则，我建议从5分钟增加到8分钟，这样既有挑战又不会太难。你觉得怎么样？
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数据分析特性 */}
      <section className="bg-gray-50 px-4 py-24 sm:px-6 lg:px-8 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              数据驱动的习惯洞察
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              丰富的数据可视化和 AI 分析，帮助你发现行为模式、优化策略。
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                title: "时间热力图",
                desc: "可视化你的习惯执行时间分布",
              },
              {
                icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "情绪分析",
                desc: "追踪情绪与习惯完成的关联",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "习惯关联",
                desc: "发现不同习惯之间的相互影响",
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "风险预测",
                desc: "AI 预测中断风险并提前预警",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            准备好开始改变了吗？
          </h2>
          <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">
            加入 Micro Gravity，让 AI 成为你习惯养成路上的最佳伙伴。
          </p>
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-purple-700 hover:shadow-blue-500/50"
          >
            免费开始使用
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-4 py-12 sm:px-6 lg:px-8 dark:border-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Micro Gravity
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              基于福格行为模型的智能习惯管理系统
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
