"use client";

import React from "react";
import { Shield, Sparkles, Settings2, RotateCcw } from "lucide-react";

interface NavbarProps {
  onOpenSettings: () => void;
  onReset: () => void;
  hasAuditResult: boolean;
  activeModel: string;
  hasCustomKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSettings,
  onReset,
  hasAuditResult,
  activeModel,
  hasCustomKey,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                ClauseGuard
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Gemini Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Intelligent Contract Risk & Predatory Clause Radar
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {hasAuditResult && (
            <button
              onClick={onReset}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Audit</span>
            </button>
          )}

          {/* Model & Key indicator badge */}
          <div
            onClick={onOpenSettings}
            className="cursor-pointer hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition"
            title="Click to configure API Key or Model"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] truncate max-w-[140px]">
              {activeModel || "gemini-3.8-flash"}
            </span>
            {hasCustomKey && (
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded font-medium">
                Custom Key
              </span>
            )}
          </div>

          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            title="Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
