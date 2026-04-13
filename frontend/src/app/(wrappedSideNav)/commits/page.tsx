import { TopBar } from "@/components/layout/TopBar";
import { CommitsClient } from "@/components/features/commits/CommitsClient";
import {
  apiFetch,
  ApiError,
  type ApiCommit,
  type PaginatedResponse,
} from "@/lib/api-client";
import { allCommits } from "@/lib/mock";

export default async function CommitsPage(): Promise<React.JSX.Element> {
  let commits: typeof allCommits = [];

  try {
    const result = await apiFetch<PaginatedResponse<ApiCommit>>(
      "/api/commits?limit=200",
    );
    commits = result.data.map((c) => ({
      id: c.id,
      repo: c.repoName,
      repoId: c.repoId,
      hash: c.hash,
      message: c.message,
      author: c.author,
      time: new Date(c.committedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: c.status,
    }));
  } catch (err) {
    if (!(err instanceof ApiError && err.status === 401)) {
      commits = allCommits;
    }
  }

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Commits" />
      <CommitsClient commits={commits} />
    </div>
  );
}
