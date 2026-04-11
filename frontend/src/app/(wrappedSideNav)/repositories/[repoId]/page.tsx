import { repos, allCommits } from "@/lib/mock";
import { RepoDetailClient } from "@/components/features/repositories/RepoDetailClient";

interface RepoDetailPageProps {
  params: Promise<{ repoId: string }>;
}

export default async function RepoDetailPage({ params }: RepoDetailPageProps): Promise<React.JSX.Element | null> {
  const { repoId } = await params;
  const repo = repos.find(r => r.id === repoId) ?? repos[0];
  const commits = allCommits.filter(c => c.repoId === repoId);

  if (!repo) return null;

  return <RepoDetailClient repo={repo} commits={commits} />;
}
