import { describe, expect, it } from "vitest";
import { registry } from "./index";

describe("sections registry (Phase 1)", () => {
  it("registers all 13 section types", () => {
    expect(Object.keys(registry).sort()).toEqual(
      [
        "amenities",
        "cta",
        "experiences",
        "faq",
        "footer",
        "gallery",
        "hero",
        "inquiry",
        "location",
        "navigation",
        "rooms",
        "statement",
        "testimonial"
      ].sort()
    );
  });
});
