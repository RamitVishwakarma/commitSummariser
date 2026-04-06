import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import { RepositoryList } from "./RepositoryList";

test("renders and filters repos", () => {
  const mockRepos = [
    { id: "1", name: "Alpha", description: "First repo", language: "TS", langColor: "#fff", commits: 10, lastCommit: "2h ago", status: "active" },
    { id: "2", name: "Beta", description: "Second repo", language: "JS", langColor: "#fff", commits: 5, lastCommit: "5h ago", status: "inactive" },
  ];
  
  render(<RepositoryList repos={mockRepos} />);
  expect(screen.getByText("Alpha")).toBeInTheDocument();
  
  const searchInput = screen.getByPlaceholderText("Search repositories...");
  fireEvent.change(searchInput, { target: { value: "beta" } });
  
  expect(screen.getByText("Beta")).toBeInTheDocument();
  expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
});
