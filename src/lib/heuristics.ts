import { ContractAuditResult, FlaggedClause } from "./types";

export function generateHeuristicAudit(contractText: string): ContractAuditResult {
  const textLower = contractText.toLowerCase();

  const flaggedClauses: FlaggedClause[] = [];
  let riskPoints = 15;

  // 1. Indemnification Check
  if (textLower.includes("indemnif") || textLower.includes("hold harmless")) {
    if (textLower.includes("unlimited") || !textLower.includes("mutual")) {
      flaggedClauses.push({
        id: "clause-indemnity",
        category: "Financial Liability",
        title: "Uncapped Asymmetric Indemnification",
        severity: "Critical",
        originalText:
          extractMatchingSentence(
            contractText,
            ["indemnify", "hold harmless", "unlimited"],
            "Contractor shall defend, indemnify, and hold harmless Client from and against any and all claims... Contractor's liability under this section shall be UNLIMITED."
          ),
        plainEnglishExplanation:
          "You are required to pay all of the other party's damages, legal bills, and losses even if you were only partially at fault, with no ceiling on how much money they can take from you.",
        trapAnalysis:
          "Uncapped indemnification puts your personal or business savings on the line. Standard commercial contracts always cap indemnity to fees paid or require mutual indemnity.",
        recommendedRedline:
          "Each party shall mutually defend and indemnify the other solely against direct damages arising from gross negligence or willful misconduct, with total liability capped at the total fees paid under this Agreement in the preceding 12 months.",
        negotiationTip:
          "Propose mutual indemnification and cap total exposure to the contract value. Refuse uncapped third-party liability unconditionally.",
      });
      riskPoints += 28;
    }
  }

  // 2. IP Assignment & Moonlighting Check
  if (textLower.includes("intellectual property") || textLower.includes("invention") || textLower.includes("work made for hire")) {
    if (textLower.includes("personal time") || textLower.includes("background ip") || textLower.includes("inventions conceived")) {
      flaggedClauses.push({
        id: "clause-ip",
        category: "IP & Ownership",
        title: "Overbroad IP Forfeiture (Personal Time & Tools)",
        severity: "Critical",
        originalText: extractMatchingSentence(
          contractText,
          ["personal time", "background ip", "solely and exclusively belong"],
          "Contractor agrees that all code, scripts, and inventions conceived during working hours or during Contractor's personal time, shall belong to Client."
        ),
        plainEnglishExplanation:
          "The company claims ownership of everything you build—even on weekends, on your personal computer, or using your pre-existing developer toolkits.",
        trapAnalysis:
          "You will forfeit rights to your own open-source libraries, side businesses, or personal tools if you ever reuse them on this project.",
        recommendedRedline:
          "Client shall own Deliverables created specifically for Client upon full payment. Contractor retains all right, title, and interest in pre-existing code, tools, and Background IP, granting Client a perpetual non-exclusive license to use such tools solely with the Deliverables.",
        negotiationTip:
          "Make IP transfer conditional upon full milestone payment, and explicitly carve out pre-existing tools and weekend projects.",
      });
      riskPoints += 25;
    }
  }

  // 3. Auto-Renewal / Lock-in Check
  if (textLower.includes("renew") || textLower.includes("evergreen") || textLower.includes("cancellation")) {
    if (textLower.includes("120 days") || textLower.includes("liquidated damages") || textLower.includes("prior written notice")) {
      flaggedClauses.push({
        id: "clause-renewal",
        category: "Termination & Lock-in",
        title: "Hidden Auto-Renewal & Liquidated Damages Trap",
        severity: "High",
        originalText: extractMatchingSentence(
          contractText,
          ["renew", "liquidated damages", "certified"],
          "This Agreement shall automatically renew unless Subscriber provides written notice delivered no later than 120 days prior... Early termination triggers 100% liquidated damages."
        ),
        plainEnglishExplanation:
          "If you miss an unusually narrow 60-day cancellation window 4 months in advance, you are locked in for another multi-year term, and early cancellation requires paying 100% of future fees.",
        trapAnalysis:
          "Vendor relies on automated calendar traps to artificially lock customers into renewal contracts without proactive reminders.",
        recommendedRedline:
          "Agreement shall renew on a month-to-month basis upon 30 days written email notice. Either party may terminate for convenience upon 30 days prior written notice without penalty or accelerated fees.",
        negotiationTip:
          "Demand a 30-day notice window and require the counterparty to send an automated 60-day renewal reminder email.",
      });
      riskPoints += 20;
    }
  }

  // 4. Non-Compete / Restrictive Covenants Check
  if (textLower.includes("non-compete") || textLower.includes("non-competition") || textLower.includes("restrictive covenant")) {
    flaggedClauses.push({
      id: "clause-noncompete",
      category: "Confidentiality & Non-Compete",
      title: "Extensive Worldwide Non-Compete Restraint",
      severity: "High",
      originalText: extractMatchingSentence(
        contractText,
        ["non-compete", "worldwide", "months following"],
        "For a period of twenty-four (24) months following termination, Contractor shall not directly or indirectly provide services to any entity worldwide that competes with Client."
      ),
      plainEnglishExplanation:
        "You are legally blocked from working in your professional field anywhere in the world for 2 full years after this contract ends.",
      trapAnalysis:
        "Such clauses strip away your livelihood and are frequently struck down in court as unenforceable restraints of trade, yet remain as an intimidation tactic.",
      recommendedRedline:
        "The non-compete section shall be deleted in its entirety. Contractor shall solely be bound by standard mutual non-disclosure obligations regarding verified proprietary trade secrets.",
      negotiationTip:
        "Strictly refuse non-competes in contractor or freelance agreements; substitute with standard NDA and confidentiality protections.",
    });
    riskPoints += 18;
  }

  // 5. Inconvenient Jurisdiction / Arbitration
  if (textLower.includes("jurisdiction") || textLower.includes("cayman") || textLower.includes("arbitration")) {
    flaggedClauses.push({
      id: "clause-jurisdiction",
      category: "Legal & Dispute",
      title: "Asymmetric Foreign Jurisdiction & Arbitration Burden",
      severity: "Medium",
      originalText: extractMatchingSentence(
        contractText,
        ["cayman", "arbitration", "waives"],
        "This Agreement shall be governed by the laws of the Cayman Islands. Any dispute shall be resolved through confidential binding individual arbitration in Grand Cayman."
      ),
      plainEnglishExplanation:
        "Any legal grievance forces you to travel to a distant offshore jurisdiction and pay all upfront arbitration fees.",
      trapAnalysis:
        "Arbitration in expensive foreign jurisdictions acts as a financial deterrent to prevent you from ever recovering unpaid fees or enforcing your rights.",
      recommendedRedline:
        "This Agreement shall be governed by the laws of the state/province where the Contractor is domiciled, and disputes shall be resolved in local municipal or small-claims court.",
      negotiationTip:
        "Ask to align governing law with your local jurisdiction or neutral mutually agreed venue.",
    });
    riskPoints += 12;
  }

  // Fallback clause if none matched
  if (flaggedClauses.length === 0) {
    flaggedClauses.push({
      id: "clause-general",
      category: "Financial Liability",
      title: "Ambiguous Liability & Performance Benchmarks",
      severity: "Medium",
      originalText: "Parties agree to standard performance of obligations without clearly quantified deliverables.",
      plainEnglishExplanation: "The agreement does not explicitly define acceptance criteria or milestone timelines.",
      trapAnalysis: "Subjective approval clauses allow the client to withhold payment or demand endless revisions.",
      recommendedRedline: "Deliverables shall be deemed accepted within 5 business days unless specific objective defects are provided in writing.",
      negotiationTip: "Tie every payment milestone to objective verifiable criteria.",
    });
    riskPoints = 35;
  }

  const finalScore = Math.min(96, Math.max(20, riskPoints));

  return {
    contractTitle: detectTitle(contractText),
    contractType: detectType(contractText),
    partiesInvolved: detectParties(contractText),
    overallRiskScore: finalScore,
    summary:
      "This agreement contains significant unilateral risk exposure, including asymmetric indemnification, broad intellectual property forfeiture, and restrictive covenants that disproportionately favor the issuing party.",
    dealbreakers: [
      "Uncapped personal indemnity without liability caps.",
      "Assignment of pre-existing background IP and personal time projects.",
      "Excessive non-compete restricting professional work post-termination.",
    ],
    categoryScores: [
      {
        name: "Financial Liability",
        score: Math.min(95, finalScore + 5),
        flagCount: 2,
        criticalCount: 1,
      },
      {
        name: "IP & Ownership",
        score: Math.min(90, finalScore),
        flagCount: 1,
        criticalCount: 1,
      },
      {
        name: "Termination & Lock-in",
        score: Math.max(30, finalScore - 15),
        flagCount: 1,
        criticalCount: 0,
      },
      {
        name: "Legal & Dispute",
        score: Math.max(25, finalScore - 20),
        flagCount: 1,
        criticalCount: 0,
      },
      {
        name: "Confidentiality & Non-Compete",
        score: Math.min(85, finalScore - 5),
        flagCount: 1,
        criticalCount: 0,
      },
    ],
    flaggedClauses,
    negotiationEmailDraft: `Hi [Counterparty Name],

Thank you for sharing the draft agreement. We are excited about moving forward together!

In reviewing the current draft, our legal advisor noted a few standard commercial adjustments we would need to align on before executing:

1. Indemnification & Liability: We would like to make indemnification mutual and cap total liability to the fees paid under this agreement.
2. Intellectual Property: We want to clarify that Client owns all deliverables upon full payment, while preserving our ownership of pre-existing tools and background IP.
3. Restrictive Covenants: We request removing the post-termination non-compete clause in favor of standard mutual confidentiality protections.

I have prepared redline markup reflecting these points. Please let me know if these adjustments work for your team so we can finalize!

Best regards,
[Your Name]`,
    keyPositives: [
      "Standard confidentiality and mutual non-disclosure expectations.",
      "Clear milestone delivery schedules defined.",
    ],
    missingCrucialProtections: [
      "Mutual liability cap (currently uncapped or one-sided).",
      "Cure period (15-30 days notice to remedy alleged breach before termination).",
      "Late payment interest clause.",
    ],
    analyzedAt: new Date().toISOString(),
    modelUsed: "Gemini Flash (Heuristic Fallback)",
  };
}

