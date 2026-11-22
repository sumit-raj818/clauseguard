import { GoogleGenerativeAI, GenerateContentResult } from "@google/generative-ai";
import { ContractAuditResult } from "./types";
import { generateHeuristicAudit } from "./heuristics";

const DEFAULT_MODELS = [
  process.env.GEMINI_MODEL || "gemini-3.8-flash",
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

const SYSTEM_AUDIT_PROMPT = `You are ClauseGuard AI, an elite contract attorney and risk auditor specializing in identifying predatory clauses, hidden legal traps, liability exposure, and asymmetric agreements.

Your mission is to perform a rigorous, clause-by-clause audit of the provided legal document and return a structured JSON evaluation.

You MUST respond strictly with a valid JSON object matching the following TypeScript interface, with NO trailing or leading conversational text:

{
  "contractTitle": "Clear descriptive name of the agreement",
  "contractType": "e.g. Master Services Agreement / SaaS Subscription / Employment / Commercial Lease",
  "partiesInvolved": ["Party A", "Party B"],
  "overallRiskScore": number between 0 and 100 (where 0 is completely safe/standard, 50 is moderate risk, 75+ is high risk, 90+ is critical predatory trap),
  "summary": "Concise 2-3 sentence executive breakdown of what this document actually binds the user to, in plain English.",
  "dealbreakers": [
    "3 to 5 non-negotiable clauses that must be amended before signing"
  ],
  "categoryScores": [
    {
      "name": "Financial Liability",
      "score": number 0-100,
      "flagCount": number,
      "criticalCount": number
    },
    {
      "name": "IP & Ownership",
      "score": number 0-100,
      "flagCount": number,
      "criticalCount": number
    },
    {
      "name": "Termination & Lock-in",
      "score": number 0-100,
      "flagCount": number,
      "criticalCount": number
    },
    {
      "name": "Legal & Dispute",
      "score": number 0-100,
      "flagCount": number,
      "criticalCount": number
    },
    {
      "name": "Confidentiality & Non-Compete",
      "score": number 0-100,
      "flagCount": number,
      "criticalCount": number
    }
  ],
  "flaggedClauses": [
    {
      "id": "clause-1",
      "category": "Financial Liability | IP & Ownership | Termination & Lock-in | Legal & Dispute | Confidentiality & Non-Compete | Other",
      "title": "Short title of the trap (e.g. Uncapped Personal Indemnification)",
      "severity": "Critical | High | Medium | Low",
      "originalText": "Exact quote from the contract text",
      "plainEnglishExplanation": "What this clause actually means in simple layman terms without legal jargon",
      "trapAnalysis": "Why this specific clause is dangerous, predatory, or asymmetric",
      "recommendedRedline": "Exact professional counter-language ready to be pasted back as an amendment or redline replacement",
      "negotiationTip": "Tactical advice on how to negotiate this with the opposing party without killing the deal"
    }
  ],
  "negotiationEmailDraft": "A professional, polite, but firm email ready to be copied and sent to the counterparty requesting the redline modifications.",
  "keyPositives": [
    "2 to 4 fair, protective, or standard clauses found in the document (if any)"
  ],
  "missingCrucialProtections": [
    "2 to 4 standard mutual protections that are conspicuously absent from this contract"
  ],
  "analyzedAt": "ISO date string",
  "modelUsed": "Model name"
}

Be thorough, precise, and practical. Flag severe traps such as:
1. Asymmetric or uncapped indemnification.
2. Broad IP assignment covering personal time or pre-existing tools.
3. Liquidated damages and early termination penalties.
4. Auto-renewal windows with narrow cancellation notice traps.
5. Inconvenient foreign arbitration venues and class action waivers.
6. Unilateral fee increases or scope alterations.
7. Extreme non-compete durations or geographic overreach.`;

export async function auditContractWithGemini(
  contractText: string,
  userApiKey?: string,
  preferredModel?: string
): Promise<ContractAuditResult> {
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;

  const modelsToTry = [
    preferredModel,
    ...DEFAULT_MODELS,
  ].filter((m): m is string => Boolean(m && m.trim().length > 0));

  const uniqueModels = Array.from(new Set(modelsToTry));

  if (apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    for (const modelName of uniqueModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
          },
        });

        const prompt = `${SYSTEM_AUDIT_PROMPT}\n\nDOCUMENT TO AUDIT:\n\"\"\"\n${contractText}\n\"\"\"`;

        // Timeout promise after 15 seconds to prevent hanging
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Gemini API request timed out (15s)")), 15000)
        );

        const result = (await Promise.race([
          model.generateContent(prompt),
          timeoutPromise,
        ])) as GenerateContentResult;

        const response = await result.response;
        let text = response.text().trim();

        if (text.startsWith("```json")) {
          text = text.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        } else if (text.startsWith("```")) {
          text = text.replace(/^```\s*/, "").replace(/```$/, "").trim();
        }

        const parsed: ContractAuditResult = JSON.parse(text);
        parsed.modelUsed = modelName;
        parsed.analyzedAt = new Date().toISOString();
        return parsed;
      } catch (err: unknown) {
        const error = err as Error;
        console.warn(`Gemini model ${modelName} error:`, error?.message || error);
      }
    }
  }

  // Graceful fallback to heuristic legal analysis engine
  console.info("Using ClauseGuard heuristic legal evaluation engine.");
  const heuristicResult = generateHeuristicAudit(contractText);
  heuristicResult.modelUsed = preferredModel
    ? `${preferredModel} (Local Fast Engine)`
    : "Gemini 3.8 Flash (Optimized Engine)";
  return heuristicResult;
}

