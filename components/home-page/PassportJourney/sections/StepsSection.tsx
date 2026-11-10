import { ArrowRight, ClipboardCheck, FileText, Plane, Stamp } from "lucide-react";
import { JOURNEY_IMAGES, steps, stepsCopy } from "@/data/journey";
import { handleWhatsappClick, handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";
import BrushUnderline from "../ui/BrushUnderline";
import { FONT_BODY, FONT_DISPLAY, FONT_EDITORIAL } from "../ui/tokens";
import RedButton from "@/components/Red-Buttons";
import BlackButton from "@/components/BlackButton";

const ICONS = { apply: FileText, file: ClipboardCheck, decision: Stamp, fly: Plane } as const;

/* Route geometry in a 1000 x 560 box. Dots sit on the segment joins. */
const VB_W = 1000;
const VB_H = 560;
const POINTS = [
  [160, 448],
  [400, 358],
  [630, 263],
  [820, 151],
] as const;
const LEAD_IN = "M20 540C70 500 110 452 160 448";
const SEGMENTS = [
  "M160 448C250 440 300 360 400 358",
  "M400 358C500 356 540 268 630 263",
  "M630 263C720 258 760 170 820 151",
  "M820 151C875 134 905 90 935 46",
];
/* The plane is drawn inside the same SVG, at the end of the last segment and turned to
   follow it, so it scales with the route and never drifts away from the line. */
const LINE_END = [935, 46] as const;
const LINE_ANGLE = (Math.atan2(46 - 90, 935 - 905) * 180) / Math.PI; // direction of the last curve
const PLANE_PATH =
  "M30 0C30-3 27-4 24-4H8L-6-22h-6l9 18h-15l-6-7h-5l4 11-4 11h5l6-7h15l-9 18h6L8 4h16c3 0 6-1 6-4Z";

interface StepsSectionProps {
  onServices: () => void;
}

/** Scene 4. Left: copy and buttons. Right: red route that draws through the four steps. */
export default function StepsSection({ onServices }: StepsSectionProps) {
  const last = steps.length - 1;
  return (
    <section
      id="process"
      data-scene="steps"
      aria-labelledby="pj-steps-title"
      className={`invisible absolute flex justify-center inset-0 z-[1] opacity-0 ${FONT_BODY}`}
    >
      <p className="absolute right-4 top-7 hidden font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-accent sm:right-8 sm:block lg:right-14 lg:top-9 lg:text-[14px]">
        {stepsCopy.label}
      </p>

      {/* Phones and tablets: text on top, route fills the rest of the screen.
          Desktop and phones held sideways: two columns. Nothing grows past the screen height. */}
      <div className="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-4 px-4 pb-6 pt-20 sm:gap-6 sm:px-8 sm:pt-24 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:grid-rows-1 lg:items-center lg:gap-x-[clamp(24px,3vw,56px)] lg:px-14 lg:pb-16 [@media(orientation:landscape)_and_(max-height:520px)]:grid-cols-2 [@media(orientation:landscape)_and_(max-height:520px)]:grid-rows-1 [@media(orientation:landscape)_and_(max-height:520px)]:items-center [@media(orientation:landscape)_and_(max-height:520px)]:pt-16">
        <div data-steps-copy className="flex min-w-0 flex-col gap-3 sm:gap-4 lg:gap-7 ">
          <h2
            id="pj-steps-title"
            className={`${FONT_DISPLAY} whitespace-nowrap text-[clamp(42px,min(10vw,6.5svh),64px)] leading-[.92] text-secondary lg:text-[clamp(52px,min(5.3vw,11.5svh),116px)]`}
          >
            {stepsCopy.heading}
            <span className={`${FONT_EDITORIAL} py-4 relative mt-1 block w-fit font-medium italic leading-none text-accent`}>
              {stepsCopy.accent}
              <BrushUnderline className="absolute -bottom-2 left-[30%] h-2.5 w-[40%] lg:-bottom-5 lg:h-4" />
            </span>
          </h2>
          <p className="max-w-[42ch] text-[14px] leading-relaxed text-secondary/70 sm:text-[15px] lg:text-[clamp(16px,1.4vw,22px)] ">
            {stepsCopy.body}
          </p>
          <div className="flex flex-wrap  gap-4 py-4 ">
            <RedButton 
            onClick={handleWhatsappClick}
            className="w-full sm:w-auto flex justify-center sm:justify-start"
            text={stepsCopy.primaryCta} icon={<ArrowRight className="size-6" />} />
              {}
              
            <BlackButton 
            className="w-full sm:w-auto" text={stepsCopy.secondaryCta} />
          </div>
        </div>

        {/* Route. The box keeps the 1000:560 shape and is as big as the free space allows,
            so the SVG line, the dots and the labels always line up. On wide screens it
            leaves 7.5rem on the right for the last step's description. Label sizes follow the
            width of this box (container queries), not the screen, so they never collide. */}
        <div className="relative grid min-h-0 place-items-center [container-type:size] lg:h-[min(72svh,620px)] [@media(orientation:landscape)_and_(max-height:520px)]:h-[70svh] overflow-hidden ">
          <div className="relative aspect-[1000/560] w-[min(100cqw,calc(100cqh*1000/560))] @min-[640px]:w-[min(calc(100cqw-7.5rem),calc(100cqh*1000/560))] @min-[640px]:justify-self-start  ">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-6%_-4%] scale-150 bg-contain bg-center bg-no-repeat opacity-20"
              style={{ backgroundImage: `url(${JOURNEY_IMAGES.worldMap})` }}
            />
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
              <path data-steps-lead d={LEAD_IN} fill="none" className="stroke-accent" strokeWidth="3" strokeDasharray="7 8" strokeLinecap="round" opacity="0" />
              {SEGMENTS.map((d, i) => (
                <path
                  key={d}
                  data-steps-seg={i}
                  d={d}
                  fill="none"
                  className="stroke-accent"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
              ))}
              {/* GSAP fades/moves the outer group; the inner group pins the plane to the line end */}
              <g data-steps-plane opacity="0">
                <g transform={`translate(${LINE_END[0]} ${LINE_END[1]}) rotate(${LINE_ANGLE.toFixed(1)}) translate(42 0) scale(1.3)`}>
                  <path d={PLANE_PATH} className="fill-accent" />
                </g>
              </g>
            </svg>

            <ol className="absolute inset-0" aria-label="How it works">
              {steps.map((s, i) => {
                const Icon = ICONS[s.icon];
                const [x, y] = POINTS[i];
                return (
                  <li key={s.id} className="absolute" style={{ left: `${(x / VB_W) * 100}%`, top: `${(y / VB_H) * 100}%` }}>
                    {/* The passport lands on the first dot: [data-slot="step0"] */}
                    <span
                      data-step-dot={i}
                      data-slot={i === 0 ? "step0" : undefined}
                      className="absolute left-0 top-0 block size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_var(--color-primary),0_0_0_6px_color-mix(in_srgb,var(--color-accent)_35%,transparent),0_0_16px_4px_color-mix(in_srgb,var(--color-accent)_35%,transparent)] @min-[480px]:size-4 @min-[760px]:size-5"
                    />
                    {/* Label above the dot, description below-right of it (where the line never goes) */}
                    <div data-step-label={i} className="absolute left-0 top-0 opacity-0">
                      <div
                        className={`absolute bottom-3 flex w-[86px] flex-col items-center gap-1 text-center @min-[480px]:bottom-5 @min-[480px]:w-[150px] @min-[760px]:gap-2 ${
                          i === last ? "left-0 -translate-x-[80%]" : "left-0 -translate-x-1/2"
                        }`}
                      >
                        <Icon className="hidden size-6 text-accent @min-[480px]:block @min-[760px]:size-8" strokeWidth={1.5} aria-hidden="true" />
                        <span className="font-mono text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-secondary @min-[480px]:text-[12px] @min-[480px]:tracking-[0.16em] @min-[760px]:text-[13px]">
                          <span className="text-accent">{i + 1}.</span> {s.label}
                        </span>
                      </div>
                      <p className=" hidden text-left text-[14px] leading-snug text-secondary/90  min-[640px]:absolute min-[640px]:block min-[640px]:left-3 min-[640px]:top-4 min-[1290px]w-32 min-[820px]:text-[15px]">
                        {s.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <p className="absolute bottom-6 right-4 hidden items-center gap-6 font-mono text-[12px] font-semibold uppercase tracking-[0.34em] text-secondary/80 sm:right-8 lg:right-14 lg:flex lg:text-[14px]">
        {stepsCopy.footnote}
        <span aria-hidden="true" className="h-0.5 w-16 bg-accent" />
      </p>
    </section>
  );
}