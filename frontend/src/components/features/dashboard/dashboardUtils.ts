import type { Commit } from "@/lib/types/commit";

export function groupCommitsByRepo(commits: Commit[]): Record<string, Commit[]> {
  const initial: Record<string, Commit[]> = {};
  return commits.reduce((acc, c) => {
    (acc[c.repo] ??= []).push(c);
    return acc;
  }, initial);
}
