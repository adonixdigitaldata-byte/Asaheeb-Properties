"use client";

import React, { useState, useEffect } from "react";
import { parseOffer, getDiscountStatus } from "@/lib/offerUtils";

interface ProjectPromotionalHeroBannerProps {
  offer?: any;
  locale?: "en" | "ar";
  className?: string;
}

export function ProjectPromotionalHeroBanner({
  offer: rawOffer,
  locale = "en",
  className = "",
}: ProjectPromotionalHeroBannerProps) {
  const isAr = locale === "ar";
  const { isActive, isExpired, offer, badgeLabelEn, badgeLabelAr, discountTypeLabelEn, discountTypeLabelAr } = getDiscountStatus(rawOffer);
  const discountTypeTag = isAr ? discountTypeLabelAr : discountTypeLabelEn;
  const badgeText = isAr ? badgeLabelAr : badgeLabelEn;

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // Primitive string dependency to avoid React useEffect infinite loop
  const validUntilStr = offer?.valid_until || "";

  useEffect(() => {
    if (!validUntilStr) {
      setTimeLeft(null);
      return;
    }

    const targetTime = new Date(validUntilStr).getTime();
    if (isNaN(targetTime)) {
      setTimeLeft(null);
      return;
    }

    function calculate() {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [validUntilStr]);

  if (!isActive || isExpired || !offer) return null;

  const titleText = isAr ? offer.title_ar : offer.title_en;
  const termsText = isAr ? offer.terms_note_ar : offer.terms_note_en;
  const unitsText = isAr ? offer.applicable_units_ar : offer.applicable_units_en;

  const originalPrice = isAr ? offer.original_price_ar : offer.original_price_en;
  const discountedPrice = isAr
    ? offer.discounted_price_ar || offer.discounted_price_en
    : offer.discounted_price_en || offer.discounted_price_ar;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`w-full relative overflow-hidden rounded-2xl p-6 sm:p-8 my-6 bg-gradient-to-br from-[#131620] via-[#0F1117] to-[#19161F] text-white border border-[#B8873B]/50 shadow-[0_12px_48px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-500 hover:border-[#B8873B] ${className}`}
    >
      {/* Decorative Ambient Glowing Orbs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#B8873B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Top Metallic Gold Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8873B] to-transparent" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Offer Details & Value */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)] border border-amber-300/40 animate-pulse">
              <svg
                className="w-3.5 h-3.5 text-slate-950 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.59 2.58-7.39 5.86-9.98.54-.43 1.29-.02 1.25.67-.13 2.11.45 4.31 1.89 5.31.3.21.72-.03.67-.39-.41-2.92.83-6.22 3.19-8.4.52-.48 1.34-.14 1.38.57.17 3.01 1.63 5.48 3.42 6.84.34.26.82.02.82-.4 0-1.25.32-2.5.94-3.57.34-.59 1.18-.5 1.39.15C20.67 11.23 21 13.56 21 15c0 4.42-4.03 8-9 8z" />
              </svg>
              <span>{badgeText}</span>
            </div>

            {discountTypeTag && (
              <span className="inline-flex items-center gap-1 font-mono text-xs font-black tracking-wider uppercase px-3 py-1 bg-amber-400/10 text-amber-300 rounded-full border border-amber-400/40">
                ⚡ {discountTypeTag}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#E8DFCE] tracking-tight leading-snug">
            {titleText}
          </h2>

          {/* Unit Applicability Scope */}
          <p className="text-xs sm:text-sm text-amber-200/90 font-medium flex items-center gap-1.5">
            <span>
              {offer.applies_to === "SPECIFIC_UNITS"
                ? isAr
                  ? `🎯 ينطبق على: ${unitsText || "وحدات محددة"}`
                  : `🎯 Valid on: ${unitsText || "Specific Units"}`
                : isAr
                ? "✨ يسري العرض على كافة شقق ونماذج المشروع"
                : "✨ Offer valid across all project layouts & apartments"}
            </span>
          </p>

          {/* Before & After Price Comparison */}
          {(discountedPrice || originalPrice) && (
            <div className="flex items-baseline gap-3 pt-1 flex-wrap">
              {originalPrice && (
                <span className="font-display text-sm sm:text-base text-[#8C8477] line-through font-medium">
                  {originalPrice}
                </span>
              )}
              {discountedPrice && (
                <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#B8873B] tracking-tight drop-shadow-[0_2px_10px_rgba(184,135,59,0.25)]">
                  {discountedPrice}
                </span>
              )}
            </div>
          )}

          {/* Terms Note */}
          {termsText && (
            <div className="text-xs text-[#8C8477] italic flex items-center gap-1.5 pt-1">
              <svg
                className="w-3.5 h-3.5 text-amber-400 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{termsText}</span>
            </div>
          )}
        </div>

        {/* Right: Live Countdown Clock */}
        {offer.show_countdown && timeLeft && (
          <div className="w-full lg:w-auto bg-[#0B0D12]/90 backdrop-blur-md border border-[#B8873B]/40 p-4 sm:p-6 rounded-xl flex flex-col items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] shrink-0 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">
              <svg
                className="w-4 h-4 text-amber-400 animate-spin"
                style={{ animationDuration: "8s" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{isAr ? "ينتهي العرض خلال:" : "Offer Ends In:"}</span>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <div className="flex flex-col items-center bg-[#141620] px-3.5 py-2.5 rounded-lg border border-white/10 min-w-[58px] shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {timeLeft.days}
                </span>
                <span className="text-[9.5px] text-[#8C8477] uppercase font-bold tracking-wider">
                  {isAr ? "يوم" : "Days"}
                </span>
              </div>
              <span className="text-amber-400 font-bold text-xl sm:text-2xl">:</span>
              <div className="flex flex-col items-center bg-[#141620] px-3.5 py-2.5 rounded-lg border border-white/10 min-w-[58px] shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[9.5px] text-[#8C8477] uppercase font-bold tracking-wider">
                  {isAr ? "ساعة" : "Hours"}
                </span>
              </div>
              <span className="text-amber-400 font-bold text-xl sm:text-2xl">:</span>
              <div className="flex flex-col items-center bg-[#141620] px-3.5 py-2.5 rounded-lg border border-white/10 min-w-[58px] shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[9.5px] text-[#8C8477] uppercase font-bold tracking-wider">
                  {isAr ? "دقيقة" : "Mins"}
                </span>
              </div>
              <span className="text-amber-400 font-bold text-xl sm:text-2xl">:</span>
              <div className="flex flex-col items-center bg-[#141620] px-3.5 py-2.5 rounded-lg border border-[#B8873B]/60 min-w-[58px] shadow-inner bg-[#B8873B]/10">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 animate-pulse">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[9.5px] text-amber-300 uppercase font-bold tracking-wider">
                  {isAr ? "ثانية" : "Secs"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
