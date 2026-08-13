"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

function PrivacyContent() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const sectionsEn = [
    {
      title: "1. Regulatory Framework & Commitment",
      body: "Asaheeb Real Estate (\"Asaheeb\", \"we\", \"our\", or \"us\") is committed to protecting the privacy, confidentiality, and data rights of our clients, investors, and platform visitors. We operate in strict compliance with the Saudi Personal Data Protection Law (PDPL), Real Estate General Authority (REERA) regulations, and applicable laws of the Kingdom of Saudi Arabia.",
    },
    {
      title: "2. Information We Collect",
      body: "We collect personal and professional information strictly necessary to provide real estate advisory, transaction brokerage, and due diligence services. This includes:",
      bullets: [
        "Identity & Contact Data: Full legal name, phone number, email address, nationality, and residency status (National ID, Iqama, or Passport).",
        "Investment Preferences: Desired asset classes (apartments, villas, land, commercial towers), target budget, investment horizon, and geographic preference.",
        "Transaction Records: Inquiry history, consultation logs, and documentation submitted for legal title checks.",
        "Technical & Usage Data: IP address, browser type, device information, and anonymous interaction metrics collected via cookies.",
      ],
    },
    {
      title: "3. Purpose & Legal Basis for Processing",
      body: "Your personal data is processed solely for legitimate business and regulatory purposes, including:",
      bullets: [
        "Sourcing and vetting curated real estate assets tailored to your portfolio objectives.",
        "Executing institutional 40-point title checks, zoning clearance, and regulatory due diligence.",
        "Facilitating Ministry of Investment (MISA) or RERA compliance for international and foreign buyers.",
        "Communicating market intelligence briefings, yield reports, and curated opportunity alerts.",
        "Fulfilling statutory Anti-Money Laundering (AML) and Know Your Customer (KYC) requirements under Saudi law.",
      ],
    },
    {
      title: "4. Data Confidentiality & Protection Standards",
      body: "Investor confidentiality is a cornerstone of Asaheeb's operations. We employ military-grade encryption, access controls, and secure server infrastructure located within the Kingdom of Saudi Arabia. Client identities, transaction values, and asset ownership details are held in strict confidence.",
    },
    {
      title: "5. Data Sharing & Third-Party Disclosures",
      body: "Asaheeb does not sell, rent, or trade client data to third parties. Disclosures are limited strictly to official regulatory processes:",
      bullets: [
        "Government Entities: Real Estate General Authority (REERA), Ministry of Housing, Ministry of Investment (MISA), or Notary Courts when executing legal title transfers.",
        "Authorized Service Partners: Vetted legal counsel, valuation surveyors, or escrow banks directly involved in your transaction under binding Non-Disclosure Agreements (NDAs).",
      ],
    },
    {
      title: "6. Data Subject Rights Under KSA PDPL",
      body: "Under the Saudi Personal Data Protection Law, you have guaranteed rights regarding your personal information, including:",
      bullets: [
        "Right to Information: Know how your data is collected, processed, and stored.",
        "Right of Access: Request a copy of the personal data held about you.",
        "Right to Rectification: Request correction or updating of inaccurate personal data.",
        "Right to Erasure: Request destruction of your personal data when no longer required for legal or contractual fulfillment.",
      ],
    },
    {
      title: "7. Cookies & Digital Tracking",
      body: "Our website uses essential cookies to ensure optimal performance, remember your language preferences (English/Arabic), and analyze traffic patterns anonymously. You can manage or disable non-essential cookies through your browser settings.",
    },
    {
      title: "8. Contact Our Data Governance Team",
      body: "If you have questions regarding this Privacy Policy, wish to exercise your data subject rights, or require clarification on data protection, please contact us at privacy@asaheebrealestate.com or visit our headquarters in Jeddah, Kingdom of Saudi Arabia.",
    },
  ];

  const sectionsAr = [
    {
      title: "١. الإطار التنظيمي والالتزام بالخصوصية",
      body: "تلتزم شركة أصاهيب العقارية (\"أصاهيب\" أو \"نحن\") بحماية خصوصية وأمان وسرية بيانات عملائنا ومستثمرينا وزوار منصتنا. نمل وفق أعلى معايير الالتزام بنظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية ولوائح الهيئة العامة للعقار.",
    },
    {
      title: "٢. البيانات التي نجمعها",
      body: "نجمع البيانات الشخصية والمهنية الضرورية فقط لتقديم خدمات الاستشارات العقارية، والوساطة، والفحص النافي للجهالة، وتشمل:",
      bullets: [
        "بيانات الهوية والتواصل: الاسم الكامل، رقم الهاتف، البريد الإلكتروني، الجنسية، وحالة الإقامة (الهوية الوطنية، الإقامة، أو جواز السفر).",
        "تفضيلات الاستثمار: فئات الأصول المستهدفة (شقق، فلل، أراضٍ، مبانٍ تجارية)، الميزانية المحددة، والمدن المستهدفة.",
        "سجلات التعاملات: سجل الاستفسارات، جلسات الاستشارة، والمستندات المقدمة لفحص صكوك الملكية.",
        "البيانات التقنية: عنوان IP، نوع المتصفح، ومعلومات التفاعل عبر الكوكيز.",
      ],
    },
    {
      title: "٣. أغراض استخدام البيانات والأساس النظامي",
      body: "تُعالج بياناتك الشخصية لأغراض نظامية واستثمارية محددة تشمل:",
      bullets: [
        "توفير وفرز الفرص العقارية المنسقة المناسبة لمحفظتك الاستثمارية.",
        "إجراء فحص 40 نقطة قانونية وفنية للصكوك والتراخيص والمخططات.",
        "تسهيل إجراءات وزارة الاستثمار والهيئة العامة للعقار للمستثمرين الأجانب.",
        "إرسال تقارير ذكاء السوق وتحديثات رؤية 2030 وتنبيهات الفرص المتميزة.",
        "الالتزام بمتطلبات مكافحة غسل الأموال واعرف عميلك (KYC) وفق الأنظمة السعودية.",
      ],
    },
    {
      title: "٤. معايير أمان البيانات وسرية المستثمر",
      body: "تُعد سرية المستثمر حجرة الزاوية في أعمال أصاهيب. نستخدم تقنيات تشفير متقدمة وخوادم آمنة داخل المملكة العربية السعودية، مع الحفاظ على السرية التامة لهويات العملاء وقيم الصفقات.",
    },
    {
      title: "٥. مشاركة البيانات والإفصاح",
      body: "لا تقوم أصاهيب ببيع أو تأجير بيانات العملاء لأي طرف ثالث. يقتصر الإفصاح فقط على الجهات النظامية الرسمية عند الحاجة:",
      bullets: [
        "الجهات الحكومية: الهيئة العامة للعقار، وزارة الإسكان، وزارة الاستثمار، أو كتابة العدل لإتمام نقل الصكوك.",
        "الشركاء المعتمدون: المستشارون القانونيون والمثمنون العقاريون المعتمدون المشاركون مباشرة في الصفقة بموجب اتفاقيات عدم إفصاح ملزمة.",
      ],
    },
    {
      title: "٦. حقوق صاحب البيانات وفق نظام PDPL السعودي",
      body: "بموجب نظام حماية البيانات الشخصية السعودي، تضمن أصاهيب لك كافة الحقوق النظامية، وتشمل:",
      bullets: [
        "الحق في العلم: معرفة كيفية جمع بياناتك وطريقة معالجتها.",
        "الحق في الوصول: طلب نسخة من بياناتك الشخصية المسجلة لدينا.",
        "الحق في التصحيح: طلب تحديث أو تصحيح أي بيانات غير دقيقة.",
        "الحق في الإلغاء/المحو: طلب إتلاف بياناتك عند انتهاء الغرض النظامي أو التعاقدي منها.",
      ],
    },
    {
      title: "٧. ملفات تعريف الارتباط (الكوكيز)",
      body: "يستخدم موقعنا ملفات تعريف الارتباط الأساسية لتسهيل التصفح، وتذكر تفضيلات اللغة (العربية/الفرنسية/الإنجليزية)، وتحليل أداء الموقع بشكل مجهول الهوية.",
    },
    {
      title: "٨. التواصل مع فريق حوكمة البيانات",
      body: "إذا كانت لديك استفسارات بشأن سياسة الخصوصية أو ترغب في ممارسة حقوقك النظامية، يرجى التواصل معنا عبر privacy@asaheebrealestate.com أو زيارة مقرنا الرئيسي في جدة، المملكة العربية السعودية.",
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
            <span className="text-[#E8DFCE]">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</span>
          </div>

          <h1 className={`font-display text-4xl sm:text-6xl text-[#E8DFCE] font-normal leading-tight mb-4 ${isAr ? "text-right" : ""}`}>
            {isAr ? "سياسة الخصوصية وحماية البيانات" : "Privacy Policy & Data Protection"}
          </h1>

          <p className={`font-mono text-xs text-[#B8873B] tracking-wider uppercase ${isAr ? "text-right" : ""}`}>
            {isAr ? "آخر تحديث: أغسطس ٢٠٢٦ • متوافقة مع نظام PDPL السعودي" : "Last Updated: August 2026 • Compliant with KSA PDPL"}
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
              {sec.bullets && (
                <ul className="space-y-3 pt-2">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx} className={`flex items-start gap-3 text-sm sm:text-base text-[#D4C7B5] font-sans leading-relaxed ${isAr ? "flex-row-reverse" : ""}`}>
                      <span className="text-[#B8873B] font-bold mt-1">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Contact Box */}
          <div className="p-8 border border-[#B8873B]/30 bg-[#12130F] rounded-sm text-center">
            <h3 className="font-display text-2xl text-[#E8DFCE] mb-2">
              {isAr ? "هل لديك استفسار بشأن الخصوصية؟" : "Have Questions About Your Privacy?"}
            </h3>
            <p className="font-sans text-sm text-[#C5BCAD] mb-6">
              {isAr ? "تواصل مباشرة مع مسؤول حوكمة البيانات في أصاهيب العقارية." : "Reach out directly to Asaheeb's Data Governance Team."}
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase border border-[#B8873B] bg-[#B8873B] text-[#12130F] font-semibold hover:bg-transparent hover:text-[#B8873B] transition-all duration-300"
            >
              {isAr ? "تواصل معنا" : "Contact Data Officer"}
            </Link>
          </div>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}

export default function PrivacyPage() {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  );
}
