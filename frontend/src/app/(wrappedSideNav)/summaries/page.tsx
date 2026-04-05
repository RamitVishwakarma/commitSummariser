"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { weeklySummaries, monthlySummaries, yearlySummary } from "@/lib/mock";
import { Sparkles, Download, Trash2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

type Tab = "weekly" | "monthly" | "yearly";

export default function SummariesPage() {
  const [tab, setTab] = useState<Tab>("weekly");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const s = new Set(expandedCards);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpandedCards(s);
  };

  const radarData = Object.entries(yearlySummary.skills).map(([k, v]) => ({ skill: k, value: v }));

  return (
    <div className="flex-1 min-h-screen overflow-y-auto">
      <TopBar title="Summaries" />
      <div className="p-8 max-w-[1200px] mx-auto space-y-6">
        {/* Tabs */}
        <div className="flex gap-2">
          {(["weekly", "monthly", "yearly"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="pill cursor-pointer transition-all"
              style={{
                background: tab === t ? "var(--accent-violet)" : undefined,
                color: tab === t ? "white" : "var(--text-secondary)",
                borderColor: tab === t ? "var(--accent-violet)" : undefined,
                padding: "8px 20px",
                fontSize: 13,
                boxShadow: tab === t ? "0 0 16px var(--glow-violet)" : undefined,
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Weekly */}
        {tab === "weekly" &&
          weeklySummaries.map((s) => (
            <div key={s.id} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} style={{ color: "var(--accent-violet)" }} />
                    <h3 style={{ fontSize: 18, fontWeight: 600 }}>{s.dateRange}</h3>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Generated {s.generated}</span>
                </div>
                <div className="flex gap-2">
                  <button className="btn-ghost p-1">
                    <RefreshCw size={14} />
                  </button>
                  <button className="btn-ghost p-1">
                    <Download size={14} />
                  </button>
                  <button className="btn-ghost p-1" style={{ color: "var(--accent-rose)" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div
                  style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 6 }}
                >
                  Key Accomplishments
                </div>
                <ul className="space-y-1">
                  {s.accomplishments
                    .slice(0, expandedCards.has(s.id) ? undefined : 3)
                    .map((a, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 13,
                          color: "var(--text-secondary)",
                          paddingLeft: 12,
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", left: 0 }}>•</span>
                        {a}
                      </li>
                    ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-3">
                  {s.reposActive.map((r) => (
                    <span key={r} className="pill" style={{ fontSize: 11 }}>
                      {r}
                    </span>
                  ))}
                </div>
                <div className="mt-3" style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {s.commitsProcessed} commits processed
                </div>
                {expandedCards.has(s.id) && (
                  <div className="mt-3">
                    <div
                      style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 4 }}
                    >
                      Notable Changes
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {s.notable}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => toggle(s.id)}
                  className="btn-ghost mt-2 flex items-center gap-1"
                  style={{ fontSize: 12, color: "var(--accent-violet)" }}
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
          monthlySummaries.map((s) => (
            <div key={s.id} className="glass-card p-6">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} style={{ color: "var(--accent-teal)" }} />
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{s.month}</h3>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                {s.overview}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {s.themes.map((t) => (
                  <span
                    key={t}
                    className="pill"
                    style={{
                      fontSize: 11,
                      color: "var(--accent-violet)",
                      borderColor: "rgba(139,92,246,0.3)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-6 mb-3" style={{ fontSize: 12, color: "var(--text-muted)" }}>
                <span>{s.totalCommits} commits</span>
                <span>{s.reposActive} repos active</span>
                <span>Busiest: {s.busiestWeek}</span>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn-primary flex items-center gap-2"
                  style={{ fontSize: 12, padding: "8px 16px" }}
                >
                  <Download size={12} /> Download Bundle
                </button>
                <button className="btn-ghost flex items-center gap-1" style={{ fontSize: 12 }}>
                  <RefreshCw size={12} /> Regenerate
                </button>
              </div>
            </div>
          ))}

        {/* Yearly */}
        {tab === "yearly" && (
          <div className="glass-card p-8">
            <h2 style={{ fontSize: 48, fontWeight: 700, color: "var(--accent-violet)" }}>
              {yearlySummary.year}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              {[
                { label: "Total Commits", value: yearlySummary.totalCommits.toLocaleString() },
                { label: "Repos Active", value: yearlySummary.reposActive },
                { label: "Weeks Summarised", value: yearlySummary.weeksSummarised },
                { label: "Longest Streak", value: `${yearlySummary.longestStreak} days` },
              ].map((s, i) => (
                <div key={i} className="glass-card p-4 text-center">
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Technical Exposure Map</h3>
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
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Narrative Summary</h3>
                {yearlySummary.narrative.split("\n\n").map((p, i) => (
                  <p
                    key={i}
                    style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 12 }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-6">
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
