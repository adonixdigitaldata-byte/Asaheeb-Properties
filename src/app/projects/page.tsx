"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

// ─── Exact 6 projects from Homepage ──────────────────────────────────────────
const PROJECTS = [
  {
    id: "al-nakheel",
    category: "apartments",
    categoryAr: "شقق",
    nameEn: "Al Nakheel Residence",
    nameAr: "إقامة النخيل",
    locationEn: "North Riyadh",
    locationAr: "شمال الرياض",
    priceEn: "from SAR 850K",
    priceAr: "يبدأ من ٨٥٠ألف ر.س",
    area: "180–340m²",
    beds: 3,
    status: "Off-Plan",
    statusAr: "على المخطط",
    returns: "8–12% p.a.",
    image: "/images/projects/apartments-riyadh.png",
    accent: "#7FA8B3",
    tagEn: "High-demand area near NEOM transport corridor. Early investors capturing below-market entry.",
    tagAr: "منطقة طلب مرتفع قرب ممر نيوم. المستثمرون الأوائل يستفيدون من دخول بسعر أدنى من السوق.",
  },
  {
    id: "rawabi-villas",
    category: "villas",
    categoryAr: "فلل",
    nameEn: "Rawabi Villas",
    nameAr: "فلل روابي",
    locationEn: "Jeddah Hills",
    locationAr: "تلال جدة",
    priceEn: "from SAR 3.2M",
    priceAr: "يبدأ من ٣.٢مليون ر.س",
    area: "520–980m²",
    beds: 6,
    status: "Ready",
    statusAr: "جاهز",
    returns: "6–9% p.a.",
    image: "/images/projects/villa-jeddah.png",
    accent: "#B8873B",
    tagEn: "Premium hilltop compound with Red Sea views. Ready to move in or lease immediately.",
    tagAr: "مجمع فاخر على التل مع إطلالات على البحر الأحمر. جاهز للسكن أو التأجير الفوري.",
  },
  {
    id: "neom-bay-land",
    category: "commercial-land",
    categoryAr: "أرض تجارية",
    nameEn: "NEOM Bay Land",
    nameAr: "أرض نيوم باي",
    locationEn: "NEOM, Tabuk",
    locationAr: "نيوم، تبوك",
    priceEn: "from SAR 12M",
    priceAr: "يبدأ من ١٢مليون ر.س",
    area: "5,000–25,000m²",
    beds: 0,
    status: "Available",
    statusAr: "متاح",
    returns: "Capital Growth",
    image: "/images/projects/land-neom.png",
    accent: "#B8873B",
    tagEn: "Strategic NEOM-adjacent parcels before infrastructure pricing is baked in.",
    tagAr: "قطع أراضي استراتيجية مجاورة لنيوم قبل احتساب أسعار البنية التحتية.",
  },
  {
    id: "mamlaka-tower",
    category: "buildings",
    categoryAr: "مبنى تجاري",
    nameEn: "Mamlaka Tower",
    nameAr: "برج مملكة",
    locationEn: "King Fahd Rd, Riyadh",
    locationAr: "طريق الملك فهد، الرياض",
    priceEn: "from SAR 22M",
    priceAr: "يبدأ من ٢٢مليون ر.س",
    area: "2,400–8,200m²",
    beds: 0,
    status: "Ready",
    statusAr: "جاهز",
    returns: "7–11% p.a.",
    image: "/images/projects/tower-riyadh.png",
    accent: "#7FA8B3",
    tagEn: "Institutional-grade commercial tower in Riyadh's primary business spine.",
    tagAr: "برج تجاري بمواصفات مؤسسية في محور الأعمال الرئيسي بالرياض.",
  },
  {
    id: "corniche-pearl",
    category: "apartments",
    categoryAr: "شقق بحرية",
    nameEn: "Corniche Pearl",
    nameAr: "كورنيش بيرل",
    locationEn: "Jeddah Seafront",
    locationAr: "الواجهة البحرية، جدة",
    priceEn: "from SAR 1.1M",
    priceAr: "يبدأ من ١.١مليون ر.س",
    area: "220–480m²",
    beds: 4,
    status: "Off-Plan",
    statusAr: "على المخطط",
    returns: "9–14% p.a.",
    image: "/images/projects/apartments-corniche.png",
    accent: "#7FA8B3",
    tagEn: "Luxury waterfront residence with panoramic Red Sea views and high yield potential.",
    tagAr: "إقامة فاخرة على الواجهة البحرية مع إطلالات بانورامية على البحر الأحمر وعوائد مرتفعة.",
  },
  {
    id: "diriyah-estate",
    category: "villas",
    categoryAr: "فلل تراثية",
    nameEn: "Diriyah Estate",
    nameAr: "مجمع الدرعية",
    locationEn: "Diriyah, Riyadh",
    locationAr: "الدرعية، الرياض",
    priceEn: "from SAR 5.5M",
    priceAr: "يبدأ من ٥.٥مليون ر.س",
    area: "680–1,200m²",
    beds: 7,
    status: "Limited",
    statusAr: "محدود",
    returns: "10–16% p.a.",
    image: "/images/projects/villa-diriyah.png",
    accent: "#B8873B",
    tagEn: "Ultra-exclusive heritage luxury compound adjacent to the UNESCO World Heritage district.",
    tagAr: "مجمع فاخر استثنائي مجاور لمنطقة التراث العالمي بالدرعية.",
  },
];

