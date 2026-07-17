import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatRole = "user" | "assistant";

type ClientMessage = {
  role: ChatRole;
  content: string;
};

const DEFAULT_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const DEFAULT_MODEL = "qwen-plus";

function cleanMessage(message: ClientMessage): ClientMessage | null {
  if (message.role !== "user" && message.role !== "assistant") return null;
  const content = String(message.content ?? "").trim().slice(0, 2400);
  if (!content) return null;
  return { role: message.role, content };
}

export async function POST(request: Request) {
  try {
    if (process.env.LLM_ENABLED === "false") {
      return NextResponse.json(
        {
          error:
            "The computation assistant is paused for demo budget control.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const messages = Array.isArray(body.messages)
      ? body.messages.map(cleanMessage).filter(Boolean).slice(-10)
      : [];
    const language = body.language === "zh" ? "Chinese" : "English";
    const tool = String(body.tool ?? "Computation").slice(0, 80);

    if (!messages.length) {
      return NextResponse.json(
        { error: "Please send at least one message." },
        { status: 400 }
      );
    }

    const apiKey = process.env.DASHSCOPE_API_KEY ?? process.env.QWEN_API_KEY;
    const baseUrl =
      process.env.QWEN_BASE_URL ??
      process.env.DASHSCOPE_BASE_URL ??
      DEFAULT_BASE_URL;
    const model = process.env.QWEN_MODEL ?? DEFAULT_MODEL;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Qwen is not configured. Set DASHSCOPE_API_KEY in Vercel environment variables.",
        },
        { status: 500 }
      );
    }

    const endpoint = `${baseUrl.replace(/\/$/, "")}/chat/completions`;
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.35,
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content:
              `You are VEA's private computation assistant. Reply in ${language}. ` +
              `The selected computation mode is "${tool}". ` +
              "Be concise, analytical, and executive-grade. Focus on technology asset monetization, market timing, company positioning, risks, and next actions. Avoid hype.",
          },
          ...messages,
        ],
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return NextResponse.json(
        {
          error: "Qwen request failed.",
          detail: detail.slice(0, 500),
        },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "Qwen returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      reply,
      model: data?.model ?? model,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to process the computation chat request.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
