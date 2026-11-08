import type { Metadata } from "next";
import PassportJourney from "@/components/PassportJourney/PassportJourney";

export const metadata: Metadata = {
  title: "Your Immigration Journey Starts Here | Your F1 Visa Guide",
  description:
    "Follow a passport through the visa process for the USA, Canada, Europe and Dubai with Your F1 Visa Guide.",
  // Preview page: keep it out of search until it replaces a live page.
  robots: { index: false, follow: true },
  alternates: { canonical: "/journey/" },
};

export default function JourneyPage() {
  return <PassportJourney />;
}
