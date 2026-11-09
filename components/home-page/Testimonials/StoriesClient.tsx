"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ArrowRight, RotateCw } from "lucide-react";
import { storiesCopy, STORIES_PAGE_SIZE } from "@/data/home-page/testimonials";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";
import type { Story } from "@/lib/home-page/testimonials";
import BrushUnderline from "@/components/PassportJourney/ui/BrushUnderline";
import { FONT_BODY, FONT_DISPLAY, FONT_EDITORIAL } from "@/components/PassportJourney/ui/tokens";
import StoryCard from "./StoryCard";
import StoryDialog from "./StoryDialog";
import StoriesMarquee from "./StoriesMarquee";
import StoriesSkeleton from "./StoriesSkeleton";
import StoryFilters, { type StoryFilter } from "./StoryFilters";
import { useStoriesData } from "./useStoriesData";
import styles from "./stories.module.css";

const matches = (s: Story, f: StoryFilter) =>
  f === "all" || (f === "video" ? s.media.kind === "video" : s.category === f);

/** All three sheets shown as one list, with filters, "show more" and a story popup. */
export default function StoriesClient({ initial }: { initial: Story[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const { stories, status, inView, retry } = useStoriesData(initial, rootRef);
  const [filter, setFilter] = useState<StoryFilter>("all");
  const [visible, setVisible] = useState(STORIES_PAGE_SIZE);
  const [open, setOpen] = useState<Story | null>(null);

  const counts = useMemo(
    () => ({
      all: stories.length,
      study: stories.filter((s) => s.category === "study").length,
      tourist: stories.filter((s) => s.category === "tourist").length,
      video: stories.filter((s) => s.media.kind === "video").length,
    }),
    [stories],
  );

  // The first featured video gets the big card; everything else follows in order.
  const { featured, rest } = useMemo(() => {
    const list = stories.filter((s) => matches(s, filter));
    const feat = filter === "all" || filter === "video" ? list.find((s) => s.priority && s.media.kind === "video") : undefined;
    return { featured: feat, rest: feat ? list.filter((s) => s !== feat) : list };
  }, [stories, filter]);

  const shown = rest.slice(0, visible);
  const hasMore = rest.length > visible;
  const changeFilter = useCallback((f: StoryFilter) => {
    setFilter(f);
    setVisible(STORIES_PAGE_SIZE);
  }, []);
  const close = useCallback(() => setOpen(null), []);

  const empty = stories.length === 0;

  return (
    <section
      ref={rootRef}
      id="stories"
      aria-labelledby="stories-title"
      className={`relative overflow-hidden bg-secondary py-20 text-primary sm:py-24 lg:py-32 ${FONT_BODY}`}
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-14">
        <p className="flex items-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-primary/80 lg:text-[14px]">
          <span aria-hidden="true" className="h-0.5 w-8 bg-accent" />
          {storiesCopy.label}
        </p>

        <div className="mt-8 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <h2 id="stories-title" className={`${FONT_DISPLAY} text-[clamp(44px,11vw,72px)] leading-[.92] lg:text-[clamp(64px,6vw,118px)]`}>
              <span className="block">{storiesCopy.heading}</span>
              <span className={`${FONT_EDITORIAL} block w-fit pb-[0.12em] font-medium italic leading-none text-[#ef4444]`}>
                {storiesCopy.accent}
              </span>
              <span aria-hidden="true" className="block">
                <BrushUnderline className="ml-[14%] -mt-2 block h-3 w-[40%] lg:h-4" />
              </span>
            </h2>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-primary/70 lg:text-[clamp(17px,1.35vw,21px)]">{storiesCopy.intro}</p>
          </div>
          {!empty && <StoryFilters value={filter} counts={counts} onChange={changeFilter} />}
        </div>
      </div>

      {!empty && (
        <div className="mt-12 lg:mt-16">
          <StoriesMarquee stories={stories} />
        </div>
      )}

      <div className="mx-auto mt-12 max-w-[1500px] px-4 sm:px-8 lg:mt-16 lg:px-14">
        <p aria-live="polite" className="sr-only">
          {status === "loading" && empty ? "Loading stories" : `${featured ? rest.length + 1 : rest.length} stories shown in ${storiesCopy.filters[filter]}`}
        </p>

        {empty && status === "error" ? (
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-primary/15 p-8">
            <p className="text-[17px] text-primary/80">{storiesCopy.error}</p>
            <button
              type="button"
              onClick={() => void retry()}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 font-semibold transition hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <RotateCw size={16} aria-hidden="true" /> {storiesCopy.retry}
            </button>
          </div>
        ) : (
           <div
            data-inview={inView}
            className={`${styles.grid} grid grid-flow-row-dense grid-cols-1 gap-5 [--notch:var(--color-secondary,#141414)] sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4`}
          >
            {empty ? (
              <StoriesSkeleton count={4} />
            ) : (
              <>
                {featured && <StoryCard story={featured} index={0} onOpen={setOpen} featured />}
                {shown.map((s, i) => (
                  <StoryCard key={s.key} story={s} index={i + 1} onOpen={setOpen} />
                ))}
              </>
            )}
          </div>
        )}

        {!empty && !featured && rest.length === 0 && <p className="text-primary/70">{storiesCopy.empty}</p>}

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          {hasMore ? (
            <button
              type="button"
              onClick={() => setVisible((v) => v + STORIES_PAGE_SIZE)}
              className="inline-flex items-center gap-3 rounded-full border border-primary/30 px-6 py-3 font-semibold transition hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {storiesCopy.showMore}
              <span className="font-mono text-[12px] text-primary/50">+{Math.min(STORIES_PAGE_SIZE, rest.length - visible)}</span>
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => handleWhatsappClickWithMessage("Hi, I read the student stories on your website and want to start my own visa application.")}
            className="inline-flex items-center gap-4 rounded-lg bg-accent py-3 pl-6 pr-3 text-[17px] font-bold text-white transition hover:bg-[#991b1b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {storiesCopy.cta}
            <span className="grid size-8 place-items-center rounded-full bg-white text-accent">
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>

      <StoryDialog story={open} onClose={close} />
    </section>
  );
}