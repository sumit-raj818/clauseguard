"use client";

import React from "react";
import { ContractAuditResult } from "@/lib/types";
import {
  AlertOctagon,
  CheckCircle,
  ShieldCheck,
  ShieldX,
  Users,
} from "lucide-react";

interface AuditSummaryProps {
  audit: ContractAuditResult;
}

export const AuditSummary: React.FC<AuditSummaryProps> = ({ audit }) => {
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {audit.contractType}
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {audit.contractTitle}
            </h2>
          </div>

          {audit.partiesInvolved?.length > 0 && (
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{audit.partiesInvolved.join(" ↔ ")}</span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {audit.summary}
          </p>
        </div>
      </div>

      {/* Top Dealbreakers */}
      {audit.dealbreakers?.length > 0 && (
        <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl p-6">
          <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 font-semibold text-sm mb-3">
            <AlertOctagon className="w-4 h-4 text-red-500" />
            <span>Top Non-Negotiable Dealbreakers</span>
          </div>
          <p className="text-xs text-red-800/80 dark:text-red-300/80 mb-4">
            Do not execute this agreement in its current state without pushing back on these items:
          </p>
          <ul className="space-y-2.5">
            {audit.dealbreakers.map((db, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-2.5 text-xs text-slate-800 dark:text-slate-200"
              >
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 flex items-center justify-center font-bold text-[10px] mt-0.5">
                  !
                </span>
                <span className="leading-snug">{db}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Protections vs Fair Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Protections */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
            <ShieldX className="w-4 h-4 text-amber-500" />
            <span>Missing Crucial Protections</span>
          </div>
          <ul className="space-y-2">
            {audit.missingCrucialProtections?.length > 0 ? (
              audit.missingCrucialProtections.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <p className="text-xs text-slate-400">Standard protections are present.</p>
            )}
          </ul>
        </div>

        {/* Fair Terms */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Fair / Standard Protections Identified</span>
          </div>
          <ul className="space-y-2">
            {audit.keyPositives?.length > 0 ? (
              audit.keyPositives.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <p className="text-xs text-slate-400">Few balanced clauses detected.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
