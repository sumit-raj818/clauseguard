"use client";

import React, { useState } from "react";
import { SAMPLE_CONTRACTS } from "@/lib/samples";
import {
  FileText,
  UploadCloud,
  Sparkles,
  Trash2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

interface ContractInputProps {
  contractText: string;
  setContractText: (text: string) => void;
  onAudit: () => void;
  isLoading: boolean;
}

export const ContractInput: React.FC<ContractInputProps> = ({
  contractText,
  setContractText,
  onAudit,
  isLoading,
}) => {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  const handleSelectSample = (id: string) => {
    const sample = SAMPLE_CONTRACTS.find((s) => s.id === id);
    if (sample) {
      setContractText(sample.text);
      setSelectedSample(id);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setContractText(text);
        setSelectedSample(null);
      }
    };
    reader.readAsText(file);
  };

  const wordCount = contractText.trim()
    ? contractText.trim().split(/\s+/).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Sample Selector Banner */}
      <div className="bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-slate-50 dark:from-indigo-950/30 dark:via-slate-900/40 dark:to-slate-900 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-950/60 shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-400 font-semibold text-xs mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Quick Test: Load Pre-Configured Contracts with Real Traps</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_CONTRACTS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample.id)}
              className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                selectedSample === sample.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700"
              }`}
            >
              <div>
                <span
                  className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                    selectedSample === sample.id
                      ? "bg-indigo-700 text-indigo-100"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {sample.category}
                </span>
                <p className="font-semibold mt-1 line-clamp-1">{sample.title}</p>
                <p
                  className={`text-[11px] mt-1 line-clamp-2 ${
                    selectedSample === sample.id
                      ? "text-indigo-100"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {sample.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contract Textarea Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Paste Agreement or Contract Text
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload .txt / .md</span>
              <input
                type="file"
                accept=".txt,.md,.rtf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {contractText && (
              <button
                onClick={() => {
                  setContractText("");
                  setSelectedSample(null);
                }}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                title="Clear text"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={contractText}
            onChange={(e) => {
              setContractText(e.target.value);
              setSelectedSample(null);
            }}
            placeholder="Paste your legal agreement, freelance contract, employment offer, SaaS terms of service, or lease agreement here..."
            rows={12}
            className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Footer controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-400 space-x-3">
            <span>{wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span>{contractText.length.toLocaleString()} characters</span>
          </div>

          <button
            onClick={onAudit}
            disabled={!contractText.trim() || isLoading}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition transform active:scale-95"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Auditing with Gemini Flash...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Audit Contract Risk</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
