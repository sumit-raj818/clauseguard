import { NextRequest, NextResponse } from "next/server";
import { auditContractWithGemini } from "@/lib/gemini";

export const maxDuration = 60; // 60 seconds timeout on serverless functions

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contractText, apiKey, model } = body;

    if (!contractText || typeof contractText !== "string" || contractText.trim().length === 0) {
      return NextResponse.json(
        { error: "Contract text is required." },
        { status: 400 }
      );
    }

    if (contractText.trim().length < 50) {
      return NextResponse.json(
        { error: "The provided text is too short to be analyzed as a legal agreement (minimum 50 characters)." },
        { status: 400 }
      );
    }

    const auditResult = await auditContractWithGemini(
      contractText,
      apiKey,
      model
    );

    return NextResponse.json({ success: true, data: auditResult });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("API /api/analyze error:", err);
    return NextResponse.json(
      {
        error: err.message || "Failed to analyze contract.",
        hint: err.message?.includes("API key")
          ? "Please provide a valid Gemini API key in Settings or configure GEMINI_API_KEY."
          : undefined,
      },
      { status: 500 }
    );
  }
}
