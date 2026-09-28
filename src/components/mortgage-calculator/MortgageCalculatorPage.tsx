"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
import { BANKS, MORTGAGE_CONFIG } from "./constants";
import {
  calculateFull,
  getMinDownPaymentPct,
  formatSAR,
  formatPct,
} from "./engine";
import type { MortgageResult } from "./engine";
import NationalityToggle from "./NationalityToggle";
import FirstHomeToggle from "./FirstHomeToggle";
import BankSelector from "./BankSelector";
import SliderInput, { PresetItem } from "./SliderInput";
import PaymentBreakdown from "./PaymentBreakdown";
import LeadModal from "./LeadModal";
import FinancingProcessSection from "./FinancingProcessSection";
import BankPartnersGrid from "./BankPartnersGrid";
import MortgageFaqSection from "./MortgageFaqSection";
import PrivateAdvisoryBanner from "./PrivateAdvisoryBanner";

const DEFAULT_PRICE = MORTGAGE_CONFIG.defaultPriceValue;
const DEFAULT_YEARS = MORTGAGE_CONFIG.defaultLoanPeriodYears;
const DEFAULT_BANK = BANKS[0].slug;

const DESTINATIONS = {
  jeddah: {
    key: "jeddah",
    nameEn: "Jeddah Waterfront",
    nameAr: "واجهة جدة البحرية",
    districtEn: "Corniche & Obhur Private Estates",
    districtAr: "قصور وفلل الكورنيش وأبحر",
    image: "/images/jeddah-luxury-estate.jpg",
    highlightEn: "Red Sea Coastal Mansions & Private Marinas",
    highlightAr: "قصور ساحلية على البحر الأحمر ومراسي خاصة",
    specsEn: "Prime Coastal Villa • Infinity Pool • Deep Water Berths",
    specsAr: "فيلا ساحلية فاخرة • مسبح لا متناهي • مراسي يخوت",
  },
  madinah: {
    key: "madinah",
    nameEn: "Madinah Heritage",
    nameAr: "رحاب المدينة المنورة",
    districtEn: "Central Luxury Penthouses & Hospitality",
    districtAr: "أجنحة الضيافة وبنتهاوس المنطقة المركزية",
    image: "/images/madinah-luxury-estate.jpg",
    highlightEn: "Panoramic Sacred City Views & Mashrabiya Design",
    highlightAr: "إطلالات بانورامية وتصاميم مشربية إسلامية معاصرة",
    specsEn: "Central Sky Penthouse • Architectural Marble • Haram Views",
    specsAr: "بنتهاوس سماوي مركزي • رخام معماري فاخر • إطلالات رحاب المدينة",
  },
} as const;

