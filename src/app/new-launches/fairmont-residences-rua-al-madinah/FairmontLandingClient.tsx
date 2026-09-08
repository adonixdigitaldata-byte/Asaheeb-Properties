"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "@/data/contactConfig";
import PhoneInputWithCountry from "@/components/ui/PhoneInputWithCountry";
import { validatePhoneNumber } from "@/data/countriesData";
import { submitWebsiteLead } from "@/lib/api";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";

const PROJECT_NAME_EN = "Fairmont Residences Rua Al Madinah";
const PROJECT_NAME_AR = "فيرمونت ريزيدنسز رؤى المدينة";

interface GalleryImage {
  id: string;
  url: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  descEn: string;
  descAr: string;
  tagEn: string;
  tagAr: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "exterior",
    url: "https://res.cloudinary.com/diwqmlpr/image/upload/v1788854134/asaheeb/projects/fairmont/jschdmsdvtlnqfmjbpak.png",
    titleEn: "Prophet's Mosque Skyline & Facade",
    titleAr: "الواجهة المعمارية وإطلالة الحرم الشريف",
    categoryEn: "Exterior & Skyline",
    categoryAr: "التصميم المعماري",
    descEn: "Contemporary limestone facade with intricate mashrabiya latticework directly overlooking the illuminated minarets of Al-Masjid an-Nabawi.",
    descAr: "واجهة حجرية ملكية بتفاصيل المشربيات الإسلامية المعاصرة مع إطلالة روحانية مباشرة على مآذن المسجد النبوي الشريف.",
    tagEn: "Direct Haram View",
    tagAr: "إطلالة الحرم المباشرة",
  },
  {
    id: "masterplan",
    url: "https://res.cloudinary.com/diwqmlpr/image/upload/v1788854132/asaheeb/projects/fairmont/iap2hel6ludqsq82y3vh.jpg",
    titleEn: "Transformative Masterplan Aerial",
    titleAr: "إطلالة جوية للمخطط العام المتكامل",
    categoryEn: "Masterplan",
    categoryAr: "المخطط العام",
    descEn: "Positioned at the crown of Rua Al Madinah with wide pedestrian boulevards, landscaped courtyards, and direct Haram pathways.",
    descAr: "موقع استراتيجي في قلب وجهة رؤى المدينة التحولية متصل بمسارات المشاة والساحات المظللة المؤدية للحرم.",
    tagEn: "Vision 2030 Flagship",
    tagAr: "رؤية المملكة ٢٠٣٠",
  },
  {
    id: "interior",
    url: "https://res.cloudinary.com/diwqmlpr/image/upload/v1788854135/asaheeb/projects/fairmont/dnwurdek26humgzq2oce.jpg",
    titleEn: "Bespoke Ultra-Luxury Living Suite",
    titleAr: "أجنحة سكنية فاخرة فائقة الرقي",
    categoryEn: "Interiors",
    categoryAr: "التصاميم الداخلية",
    descEn: "Warm natural palettes, premium finishes, and floor-to-ceiling vistas blending Madinah craftsmanship with modern sophistication.",
    descAr: "تشطيبات فاخرة وأثاث مصمم خصيصاً بنوافذ زجاجية ممتدة تمزج بين عبق تراث المدينة المنورة وأعلى معايير الحداثة.",
    tagEn: "120 Residences Only",
    tagAr: "١٢٠ مسكناً فقط",
  },
  {
    id: "entrance",
    url: "https://res.cloudinary.com/diwqmlpr/image/upload/v1788854133/asaheeb/projects/fairmont/akdqqezcesd3kta8ww6d.jpg",
    titleEn: "Grand Arrival & Private Valet Concourse",
    titleAr: "المدخل الملكي واستقبال السيارات الخاص",
    categoryEn: "Grand Arrival",
    categoryAr: "تجربة الاستقبال",
    descEn: "Private residential entrance, shaded porte-cochère, dedicated valet concourse, and 24/7 white-glove Fairmont concierge.",
    descAr: "مدخل سكني خاص ومستقل بالكامل، بهو استقبال ملوكي، وخدمة ركن السيارات وخدمات كونسيرج فيرمونت الفندقية على مدار الساعة.",
    tagEn: "White-Glove Service",
    tagAr: "خدمة كونسيرج ٢٤/٧",
  },
];

