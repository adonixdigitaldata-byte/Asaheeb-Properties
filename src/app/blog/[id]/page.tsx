"use client";

import { use } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

// ─── Complete Detailed Blog Posts Data ────────────────────────────────────────
const BLOG_POSTS: Record<string, {
  id: string;
  categoryEn: string;
  categoryAr: string;
  accent: string;
  dateEn: string;
  dateAr: string;
  readTimeEn: string;
  readTimeAr: string;
  authorEn: string;
  authorAr: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string[];
  summaryAr: string[];
  sectionsEn: { heading: string; body: string; highlights?: string[] }[];
  sectionsAr: { heading: string; body: string; highlights?: string[] }[];
  statBox?: { val: string; labelEn: string; labelAr: string }[];
  quoteEn?: string;
  quoteAr?: string;
}> = {
  "vision-2030-real-estate": {
    id: "vision-2030-real-estate",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    accent: "#B8873B",
    dateEn: "July 14, 2025",
    dateAr: "١٤ يوليو ٢٠٢٥",
    readTimeEn: "6 min read",
    readTimeAr: "٦ دقائق قراءة",
    authorEn: "Asaheeb Research Team · Jeddah, KSA",
    authorAr: "فريق أبحاث أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Vision 2030 & Real Estate: Where the Capital is Flowing in 2025",
    titleAr: "رؤية 2030 والعقارات: أين يتدفق رأس المال في عام 2025",
    summaryEn: [
      "Saudi Arabia's $1.3 Trillion Vision 2030 real estate pipeline is entering its highest execution phase.",
      "Jeddah's Red Sea coastal developments and North Riyadh corridors are yielding 8.5%–12% net rental returns.",
      "Early institutional investors are shifting capital toward development-ready commercial land banking."
    ],
    summaryAr: [
      "يدخل أنبوب العقارات لرؤية 2030 بقيمة 1.3 تريليون دولار مرحلة التنفيذ الأعلى.",
      "مشاريع جدة الساحلية ومحاور شمال الرياض تحقق عوائد إيجارية صافية بين 8.5% إلى 12%.",
      "المستثمرون المؤسسيون الأوائل يوجهون رؤوس الأموال نحو تخزين الأراضي التجارية الجاهزة للتطوير."
    ],
    sectionsEn: [
      {
        heading: "1. The Macro Shift in Saudi Real Estate",
        body: "The Saudi real estate landscape has evolved beyond speculation into an institutional asset class. Supported by direct foreign ownership reforms, legislative transparency via RERA, and massive state infrastructure spending, capital allocation in 2025 is concentrated along primary connectivity corridors."
      },
      {
        heading: "2. Key Growth Hubs: Jeddah & Coastal Development",
        body: "While Riyadh remains the administrative and financial engine, Jeddah has solidified its position as the premier luxury and commercial gateway along the Red Sea. Waterfront luxury apartments and mixed-use commercial headquarters in Jeddah are witnessing unmatched capital appreciation due to limited supply and high domestic demand.",
        highlights: [
          "Jeddah Waterfront & Corniche: Premium residential rental yields averaging 9.2% p.a.",
          "North Riyadh Logistics & Transport Corridors: High demand for industrial & office parks.",
          "NEOM Coastal Adjacent Land Parcels: Strategic long-term capital growth potential."
        ]
      },
      {
        heading: "3. Institutional Advisory & Title Security",
        body: "With high returns comes the imperative for rigorous due diligence. Asaheeb Properties conducts full 40-point title checks, zoning verifications, and exit yield stress-testing for every curated transaction."
      }
    ],
    sectionsAr: [
      {
        heading: "١. التحول الكلي في العقارات السعودية",
        body: "تطور المشهد العقاري السعودي إلى فئة أصول مؤسسية. بفضل إصلاحات التملك الحر للأجانب، والشفافية التشريعية عبر الهيئة العامة للعقار، والإنفاق الحكومي الضخم على البنية التحتية، يتركز تخصيص رؤوس الأموال في 2025 على المحاور الرئيسية."
      },
      {
        heading: "٢. مراكز النمو الرئيسية: جدة والتطوير الساحلي",
        body: "بينما تظل الرياض المحرك المالي، تركت جدة بصمتها كبوابة فاخرة وتجارية على البحر الأحمر. تشهد الشقق السكنية الفاخرة والمقرات التجارية متعددة الاستخدامات في جدة نمواً رأسمالياً غير مسبوق نظراً لمحدودية العرض وارتفاع الطلب.",
        highlights: [
          "واجهة جدة البحرية والكورنيش: متوسط عوائد إيجارية 9.2% سنوياً.",
          "محاور اللوجستيات شمال الرياض: طلب عالٍ على المجمعات المكتبية والصناعية.",
          "الأراضي المجاورة لنيوم: فرص نمو رأسمالي استراتيجية طويلة الأجل."
        ]
      },
      {
        heading: "٣. الاستشارة المؤسسية وأمان الملكية",
        body: "مع العوائد المرتفعة تبرز الحاجة للعناية الواجبة الصارمة. تجري أصاهيب العقارية فحصاً كاملاً لـ 40 نقطة قانونية وفنية لكل صفقة."
      }
    ],
    statBox: [
      { val: "$1.3T", labelEn: "Vision 2030 Pipeline", labelAr: "مشاريع رؤية 2030" },
      { val: "9.2%", labelEn: "Avg. Jeddah Yield", labelAr: "متوسط عائد جدة" },
      { val: "100%", labelEn: "Legal Title Guarantee", labelAr: "ضمان الملكية القانونية" }
    ],
    quoteEn: "Capital does not wait for infrastructure to complete; it positions itself where the foundation is being poured.",
    quoteAr: "رأس المال لا ينتظر اكتمال البنية التحتية، بل يتمركز حيث يُصَب الأساس."
  },

  "neom-investment-guide": {
    id: "neom-investment-guide",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    accent: "#7FA8B3",
    dateEn: "June 28, 2025",
    dateAr: "٢٨ يونيو ٢٠٢٥",
    readTimeEn: "10 min read",
    readTimeAr: "١٠ دقائق قراءة",
    authorEn: "Asaheeb Research Team · Jeddah, KSA",
    authorAr: "فريق أبحاث أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "NEOM 2025: A Complete Investor's Guide to the World's Most Ambitious Project",
    titleAr: "نيوم 2025: الدليل الكامل للمستثمر في أكثر مشاريع العالم طموحاً",
    summaryEn: [
      "NEOM is progressing from ground preparation to vertical construction across THE LINE, Oxagon, and Sindalah.",
      "Commercial land parcels situated along the primary access corridors represent the highest liquidity entry point.",
      "Early positioning allows investors to lock in valuation baselines prior to major tenant handovers."
    ],
    summaryAr: [
      "تنتقل نيوم من تجهيز الموقع إلى البناء العمودي في ذا لاين وأوكساجون وسندالة.",
      "الأراضي التجارية الواقعة على ممرات الوصول الرئيسية تمثل نقطة السيولة الأعلى دخولاً.",
      "التمركز المبكر يتيح للمستثمرين تثبيت التقييمات الأساسية قبل تسليم المستأجرين الرئيسية."
    ],
    sectionsEn: [
      {
        heading: "1. Understanding the NEOM Ecosystem",
        body: "NEOM is not a single city—it is a 26,500 square kilometer semi-autonomous economic zone. Understanding where to allocate capital requires analyzing the distinct commercial drivers of Sindalah Island, Oxagon Industrial Hub, Trojena, and THE LINE."
      },
      {
        heading: "2. Commercial Land Banking Strategies",
        body: "For private investors and family offices, land banking adjacent to NEOM’s primary transport nodes offers unmatched long-term appreciation. Asaheeb provides vetted parcel sourcing with clear zoning permissions and verified government utility hookup plans."
      },
      {
        heading: "3. Legal Structure & Regulatory Framework",
        body: "Special economic rules apply within the NEOM boundary. Working with registered advisors ensures compliant title ownership and seamless capital repatriations."
      }
    ],
    sectionsAr: [
      {
        heading: "١. فهم منظومة نيوم الاستثمارية",
        body: "نيوم ليست مدينة واحدة، بل هي منطقة اقتصادية شبه مستقلة بمساحة 26,500 كم مربع. يتطلب تخصيص رأس المال تحليل المحركات التجارية الفريدة لجزيرة سندالة، ومجمع أوكساجون، وتوريجنا، وذا لاين."
      },
      {
        heading: "٢. استراتيجيات تخزين الأراضي التجارية",
        body: "بالنسبة للمستثمرين والمكاتب العائلية، توفر الأراضي المجاورة لعقد النقل الرئيسية في نيوم نمواً رأسمالياً استثنائياً. توفر أصاهيب قطع أراضي مدققة مع تراخيص واضحة."
      },
      {
        heading: "٣. الهيكل القانوني والتنظيمي",
        body: "تطبق لوائح اقتصادية خاصة داخل حدود نيوم. يضمن التعاون مع مستشارين مرخصين تملكاً قانونياً سليماً وسلاسة في تحويل الأموال."
      }
    ],
    statBox: [
      { val: "26.5k km²", labelEn: "Total Area", labelAr: "المساحة الإجمالية" },
      { val: "15–22%", labelEn: "Est. IRR", labelAr: "معدل العائد الداخلي" },
      { val: "100%", labelEn: "Zoning Verified", labelAr: "اعتماد التراخيص" }
    ],
    quoteEn: "Pioneering investment requires looking past present sand to see future skylines.",
    quoteAr: "الاستثمار الريادي يتطلب النظر لما وراء الرمال الحالية لرؤية أفق المستقبل."
  },

  "riyadh-rental-yields": {
    id: "riyadh-rental-yields",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    accent: "#B8873B",
    dateEn: "May 19, 2025",
    dateAr: "١٩ مايو ٢٠٢٥",
    readTimeEn: "8 min read",
    readTimeAr: "٨ دقائق قراءة",
    authorEn: "Asaheeb Advisory · Jeddah, KSA",
    authorAr: "استشارات أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Riyadh Rental Yields 2025: Where Are the 10%+ Returns Hiding?",
    titleAr: "عوائد الإيجار في الرياض 2025: أين تختبئ العوائد التي تتجاوز 10%؟",
    summaryEn: [
      "High corporate relocation demand driven by Regional Headquarters (RHQ) mandates is fueling double-digit rental yields.",
      "Executive residential apartments in North Riyadh are seeing sustained multi-year lease commitments.",
      "Structuring multi-unit residential portfolios yields consistent cash flows with strong exit liquidity."
    ],
    summaryAr: [
      "انتقال مقرات الشركات المقرات الإقليمية يرفع العوائد الإيجارية لمستويات قياسية.",
      "الشقق السكنية الفاخرة للتنفيذيين شمال الرياض تشهد التزامات إيجارية طويلة الأجل.",
      "هيكلة المحافظ السكنية متعددة الوحدات تضمن تدفقات نقدية مستقرة وسيولة عند الخروج."
    ],
    sectionsEn: [
      {
        heading: "1. The Regional HQ Mandate Effect",
        body: "With over 500 multinational corporations establishing regional headquarters in Saudi Arabia, demand for high-spec, turnkey executive housing in primary Riyadh districts has far surpassed market projections."
      },
      {
        heading: "2. District Analysis: Yield Hotspots",
        body: "While prime central districts command premium entry prices, northern growth corridors near King Salman Park and KAFD offer superior gross yields exceeding 10.4% p.a."
      }
    ],
    sectionsAr: [
      {
        heading: "١. تأثير المقرات الإقليمية للشركات العالمية",
        body: "مع تأسيس أكثر من 500 شركة متعددة الجنسيات لمقراتها الإقليمية في المملكة، فاق الطلب على السكن الفاخر للتنفيذيين بالرياض جميع التوقعات."
      },
      {
        heading: "٢. تحليل الأحياء: بؤر العائد الأعلى",
        body: "بينما تتطلب الأحياء المركزية أسعار دخول أعلى، توفر المحاور الشمالية قرب حديقة الملك سلمان ومركز الملك عبد الله المالي عوائد إجمالية تتجاوز 10.4% سنوياً."
      }
    ],
    statBox: [
      { val: "10.4%", labelEn: "Peak Yield", labelAr: "أعلى عائد إيجاري" },
      { val: "500+", labelEn: "RHQ Companies", labelAr: "شركات المقرات الإقليمية" },
      { val: "3-Yr", labelEn: "Avg. Corporate Lease", labelAr: "متوسط عقود الشركات" }
    ],
    quoteEn: "High-yield real estate is built on tenant demand, not speculation.",
    quoteAr: "العقارات عالية العائد تُبنى على الطلب الحقيقي للمستأجرين، لا على المضاربة."
  },

  "legal-guide-foreigners": {
    id: "legal-guide-foreigners",
    categoryEn: "Legal",
    categoryAr: "قانوني",
    accent: "#7FA8B3",
    dateEn: "April 10, 2025",
    dateAr: "١٠ أبريل ٢٠٢٥",
    readTimeEn: "12 min read",
    readTimeAr: "١٢ دقيقة قراءة",
    authorEn: "Asaheeb Legal Advisory · Jeddah, KSA",
    authorAr: "الاستشارات القانونية بأصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Buying Property in Saudi Arabia as a Foreigner: 2025 Legal Guide",
    titleAr: "شراء عقار في المملكة العربية السعودية كأجنبي: دليل قانوني 2025",
    summaryEn: [
      "Foreign natural and legal persons can now purchase real estate in Saudi Arabia under clear Premium Residency and investment laws.",
      "RERA digital title deeds guarantee 100% legal security and instant registration.",
      "Asaheeb handles the entire process from Ministry of Investment (MISA) clearance to title transfer."
    ],
    summaryAr: [
      "يمكن للأجانب والأشخاص الاعتباريين الشراء وفق قوانين الإقامة المميزة والاستثمار الجديدة.",
      "صكوك الملكية الرقمية عبر منصة إحكام والهيئة العامة للعقار تضمن الأمان القانوني 100%.",
      "تتولى أصاهيب العملية بالكامل من موافقة وزارة الاستثمار وحتى نقل الصك."
    ],
    sectionsEn: [
      {
        heading: "1. New Ownership Regulations Overview",
        body: "Saudi Arabia's modernized Real Estate Ownership Law empowers international investors to acquire residential, commercial, and land assets with complete regulatory protection."
      },
      {
        heading: "2. The Premium Residency Pathway",
        body: "Holders of Premium Residency categories (including Real Estate Owner Residency) enjoy direct title ownership rights without requiring local corporate conduits."
      }
    ],
    sectionsAr: [
      {
        heading: "١. نظرة عامة على نظام تملك العقار الجديد",
        body: "يمكّن نظام تملك العقار المحدث في السعودية المستثمرين الدوليين من الاستحواذ على الأصول السكنية والتجارية والأراضي بحماية تنظيمية كاملة."
      },
      {
        heading: "٢. مسار الإقامة المميزة",
        body: "يتمتع حاملو فئات الإقامة المميزة (بما فيها إقامة مالك عقار) بحقوق الملكية المباشرة للصكوك دون الحاجة إلى تأسيس كيانات محلية."
      }
    ],
    statBox: [
      { val: "100%", labelEn: "Legal Security", labelAr: "أمان قانوني كامل" },
      { val: "RERA", labelEn: "Regulated Framework", labelAr: "مرخص من هيئة العقار" },
      { val: "0%", labelEn: "Personal Income Tax", labelAr: "ضريبة دخل شخصي" }
    ],
    quoteEn: "Security of title is the bedrock upon which institutional capital expands.",
    quoteAr: "أمان الملكية هو الحجر الأساس الذي يتوسع عليه رأس المال المؤسسي."
  },

  "villa-vs-apartment": {
    id: "villa-vs-apartment",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    accent: "#B8873B",
    dateEn: "March 22, 2025",
    dateAr: "٢٢ مارس ٢٠٢٥",
    readTimeEn: "7 min read",
    readTimeAr: "٧ دقائق قراءة",
    authorEn: "Asaheeb Research Team · Jeddah, KSA",
    authorAr: "فريق أبحاث أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Villa vs. Apartment: Which Saudi Asset Class Wins in 2025?",
    titleAr: "فيلا أم شقة: أي فئة أصول سعودية تنتصر في 2025؟",
    summaryEn: [
      "Villas offer superior long-term capital appreciation driven by land value growth.",
      "Apartments deliver higher immediate net rental yields and lower entry threshold.",
      "Balanced wealth portfolios combine both asset classes across Jeddah and Riyadh."
    ],
    summaryAr: [
      "تتيح الفلل نمواً رأسمالياً أعلى طويلاً الأجل مدفوعاً بقيمة الأرض.",
      "تمنح الشقق عوائد إيجارية صافية أعلى فورية وحد دخول أقل.",
      "المحافظ المتوازنة تجمع بين الفئتين عبر جدة والرياض."
    ],
    sectionsEn: [
      {
        heading: "1. Comparing Capital Growth vs Cash Yields",
        body: "When building a Saudi real estate strategy, matching your timeline to the right asset class is critical. Land-backed standalone luxury villas in Jeddah compounds deliver strong wealth protection, while high-density apartments maximize annual liquidity."
      },
      {
        heading: "2. Strategic Portfolio Allocation",
        body: "We advise sophisticated investors to allocate 60% of capital into high-yield residential apartments for liquid cash flow, and 40% into prime coastal villas or land for long-term equity growth."
      }
    ],
    sectionsAr: [
      {
        heading: "١. مقارنة النمو الرأسمالي مقابل التدفق النقدي",
        body: "عند بناء استراتيجية عقارية، يُعد مطابقة جدولك الزمني مع فئة الأصول أمراً حاسماً. توفر الفلل الفاخرة في مجمعات جدة حماية للثروة، بينما تحقق الشقق أعلى تدفق نقدي سنوي."
      },
      {
        heading: "٢. التخصيص الاستراتيجي للمحفظة",
        body: "ننصح المستثمرين بتخصيص 60% من رأس المال في شقق سكنية عالية العائد للتدفق النقدي، و40% في فلل أو أراضٍ ساحلية لنمو الثروة طويل الأجل."
      }
    ],
    statBox: [
      { val: "60 / 40", labelEn: "Recommended Allocation", labelAr: "التوزيع الموصى به" },
      { val: "12–16%", labelEn: "Villa Appreciation", labelAr: "نمو قيمة الفلل" },
      { val: "9–11%", labelEn: "Apartment Yield", labelAr: "عائد الشقق" }
    ]
  },

  "commercial-land-timing": {
    id: "commercial-land-timing",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    accent: "#7FA8B3",
    dateEn: "February 15, 2025",
    dateAr: "١٥ فبراير ٢٠٢٥",
    readTimeEn: "9 min read",
    readTimeAr: "٩ دقائق قراءة",
    authorEn: "Asaheeb Advisory · Jeddah, KSA",
    authorAr: "استشارات أصاهيب · جدة، المملكة العربية السعودية",
    titleEn: "Commercial Land Banking: Why Timing Still Matters in 2025",
    titleAr: "تخزين الأراضي التجارية: لماذا لا يزال التوقيت مهماً في 2025",
    summaryEn: [
      "Undeveloped commercial land parcels along Vision 2030 corridors represent asymmetric upside.",
      "Infrastructure completion triggers exponential valuation re-ratings.",
      "Asaheeb provides off-market parcel acquisition with full zoning verification."
    ],
    summaryAr: [
      "الأراضي التجارية الخام على محاور رؤية 2030 توفر فرص نمو استثنائية.",
      "اكتمال البنية التحتية يطلق إعادة تقييم تصاعدية للأسعار.",
      "تتيح أصاهيب الاستحواذ على قطع الأراضي خارج السوق مع التحقق الكامل من التراخيص."
    ],
    sectionsEn: [
      {
        heading: "1. The Commercial Land Playbook",
        body: "Acquiring commercial development land requires deep knowledge of municipal expansion plans and transport infrastructure timelines. Timing entry before public announcements captures maximum alpha."
      },
      {
        heading: "2. Key Risk Mitigation Strategies",
        body: "Every land banking deal with Asaheeb undergoes strict municipal zoning clearance, soil testing review, and utility access confirmation before funds are committed."
      }
    ],
    sectionsAr: [
      {
        heading: "١. استراتيجية الاستثمار في الأراضي التجارية",
        body: "يتطلب الاستحواذ على الأراضي التجارية معرفة عميقة بخطط التوسع البلدي ومواعيد البنية التحتية. الدخول المبكر يحقق أعلى نسبة ربحية."
      },
      {
        heading: "٢. استراتيجيات الحد من المخاطر",
        body: "تخضع كل صفقة أراضٍ مع أصاهيب لفحص بلدي دقيق واعتماد التراخيص وتأكيد خدمات البنية التحتية قبل إيداع الأموال."
      }
    ],
    statBox: [
      { val: "18–25%", labelEn: "Targeted IRR", labelAr: "العائد الداخلي المستهدف" },
      { val: "100%", labelEn: "Zoning Cleared", labelAr: "تراخيص معتمدة" }
    ]
  }
};

