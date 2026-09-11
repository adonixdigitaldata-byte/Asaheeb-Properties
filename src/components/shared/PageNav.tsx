"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "@/data/contactConfig";
import { STANDARD_PROPERTY_TYPES } from "@/data/propertyTypes";

const NAV_PAGES = [
  { en: "About Us", ar: "من نحن", href: "/about" },
  { en: "Our Projects", ar: "مشاريعنا", href: "/projects", hasDropdown: true },
  // { en: "New Launches", ar: "إطلاقات جديدة", href: "/new-launches", hasNewLaunchDropdown: true, isNew: true },
  { en: "Services", ar: "خدماتنا", href: "/services" },
  { en: "Expat FAQ", ar: "دليل التملك", href: "/faq" },
  { en: "Blog", ar: "المدونة", href: "/blog" },
  { en: "Contact Us", ar: "تواصل معنا", href: "/contact" },
];

function PropertyCategoryIcon({ type, className = "w-4 h-4 text-[#B8873B]" }: { type?: string; className?: string }) {
  switch (type) {
    case "apartments":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h6" />
        </svg>
      );
    case "villas":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
          <path d="M10 21v-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6" />
        </svg>
      );
    case "commercial":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
          <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" />
        </svg>
      );
    case "residential":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="6" width="9" height="15" rx="1" />
          <rect x="13" y="2" width="9" height="19" rx="1" />
          <path d="M5 10h3M5 14h3M16 6h3M16 10h3M16 14h3" />
        </svg>
      );
    case "land":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 3h18v18H3z" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
  }
}

