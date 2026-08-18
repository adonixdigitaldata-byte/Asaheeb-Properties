"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "@/data/contactConfig";

const NAV_PAGES = [
  { en: "About Us",      ar: "من نحن",      href: "/about" },
  { en: "Our Projects",  ar: "مشاريعنا",    href: "/projects" },
  { en: "Services",      ar: "خدماتنا",     href: "/services" },
  { en: "Blog",          ar: "المدونة",      href: "/blog" },
  { en: "Contact Us",    ar: "تواصل معنا",  href: "/contact" },
];

export default function PageNav() {
  const { lang, toggleLanguage, t } = useLanguage();
  const isAr = lang === "ar";
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-3 sm:px-6 lg:px-12 h-[72px] sm:h-[76px] gap-2 sm:gap-4"
        style={{
          backgroundColor: "rgba(18,19,15,0.96)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(184,135,59,0.15)",
        }}
      >
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="relative h-12 sm:h-14 lg:h-16 w-48 sm:w-64 lg:w-72 overflow-hidden">
              <Image
                src="/images/asaheeb-horizontal-logo.png"
                alt="Asaheeb Real Estate"
                fill
                unoptimized
                priority
                loading="eager"
                className="object-contain object-left rtl:object-right"
              />
            </div>
          </Link>

          {/* Desktop nav links - shifted a bit to the right */}
          <div className="hidden md:flex items-center gap-1 py-1 px-1 ml-6 lg:ml-16 rtl:ml-0 rtl:mr-6 lg:rtl:mr-12">
            {NAV_PAGES.map((page) => {
              const isActive = pathname === page.href;
              return (
                <Link
                  key={page.en}
                  href={page.href}
                  className="flex-shrink-0 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border hover:text-[#B8873B]"
                  style={{
                    color: isActive ? "#B8873B" : "#D4C7B5",
                    borderColor: isActive ? "rgba(184,135,59,0.35)" : "transparent",
                    backgroundColor: isActive ? "rgba(184,135,59,0.08)" : "transparent",
                  }}
                >
                  {isAr ? page.ar : page.en}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right actions: Language Switch, Invest Now, and Hamburger (Compulsory on Mobile & Desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="font-mono text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] uppercase px-2 sm:px-3 py-1.5 rounded-full border border-[#B8873B]/50 hover:bg-[#B8873B] hover:text-[#12130F] text-[#E8DFCE] transition-all duration-300 cursor-pointer flex items-center gap-1 shadow-sm"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>{t.switchLang}</span>
          </button>

          {/* Desktop WhatsApp Action Button */}
          <a
            href={getWhatsAppLink(undefined, undefined, isAr)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-[#12130F] transition-all duration-300 font-semibold"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>{isAr ? "واتساب" : "WhatsApp"}</span>
          </a>

          {/* Invest Now CTA Button */}
          <Link
            href="/contact"
            className="font-mono text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] uppercase px-2.5 sm:px-5 py-1.5 sm:py-2 border text-[#E8DFCE] hover:text-[#12130F] hover:bg-[#B8873B] transition-all duration-300 font-medium whitespace-nowrap"
            style={{ borderColor: "rgba(184,135,59,0.45)" }}
          >
            {t.investNow}
          </Link>

          {/* Mobile Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 border border-[#B8873B]/30 rounded text-[#E8DFCE] hover:text-[#B8873B] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[68px] z-[195] md:hidden flex flex-col p-6 space-y-3"
          style={{
            backgroundColor: "rgba(18,19,15,0.98)",
            backdropFilter: "blur(25px)",
            borderBottom: "1px solid rgba(184,135,59,0.3)",
          }}
        >
          {NAV_PAGES.map((page) => {
            const isActive = pathname === page.href;
            return (
              <Link
                key={page.en}
                href={page.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded border font-mono text-sm tracking-[0.2em] uppercase flex items-center justify-between transition-colors"
                style={{
                  color: isActive ? "#B8873B" : "#E8DFCE",
                  borderColor: isActive ? "rgba(184,135,59,0.4)" : "rgba(184,135,59,0.1)",
                  backgroundColor: isActive ? "rgba(184,135,59,0.1)" : "transparent",
                }}
              >
                <span>{isAr ? page.ar : page.en}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#B8873B]" />}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
