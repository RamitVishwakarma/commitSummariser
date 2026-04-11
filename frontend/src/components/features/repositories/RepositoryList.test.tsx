import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { RepositoryList } from "@/components/features/repositories/RepositoryList";

test("renders and filters repos", async () => {
  const user = userEvent.setup();

  const mockRepos = [
    { id: "1", name: "Alpha", description: "First repo", language: "TS", langColor: "#fff", commits: 10, lastCommit: "2h ago", status: "active" },
    { id: "2", name: "Beta", description: "Second repo", language: "JS", langColor: "#fff", commits: 5, lastCommit: "5h ago", status: "inactive" },
  ];

  render(<RepositoryList repos={mockRepos} />);
  expect(screen.getByText("Alpha")).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText("Search repositories...");
  await user.clear(searchInput);
  await user.type(searchInput, "beta");

  expect(screen.getByText("Beta")).toBeInTheDocument();
  expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
});
