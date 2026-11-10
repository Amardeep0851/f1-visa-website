"use client";

import { useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";
import { Play } from "lucide-react";
import { imageSrc, imageSrcSet, videoThumb, videoThumbVertical, type Story } from "@/lib/home-page/testimonials";
import { FONT_DISPLAY } from "@/components/home-page/PassportJourney/ui/tokens";
import styles from "./stories.module.css";

interface StoryCardProps {
  story: Story;
  index: number;
  onOpen: (story: Story) => void;
  /** Larger card that spans two columns and two rows (first featured video). */
  featured?: boolean;
}

const label = "font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#6d6656]";

/**
 * Most story videos are Shorts, whose normal thumbnail has black bars. Try the vertical
 * thumbnail first; if YouTube has none (it returns an error or a small landscape
 * placeholder), fall back to the normal one.
 */
function VideoThumb({ id, ...rest }: { id: string } & ImgHTMLAttributes<HTMLImageElement>) {
  const [fallback, setFallback] = useState(false);
  const check = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!fallback && img.naturalWidth >= img.naturalHeight) setFallback(true);
  };
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      alt=""
      src={fallback ? videoThumb(id) : videoThumbVertical(id)}
      onLoad={check}
      onError={() => setFallback(true)}
    />
  );
}

/** Thumbnail that is cheap to load: lazy, sized by Cloudinary, YouTube thumbnail instead of the player. */
function Thumb({ story, featured, eager }: { story: Story; featured?: boolean; eager: boolean }) {
  const common = {
    loading: eager ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
    className: "absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
  };
  if (story.media.kind === "video") {
    return <VideoThumb id={story.media.id} {...common} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc(story.media.id, featured ? 960 : 540)}
      alt=""
      srcSet={imageSrcSet(story.media.id)}
      sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
      {...common}
      className={`${common.className} object-top`}
    />
  );
}
/** A story styled like a boarding pass: photo on top, perforation, then passenger details. */
export default function StoryCard({ story, index, onOpen, featured = false }: StoryCardProps) {
  const isVideo = story.media.kind === "video";
  const title = story.name || story.description;
  const open = () => onOpen(story);

  if (featured) {
    return (
      <article
        className={`${styles.card} group relative overflow-hidden rounded-2xl bg-[#0d0d0d] sm:col-span-2 sm:row-span-2`}
        style={{ ["--i" as string]: index }}
      >
        <button
          type="button"
          onClick={open}
          className="relative block aspect-[4/5] size-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:aspect-auto sm:min-h-[420px]"
          aria-label={`${isVideo ? "Play video" : "Open story"}: ${title}`}
        >
          <Thumb story={story} featured eager={index < 2} />
          <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          {isVideo && (
            <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-accent shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 size-7" fill="currentColor" aria-hidden="true" />
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-white sm:p-8">
            {story.tag && (
              <span className="w-fit rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">{story.tag}</span>
            )}
            <span className={`${FONT_DISPLAY} text-[clamp(30px,4vw,52px)] leading-[.95]`}>{story.description || story.name}</span>
            {story.description && story.name && <span className="text-[15px] text-white/75">{story.name}</span>}
          </span>
        </button>
      </article>
    );
  }

  return (
    <article
      className={`${styles.card} group flex flex-col overflow-hidden rounded-2xl bg-[#fbf7ee] text-[#17202b] shadow-[0_24px_40px_-24px_rgb(0_0_0/0.6)] transition-transform duration-300 hover:-translate-y-1.5`}
      style={{ ["--i" as string]: index % 8 }}
    >
      <button
        type="button"
        onClick={open}
        className="relative block aspect-[4/5] overflow-hidden bg-[#e9e2d3] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
        aria-label={`${isVideo ? "Play video" : "Open story"}: ${title}`}
      >
        <Thumb story={story} eager={false} />
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white">
          {story.category === "tourist" ? "Tourist visa" : "Study visa"}
        </span>
        {isVideo && (
          <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-accent shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 size-5" fill="currentColor" aria-hidden="true" />
          </span>
        )}
      </button>

      <div className={`${styles.perforation} mt-0`} />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <dl className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-x-3 gap-y-2.5">
          <div className="min-w-0">
            <dt className={label}>Passenger</dt>
            <dd className={`${FONT_DISPLAY} truncate text-[20px] uppercase leading-tight`}>{story.name || "Our student"}</dd>
          </div>
          <div className="min-w-0">
            <dt className={label}>From</dt>
            <dd className="truncate text-[14px] font-bold capitalize leading-tight">{story.location.toLowerCase() || "Punjab"}</dd>
          </div>
          <div className="col-span-2 min-w-0">
            <dt className={label}>Visa</dt>
            <dd className="truncate text-[14px] font-bold leading-tight text-accent">{story.visa}</dd>
          </div>
        </dl>
        {story.description && <p className="line-clamp-3 text-[14px] leading-relaxed text-[#17202b]/70">{story.description}</p>}
        <button
          type="button"
          onClick={open}
          className="mt-auto w-fit font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#17202b] underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {isVideo ? "Watch story" : "Read story"} →
        </button>
      </div>
    </article>
  );
}