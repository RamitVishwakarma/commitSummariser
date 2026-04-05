"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { weeklySummaries, monthlySummaries, yearlySummary } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { Sparkles, Download, Trash2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

type Tab = "weekly" | "monthly" | "yearly";

export default function SummariesPage(): React.JSX.Element {
  const [tab, setTab] = useState<Tab>("weekly");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const s = new Set(expandedCards);
    if (s.has(id)) {
      s.delete(id);
    } else {
      s.add(id);
    }
    setExpandedCards(s);
  };

  const radarData = Object.entries(yearlySummary.skills).map(([k, v]) => ({ skill: k, value: v }));

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Summaries" />
      <div className="mx-auto max-w-[1200px] space-y-6 p-8">
        {/* Tabs */}
        <div className="flex gap-2">
          {(["weekly", "monthly", "yearly"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "pill cursor-pointer px-5 py-2 text-[13px] transition-all",
                tab === t
                  ? "bg-accent-violet border-accent-violet text-white shadow-[0_0_16px_var(--color-glow-violet)]"
                  : "text-text-secondary",
              )}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Weekly */}
        {tab === "weekly" &&
          weeklySummaries.map(s => (
            <div key={s.id} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-accent-violet" />
                    <h3 className="text-[18px] font-semibold">{s.dateRange}</h3>
                  </div>
                  <span className="text-text-muted text-[11px]">Generated {s.generated}</span>
                </div>
                <div className="flex gap-2">
                  <button className="btn-ghost p-1">
                    <RefreshCw size={14} />
                  </button>
                  <button className="btn-ghost p-1">
                    <Download size={14} />
                  </button>
                  <button className="text-accent-rose btn-ghost p-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-text-secondary mb-1.5 text-[12px] font-semibold">
                  Key Accomplishments
                </div>
                <ul className="space-y-1">
                  {s.accomplishments.slice(0, expandedCards.has(s.id) ? undefined : 3).map(a => (
                    <li key={a} className="text-text-secondary relative pl-3 text-[13px]">
                      <span className="absolute left-0">•</span>
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.reposActive.map(r => (
                    <span key={r} className="pill text-[11px]">
                      {r}
                    </span>
                  ))}
                </div>
                <div className="text-text-muted mt-3 text-[12px]">
                  {s.commitsProcessed} commits processed
                </div>
                {expandedCards.has(s.id) && (
                  <div className="mt-3">
                    <div className="text-text-secondary mb-1 text-[12px] font-semibold">
                      Notable Changes
                    </div>
                    <p className="text-text-secondary text-[13px] leading-[1.6]">{s.notable}</p>
                  </div>
                )}
                <button
                  onClick={() => toggle(s.id)}
                  className="text-accent-violet btn-ghost mt-2 flex items-center gap-1 text-[12px]"
                >
                  {expandedCards.has(s.id) ? (
                    <>
                      <ChevronUp size={12} /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={12} /> Show More
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

        {/* Monthly */}
        {tab === "monthly" &&
          monthlySummaries.map(s => (
            <div key={s.id} className="glass-card p-6">
              <div className="mb-1 flex items-center gap-2">
                <Sparkles size={16} className="text-accent-teal" />
                <h3 className="text-[20px] font-bold">{s.month}</h3>
              </div>
              <p className="text-text-secondary mb-3 text-[14px] leading-[1.6]">{s.overview}</p>
              <div className="mb-3 flex flex-wrap gap-2">
                {s.themes.map(t => (
                  <span
                    key={t}
                    className="text-accent-violet pill border-[rgba(139,92,246,0.3)] text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="text-text-muted mb-3 flex gap-6 text-[12px]">
                <span>{s.totalCommits} commits</span>
                <span>{s.reposActive} repos active</span>
                <span>Busiest: {s.busiestWeek}</span>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary flex items-center gap-2 !px-4 !py-2 text-[12px]">
                  <Download size={12} /> Download Bundle
                </button>
                <button className="btn-ghost flex items-center gap-1 text-[12px]">
                  <RefreshCw size={12} /> Regenerate
                </button>
              </div>
            </div>
          ))}

        {/* Yearly */}
        {tab === "yearly" && (
          <div className="glass-card p-8">
            <h2 className="text-accent-violet text-[48px] font-bold">{yearlySummary.year}</h2>
            <div className="my-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "Total Commits", value: yearlySummary.totalCommits.toLocaleString() },
                { label: "Repos Active", value: yearlySummary.reposActive },
                { label: "Weeks Summarised", value: yearlySummary.weeksSummarised },
                { label: "Longest Streak", value: `${yearlySummary.longestStreak} days` },
              ].map(s => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <div className="text-text-muted text-[11px]">{s.label}</div>
                  <div className="text-[24px] font-bold">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-[16px] font-semibold">Technical Exposure Map</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "#9898B0", fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="value" stroke="#2DD4BF" fill="#2DD4BF" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="mb-3 text-[16px] font-semibold">Narrative Summary</h3>
                {yearlySummary.narrative.split("\n\n").map(p => (
                  <p key={p} className="text-text-secondary mb-3 text-[14px] leading-[1.7]">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="btn-primary flex items-center gap-2">
                <RefreshCw size={14} /> Regenerate
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
