'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, BriefcaseBusiness, GraduationCap, Menu, UsersRound } from 'lucide-react';
import './hero-section.css';

/**
 * HeroSection is intentionally self-contained. The passport, orbit and orbit
 * marker are separate layers so a later GSAP/ScrollTrigger timeline can move
 * the passport without disturbing the circular ornament.
 */
export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <header className="hero-header">
        <Link className="brand" href="#top" aria-label="Your F1 Visa Guide home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>Your F1 Visa Guide</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="#services">Services</Link><Link href="#destinations">Destinations</Link><Link href="#process">Process</Link><Link href="#about">About</Link><Link href="#contact">Contact</Link>
        </nav>
        <div className="header-actions">
          <Link className="header-cta" href="#contact">Get Consultation <span><ArrowRight size={16} /></span></Link>
          <button className="menu-button" aria-label="Open menu" type="button"><Menu size={23} strokeWidth={1.3} /></button>
        </div>
      </header>

      <div className="side-label" aria-hidden="true"><span className="side-red-dot" /> IMMIGRATION &amp; VISA GUIDANCE <span className="side-rule" /></div>

      <div className="hero-stage" id="top">
        <h1 className="hero-title" id="hero-title"><span>Your Immigration</span><span>Journey<span className="title-comma">,</span></span></h1>

        <div className="passport-stage" aria-label="Illustrative Indian passport">
          <svg className="passport-orbit" viewBox="0 0 440 440" aria-hidden="true">
            <defs><filter id="roughen"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="8"/><feDisplacementMap in="SourceGraphic" scale="0.65"/></filter></defs>
            <circle cx="220" cy="220" r="202" className="orbit-line orbit-line-one" />
            <circle cx="220" cy="220" r="197" className="orbit-line orbit-line-two" />
            <circle cx="220" cy="220" r="202" className="orbit-red-arc" />
          </svg>
          <span className="orbit-marker" aria-hidden="true" />
          <div className="passport-art"><Image src="/passport.svg" alt="Deep navy illustrative Indian passport with gold detailing" fill priority sizes="(max-width: 700px) 44vw, 260px" /></div>
        </div>

        <p className="hero-kicker">A clearer path to what comes next</p>
        <div className="hero-script">Starts <em>Here.</em></div>

        <div className="hero-description">
          <span className="description-rule" />
          <p>With our expert team by your side, navigate the visa process with clarity, confidence and personalised guidance.</p>
          <div className="service-links" id="services">
            <Link href="#study"><span className="service-icon"><GraduationCap /></span><span>Study<br />Visas</span></Link>
            <Link href="#tourist"><span className="service-icon"><BriefcaseBusiness /></span><span>Tourist<br />Visas</span></Link>
            <Link href="#other"><span className="service-icon"><UsersRound /></span><span>Other<br />Visa Services</span></Link>
          </div>
        </div>

        <Link className="scroll-seal" href="#process" aria-label="Explore our process">
          <svg viewBox="0 0 160 160" aria-hidden="true"><defs><path id="seal-circle" d="M80,80 m-57,0 a57,57 0 1,1 114,0 a57,57 0 1,1 -114,0" /></defs><text><textPath href="#seal-circle">EXPLORE OUR PROCESS · EXPLORE OUR PROCESS · </textPath></text></svg>
          <span><ArrowDown size={23} strokeWidth={1.5} /></span>
        </Link>

        <div className="hero-proof">
          <div className="proof-stats" id="destinations">
            <div><strong>10+</strong><span>DESTINATIONS</span></div>
            <i />
            <div><strong>5,000+</strong><span>STUDENTS &amp; TRAVELERS</span></div>
          </div>
          <div className="proof-actions"><Link className="primary-button" href="#contact">Start Your Journey <span><ArrowRight size={19} /></span></Link><Link className="secondary-button" href="#services">Our Services</Link></div>
        </div>
      </div>
    </section>
  );
}
