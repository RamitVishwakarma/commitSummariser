import { Sparkles, Download, RefreshCw } from "lucide-react";

export interface MonthlySummary {
  id: string;
  month: string;
  overview: string;
  themes: string[];
  totalCommits: number;
  reposActive: number;
  busiestWeek: string;
}

interface MonthlySummaryCardProps {
  summary: MonthlySummary;
}

export function MonthlySummaryCard({ summary: s }: MonthlySummaryCardProps): React.JSX.Element {
  return (
    <div className="glass-card p-6">
      <div className="mb-1 flex items-center gap-2">
        <Sparkles size={16} className="text-accent-teal" />
        <h3 className="text-xl font-bold">{s.month}</h3>
      </div>
      <p className="text-text-secondary mb-3 text-sm leading-relaxed">{s.overview}</p>
      <div className="mb-3 flex flex-wrap gap-2">
        {s.themes.map(t => (
          <span
            key={t}
            className="text-accent-violet pill border-border-violet-subtle text-2xs"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="text-text-muted mb-3 flex gap-6 text-xs">
        <span>{s.totalCommits} commits</span>
        <span>{s.reposActive} repos active</span>
        <span>Busiest: {s.busiestWeek}</span>
      </div>
      <div className="flex gap-2">
        <button className="btn-primary flex items-center gap-2 px-4 py-2 text-xs">
          <Download size={12} /> Download Bundle
        </button>
        <button className="btn-ghost flex items-center gap-1 text-xs">
          <RefreshCw size={12} /> Regenerate
        </button>
      </div>
    </div>
  );
}
