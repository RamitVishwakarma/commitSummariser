import Link from "next/link";
import { TopBar } from "@/components/layout/top-bar";
import { todayCommits, weeklySummaries, monthlySummaries } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Sparkles, ChevronRight, Circle } from "lucide-react";

const stats = [
  { label: "Repositories Tracked", value: "6", delta: "+1 this month", positive: true },
  { label: "Commits This Week", value: "24", delta: "+8 from last week", positive: true },
  { label: "Summaries Generated", value: "8", delta: "+2 this week", positive: true },
  { label: "Last Sync", value: "2h ago", delta: "Auto-sync enabled", positive: true },
];

const repoLangDotClasses: Record<string, string> = {
  gitpulse: "bg-[#3178C6]",
  "api-gateway": "bg-[#00ADD8]",
  "design-system": "bg-[#3178C6]",
};

export default function DashboardPage(): React.JSX.Element | null {
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
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Dashboard" />
      <div className="mx-auto max-w-[1200px] space-y-6 p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(s => (
            <div key={s.label} className="glass-card p-5">
              <div className="text-text-secondary mb-1 text-[12px]">{s.label}</div>
              <div className="text-[28px] font-semibold">{s.value}</div>
              <div
                className={cn(
                  "mt-1 flex items-center gap-1 text-[12px]",
                  s.positive ? "text-accent-teal" : "text-accent-rose",
                )}
              >
                {s.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Today's Commits */}
        <div className="glass-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-[18px] font-semibold">Today&apos;s Commits</h2>
            <Circle size={8} fill="#2DD4BF" color="#2DD4BF" />
          </div>
          {Object.entries(grouped).map(([repo, commits]) => (
            <div key={repo} className="mb-4 last:mb-0">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={cn("size-2 rounded-full", repoLangDotClasses[repo] ?? "bg-[#8B5CF6]")}
                />
                <Link
                  href={`/repositories/${commits[0]?.repoId ?? ""}`}
                  className="text-accent-violet text-[13px] font-semibold"
                >
                  {repo}
                </Link>
              </div>
              {commits.map(c => (
                <div
                  key={c.id}
                  className="group flex items-center gap-4 rounded-lg border-b border-[rgba(255,255,255,0.04)] px-3 py-2 transition-colors"
                >
                  <span className="mono text-accent-violet text-[12px]">{c.hash}</span>
                  <span className="text-text-secondary flex-1 text-[13px]">{c.message}</span>
                  <span className="text-text-muted text-[11px]">{c.time}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Recent Summaries */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="glass-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-accent-violet" />
              <h3 className="text-[16px] font-semibold">Latest Weekly Summary</h3>
            </div>
            <div className="text-text-muted mb-2 text-[12px]">{latestWeekly.dateRange}</div>
            <ul className="mb-3 space-y-1">
              {latestWeekly.accomplishments.slice(0, 3).map(a => (
                <li key={a} className="text-text-secondary relative pl-3 text-[13px]">
                  <span className="absolute left-0">•</span>
                  {a}
                </li>
              ))}
            </ul>
            <Link
              href="/summaries"
              className="text-accent-violet inline-flex items-center gap-1 text-[13px]"
            >
              Read More <ChevronRight size={14} />
            </Link>
          </div>
          <div className="glass-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-accent-teal" />
              <h3 className="text-[16px] font-semibold">Latest Monthly Summary</h3>
            </div>
            <div className="text-text-muted mb-2 text-[12px]">{latestMonthly.month}</div>
            <p className="text-text-secondary text-[13px] leading-[1.6]">
              {latestMonthly.overview.slice(0, 200)}...
            </p>
            <Link
              href="/summaries"
              className="text-accent-violet mt-3 inline-flex items-center gap-1 text-[13px]"
            >
              Read More <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
