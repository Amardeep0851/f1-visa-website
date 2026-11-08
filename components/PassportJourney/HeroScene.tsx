import { ArrowDown, ArrowRight, Briefcase, GraduationCap, Users } from "lucide-react";
import { heroCopy } from "@/data/journey";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";
import JourneyLink from "./JourneyLink";
import SketchBox from "./SketchBox";

const ICONS = { study: GraduationCap, tourist: Briefcase, other: Users } as const;

interface HeroSceneProps {
  onGo: (stop: number) => void;
}

const word =
  "font-(family-name:--font-pj-display) leading-[.92] tracking-[-0.01em] text-(--pj-ink) whitespace-nowrap text-[clamp(40px,min(11vw,9svh),84px)] lg:text-[clamp(52px,min(5.2vw,12svh),104px)]";

export default function HeroScene({ onGo }: HeroSceneProps) {
  return (
    <section
      data-scene="a"
      aria-labelledby="pj-h1"
      className="absolute inset-0 flex flex-col justify-between gap-3 px-[max(16px,env(safe-area-inset-left,0px))] pb-[max(16px,env(safe-area-inset-bottom,0px))] pt-24 [--bw:clamp(170px,min(52vw,26svh),250px)] sm:px-8 lg:gap-0 lg:px-14 lg:pl-24 lg:pt-28 lg:[--bw:clamp(220px,min(22vw,36svh),420px)]"
    >
      <h1 id="pj-h1" className="sr-only">
        Your Immigration Journey, Starts Here.
      </h1>

      {/* Vertical label with a red square and a short rule */}
      <div
        aria-hidden="true"
        className="absolute left-5 top-1/2 hidden -translate-y-[58%] flex-col items-center gap-3 lg:flex"
      >
        <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-semibold uppercase tracking-[0.3em] text-(--pj-ink-soft)">
          {heroCopy.vertical}
        </span>
        <span className="size-1.5 bg-(--pj-red)" />
        <span className="h-14 w-px bg-(--pj-ink-soft)" />
      </div>

      <div aria-hidden="true" className="flex flex-col gap-1 lg:gap-0">
        <div className="grid grid-cols-1 items-center gap-1 lg:grid-cols-[auto_var(--bw)_auto] lg:justify-between lg:gap-[clamp(24px,3vw,56px)]">
          <span data-pa data-dx="-90" data-dy="0" className={`${word} lg:justify-self-start`}>
            Your Immigration
          </span>
          <div data-slot="a" data-box="a" className="relative order-last mx-auto w-(--bw) lg:order-none lg:mx-0">
            <SketchBox ratio={[400, 480]} seed={11} className="w-full -rotate-[1.5deg]" />
          </div>
          <span data-pa data-dx="90" data-dy="0" className={`${word} justify-self-end text-right lg:justify-self-end`}>
            Journey,
          </span>
        </div>

        <p
          data-pa
          data-dx="0"
          data-dy="-30"
          className="self-end text-right font-(family-name:--font-pj-serif) text-[clamp(40px,min(10.5vw,8svh),76px)] font-medium italic leading-none text-(--pj-ink) lg:-mt-[clamp(8px,2.2svh,30px)] lg:mr-[clamp(0px,5vw,120px)] lg:text-[clamp(52px,min(6.4vw,12svh),112px)]"
        >
          Starts{" "}
          <span className="px-[0.06em] text-(--pj-red) [background:linear-gradient(to_bottom,transparent_44%,var(--pj-swatch)_44%)]">
            Here.
          </span>
        </p>
      </div>

      <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10">
        <div data-pa data-dx="0" data-dy="50" className="flex flex-col gap-4 lg:gap-7">
          <div className="flex flex-col gap-3">
            <span aria-hidden="true" className="hidden h-0.5 w-12 bg-(--pj-red) lg:block" />
            <p className="max-w-[40ch] text-[15px] leading-snug text-(--pj-ink-soft) lg:max-w-[34ch] lg:text-[clamp(16px,1.35vw,21px)]">
              {heroCopy.lede}
            </p>
          </div>
          <ul className="hidden items-center lg:flex">
            {heroCopy.services.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.label} className={i ? "border-l border-(--pj-line) pl-5 ml-5" : ""}>
                  <JourneyLink
                    href={s.href}
                    className="group flex items-center gap-3 text-left text-[15px] font-medium leading-tight text-(--pj-ink) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--pj-ink)"
                  >
                    <span className="grid size-12 place-items-center rounded-full border border-(--pj-red)/20 bg-(--pj-chip) text-(--pj-red) transition group-hover:bg-(--pj-red) group-hover:text-(--pj-on-red)">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                    <span className="max-w-[7ch]">{s.label}</span>
                  </JourneyLink>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          data-pa
          data-dx="0"
          data-dy="70"
          onClick={() => onGo(0.3)}
          aria-label="Scroll down to open the passport"
          className="relative mx-auto hidden size-[132px] place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--pj-ink) lg:grid"
        >
          <svg
            viewBox="0 0 132 132"
            aria-hidden="true"
            className="absolute inset-0 size-full motion-safe:animate-[spin_24s_linear_infinite]"
          >
            <defs>
              <path id="pj-badge" d="M66 66m-52 0a52 52 0 1 1 104 0a52 52 0 1 1-104 0" />
            </defs>
            <text className="fill-(--pj-ink) text-[10px] font-semibold tracking-[0.22em]">
              <textPath href="#pj-badge" textLength="326" lengthAdjust="spacing">
                {heroCopy.badge.toUpperCase()} · {heroCopy.badge.toUpperCase()} ·
              </textPath>
            </text>
          </svg>
          <span className="grid size-16 place-items-center rounded-full bg-(--pj-red) text-(--pj-on-red)">
            <ArrowDown size={22} strokeWidth={2} />
          </span>
        </button>

        <div data-pa data-dx="0" data-dy="50" className="flex flex-col gap-4 lg:items-end lg:gap-7">
          <dl className="flex items-stretch gap-6 lg:gap-0">
            {heroCopy.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse gap-1.5 ${i ? "lg:border-l lg:border-(--pj-line) lg:pl-10" : "lg:pr-10"} lg:items-center`}
              >
                <dt className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-(--pj-ink-soft) lg:text-[11.5px]">
                  {s.label}
                </dt>
                <dd className="font-(family-name:--font-pj-display) text-[clamp(30px,3.2vw,52px)] leading-none text-(--pj-ink)">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleWhatsappClickWithMessage()}
              className="inline-flex items-center gap-4 rounded-lg bg-(--pj-red) py-3.5 pl-6 pr-3.5 text-[16px] font-semibold text-(--pj-on-red) transition hover:bg-(--pj-red-deep) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pj-ink)"
            >
              Start Your Journey
              <span className="grid size-8 place-items-center rounded-full bg-(--pj-on-red) text-(--pj-red)">
                <ArrowRight size={16} strokeWidth={2.4} />
              </span>
            </button>
            <button
              type="button"
              onClick={() => onGo(0.52)}
              className="rounded-lg border border-(--pj-line) bg-(--pj-bg) px-7 py-3.5 text-[16px] font-semibold text-(--pj-ink) transition hover:border-(--pj-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pj-ink)"
            >
              Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
