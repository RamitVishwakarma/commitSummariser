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
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
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
      className="h-screen sticky top-0 flex flex-col transition-all duration-250 ease-in-out z-20 backdrop-blur-md border-r border-[rgba(45,212,191,0.08)] bg-[rgba(10,18,20,0.6)]"
      style={{ width: collapsed ? 64 : 240 }}
    >
      <div className="flex items-center gap-2 p-4 h-16">
        <Activity size={24} className="text-(--accent-violet)" />
        {!collapsed && (
          <span className="text-[18px] font-semibold text-(--text-primary)">GitPulse</span>
        )}
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-2 mt-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname?.startsWith(item.to) ?? false;
          return (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "flex items-center gap-3 rounded-[10px] transition-all duration-150 relative py-2.5 border-l-[3px]",
                collapsed ? "px-0 justify-center" : "px-3 justify-start",
                active
                  ? "bg-(--bg-elevated) text-(--accent-violet) border-l-(--accent-violet)"
                  : "bg-transparent text-(--text-secondary) border-l-transparent",
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 flex items-center gap-2 border-t border-[rgba(255,255,255,0.08)]">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-[#0a1214] bg-[linear-gradient(135deg,#1a8a7d,#2DD4BF)]">
          R
        </div>
        {!collapsed && (
          <span className="text-[13px] text-(--text-secondary)">Ramit</span>
        )}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center bg-(--bg-elevated) border border-(--border-glass) text-(--text-secondary)"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
