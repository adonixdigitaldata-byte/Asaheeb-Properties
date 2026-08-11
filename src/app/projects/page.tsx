"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
import { PROJECTS_DATA, ProjectDetail } from "@/data/projectsData";

const CATEGORIES = [
  { key: "all",  en: "All Projects",    ar: "جميع المشاريع" },
  { key: "Jeddah", en: "Jeddah",         ar: "جدة" },
  { key: "Riyadh", en: "Riyadh",         ar: "الرياض" },
];

const CONTENT = {
  en: {
    badge: "Curated Investment Portfolio",
    heroTitle: "Curated Properties.\nExceptional Value.",
    heroSub: "Explore the exact investment opportunities sourced and vetted by Asaheeb Real Estate — aligned with Saudi Arabia's Vision 2030.",
    filterLabel: "Filter by City Location",
    inquireBtn: "Enquire Now",
    ctaTitle: "Need a Custom Portfolio?",
    ctaSub: "We have off-market institutional assets not publicly listed. Connect with an Asaheeb advisor.",
    ctaBtn: "Talk to an Advisor",
  },
  ar: {
    badge: "محفظة استثمارية منتقاة",
    heroTitle: "عقارات منتقاة.\nقيم استثنائية.",
    heroSub: "تصفح الفرص الاستثمارية التي تم فحصها واعتمادها من قبل أصاهيب العقارية — المتوافقة مع رؤية السعودية 2030.",
    filterLabel: "تصفية حسب المدينة",
    inquireBtn: "استفسر الآن",
    ctaTitle: "هل تحتاج محفظة مخصصة؟",
    ctaSub: "لدينا أصول مؤسسية خارج السوق غير مدرجة علناً. تواصل مع مستشار أصاهيب.",
    ctaBtn: "تحدث مع مستشار",
  },
};

