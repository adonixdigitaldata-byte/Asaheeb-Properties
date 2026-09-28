"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FinancingProcessSectionProps {
  isRTL?: boolean;
  onApply: () => void;
}

export default function FinancingProcessSection({
  isRTL = false,
  onApply,
}: FinancingProcessSectionProps) {
  const steps = [
    {
      step: "01",
      titleEn: "Compare & Customize",
      titleAr: "قارن العروض والفوائد",
      descEn: "Select from 10 SAMA-regulated banks, adjust down payment parameters, and determine your optimal loan tenure.",
      descAr: "اختر من بين ١٠ بنوك سعودية معتمدة من البنك المركزي (ساما)، وحدد الدفعة الأولى وفترة السداد الأمثل لميزانيتك.",
      // Pure gold SVG icon (no OS emojis)
      iconSvg: (
        <svg className="w-5 h-5 text-[#B8873B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      step: "02",
      titleEn: "Check REDF / Sakani Support",
      titleAr: "التحقق من دعم سكني وريف",
      descEn: "Evaluate profit-rate subsidies and government-backed matrix guarantees for eligible Saudi first-time homebuyers.",
      descAr: "تقييم أهليتك للحصول على دعم أرباح التمويل العقاري والضمانات المعتمدة من صندوق التنمية العقارية ومبادرات سكني.",
      iconSvg: (
        <svg className="w-5 h-5 text-[#B8873B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      step: "03",
      titleEn: "Fast-Track Taqeem Valuation",
      titleAr: "التقييم المعتمد والموافقة المبدئية",
      descEn: "Get certified valuation from accredited Taqeem appraisers and secure swift preliminary loan sanction with preferred banks.",
      descAr: "إجراء تقييم عقاري معتمد عبر مقيّمين مرخصين من «تقييم»، والحصول على الموافقة الائتمانية المبدئية في وقت قياسي.",
      iconSvg: (
        <svg className="w-5 h-5 text-[#B8873B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      step: "04",
      titleEn: "Electronic Deed & Ownership",
      titleAr: "الإفراغ الإلكتروني والتملّك",
      descEn: "Finalize electronic deed transfer via Najiz platform with full Sharia-compliant Murabaha or Ijarah contract signing.",
      descAr: "إتمام عملية الإفراغ الإلكتروني الفوري عبر منصة «ناجز» وتوقيع عقد التمويل المتوافق مع الشريعة واستلام صك ملكيتك.",
      iconSvg: (
        <svg className="w-5 h-5 text-[#B8873B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-16 xl:px-24 border-t border-[rgba(184,135,59,0.12)] overflow-hidden max-w-full">
      {/* Background glow bounded within container */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[250px] pointer-events-none opacity-[0.04] blur-2xl"
        style={{ background: "radial-gradient(ellipse at center, #B8873B 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto min-w-0">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-12 sm:mb-16 ${isRTL ? "text-right" : "text-left"}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border rounded-full" style={{ borderColor: "rgba(184,135,59,0.3)", backgroundColor: "rgba(18,19,15,0.7)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B]" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
              {isRTL ? "رحلة التمويل العقاري" : "Financing Roadmap"}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal leading-tight">
            {isRTL ? (
              <>
                كيف تضمن تمويل عقارك في{" "}
                <span className="italic text-[#B8873B]">٤ خطوات واضحة</span>
              </>
            ) : (
              <>
                How Property Financing Works in{" "}
                <span className="italic text-[#B8873B]">4 Straightforward Steps</span>
              </>
            )}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] mt-2 max-w-2xl leading-relaxed">
            {isRTL
              ? "نرافقك من أول عملية حسابية حتى استلام صك العقار بالتعاون مع كبرى البنوك والمؤسسات التمويلية في المملكة."
              : "We guide you from initial rate comparison through certified valuation to deed conveyance in partnership with top Saudi lending institutions."}
          </p>
        </motion.div>

        {/* Featured Showcase + Steps Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Architectural Feature Card (Real Saudi Luxury Property Image) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative rounded-sm overflow-hidden border min-h-[320px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-8 group"
            style={{
              borderColor: "rgba(184,135,59,0.3)",
              backgroundColor: "#161713",
            }}
          >
            <Image
              src="/images/projects/villa-jeddah.png"
              alt="Luxury Jeddah Obhur Villa"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-95"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12130F] via-[#12130F]/40 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="inline-block px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase bg-[#B8873B] text-[#12130F] font-bold rounded-xs">
                {isRTL ? "عقارات معتمدة للتمويل" : "Financing-Ready Assets"}
              </span>

              <h3 className="font-display text-xl sm:text-2xl text-[#E8DFCE]">
                {isRTL ? "فلل وقصور جدة والمدينة المنورة الفاخرة" : "Prime Jeddah Waterfront & Madinah Estates"}
              </h3>

              <p className="font-sans text-xs text-[#C5BCAD] leading-relaxed">
                {isRTL
                  ? "جميع المشاريع والوحدات العقارية المعروضة متوافقة مع متطلبات التمويل البنكي وتقييمات ساما."
                  : "All curated properties qualify for premier banking profit rates, REDF matrix subsidies, and expedited digital conveyancing."}
              </p>

              <button
                type="button"
                onClick={onApply}
                className="mt-2 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#B8873B] hover:text-[#E8DFCE] transition-colors cursor-pointer"
              >
                <span>{isRTL ? "استشر خبير التمويل الآن" : "Speak with a Mortgage Advisor"}</span>
                <span>{isRTL ? "←" : "→"}</span>
              </button>
            </div>
          </motion.div>

          {/* 4 Roadmap Step Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative border rounded-sm p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#B8873B]/50 hover:bg-[rgba(18,19,15,0.85)] group ${
                  isRTL ? "text-right" : "text-left"
                }`}
                style={{
                  borderColor: "rgba(184,135,59,0.18)",
                  backgroundColor: "rgba(18,19,15,0.65)",
                }}
              >
                <div>
                  <div className={`flex items-center justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="font-mono text-xl font-bold text-[#B8873B]/50 group-hover:text-[#B8873B] transition-colors">
                      {item.step}
                    </span>
                    <div className="p-2 rounded-sm bg-[#161713] border border-[rgba(184,135,59,0.2)] group-hover:border-[#B8873B]/40 transition-colors">
                      {item.iconSvg}
                    </div>
                  </div>

                  <h4 className="font-display text-base text-[#E8DFCE] mb-2 font-medium">
                    {isRTL ? item.titleAr : item.titleEn}
                  </h4>

                  <p className="font-sans text-xs text-[#8C8477] leading-relaxed group-hover:text-[#C5BCAD] transition-colors">
                    {isRTL ? item.descAr : item.descEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[rgba(184,135,59,0.1)] flex items-center justify-between text-[10px] font-mono text-[#8C8477]">
                  <span>{isRTL ? `المرحلة ٠${index + 1}` : `Phase 0${index + 1}`}</span>
                  <span className="text-[#B8873B] opacity-0 group-hover:opacity-100 transition-opacity">
                    {isRTL ? "تفاصيل ←" : "Details →"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
