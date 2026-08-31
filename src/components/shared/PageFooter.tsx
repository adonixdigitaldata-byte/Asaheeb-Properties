"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PHONE_NUMBER_DISPLAY, WHATSAPP_NUMBER, CONTACT_EMAIL, getWhatsAppLink } from "@/data/contactConfig";

const NAV_LINKS = [
  { en: "About Us",     ar: "من نحن",     href: "/about" },
  { en: "Our Projects", ar: "مشاريعنا",   href: "/projects" },
  { en: "Services",     ar: "خدماتنا",    href: "/services" },
  { en: "Expat FAQ",    ar: "دليل التملك", href: "/faq" },
  { en: "Blog",         ar: "المدونة",     href: "/blog" },
  { en: "Contact Us",   ar: "تواصل معنا", href: "/contact" },
];

const GOV_LOGOS = [
  {
    name: "Vision 2030",
    nameAr: "رؤية 2030",
    src: "/images/vision-2030.jpg",
    isStandaloneCard: false,
  },
  {
    name: "REGA - Real Estate General Authority",
    nameAr: "الهيئة العامة للعقار",
    src: "/images/gov-rega.webp",
    isStandaloneCard: false,
  },
  {
    name: "Wafi Program",
    nameAr: "برنامج وافي",
    src: "/images/Wafi%20logo.jpg",
    isStandaloneCard: false,
  },
  {
    name: "FAL Real Estate License",
    nameAr: "رخصة فال العقارية",
    src: "/images/Fal.png",
    isStandaloneCard: true,
  },
];

const SOCIAL = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/Asaheebrealestate",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: "Snapchat",
    href: "https://www.snapchat.com/add/Asaheeb.re",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.004 0C5.372 0 0 5.373 0 12c0 2.457.753 4.743 2.046 6.643-.08.647-.406 2.012-1.83 3.513 0 0 1.942.227 4.093-1.026A11.968 11.968 0 0012.004 24C18.63 24 24 18.627 24 12S18.63 0 12.004 0zm-.022 19.344c-1.393 0-2.458-.387-3.413-.772-.472-.19-.92-.37-1.378-.37-.565 0-1.05.275-1.545.556-.277.158-.567.323-.895.427-.08.026-.16.039-.238.039-.333 0-.585-.231-.639-.589-.092-.614.184-1.229.472-1.867.218-.485.453-1.009.472-1.52.02-.556-.178-.97-.47-1.597-.336-.723-.746-1.606-.746-2.81 0-3.37 2.766-5.467 6.36-5.467 3.593 0 6.36 2.097 6.36 5.467 0 1.204-.41 2.087-.746 2.81-.292.627-.49 1.041-.47 1.597.019.511.254 1.035.472 1.52.288.638.564 1.253.472 1.867-.054.358-.306.589-.639.589-.078 0-.158-.013-.238-.039-.328-.104-.618-.269-.895-.427-.495-.281-.98-.556-1.545-.556-.458 0-.906.18-1.378.37-.955.385-2.02.772-3.413.772z"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@Asaheeb.RealEstate",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
];

