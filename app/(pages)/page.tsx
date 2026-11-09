import type { Metadata } from "next";
import PassportJourney from "@/components/PassportJourney/PassportJourney";
import AboutSection from "@/components/home-page/AboutSection/AboutSection";
import TestimonialsSection from "@/components/home-page/Testimonials/TestimonialsSection";

export const metadata: Metadata = {
  title: "Your Immigration Journey Starts Here | Your F1 Visa Guide",
  description:
    "Study visa guidance for the USA, UK, Canada, Australia, Germany, Dubai and New Zealand. Our team checks your documents and applies on your behalf.",
};

export default function HomePage() {
  return (
    <PassportJourney>
      <TestimonialsSection />
      <AboutSection />
    </PassportJourney>
  );
}