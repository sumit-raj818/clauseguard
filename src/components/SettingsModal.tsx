"use client";

import React, { useState } from "react";
import { X, Key, Cpu, Check, Info } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  model: string;
  setModel: (m: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  setApiKey,
  model,
  setModel,
}) => {
  const [tempKey, setTempKey] = useState(apiKey);
  const [tempModel, setTempModel] = useState(model);
  const [showKey, setShowKey] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(tempKey);
    setModel(tempModel);
    if (typeof window !== "undefined") {
      localStorage.setItem("clauseguard_api_key", tempKey);
      localStorage.setItem("clauseguard_model", tempModel);
    }
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 700);
  };

  const MODEL_OPTIONS = [
    { id: "gemini-3.8-flash", label: "Gemini 3.8 Flash (High Speed / Next-Gen)" },
    { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash (Production Standard)" },
    { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
    { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Gemini Flash API Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* API Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-500" />
                <span>Google Gemini API Key</span>
              </label>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showKey ? "text" : "password"}
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AQ.Ab8RN6... or AIzaSy..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              When deployed to Vercel, this can also be set via the{" "}
              <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">
                GEMINI_API_KEY
              </code>{" "}
              environment variable. Keys entered here are stored locally in your browser.
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              <span>Target Model</span>
            </label>
            <select
              value={tempModel}
              onChange={(e) => setTempModel(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {MODEL_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              ClauseGuard automatically uses adaptive fallback if an experimental or regional model identifier is unavailable.
            </p>
          </div>

          <div className="bg-indigo-50/70 dark:bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/50 flex items-start space-x-2">
            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-indigo-900 dark:text-indigo-200 leading-relaxed">
              ClauseGuard operates statelessly. Contract texts sent for auditing are never stored, logged, or retained.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-500/20 transition"
          >
            {savedNotice ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save & Apply</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
