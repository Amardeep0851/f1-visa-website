import styles from "./passport.module.css";

/**
 * Closed passport cover is navy with gold print, in the style of an Indian passport.
 * The State Emblem of India is deliberately NOT drawn: its commercial use is restricted
 * by law, so a neutral gold globe mark sits in its place.
 *
 * GSAP drives this from outside through data attributes:
 *   [data-pp]            wrapper that is translated / scaled / faded
 *   [data-book]          CSS vars --open, --tx, --ty, --tz
 *   [data-stamp="us|ca|nl|ae"]  each stamp's opacity / transform
 */
export default function IndianPassport() {
  return (
    <div className={styles.pp} data-pp aria-hidden="true">
      <svg width="0" height="0" className="absolute" focusable="false">
        <filter id="pj-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 2.1"
            result="m"
          />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
      </svg>

      <div className={styles.intro} data-intro>
        <div className={styles.float}>
          <div className={styles.shadow} data-shadow />
          <div className={styles.book} data-book>
            <div className={styles.shift}>
              {/* Right-hand page (visible once the cover opens) */}
              <div className={styles.base}>
                <div className={`${styles.page} ${styles.pageR}`}>
                  <span className={styles.label}>VISAS</span>
                  <span className={styles.no}>04</span>

                  <div className={`${styles.stamp} ${styles.ca}`} data-stamp="ca" data-rot="5">
                    <svg viewBox="0 0 180 112">
                      <g className={styles.ink} fill="none" stroke="currentColor">
                        <rect x="3" y="3" width="174" height="106" rx="9" strokeWidth="3.5" />
                        <rect x="10" y="10" width="160" height="92" rx="5" strokeWidth="1" />
                        <text x="90" y="30" fontSize="9" letterSpacing="3" textAnchor="middle" stroke="none">STUDENT</text>
                        <text className="big" x="90" y="65" fontSize="36" letterSpacing="3" textAnchor="middle" stroke="none">CANADA</text>
                        <line x1="28" y1="75" x2="152" y2="75" strokeWidth="1.2" />
                        <text x="90" y="92" fontSize="11" letterSpacing="2.4" textAnchor="middle" stroke="none">STUDY PERMIT</text>
                      </g>
                    </svg>
                  </div>

                  <div className={`${styles.stamp} ${styles.ae}`} data-stamp="ae" data-rot="-7">
                    <svg viewBox="0 0 160 160">
                      <g className={styles.ink} fill="none" stroke="currentColor">
                        <circle cx="80" cy="80" r="74" strokeWidth="3.5" />
                        <circle cx="80" cy="80" r="67" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="80" cy="80" r="42" strokeWidth="1.8" />
                        <path id="pj-ae-top" d="M28 80A52 52 0 0 1 132 80" stroke="none" />
                        <path id="pj-ae-bot" d="M16 80A64 64 0 0 0 144 80" stroke="none" />
                        <text fontSize="11" letterSpacing="2.2" textAnchor="middle" stroke="none"><textPath href="#pj-ae-top" startOffset="50%">UNITED ARAB EMIRATES</textPath></text>
                        <text fontSize="10" letterSpacing="2" textAnchor="middle" stroke="none"><textPath href="#pj-ae-bot" startOffset="50%">DUBAI · ENTRY</textPath></text>
                        <text className="big" x="80" y="88" fontSize="26" textAnchor="middle" stroke="none">STUDY</text>
                        <text x="80" y="106" fontSize="8" letterSpacing="1.6" textAnchor="middle" stroke="none">RESIDENCE</text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Cover: front is the navy cover, back is the left-hand page */}
              <div className={styles.cover}>
                <div className={`${styles.face} ${styles.front}`}>
                  <svg className={styles.coverArt} viewBox="0 0 230 330">
                    <rect x="13" y="13" width="204" height="304" rx="4" fill="none" stroke="currentColor" strokeOpacity=".38" />
                    <text className={styles.hindi} x="115" y="58" fontSize="17" textAnchor="middle">पासपोर्ट</text>
                    <text className={styles.latin} x="115" y="80" fontSize="17" letterSpacing="3" textAnchor="middle">PASSPORT</text>
                    <g fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="115" cy="150" r="38" />
                      <ellipse cx="115" cy="150" rx="16" ry="38" />
                      <ellipse cx="115" cy="150" rx="29" ry="38" />
                      <path d="M80 135h70M80 165h70M77 150h76" />
                      <circle cx="115" cy="150" r="46" strokeDasharray="1.5 4" strokeLinecap="round" />
                    </g>
                    <text className={styles.hindi} x="115" y="236" fontSize="12.5" textAnchor="middle">भारत गणराज्य</text>
                    <text className={styles.latin} x="115" y="254" fontSize="11.5" letterSpacing="2" textAnchor="middle">REPUBLIC OF INDIA</text>
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="102" y="280" width="26" height="17" rx="4" />
                      <circle cx="115" cy="288.5" r="3.6" />
                    </g>
                  </svg>
                </div>

                <div className={`${styles.face} ${styles.back} ${styles.page} ${styles.pageL}`}>
                  <span className={styles.label}>VISAS</span>
                  <span className={styles.no}>03</span>

                  <div className={`${styles.stamp} ${styles.us}`} data-stamp="us" data-rot="-8">
                    <svg viewBox="0 0 160 160">
                      <g className={styles.ink} fill="none" stroke="currentColor">
                        <circle cx="80" cy="80" r="74" strokeWidth="3.5" />
                        <circle cx="80" cy="80" r="68" strokeWidth="1" />
                        <circle cx="80" cy="80" r="42" strokeWidth="1.8" />
                        <path id="pj-us-top" d="M28 80A52 52 0 0 1 132 80" stroke="none" />
                        <path id="pj-us-bot" d="M16 80A64 64 0 0 0 144 80" stroke="none" />
                        <text fontSize="11" letterSpacing="2.2" textAnchor="middle" stroke="none"><textPath href="#pj-us-top" startOffset="50%">UNITED STATES</textPath></text>
                        <text fontSize="10" letterSpacing="2" textAnchor="middle" stroke="none"><textPath href="#pj-us-bot" startOffset="50%">STUDENT · ADMITTED</textPath></text>
                        <text className="big" x="80" y="92" fontSize="36" textAnchor="middle" stroke="none">F-1</text>
                        <text x="80" y="108" fontSize="9" letterSpacing="2" textAnchor="middle" stroke="none">D/S</text>
                      </g>
                    </svg>
                  </div>

                  <div className={`${styles.stamp} ${styles.nl}`} data-stamp="nl" data-rot="6">
                    <svg viewBox="0 0 170 112">
                      <g className={styles.ink} fill="none" stroke="currentColor">
                        <path d="M18 4H152L166 18V94L152 108H18L4 94V18Z" strokeWidth="3.5" strokeLinejoin="round" />
                        <path d="M22 12H148L158 22V90L148 100H22L12 90V22Z" strokeWidth="1" />
                        <text x="85" y="34" fontSize="9" letterSpacing="2.4" textAnchor="middle" stroke="none">NEDERLAND</text>
                        <text className="big" x="85" y="68" fontSize="34" letterSpacing="3" textAnchor="middle" stroke="none">MVV</text>
                        <text x="85" y="88" fontSize="8.5" letterSpacing="1.8" textAnchor="middle" stroke="none">LONG STAY · STUDENT</text>
                      </g>
                    </svg>
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