export default function PageNav() {
  const { lang, toggleLanguage, t } = useLanguage();
  const isAr = lang === "ar";
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsHovered, setProjectsHovered] = useState(false);
  const [newLaunchesHovered, setNewLaunchesHovered] = useState(false);
  const [mobileProjectsExpanded, setMobileProjectsExpanded] = useState(false);
  const [mobileNewLaunchesExpanded, setMobileNewLaunchesExpanded] = useState(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const newLaunchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleProjectsMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setProjectsHovered(true);
  };

  const handleProjectsMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setProjectsHovered(false);
    }, 200);
  };

  const handleNewLaunchesMouseEnter = () => {
    if (newLaunchTimeoutRef.current) clearTimeout(newLaunchTimeoutRef.current);
    setNewLaunchesHovered(true);
  };

  const handleNewLaunchesMouseLeave = () => {
    newLaunchTimeoutRef.current = setTimeout(() => {
      setNewLaunchesHovered(false);
    }, 200);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-2 sm:px-4 md:px-5 lg:px-6 xl:px-8 h-[68px] sm:h-[72px] lg:h-[76px] gap-1 sm:gap-2"
        style={{
          backgroundColor: "rgba(18,19,15,0.96)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(184,135,59,0.15)",
        }}
      >
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="relative h-10 sm:h-12 lg:h-14 w-40 sm:w-48 lg:w-56 xl:w-60 overflow-hidden">
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

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1 py-1 px-0.5 ml-1 lg:ml-3 xl:ml-5 rtl:ml-0 rtl:mr-1 lg:rtl:mr-3 xl:rtl:mr-5">
            {NAV_PAGES.map((page) => {
              const isActive = pathname === page.href || pathname.startsWith(page.href + "/");

              // New Launches dropdown
              if ((page as any).hasNewLaunchDropdown) {
                return (
                  <div
                    key={page.en}
                    className="relative shrink-0"
                    onMouseEnter={handleNewLaunchesMouseEnter}
                    onMouseLeave={handleNewLaunchesMouseLeave}
                  >
                    <Link
                      href={page.href}
                      className="flex items-center gap-1 px-1.5 lg:px-2.5 py-1.5 font-mono text-[9.5px] lg:text-[10px] xl:text-[11px] tracking-[0.08em] lg:tracking-[0.12em] uppercase transition-all duration-300 border hover:text-[#B8873B] relative group whitespace-nowrap"
                      style={{
                        color: isActive || newLaunchesHovered ? "#B8873B" : "#D4C7B5",
                        borderColor: isActive || newLaunchesHovered ? "rgba(184,135,59,0.5)" : "rgba(184,135,59,0.25)",
                        backgroundColor: isActive || newLaunchesHovered ? "rgba(184,135,59,0.12)" : "rgba(184,135,59,0.04)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] animate-pulse" />
                      <span className="font-semibold">{isAr ? page.ar : page.en}</span>
                      <svg
                        className={`w-2.5 h-2.5 transition-transform duration-200 ${newLaunchesHovered ? "rotate-180 text-[#B8873B]" : "text-[#8C8477]"
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* New Launches Luxury Hover Dropdown Panel */}
                    {newLaunchesHovered && (
                      <div
                        className={`absolute top-full mt-1.5 w-[420px] p-3 border rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[250] ${isAr ? "right-0 text-right" : "left-0 text-left"
                          }`}
                        style={{
                          backgroundColor: "#151611",
                          borderColor: "rgba(184,135,59,0.45)",
                          boxShadow: "0 25px 60px rgba(0,0,0,0.95), 0 0 0 1px rgba(184,135,59,0.3)",
                        }}
                        dir={isAr ? "rtl" : "ltr"}
                      >
                        {/* Header banner */}
                        <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-white/10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
                            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#B8873B] font-bold">
                              {isAr ? "إطلاق حصري مبكر" : "Exclusive Pre-Launch"}
                            </span>
                          </div>
                          <Link
                            href="/new-launches"
                            onClick={() => setNewLaunchesHovered(false)}
                            className="font-mono text-[9px] text-[#A89F91] hover:text-[#B8873B] transition-colors uppercase tracking-wider"
                          >
                            {isAr ? "كافة الإطلاقات ←" : "View All →"}
                          </Link>
                        </div>

                        {/* Featured Project Card: Fairmont Residences Rua Al Madinah */}
                        <Link
                          href="/new-launches/fairmont-residences-rua-al-madinah"
                          onClick={() => setNewLaunchesHovered(false)}
                          className="block rounded-sm p-2 bg-[#1B1D16] border border-[#B8873B]/30 hover:border-[#B8873B] hover:bg-[#20221A] transition-all duration-300 group"
                        >
                          <div className="relative aspect-[16/9] w-full rounded-xs overflow-hidden mb-2.5">
                            <Image
                              src="https://res.cloudinary.com/diwqmlpr/image/upload/v1788854134/asaheeb/projects/fairmont/jschdmsdvtlnqfmjbpak.png"
                              alt="Fairmont Residences Rua Al Madinah"
                              fill
                              sizes="320px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 px-2 py-0.5 rounded-xs bg-[#B8873B] text-[#0D0E0B] font-mono text-[8px] font-bold uppercase tracking-wider">
                              {isAr ? "إطلاق جديد" : "NEW LAUNCH"}
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-mono">
                              <span>120 Residences</span>
                              <span className="text-[#F1C40F]">Next to Haram</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="font-display text-sm text-white font-medium group-hover:text-[#B8873B] transition-colors">
                              {isAr ? "فيرمونت ريزيدنسز رؤى المدينة" : "Fairmont Residences Rua Al Madinah"}
                            </div>
                            <div className="font-sans text-[11px] text-[#A89F91] line-clamp-1">
                              {isAr
                                ? "شرف الجوار بجانب المسجد النبوي الشريف • شركة رؤى المدينة القابضة"
                                : "The privilege of living next to The Prophet’s Mosque • Rua Al Madinah Holding"}
                            </div>
                            <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#B8873B] font-semibold">
                              <span>{isAr ? "عرض صفحة المشروع والحجز المبكر" : "Explore Pre-Launch Landing Page"}</span>
                              <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                                {isAr ? "←" : "→"}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              if (page.hasDropdown) {
                return (
                  <div
                    key={page.en}
                    className="relative shrink-0"
                    onMouseEnter={handleProjectsMouseEnter}
                    onMouseLeave={handleProjectsMouseLeave}
                  >
                    <Link
                      href={page.href}
                      className="flex items-center gap-1 px-1.5 lg:px-2.5 py-1.5 font-mono text-[9.5px] lg:text-[10px] xl:text-[11px] tracking-[0.08em] lg:tracking-[0.12em] uppercase transition-all duration-300 border hover:text-[#B8873B] whitespace-nowrap"
                      style={{
                        color: isActive || projectsHovered ? "#B8873B" : "#D4C7B5",
                        borderColor: isActive || projectsHovered ? "rgba(184,135,59,0.35)" : "transparent",
                        backgroundColor: isActive || projectsHovered ? "rgba(184,135,59,0.08)" : "transparent",
                      }}
                    >
                      <span>{isAr ? page.ar : page.en}</span>
                      <svg
                        className={`w-2.5 h-2.5 transition-transform duration-200 ${projectsHovered ? "rotate-180 text-[#B8873B]" : "text-[#8C8477]"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Luxury Hover Dropdown Panel */}
                    {projectsHovered && (
                      <div
                        className={`absolute top-full mt-1.5 w-[380px] p-2.5 border rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[250] ${isAr ? "right-0 text-right" : "left-0 text-left"
                          }`}
                        style={{
                          backgroundColor: "#161712",
                          borderColor: "rgba(184,135,59,0.4)",
                          boxShadow: "0 25px 60px rgba(0,0,0,0.95), 0 0 0 1px rgba(184,135,59,0.3)",
                        }}
                        dir={isAr ? "rtl" : "ltr"}
                      >
                        {/* Header: All Projects link */}
                        <Link
                          href="/projects"
                          onClick={() => setProjectsHovered(false)}
                          className="flex items-center justify-between p-3 mb-1.5 border rounded-xs bg-[#1C1E17] hover:bg-[#B8873B]/20 transition-all duration-200 group border-white/5"
                        >
                          <div>
                            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8873B] font-bold block">
                              {isAr ? "جميع المشاريع" : "All Projects"}
                            </span>
                            <span className="font-sans text-xs text-[#E8DFCE] font-medium">
                              {isAr ? "استكشف محفظة أصاهيب الاستثمارية" : "Explore Curated Saudi Portfolio"}
                            </span>
                          </div>
                          <span className="font-mono text-xs text-[#B8873B] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                            {isAr ? "←" : "→"}
                          </span>
                        </Link>

                        {/* Property Categories Submenu */}
                        <div className="py-1">
                          <div className="px-3 py-1 mb-1 border-t border-white/5 pt-2">
                            <span className="font-mono text-[8.5px] tracking-[0.22em] uppercase text-[#8C8477] font-semibold">
                              {isAr ? "فئات العقارات" : "Property Categories"}
                            </span>
                          </div>

                          <div className="space-y-0.5">
                            {STANDARD_PROPERTY_TYPES.map((type) => (
                              <Link
                                key={type.key}
                                href={`/projects?type=${encodeURIComponent(type.key)}`}
                                onClick={() => setProjectsHovered(false)}
                                className="flex items-center justify-between p-2.5 rounded-xs hover:bg-[#B8873B]/10 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-xs bg-[#1F211A] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#B8873B]/40 transition-colors">
                                    <PropertyCategoryIcon type={type.iconType} className="w-3.5 h-3.5 text-[#B8873B]" />
                                  </div>
                                  <div>
                                    <p className="font-sans text-xs text-[#E8DFCE] group-hover:text-[#B8873B] transition-colors font-medium">
                                      {isAr ? type.labelAr : type.labelEn}
                                    </p>
                                    <p className="font-sans text-[10px] text-[#8C8477] leading-tight">
                                      {isAr ? type.descAr : type.descEn}
                                    </p>
                                  </div>
                                </div>
                                <span className="font-mono text-[10px] text-[#8C8477] opacity-0 group-hover:opacity-100 group-hover:text-[#B8873B] transition-all">
                                  {isAr ? "عرض ←" : "View →"}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={page.en}
                  href={page.href}
                  className="flex-shrink-0 px-1.5 lg:px-2.5 py-1.5 font-mono text-[9.5px] lg:text-[10px] xl:text-[11px] tracking-[0.08em] lg:tracking-[0.12em] uppercase transition-all duration-300 border hover:text-[#B8873B] whitespace-nowrap"
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
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="flex-shrink-0 font-mono text-[9px] sm:text-[10px] xl:text-[11px] tracking-[0.1em] sm:tracking-[0.14em] uppercase px-2 sm:px-2.5 py-1.5 rounded-full border border-[#B8873B]/50 hover:bg-[#B8873B] hover:text-[#12130F] text-[#E8DFCE] transition-all duration-300 cursor-pointer flex items-center gap-1 shadow-sm whitespace-nowrap"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{t.switchLang}</span>
          </button>

          {/* Desktop WhatsApp Action Button */}
          <a
            href={getWhatsAppLink(undefined, undefined, isAr)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex flex-shrink-0 items-center gap-1.5 font-mono text-[9px] sm:text-[10px] xl:text-[11px] tracking-[0.12em] uppercase px-2.5 py-1.5 rounded-sm border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-[#12130F] transition-all duration-300 font-semibold whitespace-nowrap"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>{isAr ? "واتساب" : "WhatsApp"}</span>
          </a>

          {/* Invest Now CTA Button */}
          <Link
            href="/contact"
            className="flex-shrink-0 font-mono text-[9px] sm:text-[10px] xl:text-[11px] tracking-[0.1em] sm:tracking-[0.14em] uppercase px-2.5 sm:px-3.5 py-1.5 sm:py-2 border text-[#E8DFCE] hover:text-[#12130F] hover:bg-[#B8873B] transition-all duration-300 font-medium whitespace-nowrap shadow-sm"
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
          className="fixed inset-0 top-[68px] z-[195] md:hidden flex flex-col p-6 space-y-3 overflow-y-auto"
          style={{
            backgroundColor: "rgba(18,19,15,0.98)",
            backdropFilter: "blur(25px)",
            borderBottom: "1px solid rgba(184,135,59,0.3)",
          }}
        >
          {NAV_PAGES.map((page) => {
            const isActive = pathname === page.href || pathname.startsWith(page.href + "/");

            // Mobile New Launches item
            if ((page as any).hasNewLaunchDropdown) {
              return (
                <div key={page.en} className="space-y-1">
                  <div
                    className="py-3 px-4 rounded border font-mono text-sm tracking-[0.2em] uppercase flex items-center justify-between transition-colors cursor-pointer"
                    style={{
                      color: "#B8873B",
                      borderColor: "rgba(184,135,59,0.5)",
                      backgroundColor: "rgba(184,135,59,0.15)",
                    }}
                    onClick={() => setMobileNewLaunchesExpanded(!mobileNewLaunchesExpanded)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-pulse" />
                      <span>{isAr ? page.ar : page.en}</span>
                    </div>
                    <svg
                      className={`w-3.5 h-3.5 text-[#B8873B] transition-transform duration-200 ${mobileNewLaunchesExpanded ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {mobileNewLaunchesExpanded && (
                    <div className="p-3 space-y-3 bg-black/60 rounded border border-[#B8873B]/30">
                      <Link
                        href="/new-launches/fairmont-residences-rua-al-madinah"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block group"
                      >
                        <div className="relative aspect-[16/9] w-full rounded overflow-hidden mb-2">
                          <Image
                            src="https://res.cloudinary.com/diwqmlpr/image/upload/v1788854134/asaheeb/projects/fairmont/jschdmsdvtlnqfmjbpak.png"
                            alt="Fairmont Residences Rua Al Madinah"
                            fill
                            sizes="(max-width: 640px) 90vw, 360px"
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 px-2 py-0.5 rounded bg-[#B8873B] text-[#0D0E0B] font-mono text-[9px] font-bold">
                            PRE-LAUNCH
                          </div>
                        </div>
                        <div className="font-display text-sm text-white font-medium">
                          {isAr ? "فيرمونت ريزيدنسز رؤى المدينة" : "Fairmont Residences Rua Al Madinah"}
                        </div>
                        <div className="text-[11px] text-[#A89F91]">
                          {isAr ? "بجوار المسجد النبوي الشريف • اضغط للتفاصيل" : "Next to The Prophet's Mosque • Tap to view"}
                        </div>
                      </Link>

                      <Link
                        href="/new-launches"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block pt-2 border-t border-white/10 text-xs font-mono text-[#B8873B] font-semibold"
                      >
                        {isAr ? "← استكشف كافة الإطلاقات الحصرية" : "→ View All New Launches Portfolio"}
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            if (page.hasDropdown) {
              return (
                <div key={page.en} className="space-y-1">
                  <div
                    className="py-3 px-4 rounded border font-mono text-sm tracking-[0.2em] uppercase flex items-center justify-between transition-colors cursor-pointer"
                    style={{
                      color: isActive ? "#B8873B" : "#E8DFCE",
                      borderColor: isActive ? "rgba(184,135,59,0.4)" : "rgba(184,135,59,0.1)",
                      backgroundColor: isActive ? "rgba(184,135,59,0.1)" : "transparent",
                    }}
                    onClick={() => setMobileProjectsExpanded(!mobileProjectsExpanded)}
                  >
                    <span>{isAr ? page.ar : page.en}</span>
                    <svg
                      className={`w-3.5 h-3.5 text-[#B8873B] transition-transform duration-200 ${mobileProjectsExpanded ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {mobileProjectsExpanded && (
                    <div className="pl-4 pr-4 py-2 space-y-1 bg-black/40 rounded border border-white/5">
                      <Link
                        href="/projects"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs font-mono text-[#B8873B] font-semibold border-b border-white/5"
                      >
                        {isAr ? "← جميع المشاريع" : "→ All Projects"}
                      </Link>
                      {STANDARD_PROPERTY_TYPES.map((type) => (
                        <Link
                          key={type.key}
                          href={`/projects?type=${encodeURIComponent(type.key)}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 py-2 text-xs font-sans text-[#C5BCAD] hover:text-[#B8873B]"
                        >
                          <PropertyCategoryIcon type={type.iconType} className="w-3.5 h-3.5 text-[#B8873B]" />
                          <span>{isAr ? type.labelAr : type.labelEn}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

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

          {/* Quick Mobile Action CTA in Drawer */}
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <a
              href={getWhatsAppLink(undefined, undefined, isAr)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded border border-[#25D366]/50 bg-[#25D366]/10 text-[#25D366] font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>{isAr ? "محادثة واتساب مباشرة" : "Chat on WhatsApp"}</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded bg-[#B8873B] text-[#0D0E0B] font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center shadow-md"
            >
              {t.investNow}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
