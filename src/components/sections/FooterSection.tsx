"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PHONE_NUMBER_DISPLAY, WHATSAPP_NUMBER, CONTACT_EMAIL, getWhatsAppLink } from "@/data/contactConfig";

const NAV_LINKS = [
  { en: "What We Do", ar: "ماذا نفعل", href: "#section-what-we-do" },
  { en: "Projects", ar: "المشاريع", href: "#section-projects" },
  { en: "How It Works", ar: "كيف نعمل", href: "#section-how-it-works" },
  { en: "Contact", ar: "تواصل معنا", href: "#section-lead-form" },
];

const SOCIAL = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function FooterSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#040507" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,135,59,0.5) 50%, transparent)" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">

        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-16 border-b border-[rgba(255,255,255,0.05)]">

          {/* Brand */}
          <div className={isAr ? "text-right" : ""}>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 flex items-center justify-center text-sm font-bold font-display"
                style={{ backgroundColor: "#B8873B", color: "#12130F" }}
              >
                A
              </div>
              <span className="font-display text-lg tracking-[-0.02em] text-[#E8DFCE]">
                {isAr ? "أصاهيب العقارية" : "Asaheeb Properties"}
              </span>
            </div>
            <p className="font-sans text-sm text-[#C5BCAD] leading-[1.8] max-w-xs">
              {isAr
                ? "شركة وساطة عقارية متخصصة في فرص الاستثمار الراقية عبر المملكة العربية السعودية."
                : "A premium real estate investment brokerage specialising in curated opportunities across Saudi Arabia."}
            </p>
            {/* Social icons */}
            <div className={`flex gap-3 mt-6 ${isAr ? "justify-end" : ""}`}>
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-8 h-8 border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#D4C7B5] transition-all duration-300 hover:border-[#B8873B]/50 hover:text-[#B8873B]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className={isAr ? "text-right" : ""}>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#B8873B] mb-6 font-semibold">
              {isAr ? "التنقل" : "Navigation"}
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.en}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-[#D4C7B5] transition-colors duration-300 hover:text-[#B8873B]"
                  >
                    {isAr ? link.ar : link.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className={isAr ? "text-right" : ""}>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#B8873B] mb-6 font-semibold">
              {isAr ? "التواصل" : "Contact"}
            </p>
            <div className="space-y-3 mb-8">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block font-sans text-sm text-[#D4C7B5] hover:text-[#B8873B] transition-colors duration-300"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="block font-sans text-sm text-[#D4C7B5] hover:text-[#B8873B] transition-colors duration-300"
              >
                {PHONE_NUMBER_DISPLAY}
              </a>
              <a
                href={getWhatsAppLink(undefined, undefined, isAr)}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-sm text-[#25D366] hover:opacity-80 transition-opacity duration-300 font-medium"
              >
                {isAr ? "واتساب — رد فوري" : "WhatsApp — Instant Reply"}
              </a>
            </div>

            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C5BCAD] mb-3">
              {isAr ? "المقر الرئيسي" : "Headquarters"}
            </p>
            <p className="font-sans text-sm text-[#D4C7B5]">
              {isAr ? "جدة، المملكة العربية السعودية" : "Jeddah, Saudi Arabia"}
            </p>
          </div>
        </div>

        {/* Legal bar */}
        <div className={`py-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${isAr ? "sm:flex-row-reverse" : ""}`}>
          <p className="font-mono text-[9px] tracking-[0.18em] text-[#C5BCAD]">
            © 2025 Asaheeb Properties. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className={`flex gap-5 ${isAr ? "flex-row-reverse" : ""}`}>
            <a href="#" className="font-mono text-[9px] tracking-[0.15em] text-[#C5BCAD] hover:text-[#B8873B] transition-colors duration-300">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a href="#" className="font-mono text-[9px] tracking-[0.15em] text-[#C5BCAD] hover:text-[#B8873B] transition-colors duration-300">
              {isAr ? "الشروط والأحكام" : "Terms of Use"}
            </a>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="pb-8">
          <p className={`font-sans text-[10px] text-[#C5BCAD]/60 leading-[1.7] ${isAr ? "text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
            {isAr
              ? "تحذير قانوني: المعلومات الواردة في هذا الموقع لأغراض إعلامية فقط ولا تشكل نصيحة استثمارية أو تمويلية أو قانونية. كل الاستثمارات تنطوي على مخاطر وقد تؤدي إلى خسارة رأس المال. الأداء السابق لا يضمن العوائد المستقبلية."
              : "Legal disclaimer: Information on this site is for informational purposes only and does not constitute investment, financial, or legal advice. All investments carry risk and may result in loss of capital. Past performance does not guarantee future results."}
          </p>
        </div>
      </div>
    </footer>
  );
}
