import { Sparkles, Download, RefreshCw } from "lucide-react";

interface MonthlySummary {
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
  );
}
