"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const NAV_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    labelEn: "Home",
    labelAr: "الرئيسية",
    href: "/",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
    labelEn: "Projects",
    labelAr: "مشاريع",
    href: "/projects",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
      </svg>
    ),
    labelEn: "About Us",
    labelAr: "من نحن",
    href: "/about",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    labelEn: "Services",
    labelAr: "خدمات",
    href: "/services",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91A16 16 0 0016 17.91l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    labelEn: "Contact",
    labelAr: "تواصل",
    href: "/contact",
    highlighted: true,
  },
];

export default function MobileBottomNav() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[300] md:hidden"
      style={{
        backgroundColor: "rgba(11,14,18,0.96)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(184,135,59,0.2)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center justify-around px-1 py-1.5">
        {NAV_ITEMS.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={i}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 min-w-[48px] transition-all duration-300 group relative"
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-[2px]"
                  style={{ backgroundColor: "#B8873B" }}
                />
              )}

              {/* Highlighted CTA */}
              {item.highlighted ? (
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-full -mt-4 shadow-[0_0_18px_rgba(184,135,59,0.5)]"
                  style={{ backgroundColor: "#B8873B", color: "#12130F" }}
                >
                  {item.icon}
                </div>
              ) : (
                <div
                  className="transition-colors duration-300"
                  style={{ color: isActive ? "#B8873B" : "#8C8477" }}
                >
                  {item.icon}
                </div>
              )}

              <span
                className="font-mono text-[7.5px] sm:text-[8px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 whitespace-nowrap"
                style={{ color: item.highlighted ? "#B8873B" : isActive ? "#B8873B" : "#8C8477" }}
              >
                {isAr ? item.labelAr : item.labelEn}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
