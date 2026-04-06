import { TopBar } from "@/components/layout/top-bar";
import { repos, allCommits } from "@/lib/mock";
import { ExternalLink, RefreshCw, Eye, Flag, Trash2, Circle } from "lucide-react";
import { RepositoryStats } from "@/components/features/repositories/RepositoryStats";

interface RepoDetailPageProps {
  params: Promise<{ repoId: string }>;
}

export default async function RepoDetailPage({ params }: RepoDetailPageProps): Promise<React.JSX.Element | null> {
  const p = await params;
  const repoId = p.repoId;

  const repo = repos.find(r => r.id === repoId) ?? repos[0];
  const commits = allCommits.filter(c => c.repoId === repoId);

  if (!repo) return null;

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title={repo.name} />
      <div className="mx-auto max-w-300 space-y-6 p-8">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-[24px] font-bold">{repo.name}</h2>
              <p className="text-text-secondary mt-1 text-[14px]">{repo.description}</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="pill">
                  <Circle size={8} fill={repo.langColor} color={repo.langColor} /> {repo.language}
                </span>
                <span className="text-text-muted text-[12px]">{repo.commits} commits</span>
                <span className="text-text-muted text-[12px]">Last: {repo.lastCommit}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex items-center gap-1 !px-3 !py-1.5 text-[12px]">
                <RefreshCw size={12} /> Sync
              </button>
              <a href="#" className="btn-ghost flex items-center gap-1 text-[12px]">
                <ExternalLink size={12} /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Commits Table */}
          <div className="glass-card overflow-hidden lg:col-span-2">
            <table className="glass-table w-full">
              <thead>
                <tr>
                  <th>Hash</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {commits.map(c => (
                  <tr key={c.id}>
                    <td>
                      <span className="mono text-accent-violet text-[12px]">{c.hash}</span>
                    </td>
                    <td className="text-text-secondary text-[13px]">{c.message}</td>
                    <td className="text-text-muted text-[12px]">{c.time}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn-ghost p-1">
                          <Eye size={14} />
                        </button>
                        <button className="text-accent-amber btn-ghost p-1">
                          <Flag size={14} />
                        </button>
                        <button className="text-accent-rose btn-ghost p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {commits.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-text-muted py-8 text-center">
                      No commits found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <RepositoryStats />
        </div>
      </div>
    </div>
  );
}