export default function MortgageCalculatorPage() {
  const { lang } = useLanguage();
  const isRTL = lang === "ar";

  // ── Destination Showcase State ────────────────────────────────────────────
  const [activeDestination, setActiveDestination] = useState<"jeddah" | "madinah">("jeddah");
  const currentDest = DESTINATIONS[activeDestination];

  // ── Calculator State ──────────────────────────────────────────────────────
  const [isCitizen, setIsCitizen] = useState<boolean>(true);
  const [isFirstHome, setIsFirstHome] = useState<boolean | null>(true);
  const [selectedBank, setSelectedBank] = useState<string>(DEFAULT_BANK);
  const [price, setPrice] = useState<number>(DEFAULT_PRICE);
  const [loanPeriodYears, setLoanPeriodYears] = useState<number>(DEFAULT_YEARS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Minimum down payment percentage based on citizen & first home status
  const minDownPct = getMinDownPaymentPct(isCitizen, isFirstHome);
  const maxDownPct = MORTGAGE_CONFIG.maxDownPaymentPct; // 90%

  // Maintain down payment percentage state so changing price doesn't break down payment
  const [downPaymentPct, setDownPaymentPct] = useState<number>(minDownPct);

  // Ensure effective down payment % is clamped between min and max
  const effectiveDownPct = Math.max(minDownPct, Math.min(maxDownPct, downPaymentPct));

  // Actual SAR amounts
  const minDownAmount = Math.round(price * (minDownPct / 100));
  const maxDownAmount = Math.round(price * (maxDownPct / 100));
  const downPaymentAmount = Math.round(price * (effectiveDownPct / 100));

  const handleNationalityChange = (newIsCitizen: boolean) => {
    setIsCitizen(newIsCitizen);
    const nextFirstHome = newIsCitizen ? true : null;
    setIsFirstHome(nextFirstHome);
    const nextMinPct = getMinDownPaymentPct(newIsCitizen, nextFirstHome);
    setDownPaymentPct((prev) => Math.max(nextMinPct, prev));
  };

  const handleFirstHomeChange = (newIsFirstHome: boolean) => {
    setIsFirstHome(newIsFirstHome);
    const nextMinPct = getMinDownPaymentPct(isCitizen, newIsFirstHome);
    setDownPaymentPct((prev) => Math.max(nextMinPct, prev));
  };

  const handleDownPaymentAmountChange = (newAmount: number) => {
    const clamped = Math.max(minDownAmount, Math.min(maxDownAmount, newAmount));
    if (price > 0) {
      setDownPaymentPct((clamped / price) * 100);
    }
  };

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
  };

  // ── Live Calculation ──────────────────────────────────────────────────────
  const result: MortgageResult | null = useMemo(() => {
    if (price <= 0 || downPaymentAmount <= 0) return null;
    return calculateFull({
      price,
      downPaymentAmount,
      loanPeriodYears,
      bankSlug: selectedBank,
      isCitizen,
      isFirstHome,
    });
  }, [price, downPaymentAmount, loanPeriodYears, selectedBank, isCitizen, isFirstHome]);

  const maxPriceBound = Math.max(MORTGAGE_CONFIG.maxPriceValue, price);
  const selectedBankObj = BANKS.find((b) => b.slug === selectedBank);

  // ── Presets for quick 1-tap adjustment ─────────────────────────────────────
  const pricePresets: PresetItem[] = [
    { label: isRTL ? "٥٠٠ ألف" : "500K", value: 500_000 },
    { label: isRTL ? "١ مليون" : "1M", value: 1_000_000 },
    { label: isRTL ? "١.٥ مليون" : "1.5M", value: 1_500_000 },
    { label: isRTL ? "٢.٥ مليون" : "2.5M", value: 2_500_000 },
    { label: isRTL ? "٥ مليون" : "5M", value: 5_000_000 },
    { label: isRTL ? "١٠ مليون" : "10M", value: 10_000_000 },
  ];

  const downPresets: PresetItem[] = [10, 15, 20, 30, 50]
    .filter((pct) => pct >= minDownPct)
    .map((pct) => ({
      label: `${pct}%`,
      value: Math.round(price * (pct / 100)),
    }));

  const loanPeriodPresets: PresetItem[] = [5, 10, 15, 20, 25].map((years) => ({
    label: isRTL ? `${years} ${years <= 10 ? "سنوات" : "سنة"}` : `${years} Yrs`,
    value: years,
  }));

  return (
    <>
      <main
        id="mortgage-calculator-main"
        className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0 w-full max-w-full overflow-x-clip"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <PageNav />

        {/* ── LUXURY HERO BANNER & JEDDAH / MADINAH ARCHITECTURAL SHOWCASE ── */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-full">
          {/* Subtle warm ambient golden glow behind hero */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#B8873B]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto min-w-0 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* Left Column: Heading, Subtitle & SAMA Guidelines */}
              <div className={`lg:col-span-7 ${isRTL ? "text-right" : "text-left"}`}>
                {/* Portal Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 border rounded-full backdrop-blur-md"
                  style={{ borderColor: "rgba(184,135,59,0.35)", backgroundColor: "rgba(18,19,15,0.85)" }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
                    {isRTL ? "حاسبة التمويل العقاري • جدة والمدينة المنورة" : "SAMA Approved • Jeddah & Madinah Advisory"}
                  </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal leading-[1.14] tracking-[-0.02em] mb-4"
                >
                  {isRTL ? (
                    <>
                      موّل عقارك الساحلي والفاخر في{" "}
                      <span className="italic text-[#B8873B]">جدة والمدينة المنورة</span>
                    </>
                  ) : (
                    <>
                      Finance Your Premier Residence in{" "}
                      <span className="italic text-[#B8873B]">Jeddah & Madinah</span>
                    </>
                  )}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-sans text-xs sm:text-sm text-[#C5BCAD] leading-relaxed max-w-xl mb-5 sm:mb-6"
                >
                  {isRTL
                    ? "استشارات تمويل عقاري معتمدة لقصور وفلل البحر الأحمر بجدة وأجنحة الضيافة الراقية بالمدينة المنورة. قارن هوامش ربح ١٠ بنوك سعودية متوافقة ١٠٠٪ مع الشريعة الإسلامية واحصل على استشارة فورية."
                    : "Bespoke mortgage advisory tailored for Jeddah Corniche waterfront villas, Obhur private estates, and luxury Madinah residences. Compare live profit rates across 10 approved Saudi banks with real-time feedback."}
                </motion.p>

                {/* SAMA Key Guidelines Dashboard: Refined Luxury Design */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-xl"
                >
                  <div className="p-3 sm:p-3.5 border rounded-sm border-[rgba(184,135,59,0.28)] bg-gradient-to-b from-[rgba(184,135,59,0.08)] to-[rgba(18,19,15,0.75)] backdrop-blur-md flex flex-col justify-center">
                    <span className="text-[10px] font-sans font-medium text-[#8C8477] uppercase tracking-wider">
                      {isRTL ? "الدفعة الأولى" : "Min Down"}
                    </span>
                    <span className="text-base sm:text-lg font-display font-bold text-[#B8873B] mt-0.5">
                      10% <span className="text-[10px] font-sans text-[#8C8477] font-normal hidden sm:inline">({isRTL ? "للمواطن" : "Citizen"})</span>
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 border rounded-sm border-[rgba(184,135,59,0.28)] bg-gradient-to-b from-[rgba(184,135,59,0.08)] to-[rgba(18,19,15,0.75)] backdrop-blur-md flex flex-col justify-center">
                    <span className="text-[10px] font-sans font-medium text-[#8C8477] uppercase tracking-wider">
                      {isRTL ? "أطول فترة سداد" : "Max Tenure"}
                    </span>
                    <span className="text-base sm:text-lg font-display font-bold text-[#E8DFCE] mt-0.5">
                      25 {isRTL ? "سنة" : "Years"}
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 border rounded-sm border-[rgba(184,135,59,0.28)] bg-gradient-to-b from-[rgba(184,135,59,0.08)] to-[rgba(18,19,15,0.75)] backdrop-blur-md flex flex-col justify-center">
                    <span className="text-[10px] font-sans font-medium text-[#8C8477] uppercase tracking-wider">
                      {isRTL ? "بنوك معتمدة" : "Regulated"}
                    </span>
                    <span className="text-base sm:text-lg font-display font-bold text-[#B8873B] mt-0.5">
                      10 {isRTL ? "بنوك" : "SAMA Banks"}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: BESPOKE ARCHITECTURAL SHOWCASE (JEDDAH & MADINAH) */}
              <div className="lg:col-span-5 flex flex-col gap-2.5">
                {/* Interactive Destination Switcher */}
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <button
                    type="button"
                    onClick={() => setActiveDestination("jeddah")}
                    className={`px-3 py-1.5 text-xs font-sans rounded-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${
                      activeDestination === "jeddah"
                        ? "bg-[#B8873B] text-[#12130F] font-bold border-[#B8873B] shadow-[0_0_12px_rgba(184,135,59,0.4)]"
                        : "bg-[rgba(18,19,15,0.85)] text-[#C5BCAD] border-[rgba(184,135,59,0.25)] hover:border-[#B8873B]"
                    }`}
                  >
                    <span>🌊</span>
                    <span>{isRTL ? "واجهة جدة البحرية" : "Jeddah Waterfront"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDestination("madinah")}
                    className={`px-3 py-1.5 text-xs font-sans rounded-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${
                      activeDestination === "madinah"
                        ? "bg-[#B8873B] text-[#12130F] font-bold border-[#B8873B] shadow-[0_0_12px_rgba(184,135,59,0.4)]"
                        : "bg-[rgba(18,19,15,0.85)] text-[#C5BCAD] border-[rgba(184,135,59,0.25)] hover:border-[#B8873B]"
                    }`}
                  >
                    <span>🏛️</span>
                    <span>{isRTL ? "رحاب المدينة المنورة" : "Madinah Heritage"}</span>
                  </button>
                </div>

                {/* Showcase Image Frame */}
                <motion.div
                  key={activeDestination}
                  initial={{ opacity: 0.3, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-64 sm:h-72 lg:h-[350px] rounded-sm overflow-hidden border border-[#B8873B]/45 shadow-[0_16px_40px_rgba(0,0,0,0.8)] group"
                >
                  <Image
                    src={currentDest.image}
                    alt={isRTL ? currentDest.districtAr : currentDest.districtEn}
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105 brightness-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 42vw"
                  />

                  {/* Delicate subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#B8873B]/30 pointer-events-none" />

                  {/* Top Badge: District Location */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 text-[10px] font-sans tracking-wide uppercase bg-[#12130F]/90 border border-[#B8873B]/60 text-[#B8873B] font-bold rounded-xs backdrop-blur-md shadow-md">
                      {isRTL ? currentDest.districtAr : currentDest.districtEn}
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs font-sans text-[#E8DFCE] bg-[#12130F]/85 backdrop-blur-md px-3.5 py-2 rounded-sm border border-[rgba(184,135,59,0.3)] shadow-md">
                    <span className="truncate mr-2 font-medium">
                      {isRTL ? currentDest.specsAr : currentDest.specsEn}
                    </span>
                    <span className="text-[#B8873B] font-bold shrink-0 text-[10px] tracking-wider uppercase font-mono">
                      100% SHARIA
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CALCULATOR BODY ────────────────────────────────────────────── */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 pb-16 sm:pb-20 max-w-full">

          {/* ── UNIFIED CALCULATOR & BREAKDOWN GRID ───────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start min-w-0">

            {/* ── LEFT (3 Cols on Desktop / Top on Mobile): Calculator Controls ── */}
            <div className="lg:col-span-3 min-w-0">
              <div
                className="border rounded-sm p-4 sm:p-7 flex flex-col gap-5 sm:gap-6 shadow-xl"
                style={{
                  borderColor: "rgba(184,135,59,0.25)",
                  backgroundColor: "rgba(18,19,15,0.85)",
                  backdropFilter: "blur(14px)",
                }}
              >
                {/* Live Monthly Quick Indicator Banner (Always at top of controls) */}
                <div
                  className="p-3.5 sm:p-4 rounded-sm border border-[rgba(184,135,59,0.35)] bg-[rgba(18,19,15,0.92)] relative overflow-hidden"
                  style={{
                    boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-20 blur-xl"
                    style={{ background: "radial-gradient(circle at top right, #B8873B 0%, transparent 70%)" }}
                  />

                  <div className={`flex items-center justify-between pb-2 border-b border-[rgba(184,135,59,0.15)] ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C8477]">
                      {isRTL ? "القسط الشهري التقديري المباشر" : "Estimated Monthly Payment"}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#B8873B]/40 text-[#B8873B] bg-[#12130F]">
                      {selectedBankObj ? (isRTL ? selectedBankObj.nameAr : selectedBankObj.nameEn) : ""}{result ? ` • ${formatPct(result.appliedRatePct)}% APR` : ""}
                    </span>
                  </div>

                  <div className={`py-2 sm:py-2.5 flex items-baseline justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div>
                      <span className="text-2xl sm:text-3xl font-display font-bold text-[#B8873B] tracking-tight">
                        {result ? `SAR ${formatSAR(result.monthlyInstalment)}` : "—"}
                      </span>
                      <span className="text-xs font-mono font-normal text-[#C5BCAD] ml-1.5">
                        {isRTL ? "/ شهرياً" : "/ month"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#B8873B] hover:bg-[#c79748] text-[#12130F] font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-bold rounded-xs transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      {isRTL ? "تقديم طلب ↗" : "Apply ↗"}
                    </button>
                  </div>

                  {/* 3 mini stats */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[rgba(184,135,59,0.1)] text-center">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#8C8477] block">
                        {isRTL ? "مبلغ القرض" : "Loan Amount"}
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#E8DFCE]">
                        {result ? `${(result.totalLoanAmount / 1_000_000).toFixed(2)}M` : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#8C8477] block">
                        {isRTL ? "الدفعة الأولى" : "Down Payment"}
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#E8DFCE]">
                        {effectiveDownPct.toFixed(0)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#8C8477] block">
                        {isRTL ? "معدل الربح" : "Applied Rate"}
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#B8873B]">
                        {result ? `${formatPct(result.appliedRatePct)}%` : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nationality & First Home Filters in Balanced Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[rgba(184,135,59,0.12)] min-w-0">
                  <NationalityToggle
                    isCitizen={isCitizen}
                    onChange={handleNationalityChange}
                    isRTL={isRTL}
                  />

                  {isCitizen ? (
                    <FirstHomeToggle
                      isFirstHome={isFirstHome === true}
                      onChange={handleFirstHomeChange}
                      isRTL={isRTL}
                    />
                  ) : (
                    <div className="flex flex-col gap-2 opacity-60">
                      <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8C8477] font-semibold">
                          {isRTL ? "المقيمين والأجانب" : "Non-Saudi Guidelines"}
                        </span>
                        <span className="text-[10px] font-mono text-[#8C8477]">
                          {isRTL ? "دفعة ٣٠٪ نظاماً" : "30% Down Mandatory"}
                        </span>
                      </div>
                      <div className="px-3 py-2 border rounded-sm border-[rgba(184,135,59,0.15)] bg-[rgba(18,19,15,0.4)] text-[11px] font-mono text-[#8C8477]">
                        {isRTL
                          ? "تخضع لضوابط تملك غير السعوديين للعقار"
                          : "Subject to Expat Property Ownership Regulations"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bank Selector */}
                <div className="min-w-0 max-w-full">
                  <BankSelector
                    selectedSlug={selectedBank}
                    onSelect={setSelectedBank}
                    isRTL={isRTL}
                  />
                </div>

                <div className="h-px bg-[rgba(184,135,59,0.12)]" />

                {/* Property Price Slider */}
                <SliderInput
                  id="price-slider"
                  label="Property Price"
                  labelAr="سعر العقار"
                  value={price}
                  min={MORTGAGE_CONFIG.minPriceValue}
                  max={maxPriceBound}
                  step={25_000}
                  prefix="SAR"
                  onChange={handlePriceChange}
                  presets={pricePresets}
                  isRTL={isRTL}
                />

                {/* Down Payment Slider */}
                <SliderInput
                  id="down-payment-slider"
                  label="Down Payment"
                  labelAr="الدفعة الأولى"
                  value={downPaymentAmount}
                  min={minDownAmount}
                  max={maxDownAmount}
                  step={10_000}
                  prefix="SAR"
                  badge={`${effectiveDownPct.toFixed(0)}%`}
                  onChange={handleDownPaymentAmountChange}
                  presets={downPresets}
                  isRTL={isRTL}
                />

                {/* Loan Period Slider (No SAR prefix) */}
                <SliderInput
                  id="loan-period-slider"
                  label="Loan Period"
                  labelAr="مدة القرض"
                  value={loanPeriodYears}
                  min={MORTGAGE_CONFIG.minLoanPeriodYears}
                  max={MORTGAGE_CONFIG.maxLoanPeriodYears}
                  step={1}
                  suffix={isRTL ? "سنة" : "Yrs"}
                  onChange={(val) => setLoanPeriodYears(val)}
                  presets={loanPeriodPresets}
                  isRTL={isRTL}
                />
              </div>
            </div>

            {/* ── RIGHT (2 Cols on Desktop / Directly Below Controls on Mobile): Complete Payment Breakdown ── */}
            <div className="lg:col-span-2 lg:sticky lg:top-24 min-w-0 w-full">
              <div
                className="border rounded-sm p-5 sm:p-8 shadow-xl"
                style={{
                  borderColor: "rgba(184,135,59,0.25)",
                  backgroundColor: "rgba(18,19,15,0.85)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <div className="mb-4 pb-3 border-b border-[rgba(184,135,59,0.15)] flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#B8873B] font-semibold">
                    {isRTL ? "تفاصيل التمويل والأقساط" : "Financing & Payment Breakdown"}
                  </span>
                  <span className="text-[9px] font-mono text-[#8C8477]">
                    {selectedBankObj ? (isRTL ? selectedBankObj.nameAr : selectedBankObj.nameEn) : ""}
                  </span>
                </div>

                <PaymentBreakdown
                  result={result}
                  isRTL={isRTL}
                  onApply={() => setIsModalOpen(true)}
                />
              </div>
            </div>
          </div>


          {/* ── Pure Gold Theme Trust Badges (Zero system emojis) ─────────── */}
          <div className={`mt-10 flex flex-wrap gap-2.5 sm:gap-3 items-center justify-center ${isRTL ? "flex-row-reverse" : ""}`}>
            {[
              {
                icon: (
                  <svg className="w-4 h-4 text-[#B8873B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z" />
                  </svg>
                ),
                en: "10 SAMA Approved Banks",
                ar: "١٠ بنوك معتمدة من ساما",
              },
              {
                icon: (
                  <svg className="w-4 h-4 text-[#B8873B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                en: "Real-Time Calculations",
                ar: "حسابات تقديرية مباشرة",
              },
              {
                icon: (
                  <svg className="w-4 h-4 text-[#B8873B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                en: "Private & Confidential",
                ar: "سرية تامة وأمان",
              },
              {
                icon: (
                  <svg className="w-4 h-4 text-[#B8873B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                en: "Rapid Preliminary Sanction",
                ar: "موافقات مبدئية سريعة",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-sm text-[11px] sm:text-xs text-[#C5BCAD] font-mono tracking-wide ${isRTL ? "flex-row-reverse" : ""}`}
                style={{ borderColor: "rgba(184,135,59,0.2)", backgroundColor: "rgba(18,19,15,0.6)" }}
              >
                <span>{item.icon}</span>
                <span>{isRTL ? item.ar : item.en}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── RICH CONTENT SECTIONS ──────────────────────────────────────── */}

        {/* Section 1: 4-Step Financing Roadmap with Architecture Showcase Card */}
        <FinancingProcessSection
          isRTL={isRTL}
          onApply={() => setIsModalOpen(true)}
        />

        {/* Section 2: 10 SAMA Regulated Banks Matrix */}
        <BankPartnersGrid
          selectedSlug={selectedBank}
          onSelectBank={(slug) => setSelectedBank(slug)}
          isRTL={isRTL}
        />

        {/* Section 3: SAMA Mortgage Knowledge Base / FAQs */}
        <MortgageFaqSection isRTL={isRTL} />

        {/* Section 4: Private Advisory Desk Callout with Backdrop Image */}
        <PrivateAdvisoryBanner
          onContact={() => setIsModalOpen(true)}
          isRTL={isRTL}
        />

        <PageFooter />
        <MobileBottomNav />
      </main>

      {/* Lead Submission Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        result={result}
        price={price}
        downPaymentAmount={downPaymentAmount}
        loanPeriodYears={loanPeriodYears}
        bankSlug={selectedBank}
        isCitizen={isCitizen}
        isFirstHome={isFirstHome}
        isRTL={isRTL}
      />
    </>
  );
}
