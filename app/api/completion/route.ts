import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const apiKey =
    req.headers.get("authorization")?.replace("Bearer", "").trim() ||
    process.env.OPENROUTER_API_KEY ||
    "";

  if (!apiKey) {
    return new Response("Unauthorized", { status: 401 });
  }

  const openrouter = createOpenRouter({
    apiKey,
  });

  const result = streamText({
    model: openrouter("deepseek/deepseek-chat"),
    system:
      "你是一个算命大师。返回给我的消息需要用 markdown 进行格式化。不要在中途停止回复，直到完成整个任务。",
    prompt,
    maxSteps: 20,
  });

  return result.toDataStreamResponse();
}
