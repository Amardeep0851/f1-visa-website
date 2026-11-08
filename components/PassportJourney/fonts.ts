import { Anton, Inter, Playfair_Display, Noto_Sans_Devanagari } from "next/font/google";

// Display face for the big headline words (matches the mockup's tight, heavy grotesque).
export const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pj-display",
  display: "swap",
});

// Italic serif used for the accent line ("Starts Here.").
export const serif = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500", "600"],
  variable: "--font-pj-serif",
  display: "swap",
});

export const body = Inter({
  subsets: ["latin"],
  variable: "--font-pj-body",
  display: "swap",
});

// Only used for the Hindi word on the passport cover.
export const deva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["600"],
  variable: "--font-pj-deva",
  display: "swap",
});

export const fontVars = `${display.variable} ${serif.variable} ${body.variable} ${deva.variable}`;
