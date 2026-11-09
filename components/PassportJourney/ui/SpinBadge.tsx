import { ArrowDown } from "lucide-react";

interface SpinBadgeProps {
  text: string;
  onClick: () => void;
  className?: string;
}

/** Rotating circular text with a red button in the middle. */
export default function SpinBadge({ text, onClick, className = "" }: SpinBadgeProps) {
  const label = `${text.toUpperCase()} · ${text.toUpperCase()} · `;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={text}
      className={`relative grid size-[150px] place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary ${className}`}
    >
      <svg viewBox="0 0 150 150" aria-hidden="true" className="absolute inset-0 size-full motion-safe:animate-[spin_22s_linear_infinite]">
        <defs>
          <path id="pj-badge-path" d="M75 75m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" />
        </defs>
        <text className="fill-secondary font-mono text-[10.5px] font-semibold tracking-[0.2em]">
          <textPath href="#pj-badge-path" textLength="364" lengthAdjust="spacing">
            {label}
          </textPath>
        </text>
      </svg>
      <span className="grid size-[68px] place-items-center rounded-full bg-accent text-white shadow-[0_10px_24px_rgb(185_28_28/0.25)]">
        <ArrowDown size={24} strokeWidth={2} />
      </span>
    </button>
  );
}