"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { Download, ChevronDown, ChevronUp } from "lucide-react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ExportPage() {
  const [month, setMonth] = useState("March");
  const [year, setYear] = useState("2026");
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [includeLlm, setIncludeLlm] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  const mockRows = [
    { hash: "a3f7b2c", repo: "gitpulse", message: "feat: add glassmorphism theme", date: "2026-04-04" },
    { hash: "e9d1f4a", repo: "gitpulse", message: "fix: sidebar animation timing", date: "2026-04-04" },
    { hash: "7f2a9c1", repo: "api-gateway", message: "feat: JWT refresh rotation", date: "2026-04-04" },
    { hash: "f3a8c2e", repo: "ml-pipeline", message: "feat: BERT fine-tuning script", date: "2026-04-03" },
    { hash: "9a1c4f7", repo: "infra-terraform", message: "feat: RDS read replica", date: "2026-04-02" },
  ];

  return (
    <div className="flex-1 min-h-screen overflow-y-auto">
      <TopBar title="Export" />
      <div className="p-8 max-w-[800px] mx-auto space-y-6">
        <div className="glass-card p-8">
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Download Monthly Data</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, display: "block" }}
              >
                Month
              </label>
              <select
                className="glass-input w-full"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m} style={{ background: "#1a1a2e" }}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, display: "block" }}
              >
                Year
              </label>
              <select
                className="glass-input w-full"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {["2024", "2025", "2026"].map((y) => (
                  <option key={y} value={y} style={{ background: "#1a1a2e" }}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label
              style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}
            >
              Format
            </label>
            <div className="flex gap-2">
              {(["json", "csv"] as const).map((f) => (
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

          <label
            className="flex items-center gap-2 mb-6 cursor-pointer"
            style={{ fontSize: 13, color: "var(--text-secondary)" }}
          >
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
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Preview</h4>
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
                  {mockRows.map((r) => (
                    <tr key={r.hash}>
                      <td>
                        <span className="mono" style={{ fontSize: 11, color: "var(--accent-violet)" }}>
                          {r.hash}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: "var(--accent-blue)" }}>{r.repo}</td>
                      <td style={{ fontSize: 12, color: "var(--text-secondary)" }}>{r.message}</td>
                      <td style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            className="btn-primary flex items-center gap-2 w-full justify-center"
            style={{ padding: "14px", fontSize: 16 }}
          >
            <Download size={18} /> Download {month} {year}
          </button>
        </div>

        {/* LLM Prompt Info */}
        <div className="glass-card p-6">
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="flex items-center justify-between w-full"
            style={{ color: "var(--text-primary)" }}
          >
            <span style={{ fontSize: 14, fontWeight: 600 }}>About the LLM Prompt File</span>
            {showPrompt ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showPrompt && (
            <div className="mt-4">
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                The LLM prompt file contains a pre-written prompt that you can use with any language model to
                regenerate or customise your summaries.
              </p>
              <pre
                className="glass-card p-4 mono overflow-x-auto"
                style={{ fontSize: 11, color: "var(--accent-teal)", lineHeight: 1.5 }}
              >
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
    </div>
  );
}
