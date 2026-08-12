"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const STATS = [
  {
    value: 1070,
    suffix: "B",
    prefix: "SAR ",
    labelEn: "Total giga-project investment",
    labelAr: "إجمالي استثمار المشاريع العملاقة",
    decimals: 0,
    accent: "#B8873B",
  },
  {
    value: 12,
    suffix: "+",
    prefix: "",
    labelEn: "Active giga-projects",
    labelAr: "مشاريع عملاقة نشطة",
    decimals: 0,
    accent: "#7FA8B3",
  },
  {
    value: 150,
    suffix: "M",
    prefix: "",
    labelEn: "Tourist arrivals target by 2030",
    labelAr: "هدف السياح بحلول ٢٠٣٠",
    decimals: 0,
    accent: "#B8873B",
  },
  {
    value: 50,
    suffix: "%",
    prefix: "",
    labelEn: "Non-oil GDP contribution target",
    labelAr: "هدف إسهام القطاع غير النفطي",
    decimals: 0,
    accent: "#7FA8B3",
  },
];

function CountUp({ target, suffix, prefix, decimals, accent, trigger }: {
  target: number; suffix: string; prefix: string; decimals: number; accent: string; trigger: boolean;
}) {
  const [count, setCount] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!trigger || ran.current) return;
    ran.current = true;
    const duration = 2200;
    const start = performance.now();
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.floor(ease(p) * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [trigger, target]);

  const formatted = count >= 1000 ? count.toLocaleString("en-US") : decimals > 0 ? count.toFixed(decimals) : String(count);
  return (
    <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em]" style={{ color: accent }}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-stats"
      className="relative w-full py-20 lg:py-32 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src="/images/bg-riyadh.png" alt="Riyadh skyline" fill className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(7,8,10,0.93) 0%, rgba(7,8,10,0.85) 50%, rgba(7,8,10,0.93) 100%)" }} />
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(127,168,179,0.4) 50%, transparent)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header */}
        <div className={`mb-14 ${isAr ? "text-right" : "text-center"}`}>
          <div className={`flex items-center gap-3 mb-5 ${isAr ? "justify-end" : "justify-center"}`}>
            <div className="h-px w-10 bg-[#7FA8B3]/40" />
            <span className="font-mono text-[9px] tracking-[0.36em] uppercase text-[#7FA8B3]">
              {isAr ? "الأرقام" : "The Numbers"}
            </span>
            <div className="h-px w-10 bg-[#7FA8B3]/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal tracking-[-0.02em] leading-[1.1]">
            {isAr ? <>الأرقام لا <span className="italic text-[#7FA8B3]">تكذب.</span></> : <>The numbers <span className="italic text-[#7FA8B3]">don&apos;t lie.</span></>}
          </h2>
          <p className="font-sans text-sm text-[#C5BCAD] mt-3 max-w-md mx-auto">
            {isAr
              ? "هذه ليست توقعات — هذه التزامات صدرت من الحكومة السعودية."
              : "These aren't forecasts — they're commitments made by the Saudi government."}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="relative px-8 py-10"
              style={{ backgroundColor: "rgba(7,8,10,0.7)", backdropFilter: "blur(8px)" }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(to right, ${stat.accent}80, transparent)` }}
              />
              <div className={isAr ? "text-right" : "text-left"}>
                <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals} accent={stat.accent} trigger={triggered} />
                <p className="font-sans text-sm text-[#C5BCAD] mt-2 leading-[1.6]">
                  {isAr ? stat.labelAr : stat.labelEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA under stats */}
        <div className={`mt-10 flex flex-col sm:flex-row items-center gap-4 ${isAr ? "justify-end" : "justify-center"}`}>
          <p className="font-sans text-sm text-[#C5BCAD] text-center">
            {isAr ? "لا تنتظر — الفرصة لها نافذة زمنية محدودة." : "Don't wait — the window has a timeline."}
          </p>
          <a
            href="#section-lead-form"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase px-6 py-3 whitespace-nowrap transition-all duration-300"
            style={{ backgroundColor: "#B8873B", color: "#12130F", boxShadow: "0 0 30px rgba(184,135,59,0.3)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 50px rgba(184,135,59,0.6)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(184,135,59,0.3)"; }}
          >
            {isAr ? "ابدأ الاستثمار الآن" : "Start Investing Now →"}
          </a>
        </div>
      </div>
    </section>
  );
}
