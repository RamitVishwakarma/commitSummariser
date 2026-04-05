import type { LucideIcon } from "lucide-react";
import {
  GitCommit,
  FolderGit2,
  Trash2,
  Sparkles,
  Download,
  TrendingUp,
  GitBranch,
  CheckSquare,
  Clock,
  BarChart3,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
}

export interface Step {
  icon: LucideIcon;
  label: string;
  desc: string;
}

export const FEATURES: Feature[] = [
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

export const STEPS: Step[] = [
  { icon: GitBranch, label: "Connect GitHub", desc: "Add your personal access token or connect via OAuth." },
  { icon: CheckSquare, label: "Track Repos", desc: "Select which repositories to monitor." },
  { icon: Clock, label: "Sit Back", desc: "GitPulse fetches commits daily and generates summaries on schedule." },
  { icon: BarChart3, label: "Review & Grow", desc: "Read your summaries, export reports, and track your growth." },
];
