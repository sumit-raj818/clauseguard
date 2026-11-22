"use client";

import React from "react";
import { getRiskColor } from "@/lib/utils";
import { CategoryScore } from "@/lib/types";

interface RiskScoreGaugeProps {
  score: number;
  categoryScores: CategoryScore[];
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({
  score,
  categoryScores,
}) => {
  const riskInfo = getRiskColor(score);
  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6 flex items-center justify-between">
        <span>Contract Risk Score</span>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${riskInfo.bg} ${riskInfo.text} border ${riskInfo.border}`}
        >
          {riskInfo.label}
        </span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Circular Gauge */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Dynamic Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className={`${riskInfo.text} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-5xl font-black tracking-tight ${riskInfo.text}`}>
                {score}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                Out of 100
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs text-center text-slate-500 dark:text-slate-400 max-w-[200px]">
            {score >= 70
              ? "High legal risk detected. Critical amendments strongly advised."
              : score >= 40
              ? "Moderate exposure. Key revisions recommended before signing."
              : "Standard terms with low perceived legal liability."}
          </p>
        </div>

        {/* Sub-Category Risk Breakdown */}
        <div className="md:col-span-7 space-y-4">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Category Risk Exposure
          </div>
          {categoryScores.map((cat, idx) => {
            const catRisk = getRiskColor(cat.score);
            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {cat.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    {cat.criticalCount > 0 && (
                      <span className="text-[10px] text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 rounded">
                        {cat.criticalCount} critical
                      </span>
                    )}
                    <span className={`font-semibold ${catRisk.text}`}>
                      {cat.score}%
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      cat.score >= 75
                        ? "bg-red-500"
                        : cat.score >= 50
                        ? "bg-amber-500"
                        : cat.score >= 25
                        ? "bg-yellow-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.max(5, cat.score)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
