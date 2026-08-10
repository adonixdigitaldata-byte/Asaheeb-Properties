"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

const PROJECTS = [
  {
    id: "al-nakheel",
    type: "apartments",
    typeAr: "شقق",
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
    featured: true,
    tagEn: "High-demand area near NEOM transport corridor. Early investors capturing below-market entry.",
    tagAr: "منطقة طلب مرتفع قرب ممر نيوم. المستثمرون الأوائل يستفيدون من دخول بسعر أدنى من السوق.",
  },
  {
    id: "rawabi-villas",
    type: "villas",
    typeAr: "فلل",
    nameEn: "Rawabi Villas",
    nameAr: "فلل رواب",
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
    featured: false,
  },
  {
    id: "neom-bay-land",
    type: "commercial-land",
    typeAr: "أرض تجارية",
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
    featured: false,
  },
  {
    id: "mamlaka-tower",
    type: "buildings",
    typeAr: "مبنى تجاري",
    nameEn: "Mamlaka Tower",
    nameAr: "برج مملكة",
    locationEn: "King Fahd Rd, Riyadh",
    locationAr: "طريق الملك فهد",
    priceEn: "from SAR 22M",
    priceAr: "يبدأ من ٢٢مليون ر.س",
    area: "2,400–8,200m²",
    beds: 0,
    status: "Ready",
    statusAr: "جاهز",
    returns: "7–11% p.a.",
    image: "/images/projects/tower-riyadh.png",
    accent: "#7FA8B3",
    featured: false,
  },
  {
    id: "corniche-pearl",
    type: "apartments",
    typeAr: "شقق بحرية",
    nameEn: "Corniche Pearl",
    nameAr: "كورنيش بيرل",
    locationEn: "Jeddah Seafront",
    locationAr: "الواجهة البحرية جدة",
    priceEn: "from SAR 1.1M",
    priceAr: "يبدأ من ١.١مليون ر.س",
    area: "220–480m²",
    beds: 4,
    status: "Off-Plan",
    statusAr: "على المخطط",
    returns: "9–14% p.a.",
    image: "/images/projects/apartments-corniche.png",
    accent: "#7FA8B3",
    featured: false,
  },
  {
    id: "diriyah-estate",
    type: "villas",
    typeAr: "فلل تراثية",
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
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const name = isAr ? project.nameAr : project.nameEn;
  const location = isAr ? project.locationAr : project.locationEn;
  const price = isAr ? project.priceAr : project.priceEn;
  const status = isAr ? project.statusAr : project.status;
  const type = isAr ? project.typeAr : project.type;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        border: `1px solid ${hovered ? project.accent + "50" : "rgba(255,255,255,0.07)"}`,
        transition: "border-color 0.4s ease",
        boxShadow: hovered ? `0 24px 64px rgba(0,0,0,0.6), 0 0 40px ${project.accent}18` : "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        <Image
          src={project.image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1.01)",
            transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(8,11,15,0.85) 100%)" }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(to right, ${project.accent}, transparent)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Type badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 font-mono text-[8px] tracking-[0.22em] uppercase font-bold"
          style={{ color: "#12130F", backgroundColor: project.accent }}
        >
          {type}
        </div>

        {/* Status */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 font-mono text-[8px] tracking-[0.18em] uppercase"
          style={{
            color: "#E8DFCE",
            border: "1px solid rgba(232,223,206,0.25)",
            backgroundColor: "rgba(8,11,15,0.75)",
            backdropFilter: "blur(6px)",
          }}
        >
          {status}
        </div>

        {/* Returns bubble */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1"
          style={{
            backgroundColor: "rgba(8,11,15,0.85)",
            border: `1px solid ${project.accent}40`,
            backdropFilter: "blur(6px)",
          }}
        >
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 9L4.5 6L7 8.5L10.5 3" stroke={project.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-mono text-[8px] font-bold" style={{ color: project.accent }}>{project.returns}</span>
        </div>
      </div>

      {/* Body */}
      <div
        className="p-5"
        style={{ backgroundColor: "rgba(11,14,18,0.95)" }}
      >
        <p className="font-mono text-[8px] tracking-[0.22em] uppercase text-[#8C8477] mb-1.5 flex items-center gap-1.5">
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
            <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.72 3.5 6.5 3.5 6.5s3.5-3.78 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="#8C8477" strokeWidth="1.2"/>
          </svg>
          {location}
        </p>

        <h3
          className="font-display text-lg text-[#E8DFCE] font-normal leading-snug mb-4"
          style={{ color: hovered ? "#FFFFFF" : "#E8DFCE", transition: "color 0.3s" }}
        >
          {name}
        </h3>

        {/* Stats */}
        <div className="flex gap-4 mb-5">
          {project.beds > 0 && (
            <div className="text-center">
              <p className="font-display text-base font-semibold text-[#E8DFCE]">{project.beds}</p>
              <p className="font-mono text-[8px] text-[#8C8477] uppercase tracking-wider">{isAr ? "غرف" : "Beds"}</p>
            </div>
          )}
          <div className="text-center">
            <p className="font-display text-base font-semibold text-[#E8DFCE]">{project.area.split("–")[0]}+</p>
            <p className="font-mono text-[8px] text-[#8C8477] uppercase tracking-wider">{isAr ? "متر" : "m²"}</p>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-widest text-[#8C8477] mb-0.5">{isAr ? "يبدأ من" : "Starting"}</p>
            <p className="font-display text-base font-semibold" style={{ color: project.accent }}>{price}</p>
          </div>
          <button
            className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] uppercase px-3.5 py-2 border transition-all duration-300"
            style={{
              borderColor: hovered ? project.accent : "rgba(255,255,255,0.1)",
              color: hovered ? project.accent : "#8C8477",
              backgroundColor: hovered ? `${project.accent}10` : "transparent",
            }}
          >
            {isAr ? "استفسر الآن" : "Inquire Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });
      gsap.fromTo(featuredRef.current, { opacity: 0, x: isAr ? 40 : -40 }, {
        opacity: 1, x: 0, duration: 1.1, ease: "power2.out",
        scrollTrigger: { trigger: featuredRef.current, start: "top 80%" },
      });
      gridRef.current?.querySelectorAll(".project-grid-card").forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.75, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isAr]);

  return (
    <section
      ref={sectionRef}
      id="section-projects"
      className="relative w-full py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#080B0F" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(to right, #B8873B 1px, transparent 1px), linear-gradient(to bottom, #B8873B 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top ambient gold glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[25vh] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(184,135,59,0.07) 0%, transparent 70%)" }}
      />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,135,59,0.35) 50%, transparent)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">

        {/* Header */}
        <div ref={headRef} className={`mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6`}>
          <div className={isAr ? "text-right" : ""}>
            <div className={`flex items-center gap-3 mb-5 ${isAr ? "justify-end" : ""}`}>
              <div className="h-px w-10 bg-[#B8873B]/40" />
              <span className="font-mono text-[9px] tracking-[0.36em] uppercase text-[#B8873B]">
                {isAr ? "الفرص المميزة" : "Featured Opportunities"}
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#E8DFCE] font-normal tracking-[-0.02em] leading-[1.05]">
              {isAr ? (
                <>نظرة على <em className="italic text-[#B8873B] not-italic" style={{ fontStyle: "italic" }}>ما هو متاح</em></>
              ) : (
                <>A Glimpse of <em className="italic text-[#B8873B]">What&apos;s Available</em></>
              )}
            </h2>
            <p className="font-sans text-sm text-[#8C8477] mt-3 max-w-lg leading-relaxed">
              {isAr
                ? "كل فرصة هنا مُدقَّقة، موثَّقة، ومُختارة خصيصاً. لا فوضى في القوائم — فقط أفضل ما في السوق."
                : "Every opportunity here is vetted, verified, and hand-selected. No listing dumps — only the best the market offers."}
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="#section-lead-form"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase px-6 py-3 transition-all duration-300 group whitespace-nowrap"
              style={{ backgroundColor: "#B8873B", color: "#12130F" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(184,135,59,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              <span>{isAr ? "احصل على خطة الاستثمار" : "Get Investment Plan"}</span>
              <svg className="group-hover:translate-x-0.5 transition-transform" width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* FEATURED HERO PROJECT */}
        <div
          ref={featuredRef}
          className="relative w-full overflow-hidden mb-4 group cursor-pointer"
          style={{
            height: "min(65vh, 500px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Image
            src={featured.image}
            alt={featured.nameEn}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            priority
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: isAr
              ? "linear-gradient(to left, rgba(8,11,15,0.92) 0%, rgba(8,11,15,0.55) 45%, rgba(8,11,15,0.15) 100%)"
              : "linear-gradient(to right, rgba(8,11,15,0.92) 0%, rgba(8,11,15,0.55) 45%, rgba(8,11,15,0.15) 100%)"
            }}
          />
          {/* Gold top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(to right, #B8873B 0%, transparent 50%)" }} />

          {/* Content */}
          <div className={`absolute inset-0 flex flex-col justify-between p-8 lg:p-14 ${isAr ? "items-end text-right" : ""}`}>
            <div className="flex flex-wrap gap-2">
              <span
                className="font-mono text-[8px] tracking-[0.28em] uppercase px-3 py-1 font-bold"
                style={{ color: "#12130F", backgroundColor: featured.accent }}
              >
                {isAr ? "مختار للمقر" : "Editor's Pick"}
              </span>
              <span
                className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-1"
                style={{ color: "#E8DFCE", border: "1px solid rgba(232,223,206,0.2)", backdropFilter: "blur(6px)", backgroundColor: "rgba(8,11,15,0.6)" }}
              >
                {isAr ? featured.statusAr : featured.status}
              </span>
            </div>

            <div className="max-w-lg">
              <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#8C8477] mb-2 flex items-center gap-1.5">
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.72 3.5 6.5 3.5 6.5s3.5-3.78 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="#8C8477" strokeWidth="1.2"/></svg>
                {isAr ? featured.locationAr : featured.locationEn}
              </p>
              <h3 className="font-display text-3xl lg:text-5xl text-white font-normal leading-tight mb-3">
                {isAr ? featured.nameAr : featured.nameEn}
              </h3>
              <p className="font-sans text-sm text-[#C5BAB0] leading-[1.7] mb-6 max-w-sm">
                {isAr ? featured.tagAr! : featured.tagEn!}
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <div>
                  <p className="font-mono text-[8px] tracking-widest uppercase text-[#8C8477] mb-0.5">{isAr ? "يبدأ من" : "Starting"}</p>
                  <p className="font-display text-2xl font-semibold" style={{ color: featured.accent }}>
                    {isAr ? featured.priceAr : featured.priceEn}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1" style={{ backgroundColor: `${featured.accent}15`, border: `1px solid ${featured.accent}30` }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1.5 9L4.5 6L7 8.5L10.5 3" stroke={featured.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-mono text-[9px] font-bold" style={{ color: featured.accent }}>{featured.returns}</span>
                  <span className="font-mono text-[9px] text-[#8C8477]">{isAr ? "عائد" : "returns"}</span>
                </div>

                <a
                  href="#section-lead-form"
                  className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 border border-white/25 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  {isAr ? "استفسر الآن" : "Inquire Now"}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 5-card Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {rest.map((proj, i) => (
            <div key={proj.id} className="project-grid-card" style={{ opacity: 0 }}>
              <ProjectCard project={proj} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-5 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <a
              href="/projects"
              className="font-mono text-[10px] tracking-[0.22em] uppercase px-6 py-3 border border-[#B8873B]/40 text-[#B8873B] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 font-semibold"
            >
              {isAr ? "عرض جميع المشاريع" : "View All Projects →"}
            </a>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.18em] uppercase px-6 py-3 flex items-center gap-2 transition-all duration-300 font-semibold"
              style={{ backgroundColor: "rgba(37,211,102,0.12)", color: "#25D366", border: "1px solid rgba(37,211,102,0.25)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {isAr ? "واتساب" : "WhatsApp"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
