// Deterministic "hand-drawn" geometry. Seeded so server and client render identical
// paths (no hydration mismatch) while each box still looks different.

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => n.toFixed(1);

/**
 * One marker pass around a rectangle. Each side is split into a few jittered
 * points joined by smooth curves; the stroke overshoots its start so the corner
 * never quite closes, like a real pen.
 */
export function roughRectPath(
  w: number,
  h: number,
  seed: number,
  jitter = 3.2,
  overshoot = 14,
): string {
  const rnd = mulberry32(seed);
  const j = (k = jitter) => (rnd() - 0.5) * 2 * k;
  const inset = jitter + 2;
  const x0 = inset, y0 = inset, x1 = w - inset, y1 = h - inset;
  const corner = (x: number, y: number): [number, number] => [x + j(), y + j()];
  const side = (a: [number, number], b: [number, number]) => {
    const n = 3;
    const pts: [number, number][] = [];
    for (let i = 1; i < n; i++) {
      const t = i / n;
      pts.push([a[0] + (b[0] - a[0]) * t + j(), a[1] + (b[1] - a[1]) * t + j()]);
    }
    pts.push(b);
    return pts;
  };
  const start = corner(x0, y0);
  const tr = corner(x1, y0);
  const br = corner(x1, y1);
  const bl = corner(x0, y1);
  const pts: [number, number][] = [
    ...side(start, tr),
    ...side(tr, br),
    ...side(br, bl),
    ...side(bl, start),
    [start[0] + overshoot, start[1] + j()],
  ];
  // Corners stay sharp (they are path vertices); each stroke bows slightly like a pen line.
  let d = `M${f(start[0])} ${f(start[1])}`;
  let prev = start;
  for (const p of pts) {
    const mx = (prev[0] + p[0]) / 2;
    const my = (prev[1] + p[1]) / 2;
    const dx = p[0] - prev[0];
    const dy = p[1] - prev[1];
    const len = Math.hypot(dx, dy) || 1;
    const bow = j(1.8);
    d += ` Q${f(mx - (dy / len) * bow)} ${f(my + (dx / len) * bow)} ${f(p[0])} ${f(p[1])}`;
    prev = p;
  }
  return d;
}

/** A slightly wavering horizontal stroke, used for the red line on the box. */
export function roughLinePath(w: number, seed: number, wobble = 1.6): string {
  const rnd = mulberry32(seed);
  const n = 8;
  let d = `M0 ${f(4 + (rnd() - 0.5) * wobble)}`;
  for (let i = 1; i <= n; i++) {
    const x = (w / n) * i;
    const y = 4 + (rnd() - 0.5) * wobble * 2;
    const cx = x - w / n / 2;
    const cy = 4 + (rnd() - 0.5) * wobble * 2;
    d += ` Q${f(cx)} ${f(cy)} ${f(x)} ${f(y)}`;
  }
  return d;
}
