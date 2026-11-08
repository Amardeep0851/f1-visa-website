import { ArrowRight } from "lucide-react";
import { destinations, routeCopy } from "@/data/journey";
import JourneyLink from "./JourneyLink";
import SketchBox from "./SketchBox";

interface RouteSceneProps {
  onGo: (stop: number) => void;
  /** Scroll position (0 to 1) at which each stamp is complete. */
  stampStops: readonly number[];
  /** Index of the destination currently being stamped. */
  active: number;
  /** False until the passport has opened, so no node looks selected on the hero. */
  started: boolean;
}

export default function RouteScene({ onGo, stampStops, active, started }: RouteSceneProps) {
  const current = destinations[active];
  return (
    <section
      data-scene="b"
      aria-labelledby="pj-route-h"
      className="invisible absolute inset-0 grid grid-cols-1 content-center gap-4 px-[max(16px,env(safe-area-inset-left,0px))] pb-6 pt-24 [--bw:min(84vw,40svh)] sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-[clamp(32px,6vw,110px)] lg:px-14 lg:pl-24 lg:[--bw:min(46vw,64svh,640px)]"
    >
      <div className="flex min-w-0 flex-col gap-5 lg:col-start-1 lg:row-start-1">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-(--pj-ink)">{routeCopy.eyebrow}</p>
        <h2
          id="pj-route-h"
          className="font-(family-name:--font-pj-display) text-[clamp(40px,min(11vw,8svh),72px)] leading-[.95] text-(--pj-ink) lg:text-[clamp(52px,min(6.2vw,11svh),110px)]"
        >
          {routeCopy.heading}
          <span className="mt-1 block font-(family-name:--font-pj-serif) font-medium italic leading-none">
            <span className="px-[0.06em] text-(--pj-red) [background:linear-gradient(to_bottom,transparent_44%,var(--pj-swatch)_44%)]">
              {routeCopy.accent}
            </span>
          </span>
        </h2>

        <div
          data-step-copy
          aria-live="polite"
          aria-atomic="true"
          className="flex min-h-[10.5rem] flex-col gap-2 lg:min-h-[15rem] lg:gap-3"
        >
          <div className="flex items-end gap-5">
            <span className="font-(family-name:--font-pj-display) text-[clamp(48px,9svh,96px)] leading-[.9] text-(--pj-ink)">0{active + 1}</span>
            <span aria-hidden="true" className="mb-3 h-0.5 w-[clamp(40px,6vw,88px)] bg-(--pj-red)" />
            <span className="mb-1 font-(family-name:--font-pj-display) text-[clamp(20px,3svh,30px)] leading-none text-(--pj-ink-soft)">0{destinations.length}</span>
          </div>
          <h3 data-step-title className="text-[clamp(24px,min(2.8vw,4.8svh),42px)] font-bold leading-tight tracking-tight text-(--pj-ink)">
            {current.name} · {current.visa}
          </h3>
          <p data-step-desc className="max-w-[36rem] text-[clamp(15px,1.3vw,19px)] leading-relaxed text-(--pj-ink-soft)">
            {current.description}
          </p>
          <JourneyLink
            href={current.cta.href}
            className="inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-(--pj-red) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--pj-ink)"
          >
            <span>{current.cta.label}</span>
            <ArrowRight size={16} strokeWidth={2.4} />
          </JourneyLink>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
        <div data-box="b" className="relative w-(--bw)">
          <div data-slot="b" className="relative w-full">
            <SketchBox ratio={[640, 440]} seed={23} className="w-full rotate-[0.6deg]" />
          </div>
        </div>

        <ol className="flex w-(--bw) items-start justify-between" aria-label="Destinations">
          {destinations.map((d, i) => (
            <li key={d.key}>
              <button
                type="button"
                data-state={started ? (i === active ? "active" : i < active ? "reached" : "idle") : "idle"}
                onClick={() => onGo(stampStops[i])}
                aria-label={`${d.name}, step ${i + 1} of ${destinations.length}`}
                className="group flex flex-col items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--pj-ink)"
              >
                <span className="grid size-10 place-items-center rounded-full border-[1.5px] border-(--pj-ink) bg-(--pj-bg) text-[12px] font-bold tracking-wider text-(--pj-ink) transition group-hover:scale-105 group-data-[state=active]:bg-(--pj-red) group-data-[state=active]:text-(--pj-on-red) sm:size-11">
                  0{i + 1}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-(--pj-ink-soft)">
                  {d.key === "us" ? "USA" : d.key === "ca" ? "Canada" : d.key === "nl" ? "Europe" : "Dubai"}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
