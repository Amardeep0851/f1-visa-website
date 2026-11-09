import { ArrowRight, ChevronDown, Plane } from "lucide-react";
import { countries, countriesCopy, JOURNEY_IMAGES } from "@/data/journey";
import JourneyLink from "../ui/JourneyLink";
import BrushUnderline from "../ui/BrushUnderline";
import VisaStamp from "../ui/VisaStamp";
import { FONT_BODY, FONT_DISPLAY, FONT_EDITORIAL } from "../ui/tokens";

const pad = (n: number) => String(n).padStart(2, "0");

interface CountriesSectionProps {
  onNext: () => void;
}

/**
 * Scene 3. The passport (rendered separately) sits in [data-slot="countries"].
 * Every country's text is stacked in the same grid cell; GSAP shows one at a time.
 */
export default function CountriesSection({ onNext }: CountriesSectionProps) {
  const total = countries.length;
  return (
    <section
      id="destinations"
      data-scene="countries"
      aria-labelledby="pj-countries-title"
      className={`invisible absolute inset-0 z-[1] opacity-0 ${FONT_BODY}`}
    >
      {/* Background: dotted world map, flight path, faded stamps */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden ">
        <div
          className="absolute left-[4%] top-[0%] h-[46%] w-[88%] bg-contain bg-center bg-no-repeat opacity-20  "
          style={{ backgroundImage: `url(${JOURNEY_IMAGES.worldMap})` }}
        />
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="absolute inset-0 hidden size-full lg:block">
          <path d="M70 470C60 330 170 190 300 150S520 70 600 58" fill="none" className="stroke-accent" strokeWidth="1.3" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute left-[38.5%] top-[14%] hidden size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-accent lg:grid">
          <span className="size-2.5 rounded-full bg-accent" />
        </span>
        <Plane className="absolute left-[58%] top-[6%] hidden size-12 rotate-45 fill-accent text-accent lg:block" strokeWidth={1} />
        <div className="absolute -bottom-6 -right-10 hidden w-[300px] rotate-[-8deg] opacity-[0.13] lg:block">
          <VisaStamp country={countries[(1) % total]} index={2} idSuffix="bg1" />
        </div>
        <div className="absolute bottom-[22%] right-[12%] hidden w-[220px] rotate-[10deg] opacity-[0.1] lg:block">
          <VisaStamp country={countries[(total - 2 + total) % total]} index={0} idSuffix="bg2" />
        </div>
        {countries.map((c, i) =>
          c.image ? (
            <div
              key={c.id}
              data-country-img={i}
              className="invisible absolute bottom-[12%] right-[3%] h-[34%] w-[26%] bg-contain bg-right-bottom bg-no-repeat opacity-0 mix-blend-multiply"
              style={{ backgroundImage: `url(${c.image})` }}
            />
          ) : null,
        )}
      </div>

      <p className="absolute right-4 top-7 hidden font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-accent sm:right-8 lg:right-14 sm:block lg:top-9  lg:text-[14px]">
        {countriesCopy.label}
      </p>

      <div className="relative grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-3 px-4 pb-5 pt-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)_auto] lg:gap-x-[clamp(24px,4vw,72px)] lg:px-14 lg:pb-[clamp(18px,4svh,44px)] lg:pt-[clamp(84px,12svh,120px)] ">
        {/* Passport goes here (measured, empty) */}
        <div data-slot="countries" className="relative h-[34svh] lg:col-start-1 lg:row-start-1 lg:h-auto" />

        <div className="flex min-w-0 flex-col justify-start gap-3 lg:col-start-2 lg:row-start-1 lg:gap-4  ">
          <div className="py-8">
            <h2 id="pj-countries-title" className={`${FONT_DISPLAY} text-[clamp(22px,3svh,30px)] leading-tight text-secondary lg:text-[clamp(26px,2.4vw,40px)] `}>
              {countriesCopy.heading}
            </h2>
            <p className="mt-1 hidden  text-[15px] leading-snug text-secondary/65 sm:block lg:text-[16px]">
              {countriesCopy.lead}
            </p>
          </div>

          {/* One block per country, all in the same cell */}
          <div className="grid ">
            {countries.map((c, i) => (
              <article
                key={c.id}
                data-country={i}
                aria-label={`${c.name}, ${i + 1} of ${total}`}
                className={`col-start-1 row-start-1 flex min-w-0 flex-col gap-2 lg:gap-3 ${i === 0 ? "" : "invisible opacity-0"}`}
              >
                <p className={`${FONT_DISPLAY} text-[22px] leading-none text-accent lg:text-[30px] hidden lg:block`}>
                  {pad(i + 1)} / {pad(total)}
                </p>
                <h3 className={`${FONT_DISPLAY} text-[clamp(40px,11vw,56px)] leading-[.95] tracking-[-0.005em] text-secondary lg:text-[clamp(56px,min(6.4vw,12svh),116px)]`}>
                  {c.name}
                </h3>
                <div className="relative w-fit">
                  <p className={`${FONT_EDITORIAL} text-[clamp(30px,8vw,40px)] font-medium italic leading-tight text-secondary lg:text-[clamp(38px,min(4.2vw,8svh),76px)]`}>
                    {c.tagline}
                  </p>
                  <BrushUnderline className="ml-[30%] mt-1 h-3 w-[62%] lg:h-4" />
                </div>
                <p className="max-w-[46ch] text-[15px] leading-relaxed text-secondary/70 lg:text-[clamp(16px,1.3vw,21px)]">
                  {c.description}
                </p>
                {/* <JourneyLink
                  href={c.cta.href}
                  message={`Hi, I'd like to know more about studying in ${c.name}.`}
                  className="inline-flex w-fit items-center gap-2 text-[15px] font-bold text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                >
                  {c.cta.label}
                  <ArrowRight size={16} strokeWidth={2.5} />
                </JourneyLink> */}
              </article>
            ))}
          </div>
        </div>

        {/* Bottom bar: counter, progress, scroll hint */}
        <div className="flex items-center gap-5 lg:col-span-2 lg:row-start-2 lg:gap-10">
          <p className={`${FONT_DISPLAY} flex items-center gap-2 text-[22px] leading-none text-secondary lg:text-[30px]`}>
            <span className="grid">
              {countries.map((c, i) => (
                <span key={c.id} data-country-num={i} className={`col-start-1 row-start-1 ${i === 0 ? "" : "invisible opacity-0"}`}>
                  {pad(i + 1)}
                </span>
              ))}
            </span>
            <span aria-hidden="true">—</span>
            <span>{pad(total)}</span>
          </p>

          <div className="relative flex h-4 min-w-0 flex-1 items-center justify-between lg:max-w-[440px] lg:flex-none lg:basis-[440px]" aria-hidden="true">
            <span className="absolute inset-x-1 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-secondary/15" />
            <span data-progress-fill className="absolute left-1 top-1/2 h-[3px] w-0 -translate-y-1/2 rounded-full bg-accent" />
            {countries.map((c, i) => (
              <span key={c.id} className="relative size-3.5 rounded-full border-2 border-secondary/25 bg-primary">
                <span data-progress-dot={i} className="absolute -inset-0.5 rounded-full bg-accent" />
              </span>
            ))}
          </div>

          <span aria-hidden="true" className="hidden h-12 w-px bg-secondary/15 lg:block" />
          {/* <button
            type="button"
            onClick={onNext}
            className="hidden items-center gap-4 font-mono text-[12.5px] font-semibold uppercase tracking-[0.24em] text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary lg:inline-flex"
          >
            <span className="grid size-12 place-items-center rounded-full border border-accent text-accent">
              <ChevronDown size={20} strokeWidth={2} />
            </span>
            {countriesCopy.hint}
          </button> */}
        </div>
      </div>
    </section>
  );
}