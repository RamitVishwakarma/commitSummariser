import { RefreshCw, Bell } from "lucide-react";

export function TopBar({ title }: { title: string }) {
  return (
    <div
      className="flex items-center justify-between px-8 h-16 sticky top-0 z-10"
      style={{
        background: "rgba(10,18,20,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(45,212,191,0.08)",
      }}
    >
      <h1 style={{ color: "var(--text-primary)", fontSize: 20, fontWeight: 600 }}>{title}</h1>
      <div className="flex items-center gap-3">
        <span style={{ color: "var(--text-muted)", fontSize: 13 }}>April 4, 2026</span>
        <button className="btn-secondary flex items-center gap-2" style={{ padding: "6px 14px", fontSize: 13 }}>
          <RefreshCw size={14} /> Sync Now
        </button>
        <button className="btn-ghost relative">
          <Bell size={18} />
          <span
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
            style={{ background: "var(--accent-violet)" }}
          />
        </button>
      </div>
    </div>
  );
}
