"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "@/data/contactConfig";

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
    <>
      {/* Floating WhatsApp CTA Button (Bottom Right) */}
      <a
        href={getWhatsAppLink(undefined, undefined, isAr)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Inquiry"
        className="fixed bottom-16 right-4 z-[350] md:hidden flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-2 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] active:scale-95 transition-all duration-300 border border-white/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="font-mono text-[10px] tracking-wider font-bold uppercase">{isAr ? "واتساب" : "WhatsApp"}</span>
      </a>

      {/* Bottom Nav Bar */}
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
    </>
  );
}
