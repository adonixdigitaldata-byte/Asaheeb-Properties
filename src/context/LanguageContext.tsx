"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

export const translations = {
  en: {
    // Nav & Common
    brandName: "ASAHEEB REAL ESTATE",
    investNow: "Invest Now",
    switchLang: "عربي",
    scrollExplore: "Scroll to Explore",
    
    // Why Invest in Saudi Arabia Section 2 Hook
    whyInvestTitle: "WHY INVEST IN SAUDI ARABIA?",
    whyInvestSub: "The world's highest-growth real estate corridor. $1.3 Trillion Vision 2030 transformation.",
    q1: "Where is the region's highest real estate yield?",
    q2: "Which Vision 2030 corridors are prime for capital?",
    q3: "How do you guarantee 100% legal title security?",
    answerLabel: "THE ANSWER: ASAHEEB CURATED PORTFOLIOS",
    answerDesc: "3D architectural modeling & institutional-grade due diligence for Saudi Arabia's premier assets.",

    // Intro section
    introBadge: "Saudi Arabia Real Estate Brokerage",
    visionAligned: "Vision 2030 Aligned",
    headlinePart1: "Own Your",
    headlinePart2: "Apartments, Villas, Lands, Buildings,",
    headlinePart3: "Properties.",
    subtext: "We help you invest in Saudi Arabia's future — from first question to final signature.",
    
    // Metrics
    metric1Val: "SAR 2.5B+",
    metric1Label: "Curated Deals",
    metric2Val: "Vision 2030",
    metric2Label: "Corridor Focus",
    metric3Val: "100%",
    metric3Label: "Title Guarantee",
    metric4Val: "Riyadh · Jeddah",
    metric4Label: "Prime Hubs",

    // 3D Video Showcase Badge
    videoBadge: "3D Luxury Villa Model",
    videoSub: "360° Loop Showcase",

    // Chapters
    chapters: {
      apartments: {
        index: "01",
        label: "Apartments",
        headline: "Life Elevated,\nReturns Compounded",
        body: "High-rise residential units in Saudi Arabia's fastest-growing cities deliver rental yields that outperform the region. We source, vet, and manage the entire acquisition so you never have to guess.",
        bullets: [
          "Riyadh, Jeddah & Madinah Al-Munawwarah zones",
          "High-yield rental portfolio strategy",
          "Property management introductions",
        ],
        imageLabel: "Residential High-Rise",
        milestoneStat: "Riyadh · Jeddah",
        milestoneLabel: "High-Yield Portfolios",
      },
      villas: {
        index: "02",
        label: "Villas",
        headline: "Your Private\nKingdom Awaits",
        body: "Saudi Arabia's luxury villa market is unlike anywhere else on earth. We identify the right compound, negotiate in your language, and handle every legal layer — from title deed to handover.",
        bullets: [
          "Riyadh & Jeddah premium neighborhoods",
          "Off-plan & ready villa sourcing",
          "Full legal & registration support",
        ],
        imageLabel: "Luxury Residential",
        milestoneStat: "SAR 2.5B+",
        milestoneLabel: "Curated Villa Deals",
      },
      commercialLand: {
        index: "03",
        label: "Commercial Land",
        headline: "Own the\nGround Floor",
        body: "Undeveloped land in Saudi Arabia's expansion zones is one of the last great raw-opportunity plays. We pinpoint parcels near Vision 2030 mega-project corridors before prices reflect the hype.",
        bullets: [
          "Vision 2030 corridor land banking",
          "Development-ready parcel sourcing",
          "Zoning & feasibility advisory",
        ],
        imageLabel: "Development Land",
        milestoneStat: "Vision 2030",
        milestoneLabel: "Corridor Land Banking",
      },
      buildings: {
        index: "04",
        label: "Buildings",
        headline: "Institutional Grade,\nPersonal Scale",
        body: "Whole-building acquisitions — commercial towers, mixed-use assets, office headquarters — are the cornerstone of serious Saudi real estate portfolios. We guide you through the complexity.",
        bullets: [
          "Mixed-use & commercial building sourcing",
          "Institutional-grade due diligence",
          "Tenancy structure & exit planning",
        ],
        imageLabel: "Commercial Buildings",
        milestoneStat: "100% Title",
        milestoneLabel: "Institutional Guarantee",
      },
    },

    // Hero Section Transformed
    heroPastTitle: "SAUDI ARABIA.",
    heroPastSub: "A $1.3 Trillion Real Estate Frontier.",
    heroTodayTitle: "VISION 2030 IS LIVE.",
    heroTodaySub: "Capital is moving now.",
    heroTagline: "The future doesn't ask permission.",
    heroTaglineSub: "It gets built with Asaheeb.",
  },
  ar: {
    // Nav & Common
    brandName: "أصاهيب العقارية",
    investNow: "استثمر الآن",
    switchLang: "English",
    scrollExplore: "تمرير للتصفح",

    // Why Invest in Saudi Arabia Questioning Hook
    whyInvestTitle: "لماذا الاستثمار في المملكة العربية السعودية؟",
    whyInvestSub: "تفتح رؤية 2030 أكبر ممر استثماري عقاري نمواً في العالم. حيث يلتقي رأس المال بالتحول التاريخي.",
    q1: "أين تقع أعلى العوائد الاستثمارية العقارية في المنطقة؟",
    q2: "ما هي المحاور المستهدفة الأكثر جاهزية في رؤية 2030؟",
    q3: "كيف تضمن الأمان القانوني وملكية 100% لملفك العقاري؟",
    answerLabel: "الإجابة: محافظ أصاهيب العقارية المنسقة",
    answerDesc: "نمذجة معماريّة ثلاثية الأبعاد وعناية واجبة على مستوى مؤسسي لأرقى الأصول الاستثمارية.",

    // Intro section
    introBadge: "وساطة عقارية فاخرة في المملكة العربية السعودية",
    visionAligned: "متوافقة مع رؤية 2030",
    headlinePart1: "امتلك",
    headlinePart2: "شققك، وفيللك، وأراضيك، ومبانيك،",
    headlinePart3: "وعقاراتك.",
    subtext: "نساعدك على الاستثمار في مستقبل المملكة — من الاستفسار الأول وحتى التوقيع النهائي.",

    // Metrics
    metric1Val: "+2.5 مليار ر.س",
    metric1Label: "صفقات منسقة",
    metric2Val: "رؤية 2030",
    metric2Label: "تركيز المحاور",
    metric3Val: "100%",
    metric3Label: "ضمان الملكية",
    metric4Val: "الرياض · جدة",
    metric4Label: "مراكز رئيسية",

    // 3D Video Showcase Badge
    videoBadge: "نموذج فيلا فاخرة ثلاثي الأبعاد",
    videoSub: "عرض دائم 360°",

    // Chapters
    chapters: {
      apartments: {
        index: "01",
        label: "الشقق",
        headline: "حياة متميزة،\nوعوائد متضاعفة",
        body: "تُحقق الوحدات السكنية في الأبراج الفاخرة بأسرع مدن المملكة نمواً عوائد إيجارية تتفوق على المنطقة. نقوم بالبحث والتدقيق وإدارة الاستحواذ بالكامل.",
        bullets: [
          "مناطق راقية في الرياض وجدة والمدينة المنورة",
          "استراتيجية محفظة إيجارية عالية العائد",
          "خدمات إدارة الأملاك والشراكات الاستثمارية",
        ],
        imageLabel: "أبراج سكنية فاخرة",
        milestoneStat: "الرياض · جدة",
        milestoneLabel: "محافظ عالية العائد",
      },
      villas: {
        index: "02",
        label: "الفلل",
        headline: "مملكتك الخاصة\nفي انتظارك",
        body: "سوق الفلل الفاخرة في السعودية لا مثيل له عالمياً. نحدد المجمع السكني المناسب، ونتفاوض بلغتك، ونتولى كافة الإجراءات القانونية — من الملكية وحتى التسليم.",
        bullets: [
          "أرقى أحياء الرياض وجدة السكنية",
          "توفير فلل جاهزة وعلى المخطط",
          "دعم قانوني وتوفير تسجيل كامل",
        ],
        imageLabel: "سكني فاخر",
        milestoneStat: "+2.5 مليار ر.س",
        milestoneLabel: "صفقات فلل منسقة",
      },
      commercialLand: {
        index: "03",
        label: "الأراضي التجارية",
        headline: "امتلك الفرصة\nمن الأساس",
        body: "تعتبر الأراضي الخام في مناطق التوسع بالكامل في السعودية من أندر الفرص الاستثمارية. نحدد الأراضي قرب محاور مشاريع رؤية 2030 قبل ارتفاع الأسعار.",
        bullets: [
          "تخزين الأراضي في محاور رؤية 2030",
          "توفير قطع أراضي جاهزة للتطوير",
          "استشارات التراخيص والدراسات الجدوى",
        ],
        imageLabel: "أراضي تطويرية",
        milestoneStat: "رؤية 2030",
        milestoneLabel: "تخزين الأراضي التجارية",
      },
      buildings: {
        index: "04",
        label: "المباني",
        headline: "درجة مؤسسية،\nبأسلوب شخصي",
        body: "الاستحواذ على المباني الكاملة — الأبراج التجارية، الأصول متعددة الاستخدام، والمقرات الرئيسية — هو حجر الزاوية للمحافظ العقارية الجادة في السعودية.",
        bullets: [
          "استحواذ مباني تجارية ومتعددة الاستخدام",
          "عناية واجبة على مستوى مؤسسي",
          "هيكلة عقود الإيجار واستراتيجيات الخروج",
        ],
        imageLabel: "مباني تجارية",
        milestoneStat: "100% ملكية",
        milestoneLabel: "ضمان مؤسسي",
      },
    },

    // Hero Section Transformed
    heroPastTitle: "المملكة العربية السعودية.",
    heroPastSub: "أفق استثماري عقاري بقيمة 1.3 تريليون دولار.",
    heroTodayTitle: "رؤية 2030 تتحقق الآن.",
    heroTodaySub: "رأس المال يتحرك اليوم.",
    heroTagline: "المستقبل لا ينتظر أحداً...",
    heroTaglineSub: "بل يُبنى مع أصاهيب.",
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
  dir: "ltr" | "rtl";
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("asaheeb_lang") as Language;
      if (savedLang === "en" || savedLang === "ar") {
        setLangState(savedLang);
        document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = savedLang;
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("asaheeb_lang", newLang);
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = newLang;
    }
  };

  const toggleLanguage = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang],
    dir: (lang === "ar" ? "rtl" : "ltr") as "ltr" | "rtl",
    toggleLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "en" as Language,
      setLang: () => {},
      t: translations.en,
      dir: "ltr" as "ltr" | "rtl",
      toggleLanguage: () => {},
    };
  }
  return context;
}
