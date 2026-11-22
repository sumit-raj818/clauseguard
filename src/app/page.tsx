"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ContractInput } from "@/components/ContractInput";
import { RiskScoreGauge } from "@/components/RiskScoreGauge";
import { AuditSummary } from "@/components/AuditSummary";
import { ClauseCard } from "@/components/ClauseCard";
import { NegotiationPlaybook } from "@/components/NegotiationPlaybook";
import { ContractChat } from "@/components/ContractChat";
import { SettingsModal } from "@/components/SettingsModal";
import { ExportModal } from "@/components/ExportModal";
import { ContractAuditResult, Severity } from "@/lib/types";
import {
  ShieldAlert,
  FileCheck2,
  Mail,
  MessageSquare,
  Download,
  Filter,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [contractText, setContractText] = useState("");
  const [auditResult, setAuditResult] = useState<ContractAuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "clauses" | "negotiate" | "chat">("overview");
  const [severityFilter, setSeverityFilter] = useState<"ALL" | Severity>("ALL");

  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gemini-3.8-flash");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load saved settings
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("clauseguard_api_key");
      const savedModel = localStorage.getItem("clauseguard_model");
      if (savedKey) setApiKey(savedKey);
      if (savedModel) setModel(savedModel);
    }
  }, []);

  const handleAudit = async () => {
    if (!contractText.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractText,
          apiKey,
          model,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to audit contract");
      }

      setAuditResult(json.data);
      setActiveTab("overview");
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "An unexpected error occurred during auditing.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAuditResult(null);
    setErrorMessage(null);
    setActiveTab("overview");
  };

  const filteredClauses = auditResult
    ? auditResult.flaggedClauses.filter((c) =>
        severityFilter === "ALL" ? true : c.severity === severityFilter
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        onReset={handleReset}
        hasAuditResult={Boolean(auditResult)}
        activeModel={model}
        hasCustomKey={Boolean(apiKey)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 p-4 rounded-2xl flex items-start space-x-3 text-xs text-red-800 dark:text-red-300">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Audit Notice</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {!auditResult ? (
          /* Landing & Input Mode */
          <div className="space-y-8 animate-fade-in">
            {/* Hero Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-3 pt-4 pb-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Next-Gen Legal Risk Intelligence</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                Never sign a bad contract again.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                ClauseGuard uses <strong>Gemini Flash</strong> to scan agreements for hidden traps, uncapped liabilities, and predatory lock-ins—then generates ready-to-paste redline counter-proposals.
              </p>
            </div>

            {/* Input Component */}
            <ContractInput
              contractText={contractText}
              setContractText={setContractText}
              onAudit={handleAudit}
              isLoading={isLoading}
            />

            {/* Problem & Value Prop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                  !
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Detects Hidden Traps
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Catches uncapped personal indemnities, perpetual auto-renewals, moonlighting bans, and overseas arbitration traps.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Plain-English Redlines
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Translates confusing legalese into simple terms and generates attorney-grade counter-amendment language ready to send back.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Negotiation Playbook
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Automatically drafts polite, professional email responses with tactical counter-offers so you negotiate from strength.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Audit Results Dashboard */
          <div className="space-y-6 animate-fade-in">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
                    activeTab === "overview"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Risk Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("clauses")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
                    activeTab === "clauses"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Redline Flags ({auditResult.flaggedClauses.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("negotiate")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
                    activeTab === "negotiate"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Negotiation Email</span>
                </button>

                <button
                  onClick={() => setActiveTab("chat")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
                    activeTab === "chat"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Co-Pilot Chat</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <RiskScoreGauge
                  score={auditResult.overallRiskScore}
                  categoryScores={auditResult.categoryScores}
                />
                <AuditSummary audit={auditResult} />
              </div>
            )}

            {activeTab === "clauses" && (
              <div className="space-y-4">
                {/* Severity Filter Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <Filter className="w-3.5 h-3.5" />
                    <span className="font-medium">Filter by Severity:</span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs">
                    {(["ALL", "Critical", "High", "Medium", "Low"] as const).map((sev) => (
                      <button
                        key={sev}
                        onClick={() => setSeverityFilter(sev)}
                        className={`px-2.5 py-1 rounded-lg font-medium transition ${
                          severityFilter === sev
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredClauses.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    No clauses match this severity level.
                  </div>
                ) : (
                  filteredClauses.map((clause, idx) => (
                    <ClauseCard key={clause.id || idx} clause={clause} index={idx} />
                  ))
                )}
              </div>
            )}

            {activeTab === "negotiate" && (
              <NegotiationPlaybook emailDraft={auditResult.negotiationEmailDraft} />
            )}

            {activeTab === "chat" && (
              <ContractChat
                contractText={contractText}
                auditSummary={auditResult.summary}
                apiKey={apiKey}
                model={model}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} ClauseGuard AI • Powered by Gemini Flash</p>
          <p className="text-[11px] text-slate-400">
            For informational risk assessment. Not formal legal representation.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        model={model}
        setModel={setModel}
      />

      {auditResult && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          audit={auditResult}
        />
      )}
    </div>
  );
}
