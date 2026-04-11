import { TopBar } from "@/components/layout/TopBar";
import { repos } from "@/lib/mock";
import { RepositoryList } from "@/components/features/repositories/RepositoryList";

export default function RepositoriesPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Repositories" />
      <RepositoryList repos={repos} />
    </div>
  );
}
