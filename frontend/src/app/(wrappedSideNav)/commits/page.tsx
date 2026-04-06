import { TopBar } from "@/components/layout/top-bar";
import { allCommits } from "@/lib/mock";
import { CommitsClient } from "@/components/features/commits/CommitsClient";

export default function CommitsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Commits" />
      <CommitsClient commits={allCommits} />
    </div>
  );
}
