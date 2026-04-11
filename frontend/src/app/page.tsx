import Link from "next/link";
import { Activity, GitBranch } from "lucide-react";
import { Background } from "@/components/layout/Background";
import { HeroSection } from "@/components/features/landing/HeroSection";
import { FeaturesSection } from "@/components/features/landing/FeaturesSection";
import { StepsSection } from "@/components/features/landing/StepsSection";
import { SummarySection } from "@/components/features/landing/SummarySection";

export default function LandingPage(): React.JSX.Element {
  return (
    <div className="text-text-primary relative min-h-screen">
      <Background />
      <div className="relative z-10">
        {/* Nav */}
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-2">
            <Activity size={24} className="text-accent-violet" />
            <span className="text-xl font-bold">GitPulse</span>
          </div>
          <Link href="/dashboard" className="btn-primary px-5 py-2 text-sm">
            Dashboard
          </Link>
        </nav>

        <HeroSection />
        <FeaturesSection />
        <StepsSection />
        <SummarySection />

        {/* CTA */}
        <section className="py-24 text-center">
          <h2 className="text-4xl font-bold">Start tracking your impact today.</h2>
          <p className="text-text-secondary mt-2 text-base">Self-hosted. Private. Yours.</p>
          <Link
            href="/dashboard"
            className="btn-primary mt-8 inline-block px-8 py-3.5 text-base"
          >
            Get Started
          </Link>
          <div className="mt-4">
            <a
              href="#"
              className="btn-ghost text-accent-violet inline-flex items-center gap-1 text-sm"
            >
              <GitBranch size={14} /> View on GitHub
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-text-muted border-t border-border-subtle py-6 text-center text-sm">
          Built by Ramit &middot;{" "}
          <a href="#" className="text-accent-violet">
            GitHub
          </a>{" "}
          &middot;{" "}
          <a href="#" className="text-accent-violet">
            Star on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}
