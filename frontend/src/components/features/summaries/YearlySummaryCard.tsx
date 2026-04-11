import { Sparkles, Download, RefreshCw, BarChart } from "lucide-react";

export interface YearlySummary {
  year: string;
  totalCommits: number;
  reposActive: number;
  weeksSummarised: number;
  longestStreak: number;
  narrative: string;
  skills: Record<string, number>;
}

interface YearlySummaryCardProps {
  summary: YearlySummary;
}

export function YearlySummaryCard({ summary: s }: YearlySummaryCardProps): React.JSX.Element {
  return (
    <div className="glass-card p-8">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={24} className="text-accent-amber" />
        <h3 className="text-3xl font-bold text-white">{s.year} Year in Review</h3>
      </div>
      <p className="text-text-secondary mb-6 text-base leading-relaxed">{s.narrative}</p>
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="bg-bg-hover-subtle p-4 rounded-lg">
          <div className="text-text-secondary text-xs">Total Commits</div>
          <div className="text-xl font-semibold">{s.totalCommits}</div>
        </div>
        <div className="bg-bg-hover-subtle p-4 rounded-lg">
          <div className="text-text-secondary text-xs">Repos Contributed</div>
          <div className="text-xl font-semibold">{s.reposActive}</div>
        </div>
        <div className="bg-bg-teal-faint p-4 rounded-lg">
          <div className="text-text-secondary text-xs">Weeks Summarized</div>
          <div className="text-accent-teal text-xl font-semibold">
            {s.weeksSummarised}
          </div>
        </div>
        <div className="bg-bg-rose-faint p-4 rounded-lg">
          <div className="text-text-secondary text-xs">Longest Streak</div>
          <div className="text-accent-rose text-xl font-semibold">
            {s.longestStreak}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="text-text-secondary mb-2 text-sm font-semibold">Skills breakdown</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(s.skills).map(([skill, val]) => (
            <span key={skill} className="pill text-xs">
              {skill} ({val})
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button className="btn-primary flex items-center gap-2">
          <Download size={14} /> Export PDF Report
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <BarChart size={14} /> View Analytics
        </button>
        <button className="btn-ghost flex items-center gap-2">
          <RefreshCw size={14} /> Regenerate
        </button>
      </div>
    </div>
  );
}
