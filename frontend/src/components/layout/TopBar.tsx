import { RefreshCw, Bell } from "lucide-react";

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps): React.JSX.Element {
  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border-teal-subtle bg-bg-overlay-strong px-8 backdrop-blur-md">
      <h1 className="text-text-primary text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-text-muted text-sm">April 4, 2026</span>
        <button className="btn-secondary flex items-center gap-2 px-3.5 py-1.5 text-sm">
          <RefreshCw size={14} /> Sync Now
        </button>
        <button className="btn-ghost relative">
          <Bell size={18} />
          <span className="bg-accent-violet absolute -top-1 -right-1 size-2 rounded-full" />
        </button>
      </div>
    </div>
  );
}
