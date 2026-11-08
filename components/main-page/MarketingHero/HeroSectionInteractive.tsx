"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Menu,
  Users,
  X,
} from "lucide-react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const serviceItems = [
  { label: "Study", secondLine: "Visas", Icon: GraduationCap },
  { label: "Tourist", secondLine: "Visas", Icon: BriefcaseBusiness },
  { label: "Other", secondLine: "Visa Services", Icon: Users },
];

function PassportOrbit({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div data-hero-orbit className="relative mx-auto aspect-square w-[min(76vw,21rem)] sm:w-[min(66vw,24rem)] lg:w-[clamp(19rem,25vw,25rem)]">
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <path
          d="M50 2.7 C76.8 2.1 97.1 23.1 97 50.1 C97.4 76.8 76.5 97.2 49.9 97 C23.2 97.2 2.9 76.7 3 50 C2.8 23.5 23.4 2.7 50 2.7Z"
          fill="none"
          stroke="currentColor"
          strokeWidth=".42"
          strokeDasharray=".75 1"
          className="text-secondary"
          opacity=".8"
        />
        <path
          d="M50 1.4 C77.7 1.8 98.6 22.2 98.1 50.2 C98.3 78 77.2 98.1 50.1 98.4 C22.5 98.2 1.6 77.2 1.9 49.8 C1.7 22.8 22.8 1.5 50 1.4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth=".32"
          strokeDasharray="1.4 .85"
          className="text-secondary"
          opacity=".58"
        />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="currentColor"
          strokeWidth=".72"
          className="text-accent"
          strokeDasharray="98 197"
          transform="rotate(-78 50 50)"
        />
        {reduceMotion ? (
          <circle cx="84.4" cy="15.6" r="1.85" fill="currentColor" className="text-accent" />
        ) : (
          <circle r="1.85" fill="currentColor" className="text-accent">
            <animateMotion
              dur="11s"
              repeatCount="indefinite"
              rotate="auto"
              path="M 50 3 C 76 3 97 24 97 50 C 97 76 76 97 50 97 C 24 97 3 76 3 50 C 3 24 24 3 50 3"
            />
          </circle>
        )}
      </svg>

      {/* Keep this wrapper independently transformable for the later GSAP scroll sequence. */}
      <div data-hero-passport className="absolute inset-[10%] z-10 grid place-items-center">
        <Image
          src="/images/hero/indian-passport.svg"
          alt="Illustrative deep navy Indian passport cover"
          fill
          priority
          sizes="(max-width: 640px) 58vw, (max-width: 1024px) 360px, 430px"
          className="rotate-[-7deg] object-contain drop-shadow-[0_24px_24px_rgba(18,22,28,0.22)]"
        />
      </div>
    </div>
  );
}

function ProcessSeal() {
  return (
    <a
      href="#process"
      aria-label="Explore our process"
      className="group relative grid size-28 shrink-0 place-items-center text-secondary transition-transform duration-300 hover:scale-105 sm:size-32"
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="hero-process-circle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
        </defs>
        <text fill="currentColor" fontSize="8.5" fontWeight="700" letterSpacing="2.4" className="font-body">
          <textPath href="#hero-process-circle">EXPLORE OUR PROCESS • EXPLORE OUR PROCESS •</textPath>
        </text>
      </svg>
      <span className="grid size-14 place-items-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:rotate-[-35deg] sm:size-16">
        <ArrowDown size={25} strokeWidth={1.7} />
      </span>
    </a>
  );
}

