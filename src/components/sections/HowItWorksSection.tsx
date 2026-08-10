"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

const STEPS = [
  {
    numEn: "01",
    titleEn: "Discover",
    titleAr: "اكتشف",
    bodyEn: "We listen first. Your goals, timeline, and risk appetite shape everything. No generic pitch decks.",
    bodyAr: "نستمع أولاً. أهدافك وجدولك الزمني وشهيتك للمخاطر تشكّل كل شيء. لا عروض تقديمية جاهزة.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    accent: "#B8873B",
  },
  {
    numEn: "02",
    titleEn: "Vet",
    titleAr: "دقِّق",
    bodyEn: "We partner with Saudi Arabia's most trusted developers. Every opportunity is inspected, compared, and stress-tested before it reaches you.",
    bodyAr: "نتشارك مع أبرز المطورين في المملكة. كل فرصة تُفحَص وتُقارَن وتُختبر قبل أن تصل إليك.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
    accent: "#7FA8B3",
  },
  {
    numEn: "03",
    titleEn: "Guide",
    titleAr: "اهتدِ",
    bodyEn: "Legals. Financing options. Market context. We walk beside you through every decision, in Arabic and English.",
    bodyAr: "الجوانب القانونية. خيارات التمويل. سياق السوق. نرافقك في كل خطوة بالعربية والإنجليزية.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: "#B8873B",
  },
  {
    numEn: "04",
    titleEn: "Close",
    titleAr: "أنجِز",
    bodyEn: "From first enquiry to final signature — we handle the complexity so you don't have to. Your investment is real, not just planned.",
    bodyAr: "من أول استفسار إلى التوقيع النهائي — نتولى التعقيدات نيابةً عنك. استثمارك حقيقي، ليس مجرد خطة.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    accent: "#7FA8B3",
  },
];

export default function HowItWorksSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { opacity: 0, x: isAr ? 30 : -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section
      ref={sectionRef}
      id="section-how-it-works"
      className="relative w-full py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#07080B" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header */}
        <div className={`mb-16 ${isAr ? "text-right" : ""}`}>
          <div className={`flex items-center gap-3 mb-6 ${isAr ? "justify-end" : ""}`}>
            <div className="h-px w-10 bg-[#B8873B]/40" />
            <span className="font-mono text-[9px] tracking-[0.36em] uppercase text-[#B8873B]">
              {isAr ? "كيف يعمل أصاهيب" : "How Asaheeb Works"}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal tracking-[-0.02em] leading-[1.1] max-w-lg">
            {isAr ? (
              <>من أول سؤال{" "}<span className="italic text-[#B8873B]">إلى التوقيع الأخير.</span></>
            ) : (
              <>From first question{" "}<span className="italic text-[#B8873B]">to final signature.</span></>
            )}
          </h2>
        </div>

        {/* Steps — vertical timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute top-0 bottom-0 w-px opacity-20 ${isAr ? "right-5 lg:right-8" : "left-5 lg:left-8"}`}
            style={{ backgroundColor: "#B8873B" }}
          />

          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={(el) => { stepsRef.current[i] = el; }}
                className={`relative flex gap-8 lg:gap-16 py-10 ${i < STEPS.length - 1 ? "border-b border-[rgba(255,255,255,0.05)]" : ""} group ${isAr ? "flex-row-reverse" : ""}`}
                style={{ opacity: 0 }}
              >
                {/* Node */}
                <div className={`relative flex-shrink-0 ${isAr ? "items-end" : ""}`}>
                  <div
                    className="w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center border-2 transition-all duration-400 group-hover:scale-105"
                    style={{
                      borderColor: step.accent,
                      backgroundColor: `${step.accent}10`,
                      color: step.accent,
                    }}
                  >
                    {step.icon}
                  </div>
                  {/* Step number */}
                  <span
                    className={`absolute -top-1 font-mono text-[8px] tracking-[0.2em] ${isAr ? "-right-3" : "-left-3"}`}
                    style={{ color: step.accent }}
                  >
                    {step.numEn}
                  </span>
                </div>

                {/* Content */}
                <div className={`flex-1 pt-2 ${isAr ? "text-right" : ""}`}>
                  <h3 className="font-display text-2xl lg:text-3xl text-[#E8DFCE] font-normal mb-3">
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="font-sans text-sm text-[#8C8477] leading-[1.9] max-w-2xl">
                    {isAr ? step.bodyAr : step.bodyEn}
                  </p>
                </div>

                {/* Large number background */}
                <div
                  className={`absolute font-display text-[8rem] font-bold opacity-[0.03] pointer-events-none select-none ${isAr ? "left-20" : "right-0"}`}
                  style={{ color: step.accent, lineHeight: 1, top: "50%", transform: "translateY(-50%)" }}
                >
                  {step.numEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
