import { Anton, Manrope, Noto_Sans_Devanagari, Playfair_Display } from "next/font/google";
import JourneyStage from "./JourneyStage";
import { ReactNode } from "react";

// Fonts are scoped to this section through CSS variables (see ui/tokens.ts).
const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-hero-display", display: "swap" });
const editorial = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-hero-editorial",
  display: "swap",
});
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-hero-body", display: "swap" });
const deva = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: "600", variable: "--font-hero-deva", display: "swap" });

/** Loader, hero, countries and steps: the whole scroll story. Drop it at the top of a page. */
export default function PassportJourney({ children }: { children?: ReactNode }) {
  return (
    <div className={`${display.variable} ${editorial.variable} ${body.variable} ${deva.variable}`}>
      <JourneyStage />
      {children}
    </div>
  );
}