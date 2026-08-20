"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
import { ProjectDetail } from "@/types/database";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { getWhatsAppLink } from "@/data/contactConfig";

const CATEGORIES = [
  { key: "all",  en: "All Cities",      ar: "جميع المدن" },
  { key: "Jeddah", en: "Jeddah",         ar: "جدة" },
  { key: "Riyadh", en: "Riyadh",         ar: "الرياض" },
  { key: "Madinah", en: "Madinah",       ar: "المدينة المنورة" },
];

const STATUS_OPTIONS = [
  { key: "all", en: "All Statuses", ar: "جميع الحالات" },
  { key: "off-plan", en: "Off-Plan", ar: "على المخطط" },
  { key: "under-construction", en: "Under Construction", ar: "تحت الإنشاء" },
  { key: "ready", en: "Ready to Move", ar: "جاهز للسكن" },
];

const PAYMENT_OPTIONS = [
  { key: "all", en: "All Payment Terms", ar: "جميع خطط السداد" },
  { key: "cash", en: "Cash Only", ar: "كاش فقط" },
  { key: "installments", en: "Installments", ar: "أقساط متاحة" },
  { key: "cash-installments", en: "Cash + Installments", ar: "كاش + أقساط" },
];

const CONTENT = {
  en: {
    badge: "Curated Investment Portfolio",
    heroTitle: "Curated Properties.\nExceptional Value.",
    heroSub: "Explore the exact investment opportunities sourced and vetted by Asaheeb Real Estate — aligned with Saudi Arabia's Vision 2030.",
    searchPlaceholder: "Search by project name, district, city, developer...",
    filterCityLabel: "Location",
    filterStatusLabel: "Development Status",
    filterPaymentLabel: "Payment Terms",
    clearAll: "Reset Filters",
    noResults: "No properties match your current search criteria.",
    inquireBtn: "Enquire Now",
    ctaTitle: "Need a Custom Portfolio?",
    ctaSub: "We have off-market institutional assets not publicly listed. Connect with an Asaheeb advisor.",
    ctaBtn: "Talk to an Advisor",
  },
  ar: {
    badge: "محفظة استثمارية منتقاة",
    heroTitle: "عقارات منتقاة.\nقيم استثنائية.",
    heroSub: "تصفح الفرص الاستثمارية التي تم فحصها واعتمادها من قبل أصاهيب العقارية — المتوافقة مع رؤية السعودية 2030.",
    searchPlaceholder: "ابحث بالاسم، الحي، المدينة، المطور...",
    filterCityLabel: "المدينة والموقع",
    filterStatusLabel: "حالة المشروع",
    filterPaymentLabel: "خطة السداد",
    clearAll: "إعادة ضبط الفلاتر",
    noResults: "لا توجد مشاريع مطابقة لخيارات البحث المحددة.",
    inquireBtn: "استفسر الآن",
    ctaTitle: "هل تحتاج محفظة مخصصة؟",
    ctaSub: "لدينا أصول مؤسسية خارج السوق غير مدرجة علناً. تواصل مع مستشار أصاهيب.",
    ctaBtn: "تحدث مع مستشار",
  },
};

