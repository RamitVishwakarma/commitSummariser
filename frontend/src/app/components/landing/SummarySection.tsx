"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SummaryCard {
  label: string;
  range: string;
  color: string;
  text: string;
}

const SUMMARY_CARDS: SummaryCard[] = [
  {
    label: "Weekly",
    range: "Mar 31 – Apr 4, 2026",
    color: "var(--accent-violet)",
    text: "Implemented glassmorphism design system. Added JWT refresh token rotation. Created shared Button component variants. 24 commits across 4 repositories.",
  },
  {
    label: "Monthly",
    range: "March 2026",
    color: "var(--accent-teal)",
    text: "A month of deep infrastructure and frontend work. Major milestones included the design system launch, ML pipeline NLP capabilities, and API gateway security hardening. 112 commits, 5 repos active.",
  },
  {
    label: "Yearly",
    range: "2026",
    color: "var(--accent-amber)",
    text: "Q1 marked a shift towards full-stack development and developer tooling. Growing expertise in distributed systems, data science, and infrastructure automation. 1,247 commits across 6 repositories.",
  },
];

const INITIAL = { opacity: 0, y: 30 };
const IN_VIEW = { opacity: 1, y: 0 };
const VIEWPORT = { once: true };
const CARD_TRANSITIONS = SUMMARY_CARDS.map((_, i): { delay: number } => ({ delay: i * 0.15 }));
const CARD_OFFSETS = [0, 12, 24] as const;

export function SummarySection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-center mb-16 text-3xl font-bold">Summaries that write themselves</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUMMARY_CARDS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={INITIAL}
            whileInView={IN_VIEW}
            viewport={VIEWPORT}
            transition={CARD_TRANSITIONS[i]!}
            className="glass-card p-6"
            style={{ transform: `translateY(${CARD_OFFSETS[i]}px)` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} style={{ color: s.color }} />
              <span className="text-xs font-semibold" style={{ color: s.color }}>{s.label}</span>
            </div>
            <h3 className="text-base font-semibold mb-1">{s.range}</h3>
            <p className="text-(--text-secondary) text-[13px] leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
