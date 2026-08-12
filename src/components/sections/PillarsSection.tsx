"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

const PILLARS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 40V20l16-12 16 12v20" />
        <rect x="18" y="28" width="12" height="12" />
        <path d="M24 8v4M14 14l3 3M34 14l-3 3" />
        <path d="M4 40h40" />
      </svg>
    ),
    titleEn: "A Thriving Economy",
    titleAr: "اقتصاد مزدهر",
    bodyEn: "GDP diversification beyond oil. A $1T+ investment ecosystem reshaping financial infrastructure across the Kingdom.",
    bodyAr: "تنويع الناتج المحلي بعيداً عن النفط. منظومة استثمارية تتجاوز تريليون دولار تعيد تشكيل البنية الاقتصادية.",
    accentColor: "#B8873B",
    gradient: "from-[#B8873B]/8 to-transparent",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 8C16 14 12 20 12 24s4 10 12 16" />
        <path d="M24 8c8 6 12 12 12 16s-4 10-12 16" />
        <path d="M8 24h32" />
        <path d="M10 16h28M10 32h28" />
      </svg>
    ),
    titleEn: "A Vibrant Society",
    titleAr: "مجتمع حيوي",
    bodyEn: "Cultural renaissance, entertainment expansion, tourism opening. Saudi Arabia is becoming a global destination.",
    bodyAr: "نهضة ثقافية، توسع في الترفيه، انفتاح سياحي. المملكة تتحول إلى وجهة عالمية.",
    accentColor: "#7FA8B3",
    gradient: "from-[#7FA8B3]/8 to-transparent",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="24,4 44,38 4,38" />
        <path d="M24 18v12M24 34v2" />
        <path d="M16 38v6M32 38v6" />
        <path d="M4 44h40" />
      </svg>
    ),
    titleEn: "An Ambitious Nation",
    titleAr: "أمة طموحة",
    bodyEn: "12 giga-projects. Madinah Al-Munawwarah. Qiddiya. The Red Sea. Diriyah. A nation building the cities of tomorrow — today.",
    bodyAr: "١٢ مشروعاً عملاقاً. المدينة المنورة. قدية. البحر الأحمر. الدرعية. أمة تبني مدن الغد — اليوم.",
    accentColor: "#B8873B",
    gradient: "from-[#B8873B]/8 to-transparent",
  },
];

export default function PillarsSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
            delay: i * 0.15,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-pillars"
      className="relative w-full py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#070A0D" }}
    >
      {/* Horizontal divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header */}
        <div className={`mb-16 ${isAr ? "text-right" : "text-center"}`}>
          <div className={`flex items-center gap-3 mb-6 ${isAr ? "justify-end" : "justify-center"}`}>
            <div className="h-px w-10 bg-[#B8873B]/40" />
            <span className="font-mono text-[9px] tracking-[0.36em] uppercase text-[#B8873B]">
              {isAr ? "رؤية ٢٠٣٠" : "Vision 2030"}
            </span>
            <div className="h-px w-10 bg-[#B8873B]/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal tracking-[-0.02em] leading-[1.1]">
            {isAr ? (
              <>ثلاثة أعمدة. <span className="italic text-[#B8873B]">مستقبل واحد.</span></>
            ) : (
              <>Three Pillars. <span className="italic text-[#B8873B]">One Future.</span></>
            )}
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {PILLARS.map((pillar, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative p-10 lg:p-12 group transition-all duration-500 cursor-default
                ${i < PILLARS.length - 1 ? "border-r border-[rgba(255,255,255,0.06)]" : ""}
                border-t border-[rgba(255,255,255,0.06)]
                md:border-t-0
                ${i === 0 ? "md:border-l border-[rgba(255,255,255,0.06)]" : ""}
              `}
              style={{ opacity: 0 }}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${pillar.accentColor}06 0%, transparent 60%)`,
                }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to right, transparent, ${pillar.accentColor} 50%, transparent)`,
                }}
              />

              {/* Number */}
              <p
                className={`font-mono text-[10px] tracking-[0.28em] uppercase mb-8 ${isAr ? "text-right" : ""}`}
                style={{ color: pillar.accentColor }}
              >
                {String(i + 1).padStart(2, "0")} /{" "}
                {isAr ? ["الأول", "الثاني", "الثالث"][i] : ["First", "Second", "Third"][i]}
              </p>

              {/* Icon */}
              <div
                className={`mb-8 ${isAr ? "flex justify-end" : ""}`}
                style={{ color: pillar.accentColor }}
              >
                {pillar.icon}
              </div>

              {/* Title */}
              <h3
                className={`font-display text-2xl font-normal text-[#E8DFCE] mb-4 leading-snug ${isAr ? "text-right" : ""}`}
              >
                {isAr ? pillar.titleAr : pillar.titleEn}
              </h3>

              {/* Body */}
              <p
                className={`font-sans text-sm text-[#C5BCAD] leading-[1.8] ${isAr ? "text-right" : ""}`}
              >
                {isAr ? pillar.bodyAr : pillar.bodyEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
