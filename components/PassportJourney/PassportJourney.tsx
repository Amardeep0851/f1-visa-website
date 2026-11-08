"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { fontVars } from "./fonts";
import JourneyNav from "./JourneyNav";
import HeroScene from "./HeroScene";
import RouteScene from "./RouteScene";
import ClosingScene from "./ClosingScene";
import IndianPassport from "./IndianPassport";
import CursorFollower from "./CursorFollower";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Timeline, as fractions of the whole scroll story. Stamps land in the order us, ca, nl, ae. */
const STAMP_ORDER = ["us", "ca", "nl", "ae"] as const;
const STAMP_START = [0.33, 0.445, 0.56, 0.675] as const;
const STAMP_DUR = 0.04;
const STAMP_STOPS = STAMP_START.map((s) => s + STAMP_DUR);
const STEP_EDGES = [0.43, 0.545, 0.66] as const; // where the step switches 1, 2, 3
const ROUTE_FROM = 0.3;
const ROUTE_TO = 0.74;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lin = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
const sm = (p: number, a: number, b: number) => {
  const t = lin(p, a, b);
  return t * t * (3 - 2 * t);
};

interface Slot {
  x: number;
  y: number;
  s: number;
}

export default function PassportJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const stepRef = useRef(0);
  const startedRef = useRef(false);

  const goTo = useCallback((stop: number) => {
    const story = storyRef.current;
    const stage = stageRef.current;
    if (!story || !stage) return;
    const range = story.offsetHeight - stage.offsetHeight;
    const top = story.getBoundingClientRect().top + window.scrollY + stop * range;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const story = storyRef.current;
      const stage = stageRef.current;
      if (!root || !story || !stage) return;
      const q = <T extends Element = HTMLElement>(sel: string) => stage.querySelector<T>(sel);
      const sceneA = q('[data-scene="a"]')!;
      const sceneB = q('[data-scene="b"]')!;
      const sceneC = q('[data-scene="c"]')!;
      const pp = q("[data-pp]")!;
      const book = q("[data-book]")!;
      const boxA = q('[data-box="a"]')!;
      const boxB = q('[data-box="b"]')!;
      const drift = Array.from(stage.querySelectorAll<HTMLElement>("[data-pa]"));
      const stamps = STAMP_ORDER.map((k) => q(`[data-stamp="${k}"]`)!);
      const sketchesB = Array.from(sceneB.querySelectorAll<SVGPathElement>("[data-sketch]"));
      const sketchesC = Array.from(sceneC.querySelectorAll<SVGPathElement>("[data-sketch]"));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* Measure the three slots the passport travels between. */
      let geo: { a: Slot; b: Slot; c: Slot } = { a: { x: 0, y: 0, s: 1 }, b: { x: 0, y: 0, s: 1 }, c: { x: 0, y: 0, s: 1 } };
      const measure = () => {
        const sr = stage.getBoundingClientRect();
        const slot = (sel: string, fit: (w: number, h: number) => number): Slot => {
          const r = q(sel)!.getBoundingClientRect();
          return { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2, s: fit(r.width, r.height) };
        };
        geo = {
          a: slot('[data-slot="a"]', (w, h) => Math.min((0.74 * h) / 330, (0.8 * w) / 230)),
          b: slot('[data-slot="b"]', (w, h) => Math.min((0.82 * w) / 460, (0.8 * h) / 330)),
          c: slot('[data-slot="c"]', (w, h) => Math.min((0.66 * h) / 330, (0.62 * w) / 230)),
        };
      };

      const setLayer = (el: Element, o: number) => gsap.set(el, { autoAlpha: o });

      /* Everything on screen is a pure function of scroll progress p (0 to 1). */
      const render = (p: number) => {
        const { a, b, c } = geo;
        const t1 = sm(p, 0.04, 0.26);
        const t2 = sm(p, 0.74, 0.9);
        gsap.set(pp, {
          x: lerp(lerp(a.x, b.x, t1), c.x, t2),
          y: lerp(lerp(a.y, b.y, t1), c.y, t2),
          scale: lerp(lerp(a.s, b.s, t1), c.s, t2),
          opacity: 1 - 0.72 * t2,
        });

        const open = sm(p, 0.16, 0.3) * (1 - sm(p, 0.72, 0.84));
        const flat = 1 - open;
        book.style.setProperty("--open", open.toFixed(4));
        book.style.setProperty("--ty", `${(-22 * flat - 12 * t2 * flat).toFixed(2)}deg`);
        book.style.setProperty("--tx", `${lerp(8, 10, open).toFixed(2)}deg`);
        book.style.setProperty("--tz", `${(-4 * flat - 4 * t2 * flat).toFixed(2)}deg`);

        // Scene A: headline words drift down and away
        const ea = sm(p, 0, 0.2);
        drift.forEach((el) => {
          const dx = Number(el.dataset.dx) || 0;
          const dy = Number(el.dataset.dy) || 0;
          gsap.set(el, { x: dx * ea, y: dy * ea + ea * 60 });
        });
        setLayer(sceneA, 1 - sm(p, 0.1, 0.22));

        // Scene B: box draws itself in, red dot travels along its top edge
        const inB = sm(p, 0.14, 0.28);
        const outB = sm(p, 0.74, 0.84);
        setLayer(sceneB, inB * (1 - outB));
        const drawB = 1 - lin(p, 0.14, 0.3);
        sketchesB.forEach((el) => el.style.setProperty("stroke-dashoffset", drawB.toFixed(3)));
        boxB.style.setProperty("--p", lin(p, ROUTE_FROM, ROUTE_TO).toFixed(4));

        const idx = p < STEP_EDGES[0] ? 0 : p < STEP_EDGES[1] ? 1 : p < STEP_EDGES[2] ? 2 : 3;
        if (idx !== stepRef.current) {
          stepRef.current = idx;
          setStep(idx);
        }
        const isStarted = p >= ROUTE_FROM;
        if (isStarted !== startedRef.current) {
          startedRef.current = isStarted;
          setStarted(isStarted);
        }

        // Stamps slam down one by one
        stamps.forEach((el, i) => {
          const t = lin(p, STAMP_START[i], STAMP_START[i] + STAMP_DUR);
          const rot = Number(el.dataset.rot) || 0;
          if (t <= 0) {
            el.style.opacity = "0";
            return;
          }
          const e = 1 - Math.pow(1 - Math.min(1, t / 0.6), 3);
          let sc = 1 + (1 - e) * 0.9;
          if (t > 0.6) sc -= 0.05 * Math.sin((Math.PI * (t - 0.6)) / 0.4);
          el.style.opacity = (Math.min(1, t * 3) * 0.92).toFixed(3);
          el.style.transform = `rotate(${(rot + (1 - e) * 10).toFixed(2)}deg) scale(${sc.toFixed(3)})`;
        });

        // Scene C
        setLayer(sceneC, sm(p, 0.8, 0.9));
        const drawC = 1 - lin(p, 0.78, 0.9);
        sketchesC.forEach((el) => el.style.setProperty("stroke-dashoffset", drawC.toFixed(3)));
      };

      measure();
      const proxy = { p: 0 };
      const st = ScrollTrigger.create({
        trigger: story,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onRefresh: () => {
          measure();
          render(proxy.p);
        },
        onUpdate: (self) => {
          if (reduce) {
            proxy.p = self.progress;
            render(proxy.p);
            return;
          }
          gsap.to(proxy, { p: self.progress, duration: 0.45, ease: "power3.out", overwrite: true, onUpdate: () => render(proxy.p) });
        },
      });
      proxy.p = st.progress;
      render(proxy.p);

      // Fonts change text metrics, so re-measure once they are ready.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      /* Intro: hero box draws on, passport settles in, red dot starts its loop. */
      const intro = q("[data-intro]")!;
      const sketchesA = Array.from(sceneA.querySelectorAll<SVGPathElement>("[data-sketch]"));
      if (!reduce) {
        gsap.from(sketchesA, { strokeDashoffset: 1, duration: 1.5, ease: "power2.out", stagger: 0.18 });
        gsap.from(intro, { opacity: 0, scale: 0.55, y: 24, duration: 1.2, ease: "power3.out", delay: 0.25 });
        gsap.fromTo(boxA, { "--p": 0 }, { "--p": 1, duration: 3.4, ease: "power1.inOut", repeat: -1, repeatDelay: 0.5 });
      } else {
        gsap.set(boxA, { "--p": 0.5 });
      }
    },
    { scope: rootRef },
  );

  /* Re-trigger the text entrance when the step changes. */
  const firstStep = useRef(true);
  useEffect(() => {
    if (firstStep.current) {
      firstStep.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = stageRef.current?.querySelector("[data-step-copy]");
    if (el) gsap.fromTo(el.children, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out", overwrite: true });
  }, [step]);

  return (
    <div
      ref={rootRef}
      className={`pj ${fontVars} bg-(--pj-bg) font-(family-name:--font-pj-body) text-(--pj-ink) antialiased`}
    >
      <JourneyNav onGo={goTo} />
      <div ref={storyRef} className="relative h-[660svh]">
        <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden bg-(--pj-bg)">
          <HeroScene onGo={goTo} />
          <RouteScene onGo={goTo} stampStops={STAMP_STOPS} active={step} started={started} />
          <IndianPassport />
          <ClosingScene />
        </div>
      </div>
      <CursorFollower />
    </div>
  );
}
