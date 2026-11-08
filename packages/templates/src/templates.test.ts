import { describe, expect, it } from "vitest";
import { buildResort01Manifest, resort01Template, demoProfiles } from "./index";

describe("resort-01 template", () => {
  it("builds 7 pages", () => {
    const m = buildResort01Manifest("lagoon", "editorial");
    expect(m.pages.map((p) => p.slug).sort()).toEqual(
      ["about", "amenities", "contact", "gallery", "home", "location", "rooms"].sort()
    );
  });
  it("demo profiles differ in rooms and images", () => {
    expect(demoProfiles[0]?.rooms.value.length).not.toBe(demoProfiles[1]?.rooms.value.length);
    expect(demoProfiles[0]?.images.value.gallery?.length).not.toBe(demoProfiles[1]?.images.value.gallery?.length);
  });
  it("template declares slots and limits", () => {
    expect(resort01Template.imageSlots["hero"]!.min).toBeGreaterThanOrEqual(1);
    expect(resort01Template.copyLimits.tagline).toBe(120);
  });
});
