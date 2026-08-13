"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

function TermsContent() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const sectionsEn = [
    {
      title: "1. Acceptance of Terms & Regulatory Status",
      body: "By accessing or using the digital platforms, advisory services, or property listings of Asaheeb Real Estate (\"Asaheeb\", \"we\", \"our\", or \"us\"), you agree to be bound by these Terms of Use. Asaheeb operates as a licensed real estate brokerage and advisory firm under the regulatory oversight of the Real Estate General Authority (REERA) of the Kingdom of Saudi Arabia.",
    },
    {
      title: "2. Scope of Advisory & Brokerage Services",
      body: "Asaheeb provides curated real estate deal sourcing, 3D architectural visualization, market intelligence briefings, and transaction facilitation across Saudi Arabia (including Riyadh, Jeddah, Madinah, and Vision 2030 corridors). All materials presented are for informational and advisory evaluation purposes.",
    },
    {
      title: "3. Tax Obligations & Statutory Fees (RETT)",
      body: "All real estate acquisitions in the Kingdom of Saudi Arabia are subject to statutory regulations, including the Real Estate Transaction Tax (RETT) enforced by the Zakat, Tax and Customs Authority (ZATCA), typically levied at 5% of the transaction value unless exempt under statutory provisions. Buyers and investors are responsible for fulfilling their statutory tax and registration fees.",
    },
    {
      title: "4. Title Deed Verification & Due Diligence",
      body: "While Asaheeb conducts rigorous 40-point title deed checks, zoning clearance, and developer verification for curated assets, clients are advised that final legal title transfers are subject to official verification by the Ministry of Justice, Notary Public Courts, and RERA digital portals (such as Ihkam and Ejar).",
    },
    {
      title: "5. Intellectual Property Rights",
      body: "All original content, 3D luxury villa models, interactive showcases, market intelligence reports, brand marks, and software scripts displayed on Asaheeb platforms are the exclusive intellectual property of Asaheeb Real Estate. Unauthorized reproduction, extraction, or commercial exploitation is strictly prohibited under KSA copyright laws.",
    },
    {
      title: "6. Investment Risk & Limitation of Liability",
      body: "Real estate investments carry market risks, including market fluctuations, yield variations, and infrastructure development timelines. Historical yield data or projected returns discussed in advisory briefings do not constitute guaranteed financial returns. Asaheeb shall not be liable for indirect, consequential, or speculative losses arising from investment decisions.",
    },
    {
      title: "7. User Conduct & Inquiries",
      body: "Users agree to submit accurate contact details, maintain respectful communications with advisory representatives, and refrain from utilizing our platforms for unlawful, fraudulent, or speculative misrepresentation.",
    },
    {
      title: "8. Governing Law & Dispute Resolution",
      body: "These Terms of Use are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. Any disputes arising out of or in connection with our services shall be submitted to the exclusive jurisdiction of the competent courts in Jeddah, or settled via RERA-approved arbitration procedures.",
    },
  ];

  const sectionsAr = [
    {
      title: "١. القبول بالشروط والصفة التنظيمية",
      body: "بوصولك واستخدامك للمنصات الرقمية، أو الخدمات الاستشارية، أو القوائم العقارية التابعة لشركة أصاهيب العقارية (\"أصاهيب\"، \"نحن\")، فإنك توافق على الالتزام بشروط الاستخدام هذه. تعمل أصاهيب كشركة وساطة واستشارات عقارية مرخصة ومسجلة تحت إشراف الهيئة العامة للعقار في المملكة العربية السعودية.",
    },
    {
      title: "٢. نطاق الخدمات الاستشارية والوساطة",
      body: "تقدم أصاهيب خدمات تنسيق الفرص العقارية المتميزة، والنمذجة المعمارية ثلاثية الأبعاد، وتقارير ذكاء السوق، وتسهيل الصفقات عبر مناطق المملكة (بما فيها الرياض، جدة، المدينة المنورة، ومحاور رؤية 2030). جميع المواد المعروضة مخصصة لأغراض التقييم والاستشارة.",
    },
    {
      title: "٣. التزامات ضريبة التصرفات العقارية (RETT)",
      body: "تخضع جميع عمليات الاستحواذ العقاري في المملكة العربية السعودية للأنظمة الحكومية، بما فيها ضريبة التصرفات العقارية المطبقة من قبل هيئة الزكاة والضريبة والجمارك (زاتكا) بنسبة 5% من قيمة الصفقة ما لم ينص القانون على استثناء. يتحمل المشتري/المستثمر التكاليف والرسوم النظامية.",
    },
    {
      title: "٤. التحقق من الصكوك والعناية الواجبة",
      body: "بينما تجري أصاهيب فحصاً دقيقاً لـ 40 نقطة قانونية وفنية للصكوك والتراخيص والمخططات، فإن نقل الملكية النهائي يخضع للمصادقة الرسمية من وزارة العدل، وكتابات العدل، والمنصات الرقمية المعتمدة (مثل إحكام وإيجار).",
    },
    {
      title: "٥. حقوق الملكية الفكرية",
      body: "جميع المحتويات الأصلية، والنماذج ثلاثية الأبعاد للفلل الفاخرة، وتقارير ذكاء السوق، والعلامات التجارية المعروضة على منصات أصاهيب هي ملكية فكرية حصرية لشركة أصاهيب العقارية. يُحظر تماماً إعادة الإنتاج أو الاستغلال التجاري بدون إذن كتابي مسبق.",
    },
    {
      title: "٦. مخاطر الاستثمار وحدود المسؤولية",
      body: "تنطوي الاستثمارات العقارية على مخاطر السوق مثل تقلبات الأسعار والجداول الزمنية للبنية التحتية. لا تشكل العوائد التاريخية أو التقديرية ضماناً مالياً مطلقاً. لا تتحمل أصاهيب المسؤولية عن أي خسائر غير مباشرة أو ناتجة عن قرارات استثمارية فردية.",
    },
    {
      title: "٧. سلوك المستخدم والاستفسارات",
      body: "يتعهد المستخدم بتقديم بيانات تواصل دقيقة، والالتزام بالتواصل المهني مع مستشاري الشركة، وعدم استخدام المنصة لأي أغراض غير نظامية.",
    },
    {
      title: "٨. القانون الواجب التطبيق والاختصاص القضائي",
      body: "تخضع شروط الاستخدام هذه وتُفسر وفقاً للأنظمة واللوائح المتبعة في المملكة العربية السعودية. تُحال أي نزاعات قد تنشأ إلى المحاكم المختصة في مدينة جدة أو عبر إجراءات التحكيم المعتمدة من الهيئة العامة للعقار.",
    },
  ];

  const currentSections = isAr ? sectionsAr : sectionsEn;

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* Header Banner */}
      <section className="relative pt-28 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8477] mb-6 ${isAr ? "flex-row-reverse text-right" : ""}`}>
            <Link href="/" className="hover:text-[#B8873B] transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
            <span>/</span>
            <span className="text-[#E8DFCE]">{isAr ? "الشروط والأحكام" : "Terms of Use"}</span>
          </div>

          <h1 className={`font-display text-4xl sm:text-6xl text-[#E8DFCE] font-normal leading-tight mb-4 ${isAr ? "text-right" : ""}`}>
            {isAr ? "شروط وأحكام الاستخدام" : "Terms of Use & Advisory Agreement"}
          </h1>

          <p className={`font-mono text-xs text-[#B8873B] tracking-wider uppercase ${isAr ? "text-right" : ""}`}>
            {isAr ? "آخر تحديث: أغسطس ٢٠٢٦ • خاضعة لأنظمة الهيئة العامة للعقار بالمملكة" : "Last Updated: August 2026 • Governed by KSA REERA Regulations"}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {currentSections.map((sec, idx) => (
            <div key={idx} className={`space-y-4 ${isAr ? "text-right" : ""}`}>
              <h2 className="font-display text-2xl sm:text-3xl text-[#E8DFCE] font-normal tracking-tight">
                {sec.title}
              </h2>
              <p className="font-sans text-base text-[#C5BCAD] leading-[1.85]">
                {sec.body}
              </p>
            </div>
          ))}

          {/* Contact Box */}
          <div className="p-8 border border-[#B8873B]/30 bg-[#12130F] rounded-sm text-center">
            <h3 className="font-display text-2xl text-[#E8DFCE] mb-2">
              {isAr ? "هل تحتاج لإرشادات استثمارية مخصصة؟" : "Need Custom Legal or Investment Guidance?"}
            </h3>
            <p className="font-sans text-sm text-[#C5BCAD] mb-6">
              {isAr ? "تحدث مع مستشاري أصاهيب القانونيين والعقاريين في جدة والرياض." : "Speak directly with Asaheeb's legal and advisory team in Jeddah & Riyadh."}
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase border border-[#B8873B] bg-[#B8873B] text-[#12130F] font-semibold hover:bg-transparent hover:text-[#B8873B] transition-all duration-300"
            >
              {isAr ? "حجز جلسة استشارية" : "Book Legal Advisory Session"}
            </Link>
          </div>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}

export default function TermsPage() {
  return (
    <LanguageProvider>
      <TermsContent />
    </LanguageProvider>
  );
}
