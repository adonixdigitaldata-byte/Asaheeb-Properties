"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function TurningPointSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Parallax on the background image
      gsap.fromTo(
        ".turning-point-img",
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power1.out" })
        .fromTo(badgeRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(line1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.3")
        .fromTo(line2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.65")
        .fromTo(line3Ref.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.55")
        .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-turning-point"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="turning-point-img absolute inset-0 scale-110">
        <Image
          src="/images/bg-riyadh.png"
          alt="Riyadh skyline transformation"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Layered dark overlay for text legibility */}
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: "linear-gradient(135deg, rgba(7,10,13,0.93) 0%, rgba(7,10,13,0.78) 50%, rgba(7,10,13,0.5) 100%)",
        }}
      />

      {/* Gold vignette accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,135,59,0.6) 50%, transparent)" }}
      />

      {/* Content */}
      <div className={`relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-10 lg:px-20 py-24 lg:py-36 ${isAr ? "text-right" : "text-left"}`}>
        {/* Badge */}
        <div
          ref={badgeRef}
          className={`flex items-center gap-3 mb-8 opacity-0 ${isAr ? "justify-end" : ""}`}
        >
          <div className="h-px w-10 bg-[#B8873B]" />
          <span className="font-mono text-[9px] tracking-[0.38em] uppercase text-[#B8873B] font-semibold">
            {isAr ? "نقطة التحول" : "The Turning Point"}
          </span>
        </div>

        {/* Main Text */}
        <h2 className="font-display leading-[1.05] mb-10" dir={isAr ? "rtl" : "ltr"}>
          <span
            ref={line1Ref}
            className="block opacity-0 text-4xl sm:text-5xl lg:text-7xl text-[#E8DFCE] font-normal"
          >
            {isAr ? "هذا التحول" : "This transformation"}
          </span>
          <span
            ref={line2Ref}
            className="block opacity-0 text-4xl sm:text-5xl lg:text-7xl italic font-normal"
            style={{ color: "#B8873B" }}
          >
            {isAr ? "لم يكن صدفة." : "wasn't an accident."}
          </span>
          <span
            ref={line3Ref}
            className="block opacity-0 text-3xl sm:text-4xl lg:text-5xl text-[#C5BAB0] font-normal mt-2"
          >
            {isAr ? "كان رؤية ٢٠٣٠ — ولا تزال تتسارع." : "It was Vision 2030 — and it's only getting started."}
          </span>
        </h2>

        {/* CTA */}
        <div ref={ctaRef} className={`flex flex-col sm:flex-row gap-4 opacity-0 ${isAr ? "justify-end" : ""}`}>
          <a
            href="#section-pillars"
            className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.24em] uppercase px-7 py-3.5 transition-all duration-300 group"
            style={{ backgroundColor: "#B8873B", color: "#12130F", boxShadow: "0 0 40px rgba(184,135,59,0.35)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(184,135,59,0.65)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(184,135,59,0.35)"; }}
          >
            <span>{isAr ? "اكتشف رؤية ٢٠٣٠" : "Discover Vision 2030"}</span>
            <svg className="group-hover:translate-x-1 transition-transform duration-300" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#section-lead-form"
            className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.24em] uppercase px-7 py-3.5 border border-white/20 text-white hover:border-[#B8873B]/60 hover:text-[#B8873B] transition-all duration-300"
          >
            {isAr ? "ابدأ رحلتك الاستثمارية" : "Start Investing"}
          </a>
        </div>
      </div>
    </section>
  );
}
