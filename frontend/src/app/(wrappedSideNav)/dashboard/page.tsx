import { DashboardClient } from "@/components/features/dashboard/DashboardClient";
import { todayCommits, weeklySummaries, monthlySummaries } from "@/lib/mock";

export default function DashboardPage(): React.JSX.Element | null {
  return (
    <DashboardClient
      todayCommits={todayCommits}
      weeklySummaries={weeklySummaries}
      monthlySummaries={monthlySummaries}
    />
  );
}
