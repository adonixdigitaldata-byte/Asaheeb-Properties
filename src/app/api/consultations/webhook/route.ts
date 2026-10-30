import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { getLiveConsultationSettings } from "@/lib/consultationData";
import { sendConsultationNotifications } from "@/lib/consultationEmails";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured in environment" },
      { status: 400 }
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // In dev mode or when secret is not set, parse payload directly
      event = JSON.parse(rawBody) as Stripe.Event;
    }
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle successful one-time Checkout Session
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const bookingReference = metadata.bookingReference;
    const fullName = metadata.fullName || "Valued Investor";
    const email = session.customer_email || metadata.email || "";
    const phone = metadata.phone || "";
    const cityOrCountry = metadata.cityOrCountry || "Saudi Arabia";
    const buyerIntent = metadata.buyerIntent || "HIGH_RENTAL_YIELD";
    const budgetRange = metadata.budgetRange || "SAR 1M – 3M";
    const preferredMeetingMode = metadata.preferredMeetingMode || "ONLINE_VIDEO";
    const notes = metadata.notes || "";
    const liveSettings = await getLiveConsultationSettings();
    const feeAmount = metadata.feeAmount !== undefined && metadata.feeAmount !== ""
      ? Number(metadata.feeAmount)
      : (session.amount_total ? session.amount_total / 100 : liveSettings.feeAmount);
    const creditMultiplier = Number(metadata.creditMultiplier) || liveSettings.creditMultiplier || 1;
    const creditValue = metadata.creditValue !== undefined && metadata.creditValue !== ""
      ? Number(metadata.creditValue)
      : feeAmount * creditMultiplier;
    const currency = (metadata.currency || session.currency || liveSettings.currency || "SAR").toUpperCase();
    const voucherCode = metadata.voucherCode || `VOUCHER-${creditValue}-NBL-AUTO`;
    const ownerNotificationEmail = metadata.ownerNotificationEmail || liveSettings.ownerNotificationEmail || "buy@asaheebrealestate.com";
    const paymentTransactionId = (session.payment_intent as string) || session.id;

    console.log(`✅ Stripe payment completed for booking: ${bookingReference}`);

    // 1. Update booking status in Supabase
    if (bookingReference) {
      try {
        await supabaseAdmin
          .from("consultation_bookings")
          .update({
            payment_status: "SUCCESS",
            status: "PAID_UNSCHEDULED",
            payment_transaction_id: paymentTransactionId,
            paid_at: new Date().toISOString(),
          })
          .eq("booking_reference", bookingReference);
      } catch (dbErr) {
        console.error("Error updating consultation_bookings in webhook:", dbErr);
      }
    }

    // 2. Increment weekly slot booked counter
    try {
      const { data: currentSettings } = await supabaseAdmin
        .from("consultation_settings")
        .select("id, slots_booked_this_week")
        .limit(1)
        .maybeSingle();

      if (currentSettings) {
        await supabaseAdmin
          .from("consultation_settings")
          .update({
            slots_booked_this_week: (currentSettings.slots_booked_this_week || 0) + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentSettings.id);
      }
    } catch (slotErr) {
      console.warn("Could not increment slot counter in webhook:", slotErr);
    }

    // 3. Dispatch notifications to BOTH parties
    await sendConsultationNotifications({
      bookingReference,
      fullName,
      email,
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
      paymentMethod: "STRIPE",
      paymentTransactionId,
      ownerNotificationEmail,
      creditMultiplier,
    });
  }

  return NextResponse.json({ received: true });
}

