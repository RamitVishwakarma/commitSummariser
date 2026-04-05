"use client";

import { useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/layout/top-bar";
import { allCommits } from "@/lib/mock";
import { Search, Eye, Flag, Trash2, RotateCcw } from "lucide-react";

type Status = "all" | "clean" | "flagged" | "deleted";

export default function CommitsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = allCommits.filter((c) => {
    if (search && !c.message.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const statuses: Status[] = ["all", "clean", "flagged", "deleted"];

  return (
    <div className="flex-1 min-h-screen overflow-y-auto">
      <TopBar title="Commits" />
      <div className="p-8 max-w-[1200px] mx-auto space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              className="glass-input w-full pl-10"
              placeholder="Search commit messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="pill cursor-pointer transition-all"
                style={{
                  background: statusFilter === s ? "var(--accent-violet)" : undefined,
                  color: statusFilter === s ? "white" : "var(--text-secondary)",
                  borderColor: statusFilter === s ? "var(--accent-violet)" : undefined,
                }}
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
              {filtered.map((c) => (
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
                    <span className="mono" style={{ fontSize: 12, color: "var(--accent-violet)" }}>
                      {c.hash}
                    </span>
                  </td>
                  <td>
                    <Link href={`/repositories/${c.repoId}`} style={{ fontSize: 13, color: "var(--accent-blue)" }}>
                      {c.repo}
                    </Link>
                  </td>
                  <td style={{ fontSize: 13, color: "var(--text-secondary)" }}>{c.message}</td>
                  <td style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.time}</td>
                  <td>
                    <span
                      className="pill"
                      style={{
                        fontSize: 10,
                        color:
                          c.status === "clean"
                            ? "var(--accent-teal)"
                            : c.status === "flagged"
                              ? "var(--accent-amber)"
                              : "var(--accent-rose)",
                        borderColor:
                          c.status === "clean"
                            ? "rgba(45,212,191,0.3)"
                            : c.status === "flagged"
                              ? "rgba(245,158,11,0.3)"
                              : "rgba(244,63,94,0.3)",
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn-ghost p-1">
                        <Eye size={14} />
                      </button>
                      <button className="btn-ghost p-1" style={{ color: "var(--accent-amber)" }}>
                        <Flag size={14} />
                      </button>
                      <button className="btn-ghost p-1" style={{ color: "var(--accent-rose)" }}>
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
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-3 flex items-center gap-4 z-30"
            style={{ backdropFilter: "blur(24px)", background: "rgba(255,255,255,0.12)" }}
          >
            <span style={{ fontSize: 13 }}>{selected.size} selected</span>
            <button
              className="btn-ghost flex items-center gap-1"
              style={{ color: "var(--accent-rose)", fontSize: 13 }}
            >
              <Trash2 size={14} /> Delete
            </button>
            <button
              className="btn-ghost flex items-center gap-1"
              style={{ color: "var(--accent-amber)", fontSize: 13 }}
            >
              <Flag size={14} /> Flag
            </button>
            <button
              className="btn-ghost flex items-center gap-1"
              style={{ color: "var(--accent-teal)", fontSize: 13 }}
            >
              <RotateCcw size={14} /> Restore
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
