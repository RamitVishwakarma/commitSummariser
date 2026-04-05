"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCard {
  label: "Weekly" | "Monthly" | "Yearly";
  range: string;
  text: string;
}

const SUMMARY_CARDS: SummaryCard[] = [
  {
    label: "Weekly",
    range: "Mar 31 – Apr 4, 2026",
    text: "Implemented glassmorphism design system. Added JWT refresh token rotation. Created shared Button component variants. 24 commits across 4 repositories.",
  },
  {
    label: "Monthly",
    range: "March 2026",
    text: "A month of deep infrastructure and frontend work. Major milestones included the design system launch, ML pipeline NLP capabilities, and API gateway security hardening. 112 commits, 5 repos active.",
  },
  {
    label: "Yearly",
    range: "2026",
    text: "Q1 marked a shift towards full-stack development and developer tooling. Growing expertise in distributed systems, data science, and infrastructure automation. 1,247 commits across 6 repositories.",
  },
];

const INITIAL = { opacity: 0, y: 30 };
const IN_VIEW = { opacity: 1, y: 0 };
const VIEWPORT = { once: true };
const CARD_TRANSITIONS = SUMMARY_CARDS.map((_, i): { delay: number } => ({ delay: i * 0.15 }));
const CARD_OFFSET_CLASSES = ["translate-y-0", "translate-y-3", "translate-y-6"] as const;
const SUMMARY_COLOR_CLASSES = {
  Weekly: "text-accent-violet",
  Monthly: "text-accent-teal",
  Yearly: "text-accent-amber",
} as const;

export function SummarySection(): React.JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <h2 className="mb-16 text-center text-3xl font-bold">Summaries that write themselves</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SUMMARY_CARDS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={INITIAL}
            whileInView={IN_VIEW}
            viewport={VIEWPORT}
            transition={CARD_TRANSITIONS[i] ?? { delay: 0 }}
            className={cn("glass-card p-6", CARD_OFFSET_CLASSES[i] ?? "translate-y-0")}
          >
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={14} className={SUMMARY_COLOR_CLASSES[s.label]} />
              <span className={cn("text-xs font-semibold", SUMMARY_COLOR_CLASSES[s.label])}>
                {s.label}
              </span>
            </div>
            <h3 className="mb-1 text-base font-semibold">{s.range}</h3>
            <p className="text-text-secondary text-[13px] leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
