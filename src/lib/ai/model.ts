/**
 * 统一的 AI 模型配置
 * 所有模型调用都从这里导入
 */

import { ChatDeepSeek } from "@langchain/deepseek";
import { createDeepSeek } from "@ai-sdk/deepseek";

import { env } from "@/env";
import * as z from "zod";

/**
 * 创建 OpenAI 提供商实例
 * 支持自定义 baseURL 以兼容 OpenAI 兼容的 API
 */
const deepSeekProvider = createDeepSeek({
  apiKey: env.AI_MODEL_API_KEY,
  baseURL: env.AI_MODEL_BASE_URL,
});

const llmWithCustomURL = new ChatDeepSeek({
  model: "deepseek-chat",
  apiKey: "sk-39789d9ca2254a9d894d20dc787d7086",
  temperature: 0,
});

/**
 * 主模型 - 用于复杂对话和工具调用
 * 默认: gpt-4o
 * 使用 .chat() 方法以兼容火山引擎等 OpenAI 兼容的提供商
 * （它们不支持新的 Responses API，只支持传统的 Chat Completions API）
 */
export const model = deepSeekProvider(env.AI_MODEL_NAME);

/**
 * 轻量模型 - 用于简单生成任务
 * 默认: gpt-4o-mini
 */
export const modelMini = deepSeekProvider(env.AI_MODEL_MINI_NAME);

/**
 * 获取动态模型（当需要在运行时决定使用哪个模型时）
 */
export function getModel(useMini = false) {
  return useMini ? modelMini : model;
}
