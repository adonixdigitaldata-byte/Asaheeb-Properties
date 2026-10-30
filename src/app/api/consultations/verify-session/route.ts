import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { getLiveConsultationSettings } from "@/lib/consultationData";
import { sendConsultationNotifications } from "@/lib/consultationEmails";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    const bookingReference = searchParams.get("booking_reference");

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Missing session_id parameter" },
        { status: 400 }
      );
    }

    if (!isStripeConfigured() || !stripe) {
      return NextResponse.json({
        success: false,
        error: "Stripe is not configured in environment",
      });
    }

    // Retrieve live session directly from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({
        success: false,
        error: "Payment has not been completed",
        status: session.payment_status,
      });
    }

    const metadata = session.metadata || {};
    const ref = bookingReference || metadata.bookingReference;

    // Check existing booking in Supabase using admin client
    let bookingData: any = null;
    if (ref) {
      const { data } = await supabaseAdmin
        .from("consultation_bookings")
        .select("*")
        .eq("booking_reference", ref)
        .maybeSingle();
      bookingData = data;
    }

    const liveSettings = await getLiveConsultationSettings();
    const feeAmount = metadata.feeAmount !== undefined && metadata.feeAmount !== ""
      ? Number(metadata.feeAmount)
      : (session.amount_total ? session.amount_total / 100 : liveSettings.feeAmount);
    
    const creditMultiplier = Number(metadata.creditMultiplier) || liveSettings.creditMultiplier || 1;
    const creditValue = metadata.creditValue !== undefined && metadata.creditValue !== ""
      ? Number(metadata.creditValue)
      : (bookingData?.credit_value ? Number(bookingData.credit_value) : feeAmount * creditMultiplier);
      
    const currency = (metadata.currency || session.currency || liveSettings.currency || "SAR").toUpperCase();
    const voucherCode = bookingData?.voucher_code || metadata.voucherCode || `VOUCHER-${creditValue}-NBL-AUTO`;
    const meetingMode = bookingData?.preferred_meeting_mode || metadata.preferredMeetingMode || "ONLINE_VIDEO";
    const paymentTransactionId = (session.payment_intent as string) || session.id;

    // If not yet marked SUCCESS in database, mark it and send notifications
    if (bookingData && bookingData.payment_status !== "SUCCESS") {
      try {
        await supabaseAdmin
          .from("consultation_bookings")
          .update({
            payment_status: "SUCCESS",
            status: "PAID_UNSCHEDULED",
            payment_transaction_id: paymentTransactionId,
            paid_at: new Date().toISOString(),
          })
          .eq("booking_reference", ref);

        // Send notifications to BOTH parties
        await sendConsultationNotifications({
          bookingReference: ref,
          fullName: metadata.fullName || bookingData.full_name || "Valued Investor",
          email: session.customer_email || metadata.email || bookingData.email || "",
          phone: metadata.phone || bookingData.phone_number || "",
          cityOrCountry: metadata.cityOrCountry || bookingData.city_or_country || "Saudi Arabia",
          buyerIntent: metadata.buyerIntent || bookingData.buyer_intent || "HIGH_RENTAL_YIELD",
          budgetRange: metadata.budgetRange || bookingData.budget_range || "SAR 1M – 3M",
          preferredMeetingMode: meetingMode,
          notes: metadata.notes || bookingData.notes_or_questions || "",
          feeAmount,
          creditValue,
          currency,
          voucherCode,
          paymentMethod: "STRIPE",
          paymentTransactionId,
          ownerNotificationEmail: metadata.ownerNotificationEmail || liveSettings.ownerNotificationEmail || "buy@asaheebrealestate.com",
          creditMultiplier,
        });
      } catch (err) {
        console.warn("Could not finalize booking in verify-session:", err);
      }
    }

    return NextResponse.json({
      success: true,
      bookingReference: ref,
      voucherCode,
      creditValue,
      amountPaid: feeAmount,
      currency,
      meetingMode,
      paymentStatus: "SUCCESS",
    });
  } catch (err: any) {
    console.error("Error verifying Stripe session:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to verify payment session" },
      { status: 500 }
    );
  }
}

