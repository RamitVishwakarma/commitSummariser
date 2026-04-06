"use client";

import { useState } from "react";
import { Circle, Plus, Eye, EyeOff, Zap } from "lucide-react";
import { repos } from "@/lib/mock";
import { cn } from "@/lib/utils";

export function SettingsClient(): React.JSX.Element {
  const [showPat, setShowPat] = useState(false);
  const [trackedRepos, setTrackedRepos] = useState<Record<string, boolean>>(
    Object.fromEntries(repos.map(r => [r.id, r.status === "active"])),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      {/* GitHub Connection */}
      <div className="glass-card p-6">
        <h3 className="mb-4 text-lg font-semibold">GitHub Connection</h3>
        <div className="mb-4 flex items-center gap-2">
          <Circle size={8} fill="#2DD4BF" color="#2DD4BF" />
          <span className="text-accent-teal text-sm">Connected</span>
        </div>
        <label className="text-text-secondary mb-1 block text-xs">
          Personal Access Token
        </label>
        <div className="mb-3 flex gap-2">
          <input
            className="glass-input mono flex-1 text-sm"
            type={showPat ? "text" : "password"}
            value="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            readOnly
          />
          <button onClick={() => setShowPat(!showPat)} className="btn-ghost">
            {showPat ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary px-3.5 py-1.5 text-xs">Update Token</button>
          <button className="btn-secondary flex items-center gap-1 px-3.5 py-1.5 text-xs">
            <Zap size={12} /> Test Connection
          </button>
        </div>
        <div className="text-text-muted mt-3 text-2xs">Last sync: 2 hours ago</div>
      </div>

      {/* Tracked Repos */}
      <div className="glass-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tracked Repositories</h3>
          <button className="btn-primary flex items-center gap-1 px-3.5 py-1.5 text-xs">
            <Plus size={12} /> Add
          </button>
        </div>
        <div className="space-y-2">
          {repos.map(r => (
            <div
              key={r.id}
              className="flex items-center justify-between border-b border-border-subtle py-2"
            >
              <div className="flex items-center gap-2">
                <Circle size={8} fill={r.langColor} color={r.langColor} />
                <span className="text-sm">{r.name}</span>
                <span className="text-text-muted text-2xs">{r.language}</span>
              </div>
              <button
                onClick={() => setTrackedRepos(p => ({ ...p, [r.id]: !(p[r.id] ?? false) }))}
                className={cn(
                  "relative inline-flex h-5 w-10 items-center justify-start rounded-full px-0.5 transition-colors",
                  (trackedRepos[r.id] ?? false)
                    ? "bg-accent-violet"
                    : "bg-[rgba(255,255,255,0.1)]",
                )}
              >
                <span
                  className={cn(
                    "size-4 rounded-full bg-white transition-transform",
                    (trackedRepos[r.id] ?? false) ? "translate-x-5" : "translate-x-0",
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Schedule */}
      <div className="glass-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Summary Schedule</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-text-secondary mb-1 block text-xs">
              Weekly summary day
            </label>
            <select className="glass-input w-full" defaultValue="Sunday">
              <option className="bg-option-bg">Sunday</option>
              <option className="bg-option-bg">Monday</option>
              <option className="bg-option-bg">Saturday</option>
            </select>
          </div>
          <div>
            <label className="text-text-secondary mb-1 block text-xs">
              Monthly summary day
            </label>
            <select className="glass-input w-full" defaultValue="1">
              {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day} className="bg-option-bg">
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* LLM Config */}
      <div className="glass-card p-6">
        <h3 className="mb-4 text-lg font-semibold">LLM Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="text-text-secondary mb-1 block text-xs">Provider</label>
            <select className="glass-input w-full" defaultValue="OpenAI">
              {["OpenAI", "Anthropic", "Ollama (Local)", "Custom"].map(p => (
                <option key={p} className="bg-option-bg">
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-text-secondary mb-1 block text-xs">API Key</label>
            <input
              className="glass-input mono w-full text-sm"
              type="password"
              placeholder="sk-..."
            />
          </div>
          <div>
            <label className="text-text-secondary mb-1 block text-xs">Model</label>
            <input className="glass-input w-full text-sm" defaultValue="gpt-4o" />
          </div>
          <div>
            <label className="text-text-secondary mb-1 block text-xs">
              Custom System Prompt
            </label>
            <textarea
              className="glass-input mono w-full resize-y text-xs"
              rows={4}
              placeholder="You are an AI assistant..."
            />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="glass-card border-[rgba(244,63,94,0.2)] p-6">
        <h3 className="text-accent-rose mb-4 text-lg font-semibold">Data Management</h3>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary text-sm">Export All Data</button>
          <button className="text-accent-amber btn-ghost text-sm">Clear All Commits</button>
          <button className="btn-danger text-sm">Reset Application</button>
        </div>
      </div>
    </div>
  );
}
