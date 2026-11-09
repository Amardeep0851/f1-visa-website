/** Tapered red brush stroke used under the italic lines. */
export default function BrushUnderline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 22" preserveAspectRatio="none" aria-hidden="true" className={`text-accent ${className}`}>
      <path
        data-brush
        d="M4 15C58 8 150 4 296 5c-2 2-6 3-10 3C190 10 92 15 10 20c-4 0-8-2-6-5Z"
        fill="currentColor"
      />
    </svg>
  );
}