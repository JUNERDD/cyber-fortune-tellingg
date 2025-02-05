import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const apiKey =
    req.headers.get("authorization")?.replace("Bearer ", "") ||
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
    prompt,
  });

  return result.toDataStreamResponse();
}
