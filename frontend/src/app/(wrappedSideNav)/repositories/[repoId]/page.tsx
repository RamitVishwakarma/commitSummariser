"use client";

import { useParams } from "next/navigation";
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

interface CommitTooltipPayloadEntry {
  value?: number | string;
}

interface CommitTooltipProps {
  active?: boolean;
  label?: string;
  payload?: CommitTooltipPayloadEntry[];
}

function CommitTooltip({ active, label, payload }: CommitTooltipProps): React.JSX.Element | null {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="text-text-primary rounded-lg border border-[rgba(45,212,191,0.15)] bg-[rgba(10,18,20,0.95)] px-3 py-2 text-[12px]">
      <div className="text-text-secondary">{label}</div>
      <div className="font-semibold">{payload[0]?.value} commits</div>
    </div>
  );
}

export default function RepoDetailPage(): React.JSX.Element | null {
  const params = useParams();
  const repoId = typeof params["repoId"] === "string" ? params["repoId"] : undefined;

  const repo = repos.find(r => r.id === repoId) ?? repos[0];
  const commits = allCommits.filter(c => c.repoId === repoId);

  if (!repo) return null;

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title={repo.name} />
      <div className="mx-auto max-w-[1200px] space-y-6 p-8">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-[24px] font-bold">{repo.name}</h2>
              <p className="text-text-secondary mt-1 text-[14px]">{repo.description}</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="pill">
                  <Circle size={8} fill={repo.langColor} color={repo.langColor} /> {repo.language}
                </span>
                <span className="text-text-muted text-[12px]">{repo.commits} commits</span>
                <span className="text-text-muted text-[12px]">Last: {repo.lastCommit}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-1 !px-3 !py-1.5 text-[12px]">
                <RefreshCw size={12} /> Sync
              </button>
              <a href="#" className="btn-ghost flex items-center gap-1 text-[12px]">
                <ExternalLink size={12} /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Commits Table */}
          <div className="glass-card overflow-hidden lg:col-span-2">
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
                {commits.map(c => (
                  <tr key={c.id}>
                    <td>
                      <span className="mono text-accent-violet text-[12px]">{c.hash}</span>
                    </td>
                    <td className="text-text-secondary text-[13px]">{c.message}</td>
                    <td className="text-text-muted text-[12px]">{c.time}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn-ghost p-1">
                          <Eye size={14} />
                        </button>
                        <button className="text-accent-amber btn-ghost p-1">
                          <Flag size={14} />
                        </button>
                        <button className="text-accent-rose btn-ghost p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {commits.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-text-muted py-8 text-center">
                      No commits found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Stats */}
          <div className="glass-card p-5">
            <h3 className="mb-4 text-[16px] font-semibold">Commit Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#9898B0", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fill: "#9898B0", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CommitTooltip />} />
                <Bar dataKey="commits" fill="#2DD4BF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[12px]">
                <span className="text-text-secondary">Most active day</span>
                <span className="font-semibold">Friday</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-text-secondary">Avg commits/week</span>
                <span className="font-semibold">5.7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
