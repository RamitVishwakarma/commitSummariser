import { TopBar } from "@/components/layout/top-bar";
import { weeklySummaries, monthlySummaries, yearlySummary } from "@/lib/mock";
import { SummariesClient } from "@/components/features/summaries/SummariesClient";

export default function SummariesPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <TopBar title="Summaries" />
      <SummariesClient
        weeklySummaries={weeklySummaries}
        monthlySummaries={monthlySummaries}
        yearlySummary={yearlySummary}
      />
    </div>
  );
}
