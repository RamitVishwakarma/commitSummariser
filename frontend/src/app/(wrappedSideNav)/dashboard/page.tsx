import Link from "next/link";
import { TopBar } from "@/components/layout/top-bar";
import { todayCommits, weeklySummaries, monthlySummaries } from "@/lib/mock";
import { ArrowUpRight, ArrowDownRight, Sparkles, ChevronRight, Circle } from "lucide-react";

const stats = [
  { label: "Repositories Tracked", value: "6", delta: "+1 this month", positive: true },
  { label: "Commits This Week", value: "24", delta: "+8 from last week", positive: true },
  { label: "Summaries Generated", value: "8", delta: "+2 this week", positive: true },
  { label: "Last Sync", value: "2h ago", delta: "Auto-sync enabled", positive: true },
];

const repoLangColors: Record<string, string> = {
  gitpulse: "#3178C6",
  "api-gateway": "#00ADD8",
  "design-system": "#3178C6",
};

export default function DashboardPage() {
  const grouped = todayCommits.reduce(
    (acc, c) => {
      (acc[c.repo] ??= []).push(c);
      return acc;
    },
    {} as Record<string, typeof todayCommits>,
  );

  const latestWeekly = weeklySummaries[0];
  const latestMonthly = monthlySummaries[0];

  if (!latestWeekly || !latestMonthly) return null;

  return (
    <div className="flex-1 min-h-screen overflow-y-auto">
      <TopBar title="Dashboard" />
      <div className="p-8 max-w-[1200px] mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="glass-card p-5">
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 600 }}>{s.value}</div>
              <div
                className="flex items-center gap-1 mt-1"
                style={{
                  fontSize: 12,
                  color: s.positive ? "var(--accent-teal)" : "var(--accent-rose)",
                }}
              >
                {s.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Today's Commits */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 style={{ fontSize: 18, fontWeight: 600 }}>Today&apos;s Commits</h2>
            <Circle size={8} fill="#2DD4BF" style={{ color: "#2DD4BF" }} />
          </div>
          {Object.entries(grouped).map(([repo, commits]) => (
            <div key={repo} className="mb-4 last:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: repoLangColors[repo] ?? "#8B5CF6" }}
                />
                <Link
                  href={`/repositories/${commits[0]?.repoId ?? ""}`}
                  style={{ fontSize: 13, fontWeight: 600, color: "var(--accent-violet)" }}
                >
                  {repo}
                </Link>
              </div>
              {commits.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-4 py-2 px-3 rounded-lg transition-colors group"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <span className="mono" style={{ fontSize: 12, color: "var(--accent-violet)" }}>
                    {c.hash}
                  </span>
                  <span className="flex-1" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {c.message}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.time}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Recent Summaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} style={{ color: "var(--accent-violet)" }} />
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Latest Weekly Summary</h3>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
              {latestWeekly.dateRange}
            </div>
            <ul className="space-y-1 mb-3">
              {latestWeekly.accomplishments.slice(0, 3).map((a, i) => (
                <li
                  key={i}
                  style={{ fontSize: 13, color: "var(--text-secondary)", paddingLeft: 12, position: "relative" }}
                >
                  <span style={{ position: "absolute", left: 0 }}>•</span>
                  {a}
                </li>
              ))}
            </ul>
            <Link
              href="/summaries"
              className="inline-flex items-center gap-1"
              style={{ fontSize: 13, color: "var(--accent-violet)" }}
            >
              Read More <ChevronRight size={14} />
            </Link>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} style={{ color: "var(--accent-teal)" }} />
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Latest Monthly Summary</h3>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
              {latestMonthly.month}
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {latestMonthly.overview.slice(0, 200)}...
            </p>
            <Link
              href="/summaries"
              className="inline-flex items-center gap-1 mt-3"
              style={{ fontSize: 13, color: "var(--accent-violet)" }}
            >
              Read More <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
