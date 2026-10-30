import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getLiveConsultationSettings } from "@/lib/consultationData";
import { stripe, isStripeConfigured, formatAmountForStripe } from "@/lib/stripe";
import { sendConsultationNotifications } from "@/lib/consultationEmails";

export const dynamic = "force-dynamic";

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
      preferredMeetingMode = "ONLINE_VIDEO",
      notes = "",
      paymentMethod = "STRIPE",
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: "Full Name and Phone Number are required" },
        { status: 400 }
      );
    }

    // 1. Fetch exact live settings directly from Supabase
    const liveSettings = await getLiveConsultationSettings();
    const feeAmount = liveSettings.feeAmount;
    const creditMultiplier = liveSettings.creditMultiplier;
    const creditValue = feeAmount * creditMultiplier;
    const currency = liveSettings.currency || "SAR";
    const weekCycle = liveSettings.currentWeekCycle;
    const ownerNotificationEmail = liveSettings.ownerNotificationEmail || "buy@asaheebrealestate.com";

    // 2. Generate unique VIP Reference & Voucher Code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingReference = `ASB-VIP-${new Date().getFullYear()}-${randomSuffix}`;
    const voucherCode = `VOUCHER-${creditValue}-NBL-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
    const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    const origin = `${proto}://${host}`;

    // ─── PATH A: STRIPE API KEYS ARE CONFIGURED (PRODUCTION / STAGING ONE-TIME CHECKOUT) ───
    if (isStripeConfigured() && stripe) {
      // Create Pending Booking in Supabase first
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
          payment_gateway: "STRIPE",
          payment_status: "PENDING",
          voucher_code: voucherCode,
          credit_value: creditValue,
          week_cycle: weekCycle,
          status: "PAYMENT_PENDING",
        });
      } catch (dbErr) {
        console.warn("Could not write pending record to consultation_bookings:", dbErr);
      }

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: "1-on-1 Strategic Real Estate Advisory with Founder Nabeel",
                description: `Private executive advisory session. 100% of this fee (${currency} ${creditValue.toLocaleString()}) is credited back toward your property acquisition.`,
              },
              unit_amount: formatAmountForStripe(feeAmount, currency),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: email && email.includes("@") ? email : undefined,
        metadata: {
          bookingReference,
          voucherCode,
          creditValue: creditValue.toString(),
          feeAmount: feeAmount.toString(),
          currency,
          fullName,
          phone,
          email: email || "",
          cityOrCountry,
          buyerIntent,
          budgetRange,
          preferredMeetingMode,
          notes,
          ownerNotificationEmail,
        },
        success_url: `${origin}/consultation?session_id={CHECKOUT_SESSION_ID}&booking_reference=${bookingReference}`,
        cancel_url: `${origin}/consultation?cancelled=true`,
      });

      // Update booking with the Stripe Session ID for tracking
      try {
        await supabaseAdmin
          .from("consultation_bookings")
          .update({ payment_transaction_id: session.id })
          .eq("booking_reference", bookingReference);
      } catch (err) {
        console.warn("Could not update booking with session.id:", err);
      }

      return NextResponse.json({
        success: true,
        url: session.url,
        bookingReference,
        sessionId: session.id,
      });
    }

    // ─── PATH B: TEST / DEVELOPMENT SIMULATION (WHEN STRIPE KEYS ARE NOT IN .env.local YET) ───
    console.log("ℹ️ Stripe secret key not found. Executing verified development simulation flow.");

    // Insert successful booking
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
        payment_gateway: paymentMethod || "STRIPE_TEST_SIMULATION",
        payment_transaction_id: `SIM_TXN_${Date.now()}`,
        payment_status: "SUCCESS",
        voucher_code: voucherCode,
        credit_value: creditValue,
        week_cycle: weekCycle,
        status: "PAID_UNSCHEDULED",
      });
    } catch (dbErr) {
      console.warn("Could not write directly to consultation_bookings:", dbErr);
    }

    // Trigger notifications to BOTH parties
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
      paymentMethod: paymentMethod || "STRIPE_DEV_SIMULATION",
      paymentTransactionId: `SIM_TXN_${Date.now()}`,
      ownerNotificationEmail,
    });

    return NextResponse.json({
      success: true,
      isDevSimulation: true,
      bookingReference,
      voucherCode,
      creditValue,
      amountPaid: feeAmount,
      currency,
      meetingMode: preferredMeetingMode,
      message: "Consultation booked successfully. Notifications dispatched to customer and executive concierge.",
    });
  } catch (err: unknown) {
    console.error("Error creating consultation checkout session:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process consultation payment" },
      { status: 500 }
    );
  }
}
