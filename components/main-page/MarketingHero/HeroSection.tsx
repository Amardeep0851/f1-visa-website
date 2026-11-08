import { Anton, Cormorant_Garamond, Manrope } from "next/font/google";
import HeroSectionInteractive from "./HeroSectionInteractive";

const displayFont = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hero-display",
  display: "swap",
});

const editorialFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-hero-editorial",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hero-body",
  display: "swap",
});

/**
 * Server wrapper keeps next/font declarations outside the client component.
 * The font variables are scoped to this hero and do not alter the older pages.
 */
export default function HeroSection() {
  return (
    <div className={`${displayFont.variable} ${editorialFont.variable} ${bodyFont.variable}`}>
      <HeroSectionInteractive />
    </div>
  );
}
