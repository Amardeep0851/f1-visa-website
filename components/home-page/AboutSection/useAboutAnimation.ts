"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const format = (n: number) => Math.round(n).toLocaleString("en-IN");

/**
 * Entrance animations for the About section. They play once as each part scrolls in.
 * The markup already shows the final state, so with reduced motion nothing is hidden.
 */
export function useAboutAnimation(rootRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
        const once = (trigger: Element, start = "top 80%") => ({ trigger, start, once: true });

        // Heading lines rise out of a mask, then the brush stroke paints under them
        const title = root.querySelector("#about-title");
        if (title) {
          const tl = gsap.timeline({ scrollTrigger: once(title, "top 85%") });
          tl.from(q("[data-about-line]"), { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.12 });
          tl.from(title.querySelectorAll("svg"), { scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "power2.out" }, "-=0.45");
        }

        // Text blocks and promise rows
        q("[data-about-reveal]").forEach((el) => {
          gsap.from(el, { y: 32, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: once(el, "top 88%") });
        });
        q("[data-about-rule]").forEach((el) => {
          gsap.from(el, { scaleX: 0, duration: 1, ease: "power2.inOut", scrollTrigger: once(el, "top 90%") });
        });

        // Profile card: tilts in, the stamp lands with a small shake, then the MRZ lines type out
        const card = root.querySelector<HTMLElement>("[data-about-card]");
        if (card) {
          const stamp = card.querySelector("[data-about-stamp]");
          const mrz = q("[data-about-mrz]");
          const tl = gsap.timeline({ scrollTrigger: once(card, "top 80%") });
          tl.from(card, { rotateY: -24, rotateX: 14, y: 90, autoAlpha: 0, duration: 1.2, ease: "power3.out" });
          if (stamp) {
            tl.fromTo(stamp, { scale: 2.3, rotation: 18, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.45, ease: "back.out(2.2)" }, "-=0.25");
            tl.to(card, { x: 4, duration: 0.05, yoyo: true, repeat: 3, ease: "none" }, "-=0.12");
          }
          tl.fromTo(
            mrz,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "steps(44)", stagger: 0.35 },
            "-=0.1",
          );

          // Gentle tilt that follows the mouse (desktop only)
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
            const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
            const move = (e: PointerEvent) => {
              const r = card.getBoundingClientRect();
              ry(((e.clientX - r.left) / r.width - 0.5) * 10);
              rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
            };
            const leave = () => {
              rx(0);
              ry(0);
            };
            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", leave);
            return () => {
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", leave);
            };
          }
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Numbers count up from zero
        root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count) || 0;
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onStart: () => {
              el.textContent = "0";
            },
            onUpdate: () => {
              el.textContent = format(counter.v);
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );
}