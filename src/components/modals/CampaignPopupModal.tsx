"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getActiveMarketingPopups } from "@/lib/api";
import type { MarketingPopup } from "@/types/database";

export default function CampaignPopupModal() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const router = useRouter();

  const [popups, setPopups] = useState<MarketingPopup[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const currentPopup = popups[currentIndex] || null;

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Mark seen in session
    try {
      sessionStorage.setItem("asaheeb_campaigns_seen", "true");
      if (currentPopup) {
        localStorage.setItem(`asaheeb_popup_seen_${currentPopup.id}`, Date.now().toString());
      }
    } catch {
      // Fallback
    }
  }, [currentPopup]);

  // 1. Fetch all active campaigns from Supabase
  useEffect(() => {
    let isMounted = true;

    async function loadCampaigns() {
      try {
        const activeList = await getActiveMarketingPopups();
        if (!isMounted || !activeList || activeList.length === 0) return;

        // Check if user already saw in this session
        const hasSeenSession = sessionStorage.getItem("asaheeb_campaigns_seen");
        if (hasSeenSession) return;

        setPopups(activeList);

        // Smooth subtle entrance delay (750ms)
        const showTimeout = setTimeout(() => {
          if (isMounted) {
            setIsOpen(true);
          }
        }, 750);

        return () => clearTimeout(showTimeout);
      } catch (err) {
        console.warn("Could not load marketing campaigns:", err);
      }
    }

    loadCampaigns();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Auto-slide timer if multiple campaigns exist
  useEffect(() => {
    if (!isOpen || popups.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % popups.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isOpen, popups.length, isPaused]);

  // 3. Close on Escape key & Keyboard Arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") {
        if (isAr) {
          setCurrentIndex((prev) => (prev === 0 ? popups.length - 1 : prev - 1));
        } else {
          setCurrentIndex((prev) => (prev + 1) % popups.length);
        }
      }
      if (e.key === "ArrowLeft") {
        if (isAr) {
          setCurrentIndex((prev) => (prev + 1) % popups.length);
        } else {
          setCurrentIndex((prev) => (prev === 0 ? popups.length - 1 : prev - 1));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, popups.length, isAr, handleClose]);

  if (!isOpen || !currentPopup) return null;

  const title = isAr ? currentPopup.title_ar : currentPopup.title_en;
  const subtitle = isAr ? currentPopup.subtitle_ar : currentPopup.subtitle_en;
  const badge = isAr
    ? currentPopup.badge_ar || "إطلاق حصري مبكر"
    : currentPopup.badge_en || "EXCLUSIVE CAMPAIGN";
  const ctaText = isAr
    ? currentPopup.cta_text_ar || "استكشف التفاصيل والحجز"
    : currentPopup.cta_text_en || "Explore Details & Booking";

  const handleNavigate = () => {
    handleClose();
    router.push(currentPopup.target_url);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % popups.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? popups.length - 1 : prev - 1));
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // swipe left
        setCurrentIndex((prev) => (prev + 1) % popups.length);
      } else {
        // swipe right
        setCurrentIndex((prev) => (prev === 0 ? popups.length - 1 : prev - 1));
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 select-none cursor-pointer"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* ─── MODAL CONTAINER ─── */}
      <div
        className="relative w-full max-w-lg bg-[#0C0D0A] rounded-2xl border border-[#D4AF37]/50 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh] cursor-default"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-[90px] pointer-events-none" />

        {/* ─── TOP HEADER BAR WITH BADGE, COUNTER & PROMINENT CLOSE BUTTON ─── */}
        <div className="relative z-10 px-4 py-2.5 bg-[#12140F]/90 backdrop-blur-md border-b border-[#D4AF37]/25 flex items-center justify-between gap-2">
          {/* Badge & Multi-Ad Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>{badge}</span>
            </div>

            {popups.length > 1 && (
              <span className="font-mono text-[10px] text-[#A89F91] px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                {currentIndex + 1} / {popups.length}
              </span>
            )}
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

        {/* ─── MEDIA HERO IMAGE WITH SLIDER CONTROLS ─── */}
        <div
          onClick={handleNavigate}
          className="relative aspect-[16/9] sm:aspect-[16/9.5] w-full bg-[#161812] cursor-pointer group overflow-hidden"
        >
          <Image
            key={currentPopup.id}
            src={currentPopup.image_url}
            alt={title}
            fill
            sizes="(max-width: 640px) 95vw, 520px"
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out animate-in fade-in zoom-in-95 duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0A] via-black/30 to-transparent" />

          {/* Prev / Next Slider Arrows (Only shown when multiple ads exist) */}
          {popups.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous Campaign"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 flex items-center justify-center text-sm font-bold transition-all shadow-lg z-20 cursor-pointer"
              >
                ‹
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Campaign"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 flex items-center justify-center text-sm font-bold transition-all shadow-lg z-20 cursor-pointer"
              >
                ›
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {popups.length > 1 && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-full border border-white/10">
              {popups.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? "w-5 bg-[#D4AF37]"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
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

