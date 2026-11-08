import type { Metadata } from "next";
import HeroSection from "@/components/main-page/MarketingHero/HeroSection";

export const metadata: Metadata = {
  title: "Hero Design Preview | Your F1 Visa Guide",
  description: "Preview of the new editorial hero section.",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  return <HeroSection />;
}
