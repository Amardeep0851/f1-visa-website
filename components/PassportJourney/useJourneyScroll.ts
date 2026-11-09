"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { countries } from "@/data/journey";
import { timelineFor } from "./timeline";
import { HERO_POSE } from "./ui/Passport";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Scroll-scrubbed timeline for scenes 1 to 4. Passport positions are measured from empty "slot" elements. */
export function useJourneyScroll(storyRef: RefObject<HTMLDivElement | null>, stageRef: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const story = storyRef.current;
      const stage = stageRef.current;
      if (!story || !stage) return;

      const q = <T extends Element = HTMLElement>(sel: string) => stage.querySelector<T>(sel)!;
      const qa = <T extends Element = HTMLElement>(sel: string) => Array.from(stage.querySelectorAll<T>(sel));
      const byIndex = (attr: string) => (i: number) => stage.querySelector<HTMLElement>(`[${attr}="${i}"]`);

      const N = countries.length;
      const T = timelineFor(N);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const pp = q("[data-pp]");
      const book = q("[data-book]");
      const front = q('[data-face="front"]');
      const back = q('[data-face="back"]');
      const orbit = q("[data-orbit]");
      const heroScene = q('[data-scene="hero"]');
      const countriesScene = q('[data-scene="countries"]');
      const stepsScene = q('[data-scene="steps"]');
      const drift = qa("[data-drift]");
      const navFade = qa("[data-nav-fade]");
      const stamp = byIndex("data-stamp");
      const block = byIndex("data-country");
      const num = byIndex("data-country-num");
      const img = byIndex("data-country-img");
      const dot = byIndex("data-progress-dot");
      const fill = q("[data-progress-fill]");
      const stepsCopy = q("[data-steps-copy]");
      const lead = q("[data-steps-lead]");
      const segs = qa<SVGPathElement>("[data-steps-seg]");
      const stepDot = byIndex("data-step-dot");
      const stepLabel = byIndex("data-step-label");
      const plane = q("[data-steps-plane]");

      /* ---------- geometry ---------- */
      let g = {
        hero: { x: 0, y: 0, w: 1, h: 1 } as Box,
        center: { x: 0, y: 0 },
        countries: { x: 0, y: 0, w: 1, h: 1 } as Box,
        step: { x: 0, y: 0, w: 1, h: 1 } as Box,
        sHero: 1,
        sCountries: 1,
      };
      const measure = () => {
        const sr = stage.getBoundingClientRect();
        const box = (sel: string): Box => {
          const r = q(sel).getBoundingClientRect();
          return { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2, w: r.width, h: r.height };
        };
        const hero = box('[data-slot="hero"]');
        const ctry = box('[data-slot="countries"]');
        g = {
          hero,
          center: { x: sr.width / 2, y: sr.height / 2 },
          countries: ctry,
          step: box('[data-slot="step0"]'),
          sHero: (0.8 * hero.w) / 330,
          sCountries: Math.min((0.94 * ctry.w) / 460, (0.9 * ctry.h) / 330),
        };
      };
      measure();

      /* ---------- starting state (matches the hero) ---------- */
      gsap.set(pp, { x: g.hero.x, y: g.hero.y, scale: g.sHero });
      gsap.set(qa("[data-stamp]"), { xPercent: -50, yPercent: -50, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: story,
          start: "top top",
          end: "bottom bottom",
          scrub: reduce ? true : 0.8,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
        },
      });

      /* ---------- 1. zoom: text out, circle + passport 1.5x into the centre ---------- */
      tl.to(drift, { x: (_i, el) => Number(el.dataset.dx), y: (_i, el) => Number(el.dataset.dy), autoAlpha: 0, ease: "power1.in", duration: 0.7 }, T.zoomAt);
      tl.to(navFade, { autoAlpha: 0, duration: 0.35 }, T.zoomAt);
      tl.to(orbit, { x: () => g.center.x - g.hero.x, y: () => g.center.y - g.hero.y, scale: 1.5, ease: "power2.inOut", duration: 1 }, T.zoomAt);
      tl.to(pp, { x: () => g.center.x, y: () => g.center.y, scale: () => g.sHero * 1.5, ease: "power2.inOut", duration: 1 }, T.zoomAt);
      tl.fromTo(book, { ...HERO_POSE }, { "--tz": "-8deg", "--ty": "-4deg", duration: 1 }, T.zoomAt);

      /* ---------- 2. passport moves left and opens ---------- */
      tl.to(orbit, { scale: 2.4, autoAlpha: 0, ease: "power1.in", duration: 0.6 }, T.openAt);
      tl.to(heroScene, { autoAlpha: 0, duration: 0.3 }, T.openAt);
      tl.to(pp, { x: () => g.countries.x, y: () => g.countries.y, scale: () => g.sCountries, ease: "power2.inOut", duration: 1 }, T.openAt);
      tl.to(book, { "--open": 1, "--tz": "-3deg", "--ty": "0deg", "--tx": "10deg", ease: "power2.inOut", duration: 0.8 }, T.openAt + 0.15);
      tl.set(front, { visibility: "hidden" }, T.openAt + 0.55);
      tl.set(back, { visibility: "visible" }, T.openAt + 0.55);
      tl.to(countriesScene, { autoAlpha: 1, duration: 0.5 }, T.openAt + 0.45);

      /* ---------- 3. one stamp per country ---------- */
      for (let i = 0; i < N; i++) {
        const at = i === 0 ? T.countriesAt - 0.08 : T.countriesAt + i;
        const s = stamp(i);
        const rot = Number(s?.dataset.rot) || 0;
        if (s) {
          tl.fromTo(
            s,
            { opacity: 0, scale: 1.8, rotation: rot + 14 },
            { opacity: 0.95, scale: 1, rotation: rot, ease: "back.out(2.2)", duration: 0.28 },
            at,
          );
        }
        if (i === 0) {
          const im = img(0);
          if (im) tl.to(im, { autoAlpha: 0.22, duration: 0.3 }, at);
          continue;
        }
        const prevStamp = stamp(i - 1);
        if (prevStamp) tl.to(prevStamp, { opacity: 0, scale: 0.9, duration: 0.18 }, at - 0.12);
        tl.to([block(i - 1), num(i - 1)], { autoAlpha: 0, y: -14, duration: 0.22 }, at - 0.15);
        tl.fromTo([block(i), num(i)], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.28 }, at + 0.05);
        const prevImg = img(i - 1);
        const im = img(i);
        if (prevImg) tl.to(prevImg, { autoAlpha: 0, duration: 0.2 }, at - 0.15);
        if (im) tl.fromTo(im, { autoAlpha: 0 }, { autoAlpha: 0.22, duration: 0.3 }, at + 0.05);
        tl.to(fill, { width: `${(i / Math.max(1, N - 1)) * 100}%`, duration: 0.3 }, at - 0.1);
        tl.fromTo(dot(i), { scale: 0 }, { scale: 1, ease: "back.out(3)", duration: 0.15 }, at + 0.15);
      }

      /* ---------- 4. passport closes and becomes the first step ---------- */
      const lastImg = img(N - 1);
      tl.to([block(N - 1), num(N - 1), ...(lastImg ? [lastImg] : [])], { autoAlpha: 0, y: -14, duration: 0.3 }, T.closeAt);
      tl.to(countriesScene, { autoAlpha: 0, duration: 0.4 }, T.closeAt + 0.15);
      tl.to(book, { "--open": 0, "--tz": "-10deg", "--tx": "6deg", ease: "power2.inOut", duration: 0.55 }, T.closeAt);
      tl.set(front, { visibility: "visible" }, T.closeAt + 0.275);
      tl.set(back, { visibility: "hidden" }, T.closeAt + 0.275);
      tl.to(pp, { x: () => g.step.x, y: () => g.step.y, scale: 18 / 330, ease: "power2.in", duration: 0.6 }, T.closeAt + 0.45);
      tl.to(pp, { autoAlpha: 0, duration: 0.12 }, T.closeAt + 0.98);
      tl.to(stepsScene, { autoAlpha: 1, duration: 0.45 }, T.closeAt + 0.5);
      tl.fromTo(stepsCopy, { y: 28 }, { y: 0, duration: 0.45 }, T.closeAt + 0.5);
      tl.to(lead, { opacity: 1, duration: 0.2 }, T.closeAt + 0.8);
      tl.fromTo(stepDot(0), { scale: 0 }, { scale: 1, ease: "back.out(3)", duration: 0.14 }, T.closeAt + 1.02);
      tl.to(stepLabel(0), { opacity: 1, duration: 0.18 }, T.closeAt + 1.02);

      /* ---------- 5. route draws through the steps to the plane ---------- */
      segs.forEach((seg, i) => {
        const at = T.stepsAt + i * 0.32;
        tl.to(seg, { strokeDashoffset: 0, duration: 0.3 }, at);
        if (stepDot(i + 1)) {
          tl.fromTo(stepDot(i + 1), { scale: 0 }, { scale: 1, ease: "back.out(3)", duration: 0.12 }, at + 0.28);
          tl.to(stepLabel(i + 1), { opacity: 1, duration: 0.15 }, at + 0.28);
        } else {
          tl.fromTo(plane, { opacity: 0, x: -30, y: 30 }, { opacity: 1, x: 0, y: 0, ease: "power2.out", duration: 0.2 }, at + 0.22);
        }
      });
      tl.to({}, { duration: 0.01 }, T.total - 0.01);

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { dependencies: [] },
  );
}