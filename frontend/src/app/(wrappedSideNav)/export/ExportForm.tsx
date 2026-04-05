"use client";

import { useState } from "react";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import { MONTHS, MOCK_ROWS } from "@/lib/constants/export";

const YEARS = ["2024", "2025", "2026"] as const;
const FORMATS = ["json", "csv"] as const;

const OPTION_STYLE = { background: "#1a1a2e" };

export function ExportForm() {
  const [month, setMonth] = useState("March");
  const [year, setYear] = useState("2026");
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [includeLlm, setIncludeLlm] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <div className="p-8 max-w-[800px] mx-auto space-y-6">
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-6">Download Monthly Data</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs text-(--text-secondary) mb-1">Month</label>
            <select
              className="glass-input w-full"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {MONTHS.map((m) => (
                <option key={m} value={m} style={OPTION_STYLE}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-(--text-secondary) mb-1">Year</label>
            <select
              className="glass-input w-full"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {YEARS.map((y) => (
                <option key={y} value={y} style={OPTION_STYLE}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs text-(--text-secondary) mb-2">Format</label>
          <div className="flex gap-2">
            {FORMATS.map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className="pill cursor-pointer"
                style={{
                  padding: "8px 20px",
                  background: format === f ? "var(--accent-violet)" : undefined,
                  color: format === f ? "white" : "var(--text-secondary)",
                  borderColor: format === f ? "var(--accent-violet)" : undefined,
                }}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 mb-6 cursor-pointer text-[13px] text-(--text-secondary)">
          <input
            type="checkbox"
            checked={includeLlm}
            onChange={(e) => setIncludeLlm(e.target.checked)}
            className="accent-violet-500"
          />
          Include LLM prompt file
        </label>

        {/* Preview */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2">Preview</h4>
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
                {MOCK_ROWS.map((r) => (
                  <tr key={r.hash}>
                    <td>
                      <span className="mono text-[11px] text-(--accent-violet)">{r.hash}</span>
                    </td>
                    <td className="text-xs text-(--accent-blue)">{r.repo}</td>
                    <td className="text-xs text-(--text-secondary)">{r.message}</td>
                    <td className="text-[11px] text-(--text-muted)">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="btn-primary flex items-center gap-2 w-full justify-center !py-[14px] text-base">
          <Download size={18} /> Download {month} {year}
        </button>
      </div>

      {/* LLM Prompt Info */}
      <div className="glass-card p-6">
        <button
          onClick={() => setShowPrompt(!showPrompt)}
          className="flex items-center justify-between w-full text-(--text-primary)"
        >
          <span className="text-sm font-semibold">About the LLM Prompt File</span>
          {showPrompt ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showPrompt && (
          <div className="mt-4">
            <p className="text-[13px] text-(--text-secondary) leading-relaxed mb-3">
              The LLM prompt file contains a pre-written prompt that you can use with any language model to
              regenerate or customise your summaries.
            </p>
            <pre className="glass-card p-4 mono overflow-x-auto text-[11px] text-(--accent-teal) leading-relaxed">
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
