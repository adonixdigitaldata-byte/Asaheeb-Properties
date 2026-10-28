"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import PhoneInputWithCountry from "@/components/ui/PhoneInputWithCountry";
import {
  DEFAULT_CONSULTATION_SETTINGS,
  CONSULTATION_TOPICS,
  CONSULTATION_FAQS,
  ConsultationSettings,
} from "@/data/consultationConfig";
import { WHATSAPP_NUMBER } from "@/data/contactConfig";

/* ─── BESPOKE MONOCHROME LUXURY VECTOR ICONS (NO THIRD-PARTY EMOJIS) ─── */
function SvgShield({ className = "w-4 h-4 text-[#B8873B]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SvgBuilding({ className = "w-5 h-5 text-[#B8873B]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  );
}

function SvgChart({ className = "w-5 h-5 text-[#B8873B]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      <path d="M15 8h3.7v3.7" />
    </svg>
  );
}

function SvgScale({ className = "w-5 h-5 text-[#B8873B]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 16l3-8 3 8a3 3 0 0 1-6 0zM2 16l3-8 3 8a3 3 0 0 1-6 0z" />
      <path d="M7 21h10M12 3v18" />
      <path d="M3 7h18" />
    </svg>
  );
}

function SvgKey({ className = "w-5 h-5 text-[#B8873B]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5-2 2 1.5 1.5L3.5 19.5a2.12 2.12 0 1 0 3 3L15 14l1.5 1.5 2-2L17 12l3.5-3.5" />
    </svg>
  );
}

function SvgVideoCall({ className = "w-5 h-5 text-[#B8873B]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="14" height="16" rx="2" />
      <path d="M16 9l6-4v14l-6-4" />
    </svg>
  );
}

function SvgOffice({ className = "w-5 h-5 text-[#B8873B]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" />
    </svg>
  );
}

function SvgApple({ className = "w-4 h-4 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 170 170">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.85-11.71-14.42-6.53-10.45-11.64-21.99-15.34-34.62-3.7-12.63-5.55-24.38-5.55-35.25 0-14.59 3.8-26.65 11.39-36.18 7.59-9.53 17.2-14.41 28.84-14.65 4.8 0 10.35 1.34 16.66 4.02 6.31 2.68 10.22 4.08 11.71 4.2 1.9-.34 6.04-1.89 12.43-4.65 6.39-2.76 11.83-4 16.32-3.72 12.18.67 22.12 4.96 29.83 12.87-10.74 6.53-16 15.53-15.79 26.99.23 8.95 3.69 16.35 10.39 22.2 6.7 5.86 14.59 9.35 23.68 10.49-2.23 6.94-5.02 14.18-8.37 21.72zM119.22 31.84c0-7.39 2.7-14.28 8.11-20.67 5.41-6.39 12.02-10.42 19.83-12.09.23 1.23.34 2.35.34 3.35 0 7.39-2.8 14.39-8.4 21-5.6 6.61-12.33 10.59-20.19 11.95-.34-1.23-.51-2.41-.51-3.54z" />
    </svg>
  );
}

function SvgCard({ className = "w-4 h-4 text-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function SvgWhatsApp({ className = "w-4 h-4 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface ConsultationClientProps {
  initialSettings?: ConsultationSettings;
}

export default function ConsultationClient({ initialSettings }: ConsultationClientProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  // Dynamic Settings (Initialized directly from Supabase Server Component)
  const [settings, setSettings] = useState<ConsultationSettings>(
    initialSettings || DEFAULT_CONSULTATION_SETTINGS
  );

  // Progressive 4-Stage Form State (1 to 4)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Intent & Budget
  const [buyerIntent, setBuyerIntent] = useState("HIGH_RENTAL_YIELD");
  const [budgetRange, setBudgetRange] = useState("SAR 1M – 3M");

  // Step 2: Delivery Format & Agenda
  const [preferredMeetingMode, setPreferredMeetingMode] = useState<"ONLINE_VIDEO" | "IN_PERSON_OFFICE">("ONLINE_VIDEO");
  const [notes, setNotes] = useState("");

  // Step 3: Contact Dossier
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [email, setEmail] = useState("");
  const [cityOrCountry, setCityOrCountry] = useState(isAr ? "المملكة العربية السعودية" : "Saudi Arabia");

  // Step 4: Payment Instrument
  const [paymentMethod, setPaymentMethod] = useState<"APPLE_PAY" | "MADA" | "CREDIT_CARD">("APPLE_PAY");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step-Scoped Validation Error State (Guarantees errors NEVER leak to previous or next steps)
  const [stepError, setStepError] = useState<{
    step: 1 | 2 | 3 | 4;
    field?: "fullName" | "phone" | "email" | "general";
    message: string;
  } | null>(null);

  const [bookingResult, setBookingResult] = useState<{
    bookingReference: string;
    voucherCode: string;
    creditValue: number;
    amountPaid: number;
    currency: string;
    meetingMode: string;
  } | null>(null);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // CRITICAL FIX: Instantly clear any error whenever the active step changes
  useEffect(() => {
    setStepError(null);
  }, [currentStep]);

  // Live Refresh from API in background to ensure zero lag
  useEffect(() => {
    async function syncSettings() {
      try {
        const res = await fetch("/api/consultations", { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.settings) {
          setSettings(json.settings);
        }
      } catch (err) {
        console.warn("Background sync error:", err);
      }
    }
    syncSettings();
  }, []);

  const slotsRemaining = Math.max(0, settings.weeklySlotCapacity - settings.slotsBookedThisWeek);
  const isFullyBooked = slotsRemaining === 0;
  const isHighUrgency = slotsRemaining <= 2 && slotsRemaining > 0;
  const creditValue = settings.feeAmount * settings.creditMultiplier;

  // Safe Navigation Handler: Completely wipes error state when moving between steps
  const goToStep = (step: 1 | 2 | 3 | 4) => {
    setStepError(null);
    setCurrentStep(step);
  };

  const handleNextFromStep1 = () => {
    goToStep(2);
  };

  const handleNextFromStep2 = () => {
    goToStep(3);
  };

  const handleNextFromStep3 = () => {
    setStepError(null);
    if (!fullName.trim()) {
      setStepError({
        step: 3,
        field: "fullName",
        message: isAr ? "يرجى كتابة الاسم الكامل للمستثمر" : "Please enter your full legal name",
      });
      return;
    }
    if (!phone || (!isPhoneValid && phone.length < 8)) {
      setStepError({
        step: 3,
        field: "phone",
        message: isAr ? "يرجى إدخال رقم هاتف / واتساب صالح للتنسيق" : "Please enter a valid phone or WhatsApp number",
      });
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setStepError({
        step: 3,
        field: "email",
        message: isAr ? "يرجى كتابة بريد إلكتروني صحيح لإرسال القسيمة" : "Please enter a valid email for your voucher",
      });
      return;
    }
    goToStep(4);
  };

  // Final Submission on Step 4
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          cityOrCountry,
          buyerIntent,
          budgetRange,
          preferredMeetingMode,
          notes,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBookingResult({
          bookingReference: data.bookingReference,
          voucherCode: data.voucherCode,
          creditValue: data.creditValue,
          amountPaid: data.amountPaid,
          currency: data.currency,
          meetingMode: data.meetingMode,
        });
        window.scrollTo({ top: 100, behavior: "smooth" });
      } else {
        setStepError({
          step: 4,
          field: "general",
          message: data.error || (isAr ? "تعذر معالجة الطلب، يرجى المحاولة ثانية" : "Failed to process reservation"),
        });
      }
    } catch (err) {
      console.error("Booking error:", err);
      setStepError({
        step: 4,
        field: "general",
        message: isAr ? "خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً" : "Network error, please try again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyVoucher = () => {
    if (bookingResult?.voucherCode) {
      navigator.clipboard.writeText(bookingResult.voucherCode);
      setCopiedVoucher(true);
      setTimeout(() => setCopiedVoucher(false), 3000);
    }
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#12130F] text-[#E8DFCE] selection:bg-[#B8873B] selection:text-[#12130F] font-sans antialiased relative overflow-hidden"
    >
      <PageNav />

      {/* ─── LIVE CAPACITY HEADER BANNER ─── */}
      <div className="pt-20 sm:pt-24 pb-2.5 sm:pb-3 border-b border-[#B8873B]/20 bg-[#141511]/95 backdrop-blur-xl sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          
          {/* Status Label */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-pulse shrink-0" />
            
            {/* Mobile View: Clean, readable 12px */}
            <div className="sm:hidden font-mono text-xs tracking-wider uppercase text-[#D4C7B5] truncate">
              {isFullyBooked ? (
                <span className="text-red-400 font-bold">{isAr ? "مكتمل · حجز مسبق" : "Fully Booked · Pre-book"}</span>
              ) : isHighUrgency ? (
                <span className="text-[#B8873B] font-bold">{isAr ? `مقعد 1 متبقي` : `Only 1 Slot Left`}</span>
              ) : (
                <span>
                  <strong className="text-[#B8873B]">{slotsRemaining}/{settings.weeklySlotCapacity}</strong> {isAr ? "مقاعد متاحة" : "Slots Open"}
                </span>
              )}
              <span className="text-[#8C8477] ml-1.5">· {settings.currentWeekCycle}</span>
            </div>

            {/* Desktop View: Full descriptive text */}
            <div className="hidden sm:block font-mono text-xs tracking-wider uppercase text-[#D4C7B5]">
              {isFullyBooked ? (
                <span className="text-red-400 font-semibold">
                  {isAr
                    ? `اكتملت حصة هذا الأسبوع (${settings.weeklySlotCapacity}/${settings.weeklySlotCapacity}) · أولوية الحجز المسبق مفتوحة`
                    : `Capacity Reached (${settings.weeklySlotCapacity}/${settings.weeklySlotCapacity}) · Pre-Booking Priority Active`}
                </span>
              ) : isHighUrgency ? (
                <span className="text-[#B8873B] font-semibold">
                  {isAr
                    ? `طلب استثنائي: متبقي مقعد واحد فقط (${settings.currentWeekCycle})`
                    : `High Allocation: Only ${slotsRemaining} session remaining for ${settings.currentWeekCycle}`}
                </span>
              ) : (
                <span>
                  <strong className="text-[#B8873B]">
                    {isAr
                      ? `متبقي ${slotsRemaining} من أصل ${settings.weeklySlotCapacity} جلسات استشارية متاحة`
                      : `Only ${slotsRemaining} of ${settings.weeklySlotCapacity} strategic advisory sessions remaining`}
                  </strong>{" "}
                  <span className="text-[#8C8477]">· {settings.currentWeekCycle}</span>
                </span>
              )}
            </div>
          </div>

          {/* Capsule Meter Based on Exact DB Capacity */}
          <div className="flex items-center gap-1 shrink-0">
            {Array.from({ length: settings.weeklySlotCapacity }).map((_, index) => {
              const isBooked = index < settings.slotsBookedThisWeek;
              return (
                <div
                  key={index}
                  title={isBooked ? "Reserved" : "Open Allocation"}
                  className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-xs transition-all duration-500 border ${
                    isBooked
                      ? "bg-[#B8873B]/30 border-[#B8873B]/50"
                      : "bg-[#1F2937]/40 border-[#B8873B] shadow-[0_0_6px_rgba(184,135,59,0.3)]"
                  }`}
                />
              );
            })}
            <span className="font-mono text-xs text-[#8C8477] ml-2 tracking-wider">
              {settings.slotsBookedThisWeek}/{settings.weeklySlotCapacity}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative z-10 pb-28 lg:pb-16">
        
        {/* ─── MOBILE-FIRST COMPACT HEADER (MOBILE ONLY) ─── */}
        <div className="lg:hidden mb-5 space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#B8873B]/10 border border-[#B8873B]/30 text-[#B8873B] font-mono text-xs uppercase tracking-wider">
            <SvgShield className="w-3.5 h-3.5 text-[#B8873B]" />
            <span>{isAr ? "استشارة تنفيذية خاصة · أ. نبيل" : "Executive 1-on-1 Advisory · Nabeel"}</span>
          </div>

          <h1 className="font-serif text-2xl font-normal text-[#E8DFCE] leading-tight">
            {isAr ? (
              <>
                استشارة استثمارية خاصة{" "}
                <span className="italic text-[#B8873B]">مع المؤسس أ. نبيل</span>
              </>
            ) : (
              <>
                Private Strategic Advisory.{" "}
                <span className="italic text-[#B8873B]">With Founder Nabeel.</span>
              </>
            )}
          </h1>

          {/* Guarantee Tag Mobile */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161813] border border-[#B8873B]/40 text-xs sm:text-sm">
            <span className="text-[#8C8477]">{isAr ? "عربون:" : "Deposit:"}</span>
            <span className="font-bold text-[#E8DFCE]">{settings.currency} {settings.feeAmount.toLocaleString()}</span>
            <span className="text-[#B8873B] font-bold">→ {settings.currency} {creditValue.toLocaleString()} {isAr ? "خصم مضمون" : "Credit"}</span>
          </div>
        </div>

        {/* ─── HERO SPLIT-SCREEN: VALUE PROPOSITION (LEFT) + 4-STAGE WIZARD (RIGHT) ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT COLUMN: HERO CREDIBILITY & GUARANTEE */}
          <div className="hidden lg:block lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#B8873B]/10 border border-[#B8873B]/30 text-[#B8873B] font-mono text-xs uppercase tracking-wider">
              <SvgShield className="w-3.5 h-3.5 text-[#B8873B]" />
              <span>{isAr ? "استشارة تنفيذية خاصة · أ. نبيل" : "Executive 1-on-1 Advisory · Nabeel"}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#E8DFCE] font-normal tracking-tight leading-tight">
              {isAr ? (
                <>
                  استشارة استثمارية خاصة{" "}
                  <span className="italic text-[#B8873B] block mt-1.5">مباشرة مع المؤسس أ. نبيل</span>
                </>
              ) : (
                <>
                  Private Strategic Advisory.{" "}
                  <span className="italic text-[#B8873B] block mt-1.5">Directly With Founder Nabeel.</span>
                </>
              )}
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#C5BCAD] leading-relaxed font-light">
              {isAr
                ? "جلسة تحليلية مغلقة مدتها 45 دقيقة مخصصة لإدارة محفظتك الاستثمارية، والوصول إلى صفقات رؤية 2030 قبل الإعلان عنها في السوق. رسوم الاستشارة تُخصم بالكامل عند حجز أي أصل عقاري عبر أصاهيب."
                : "An executive 45-minute confidential consultation focused on your capital allocation, risk-weighted yield models, and unreleased Vision 2030 off-market assets. 100% credited against your property acquisition."}
            </p>

            {/* Zero-Risk Guarantee Callout */}
            <div className="p-5 rounded-xl bg-[#161813] border border-[#B8873B]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#B8873B] font-semibold">
                  {isAr ? "سند ضمان القيمة 100%" : "Capital Deposit Guarantee"}
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  {settings.creditMultiplier}x Credit Voucher
                </span>
              </div>
              
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm sm:text-base text-[#C5BCAD]">
                  {settings.currency} {settings.feeAmount.toLocaleString()}{" "}
                  {isAr ? "يتحول إلى قسيمة شراء بقيمة:" : "converts into a"}
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#B8873B] whitespace-nowrap">
                  {settings.currency} {creditValue.toLocaleString()}
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#8C8477] font-light leading-relaxed">
                {isAr
                  ? `لا توجد أي خسارة مالية. القسيمة المعتمدة تُخصم بالكامل من عربون الشراء أو الدفعة الأولى عند التعاقد على أي مشروع مع أصاهيب خلال 12 شهراً.`
                  : `Zero risk. Your deposit voucher is deducted in full from your down payment or token booking when acquiring any property through Asaheeb within 12 months.`}
              </p>
            </div>

            {/* Trust Metrics Desktop */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#161712] border border-[#B8873B]/20 text-center">
              <div>
                <div className="font-serif text-lg sm:text-xl text-[#B8873B] font-bold">+2.5B SAR</div>
                <div className="font-mono text-xs uppercase text-[#8C8477] mt-0.5">{isAr ? "صفقات منسقة" : "Curated Deals"}</div>
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl text-[#E8DFCE] font-bold">{settings.weeklySlotCapacity} / Week</div>
                <div className="font-mono text-xs uppercase text-[#8C8477] mt-0.5">{isAr ? "الحد الأقصى" : "Weekly Cap"}</div>
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl text-[#B8873B] font-bold">REGA FAL</div>
                <div className="font-mono text-xs uppercase text-[#8C8477] mt-0.5">{isAr ? "مرخص رسمي" : "Certified"}</div>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Link */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                isAr
                  ? "مرحباً، أود الاستفسار بخصوص حجز جلسة استشارية خاصة مع أ. نبيل."
                  : "Hello, I would like to inquire regarding reserving a founder advisory session with Nabeel."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-[#25D366]/30 bg-[#141B15] text-[#25D366] hover:border-[#25D366] transition-all"
            >
              <SvgWhatsApp className="w-5 h-5 fill-[#25D366] shrink-0" />
              <div className="text-left rtl:text-right">
                <div className="font-mono text-xs uppercase tracking-wider font-bold">
                  {isAr ? "التنسيق الفوري عبر واتساب" : "Direct WhatsApp Hotline"}
                </div>
                <div className="font-sans text-xs text-[#8C8477] mt-0.5">
                  {isAr ? "تحدث مع المنسق لمطابقة الأوقات مباشرة" : "Speak to our team before booking"}
                </div>
              </div>
            </a>
          </div>

          {/* RIGHT COLUMN: 4-STAGE PROGRESSIVE WIZARD */}
          <div className="lg:col-span-7 bg-[#161712] border border-[#B8873B]/40 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-2xl relative">
            
            {bookingResult ? (
              /* ─── SUCCESS RESULT (VOUCHER CERTIFICATE) ─── */
              <div className="text-center space-y-6 py-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-[#B8873B]/15 border border-[#B8873B] flex items-center justify-center mx-auto">
                  <SvgShield className="w-7 h-7 text-[#B8873B]" />
                </div>

                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B8873B] font-semibold">
                    {isAr ? "تم تثبيت الحجز بنجاح" : "VIP Allocation Secured"}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#E8DFCE] font-normal mt-1.5">
                    {isAr ? `شكراً لك، ${fullName}` : `Thank You, ${fullName}`}
                  </h2>
                </div>

                <div className="bg-[#12130F] border border-dashed border-[#B8873B]/70 rounded-xl p-5 sm:p-6 text-center">
                  <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#B8873B]">
                    {isAr ? "قسيمة الخصم العقاري المعتمدة" : "Authorized Acquisition Voucher"}
                  </div>
                  <div className="font-serif text-2xl sm:text-4xl font-bold text-[#E8DFCE] my-2">
                    {bookingResult.currency} {bookingResult.creditValue.toLocaleString()} Credit
                  </div>
                  <div className="inline-flex items-center gap-3 bg-[#1A1C16] border border-[#B8873B]/40 px-3.5 py-2 rounded-lg font-mono text-xs sm:text-sm tracking-widest text-[#B8873B]">
                    <span>{bookingResult.voucherCode}</span>
                    <button
                      onClick={handleCopyVoucher}
                      className="text-[10px] sm:text-xs text-[#8C8477] hover:text-[#E8DFCE] border-l border-[#B8873B]/30 pl-2.5 cursor-pointer uppercase font-sans"
                    >
                      {copiedVoucher ? (isAr ? "تم النسخ" : "Copied") : isAr ? "نسخ" : "Copy"}
                    </button>
                  </div>
                  <div className="font-mono text-[10px] text-[#8C8477] mt-2 uppercase tracking-wider">
                    REF: {bookingResult.bookingReference} · 12-MONTH VALIDITY
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-[#C5BCAD] bg-[#1A1C16] p-4 rounded-xl border border-[#B8873B]/20 leading-relaxed text-left rtl:text-right">
                  {isAr
                    ? "سيتواصل معك منسق كبار المستثمرين خلال 60 دقيقة لتأكيد موعد الجلسة في جدول أ. نبيل وإرسال الرابط المشفر أو تفاصيل الاستقبال بالصالة."
                    : "Our executive concierge will contact you within 60 minutes to coordinate Nabeel's open calendar windows and confirm your encrypted link or office reception."}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      isAr
                        ? `مرحباً، لقد أتممت حجز جلسة استشارية خاصة برقم المرجع: ${bookingResult.bookingReference}. أود تنسيق الموعد.`
                        : `Hello, I have reserved a VIP session with Nabeel under ref ${bookingResult.bookingReference}. Looking to coordinate meeting timing.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 rounded-lg bg-[#25D366] text-[#12130F] font-mono text-xs sm:text-sm uppercase font-bold tracking-wider hover:brightness-110 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <SvgWhatsApp className="w-4 h-4 sm:w-5 sm:h-5 fill-[#12130F]" />
                    <span>{isAr ? "تنسيق فوري عبر واتساب" : "Confirm Time on WhatsApp"}</span>
                  </a>

                  <Link
                    href="/projects"
                    className="flex-1 py-3.5 rounded-lg border border-[#B8873B]/40 text-[#E8DFCE] hover:bg-[#B8873B]/10 font-mono text-xs sm:text-sm uppercase tracking-wider text-center transition-all flex items-center justify-center"
                  >
                    {isAr ? "استعراض المشاريع الحالية" : "Explore Active Projects"}
                  </Link>
                </div>
              </div>
            ) : (
              /* ─── 4-STAGE WIZARD FORM ─── */
              <div>
                {/* Stage Progress Header */}
                <div className="border-b border-[#B8873B]/20 pb-4 mb-5 sm:mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#B8873B] font-bold">
                      {isAr ? `المرحلة ${currentStep} من 4` : `Stage ${currentStep} of 4`}
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#8C8477]">
                      {currentStep === 1 && (isAr ? "الهدف والميزانية" : "Focus & Budget")}
                      {currentStep === 2 && (isAr ? "صيغة اللقاء" : "Meeting Delivery")}
                      {currentStep === 3 && (isAr ? "بيانات المستثمر" : "Investor Details")}
                      {currentStep === 4 && (isAr ? "المراجعة والتأكيد" : "Review & Confirm")}
                    </span>
                  </div>

                  {/* 4 Segmented Progress Bars */}
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentStep >= step ? "bg-[#B8873B]" : "bg-gray-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Step-Specific Error Alert (STRICTLY rendered ONLY if error belongs to the active step) */}
                {stepError && stepError.step === currentStep && (
                  <div className="p-3.5 mb-5 rounded-lg bg-red-950/40 border border-red-500/60 text-red-200 text-xs sm:text-sm font-mono animate-fadeIn flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{stepError.message}</span>
                  </div>
                )}

                {/* ─── STAGE 1: INVESTMENT GOAL & BUDGET ─── */}
                {currentStep === 1 && (
                  <div className="space-y-5 animate-fadeIn">
                    <div>
                      <label className="block font-serif text-sm sm:text-base text-[#E8DFCE] mb-2.5 font-bold">
                        {isAr ? "1. ما هو تركيزك الاستثماري الأساسي؟" : "1. What is your primary investment focus?"}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                        {[
                          {
                            key: "HIGH_RENTAL_YIELD",
                            titleEn: "High-Yield Residential",
                            titleAr: "شقق سكنية عالية العائد",
                            descEn: "Targeted rental cash flow in prime hubs",
                            descAr: "عوائد تأجيرية في المحاور الرئيسية",
                          },
                          {
                            key: "CAPITAL_GROWTH",
                            titleEn: "Vision 2030 Capital Growth",
                            titleAr: "نمو رأس المال برؤية 2030",
                            descEn: "Strategic corridor land & pre-launches",
                            descAr: "أراضٍ ومشاريع قبل الطرح العام",
                          },
                          {
                            key: "LUXURY_VILLA_HOME",
                            titleEn: "Private Luxury Villa",
                            titleAr: "فيلا سكنية فاخرة خاصة",
                            descEn: "Prime personal family estate",
                            descAr: "مجمعات سكنية عائلية راقية",
                          },
                          {
                            key: "COMMERCIAL_LAND",
                            titleEn: "Commercial Asset / Land",
                            titleAr: "أصل تجاري أو أرض استثمارية",
                            descEn: "Mixed-use, retail, and commercial assets",
                            descAr: "مبانٍ تجارية ومشاريع متعددة الاستخدام",
                          },
                        ].map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                              setBuyerIntent(item.key);
                              if (stepError) setStepError(null);
                            }}
                            className={`p-3.5 sm:p-4 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                              buyerIntent === item.key
                                ? "bg-[#B8873B]/15 border-[#B8873B] text-[#E8DFCE] shadow-lg"
                                : "bg-[#12130F] border-[#B8873B]/20 text-[#8C8477] hover:border-[#B8873B]/40"
                            }`}
                          >
                            <div className="font-serif text-sm sm:text-base font-bold text-[#E8DFCE]">
                              {isAr ? item.titleAr : item.titleEn}
                            </div>
                            <div className="text-xs sm:text-sm text-[#8C8477] mt-1 font-light">
                              {isAr ? item.descAr : item.descEn}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-serif text-sm sm:text-base text-[#E8DFCE] mb-2 font-bold">
                        {isAr ? "2. الميزانية المرصودة للاستحواذ" : "2. Targeted Capital Budget"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                        {["Under SAR 1M", "SAR 1M – 3M", "SAR 3M – 8M", "SAR 8M – 20M", "SAR 20M+"].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => {
                              setBudgetRange(b);
                              if (stepError) setStepError(null);
                            }}
                            className={`py-2.5 sm:py-3 px-3 rounded-lg border text-center font-mono text-xs sm:text-sm transition-all cursor-pointer truncate ${
                              budgetRange === b
                                ? "bg-[#B8873B] text-[#12130F] font-bold border-[#B8873B] shadow-md"
                                : "bg-[#12130F] border-[#B8873B]/20 text-[#C5BCAD] hover:border-[#B8873B]/40"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextFromStep1}
                      className="w-full py-4 rounded-lg bg-[#B8873B] hover:bg-[#c99544] text-[#12130F] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold shadow-lg transition-all cursor-pointer mt-2"
                    >
                      {isAr ? "التالي: اختيار صيغة اللقاء (2/4) ←" : "Next: Delivery Format (2/4) →"}
                    </button>
                  </div>
                )}

                {/* ─── STAGE 2: MEETING FORMAT & AGENDA ─── */}
                {currentStep === 2 && (
                  <div className="space-y-5 animate-fadeIn">
                    <div>
                      <label className="block font-serif text-sm sm:text-base text-[#E8DFCE] mb-2.5 font-bold">
                        {isAr ? "صيغة الجلسة المفضلة مع أ. نبيل *" : "Preferred Advisory Delivery *"}
                      </label>
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => {
                            setPreferredMeetingMode("ONLINE_VIDEO");
                            if (stepError) setStepError(null);
                          }}
                          className={`w-full p-4 sm:p-5 rounded-xl border text-left rtl:text-right transition-all flex items-start gap-3.5 sm:gap-4 cursor-pointer ${
                            preferredMeetingMode === "ONLINE_VIDEO"
                              ? "bg-[#B8873B]/15 border-[#B8873B] text-[#E8DFCE] shadow-lg"
                              : "bg-[#12130F] border-[#B8873B]/20 text-[#8C8477] hover:border-[#B8873B]/40"
                          }`}
                        >
                          <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-[#B8873B]/10 border border-[#B8873B]/30 flex items-center justify-center shrink-0">
                            <SvgVideoCall className="w-4 sm:w-5 h-4 sm:h-5 text-[#B8873B]" />
                          </div>
                          <div>
                            <div className="font-serif text-sm sm:text-base font-bold text-[#E8DFCE]">
                              {isAr ? "جلسة مرئية مشفرة (عن بُعد)" : "Encrypted Virtual Briefing"}
                            </div>
                            <div className="font-sans text-xs sm:text-sm text-[#8C8477] mt-1 font-light">
                              {isAr
                                ? "Google Meet مع مشاركة الخرائط والنماذج المالية من أي مكان"
                                : "Private Google Meet with HD screen sharing from anywhere"}
                            </div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setPreferredMeetingMode("IN_PERSON_OFFICE");
                            if (stepError) setStepError(null);
                          }}
                          className={`w-full p-4 sm:p-5 rounded-xl border text-left rtl:text-right transition-all flex items-start gap-3.5 sm:gap-4 cursor-pointer ${
                            preferredMeetingMode === "IN_PERSON_OFFICE"
                              ? "bg-[#B8873B]/15 border-[#B8873B] text-[#E8DFCE] shadow-lg"
                              : "bg-[#12130F] border-[#B8873B]/20 text-[#8C8477] hover:border-[#B8873B]/40"
                          }`}
                        >
                          <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-[#B8873B]/10 border border-[#B8873B]/30 flex items-center justify-center shrink-0">
                            <SvgOffice className="w-4 sm:w-5 h-4 sm:h-5 text-[#B8873B]" />
                          </div>
                          <div>
                            <div className="font-serif text-sm sm:text-base font-bold text-[#E8DFCE]">
                              {isAr ? "لقاء حضوري بصالة كبار العملاء" : "Private Lounge at HQ (Jeddah)"}
                            </div>
                            <div className="font-sans text-xs sm:text-sm text-[#8C8477] mt-1 font-light">
                              {isAr
                                ? "متبولي بلازا - جدة (ضيافة قهوة سعودية) أو زيارة موقع المشروع"
                                : "Matbouli Plaza, Jeddah or direct site walkthrough with Nabeel"}
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#B8873B] mb-1.5 font-semibold">
                        {isAr ? "أي نقاط أو مشاريع تود التركيز عليها؟ (اختياري)" : "Agenda Focus or Specific Questions (Optional)"}
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => {
                          setNotes(e.target.value);
                          if (stepError) setStepError(null);
                        }}
                        placeholder={
                          isAr
                            ? "مثال: استفسار عن خطط السداد أو العوائد السياحية..."
                            : "e.g. Inquiring regarding developer payment plans in North Jeddah..."
                        }
                        className="w-full bg-[#12130F] border border-[#B8873B]/30 rounded-lg px-4 py-3 text-xs sm:text-sm text-[#E8DFCE] placeholder-[#555] focus:outline-none focus:border-[#B8873B]"
                      />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => goToStep(1)}
                        className="px-5 sm:px-7 py-3.5 rounded-lg border border-[#B8873B]/30 text-[#8C8477] font-mono text-xs sm:text-sm uppercase hover:text-[#E8DFCE] hover:border-[#B8873B] transition-colors shrink-0 cursor-pointer text-center"
                      >
                        {isAr ? "← رجوع" : "← Back"}
                      </button>
                      <button
                        type="button"
                        onClick={handleNextFromStep2}
                        className="flex-1 py-3.5 px-4 sm:px-6 rounded-lg bg-[#B8873B] hover:bg-[#c99544] text-[#12130F] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold shadow-lg transition-all cursor-pointer text-center truncate"
                      >
                        {isAr ? "التالي: بيانات المستثمر (3/4) ←" : "Next: Investor Details (3/4) →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── STAGE 3: INVESTOR CONTACT DOSSIER ─── */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Full Legal Name */}
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#B8873B] mb-1.5 font-semibold">
                        {isAr ? "الاسم الكامل للمستثمر *" : "Full Legal Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (stepError) setStepError(null);
                        }}
                        placeholder={isAr ? "مثال: م. سلطان الغامدي" : "e.g. Faisal Al-Otaibi"}
                        className={`w-full bg-[#12130F] border rounded-lg px-4 py-3 sm:py-3.5 text-sm sm:text-base text-[#E8DFCE] placeholder-[#555] focus:outline-none transition-colors ${
                          stepError?.field === "fullName" && stepError.step === 3
                            ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                            : "border-[#B8873B]/30 focus:border-[#B8873B]"
                        }`}
                      />
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#B8873B] mb-1.5 font-semibold">
                        {isAr ? "رقم الهاتف / واتساب للتنسيق *" : "Phone / WhatsApp for Coordination *"}
                      </label>
                      <PhoneInputWithCountry
                        value={phone}
                        onChange={(val, isValid) => {
                          setPhone(val);
                          setIsPhoneValid(isValid);
                          if (stepError) setStepError(null);
                        }}
                        isAr={isAr}
                        required
                        defaultCountryCode="SA"
                        error={stepError?.field === "phone" && stepError.step === 3 ? stepError.message : null}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#B8873B] mb-1.5 font-semibold">
                        {isAr ? "البريد الإلكتروني (لاستلام القسيمة والفاتورة) *" : "Email Address (For Voucher Delivery) *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (stepError) setStepError(null);
                        }}
                        placeholder="investor@example.com"
                        className={`w-full bg-[#12130F] border rounded-lg px-4 py-3 sm:py-3.5 text-sm sm:text-base text-[#E8DFCE] placeholder-[#555] focus:outline-none transition-colors ${
                          stepError?.field === "email" && stepError.step === 3
                            ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                            : "border-[#B8873B]/30 focus:border-[#B8873B]"
                        }`}
                      />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        className="px-5 sm:px-7 py-3.5 rounded-lg border border-[#B8873B]/30 text-[#8C8477] font-mono text-xs sm:text-sm uppercase hover:text-[#E8DFCE] hover:border-[#B8873B] transition-colors shrink-0 cursor-pointer text-center"
                      >
                        {isAr ? "← رجوع" : "← Back"}
                      </button>
                      <button
                        type="button"
                        onClick={handleNextFromStep3}
                        className="flex-1 py-3.5 px-4 sm:px-6 rounded-lg bg-[#B8873B] hover:bg-[#c99544] text-[#12130F] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold shadow-lg transition-all cursor-pointer text-center truncate"
                      >
                        {isAr ? "التالي: تأكيد الحجز (4/4) ←" : "Next: Review & Confirm (4/4) →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── STAGE 4: REVIEW & CONFIRM DEPOSIT ─── */}
                {currentStep === 4 && (
                  <form onSubmit={handleSubmitBooking} className="space-y-4 animate-fadeIn">
                    {/* Live Financial Breakdown */}
                    <div className="bg-[#12130F] border border-[#B8873B]/40 rounded-xl p-4 sm:p-5 space-y-2">
                      <div className="flex justify-between font-mono text-xs sm:text-sm text-[#8C8477]">
                        <span>{isAr ? "عربون الاستشارة التنفيذية" : "Executive Advisory Deposit"}</span>
                        <span className="text-[#E8DFCE] font-bold whitespace-nowrap">{settings.currency} {settings.feeAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-mono text-xs sm:text-sm text-emerald-400">
                        <span>{isAr ? `قسيمة خصم معتمدة (${settings.creditMultiplier}x مضاعف)` : `Acquisition Credit (${settings.creditMultiplier}x Multiplier)`}</span>
                        <span className="font-bold whitespace-nowrap">+{settings.currency} {creditValue.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-[#B8873B]/20 pt-2 flex justify-between font-mono text-sm sm:text-base font-bold text-[#E8DFCE]">
                        <span>{isAr ? "التكلفة الصافية عند الشراء" : "Net Cost Upon Acquisition"}</span>
                        <span className="text-[#B8873B] whitespace-nowrap">0 {settings.currency} (100% Free)</span>
                      </div>
                    </div>

                    {/* Payment Selector */}
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#B8873B] mb-2 font-semibold">
                        {isAr ? "بوابة السداد الآمنة" : "Payment Instrument"}
                      </label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("APPLE_PAY")}
                          className={`p-3 sm:p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            paymentMethod === "APPLE_PAY"
                              ? "bg-[#B8873B]/15 border-[#B8873B] text-[#E8DFCE] shadow-md"
                              : "bg-[#12130F] border-[#B8873B]/20 text-[#8C8477]"
                          }`}
                        >
                          <SvgApple className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                          <span className="font-mono text-xs sm:text-sm uppercase font-bold">Apple Pay</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("MADA")}
                          className={`p-3 sm:p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            paymentMethod === "MADA"
                              ? "bg-[#B8873B]/15 border-[#B8873B] text-[#E8DFCE] shadow-md"
                              : "bg-[#12130F] border-[#B8873B]/20 text-[#8C8477]"
                          }`}
                        >
                          <span className="font-mono text-sm sm:text-base font-bold text-[#B8873B]">mada</span>
                          <span className="font-mono text-xs sm:text-sm uppercase font-bold">{isAr ? "مدى" : "Mada"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod("CREDIT_CARD")}
                          className={`p-3 sm:p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                            paymentMethod === "CREDIT_CARD"
                              ? "bg-[#B8873B]/15 border-[#B8873B] text-[#E8DFCE] shadow-md"
                              : "bg-[#12130F] border-[#B8873B]/20 text-[#8C8477]"
                          }`}
                        >
                          <SvgCard className="w-4 sm:w-5 h-4 sm:h-5 text-current" />
                          <span className="font-mono text-xs sm:text-sm uppercase font-bold">{isAr ? "بطاقة" : "Card"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => goToStep(3)}
                        className="px-5 sm:px-7 py-3.5 rounded-lg border border-[#B8873B]/30 text-[#8C8477] font-mono text-xs sm:text-sm uppercase hover:text-[#E8DFCE] hover:border-[#B8873B] transition-colors shrink-0 cursor-pointer text-center"
                      >
                        {isAr ? "← رجوع" : "← Back"}
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 px-4 sm:px-6 rounded-lg bg-[#B8873B] hover:bg-[#c99544] text-[#12130F] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer truncate"
                      >
                        {isSubmitting ? (
                          <span>{isAr ? "جاري التثبيت..." : "Securing Allocation..."}</span>
                        ) : (
                          <span className="truncate">
                            {isAr
                              ? `تأكيد وسداد ${settings.currency} ${settings.feeAmount.toLocaleString()} (مخصومة بالكامل)`
                              : `Confirm & Pay ${settings.currency} ${settings.feeAmount.toLocaleString()} (100% Credited)`}
                          </span>
                        )}
                      </button>
                    </div>

                    <p className="font-mono text-xs text-center text-[#8C8477] tracking-wider uppercase pt-2">
                      {isAr
                        ? "معاملة مشفرة 256-Bit · قسيمة فورية معتمدة · تواصل المنسق خلال 60 دقيقة"
                        : "Encrypted 256-Bit · Instant Voucher · Concierge in 60 Min"}
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ─── 4 PILLARS OF ADVISORY (CUSTOM ARCHITECTURAL SVGS) ─── */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-[#B8873B] block mb-2 font-semibold">
              {isAr ? "محاور الإحاطة الخاصة" : "Executive Advisory Scope"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#E8DFCE] font-normal">
              {isAr ? "ماذا تستفيد من الجلسة المباشرة مع المؤسس؟" : "Direct Intelligence Delivered in Your Session"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONSULTATION_TOPICS.map((topic, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#161712] border border-[#B8873B]/20 hover:border-[#B8873B]/50 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#B8873B]/10 border border-[#B8873B]/30 flex items-center justify-center shrink-0">
                  {topic.key === "offMarket" && <SvgBuilding className="w-5 h-5 text-[#B8873B]" />}
                  {topic.key === "financial" && <SvgChart className="w-5 h-5 text-[#B8873B]" />}
                  {topic.key === "legal" && <SvgScale className="w-5 h-5 text-[#B8873B]" />}
                  {topic.key === "community" && <SvgKey className="w-5 h-5 text-[#B8873B]" />}
                </div>
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#E8DFCE] mb-1">
                    {isAr ? topic.titleAr : topic.titleEn}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#8C8477] leading-relaxed font-light">
                    {isAr ? topic.descAr : topic.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FREQUENTLY ASKED QUESTIONS (ACCORDION) ─── */}
        <section className="mb-12 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-[#B8873B] block mb-2 font-semibold">
              {isAr ? "معلومات هامة" : "Important Details"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#E8DFCE] font-normal">
              {isAr ? "الأسئلة الشائعة حول الاستشارة الخاصة" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-3">
            {CONSULTATION_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#B8873B]/20 bg-[#161712] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left rtl:text-right flex items-center justify-between gap-3 cursor-pointer hover:bg-[#B8873B]/5 transition-colors"
                  >
                    <span className="font-serif text-sm sm:text-base text-[#E8DFCE]">
                      {isAr ? faq.qAr : faq.qEn}
                    </span>
                    <span className="font-mono text-sm text-[#B8873B] font-bold">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 font-sans text-xs sm:text-sm text-[#8C8477] leading-relaxed font-light border-t border-[#B8873B]/10">
                      {isAr ? faq.aAr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
