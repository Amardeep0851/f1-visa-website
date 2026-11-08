import type { CSSProperties, ReactNode, Ref } from "react";
import { roughLinePath, roughRectPath } from "@/lib/sketch";

interface SketchBoxProps {
  /** Receives the root element. */
  ref?: Ref<HTMLDivElement>;
  /** viewBox size. Also sets the CSS aspect ratio so strokes never stretch. */
  ratio?: [number, number];
  seed?: number;
  /** Red half-width line with a dot on the top edge. */
  track?: boolean;
  /** Track position (0 to 1). Leave unset to inherit `--p` from an ancestor. */
  progress?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * A rectangle that looks drawn with a marker: two slightly different passes,
 * corners that overshoot. Optionally carries the red "route" line
 * (half the box width) with a dot at its leading end, positioned by `--p`.
 */
export default function SketchBox({
  ref,
  ratio = [400, 480],
  seed = 7,
  track = true,
  progress,
  className = "",
  style,
  children,
}: SketchBoxProps) {
  const [w, h] = ratio;
  const main = roughRectPath(w, h, seed);
  const second = roughRectPath(w, h, seed + 19, 2.4, 24);
  const line = roughLinePath(200, seed + 3);
  // The top edge sits at the path inset, so the track is placed there, not at 0.
  const topPct = `${((3.2 + 2) / h) * 100}%`;

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={
        {
          aspectRatio: `${w} / ${h}`,
          ...(progress !== undefined ? { "--p": progress } : {}),
          ...style,
        } as CSSProperties
      }
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          data-sketch="2"
          d={second}
          fill="none"
          stroke="var(--pj-ink)"
          strokeOpacity={0.5}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
        />
        <path
          data-sketch="1"
          d={main}
          fill="none"
          stroke="var(--pj-ink)"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
        />
      </svg>

      {track && (
        <>
          <span
            data-track-line
            aria-hidden="true"
            className="pointer-events-none absolute h-2 -translate-y-1/2"
            style={{
              top: topPct,
              left: "calc(max(0, var(--p, 0) - .5) * 100%)",
              width: "calc(min(var(--p, 0), .5) * 100%)",
            }}
          >
            <svg
              className="h-full w-full overflow-visible"
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
            >
              <path
                d={line}
                fill="none"
                stroke="var(--pj-red)"
                strokeWidth={4}
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            data-track-dot
            aria-hidden="true"
            className="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--pj-red) shadow-[0_0_0_4px_color-mix(in_srgb,var(--pj-red)_22%,transparent)]"
            style={{ top: topPct, left: "calc(var(--p, 0) * 100%)" }}
          />
        </>
      )}
      {children}
    </div>
  );
}
