"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/layout/top-bar";
import { repos, allCommits } from "@/lib/mock";
import { ExternalLink, RefreshCw, Eye, Flag, Trash2, Circle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { day: "Mon", commits: 5 },
  { day: "Tue", commits: 8 },
  { day: "Wed", commits: 3 },
  { day: "Thu", commits: 6 },
  { day: "Fri", commits: 12 },
  { day: "Sat", commits: 2 },
  { day: "Sun", commits: 4 },
];

export default function RepoDetailPage() {
  const params = useParams();
  const repoId = typeof params["repoId"] === "string" ? params["repoId"] : undefined;

  const repo = repos.find((r) => r.id === repoId) ?? repos[0];
  const commits = allCommits.filter((c) => c.repoId === repoId);

  if (!repo) return null;

  return (
    <div className="flex-1 min-h-screen overflow-y-auto">
      <TopBar title={repo.name} />
      <div className="p-8 max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700 }}>{repo.name}</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>{repo.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="pill">
                  <Circle size={8} fill={repo.langColor} style={{ color: repo.langColor }} /> {repo.language}
                </span>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{repo.commits} commits</span>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Last: {repo.lastCommit}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="btn-secondary flex items-center gap-1"
                style={{ fontSize: 12, padding: "6px 12px" }}
              >
                <RefreshCw size={12} /> Sync
              </button>
              <a href="#" className="btn-ghost flex items-center gap-1" style={{ fontSize: 12 }}>
                <ExternalLink size={12} /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Commits Table */}
          <div className="lg:col-span-2 glass-card overflow-hidden">
            <table className="glass-table w-full">
              <thead>
                <tr>
                  <th>Hash</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {commits.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <span className="mono" style={{ fontSize: 12, color: "var(--accent-violet)" }}>
                        {c.hash}
                      </span>
                    </td>
                    <td style={{ fontSize: 13, color: "var(--text-secondary)" }}>{c.message}</td>
                    <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.time}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn-ghost p-1">
                          <Eye size={14} />
                        </button>
                        <button className="btn-ghost p-1" style={{ color: "var(--accent-amber)" }}>
                          <Flag size={14} />
                        </button>
                        <button className="btn-ghost p-1" style={{ color: "var(--accent-rose)" }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {commits.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8" style={{ color: "var(--text-muted)" }}>
                      No commits found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Stats */}
          <div className="glass-card p-5">
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Commit Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#9898B0", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fill: "#9898B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,18,20,0.95)",
                    border: "1px solid rgba(45,212,191,0.15)",
                    borderRadius: 8,
                    color: "#E0F2F1",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="commits" fill="#2DD4BF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between" style={{ fontSize: 12 }}>
                <span style={{ color: "var(--text-secondary)" }}>Most active day</span>
                <span style={{ fontWeight: 600 }}>Friday</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: 12 }}>
                <span style={{ color: "var(--text-secondary)" }}>Avg commits/week</span>
                <span style={{ fontWeight: 600 }}>5.7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
