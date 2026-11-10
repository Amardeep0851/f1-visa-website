import { countries, loaderCopy } from "@/data/journey";
import { FONT_DISPLAY } from "@/components/home-page/PassportJourney/ui/tokens";

/**
 * Runs before paint. If the loader was already shown this session (or motion is reduced)
 * it adds a <style> to <head> that hides it. It does not touch any element React renders,
 * so hydration stays clean on reload.
 */
const SKIP_SCRIPT = `try{if(sessionStorage.getItem('pj-loader-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){var s=document.createElement('style');s.textContent='[data-loader]{display:none!important}';document.head.appendChild(s)}}catch(e){}`;

/**
 * Scene 0. A large circle with destination names changing inside it.
 * The circle then flies into the hero circle (handled in useJourneyIntro).
 */
export default function Preloader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} />
      <noscript>
        <style>{`[data-loader]{display:none!important}`}</style>
      </noscript>
      <div
        data-loader
        role="status"
        aria-label={loaderCopy.label}
        className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 "
      >
        <div data-loader-bg className="absolute inset-0 bg-primary" />
        <div data-loader-circle className="relative grid aspect-square w-[min(352px,74vw)] place-items-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
            <circle cx="50" cy="50" r="48" fill="none" className="stroke-secondary" strokeWidth="0.4" />
            <circle
              data-loader-progress
              cx="50"
              cy="50"
              r="48"
              fill="none"
              className="stroke-accent"
              strokeWidth="0.7"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="grid" aria-hidden="true">
            {countries.map((c, i) => (
              <span
                key={c.id}
                data-loader-name={i}
                className={`${FONT_DISPLAY} col-start-1 row-start-1 text-center text-[clamp(28px,7vw,44px)] leading-none text-secondary opacity-0`}
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>
        <p data-loader-label className="relative font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-secondary/70">
          {loaderCopy.label}
        </p>
      </div>
    </>
  );
}