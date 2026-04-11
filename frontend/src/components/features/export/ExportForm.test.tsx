import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { ExportForm } from "@/components/features/export/ExportForm";

test("renders and changes download button text", async () => {
  const user = userEvent.setup();

  render(<ExportForm />);

  expect(screen.getByText(/Download March 2026/)).toBeInTheDocument();

  const monthSelect = screen.getByDisplayValue("March");
  await user.selectOptions(monthSelect, "April");

  expect(screen.getByText(/Download April 2026/)).toBeInTheDocument();
});
