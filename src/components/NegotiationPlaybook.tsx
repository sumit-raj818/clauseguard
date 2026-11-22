"use client";

import React, { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

interface NegotiationPlaybookProps {
  emailDraft: string;
}

export const NegotiationPlaybook: React.FC<NegotiationPlaybookProps> = ({
  emailDraft,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Counter-Offer Email Draft
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Professional, courteous, and firm pushback email ready to send
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Email</span>
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <pre className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed select-text overflow-x-auto">
          {emailDraft}
        </pre>
      </div>
    </div>
  );
};
