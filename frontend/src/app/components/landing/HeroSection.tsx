"use client";

import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const PILL_ANIM = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };
const HEADLINE_ANIM = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 } };
const SUBTEXT_ANIM = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3 } };
const BTNS_ANIM = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.5 } };
const MOCK_ANIM = { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.7 } };

const MOCK_STATS = ["6 Repos", "24 Commits", "8 Summaries", "2h ago"] as const;
const MOCK_STAT_LABELS = ["Tracked", "This Week", "Generated", "Last Sync"] as const;
const MOCK_COMMITS = [
  "feat: add glassmorphism theme",
  "fix: sidebar animation",
  "refactor: extract components",
] as const;

const PILL_BORDER_STYLE = { borderColor: "rgba(45,212,191,0.3)" };

export function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center px-6 pt-24 pb-32 max-w-[1280px] mx-auto">
      <motion.div {...PILL_ANIM}>
        <span className="pill mb-6 inline-flex text-(--accent-teal)" style={PILL_BORDER_STYLE}>
          <Sparkles size={12} /> For developers who ship
        </span>
      </motion.div>
      <motion.h1
        {...HEADLINE_ANIM}
        className="text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] max-w-[800px]"
      >
        Your commits tell a story.{" "}
        <span className="text-(--accent-violet)">GitPulse</span> reads it.
      </motion.h1>
      <motion.p
        {...SUBTEXT_ANIM}
        className="mt-6 max-w-[600px] text-(--text-secondary) text-lg leading-relaxed"
      >
        Automatic daily commit tracking, AI-powered weekly and monthly summaries, and a yearly map of your
        growth — all on autopilot.
      </motion.p>
      <motion.div {...BTNS_ANIM} className="flex items-center gap-4 mt-10">
        <Link href="/dashboard" className="btn-primary !py-[14px] !px-8 text-base">
          Get Started
        </Link>
        <a href="#features" className="btn-ghost text-(--accent-violet) text-sm">
          See how it works <ChevronDown size={14} className="inline ml-1" />
        </a>
      </motion.div>

      {/* Dashboard Mock */}
      <motion.div
        {...MOCK_ANIM}
        className="glass-card mt-20 w-full max-w-[900px] p-6 overflow-hidden [transform:perspective(1000px)_rotateX(2deg)]"
      >
        <div className="grid grid-cols-4 gap-3 mb-4">
          {MOCK_STATS.map((s, i) => (
            <div key={s} className="glass-card p-3 text-center">
              <div className="text-[10px] text-(--text-muted)">{MOCK_STAT_LABELS[i]}</div>
              <div className="text-lg font-semibold text-(--text-primary)">{s}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="glass-card flex-1 p-4">
            <div className="text-xs text-(--text-secondary) mb-2">Today's Commits</div>
            {MOCK_COMMITS.map((m, i) => (
              <div
                key={m}
                className="flex items-center gap-2 py-1.5 border-b border-[rgba(255,255,255,0.04)]"
              >
                <span className="mono text-[11px] text-(--accent-violet)">a3f7b{i}c</span>
                <span className="text-xs text-(--text-secondary)">{m}</span>
              </div>
            ))}
          </div>
          <div className="glass-card w-[240px] p-4">
            <div className="text-xs text-(--text-secondary) mb-2">Weekly Summary</div>
            <div className="flex items-center gap-1 mb-2">
              <Sparkles size={12} className="text-(--accent-amber)" />
              <span className="text-[11px] text-(--accent-teal)">AI Generated</span>
            </div>
            <p className="text-[11px] text-(--text-muted) leading-relaxed">
              Significant progress on frontend design system and backend security. Glassmorphism theme fully
              integrated...
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
