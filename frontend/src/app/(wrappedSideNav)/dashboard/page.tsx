import { DashboardClient } from "@/components/features/dashboard/DashboardClient";
import {
  apiFetch,
  ApiError,
  type ApiCommit,
  type ApiSummary,
  type PaginatedResponse,
} from "@/lib/api-client";
import { weeklySummaries, monthlySummaries } from "@/lib/mock";

function apiSummaryToWeekly(s: ApiSummary) {
  const content = s.content as {
    accomplishments?: string[];
    reposActive?: string[];
    commitsProcessed?: number;
    notable?: string;
  };
  const start = new Date(s.periodStart).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const end = new Date(s.periodEnd).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return {
    id: s._id,
    dateRange: `${start} – ${end}`,
    generated: new Date(s.generatedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    accomplishments: content.accomplishments ?? [],
    reposActive: content.reposActive ?? [],
    commitsProcessed: content.commitsProcessed ?? 0,
    notable: content.notable ?? "",
  };
}

function apiSummaryToMonthly(s: ApiSummary) {
  const content = s.content as {
    overview?: string;
  };
  return {
    id: s._id,
    month: new Date(s.periodStart).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    overview: content.overview ?? "",
  };
}

function apiCommitToFrontend(c: ApiCommit) {
  return {
    id: c.id,
    repo: c.repoName,
    repoId: c.repoId,
    hash: c.hash,
    message: c.message,
    author: c.author,
    time: new Date(c.committedAt).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: c.status,
  };
}

export default async function DashboardPage(): Promise<React.JSX.Element | null> {
  try {
    const [todayResult, weeklySummariesResult, monthlySummariesResult] =
      await Promise.allSettled([
        apiFetch<ApiCommit[]>("/api/commits/today"),
        apiFetch<PaginatedResponse<ApiSummary>>("/api/summaries?type=weekly&limit=3"),
        apiFetch<PaginatedResponse<ApiSummary>>("/api/summaries?type=monthly&limit=2"),
      ]);

    const todayCommits =
      todayResult.status === "fulfilled"
        ? todayResult.value.map(apiCommitToFrontend)
        : [];

    const weeklyData =
      weeklySummariesResult.status === "fulfilled"
        ? weeklySummariesResult.value.data.map(apiSummaryToWeekly)
        : weeklySummaries;

    const monthlyData =
      monthlySummariesResult.status === "fulfilled"
        ? monthlySummariesResult.value.data.map(apiSummaryToMonthly)
        : monthlySummaries;

    return (
      <DashboardClient
        todayCommits={todayCommits}
        weeklySummaries={weeklyData}
        monthlySummaries={monthlyData}
      />
    );
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      return (
        <DashboardClient
          todayCommits={[]}
          weeklySummaries={weeklySummaries}
          monthlySummaries={monthlySummaries}
        />
      );
    }
    throw err;
  }
}
