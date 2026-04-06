import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import { CommitsClient } from "./CommitsClient";

test("renders and filters commits", () => {
  const mockCommits = [
    { id: "1", repo: "test", repoId: "1", hash: "abc", message: "first commit", time: "1h ago", status: "clean" },
    { id: "2", repo: "test", repoId: "1", hash: "def", message: "second commit", time: "2h ago", status: "flagged" },
  ];
  
  // @ts-expect-error Ignore mock typing difference
  render(<CommitsClient commits={mockCommits} />);
  expect(screen.getByText("first commit")).toBeInTheDocument();
  
  const searchInput = screen.getByPlaceholderText("Search commit messages...");
  fireEvent.change(searchInput, { target: { value: "first" } });
  
  expect(screen.getByText("first commit")).toBeInTheDocument();
  expect(screen.queryByText("second commit")).not.toBeInTheDocument();
});
