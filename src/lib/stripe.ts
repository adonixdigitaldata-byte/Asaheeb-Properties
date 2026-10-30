import Stripe from "stripe";

// Initialize Stripe instance only if the secret key is provided
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia" as any,
      appInfo: {
        name: "Asaheeb Real Estate Consultation Checkout",
        version: "1.0.0",
      },
    })
  : null;

/**
 * Checks whether live or test Stripe API credentials are configured in the environment.
 * Accepts standard secret keys (sk_...) or restricted keys (rk_...).
 */
export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY;
  return Boolean(key && (key.startsWith("sk_") || key.startsWith("rk_")));
}

/**
 * Converts a standard currency amount (e.g. SAR 500.00) to its smallest unit (halalas/cents)
 * for Stripe transactions.
 */
export function formatAmountForStripe(amount: number, currency: string): number {
  const zeroDecimalCurrencies = [
    "BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA",
    "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF"
  ];
  return zeroDecimalCurrencies.includes(currency.toUpperCase())
    ? Math.round(amount)
    : Math.round(amount * 100);
}

