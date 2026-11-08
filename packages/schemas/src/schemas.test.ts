import { describe, expect, it } from "vitest";
import { BusinessProfileSchema, SiteManifestSchema, AppConfigSchema } from "./index";

describe("schemas (Phase 1)", () => {
  it("rejects an empty profile", () => {
    expect(BusinessProfileSchema.safeParse({}).success).toBe(false);
  });
  it("rejects an empty manifest", () => {
    expect(SiteManifestSchema.safeParse({}).success).toBe(false);
  });
  it("accepts a minimal app config", () => {
    expect(AppConfigSchema.safeParse({ modules: { inquiry: true, booking: false } }).success).toBe(true);
  });
});