// ─── Project Card Component ───────────────────────────────────────────────────
function ProjectCard({ project, isAr, priority = false }: { project: ProjectDetail; isAr: boolean; priority?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const rawImageUrl = project.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop";
  const imageUrl = getOptimizedImageUrl(rawImageUrl, 800);

  const paymentTerms = isAr
    ? (project.paymentTermsAr || (project as any).payment_terms_ar)
    : (project.paymentTermsEn || (project as any).payment_terms_en);

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
            src={imageUrl}
            alt={isAr ? project.nameAr : project.nameEn}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
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

          {/* Payment Terms Badge (Bottom overlay) */}
          {paymentTerms && (
            <div className={`absolute bottom-3 ${isAr ? "right-3" : "left-3"} z-10 pointer-events-none`}>
              <span className="inline-flex items-center gap-1 font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 bg-black/80 backdrop-blur-md border border-[#B8873B]/40 text-[#E8DFCE] rounded-xs font-medium">
                💳 {paymentTerms}
              </span>
            </div>
          )}
        </div>

        <div className={`p-6 flex-1 flex flex-col justify-between ${isAr ? "text-right" : ""}`}>
          <div>
            <div className="font-mono text-[9.5px] tracking-[0.25em] uppercase mb-1.5 font-medium text-[#B8873B]">
              {isAr ? project.districtAr : project.districtEn}
            </div>
            <h3 className="font-display text-2xl text-[#E8DFCE] mb-2 tracking-tight group-hover:text-[#B8873B] transition-colors">
              {isAr ? project.nameAr : project.nameEn}
            </h3>
            <p className="font-sans text-xs text-[#C5BCAD] leading-relaxed mb-4 line-clamp-2">
              {isAr ? project.overviewAr : project.overviewEn}
            </p>
          </div>

          <div className={`pt-4 border-t border-white/10 flex items-end justify-between ${isAr ? "flex-row-reverse" : ""}`}>
            <div>
              <div className="font-mono text-[8px] uppercase tracking-widest text-[#C5BCAD] mb-0.5">{isAr ? "نطاق الأسعار" : "Price Range"}</div>
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

const ITEMS_PER_PAGE = 9;

// ─── Main Interactive Projects Client Component ─────────────────────────────
export default function ProjectsClient({ initialProjects = [] }: { initialProjects: ProjectDetail[] }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;
  const [projectsList] = useState<ProjectDetail[]>(initialProjects);
  
  // Filter States (Committed on Page)
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activePayment, setActivePayment] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Draft States inside Modal (Staged until user clicks Apply)
  const [draftCategory, setDraftCategory] = useState("all");
  const [draftStatus, setDraftStatus] = useState("all");
  const [draftPayment, setDraftPayment] = useState("all");

  const heroRef = useRef<HTMLDivElement>(null);
  const filterSectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const activeFiltersCount = (activeCategory !== "all" ? 1 : 0) + (activeStatus !== "all" ? 1 : 0) + (activePayment !== "all" ? 1 : 0);
  const isFiltered = searchQuery.trim() !== "" || activeFiltersCount > 0;

  // Open modal and initialize drafts from current active filters
  const openFilterModal = () => {
    setDraftCategory(activeCategory);
    setDraftStatus(activeStatus);
    setDraftPayment(activePayment);
    setShowFilterModal(true);
  };

  // Commit drafts to active page filters and close modal
  const applyDraftFilters = () => {
    setActiveCategory(draftCategory);
    setActiveStatus(draftStatus);
    setActivePayment(draftPayment);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  // Reset all active and draft filters
  const resetAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveStatus("all");
    setActivePayment("all");
    setDraftCategory("all");
    setDraftStatus("all");
    setDraftPayment("all");
    setCurrentPage(1);
  };

  // Helper filter logic reusable for both page and draft count
  const calculateFiltered = (cat: string, status: string, payment: string, query: string) => {
    return projectsList.filter((p) => {
      // 1. Search Query
      if (query.trim() !== "") {
        const q = query.toLowerCase().trim();
        const matchSearch =
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.toLowerCase().includes(q) ||
          p.districtEn.toLowerCase().includes(q) ||
          p.districtAr.toLowerCase().includes(q) ||
          p.cityEn.toLowerCase().includes(q) ||
          p.cityAr.toLowerCase().includes(q) ||
          (p.developerEn && p.developerEn.toLowerCase().includes(q)) ||
          (p.developerAr && p.developerAr.toLowerCase().includes(q)) ||
          p.overviewEn.toLowerCase().includes(q) ||
          p.overviewAr.toLowerCase().includes(q);

        if (!matchSearch) return false;
      }

      // 2. City
      if (cat !== "all") {
        const cityLower = p.cityEn.toLowerCase();
        if (cityLower !== cat.toLowerCase()) return false;
      }

      // 3. Status
      if (status !== "all") {
        const sEn = (p.statusEn || "").toLowerCase();
        const sAr = (p.statusAr || "").toLowerCase();

        if (status === "off-plan") {
          const isOffPlan = sEn.includes("off-plan") || sEn.includes("off_plan") || sEn.includes("off plan") || sAr.includes("المخطط");
          if (!isOffPlan) return false;
        } else if (status === "under-construction") {
          const isUnderConstruction = sEn.includes("construction") || sEn.includes("under") || sAr.includes("الإنشاء");
          if (!isUnderConstruction) return false;
        } else if (status === "ready") {
          const isReady = sEn.includes("ready") || sEn.includes("completed") || sAr.includes("جاهز");
          if (!isReady) return false;
        }
      }

      // 4. Payment terms
      if (payment !== "all") {
        const rawPaymentEn = (p.paymentTermsEn || (p as any).payment_terms_en || "").toLowerCase();
        const rawPaymentAr = (p.paymentTermsAr || (p as any).payment_terms_ar || "").toLowerCase();

        if (payment === "cash") {
          const isCashOnly = (rawPaymentEn.includes("cash only") || rawPaymentAr.includes("كاش فقط")) && !rawPaymentEn.includes("installment");
          if (!isCashOnly) return false;
        } else if (payment === "installments") {
          const isInstallments = rawPaymentEn.includes("installment available") || rawPaymentEn === "installment" || rawPaymentAr.includes("أقساط متاحة");
          if (!isInstallments) return false;
        } else if (payment === "cash-installments") {
          const isCashInstallments = rawPaymentEn.includes("cash + installment") || rawPaymentEn.includes("cash and installment") || rawPaymentAr.includes("كاش + أقساط");
          if (!isCashInstallments) return false;
        }
      }

      return true;
    });
  };

  const filtered = calculateFiltered(activeCategory, activeStatus, activePayment, searchQuery);
  const draftFilteredCount = calculateFiltered(draftCategory, draftStatus, draftPayment, searchQuery).length;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, endIndex);

  // Quick remove from chips bar on main page
  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setDraftCategory(key);
    setCurrentPage(1);
  };

  const handleStatusChange = (key: string) => {
    setActiveStatus(key);
    setDraftStatus(key);
    setCurrentPage(1);
  };

  const handlePaymentChange = (key: string) => {
    setActivePayment(key);
    setDraftPayment(key);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    
    if (filterSectionRef.current) {
      const topOffset = filterSectionRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (heroRef.current) {
      const heroEls = heroRef.current.querySelectorAll(".hero-el");
      if (heroEls.length > 0) {
        gsap.fromTo(
          heroEls,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }
        );
      }
    }
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".project-card-wrap");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
        );
      }
    }
  }, [searchQuery, activeCategory, activeStatus, activePayment, currentPage]);

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[42vh] flex items-center overflow-hidden pt-28 sm:pt-36 pb-10 px-6 sm:px-10 lg:px-20">
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

          <p className="hero-el font-sans text-base sm:text-lg text-[#C5BCAD] leading-relaxed max-w-xl">{c.heroSub}</p>
        </div>
      </section>

      {/* ── SEARCH BAR & FILTER ICON BUTTON ───────────────────────────────── */}
      <section ref={filterSectionRef} className="px-4 sm:px-10 lg:px-20 py-8 border-y border-white/10 bg-[#0F1117]/60">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Main Search Bar + Filter Trigger Row */}
          <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
            
            {/* Search Input */}
            <div className="relative flex-1">
              <div className={`absolute top-1/2 -translate-y-1/2 ${isAr ? "right-4" : "left-4"} text-[#B8873B] pointer-events-none`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={c.searchPlaceholder}
                className={`w-full bg-[#141611] border border-white/15 focus:border-[#B8873B] focus:shadow-[0_0_20px_rgba(184,135,59,0.2)] transition-all duration-300 py-3.5 text-xs sm:text-sm font-sans text-[#E8DFCE] placeholder-[#8C8477] focus:outline-none rounded-xs ${
                  isAr ? "pr-11 pl-9 text-right" : "pl-11 pr-9 text-left"
                }`}
              />

              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className={`absolute top-1/2 -translate-y-1/2 ${isAr ? "left-3.5" : "right-3.5"} text-[#8C8477] hover:text-[#E8DFCE] font-mono text-xs cursor-pointer`}
                  title="Clear"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Modal Trigger Button */}
            <button
              onClick={openFilterModal}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-3.5 border transition-all duration-300 rounded-xs cursor-pointer font-mono text-[11px] sm:text-xs tracking-wider uppercase font-semibold shrink-0 ${
                activeFiltersCount > 0
                  ? "border-[#B8873B] bg-[#B8873B] text-[#12130F] shadow-[0_0_20px_rgba(184,135,59,0.3)]"
                  : "border-white/15 bg-[#141611] text-[#E8DFCE] hover:border-[#B8873B] hover:text-[#B8873B]"
              }`}
            >
              {/* Clean Sliders SVG Icon (No Emojis) */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span>{isAr ? "تصفية" : "Filters"}</span>
              {activeFiltersCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeFiltersCount > 0 ? "bg-[#12130F] text-[#B8873B]" : "bg-[#B8873B] text-[#12130F]"
                }`}>
                  {activeFiltersCount}
                </span>
              )}
            </button>

          </div>

          {/* Active Filter Chips & Results Count Bar */}
          <div className={`flex items-center justify-between gap-3 flex-wrap pt-1 ${isAr ? "flex-row-reverse" : ""}`}>
            <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#8C8477]">
              {isAr
                ? `عرض ${filtered.length > 0 ? Math.min(startIndex + 1, filtered.length) : 0}–${Math.min(endIndex, filtered.length)} من أصل ${filtered.length} مشروع`
                : `Showing ${filtered.length > 0 ? Math.min(startIndex + 1, filtered.length) : 0}–${Math.min(endIndex, filtered.length)} of ${filtered.length} projects`}
            </div>

            {/* Active Chips */}
            {isFiltered && (
              <div className={`flex items-center gap-2 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
                {activeCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-[#171914] border border-[#B8873B]/40 text-[#E8DFCE] rounded-xs">
                    <span>{CATEGORIES.find((c) => c.key === activeCategory)?.[isAr ? "ar" : "en"]}</span>
                    <button onClick={() => handleCategoryChange("all")} className="text-[#8C8477] hover:text-[#B8873B] cursor-pointer">✕</button>
                  </span>
                )}
                {activeStatus !== "all" && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-[#171914] border border-[#B8873B]/40 text-[#E8DFCE] rounded-xs">
                    <span>{STATUS_OPTIONS.find((s) => s.key === activeStatus)?.[isAr ? "ar" : "en"]}</span>
                    <button onClick={() => handleStatusChange("all")} className="text-[#8C8477] hover:text-[#B8873B] cursor-pointer">✕</button>
                  </span>
                )}
                {activePayment !== "all" && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-[#171914] border border-[#B8873B]/40 text-[#E8DFCE] rounded-xs">
                    <span>{PAYMENT_OPTIONS.find((p) => p.key === activePayment)?.[isAr ? "ar" : "en"]}</span>
                    <button onClick={() => handlePaymentChange("all")} className="text-[#8C8477] hover:text-[#B8873B] cursor-pointer">✕</button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="font-mono text-[9.5px] uppercase tracking-wider text-[#B8873B] hover:underline cursor-pointer px-1 py-0.5 ml-1"
                >
                  {c.clearAll}
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── LUXURY FILTER MODAL (Draft & Commit Architecture) ───────────────── */}
      {showFilterModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-xl bg-[#12130F] border border-[#B8873B]/40 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            dir={isAr ? "rtl" : "ltr"}
          >
            {/* Modal Header */}
            <div className={`p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#171813] ${isAr ? "flex-row-reverse" : ""}`}>
              <div>
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8873B] block mb-1">
                  {isAr ? "تصفية محفظة المشاريع" : "Filter Properties"}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-[#E8DFCE]">
                  {isAr ? "خيارات البحث والتصفية" : "Refine Your Search"}
                </h3>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-8 h-8 rounded-full border border-white/15 text-[#8C8477] hover:text-[#E8DFCE] hover:border-white/30 flex items-center justify-center font-mono text-sm cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Filter Categories (Toggles Draft State) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-white/10">
              
              {/* Category 1: Location */}
              <div className={`space-y-3 ${isAr ? "text-right" : ""}`}>
                <label className="block font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#C5BCAD] font-semibold">
                  {c.filterCityLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = draftCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setDraftCategory(cat.key)}
                        className={`p-3 border text-center font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-xs ${
                          isSelected
                            ? "border-[#B8873B] bg-[#B8873B] text-[#12130F] font-bold shadow-[0_0_15px_rgba(184,135,59,0.25)]"
                            : "border-white/10 bg-[#171914] text-[#8C8477] hover:border-white/25 hover:text-[#C5BCAD]"
                        }`}
                      >
                        {isAr ? cat.ar : cat.en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: Status */}
              <div className={`pt-6 space-y-3 ${isAr ? "text-right" : ""}`}>
                <label className="block font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#C5BCAD] font-semibold">
                  {c.filterStatusLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((st) => {
                    const isSelected = draftStatus === st.key;
                    return (
                      <button
                        key={st.key}
                        onClick={() => setDraftStatus(st.key)}
                        className={`p-3 border text-center font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-xs ${
                          isSelected
                            ? "border-[#B8873B] bg-[#B8873B] text-[#12130F] font-bold shadow-[0_0_15px_rgba(184,135,59,0.25)]"
                            : "border-white/10 bg-[#171914] text-[#8C8477] hover:border-white/25 hover:text-[#C5BCAD]"
                        }`}
                      >
                        {isAr ? st.ar : st.en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 3: Payment Terms */}
              <div className={`pt-6 space-y-3 ${isAr ? "text-right" : ""}`}>
                <label className="block font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#C5BCAD] font-semibold">
                  {c.filterPaymentLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_OPTIONS.map((opt) => {
                    const isSelected = draftPayment === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => setDraftPayment(opt.key)}
                        className={`p-3 border text-center font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-xs ${
                          isSelected
                            ? "border-[#B8873B] bg-[#B8873B] text-[#12130F] font-bold shadow-[0_0_15px_rgba(184,135,59,0.25)]"
                            : "border-white/10 bg-[#171914] text-[#8C8477] hover:border-white/25 hover:text-[#C5BCAD]"
                        }`}
                      >
                        {isAr ? opt.ar : opt.en}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Modal Footer: Live Draft Count & Apply Commit */}
            <div className={`p-4 sm:p-5 border-t border-white/10 bg-[#171813] flex items-center justify-between gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
              <button
                onClick={() => {
                  setDraftCategory("all");
                  setDraftStatus("all");
                  setDraftPayment("all");
                }}
                className="px-4 py-2.5 border border-white/15 text-[#8C8477] hover:text-[#E8DFCE] hover:border-white/30 font-mono text-[10.5px] tracking-wider uppercase rounded-xs cursor-pointer transition-colors"
              >
                {c.clearAll}
              </button>

              <button
                onClick={applyDraftFilters}
                className="px-6 py-2.5 bg-[#B8873B] text-[#12130F] font-bold font-mono text-[10.5px] tracking-[0.18em] uppercase rounded-xs hover:bg-[#c99a49] cursor-pointer transition-all shadow-[0_0_15px_rgba(184,135,59,0.3)]"
              >
                {draftFilteredCount > 0
                  ? (isAr ? `عرض (${draftFilteredCount} عقار)` : `Show ${draftFilteredCount} Properties`)
                  : (isAr ? "لا توجد نتائج مطابقة" : "No Matching Properties")}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── PROJECTS GRID ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 lg:px-20">
        <div ref={cardsRef} className="max-w-7xl mx-auto">
          {paginatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProjects.map((proj, idx) => (
                <div key={proj.id} className="project-card-wrap">
                  <ProjectCard project={proj} isAr={isAr} priority={idx < 3} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-[#8C8477]">
              <p className="font-mono text-sm uppercase tracking-widest">
                {isAr ? "لا توجد مشاريع في هذه المدينة حالياً" : "No properties found in this location"}
              </p>
            </div>
          )}

          {/* ── PAGINATION CONTROLS ────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8477]">
                {isAr
                  ? `الصفحة ${currentPage} من ${totalPages}`
                  : `Page ${currentPage} of ${totalPages}`}
              </div>

              <div className="flex items-center gap-2">
                {/* Prev Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] uppercase border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-semibold rounded-sm"
                  style={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: currentPage === 1 ? "#8C8477" : "#E8DFCE",
                    backgroundColor: "rgba(18,19,15,0.6)",
                  }}
                >
                  {isAr ? "← السابق" : "← Prev"}
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className="w-10 h-10 font-mono text-xs font-semibold rounded-sm transition-all duration-300 cursor-pointer border"
                    style={{
                      borderColor: currentPage === page ? "#B8873B" : "rgba(255,255,255,0.1)",
                      backgroundColor: currentPage === page ? "#B8873B" : "rgba(255,255,255,0.03)",
                      color: currentPage === page ? "#12130F" : "#C5BCAD",
                    }}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] uppercase border transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-semibold rounded-sm"
                  style={{
                    borderColor: "rgba(255,255,255,0.15)",
                    color: currentPage === totalPages ? "#8C8477" : "#E8DFCE",
                    backgroundColor: "rgba(18,19,15,0.6)",
                  }}
                >
                  {isAr ? "التالي ←" : "Next →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM ADVISOR CTA ────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 lg:px-20 border-t border-white/10 bg-[#0F1117]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-5xl text-[#E8DFCE] font-normal mb-4">
            {c.ctaTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#C5BCAD] mb-8 max-w-xl mx-auto">
            {c.ctaSub}
          </p>
          <a
            href={getWhatsAppLink(undefined, undefined, isAr)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase font-semibold px-8 py-4 bg-[#B8873B] text-[#12130F] hover:bg-[#c99a49] transition-all duration-300 shadow-[0_0_30px_rgba(184,135,59,0.3)]"
          >
            <span>{c.ctaBtn}</span>
            <span>→</span>
          </a>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
