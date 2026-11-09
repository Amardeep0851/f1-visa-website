"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems, type NavTarget } from "@/data/journey";
import { handleWhatsappClickWithMessage } from "@/function/handleWhatsapp";
import { FONT_BODY } from "./tokens";

interface JourneyNavProps {
  onGo: (target: NavTarget) => void;
}

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

/** Top bar of the hero. Links and buttons fade out once the story starts ([data-nav-fade]). */
export default function JourneyNav({ onGo }: JourneyNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (target: NavTarget) => {
    setOpen(false);
    onGo(target);
  };

  return (
    <header className={`absolute inset-x-0 top-0 z-40 ${FONT_BODY}`}>
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-8 lg:h-24 lg:px-14">
        <button type="button" onClick={() => go("hero")} aria-label="Your F1 Visa Guide, back to the start" className={`rounded-md ${focus}`}>
          <Image src="/images/logo.png" width={168} height={42} alt="" priority className="h-9 w-auto sm:h-10" />
        </button>

        <nav data-nav-fade aria-label="Main" className="hidden items-center gap-12 xl:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => go(item.target)}
              className={`group relative text-[15px] font-semibold text-secondary ${focus}`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div data-nav-fade className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleWhatsappClickWithMessage()}
            className={`hidden items-center gap-4 rounded-full bg-accent py-2.5 pl-6 pr-2.5 text-[15px] font-bold text-white shadow-[0_8px_22px_rgb(185_28_28/0.18)] transition hover:-translate-y-0.5 hover:bg-[#991b1b] sm:inline-flex ${focus}`}
          >
            Get Consultation
            <span className="grid size-8 place-items-center rounded-full bg-white text-accent">
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="pj-menu"
            onClick={() => setOpen((v) => !v)}
            className={`grid size-12 place-items-center rounded-full border border-secondary/30 text-secondary transition hover:border-secondary lg:size-14 ${focus}`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="pj-menu" className="mx-4 rounded-2xl border border-secondary/15 bg-primary p-3 shadow-xl sm:ml-auto sm:mr-8 sm:w-72">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => go(item.target)}
              className="block w-full rounded-lg px-4 py-3 text-left text-lg font-semibold text-secondary hover:bg-secondary/5"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleWhatsappClickWithMessage()}
            className="mt-2 flex w-full items-center justify-between rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white"
          >
            Get Consultation
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </header>
  );
}