"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const MEGA_PROJECTS = [
  {
    nameEn: "Madinah Al-Munawwarah",
    nameAr: "المدينة المنورة",
    tagEn: "Sacred heritage transformation & 47,000 luxury hospitality suites — Vision 2030 holy city development",
    tagAr: "التحول الحضري والتطوير الفندقي الفاخر بقيمة ١٤٠ مليار ريال بجوار المسجد النبوي الشريف",
    stat: "SAR 140B",
    statLabelEn: "Masterplan",
    statLabelAr: "المخطط الشامل",
    badge: "HOLY CITY FLAGSHIP",
    accent: "#B8873B",
    bg: "/images/madinah.jpg",
    featured: true,
  },
  {
    nameEn: "Qiddiya",
    nameAr: "قدية",
    tagEn: "Entertainment capital of the world",
    tagAr: "عاصمة الترفيه في العالم",
    stat: "USD 8B+",
    statLabelEn: "Phase 1",
    statLabelAr: "المرحلة الأولى",
    badge: "ENTERTAINMENT",
    accent: "#B8873B",
    bg: "/images/bg-riyadh.png",
    featured: false,
  },
  {
    nameEn: "The Red Sea",
    nameAr: "البحر الأحمر",
    tagEn: "World's most ambitious tourism project",
    tagAr: "أطموح مشروع سياحي في العالم",
    stat: "50+ Islands",
    statLabelEn: "Developed",
    statLabelAr: "جزيرة",
    badge: "TOURISM",
    accent: "#7FA8B3",
    bg: "/images/projects/apartments-corniche.png",
    featured: false,
  },
  {
    nameEn: "Diriyah",
    nameAr: "الدرعية",
    tagEn: "UNESCO heritage reborn as a global destination",
    tagAr: "تراث يولد من جديد وجهةً عالمية",
    stat: "USD 20B",
    statLabelEn: "Investment",
    statLabelAr: "استثمار",
    badge: "HERITAGE",
    accent: "#B8873B",
    bg: "/images/projects/villa-diriyah.png",
    featured: false,
  },
  {
    nameEn: "ROSHN",
    nameAr: "روشن",
    tagEn: "Integrated communities reshaping Saudi living",
    tagAr: "مجتمعات متكاملة تُعيد تشكيل الحياة السعودية",
    stat: "400K+ Homes",
    statLabelEn: "Target",
    statLabelAr: "هدف",
    badge: "RESIDENTIAL",
    accent: "#7FA8B3",
    bg: "/images/projects/apartments-riyadh.png",
    featured: false,
  },
];

