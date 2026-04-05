import Link from "next/link";
import { Activity, GitBranch } from "lucide-react";
import { Background } from "@/components/layout/background";
import { HeroSection } from "@/app/components/landing/HeroSection";
import { FeaturesSection } from "@/app/components/landing/FeaturesSection";
import { StepsSection } from "@/app/components/landing/StepsSection";
import { SummarySection } from "@/app/components/landing/SummarySection";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative text-(--text-primary)">
      <Background />
      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Activity size={24} className="text-(--accent-violet)" />
            <span className="text-xl font-bold">GitPulse</span>
          </div>
          <Link href="/dashboard" className="btn-primary text-sm !py-2 !px-5">
            Dashboard
          </Link>
        </nav>

        <HeroSection />
        <FeaturesSection />
        <StepsSection />
        <SummarySection />

        {/* CTA */}
        <section className="text-center py-24">
          <h2 className="text-[36px] font-bold">Start tracking your impact today.</h2>
          <p className="text-(--text-secondary) text-base mt-2">Self-hosted. Private. Yours.</p>
          <Link href="/dashboard" className="btn-primary inline-block mt-8 !py-[14px] !px-8 text-base">
            Get Started
          </Link>
          <div className="mt-4">
            <a href="#" className="btn-ghost inline-flex items-center gap-1 text-(--accent-violet) text-sm">
              <GitBranch size={14} /> View on GitHub
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 text-center border-t border-[rgba(255,255,255,0.06)] text-(--text-muted) text-[13px]">
          Built by Ramit &middot;{" "}
          <a href="#" className="text-(--accent-violet)">GitHub</a>{" "}
          &middot;{" "}
          <a href="#" className="text-(--accent-violet)">Star on GitHub</a>
        </footer>
      </div>
    </div>
  );
}
