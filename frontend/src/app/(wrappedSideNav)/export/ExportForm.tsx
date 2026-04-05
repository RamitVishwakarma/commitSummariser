"use client";

import { useState } from "react";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import { MONTHS, MOCK_ROWS } from "@/lib/constants/export";
import { cn } from "@/lib/utils";

const YEARS = ["2024", "2025", "2026"] as const;
const FORMATS = ["json", "csv"] as const;

export function ExportForm(): React.JSX.Element {
  const [month, setMonth] = useState("March");
  const [year, setYear] = useState("2026");
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [includeLlm, setIncludeLlm] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="mx-auto max-w-[800px] space-y-6 p-8">
      <div className="glass-card p-8">
        <h2 className="mb-6 text-2xl font-bold">Download Monthly Data</h2>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label className="text-text-secondary mb-1 block text-xs">Month</label>
            <select
              className="glass-input w-full"
              value={month}
              onChange={e => setMonth(e.target.value)}
            >
              {MONTHS.map(m => (
                <option key={m} value={m} className="bg-[#1a1a2e]">
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-text-secondary mb-1 block text-xs">Year</label>
            <select
              className="glass-input w-full"
              value={year}
              onChange={e => setYear(e.target.value)}
            >
              {YEARS.map(y => (
                <option key={y} value={y} className="bg-[#1a1a2e]">
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-text-secondary mb-2 block text-xs">Format</label>
          <div className="flex gap-2">
            {FORMATS.map(f => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={cn(
                  "pill cursor-pointer px-5 py-2",
                  format === f
                    ? "bg-accent-violet border-accent-violet text-white"
                    : "text-text-secondary",
                )}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <label className="text-text-secondary mb-6 flex cursor-pointer items-center gap-2 text-[13px]">
          <input
            type="checkbox"
            checked={includeLlm}
            onChange={e => setIncludeLlm(e.target.checked)}
            className="accent-violet-500"
          />
          Include LLM prompt file
        </label>

        {/* Preview */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-semibold">Preview</h4>
          <div className="glass-card overflow-hidden">
            <table className="glass-table w-full">
              <thead>
                <tr>
                  <th>Hash</th>
                  <th>Repo</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ROWS.map(r => (
                  <tr key={r.hash}>
                    <td>
                      <span className="mono text-accent-violet text-[11px]">{r.hash}</span>
                    </td>
                    <td className="text-accent-blue text-xs">{r.repo}</td>
                    <td className="text-text-secondary text-xs">{r.message}</td>
                    <td className="text-text-muted text-[11px]">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="btn-primary flex w-full items-center justify-center gap-2 !py-[14px] text-base">
          <Download size={18} /> Download {month} {year}
        </button>
      </div>

      {/* LLM Prompt Info */}
      <div className="glass-card p-6">
        <button
          onClick={() => setShowPrompt(!showPrompt)}
          className="text-text-primary flex w-full items-center justify-between"
        >
          <span className="text-sm font-semibold">About the LLM Prompt File</span>
          {showPrompt ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showPrompt && (
          <div className="mt-4">
            <p className="text-text-secondary mb-3 text-[13px] leading-relaxed">
              The LLM prompt file contains a pre-written prompt that you can use with any language
              model to regenerate or customise your summaries.
            </p>
            <pre className="glass-card mono text-accent-teal overflow-x-auto p-4 text-[11px] leading-relaxed">
              {`You are an AI assistant analysing developer commit data.
Given the following commits from {month} {year},
generate a structured monthly summary including:
- Key accomplishments and themes
- Projects worked on
- Technical areas of focus
- Commit statistics and patterns

Format the output as markdown.`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
