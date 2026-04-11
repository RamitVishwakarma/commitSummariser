import { Sparkles, Download, Trash2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

export interface WeeklySummary {
  id: string;
  dateRange: string;
  generated: string;
  accomplishments: string[];
  reposActive: string[];
  commitsProcessed: number;
  notable: string;
}

interface WeeklySummaryCardProps {
  summary: WeeklySummary;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

export function WeeklySummaryCard({ summary: s, isExpanded, onToggle }: WeeklySummaryCardProps): React.JSX.Element {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent-violet" />
            <h3 className="text-lg font-semibold">{s.dateRange}</h3>
          </div>
          <span className="text-text-muted text-2xs">Generated {s.generated}</span>
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
        <div className="text-text-secondary mb-1.5 text-xs font-semibold">
          Key Accomplishments
        </div>
        <ul className="space-y-1">
          {s.accomplishments.slice(0, isExpanded ? undefined : 3).map(a => (
            <li key={a} className="text-text-secondary relative pl-3 text-sm">
              <span className="absolute left-0">•</span>
              {a}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          {s.reposActive.map(r => (
            <span key={r} className="pill text-2xs">
              {r}
            </span>
          ))}
        </div>
        <div className="text-text-muted mt-3 text-xs">
          {s.commitsProcessed} commits processed
        </div>
        {isExpanded && (
          <div className="mt-3">
            <div className="text-text-secondary mb-1 text-xs font-semibold">
              Notable Changes
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">{s.notable}</p>
          </div>
        )}
        <button
          onClick={() => onToggle(s.id)}
          className="text-accent-violet btn-ghost mt-2 flex items-center gap-1 text-xs"
        >
          {isExpanded ? (
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
  );
}
