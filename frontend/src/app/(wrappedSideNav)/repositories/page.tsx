"use client";

import { useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/layout/top-bar";
import { repos } from "@/lib/mock";
import { Search, Plus, Circle } from "lucide-react";

export default function RepositoriesPage() {
  const [search, setSearch] = useState("");
  const filtered = repos.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 min-h-screen overflow-y-auto">
      <TopBar title="Repositories" />
      <div className="p-8 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              className="glass-input w-full pl-10"
              placeholder="Search repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-primary flex items-center gap-2" style={{ fontSize: 13 }}>
            <Plus size={14} /> Add Repository
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <Link key={r.id} href={`/repositories/${r.id}`} className="glass-card glass-card-hover p-5 block">
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{r.name}</h3>
              <div className="pill inline-flex mb-3" style={{ fontSize: 11 }}>
                <Circle size={8} fill={r.langColor} style={{ color: r.langColor }} /> {r.language}
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 12 }}>
                {r.description}
              </p>
              <div
                className="flex items-center justify-between"
                style={{ fontSize: 12, color: "var(--text-muted)" }}
              >
                <span>{r.commits} commits</span>
                <span>{r.lastCommit}</span>
                <span
                  className="pill"
                  style={{
                    fontSize: 10,
                    color: r.status === "active" ? "var(--accent-teal)" : "var(--text-muted)",
                    borderColor: r.status === "active" ? "rgba(45,212,191,0.3)" : undefined,
                  }}
                >
                  {r.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
