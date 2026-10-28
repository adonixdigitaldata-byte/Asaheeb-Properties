"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
import { ProjectDetail } from "@/types/database";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { getWhatsAppLink } from "@/data/contactConfig";
import { STANDARD_PROPERTY_TYPES, normalizePropertyType, matchesPropertyType } from "@/data/propertyTypes";
import { ProjectCardPriceAndOffer } from "@/components/shared/ProjectCardPriceAndOffer";
import { getDiscountStatus } from "@/lib/offerUtils";

// Architectural SVG Icon for property categories
function PropertyCategoryIcon({ type, className = "w-3.5 h-3.5" }: { type?: string; className?: string }) {
  switch (type) {
    case "apartments":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h6" />
        </svg>
      );
    case "villas":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
          <path d="M10 21v-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6" />
        </svg>
      );
    case "commercial":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
          <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" />
        </svg>
      );
    case "residential":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="6" width="9" height="15" rx="1" />
          <rect x="13" y="2" width="9" height="19" rx="1" />
          <path d="M5 10h3M5 14h3M16 6h3M16 10h3M16 14h3" />
        </svg>
      );
    case "land":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    case "all":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
  }
}

// Known Saudi city translations dictionary for clean bilingual fallbacks
const KNOWN_CITIES: Record<string, { en: string; ar: string }> = {
  riyadh: { en: "Riyadh", ar: "الرياض" },
  jeddah: { en: "Jeddah", ar: "جدة" },
  madinah: { en: "Madinah", ar: "المدينة المنورة" },
  "madinah al-munawwarah": { en: "Madinah", ar: "المدينة المنورة" },
  makkah: { en: "Makkah", ar: "مكة المكرمة" },
  dammam: { en: "Dammam", ar: "الدمام" },
  khobar: { en: "Al Khobar", ar: "الخبر" },
  "al khobar": { en: "Al Khobar", ar: "الخبر" },
  "al-khobar": { en: "Al Khobar", ar: "الخبر" },
  dhahran: { en: "Dhahran", ar: "الظهران" },
  tabuk: { en: "Tabuk", ar: "تبوك" },
  taif: { en: "Taif", ar: "الطائف" },
  abha: { en: "Abha", ar: "أبها" },
  "khamis mushait": { en: "Khamis Mushait", ar: "خميس مشيط" },
  jubail: { en: "Jubail", ar: "الجبيل" },
  "al ahsa": { en: "Al Ahsa", ar: "الأحساء" },
  "al-ahsa": { en: "Al Ahsa", ar: "الأحساء" },
  yanbu: { en: "Yanbu", ar: "ينبع" },
  jazan: { en: "Jazan", ar: "جازان" },
  najran: { en: "Najran", ar: "نجران" },
  hail: { en: "Hail", ar: "حائل" },
  alula: { en: "AlUla", ar: "العلا" },
  buraidah: { en: "Buraidah", ar: "بريدة" },
  qassim: { en: "Al Qassim", ar: "القصيم" },
  neom: { en: "NEOM", ar: "نيوم" },
};

