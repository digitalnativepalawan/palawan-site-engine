"use client";

import { useEffect, useState } from "react";
import { palettes, fontPairs, paletteToCssVars, type PaletteId, type FontPairId } from "@palawan-site-engine/themes";

export function PaletteSwitcher({ siteId }: { siteId: string }) {
  const [palette, setPalette] = useState<PaletteId>("lagoon");
  const [fontPair, setFontPair] = useState<FontPairId>("editorial");

  useEffect(() => {
    const vars = paletteToCssVars(palette);
    const root = document.documentElement;
    for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
    root.dataset["palette"] = palette;
    root.dataset["fontpair"] = fontPair;
    const font = fontPairs[fontPair];
    root.style.setProperty("--serif", font.displayStack);
    root.style.setProperty("--sans", font.bodyStack);
  }, [palette, fontPair]);

  const other = siteId === "amihan" ? "sibuyan" : "amihan";
  return (
    <div className="pse-dock" role="group" aria-label="Preview palette and profile">
      <span>Palette</span>
      {(Object.keys(palettes) as PaletteId[]).map((p) => (
        <button key={p} aria-pressed={palette === p} onClick={() => setPalette(p)} type="button">
          {p}
        </button>
      ))}
      <span>Font</span>
      {(Object.keys(fontPairs) as FontPairId[]).map((f) => (
        <button key={f} aria-pressed={fontPair === f} onClick={() => setFontPair(f)} type="button">
          {f}
        </button>
      ))}
      <span>·</span>
      <span>{siteId}</span>
      <a href={`/sites/${other}/home`}>Switch profile</a>
    </div>
  );
}
