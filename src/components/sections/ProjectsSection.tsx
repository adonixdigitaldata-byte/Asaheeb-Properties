"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { getPublishedProjectDetails } from "@/lib/api";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { ProjectDetail } from "@/types/database";
import { getWhatsAppLink } from "@/data/contactConfig";

function ProjectCard({ project, index }: { project: ProjectDetail; index: number }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const name = isAr ? project.nameAr : project.nameEn;
  const location = isAr ? `${project.cityAr} ، ${project.districtAr}` : `${project.cityEn}, ${project.districtEn}`;
  const price = isAr ? project.startingPriceAr : project.startingPriceEn;
  const status = isAr ? project.statusAr : project.statusEn;
  const type = isAr ? project.typeAr : project.typeEn;
  const rawImageUrl = project.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop";
  const imageUrl = getOptimizedImageUrl(rawImageUrl, 800);

  const paymentTerms = isAr
    ? (project.paymentTermsAr || (project as any).payment_terms_ar)
    : (project.paymentTermsEn || (project as any).payment_terms_en);

  return (
    <Link href={`/projects/${project.id}`} className="block text-left" dir={isAr ? "rtl" : "ltr"}>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative overflow-hidden cursor-pointer rounded-sm"
        style={{
          border: `1px solid ${hovered ? "#B8873B" + "50" : "rgba(255,255,255,0.07)"}`,
          transition: "border-color 0.4s ease",
          boxShadow: hovered ? `0 24px 64px rgba(0,0,0,0.6), 0 0 40px #B8873B18` : "0 8px 32px rgba(0,0,0,0.35)",
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "220px" }}>
          <Image
            src={imageUrl}
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
              background: `linear-gradient(to right, #B8873B, transparent)`,
              opacity: hovered ? 1 : 0.4,
            }}
          />

          {/* Top Badges Container */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none z-10">
            {/* Type badge */}
            <div
              className="px-2.5 py-1 font-mono text-[8px] tracking-[0.18em] uppercase font-bold truncate max-w-[62%]"
              style={{ color: "#12130F", backgroundColor: "#B8873B" }}
              title={type}
            >
              {type}
            </div>

            {/* Status */}
            <div
              className="px-2.5 py-1 font-mono text-[8px] tracking-[0.18em] uppercase shrink-0"
              style={{
                color: "#E8DFCE",
                border: "1px solid rgba(232,223,206,0.25)",
                backgroundColor: "rgba(8,11,15,0.75)",
                backdropFilter: "blur(6px)",
              }}
            >
              {status}
            </div>
          </div>

          {/* Bottom Overlay Badges: Payment Terms */}
          {paymentTerms && (
            <div className={`absolute bottom-2.5 ${isAr ? "right-2.5" : "left-2.5"} z-10 pointer-events-none`}>
              <span className="inline-flex items-center gap-1 font-mono text-[8.5px] tracking-wider uppercase px-2.5 py-1 bg-black/75 backdrop-blur-md border border-[#B8873B]/40 text-[#E8DFCE] rounded-xs font-medium">
                💳 {paymentTerms}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div
          className={`p-5 ${isAr ? "text-right" : ""}`}
          style={{ backgroundColor: "rgba(11,14,18,0.95)" }}
        >
          <p className={`font-mono text-[8px] tracking-[0.22em] uppercase text-[#C5BCAD] mb-1.5 flex items-center gap-1.5 ${isAr ? "flex-row-reverse" : ""}`}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
              <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.72 3.5 6.5 3.5 6.5s3.5-3.78 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="#B8873B" strokeWidth="1.2"/>
            </svg>
            {location}
          </p>

          <h3
            className="font-display text-lg text-[#E8DFCE] font-normal leading-snug mb-4"
            style={{ color: hovered ? "#FFFFFF" : "#E8DFCE", transition: "color 0.3s" }}
          >
            {name}
          </h3>

          {/* Price + CTA */}
          <div className={`flex items-center justify-between pt-3 border-t border-white/10 ${isAr ? "flex-row-reverse" : ""}`}>
            <div className={isAr ? "text-right" : ""}>
              <p className="font-mono text-[8px] uppercase tracking-widest text-[#C5BCAD] mb-0.5">{isAr ? "يبدأ من" : "Starting"}</p>
              <p className="font-display text-base font-semibold text-[#B8873B]">{price}</p>
            </div>
            <button
              className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] uppercase px-3.5 py-2 border transition-all duration-300 font-semibold"
              style={{
                borderColor: hovered ? "#B8873B" : "rgba(255,255,255,0.22)",
                color: hovered ? "#B8873B" : "#D4C7B5",
                backgroundColor: hovered ? "#B8873B10" : "rgba(255,255,255,0.03)",
              }}
            >
              {isAr ? "التفاصيل" : "View Details"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const headRef = useRef<HTMLDivElement>(null);
  const featRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [projectsList, setProjectsList] = useState<ProjectDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedProjectDetails()
      .then((data) => {
        setProjectsList(data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const featured = projectsList[0];
  const rest = projectsList.slice(1, 4);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headRef.current) {
        gsap.fromTo(
          headRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (featRef.current) {
        gsap.fromTo(
          featRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-grid-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="section-projects" className="relative py-28 bg-[#12130F] border-t border-[rgba(255,255,255,0.06)] overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(184,135,59,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Header */}
        <div ref={headRef} className={`mb-14 ${isAr ? "text-right" : ""}`}>
          <div className={`flex items-center gap-3 mb-4 ${isAr ? "justify-end" : ""}`}>
            <div className="h-px w-10 bg-[#B8873B]/50" />
            <span className="font-mono text-[9px] tracking-[0.36em] uppercase text-[#B8873B]">
              {isAr ? "المحفظة المنسقة" : "Curated Portfolio"}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#E8DFCE] font-normal tracking-[-0.025em] leading-[1.08]">
              {isAr ? (
                <>فرص استثمارية <span className="italic text-[#B8873B]">استثنائية.</span></>
              ) : (
                <>Vetted Assets. <span className="italic text-[#B8873B]">Unmatched Value.</span></>
              )}
            </h2>
            <p className="font-sans text-sm text-[#C5BCAD] max-w-md leading-relaxed">
              {isAr
                ? "مجموعة حصريّة من الفرص العقارية المنتقاة في جدة والرياض والمناطق الواعدة."
                : "A curated collection of prime real estate opportunities across Jeddah, Riyadh, and Saudi Vision 2030 corridors."}
            </p>
          </div>
        </div>

        {/* ── FEATURED #1 PROJECT CARD ────────────────────────── */}
        {featured && (
          <div ref={featRef} className="mb-8">
            <Link href={`/projects/${featured.id}`} className="block group">
              <div
                className="relative overflow-hidden border border-[#B8873B]/30 hover:border-[#B8873B]/70 transition-all duration-500 rounded-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(184,135,59,0.08) 0%, rgba(18,19,15,0.95) 70%)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* Image */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] overflow-hidden">
                    <Image
                      src={getOptimizedImageUrl(featured.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop", 1200)}
                      alt={isAr ? featured.nameAr : featured.nameEn}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#12130F] via-transparent to-transparent opacity-90 lg:opacity-60" />

                    {/* Badge */}
                    <div className="absolute top-5 left-5 px-3.5 py-1 font-mono text-[9px] tracking-[0.25em] uppercase font-bold text-[#12130F] bg-[#B8873B]">
                      {isAr ? "المشروع المميز" : "FLAGSHIP PROJECT"}
                    </div>
                  </div>

                  {/* Info */}
                  <div className={`lg:col-span-5 p-8 lg:p-10 ${isAr ? "text-right" : ""}`}>
                    <div className={`flex items-center gap-2.5 mb-3 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#B8873B]">
                        {isAr ? `${featured.cityAr} ، ${featured.districtAr}` : `${featured.cityEn}, ${featured.districtEn}`}
                      </span>
                      <span className="text-[#C5BCAD]">•</span>
                      <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#7FA8B3]">
                        {isAr ? featured.statusAr : featured.statusEn}
                      </span>
                      {(featured.paymentTermsEn || (featured as any).payment_terms_en) && (
                        <>
                          <span className="text-[#C5BCAD]">•</span>
                          <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#E8DFCE] px-2.5 py-0.5 border border-[#B8873B]/40 bg-[#B8873B]/10">
                            💳 {isAr ? (featured.paymentTermsAr || (featured as any).payment_terms_ar) : (featured.paymentTermsEn || (featured as any).payment_terms_en)}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl text-[#E8DFCE] font-normal mb-4 group-hover:text-[#B8873B] transition-colors duration-300">
                      {isAr ? featured.nameAr : featured.nameEn}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] leading-relaxed mb-6 line-clamp-3">
                      {isAr ? featured.overviewAr : featured.overviewEn}
                    </p>

                    <div className={`pt-4 border-t border-white/10 flex items-center justify-between gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-widest text-[#C5BCAD] mb-0.5">{isAr ? "نطاق الأسعار" : "Price Range"}</p>
                        <p className="font-display text-xl sm:text-2xl font-bold text-[#B8873B]">
                          {isAr ? featured.priceRangeAr : featured.priceRangeEn}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase px-5 py-3 border border-[#B8873B] text-[#B8873B] group-hover:bg-[#B8873B] group-hover:text-[#12130F] transition-all duration-300 font-semibold">
                        {isAr ? "عرض تفاصيل المشروع" : "Explore Project →"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ── REST OF THE PROJECTS GRID ───────────────────────────────────── */}
        {rest.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {rest.map((proj, i) => (
              <div key={proj.id} className="project-grid-card">
                <ProjectCard project={proj} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-5 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/projects"
              className="font-mono text-[10px] tracking-[0.22em] uppercase px-6 py-3 border border-[#B8873B]/40 text-[#B8873B] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 font-semibold"
            >
              {isAr ? "عرض جميع المشاريع" : "View All Projects →"}
            </Link>
            <a
              href={getWhatsAppLink(undefined, undefined, isAr)}
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
