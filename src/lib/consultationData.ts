import { supabaseAdmin, supabase } from "@/lib/supabase";
import { DEFAULT_CONSULTATION_SETTINGS, ConsultationSettings } from "@/data/consultationConfig";

export async function getLiveConsultationSettings(): Promise<ConsultationSettings> {
  try {
    const client = supabaseAdmin || supabase;
    // Query the latest settings row regardless of is_active so we know when bookings are paused!
    const { data, error } = await client
      .from("consultation_settings")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return {
        isActive: data.is_active ?? true,
        titleEn: data.consultation_title_en || DEFAULT_CONSULTATION_SETTINGS.titleEn,
        titleAr: data.consultation_title_ar || DEFAULT_CONSULTATION_SETTINGS.titleAr,
        subtitleEn: DEFAULT_CONSULTATION_SETTINGS.subtitleEn,
        subtitleAr: DEFAULT_CONSULTATION_SETTINGS.subtitleAr,
        feeAmount: Number(data.fee_amount) ?? DEFAULT_CONSULTATION_SETTINGS.feeAmount,
        currency: data.currency || DEFAULT_CONSULTATION_SETTINGS.currency,
        creditMultiplier: Number(data.credit_multiplier) || DEFAULT_CONSULTATION_SETTINGS.creditMultiplier,
        weeklySlotCapacity: Number(data.weekly_slot_capacity) || DEFAULT_CONSULTATION_SETTINGS.weeklySlotCapacity,
        slotsBookedThisWeek: Number(data.slots_booked_this_week) || 0,
        currentWeekCycle: data.current_week_cycle || DEFAULT_CONSULTATION_SETTINGS.currentWeekCycle,
        customUrgencyBannerEn: data.custom_urgency_banner_en,
        customUrgencyBannerAr: data.custom_urgency_banner_ar,
        ownerNotificationEmail: data.owner_notification_email || DEFAULT_CONSULTATION_SETTINGS.ownerNotificationEmail,
      };
    }
  } catch (err) {
    console.warn("Failed fetching live consultation settings from Supabase, using defaults:", err);
  }

  return DEFAULT_CONSULTATION_SETTINGS;
}
