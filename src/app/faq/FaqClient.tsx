"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
import { FAQ_DATA, FAQ_CATEGORIES, BUYER_JOURNEY_STEPS } from "@/data/faqData";
import { getWhatsAppLink } from "@/data/contactConfig";

const ITEMS_PER_PAGE = 20;

export default function FaqClient() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  // FAQ Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openAccordionId, setOpenAccordionId] = useState<number | null>(1);

  // Refs for precise scrolling
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const faqListTopRef = useRef<HTMLDivElement>(null);

  // Interactive Calculator State
  const [propertyPrice, setPropertyPrice] = useState<number>(1500000);
  const [buyerType, setBuyerType] = useState<"expat_resident" | "non_resident" | "saudi_gcc">("expat_resident");
  const [includeBrokerage, setIncludeBrokerage] = useState<boolean>(true);

  // Interactive Eligibility Checker State
  const [eligResidency, setEligResidency] = useState<"saudi_gcc" | "iqama" | "non_resident" | "premium_residency">("iqama");
  const [eligReligion, setEligReligion] = useState<"muslim" | "non_muslim">("muslim");
  const [eligCity, setEligCity] = useState<"jeddah" | "riyadh" | "makkah" | "madinah" | "other">("jeddah");

  // Price slider min/max
  const SLIDER_MIN = 300000;
  const SLIDER_MAX = 15000000;
  const sliderPercent = Math.min(
    100,
    Math.max(0, ((propertyPrice - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100)
  );

  // Calculations
  const rettAmount = propertyPrice * 0.05;
  const nonSaudiFeeAmount = buyerType === "saudi_gcc" ? 0 : propertyPrice * 0.02;
  const brokerageAmount = includeBrokerage ? propertyPrice * 0.025 : 0;
  const adminEst = 3500;
  const totalAcquisitionCost = propertyPrice + rettAmount + nonSaudiFeeAmount + brokerageAmount + adminEst;

  // Smooth scroll to top of questions container
  const scrollToQuestionsTop = () => {
    if (faqListTopRef.current) {
      const navOffset = 90;
      const elementPosition = faqListTopRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Category switch handler with guaranteed upward scroll
  const handleCategorySelect = (catKey: string) => {
    setSelectedCategory(catKey);
    setCurrentPage(1);
    setTimeout(() => {
      scrollToQuestionsTop();
    }, 50);
  };

  // Page change handler
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    setTimeout(() => {
      scrollToQuestionsTop();
    }, 50);
  };

  // Eligibility Evaluation
  const eligibilityResult = useMemo(() => {
    if (eligResidency === "saudi_gcc") {
      return {
        status: "eligible",
        titleEn: "100% Unrestricted Freehold Ownership (Saudi / GCC Citizen)",
        titleAr: "ملكية تامة وحرة 100% (مواطن سعودي / خليجي)",
        descEn: "You enjoy unrestricted ownership rights across all Saudi cities (including Makkah and Madinah), with 0% Non-Saudi acquisition fees and access to all standard banking finance programs.",
        descAr: "تتمتع بحق التملك التام والحر في كافة مدن المملكة ومكة المكرمة والمدينة المنورة، دون رسوم تملك غير السعوديين مع أهلية برامج التمويل العقاري والسكني."
      };
    }
    if ((eligCity === "makkah" || eligCity === "madinah") && eligReligion === "non_muslim") {
      return {
        status: "restricted",
        titleEn: "Religious Restriction for Holy Cities",
        titleAr: "اشتراط ديني خاص بالمدينتين المقدستين",
        descEn: "Under Saudi Real Estate General Authority regulations, individual non-Saudi ownership in Makkah and Madinah is legally restricted to Muslim natural persons. You can, however, acquire property freely in Jeddah, Riyadh, or Dammam.",
        descAr: "وفق لوائح الهيئة العامة للعقار، يقتصر التملك الفردي في مكة والمدينة على المسلمين. يمكنك التملك بحرية تامة في جدة والرياض ومختلف المدن الأخرى."
      };
    }
    if (eligResidency === "premium_residency") {
      return {
        status: "eligible",
        titleEn: "Fully Eligible (Premium Residency Status)",
        titleAr: "مؤهل بالكامل (مسار الإقامة المميزة)",
        descEn: "As a Saudi Premium Residency holder, you possess extensive freehold and investment rights across all approved residential and commercial zones in the Kingdom.",
        descAr: "بصفتك حاملاً للإقامة المميزة، تتمتع بحقوق تملك واسعة وحرة للأصول السكنية والتجارية في كافة النطاقات المعتمدة."
      };
    }
    if (eligResidency === "non_resident") {
      return {
        status: "eligible",
        titleEn: "Eligible via Saudi Properties Non-Resident Onboarding",
        titleAr: "مؤهل عبر مسار غير المقيمين الرقمي",
        descEn: "You can acquire eligible properties in approved zones. Process commences by issuing your verified digital identity through Saudi embassies or the Saudi Properties platform.",
        descAr: "يحق لك التملك في النطاقات المعتمدة، وتبدأ الإجراءات بإصدار الهوية الرقمية الموثقة عبر ممثليات المملكة أو منصة العقارات السعودية."
      };
    }
    return {
      status: "eligible",
      titleEn: "Eligible via Iqama Residency Pathway",
      titleAr: "مؤهل نظامياً عبر الإقامة النظامية",
      descEn: "You are eligible to purchase approved residential and commercial properties in designated zones in Jeddah, Riyadh, and other major cities using your valid residency ID.",
      descAr: "يحق لك شراء العقارات السكنية والتجارية في النطاقات المعتمدة بمدينة جدة والرياض وباقي المدن باستخدام رقم الإقامة الساري."
    };
  }, [eligResidency, eligReligion, eligCity]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const qEn = item.questionEn.toLowerCase();
      const qAr = item.questionAr.toLowerCase();
      const aEn = item.answerEn.toLowerCase();
      const aAr = item.answerAr.toLowerCase();
      const secEn = item.sectionNameEn.toLowerCase();
      const secAr = item.sectionNameAr.toLowerCase();

      return qEn.includes(q) || qAr.includes(q) || aEn.includes(q) || aAr.includes(q) || secEn.includes(q) || secAr.includes(q);
    });
  }, [selectedCategory, searchQuery]);

  // Pagination slice
  const totalPages = Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE) || 1;
  const paginatedFaqs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFaqs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredFaqs, currentPage]);

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleAccordion = (id: number) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="relative bg-[#0B0C09] text-[#E8DFCE] min-h-screen pb-24 md:pb-0 selection:bg-[#B8873B]/30" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── LUXURY ARCHITECTURAL HERO HEADER ───────────────────────── */}
      <section className="relative pt-32 sm:pt-40 pb-14 sm:pb-20 px-4 sm:px-8 lg:px-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#141610] via-[#0E100C] to-[#0B0C09]">
        {/* Architectural Ambient Light & Subtle Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#B8873B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] h-[300px] bg-[#B8873B]/12 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Refined Gold Monogram Line */}
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#B8873B]/60" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
              {isAr ? "منصة الاستشارات والمعرفة العقارية المعتمدة" : "REGA-Certified Legal & Investment Dossier"}
            </span>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#B8873B]/60" />
          </div>

          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.18] sm:leading-[1.12] tracking-tight text-[#E8DFCE] mb-4 sm:mb-6 max-w-4xl mx-auto">
            {isAr ? (
              <>
                الدليل الاستثماري الشامل لتملك العقارات في{" "}
                <span className="italic text-[#B8873B]">المملكة العربية السعودية</span>
              </>
            ) : (
              <>
                The Definitive Investor Guide to Buying Property in{" "}
                <span className="italic text-[#B8873B]">Saudi Arabia</span>
              </>
            )}
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#C5BCAD] max-w-3xl mx-auto leading-relaxed mb-8 px-2">
            {isAr
              ? "مرجع متكامل يضم 157 إجابة معتمدة حول أنظمة الهيئة العامة للعقار (رخصة فال)، ضريبة التصرفات العقارية (5%)، رسم تملك غير السعوديين (2%)، وحاسبة التكلفة الإجمالية في جدة والرياض ومكة والمدينة."
              : "An authoritative 157-question legal and financial repository covering REGA regulations, 5% RETT, 2% Non-Saudi conveyance fees, SAR 4M Premium Residency, and verified acquisition procedures in Jeddah & Riyadh."}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 rounded-xl border border-white/10 bg-[#141611]/80 text-center">
              <span className="font-display text-lg sm:text-xl text-[#B8873B] font-bold block">157</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#8C8477] uppercase">{isAr ? "سؤال وجواب معتمد" : "Verified Q&As"}</span>
            </div>
            <div className="p-3 rounded-xl border border-white/10 bg-[#141611]/80 text-center">
              <span className="font-display text-lg sm:text-xl text-[#E8DFCE] font-bold block">5% RETT</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#8C8477] uppercase">{isAr ? "ضريبة التصرفات" : "Transaction Tax"}</span>
            </div>
            <div className="p-3 rounded-xl border border-white/10 bg-[#141611]/80 text-center">
              <span className="font-display text-lg sm:text-xl text-[#E8DFCE] font-bold block">2% Fee</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#8C8477] uppercase">{isAr ? "رسم تملك الأجانب" : "Non-Saudi Fee"}</span>
            </div>
            <div className="p-3 rounded-xl border border-white/10 bg-[#141611]/80 text-center">
              <span className="font-display text-lg sm:text-xl text-[#B8873B] font-bold block">FAL License</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#8C8477] uppercase">{isAr ? "وساطة مرخصة" : "REGA Certified"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. INTERACTIVE SCREENER & CALCULATOR (AT TOP) ─────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-20 border-b border-white/10 bg-[#0E100C]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Eligibility Checker */}
          <div className="p-5 sm:p-8 rounded-2xl border border-white/10 bg-[#141611] relative flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#B8873B]/20 border border-[#B8873B]/40 flex items-center justify-center text-[#B8873B] font-mono text-xs sm:text-sm font-semibold shrink-0">
                  01
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-[#E8DFCE]">
                    {isAr ? "أداة فحص الأهلية للتملك الفوري" : "Instant Eligibility Screener"}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-mono text-[#8C8477]">
                    {isAr ? "فحص الأهلية للمواطنين والمقيمين وغير المقيمين" : "Verify compliance for Saudis, Expats & Non-Residents"}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {/* Residency Type including Saudi Citizen */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#8C8477] mb-2">
                    {isAr ? "صفة المشتري" : "Buyer Category"}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] sm:text-xs font-sans">
                    {[
                      { val: "saudi_gcc", labelEn: "Saudi / GCC", labelAr: "مواطن سعودي/خليجي" },
                      { val: "iqama", labelEn: "Iqama Resident", labelAr: "مقيم بإقامة" },
                      { val: "non_resident", labelEn: "Non-Resident", labelAr: "أجنبي غير مقيم" },
                      { val: "premium_residency", labelEn: "Premium Res.", labelAr: "إقامة مميزة" }
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => {
                          setEligResidency(item.val as any);
                          if (item.val === "saudi_gcc") {
                            setBuyerType("saudi_gcc");
                          } else if (item.val === "non_resident") {
                            setBuyerType("non_resident");
                          } else {
                            setBuyerType("expat_resident");
                          }
                        }}
                        className={`p-2 sm:p-2.5 rounded-lg border text-center transition-all ${
                          eligResidency === item.val
                            ? "border-[#B8873B] bg-[#B8873B]/20 text-[#E8DFCE] font-bold shadow-sm"
                            : "border-white/10 bg-white/5 text-[#C5BCAD] hover:border-white/20"
                        }`}
                      >
                        {isAr ? item.labelAr : item.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target City */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#8C8477] mb-2">
                    {isAr ? "المدينة المستهدفة" : "Target City"}
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-sans">
                    {[
                      { val: "jeddah", labelEn: "Jeddah", labelAr: "جدة" },
                      { val: "riyadh", labelEn: "Riyadh", labelAr: "الرياض" },
                      { val: "makkah", labelEn: "Makkah", labelAr: "مكة" },
                      { val: "madinah", labelEn: "Madinah", labelAr: "المدينة" }
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setEligCity(item.val as any)}
                        className={`p-2 sm:p-2.5 rounded-lg border text-center transition-all ${
                          eligCity === item.val
                            ? "border-[#B8873B] bg-[#B8873B]/20 text-[#E8DFCE] font-bold"
                            : "border-white/10 bg-white/5 text-[#C5BCAD] hover:border-white/20"
                        }`}
                      >
                        {isAr ? item.labelAr : item.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Holy Cities Requirement for Non-Saudis */}
                {eligResidency !== "saudi_gcc" && (eligCity === "makkah" || eligCity === "madinah") && (
                  <div className="p-3 rounded-xl border border-[#B8873B]/40 bg-[#B8873B]/10">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#B8873B] mb-2">
                      {isAr ? "الاشتراط الديني لمكة والمدينة" : "Holy Cities Religious Requirement"}
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                      {[
                        { val: "muslim", labelEn: "Muslim Natural Person", labelAr: "شخص طبيعي مسلم" },
                        { val: "non_muslim", labelEn: "Non-Muslim", labelAr: "غير مسلم" }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setEligReligion(item.val as any)}
                          className={`p-2 rounded-lg border text-center transition-all ${
                            eligReligion === item.val
                              ? "border-[#B8873B] bg-[#B8873B]/25 text-[#E8DFCE] font-bold"
                              : "border-white/10 bg-white/5 text-[#C5BCAD] hover:border-white/20"
                          }`}
                        >
                          {isAr ? item.labelAr : item.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Result Box */}
            <div
              className={`p-4 rounded-xl border ${
                eligibilityResult.status === "eligible"
                  ? "border-emerald-500/30 bg-emerald-950/20"
                  : "border-amber-500/30 bg-amber-950/20"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-sm sm:text-base ${eligibilityResult.status === "eligible" ? "text-emerald-400" : "text-amber-400"}`}>
                  {eligibilityResult.status === "eligible" ? "✓" : "⚠"}
                </span>
                <span className="font-display text-xs sm:text-sm text-[#E8DFCE] font-bold">
                  {isAr ? eligibilityResult.titleAr : eligibilityResult.titleEn}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#C5BCAD] leading-relaxed">
                {isAr ? eligibilityResult.descAr : eligibilityResult.descEn}
              </p>
            </div>
          </div>

          {/* Total Acquisition Cost Calculator */}
          <div className="p-5 sm:p-8 rounded-2xl border border-white/10 bg-[#141611] relative flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#B8873B]/20 border border-[#B8873B]/40 flex items-center justify-center text-[#B8873B] font-mono text-xs sm:text-sm font-semibold shrink-0">
                  02
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl text-[#E8DFCE]">
                    {isAr ? "حاسبة التكلفة الإجمالية لصفقة العقار" : "Total Acquisition Cost Calculator"}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-mono text-[#8C8477]">
                    {isAr ? "شاملة ضريبة التصرفات 5% ورسم التملك 2%" : "Compute full price including 5% RETT & 2% Non-Saudi Fee"}
                  </p>
                </div>
              </div>

              {/* Buyer Category Filter inside Calculator */}
              <div className="mb-4">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C8477] mb-2">
                  {isAr ? "فئة المشتري المطبقة" : "Applied Buyer Category"}
                </label>
                <div className="grid grid-cols-3 gap-2 text-[11px] sm:text-xs font-sans">
                  {[
                    { val: "saudi_gcc", labelEn: "🇸🇦 Saudi / GCC", labelAr: "🇸🇦 مواطن سعودي/خليجي" },
                    { val: "expat_resident", labelEn: "🌍 Expat Resident", labelAr: "🌍 مقيم بإقامة" },
                    { val: "non_resident", labelEn: "🌐 Non-Resident", labelAr: "🌐 أجنبي غير مقيم" }
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setBuyerType(item.val as any)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        buyerType === item.val
                          ? "border-[#B8873B] bg-[#B8873B]/20 text-[#E8DFCE] font-bold"
                          : "border-white/10 bg-white/5 text-[#C5BCAD] hover:border-white/20"
                      }`}
                    >
                      {isAr ? item.labelAr : item.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider with Smooth Gold Track Fill */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#8C8477]">
                    {isAr ? "سعر العقار المستهدف (ريال)" : "Property Price (SAR)"}
                  </label>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#B8873B]">
                    SAR {propertyPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={SLIDER_MIN}
                  max={SLIDER_MAX}
                  step={50000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  style={{
                    background: isAr
                      ? `linear-gradient(to left, #B8873B 0%, #B8873B ${sliderPercent}%, rgba(255, 255, 255, 0.12) ${sliderPercent}%, rgba(255, 255, 255, 0.12) 100%)`
                      : `linear-gradient(to right, #B8873B 0%, #B8873B ${sliderPercent}%, rgba(255, 255, 255, 0.12) ${sliderPercent}%, rgba(255, 255, 255, 0.12) 100%)`
                  }}
                  className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#E8DFCE]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#8C8477] mt-1.5">
                  {isAr ? (
                    <>
                      <span>300 ألف</span>
                      <span>4 مليون (الإقامة)</span>
                      <span>10 مليون</span>
                      <span>+15 مليون</span>
                    </>
                  ) : (
                    <>
                      <span>300K</span>
                      <span>4M (Residency)</span>
                      <span>10M</span>
                      <span>15M+</span>
                    </>
                  )}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 text-[11px] sm:text-xs border-t border-white/10 pt-3.5 mb-5">
                <div className="flex justify-between text-[#C5BCAD]">
                  <span>{isAr ? "سعر العقار الأساسي" : "Base Property Price"}</span>
                  <span className="font-mono font-medium text-[#E8DFCE]">SAR {propertyPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#C5BCAD]">
                  <span>{isAr ? "ضريبة التصرفات العقارية (5% RETT)" : "Transaction Tax (5% RETT)"}</span>
                  <span className="font-mono text-[#B8873B]">SAR {rettAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#C5BCAD]">
                  <span className="flex items-center gap-1.5">
                    {isAr ? "رسم تملك غير السعوديين (2% REGA)" : "Non-Saudi Ownership Fee (2% REGA)"}
                    {buyerType === "saudi_gcc" && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                        {isAr ? "معفى للمواطن" : "Exempt"}
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[#B8873B]">
                    {buyerType === "saudi_gcc" ? "SAR 0" : `SAR ${nonSaudiFeeAmount.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#C5BCAD]">
                  <span>{isAr ? "عمولة الوساطة المعتمدة (2.5% FAL)" : "Standard Brokerage (2.5% FAL)"}</span>
                  <span className="font-mono text-[#C5BCAD]">SAR {brokerageAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#8C8477]">
                  <span>{isAr ? "رسوم التوثيق والسجل العقاري التقديرية" : "Estimated Registration & Admin"}</span>
                  <span className="font-mono">SAR {adminEst.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Total Box */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-[#B8873B]/40 bg-[#B8873B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#8C8477] uppercase tracking-wider block">
                  {isAr ? "إجمالي التكلفة التقديرية للاستحواذ" : "Total Estimated Acquisition Cost"}
                </span>
                <span className="font-display text-lg sm:text-xl md:text-2xl text-[#E8DFCE] font-bold">
                  SAR {totalAcquisitionCost.toLocaleString()}
                </span>
              </div>
              <a
                href={getWhatsAppLink(
                  `Hello Asaheeb Real Estate, I am evaluating a property transaction of SAR ${propertyPrice.toLocaleString()} (${buyerType === "saudi_gcc" ? "Saudi Citizen" : "Expat Buyer"}). Please advise on curated opportunities.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#B8873B] text-[#0B0C09] font-mono text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#c99544] transition-all text-center whitespace-nowrap"
              >
                {isAr ? "استشر مستشارنا" : "Discuss Deal"}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. FAQ QUESTIONS LIST & DIRECT SEARCH ─────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-20" ref={faqListTopRef}>
        <div className="max-w-4xl mx-auto">
          
          {/* Integrated Search & Filter Container */}
          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-[#141611] backdrop-blur-md mb-8 shadow-2xl">
            {/* Search Input */}
            <div className="relative flex items-center mb-4">
              <span className="absolute left-4 sm:left-5 text-sm text-[#8C8477] pointer-events-none">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={
                  isAr
                    ? "ابحث مباشرة في 157 سؤالاً (مثال: ضريبة التصرفات 5%، تملك الأجانب في جدة، الإقامة المميزة...)"
                    : "Search all 157 questions directly (e.g. 5% RETT, foreign ownership in Jeddah, SAR 4M residency...)"
                }
                className="w-full bg-[#1A1C16] border border-white/15 focus:border-[#B8873B] rounded-xl pl-11 sm:pl-12 pr-10 py-3 sm:py-3.5 text-xs sm:text-sm text-[#E8DFCE] placeholder-[#8C8477] outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3.5 text-xs font-mono text-[#8C8477] hover:text-[#E8DFCE] p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Title & Counter */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8C8477] mb-2.5">
              <span>{isAr ? "تصفية حسب الموضوع:" : "Filter by Topic:"}</span>
              <span className="text-[#B8873B]">
                {isAr
                  ? `عرض ${(currentPage - 1) * ITEMS_PER_PAGE + 1} - ${Math.min(currentPage * ITEMS_PER_PAGE, filteredFaqs.length)} من أصل ${filteredFaqs.length} سؤالاً`
                  : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1} - ${Math.min(currentPage * ITEMS_PER_PAGE, filteredFaqs.length)} of ${filteredFaqs.length} questions`}
              </span>
            </div>

            {/* Mobile Category Dropdown */}
            <div className="block sm:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="w-full bg-[#1A1C16] border border-[#B8873B]/40 text-[#E8DFCE] rounded-lg px-3 py-2 text-xs font-mono outline-none"
              >
                {FAQ_CATEGORIES.map((cat) => (
                  <option key={cat.key} value={cat.key} className="bg-[#12130F] text-[#E8DFCE]">
                    {isAr ? cat.labelAr : cat.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Scrollable Pills */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scrollCategories("left")}
                aria-label="Scroll left"
                className="w-7 h-7 rounded-full border border-white/15 bg-white/5 hover:bg-[#B8873B]/20 hover:border-[#B8873B] text-xs text-[#E8DFCE] flex items-center justify-center shrink-0 cursor-pointer"
              >
                ‹
              </button>

              <div
                ref={categoryScrollRef}
                className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 scroll-smooth"
              >
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border cursor-pointer ${
                      selectedCategory === cat.key
                        ? "bg-[#B8873B] border-[#B8873B] text-[#0B0C09] font-bold shadow-md shadow-[#B8873B]/20"
                        : "bg-white/5 border-white/10 text-[#C5BCAD] hover:border-white/20 hover:text-[#E8DFCE]"
                    }`}
                  >
                    {isAr ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollCategories("right")}
                aria-label="Scroll right"
                className="w-7 h-7 rounded-full border border-white/15 bg-white/5 hover:bg-[#B8873B]/20 hover:border-[#B8873B] text-xs text-[#E8DFCE] flex items-center justify-center shrink-0 cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>

          {/* Accordion Questions List */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-lg sm:text-xl text-[#E8DFCE] mb-2">
                {isAr ? "لم يتم العثور على نتائج مطابقة" : "No matching questions found"}
              </h3>
              <p className="text-xs text-[#8C8477] mb-6">
                {isAr ? "جرّب البحث بكلمات أخرى أو اختر قسماً من الأقسام أعلاه." : "Try searching with different keywords or select a category above."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
                className="font-mono text-xs text-[#B8873B] border border-[#B8873B] px-4 py-2 rounded-lg hover:bg-[#B8873B] hover:text-[#0B0C09] transition-all"
              >
                {isAr ? "إعادة تعيين الفلاتر" : "Reset Filters"}
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3.5 sm:space-y-4">
                {paginatedFaqs.map((faq) => {
                  const isOpen = openAccordionId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      id={`faq-${faq.id}`}
                      className={`border rounded-xl transition-all duration-300 ${
                        isOpen
                          ? "border-[#B8873B]/50 bg-[#141611]"
                          : "border-white/10 bg-[#11130E]/70 hover:border-white/20"
                      }`}
                    >
                      {/* Header Button */}
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 sm:gap-4 cursor-pointer"
                        dir={isAr ? "rtl" : "ltr"}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <span className="font-mono text-xs text-[#B8873B] font-bold shrink-0 pt-0.5">
                            {String(faq.id).padStart(2, "0")}.
                          </span>
                          <div>
                            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C8477] block mb-1">
                              {isAr ? faq.sectionNameAr : faq.sectionNameEn}
                            </span>
                            <h3 className="font-display text-sm sm:text-base md:text-lg text-[#E8DFCE] font-normal leading-snug">
                              {isAr ? faq.questionAr : faq.questionEn}
                            </h3>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-xs text-[#B8873B] shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 bg-[#B8873B]/15 border-[#B8873B]" : ""
                          }`}
                        >
                          ↓
                        </div>
                      </button>

                      {/* Answer Accordion Body */}
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 sm:pb-6 pt-1 border-t border-white/5" dir={isAr ? "rtl" : "ltr"}>
                          <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] leading-relaxed mb-4">
                            {isAr ? faq.answerAr : faq.answerEn}
                          </p>

                          {faq.sourceUrl && (
                            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#8C8477] pt-3 border-t border-white/5">
                              <span>{isAr ? "المرجع النظامي:" : "Regulatory Source:"}</span>
                              <a
                                href={faq.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B8873B] hover:underline inline-flex items-center gap-1"
                              >
                                {faq.sourceLabel || (isAr ? "الهيئة العامة للعقار" : "Real Estate General Authority")} ↗
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ── PAGINATION CONTROLS ──────────────────────────────── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-10 sm:pt-12 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-xs font-mono text-[#E8DFCE] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#B8873B] transition-colors"
                  >
                    {isAr ? "السابق" : "Previous"}
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-[#B8873B] text-[#0B0C09] font-bold shadow-md shadow-[#B8873B]/20"
                            : "border border-white/10 bg-white/5 text-[#C5BCAD] hover:border-white/30"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-xs font-mono text-[#E8DFCE] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#B8873B] transition-colors"
                  >
                    {isAr ? "التالي" : "Next"}
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* ── 3. 10-STEP BUYER JOURNEY SECTION (DOWNWARD) ─────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-20 border-t border-b border-white/10 bg-[#0E100C]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8873B] block mb-2 sm:mb-3">
              {isAr ? "خارطة طريق التملك" : "End-to-End Roadmap"}
            </span>
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl text-[#E8DFCE] mb-3 sm:mb-4">
              {isAr ? "دليل المشتري الأجنبي: 10 خطوات من الاستشارة إلى الصك" : "The 10-Step Expat Buyer Journey in Saudi Arabia"}
            </h2>
            <p className="text-xs sm:text-sm text-[#C5BCAD] px-2">
              {isAr
                ? "عملية واضحة وموثوقة لضمان امتلاك أصول عقارية مطابقة لنظام تملك غير السعوديين بأعلى درجات الأمان."
                : "A seamless, compliant pathway ensuring your property acquisition adheres to all REGA, ZATCA, and Real Estate Registry standards."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {BUYER_JOURNEY_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#141611] hover:border-[#B8873B]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-md bg-[#B8873B]/10 border border-[#B8873B]/30 flex items-center justify-center text-[#B8873B] font-mono text-xs font-bold mb-3">
                    {String(item.step).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-xs sm:text-sm text-[#E8DFCE] font-semibold mb-1.5 sm:mb-2">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#8C8477] leading-relaxed">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ADVISORY CTA BANNER ─────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-20 text-center relative">
        <div className="max-w-4xl mx-auto p-6 sm:p-12 md:p-14 rounded-3xl border border-[#B8873B]/40 bg-gradient-to-b from-[#B8873B]/15 via-[#141611] to-[#0B0C09] shadow-2xl relative overflow-hidden">
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl text-[#E8DFCE] mb-3 sm:mb-4">
            {isAr ? "هل ترغب في استشارة خاصة بفرصتك العقارية؟" : "Looking for Tailored Real Estate Advisory in Saudi Arabia?"}
          </h2>
          <p className="text-xs sm:text-sm text-[#C5BCAD] max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            {isAr
              ? "مستشارو صهيب العقارية معتمدون من الهيئة العامة للعقار (رخصة فال) لمساعدتك في اختيار العقار الأنسب، التحقق من الصكوك، وإنهاء إجراءات التملك بسلاسة."
              : "Asaheeb Real Estate advisors are REGA-licensed to guide you through curated luxury villas, commercial land, and off-plan assets across Jeddah & Riyadh."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href={getWhatsAppLink("Hello Asaheeb Real Estate, I reviewed your Expat Real Estate Guide and would like to speak with an investment advisor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-[#B8873B] text-[#0B0C09] font-mono text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#c99544] transition-all shadow-lg shadow-[#B8873B]/20 text-center"
            >
              {isAr ? "محادثة واتساب فورية" : "WhatsApp Direct Advisory"}
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 border border-white/20 text-[#E8DFCE] font-mono text-xs uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all text-center"
            >
              {isAr ? "حجز موعد استشارة" : "Schedule Meeting"}
            </Link>
          </div>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
