import type { todayCommits } from "@/lib/mock";

type Commit = (typeof todayCommits)[number];

export function groupCommitsByRepo(commits: Commit[]): Record<string, Commit[]> {
  return commits.reduce(
    (acc, c) => {
      (acc[c.repo] ??= []).push(c);
      return acc;
    },
    {} as Record<string, Commit[]>,
  );
}
