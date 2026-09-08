"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getActiveMarketingPopup } from "@/lib/api";
import type { MarketingPopup } from "@/types/database";

export default function CampaignPopupModal() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const router = useRouter();

  const [popup, setPopup] = useState<MarketingPopup | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (popup) {
      const storageKey = `asaheeb_popup_seen_${popup.id}`;
      try {
        sessionStorage.setItem(storageKey, "true");
        localStorage.setItem(storageKey, Date.now().toString());
      } catch {
        // Safe fallback
      }
    }
  }, [popup]);

  // 1. Fetch active campaign popup from Supabase on mount
  useEffect(() => {
    let isMounted = true;

    async function loadCampaign() {
      try {
        const campaign = await getActiveMarketingPopup();
        if (!isMounted || !campaign || !campaign.is_active) return;

        // Frequency check (Once per session / once per day)
        const storageKey = `asaheeb_popup_seen_${campaign.id}`;
        if (campaign.frequency === "ONCE_PER_SESSION") {
          const hasSeen = sessionStorage.getItem(storageKey);
          if (hasSeen) return;
        } else if (campaign.frequency === "ONCE_PER_DAY") {
          const lastSeen = localStorage.getItem(storageKey);
          if (lastSeen) {
            const lastSeenTime = parseInt(lastSeen, 10);
            const oneDay = 24 * 60 * 60 * 1000;
            if (Date.now() - lastSeenTime < oneDay) return;
          }
        }

        setPopup(campaign);

        // Smooth subtle entrance delay (750ms)
        const showTimeout = setTimeout(() => {
          if (isMounted) {
            setIsOpen(true);
          }
        }, 750);

        return () => clearTimeout(showTimeout);
      } catch (err) {
        console.warn("Could not load marketing campaign popup:", err);
      }
    }

    loadCampaign();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen || !popup) return null;

  const title = isAr ? popup.title_ar : popup.title_en;
  const subtitle = isAr ? popup.subtitle_ar : popup.subtitle_en;
  const badge = isAr ? (popup.badge_ar || "إطلاق حصري مبكر") : (popup.badge_en || "EXCLUSIVE PRE-LAUNCH");
  const ctaText = isAr ? (popup.cta_text_ar || "استكشف أولوية الحجز") : (popup.cta_text_en || "Explore Priority Access");

  const handleNavigate = () => {
    handleClose();
    router.push(popup.target_url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 select-none cursor-pointer"
      onClick={(e) => {
        // Clicking anywhere on dark backdrop closes modal
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* ─── MODAL CONTAINER (Stops click propagation inside card) ─── */}
      <div 
        className="relative w-full max-w-lg bg-[#0C0D0A] rounded-2xl border border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-[90px] pointer-events-none" />

        {/* ─── TOP HEADER BAR WITH BADGE & PROMINENT CLOSE BUTTON ─── */}
        <div className="relative z-10 px-4 py-2.5 bg-[#12140F]/90 backdrop-blur-md border-b border-[#D4AF37]/25 flex items-center justify-between gap-2">
          {/* Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span>{badge}</span>
          </div>

          {/* Prominent Floating Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close Campaign Modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shadow-md group"
          >
            <span className="text-sm font-bold group-hover:rotate-90 transition-transform duration-200">✕</span>
          </button>
        </div>

        {/* ─── MEDIA HERO IMAGE (CLICKABLE TARGET) ─── */}
        <div
          onClick={handleNavigate}
          className="relative aspect-[16/9] sm:aspect-[16/9.5] w-full bg-[#161812] cursor-pointer group overflow-hidden"
        >
          <Image
            src={popup.image_url}
            alt={title}
            fill
            sizes="(max-width: 640px) 95vw, 520px"
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0A] via-black/30 to-transparent" />

          {/* Location pill */}
          <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-[9px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <span>{isAr ? "المسجد النبوي الشريف" : "The Prophet's Mosque"}</span>
          </div>
        </div>

        {/* ─── CONTENT BODY ─── */}
        <div className="relative z-10 p-4 sm:p-5 space-y-3 bg-[#0C0D0A] text-left rtl:text-right overflow-y-auto">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-medium text-white tracking-tight leading-snug">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 text-xs text-[#C5BBAE] font-sans leading-relaxed line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>

          {/* Key metrics strip */}
          <div className="grid grid-cols-3 gap-1.5 py-1 text-center font-mono">
            <div className="p-2 rounded bg-white/[0.03] border border-[#D4AF37]/20">
              <div className="text-xs font-bold text-[#D4AF37]">0 M</div>
              <div className="text-[8.5px] text-[#A89F91] uppercase mt-0.5">{isAr ? "ملاصق للحرم" : "Adjacent"}</div>
            </div>
            <div className="p-2 rounded bg-white/[0.03] border border-[#D4AF37]/20">
              <div className="text-xs font-bold text-[#D4AF37]">120</div>
              <div className="text-[8.5px] text-[#A89F91] uppercase mt-0.5">{isAr ? "وحدة حصرية" : "Units Only"}</div>
            </div>
            <div className="p-2 rounded bg-white/[0.03] border border-[#D4AF37]/20">
              <div className="text-xs font-bold text-[#D4AF37]">PIF</div>
              <div className="text-[8.5px] text-[#A89F91] uppercase mt-0.5">{isAr ? "رؤى المدينة" : "Portfolio"}</div>
            </div>
          </div>

          {/* ─── ACTION BUTTONS ─── */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleNavigate}
              className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#E8C86A] to-[#B8873B] text-[#0A0B08] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-[0_4px_18px_rgba(212,175,55,0.35)] transition-all duration-200 text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{ctaText}</span>
              <span className="text-sm">{isAr ? "←" : "→"}</span>
            </button>

            <button
              onClick={handleClose}
              className="py-3 px-4 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 text-[#EDE4D5] hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isAr ? "إغلاق" : "Dismiss"}
            </button>
          </div>
        </div>

        {/* ─── ACCENT GOLD STRIP ─── */}
        <div className="w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#F8E7CD] to-[#D4AF37]" />
      </div>
    </div>
  );
}
