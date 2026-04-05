"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { Circle, Plus, Eye, EyeOff, Zap } from "lucide-react";
import { repos } from "@/lib/mock";

export default function SettingsPage() {
  const [showPat, setShowPat] = useState(false);
  const [trackedRepos, setTrackedRepos] = useState<Record<string, boolean>>(
    Object.fromEntries(repos.map((r) => [r.id, r.status === "active"])),
  );

  return (
    <div className="flex-1 min-h-screen overflow-y-auto">
      <TopBar title="Settings" />
      <div className="p-8 max-w-[800px] mx-auto space-y-6">
        {/* GitHub Connection */}
        <div className="glass-card p-6">
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>GitHub Connection</h3>
          <div className="flex items-center gap-2 mb-4">
            <Circle size={8} fill="#2DD4BF" style={{ color: "#2DD4BF" }} />
            <span style={{ fontSize: 13, color: "var(--accent-teal)" }}>Connected</span>
          </div>
          <label
            style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, display: "block" }}
          >
            Personal Access Token
          </label>
          <div className="flex gap-2 mb-3">
            <input
              className="glass-input flex-1 mono"
              type={showPat ? "text" : "password"}
              value="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              readOnly
              style={{ fontSize: 13 }}
            />
            <button onClick={() => setShowPat(!showPat)} className="btn-ghost">
              {showPat ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 14px" }}>
              Update Token
            </button>
            <button
              className="btn-secondary flex items-center gap-1"
              style={{ fontSize: 12, padding: "6px 14px" }}
            >
              <Zap size={12} /> Test Connection
            </button>
          </div>
          <div className="mt-3" style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Last sync: 2 hours ago
          </div>
        </div>

        {/* Tracked Repos */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>Tracked Repositories</h3>
            <button
              className="btn-primary flex items-center gap-1"
              style={{ fontSize: 12, padding: "6px 14px" }}
            >
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="space-y-2">
            {repos.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <Circle size={8} fill={r.langColor} style={{ color: r.langColor }} />
                  <span style={{ fontSize: 14 }}>{r.name}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.language}</span>
                </div>
                <button
                  onClick={() => setTrackedRepos((p) => ({ ...p, [r.id]: !(p[r.id] ?? false) }))}
                  className="w-10 h-5 rounded-full relative transition-colors"
                  style={{
                    background: (trackedRepos[r.id] ?? false)
                      ? "var(--accent-violet)"
                      : "rgba(255,255,255,0.1)",
                  }}
                >
                  <span
                    className="absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all"
                    style={{ left: (trackedRepos[r.id] ?? false) ? 22 : 2 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Schedule */}
        <div className="glass-card p-6">
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Summary Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, display: "block" }}
              >
                Weekly summary day
              </label>
              <select className="glass-input w-full" defaultValue="Sunday">
                <option style={{ background: "#1a1a2e" }}>Sunday</option>
                <option style={{ background: "#1a1a2e" }}>Monday</option>
                <option style={{ background: "#1a1a2e" }}>Saturday</option>
              </select>
            </div>
            <div>
              <label
                style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, display: "block" }}
              >
                Monthly summary day
              </label>
              <select className="glass-input w-full" defaultValue="1">
                {Array.from({ length: 28 }, (_, i) => (
                  <option key={i} value={i + 1} style={{ background: "#1a1a2e" }}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* LLM Config */}
        <div className="glass-card p-6">
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>LLM Configuration</h3>
          <div className="space-y-4">
            <div>
              <label
                style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, display: "block" }}
              >
                Provider
              </label>
              <select className="glass-input w-full" defaultValue="OpenAI">
                {["OpenAI", "Anthropic", "Ollama (Local)", "Custom"].map((p) => (
                  <option key={p} style={{ background: "#1a1a2e" }}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, display: "block" }}
              >
                API Key
              </label>
              <input
                className="glass-input w-full mono"
                type="password"
                placeholder="sk-..."
                style={{ fontSize: 13 }}
              />
            </div>
            <div>
              <label
                style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, display: "block" }}
              >
                Model
              </label>
              <input className="glass-input w-full" defaultValue="gpt-4o" style={{ fontSize: 13 }} />
            </div>
            <div>
              <label
                style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, display: "block" }}
              >
                Custom System Prompt
              </label>
              <textarea
                className="glass-input w-full mono"
                rows={4}
                placeholder="You are an AI assistant..."
                style={{ fontSize: 12, resize: "vertical" }}
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card p-6" style={{ borderColor: "rgba(244,63,94,0.2)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--accent-rose)" }}>
            Data Management
          </h3>
          <div className="flex flex-wrap gap-3">
            <button className="btn-secondary" style={{ fontSize: 13 }}>
              Export All Data
            </button>
            <button className="btn-ghost" style={{ color: "var(--accent-amber)", fontSize: 13 }}>
              Clear All Commits
            </button>
            <button className="btn-danger" style={{ fontSize: 13 }}>
              Reset Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
