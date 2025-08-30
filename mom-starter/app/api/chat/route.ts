import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `
You are MOM, the My Overspending Monitor assistant, helping users manage their finances with insights and advice. You understand Indian rupees and local financial context. Answer briefly, helpfully, avoiding unrelated info or disclaimers.

User messages will be provided as a list of messages.

If you can’t answer, politely say you can’t help with that.

Limit generation to 512 tokens per response.
`

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { message: "OpenAI API key not configured." },
      { status: 500 }
    )
  }
  try {
    const body = await request.json()
    const messages: { role: string; content: string }[] = body.messages || []
    const fullMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ]
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: fullMessages,
      max_tokens: 512,
      stream: false,
    })
    return NextResponse.json({
      message:
        response.choices?.[0]?.message?.content ?? "Sorry, MOM is unavailable right now.",
    })
  } catch (error) {
    console.error("AI Chat API error:", error)
    return NextResponse.json(
      { message: "Sorry, MOM is unavailable right now." },
      { status: 500 }
    )
  }
}
