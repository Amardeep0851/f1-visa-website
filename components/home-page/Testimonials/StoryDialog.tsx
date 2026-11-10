"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { fullImageSrc, videoEmbed, type Story } from "@/lib/home-page/testimonials";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";
import { storiesCopy } from "@/data/home-page/testimonials";
import { FONT_DISPLAY } from "@/components/home-page/PassportJourney/ui/tokens";

interface StoryDialogProps {
  story: Story | null;
  onClose: () => void;
}

/**
 * Full story in a native <dialog>: it keeps focus inside, closes on Escape or a click on
 * the backdrop, and returns focus to the card. The YouTube player only exists while the dialog is open.
 */
export default function StoryDialog({ story, onClose }: StoryDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (story && !dialog.open) {
      dialog.showModal();
      // Start on the close button, not inside the video, so Escape and Tab work right away.
      closeRef.current?.focus();
    }
    if (!story && dialog.open) dialog.close();
  }, [story]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="story-dialog-title"
      className="m-auto w-[min(1040px,calc(100vw-24px))] max-w-none overflow-hidden rounded-2xl bg-[#fbf7ee] p-0 text-[#17202b] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      {story && (
        <div className="grid max-h-[90svh] overflow-y-auto md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:overflow-hidden">
          <div className="relative grid min-h-[50svh] place-items-center bg-black md:max-h-[90svh]">
            {story.media.kind === "video" ? (
              <iframe
                src={videoEmbed(story.media.id)}
                title={`Video: ${story.name || story.description}`}
                className="aspect-[9/16] h-full max-h-[90svh] w-full md:aspect-auto md:min-h-[560px]"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={fullImageSrc(story.media.id)}
                alt={`${story.name || "Student"} with their visa`}
                className="max-h-[70svh] w-full object-contain md:max-h-[90svh]"
              />
            )}
          </div>

          <div className="flex flex-col gap-5 p-6 sm:p-8 md:overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              {story.tag ? (
                <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white">{story.tag}</span>
              ) : (
                <span />
              )}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close story"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-[#17202b]/20 transition hover:border-[#17202b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X size={18} />
              </button>
            </div>
            <div>
              <h3 id="story-dialog-title" className={`${FONT_DISPLAY} text-[clamp(32px,4vw,48px)] uppercase leading-[.95]`}>
                {story.name || story.description}
              </h3>
              <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6d6656]">
                {[story.location, story.visa].filter(Boolean).join(" · ")}
              </p>
            </div>
            {story.description && story.name && (
              <p className="whitespace-pre-line text-[16px] leading-relaxed text-[#17202b]/80">{story.description}</p>
            )}
            <button
              type="button"
              onClick={() => handleWhatsappClickWithMessage(`Hi, I saw ${story.name || "a student"}'s story on your website and want to start my own.`)}
              className="mt-auto inline-flex w-fit items-center gap-4 rounded-lg bg-accent py-3 pl-6 pr-3 text-[16px] font-bold text-white transition hover:bg-[#991b1b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17202b]"
            >
              {storiesCopy.cta}
              <span className="grid size-8 place-items-center rounded-full bg-white text-accent">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}