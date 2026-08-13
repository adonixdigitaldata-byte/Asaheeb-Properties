"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PHONE_NUMBER_DISPLAY, WHATSAPP_NUMBER, CONTACT_EMAIL, getWhatsAppLink } from "@/data/contactConfig";

const NAV_LINKS = [
  { en: "About Us",     ar: "من نحن",     href: "/about" },
  { en: "Our Projects", ar: "مشاريعنا",   href: "/projects" },
  { en: "Services",     ar: "خدماتنا",    href: "/services" },
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
            <p className="font-sans text-xs sm:text-sm text-[#D4C7B5]">
              {isAr ? "جدة، المملكة العربية السعودية" : "Jeddah, Saudi Arabia"}
            </p>
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

        {/* Copyright */}
        <div className={`py-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${isAr ? "sm:flex-row-reverse" : ""}`}>
          <p className="font-mono text-[9px] tracking-[0.18em] text-[#C5BCAD]">
            © 2026 Asaheeb Real Estate. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
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
