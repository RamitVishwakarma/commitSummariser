import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import { SettingsClient } from "./SettingsClient";

test("renders and shows pat correctly", () => {
  render(<SettingsClient />);
  expect(screen.getByText("GitHub Connection")).toBeInTheDocument();
  
  const tokenInput = screen.getByDisplayValue("ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  expect(tokenInput).toHaveAttribute("type", "password");
  
  const toggleBtn = tokenInput.nextElementSibling;
  if(toggleBtn) {
    fireEvent.click(toggleBtn);
    expect(tokenInput).toHaveAttribute("type", "text");
  }
});