export default function PageFooter() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#040507" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,135,59,0.5) 50%, transparent)" }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-8 py-10 sm:py-16 border-b border-[rgba(255,255,255,0.05)] ${isAr ? "text-right" : ""}`}>
          {/* Brand - Spans both columns on Mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className={`flex flex-col gap-2 mb-4 ${isAr ? "items-end text-right" : "items-start"}`}>
              <div className="relative w-52 sm:w-64 lg:w-72 h-14 sm:h-16 lg:h-20 overflow-hidden">
                <Image
                  src="/images/asaheeb-horizontal-logo.png"
                  alt="Asaheeb Real Estate"
                  fill
                  unoptimized
                  className={`object-contain ${isAr ? "object-right" : "object-left"}`}
                />
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] leading-[1.7] max-w-sm">
              {isAr
                ? "شركة وساطة عقارية متخصصة في فرص الاستثمار الراقية عبر المملكة العربية السعودية."
                : "A premium real estate investment brokerage specialising in curated opportunities across Saudi Arabia."}
            </p>
            <div className={`flex gap-2.5 mt-4 ${isAr ? "justify-end" : ""}`}>
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#D4C7B5] transition-all duration-300 hover:border-[#B8873B]/50 hover:text-[#B8873B]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation - Column 1 on Mobile */}
          <div className="col-span-1">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#B8873B] mb-4 font-semibold">
              {isAr ? "التنقل" : "Navigation"}
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.en}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs sm:text-sm text-[#D4C7B5] transition-colors duration-300 hover:text-[#B8873B]"
                  >
                    {isAr ? link.ar : link.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Column 2 on Mobile */}
          <div className="col-span-1">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#B8873B] mb-4 font-semibold">
              {isAr ? "التواصل" : "Contact"}
            </p>
            <div className="space-y-2 mb-4">
              <a href={`mailto:${CONTACT_EMAIL}`} className="block font-sans text-xs sm:text-sm text-[#D4C7B5] hover:text-[#B8873B] transition-colors duration-300 truncate">
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:${WHATSAPP_NUMBER}`} className="block font-sans text-xs sm:text-sm text-[#D4C7B5] hover:text-[#B8873B] transition-colors duration-300">
                {PHONE_NUMBER_DISPLAY}
              </a>
              <a href={getWhatsAppLink(undefined, undefined, isAr)} target="_blank" rel="noopener noreferrer" className="block font-sans text-xs sm:text-sm text-[#25D366] hover:opacity-80 transition-opacity duration-300 font-medium">
                {isAr ? "واتساب — رد فوري" : "WhatsApp — Instant"}
              </a>
            </div>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C5BCAD] mb-1">
              {isAr ? "المقر الرئيسي" : "Headquarters"}
            </p>
            <a
              href="https://maps.app.goo.gl/azGoR8U9jpaXa3Qh8"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-sans text-xs text-[#D4C7B5] hover:text-[#B8873B] transition-colors leading-relaxed"
            >
              {isAr
                ? "مكتب ٦٠٢، متبولي بلازا، الرويس، جدة ٢٣٢١٣ ↗"
                : "Office 602, Matbouli Plaza, Al-Ruwais, Jeddah 23213 ↗"}
            </a>
          </div>
        </div>

        {/* ── GOVERNMENT ACCREDITATION & LICENSING STRIP ───────────────────── */}
        <div className="py-8 border-b border-[rgba(255,255,255,0.05)]">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isAr ? "md:flex-row-reverse" : ""}`}>
            <div className={`text-center ${isAr ? "md:text-right" : "md:text-left"}`}>
              <div className={`flex items-center justify-center md:justify-start gap-2 mb-1 ${isAr ? "md:flex-row-reverse" : ""}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B]" />
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
                  {isAr ? "التراخيص والاعتماد الحكومي" : "Government Accreditation & Compliance"}
                </p>
              </div>
              <p className="font-sans text-xs text-[#C5BCAD]">
                {isAr
                  ? "مرخص ومطابق للأنظمة من قِبل الهيئة العامة للعقار ووافي ورؤية 2030"
                  : "Officially registered & compliant with REGA, Wafi & Vision 2030 standards"}
              </p>
            </div>

            {/* Logos Grid — Highlighted crisp white background cards */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
              {GOV_LOGOS.map((logo, idx) => (
                <div
                  key={idx}
                  title={isAr ? logo.nameAr : logo.name}
                  className="h-12 sm:h-14 lg:h-16 bg-white rounded-xl px-3.5 py-2 flex items-center justify-center border border-white/80 shadow-[0_4px_16px_rgba(255,255,255,0.18)] hover:border-[#B8873B] hover:shadow-[0_4px_25px_rgba(184,135,59,0.4)] transition-all duration-300 hover:scale-105 flex-shrink-0"
                >
                  <img
                    src={logo.src}
                    alt={isAr ? logo.nameAr : logo.name}
                    className="h-full w-auto object-contain max-w-[135px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright & Agency Credit */}
        <div className={`py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left ${isAr ? "md:flex-row-reverse md:text-right" : ""}`}>
          <p className="font-mono text-[9px] tracking-[0.18em] text-[#C5BCAD]">
            © 2026 Asaheeb Real Estate. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>

          {/* Adonix Agency Credit Badge */}
          <a
            href="https://portfolio.adonixdigital.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Adonix Digital - Web Design & Development Agency"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B8873B]/30 bg-[#B8873B]/5 hover:bg-[#B8873B]/15 hover:border-[#B8873B]/70 transition-all duration-300 shadow-[0_0_15px_rgba(184,135,59,0.05)] hover:shadow-[0_0_20px_rgba(184,135,59,0.25)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] group-hover:scale-125 transition-transform" />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#C5BCAD] group-hover:text-[#E8DFCE] transition-colors">
              {isAr ? "تصميم وتطوير بواسطة" : "Designed & Developed by"}{" "}
              <span className="font-bold text-[#B8873B] group-hover:text-white transition-colors underline decoration-[#B8873B]/40 underline-offset-2">
                ADONIX
              </span>
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#B8873B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <div className={`flex gap-5 ${isAr ? "flex-row-reverse" : ""}`}>
            <Link href="/privacy" className="font-mono text-[9px] tracking-[0.15em] text-[#C5BCAD] hover:text-[#B8873B] transition-colors duration-300">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="font-mono text-[9px] tracking-[0.15em] text-[#C5BCAD] hover:text-[#B8873B] transition-colors duration-300">
              {isAr ? "الشروط والأحكام" : "Terms of Use"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
