export type PaletteId = "lagoon" | "ember" | "moss";
export type FontPairId = "editorial" | "contemporary" | "minimal";

export type PaletteTokens = {
  bg: string;
  fg: string;
  mute: string;
  line: string;
  panel: string;
  accent: string;
  btn: string;
  btnfg: string;
  sun: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
};

export const palettes: Record<PaletteId, PaletteTokens> = {
  lagoon: {
    bg: "#E7EEEA",
    fg: "#0B2A33",
    mute: "#4B666C",
    line: "rgba(11,42,51,.18)",
    panel: "#D8E5DF",
    accent: "#F2A65A",
    btn: "#0B2A33",
    btnfg: "#E7EEEA",
    sun: "#FFE2B0",
    p1: "#4F9EB0",
    p2: "#FFC58E",
    p3: "#7FB5BE",
    p4: "#2F7C86",
    p5: "#0B2A33",
    p6: "#3F98A6",
    p7: "#1D6E7A"
  },
  ember: {
    bg: "#FFF6EE",
    fg: "#2A0F2B",
    mute: "#7A3B5E",
    line: "rgba(42,15,43,.18)",
    panel: "#F5E2D8",
    accent: "#E4572E",
    btn: "#2A0F2B",
    btnfg: "#FFF6EE",
    sun: "#FFD9A0",
    p1: "#8E4A7B",
    p2: "#FFB27A",
    p3: "#C98A9A",
    p4: "#7A3B5E",
    p5: "#2A0F2B",
    p6: "#C26A6A",
    p7: "#7A3652"
  },
  moss: {
    bg: "#F1F5EE",
    fg: "#0E2A20",
    mute: "#3E7A63",
    line: "rgba(14,42,32,.16)",
    panel: "#DCE8D8",
    accent: "#C8D96A",
    btn: "#0E2A20",
    btnfg: "#F1F5EE",
    sun: "#FFF1B8",
    p1: "#6FA58C",
    p2: "#F3E2A0",
    p3: "#9CC4A8",
    p4: "#3E7A63",
    p5: "#0E2A20",
    p6: "#5DA58E",
    p7: "#2A6B57"
  }
};

export const fontPairs: Record<
  FontPairId,
  { display: string; body: string; displayStack: string; bodyStack: string }
> = {
  editorial: {
    display: "Fraunces",
    body: "Instrument Sans",
    displayStack: '"Fraunces", Georgia, "Times New Roman", serif',
    bodyStack: '"Instrument Sans", system-ui, sans-serif'
  },
  contemporary: {
    display: "Space Grotesk",
    body: "Inter",
    displayStack: '"Space Grotesk", system-ui, sans-serif',
    bodyStack: '"Inter", system-ui, sans-serif'
  },
  minimal: {
    display: "Newsreader",
    body: "Inter",
    displayStack: '"Newsreader", Georgia, serif',
    bodyStack: '"Inter", system-ui, sans-serif'
  }
};

export function paletteToCssVars(id: PaletteId): Record<string, string> {
  const p = palettes[id];
  return {
    "--bg": p.bg,
    "--fg": p.fg,
    "--mute": p.mute,
    "--line": p.line,
    "--panel": p.panel,
    "--accent": p.accent,
    "--btn": p.btn,
    "--btnfg": p.btnfg,
    "--sun": p.sun,
    "--p1": p.p1,
    "--p2": p.p2,
    "--p3": p.p3,
    "--p4": p.p4,
    "--p5": p.p5,
    "--p6": p.p6,
    "--p7": p.p7
  };
}

export const packageName = "@palawan-site-engine/themes" as const;
export type PackageName = typeof packageName;
