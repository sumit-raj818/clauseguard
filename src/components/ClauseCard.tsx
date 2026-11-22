"use client";

import React, { useState } from "react";
import { FlaggedClause } from "@/lib/types";
import { getSeverityBadge } from "@/lib/utils";
import {
  AlertCircle,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  FileEdit,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

interface ClauseCardProps {
  clause: FlaggedClause;
  index: number;
}

export const ClauseCard: React.FC<ClauseCardProps> = ({ clause, index }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const severityStyle = getSeverityBadge(clause.severity);

  const handleCopyRedline = () => {
    navigator.clipboard.writeText(clause.recommendedRedline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:border-slate-300 dark:hover:border-slate-700">
      {/* Header Bar */}
      <div
        className="px-5 py-4 flex items-center justify-between cursor-pointer select-none bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {index + 1}
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-white">
                {clause.title}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${severityStyle.badge}`}
              >
                {clause.severity}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {clause.category}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 space-y-4 border-t border-slate-100 dark:border-slate-800">
          {/* Verbatim Excerpt */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Contract Language
            </span>
            <div className="p-3 bg-red-50/60 dark:bg-red-950/20 border-l-4 border-red-500 rounded-r-lg text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed overflow-x-auto">
              &quot;{clause.originalText}&quot;
            </div>
          </div>

          {/* Plain English Translation & Trap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                <span>Plain-English Breakdown</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {clause.plainEnglishExplanation}
              </p>
            </div>

            <div className="bg-amber-50/60 dark:bg-amber-950/20 p-3.5 rounded-lg border border-amber-200/50 dark:border-amber-900/30">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>The Hidden Risk</span>
              </div>
              <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                {clause.trapAnalysis}
              </p>
            </div>
          </div>

          {/* Recommended Counter-Amendment (Redline) */}
          <div className="space-y-1.5 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <FileEdit className="w-3.5 h-3.5 text-emerald-600" />
                <span>Recommended Redline Counter-Amendment</span>
              </div>
              <button
                onClick={handleCopyRedline}
                className="inline-flex items-center space-x-1 text-[11px] px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-700 font-medium transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Redline</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-emerald-200/70 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200 leading-relaxed">
              {clause.recommendedRedline}
            </p>

            {clause.negotiationTip && (
              <div className="flex items-start space-x-1.5 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Negotiation Strategy:</strong> {clause.negotiationTip}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