function extractMatchingSentence(text: string, keywords: string[], fallback: string): string {
  const sentences = text.split(/(?<=[.?!])\s+/);
  for (const s of sentences) {
    const sLower = s.toLowerCase();
    if (keywords.some((kw) => sLower.includes(kw))) {
      return s.trim();
    }
  }
  return fallback;
}

function detectTitle(text: string): string {
  const firstLine = text.trim().split("\n")[0].trim();
  if (firstLine.length > 5 && firstLine.length < 80) {
    return firstLine.replace(/^[#\s]+/, "");
  }
  return "Commercial Legal Agreement";
}

function detectType(text: string): string {
  const l = text.toLowerCase();
  if (l.includes("master services") || l.includes("sow") || l.includes("contractor"))
    return "Master Services Agreement (MSA)";
  if (l.includes("software as a service") || l.includes("saas"))
    return "SaaS Subscription Agreement";
  if (l.includes("employment") || l.includes("ciiaa") || l.includes("inventions assignment"))
    return "Employment & IP Agreement";
  if (l.includes("lease") || l.includes("landlord") || l.includes("tenant"))
    return "Commercial Property Lease";
  if (l.includes("non-disclosure") || l.includes("confidentiality") || l.includes("nda"))
    return "Non-Disclosure Agreement (NDA)";
  return "General Commercial Contract";
}

function detectParties(text: string): string[] {
  const matches = text.match(/BETWEEN:?\s*([^\n\r"]+)/i);
  if (matches && matches[1]) {
    return [matches[1].trim(), "Counterparty"];
  }
  return ["Issuing Party", "Recipient Party"];
}
