"use client";

import { motion } from "framer-motion";
import { BANKS } from "./constants";

interface BankPartnersGridProps {
  selectedSlug: string;
  onSelectBank: (slug: string) => void;
  isRTL?: boolean;
}

export default function BankPartnersGrid({
  selectedSlug,
  onSelectBank,
  isRTL = false,
}: BankPartnersGridProps) {
  const bankDetails: Record<string, { typeEn: string; typeAr: string; featureEn: string; featureAr: string }> = {
    "emirates-nbd": {
      typeEn: "Commercial Bank",
      typeAr: "بنك تجاري",
      featureEn: "Competitive prime rates starting from 3.45%",
      featureAr: "أسعار تنافسية تبدأ من ٣.٤٥٪",
    },
    bsf: {
      typeEn: "Islamic & Commercial",
      typeAr: "إسلامي وتجاري",
      featureEn: "Flexible long-tenure structuring up to 25 yrs",
      featureAr: "حلول مرنة لفترات سداد ممتدة حتى ٢٥ سنة",
    },
    "al-jazira": {
      typeEn: "Fully Sharia-Compliant",
      typeAr: "متوافق مع الشريعة",
      featureEn: "Specialized in individual residential financing",
      featureAr: "متخصص في برامج تمويل الأفراد والفلل السكنية",
    },
    fab: {
      typeEn: "Regional Corporate & Retail",
      typeAr: "بنك إقليمي رائد",
      featureEn: "Tailored high-net-worth real estate solutions",
      featureAr: "حلول عقارية مخصصة لكبار العملاء والمستثمرين",
    },
    "al-rajhi": {
      typeEn: "Largest Islamic Lender",
      typeAr: "أكبر مصرف إسلامي",
      featureEn: "Nationwide branch network and Sakani integration",
      featureAr: "أكبر شبكة فروع وربط إلكتروني فوري مع سكني",
    },
    snb: {
      typeEn: "National Champion Bank",
      typeAr: "البنك الوطني (الأهلي)",
      featureEn: "Fast-track electronic approval and off-plan schemes",
      featureAr: "موافقات إلكترونية سريعة وبرامج البيع على الخارطة",
    },
    "riyad-bank": {
      typeEn: "Established National Bank",
      typeAr: "بنك وطني عريق",
      featureEn: "Comprehensive mortgage refinance options",
      featureAr: "خيارات شاملة لإعادة التمويل ونقل المديونية",
    },
    shl: {
      typeEn: "Mortgage Finance Company",
      typeAr: "شركة تمويل عقاري",
      featureEn: "Custom non-banking financing packages",
      featureAr: "باقات تمويلية متخصصة ومصممة للقطاع الخاص",
    },
    sab: {
      typeEn: "SAB (Saudi Awwal Bank)",
      typeAr: "البنك السعودي الأول",
      featureEn: "Global wealth & luxury residential financing",
      featureAr: "تمويل العقارات الفاخرة وإدارة الثروات العقارية",
    },
    "dar-al-tamleek": {
      typeEn: "Home Finance Specialist",
      typeAr: "دار التمليك للتمويل",
      featureEn: "Pioneer in REDF subsidy programs and housing trusts",
      featureAr: "رائدة برامج الدعم السكني وحلول التمويل الميسر",
    },
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-16 xl:px-24 border-t border-[rgba(184,135,59,0.12)] overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto min-w-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-12 ${isRTL ? "text-right" : "text-left"}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border rounded-full" style={{ borderColor: "rgba(184,135,59,0.3)", backgroundColor: "rgba(18,19,15,0.7)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B]" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
              {isRTL ? "شبكة الشركاء المعتمدين" : "Partner Institutions"}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE] font-normal leading-tight">
            {isRTL ? (
              <>
                ١٠ بنوك ومؤسسات تمويلية معتمدة من{" "}
                <span className="italic text-[#B8873B]">البنك المركزي السعودي (ساما)</span>
              </>
            ) : (
              <>
                10 Accredited Banks & Lenders Regulated by{" "}
                <span className="italic text-[#B8873B]">SAMA</span>
              </>
            )}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] mt-2 max-w-2xl leading-relaxed">
            {isRTL
              ? "اختر أي بنك لتجربة معدلاته فوراً في الحاسبة أعلاه. جميع البرامج متوافقة مع الضوابط الشرعية."
              : "Click any institution to test its rate matrix in the calculator above. All programs align with Sharia compliance standards."}
          </p>
        </motion.div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 min-w-0">
          {BANKS.map((b, idx) => {
            const isSelected = b.slug === selectedSlug;
            const details = bankDetails[b.slug] || {
              typeEn: "Licensed Bank",
              typeAr: "بنك معتمد",
              featureEn: "Comprehensive home financing",
              featureAr: "تمويل سكني متكامل",
            };

            return (
              <motion.div
                key={b.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => {
                  onSelectBank(b.slug);
                  document.getElementById("mortgage-calculator-main")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`border rounded-sm p-4 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[#B8873B] bg-[rgba(184,135,59,0.12)] shadow-[0_0_20px_rgba(184,135,59,0.2)] scale-[1.01]"
                    : "border-[rgba(184,135,59,0.18)] bg-[rgba(18,19,15,0.6)] hover:border-[#B8873B]/50 hover:bg-[rgba(18,19,15,0.85)]"
                } ${isRTL ? "text-right" : "text-left"}`}
              >
                <div>
                  <div className={`flex items-center justify-between mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-[rgba(184,135,59,0.25)] text-[#B8873B] bg-[#12130F]">
                      {isRTL ? details.typeAr : details.typeEn}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-pulse" />
                    )}
                  </div>

                  <h3 className="font-mono text-sm font-bold text-[#E8DFCE] uppercase mt-2">
                    {isRTL ? b.nameAr : b.nameEn}
                  </h3>

                  <p className="font-sans text-[11px] text-[#8C8477] mt-1.5 leading-snug">
                    {isRTL ? details.featureAr : details.featureEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[rgba(184,135,59,0.1)] flex items-center justify-between text-[10px] font-mono">
                  <span className={isSelected ? "text-[#B8873B] font-bold" : "text-[#8C8477]"}>
                    {isSelected ? (isRTL ? "مُحدد الآن" : "Selected") : (isRTL ? "احسب بهذا البنك" : "Select Bank")}
                  </span>
                  <span className="text-[#B8873B]">↗</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