function BlogDetailContent({ id }: { id: string }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const post = BLOG_POSTS[id] || BLOG_POSTS["vision-2030-real-estate"];

  const summary = isAr ? post.summaryAr : post.summaryEn;
  const sections = isAr ? post.sectionsAr : post.sectionsEn;
  const quote = isAr ? post.quoteAr : post.quoteEn;

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── BREADCRUMB & HERO HEADER ────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8477] mb-6 ${isAr ? "flex-row-reverse text-right" : ""}`}>
            <Link href="/" className="hover:text-[#B8873B] transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#B8873B] transition-colors">{isAr ? "المدونة" : "Blog"}</Link>
            <span>/</span>
            <span className="text-[#E8DFCE]">{isAr ? post.categoryAr : post.categoryEn}</span>
          </div>

          {/* Category Badge */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 mb-6 border rounded-full ${isAr ? "flex-row-reverse" : ""}`}
            style={{ borderColor: `${post.accent}50`, backgroundColor: `${post.accent}10` }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: post.accent }} />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: post.accent }}>
              {isAr ? post.categoryAr : post.categoryEn}
            </span>
          </div>

          {/* Title */}
          <h1 className={`font-display text-3xl sm:text-5xl lg:text-6xl text-[#E8DFCE] font-normal leading-[1.12] tracking-[-0.02em] mb-6 ${isAr ? "text-right" : ""}`}>
            {isAr ? post.titleAr : post.titleEn}
          </h1>

          {/* Metadata Bar */}
          <div className={`flex flex-wrap items-center gap-4 text-xs font-mono text-[#8C8477] pt-4 border-t border-white/5 ${isAr ? "flex-row-reverse text-right" : ""}`}>
            <span className="text-[#E8DFCE] font-medium">{isAr ? post.authorAr : post.authorEn}</span>
            <span>•</span>
            <span>{isAr ? post.dateAr : post.dateEn}</span>
            <span>•</span>
            <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE MAIN BODY ──────────────────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Key Takeaways Box */}
          <div
            className={`p-6 sm:p-8 border border-[#B8873B]/30 rounded-sm ${isAr ? "text-right" : ""}`}
            style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.08) 0%, rgba(18,19,15,0.95) 100%)" }}
          >
            <div className={`flex items-center gap-2 mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
              <div className="w-2 h-2 rounded-full bg-[#B8873B]" />
              <h3 className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8873B] font-semibold">
                {isAr ? "أبرز نقاط الاستراتيجية" : "Executive Key Takeaways"}
              </h3>
            </div>
            <ul className="space-y-3">
              {summary.map((item, idx) => (
                <li key={idx} className={`flex items-start gap-3 text-sm sm:text-base text-[#E8DFCE]/90 font-sans leading-relaxed ${isAr ? "flex-row-reverse" : ""}`}>
                  <span className="text-[#B8873B] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Stats Highlight Grid */}
          {post.statBox && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {post.statBox.map((st, i) => (
                <div key={i} className="p-6 border border-[#B8873B]/20 bg-[#12130F] text-center">
                  <div className="font-display text-3xl sm:text-4xl text-[#B8873B] font-bold mb-1">{st.val}</div>
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#8C8477]">
                    {isAr ? st.labelAr : st.labelEn}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-10">
            {sections.map((sec, idx) => (
              <div key={idx} className={`space-y-4 ${isAr ? "text-right" : ""}`}>
                <h2 className="font-display text-2xl sm:text-3xl text-[#E8DFCE] font-normal tracking-tight">
                  {sec.heading}
                </h2>
                <p className="font-sans text-base sm:text-lg text-[#8C8477] leading-[1.85]">
                  {sec.body}
                </p>

                {sec.highlights && (
                  <div className="my-6 p-6 border-l-2 border-[#B8873B] bg-white/[0.02] space-y-2">
                    {sec.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className={`text-sm text-[#E8DFCE]/90 font-sans flex items-start gap-2 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                        <span className="text-[#B8873B] font-bold">◈</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quote Block */}
          {quote && (
            <blockquote
              className={`my-12 p-8 border-y border-[#B8873B]/30 text-center font-display text-xl sm:text-2xl text-[#E8DFCE] italic leading-relaxed`}
              style={{ backgroundColor: "rgba(184,135,59,0.04)" }}
            >
              “{quote}”
              <footer className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] not-italic mt-4">
                — Asaheeb Investment Advisory
              </footer>
            </blockquote>
          )}

          {/* CTA Banner */}
          <div
            className={`p-8 sm:p-10 border border-[#B8873B]/40 text-center rounded-sm ${isAr ? "text-right sm:text-center" : ""}`}
            style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.12) 0%, rgba(18,19,15,1) 100%)" }}
          >
            <h3 className="font-display text-2xl sm:text-3xl text-[#E8DFCE] mb-3">
              {isAr ? "هل ترغب باستشارة عقارية مخصصة؟" : "Looking for Custom Real Estate Advisory?"}
            </h3>
            <p className="font-sans text-sm text-[#8C8477] leading-relaxed max-w-xl mx-auto mb-8">
              {isAr
                ? "تحدث مباشرة مع مستشاري أصاهيب في جدة والرياض للحصول على فرص منسقة تناسب محفظتك."
                : "Speak directly with Asaheeb advisors in Jeddah and Riyadh to access curated off-market deals tailored to your portfolio."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 font-mono text-[11px] tracking-[0.2em] uppercase border border-[#B8873B] bg-[#B8873B] text-[#12130F] font-semibold hover:bg-transparent hover:text-[#B8873B] transition-all duration-300"
              >
                {isAr ? "تواصل معنا الآن" : "Book Advisory Session"}
              </Link>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 font-mono text-[11px] tracking-[0.2em] uppercase border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 font-semibold"
              >
                {isAr ? "محادثة واتساب" : "WhatsApp Instant Reply"}
              </a>
            </div>
          </div>

          {/* Navigation Back */}
          <div className="pt-8 flex items-center justify-between border-t border-white/10">
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8873B] hover:underline ${isAr ? "flex-row-reverse" : ""}`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={isAr ? "rotate-180" : ""}>
                <path d="M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{isAr ? "العودة للجميع المقالات" : "Back to All Articles"}</span>
            </Link>
          </div>

        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <LanguageProvider>
      <BlogDetailContent id={id} />
    </LanguageProvider>
  );
}
