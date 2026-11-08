"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { journeyNav } from "@/data/journey";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";

interface JourneyNavProps {
  onGo: (stop: number) => void;
}

const pill =
  "items-center gap-3 rounded-full bg-(--pj-red) py-2.5 pl-5 pr-2.5 text-[15px] font-semibold text-(--pj-on-red) transition hover:bg-(--pj-red-deep) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pj-ink)";

export default function JourneyNav({ onGo }: JourneyNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (stop: number) => {
    setOpen(false);
    onGo(stop);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)]">
      <div className="mx-auto flex h-20 max-w-[1700px] items-center justify-between gap-4 px-[max(16px,env(safe-area-inset-left,0px))] sm:px-8 lg:px-14">
        <button
          type="button"
          onClick={() => go(0)}
          aria-label="Your F1 Visa Guide, back to the start"
          className="rounded-md bg-[#f9f1e8] px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pj-ink)"
        >
          <Image src="/images/logo.png" width={160} height={40} alt="" className="h-9 w-auto sm:h-10" priority />
        </button>

        <nav aria-label="Journey" className="hidden items-center gap-10 lg:flex">
          {journeyNav.map((l) => (
            <button
              key={l.label}
              type="button"
              onClick={() => go(l.stop)}
              className="group relative text-[16px] font-medium text-(--pj-ink) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--pj-ink)"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-(--pj-red) transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleWhatsappClickWithMessage()}
            className={`${pill} hidden sm:inline-flex`}
          >
            Get Consultation
            <span className="grid size-8 place-items-center rounded-full bg-(--pj-on-red) text-(--pj-red)">
              <ArrowRight size={16} strokeWidth={2.4} />
            </span>
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="pj-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-12 place-items-center rounded-full border border-(--pj-line) text-(--pj-ink) transition hover:border-(--pj-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pj-ink)"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="pj-menu"
          className="mx-4 rounded-2xl border border-(--pj-line) bg-(--pj-bg) p-3 shadow-xl sm:ml-auto sm:mr-8 sm:w-72"
        >
          {journeyNav.map((l) => (
            <button
              key={l.label}
              type="button"
              onClick={() => go(l.stop)}
              className="block w-full rounded-lg px-4 py-3 text-left text-lg font-medium text-(--pj-ink) hover:bg-(--pj-bg-sunk)"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleWhatsappClickWithMessage()}
            className={`${pill} mt-2 flex w-full justify-between`}
          >
            Get Consultation
            <span className="grid size-8 place-items-center rounded-full bg-(--pj-on-red) text-(--pj-red)">
              <ArrowRight size={16} strokeWidth={2.4} />
            </span>
          </button>
        </div>
      )}
    </header>
  );
}
