import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { CommitsClient } from "@/components/features/commits/CommitsClient";

test("renders and filters commits", async () => {
  const user = userEvent.setup();

  const mockCommits = [
    { id: "1", repo: "test", repoId: "1", hash: "abc", message: "first commit", author: "Test", time: "1h ago", status: "clean" },
    { id: "2", repo: "test", repoId: "1", hash: "def", message: "second commit", author: "Test", time: "2h ago", status: "flagged" },
  ];

  render(<CommitsClient commits={mockCommits} />);
  expect(screen.getByText("first commit")).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText("Search commit messages...");
  await user.type(searchInput, "first");

  expect(screen.getByText("first commit")).toBeInTheDocument();
  expect(screen.queryByText("second commit")).not.toBeInTheDocument();
});
