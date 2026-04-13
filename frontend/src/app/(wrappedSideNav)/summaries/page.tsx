import { TopBar } from "@/components/layout/TopBar";
import { SummariesClient } from "@/components/features/summaries/SummariesClient";
import {
  apiFetch,
  ApiError,
  type ApiSummary,
  type PaginatedResponse,
} from "@/lib/api-client";
import { weeklySummaries, monthlySummaries, yearlySummary } from "@/lib/mock";

export default async function SummariesPage(): Promise<React.JSX.Element> {
  try {
    const [weeklyRes, monthlyRes, yearlyRes] = await Promise.allSettled([
      apiFetch<PaginatedResponse<ApiSummary>>("/api/summaries?type=weekly&limit=20"),
      apiFetch<PaginatedResponse<ApiSummary>>("/api/summaries?type=monthly&limit=12"),
      apiFetch<PaginatedResponse<ApiSummary>>("/api/summaries?type=yearly&limit=1"),
    ]);

    const weekly =
      weeklyRes.status === "fulfilled"
        ? weeklyRes.value.data.map((s) => {
            const c = s.content as Record<string, unknown>;
            const start = new Date(s.periodStart).toLocaleDateString("en-US", { month: "long", day: "numeric" });
            const end = new Date(s.periodEnd).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            return {
              id: s._id,
              dateRange: `${start} – ${end}`,
              generated: new Date(s.generatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
              accomplishments: (c["accomplishments"] as string[]) ?? [],
              reposActive: (c["reposActive"] as string[]) ?? [],
              commitsProcessed: (c["commitsProcessed"] as number) ?? 0,
              notable: (c["notable"] as string) ?? "",
            };
          })
        : weeklySummaries;

    const monthly =
      monthlyRes.status === "fulfilled"
        ? monthlyRes.value.data.map((s) => {
            const c = s.content as Record<string, unknown>;
            return {
              id: s._id,
              month: new Date(s.periodStart).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
              overview: (c["overview"] as string) ?? "",
              projects: (c["projects"] as string[]) ?? [],
              themes: (c["themes"] as string[]) ?? [],
              totalCommits: (c["totalCommits"] as number) ?? 0,
              reposActive: (c["reposActive"] as number) ?? 0,
              busiestWeek: (c["busiestWeek"] as string) ?? "",
            };
          })
        : monthlySummaries;

    const yearly =
      yearlyRes.status === "fulfilled" && yearlyRes.value.data.length > 0
        ? (() => {
            const s = yearlyRes.value.data[0]!;
            const c = s.content as Record<string, unknown>;
            return {
              year: String(new Date(s.periodStart).getFullYear()),
              totalCommits: (c["totalCommits"] as number) ?? 0,
              reposActive: (c["reposActive"] as number) ?? 0,
              weeksSummarised: (c["weeksSummarised"] as number) ?? 0,
              longestStreak: (c["longestStreak"] as number) ?? 0,
              narrative: (c["narrative"] as string) ?? "",
              skills: (c["skills"] as Record<string, number>) ?? {},
            };
          })()
        : yearlySummary;

    return (
      <div className="min-h-screen flex-1 overflow-y-auto">
        <TopBar title="Summaries" />
        <SummariesClient
          weeklySummaries={weekly}
          monthlySummaries={monthly}
          yearlySummary={yearly}
        />
      </div>
    );
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      return (
        <div className="min-h-screen flex-1 overflow-y-auto">
          <TopBar title="Summaries" />
          <SummariesClient
            weeklySummaries={[]}
            monthlySummaries={[]}
            yearlySummary={yearlySummary}
          />
        </div>
      );
    }
    throw err;
  }
}
