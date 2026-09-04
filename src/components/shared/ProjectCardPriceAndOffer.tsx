"use client";

import React from "react";
import { getDiscountStatus } from "@/lib/offerUtils";
import type { ProjectDiscountOffer } from "@/types/database";

interface ProjectCardPriceAndOfferProps {
  project: {
    discountOffer?: ProjectDiscountOffer | null;
    discount_offer?: ProjectDiscountOffer | null;
    startingPriceEn?: string;
    startingPriceAr?: string;
    starting_price_en?: string;
    starting_price_ar?: string;
    priceRangeEn?: string;
    priceRangeAr?: string;
    price_range_en?: string;
    price_range_ar?: string;
  };
  isAr?: boolean;
  className?: string;
  showBadges?: boolean;
}

export function ProjectCardPriceAndOffer({
  project,
  isAr = false,
  className = "",
  showBadges = false,
}: ProjectCardPriceAndOfferProps) {
  const rawOffer = (project as any)?.discountOffer || (project as any)?.discount_offer;
  const { isActive, isExpired, daysLeft, offer } = getDiscountStatus(rawOffer);

  // Price Fallbacks matching original brand design
  const startingPriceEn = project.startingPriceEn || project.starting_price_en;
  const startingPriceAr = project.startingPriceAr || project.starting_price_ar;
  const priceRangeEn = project.priceRangeEn || project.price_range_en;
  const priceRangeAr = project.priceRangeAr || project.price_range_ar;

  const defaultPriceEn = startingPriceEn || priceRangeEn || "Price on Request";
  const defaultPriceAr = startingPriceAr || priceRangeAr || "السعر عند الطلب";

  const originalPrice = isAr
    ? offer?.original_price_ar || startingPriceAr || defaultPriceAr
    : offer?.original_price_en || startingPriceEn || defaultPriceEn;

  const discountedPrice = isAr
    ? offer?.discounted_price_ar || offer?.discounted_price_en
    : offer?.discounted_price_en || offer?.discounted_price_ar;

  const badgeText = isAr
    ? offer?.discount_badge_ar || "عرض لفترة محدودة"
    : offer?.discount_badge_en || "LIMITED TIME OFFER";

  const hasOffer = isActive && !isExpired && Boolean(discountedPrice || badgeText);

  return (
    <div
      className={`h-[46px] flex flex-col justify-end ${className}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Optional Badge chip (used on sidebar/detail views when showBadges={true}) */}
      {showBadges && hasOffer && (
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.3)] border border-amber-300/40 uppercase tracking-wider shrink-0">
            <svg
              className="w-2.5 h-2.5 text-slate-950 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.59 2.58-7.39 5.86-9.98.54-.43 1.29-.02 1.25.67-.13 2.11.45 4.31 1.89 5.31.3.21.72-.03.67-.39-.41-2.92.83-6.22 3.19-8.4.52-.48 1.34-.14 1.38.57.17 3.01 1.63 5.48 3.42 6.84.34.26.82.02.82-.4 0-1.25.32-2.5.94-3.57.34-.59 1.18-.5 1.39.15C20.67 11.23 21 13.56 21 15c0 4.42-4.03 8-9 8z" />
            </svg>
            <span className="truncate max-w-[130px]">{badgeText}</span>
          </span>

          {daysLeft !== null && (
            <span className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold text-orange-400 bg-orange-950/60 px-1.5 py-0.5 rounded border border-orange-500/40 shrink-0">
              <svg
                className="w-2.5 h-2.5 text-orange-400 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                {daysLeft === 0
                  ? isAr
                    ? "ينتهي اليوم!"
                    : "Ends today!"
                  : isAr
                  ? `متبقي ${daysLeft} يوم`
                  : `${daysLeft}d left`}
              </span>
            </span>
          )}
        </div>
      )}

      {/* Pricing Row - Strictly fixed height & original font-display typography */}
      <div className="h-[42px] flex flex-col justify-end">
        <p className="font-mono text-[8.5px] uppercase tracking-widest text-[#C5BCAD] mb-0.5 leading-none">
          {isAr ? "يبدأ من" : "STARTING"}
        </p>

        <div className="flex items-baseline gap-2 leading-tight">
          {hasOffer && discountedPrice ? (
            <>
              {originalPrice && (
                <span className="font-display text-xs line-through text-[#8C8477] font-medium shrink-0">
                  {originalPrice}
                </span>
              )}
              <span className="font-display text-base font-bold text-[#B8873B] shrink-0">
                {discountedPrice}
              </span>
            </>
          ) : (
            <span className="font-display text-base font-bold text-[#B8873B] shrink-0">
              {isAr ? defaultPriceAr : defaultPriceEn}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
