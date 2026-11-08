import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Instrument_Sans, Space_Grotesk, Inter, Newsreader } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["300", "400"] });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display-2", weight: ["400", "500", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body-2", weight: ["400", "500"] });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-display-3", weight: ["300", "400"] });

export const metadata: Metadata = {
  title: "Palawan Site Engine — web",
  description: "Phase 1 engine renderer: resort-01 cinematic dawn from validated inputs."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-palette="lagoon" data-fontpair="editorial">
      <body className={`${fraunces.variable} ${instrument.variable} ${spaceGrotesk.variable} ${inter.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  );
}
