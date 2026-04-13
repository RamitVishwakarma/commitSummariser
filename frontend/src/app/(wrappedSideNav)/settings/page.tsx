import { TopBar } from "@/components/layout/TopBar";
import { SettingsClient } from "@/components/features/settings/SettingsClient";
import {
  apiFetch,
  ApiError,
  langColor,
  type ApiRepository,
} from "@/lib/api-client";
import { repos as mockRepos } from "@/lib/mock";

export default async function SettingsPage(): Promise<React.JSX.Element> {
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
      lastCommit: r.lastSynced
        ? new Date(r.lastSynced).toLocaleDateString()
        : "Never",
      status: r.isActive ? "active" : "inactive",
    }));
  } catch (err) {
    if (!(err instanceof ApiError && err.status === 401)) {
      repos = mockRepos;
    }
  }

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Settings" />
      <SettingsClient repos={repos} />
    </div>
  );
}
