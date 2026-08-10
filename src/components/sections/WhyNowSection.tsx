"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function WhyNowSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const REASONS = [
    {
      iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      titleEn: "Pre-peak pricing",
      titleAr: "أسعار ما قبل الذروة",
      bodyEn: "Land near mega-projects is priced today for what it is — not for what it's about to become. That window closes fast.",
      bodyAr: "أسعار الأراضي القريبة من المشاريع العملاقة تعكس وضعها الراهن — لا ما ستصبح عليه قريباً. هذه الفرصة لن تدوم.",
    },
    {
      iconPath: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
      titleEn: "Legal foreign ownership",
      titleAr: "تملك أجنبي قانوني",
      bodyEn: "Saudi Arabia now allows foreign real estate ownership in key zones under Vision 2030 reforms. The regulatory door is open.",
      bodyAr: "تتيح المملكة الآن للأجانب تملك العقارات في مناطق رئيسية ضمن إصلاحات رؤية 2030. الباب التنظيمي مفتوح.",
    },
    {
      iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      titleEn: "SAR-pegged stability",
      titleAr: "استقرار الريال السعودي",
      bodyEn: "The Saudi Riyal is pegged to the USD — no currency volatility risk for international investors.",
      bodyAr: "الريال السعودي مرتبط بالدولار الأمريكي — بلا مخاطر تقلب العملة للمستثمر الدولي.",
    },
  ];

  return (
    <section
      id="section-why-now"
      className="relative w-full py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#060809" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,135,59,0.2) 50%, transparent)" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: Statement */}
          <div className={isAr ? "text-right lg:order-2" : ""}>
            <div className={`flex items-center gap-3 mb-8 ${isAr ? "justify-end" : ""}`}>
              <div className="h-px w-10 bg-[#B8873B]/40" />
              <span className="font-mono text-[9px] tracking-[0.36em] uppercase text-[#B8873B]">
                {isAr ? "العقار الآن" : "Why Real Estate, Why Now"}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal tracking-[-0.02em] leading-[1.1] mb-8">
              {isAr ? (
                <>
                  السؤال ليس{" "}
                  <span className="italic text-[#B8873B]">إذا كانت المملكة ستنمو.</span>
                  <br />بل هل ستملك جزءاً منها
                  <br />قبل أن يلتفت الجميع؟
                </>
              ) : (
                <>
                  The question isn&apos;t{" "}
                  <span className="italic text-[#B8873B]">whether Saudi Arabia will grow.</span>
                  <br />It&apos;s whether you&apos;ll own
                  <br />a piece before everyone notices.
                </>
              )}
            </h2>

            <p className="font-sans text-sm text-[#8C8477] leading-[1.9]">
              {isAr
                ? "العقار السعودي يُسعَّر اليوم وفق قيمته الحالية — لا وفق إمكاناته المستقبلية. النافذة لا تزال مفتوحة."
                : "Saudi real estate is priced today for what it is — not for what it's about to become. The window is still open."}
            </p>
          </div>

          {/* Right: Reasons */}
          <div className={`space-y-0 ${isAr ? "lg:order-1" : ""}`}>
            {REASONS.map((r, i) => (
              <div
                key={i}
                className={`flex gap-5 py-7 ${i < REASONS.length - 1 ? "border-b border-[rgba(255,255,255,0.06)]" : ""} group cursor-default`}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 flex-shrink-0 border flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:border-[#B8873B]/50"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(184,135,59,0.04)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8873B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={r.iconPath} />
                  </svg>
                </div>

                {/* Text */}
                <div className={isAr ? "text-right" : ""}>
                  <h3 className="font-display text-lg text-[#E8DFCE] font-normal mb-1.5">
                    {isAr ? r.titleAr : r.titleEn}
                  </h3>
                  <p className="font-sans text-sm text-[#8C8477] leading-[1.8]">
                    {isAr ? r.bodyAr : r.bodyEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
