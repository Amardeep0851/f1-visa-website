import Image from "next/image";
import { identityFields, MRZ } from "@/data/home-page/about";
import { FONT_DISPLAY, FONT_EDITORIAL } from "@/components/PassportJourney/ui/tokens";
import styles from "./identity.module.css";

/** Red rubber stamp that lands on the card. Wording is factual (no "verified" claims). */
function OfficeStamp() {
  return (
    <svg viewBox="0 0 170 170" className={`block w-full overflow-visible text-[#b91c1c] ${styles.stamp}`} aria-hidden="true">
      <defs>
        <filter id="about-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.6 0 0 0 1.55" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
        <path id="about-stamp-top" d="M27 85A58 58 0 0 1 143 85" />
        <path id="about-stamp-bot" d="M19 85A66 66 0 0 0 151 85" />
      </defs>
      <g filter="url(#about-ink)" fill="none" stroke="currentColor">
        <circle cx="85" cy="85" r="80" strokeWidth="4" />
        <circle cx="85" cy="85" r="72" strokeWidth="1.2" />
        <circle cx="85" cy="85" r="44" strokeWidth="1.8" />
        <g fill="currentColor" stroke="none" fontWeight="700">
          <text fontSize="12.5" letterSpacing="3" textAnchor="middle">
            <textPath href="#about-stamp-top" startOffset="50%">REAL OFFICE</textPath>
          </text>
          <text fontSize="11" letterSpacing="3" textAnchor="middle">
            <textPath href="#about-stamp-bot" startOffset="50%">REAL PEOPLE</textPath>
          </text>
          <text x="85" y="91" fontSize="19" textAnchor="middle" className={FONT_DISPLAY} letterSpacing="1.5">
            JALANDHAR
          </text>
        </g>
        <path d="M74 103l7 7 15-16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/**
 * The firm presented as a passport data page. GSAP hooks:
 *   [data-about-card]   tilt-in and hover tilt
 *   [data-about-stamp]  stamp landing
 *   [data-about-mrz]    each machine-readable line "types" itself
 */
export default function IdentityCard() {
  return (
    <div data-about-card-wrap className="[perspective:1400px]">
      <div data-about-card className={`${styles.card} p-5 [container-type:inline-size] sm:p-7`}>
        {/* Header */}
        <div className="relative flex items-center justify-between gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6d6656] sm:text-[11px]">
          <span>Your F1 Visa Guide · परिचय</span>
          <span className="text-[#b91c1c]">Profile</span>
        </div>
        <div className="relative mt-3 h-px bg-[#b91c1c]/40" />

        <div className="relative mt-5 grid grid-cols-[minmax(0,32%)_minmax(0,1fr)] gap-5 sm:gap-7">
          {/* "Photo" with the logo */}
          <div className="flex flex-col gap-3">
            <div className={`${styles.photo} grid aspect-[3/4] place-items-center p-3`}>
              <Image src="/images/logo.png" alt="Your F1 Visa Guide logo" width={200} height={50} className="h-auto w-full object-contain" />
            </div>
            <p className={`${FONT_EDITORIAL} text-center text-[clamp(14px,4.2cqw,22px)] italic leading-none text-[#17202b]/80`}>
              Your F1 Visa Guide
            </p>
          </div>

          {/* Fields */}
          <dl className="grid grid-cols-1 content-start gap-x-6 gap-y-3 @min-[440px]:grid-cols-2 @min-[440px]:gap-y-4">
            {identityFields.map((f) => (
              <div key={f.label} className="min-w-0">
                <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6d6656] sm:text-[10px]">{f.label}</dt>
                <dd className="mt-0.5 text-[14px] font-bold leading-snug text-[#17202b] sm:text-[16px]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Stamp */}
        <div data-about-stamp className="pointer-events-none absolute bottom-[5%] right-[4%] w-[26%] max-w-[150px] -rotate-12">
          <OfficeStamp />
        </div>

        {/* Machine-readable zone */}
        <div className="relative mt-6 border-t border-dashed border-[#17202b]/20 pt-4" aria-hidden="true">
          {MRZ.map((line) => (
            <p key={line} data-about-mrz className={`${styles.mrz} text-[3.05cqw] font-semibold leading-[1.6] text-[#17202b]/85`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}