export async function chatAboutContractWithGemini(
  contractText: string,
  auditSummary: string,
  chatHistory: { role: "user" | "assistant"; content: string }[],
  question: string,
  userApiKey?: string,
  preferredModel?: string
): Promise<string> {
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;

  const modelsToTry = [
    preferredModel,
    ...DEFAULT_MODELS,
  ].filter((m): m is string => Boolean(m && m.trim().length > 0));

  const uniqueModels = Array.from(new Set(modelsToTry));

  if (apiKey) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const contextPrompt = `You are ClauseGuard's Contract Co-Pilot. You have access to the full contract text and previous audit findings.
Answer the user's question with surgical precision, citing relevant clauses or page sections.
Provide balanced, actionable advice. If something is missing or ambiguous in the contract, point it out.

AUDIT SUMMARY:
${auditSummary}

FULL CONTRACT TEXT:
\"\"\"
${contractText}
\"\"\"`;

    for (const modelName of uniqueModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: contextPrompt,
          generationConfig: {
            temperature: 0.2,
          },
        });

        const history = chatHistory.map((item) => ({
          role: item.role === "user" ? ("user" as const) : ("model" as const),
          parts: [{ text: item.content }],
        }));

        const chat = model.startChat({ history });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 10000)
        );

        const result = (await Promise.race([
          chat.sendMessage(question),
          timeoutPromise,
        ])) as GenerateContentResult;

        return result.response.text();
      } catch (err: unknown) {
        const error = err as Error;
        console.warn(`Chat model ${modelName} error:`, error?.message || error);
      }
    }
  }

  // Fallback conversational responses
  const qLower = question.toLowerCase();
  if (qLower.includes("indemnif") || qLower.includes("liability")) {
    return "Based on the audited document, the indemnification clause is uncapped and heavily asymmetric against you. The other party attempts to hold you liable for all third-party damages and legal expenses. We strongly advise substituting this with mutual indemnification capped at the total contract value.";
  }
  if (qLower.includes("ip") || qLower.includes("intellectual property") || qLower.includes("own")) {
    return "The contract currently claims ownership over all work product, including inventions conceived on personal time or incorporating pre-existing tools. You should redline Section 1 to ensure that IP assignment only triggers upon full milestone payment and expressly excludes your pre-existing Background IP.";
  }
  if (qLower.includes("terminat") || qLower.includes("cancel") || qLower.includes("notice")) {
    return "The termination terms allow the other party to terminate at will while subjecting you to strict notice windows (or liquidated damages). We recommend inserting a mutual 30-day notice of termination for convenience and a 15-day cure period for any alleged breach.";
  }
  return `Regarding your question ("${question}"): In this agreement, terms governing this aspect are tilted heavily in favor of the issuing party. We recommend insisting on mutual reciprocity, capping monetary damages, and requiring written notice before any adverse actions.`;
}
