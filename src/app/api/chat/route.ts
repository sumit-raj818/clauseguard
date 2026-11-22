import { NextRequest, NextResponse } from "next/server";
import { chatAboutContractWithGemini } from "@/lib/gemini";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contractText, auditSummary, chatHistory, question, apiKey, model } = body;

    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return NextResponse.json(
        { error: "A question is required." },
        { status: 400 }
      );
    }

    if (!contractText) {
      return NextResponse.json(
        { error: "Contract context is missing." },
        { status: 400 }
      );
    }

    const answer = await chatAboutContractWithGemini(
      contractText,
      auditSummary || "",
      chatHistory || [],
      question,
      apiKey,
      model
    );

    return NextResponse.json({ success: true, answer });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("API /api/chat error:", err);
    return NextResponse.json(
      {
        error: err.message || "Failed to process chat query.",
        hint: err.message?.includes("API key")
          ? "Please provide a valid Gemini API key in Settings or configure GEMINI_API_KEY."
          : undefined,
      },
      { status: 500 }
    );
  }
}
