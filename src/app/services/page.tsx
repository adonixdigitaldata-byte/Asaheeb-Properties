"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

// ─── Bilingual content ─────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    badge: "Our Offerings",
    heroTitle: "Precision Brokerage.\nStrategic Advisory.\nZero Compromise.",
    heroSub: "From off-market deal curation to RERA title transfer, Asaheeb manages every phase of your Saudi real estate investment.",
    servicesTitle: "Core Investment Services",
    segmentsTitle: "Tailored Advisory By Investor Type",
    segments: [
      {
        id: "private-wealth",
        name: "Private Wealth & HNWIs",
        desc: "Curated luxury villas, prime residential land, and exclusive off-market assets in Riyadh, Jeddah & coastal developments.",
        featured: ["Off-market villa sourcing", "Private seller negotiation", "Personalized yield projection"],
      },
      {
        id: "institutional",
        name: "Institutional & Funds",
        desc: "Commercial land bank acquisition, Giga-project corridor analysis, and institutional-grade stress testing.",
        featured: ["Giga-project site selection", "Bulk land deal structuring", "40-point technical due diligence"],
      },
      {
        id: "international",
        name: "International Investors",
        desc: "Bilingual cross-border advisory, foreign ownership regulatory clearance, and end-to-end title registration.",
        featured: ["Saudi foreign investment compliance", "Bilingual legal contracts", "Remote title transfer management"],
      },
    ],
    services: [
      {
        id: "sourcing",
        icon: "◈",
        title: "Asset Sourcing & Curation",
        subtitle: "Exclusive Access to Prime Saudi Assets",
        image: "/images/services/sourcing.png",
        body: "We don't just search the public market — we curate. Our advisors leverage deep local networks to source off-market luxury villas, prime commercial land, and pre-launch developer allocations before public listing.",
        points: ["Off-market deal pipeline access", "Developer pre-launch pricing advantages", "Vision 2030 prime growth corridors", "Multi-city coverage (Riyadh, Jeddah, Madinah)"],
        accent: "#B8873B",
      },
      {
        id: "due-diligence",
        icon: "◉",
        title: "Institutional Due Diligence",
        subtitle: "40-Point Risk & Yield Stress Testing",
        image: "/images/services/diligence.png",
        body: "Every asset undergoes our rigorous 40-point technical and financial verification process — title deed authenticity, municipal zoning, encumbrance checks, developer track record, and multi-scenario yield modeling.",
        points: ["Full title deed & encumbrance audit", "Zoning & municipal planning verification", "Independent financial yield modeling", "Developer track record analysis"],
        accent: "#7FA8B3",
      },
      {
        id: "legal",
        icon: "◈",
        title: "Legal & RERA Compliance",
        subtitle: "100% Guaranteed Title Transfer",
        image: "/images/services/legal.png",
        body: "We partner with RERA-registered legal counsel to manage every agreement — from initial Letter of Intent to final title deed transfer — in both Arabic and English. Total transparency with zero legal risk.",
        points: ["Bilingual legal contract preparation", "RERA regulatory compliance assurance", "Title deed transfer management", "Escrow & transaction oversight"],
        accent: "#B8873B",
      },
      {
        id: "advisory",
        icon: "◉",
        title: "Strategic Investment Advisory",
        subtitle: "Portfolio Strategy Before Signature",
        image: "/images/services/advisory.png",
        body: "Before capital commitment, we assist in formulating your overall entry strategy — asset class allocation, timing within Vision 2030 macro cycles, geographic diversification, and long-term exit liquidity.",
        points: ["Custom portfolio strategy design", "Macro growth corridor timing", "Risk-hedged asset diversification", "Structured exit strategy planning"],
        accent: "#7FA8B3",
      },
    ],
    processTitle: "The Client Experience",
    processHeading: "How We Execute Your Deal",
    process: [
      { step: "01", title: "Strategic Briefing", body: "We align on your risk profile, capital targets, timeline, and asset class preferences." },
      { step: "02", title: "Curated Sourcing", body: "Our advisors present 2–4 vetted, off-market opportunities tailored specifically to your mandate." },
      { step: "03", title: "40-Point Due Diligence", body: "Our team executes complete legal, zoning, and yield verification reports." },
      { step: "04", title: "Execution & Title Transfer", body: "We manage legal documentation, bilingual contracts, and RERA title deed registration." },
    ],
    whyTitle: "Why Choose Asaheeb?",
    why: [
      { title: "No Mass Market Noise", body: "We present only stress-tested properties that meet strict investment criteria." },
      { title: "Bilingual Executive Team", body: "Flawless advisory and contract support in both Arabic and English." },
      { title: "100% Transparent Structure", body: "Clear fee models with zero hidden surprises or undisclosed markups." },
      { title: "Saudi Arabia On-Ground Access", body: "Riyadh & Jeddah based advisors with direct access to decision makers." },
    ],
    ctaTitle: "Discuss Your Saudi Investment Strategy",
    ctaSub: "Schedule a private consultation with our senior advisory team.",
    ctaBtn: "Book Consultation",
  },
  ar: {
    badge: "خدماتنا",
    heroTitle: "وساطة دقيقة.\nاستشارة استراتيجية.\nبلا مساومة.",
    heroSub: "من انتقاء الفرص خارج السوق إلى نقل الملكية الرسمي عبر هيئة العقار، نتولى إدارة جميع مراحل استثمارك العقاري.",
    servicesTitle: "الخدمات الاستثمارية الأساسية",
    segmentsTitle: "استشارات مخصصة حسب فئة المستثمر",
    segments: [
      {
        id: "private-wealth",
        name: "الثروات الخاصة والأفراد",
        desc: "فلل فاخرة منتقاة، أراضٍ سكنية متميزة، وأصول حصرية خارج السوق في الرياض وجدة والسواحل.",
        featured: ["توفير الفلل خارج السوق", "التفاوض المباشر مع المالك", "نمذجة العائد المخصص"],
      },
      {
        id: "institutional",
        name: "المؤسسات والصناديق",
        desc: "الاستحواذ على الأراضي التجارية، تحليل محاور المشاريع الكبرى، واختبارات الضغط بالمواصفات المؤسسية.",
        featured: ["اختيار مواقع المشاريع الكبرى", "هيكلة صفقات الأراضي الضخمة", "العناية الواجبة عبر 40 نقطة"],
      },
      {
        id: "international",
        name: "المستثمرون الدوليون",
        desc: "استشارات ثنائية اللغة عبر الحدود، التخليص التنظيمي للملكية الأجنبية، وتسجيل الصكوك الكامل.",
        featured: ["الامتثال لأنظمة الاستثمار الأجنبي", "عقود قانونية ثنائية اللغة", "إدارة نقل الملكية عن بُعد"],
      },
    ],
    services: [
      {
        id: "sourcing",
        icon: "◈",
        title: "البحث والانتقاء العقاري",
        subtitle: "وصول حصري لأرقى الأصول السعودية",
        image: "/images/services/sourcing.png",
        body: "لا نكتفي بالسوق العام — بل ننتقي الأفضل. يستفيد مستشارونا من شبكاتنا المحلية للحصول على فلل فاخرة وأراضٍ تجارية خارج السوق قبل طرحها للعموم.",
        points: ["الوصول لصفقات خارج السوق", "مزايا أسعار ما قبل إطلاق المطورين", "محاور نمو رؤية 2030 الرئيسية", "تغطية متعددة المدن (الرياض، جدة، نيوم)"],
        accent: "#B8873B",
      },
      {
        id: "due-diligence",
        icon: "◉",
        title: "العناية الواجبة المؤسسية",
        subtitle: "فحص 40 نقطة للمخاطر والعوائد",
        image: "/images/services/diligence.png",
        body: "يمر كل أصل بعملية تحقق تقنية ومالية دقيقة تتكون من 40 نقطة — صحة صك الملكية، التقسيم البلدي، الأعباء، سجل المطور، ونمذجة العائد متعددة السيناريوهات.",
        points: ["تدقيق كامل لصك الملكية والأعباء", "فحص التقسيم والتخطيط البلدي", "نمذجة مالية مستقلة للعوائد", "تحليل سجل المطور وسمعته"],
        accent: "#7FA8B3",
      },
      {
        id: "legal",
        icon: "◈",
        title: "الدعم القانوني والامتثال العقاري",
        subtitle: "ضمان نقل الملكية بنسبة 100%",
        image: "/images/services/legal.png",
        body: "نتشارك مع محامين معتمدين من الهيئة العامة للعقار لإدارة جميع الاتفاقيات — من خطاب النية الأولي وحتى نقل الصك النهائي — باللغتين العربية والإنجليزية.",
        points: ["إعداد العقود القانونية بلغتين", "ضمان الامتثال لمتطلبات هيئة العقار", "إدارة إجراءات نقل الصك العقاري", "إشراف كامل على الضمانات والتعاملات"],
        accent: "#B8873B",
      },
      {
        id: "advisory",
        icon: "◉",
        title: "الاستشارات الاستثمارية الاستراتيجية",
        subtitle: "تخطيط المحفظة قبل التوقيع",
        image: "/images/services/advisory.png",
        body: "قبل تخصيص رأس المال، نساعدك في صياغة استراتيجية الدخول الكاملة — توزيع فئات الأصول، التوقيت ضمن دورات الاقتصاد الكلي لرؤية 2030، وتنويع المخاطر.",
        points: ["تصميم استراتيجيات مخصصة للمحفظة", "توقيت الدخول في محاور النمو", "تنويع الأصول لتقليل المخاطر", "تخطيط استراتيجيات الخروج المهدفة"],
        accent: "#7FA8B3",
      },
    ],
    processTitle: "تجربة العميل",
    processHeading: "كيف ننفذ صفقتك الاستثمارية",
    process: [
      { step: "01", title: "الإحاطة الاستراتيجية", body: "نتوافق على مستوى المخاطر والميزانية والجدول الزمني وفئات الأصول المستهدفة." },
      { step: "02", title: "الانتقاء المخصص", body: "يقدم مستشارونا 2-4 فرص مدققة ومحصورة خارج السوق تتوافق مع متطلباتك." },
      { step: "03", title: "فحص العناية الواجبة", body: "ينفذ فريقنا تقرير الفحص الشامل المكون من 40 نقطة قانونية وفنية ومالية." },
      { step: "04", title: "الإغلاق ونقل الصك", body: "نتم صياغة العقود الثنائية ونقل ملكية الصك رسمياً عبر هيئة العقار." },
    ],
    whyTitle: "لماذا تختار أصاهيب؟",
    why: [
      { title: "بلا ضوضاء عشوائية", body: "نقدم فقط العقارات المختبرة والتي تلبي معايير استثمارية صارمة." },
      { title: "فريق استشاري ثنائي اللغة", body: "دعم استشاري وقانوني كامل بالعربية والإنجليزية في كافة المراحل." },
      { title: "هيكل شفاف 100%", body: "نماذج رسوم واضحة وبلا أية مفاجآت أو زيادة غير معلنة." },
      { title: "تواجد ميداني في المملكة", body: "مستشارون مقيمون في الرياض وجدة مع وصول مباشر لمتخذي القرار." },
    ],
    ctaTitle: "ناقش استراتيجيتك الاستثمارية في المملكة",
    ctaSub: "احجز جلسة استشارية خاصة مع كبار مستشارينا العقاريين.",
    ctaBtn: "احجز الاستشارة الآن",
  },
};

