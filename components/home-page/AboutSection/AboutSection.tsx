"use client";

import { useRef } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { aboutCopy, aboutStats, OFFICE, promises } from "@/data/home-page/about";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";
import BrushUnderline from "@/components/PassportJourney/ui/BrushUnderline";
import { FONT_BODY, FONT_DISPLAY, FONT_EDITORIAL } from "@/components/PassportJourney/ui/tokens";
import IdentityCard from "./IdentityCard";
import { useAboutAnimation } from "./useAboutAnimation";

const pad = (n: number) => String(n).padStart(2, "0");
const format = (n: number) => n.toLocaleString("en-IN");

/** About us: who we are, what we promise, numbers, and a real office you can visit. */
export default function AboutSection() {
  const rootRef = useRef<HTMLElement>(null);
  useAboutAnimation(rootRef);

  return (
    <section
      ref={rootRef}
      id="about"
      aria-labelledby="about-title"
      className={`relative overflow-hidden bg-primary px-4 py-20 text-secondary sm:px-8 sm:py-24 lg:px-14 lg:py-32 ${FONT_BODY}`}
    >
      <div className="mx-auto max-w-[1500px]">
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-accent lg:text-[14px]">{aboutCopy.label}</p>

        {/* Phones/tablets: heading, card, promises. Desktop: text left, card right (sticky). */}
        <div className="mt-8 grid gap-12 lg:mt-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:grid-rows-[auto_1fr] xl:gap-x-[clamp(40px,5vw,96px)] xl:gap-y-0">
          <div className="min-w-0 xl:col-start-1 xl:row-start-1">
            <h2 id="about-title" className={`${FONT_DISPLAY} text-[clamp(44px,11vw,72px)] leading-[.92] lg:text-[clamp(64px,6vw,118px)]`}>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-about-line className="block">
                  {aboutCopy.heading}
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <span data-about-line className={`${FONT_EDITORIAL} relative block w-fit font-medium italic leading-none text-accent`}>
                  {aboutCopy.accent}
                </span>
              </span>
              <span aria-hidden="true" className="block">
                <BrushUnderline className="ml-[18%] -mt-2 block h-3 w-[46%] origin-left lg:h-4" />
              </span>
            </h2>

            <p data-about-reveal className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-secondary/70 lg:mt-8 lg:text-[clamp(17px,1.35vw,21px)]">
              {aboutCopy.intro}
            </p>
          </div>

          {/* Passport-style profile card */}
          <div className="min-w-0 xl:sticky xl:top-24 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:self-start">
            <div className="mx-auto max-w-[620px] xl:max-w-none">
              <IdentityCard />
            </div>
          </div>

          {/* Promises */}
          <div className="min-w-0 xl:col-start-1 xl:row-start-2">
            <h3 data-about-reveal className="font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-secondary/80 xl:mt-16">
              {aboutCopy.promisesTitle}
            </h3>
            <ol className="mt-4">
              {promises.map((p, i) => (
                <li key={p.title} data-about-reveal className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 py-5 sm:gap-x-8">
                  <span aria-hidden="true" data-about-rule className="absolute inset-x-0 top-0 h-px origin-left bg-secondary/15" />
                  <span className={`${FONT_DISPLAY} text-[28px] leading-none text-accent sm:text-[34px]`}>{pad(i + 1)}</span>
                  <div className="min-w-0">
                    <p className="text-[17px] font-bold leading-snug sm:text-[19px]">{p.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-secondary/65 sm:text-[16px]">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Numbers */}
        <dl className="mt-20 grid grid-cols-2 border-y border-secondary/15 lg:mt-28 lg:grid-cols-4">
          {aboutStats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse gap-2 px-2 py-8 sm:px-6 lg:py-10 ${i % 2 ? "border-l border-secondary/15" : ""} ${i > 1 ? "border-t border-secondary/15 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary/70 sm:text-[12px]">{s.label}</dt>
              <dd className={`${FONT_DISPLAY} text-[clamp(44px,10vw,64px)] leading-none lg:text-[clamp(56px,5vw,92px)]`}>
                <span data-count={s.value}>{format(s.value)}</span>
                <span className="text-accent">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Office */}
        <div data-about-reveal className="mt-16 grid gap-8 rounded-2xl border border-secondary/15 bg-white/40 p-6 sm:p-8 lg:mt-20 lg:p-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Visit our office</p>
              <p className={`${FONT_DISPLAY} mt-2 text-[30px] leading-none sm:text-[36px]`}>Come say hello.</p>
              <address className="mt-4 flex gap-3 text-[15px] not-italic leading-relaxed text-secondary/75">
                <MapPin className="mt-1 size-5 shrink-0 text-accent" strokeWidth={1.8} aria-hidden="true" />
                <span>
                  {OFFICE.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </address>
            </div>
            <div className="flex flex-col justify-end gap-3 text-[15px] text-secondary/80">
              <a href={OFFICE.phoneHref} className="inline-flex w-fit items-center gap-3 font-semibold hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
                <Phone className="size-5 text-accent" strokeWidth={1.8} aria-hidden="true" />
                {OFFICE.phoneDisplay}
              </a>
              <a href={`mailto:${OFFICE.email}`} className="inline-flex w-fit items-center gap-3 font-semibold hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
                <Mail className="size-5 text-accent" strokeWidth={1.8} aria-hidden="true" />
                {OFFICE.email}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleWhatsappClickWithMessage("Hi, I'd like to book a visit to your Jalandhar office.")}
              className="inline-flex items-center gap-4 rounded-lg bg-accent py-3 pl-6 pr-3 text-[16px] font-bold text-white shadow-[0_10px_24px_rgb(185_28_28/0.18)] transition hover:-translate-y-0.5 hover:bg-[#991b1b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Book a visit
              <span className="grid size-8 place-items-center rounded-full bg-white text-accent">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </button>
            <a
              href={OFFICE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-secondary/25 px-6 py-3 text-[16px] font-bold transition hover:border-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}