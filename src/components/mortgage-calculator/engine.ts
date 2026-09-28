// ─── MORTGAGE CALCULATION ENGINE ─────────────────────────────────────────────
// Pure functions — no React, no side effects, no API calls.
// Verified against 5 Bayut.sa production test cases (spec §9).
// ⚠️  This file is client-side only. Do NOT import from API routes.

import { BANKS, MORTGAGE_CONFIG } from "./constants";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface MortgageInputs {
  price: number;
  downPaymentAmount: number;
  loanPeriodYears: number;
  annualRatePct: number;
}

export interface MortgageResult {
  downPaymentAmount: number;
  totalLoanAmount: number;
  totalPayableValue: number;
  monthlyInstalment: number;
  bankProfitPercentage: number;
  appliedRatePct: number;
}

// ─── CORE FORMULA ─────────────────────────────────────────────────────────────
/**
 * Verified formula reverse-engineered from Bayut.sa production JS bundle (spec §3).
 * DO NOT simplify the interestRateUnits scaling — it must stay as annualRatePct * 100.
 * Rounding: never round intermediate values. Only round final display values with Math.round().
 *
 * Verified test cases (all must match exactly):
 *  Emirates NBD | 460,000 | 46,000 | 15yr | 3.80% → Total: 649,980 | Monthly: 3,611
 *  BSF          | 460,000 | 46,000 | 15yr | 3.85% → Total: 653,085 | Monthly: 3,628
 *  Al Rajhi     | 460,000 | 138,000| 15yr | 4.19% → Total: 524,377 | Monthly: 2,913
 *  SNB          | 460,000 | 138,000| 15yr | 4.26% → Total: 527,758 | Monthly: 2,932
 *  SHL          | 460,000 | 46,000 | 15yr | 6.23% → Total: 800,883 | Monthly: 4,449
 */
export function calculateMortgage({
  price,
  downPaymentAmount,
  loanPeriodYears,
  annualRatePct,
}: MortgageInputs): Omit<MortgageResult, "appliedRatePct"> {
  const loanAmount = price - downPaymentAmount;

  // NOTE: This ×100 scaling is exactly how the reference implementation works.
  // Do NOT simplify this to annualRatePct / 100 — it produces the wrong number.
  const interestRateUnits = annualRatePct * 100; // e.g. 3.80 → 380

  const totalPayableValue =
    loanAmount + (interestRateUnits / 10000) * loanAmount * loanPeriodYears;
  const monthlyInstalment = totalPayableValue / (12 * loanPeriodYears);
  const bankProfitPercentage = 100 - (100 * loanAmount) / totalPayableValue;

  return {
    downPaymentAmount,
    totalLoanAmount: loanAmount,
    totalPayableValue,
    monthlyInstalment,
    bankProfitPercentage,
  };
}

// ─── RATE LOOKUP ──────────────────────────────────────────────────────────────

/**
 * Returns the annual rate % for a given bank + loan period.
 * Falls back to MORTGAGE_CONFIG.fallbackRatePct (4.30%) when the bank has no rate data.
 */
export function getRate(bankSlug: string, loanPeriodYears: number): number {
  const bank = BANKS.find((b) => b.slug === bankSlug);
  if (!bank || !bank.rates) {
    return MORTGAGE_CONFIG.fallbackRatePct;
  }
  const rate = bank.rates[loanPeriodYears];
  return rate !== undefined ? rate : MORTGAGE_CONFIG.fallbackRatePct;
}

// ─── DOWN PAYMENT HELPERS ─────────────────────────────────────────────────────

/**
 * Returns the minimum down payment percentage based on nationality + first home status.
 * isCitizen=true  + isFirstHome=true  → 10%
 * isCitizen=true  + isFirstHome=false → 30%
 * isCitizen=false + isFirstHome=null  → 30%
 */
export function getMinDownPaymentPct(
  isCitizen: boolean,
  isFirstHome: boolean | null
): number {
  if (isCitizen && isFirstHome === true) {
    return MORTGAGE_CONFIG.minDownPaymentPctFirstHomeCitizen; // 10
  }
  return MORTGAGE_CONFIG.minDownPaymentPctDefault; // 30
}

// ─── PRICE CAP ────────────────────────────────────────────────────────────────

/** Slider max = property price or configured maximum */
export function getMaxPrice(propertyPrice: number): number {
  return Math.max(MORTGAGE_CONFIG.maxPriceValue, propertyPrice);
}

// ─── FULL CALCULATION (convenience wrapper) ───────────────────────────────────

/**
 * Given all user inputs, performs the complete calculation including rate lookup.
 * Returns MortgageResult with appliedRatePct included.
 */
export function calculateFull({
  price,
  downPaymentAmount,
  loanPeriodYears,
  bankSlug,
  isCitizen,
  isFirstHome,
}: {
  price: number;
  downPaymentAmount: number;
  loanPeriodYears: number;
  bankSlug: string;
  isCitizen: boolean;
  isFirstHome: boolean | null;
}): MortgageResult {
  const annualRatePct = getRate(bankSlug, loanPeriodYears);

  // Clamp down payment within valid range
  const minDownPaymentPct = getMinDownPaymentPct(isCitizen, isFirstHome);
  const minDown = price * (minDownPaymentPct / 100);
  const maxDown = price * (MORTGAGE_CONFIG.maxDownPaymentPct / 100);
  const clampedDown = Math.max(minDown, Math.min(maxDown, downPaymentAmount));

  const result = calculateMortgage({
    price,
    downPaymentAmount: clampedDown,
    loanPeriodYears,
    annualRatePct,
  });

  return { ...result, appliedRatePct: annualRatePct };
}

// ─── FORMATTING HELPERS ───────────────────────────────────────────────────────

/** Format a SAR amount as "1,234,567" (no decimal, comma-separated) */
export function formatSAR(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

/** Format a percentage to 2 decimal places */
export function formatPct(value: number): string {
  return value.toFixed(2);
}
