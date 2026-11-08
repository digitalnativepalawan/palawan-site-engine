import { describe, expect, it } from "vitest";
import { HealthCheckSchema, healthCheck } from "./index";

describe("schemas (Phase 0 wiring)", () => {
  it("parses the health check", () => {
    expect(HealthCheckSchema.parse(healthCheck)).toEqual({ ok: true, phase: 0 });
  });
});
