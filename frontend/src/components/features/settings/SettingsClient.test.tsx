import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { SettingsClient } from "@/components/features/settings/SettingsClient";

const mockRepos = [
  { id: "1", name: "gitpulse", language: "TypeScript", langColor: "#3178C6", status: "active" },
];

test("renders and toggles PAT visibility", async () => {
  const user = userEvent.setup();

  render(<SettingsClient repos={mockRepos} />);
  expect(screen.getByText("GitHub Connection")).toBeInTheDocument();

  const tokenInput = screen.getByDisplayValue("ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  expect(tokenInput).toHaveAttribute("type", "password");

  const toggleBtn = screen.getByRole("button", { name: /toggle password visibility/i });
  await user.click(toggleBtn);
  expect(tokenInput).toHaveAttribute("type", "text");
});
