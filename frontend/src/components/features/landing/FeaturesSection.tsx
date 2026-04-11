"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants/landing";
import { cn } from "@/lib/utils";

const INITIAL = { opacity: 0, y: 30 };
const IN_VIEW = { opacity: 1, y: 0 };
const VIEWPORT = { once: true };
const FEATURE_TRANSITIONS = FEATURES.map((_, i): { delay: number } => ({ delay: i * 0.1 }));

export function FeaturesSection(): React.JSX.Element {
  const getFeatureColorClasses = (title: string): { bg: string; icon: string } => {
    if (title === "Every commit, captured automatically") {
      return { bg: "bg-bg-teal-glass", icon: "text-accent-teal" };
    }

    if (title === "Organised by repo, enriched with metadata") {
      return { bg: "bg-bg-blue-glass", icon: "text-accent-blue" };
    }

    if (title === "Remove the noise") {
      return { bg: "bg-bg-rose-glass", icon: "text-accent-rose" };
    }

    if (title === "Take your data anywhere") {
      return { bg: "bg-bg-blue-glass", icon: "text-accent-blue" };
    }

    return { bg: "bg-bg-teal-glass", icon: "text-accent-teal" };
  };

  return (
    <section id="features" className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold">Everything you need to track your impact</h2>
        <p className="text-text-secondary mt-2 text-base">
          Six powerful features, zero manual effort
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={INITIAL}
            whileInView={IN_VIEW}
            viewport={VIEWPORT}
            transition={FEATURE_TRANSITIONS[i] ?? { delay: 0 }}
            className="glass-card glass-card-hover cursor-default p-6"
          >
            <div
              className={cn(
                "mb-4 flex size-12 items-center justify-center rounded-xl",
                getFeatureColorClasses(f.title).bg,
              )}
            >
              <f.icon size={24} className={getFeatureColorClasses(f.title).icon} />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
