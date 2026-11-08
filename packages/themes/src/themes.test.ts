import { describe, expect, it } from "vitest";
import { palettes, fontPairs, paletteToCssVars } from "./index";

describe("themes", () => {
  it("has 3 palettes and 3 font pairs", () => {
    expect(Object.keys(palettes).sort()).toEqual(["ember", "lagoon", "moss"]);
    expect(Object.keys(fontPairs).sort()).toEqual(["contemporary", "editorial", "minimal"]);
  });
  it("maps palette to CSS vars", () => {
    const vars = paletteToCssVars("lagoon");
    expect(vars["--bg"]).toBe("#E7EEEA");
  });
});
