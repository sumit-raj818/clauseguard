"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ContractChatProps {
  contractText: string;
  auditSummary: string;
  apiKey?: string;
  model?: string;
}

const SUGGESTED_QUESTIONS = [
  "Can they terminate this contract early without paying me?",
  "Who owns the intellectual property and side projects I build?",
  "Are there automatic renewal or perpetual lock-in traps?",
  "What is the total maximum financial liability I am exposed to?",
];

export const ContractChat: React.FC<ContractChatProps> = ({
  contractText,
  auditSummary,
  apiKey,
  model,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am your ClauseGuard Contract Assistant. Ask me anything about this agreement—such as payment obligations, termination terms, indemnity, or dispute resolution.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionText?: string) => {
    const q = questionText || input;
    if (!q.trim() || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: q }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractText,
          auditSummary,
          chatHistory: messages,
          question: q,
          apiKey,
          model,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to get answer");
      }

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err: unknown) {
      const error = err as Error;
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `⚠️ Error: ${error.message || "Something went wrong."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[560px]">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Ask ClauseGuard Co-Pilot
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Contract-specific inquiries & clause interpretations
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2.5 ${
              msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                msg.role === "user"
                  ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-3.5 h-3.5" />
              ) : (
                <Bot className="w-3.5 h-3.5" />
              )}
            </div>
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200"
              }`}
            >
              <div className="prose dark:prose-invert prose-xs max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
            <span>Auditing contract clauses for answer...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40">
          <p className="text-[10px] text-slate-400 mb-1.5 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Suggested queries:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-[11px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 px-2.5 py-1 rounded-full transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about liabilities, penalties, deadlines..."
            disabled={loading}
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