const PILLARS = [
  {
    id: "location",
    icon: (
      <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21c-4.97 0-9-4.03-9-9a9 9 0 0 1 18 0c0 4.97-4.03 9-9 9z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
    titleEn: "Unmatched Sacred Location",
    titleAr: "موقع استثنائي بجوار الحرم",
    subtitleEn: "Directly Adjacent to The Prophet’s Mosque",
    subtitleAr: "ملاصق لساحات المسجد النبوي الشريف",
    descEn: "Situated within Rua Al Madinah with awe-inspiring direct vistas over The Prophet’s Mosque, providing effortless spiritual proximity.",
    descAr: "موقع استراتيجي في قلب مشروع رؤى المدينة بإطلالات روحانية آسرة ومباشرة على ساحات ومآذن المسجد النبوي الشريف.",
    badgeEn: "0 METERS TO HARAM",
    badgeAr: "ملاصق لساحات الحرم",
  },
  {
    id: "hospitality",
    icon: (
      <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    titleEn: "Fairmont Five-Star Hospitality",
    titleAr: "ضيافة فيرمونت الأسطورية",
    subtitleEn: "Legendary Accor White-Glove Standard",
    subtitleAr: "معايير ضيافة عالمية من فئة ٥ نجوم",
    descEn: "Access to celebrated Fairmont hospitality: in-residence private dining, luxury housekeeping, valet service, and 24/7 dedicated resident concierge.",
    descAr: "خدمات ضيافة فيرمونت الأسطورية ذات الخمس نجوم: طهاة خاصون، تنظيف فندقي متكامل، وخدمة كونسيرج واستقبال على مدار الساعة.",
    badgeEn: "24/7 CONCIERGE",
    badgeAr: "خدمة كونسيرج على مدار الساعة",
  },
  {
    id: "benefits",
    icon: (
      <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    titleEn: "Accor Ownership VIP Program",
    titleAr: "برنامج مزايا ملاك أكور العالمي",
    subtitleEn: "VIP Privileges Across 5,600+ Hotels",
    subtitleAr: "مكانة VIP في ٥,٦٠٠+ فندق ومنتجع",
    descEn: "Owners gain automatic VIP Tier status in the Accor Ownership Benefits Program*, granting preferential rates and upgrades worldwide.",
    descAr: "عضوية حصرية تمنح الملاك تصنيف VIP عالمي في برنامج مزايا ملاك أكور وأسعاراً تفضيلية وترقيات في فنادق رافلز، فيرمونت، وسوفيتيل حول العالم.",
    badgeEn: "GLOBAL VIP STATUS",
    badgeAr: "عضوية VIP عالمية",
  },
  {
    id: "design",
    icon: (
      <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    titleEn: "Timeless Madinah Heritage",
    titleAr: "تصميم معماري وتراث خالد",
    subtitleEn: "Bespoke Artisanal Craftsmanship",
    subtitleAr: "مستوحى من عبق وأصالة المدينة",
    descEn: "Premium natural stone, bespoke woodwork, and intricate mashrabiya screens engineered for enduring elegance and generational preservation.",
    descAr: "تشطيبات فاخرة من الحجر الطبيعي وأعمال خشبية مصممة خصيصاً مع مشربيات إسلامية أصيلة تعكس الهوية التاريخية للمدينة المنورة.",
    badgeEn: "ARTISANAL FINISHES",
    badgeAr: "تشطيبات حرفية نادرة",
  },
  {
    id: "lifestyle",
    icon: (
      <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    titleEn: "Private Residential Sanctuary",
    titleAr: "خصوصية مطلقة وسكينة روحانية",
    subtitleEn: "120 Limited Residences Only",
    subtitleAr: "١٢٠ مسكناً حصرياً فقط",
    descEn: "Private wellness spa, dedicated resident lounges, high-speed private biometric lifts, and quiet sanctuaries created for spiritual contemplation.",
    descAr: "نادٍ صحي وسبا خاص بالملاك، صالات استقبال ملوكية، مصاعد ذكية خاصة، ومساحات صُممت لتمنحك أقصى درجات السكينة والهدوء.",
    badgeEn: "ULTRA EXCLUSIVE",
    badgeAr: "محدودية استثنائية",
  },
];

const ACCOR_PERKS = [
  {
    titleEn: "Global VIP Tier Status",
    titleAr: "تصنيف VIP عالمي في برنامج أكور",
    descEn: "Automatic Diamond/Platinum tier status across 5,600+ Accor luxury hotels & resorts globally.",
    descAr: "ترقية فورية إلى أعلى فئات العضوية في فنادق ومنتجعات أكور العالمية في أكثر من ١١٠ دولة.",
  },
  {
    titleEn: "Dedicated In-Residence Concierge",
    titleAr: "خدمات كونسيرج فندقية على مدار الساعة",
    descEn: "24/7 dedicated residential team for reservations, private transport, luggage, and tailored hospitality.",
    descAr: "فريق متخصص في خدمة الملاك على مدار الساعة للحجوزات، الاستقبال، والخدمات الخاصة.",
  },
  {
    titleEn: "Bespoke In-Suite Dining & Chefs",
    titleAr: "طهاة خاصون وخدمة طعام راقية داخل المسكن",
    descEn: "Order curated five-star menus from Fairmont restaurants directly to your private dining table.",
    descAr: "تجربة طعام فندقية استثنائية وإمكانية حجز طهاة محترفين داخل مسكنك الخاص.",
  },
  {
    titleEn: "Turnkey Property Asset Management",
    titleAr: "إدارة عقارية وتشغيل فندقي استثماري متكامل",
    descEn: "Optional professional lease and management program operated under Fairmont luxury standards.",
    descAr: "خيار إدارة وتأجير مسكنك عبر برنامج التشغيل الفندقي المعتمد من فيرمونت لتعظيم العائد الاستثماري.",
  },
];

export default function FairmontLandingClient() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const formSectionRef = useRef<HTMLDivElement>(null);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    unitType: "Luxury Branded Residence",
    investmentBudget: "SAR 5,000,000 – SAR 10,000,000",
    clientType: "Individual Investor / End-User",
    notes: "",
  });

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const scrollToRegister = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Body scroll lock & Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") {
        setSelectedGalleryIdx((prev) => (prev + 1) % GALLERY_IMAGES.length);
      }
      if (e.key === "ArrowLeft") {
        setSelectedGalleryIdx((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!form.fullName.trim()) {
      setErrorMessage(isAr ? "يرجى إدخال الاسم الكامل" : "Please enter your full name");
      return;
    }

    if (!form.phone || form.phone.trim().length < 6) {
      setErrorMessage(
        isAr
          ? "يرجى إدخال رقم الهاتف مع رمز الدولة"
          : "Please enter your phone number with country code"
      );
      return;
    }

    const phoneValidation = validatePhoneNumber(form.phone);
    const cleanDigits = form.phone.replace(/\D/g, "");

    if (!phoneValidation.isValid && !isPhoneValid && cleanDigits.length < 7) {
      setErrorMessage(
        isAr
          ? phoneValidation.errorMessageAr || "يرجى إدخال رقم هاتف صحيح للدولة المحددة"
          : phoneValidation.errorMessageEn || "Please provide a valid phone number for the selected country"
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const formattedPhone = phoneValidation.formattedInternational || form.phone.trim();
    const messageContent = `Preferred Unit: ${form.unitType} | Client Type: ${form.clientType} | Inquiries: ${form.notes || "None"}`;

    try {
      await submitWebsiteLead({
        name: form.fullName.trim(),
        phone: formattedPhone,
        email: form.email.trim() || undefined,
        city: "Madinah",
        interest: `${PROJECT_NAME_EN} (${PROJECT_NAME_AR}) - Pre-Launch Allocation`,
        budget: form.investmentBudget,
        message: messageContent,
        notes: messageContent,
        source: "PROPERTY_INQUIRY",
        form_type: "Fairmont Residences Pre-Launch Lead",
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Fairmont pre-launch lead error:", err);
      setErrorMessage(
        isAr
          ? "تعذر إرسال الطلب في الوقت الحالي. يمكنك التواصل معنا مباشرة عبر واتساب لتأكيد حجزك."
          : "Unable to submit your registration at this time. You can reach out directly on WhatsApp to confirm your allocation."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A08] text-[#EDE4D5] selection:bg-[#D4AF37]/30 selection:text-[#FFF] flex flex-col justify-between font-sans relative overflow-x-hidden">
      {/* ─── ASAHEEB GLOBAL HEADER ─────────────────────────────────────── */}
      <PageNav />

      {/* ─── BACKGROUND AMBIENT GLOW EFFECTS ────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#D4AF37]/10 via-amber-500/5 to-transparent rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-[40%] -right-40 w-[500px] h-[500px] bg-[#B8873B]/5 rounded-full blur-[140px]" />
      </div>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────── */}
      <main className="flex-grow pt-[72px] sm:pt-[78px] relative z-10">
        {/* ─── 1. HERO STAGE ─────────────────────────────────────────────── */}
        <section className="relative pt-4 pb-10 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-18 px-4 sm:px-6 lg:px-12 border-b border-[#D4AF37]/20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Refined Luxury Header Strip (Replaces the generic circular pill) */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D4AF37]/25 pb-3.5 mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="font-mono text-[10px] sm:text-xs text-[#D4AF37] font-bold uppercase tracking-[0.2em]">
                  {isAr ? "إطلاق حصري مبكر • الحجز بالأولوية" : "EXCLUSIVE PRE-LAUNCH • PRIORITY ALLOCATION"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#A89F91]">
                <span className="text-[#EDE4D5] font-semibold">{isAr ? "رؤى المدينة" : "Rua Al Madinah"}</span>
                <span className="text-white/25">•</span>
                <span className="text-[#D4AF37]">{isAr ? "صندوق الاستثمارات العامة" : "PIF Portfolio"}</span>
              </div>
            </div>

            {/* Split Hero Layout: On Mobile (<lg) Image comes first (order-1), Text second (order-2) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Architectural Photo Stage: order-1 on mobile, order-2 on desktop */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#D4AF37]/50 via-[#B8873B]/20 to-[#D4AF37]/40 shadow-[0_15px_45px_rgba(0,0,0,0.85)] group">
                  <div className="relative rounded-xl overflow-hidden bg-[#141510]">
                    <div
                      className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden"
                      onClick={() => {
                        setSelectedGalleryIdx(0);
                        setLightboxOpen(true);
                      }}
                    >
                      <Image
                        src="https://res.cloudinary.com/diwqmlpr/image/upload/v1788854134/asaheeb/projects/fairmont/jschdmsdvtlnqfmjbpak.png"
                        alt="Fairmont Residences Rua Al Madinah overlooking The Prophet's Mosque"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                        <span>{isAr ? "المسجد النبوي الشريف" : "The Prophet's Mosque"}</span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/15 text-white/80 font-mono text-[8.5px] uppercase">
                        {isAr ? "انقر للتكبير" : "Click to Enlarge"}
                      </div>
                    </div>

                    {/* Integrated Caption Strip */}
                    <div className="p-3 sm:p-3.5 bg-[#12140F] border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
                      <div className="text-[11px] sm:text-xs font-medium text-white text-left rtl:text-right">
                        {isAr
                          ? "إطلالات مباشرة على ساحات ومآذن المسجد النبوي الشريف"
                          : "Direct panoramic views over The Prophet's Mosque"}
                      </div>

                      <button
                        onClick={() => {
                          setSelectedGalleryIdx(0);
                          setLightboxOpen(true);
                        }}
                        className="shrink-0 px-2.5 py-1 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        {isAr ? "عرض الصور ↗" : "View Photos ↗"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text & CTAs: order-2 on mobile, order-1 on desktop */}
              <div className="lg:col-span-6 order-2 lg:order-1 space-y-5 sm:space-y-6 text-left rtl:text-right">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <span className="font-serif italic text-base sm:text-xl text-[#E5C378] tracking-wide">
                      {isAr ? "بيتٌ قريبٌ من قلبك" : "A Home Close to Your Heart"}
                    </span>
                  </div>

                  <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.18] tracking-tight">
                    {isAr ? (
                      <>
                        فيرمونت ريزيدنسز <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F8E7CD] to-[#D4AF37] font-semibold">
                          رؤى المدينة
                        </span>
                      </>
                    ) : (
                      <>
                        Fairmont Residences <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F8E7CD] to-[#D4AF37] font-semibold">
                          Rua Al Madinah
                        </span>
                      </>
                    )}
                  </h1>
                </div>

                <p className="p-3.5 sm:p-4.5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-[#D4AF37]/25 text-xs sm:text-sm text-[#D8CEBE] leading-relaxed relative">
                  <span className="absolute top-0 bottom-0 left-0 rtl:left-auto rtl:right-0 w-1 bg-gradient-to-b from-[#D4AF37] to-amber-600 rounded-full" />
                  {isAr
                    ? "شرف الجوار وبركة السكن بجوار المسجد النبوي الشريف مباشرة. مجموعة نادرة تضم ١٢٠ مسكناً فندقياً فائق الفخامة، تجمع بين الضيافة الخالدة والإرث الاستثماري المتوارث عبر الأجيال."
                    : "The sacred privilege of living directly adjacent to The Prophet’s Mosque. A limited boutique collection of 120 luxury residences blending Fairmont’s legendary five-star hospitality with enduring generational legacy."}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#1A1C14] to-[#10110D] text-center shadow-md">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#D4AF37]">120</div>
                    <div className="font-sans text-[9.5px] text-[#A89F91] uppercase tracking-wider mt-0.5">
                      {isAr ? "مسكن حصري فقط" : "Limited Units"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#1A1C14] to-[#10110D] text-center shadow-md">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#D4AF37]">0 M</div>
                    <div className="font-sans text-[9.5px] text-[#A89F91] uppercase tracking-wider mt-0.5">
                      {isAr ? "ملاصق للحرم" : "Adjacent to Haram"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#1A1C14] to-[#10110D] text-center shadow-md">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#D4AF37]">5,600+</div>
                    <div className="font-sans text-[9.5px] text-[#A89F91] uppercase tracking-wider mt-0.5">
                      {isAr ? "مزايا فنادق أكور" : "Accor VIP Hotels"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#1A1C14] to-[#10110D] text-center shadow-md">
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#D4AF37]">PIF</div>
                    <div className="font-sans text-[9.5px] text-[#A89F91] uppercase tracking-wider mt-0.5">
                      {isAr ? "رؤى المدينة القابضة" : "Rua Al Madinah"}
                    </div>
                  </div>
                </div>

                {/* Hero Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                  <button
                    onClick={scrollToRegister}
                    className="w-full sm:w-auto py-3.5 px-7 rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#E8C86A] to-[#B8873B] text-[#0A0B08] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all duration-300 text-center cursor-pointer"
                  >
                    {isAr ? "سجّل اهتمامك للحجز المبكر" : "Register Your Interest"}
                  </button>

                  <a
                    href={getWhatsAppLink(
                      "Hello Asaheeb Real Estate, I am interested in Fairmont Residences Rua Al Madinah (Pre-Launch). Please share available unit allocations and pricing details.",
                      "مرحباً أصاهيب العقارية، أنا مهتم بمشروع فيرمونت ريزيدنسز رؤى المدينة (الحجز المبكر). يرجى تزويدي بتفاصيل الوحدات والأسعار المتاحة.",
                      isAr
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3.5 px-5 rounded-sm border border-[#25D366]/50 bg-[#12140F] hover:bg-[#25D366] text-[#25D366] hover:text-[#0A0B08] font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>{isAr ? "مستشار الحجوزات" : "WhatsApp Advisor"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. SACRED PROXIMITY & LOCATION MATRIX ──────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#0E0F0C] border-b border-[#D4AF37]/20 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header: Fixed 2-Line Clean Heading with Mosque on line 2 */}
            <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                <span className="w-5 h-[1px] bg-[#D4AF37]" />
                <span>{isAr ? "الموقع الاستراتيجي والجوار المبارك" : "SACRED PROXIMITY & LOCATION"}</span>
                <span className="w-5 h-[1px] bg-[#D4AF37]" />
              </div>

              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.25]">
                {isAr ? (
                  <>
                    <span className="block">جوارٌ مباركٌ يلامس الوجدان</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F8E7CD] to-[#D4AF37] font-medium">
                      بجوار المسجد النبوي الشريف
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block">The Neighbor of a Lifetime</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F8E7CD] to-[#D4AF37] font-medium">
                      Directly Next to The Prophet’s Mosque
                    </span>
                  </>
                )}
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#B8AF9F] max-w-2xl mx-auto leading-relaxed">
                {isAr
                  ? "في قلب المدينة المنورة، وبجوار المسجد النبوي الشريف مباشرة، يجمع مشروع فيرمونت ريزيدنسز رؤى المدينة بين كرم الضيافة الفندقية الاستثنائية من فئة الخمس نجوم والموقع المقدس الفريد."
                  : "Nestled in the heart of Madinah, directly adjacent to The Prophet’s Mosque, Fairmont Residences Rua Al Madinah blends heartfelt, five-star service with an irreplaceable location."}
              </p>
            </div>

            {/* Matrix & Aerial Presentation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Proximity Metrics */}
              <div className="lg:col-span-5 space-y-3.5">
                {[
                  {
                    distance: isAr ? "٠ متر" : "0 METERS",
                    titleEn: "Al-Masjid an-Nabawi Courtyards",
                    titleAr: "ساحات المسجد النبوي الشريف",
                    descEn: "Direct seamless access via shaded pedestrian boulevards and private residential concourses.",
                    descAr: "وصول مباشر وسلس عبر مسارات المشاة المظللة ومداخل المسكن الخاصة.",
                    icon: "🕌",
                  },
                  {
                    distance: isAr ? "٥ دقائق" : "5 MINS",
                    titleEn: "Rawdah Al-Sharifah & Green Dome",
                    titleAr: "الروضة الشريفة والقبة الخضراء",
                    descEn: "Effortless walking distance for daily prayers and spiritual tranquility at any hour.",
                    descAr: "مسافة مشي يسيرة لأداء الصلوات الخمس والزيارة المباركة بكل سكينة وطمأنينة.",
                    icon: "✨",
                  },
                  {
                    distance: isAr ? "مباشر" : "DIRECT",
                    titleEn: "Rua Al Madinah Central Parkways",
                    titleAr: "مخطط رؤى المدينة والحدائق المركزية",
                    descEn: "Integrated with landscaped green piazzas, artisanal cafes, and curated luxury retail.",
                    descAr: "متصل بحدائق وساحات رؤى المدينة المركزية والمتاجر والمطاعم الراقية.",
                    icon: "🌿",
                  },
                  {
                    distance: isAr ? "٢٠ دقيقة" : "20 MINS",
                    titleEn: "Prince Mohammad Bin Abdulaziz Int'l Airport",
                    titleAr: "مطار الأمير محمد بن عبد العزيز الدولي",
                    descEn: "Rapid expressway connectivity with dedicated resident airport VIP chauffeur services.",
                    descAr: "اتصال سريع عبر المحاور الرئيسية مع خدمة النقل الفاخر للملاك والضيوف.",
                    icon: "✈️",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-4.5 rounded-xl border border-[#D4AF37]/25 bg-gradient-to-r from-[#141610] to-[#10110D] hover:border-[#D4AF37]/60 transition-all flex items-start gap-3.5 shadow-md group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1E2016] border border-[#D4AF37]/35 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div className="space-y-0.5 text-left rtl:text-right flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-sans text-xs sm:text-sm font-bold text-white">
                          {isAr ? item.titleAr : item.titleEn}
                        </h3>
                        <span className="font-mono text-[9px] font-bold text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                          {item.distance}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] sm:text-xs text-[#A89F91] leading-relaxed">
                        {isAr ? item.descAr : item.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Masterplan Render Card */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl p-1 bg-gradient-to-b from-[#D4AF37]/40 via-[#B8873B]/10 to-[#D4AF37]/30 shadow-xl">
                  <div className="rounded-xl overflow-hidden bg-[#13150F]">
                    <div
                      className="relative aspect-[16/10] w-full cursor-pointer group"
                      onClick={() => {
                        setSelectedGalleryIdx(1);
                        setLightboxOpen(true);
                      }}
                    >
                      <Image
                        src="https://res.cloudinary.com/diwqmlpr/image/upload/v1788854132/asaheeb/projects/fairmont/iap2hel6ludqsq82y3vh.jpg"
                        alt="Aerial Masterplan View of Rua Al Madinah"
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover group-hover:scale-103 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 text-left rtl:text-right">
                        <div className="font-mono text-[8.5px] text-[#D4AF37] uppercase tracking-widest font-bold">
                          {isAr ? "المخطط العام" : "MASTERPLAN"}
                        </div>
                        <div className="font-sans text-[11px] font-semibold text-white">
                          {isAr ? "مشروع رؤى المدينة - صندوق الاستثمارات العامة" : "Rua Al Madinah Project - PIF"}
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 text-white/80 font-mono text-[8.5px] uppercase">
                        {isAr ? "انقر للتكبير" : "Click to Enlarge"}
                      </div>
                    </div>

                    <div className="p-4 bg-[#12140F] border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#C5BCAD]">
                      <span className="text-[11px] sm:text-xs">
                        {isAr
                          ? "موقع فيرمونت ريزيدنسز في قلب المخطط الاستراتيجي"
                          : "Fairmont Residences positioned in the heart of Rua Al Madinah"}
                      </span>
                      <button
                        onClick={scrollToRegister}
                        className="text-[#D4AF37] font-mono text-[10.5px] font-bold uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
                      >
                        {isAr ? "احجز وحدتك ←" : "Register Interest →"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. FIVE PILLARS OF LUXURY ──────────────────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#090A08] border-b border-[#D4AF37]/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5">
              <div className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                {isAr ? "مكانٌ لا مثيل له" : "A SANCTUARY UNLIKE ANY OTHER"}
              </div>
              <h2 className="font-display text-2xl sm:text-4xl text-white font-normal">
                {isAr ? "ركائز التميز والفخامة الاستثنائية" : "Five Pillars of Distinctive Living"}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#9E9587]">
                {isAr
                  ? "مزيج متكامل من الموقع المقدس، والضيافة الفندقية الراقية، والمزايا العالمية الحصرية للملاك."
                  : "A harmonious synthesis of sacred location, five-star hospitality, and worldwide privileges."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.id}
                  className={`p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#161811] to-[#10110D] hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl flex flex-col justify-between group ${
                    idx === 0 ? "md:col-span-2 lg:col-span-2 from-[#1B1D14] to-[#11130E]" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#202318] border border-[#D4AF37]/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                        {pillar.icon}
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-mono text-[8.5px] font-bold tracking-wider uppercase">
                        {isAr ? pillar.badgeAr : pillar.badgeEn}
                      </span>
                    </div>

                    <div className="font-mono text-[9.5px] text-[#D4AF37] uppercase tracking-[0.2em] font-semibold mb-1">
                      {isAr ? pillar.subtitleAr : pillar.subtitleEn}
                    </div>

                    <h3 className="font-display text-lg sm:text-xl text-white font-medium mb-2">
                      {isAr ? pillar.titleAr : pillar.titleEn}
                    </h3>

                    <p className="font-sans text-xs text-[#B8AF9F] leading-relaxed">
                      {isAr ? pillar.descAr : pillar.descEn}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[9.5px] font-mono text-[#8C8477]">
                    <span>0{idx + 1}</span>
                    <span className="text-[#D4AF37] font-semibold">
                      {isAr ? "ميزة حصرية للملاك" : "Exclusive Owner Privilege"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. ACCOR OWNERSHIP VIP GOLD BENEFITS ────────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#13150F] via-[#0E100B] to-[#11130D] border-b border-[#D4AF37]/20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-5 space-y-5 text-left rtl:text-right">
                <div className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold border-b border-[#D4AF37]/40 pb-1">
                  {isAr ? "مزايا ملاك أكور العالمية" : "ACCOR OWNERSHIP BENEFITS"}
                </div>

                <h2 className="font-display text-2xl sm:text-4xl text-white font-normal leading-snug">
                  {isAr ? (
                    <>
                      عضوية VIP عالمية <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F8E7CD] to-[#D4AF37]">
                        في ٥,٦٠٠+ فندق ومنتجع
                      </span>
                    </>
                  ) : (
                    <>
                      Global VIP Tier Status <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F8E7CD] to-[#D4AF37]">
                        Across 5,600+ Luxury Hotels
                      </span>
                    </>
                  )}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] leading-relaxed">
                  {isAr
                    ? "بصفتك مالكاً في فيرمونت ريزيدنسز رؤى المدينة، تحصل تلقائياً على مزايا برنامج ملاك أكور الحصري، الذي يمنحك معاملة كبار الشخصيات وترقيات وأسعاراً تفضيلية في أرقى فنادق العالم مثل رافلز، فيرمونت، سوفيتيل وبانيان تري."
                    : "As an owner at Fairmont Residences Rua Al Madinah, you gain exclusive access to the Accor Ownership Benefits Program*, granting you VIP status, room upgrades, and preferential rates across prestigious worldwide destinations."}
                </p>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-[#D4AF37]/25 text-xs text-[#D8CEBE]">
                  <div className="font-mono text-[9.5px] text-[#D4AF37] uppercase tracking-wider mb-1 font-bold">
                    {isAr ? "ضيافة متوارثة عبر الأجيال" : "Generational Hospitality Asset"}
                  </div>
                  {isAr
                    ? "تشمل المزايا إمكانية الاستفادة من برامج التشغيل الفندقي المعتمدة من فيرمونت لتعظيم العوائد الاستثمارية."
                    : "Includes optional managed hospitality services under Fairmont luxury standards."}
                </div>
              </div>

              {/* Right Column: Perks Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ACCOR_PERKS.map((perk, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-[#D4AF37]/25 bg-[#161811] hover:border-[#D4AF37]/55 transition-all shadow-md space-y-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center font-mono text-[11px] font-bold text-[#D4AF37]">
                      0{idx + 1}
                    </div>
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white">
                      {isAr ? perk.titleAr : perk.titleEn}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs text-[#A89F91] leading-relaxed">
                      {isAr ? perk.descAr : perk.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. ARCHITECTURAL SHOWCASE & GALLERY (REDUCED COMPACT HEIGHT) ─── */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#090A08] border-b border-[#D4AF37]/20">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
              <div className="space-y-1.5 text-left rtl:text-right">
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                  {isAr ? "معرض الصور والتصاميم" : "ARCHITECTURAL SHOWCASE"}
                </div>
                <h2 className="font-display text-xl sm:text-3xl text-white font-normal">
                  {isAr ? "استكشف تفاصيل ومرافق المشروع" : "Visualizing The Masterpiece"}
                </h2>
              </div>

              {/* Gallery Category Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {GALLERY_IMAGES.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      selectedGalleryIdx === idx
                        ? "bg-[#D4AF37] text-[#0A0B08] font-bold shadow-sm"
                        : "bg-[#161811] text-[#A89F91] hover:text-white border border-white/10"
                    }`}
                  >
                    {isAr ? img.categoryAr : img.categoryEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Active Image Container (Height restricted to avoid filling full screen) */}
            <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#141610]">
              <div
                className="relative aspect-[16/9] max-h-[360px] sm:max-h-[420px] w-full cursor-pointer group overflow-hidden"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={GALLERY_IMAGES[selectedGalleryIdx].url}
                  alt={GALLERY_IMAGES[selectedGalleryIdx].titleEn}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] uppercase tracking-wider">
                  {isAr ? "تكبير الصورة ↗" : "Expand Image ↗"}
                </div>
              </div>

              {/* Info Bar Positioned Underneath */}
              <div className="p-4 sm:p-5 bg-[#12140F] border-t border-[#D4AF37]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 text-left rtl:text-right">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9.5px] text-[#D4AF37] uppercase tracking-widest font-bold">
                      {isAr ? GALLERY_IMAGES[selectedGalleryIdx].categoryAr : GALLERY_IMAGES[selectedGalleryIdx].categoryEn}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="font-mono text-[9.5px] text-[#A89F91]">
                      {isAr ? GALLERY_IMAGES[selectedGalleryIdx].tagAr : GALLERY_IMAGES[selectedGalleryIdx].tagEn}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg text-white font-medium">
                    {isAr ? GALLERY_IMAGES[selectedGalleryIdx].titleAr : GALLERY_IMAGES[selectedGalleryIdx].titleEn}
                  </h3>
                  <p className="font-sans text-[11px] sm:text-xs text-[#C5BCAD] max-w-2xl leading-relaxed">
                    {isAr ? GALLERY_IMAGES[selectedGalleryIdx].descAr : GALLERY_IMAGES[selectedGalleryIdx].descEn}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() =>
                      setSelectedGalleryIdx((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))
                    }
                    aria-label="Previous photo"
                    className="w-9 h-9 rounded-full bg-[#1C1E16] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white flex items-center justify-center transition-colors cursor-pointer text-sm"
                  >
                    {isAr ? "→" : "←"}
                  </button>
                  <button
                    onClick={() =>
                      setSelectedGalleryIdx((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1))
                    }
                    aria-label="Next photo"
                    className="w-9 h-9 rounded-full bg-[#1C1E16] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white flex items-center justify-center transition-colors cursor-pointer text-sm"
                  >
                    {isAr ? "←" : "→"}
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
              {GALLERY_IMAGES.map((img, idx) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedGalleryIdx(idx)}
                  className={`relative aspect-[16/10] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedGalleryIdx === idx
                      ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-102"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img.url} alt={img.titleEn} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. STRATEGIC PARTNERSHIP & CREDENTIALS ─────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#0E0F0C] border-b border-[#D4AF37]/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                {isAr ? "تحالف استراتيجي ومؤسسي رائد" : "STRATEGIC INSTITUTIONAL ALLIANCE"}
              </div>
              <h2 className="font-display text-2xl sm:text-4xl text-white font-normal">
                {isAr ? "شركاء صناعة المستقبل" : "World-Class Visionary Alliance"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {/* Developer */}
              <div className="p-6 sm:p-7 rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#181A12] to-[#10110D] flex flex-col items-center text-center justify-between shadow-xl">
                <div className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-[#8C8477] font-semibold mb-3">
                  {isAr ? "المطور العقاري" : "A PROJECT BY"}
                </div>

                <div className="relative w-52 h-16 my-3 flex items-center justify-center">
                  <Image
                    src="https://res.cloudinary.com/diwqmlpr/image/upload/v1788854133/asaheeb/projects/fairmont/qeescdffek6xiamphzr6.png"
                    alt="Rua Al Madinah Holding Logo"
                    fill
                    sizes="208px"
                    className="object-contain"
                  />
                </div>

                <div className="mt-2">
                  <h3 className="font-sans text-sm sm:text-base font-bold text-white mb-0.5">
                    {isAr ? "شركة رؤى المدينة القابضة" : "Rua Al Madinah Holding"}
                  </h3>
                  <p className="font-sans text-[11px] text-[#A89F91]">
                    {isAr ? "إحدى شركات صندوق الاستثمارات العامة (PIF)" : "A Public Investment Fund (PIF) Company"}
                  </p>
                </div>
              </div>

              {/* Operator */}
              <div className="p-6 sm:p-7 rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#181A12] to-[#10110D] flex flex-col items-center text-center justify-between shadow-xl">
                <div className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-[#8C8477] font-semibold mb-3">
                  {isAr ? "المشغل الفندقي" : "OPERATOR"}
                </div>

                <div className="my-4">
                  <div className="font-display text-2xl sm:text-3xl font-light tracking-[0.2em] text-[#EDE4D5]">
                    ACCOR
                  </div>
                  <div className="font-mono text-[9px] text-[#D4AF37] tracking-[0.2em] uppercase mt-1">
                    Live Limitless
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="font-sans text-sm sm:text-base font-bold text-white mb-0.5">
                    {isAr ? "مجموعة أكور العالمية" : "Accor Hospitality"}
                  </h3>
                  <p className="font-sans text-[11px] text-[#A89F91]">
                    {isAr ? "أكبر مشغل فندقي فاخر حول العالم" : "Global Leader in Luxury Hospitality"}
                  </p>
                </div>
              </div>

              {/* Brand */}
              <div className="p-6 sm:p-7 rounded-2xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#181A12] to-[#10110D] flex flex-col items-center text-center justify-between shadow-xl">
                <div className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-[#8C8477] font-semibold mb-3">
                  {isAr ? "العلامة الفندقية" : "BRAND"}
                </div>

                <div className="my-4">
                  <div className="font-serif italic text-3xl sm:text-4xl text-[#D4AF37]">
                    Fairmont
                  </div>
                  <div className="font-mono text-[9px] text-[#D4C7B5] tracking-[0.2em] uppercase mt-1">
                    Residences
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="font-sans text-sm sm:text-base font-bold text-white mb-0.5">
                    {isAr ? "فيرمونت للفنادق والمنتجعات" : "Fairmont Hotels & Resorts"}
                  </h3>
                  <p className="font-sans text-[11px] text-[#A89F91]">
                    {isAr ? "رمز الضيافة الأسطورية والفخامة العريقة" : "Iconic Residential Excellence"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. VIP LEAD REGISTRATION FORM ───────────────────────────────── */}
        <section
          ref={formSectionRef}
          id="register-interest"
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#090A08] relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-amber-600/10 via-[#D4AF37]/15 to-yellow-500/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
              <div className="inline-block font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                {isAr ? "امتلك مسكنك الفاخر" : "EXCLUSIVE PRE-LAUNCH REGISTRATION"}
              </div>
              <h2 className="font-display text-2xl sm:text-4xl text-white font-normal">
                {isAr ? "بجوار المسجد النبوي الشريف" : "Direct Allocation Desk"}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#C5BCAD]">
                {isAr
                  ? "سجّل اهتمامك للحصول على أولوية حجز وتخصيص الوحدات في مشروع فيرمونت ريزيدنسز رؤى المدينة قبل الطرح العام."
                  : "Register your interest to secure priority allocation and project documentation before public release."}
              </p>
            </div>

            {/* Split Form Card */}
            <div className="rounded-2xl border-2 border-[#D4AF37]/40 bg-gradient-to-b from-[#161811] to-[#0E100B] shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              {isSuccess ? (
                /* Success State */
                <div className="text-center py-14 px-6 sm:px-10 space-y-5">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-display text-xl sm:text-2xl text-white">
                      {isAr ? "تم تأكيد تسجيل اهتمامك بنجاح" : "Priority Registration Confirmed"}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#D4C7B5] leading-relaxed">
                      {isAr
                        ? "شكراً لاهتمامك بمشروع فيرمونت ريزيدنسز رؤى المدينة. تم تسجيل بياناتك وسيتواصل معك مستشار الاستثمار العقاري الفاخر في أصاهيب."
                        : "Thank you for registering for Fairmont Residences Rua Al Madinah. An Asaheeb Senior Luxury Property Advisor will reach out to you shortly."}
                    </p>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppLink(
                        `Hello Asaheeb Real Estate, I just registered for Fairmont Residences Rua Al Madinah pre-launch under the name "${form.fullName}". I would like to connect with a senior advisor.`,
                        `مرحباً أصاهيب العقارية، لقد قمت بتسجيل اهتمامي بمشروع فيرمونت ريزيدنسز رؤى المدينة باسم "${form.fullName}". أود التحدث مع مستشار عقاري.`,
                        isAr
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#25D366] text-[#0A0B08] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>{isAr ? "محادثة واتساب فورية" : "Instant WhatsApp Connect"}</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setForm({
                          fullName: "",
                          email: "",
                          phone: "",
                          unitType: "Luxury Branded Residence",
                          investmentBudget: "SAR 5,000,000 – SAR 10,000,000",
                          clientType: "Individual Investor / End-User",
                          notes: "",
                        });
                      }}
                      className="w-full sm:w-auto px-5 py-3 rounded-sm border border-white/20 text-[#EDE4D5] hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                      {isAr ? "تسجيل طلب آخر" : "Submit Another Request"}
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Grid */
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Client Advisory */}
                  <div className="lg:col-span-5 p-5 sm:p-8 bg-[#12140E] border-b lg:border-b-0 lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-[#D4AF37]/20 space-y-5 text-left rtl:text-right">
                    <div className="space-y-1.5">
                      <div className="font-mono text-[9.5px] text-[#D4AF37] uppercase tracking-widest font-bold">
                        {isAr ? "خدمة العملاء الحصرية" : "PRIVATE CLIENT SERVICES"}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl text-white font-medium">
                        {isAr ? "أصاهيب العقارية" : "Asaheeb Real Estate"}
                      </h3>
                      <p className="font-sans text-xs text-[#A89F91] leading-relaxed">
                        {isAr
                          ? "شريكك الموثوق للاستشارات العقارية الفاخرة وإدارة تخصيص أندر الأصول العقارية في المملكة العربية السعودية."
                          : "Your trusted gateway to prime Saudi luxury real estate and pre-launch allocation advisory."}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-3 border-t border-white/10">
                      {[
                        { en: "Priority Allocation Assistance", ar: "أولوية اختيار وتخصيص الوحدات" },
                        { en: "Vision 2030 Title Deed Advisory", ar: "استشارات التملك والأنظمة العقارية" },
                        { en: "Accor VIP Ownership Enrolment", ar: "تسجيل عضوية ملاك أكور العالمية" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-[#D8CEBE]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                          <span>{isAr ? item.ar : item.en}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#181A12] border border-[#D4AF37]/30 space-y-1.5">
                      <div className="text-xs font-bold text-white">
                        {isAr ? "هل تحتاج لمشورة فورية؟" : "Prefer Direct Discussion?"}
                      </div>
                      <p className="text-[10.5px] text-[#A89F91]">
                        {isAr
                          ? "تواصل مباشرة مع فريق كبار المستشارين العقاريين في أصاهيب."
                          : "Speak directly with our senior investment advisors on WhatsApp."}
                      </p>
                      <a
                        href={getWhatsAppLink(
                          "Hello Asaheeb Real Estate, I would like to speak directly with an advisor regarding Fairmont Residences Rua Al Madinah pre-launch allocation.",
                          "مرحباً أصاهيب العقارية، أود التحدث مباشرة مع مستشار بخصوص أولوية حجز فيرمونت ريزيدنسز رؤى المدينة.",
                          isAr
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#25D366] hover:underline pt-0.5"
                      >
                        <span>{isAr ? "تواصل عبر واتساب ←" : "Connect on WhatsApp →"}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Active Form */}
                  <form onSubmit={handleSubmit} className="lg:col-span-7 p-5 sm:p-8 space-y-4 text-left rtl:text-right">
                    {errorMessage && (
                      <div className="p-3 rounded-md bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
                        {isAr ? "الاسم الكامل *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder={isAr ? "مثال: عبد الله أحمد المنصور" : "e.g., His Excellency / Mr. John Smith"}
                        className="w-full bg-[#12140F] border border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-sm px-3.5 py-3 text-xs sm:text-sm text-white placeholder-[#7A746B] outline-none transition-all"
                      />
                    </div>

                    {/* Phone with Country Code */}
                    <div>
                      <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
                        {isAr ? "رقم الهاتف / واتساب *" : "Phone / WhatsApp Number *"}
                      </label>
                      <PhoneInputWithCountry
                        value={form.phone}
                        onChange={(fullVal, isValid) => {
                          setForm((prev) => ({ ...prev, phone: fullVal }));
                          setIsPhoneValid(isValid);
                        }}
                        isAr={isAr}
                        required
                        className="w-full"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
                        {isAr ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-[#12140F] border border-[#D4AF37]/35 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-sm px-3.5 py-3 text-xs sm:text-sm text-white placeholder-[#7A746B] outline-none transition-all"
                      />
                    </div>

                    {/* Unit Type & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
                          {isAr ? "نوع الاهتمام" : "Inquiry Preference"}
                        </label>
                        <select
                          value={form.unitType}
                          onChange={(e) => setForm({ ...form, unitType: e.target.value })}
                          className="w-full bg-[#12140F] border border-[#D4AF37]/35 focus:border-[#D4AF37] rounded-sm px-3 py-2.5 text-xs text-white outline-none"
                        >
                          <option value="Luxury Branded Residence">Luxury Branded Residence</option>
                          <option value="Multiple Units / Floor Allocation">Multiple Units / Floor Allocation</option>
                          <option value="Penthouse / Sky Suite Inquiry">Penthouse / Sky Suite Inquiry</option>
                          <option value="General Pre-Launch Allocation">General Pre-Launch Allocation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
                          {isAr ? "الميزانية الاستثمارية" : "Investment Budget"}
                        </label>
                        <select
                          value={form.investmentBudget}
                          onChange={(e) => setForm({ ...form, investmentBudget: e.target.value })}
                          className="w-full bg-[#12140F] border border-[#D4AF37]/35 focus:border-[#D4AF37] rounded-sm px-3 py-2.5 text-xs text-white outline-none"
                        >
                          <option value="SAR 3,000,000 – SAR 5,000,000">SAR 3M – SAR 5M</option>
                          <option value="SAR 5,000,000 – SAR 10,000,000">SAR 5M – SAR 10M</option>
                          <option value="SAR 10,000,000 – SAR 20,000,000">SAR 10M – SAR 20M</option>
                          <option value="SAR 20,000,000+">SAR 20M+ (VIP / Full Floor)</option>
                        </select>
                      </div>
                    </div>

                    {/* Specific Inquiries */}
                    <div>
                      <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
                        {isAr ? "ملاحظات أو متطلبات خاصة" : "Specific Preferences / Requests"}
                      </label>
                      <textarea
                        rows={2}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder={
                          isAr
                            ? "مثال: إطلالة علوية مباشرة على الحرم، رغبة في شراء عدة وحدات..."
                            : "e.g., Direct Haram view preference, allocation inquiries..."
                        }
                        className="w-full bg-[#12140F] border border-[#D4AF37]/35 focus:border-[#D4AF37] rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-[#7A746B] outline-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#E8C86A] to-[#B8873B] text-[#0A0B08] font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-[#0A0B08] border-t-transparent rounded-full animate-spin" />
                            <span>{isAr ? "جارٍ تسجيل طلبك..." : "Processing Registration..."}</span>
                          </>
                        ) : (
                          <span>{isAr ? "تأكيد تسجيل الاهتمام بالأولوية" : "Confirm Priority Allocation Request"}</span>
                        )}
                      </button>
                    </div>

                    <div className="text-[9.5px] font-mono text-[#8C8477] text-center pt-1">
                      {isAr
                        ? "بياناتك مشفرة ومحفوظة بسرية تامة لدى أصاهيب العقارية."
                        : "Your information is strictly confidential and managed directly by Asaheeb Real Estate."}
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Accor Legal Disclaimer */}
            <div className="mt-6 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[10.5px] text-[#7C756B] leading-relaxed text-center max-w-3xl mx-auto">
              {isAr
                ? "إشعار قانوني: مشروع فيرمونت ريزيدنسز رؤى المدينة مملوك ومطور ومباع من قِبل شركة رؤى المدينة القابضة (إحدى شركات صندوق الاستثمارات العامة). تُستخدم العلامة التجارية فيرمونت بموجب ترخيص من مجموعة أكور العالمية. أصاهيب العقارية هي منصة التسويق والاستشارات العقارية المعتمدة."
                : "Legal Disclaimer: Fairmont Residences Rua Al Madinah is owned, developed, and sold by Rua Al Madinah Holding (a PIF company). The Fairmont brand is used under license from Accor. Asaheeb Real Estate provides independent luxury real estate advisory and marketing services."}
            </div>
          </div>
        </section>
      </main>

      {/* ─── 8. FULLSCREEN LIGHTBOX MODAL (Z-INDEX 99999 WITH CLEAR CLOSE BUTTON) ─── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 select-none animate-fade-in"
          onClick={(e) => {
            // Close if clicked directly on modal background
            if (e.target === e.currentTarget) {
              setLightboxOpen(false);
            }
          }}
        >
          {/* Top Bar with Clear High-Visibility Close Button */}
          <div className="flex items-center justify-between z-20 max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#D4AF37] font-bold">
                {selectedGalleryIdx + 1} / {GALLERY_IMAGES.length}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs sm:text-sm font-medium text-white">
                {isAr ? GALLERY_IMAGES[selectedGalleryIdx].titleAr : GALLERY_IMAGES[selectedGalleryIdx].titleEn}
              </span>
            </div>

            {/* Prominent Floating Close Button with Text & Icon */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="px-4 py-2 rounded-full bg-[#1F2218] hover:bg-[#D4AF37] text-white hover:text-[#0A0B08] border border-[#D4AF37]/60 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center gap-2 transition-all cursor-pointer text-xs font-mono font-bold uppercase tracking-wider group"
              aria-label="Close modal"
            >
              <span className="text-base group-hover:rotate-90 transition-transform duration-200">✕</span>
              <span>{isAr ? "إغلاق المعرض" : "Close Gallery"}</span>
            </button>
          </div>

          {/* Main Visual Frame */}
          <div
            className="relative flex-grow flex items-center justify-center my-3 max-w-6xl mx-auto w-full"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setLightboxOpen(false);
              }
            }}
          >
            <div className="relative w-full h-full max-h-[68vh] sm:max-h-[75vh]">
              <Image
                src={GALLERY_IMAGES[selectedGalleryIdx].url}
                alt={GALLERY_IMAGES[selectedGalleryIdx].titleEn}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGalleryIdx((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
              }}
              aria-label="Previous Image"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#D4AF37] hover:text-[#0A0B08] border border-white/20 text-white flex items-center justify-center text-xl transition-all cursor-pointer shadow-xl z-20"
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGalleryIdx((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
              }}
              aria-label="Next Image"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#D4AF37] hover:text-[#0A0B08] border border-white/20 text-white flex items-center justify-center text-xl transition-all cursor-pointer shadow-xl z-20"
            >
              ›
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center max-w-xl mx-auto space-y-1 z-20">
            <div className="font-sans text-xs text-[#C5BCAD]">
              {isAr ? GALLERY_IMAGES[selectedGalleryIdx].descAr : GALLERY_IMAGES[selectedGalleryIdx].descEn}
            </div>
            <div className="font-mono text-[9.5px] text-[#D4AF37] uppercase tracking-widest">
              Fairmont Residences Rua Al Madinah
            </div>
          </div>
        </div>
      )}

      {/* ─── 9. FLOATING CONCIERGE DOCK (MOBILE & DESKTOP) ────────────────── */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto px-3 py-1.5 rounded-full bg-[#12140E]/90 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex items-center gap-2">
        <button
          onClick={scrollToRegister}
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8873B] text-[#0A0B08] font-mono text-[10.5px] font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shrink-0"
        >
          {isAr ? "سجّل اهتمامك" : "Register Interest"}
        </button>

        <a
          href={getWhatsAppLink(
            "Hello Asaheeb Real Estate, I am inquiring about Fairmont Residences Rua Al Madinah pre-launch allocation.",
            "مرحباً أصاهيب العقارية، أود الاستفسار عن تفاصيل الحجز المبكر لمشروع فيرمونت ريزيدنسز رؤى المدينة.",
            isAr
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-[#0A0B08] border border-[#25D366]/40 font-mono text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span className="hidden sm:inline">{isAr ? "واتساب" : "WhatsApp"}</span>
        </a>
      </div>

      {/* ─── ASAHEEB GLOBAL FOOTER ─────────────────────────────────────── */}
      <PageFooter />
    </div>
  );
}
