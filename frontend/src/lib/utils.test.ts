import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and resolves tailwind conflicts", () => {
    expect(cn("p-2", "text-sm", "p-4")).toBe("text-sm p-4");
  });

  it("handles conditional and falsy values", () => {
    expect(cn("base", false && "hidden", null, undefined, "visible")).toBe("base visible");
  });
});
