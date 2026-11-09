"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { loaderCopy } from "@/data/journey";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SEEN_KEY = "pj-loader-seen";

function shouldSkipLoader() {
  try {
    return Boolean(sessionStorage.getItem(SEEN_KEY)) || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Scene 0 and the hero entrance.
 * Loader: names cycle inside the circle (whole thing = loaderCopy.totalSeconds),
 * then the circle flies into the hero circle and the hero animates in.
 * If the loader was skipped (seen this session / reduced motion) only the red arc animates in.
 */
export function useJourneyIntro(stageRef: RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const html = document.documentElement;
    const loader = document.querySelector<HTMLElement>("[data-loader]");
    const arc = stage.querySelector<SVGGElement>("[data-orbit-arc]");
    const line = stage.querySelector<SVGPathElement>("[data-orbit-line]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const playArc = (delay: number) => {
      if (!arc || !line || reduce) return;
      gsap.fromTo(arc, { rotation: -170, svgOrigin: "50 50" }, { rotation: 0, svgOrigin: "50 50", duration: 1.5, ease: "power3.out", delay });
      gsap.fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", delay });
    };

        if (!loader || shouldSkipLoader()) {
      if (loader) loader.style.display = "none";
      playArc(0.2);
      return;
    }

    /* ---------- loader ---------- */
    const reveal = Array.from(stage.querySelectorAll<HTMLElement>('[data-scene="hero"] [data-reveal]'));
    const header = stage.querySelector("header");
    const orbitSvg = stage.querySelector("[data-orbit] svg");
    const ppIntro = stage.querySelector("[data-pp-intro]");
    const circle = loader.querySelector<HTMLElement>("[data-loader-circle]")!;
    const bg = loader.querySelector("[data-loader-bg]");
    const progress = loader.querySelector("[data-loader-progress]");
    const label = loader.querySelector("[data-loader-label]");
    const names = Array.from(loader.querySelectorAll<HTMLElement>("[data-loader-name]"));

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    html.style.overflow = "hidden";

    gsap.set(reveal, { autoAlpha: 0, y: 34 });
    gsap.set([header, orbitSvg], { autoAlpha: 0 });
    gsap.set(ppIntro, { autoAlpha: 0, scale: 0.6, y: 30 });

    const total = loaderCopy.totalSeconds;
    const exit = 0.9;
    const per = (total - exit) / Math.max(1, names.length);

    const finish = () => {
      loader.style.display = "none";
      html.style.overflow = "";
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage blocked: the loader simply shows again next time */
      }
      ScrollTrigger.refresh();
    };

    const tl = gsap.timeline();
    tl.to(progress, { strokeDashoffset: 0, duration: total - exit, ease: "none" }, 0);
    names.forEach((n, i) => {
      tl.fromTo(n, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: per * 0.35, ease: "power2.out" }, i * per);
      tl.to(n, { autoAlpha: 0, y: -18, duration: per * 0.3, ease: "power2.in" }, i * per + per * 0.7);
    });

    // Circle flies into the hero circle
    const exitAt = total - exit;
    tl.to(label, { autoAlpha: 0, duration: 0.25 }, exitAt);
    tl.to(circle, {
      x: () => {
        const a = circle.getBoundingClientRect();
        const b = stage.querySelector('[data-slot="hero"]')!.getBoundingClientRect();
        return b.left + b.width / 2 - (a.left + a.width / 2);
      },
      y: () => {
        const a = circle.getBoundingClientRect();
        const b = stage.querySelector('[data-slot="hero"]')!.getBoundingClientRect();
        return b.top + b.height / 2 - (a.top + a.height / 2);
      },
      scale: () => {
        const a = circle.getBoundingClientRect();
        const b = stage.querySelector('[data-slot="hero"]')!.getBoundingClientRect();
        return b.width / a.width;
      },
      duration: exit,
      ease: "power3.inOut",
    }, exitAt);
    tl.to(progress, { autoAlpha: 0, duration: 0.3 }, exitAt);
    tl.to(bg, { autoAlpha: 0, duration: exit * 0.85, ease: "power1.inOut" }, exitAt + 0.1);

    // Hero comes in as the circle lands
    const landAt = total - 0.12;
    tl.set(orbitSvg, { autoAlpha: 1 }, landAt);
    tl.set(circle, { autoAlpha: 0 }, landAt);
    tl.add(() => playArc(0), landAt);
    tl.to(ppIntro, { autoAlpha: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.6)" }, landAt - 0.1);
    tl.to(header, { autoAlpha: 1, duration: 0.6 }, landAt);
    tl.to(reveal, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07 }, landAt);
    tl.add(finish, landAt + 0.15);
  });
}