// ─── Main Services Page ────────────────────────────────────────────────────────
export default function ServicesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;

  const [activeSegment, setActiveSegment] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const segmentsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        const heroLines = heroRef.current.querySelectorAll(".hero-line");
        if (heroLines.length > 0) {
          gsap.set(heroLines, { opacity: 0, y: 35 });
          gsap.to(heroLines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" });
        }
      }

      // Services entrance
      if (servicesRef.current) {
        const serviceItems = servicesRef.current.querySelectorAll(".service-block");
        if (serviceItems.length > 0) {
          gsap.set(serviceItems, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: servicesRef.current,
            start: "top 80%",
            onEnter: () => gsap.to(serviceItems, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }),
          });
        }
      }

      // Segments section
      if (segmentsRef.current) {
        gsap.set(segmentsRef.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: segmentsRef.current,
          start: "top 85%",
          onEnter: () => gsap.to(segmentsRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }),
        });
      }

      // Why cards
      if (whyRef.current) {
        const cards = whyRef.current.querySelectorAll(".why-card");
        if (cards.length > 0) {
          gsap.set(cards, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: whyRef.current,
            start: "top 80%",
            onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }),
          });
        }
      }
    });
    return () => ctx.revert();
  }, [isAr]);

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-36 pb-20 px-6 sm:px-10 lg:px-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <svg className="absolute w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <polygon points="600,50 1150,750 50,750" fill="none" stroke="#B8873B" strokeWidth="1" />
            <polygon points="600,150 1050,700 150,700" fill="none" stroke="#B8873B" strokeWidth="0.5" />
            <circle cx="600" cy="400" r="300" fill="none" stroke="#7FA8B3" strokeWidth="0.5" strokeDasharray="8 12" />
          </svg>
        </div>

        <div ref={heroRef} className={`relative z-10 max-w-4xl mx-auto ${isAr ? "text-right" : "text-center"}`}>
          <div
            className="hero-line inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full backdrop-blur-md"
            style={{ borderColor: "rgba(184,135,59,0.4)", backgroundColor: "rgba(18,19,15,0.85)" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#B8873B] font-semibold">{c.badge}</span>
          </div>

          {c.heroTitle.split("\n").map((line, i) => (
            <h1 key={i} className="hero-line font-display text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-[-0.025em]">
              {i === 1 ? <span className="italic text-[#B8873B]">{line}</span> : <span className="text-[#E8DFCE]">{line}</span>}
            </h1>
          ))}

          <p className={`hero-line font-sans text-base sm:text-lg text-[#8C8477] leading-relaxed max-w-2xl mt-6 ${isAr ? "" : "mx-auto"}`}>
            {c.heroSub}
          </p>

          <div className={`hero-line mt-10 flex flex-wrap gap-4 ${isAr ? "justify-end" : "justify-center"}`}>
            <a
              href="#services-list"
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase px-7 py-3.5 border border-[#B8873B] text-[#E8DFCE] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 font-semibold"
            >
              Explore Services
            </a>
            <a
              href="/contact"
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase px-7 py-3.5 border border-white/20 text-[#8C8477] hover:text-[#E8DFCE] hover:border-white/50 transition-all duration-300"
            >
              Request Mandate Briefing
            </a>
          </div>
        </div>
      </section>

      {/* ── INVESTOR SEGMENT FILTER ────────────────────────────────────── */}
      <section ref={segmentsRef} className="py-12 px-6 sm:px-10 lg:px-20 border-y border-[#B8873B]/15 bg-[#171813]/60">
        <div className="max-w-6xl mx-auto">
          <p className={`font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-8 ${isAr ? "text-right" : "text-center"}`}>
            {c.segmentsTitle}
          </p>

          {/* Segment Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {c.segments.map((seg, idx) => (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(idx)}
                className={`font-mono text-[11px] tracking-[0.18em] uppercase px-6 py-3 border transition-all duration-300 rounded-sm ${
                  activeSegment === idx
                    ? "border-[#B8873B] bg-[#B8873B]/15 text-[#E8DFCE] font-semibold shadow-[0_0_20px_rgba(184,135,59,0.25)]"
                    : "border-white/10 text-[#8C8477] hover:border-white/30 hover:text-[#E8DFCE]"
                }`}
              >
                {seg.name}
              </button>
            ))}
          </div>

          {/* Active Segment Detail Card */}
          <div className="p-8 border border-[#B8873B]/20 bg-[#12130F]/90 rounded-sm max-w-4xl mx-auto backdrop-blur-md">
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${isAr ? "text-right" : ""}`}>
              <div className="md:col-span-7">
                <h3 className="font-display text-2xl text-[#E8DFCE] mb-3">{c.segments[activeSegment].name}</h3>
                <p className="font-sans text-sm text-[#8C8477] leading-relaxed mb-4">{c.segments[activeSegment].desc}</p>
              </div>
              <div className="md:col-span-5 border-l md:border-l-0 md:border-r-0 border-[#B8873B]/20 pt-4 md:pt-0">
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#B8873B] mb-3">Key Solutions</p>
                <ul className="space-y-2">
                  {c.segments[activeSegment].featured.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 font-sans text-xs text-[#E8DFCE]/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8873B]" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES SHOWCASE (WITH HD STOCK IMAGES) ───────────────── */}
      <section id="services-list" className="py-24 px-6 sm:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <p className={`font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-16 ${isAr ? "text-right" : ""}`}>
            {c.servicesTitle}
          </p>

          <div ref={servicesRef} className="space-y-20">
            {c.services.map((svc, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={svc.id}
                  className="service-block grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center p-8 sm:p-10 border border-[#B8873B]/20 bg-[#171813]/80 rounded-sm backdrop-blur-md hover:border-[#B8873B]/45 transition-all duration-500 shadow-2xl"
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-[#B8873B]/30 group">
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12130F] via-transparent to-transparent opacity-50" />
                      
                      {/* Icon overlay badge */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-[#B8873B]/40 bg-[#12130F]/90 backdrop-blur-md flex items-center justify-center text-lg" style={{ color: svc.accent }}>
                        {svc.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"} ${isAr ? "text-right" : ""}`}>
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase font-semibold" style={{ color: svc.accent }}>
                      0{i + 1} · {svc.subtitle}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-[#E8DFCE] mt-2 mb-4 tracking-tight">{svc.title}</h2>
                    <p className="font-sans text-sm text-[#8C8477] leading-relaxed mb-6">{svc.body}</p>

                    <div className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                      {svc.points.map((pt, pIdx) => (
                        <div key={pIdx} className={`flex items-center gap-3 font-sans text-xs sm:text-sm text-[#E8DFCE]/90 ${isAr ? "flex-row-reverse" : ""}`}>
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: svc.accent }} />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#B8873B] hover:text-[#E8DFCE] transition-colors font-semibold"
                    >
                      Inquire About {svc.title}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={isAr ? "rotate-180" : ""}>
                        <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLIENT EXPERIENCE PROCESS FLOW ───────────────────────────────── */}
      <section
        ref={processRef}
        className="py-24 px-6 sm:px-10 lg:px-20 border-y border-[#B8873B]/15"
        style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.06) 0%, rgba(18,19,15,1) 80%)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className={`mb-16 ${isAr ? "text-right" : ""}`}>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-3">{c.processTitle}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#E8DFCE]">{c.processHeading}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.process.map((p, i) => (
              <div
                key={p.step}
                className="p-6 border border-[#B8873B]/20 bg-[#12130F]/80 rounded-sm backdrop-blur-md hover:border-[#B8873B]/50 transition-all duration-300 relative group"
              >
                <div className="font-mono text-3xl text-[#B8873B] font-bold mb-4 group-hover:scale-105 transition-transform">{p.step}</div>
                <h3 className="font-display text-lg text-[#E8DFCE] mb-2">{p.title}</h3>
                <p className="font-sans text-xs text-[#8C8477] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ASAHEEB ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <p className={`font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-12 ${isAr ? "text-right" : ""}`}>
            {c.whyTitle}
          </p>
          <div ref={whyRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.why.map((w, i) => (
              <div
                key={i}
                className="why-card p-8 border border-[#B8873B]/20 bg-[#171813]/60 rounded-sm hover:border-[#B8873B]/45 transition-all duration-300"
              >
                <div className={`flex items-center gap-3 mb-3 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                  <div className="w-7 h-7 rounded-full border border-[#B8873B]/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#B8873B]" />
                  </div>
                  <h3 className="font-display text-xl text-[#E8DFCE]">{w.title}</h3>
                </div>
                <p className={`font-sans text-sm text-[#8C8477] leading-relaxed ${isAr ? "text-right" : ""}`}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center border-t border-[#B8873B]/15" style={{ background: "linear-gradient(to top, rgba(184,135,59,0.08), transparent)" }}>
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl text-[#E8DFCE] mb-4 tracking-tight">{c.ctaTitle}</h2>
          <p className="font-sans text-sm text-[#8C8477] mb-8 leading-relaxed">{c.ctaSub}</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase px-10 py-4.5 border border-[#B8873B] text-[#E8DFCE] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 font-semibold shadow-[0_0_30px_rgba(184,135,59,0.2)]"
          >
            {c.ctaBtn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={isAr ? "rotate-180" : ""}>
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
