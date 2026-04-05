"use client";

import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants/landing";

const INITIAL = { opacity: 0, y: 20 };
const IN_VIEW = { opacity: 1, y: 0 };
const VIEWPORT = { once: true };
const STEP_TRANSITIONS = STEPS.map((_, i): { delay: number } => ({ delay: i * 0.15 }));

export function StepsSection() {
  return (
    <section className="py-24 bg-[rgba(255,255,255,0.02)]">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-center mb-16 text-3xl font-bold">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={INITIAL}
              whileInView={IN_VIEW}
              viewport={VIEWPORT}
              transition={STEP_TRANSITIONS[i]!}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-4">
                <s.icon size={28} className="text-(--accent-violet)" />
              </div>
              <div className="pill mx-auto mb-3 text-(--accent-violet)">Step {i + 1}</div>
              <h3 className="text-lg font-semibold mb-1">{s.label}</h3>
              <p className="text-(--text-secondary) text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
