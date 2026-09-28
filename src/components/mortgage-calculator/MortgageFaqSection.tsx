"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface MortgageFaqSectionProps {
  isRTL?: boolean;
}

export default function MortgageFaqSection({ isRTL = false }: MortgageFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: "What is the minimum down payment required under SAMA regulations?",
      qAr: "ما هو الحد الأدنى للدفعة الأولى وفقاً لتعليمات البنك المركزي السعودي (ساما)؟",
      aEn: "For Saudi citizens purchasing their first residential home (valued up to SAR 5M), the minimum down payment is 10%. For second homes or investment properties, the requirement is 30%. For non-Saudi residents/expats, the mandatory down payment is 30% of the purchase price.",
      aAr: "للمواطنين السعوديين الراغبين في شراء مسكنهم الأول (بقيمة تصل إلى ٥ ملايين ريال)، تبلغ الدفعة الأولى كحد أدنى ١٠٪. أما للمسكن الثاني أو العقارات الاستثمارية فتبلغ ٣٠٪. وبالنسبة للمقيمين غير السعوديين، تبلغ الدفعة الأولى النظامية ٣٠٪ من إجمالي قيمة العقار.",
    },
    {
      qEn: "How does the REDF (Real Estate Development Fund / Sakani) subsidy work?",
      qAr: "كيف تعمل آلية الدعم من صندوق التنمية العقارية (سكني)؟",
      aEn: "Eligible Saudi citizens receiving Sakani / REDF support benefit from subsidized profit margins (up to 100% subsidy depending on net monthly salary and family size) on loan amounts up to SAR 500,000, significantly decreasing your effective monthly instalment.",
      aAr: "يستفيد المواطنون المستحقون لدعم «سكني» وصندوق التنمية العقارية من دعم هوامش الربح التمويلي (يصل إلى دعم كامل ١٠٠٪ حسب فئة الدخل وعدد أفراد الأسرة) على مبالغ تمويل تصل إلى ٥٠٠,٠٠٠ ريال، مما يقلل القسط الشهري الفعلي بشكل كبير.",
    },
    {
      qEn: "What is the maximum Debt Burden Ratio (DTI) allowed on salary?",
      qAr: "ما هي النسبة القصوى للاستقطاع الشهري (معدل عبء الدين) من الراتب؟",
      aEn: "SAMA limits total monthly deductions (including credit cards, personal loans, and auto leases) to 55% of net monthly income for salaries below SAR 15,000, and up to 65% for salaries above SAR 15,000. For retirees, the cap is 40%.",
      aAr: "يحدد البنك المركزي السعودي سقف استقطاع الالتزامات الشهرية الإجمالية (تشمل البطاقات، القروض الشخصية، وتمويل السيارات) بنسبة ٥٥٪ من صافي الراتب للرواتب الأقل من ١٥ ألف ريال، وحتى ٦٥٪ للرواتب التي تزيد عن ١٥ ألف ريال، وبنسبة ٤٠٪ للمتقاعدين.",
    },
    {
      qEn: "What is the difference between Murabaha and Ijarah financing?",
      qAr: "ما الفرق بين التمويل بصيغة «المرابحة» وصيغة «الإجارة المنتهية بالتمليك»؟",
      aEn: "Murabaha provides a fixed profit rate and constant monthly payments across the entire loan duration, ensuring full predictability. Ijarah involves leasing the property with a variable benchmark (such as SAIBOR) and transferring legal deed ownership upon completion of all lease payments.",
      aAr: "المرابحة تقدم هامش ربح ثابت وقسطاً شهرياً لا يتغير طوال فترة التمويل، مما يمنح استقراراً مالياً تاماً. أما الإجارة المنتهية بالتمليك فتقوم على عقد إيجار بهامش متغير يرتبط بمؤشر السايبور (SAIBOR) مع انتقال ملكية الصك بعد سداد كامل الدفعات.",
    },
    {
      qEn: "Can off-plan (Wafi-licensed) properties be financed through these banks?",
      qAr: "هل يمكن تمويل العقارات على الخارطة (المرخصة من منصة وافي)؟",
      aEn: "Yes. Major Saudi banks (including Al Rajhi, SNB, Riyad Bank, and BSF) partner with certified Wafi developers. Financing disbursements are made in milestone installments directly to the project's escrow account as construction milestones are verified.",
      aAr: "نعم، تتيح البنوك السعودية الرائدة (مثل الراجحي، الأهلي، الرياض، والفرنسي) تمويل مشاريع البيع على الخارطة المعتمدة من برنامج «وافي»، حيث يتم صرف دفعات التمويل تدريجياً في حساب الضمان البنكي للمشروع بالتزامن مع نسب الإنجاز.",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-8 lg:px-16 xl:px-24 border-t border-[rgba(184,135,59,0.12)] overflow-hidden max-w-full">
      <div className="max-w-4xl mx-auto min-w-0">
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
              {isRTL ? "الأسئلة الشائعة" : "Knowledge Base"}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE] font-normal leading-tight">
            {isRTL ? (
              <>
                كل ما تحتاج معرفته عن{" "}
                <span className="italic text-[#B8873B]">أنظمة التمويل العقاري</span>
              </>
            ) : (
              <>
                Key Regulations &{" "}
                <span className="italic text-[#B8873B]">Frequently Asked Questions</span>
              </>
            )}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] mt-2 leading-relaxed">
            {isRTL
              ? "إجابات معتمدة وفق أحدث ضوابط البنك المركزي السعودي (ساما) وبرامج الدعم السكني."
              : "Clear answers based on latest SAMA frameworks and official REDF subsidy parameters."}
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="border rounded-sm transition-all duration-200 overflow-hidden"
                style={{
                  borderColor: isOpen ? "rgba(184,135,59,0.4)" : "rgba(184,135,59,0.15)",
                  backgroundColor: isOpen ? "rgba(18,19,15,0.85)" : "rgba(18,19,15,0.5)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                    isRTL ? "flex-row-reverse text-right" : ""
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className={`font-display text-sm sm:text-base font-medium ${isOpen ? "text-[#B8873B]" : "text-[#E8DFCE]"}`}>
                    {isRTL ? faq.qAr : faq.qEn}
                  </span>
                  <div
                    className="w-7 h-7 rounded-full border border-[rgba(184,135,59,0.25)] flex items-center justify-center shrink-0 text-[#B8873B] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm font-sans text-[#C5BCAD] leading-relaxed border-t border-[rgba(184,135,59,0.1)] ${isRTL ? "text-right" : "text-left"}`}>
                    <p>{isRTL ? faq.aAr : faq.aEn}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
