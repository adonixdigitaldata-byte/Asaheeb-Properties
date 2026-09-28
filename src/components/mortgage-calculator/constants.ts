// ⚠️  RATES ARE CLIENT-SIDE ONLY — do NOT import this file from any server/API route.
//    Bank rate data must never be served as a public API response.
//    To update rates: edit this file and redeploy. No database involved.

export const MORTGAGE_CONFIG = {
  minDownPaymentPctFirstHomeCitizen: 10, // Saudi citizen buying first home
  minDownPaymentPctDefault: 30,          // Saudi buying second home, OR non-Saudi (any case)
  maxDownPaymentPct: 90,
  minLoanPeriodYears: 5,
  maxLoanPeriodYears: 25,
  defaultLoanPeriodYears: 15,
  minPriceValue: 100_000,
  maxPriceValue: 20_000_000,
  defaultPriceValue: 1_500_000, // SAR — default starting value
  fallbackRatePct: 4.30,   // used for banks with null/missing rate data (e.g. Riyad Bank)
} as const;

export interface Bank {
  slug: string;
  nameEn: string;
  nameAr: string;
  rates: Record<number, number> | null; // null = use fallbackRatePct for all years
}

// ─── 10 BANKS (full rate tables, years 5-25) ─────────────────────────────────
// Source: Verified against Bayut.sa production implementation (spec §6).
// All 5 test cases in spec §9 produce exact SAR-for-SAR matches with these values.

export const BANKS: Bank[] = [
  {
    slug: "emirates-nbd",
    nameEn: "Emirates NBD",
    nameAr: "Emirates NBD",
    rates: {
      5: 3.45, 6: 3.65, 7: 3.65, 8: 3.65, 9: 3.65, 10: 3.65,
      11: 3.80, 12: 3.80, 13: 3.80, 14: 3.80, 15: 3.80,
      16: 3.95, 17: 3.95, 18: 3.95, 19: 3.95, 20: 3.95,
      21: 4.10, 22: 4.10, 23: 4.10, 24: 4.10, 25: 4.10,
    },
  },
  {
    slug: "bsf",
    nameEn: "BSF",
    nameAr: "BSF",
    rates: {
      5: 3.60, 6: 3.60, 7: 3.60, 8: 3.60, 9: 3.60, 10: 3.65,
      11: 3.65, 12: 3.70, 13: 3.75, 14: 3.80, 15: 3.85,
      16: 3.90, 17: 3.95, 18: 4.00, 19: 4.05, 20: 4.10,
      21: 4.15, 22: 4.20, 23: 4.25, 24: 4.30, 25: 4.35,
    },
  },
  {
    slug: "al-jazira",
    nameEn: "Al Jazira",
    nameAr: "الجزيرة",
    rates: {
      5: 3.46, 6: 3.46, 7: 3.46, 8: 3.46, 9: 3.46, 10: 3.55,
      11: 3.60, 12: 3.65, 13: 3.70, 14: 3.75, 15: 3.80,
      16: 3.85, 17: 3.90, 18: 4.00, 19: 4.05, 20: 4.07,
      21: 4.13, 22: 4.16, 23: 4.20, 24: 4.24, 25: 4.26,
    },
  },
  {
    slug: "fab",
    nameEn: "FAB",
    nameAr: "FAB",
    rates: {
      5: 3.85, 6: 4.08, 7: 4.08, 8: 4.08, 9: 4.08, 10: 4.08,
      11: 4.20, 12: 4.20, 13: 4.20, 14: 4.20, 15: 4.20,
      16: 4.00, 17: 4.41, 18: 4.41, 19: 4.41, 20: 4.41,
      21: 4.58, 22: 4.58, 23: 4.58, 24: 4.58, 25: 4.58,
    },
  },
  {
    slug: "al-rajhi",
    nameEn: "Al Rajhi",
    nameAr: "الراجحي",
    rates: {
      5: 3.89, 6: 4.09, 7: 4.09, 8: 4.09, 9: 4.09, 10: 3.94,
      11: 3.99, 12: 4.04, 13: 4.09, 14: 4.14, 15: 4.19,
      16: 4.24, 17: 4.29, 18: 4.34, 19: 4.39, 20: 4.44,
      21: 4.54, 22: 4.59, 23: 4.63, 24: 4.69, 25: 4.74,
    },
  },
  {
    slug: "snb",
    nameEn: "SNB",
    nameAr: "SNB",
    rates: {
      5: 3.83, 6: 3.85, 7: 3.89, 8: 3.92, 9: 3.95, 10: 3.99,
      11: 4.04, 12: 4.09, 13: 4.15, 14: 4.20, 15: 4.26,
      16: 4.32, 17: 4.38, 18: 4.44, 19: 4.50, 20: 4.56,
      21: 4.63, 22: 4.69, 23: 4.75, 24: 4.82, 25: 4.87,
    },
  },
  {
    // No rate data from source — uses MORTGAGE_CONFIG.fallbackRatePct (4.30%) for all years
    slug: "riyad-bank",
    nameEn: "Riyad Bank",
    nameAr: "بنك الرياض",
    rates: null,
  },
  {
    slug: "shl",
    nameEn: "SHL",
    nameAr: "SHL",
    rates: {
      5: 5.50, 6: 5.56, 7: 5.64, 8: 5.71, 9: 5.78, 10: 5.86,
      11: 5.93, 12: 6.01, 13: 6.08, 14: 6.16, 15: 6.23,
      16: 6.30, 17: 6.37, 18: 6.44, 19: 6.51, 20: 6.58,
      21: 6.65, 22: 6.71, 23: 6.78, 24: 6.84, 25: 6.96,
    },
  },
  {
    slug: "sab",
    nameEn: "SAB",
    nameAr: "SAB",
    rates: {
      5: 3.15, 6: 3.15, 7: 3.15, 8: 3.15, 9: 3.15, 10: 3.45,
      11: 3.45, 12: 3.55, 13: 3.55, 14: 3.60, 15: 3.60,
      16: 3.65, 17: 3.65, 18: 3.75, 19: 3.75, 20: 3.79,
      21: 3.95, 22: 3.98, 23: 4.01, 24: 4.04, 25: 4.06,
    },
  },
  {
    slug: "dar-al-tamleek",
    nameEn: "Dar Al Tamleek",
    nameAr: "دار التمليك",
    rates: {
      5: 5.20, 6: 5.20, 7: 5.20, 8: 5.39, 9: 5.46, 10: 5.53,
      11: 5.53, 12: 5.53, 13: 5.53, 14: 5.53, 15: 5.86,
      16: 5.86, 17: 5.86, 18: 5.86, 19: 5.86, 20: 6.19,
      21: 6.19, 22: 6.19, 23: 6.19, 24: 6.19, 25: 6.19,
    },
  },
];
