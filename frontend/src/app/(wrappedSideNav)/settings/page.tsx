"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { Circle, Plus, Eye, EyeOff, Zap } from "lucide-react";
import { repos } from "@/lib/mock";
import { cn } from "@/lib/utils";

export default function SettingsPage(): React.JSX.Element {
  const [showPat, setShowPat] = useState(false);
  const [trackedRepos, setTrackedRepos] = useState<Record<string, boolean>>(
    Object.fromEntries(repos.map(r => [r.id, r.status === "active"])),
  );

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Settings" />
      <div className="mx-auto max-w-[800px] space-y-6 p-8">
        {/* GitHub Connection */}
        <div className="glass-card p-6">
          <h3 className="mb-4 text-[18px] font-semibold">GitHub Connection</h3>
          <div className="mb-4 flex items-center gap-2">
            <Circle size={8} fill="#2DD4BF" color="#2DD4BF" />
            <span className="text-accent-teal text-[13px]">Connected</span>
          </div>
          <label className="text-text-secondary mb-1 block text-[12px]">
            Personal Access Token
          </label>
          <div className="mb-3 flex gap-2">
            <input
              className="glass-input mono flex-1 text-[13px]"
              type={showPat ? "text" : "password"}
              value="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              readOnly
            />
            <button onClick={() => setShowPat(!showPat)} className="btn-ghost">
              {showPat ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary !px-3.5 !py-1.5 text-[12px]">Update Token</button>
            <button className="btn-secondary flex items-center gap-1 !px-3.5 !py-1.5 text-[12px]">
              <Zap size={12} /> Test Connection
            </button>
          </div>
          <div className="text-text-muted mt-3 text-[11px]">Last sync: 2 hours ago</div>
        </div>

        {/* Tracked Repos */}
        <div className="glass-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[18px] font-semibold">Tracked Repositories</h3>
            <button className="btn-primary flex items-center gap-1 !px-3.5 !py-1.5 text-[12px]">
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="space-y-2">
            {repos.map(r => (
              <div
                key={r.id}
                className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] py-2"
              >
                <div className="flex items-center gap-2">
                  <Circle size={8} fill={r.langColor} color={r.langColor} />
                  <span className="text-[14px]">{r.name}</span>
                  <span className="text-text-muted text-[11px]">{r.language}</span>
                </div>
                <button
                  onClick={() => setTrackedRepos(p => ({ ...p, [r.id]: !(p[r.id] ?? false) }))}
                  className={cn(
                    "relative h-5 w-10 rounded-full transition-colors",
                    (trackedRepos[r.id] ?? false)
                      ? "bg-accent-violet"
                      : "bg-[rgba(255,255,255,0.1)]",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 size-4 rounded-full bg-white transition-all",
                      (trackedRepos[r.id] ?? false) ? "left-[22px]" : "left-[2px]",
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Schedule */}
        <div className="glass-card p-6">
          <h3 className="mb-4 text-[18px] font-semibold">Summary Schedule</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-text-secondary mb-1 block text-[12px]">
                Weekly summary day
              </label>
              <select className="glass-input w-full" defaultValue="Sunday">
                <option className="bg-[#1a1a2e]">Sunday</option>
                <option className="bg-[#1a1a2e]">Monday</option>
                <option className="bg-[#1a1a2e]">Saturday</option>
              </select>
            </div>
            <div>
              <label className="text-text-secondary mb-1 block text-[12px]">
                Monthly summary day
              </label>
              <select className="glass-input w-full" defaultValue="1">
                {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day} className="bg-[#1a1a2e]">
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* LLM Config */}
        <div className="glass-card p-6">
          <h3 className="mb-4 text-[18px] font-semibold">LLM Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="text-text-secondary mb-1 block text-[12px]">Provider</label>
              <select className="glass-input w-full" defaultValue="OpenAI">
                {["OpenAI", "Anthropic", "Ollama (Local)", "Custom"].map(p => (
                  <option key={p} className="bg-[#1a1a2e]">
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-text-secondary mb-1 block text-[12px]">API Key</label>
              <input
                className="glass-input mono w-full text-[13px]"
                type="password"
                placeholder="sk-..."
              />
            </div>
            <div>
              <label className="text-text-secondary mb-1 block text-[12px]">Model</label>
              <input className="glass-input w-full text-[13px]" defaultValue="gpt-4o" />
            </div>
            <div>
              <label className="text-text-secondary mb-1 block text-[12px]">
                Custom System Prompt
              </label>
              <textarea
                className="glass-input mono w-full resize-y text-[12px]"
                rows={4}
                placeholder="You are an AI assistant..."
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card border-[rgba(244,63,94,0.2)] p-6">
          <h3 className="text-accent-rose mb-4 text-[18px] font-semibold">Data Management</h3>
          <div className="flex flex-wrap gap-3">
            <button className="btn-secondary text-[13px]">Export All Data</button>
            <button className="text-accent-amber btn-ghost text-[13px]">Clear All Commits</button>
            <button className="btn-danger text-[13px]">Reset Application</button>
          </div>
        </div>
      </div>
    </div>
  );
}