const CATEGORIES = [
  { key: "all",             en: "All Projects",    ar: "جميع المشاريع" },
  { key: "apartments",      en: "Apartments",      ar: "شقق" },
  { key: "villas",          en: "Villas",          ar: "فلل" },
  { key: "commercial-land", en: "Commercial Land", ar: "أراضٍ تجارية" },
  { key: "buildings",       en: "Buildings",       ar: "مبانٍ" },
];

const CONTENT = {
  en: {
    badge: "Curated Investment Portfolio",
    heroTitle: "Curated Properties.\nExceptional Returns.",
    heroSub: "Explore the exact investment opportunities sourced and vetted by Asaheeb Properties — aligned with Saudi Arabia's Vision 2030.",
    filterLabel: "Filter by Asset Class",
    inquireBtn: "Enquire Now",
    returnsLabel: "Est. Returns",
    areaLabel: "Area",
    bedsLabel: "Beds",
    statusLabel: "Status",
    ctaTitle: "Need a Custom Portfolio?",
    ctaSub: "We have off-market institutional assets not publicly listed. Connect with an Asaheeb advisor.",
    ctaBtn: "Talk to an Advisor",
  },
  ar: {
    badge: "محفظة استثمارية منتقاة",
    heroTitle: "عقارات منتقاة.\nعوائد استثنائية.",
    heroSub: "تصفح نفس الفرص الاستثمارية التي تم فحصها واعتمادها من قبل أصاهيب العقارية — المتوافقة مع رؤية السعودية 2030.",
    filterLabel: "تصفية حسب فئة الأصل",
    inquireBtn: "استفسر الآن",
    returnsLabel: "العوائد المتوقعة",
    areaLabel: "المساحة",
    bedsLabel: "غرف النوم",
    statusLabel: "الحالة",
    ctaTitle: "هل تحتاج محفظة مخصصة؟",
    ctaSub: "لدينا أصول مؤسسية خارج السوق غير مدرجة علناً. تواصل مع مستشار أصاهيب.",
    ctaBtn: "تحدث إلى مستشار",
  },
};

