"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderGit2,
  GitCommit,
  FileText,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/repositories", icon: FolderGit2, label: "Repositories" },
  { to: "/commits", icon: GitCommit, label: "Commits" },
  { to: "/summaries", icon: FileText, label: "Summaries" },
  { to: "/export", icon: Download, label: "Export" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className="h-screen sticky top-0 flex flex-col transition-all duration-250 ease-in-out z-20"
      style={{
        width: collapsed ? 64 : 240,
        background: "rgba(10,18,20,0.6)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(45,212,191,0.08)",
      }}
    >
      <div className="flex items-center gap-2 p-4 h-16">
        <Activity size={24} style={{ color: "var(--accent-violet)" }} />
        {!collapsed && (
          <span className="text-[18px]" style={{ color: "var(--text-primary)", fontWeight: 600 }}>
            GitPulse
          </span>
        )}
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-2 mt-2">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.to) ?? false;
          return (
            <Link
              key={item.to}
              href={item.to}
              className="flex items-center gap-3 rounded-[10px] transition-all duration-150 relative"
              style={{
                padding: collapsed ? "10px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                background: active ? "var(--bg-elevated)" : "transparent",
                color: active ? "var(--accent-violet)" : "var(--text-secondary)",
                borderLeft: active ? "3px solid var(--accent-violet)" : "3px solid transparent",
              }}
            >
              <item.icon size={20} />
              {!collapsed && <span style={{ fontSize: 14 }}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div
        className="p-3 flex items-center gap-2 border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #1a8a7d, #2DD4BF)",
            fontSize: 12,
            color: "#0a1214",
            fontWeight: 600,
          }}
        >
          R
        </div>
        {!collapsed && (
          <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>Ramit</span>
        )}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-glass)",
          color: "var(--text-secondary)",
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
