import { ArrowRight } from "lucide-react";
import { closingCopy } from "@/data/journey";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";
import SketchBox from "./SketchBox";

export default function ClosingScene() {
  return (
    <section
      data-scene="c"
      aria-labelledby="pj-close-h"
      className="invisible absolute inset-0 z-[3] grid place-items-center px-[max(16px,env(safe-area-inset-left,0px))] pb-16 pt-24 text-center [--bw:min(92vw,78svh,880px)]"
    >
      <div data-slot="c" data-box="c" className="pointer-events-none absolute left-1/2 top-1/2 w-(--bw) -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <SketchBox ratio={[640, 520]} seed={41} progress={0.5} className="w-full -rotate-[0.8deg]" />
      </div>

      <div className="relative flex max-w-[92vw] flex-col items-center gap-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-(--pj-ink)">{closingCopy.eyebrow}</p>
        <h2
          id="pj-close-h"
          className="font-(family-name:--font-pj-display) text-[clamp(40px,min(11vw,11.5svh),124px)] leading-[.92] text-(--pj-ink)"
        >
          {closingCopy.heading}
          <span className="mt-1 block font-(family-name:--font-pj-serif) font-medium italic leading-none">
            <span className="px-[0.06em] text-(--pj-red) [background:linear-gradient(to_bottom,transparent_44%,var(--pj-swatch)_44%)]">
              {closingCopy.accent}
            </span>
          </span>
        </h2>
        <button
          type="button"
          data-close-cta
          onClick={() => handleWhatsappClickWithMessage()}
          className="inline-flex items-center gap-4 rounded-lg bg-(--pj-red) py-3.5 pl-6 pr-3.5 text-[16px] font-semibold text-(--pj-on-red) transition hover:bg-(--pj-red-deep) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pj-ink)"
        >
          {closingCopy.cta}
          <span className="grid size-8 place-items-center rounded-full bg-(--pj-on-red) text-(--pj-red)">
            <ArrowRight size={16} strokeWidth={2.4} />
          </span>
        </button>
      </div>

      <p className="absolute inset-x-0 bottom-[max(16px,env(safe-area-inset-bottom,0px))] mx-auto max-w-[46ch] px-4 text-[12.5px] leading-relaxed text-(--pj-ink-soft)">
        {closingCopy.note}
      </p>
    </section>
  );
}
