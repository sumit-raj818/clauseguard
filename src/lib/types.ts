export type Severity = "Critical" | "High" | "Medium" | "Low";

export interface FlaggedClause {
  id: string;
  category: "Financial Liability" | "IP & Ownership" | "Termination & Lock-in" | "Legal & Dispute" | "Confidentiality & Non-Compete" | "Other";
  title: string;
  severity: Severity;
  originalText: string;
  plainEnglishExplanation: string;
  trapAnalysis: string;
  recommendedRedline: string;
  negotiationTip: string;
}

export interface CategoryScore {
  name: string;
  score: number; // 0 - 100 (higher = riskier)
  flagCount: number;
  criticalCount: number;
}

export interface ContractAuditResult {
  contractTitle: string;
  contractType: string;
  partiesInvolved: string[];
  overallRiskScore: number; // 0 - 100
  summary: string;
  dealbreakers: string[];
  categoryScores: CategoryScore[];
  flaggedClauses: FlaggedClause[];
  negotiationEmailDraft: string;
  keyPositives: string[];
  missingCrucialProtections: string[];
  analyzedAt: string;
  modelUsed: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface SampleContract {
  id: string;
  title: string;
  category: string;
  description: string;
  text: string;
}
