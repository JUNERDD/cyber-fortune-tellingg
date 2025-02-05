import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY || "",
  });

  const result = await streamText({
    model: openrouter("openai/gpt-3.5-turbo"),
    messages,
  });

  return result.toDataStreamResponse();
}
