import { RepoDetailClient } from "@/components/features/repositories/RepoDetailClient";
import {
  apiFetch,
  ApiError,
  langColor,
  type ApiRepository,
  type ApiCommit,
  type PaginatedResponse,
} from "@/lib/api-client";
import { repos as mockRepos, allCommits as mockCommits } from "@/lib/mock";

interface RepoDetailPageProps {
  params: Promise<{ repoId: string }>;
}

export default async function RepoDetailPage({ params }: RepoDetailPageProps): Promise<React.JSX.Element | null> {
  const { repoId } = await params;

  try {
    const [repoRes, commitsRes] = await Promise.all([
      apiFetch<ApiRepository>(`/api/repositories/${repoId}`),
      apiFetch<PaginatedResponse<ApiCommit>>(`/api/commits?repoId=${repoId}&limit=200`),
    ]);

    const repo = {
      id: repoRes._id ?? repoRes.id ?? "",
      name: repoRes.name,
      description: repoRes.description,
      language: repoRes.language || "Unknown",
      langColor: langColor(repoRes.language),
      commits: repoRes.totalCommits,
      lastCommit: repoRes.lastSynced
        ? new Date(repoRes.lastSynced).toLocaleDateString()
        : "Never",
      status: repoRes.isActive ? "active" : "inactive",
    };

    const commits = commitsRes.data.map((c) => ({
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

    return <RepoDetailClient repo={repo} commits={commits} />;
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) return null;

    // Fall back to mock data if API unavailable
    const repo = mockRepos.find((r) => r.id === repoId) ?? mockRepos[0];
    const commits = mockCommits.filter((c) => c.repoId === repoId);
    if (!repo) return null;
    return <RepoDetailClient repo={repo} commits={commits} />;
  }
}
