"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getActiveMarketingPopup } from "@/lib/api";

export default function PageLoader() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // 1. Immediately preload the initial hero frame
    const heroImg = new Image();
    heroImg.src = "/frames/frame_0001.webp";

    // 2. Pre-warm active marketing popup image in the background if active
    getActiveMarketingPopup()
      .then((popup) => {
        if (popup && popup.is_active && popup.image_url) {
          const popupImg = new Image();
          popupImg.src = popup.image_url;
        }
      })
      .catch(() => {
        // Non-blocking fallback
      });

    const finishLoading = () => {
      setFading(true);
      setTimeout(() => {
        setLoading(false);
      }, 450);
    };

    if (heroImg.complete) {
      const timer = setTimeout(finishLoading, 400);
      return () => clearTimeout(timer);
    } else {
      heroImg.onload = finishLoading;
      heroImg.onerror = finishLoading;
      // Safety timeout: Never hold the user for more than 1.2s even on slow network
      const maxTimer = setTimeout(finishLoading, 1200);
      return () => clearTimeout(maxTimer);
    }
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[#0C0D0A] transition-opacity duration-500 select-none pointer-events-none ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient Gold Halo */}
      <div className="absolute w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[110px] pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6">
        {/* Brand Monogram "A" with Gold Orbit Ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-gradient-to-b from-[#181A12] to-[#0E100B] shadow-[0_0_40px_rgba(212,175,55,0.3)]">
            <span className="font-display text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F8E7CD] to-[#D4AF37] font-bold tracking-tight">
              A
            </span>
          </div>
          {/* Subtle spinning gold ring */}
          <div
            className="absolute inset-0 -m-1.5 rounded-full border-2 border-transparent border-t-[#D4AF37] border-r-[#D4AF37]/50 animate-spin"
            style={{ animationDuration: "1.1s" }}
          />
        </div>

        {/* Brand Name (Bigger, Luxury Typography) */}
        <div className="space-y-1.5">
          <div className="font-display text-base sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F8E7CD] to-[#D4AF37] tracking-[0.25em] uppercase font-bold">
            {isAr ? "أصاهيب العقارية" : "ASAHEEB REAL ESTATE"}
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-[#A89F91] tracking-[0.2em] uppercase font-medium">
            {isAr ? "رؤية المملكة ٢٠٣٠ • استثمار عقاري فاخر" : "Vision 2030 Aligned • Luxury Real Estate"}
          </div>
        </div>

        {/* Elegant Animated Progress Line */}
        <div className="w-40 sm:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2 shadow-inner">
          <div className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF] to-[#D4AF37] animate-[progress_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
