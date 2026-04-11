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

export function Sidebar(): React.JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 z-20 flex h-screen flex-col border-r border-border-teal-subtle bg-bg-overlay backdrop-blur-md transition-all duration-250 ease-in-out",
        isCollapsed ? "w-16" : "w-60",
      )}
    >
      <div className="flex h-16 items-center gap-2 p-4">
        <Activity size={24} className="text-accent-violet" />
        {!isCollapsed && (
          <span className="text-text-primary text-lg font-semibold">GitPulse</span>
        )}
      </div>

      <nav className="mt-2 flex flex-1 flex-col gap-1 px-2">
        {NAV_ITEMS.map(item => {
          const isActive = pathname?.startsWith(item.to) ?? false;
          return (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "relative flex items-center gap-3 rounded-lg border-l-[3px] py-2.5 transition-all duration-150",
                isCollapsed ? "justify-center px-0" : "justify-start px-3",
                isActive
                  ? "text-accent-violet border-l-accent-violet bg-bg-elevated"
                  : "text-text-secondary border-l-transparent bg-transparent",
              )}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 border-t border-border-subtle p-3">
        <div className="flex size-8 items-center justify-center rounded-full sidebar-gradient text-xs font-semibold text-bg-deep">
          R
        </div>
        {!isCollapsed && <span className="text-text-secondary text-sm">Ramit</span>}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="text-text-secondary border-border-glass bg-bg-elevated absolute top-20 -right-3 flex size-6 items-center justify-center rounded-full border"
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
