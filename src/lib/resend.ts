import { Resend } from "resend";

// Initialize Resend client when API key is available
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/**
 * Checks whether Resend API key is configured.
 */
export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith("re_"));
}

/**
 * Sender identity for Resend emails.
 * Defaults to RESEND_FROM_EMAIL or 'onboarding@resend.dev' (Resend test sender).
 * When you verify your domain in Resend, set RESEND_FROM_EMAIL="Asaheeb Real Estate <consultations@asaheebrealestate.com>"
 */
export const DEFAULT_RESEND_FROM =
  process.env.RESEND_FROM_EMAIL || "Asaheeb Real Estate <onboarding@resend.dev>";

