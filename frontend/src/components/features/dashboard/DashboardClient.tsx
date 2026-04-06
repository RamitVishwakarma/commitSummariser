"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Sparkles, ChevronRight, Circle } from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { groupCommitsByRepo } from "@/components/features/dashboard/dashboardUtils";

import type { todayCommits as TodayCommitsType } from "@/lib/mock";

type TodayCommits = typeof TodayCommitsType;

interface Stat {
  label: string;
  value: string;
  delta: string;
  isPositive: boolean;
}

interface WeeklySummaryItem {
  dateRange: string;
  accomplishments: string[];
}

interface MonthlySummaryItem {
  month: string;
  overview: string;
}

interface DashboardClientProps {
  todayCommits: TodayCommits;
  weeklySummaries: WeeklySummaryItem[];
  monthlySummaries: MonthlySummaryItem[];
}

const STATS: Stat[] = [
  { label: "Repositories Tracked", value: "6", delta: "+1 this month", isPositive: true },
  { label: "Commits This Week", value: "24", delta: "+8 from last week", isPositive: true },
  { label: "Summaries Generated", value: "8", delta: "+2 this week", isPositive: true },
  { label: "Last Sync", value: "2h ago", delta: "Auto-sync enabled", isPositive: true },
];

const REPO_LANG_DOT_CLASSES: Record<string, string> = {
  gitpulse: "bg-lang-ts",
  "api-gateway": "bg-lang-go",
  "design-system": "bg-lang-ts",
};

export function DashboardClient({
  todayCommits,
  weeklySummaries,
  monthlySummaries,
}: DashboardClientProps): React.JSX.Element | null {
  const grouped = groupCommitsByRepo(todayCommits);

  const latestWeekly = weeklySummaries[0];
  const latestMonthly = monthlySummaries[0];

  if (!latestWeekly || !latestMonthly) return null;

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Dashboard" />
      <div className="mx-auto max-w-7xl space-y-6 p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(s => (
            <div key={s.label} className="glass-card p-5">
              <div className="text-text-secondary mb-1 text-xs">{s.label}</div>
              <div className="text-3xl font-semibold">{s.value}</div>
              <div
                className={cn(
                  "mt-1 flex items-center gap-1 text-xs",
                  s.isPositive ? "text-accent-teal" : "text-accent-rose",
                )}
              >
                {s.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Today's Commits */}
        <div className="glass-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-lg font-semibold">Today&apos;s Commits</h2>
            <Circle size={8} fill="#2DD4BF" color="#2DD4BF" />
          </div>
          {Object.entries(grouped).map(([repo, commits]) => (
            <div key={repo} className="mb-4 last:mb-0">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={cn("size-2 rounded-full", REPO_LANG_DOT_CLASSES[repo] ?? "bg-lang-default")}
                />
                <Link
                  href={`/repositories/${commits[0]?.repoId ?? ""}`}
                  className="text-accent-violet text-sm font-semibold"
                >
                  {repo}
                </Link>
              </div>
              {commits.map(c => (
                <div
                  key={c.id}
                  className="group flex items-center gap-4 rounded-lg border-b border-bg-hover-subtle px-3 py-2 transition-colors"
                >
                  <span className="mono text-accent-violet text-xs">{c.hash}</span>
                  <span className="text-text-secondary flex-1 text-sm">{c.message}</span>
                  <span className="text-text-muted text-2xs">{c.time}</span>
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
              <h3 className="text-base font-semibold">Latest Weekly Summary</h3>
            </div>
            <div className="text-text-muted mb-2 text-xs">{latestWeekly.dateRange}</div>
            <ul className="mb-3 space-y-1">
              {latestWeekly.accomplishments.slice(0, 3).map(a => (
                <li key={a} className="text-text-secondary relative pl-3 text-sm">
                  <span className="absolute left-0">•</span>
                  {a}
                </li>
              ))}
            </ul>
            <Link
              href="/summaries"
              className="text-accent-violet inline-flex items-center gap-1 text-sm"
            >
              Read More <ChevronRight size={14} />
            </Link>
          </div>
          <div className="glass-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-accent-teal" />
              <h3 className="text-base font-semibold">Latest Monthly Summary</h3>
            </div>
            <div className="text-text-muted mb-2 text-xs">{latestMonthly.month}</div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {latestMonthly.overview.slice(0, 200)}...
            </p>
            <Link
              href="/summaries"
              className="text-accent-violet mt-3 inline-flex items-center gap-1 text-sm"
            >
              Read More <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
