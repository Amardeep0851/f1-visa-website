"use client";

import { useCallback, useRef } from "react";
import { countries, type NavTarget } from "@/data/journey";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";
import { PHASE, storyHeightSvh, timelineFor, UNIT_SVH } from "./timeline";
import { useJourneyIntro } from "./useJourneyIntro";
import { useJourneyScroll } from "./useJourneyScroll";
import Preloader from "./sections/Preloader";
import HeroSection from "./sections/HeroSection";
import CountriesSection from "./sections/CountriesSection";
import StepsSection from "./sections/StepsSection";
import JourneyNav from "./ui/JourneyNav";
import Passport from "./ui/Passport";
import CursorFollower from "./ui/CursorFollower";

/** Pinned stage: every scene is stacked in one sticky screen and driven by scroll. */
export default function JourneyStage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useJourneyIntro(stageRef);
  useJourneyScroll(storyRef, stageRef);

  const scrollToTime = useCallback((time: number) => {
    const story = storyRef.current;
    if (!story) return;
    const { total } = timelineFor(countries.length);
    const range = story.offsetHeight - window.innerHeight;
    const top = story.getBoundingClientRect().top + window.scrollY + (time / total) * range;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const goTo = useCallback(
    (target: NavTarget) => {
      const t = timelineFor(countries.length);
      if (target === "hero") return scrollToTime(0);
      if (target === "countries") return scrollToTime(t.countriesAt);
      if (target === "steps") return scrollToTime(t.total - PHASE.hold);
      if (target === "contact") return handleWhatsappClickWithMessage();
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    },
    [scrollToTime],
  );

  const nextStep = useCallback(() => {
    window.scrollBy({ top: (window.innerHeight * UNIT_SVH) / 100, behavior: "smooth" });
  }, []);

  return (
    <div className="pj relative bg-primary text-secondary">
      <Preloader />
      <div ref={storyRef} className="relative" style={{ height: `${storyHeightSvh(countries.length)}svh` }}>
        <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden bg-primary">
          <JourneyNav onGo={goTo} />
          <HeroSection onGo={goTo} />
          <CountriesSection onNext={nextStep} />
          <StepsSection onServices={() => goTo("hero")} />
          <Passport />
        </div>
      </div>
      <CursorFollower />
    </div>
  );
}