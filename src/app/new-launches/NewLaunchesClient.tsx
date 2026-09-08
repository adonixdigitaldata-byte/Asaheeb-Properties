"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "@/data/contactConfig";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";

export default function NewLaunchesClient() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const newLaunches = [
    {
      id: "fairmont-residences-rua-al-madinah",
      slug: "/new-launches/fairmont-residences-rua-al-madinah",
      nameEn: "Fairmont Residences Rua Al Madinah",
      nameAr: "فيرمونت ريزيدنسز رؤى المدينة",
      developerEn: "Rua Al Madinah Holding (PIF)",
      developerAr: "شركة رؤى المدينة القابضة (صندوق الاستثمارات العامة)",
      locationEn: "Directly Adjacent to The Prophet's Mosque, Madinah",
      locationAr: "بجوار المسجد النبوي الشريف - المدينة المنورة",
      tagEn: "EXCLUSIVE PRE-LAUNCH",
      tagAr: "إطلاق حصري مبكر",
      badge: "FEATURED FLAGSHIP",
      badgeAr: "المشروع الأبرز",
      unitsEn: "120 Branded Residences",
      unitsAr: "١٢٠ وحدة فندقية فاخرة",
      priceEn: "Price on Application (POA)",
      priceAr: "السعر عند الطلب",
      image: "https://res.cloudinary.com/diwqmlpr/image/upload/v1788854134/asaheeb/projects/fairmont/jschdmsdvtlnqfmjbpak.png",
      taglineEn: "A Home Close to Your Heart — The privilege of living next to The Prophet’s Mosque with Fairmont 5-star service & Accor VIP global benefits.",
      taglineAr: "بيتٌ قريبٌ من قلبك — شرف الجوار بجانب المسجد النبوي الشريف مع خدمات ضيافة فيرمونت ٥ نجوم ومزايا أكور العالمية.",
      highlights: [
        { en: "Direct Mosque Views", ar: "إطلالات مباشرة على الحرم" },
        { en: "Accor VIP (5,600+ Hotels)", ar: "مزايا VIP في ٥,٦٠٠+ فندق" },
        { en: "PIF Backed Project", ar: "تطوير شركة تابعة لصندوق الاستثمارات" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0E0B] text-[#E8DFCE] flex flex-col justify-between">
      <PageNav />
      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B8873B]/40 bg-[#161712] text-[#B8873B] font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B] animate-ping" />
            <span>{isAr ? "محفظة الإطلاقات الحصرية" : "Exclusive New Launches Portfolio"}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-light text-white leading-tight">
            {isAr ? (
              <>
                إطلاقات مشاريع جديدة <br />
                <span className="text-[#B8873B] font-normal">قبل الطرح الرسمي في السوق</span>
              </>
            ) : (
              <>
                Saudi New Launches <br />
                <span className="text-[#B8873B] font-normal">Exclusive Pre-Launch Opportunities</span>
              </>
            )}
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#B8AF9F] max-w-2xl mx-auto">
            {isAr
              ? "اغتنم فرصة أولوية الحجز المبكر في أرقى المشاريع العقارية والفندقية الحصرية في المملكة العربية السعودية بالشراكة مع كبرى شركات التطوير العالمية."
              : "Secure priority allocations in the Kingdom's most prestigious branded residences and mega-developments before official market unveiling."}
          </p>
        </div>

        {/* Featured Launches Grid */}
        <div className="space-y-12">
          {newLaunches.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#B8873B]/40 bg-[#131410] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12 group hover:border-[#B8873B] transition-all duration-500"
            >
              {/* Image Section */}
              <div className="lg:col-span-7 relative min-h-[350px] sm:min-h-[440px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.nameEn}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#131410] rtl:lg:bg-gradient-to-l rtl:lg:from-transparent rtl:lg:to-[#131410]" />

                {/* Pre-launch Floating Badge */}
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-sm bg-[#B8873B] text-[#0D0E0B] font-mono text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    {isAr ? item.tagAr : item.tagEn}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C8477]">
                    <svg className="w-3.5 h-3.5 text-[#B8873B]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 21c-4.97 0-9-4.03-9-9a9 9 0 0 1 18 0c0 4.97-4.03 9-9 9z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{isAr ? item.locationAr : item.locationEn}</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl text-white font-medium group-hover:text-[#B8873B] transition-colors">
                    {isAr ? item.nameAr : item.nameEn}
                  </h2>

                  <p className="font-mono text-xs text-[#B8873B]">
                    {isAr ? item.developerAr : item.developerEn}
                  </p>

                  <p className="font-sans text-sm text-[#C5BCAD] leading-relaxed">
                    {isAr ? item.taglineAr : item.taglineEn}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#E0D7C7]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B]" />
                        <span>{isAr ? h.ar : h.en}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href={item.slug}
                    className="flex-1 text-center py-3 px-5 rounded-sm bg-gradient-to-r from-[#B8873B] to-[#966C2B] text-[#0D0E0B] font-mono text-xs font-bold uppercase tracking-[0.18em] hover:brightness-110 transition-all shadow-md"
                  >
                    {isAr ? "عرض تفاصيل المشروع الكاملة" : "Explore Pre-Launch Page"}
                  </Link>

                  <Link
                    href={`${item.slug}#register-interest`}
                    className="text-center py-3 px-4 rounded-sm border border-[#B8873B]/50 hover:bg-[#B8873B]/10 text-[#E8DFCE] font-mono text-xs uppercase tracking-wider transition-all"
                  >
                    {isAr ? "تسجيل الاهتمام" : "Register Interest"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Banner */}
        <div className="mt-16 p-8 rounded-xl border border-[#B8873B]/30 bg-gradient-to-br from-[#181A14] to-[#12130E] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left rtl:md:text-right">
            <h3 className="font-display text-xl text-white font-medium">
              {isAr ? "هل تبحث عن فرص استثمارية خاصة وحصرية؟" : "Seeking Bespoke Off-Market Allocations?"}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A89F91]">
              {isAr
                ? "تواصل مع كبار مستشاري أصاهيب العقارية للاطلاع على المشاريع غير المعلنة والفرص الاستثمارية المغلقة."
                : "Connect with our Senior Investment Advisory team for confidential pre-market access and institutional portfolios."}
            </p>
          </div>

          <a
            href={getWhatsAppLink(
              "Hello Asaheeb Real Estate, I would like to inquire about upcoming pre-launches and exclusive luxury property allocations.",
              "مرحباً أصاهيب العقارية، أود الاستفسار عن المشاريع العقارية الجديدة وفرص الحجز المبكر الحصرية.",
              isAr
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-sm bg-[#25D366] text-[#0D0E0B] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all whitespace-nowrap"
          >
            {isAr ? "تواصل مع المستشار" : "WhatsApp Advisory"}
          </a>
        </div>
      </div>
    </main>
    <PageFooter />
  </div>
  );
}