// ─── Project Card Component ───────────────────────────────────────────────────
function ProjectCard({ project, isAr }: { project: ProjectDetail; isAr: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/projects/${project.id}`} className="block text-left" dir={isAr ? "rtl" : "ltr"}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative overflow-hidden cursor-pointer border border-white/10 hover:border-[#B8873B]/60 transition-all duration-500 rounded-sm bg-[#0F1117] h-full flex flex-col justify-between"
        style={{
          boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.6), 0 0 30px rgba(184,135,59,0.15)" : "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div className="relative w-full h-60 overflow-hidden">
          <Image
            src={project.images[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop"}
            alt={isAr ? project.nameAr : project.nameEn}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,17,23,0.95) 0%, transparent 60%)" }} />
          
          {/* Badges Container */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none z-10">
            {/* Status badge */}
            <div
              className="px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase font-semibold shrink-0"
              style={{ backgroundColor: "rgba(18,19,15,0.85)", borderLeft: `3px solid #B8873B`, color: "#B8873B" }}
            >
              {isAr ? project.statusAr : project.statusEn}
            </div>

            {/* City Badge */}
            <div className="px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase text-white bg-black/60 backdrop-blur-sm border border-white/20 shrink-0">
              {isAr ? project.cityAr : project.cityEn}
            </div>
          </div>
        </div>

        <div className={`p-6 flex-1 flex flex-col justify-between ${isAr ? "text-right" : ""}`}>
          <div>
            <div className="font-mono text-[9.5px] tracking-[0.25em] uppercase mb-1.5 font-medium text-[#B8873B]">
              {isAr ? project.districtAr : project.districtEn}
            </div>
            <h3 className="font-display text-2xl text-[#E8DFCE] mb-2 tracking-tight group-hover:text-[#B8873B] transition-colors">
              {isAr ? project.nameAr : project.nameEn}
            </h3>
            <p className="font-sans text-xs text-[#8C8477] leading-relaxed mb-4 line-clamp-2">
              {isAr ? project.overviewAr : project.overviewEn}
            </p>
          </div>

          <div className={`pt-4 border-t border-white/5 flex items-end justify-between ${isAr ? "flex-row-reverse" : ""}`}>
            <div>
              <div className="font-mono text-[8px] uppercase tracking-widest text-[#8C8477] mb-0.5">{isAr ? "نطاق الأسعار" : "Price Range"}</div>
              <div className="font-display text-lg text-[#B8873B] font-semibold">{isAr ? project.priceRangeAr : project.priceRangeEn}</div>
            </div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#B8873B] font-semibold group-hover:underline">
              {isAr ? "التفاصيل ←" : "View Details →"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Projects Page Component ─────────────────────────────────────────────
export default function ProjectsPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;
  const [activeCategory, setActiveCategory] = useState("all");

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "all"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.cityEn === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const heroEls = heroRef.current.querySelectorAll(".hero-el");
        if (heroEls.length > 0) {
          gsap.set(heroEls, { opacity: 0, y: 30 });
          gsap.to(heroEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" });
        }
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".project-card-wrap");
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 30 });
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" });
      }
    }
  }, [activeCategory]);

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"} suppressHydrationWarning>
      <PageNav />

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden pt-28 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-20">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, #B8873B 60px, #B8873B 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #B8873B 60px, #B8873B 61px)",
          }}
        />

        <div ref={heroRef} className={`relative z-10 max-w-5xl ${isAr ? "mr-auto text-right" : ""}`}>
          <div className="hero-el inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full"
            style={{ borderColor: "rgba(184,135,59,0.4)", backgroundColor: "rgba(18,19,15,0.85)" }}>
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#B8873B] font-semibold">{c.badge}</span>
          </div>

          <h1 className="hero-el font-display text-4xl sm:text-6xl lg:text-7xl text-[#E8DFCE] font-normal leading-[1.08] tracking-[-0.025em] mb-6">
            {c.heroTitle.split("\n")[0]}<br />
            <span className="italic text-[#B8873B]">{c.heroTitle.split("\n")[1]}</span>
          </h1>

          <p className="hero-el font-sans text-base sm:text-lg text-[#8C8477] leading-relaxed max-w-xl">{c.heroSub}</p>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-20 py-6 border-y border-white/10">
        <div className={`max-w-7xl mx-auto ${isAr ? "text-right" : ""}`}>
          <p className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#8C8477] mb-4">{c.filterLabel}</p>
          <div className={`flex flex-wrap gap-3 ${isAr ? "justify-end" : ""}`}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="px-6 py-2.5 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer font-medium border rounded-sm"
                  style={{
                    borderColor: isActive ? "#B8873B" : "rgba(255,255,255,0.1)",
                    color: isActive ? "#12130F" : "#8C8477",
                    backgroundColor: isActive ? "#B8873B" : "transparent",
                  }}
                >
                  {isAr ? cat.ar : cat.en}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 lg:px-20">
        <div ref={cardsRef} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <div key={proj.id} className="project-card-wrap">
              <ProjectCard project={proj} isAr={isAr} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CUSTOM ADVISORY CTA BANNER ───────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 border-t border-white/10" style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.06) 0%, rgba(18,19,15,1) 100%)" }}>
        <div className={`max-w-3xl mx-auto ${isAr ? "text-right" : "text-center"}`}>
          <h2 className="font-display text-3xl sm:text-5xl text-[#E8DFCE] mb-4">{c.ctaTitle}</h2>
          <p className="font-sans text-sm sm:text-base text-[#8C8477] mb-8 leading-relaxed max-w-xl mx-auto">{c.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 font-mono text-[11px] tracking-[0.2em] uppercase border border-[#B8873B] bg-[#B8873B] text-[#12130F] font-bold hover:bg-transparent hover:text-[#B8873B] transition-all duration-300"
            >
              {c.ctaBtn}
            </Link>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 font-mono text-[11px] tracking-[0.2em] uppercase border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 font-semibold"
            >
              {isAr ? "محادثة واتساب" : "WhatsApp Instant Reply"}
            </a>
          </div>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
