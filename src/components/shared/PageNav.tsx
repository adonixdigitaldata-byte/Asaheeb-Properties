"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

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
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-3 sm:px-8 lg:px-16 h-[68px] gap-2 sm:gap-4"
        style={{
          backgroundColor: "rgba(18,19,15,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(184,135,59,0.15)",
        }}
      >
        {/* Exact same logo as Home Page Header */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="font-display text-lg sm:text-xl tracking-[0.22em] font-semibold text-[#E8DFCE] group-hover:text-[#B8873B] transition-colors duration-300">
            {t.brandName}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] opacity-90 shadow-[0_0_8px_#B8873B]" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 py-1 px-1">
          {NAV_PAGES.map((page) => {
            const isActive = pathname === page.href;
            return (
              <Link
                key={page.en}
                href={page.href}
                className="flex-shrink-0 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border"
                style={{
                  color: isActive ? "#B8873B" : "#8C8477",
                  borderColor: isActive ? "rgba(184,135,59,0.35)" : "transparent",
                  backgroundColor: isActive ? "rgba(184,135,59,0.08)" : "transparent",
                }}
              >
                {isAr ? page.ar : page.en}
              </Link>
            );
          })}
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
