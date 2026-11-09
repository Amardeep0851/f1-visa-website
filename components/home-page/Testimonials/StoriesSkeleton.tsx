/** Placeholder cards with the same shape as StoryCard, shown while the first load runs. */
export default function StoriesSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading student stories" className="contents">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} aria-hidden="true" className="flex animate-pulse flex-col overflow-hidden rounded-2xl bg-primary/[0.06] motion-reduce:animate-none">
          <div className="aspect-[4/5] bg-primary/[0.08]" />
          <div className="flex flex-col gap-3 p-5">
            <div className="h-2.5 w-16 rounded bg-primary/10" />
            <div className="h-5 w-3/4 rounded bg-primary/15" />
            <div className="h-3 w-1/2 rounded bg-primary/10" />
            <div className="h-3 w-full rounded bg-primary/[0.07]" />
          </div>
        </div>
      ))}
    </div>
  );
}