import { storiesCopy } from "@/data/home-page/testimonials";

export type StoryFilter = "all" | "study" | "tourist" | "video";
export const FILTERS: StoryFilter[] = ["all", "study", "tourist", "video"];

interface StoryFiltersProps {
  value: StoryFilter;
  counts: Record<StoryFilter, number>;
  onChange: (filter: StoryFilter) => void;
}

/** Toggle chips. aria-pressed tells screen readers which one is active. */
export default function StoryFilters({ value, counts, onChange }: StoryFiltersProps) {
  return (
    <div role="group" aria-label="Filter stories" className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const active = f === value;
        // Hide a filter that has nothing in it (except "All").
        if (f !== "all" && counts[f] === 0) return null;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              active ? "border-primary bg-primary text-secondary" : "border-primary/20 text-primary/80 hover:border-primary/60 hover:text-primary"
            }`}
          >
            {storiesCopy.filters[f]}
            <span className={`font-mono text-[11px] ${active ? "text-accent" : "text-primary/45"}`}>{counts[f]}</span>
          </button>
        );
      })}
    </div>
  );
}