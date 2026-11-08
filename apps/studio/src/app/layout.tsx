import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palawan Site Engine — studio",
  description: "Phase 0 shell. Agency dashboard is NOT BUILT. See docs/STATUS.md."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
