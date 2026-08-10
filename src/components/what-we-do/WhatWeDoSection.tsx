"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

// ─── Chapter base structure ───────────────────────────────────────────────────
const CHAPTER_STATIC_CONFIG = [
  {
    id: "apartments",
    index: "01",
    key: "apartments" as const,
    image: "/images/section1/apartments.png",
    alt: "Luxury Saudi residential apartment tower with golden bronze architecture",
    accent: "#7FA8B3",
    bg: "#0F1117",
    imageLayout: "portrait",
  },
  {
    id: "villas",
    index: "02",
    key: "villas" as const,
    image: "/images/section1/villa.png",
    alt: "Modern luxury Saudi villa with reflection pool at dawn",
    accent: "#B8873B",
    bg: "#12130F",
    imageLayout: "landscape",
  },
  {
    id: "commercial-land",
    index: "03",
    key: "commercialLand" as const,
    image: "/images/section1/commercial-land.png",
    alt: "Masterplanned commercial development land in Saudi Arabia",
    accent: "#B8873B",
    bg: "#0C0D0A",
    imageLayout: "landscape",
  },
  {
    id: "buildings",
    index: "04",
    key: "buildings" as const,
    image: "/images/section1/building.png",
    alt: "Iconic commercial building with sandstone louvers in Saudi Arabia",
    accent: "#7FA8B3",
    bg: "#0F1219",
    imageLayout: "portrait",
  },
];

