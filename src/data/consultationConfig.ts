export interface ConsultationSettings {
  isActive: boolean;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  feeAmount: number;
  currency: string;
  creditMultiplier: number;
  weeklySlotCapacity: number;
  slotsBookedThisWeek: number;
  currentWeekCycle: string;
  customUrgencyBannerEn?: string;
  customUrgencyBannerAr?: string;
  ownerNotificationEmail: string;
}

/**
 * Calculates the active Saturday-to-Thursday advisory cycle.
 * Sunday is a holiday / non-consultation day.
 */
export function getSaturdayToThursdayCycleString(isAr: boolean = false): string {
  const now = new Date();
  const dow = now.getDay(); // 0 = Sunday, 1 = Mon, ..., 6 = Sat

  const satDate = new Date(now);
  if (dow !== 6) {
    satDate.setDate(now.getDate() - (dow + 1));
  }

  const thuDate = new Date(satDate);
  thuDate.setDate(satDate.getDate() + 5);

  const satFormatted = satDate.toLocaleDateString(isAr ? "ar-SA" : "en-US", { month: "short", day: "numeric" });
  const thuFormatted = thuDate.toLocaleDateString(isAr ? "ar-SA" : "en-US", { month: "short", day: "numeric" });

  return isAr
    ? `دورة: السبت ${satFormatted} – الخميس ${thuFormatted} (الأحد عطلة استشارية)`
    : `Cycle: Sat ${satFormatted} – Thu ${thuFormatted} (Sun Holiday)`;
}

export const DEFAULT_CONSULTATION_SETTINGS: ConsultationSettings = {
  isActive: true,
  titleEn: "1-on-1 Strategic Real Estate Advisory with Founder Nabeel",
  titleAr: "استشارة عقارية استراتيجية خاصة مع أ. نبيل (المؤسس)",
  subtitleEn: "Private 1-on-1 portfolio consultation & off-market Vision 2030 allocation strategy. 100% credited towards your property purchase.",
  subtitleAr: "جلسة استشارية خاصة لإدارة محفظتك العقارية والوصول للفرص الحصرية غير المعلنة. رسوم الاستشارة تُخصم بالكامل عند حجز أي عقار.",
  feeAmount: 500,
  currency: "SAR",
  creditMultiplier: 1.0, // 1.0 = 100% refund/credit voucher
  weeklySlotCapacity: 10,
  slotsBookedThisWeek: 7, // 3 slots remaining
  currentWeekCycle: getSaturdayToThursdayCycleString(false),
  ownerNotificationEmail: "buy@asaheebrealestate.com",
};

