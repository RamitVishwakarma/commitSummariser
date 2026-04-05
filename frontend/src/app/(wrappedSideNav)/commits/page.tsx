"use client";

import { useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/layout/top-bar";
import { allCommits } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { Search, Eye, Flag, Trash2, RotateCcw } from "lucide-react";

type Status = "all" | "clean" | "flagged" | "deleted";

export default function CommitsPage(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = allCommits.filter(c => {
    if (search && !c.message.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const statuses: Status[] = ["all", "clean", "flagged", "deleted"];

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Commits" />
      <div className="mx-auto max-w-[1200px] space-y-4 p-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search
              size={16}
              className="text-text-muted absolute top-1/2 left-3 -translate-y-1/2"
            />
            <input
              className="glass-input w-full pl-10"
              placeholder="Search commit messages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "pill cursor-pointer transition-all",
                  statusFilter === s
                    ? "bg-accent-violet border-accent-violet text-white"
                    : "text-text-secondary",
                )}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="glass-table w-full">
            <thead>
              <tr>
                <th className="w-8"></th>
                <th>Hash</th>
                <th>Repository</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.has(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="accent-violet-500"
                    />
                  </td>
                  <td>
                    <span className="mono text-accent-violet text-[12px]">{c.hash}</span>
                  </td>
                  <td>
                    <Link
                      href={`/repositories/${c.repoId}`}
                      className="text-accent-blue text-[13px]"
                    >
                      {c.repo}
                    </Link>
                  </td>
                  <td className="text-text-secondary text-[13px]">{c.message}</td>
                  <td className="text-text-muted text-[12px]">{c.time}</td>
                  <td>
                    <span
                      className={cn(
                        "pill text-[10px]",
                        c.status === "clean" && "text-accent-teal border-[rgba(45,212,191,0.3)]",
                        c.status === "flagged" && "text-accent-amber border-[rgba(245,158,11,0.3)]",
                        c.status === "deleted" && "text-accent-rose border-[rgba(244,63,94,0.3)]",
                      )}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn-ghost p-1">
                        <Eye size={14} />
                      </button>
                      <button className="text-accent-amber btn-ghost p-1">
                        <Flag size={14} />
                      </button>
                      <button className="text-accent-rose btn-ghost p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div className="glass-card fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 bg-[rgba(255,255,255,0.12)] px-6 py-3 backdrop-blur-[24px]">
            <span className="text-[13px]">{selected.size} selected</span>
            <button className="text-accent-rose btn-ghost flex items-center gap-1 text-[13px]">
              <Trash2 size={14} /> Delete
            </button>
            <button className="text-accent-amber btn-ghost flex items-center gap-1 text-[13px]">
              <Flag size={14} /> Flag
            </button>
            <button className="text-accent-teal btn-ghost flex items-center gap-1 text-[13px]">
              <RotateCcw size={14} /> Restore
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
