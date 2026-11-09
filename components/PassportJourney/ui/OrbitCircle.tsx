/**
 * The thin hero circle with a red arc and a dot riding on it.
 * GSAP rotates [data-orbit-arc] into place and draws the arc on.
 */
const R = 48;
const C = 50;
const at = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [C + R * Math.sin(rad), C - R * Math.cos(rad)] as const;
};
// Dot at about 1 o'clock, arc running clockwise to about 7 o'clock (as in the mockup).
const START = 40;
const END = 205;
const [sx, sy] = at(START);
const [ex, ey] = at(END);
const ARC = `M${sx.toFixed(2)} ${sy.toFixed(2)} A${R} ${R} 0 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;

export default function OrbitCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`overflow-visible ${className}`}>
      <circle cx={C} cy={C} r={R} fill="none" className="stroke-secondary" strokeWidth={0.28} />
      <g data-orbit-arc>
        <path
          data-orbit-line
          d={ARC}
          fill="none"
          className="stroke-accent"
          strokeWidth={0.5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
        />
        <circle data-orbit-dot cx={sx} cy={sy} r={1.55} className="fill-accent" />
      </g>
    </svg>
  );
}