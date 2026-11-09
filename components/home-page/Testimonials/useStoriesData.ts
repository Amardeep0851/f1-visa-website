"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { loadStories, type Story } from "@/lib/home-page/testimonials";

const CACHE_KEY = "pj-stories-v1";
const CACHE_MS = 10 * 60 * 1000;

type Status = "idle" | "loading" | "ready" | "error";

function readCache(): Story[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, stories } = JSON.parse(raw) as { at: number; stories: Story[] };
    return Date.now() - at < CACHE_MS && stories.length ? stories : null;
  } catch {
    return null;
  }
}
function writeCache(stories: Story[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), stories }));
  } catch {
    /* storage full or blocked: the page still works, it just refetches next time */
  }
}

/**
 * Starts with the stories baked in at build time, then refreshes from the sheets in the
 * background, but only when the section is close to the screen and the browser is idle.
 * Nothing is fetched for visitors who never scroll this far.
 */
export function useStoriesData(initial: Story[], rootRef: RefObject<HTMLElement | null>) {
  const [stories, setStories] = useState<Story[]>(initial);
  const [status, setStatus] = useState<Status>(initial.length ? "ready" : "idle");
  const [inView, setInView] = useState(false);
  const controller = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    controller.current?.abort();
    const ctrl = new AbortController();
    controller.current = ctrl;
    const timer = window.setTimeout(() => ctrl.abort(), 10000);
    setStatus((s) => (s === "ready" ? s : "loading"));
    try {
      const fresh = await loadStories({ signal: ctrl.signal });
      writeCache(fresh);
      setStories(fresh);
      setStatus("ready");
    } catch {
      // Ignore requests cancelled because the section unmounted; a timeout still shows the error.
      if (controller.current === ctrl) setStatus((s) => (s === "ready" ? s : "error"));
    } finally {
      window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const hasIdle = typeof window.requestIdleCallback === "function";
    let idleId: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        setInView(true);
        // A fresh copy from earlier in this visit: use it, no network needed.
        const cached = readCache();
        if (cached) {
          setStories(cached);
          setStatus("ready");
          return;
        }
        const run = () => void load();
        idleId = hasIdle ? window.requestIdleCallback(run, { timeout: 2000 }) : window.setTimeout(run, 200);
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (idleId !== undefined) {
        if (hasIdle) window.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
      }
      const pending = controller.current;
      controller.current = null;
      pending?.abort();
    };
  }, [load, rootRef]);

  return { stories, status, inView, retry: load };
}