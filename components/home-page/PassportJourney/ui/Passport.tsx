import type { CSSProperties } from "react";
import { countries } from "@/data/journey";
import VisaStamp from "./VisaStamp";
import styles from "../passport.module.css";

/** Pose in the hero, so the first paint matches (GSAP takes over from here). */
export const HERO_POSE = {
  "--open": 0,
  "--tx": "6deg",
  "--ty": "15deg",
  "--tz": "15deg",
} as CSSProperties;

/** Deterministic tilt per stamp so each one lands at a slightly different angle. */
const TILTS = [-8, 6, -4, 9, -10, 5, -6, 7];

function CoverArt() {
  return (
    <svg className={styles.art} viewBox="0 0 230 330" aria-hidden="true">
      <text
        className={styles.hindi}
        x="115"
        y="62"
        fontSize="17"
        textAnchor="middle"
      >
        पासपोर्ट
      </text>
      <text
        className={styles.latin}
        x="115"
        y="84"
        fontSize="17"
        letterSpacing="3"
        textAnchor="middle"
      >
        PASSPORT
      </text>
      {/* Neutral globe mark. The State Emblem of India is intentionally not used. */}
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="115" cy="155" r="36" />
        <ellipse cx="115" cy="155" rx="15" ry="36" />
        <ellipse cx="115" cy="155" rx="27" ry="36" />
        <path d="M82 141h66M82 169h66M79 155h72" />
        <circle
          cx="115"
          cy="155"
          r="44"
          strokeDasharray="1.5 4"
          strokeLinecap="round"
        />
      </g>
      <text
        className={styles.hindi}
        x="115"
        y="240"
        fontSize="13"
        textAnchor="middle"
      >
        भारत गणराज्य
      </text>
      <text
        className={styles.latin}
        x="115"
        y="258"
        fontSize="12"
        letterSpacing="2"
        textAnchor="middle"
      >
        REPUBLIC OF INDIA
      </text>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="102" y="282" width="26" height="17" rx="4" />
        <circle cx="115" cy="290.5" r="3.6" />
      </g>
    </svg>
  );
}

function TitlePage() {
  return (
    <svg className={styles.art} viewBox="0 0 230 330" aria-hidden="true">
      <text
        className={styles.hindi}
        x="115"
        y="70"
        fontSize="15"
        textAnchor="middle"
      >
        पासपोर्ट
      </text>
      <text
        className={styles.latin}
        x="115"
        y="90"
        fontSize="14"
        letterSpacing="2.5"
        textAnchor="middle"
      >
        PASSPORT
      </text>
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".75">
        <circle cx="115" cy="150" r="30" />
        <ellipse cx="115" cy="150" rx="12" ry="30" />
        <ellipse cx="115" cy="150" rx="22" ry="30" />
        <path d="M88 138h54M88 162h54M85 150h60" />
      </g>
      <text
        className={styles.hindi}
        x="115"
        y="218"
        fontSize="12"
        textAnchor="middle"
      >
        भारत गणराज्य
      </text>
      <text
        className={styles.latin}
        x="115"
        y="235"
        fontSize="11"
        letterSpacing="1.8"
        textAnchor="middle"
      >
        REPUBLIC OF INDIA
      </text>
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="104" y="252" width="22" height="14" rx="3" />
        <circle cx="115" cy="259" r="3" />
      </g>
      <path
        d="M40 300l22-16 14 9 20-18 18 14 16-10 22 21"
        fill="none"
        stroke="currentColor"
        strokeWidth=".8"
        opacity=".45"
      />
    </svg>
  );
}

/**
 * Indian-style passport. GSAP drives it through data attributes:
 *   [data-pp]          position / scale / opacity
 *   [data-pp-intro]    entrance animation
 *   [data-book]        --open, --tx, --ty, --tz
 *   [data-stamp="i"]   one stamp per country, in the order of `countries`
 */
export default function Passport() {
  return (
    <div className={styles.pp} data-pp aria-hidden="true">
      <svg width="0" height="0" className="absolute" focusable="false">
        <filter id="pj-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".85"
            numOctaves="2"
            seed="4"
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.4 0 0 0 2"
            result="m"
          />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
      </svg>

      <div className={styles.intro} data-pp-intro>
        <div className={styles.float}>
          <div className={styles.book} data-book style={HERO_POSE}>
            <div className={styles.shadow} />
            <div className={styles.shift}>
              <div className={styles.base}>
                <div className={`${styles.page} ${styles.pageR}`}>
                  <div className={styles.paper}>
                    <span className={styles.label}>VISA / VISAS</span>
                    {countries.map((c, i) => (
                      <div
                        key={c.id}
                        className={styles.stamp}
                        data-stamp={i}
                        data-rot={TILTS[i % TILTS.length]}
                      >
                        <VisaStamp country={c} index={i} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.cover}>
                <div
                  className={`${styles.face} ${styles.front}`}
                  data-face="front"
                >
                  <CoverArt />
                </div>
                <div
                  className={`${styles.face} ${styles.back} ${styles.page} ${styles.pageL}`}
                  data-face="back"
                >
                  <div className={styles.paper}>
                    <TitlePage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
