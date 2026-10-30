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
 * Calculates the active advisory cycle.
 * Formats a clean date range without mentioning specific holidays.
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
    ? `دورة: ${satFormatted} – ${thuFormatted}`
    : `Cycle: ${satFormatted} – ${thuFormatted}`;
}

export const DEFAULT_CONSULTATION_SETTINGS: ConsultationSettings = {
  isActive: true,
  titleEn: "1-on-1 Strategic Real Estate Advisory with Founder Nabeel",
  titleAr: "استشارة عقارية استراتيجية خاصة مع أ. نبيل (المؤسس)",
  subtitleEn: "Pay an upfront reservation fee of SAR 500 to secure your 1-on-1 advisory. When you purchase any property with us, 100% of this fee is credited back towards your purchase — making your consultation effectively free.",
  subtitleAr: "احجز جلستك الخاصة مع المؤسس برسم حجز مسبق قدره 500 ر.س، ويتم خصم المبلغ بالكامل (100%) وتطبيقه كرصيد شراء عند التعاقد على أي عقار معنا — لتكون استشارتك مجانية بالكامل.",
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

export interface ConsultationFaqItem {
  qEn: string;
  qAr: string;
  aEn: string;
  aAr: string;
}

export function getConsultationFaqs(settings: ConsultationSettings): ConsultationFaqItem[] {
  const fee = `${settings.currency} ${settings.feeAmount.toLocaleString()}`;
  const creditVal = settings.feeAmount * settings.creditMultiplier;
  const credit = `${settings.currency} ${creditVal.toLocaleString()}`;
  const feeAr = `${settings.feeAmount.toLocaleString()} ${settings.currency === "SAR" ? "ر.س" : settings.currency}`;
  const creditAr = `${creditVal.toLocaleString()} ${settings.currency === "SAR" ? "ر.س" : settings.currency}`;
  const multiplierLabel = settings.creditMultiplier > 1 ? ` (${settings.creditMultiplier}x)` : "";

  return [
    {
      qEn: "Why do I need to pay an upfront fee for the consultation?",
      qAr: "لماذا يتوجب سداد رسوم مسبقة لحجز الاستشارة؟",
      aEn: `Founder Nabeel's private advisory is strictly capped at ${settings.weeklySlotCapacity} sessions per week. Requiring an upfront fee of ${fee} filters out casual inquiries and guarantees that our founder dedicates in-depth preparatory research and exclusive off-market sourcing specifically for you. Most importantly, you lose nothing: the full ${credit} is credited back toward your property purchase when you buy through Asaheeb.`,
      aAr: `جلسات المؤسس أ. نبيل مخصصة للمستثمرين الجادين ومحددة بـ ${settings.weeklySlotCapacity} جلسات فقط أسبوعياً لضمان أعلى درجات التفرغ ودراسة ملفك الاستثماري وتجهيز أفضل الفرص. سداد رسم الحجز (${feeAr}) مسبقاً يؤكد التزام الطرفين، والأهم من ذلك: المبلغ لا يضيع عليك، بل يُسترد بالكامل ويُخصم بقيمة ${creditAr} من دفعة الشراء عند تعاقدك على أي عقار معنا عبر أصاهيب.`,
    },
    {
      qEn: "How does the Purchase Credit work once I buy?",
      qAr: "كيف يعمل نظام رصيد الشراء والخصم عند التعاقد معكم؟",
      aEn: `The mechanism is completely transparent: You pay the ${fee} consultation fee upfront to secure your slot. Upon payment, you immediately receive an official ${credit} Digital Acquisition Voucher. When you purchase or place a booking deposit on any residential or commercial property with Asaheeb within 12 months, that full ${credit} is directly deducted from your down payment. You pay upfront today for bespoke guidance, and get ${credit} credited back upon purchase — making your consultation effectively free${multiplierLabel}.`,
      aAr: `الآلية واضحة ومباشرة تماماً: تدفع رسوم الاستشارة (${feeAr}) مقدماً لتأكيد حجز جلستك الخاصة مع المؤسس. فور السداد، تستلم قسيمة شراء رقمية معتمدة بقيمة ${creditAr}. وعند تعاقدك على شراء أو حجز أي وحدة سكنية أو تجارية عبر أصاهيب خلال 12 شهراً، يتم خصم الـ ${creditAr} كاملة من دفعتك الأولى. تدفع مسبقاً للحصول على استشارة متخصصة الآن، وتسترد ${creditAr} كرصيد عند الشراء معنا.`,
    },
    {
      qEn: "Can the meeting be held in-person or is it strictly online?",
      qAr: "هل يمكن عقد اللقاء حضورياً في مقركم أم عن بُعد فقط؟",
      aEn: "We accommodate both formats seamlessly. You can choose a private encrypted video conference via Google Meet or an in-person meeting over authentic Saudi hospitality at the Asaheeb Executive Lounge in Matbouli Plaza, Jeddah, or on-site at a project.",
      aAr: "نوفر كلا الخيارين بكل مرونة. يمكنك الاختيار بين جلسة مرئية مشفرة عن بُعد (Google Meet) أو لقاء حضوري في صالة كبار العملاء بمقر أصاهيب (متبولي بلازا - جدة) بضيافة سعودية أصيلة، أو في موقع المشروع.",
    },
    {
      qEn: "What happens after I complete the upfront payment?",
      qAr: "ما الذي يحدث فور إتمام سداد الرسوم المسبقة؟",
      aEn: `You immediately receive an official email confirmation containing your booking reference and your ${credit} Purchase Credit Voucher. Within 60 minutes, our executive concierge contacts you via WhatsApp or phone to confirm the exact time slot that fits your schedule in Nabeel's calendar.`,
      aAr: `تصلك فوراً رسالة تأكيد إلكترونية تحتوي على الرقم المرجعي لحجزك وقسيمة الخصم العقاري المعتمدة بقيمة ${creditAr}. وخلال 60 دقيقة، يتواصل معك منسق كبار المستثمرين لتنسيق الوقت الأنسب لك في جدول أ. نبيل وتأكيد اللقاء.`,
    },
    {
      qEn: "What if this week's slots are already booked?",
      qAr: "ماذا لو كانت الجلسات لهذا الأسبوع مكتملة؟",
      aEn: "You can pre-book with priority queue placement for the upcoming week. Your position is locked in, and you will be contacted first as soon as next week's calendar unlocks.",
      aAr: "يمكنك الحجز المسبق بأولوية مؤكدة لدفعة الأسبوع القادم. تضمن بذلك مقعدك وتكون لك الأسبقية في التواصل واختيار الوقت بمجرد فتح الجدول الجديد.",
    },
  ];
}

export const CONSULTATION_FAQS = getConsultationFaqs(DEFAULT_CONSULTATION_SETTINGS);
