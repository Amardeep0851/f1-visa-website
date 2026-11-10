import type { Country } from "@/data/journey";
import { FONT_DISPLAY } from "./tokens";

/**
 * A rubber-stamp drawing generated from the country data, so a new country
 * needs no new artwork. Shape and ink colour rotate by position in the list.
 * Long names are squeezed with textLength so they always fit.
 */
const SHAPES = ["oval", "circle", "rect", "octagon"] as const;
const INKS = ["var(--pj-ink-ca)", "var(--pj-ink-us)", "var(--pj-ink-ae)", "var(--pj-ink-nl)"];

/** Approximate natural width of a string, so short names are not stretched. */
const fit = (text: string, fontSize: number, max: number, ratio = 0.56) =>
  Math.min(max, text.length * fontSize * ratio);

function PlaneMark({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <path
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}
      d="M21 15.5v-2L13 9V3.5a1.5 1.5 0 0 0-3 0V9l-8 4.5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-6Z"
      fill="currentColor"
      stroke="none"
    />
  );
}

const Stars = ({ x, y }: { x: number; y: number }) => (
  <text x={x} y={y} fontSize="11" letterSpacing="4" textAnchor="middle" stroke="none">
    ★ ★ ★
  </text>
);

interface VisaStampProps {
  country: Country;
  index: number;
  /** Needed when the same country is drawn twice on a page (keeps SVG ids unique). */
  idSuffix?: string;
}

export default function VisaStamp({ country, index, idSuffix }: VisaStampProps) {
  const shape = SHAPES[index % SHAPES.length];
  const ink = INKS[index % INKS.length];
  const name = country.stampName;
  const visa = country.stampVisa;
  const id = `pj-stamp-${country.id}${idSuffix ? `-${idSuffix}` : ""}`;

  const common = {
    fill: "none",
    stroke: "currentColor",
    style: { filter: "url(#pj-ink)" },
  } as const;

  if (shape === "circle") {
    return (
      <svg viewBox="0 0 170 170" style={{ color: ink }} className="block w-full overflow-visible [&_text]:fill-current">
        <g {...common}>
          <circle cx="85" cy="85" r="80" strokeWidth="4" />
          <circle cx="85" cy="85" r="72" strokeWidth="1.2" />
          <circle cx="85" cy="85" r="46" strokeWidth="2" />
          <path id={`${id}-t`} d="M27 85A58 58 0 0 1 143 85" stroke="none" />
          <path id={`${id}-b`} d="M17 85A68 68 0 0 0 153 85" stroke="none" />
          <text fontSize="12" fontWeight="700" letterSpacing="1.6" textAnchor="middle" stroke="none">
            <textPath href={`#${id}-t`} startOffset="50%" textLength={fit(name, 12, 160, 0.7)} lengthAdjust="spacingAndGlyphs">
              {name}
            </textPath>
          </text>
          <text fontSize="10" fontWeight="700" letterSpacing="1.4" textAnchor="middle" stroke="none">
            <textPath href={`#${id}-b`} startOffset="50%" textLength={fit(visa, 10, 190, 0.72)} lengthAdjust="spacingAndGlyphs">
              {visa}
            </textPath>
          </text>
          <PlaneMark x={85} y={72} size={26} />
          <text x="85" y="104" fontSize="11" fontWeight="800" letterSpacing="2" textAnchor="middle" stroke="none">
            APPROVED
          </text>
        </g>
      </svg>
    );
  }

  if (shape === "rect" || shape === "octagon") {
    const frame =
      shape === "rect" ? (
        <>
          <rect x="4" y="4" width="212" height="132" rx="12" strokeWidth="4" />
          <rect x="13" y="13" width="194" height="114" rx="7" strokeWidth="1.2" />
        </>
      ) : (
        <>
          <path d="M24 4H196L216 24V116L196 136H24L4 116V24Z" strokeWidth="4" strokeLinejoin="round" />
          <path d="M28 13H192L207 28V112L192 127H28L13 112V28Z" strokeWidth="1.2" />
        </>
      );
    return (
      <svg viewBox="0 0 220 140" style={{ color: ink }} className="block w-full overflow-visible [&_text]:fill-current">
        <g {...common}>
          {frame}
          <PlaneMark x={110} y={33} size={22} />
          <text
            x="110"
            y="78"
            fontSize="34"
            textAnchor="middle"
            stroke="none"
            className={FONT_DISPLAY}
            textLength={fit(name, 34, 176, 0.5)}
            lengthAdjust="spacingAndGlyphs"
          >
            {name}
          </text>
          <line x1="40" y1="88" x2="180" y2="88" strokeWidth="1.4" />
          <text x="110" y="106" fontSize="11.5" fontWeight="700" letterSpacing="2" textAnchor="middle" stroke="none" textLength={fit(visa, 11.5, 170, 0.75)} lengthAdjust="spacingAndGlyphs">
            {visa}
          </text>
          <Stars x={110} y={124} />
        </g>
      </svg>
    );
  }

  // oval (the default, closest to the mockup)
  return (
    <svg viewBox="0 0 230 150" style={{ color: ink }} className="block w-full overflow-visible [&_text]:fill-current">
      <g {...common}>
        <path d="M30 18C80 2 150 2 200 18c24 8 28 106 0 114-50 16-120 16-170 0C2 124 6 26 30 18Z" strokeWidth="4" />
        <path d="M36 27C82 13 148 13 194 27c18 7 20 89 0 96-46 14-112 14-158 0-20-7-18-89 0-96Z" strokeWidth="1.2" />
        <PlaneMark x={115} y={38} size={22} />
        <text
          x="115"
          y="84"
          fontSize="34"
          textAnchor="middle"
          stroke="none"
          className={FONT_DISPLAY}
          textLength={fit(name, 34, 180, 0.5)}
          lengthAdjust="spacingAndGlyphs"
          transform="rotate(-4 115 80)"
        >
          {name}
        </text>
        <text x="115" y="106" fontSize="12" fontWeight="700" letterSpacing="2" textAnchor="middle" stroke="none" textLength={fit(visa, 12, 160, 0.75)} lengthAdjust="spacingAndGlyphs" transform="rotate(-4 115 102)">
          {visa}
        </text>
        <Stars x={115} y={126} />
      </g>
    </svg>
  );
}