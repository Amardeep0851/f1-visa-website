import { ArrowRight, BriefcaseBusiness, GraduationCap, Users } from "lucide-react";
import { heroCopy, type NavTarget } from "@/data/journey";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";
import JourneyLink from "../ui/JourneyLink";
import OrbitCircle from "../ui/OrbitCircle";
import SpinBadge from "../ui/SpinBadge";
import { FONT_BODY, FONT_DISPLAY, FONT_EDITORIAL, HIGHLIGHT } from "../ui/tokens";
import RedButton from "@/components/Red-Buttons";
import BlackButton from "@/components/BlackButton";

const ICONS = { study: GraduationCap, tourist: BriefcaseBusiness, other: Users } as const;

interface HeroSectionProps {
  onGo: (target: NavTarget) => void;
}

const titleWord = `${FONT_DISPLAY} whitespace-nowrap leading-[.9] tracking-[-0.005em] text-secondary text-[clamp(40px,11vw,64px)] lg:text-[clamp(56px,min(5.4vw,12svh),112px)]`;

/**
 * Scene 1. Copy of the mockup. Each block has a [data-drift] wrapper (moved by scroll)
 * and a [data-reveal] child (animated in after the loader), so the two never fight.
 */
export default function HeroSection({ onGo }: HeroSectionProps) {
  return (
    <section
      data-scene="hero"
      aria-labelledby="pj-hero-title"
      className={`absolute inset-0 z-[2] flex flex-col justify-between gap-4 px-4 pb-6 pt-24 [--cd:clamp(180px,62vw,200px)] sm:px-8 lg:gap-0 lg:px-14 lg:pb-[clamp(20px,4svh,48px)] lg:pl-28 lg:pt-[clamp(84px,12svh,120px)] lg:[--cd:clamp(260px,min(24vw,46svh),440px)] ${FONT_BODY}`}
    >
      <h1 id="pj-hero-title " className="sr-only">
        {heroCopy.titleLeft} {heroCopy.titleRight} {heroCopy.accentA} {heroCopy.accentB}
      </h1>

      {/* Vertical label */}
      <div data-drift data-dx="-40" data-dy="0" aria-hidden="true" className="absolute left-10 top-1/2 hidden -translate-y-1/2 lg:block ">
        <div data-reveal className="flex flex-col items-center gap-4">
          <span className="rotate-180 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-secondary/80 [writing-mode:vertical-rl]">
            {heroCopy.vertical}
          </span>
          <span className="size-1.5 bg-accent" />
          <span className="h-16 w-px bg-secondary/70" />
        </div>
      </div>

      <div aria-hidden="true" className="flex flex-col ">
        <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-[auto_var(--cd)_auto] lg:justify-between lg:gap-[clamp(20px,3vw,56px)] ">
          <div data-drift data-dx="-120" data-dy="0" className="justify-self-start ">
            <span data-reveal className={`block ${titleWord}`}>{heroCopy.titleLeft}</span>
          </div>

          {/* Static slot (measured), with the moving circle inside */}
          <div data-slot="hero" className=" relative order-last mx-auto mt-3 aspect-square w-(--cd) lg:order-none lg:mt-0  ">
            <div data-orbit className="absolute inset-0 p-3 ">
              <OrbitCircle className=" " />
            </div>
          </div>

          <div data-drift data-dx="120" data-dy="0" className="justify-self-end">
            <span data-reveal className={`block ${titleWord}`}>{heroCopy.titleRight}</span>
          </div>
        </div>

        <div data-drift data-dx="60" data-dy="30" className="self-end lg:-mt-[clamp(8px,2.5svh,32px)] lg:mr-[clamp(0px,9vw,180px)]  ">
          <p
            data-reveal
            className={`${FONT_EDITORIAL} text-right text-[clamp(40px,11vw,60px)] font-medium italic leading-none text-secondary lg:text-[clamp(56px,min(6.4vw,13svh),124px)]`}
          >
            <span className="text-accent">{heroCopy.accentA} </span><span className={` ${HIGHLIGHT}`}>{heroCopy.accentB}</span>
          </p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-between md:items-end lg:items-end gap-4  md:gap-8  ">
        <div data-drift data-dx="-80" data-dy="40" className="min-w-0">
          <div data-reveal className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-col gap-3">
              <span aria-hidden="true" className="hidden h-0.5 w-14 bg-accent lg:block" />
              <p className="max-w-[40ch] text-[15px] leading-snug text-secondary/70 lg:max-w-[36ch] lg:text-[clamp(16px,1.35vw,22px)]">
                {heroCopy.lede}
              </p>
            </div>
            {/* <ul className="hidden items-center lg:flex">
              {heroCopy.services.map((s, i) => {
                const Icon = ICONS[s.icon];
                return (
                  <li key={s.label} className={i ? "ml-6 border-l border-secondary/20 pl-6" : ""}>
                    <JourneyLink
                      href={s.href}
                      className="group flex items-center gap-3 text-left text-[15px] font-semibold leading-tight text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                    >
                      <span className="grid size-14 place-items-center rounded-full border border-accent/15 bg-accent/5 text-accent transition group-hover:bg-accent group-hover:text-white">
                        <Icon size={24} strokeWidth={1.6} />
                      </span>
                      <span>
                        {s.label}
                        <br />
                        {s.secondLine}
                      </span>
                    </JourneyLink>
                  </li>
                );
              })}
            </ul> */}

            <div className="flex flex-wrap gap-3">
              <RedButton text="Start Your Journey" onClick={() => handleWhatsappClickWithMessage("test")} icon={<ArrowRight className="size-4"  />} />
              <BlackButton text="Success Stories" />
              
            </div>
          </div>
        </div>

        <div data-drift data-dx="0" data-dy="90" className="hidden justify-self-center lg:block">
          <div data-reveal>
            <SpinBadge text={heroCopy.badge} onClick={() => onGo("countries")} />
          </div>
        </div>

        <div data-drift data-dx="80" data-dy="40" className="min-w-0 lg:justify-self-end hidden md:block">
          <div data-reveal className="flex flex-col gap-4 lg:items-end lg:gap-8">
            <dl className="flex items-stretch gap-6 lg:gap-0">
              {heroCopy.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col-reverse gap-2 lg:items-center ${i ? "lg:border-l lg:border-secondary/20 lg:pl-10" : "lg:pr-10"}`}
                >
                  <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-secondary/80 lg:text-[12px]">
                    {s.label}
                  </dt>
                  <dd className={`${FONT_DISPLAY} text-[clamp(30px,3.3vw,54px)] leading-none text-secondary`}>{s.value}</dd>
                </div>
              ))}
            </dl>
            
          </div>
        </div>
      </div>
    </section>
  );
}