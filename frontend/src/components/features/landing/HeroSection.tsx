"use client";

import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const PILL_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};
const HEADLINE_ANIMATION = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.1 },
};
const SUBTEXT_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.3 },
};
const BUTTONS_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.5 },
};
const MOCK_ANIMATION = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.7 },
};

const MOCK_STATS = ["6 Repos", "24 Commits", "8 Summaries", "2h ago"] as const;
const MOCK_STAT_LABELS = ["Tracked", "This Week", "Generated", "Last Sync"] as const;
const MOCK_COMMITS = [
  "feat: add glassmorphism theme",
  "fix: sidebar animation",
  "refactor: extract components",
] as const;

export function HeroSection(): React.JSX.Element {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 pb-32 text-center">
      <motion.div {...PILL_ANIMATION}>
        <span className="pill pill-border-teal text-accent-teal mb-6 inline-flex">
          <Sparkles size={12} /> For developers who ship
        </span>
      </motion.div>
      <motion.h1
        {...HEADLINE_ANIMATION}
        className="max-w-3xl text-hero-heading font-bold"
      >
        Your commits tell a story. <span className="text-accent-violet">GitPulse</span> reads it.
      </motion.h1>
      <motion.p
        {...SUBTEXT_ANIMATION}
        className="text-text-secondary mt-6 max-w-xl text-lg leading-relaxed"
      >
        Automatic daily commit tracking, AI-powered weekly and monthly summaries, and a yearly map
        of your growth — all on autopilot.
      </motion.p>
      <motion.div {...BUTTONS_ANIMATION} className="mt-10 flex items-center gap-4">
        <Link href="/dashboard" className="btn-primary px-8 py-3.5 text-base">
          Get Started
        </Link>
        <a href="#features" className="btn-ghost text-accent-violet text-sm">
          See how it works <ChevronDown size={14} className="ml-1 inline" />
        </a>
      </motion.div>

      {/* Dashboard Mock */}
      <motion.div
        {...MOCK_ANIMATION}
        className="glass-card mt-20 w-full max-w-4xl [transform:perspective(1000px)_rotateX(2deg)] overflow-hidden p-6"
      >
        <div className="mb-4 grid grid-cols-4 gap-3">
          {MOCK_STATS.map((s, i) => (
            <div key={s} className="glass-card p-3 text-center">
              <div className="text-text-muted text-3xs">{MOCK_STAT_LABELS[i]}</div>
              <div className="text-text-primary text-lg font-semibold">{s}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="glass-card flex-1 p-4">
            <div className="text-text-secondary mb-2 text-xs">Today&apos;s Commits</div>
            {MOCK_COMMITS.map((m, i) => (
              <div
                key={m}
                className="flex items-center gap-2 border-b border-bg-hover-subtle py-1.5"
              >
                <span className="mono text-accent-violet text-2xs">a3f7b{i}c</span>
                <span className="text-text-secondary text-xs">{m}</span>
              </div>
            ))}
          </div>
          <div className="glass-card w-60 p-4">
            <div className="text-text-secondary mb-2 text-xs">Weekly Summary</div>
            <div className="mb-2 flex items-center gap-1">
              <Sparkles size={12} className="text-accent-amber" />
              <span className="text-accent-teal text-2xs">AI Generated</span>
            </div>
            <p className="text-text-muted text-2xs leading-relaxed">
              Significant progress on frontend design system and backend security. Glassmorphism
              theme fully integrated...
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