export default function HeroSectionInteractive() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-primary text-secondary">
      {/* Fine paper grain is an inline SVG overlay; no page-specific stylesheet is needed. */}
      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.045]" aria-hidden="true">
        <filter id="hero-paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-paper-grain)" />
      </svg>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1760px] flex-col px-5 sm:px-8 lg:px-12 xl:px-16">
        <header className="relative z-40 flex h-[76px] shrink-0 items-center justify-between sm:h-[88px]">
          <Link href="/" aria-label="Your F1 Visa Guide home" className="inline-flex items-center gap-3">
            <svg viewBox="0 0 48 42" className="h-9 w-10 shrink-0" aria-hidden="true">
              <path d="M2 30.5 24 2h20L22 30.5H2Z" fill="#b91c1c" />
              <path d="M17.5 40 38 13.5h8L25.5 40h-8Z" fill="#8f1518" />
              <path d="m24 2 9 0-21 28.5H2L24 2Z" fill="#e34a43" opacity=".9" />
            </svg>
            <span className="font-body text-[15px] font-extrabold tracking-[-0.055em] sm:text-[19px]">Your F1 Visa Guide</span>
          </Link>

          <nav className="hidden items-center gap-7 xl:flex 2xl:gap-10" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="font-body text-[14px] font-semibold text-secondary/90 transition-colors hover:text-accent 2xl:text-[15px]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="#contact"
              className="hidden items-center gap-3 rounded-full bg-accent px-5 py-3 font-body text-[13px] font-bold text-white shadow-[0_8px_22px_rgba(185,28,28,0.14)] transition-all hover:-translate-y-0.5 hover:bg-[#991b1b] sm:inline-flex sm:px-6"
            >
              Get Consultation
              <span className="grid size-7 place-items-center rounded-full bg-white text-accent"><ArrowUpRight size={16} /></span>
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="hero-mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-11 place-items-center rounded-full border border-secondary/35 text-secondary transition-colors hover:border-accent hover:text-accent xl:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {menuOpen && (
          <nav id="hero-mobile-navigation" aria-label="Mobile navigation" className="absolute left-4 right-4 top-[68px] z-50 rounded-2xl border border-line bg-card p-5 shadow-xl sm:left-8 sm:right-8 sm:top-[78px] xl:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 font-body text-sm font-semibold transition-colors hover:bg-accent-soft hover:text-accent">
                  {item.label}
                </Link>
              ))}
              <Link href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex items-center justify-between rounded-xl bg-accent px-4 py-3 font-body text-sm font-bold text-white">
                Get Consultation <ArrowUpRight size={17} />
              </Link>
            </div>
          </nav>
        )}

        <main className="relative flex flex-1 flex-col gap-7 pb-10 pt-7 sm:gap-9 sm:pt-9 lg:block lg:min-h-[calc(100svh-88px)] lg:pb-5 lg:pt-0">
          <p className="order-0 hidden [writing-mode:vertical-rl] rotate-180 font-body text-[10px] font-extrabold tracking-[0.22em] text-secondary/75 xl:absolute xl:left-[-2.2rem] xl:top-[16%] xl:block">
            IMMIGRATION &amp; VISA GUIDANCE
          </p>

          <h1 data-hero-headline className="order-1 flex flex-col gap-0 font-display text-[clamp(3.8rem,13.5vw,6.2rem)] leading-[0.88] tracking-[-0.045em] sm:text-[clamp(4.7rem,10vw,7rem)] lg:absolute lg:inset-x-0 lg:top-[21%] lg:z-20 lg:flex-row lg:items-center lg:justify-between lg:whitespace-nowrap lg:text-[clamp(3.75rem,5.3vw,6.7rem)]">
            <span className="lg:w-[57%]">Your Immigration</span>
            <span className="self-end text-right lg:w-[28%] lg:self-auto">Journey,</span>
          </h1>

          <div className="order-2 lg:absolute lg:left-[53.5%] lg:top-[4.5%] lg:z-10 lg:-translate-x-1/2">
            <PassportOrbit reduceMotion={reduceMotion} />
          </div>

          <div data-hero-subheadline className="order-3 mx-auto w-full max-w-[34rem] text-center lg:absolute lg:left-[42%] lg:top-[55%] lg:z-20 lg:mx-0 lg:max-w-none lg:text-left">
            <p className="font-editorial text-[clamp(4.3rem,13vw,6.8rem)] italic leading-[0.82] tracking-[-0.055em] sm:text-[clamp(5.3rem,10vw,7.5rem)] lg:text-[clamp(5.2rem,7.2vw,8rem)]">
              <span>Starts </span>
              <span className="relative inline-block text-accent">
                <span className="relative z-10">Here.</span>
                <span aria-hidden="true" className="absolute bottom-[8%] left-[-2%] z-0 h-[0.38em] w-[104%] bg-accent-soft" />
              </span>
            </p>
          </div>

          <div className="order-4 max-w-[34rem] lg:absolute lg:bottom-[13%] lg:left-[3%] lg:z-20 lg:w-[36%]">
            <span className="mb-4 block h-[3px] w-12 bg-accent" />
            <p className="font-body text-[15px] leading-[1.65] text-muted sm:text-[17px] lg:text-[clamp(1rem,1.5vw,1.22rem)]">
              With our expert team by your side, navigate the visa process with clarity, confidence and personalised guidance.
            </p>
          </div>

          <div id="services" className="order-5 flex flex-wrap items-center gap-x-5 gap-y-3 lg:absolute lg:bottom-[3.5%] lg:left-[2.5%] lg:z-20 lg:gap-x-0">
            {serviceItems.map(({ label, secondLine, Icon }, index) => (
              <div key={label} className="flex items-center gap-3 sm:gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-accent/20 text-accent sm:size-14"><Icon size={25} strokeWidth={1.55} /></span>
                <span className="font-body text-[12px] font-bold leading-tight sm:text-[14px]">{label}<br />{secondLine}</span>
                {index !== serviceItems.length - 1 && <span className="ml-1 hidden h-11 w-px bg-line sm:block lg:mx-5 2xl:mx-7" />}
              </div>
            ))}
          </div>

          <div className="order-6 flex items-center justify-center lg:absolute lg:bottom-[4%] lg:left-[47%] lg:z-20 lg:-translate-x-1/2">
            <ProcessSeal />
          </div>

          <div className="order-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between lg:absolute lg:bottom-[4%] lg:right-[1.5%] lg:z-20 lg:w-[43%] lg:flex-col lg:items-end lg:gap-5">
            <div className="flex items-center justify-start gap-7 sm:justify-end sm:gap-10 lg:pr-1">
              <div className="min-w-0">
                <p className="font-display text-3xl leading-none tracking-[-0.04em] sm:text-4xl">01</p>
                <p className="mt-2 font-body text-[9px] font-extrabold tracking-[0.16em] text-muted sm:text-[10px]">STUDY VISA GUIDANCE</p>
              </div>
              <span className="h-12 w-px bg-line" />
              <div className="min-w-0">
                <p className="font-display text-3xl leading-none tracking-[-0.04em] sm:text-4xl">02</p>
                <p className="mt-2 font-body text-[9px] font-extrabold tracking-[0.16em] text-muted sm:text-[10px]">TOURIST VISA SUPPORT</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <Link href="#contact" className="group inline-flex min-h-14 items-center justify-center gap-4 rounded-xl bg-accent px-5 py-3 font-body text-[13px] font-bold text-white shadow-[0_10px_24px_rgba(185,28,28,0.14)] transition-all hover:-translate-y-0.5 hover:bg-[#991b1b] sm:px-7">
                Start Your Journey
                <span className="grid size-8 place-items-center rounded-full bg-white text-accent transition-transform group-hover:translate-x-1"><ArrowRight size={17} /></span>
              </Link>
              <Link href="#services" className="inline-flex min-h-14 items-center justify-center rounded-xl border border-secondary/25 px-6 py-3 font-body text-[13px] font-bold text-secondary transition-colors hover:border-accent hover:text-accent">
                Our Services
              </Link>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