export interface ConsultationTopic {
  key: "offMarket" | "financial" | "legal" | "community";
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export const CONSULTATION_TOPICS: ConsultationTopic[] = [
  {
    key: "offMarket",
    titleEn: "Off-Market & Pre-Launch Allocations",
    titleAr: "فرص حصرية قبل الطرح العام",
    descEn: "Early priority allocation in prime Jeddah, Riyadh, and Madinah developments before public marketing and pricing adjustments.",
    descAr: "أولوية الحجز في أرقى مشاريع جدة والرياض والمدينة المنورة قبل الإعلان التجاري العام وتصاعد الأسعار.",
  },
  {
    key: "financial",
    titleEn: "Institutional Cash-Flow & Yield Modeling",
    titleAr: "نماذج العائد والتدفقات النقدية",
    descEn: "Institutional-grade financial ROI breakdown customized to your capital, holding horizon, and rental goals.",
    descAr: "تحليل مالي دقيق للعائد الاستثماري وخطة الخروج المالي مصممة وفق رأس مالك وأهدافك الخاصة.",
  },
  {
    key: "legal",
    titleEn: "REGA & Foreign Ownership Structuring",
    titleAr: "التوجيه القانوني وتملك الأجانب",
    descEn: "Complete legal review of freehold title eligibility, Premium Residency visa options, and contract safeguards.",
    descAr: "استيضاح شامل لأنظمة الهيئة العامة للعقار، أهلية تملك غير السعوديين، وفرص الإقامة المميزة.",
  },
  {
    key: "community",
    titleEn: "Private Investor Circle Membership",
    titleAr: "عضوية مجتمع المستثمرين الخاص",
    descEn: "Complimentary lifetime access to our private WhatsApp/Telegram channel with off-market distress deals.",
    descAr: "انضمام فوري ودائم لمجتمع أصاهيب الاستثماري المغلق للحصول على فرص الصفقات العاجلة والمميزة.",
  },
];

export const CONSULTATION_FAQS = [
  {
    qEn: "Why is there an upfront fee for the consultation?",
    qAr: "لماذا توجد رسوم لحجز الاستشارة الاستراتيجية؟",
    aEn: "Nabeel's executive advisory is strictly capped at 10 sessions per week. The fee serves as an authentic commitment deposit, filtering out casual inquiries and ensuring our founder dedicates undivided focus and preparatory due diligence to qualified buyers.",
    aAr: "وقت المؤسس أ. نبيل مخصص لنخبة المستثمرين ومحدد بـ 10 جلسات فقط أسبوعياً. هذا الرسم يمثل عربون التزام جاد لفرز الاستفسارات العشوائية، مما يتيح له التفرغ الكامل لدراسة ملفك الاستثماري وتجهيز الفرص الملائمة.",
  },
  {
    qEn: "How does the 100% Refundable / Purchase Credit work?",
    qAr: "كيف يعمل ضمان الخصم بنسبة 100% عند الشراء؟",
    aEn: "Upon booking, you immediately receive a digital VIP Voucher for SAR 500 (or promotional multiplier value). When you purchase or place a token booking on any apartment, villa, or land with Asaheeb within 12 months, that amount is directly deducted from your down payment or closing costs. You lose nothing; you gain direct founder advisory.",
    aAr: "بمجرد الحجز، تستلم قسيمة رقمية بقيمة 500 ريال (أو بقيمة مضاعفة وفق العروض النشطة). عند حجزك لأي عقار عبر أصاهيب خلال 12 شهراً، يتم خصم هذا المبلغ بالكامل من دفعتك الأولى. أنت لا تخسر شيئاً بل تكسب استشارة مباشرة مع المؤسس.",
  },
  {
    qEn: "Can the meeting be held in-person or is it strictly online?",
    qAr: "هل يمكن عقد اللقاء حضورياً في مقركم أم عن بُعد فقط؟",
    aEn: "We accommodate both formats seamlessly. You can choose a private encrypted video conference via Google Meet or an in-person meeting over authentic Saudi hospitality at the Asaheeb Executive Lounge in Matbouli Plaza, Jeddah, or on-site at a project.",
    aAr: "نوفر كلا الخيارين بكل مرونة. يمكنك الاختيار بين جلسة مرئية مشفرة عن بُعد (Google Meet) أو لقاء حضوري في صالة كبار العملاء بمقر أصاهيب (متبولي بلازا - جدة) بضيافة سعودية أصيلة، أو في موقع المشروع.",
  },
  {
    qEn: "What happens after I complete payment?",
    qAr: "ما هي الخطوة التالية فور إتمام عملية الدفع؟",
    aEn: "You immediately receive an official email confirmation with your booking reference and VIP voucher. Within 60 minutes, our executive concierge contacts you via WhatsApp or phone to coordinate Nabeel's open calendar windows and confirm your appointment.",
    aAr: "تصلك فوراً رسالة تأكيد رسمية وفاتورة إلكترونية عبر البريد الإلكتروني مع رقم الحجز وقسيمة الخصم. وخلال 60 دقيقة، يتواصل معك منسق كبار العملاء لتحديد الموعد الأنسب في جدول أ. نبيل وتأكيد اللقاء.",
  },
  {
    qEn: "What if this week's 10 slots are already booked?",
    qAr: "ماذا لو كانت الجلسات الـ 10 لهذا الأسبوع مكتملة؟",
    aEn: "You can pre-book with priority queue placement for the upcoming week. Your position is locked in, and you will be contacted first as soon as next week's calendar unlocks.",
    aAr: "يمكنك الحجز المسبق بأولوية مؤكدة لدفعة الأسبوع القادم. تضمن بذلك مقعدك وتكون لك الأسبقية في التواصل واختيار الوقت بمجرد فتح الجدول الجديد.",
  },
];
