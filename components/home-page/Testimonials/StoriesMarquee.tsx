import { Plane } from "lucide-react";
import type { Story } from "@/lib/home-page/testimonials";
import { FONT_DISPLAY } from "@/components/PassportJourney/ui/tokens";
import styles from "./stories.module.css";

/** Slow ticker of student names, like a departures board. Pauses on hover. */
export default function StoriesMarquee({ stories }: { stories: Story[] }) {
  const items = stories.filter((s) => s.name && s.name.length < 28).slice(0, 16);
  if (items.length < 4) return null;
  const row = items.map((s) => (
    <span key={s.key} className="flex items-center gap-4 pr-10">
      <span className={`${FONT_DISPLAY} text-[22px] uppercase tracking-wide text-primary sm:text-[26px]`}>{s.name}</span>
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/55">{s.visa}</span>
      <Plane className="size-4 rotate-45 text-accent" aria-hidden="true" />
    </span>
  ));
  return (
    <div className={`${styles.marquee} overflow-hidden border-y border-primary/10 py-5`} aria-hidden="true">
      <div className={styles.track}>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
}