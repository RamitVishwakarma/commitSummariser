"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants/landing";

const INITIAL = { opacity: 0, y: 30 };
const IN_VIEW = { opacity: 1, y: 0 };
const VIEWPORT = { once: true };
const FEATURE_TRANSITIONS = FEATURES.map((_, i): { delay: number } => ({ delay: i * 0.1 }));

export function FeaturesSection() {
  return (
    <section id="features" className="max-w-[1280px] mx-auto px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold">Everything you need to track your impact</h2>
        <p className="text-(--text-secondary) text-base mt-2">
          Six powerful features, zero manual effort
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={INITIAL}
            whileInView={IN_VIEW}
            viewport={VIEWPORT}
            transition={FEATURE_TRANSITIONS[i]!}
            className="glass-card glass-card-hover p-6 cursor-default"
          >
            <div
              className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-4"
              style={{ background: `${f.color}20` }}
            >
              <f.icon size={24} style={{ color: f.color }} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-(--text-secondary) text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
