"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// ── Lazy-load both hero variants — they're heavy and client-only ──
const HeroDesktop = dynamic(() => import("./HeroDesktop"), { ssr: false });
const HeroMobile  = dynamic(() => import("./HeroMobile"),  { ssr: false });

// ── Reduced-motion fallback ──
function HeroReducedMotion() {
  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-ink"
      aria-label="Hero — Saudi Arabia transformation"
    >
      {/* Static poster from video last frame */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-desktop.mp4#t=99')" }}
        aria-hidden="true"
      />
      <div className="hero-vignette absolute inset-0 pointer-events-none" />

      <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 text-center w-full px-6">
        <p className="font-display text-dune text-3xl md:text-5xl font-semibold leading-tight max-w-3xl mx-auto">
          The future doesn&apos;t ask permission.
          <br />
          <span className="text-horizon-gold">It gets built.</span>
        </p>
        <div className="w-px h-12 bg-horizon-gold mx-auto mt-8 opacity-80" />
        <p className="font-sans text-stone text-sm tracking-[0.2em] uppercase mt-3">
          See what&apos;s next
        </p>
      </div>

      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-10">
        <span className="font-display text-dune text-xl tracking-widest font-semibold">ASAHEEB</span>
        <a href="#contact" className="font-sans text-dune text-sm tracking-[0.15em] uppercase border border-horizon-gold/60 px-5 py-2 hover:bg-horizon-gold/20 transition-colors duration-300">
          Invest Now
        </a>
      </nav>
    </section>
  );
}

export default function Hero() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile]             = useState(false);
  const [mounted, setMounted]               = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    setMounted(true);
  }, []);

  // Prevent layout shift — reserve full viewport height until mounted
  if (!mounted) {
    return (
      <section className="relative w-full h-screen bg-ink flex items-center justify-center">
        <div className="w-px h-12 bg-horizon-gold animate-pulse" />
      </section>
    );
  }

  if (prefersReduced) return <HeroReducedMotion />;
  if (isMobile)       return <HeroMobile />;
  return <HeroDesktop />;
}
