import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getLiveConsultationSettings } from "@/lib/consultationData";
import { sendConsultationNotifications } from "@/lib/consultationEmails";

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
      await supabaseAdmin.from("consultation_bookings").insert({
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

    // 3. Dispatch notifications to both parties via Resend
    await sendConsultationNotifications({
      bookingReference,
      fullName,
      email: email || "",
      phone,
      cityOrCountry,
      buyerIntent,
      budgetRange,
      preferredMeetingMode,
      notes,
      feeAmount,
      creditValue,
      currency,
      voucherCode,
      paymentMethod,
      paymentTransactionId: `DIRECT_${Date.now()}`,
      ownerNotificationEmail: liveSettings.ownerNotificationEmail || "buy@asaheebrealestate.com",
    });

    return NextResponse.json({
      success: true,
      bookingReference,
      voucherCode,
      creditValue,
      amountPaid: feeAmount,
      currency: currency,
      meetingMode: preferredMeetingMode,
      message: "Consultation booked successfully. Notifications dispatched via Resend.",
    });
  } catch (err: unknown) {
    console.error("Error creating consultation booking:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process consultation booking" },
      { status: 500 }
    );
  }
}
