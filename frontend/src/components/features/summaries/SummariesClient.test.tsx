import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { SummariesClient } from "@/components/features/summaries/SummariesClient";

test("renders tabs and switches content", async () => {
  const user = userEvent.setup();

  const weekly = [{ id: "1", dateRange: "Week 1", generated: "Now", accomplishments: [], reposActive: [], commitsProcessed: 1, notable: "Test weekly" }];
  const monthly = [{ id: "m1", month: "January", overview: "Test monthly", themes: [], totalCommits: 1, reposActive: 1, busiestWeek: "Week 1" }];
  const yearly = { year: "2024", totalCommits: 1, reposActive: 1, weeksSummarised: 1, longestStreak: 1, narrative: "Test yearly", skills: {} };

  render(<SummariesClient weeklySummaries={weekly} monthlySummaries={monthly} yearlySummary={yearly} />);

  expect(screen.getByText("Week 1")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /monthly/i }));

  expect(screen.getByText("January")).toBeInTheDocument();
  expect(screen.queryByText("Week 1")).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /yearly/i }));

  expect(screen.getByText("2024 Year in Review")).toBeInTheDocument();
});
