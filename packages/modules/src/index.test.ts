import { describe, expect, it } from "vitest";
import { packageName } from "./index";

describe("modules (Phase 0 wiring)", () => {
  it("identifies the package", () => {
    expect(packageName).toBe("@palawan-site-engine/modules");
  });
});
