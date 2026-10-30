import { resend, isResendConfigured, DEFAULT_RESEND_FROM } from "@/lib/resend";
import { CONTACT_EMAIL } from "@/data/contactConfig";
import nodemailer from "nodemailer";

export interface ConsultationNotificationPayload {
  bookingReference: string;
  fullName: string;
  email: string;
  phone: string;
  cityOrCountry?: string;
  buyerIntent?: string;
  budgetRange?: string;
  preferredMeetingMode: "ONLINE_VIDEO" | "IN_PERSON_OFFICE" | string;
  notes?: string;
  feeAmount: number;
  creditValue: number;
  currency: string;
  voucherCode: string;
  paymentMethod?: string;
  paymentTransactionId?: string;
  ownerNotificationEmail?: string;
  creditMultiplier?: number;
}

const formatMoney = (val: number | string | undefined | null): string => {
  const num = Number(val);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: num % 1 !== 0 ? 1 : 0,
    maximumFractionDigits: 2,
  });
};

/**
 * Sends luxury branded email notifications to both the customer and Asaheeb executive management using Resend.
 * Uses high-contrast, inline-styled tables and components for 100% visibility across Gmail, Apple Mail, and Outlook.
 */
export async function sendConsultationNotifications(payload: ConsultationNotificationPayload): Promise<{
  clientEmailSent: boolean;
  ownerEmailSent: boolean;
}> {
  const {
    bookingReference,
    fullName,
    email,
    phone,
    cityOrCountry = "Saudi Arabia",
    buyerIntent = "HIGH_RENTAL_YIELD",
    budgetRange = "SAR 1M – 3M",
    preferredMeetingMode,
    notes = "",
    feeAmount,
    creditValue,
    currency,
    voucherCode,
    paymentMethod = "STRIPE",
    paymentTransactionId = "N/A",
    ownerNotificationEmail = "buy@asaheebrealestate.com",
    creditMultiplier = 1,
  } = payload;

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Riyadh",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const meetingModeDisplay =
    preferredMeetingMode === "IN_PERSON_OFFICE"
      ? "In-Person (Asaheeb HQ Executive Lounge, Jeddah)"
      : "Online Video (Encrypted Google Meet)";

  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const formattedFee = formatMoney(feeAmount);
  const formattedCredit = formatMoney(creditValue);

  // ─────────────────────────────────────────────────────────────
  // 1. BUYER CONFIRMATION HTML (Bulletproof High-Contrast Styles)
  // ─────────────────────────────────────────────────────────────
  const clientHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIP Consultation Confirmed</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B0C0E; color: #FFFFFF; margin: 0; padding: 20px 10px;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width: 600px; background-color: #14151A; border: 1px solid #C69A59; border-radius: 10px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.8);" border="0" cellspacing="0" cellpadding="0">
            
            <!-- HEADER -->
            <tr>
              <td style="background-color: #1A1C23; border-bottom: 2px solid #C69A59; padding: 28px 20px; text-align: center;">
                <h1 style="color: #D8A856; font-size: 22px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin: 0;">ASAHEEB REAL ESTATE</h1>
                <p style="color: #A1A1AA; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 6px 0 0 0;">Executive Founder Advisory · Jeddah</p>
              </td>
            </tr>

            <!-- CONTENT BODY -->
            <tr>
              <td style="padding: 28px 24px;">
                <h2 style="color: #FFFFFF; margin: 0 0 14px 0; font-size: 20px; font-weight: 700;">Your 1-on-1 Advisory Session is Confirmed</h2>
                <p style="color: #E2E8F0; line-height: 1.6; font-size: 14px; margin: 0 0 22px 0;">
                  Dear <strong style="color: #FFFFFF;">${fullName}</strong>, thank you for scheduling your strategic real estate advisory consultation with our founder, <strong style="color: #D8A856;">Nabeel</strong>. Your payment of <strong style="color: #FFFFFF;">${currency} ${formattedFee}</strong> has been received and verified.
                </p>

                <!-- VOUCHER CERTIFICATE BOX -->
                <table role="presentation" width="100%" style="background-color: #1C1D24; border: 2px dashed #C69A59; border-radius: 8px; margin: 20px 0; text-align: center;" border="0" cellspacing="0" cellpadding="20">
                  <tr>
                    <td>
                      <div style="color: #D8A856; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Authorized Property Acquisition Credit Voucher</div>
                      <div style="color: #FDE68A; font-size: 28px; font-weight: 800; margin: 10px 0;">${currency} ${formattedCredit} Credit</div>
                      <div style="display: inline-block; background-color: #0B0C0E; border: 1px solid #D8A856; border-radius: 6px; padding: 8px 18px; margin: 6px 0 12px 0;">
                        <span style="font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 700; color: #FFFFFF; letter-spacing: 2px;">${voucherCode}</span>
                      </div>
                      <div style="color: #CBD5E1; font-size: 12px; line-height: 1.5; margin-top: 6px;">
                        <strong style="color: #D8A856;">100% Purchase Deductible:</strong> Valid for 12 months. When you acquire or place a down payment on any property through Asaheeb, this full amount (<strong style="color: #FFFFFF;">${currency} ${formattedCredit}</strong>) is deducted directly from your closing costs.
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- DETAILS TABLE (High-Contrast Inline Styles) -->
                <table role="presentation" width="100%" style="border-collapse: collapse; margin-top: 20px; border-radius: 6px; overflow: hidden;" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 38%; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Booking Reference
                    </td>
                    <td style="padding: 12px 14px; color: #FDE68A; font-weight: 700; font-family: 'Courier New', Courier, monospace; font-size: 13px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${bookingReference}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Amount Paid
                    </td>
                    <td style="padding: 12px 14px; color: #FFFFFF; font-weight: 700; font-size: 13px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${currency} ${formattedFee} (${paymentMethod})
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Meeting Format
                    </td>
                    <td style="padding: 12px 14px; color: #FFFFFF; font-size: 13px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${meetingModeDisplay}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Focus & Budget
                    </td>
                    <td style="padding: 12px 14px; color: #FFFFFF; font-size: 13px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${buyerIntent} · <span style="color: #4ADE80; font-weight: 700;">${budgetRange}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920;">
                      Concierge Next Step
                    </td>
                    <td style="padding: 12px 14px; color: #E2E8F0; font-size: 13px; line-height: 1.5; background-color: #15161C;">
                      Our executive concierge will contact you within 60 minutes via WhatsApp/phone to coordinate Founder Nabeel's calendar and confirm your preferred time slot.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color: #0D0E12; padding: 20px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid #26272F;">
                Asaheeb Real Estate · Matbouli Plaza, Al-Ruwais, Jeddah · <a href="mailto:buy@asaheebrealestate.com" style="color: #D8A856; text-decoration: none;">buy@asaheebrealestate.com</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  // ─────────────────────────────────────────────────────────────
  // 2. OWNER / EXECUTIVE ALERT HTML (High-Contrast Dossier)
  // ─────────────────────────────────────────────────────────────
  const ownerHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Priority Paid VIP Consultation</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0B0C0E; color: #FFFFFF; margin: 0; padding: 20px 10px;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width: 650px; background-color: #14151A; border: 2px solid #C69A59; border-radius: 10px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.8);" border="0" cellspacing="0" cellpadding="0">
            
            <!-- HEADER -->
            <tr>
              <td style="background-color: #1A1C23; border-bottom: 2px solid #C69A59; padding: 26px 20px; text-align: center;">
                <div style="background-color: #D8A856; color: #0B0C0E; font-weight: 800; padding: 5px 14px; border-radius: 4px; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block; margin-bottom: 10px;">
                  [PRIORITY] NEW PAID VIP CONSULTATION
                </div>
                <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 800;">
                  ${currency} ${formattedFee} Received via ${paymentMethod}
                </h1>
                <div style="color: #94A3B8; font-size: 12px; margin-top: 6px;">
                  Time: ${timestamp}
                </div>
              </td>
            </tr>

            <!-- CONTENT BODY -->
            <tr>
              <td style="padding: 26px 22px;">
                <table role="presentation" width="100%" style="border-collapse: collapse; border-radius: 6px; overflow: hidden;" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 35%; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Booking Reference
                    </td>
                    <td style="padding: 12px 14px; color: #FDE68A; font-weight: 700; font-family: 'Courier New', Courier, monospace; font-size: 13px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${bookingReference}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Client Name
                    </td>
                    <td style="padding: 12px 14px; color: #FFFFFF; font-weight: 800; font-size: 16px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${fullName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Phone / WhatsApp
                    </td>
                    <td style="padding: 12px 14px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      <a href="tel:${phone}" style="color: #FDE68A; font-weight: 700; font-size: 14px; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Email Address
                    </td>
                    <td style="padding: 12px 14px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      <a href="mailto:${email}" style="color: #93C5FD; font-size: 13px; text-decoration: none;">${email || "Not Provided"}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Location
                    </td>
                    <td style="padding: 12px 14px; color: #FFFFFF; font-size: 13px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${cityOrCountry}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Target Budget
                    </td>
                    <td style="padding: 12px 14px; color: #4ADE80; font-weight: 800; font-size: 14px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${budgetRange}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Investment Focus
                    </td>
                    <td style="padding: 12px 14px; color: #FFFFFF; font-size: 13px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${buyerIntent}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Meeting Delivery
                    </td>
                    <td style="padding: 12px 14px; color: #FFFFFF; font-weight: 700; font-size: 13px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${meetingModeDisplay}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Transaction ID
                    </td>
                    <td style="padding: 12px 14px; color: #CBD5E1; font-family: 'Courier New', Courier, monospace; font-size: 12px; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${paymentTransactionId} (${paymentMethod})
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920; border-bottom: 1px solid #2B2D36;">
                      Issued Voucher
                    </td>
                    <td style="padding: 12px 14px; color: #FDE68A; font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: 700; background-color: #15161C; border-bottom: 1px solid #2B2D36;">
                      ${voucherCode} (${currency} ${formattedCredit})
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 14px; color: #D8A856; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; background-color: #181920;">
                      Investor Notes
                    </td>
                    <td style="padding: 12px 14px; color: #E2E8F0; font-size: 13px; line-height: 1.5; background-color: #15161C;">
                      ${notes ? notes : "No specific notes entered."}
                    </td>
                  </tr>
                </table>

                <!-- ACTION BUTTONS -->
                <div style="margin-top: 26px; text-align: center;">
                  <a href="https://wa.me/${cleanPhone}" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: 800; font-size: 13px; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 4px;">
                    Chat on WhatsApp
                  </a>
                  <a href="mailto:${email}" style="display: inline-block; background-color: #D8A856; color: #0B0C0E; font-weight: 800; font-size: 13px; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 4px;">
                    Reply via Email
                  </a>
                </div>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color: #0D0E12; padding: 16px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid #26272F;">
                Asaheeb Executive Portal · Automated Priority Alert
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  let clientEmailSent = false;
  let ownerEmailSent = false;

  // ─── PRIMARY: RESEND ENGINE ───
  if (isResendConfigured() && resend) {
    // 1. Send confirmation to Customer
    if (email && email.includes("@")) {
      try {
        const clientRes = await resend.emails.send({
          from: DEFAULT_RESEND_FROM,
          to: email,
          subject: `VIP Real Estate Advisory Confirmed with Founder Nabeel [#${bookingReference}]`,
          html: clientHtml,
        });
        if (clientRes.data?.id) {
          clientEmailSent = true;
          console.log(`✅ Resend: Confirmation sent to customer (${email}), ID: ${clientRes.data.id}`);
        }
      } catch (err: any) {
        console.error("Resend error sending to customer:", err.message || err);
      }
    }

    // 2. Send priority alert to Owner / Executive Concierge
    try {
      const ownerRes = await resend.emails.send({
        from: DEFAULT_RESEND_FROM,
        to: ownerNotificationEmail,
        cc: CONTACT_EMAIL && CONTACT_EMAIL !== ownerNotificationEmail ? [CONTACT_EMAIL] : undefined,
        subject: `[VIP Advisory Booked] ${currency} ${formattedFee} — ${fullName} (${preferredMeetingMode})`,
        html: ownerHtml,
      });
      if (ownerRes.data?.id) {
        ownerEmailSent = true;
        console.log(`✅ Resend: Alert sent to owner (${ownerNotificationEmail}), ID: ${ownerRes.data.id}`);
      }
    } catch (err: any) {
      console.error("Resend error sending to owner:", err.message || err);
    }

    return { clientEmailSent, ownerEmailSent };
  }

  // ─── SECONDARY FALLBACK: SMTP ───
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    if (email && email.includes("@")) {
      try {
        await transporter.sendMail({
          from: `"Nabeel | Asaheeb Real Estate" <${smtpUser}>`,
          to: email,
          subject: `VIP Real Estate Advisory Confirmed with Founder Nabeel [#${bookingReference}]`,
          html: clientHtml,
        });
        clientEmailSent = true;
      } catch (err) {
        console.error("SMTP error sending client confirmation email:", err);
      }
    }

    try {
      await transporter.sendMail({
        from: `"Asaheeb VIP Advisory Engine" <${smtpUser}>`,
        to: ownerNotificationEmail,
        cc: CONTACT_EMAIL,
        subject: `[VIP Advisory Booked] ${currency} ${formattedFee} — ${fullName} (${preferredMeetingMode})`,
        html: ownerHtml,
      });
      ownerEmailSent = true;
    } catch (err) {
      console.error("SMTP error sending owner advisory notification email:", err);
    }
  }

  return { clientEmailSent, ownerEmailSent };
}