// ─── Chapter component (Restored Sticky Parallax Stacking & 3D Image Card) ───
function Chapter({
  ch,
  idx,
  chapterRef,
}: {
  ch: {
    id: string;
    index: string;
    label: string;
    headline: string;
    body: string;
    bullets: string[];
    image: string;
    alt: string;
    accent: string;
    bg: string;
    imageLabel: string;
    imageLayout: string;
    milestone: { stat: string; label: string };
  };
  idx: number;
  chapterRef: (el: HTMLElement | null) => void;
}) {
  const imageOnRight = idx % 2 === 0;
  const isPortrait = ch.imageLayout === "portrait";

  return (
    <section
      ref={chapterRef}
      id={`chapter-${ch.id}`}
      className="relative lg:sticky lg:top-0 w-full min-h-screen flex items-center justify-center overflow-hidden py-16 lg:py-0"
      style={{ backgroundColor: ch.bg, zIndex: 10 + idx }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute pointer-events-none opacity-40"
        style={{
          [imageOnRight ? "right" : "left"]: 0,
          top: 0,
          bottom: 0,
          width: "60%",
          background: `radial-gradient(ellipse 80% 70% at ${imageOnRight ? "70%" : "30%"} 50%, ${ch.accent}18 0%, transparent 65%)`,
        }}
      />

      {/* Top horizon line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{
          background: `linear-gradient(to right, transparent, ${ch.accent}, transparent)`,
        }}
      />

      <div
        className={`relative z-10 w-full h-full flex flex-col ${
          imageOnRight ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center justify-center px-5 sm:px-12 lg:px-20 gap-8 lg:gap-16 max-w-7xl mx-auto pt-16 lg:pt-0`}
      >
        {/* ── TEXT COLUMN ─────────────────────────────────────────────────── */}
        <div className="chapter-text flex-shrink-0 w-full lg:max-w-[460px] flex flex-col justify-center text-left overflow-visible">
          {/* Index + rule + label */}
          <div className="flex items-center gap-4 mb-6 lg:mb-10 chapter-eyebrow">
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase font-medium"
              style={{ color: ch.accent }}
            >
              {ch.index}
            </span>
            <div className="h-px w-10 opacity-50" style={{ backgroundColor: ch.accent }} />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#8C8477]">
              {ch.label}
            </span>
          </div>

          {/* Headline */}
          <h2
            className="chapter-headline font-display text-3xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal leading-[1.07] tracking-[-0.025em] mb-4 lg:mb-6"
            style={{ whiteSpace: "pre-line" }}
          >
            {ch.headline}
          </h2>

          {/* Divider */}
          <div
            className="chapter-divider w-12 h-px mb-5 lg:mb-7 opacity-60"
            style={{ backgroundColor: ch.accent }}
          />

          {/* Body */}
          <p className="chapter-body font-sans text-sm sm:text-[15px] text-[#8C8477] leading-[1.8] mb-6 lg:mb-8 max-w-[420px]">
            {ch.body}
          </p>

          {/* Bullet points */}
          <ul className="chapter-bullets space-y-2.5 sm:space-y-3 mb-8 lg:mb-10">
            {ch.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-[7px] w-[5px] h-[5px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: ch.accent }}
                />
                <span className="font-sans text-xs sm:text-sm text-[#E8DFCE]/75 leading-snug">
                  {b}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Link */}
          <div className="chapter-cta">
            <a
              href="/projects"
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase transition-opacity duration-300 group cursor-pointer"
              style={{ color: ch.accent }}
            >
              <span>See How We Help</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              >
                <path
                  d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                  stroke={ch.accent}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ── IMAGE COLUMN ── */}
        <div className="chapter-image-col w-full flex-1 flex items-center justify-center py-4 lg:py-16">
          <div
            className="chapter-image-card relative overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)] group"
            style={{
              width: "100%",
              maxWidth: isPortrait ? "360px" : "540px",
              height: isPortrait ? "min(460px, 58vh)" : "min(360px, 48vh)",
              border: `1px solid ${ch.accent}28`,
              borderRadius: "4px",
            }}
          >
            <Image
              src={ch.image}
              alt={ch.alt}
              fill
              priority={idx === 0}
              sizes="(max-width: 1024px) 90vw, 52vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.45) 100%)",
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(to right, transparent, ${ch.accent}70, transparent)`,
              }}
            />

            {/* Bottom Floating Pill Badge */}
            <div
              className="absolute bottom-5 left-5 flex items-center gap-2 px-3 py-1.5 backdrop-blur-md"
              style={{
                border: `1px solid ${ch.accent}40`,
                backgroundColor: `${ch.bg}bb`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: ch.accent }}
              />
              <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-[#E8DFCE]/75">
                {ch.imageLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 right-10 font-display text-[120px] leading-none font-bold select-none pointer-events-none opacity-[0.03] hidden sm:block"
        style={{ color: ch.accent }}
      >
        {ch.index}
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function WhatWeDoSection() {
  const { t, lang, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chapterLabelRef = useRef<HTMLSpanElement>(null);

  const introBadgeRef = useRef<HTMLDivElement>(null);
  const introHeadlineRef = useRef<HTMLHeadingElement>(null);
  const introSubRef = useRef<HTMLParagraphElement>(null);
  const introScrollRef = useRef<HTMLButtonElement>(null);
  const blobGoldRef = useRef<HTMLDivElement>(null);
  const blobNavyRef = useRef<HTMLDivElement>(null);
  const introWrapRef = useRef<HTMLDivElement>(null);

  const journeyRailRef = useRef<HTMLDivElement>(null);
  const journeyMarkerRef = useRef<HTMLDivElement>(null);
  const journeyTextRef = useRef<HTMLSpanElement>(null);
  const horizonFillRef = useRef<HTMLDivElement>(null);

  const CHAPTERS = CHAPTER_STATIC_CONFIG.map((cfg) => ({
    ...cfg,
    label: t.chapters[cfg.key].label,
    headline: t.chapters[cfg.key].headline,
    body: t.chapters[cfg.key].body,
    bullets: t.chapters[cfg.key].bullets,
    imageLabel: t.chapters[cfg.key].imageLabel,
    milestone: {
      stat: t.chapters[cfg.key].milestoneStat,
      label: t.chapters[cfg.key].milestoneLabel,
    },
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // ── Intro entrance choreography ─────────────────────────────────────
      if (!prefersReduced) {
        gsap.set(introBadgeRef.current, { opacity: 0, scale: 0.9, y: 15 });
        gsap.set(introHeadlineRef.current, { opacity: 0, y: 24 });
        gsap.set(introSubRef.current, { opacity: 0, y: 18 });
        gsap.set(introScrollRef.current, { opacity: 0, y: 12 });

        const introTl = gsap.timeline({ delay: 0.1 });
        introTl
          .to(introBadgeRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" })
          .to(introHeadlineRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.4")
          .to(introSubRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5")
          .to(introScrollRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }, "-=0.3");

        gsap.to(blobGoldRef.current, { x: 40, y: -30, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(blobNavyRef.current, { x: -50, y: 40, duration: 11, ease: "sine.inOut", repeat: -1, yoyo: true });
      }

      // Total scrollable height of this component + 2D Journey Trajectory
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate(self) {
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${self.progress * 100}%`;
          }

          if (journeyRailRef.current && journeyMarkerRef.current) {
            const p = self.progress;

            if (p < 0.01) {
              journeyMarkerRef.current.style.opacity = "0";
              journeyRailRef.current.style.opacity = "0";
              if (horizonFillRef.current) horizonFillRef.current.style.width = "0%";
            } else if (p >= 0.01 && p < 0.18) {
              const t = (p - 0.01) / (0.18 - 0.01);
              const leftPct = 12 + (100 - 12 - 5) * t;
              const topVh = 88;

              journeyMarkerRef.current.style.opacity = `${Math.min(1, t * 2.5)}`;
              journeyMarkerRef.current.style.left = `calc(${leftPct}% - ${t * 80}px)`;
              journeyMarkerRef.current.style.top = `${topVh}vh`;
              journeyMarkerRef.current.style.transform = `translate(-50%, -50%)`;
              journeyRailRef.current.style.opacity = "0";

              if (horizonFillRef.current) horizonFillRef.current.style.width = `${t * 100}%`;
              if (journeyTextRef.current) journeyTextRef.current.textContent = `EXPLORING ASAHEEB`;
            } else if (p >= 0.18 && p < 0.24) {
              const t = (p - 0.18) / (0.24 - 0.18);
              const topVh = 88 - (88 - 22) * t;

              journeyMarkerRef.current.style.opacity = "1";
              journeyMarkerRef.current.style.left = "calc(100% - 90px)";
              journeyMarkerRef.current.style.top = `${topVh}vh`;
              journeyMarkerRef.current.style.transform = `translate(-50%, -50%)`;
              journeyRailRef.current.style.opacity = `${t}`;

              if (horizonFillRef.current) horizonFillRef.current.style.width = "100%";
              if (journeyTextRef.current) journeyTextRef.current.textContent = `01 · ${CHAPTERS[0].label.toUpperCase()}`;
            } else if (p >= 0.24 && p <= 0.99) {
              const t = Math.min(1, (p - 0.24) / (0.94 - 0.24));
              const topVh = 22 + (82 - 22) * t;
              const bobY = Math.sin(p * 85) * 8;

              journeyMarkerRef.current.style.opacity = "1";
              journeyMarkerRef.current.style.left = "calc(100% - 90px)";
              journeyMarkerRef.current.style.top = `${topVh}vh`;
              journeyMarkerRef.current.style.transform = `translate(-50%, -50%) translateY(${bobY}px)`;
              journeyRailRef.current.style.opacity = "1";

              if (horizonFillRef.current) horizonFillRef.current.style.width = "100%";

              let chIdx = 0;
              if (p >= 0.82) chIdx = 3;
              else if (p >= 0.64) chIdx = 2;
              else if (p >= 0.44) chIdx = 1;

              const activeCh = CHAPTERS[chIdx];
              if (journeyTextRef.current && activeCh) {
                journeyTextRef.current.textContent = `${activeCh.index} · ${activeCh.label.toUpperCase()}`;
              }

              dotRefs.current.forEach((dot, di) => {
                if (!dot) return;
                dot.style.transform = di === chIdx ? "scale(1.3)" : "scale(1)";
                dot.style.borderColor = di === chIdx ? CHAPTERS[chIdx].accent : "rgba(184,135,59,0.4)";
              });
            } else {
              const fade = Math.max(0, 1 - (p - 0.99) / 0.01);
              journeyMarkerRef.current.style.opacity = `${fade}`;
              journeyRailRef.current.style.opacity = `${fade}`;
            }
          }
        },
      });

      // ── Per-chapter sticky reveal animation & dot tracking ───────────────
      const chapters = chapterRefs.current.filter(Boolean) as HTMLElement[];
      chapters.forEach((chapter, i) => {
        const textEls = [
          chapter.querySelector(".chapter-eyebrow"),
          chapter.querySelector(".chapter-headline"),
          chapter.querySelector(".chapter-divider"),
          chapter.querySelector(".chapter-body"),
          chapter.querySelector(".chapter-bullets"),
          chapter.querySelector(".chapter-cta"),
        ].filter(Boolean) as Element[];

        const imageCard = chapter.querySelector(".chapter-image-card") as HTMLElement;

        if (!prefersReduced) {
          gsap.set(textEls, { opacity: 0, y: 24 });
          if (imageCard) {
            gsap.set(imageCard, {
              opacity: 0,
              scale: 0.94,
              rotateY: i % 2 === 0 ? 8 : -8,
            });
          }
        }

        ScrollTrigger.create({
          trigger: chapter,
          start: "top 85%",
          end: "bottom 5%",
          onEnter() {
            if (prefersReduced) return;
            if (imageCard) {
              gsap.to(imageCard, {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 0.9,
                ease: "power2.out",
              });
            }
            gsap.to(textEls, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
              delay: 0.15,
            });

            dotRefs.current.forEach((dot, di) => {
              if (!dot) return;
              dot.style.transform = di === i ? "scale(1.3)" : "scale(1)";
              dot.style.borderColor = di === i ? CHAPTERS[i].accent : "rgba(184,135,59,0.4)";
            });

            if (chapterLabelRef.current) {
              chapterLabelRef.current.textContent = CHAPTERS[i].label;
              chapterLabelRef.current.style.color = CHAPTERS[i].accent;
            }
          },
          onEnterBack() {
            if (prefersReduced) return;
            if (imageCard) {
              gsap.to(imageCard, {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 0.9,
                ease: "power2.out",
              });
            }
            gsap.to(textEls, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
            });

            dotRefs.current.forEach((dot, di) => {
              if (!dot) return;
              dot.style.transform = di === i ? "scale(1.3)" : "scale(1)";
              dot.style.borderColor = di === i ? CHAPTERS[i].accent : "rgba(184,135,59,0.4)";
            });

            if (chapterLabelRef.current) {
              chapterLabelRef.current.textContent = CHAPTERS[i].label;
              chapterLabelRef.current.style.color = CHAPTERS[i].accent;
            }
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* ── Fixed Top Nav with Category Tabs (Mobile & Desktop) ─────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-3 sm:px-8 lg:px-16 h-[68px] gap-2 sm:gap-4"
        style={{
          backgroundColor: "rgba(18,19,15,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(184,135,59,0.15)",
        }}
      >
        <a href="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="font-display text-lg sm:text-xl tracking-[0.22em] font-semibold text-[#E8DFCE] group-hover:text-[#B8873B] transition-colors duration-300">
            {t.brandName}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] opacity-90 shadow-[0_0_8px_#B8873B]" />
        </a>

        {/* Page Navigation Links */}
        <div className="hidden md:flex items-center gap-0.5 py-1 px-1">
          {[
            { en: "About Us", ar: "من نحن", href: "/about" },
            { en: "Our Projects", ar: "مشاريعنا", href: "/projects" },
            { en: "Services", ar: "خدماتنا", href: "/services" },
            { en: "Blog", ar: "المدونة", href: "/blog" },
            { en: "Contact", ar: "تواصل معنا", href: "/contact" },
          ].map((link) => (
            <a
              key={link.en}
              href={link.href}
              className="flex-shrink-0 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-[#8C8477] hover:text-[#E8DFCE] hover:bg-[#B8873B]/10 border border-transparent hover:border-[#B8873B]/20 transition-all duration-300"
            >
              {lang === "ar" ? link.ar : link.en}
            </a>
          ))}
        </div>

        {/* Right side compulsory 3 items on mobile: EN/AR, Invest Now, Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <button
            onClick={toggleLanguage}
            className="font-mono text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] uppercase px-2 sm:px-3 py-1.5 rounded-full border border-[#B8873B]/50 hover:bg-[#B8873B] hover:text-[#12130F] text-[#E8DFCE] transition-all duration-300 cursor-pointer flex items-center gap-1 shadow-sm"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>{t.switchLang}</span>
          </button>
          <a
            href="/contact"
            className="font-mono text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] uppercase px-2.5 sm:px-5 py-1.5 sm:py-2 border text-[#E8DFCE] hover:text-[#12130F] hover:bg-[#B8873B] transition-all duration-300 whitespace-nowrap"
            style={{ borderColor: "rgba(184,135,59,0.45)" }}
          >
            {t.investNow}
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 border border-[#B8873B]/30 rounded text-[#E8DFCE] hover:text-[#B8873B] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[68px] z-[195] md:hidden flex flex-col p-6 space-y-3"
          style={{
            backgroundColor: "rgba(18,19,15,0.98)",
            backdropFilter: "blur(25px)",
            borderBottom: "1px solid rgba(184,135,59,0.3)",
          }}
        >
          {[
            { en: "About Us", ar: "من نحن", href: "/about" },
            { en: "Our Projects", ar: "مشاريعنا", href: "/projects" },
            { en: "Services", ar: "خدماتنا", href: "/services" },
            { en: "Blog", ar: "المدونة", href: "/blog" },
            { en: "Contact", ar: "تواصل معنا", href: "/contact" },
          ].map((link) => (
            <a
              key={link.en}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded border border-[rgba(184,135,59,0.15)] font-mono text-sm tracking-[0.2em] uppercase text-[#E8DFCE] hover:text-[#B8873B] hover:bg-[#B8873B]/10 transition-colors"
            >
              {lang === "ar" ? link.ar : link.en}
            </a>
          ))}
        </div>
      )}

      {/* ── Progress bar ─────────────────────────────────────────────────────── */}
      <div
        className="fixed top-[68px] left-0 right-0 z-[199] h-[1.5px]"
        style={{ backgroundColor: "rgba(184,135,59,0.1)" }}
      >
        <div
          ref={progressFillRef}
          className="h-full w-0"
          style={{
            background:
              "linear-gradient(to right, rgba(184,135,59,0.5), #B8873B)",
            boxShadow: "0 0 6px rgba(184,135,59,0.6)",
            transition: "none",
          }}
        />
      </div>

      {/* ── 2D Journey Rail Track (Fixed Right Margin) ────────────────────────── */}
      <div
        ref={journeyRailRef}
        className="fixed right-8 sm:right-12 lg:right-14 top-[20vh] h-[62vh] z-[190] hidden lg:flex flex-col items-center opacity-0 transition-opacity duration-700 pointer-events-none"
      >
        {/* Glowing Vertical Guide Line Track */}
        <div
          className="absolute top-0 bottom-0 w-[3px] rounded-full shadow-[0_0_12px_rgba(184,135,59,0.6)]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(184,135,59,0.15), #B8873B 35%, #7FA8B3 75%, rgba(184,135,59,0.15))",
          }}
        />

        {/* Chapter Nodes along Rail */}
        <div className="h-full w-full flex flex-col justify-between items-center py-2 relative z-10">
          {CHAPTERS.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => {
                const el = document.getElementById(`chapter-${ch.id}`);
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative flex items-center justify-center cursor-pointer pointer-events-auto my-1"
            >
              <div
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="w-4 h-4 rounded-full border border-[#B8873B]/50 transition-all duration-300 flex items-center justify-center bg-[#12130F] shadow-[0_0_10px_rgba(184,135,59,0.4)]"
              >
                <span
                  className="w-2 h-2 rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor:
                      i === 0 ? ch.accent : "rgba(140,132,119,0.4)",
                  }}
                />
              </div>

              {/* Node label tooltip */}
              <span className="absolute right-7 font-mono text-[9px] tracking-widest uppercase text-[#8C8477] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-[#12130f]/90 px-2.5 py-1 rounded border border-[#B8873B]/30 shadow-md">
                {ch.index} · {ch.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Prominent 2D Travelling Asaheeb Saudi Advisor Character Marker ────── */}
      <div
        ref={journeyMarkerRef}
        className="fixed z-[200] hidden lg:block opacity-0 pointer-events-none will-change-transform transition-opacity duration-500"
        style={{
          left: "50%",
          top: "70vh",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative group flex items-center justify-center">
          {/* Outer gold pulsing glow ring */}
          <span className="absolute -inset-4 rounded-full bg-[#B8873B]/40 animate-ping opacity-80" />

          {/* 128px High-Visibility Asaheeb Advisor Avatar Badge */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-[3px] border-[#B8873B] overflow-hidden bg-[#12130F] shadow-[0_0_50px_rgba(184,135,59,1)] p-1">
            <Image
              src="/images/asaheeb_marker.png"
              alt="Asaheeb Saudi Real Estate Advisor Character"
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Floating Gold Active Step Tag */}
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full border border-[#B8873B] bg-[#12130f]/95 backdrop-blur-md shadow-[0_6px_25px_rgba(0,0,0,0.95)]">
            <span
              ref={journeyTextRef}
              className="font-mono text-[10px] font-bold tracking-[0.24em] uppercase text-[#B8873B] whitespace-nowrap"
            >
              EXPLORING ASAHEEB
            </span>
          </div>
        </div>
      </div>

      {/* ── Catchy Luxury Intro Entrance with 3D Video Showcase ────────────────── */}
      <div
        ref={introWrapRef}
        className="relative z-[50] flex flex-col items-center justify-center text-center lg:text-left px-5 sm:px-10 lg:px-20 pt-[120px] pb-20 min-h-[92vh] overflow-hidden"
        style={{ backgroundColor: CHAPTERS[0].bg }}
      >
        {/* Subtle Architectural Grid Lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #B8873B 1px, transparent 1px), linear-gradient(to bottom, #B8873B 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
          }}
        />

        {/* Ambient drifting gradient orbs */}
        <div
          ref={blobGoldRef}
          className="absolute pointer-events-none will-change-transform"
          style={{
            top: "-5%",
            left: "8%",
            width: "45vw",
            height: "45vw",
            maxWidth: 550,
            maxHeight: 550,
            background:
              "radial-gradient(circle, rgba(184,135,59,0.22) 0%, transparent 65%)",
            filter: "blur(20px)",
          }}
        />
        <div
          ref={blobNavyRef}
          className="absolute pointer-events-none will-change-transform"
          style={{
            bottom: "-10%",
            right: "8%",
            width: "40vw",
            height: "40vw",
            maxWidth: 500,
            maxHeight: 500,
            background:
              "radial-gradient(circle, rgba(127,168,179,0.18) 0%, transparent 65%)",
            filter: "blur(20px)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* ── LEFT COLUMN: Text Content ────────────────────────────────────── */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
            {/* Top Prestige Badge */}
            <div
              ref={introBadgeRef}
              className="relative flex flex-wrap items-center justify-center lg:justify-start gap-2 px-3.5 sm:px-4 py-2 mb-6 rounded-full border backdrop-blur-md shadow-[0_0_25px_rgba(184,135,59,0.2)] max-w-full"
              style={{
                borderColor: "rgba(184,135,59,0.4)",
                backgroundColor: "rgba(18,19,15,0.85)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping flex-shrink-0" />
                <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.28em] uppercase text-[#B8873B] font-semibold">
                  {t.introBadge}
                </span>
              </div>
              <span className="w-px h-3 bg-[#B8873B]/40 hidden sm:inline" />
              <span className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#E8DFCE]/90 font-medium">
                {t.visionAligned}
              </span>
            </div>

            {/* Main Catchy Headline */}
            <h1
              ref={introHeadlineRef}
              className="relative font-display text-4xl sm:text-5xl lg:text-6xl text-[#E8DFCE] font-normal tracking-[-0.03em] leading-[1.08] mb-5 drop-shadow-md"
            >
              {t.headlinePart1}{" "}
              <span className="italic font-light text-[#B8873B] drop-shadow-[0_0_30px_rgba(184,135,59,0.45)]">
                {t.headlinePart2}
              </span>{" "}
              {t.headlinePart3}
            </h1>

            {/* Subtext */}
            <p
              ref={introSubRef}
              className="relative font-sans text-base sm:text-lg text-[#8C8477] leading-relaxed max-w-xl mb-8"
            >
              {t.subtext}
            </p>

            {/* Interactive Asset Class Pill Shortcuts */}
            <div className="relative z-10 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-10">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    const el = document.getElementById(`chapter-${ch.id}`);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#B8873B]/25 bg-[#12130f]/80 backdrop-blur-md hover:border-[#B8873B] hover:bg-[#B8873B]/15 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: ch.accent }}
                  />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#E8DFCE]/90 group-hover:text-[#B8873B]">
                    {ch.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Key Metric Highlights Grid */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-10">
              <div className="p-3.5 rounded-lg border border-[#B8873B]/20 bg-[#12130f]/60 backdrop-blur-md text-center hover:border-[#B8873B]/50 transition-colors">
                <div className="font-display text-lg sm:text-xl text-[#E8DFCE] font-semibold tracking-tight">
                  {t.metric1Val}
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#8C8477] mt-1">
                  {t.metric1Label}
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-[#B8873B]/20 bg-[#12130f]/60 backdrop-blur-md text-center hover:border-[#B8873B]/50 transition-colors">
                <div className="font-display text-lg sm:text-xl text-[#B8873B] font-semibold tracking-tight">
                  {t.metric2Val}
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#8C8477] mt-1">
                  {t.metric2Label}
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-[#B8873B]/20 bg-[#12130f]/60 backdrop-blur-md text-center hover:border-[#B8873B]/50 transition-colors">
                <div className="font-display text-lg sm:text-xl text-[#E8DFCE] font-semibold tracking-tight">
                  {t.metric3Val}
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#8C8477] mt-1">
                  {t.metric3Label}
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-[#B8873B]/20 bg-[#12130f]/60 backdrop-blur-md text-center hover:border-[#B8873B]/50 transition-colors">
                <div className="font-display text-lg sm:text-xl text-[#7FA8B3] font-semibold tracking-tight">
                  {t.metric4Val}
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#8C8477] mt-1">
                  {t.metric4Label}
                </div>
              </div>
            </div>

            {/* Interactive "SCROLL TO EXPLORE" CTA */}
            <button
              ref={introScrollRef}
              onClick={() => {
                const el = document.getElementById("chapter-apartments");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative z-10 flex items-center gap-3 cursor-pointer bg-transparent border-none outline-none"
            >
              <div className="w-9 h-9 rounded-full border border-[#B8873B]/40 flex items-center justify-center bg-[#12130f]/80 group-hover:border-[#B8873B] group-hover:bg-[#B8873B]/20 transition-all duration-300 shadow-[0_0_15px_rgba(184,135,59,0.25)]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="translate-y-0 group-hover:translate-y-0.5 transition-transform duration-300"
                >
                  <path
                    d="M7 1V12M2.5 8L7 12.5L11.5 8"
                    stroke="#B8873B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#8C8477] group-hover:text-[#B8873B] transition-colors duration-300 font-medium">
                {t.scrollExplore}
              </span>
            </button>
          </div>

          {/* ── RIGHT COLUMN: 3D Villa Looping Video Showcase ─────────────────── */}
          <div className="flex-1 w-full flex items-center justify-center max-w-[480px]">
            <div
              className="relative w-full aspect-square rounded-xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-[#B8873B]/30 hover:border-[#B8873B]/60 transition-all duration-500 group"
              style={{
                backgroundColor: "#0c0d0a",
              }}
            >
              {/* 3D Generated Seamless Video Loop */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-700 group-hover:scale-105"
                src="/images/hero_3d/villa_loop.mp4"
              />

              {/* Glassmorphism Inner Gradient Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(18,19,15,0.2) 0%, transparent 40%, transparent 60%, rgba(18,19,15,0.7) 100%)",
                }}
              />

              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #B8873B, transparent)",
                }}
              />

              {/* Floating 3D Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3.5 py-2 backdrop-blur-md rounded-md border border-[#B8873B]/30 bg-[#12130f]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-[#E8DFCE] font-medium">
                    {t.videoBadge}
                  </span>
                </div>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#8C8477]">
                  {t.videoSub}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Section Horizon Line Track for Asaheeb Character Trajectory */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none z-20 overflow-hidden">
          <div
            ref={horizonFillRef}
            className="h-full w-0"
            style={{
              background:
                "linear-gradient(to right, #B8873B 20%, #7FA8B3 80%, #B8873B)",
              boxShadow: "0 0 15px rgba(184,135,59,0.9)",
            }}
          />
        </div>
      </div>

      {/* ── Sticky chapter sections ──────────────────────────────────────────── */}
      {CHAPTERS.map((ch, i) => (
        <Chapter
          key={ch.id}
          ch={ch}
          idx={i}
          chapterRef={(el) => { chapterRefs.current[i] = el; }}
        />
      ))}
    </div>
  );
}