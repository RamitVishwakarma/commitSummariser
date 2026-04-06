"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search, Plus, Circle } from "lucide-react";

interface Repo {
  id: string;
  name: string;
  description: string;
  language: string;
  langColor: string;
  commits: number;
  lastCommit: string;
  status: string;
}

interface RepositoryListProps {
  repos: Repo[];
}

export function RepositoryList({ repos }: RepositoryListProps): React.JSX.Element {
  const [search, setSearch] = useState("");
  const filtered = repos.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mx-auto max-w-300 p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-50 flex-1">
          <Search
            size={16}
            className="text-text-muted absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            className="glass-input w-full pl-10"
            placeholder="Search repositories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary flex items-center gap-2 text-[13px]">
          <Plus size={14} /> Add Repository
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(r => (
          <Link
            key={r.id}
            href={`/repositories/${r.id}`}
            className="glass-card glass-card-hover block p-5"
          >
            <h3 className="mb-1 text-[17px] font-semibold">{r.name}</h3>
            <div className="pill mb-3 inline-flex text-[11px]">
              <Circle size={8} fill={r.langColor} color={r.langColor} /> {r.language}
            </div>
            <p className="text-text-secondary mb-3 text-[13px] leading-[1.5]">{r.description}</p>
            <div className="text-text-muted flex items-center justify-between text-[12px]">
              <span>{r.commits} commits</span>
              <span>{r.lastCommit}</span>
              <span
                className={cn(
                  "pill text-[10px]",
                  r.status === "active"
                    ? "text-accent-teal border-[rgba(45,212,191,0.3)]"
                    : "text-text-muted",
                )}
              >
                {r.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
