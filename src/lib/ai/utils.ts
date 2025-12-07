/**
 * AI SDK 工具函数
 */

import { generateText, zodSchema } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai/model";

/**
 * 运行结构化工具
 * 封装 AI SDK 的 generateText + tool 模式，强制 AI 返回符合 schema 的结构化数据
 *
 * @param options.toolName - 工具名称
 * @param options.description - 工具描述
 * @param options.schema - Zod schema 定义输出结构
 * @param options.prompt - 用户提示词
 * @returns 符合 schema 的结构化数据
 */
export async function runStructuredTool<SCHEMA extends z.ZodType>({
  description,
  prompt,
  schema,
  toolName,
}: {
  description: string;
  prompt: string;
  schema: SCHEMA;
  toolName: string;
}): Promise<z.output<SCHEMA>> {
  const result = await generateText({
    model,
    prompt,
    system: `Only use tool ${toolName} once per turn.`,
    tools: {
      [toolName]: {
        description,
        inputSchema: zodSchema(schema),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        execute: async (input: unknown) => schema.parse(input) as z.output<SCHEMA>,
      },
    },
    toolChoice: { type: "tool", toolName },
  });

  const toolResult = result.toolResults.find(
    (output) => output.toolName === toolName,
  );

  if (!toolResult) {
    throw new Error(`Tool ${toolName} did not return structured data.`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return schema.parse(toolResult.output) as z.output<SCHEMA>;
}
