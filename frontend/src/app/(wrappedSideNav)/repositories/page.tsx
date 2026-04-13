import { TopBar } from "@/components/layout/TopBar";
import { RepositoryList } from "@/components/features/repositories/RepositoryList";
import {
  apiFetch,
  ApiError,
  langColor,
  type ApiRepository,
} from "@/lib/api-client";
import { repos as mockRepos } from "@/lib/mock";

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
}

export default async function RepositoriesPage(): Promise<React.JSX.Element> {
  let repos: typeof mockRepos = [];

  try {
    const apiRepos = await apiFetch<ApiRepository[]>("/api/repositories");
    repos = apiRepos.map((r) => ({
      id: r._id ?? r.id ?? "",
      name: r.name,
      description: r.description,
      language: r.language || "Unknown",
      langColor: langColor(r.language),
      commits: r.totalCommits,
      lastCommit: r.lastSynced ? relativeTime(r.lastSynced) : "Never",
      status: r.isActive ? "active" : "inactive",
    }));
  } catch (err) {
    if (!(err instanceof ApiError && err.status === 401)) {
      repos = mockRepos;
    }
  }

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Repositories" />
      <RepositoryList repos={repos} />
    </div>
  );
}
