"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { WeeklySummaryCard } from "./WeeklySummaryCard";
import { MonthlySummaryCard } from "./MonthlySummaryCard";
import { YearlySummaryCard } from "./YearlySummaryCard";

import type { weeklySummaries, monthlySummaries, yearlySummary } from "@/lib/mock";

type Tab = "weekly" | "monthly" | "yearly";

interface SummariesClientProps {
  weeklySummaries: typeof weeklySummaries;
  monthlySummaries: typeof monthlySummaries;
  yearlySummary: typeof yearlySummary;
}

export function SummariesClient({
  weeklySummaries,
  monthlySummaries,
  yearlySummary,
}: SummariesClientProps): React.JSX.Element {
  const [tab, setTab] = useState<Tab>("weekly");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(
    new Set(weeklySummaries[0] ? [weeklySummaries[0].id] : []),
  );

  const toggleCard = (id: string) => {
    const next = new Set(expandedCards);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedCards(next);
  };

  return (
    <div className="mx-auto max-w-300 p-8">
      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-[rgba(255,255,255,0.06)] pb-px">
        {(["weekly", "monthly", "yearly"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 text-[14px] font-medium transition-all relative",
              tab === t ? "text-white" : "text-text-secondary hover:text-white",
            )}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {tab === t && (
              <div className="bg-accent-violet absolute right-0 bottom-0 left-0 h-[2px]" />
            )}
          </button>
        ))}
      </div>

      {tab === "weekly" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {weeklySummaries.map(s => (
            <WeeklySummaryCard
              key={s.id}
              summary={s}
              isExpanded={expandedCards.has(s.id)}
              onToggle={toggleCard}
            />
          ))}
        </div>
      )}

      {tab === "monthly" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-4">
          {monthlySummaries.map(s => (
            <MonthlySummaryCard key={s.id} summary={s} />
          ))}
        </div>
      )}

      {tab === "yearly" && <YearlySummaryCard summary={yearlySummary} />}
    </div>
  );
}
