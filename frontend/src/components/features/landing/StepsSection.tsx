"use client";

import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants/landing";

const INITIAL = { opacity: 0, y: 20 };
const IN_VIEW = { opacity: 1, y: 0 };
const VIEWPORT = { once: true };
const STEP_TRANSITIONS = STEPS.map((_, i): { delay: number } => ({ delay: i * 0.15 }));

export function StepsSection(): React.JSX.Element {
  return (
    <section className="bg-bg-faint-overlay py-24">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 text-center text-3xl font-bold">How it works</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={INITIAL}
              whileInView={IN_VIEW}
              viewport={VIEWPORT}
              transition={STEP_TRANSITIONS[i] ?? { delay: 0 }}
              className="text-center"
            >
              <div className="glass-card mx-auto mb-4 flex size-16 items-center justify-center rounded-full">
                <s.icon size={28} className="text-accent-violet" />
              </div>
              <div className="pill text-accent-violet mx-auto mb-3">Step {i + 1}</div>
              <h3 className="mb-1 text-lg font-semibold">{s.label}</h3>
              <p className="text-text-secondary text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
