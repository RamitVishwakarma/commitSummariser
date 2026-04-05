"use client";

import Link from "next/link";
import {
  GitCommit,
  FolderGit2,
  Trash2,
  Sparkles,
  Download,
  TrendingUp,
  GitBranch,
  ChevronDown,
  Activity,
  Clock,
  CheckSquare,
  BarChart3,
} from "lucide-react";
import { Background } from "@/components/layout/background";
import { motion } from "framer-motion";

const features = [
  {
    icon: GitCommit,
    color: "#2DD4BF",
    title: "Every commit, captured automatically",
    desc: "A background job runs daily, pulling every commit you've pushed across all your tracked repositories. No manual logging. No context-switching.",
  },
  {
    icon: FolderGit2,
    color: "#38BDF8",
    title: "Organised by repo, enriched with metadata",
    desc: "Each repository gets its own profile — language, description, last active date, commit count. Drill into any repo to see its full commit history.",
  },
  {
    icon: Trash2,
    color: "#F43F5E",
    title: "Remove the noise",
    desc: "Typo fix. Merge conflicts. Accidental pushes. Flag or delete commits that don't represent real work, so your summaries stay meaningful.",
  },
  {
    icon: Sparkles,
    color: "#2DD4BF",
    title: "Weekly, monthly, and yearly — summarised by AI",
    desc: "GitPulse generates structured summaries of your work at three cadences. What you built, what you improved, what you explored — all in natural language.",
  },
  {
    icon: Download,
    color: "#38BDF8",
    title: "Take your data anywhere",
    desc: "Download your monthly commit data as JSON or CSV, bundled with a ready-made LLM prompt so you can regenerate or customise summaries in your own tools.",
  },
  {
    icon: TrendingUp,
    color: "#2DD4BF",
    title: "See your year in code",
    desc: "Yearly reviews map your technical exposure — backend, frontend, infrastructure, databases, DevOps. See how your skills evolve across quarters.",
  },
];

const steps = [
  { icon: GitBranch, label: "Connect GitHub", desc: "Add your personal access token or connect via OAuth." },
  { icon: CheckSquare, label: "Track Repos", desc: "Select which repositories to monitor." },
  { icon: Clock, label: "Sit Back", desc: "GitPulse fetches commits daily and generates summaries on schedule." },
  { icon: BarChart3, label: "Review & Grow", desc: "Read your summaries, export reports, and track your growth." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen relative" style={{ color: "var(--text-primary)" }}>
      <Background />
      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between px-8 py-4 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2">
            <Activity size={24} style={{ color: "var(--accent-violet)" }} />
            <span style={{ fontSize: 20, fontWeight: 700 }}>GitPulse</span>
          </div>
          <Link href="/dashboard" className="btn-primary" style={{ fontSize: 14, padding: "8px 20px" }}>
            Dashboard
          </Link>
        </nav>

        {/* Hero */}
        <section className="flex flex-col items-center text-center px-6 pt-24 pb-32 max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="pill mb-6 inline-flex"
              style={{ color: "var(--accent-teal)", borderColor: "rgba(45,212,191,0.3)" }}
            >
              <Sparkles size={12} /> For developers who ship
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 800 }}
          >
            Your commits tell a story.{" "}
            <span style={{ color: "var(--accent-violet)" }}>GitPulse</span> reads it.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-[600px]"
            style={{ color: "var(--text-secondary)", fontSize: 18, lineHeight: 1.6 }}
          >
            Automatic daily commit tracking, AI-powered weekly and monthly summaries, and a yearly map of your
            growth — all on autopilot.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 mt-10"
          >
            <Link href="/dashboard" className="btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>
              Get Started
            </Link>
            <a href="#features" className="btn-ghost" style={{ color: "var(--accent-violet)", fontSize: 14 }}>
              See how it works <ChevronDown size={14} className="inline ml-1" />
            </a>
          </motion.div>

          {/* Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="glass-card mt-20 w-full max-w-[900px] p-6 overflow-hidden"
            style={{ transform: "perspective(1000px) rotateX(2deg)" }}
          >
            <div className="grid grid-cols-4 gap-3 mb-4">
              {["6 Repos", "24 Commits", "8 Summaries", "2h ago"].map((s, i) => (
                <div key={i} className="glass-card p-3 text-center">
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                    {["Tracked", "This Week", "Generated", "Last Sync"][i]}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>{s}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="glass-card flex-1 p-4">
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>
                  Today's Commits
                </div>
                {["feat: add glassmorphism theme", "fix: sidebar animation", "refactor: extract components"].map(
                  (m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 py-1.5"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <span className="mono" style={{ fontSize: 11, color: "var(--accent-violet)" }}>
                        a3f7b{i}c
                      </span>
                      <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{m}</span>
                    </div>
                  ),
                )}
              </div>
              <div className="glass-card w-[240px] p-4">
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>
                  Weekly Summary
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Sparkles size={12} style={{ color: "var(--accent-amber)" }} />
                  <span style={{ fontSize: 11, color: "var(--accent-teal)" }}>AI Generated</span>
                </div>
                <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  Significant progress on frontend design system and backend security. Glassmorphism theme fully
                  integrated...
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-[1280px] mx-auto px-8 py-24">
          <div className="text-center mb-16">
            <h2 style={{ fontSize: 32, fontWeight: 700 }}>Everything you need to track your impact</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 16, marginTop: 8 }}>
              Six powerful features, zero manual effort
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card glass-card-hover p-6 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-4"
                  style={{ background: `${f.color}20` }}
                >
                  <f.icon size={24} style={{ color: f.color }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="max-w-[1280px] mx-auto px-8">
            <h2 className="text-center mb-16" style={{ fontSize: 32, fontWeight: 700 }}>
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-4">
                    <s.icon size={28} style={{ color: "var(--accent-violet)" }} />
                  </div>
                  <div className="pill mx-auto mb-3" style={{ color: "var(--accent-violet)" }}>
                    Step {i + 1}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{s.label}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Summary Preview */}
        <section className="max-w-[1280px] mx-auto px-8 py-24">
          <h2 className="text-center mb-16" style={{ fontSize: 32, fontWeight: 700 }}>
            Summaries that write themselves
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
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
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6"
                style={{ transform: `translateY(${i * 12}px)` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} style={{ color: s.color }} />
                  <span style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.label}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{s.range}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6 }}>{s.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-24">
          <h2 style={{ fontSize: 36, fontWeight: 700 }}>Start tracking your impact today.</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, marginTop: 8 }}>
            Self-hosted. Private. Yours.
          </p>
          <Link
            href="/dashboard"
            className="btn-primary inline-block mt-8"
            style={{ padding: "14px 32px", fontSize: 16 }}
          >
            Get Started
          </Link>
          <div className="mt-4">
            <a
              href="#"
              className="btn-ghost inline-flex items-center gap-1"
              style={{ color: "var(--accent-violet)", fontSize: 14 }}
            >
              <GitBranch size={14} /> View on GitHub
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-6 text-center"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "var(--text-muted)",
            fontSize: 13,
          }}
        >
          Built by Ramit &middot;{" "}
          <a href="#" style={{ color: "var(--accent-violet)" }}>
            GitHub
          </a>{" "}
          &middot;{" "}
          <a href="#" style={{ color: "var(--accent-violet)" }}>
            Star on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}
