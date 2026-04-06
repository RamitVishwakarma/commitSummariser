import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import { ExportForm } from "./ExportForm";

test("renders and changes download button text", () => {
  render(<ExportForm />);
  
  expect(screen.getByText(/Download March 2026/)).toBeInTheDocument();
  
  const monthSelect = screen.getByDisplayValue("March");
  fireEvent.change(monthSelect, { target: { value: "April" } });
  
  expect(screen.getByText(/Download April 2026/)).toBeInTheDocument();
});
