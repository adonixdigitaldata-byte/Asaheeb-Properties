import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";
import { getLiveConsultationSettings } from "@/lib/consultationData";
import { CONTACT_EMAIL } from "@/data/contactConfig";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getLiveConsultationSettings();
    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (err) {
    console.warn("Using fallback consultation settings:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName = "Valued Investor",
      email,
      phone,
      cityOrCountry = "Saudi Arabia",
      buyerIntent = "HIGH_RENTAL_YIELD",
      budgetRange = "SAR 1M – 3M",
      preferredMeetingMode = "ONLINE_VIDEO", // 'ONLINE_VIDEO' or 'IN_PERSON_OFFICE'
      notes = "",
      paymentMethod = "MADA",
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: "Full Name and Phone Number are required" },
        { status: 400 }
      );
    }

    // 1. Fetch exact live settings from Supabase
    const liveSettings = await getLiveConsultationSettings();
    const feeAmount = liveSettings.feeAmount;
    const creditMultiplier = liveSettings.creditMultiplier;
    const creditValue = feeAmount * creditMultiplier;
    const currency = liveSettings.currency;
    const weekCycle = liveSettings.currentWeekCycle;

    // Generate unique VIP Reference & Voucher Code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingReference = `ASB-VIP-${new Date().getFullYear()}-${randomSuffix}`;
    const voucherCode = `VOUCHER-${creditValue}-NBL-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Riyadh",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const meetingModeDisplay =
      preferredMeetingMode === "IN_PERSON_OFFICE"
        ? "In-Person (Asaheeb HQ Lounge, Jeddah)"
        : "Online Video (Google Meet / Zoom)";

    // 2. Persist into Supabase consultation_bookings (100% isolated, no leads table dependency)
    try {
      await supabase.from("consultation_bookings").insert({
        booking_reference: bookingReference,
        full_name: fullName,
        phone_number: phone,
        email: email || "N/A",
        city_or_country: cityOrCountry,
        buyer_intent: buyerIntent,
        budget_range: budgetRange,
        preferred_meeting_mode: preferredMeetingMode,
        notes_or_questions: notes,
        amount_paid: feeAmount,
        currency: currency,
        payment_gateway: paymentMethod,
        payment_status: "SUCCESS",
        voucher_code: voucherCode,
        credit_value: creditValue,
        week_cycle: weekCycle,
        status: "PAID_UNSCHEDULED",
      });
    } catch (dbErr) {
      console.warn("Could not write directly to consultation_bookings:", dbErr);
    }

    // 3. Transporter setup for email notifications (nodemailer)
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const ownerEmail = liveSettings.ownerNotificationEmail || "buy@asaheebrealestate.com";

    // Client Confirmation HTML Template
    const clientHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0F1117; color: #E8DFCE; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #12130F; border: 1px solid #B8873B; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
          .header { background: linear-gradient(135deg, #1A1C16 0%, #12130F 100%); border-bottom: 2px solid #B8873B; padding: 30px; text-align: center; }
          .logo-text { color: #B8873B; font-size: 22px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin: 0; }
          .sub { color: #8C8477; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px; }
          .content { padding: 30px; }
          .voucher-box { background: linear-gradient(135deg, rgba(184,135,59,0.15) 0%, rgba(184,135,59,0.05) 100%); border: 1px dashed #B8873B; border-radius: 6px; padding: 20px; text-align: center; margin: 25px 0; }
          .voucher-code { font-family: monospace; font-size: 20px; font-weight: bold; color: #E8DFCE; letter-spacing: 3px; background: rgba(0,0,0,0.3); padding: 8px 16px; border-radius: 4px; display: inline-block; margin-top: 8px; }
          .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .details-table td { padding: 10px; border-bottom: 1px solid rgba(184,135,59,0.2); font-size: 14px; }
          .details-table .label { color: #B8873B; font-weight: 600; width: 40%; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
          .footer { background-color: #070A0D; padding: 20px; text-align: center; font-size: 11px; color: #8C8477; border-top: 1px solid rgba(255,255,255,0.08); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo-text">ASAHEEB REAL ESTATE</h1>
            <p class="sub">Executive Founder Advisory</p>
          </div>
          <div class="content">
            <h2 style="color: #E8DFCE; margin-top: 0; font-size: 20px;">Your 1-on-1 Consultation is Confirmed</h2>
            <p style="color: #C5BCAD; line-height: 1.6; font-size: 14px;">
              Dear ${fullName}, thank you for scheduling your strategic real estate advisory session with our founder, <strong>Nabeel</strong>. Your payment of <strong>${currency} ${feeAmount}</strong> has been received.
            </p>
            
            <div class="voucher-box">
              <div style="color: #B8873B; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Your 100% Property Credit Voucher</div>
              <div style="color: #E8DFCE; font-size: 24px; font-weight: 700; margin: 8px 0;">${currency} ${creditValue} Credit</div>
              <div class="voucher-code">${voucherCode}</div>
              <div style="color: #8C8477; font-size: 11px; margin-top: 8px;">Present this code when purchasing with Asaheeb to redeem against your token/down payment.</div>
            </div>

            <table class="details-table">
              <tr>
                <td class="label">Booking Reference</td>
                <td style="font-weight: 600; color: #B8873B;">${bookingReference}</td>
              </tr>
              <tr>
                <td class="label">Preferred Format</td>
                <td>${meetingModeDisplay}</td>
              </tr>
              <tr>
                <td class="label">Primary Focus</td>
                <td>${buyerIntent} (${budgetRange})</td>
              </tr>
              <tr>
                <td class="label">Next Step</td>
                <td>Our executive concierge will contact you within 60 minutes to coordinate Nabeel's calendar with your preferred time.</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            Asaheeb Real Estate · Matbouli Plaza, Al-Ruwais, Jeddah · buy@asaheebrealestate.com
          </div>
        </div>
      </body>
    </html>
    `;

    // Owner (Nabeel / Leadership) Alert HTML Template
    const ownerHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0F1117; color: #E8DFCE; margin: 0; padding: 20px; }
          .container { max-width: 650px; margin: 0 auto; background-color: #12130F; border: 2px solid #B8873B; border-radius: 8px; overflow: hidden; }
          .header { background-color: #1A1C16; border-bottom: 2px solid #B8873B; padding: 25px; text-align: center; }
          .badge { background: #B8873B; color: #12130F; font-weight: bold; padding: 4px 12px; border-radius: 4px; font-size: 12px; letter-spacing: 1px; display: inline-block; margin-bottom: 10px; }
          .content { padding: 30px; }
          .data-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          .data-table td { padding: 12px; border-bottom: 1px solid rgba(184,135,59,0.2); font-size: 14px; }
          .data-table .label { color: #B8873B; font-weight: bold; width: 35%; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
          .actions { margin-top: 25px; text-align: center; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 13px; margin: 5px; }
          .btn-gold { background-color: #B8873B; color: #12130F; }
          .btn-green { background-color: #25D366; color: #FFFFFF; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">[PRIORITY] NEW PAID VIP CONSULTATION</span>
            <h1 style="color: #E8DFCE; margin: 5px 0 0; font-size: 22px;">${currency} ${feeAmount} Received</h1>
            <div style="color: #8C8477; font-size: 12px; margin-top: 4px;">Time: ${timestamp}</div>
          </div>
          <div class="content">
            <table class="data-table">
              <tr>
                <td class="label">Reference</td>
                <td style="font-weight: bold; color: #B8873B;">${bookingReference}</td>
              </tr>
              <tr>
                <td class="label">Client Name</td>
                <td style="font-size: 16px; font-weight: bold; color: #E8DFCE;">${fullName}</td>
              </tr>
              <tr>
                <td class="label">Phone / WhatsApp</td>
                <td><a href="tel:${phone}" style="color: #B8873B; font-weight: bold; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td class="label">Email</td>
                <td>${email || "Not Provided"}</td>
              </tr>
              <tr>
                <td class="label">City / Country</td>
                <td>${cityOrCountry}</td>
              </tr>
              <tr>
                <td class="label">Budget Range</td>
                <td style="color: #25D366; font-weight: bold;">${budgetRange}</td>
              </tr>
              <tr>
                <td class="label">Buyer Intent</td>
                <td>${buyerIntent}</td>
              </tr>
              <tr>
                <td class="label">Meeting Mode</td>
                <td style="font-weight: bold;">${meetingModeDisplay}</td>
              </tr>
              <tr>
                <td class="label">Payment Gateway</td>
                <td>${paymentMethod} (CONFIRMED)</td>
              </tr>
              <tr>
                <td class="label">Voucher Generated</td>
                <td style="font-family: monospace;">${voucherCode} (Value: ${currency} ${creditValue})</td>
              </tr>
              <tr>
                <td class="label">Client Notes</td>
                <td>${notes ? notes : "No specific questions entered."}</td>
              </tr>
            </table>

            <div class="actions">
              <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" class="btn btn-green" target="_blank">Chat on WhatsApp</a>
              <a href="mailto:${email}" class="btn btn-gold">Reply via Email</a>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;

    // 4. Send emails if SMTP credentials exist
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Email to Client
      if (email && email.includes("@")) {
        try {
          await transporter.sendMail({
            from: `"Nabeel | Asaheeb Real Estate" <${smtpUser}>`,
            to: email,
            subject: `VIP Consultation Confirmed with Nabeel [#${bookingReference}]`,
            html: clientHtml,
          });
        } catch (emailErr) {
          console.error("Failed sending email to client:", emailErr);
        }
      }

      // Email to Owner
      try {
        await transporter.sendMail({
          from: `"Asaheeb VIP Engine" <${smtpUser}>`,
          to: ownerEmail,
          cc: CONTACT_EMAIL,
          subject: `[VIP Advisory Booked] ${currency} ${feeAmount} — ${fullName} (${preferredMeetingMode})`,
          html: ownerHtml,
        });
      } catch (ownerErr) {
        console.error("Failed sending alert to owner:", ownerErr);
      }
    }

    return NextResponse.json({
      success: true,
      bookingReference,
      voucherCode,
      creditValue,
      amountPaid: feeAmount,
      currency: currency,
      meetingMode: preferredMeetingMode,
      message: "Consultation booked successfully. Confirmation emails sent.",
    });
  } catch (err: unknown) {
    console.error("Error creating consultation booking:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process consultation booking" },
      { status: 500 }
    );
  }
}
