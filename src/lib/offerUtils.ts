import type { ProjectDiscountOffer } from "@/types/database";

export interface DiscountStatusResult {
  isActive: boolean;
  isExpired: boolean;
  daysLeft: number | null;
  hoursLeft: number | null;
  minutesLeft: number | null;
  secondsLeft: number | null;
  targetTime: number | null;
  offer: ProjectDiscountOffer | null;
  badgeLabelEn: string;
  badgeLabelAr: string;
  discountTypeLabelEn: string | null;
  discountTypeLabelAr: string | null;
}

/**
 * Safely parses any raw offer object or JSON string from Supabase database
 */
export function parseOffer(rawOffer?: any): ProjectDiscountOffer | null {
  if (!rawOffer) return null;
  let offer = rawOffer;

  if (typeof rawOffer === "string") {
    try {
      offer = JSON.parse(rawOffer);
    } catch {
      return null;
    }
  }

  if (!offer || typeof offer !== "object") return null;

  const isActive =
    offer.is_active === true ||
    offer.is_active === "true" ||
    offer.is_active === 1 ||
    offer.is_active === "1" ||
    offer.isActive === true ||
    offer.isActive === "true";

  if (!isActive) return null;

  return {
    is_active: true,
    title_en: offer.title_en || offer.titleEn || offer.title_ar || "Special Limited Offer",
    title_ar: offer.title_ar || offer.titleAr || offer.title_en || "عرض خاص ومحدود",
    discount_type: offer.discount_type || offer.discountType || "CUSTOM_TEXT",
    discount_value: offer.discount_value ?? offer.discountValue ?? null,
    discount_badge_en: offer.discount_badge_en || offer.discountBadgeEn || null,
    discount_badge_ar: offer.discount_badge_ar || offer.discountBadgeAr || null,
    applies_to: offer.applies_to || offer.appliesTo || "ALL_UNITS",
    applicable_units_en: offer.applicable_units_en || offer.applicableUnitsEn || null,
    applicable_units_ar: offer.applicable_units_ar || offer.applicableUnitsAr || null,
    original_price_en: offer.original_price_en || offer.originalPriceEn || null,
    original_price_ar: offer.original_price_ar || offer.originalPriceAr || null,
    discounted_price_en: offer.discounted_price_en || offer.discountedPriceEn || null,
    discounted_price_ar: offer.discounted_price_ar || offer.discountedPriceAr || null,
    valid_until: offer.valid_until || offer.validUntil || null,
    show_countdown: offer.show_countdown ?? offer.showCountdown ?? true,
    terms_note_en: offer.terms_note_en || offer.termsNoteEn || null,
    terms_note_ar: offer.terms_note_ar || offer.termsNoteAr || null,
  };
}

/**
 * Formats a localized badge text integrating discount_type, discount_value, and custom badge text
 */
export function formatDiscountBadgeLabel(
  offer?: ProjectDiscountOffer | null,
  locale: "en" | "ar" = "en"
): string {
  if (!offer) return "";
  const isAr = locale === "ar";
  const customBadge = isAr ? offer.discount_badge_ar : offer.discount_badge_en;

  const type = offer.discount_type;
  const val = offer.discount_value;

  let computedBadge = "";
  if (type === "PERCENTAGE" && val) {
    computedBadge = isAr ? `خصم ${val}٪` : `${val}% OFF`;
  } else if (type === "FIXED_AMOUNT" && val) {
    const formattedVal = Number(val).toLocaleString();
    computedBadge = isAr ? `وفر ${formattedVal} ريال` : `SAVE SAR ${formattedVal}`;
  }

  if (computedBadge && customBadge) {
    return `${computedBadge} · ${customBadge}`;
  }

  return computedBadge || customBadge || (isAr ? "عرض لفترة محدودة" : "LIMITED TIME OFFER");
}

export function getDiscountStatus(rawOffer?: any): DiscountStatusResult {
  const offer = parseOffer(rawOffer);

  if (!offer) {
    return {
      isActive: false,
      isExpired: false,
      daysLeft: null,
      hoursLeft: null,
      minutesLeft: null,
      secondsLeft: null,
      targetTime: null,
      offer: null,
      badgeLabelEn: "",
      badgeLabelAr: "",
      discountTypeLabelEn: null,
      discountTypeLabelAr: null,
    };
  }

  const badgeLabelEn = formatDiscountBadgeLabel(offer, "en");
  const badgeLabelAr = formatDiscountBadgeLabel(offer, "ar");

  let discountTypeLabelEn: string | null = null;
  let discountTypeLabelAr: string | null = null;

  if (offer.discount_type === "PERCENTAGE" && offer.discount_value) {
    discountTypeLabelEn = `${offer.discount_value}% OFF`;
    discountTypeLabelAr = `خصم ${offer.discount_value}٪`;
  } else if (offer.discount_type === "FIXED_AMOUNT" && offer.discount_value) {
    const formattedVal = Number(offer.discount_value).toLocaleString();
    discountTypeLabelEn = `SAVE SAR ${formattedVal}`;
    discountTypeLabelAr = `وفر ${formattedVal} ريال`;
  }

  if (!offer.valid_until) {
    return {
      isActive: true,
      isExpired: false,
      daysLeft: null,
      hoursLeft: null,
      minutesLeft: null,
      secondsLeft: null,
      targetTime: null,
      offer,
      badgeLabelEn,
      badgeLabelAr,
      discountTypeLabelEn,
      discountTypeLabelAr,
    };
  }

  const targetTime = new Date(offer.valid_until).getTime();
  if (isNaN(targetTime)) {
    return {
      isActive: true,
      isExpired: false,
      daysLeft: null,
      hoursLeft: null,
      minutesLeft: null,
      secondsLeft: null,
      targetTime: null,
      offer,
      badgeLabelEn,
      badgeLabelAr,
      discountTypeLabelEn,
      discountTypeLabelAr,
    };
  }

  const now = Date.now();
  const diff = targetTime - now;

  if (diff <= 0) {
    return {
      isActive: false,
      isExpired: true,
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0,
      targetTime,
      offer,
      badgeLabelEn,
      badgeLabelAr,
      discountTypeLabelEn,
      discountTypeLabelAr,
    };
  }

  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    isActive: true,
    isExpired: false,
    daysLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
    targetTime,
    offer,
    badgeLabelEn,
    badgeLabelAr,
    discountTypeLabelEn,
    discountTypeLabelAr,
  };
}