export default function MegaProjectsSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Head reveal
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: headRef.current, start: "top 80%" },
        }
      );

      // Featured card reveal
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: featuredRef.current, start: "top 82%" },
        }
      );

      // Grid cards
      const cards = gridRef.current?.querySelectorAll(".project-mini-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = MEGA_PROJECTS[0];
  const rest = MEGA_PROJECTS.slice(1);

  return (
    <section
      ref={sectionRef}
      id="section-mega-projects"
      className="relative w-full py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#060809" }}
    >
      {/* Diagonal top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to bottom right, #070A0D 50%, transparent 50%)",
        }}
      />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,135,59,0.4) 50%, transparent)" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header */}
        <div ref={headRef} className={`mb-12 ${isAr ? "text-right" : ""}`}>
          <div className={`flex items-center gap-3 mb-5 ${isAr ? "justify-end" : ""}`}>
            <div className="h-px w-10 bg-[#B8873B]/40" />
            <span className="font-mono text-[9px] tracking-[0.36em] uppercase text-[#B8873B]">
              {isAr ? "المشاريع العملاقة" : "Giga-Projects"}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal tracking-[-0.02em] leading-[1.1]">
              {isAr ? (
                <>هذه ليست <span className="italic text-[#B8873B]">إعلانات.</span><br />إنها قيد الإنشاء.</>
              ) : (
                <>These aren&apos;t <span className="italic text-[#B8873B]">announcements.</span><br />They&apos;re under construction.</>
              )}
            </h2>
            <a
              href="#section-lead-form"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#B8873B] border border-[#B8873B]/30 px-5 py-2.5 hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 self-start lg:self-auto whitespace-nowrap"
            >
              {isAr ? "استثمر الآن" : "Invest Now"}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Featured Card — NEOM */}
        <div
          ref={featuredRef}
          className="relative w-full overflow-hidden mb-4 group cursor-pointer"
          style={{ height: "min(70vh, 520px)" }}
        >
          <Image
            src={featured.bg}
            alt={featured.nameEn}
            fill
            unoptimized
            priority
            className="object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(6,8,9,0.85) 0%, rgba(6,8,9,0.4) 55%, rgba(6,8,9,0.15) 100%)" }}
          />
          {/* Gold top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(to right, #B8873B 0%, transparent 60%)" }} />

          {/* Content */}
          <div className={`absolute inset-0 flex flex-col justify-between p-8 lg:p-14 ${isAr ? "items-end text-right" : ""}`}>
            <div>
              <span
                className="inline-block font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1 mb-6"
                style={{ color: "#12130F", backgroundColor: featured.accent }}
              >
                {featured.badge}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3">
                {isAr ? featured.nameAr : featured.nameEn}
              </h3>
              <p className="font-sans text-base text-[#C5BAB0] leading-[1.7] max-w-md">
                {isAr ? featured.tagAr : featured.tagEn}
              </p>
            </div>

            <div className={`flex items-end justify-between w-full`}>
              <div>
                <p className="font-mono text-[9px] text-[#C5BCAD] tracking-[0.2em] uppercase mb-1 font-medium">
                  {isAr ? featured.statLabelAr : featured.statLabelEn}
                </p>
                <p className="font-display text-3xl lg:text-4xl font-semibold" style={{ color: featured.accent }}>
                  {featured.stat}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-card mini grid */}
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {rest.map((proj, i) => (
            <div
              key={i}
              className="project-mini-card relative overflow-hidden group cursor-pointer"
              style={{ height: "240px" }}
            >
              <Image
                src={proj.bg}
                alt={proj.nameEn}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, rgba(6,8,9,0.95) 0%, rgba(6,8,9,0.5) 50%, rgba(6,8,9,0.1) 100%)" }}
              />
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, ${proj.accent}, transparent)` }}
              />

              <div className={`absolute inset-0 flex flex-col justify-between p-5 ${isAr ? "items-end text-right" : ""}`}>
                <span
                  className="font-mono text-[7px] tracking-[0.28em] uppercase px-2 py-0.5 self-start"
                  style={{ color: "#12130F", backgroundColor: proj.accent }}
                >
                  {proj.badge}
                </span>
                <div>
                  <h3 className="font-display text-xl lg:text-2xl text-white font-normal leading-tight mb-1">
                    {isAr ? proj.nameAr : proj.nameEn}
                  </h3>
                  <p className="font-display text-sm font-semibold" style={{ color: proj.accent }}>
                    {proj.stat}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          <p className="font-sans text-sm text-[#C5BCAD]">
            {isAr
              ? "استثمر في المشاريع التي تعيد رسم خريطة العالم."
              : "Invest in the projects that are redrawing the map of the world."}
          </p>
          <a
            href="#section-lead-form"
            className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold px-6 py-3 transition-all duration-300"
            style={{ backgroundColor: "#B8873B", color: "#12130F", boxShadow: "0 0 30px rgba(184,135,59,0.3)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 50px rgba(184,135,59,0.6)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(184,135,59,0.3)"; }}
          >
            {isAr ? "احصل على خطتي الاستثمارية" : "Get My Investment Plan"}
          </a>
        </div>
      </div>
    </section>
  );
}