// ─── Project Card Component ───────────────────────────────────────────────────
function ProjectCard({ project, isAr, inquireBtn }: {
  project: typeof PROJECTS[0];
  isAr: boolean;
  inquireBtn: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="project-card relative cursor-pointer group"
      style={{ perspective: "1000px", minHeight: "440px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="w-full h-full transition-all duration-700 relative"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "440px",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 overflow-hidden border flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `${project.accent}35`,
            backgroundColor: "#0F1117",
          }}
        >
          <div className="relative w-full h-56 overflow-hidden">
            <Image
              src={project.image}
              alt={isAr ? project.nameAr : project.nameEn}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,17,23,0.9) 0%, transparent 60%)" }} />
            {/* Status badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase font-semibold"
              style={{ backgroundColor: "rgba(18,19,15,0.85)", borderLeft: `3px solid ${project.accent}`, color: project.accent }}
            >
              {isAr ? project.statusAr : project.status}
            </div>
            {/* Flip indicator button */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#B8873B]/40 bg-[#12130F]/80 backdrop-blur-sm flex items-center justify-center text-[#B8873B] text-sm shadow-md">
              ⟳
            </div>
          </div>

          <div className={`p-6 flex-1 flex flex-col justify-between ${isAr ? "text-right" : ""}`}>
            <div>
              <div className="font-mono text-[9.5px] tracking-[0.25em] uppercase mb-1.5 font-medium" style={{ color: project.accent }}>
                {isAr ? project.categoryAr : project.category}
              </div>
              <h3 className="font-display text-2xl text-[#E8DFCE] mb-2 tracking-tight">
                {isAr ? project.nameAr : project.nameEn}
              </h3>
              <div className={`flex items-center gap-1.5 mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8C8477" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="font-sans text-xs text-[#8C8477]">{isAr ? project.locationAr : project.locationEn}</span>
              </div>
            </div>

            <div className={`pt-4 border-t border-white/5 flex items-end justify-between ${isAr ? "flex-row-reverse" : ""}`}>
              <div>
                <div className="font-display text-xl text-[#E8DFCE] font-semibold">{isAr ? project.priceAr : project.priceEn}</div>
                <div className="font-mono text-[10px] tracking-wider uppercase text-[#B8873B] mt-0.5">{project.returns}</div>
              </div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-[#8C8477]/60 group-hover:text-[#B8873B] transition-colors">
                {isAr ? "تفاصيل ⟲" : "Details ⟲"}
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 p-7 flex flex-col justify-between border"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "#0C0D10",
            borderColor: `${project.accent}50`,
          }}
        >
          <div className={isAr ? "text-right" : ""}>
            <div className={`flex items-center justify-between mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
              <div className="font-mono text-[9.5px] tracking-[0.25em] uppercase font-semibold" style={{ color: project.accent }}>
                {isAr ? project.categoryAr : project.category}
              </div>
              <span className="font-mono text-[9px] text-[#8C8477] uppercase">{isAr ? project.locationAr : project.locationEn}</span>
            </div>

            <h3 className="font-display text-2xl text-[#E8DFCE] mb-4">{isAr ? project.nameAr : project.nameEn}</h3>
            <p className="font-sans text-sm text-[#8C8477] leading-relaxed mb-6">{isAr ? project.tagAr : project.tagEn}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 border border-[#B8873B]/20 bg-[#12130F]/60 text-center">
                <div className="font-display text-base text-[#B8873B] font-semibold">{project.returns}</div>
                <div className="font-mono text-[8px] tracking-wider uppercase text-[#8C8477] mt-0.5">Yield Target</div>
              </div>
              <div className="p-3 border border-[#B8873B]/20 bg-[#12130F]/60 text-center">
                <div className="font-display text-base text-[#E8DFCE] font-semibold">{project.area}</div>
                <div className="font-mono text-[8px] tracking-wider uppercase text-[#8C8477] mt-0.5">Property Size</div>
              </div>
            </div>
          </div>

          <a
            href="/contact"
            className="w-full py-3.5 font-mono text-[10px] tracking-[0.2em] uppercase text-center border border-[#B8873B] text-[#E8DFCE] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 block font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            {inquireBtn}
          </a>
        </div>
      </div>
    </div>
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
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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
      const cards = cardsRef.current.querySelectorAll(".project-card");
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 35 });
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" });
      }
    }
  }, [activeCategory]);

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-20">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(to right, #B8873B 1px, transparent 1px), linear-gradient(to bottom, #B8873B 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, rgba(184,135,59,0.18) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div ref={heroRef} className={`relative z-10 max-w-4xl mx-auto ${isAr ? "text-right" : "text-center"}`}>
          <div className="hero-el inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full"
            style={{ borderColor: "rgba(184,135,59,0.4)", backgroundColor: "rgba(18,19,15,0.85)" }}>
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#B8873B] font-semibold">{c.badge}</span>
          </div>

          <h1
            className="hero-el font-display text-4xl sm:text-5xl lg:text-6xl text-[#E8DFCE] font-normal leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ whiteSpace: "pre-line" }}
          >
            {c.heroTitle.split("\n")[0]}{"\n"}
            <span className="italic text-[#B8873B]">{c.heroTitle.split("\n")[1]}</span>
          </h1>

          <p className={`hero-el font-sans text-base sm:text-lg text-[#8C8477] leading-relaxed max-w-2xl ${isAr ? "" : "mx-auto"}`}>
            {c.heroSub}
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────────────────────────────── */}
      <section className="py-8 px-6 sm:px-10 lg:px-20">
        <div className={`max-w-6xl mx-auto ${isAr ? "text-right" : ""}`}>
          <p className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#8C8477] mb-4">{c.filterLabel}</p>
          <div className={`flex flex-wrap gap-2.5 ${isAr ? "justify-end" : ""}`}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="px-5 py-2.5 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase transition-all duration-300 border cursor-pointer font-medium"
                  style={{
                    borderColor: isActive ? "#B8873B" : "rgba(184,135,59,0.2)",
                    backgroundColor: isActive ? "rgba(184,135,59,0.14)" : "rgba(18,19,15,0.4)",
                    color: isActive ? "#B8873B" : "#8C8477",
                    boxShadow: isActive ? "0 0 20px rgba(184,135,59,0.25)" : "none",
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
      <section className="pb-24 px-6 sm:px-10 lg:px-20">
        <div ref={cardsRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isAr={isAr}
              inquireBtn={c.inquireBtn}
            />
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-6 sm:px-10 lg:px-20"
        style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.08) 0%, rgba(18,19,15,1) 50%, rgba(127,168,179,0.05) 100%)" }}
      >
        <div className={`max-w-3xl mx-auto ${isAr ? "text-right" : "text-center"}`}>
          <h2 className="font-display text-3xl sm:text-4xl text-[#E8DFCE] mb-4">{c.ctaTitle}</h2>
          <p className="font-sans text-base text-[#8C8477] mb-8 leading-relaxed">{c.ctaSub}</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 border border-[#B8873B] text-[#E8DFCE] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 font-semibold"
          >
            {c.ctaBtn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={isAr ? "rotate-180" : ""}>
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