const DEFAULT_CATEGORIES = [
  { key: "all", en: "All Cities", ar: "جميع المدن" },
  { key: "Jeddah", en: "Jeddah", ar: "جدة" },
  { key: "Riyadh", en: "Riyadh", ar: "الرياض" },
  { key: "Madinah", en: "Madinah", ar: "المدينة المنورة" },
  { key: "Dammam", en: "Dammam", ar: "الدمام" },
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

export const FOREIGN_STATUS_OPTIONS = [
  { key: "all", en: "All Foreign Statuses", ar: "جميع حالات التملك" },
  { key: "ELIGIBLE", en: "100% Foreign Freehold", ar: "تملك حر لغير السعوديين" },
  { key: "LEASEHOLD", en: "Leasehold (Usufruct Rights)", ar: "حق انتفاع (إيجار طويل الأجل)" },
  { key: "ELIGIBLE_MUSLIMS_ONLY", en: "Muslims Only (Holy Cities)", ar: "متاح للمسلمين (المدينة المنورة)" },
  { key: "REQUIRES_PREMIUM_RESIDENCY", en: "Requires Premium Residency", ar: "يتطلب إقامة مميزة" },
];

export const PRICE_RANGE_OPTIONS = [
  { key: "all", en: "All Budgets", ar: "جميع الميزانيات", min: 0, max: Infinity },
  { key: "under-350k", en: "Under SAR 350,000", ar: "أقل من 350 ألف ر.س", min: 0, max: 350000 },
  { key: "350k-600k", en: "SAR 350,000 – 600,000", ar: "350 ألف – 600 ألف ر.س", min: 350000, max: 600000 },
  { key: "600k-1.5m", en: "SAR 600,000 – 1.5M", ar: "600 ألف – 1.5 مليون ر.س", min: 600000, max: 1500000 },
  { key: "above-1.5m", en: "Above SAR 1.5M", ar: "أكثر من 1.5 مليون ر.س", min: 1500000, max: Infinity },
];

function parseNumericPriceString(str: string): number | null {
  if (!str) return null;
  const westernized = str.replace(/[٠-٩]/g, (d) => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);

  const millionMatch = westernized.match(/(\d+(?:\.\d+)?)\s*(?:m|million|مليون)/i);
  if (millionMatch) {
    return Math.round(parseFloat(millionMatch[1]) * 1000000);
  }

  const kMatch = westernized.match(/(\d+(?:\.\d+)?)\s*(?:k|thousand|ألف)/i);
  if (kMatch) {
    return Math.round(parseFloat(kMatch[1]) * 1000);
  }

  const cleaned = westernized.replace(/,/g, "");
  const numMatch = cleaned.match(/\b(\d{4,10})\b/);
  if (numMatch) {
    return parseInt(numMatch[1], 10);
  }

  return null;
}

export function extractProjectNumericPrice(project: ProjectDetail): number | null {
  const offer = (project as any)?.discountOffer || (project as any)?.discount_offer;
  const isOfferActive = offer?.is_active && (!offer?.valid_until || new Date(offer.valid_until) >= new Date());

  const candidates = [
    isOfferActive ? offer?.discounted_price_en : null,
    isOfferActive ? offer?.discounted_price_ar : null,
    project.startingPriceEn,
    (project as any)?.starting_price_en,
    project.startingPriceAr,
    (project as any)?.starting_price_ar,
    project.priceRangeEn,
    (project as any)?.price_range_en,
  ].filter(Boolean) as string[];

  for (const raw of candidates) {
    const val = parseNumericPriceString(raw);
    if (val !== null && val > 0) return val;
  }
  return null;
}

const CONTENT = {
  en: {
    badge: "Curated Investment Portfolio",
    heroTitle: "Curated Properties.\nExceptional Value.",
    heroSub: "Explore the exact investment opportunities sourced and vetted by Asaheeb Real Estate — aligned with Saudi Arabia's Vision 2030.",
    searchPlaceholder: "Search by project name, district, city, developer, property type...",
    filterTypeLabel: "Property Type",
    filterCityLabel: "Location",
    filterStatusLabel: "Development Status",
    filterPaymentLabel: "Payment Terms",
    filterPriceLabel: "Price Range & Budget",
    filterForeignLabel: "Foreign Buyer Eligibility",
    clearAll: "Reset Filters",
    noResults: "No properties match your current search criteria.",
    inquireBtn: "Enquire Now",
    ctaTitle: "Need a Custom Portfolio?",
    ctaSub: "We have off-market institutional assets not publicly listed. Connect with an Asaheeb advisor.",
    ctaBtn: "Talk to an Advisor",
    foreignFilterBtn: "Foreign Eligible",
    foreignFreeholdShort: "100% Freehold",
  },
  ar: {
    badge: "محفظة استثمارية منتقاة",
    heroTitle: "عقارات منتقاة.\nقيم استثنائية.",
    heroSub: "تصفح الفرص الاستثمارية التي تم فحصها واعتمادها من قبل أصاهيب العقارية — المتوافقة مع رؤية السعودية 2030.",
    searchPlaceholder: "ابحث بالاسم، الحي، المدينة، المطور، نوع العقار...",
    filterTypeLabel: "نوع وفئة العقار",
    filterCityLabel: "المدينة والموقع",
    filterStatusLabel: "حالة المشروع",
    filterPaymentLabel: "خطة السداد",
    filterPriceLabel: "نطاق الأسعار والميزانية",
    filterForeignLabel: "أهلية تملك الأجانب والمقيمين",
    clearAll: "إعادة ضبط الفلاتر",
    noResults: "لا توجد مشاريع مطابقة لخيارات البحث المحددة.",
    inquireBtn: "استفسر الآن",
    ctaTitle: "هل تحتاج محفظة مخصصة؟",
    ctaSub: "لدينا أصول مؤسسية خارج السوق غير مدرجة علناً. تواصل مع مستشار أصاهيب.",
    ctaBtn: "تحدث مع مستشار",
    foreignFilterBtn: "متاح لغير السعوديين",
    foreignFreeholdShort: "تملك حر للأجانب",
  },
};

// ─── Project Card Component ───────────────────────────────────────────────────
function ProjectCard({ project, isAr, priority = false }: { project: ProjectDetail; isAr: boolean; priority?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const rawImageUrl = project.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop";
  const imageUrl = getOptimizedImageUrl(rawImageUrl, 800);

  const rawOffer = (project as any)?.discountOffer || (project as any)?.discount_offer;
  const offerStatus = getDiscountStatus(rawOffer);

  const paymentTerms = isAr
    ? (project.paymentTermsAr || (project as any).payment_terms_ar)
    : (project.paymentTermsEn || (project as any).payment_terms_en);

  const rawPropertyType = project.typeEn || (project as any).type_en || project.typeAr || (project as any).type_ar || "";
  const normalizedType = normalizePropertyType(rawPropertyType);
  const standardTypeObj = STANDARD_PROPERTY_TYPES.find((t) => t.key === normalizedType);
  const propertyTypeDisplay = isAr
    ? (project.typeAr || (project as any).type_ar || standardTypeObj?.labelAr || rawPropertyType)
    : (project.typeEn || (project as any).type_en || standardTypeObj?.labelEn || rawPropertyType);

  const isOfferActive = offerStatus.isActive && !offerStatus.isExpired;

  return (
    <Link href={`/projects/${project.id}`} prefetch={false} className="block text-left" dir={isAr ? "rtl" : "ltr"}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative overflow-hidden cursor-pointer transition-all duration-500 rounded-sm bg-[#0F1117] h-full flex flex-col justify-between ${
          isOfferActive
            ? "border border-amber-500/60 shadow-[0_8px_32px_rgba(245,158,11,0.25)]"
            : "border border-white/10 hover:border-[#B8873B]/60"
        }`}
        style={{
          boxShadow: hovered
            ? isOfferActive
              ? "0 24px 54px rgba(0,0,0,0.7), 0 0 35px rgba(245,158,11,0.3)"
              : "0 20px 48px rgba(0,0,0,0.6), 0 0 30px rgba(184,135,59,0.15)"
            : isOfferActive
            ? "0 8px 32px rgba(245,158,11,0.2)"
            : "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Top Gold Lightning Accent Line for active offer cards */}
        {isOfferActive && (
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 z-20 animate-pulse" />
        )}

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

            {/* City & Property Type Badges */}
            <div className="flex items-center gap-1.5 shrink-0">
              {propertyTypeDisplay && (
                <div className="px-2.5 py-1 font-mono text-[8.5px] tracking-[0.18em] uppercase text-[#E8DFCE] bg-[#12130F]/90 backdrop-blur-sm border border-[#B8873B]/40 shrink-0">
                  {propertyTypeDisplay}
                </div>
              )}
              <div className="px-2.5 py-1 font-mono text-[8.5px] tracking-[0.18em] uppercase text-white bg-black/60 backdrop-blur-sm border border-white/20 shrink-0">
                {isAr ? project.cityAr : project.cityEn}
              </div>
            </div>
          </div>

          {/* Promotional Offer Badge (Top Overlay on Image with Lightning Bolt) */}
          {isOfferActive && (
            <div className={`absolute bottom-3 ${isAr ? "left-3" : "right-3"} z-10 pointer-events-none`}>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black tracking-wider uppercase px-3 py-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-slate-950 rounded-sm shadow-[0_0_16px_rgba(245,158,11,0.5)] border border-amber-300/60 animate-pulse">
                {/* Lightning SVG Icon */}
                <svg className="w-3 h-3 text-slate-950 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>{isAr ? offerStatus.badgeLabelAr || "عرض محدود" : offerStatus.badgeLabelEn || "LIMITED TIME OFFER"}</span>
                {offerStatus.daysLeft !== null && (
                  <span className="ml-1 pl-1 border-l border-slate-950/40 font-bold">{offerStatus.daysLeft === 0 ? (isAr ? "اليوم" : "Ends today") : `${offerStatus.daysLeft}d left`}</span>
                )}
              </span>
            </div>
          )}

          {/* Payment Terms Badge (Bottom overlay) */}
          {!offerStatus.isActive && paymentTerms && (
            <div className={`absolute bottom-3 ${isAr ? "right-3" : "left-3"} z-10 pointer-events-none`}>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 bg-black/80 backdrop-blur-md border border-[#B8873B]/40 text-[#E8DFCE] rounded-xs font-medium">
                <svg className="w-3 h-3 text-[#B8873B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span>{paymentTerms}</span>
              </span>
            </div>
          )}
        </div>

        <div className={`p-6 flex-1 flex flex-col justify-between h-[195px] ${isAr ? "text-right" : ""}`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="font-mono text-[9.5px] tracking-[0.25em] uppercase font-medium text-[#B8873B] truncate">
                {isAr ? project.districtAr : project.districtEn}
              </div>
              {project.foreign_eligibility && (
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase shrink-0 ${
                    project.foreign_eligibility === "ELIGIBLE"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : project.foreign_eligibility === "LEASEHOLD"
                      ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                      : project.foreign_eligibility === "ELIGIBLE_MUSLIMS_ONLY"
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      : project.foreign_eligibility === "REQUIRES_PREMIUM_RESIDENCY"
                      ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                      : "bg-white/10 text-gray-400 border border-white/10"
                  }`}
                  title={isAr ? project.foreign_eligibility_ar : project.foreign_eligibility_en}
                >
                  {project.foreign_eligibility === "LEASEHOLD" ? (
                    <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  ) : (
                    <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                  <span>
                    {isAr
                      ? project.foreign_eligibility === "ELIGIBLE"
                        ? "تملك أجنبي"
                        : project.foreign_eligibility === "LEASEHOLD"
                        ? "حق انتفاع"
                        : project.foreign_eligibility === "ELIGIBLE_MUSLIMS_ONLY"
                        ? "للمسلمين"
                        : project.foreign_eligibility === "REQUIRES_PREMIUM_RESIDENCY"
                        ? "إقامة مميزة"
                        : "سعوديين فقط"
                      : project.foreign_eligibility === "ELIGIBLE"
                      ? "Foreign Freehold"
                      : project.foreign_eligibility === "LEASEHOLD"
                      ? "Leasehold"
                      : project.foreign_eligibility === "ELIGIBLE_MUSLIMS_ONLY"
                      ? "Muslim Freehold"
                      : project.foreign_eligibility === "REQUIRES_PREMIUM_RESIDENCY"
                      ? "Premium Residency"
                      : "Saudi Only"}
                  </span>
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl text-[#E8DFCE] mb-1.5 tracking-tight group-hover:text-[#B8873B] transition-colors line-clamp-1 h-7">
              {isAr ? project.nameAr : project.nameEn}
            </h3>
            <p className="font-sans text-xs text-[#C5BCAD] leading-relaxed mb-3 line-clamp-2 h-9 overflow-hidden">
              {isAr ? project.overviewAr : project.overviewEn}
            </p>
          </div>

          <div className={`pt-3 border-t border-white/10 flex items-end justify-between gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
            <div className="flex-1 min-w-0 pr-1">
              <ProjectCardPriceAndOffer project={project} isAr={isAr} showBadges={false} />
            </div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#B8873B] font-semibold group-hover:underline shrink-0 pb-0.5 whitespace-nowrap">
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
  const searchParams = useSearchParams();
  const typeParam = searchParams ? searchParams.get("type") : null;

  const [projectsList] = useState<ProjectDetail[]>(initialProjects);

  // Dynamically derive all available cities from actual properties in the portfolio
  const availableCategories = useMemo(() => {
    if (!projectsList || projectsList.length === 0) {
      return DEFAULT_CATEGORIES;
    }

    const cityMap = new Map<string, { key: string; en: string; ar: string }>();

    projectsList.forEach((p) => {
      const rawCityEn = (p.cityEn || "").trim();
      const rawCityAr = (p.cityAr || "").trim();
      if (!rawCityEn && !rawCityAr) return;

      const normKey = (rawCityEn || rawCityAr).toLowerCase();
      const known = KNOWN_CITIES[normKey];

      if (!cityMap.has(normKey)) {
        cityMap.set(normKey, {
          key: rawCityEn || known?.en || rawCityAr,
          en: rawCityEn || known?.en || rawCityAr,
          ar: rawCityAr || known?.ar || rawCityEn,
        });
      } else {
        const item = cityMap.get(normKey)!;
        if (rawCityAr && (!item.ar || item.ar === item.en)) {
          item.ar = rawCityAr;
        }
        if (rawCityEn && (!item.en || item.en === item.ar)) {
          item.en = rawCityEn;
        }
      }
    });

    const dynamicCities = Array.from(cityMap.values());
    dynamicCities.sort((a, b) => a.en.localeCompare(b.en));

    return [
      { key: "all", en: "All Cities", ar: "جميع المدن" },
      ...dynamicCities,
    ];
  }, [projectsList]);

  // Dynamically derive all available property types (standard + custom)
  const availablePropertyTypes = useMemo(() => {
    const standardKeys = new Set(STANDARD_PROPERTY_TYPES.map((t) => t.key.toLowerCase()));
    const customTypesMap = new Map<string, { key: string; en: string; ar: string; iconType: string }>();

    projectsList.forEach((p) => {
      const rawTypeEn = (p.typeEn || (p as any).type_en || "").trim();
      const rawTypeAr = (p.typeAr || (p as any).type_ar || "").trim();
      if (!rawTypeEn && !rawTypeAr) return;

      const normalized = normalizePropertyType(rawTypeEn || rawTypeAr);
      if (!standardKeys.has(normalized.toLowerCase()) && !customTypesMap.has(normalized.toLowerCase())) {
        customTypesMap.set(normalized.toLowerCase(), {
          key: rawTypeEn || normalized,
          en: rawTypeEn || normalized,
          ar: rawTypeAr || normalized,
          iconType: "custom",
        });
      }
    });

    return [
      { key: "all", en: "All Property Types", ar: "جميع أنواع العقارات", iconType: "all" },
      ...STANDARD_PROPERTY_TYPES.map((t) => ({ key: t.key, en: t.labelEn, ar: t.labelAr, iconType: t.iconType })),
      ...Array.from(customTypesMap.values()),
    ];
  }, [projectsList]);

  // Initial property type from URL query if available
  const initialType = useMemo(() => {
    if (typeParam) {
      return normalizePropertyType(typeParam);
    }
    return "all";
  }, [typeParam]);

  // Filter States (Committed on Page)
  const [searchQuery, setSearchQuery] = useState("");
  const [activePropertyType, setActivePropertyType] = useState(initialType);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activePayment, setActivePayment] = useState("all");
  const [activeForeignStatus, setActiveForeignStatus] = useState("all");
  const [activePriceRange, setActivePriceRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showForeignQuickMenu, setShowForeignQuickMenu] = useState(false);
  const foreignQuickMenuRef = useRef<HTMLDivElement>(null);

  // Close foreign quick menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (foreignQuickMenuRef.current && !foreignQuickMenuRef.current.contains(event.target as Node)) {
        setShowForeignQuickMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleForeignQuickFilter = (statusKey: string = "ELIGIBLE") => {
    if (activeForeignStatus === statusKey) {
      handleForeignStatusChange("all");
    } else {
      handleForeignStatusChange(statusKey);
    }
    setShowForeignQuickMenu(false);
  };

  // Draft States inside Modal (Staged until user clicks Apply)
  const [draftPropertyType, setDraftPropertyType] = useState(initialType);
  const [draftCategory, setDraftCategory] = useState("all");
  const [draftStatus, setDraftStatus] = useState("all");
  const [draftPayment, setDraftPayment] = useState("all");
  const [draftForeignStatus, setDraftForeignStatus] = useState("all");
  const [draftPriceRange, setDraftPriceRange] = useState("all");

  const heroRef = useRef<HTMLDivElement>(null);
  const filterSectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Sync URL query params if user navigates via browser or header dropdown
  useEffect(() => {
    if (typeParam) {
      const normalized = normalizePropertyType(typeParam);
      setActivePropertyType(normalized);
      setDraftPropertyType(normalized);
      setCurrentPage(1);
    }
  }, [typeParam]);

  const activeFiltersCount =
    (activePropertyType !== "all" ? 1 : 0) +
    (activeCategory !== "all" ? 1 : 0) +
    (activeStatus !== "all" ? 1 : 0) +
    (activePayment !== "all" ? 1 : 0) +
    (activeForeignStatus !== "all" ? 1 : 0) +
    (activePriceRange !== "all" ? 1 : 0);

  const isFiltered = searchQuery.trim() !== "" || activeFiltersCount > 0;

  // Open modal and initialize drafts from current active filters
  const openFilterModal = () => {
    setDraftPropertyType(activePropertyType);
    setDraftCategory(activeCategory);
    setDraftStatus(activeStatus);
    setDraftPayment(activePayment);
    setDraftForeignStatus(activeForeignStatus);
    setDraftPriceRange(activePriceRange);
    setShowFilterModal(true);
  };

  // Commit drafts to active page filters and close modal
  const applyDraftFilters = () => {
    setActivePropertyType(draftPropertyType);
    setActiveCategory(draftCategory);
    setActiveStatus(draftStatus);
    setActivePayment(draftPayment);
    setActiveForeignStatus(draftForeignStatus);
    setActivePriceRange(draftPriceRange);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  // Reset all active and draft filters
  const resetAllFilters = () => {
    setSearchQuery("");
    setActivePropertyType("all");
    setActiveCategory("all");
    setActiveStatus("all");
    setActivePayment("all");
    setActiveForeignStatus("all");
    setActivePriceRange("all");
    setDraftPropertyType("all");
    setDraftCategory("all");
    setDraftStatus("all");
    setDraftPayment("all");
    setDraftForeignStatus("all");
    setDraftPriceRange("all");
    setCurrentPage(1);
  };

  // Helper filter logic reusable for both page and draft count
  const calculateFiltered = (
    pType: string,
    cat: string,
    status: string,
    payment: string,
    foreignStatus: string,
    priceRange: string,
    query: string
  ) => {
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
          (p.typeEn && p.typeEn.toLowerCase().includes(q)) ||
          (p.typeAr && p.typeAr.toLowerCase().includes(q)) ||
          (p.developerEn && p.developerEn.toLowerCase().includes(q)) ||
          (p.developerAr && p.developerAr.toLowerCase().includes(q)) ||
          p.overviewEn.toLowerCase().includes(q) ||
          p.overviewAr.toLowerCase().includes(q);

        if (!matchSearch) return false;
      }

      // 2. Property Type
      if (pType !== "all") {
        if (!matchesPropertyType(p, pType)) return false;
      }

      // 3. City (Case-insensitive & bilingual match)
      if (cat !== "all") {
        const pCityEn = (p.cityEn || "").toLowerCase().trim();
        const pCityAr = (p.cityAr || "").toLowerCase().trim();
        const catLower = cat.toLowerCase().trim();
        if (pCityEn !== catLower && pCityAr !== catLower) return false;
      }

      // 4. Status
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

      // 5. Payment terms
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

      // 6. Foreign Buyer Eligibility
      if (foreignStatus !== "all") {
        const pForeign = p.foreign_eligibility || (p.cityEn?.toLowerCase().includes("medina") || p.cityEn?.toLowerCase().includes("madinah") ? "ELIGIBLE_MUSLIMS_ONLY" : "ELIGIBLE");
        if (pForeign !== foreignStatus) return false;
      }

      // 7. Price Range
      if (priceRange !== "all") {
        const numericPrice = extractProjectNumericPrice(p);
        if (numericPrice === null) return false;

        const option = PRICE_RANGE_OPTIONS.find((opt) => opt.key === priceRange);
        if (option) {
          if (numericPrice < option.min || numericPrice > option.max) return false;
        }
      }

      return true;
    });
  };

  const filtered = calculateFiltered(
    activePropertyType,
    activeCategory,
    activeStatus,
    activePayment,
    activeForeignStatus,
    activePriceRange,
    searchQuery
  );
  const draftFilteredCount = calculateFiltered(
    draftPropertyType,
    draftCategory,
    draftStatus,
    draftPayment,
    draftForeignStatus,
    draftPriceRange,
    searchQuery
  ).length;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, endIndex);

  // Quick remove from chips bar on main page
  const handlePropertyTypeChange = (key: string) => {
    setActivePropertyType(key);
    setDraftPropertyType(key);
    setCurrentPage(1);
  };

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

  const handleForeignStatusChange = (key: string) => {
    setActiveForeignStatus(key);
    setDraftForeignStatus(key);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (key: string) => {
    setActivePriceRange(key);
    setDraftPriceRange(key);
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
  }, [searchQuery, activePropertyType, activeCategory, activeStatus, activePayment, activeForeignStatus, activePriceRange, currentPage]);

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
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            
            {/* Search input with live text typing */}
            <div className="relative flex-1">
              <svg
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8477] pointer-events-none ${isAr ? "right-4" : "left-4"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={c.searchPlaceholder}
                dir={isAr ? "rtl" : "ltr"}
                className={`w-full py-3.5 sm:py-4 text-xs sm:text-sm text-[#E8DFCE] bg-[#12130F] border border-white/10 rounded-sm focus:border-[#B8873B] outline-none transition-all duration-300 placeholder-[#8C8477] ${
                  isAr ? "pr-11 pl-4" : "pl-11 pr-4"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute top-1/2 -translate-y-1/2 text-[#8C8477] hover:text-[#E8DFCE] text-xs font-mono px-2 py-1 cursor-pointer ${
                    isAr ? "left-3" : "right-3"
                  }`}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Actions Bar (Foreign Eligible Filter + Filters Modal Trigger) */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
              {/* Foreign Eligible Filter with Globe / Document Icon */}
              <div ref={foreignQuickMenuRef} className="relative flex-1 sm:flex-initial min-w-0">
                <button
                  type="button"
                  onClick={() => toggleForeignQuickFilter("ELIGIBLE")}
                  className={`w-full sm:w-auto h-[46px] sm:h-[56px] px-2.5 sm:px-5 border font-mono text-[10px] sm:text-xs tracking-wider sm:tracking-[0.16em] uppercase font-semibold flex items-center justify-center gap-1.5 sm:gap-2 rounded-sm cursor-pointer shadow-lg transition-all duration-300 group min-w-0 ${
                    activeForeignStatus !== "all"
                      ? activeForeignStatus === "LEASEHOLD"
                        ? "border-purple-500/80 bg-purple-950/40 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                        : "border-emerald-500/80 bg-emerald-950/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                      : "border-white/15 hover:border-emerald-500/50 text-[#E8DFCE] hover:text-emerald-300 bg-[#12130F]"
                  }`}
                  title={isAr ? "تصفية المشاريع المتاحة لتملك الأجانب" : "Quick filter: Foreign freehold & eligible projects"}
                >
                  {/* SVG Icon */}
                  {activeForeignStatus === "LEASEHOLD" ? (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  ) : (
                    <svg
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 group-hover:rotate-45 ${
                        activeForeignStatus !== "all" ? "text-emerald-400 scale-110" : "text-[#B8873B]"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}

                  <span className="truncate">
                    {activeForeignStatus === "ELIGIBLE"
                      ? isAr ? "تملك حر للأجانب" : "Foreign Freehold"
                      : activeForeignStatus === "LEASEHOLD"
                      ? isAr ? "حق انتفاع" : "Leasehold"
                      : activeForeignStatus === "ELIGIBLE_MUSLIMS_ONLY"
                      ? isAr ? "متاح للمسلمين" : "Muslims Only"
                      : activeForeignStatus === "REQUIRES_PREMIUM_RESIDENCY"
                      ? isAr ? "إقامة مميزة" : "Premium Residency"
                      : isAr ? "متاح للأجانب" : "Foreign Eligible"}
                  </span>

                  {activeForeignStatus !== "all" && (
                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse shrink-0 ${
                      activeForeignStatus === "LEASEHOLD" ? "bg-purple-400" : "bg-emerald-400"
                    }`} />
                  )}

                  {/* Dropdown chevron to pick sub-types (e.g. Holy Cities vs 100% Freehold vs Leasehold) */}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowForeignQuickMenu((prev) => !prev);
                    }}
                    className="text-[9px] text-[#8C8477] hover:text-emerald-300 p-0.5 sm:p-1 transition-transform duration-200"
                    title={isAr ? "خيارات التملك لغير السعوديين" : "All foreign status options"}
                  >
                    ▼
                  </span>
                </button>

                {/* Dropdown Popover */}
                {showForeignQuickMenu && (
                  <div
                    className={`absolute top-full mt-2 z-50 w-64 max-w-[calc(100vw-2rem)] bg-[#0F1117] border border-emerald-500/30 rounded-sm shadow-[0_12px_36px_rgba(0,0,0,0.85)] p-2 space-y-1 ${
                      isAr ? "right-0 text-right" : "left-0 sm:right-0 sm:left-auto text-left"
                    }`}
                  >
                    <div className="px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase text-[#8C8477] border-b border-white/5 pb-1 mb-1">
                      {isAr ? "خيارات أهلية التملك" : "Foreign Ownership Status"}
                    </div>
                    {FOREIGN_STATUS_OPTIONS.map((opt) => {
                      const isSelected = activeForeignStatus === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => {
                            handleForeignStatusChange(opt.key);
                            setShowForeignQuickMenu(false);
                          }}
                          className={`w-full px-3 py-2 text-xs font-mono rounded-xs flex items-center justify-between gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? opt.key === "LEASEHOLD"
                                ? "bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/40"
                                : "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40"
                              : "text-[#E8DFCE] hover:bg-white/5 hover:text-emerald-300"
                          }`}
                        >
                          <span className="truncate">{isAr ? opt.ar : opt.en}</span>
                          {isSelected && (
                            <span className={`font-bold shrink-0 ${opt.key === "LEASEHOLD" ? "text-purple-400" : "text-emerald-400"}`}>
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filters Trigger Button (Opens Refine Modal) */}
              <button
                onClick={openFilterModal}
                className="flex-initial h-[46px] sm:h-[56px] px-3 sm:px-7 border border-white/15 hover:border-[#B8873B] text-[#E8DFCE] hover:text-[#B8873B] bg-[#12130F] transition-all duration-300 font-mono text-[10px] sm:text-xs tracking-wider sm:tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-sm cursor-pointer shadow-lg shrink-0"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
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
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold shrink-0 ${
                    activeFiltersCount > 0 ? "bg-[#B8873B] text-[#12130F]" : "bg-white/10 text-[#E8DFCE]"
                  }`}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

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
                {activePropertyType !== "all" && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-[#171914] border border-[#B8873B]/50 text-[#E8DFCE] rounded-xs shadow-sm">
                    <svg className="w-3 h-3 text-[#B8873B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                    <span>
                      {availablePropertyTypes.find((t) => t.key.toLowerCase() === activePropertyType.toLowerCase())?.[isAr ? "ar" : "en"] || activePropertyType}
                    </span>
                    <button onClick={() => handlePropertyTypeChange("all")} className="text-[#8C8477] hover:text-[#B8873B] cursor-pointer">✕</button>
                  </span>
                )}
                {activeCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-[#171914] border border-[#B8873B]/40 text-[#E8DFCE] rounded-xs">
                    <span>
                      {availableCategories.find((c) => c.key.toLowerCase() === activeCategory.toLowerCase())?.[isAr ? "ar" : "en"] || activeCategory}
                    </span>
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
                {activePriceRange !== "all" && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 bg-[#171914] border border-[#B8873B]/50 text-[#E8DFCE] rounded-xs shadow-sm">
                    <svg className="w-3 h-3 text-[#B8873B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span>{PRICE_RANGE_OPTIONS.find((pr) => pr.key === activePriceRange)?.[isAr ? "ar" : "en"]}</span>
                    <button onClick={() => handlePriceRangeChange("all")} className="text-[#8C8477] hover:text-[#B8873B] cursor-pointer">✕</button>
                  </span>
                )}
                {activeForeignStatus !== "all" && (
                  <span className={`inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-sm ${
                    activeForeignStatus === "LEASEHOLD"
                      ? "bg-[#171914] border border-purple-500/40 text-purple-300"
                      : "bg-[#171914] border border-emerald-500/40 text-emerald-300"
                  }`}>
                    {activeForeignStatus === "LEASEHOLD" ? (
                      <svg className="w-3 h-3 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                    <span>{FOREIGN_STATUS_OPTIONS.find((fs) => fs.key === activeForeignStatus)?.[isAr ? "ar" : "en"]}</span>
                    <button onClick={() => handleForeignStatusChange("all")} className="text-[#8C8477] hover:text-[#B8873B] cursor-pointer">✕</button>
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-xl bg-[#12130F] border border-[#B8873B]/40 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            dir={isAr ? "rtl" : "ltr"}
            style={{ backgroundColor: "#141510" }}
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

            {/* Modal Body: Filter Categories */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-white/10">
              
              {/* Category 1: Property Type */}
              <div className={`space-y-3 ${isAr ? "text-right" : ""}`}>
                <label className="block font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#C5BCAD] font-semibold">
                  {c.filterTypeLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availablePropertyTypes.map((pt) => {
                    const isSelected = draftPropertyType.toLowerCase() === pt.key.toLowerCase();
                    const isAll = pt.key === "all";
                    return (
                      <button
                        key={pt.key}
                        onClick={() => setDraftPropertyType(pt.key)}
                        className={`p-3 border text-center font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-xs flex items-center justify-center gap-2 ${
                          isAll && availablePropertyTypes.length % 2 === 1 ? "col-span-2" : ""
                        } ${
                          isSelected
                            ? "border-[#B8873B] bg-[#B8873B] text-[#12130F] font-bold shadow-[0_0_15px_rgba(184,135,59,0.25)]"
                            : "border-white/10 bg-[#171914] text-[#8C8477] hover:border-white/25 hover:text-[#C5BCAD]"
                        }`}
                      >
                        <PropertyCategoryIcon type={pt.iconType} className={`w-3.5 h-3.5 ${isSelected ? "text-[#12130F]" : "text-[#B8873B]"}`} />
                        <span>{isAr ? pt.ar : pt.en}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: Location */}
              <div className={`pt-6 space-y-3 ${isAr ? "text-right" : ""}`}>
                <label className="block font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#C5BCAD] font-semibold">
                  {c.filterCityLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableCategories.map((cat) => {
                    const isSelected = draftCategory.toLowerCase() === cat.key.toLowerCase();
                    const isAll = cat.key === "all";
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setDraftCategory(cat.key)}
                        className={`p-3 border text-center font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-xs ${
                          isAll && availableCategories.length % 2 === 0 ? "col-span-2" : ""
                        } ${
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

              {/* Category 3: Development Status */}
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

              {/* Category 4: Price Range */}
              <div className={`pt-6 space-y-3 ${isAr ? "text-right" : ""}`}>
                <label className="block font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#C5BCAD] font-semibold">
                  {c.filterPriceLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRICE_RANGE_OPTIONS.map((pr) => {
                    const isSelected = draftPriceRange === pr.key;
                    return (
                      <button
                        key={pr.key}
                        onClick={() => setDraftPriceRange(pr.key)}
                        className={`p-3 border text-center font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-xs flex items-center justify-center gap-2 ${
                          isSelected
                            ? "border-[#B8873B] bg-[#B8873B] text-[#12130F] font-bold shadow-[0_0_15px_rgba(184,135,59,0.25)]"
                            : "border-white/10 bg-[#171914] text-[#8C8477] hover:border-white/25 hover:text-[#C5BCAD]"
                        }`}
                      >
                        <svg className={`w-3.5 h-3.5 ${isSelected ? "text-[#12130F]" : "text-[#B8873B]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span>{isAr ? pr.ar : pr.en}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 5: Foreign Buyer Eligibility */}
              <div className={`pt-6 space-y-3 ${isAr ? "text-right" : ""}`}>
                <label className="block font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#C5BCAD] font-semibold">
                  {c.filterForeignLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FOREIGN_STATUS_OPTIONS.map((fs) => {
                    const isSelected = draftForeignStatus === fs.key;
                    return (
                      <button
                        key={fs.key}
                        onClick={() => setDraftForeignStatus(fs.key)}
                        className={`p-3 border text-center font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer rounded-xs flex items-center justify-center gap-2 ${
                          isSelected
                            ? "border-[#B8873B] bg-[#B8873B] text-[#12130F] font-bold shadow-[0_0_15px_rgba(184,135,59,0.25)]"
                            : "border-white/10 bg-[#171914] text-[#8C8477] hover:border-white/25 hover:text-[#C5BCAD]"
                        }`}
                      >
                        {fs.key === "LEASEHOLD" ? (
                          <svg className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#12130F]" : "text-purple-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        ) : (
                          <svg className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-[#12130F]" : "text-emerald-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                        )}
                        <span>{isAr ? fs.ar : fs.en}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category 6: Payment Terms */}
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
                  setDraftPropertyType("all");
                  setDraftCategory("all");
                  setDraftStatus("all");
                  setDraftPayment("all");
                  setDraftForeignStatus("all");
                  setDraftPriceRange("all");
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
              <p className="font-mono text-sm uppercase tracking-widest mb-3">
                {c.noResults}
              </p>
              {isFiltered && (
                <button
                  onClick={resetAllFilters}
                  className="font-mono text-xs text-[#B8873B] underline uppercase tracking-wider cursor-pointer"
                >
                  {c.clearAll}
                </button>
              )}
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
                      borderColor: currentPage === page ? "#B8873B" : "rgba(255,255,255,0.12)",
                      backgroundColor: currentPage === page ? "#B8873B" : "rgba(18,19,15,0.6)",
                      color: currentPage === page ? "#12130F" : "#E8DFCE",
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
                  {isAr ? "التالي →" : "Next →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER CTA SECTION ────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 lg:px-20 border-t border-white/10 bg-[#0F1117]/80">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border rounded-full"
            style={{ borderColor: "rgba(184,135,59,0.3)", backgroundColor: "rgba(18,19,15,0.8)" }}>
            <span className="w-2 h-2 rounded-full bg-[#B8873B]" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B]">
              {isAr ? "استشارات عقارية مخصصة" : "Bespoke Advisory"}
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal tracking-tight">
            {c.ctaTitle}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#C5BCAD] leading-relaxed max-w-xl mx-auto">
            {c.ctaSub}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-[#B8873B] hover:bg-[#c99a49] text-[#12130F] font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-[0_0_30px_rgba(184,135,59,0.3)] rounded-sm"
            >
              {c.ctaBtn}
            </Link>

            <a
              href={getWhatsAppLink(undefined, undefined, isAr)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 font-mono text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
            >
              <span>{isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
