"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Small dot plus a lagging ring, only on devices with a real mouse. */
export default function CursorFollower() {
  const dot = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches || !dot.current || !ring.current) return;
    const d = dot.current;
    const r = ring.current;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });
    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([d, r], { x: e.clientX, y: e.clientY });
        gsap.to([d, r], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      <span ref={ring} className="invisible absolute left-0 top-0 size-11 rounded-full border border-secondary/70" />
      <span ref={dot} className="invisible absolute left-0 top-0 size-2 rounded-full bg-secondary" />
    </div>
  );
}