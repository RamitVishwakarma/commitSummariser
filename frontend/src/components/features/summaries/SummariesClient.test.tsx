import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import { SummariesClient } from "./SummariesClient";

test("renders tabs and switches content", () => {
  const weekly = [{ id: "1", dateRange: "Week 1", generated: "Now", accomplishments: [], reposActive: [], commitsProcessed: 1, notable: "Test weekly" }];
  const monthly = [{ id: "m1", month: "January", overview: "Test monthly", themes: [], totalCommits: 1, reposActive: 1, busiestWeek: "Week 1" }];
  const yearly = { year: "2024", overview: "Test yearly", stats: { commits: 1, repos: 1, linesAdded: 1, linesDeleted: 1 }, topRepos: [] };

  render(<SummariesClient weeklySummaries={weekly} monthlySummaries={monthly} yearlySummary={yearly} />);
  
  expect(screen.getByText("Week 1")).toBeInTheDocument();
  
  const monthlyBtn = screen.getByText("Monthly");
  fireEvent.click(monthlyBtn);
  
  expect(screen.getByText("January")).toBeInTheDocument();
  expect(screen.queryByText("Week 1")).not.toBeInTheDocument();
  
  const yearlyBtn = screen.getByText("Yearly");
  fireEvent.click(yearlyBtn);
  
  expect(screen.getByText("2024 Year in Review")).toBeInTheDocument();
});
