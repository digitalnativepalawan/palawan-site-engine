import { describe, expect, it } from "vitest";
import { packageName } from "./index";

describe("engine (Phase 0 wiring)", () => {
  it("identifies the package", () => {
    expect(packageName).toBe("@palawan-site-engine/engine");
  });
});
