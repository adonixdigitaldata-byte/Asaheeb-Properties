"use client";

import { useEffect, useRef } from "react";
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
    badge: "Who We Are",
    heroTitle: "Built on Trust.\nDriven by Vision.",
    heroSub: "Asaheeb Properties is Saudi Arabia's premier real estate investment brokerage — guiding private wealth and institutional investors from initial strategy to title transfer.",
    storyTitle: "Our Story",
    storyHeading: "Curators of Premium Saudi Real Estate",
    storyText: "Founded at the dawn of Vision 2030, Asaheeb Properties was born with one mission: to make world-class Saudi real estate investments accessible, transparent, and highly rewarding for every investor — local and international.",
    storyText2: "We are not a mass marketplace. We are curators. Every asset we present has been vetted and stress-tested by our team of Saudi real estate experts — so you invest with confidence, not guesswork.",
    storyBadgeTitle: "SAR 2.5B+",
    storyBadgeSub: "Curated Transaction Volume",
    visionTitle: "Vision 2030 Alignment",
    visionHeading: "Investing in the Heart of Saudi Arabia's Transformation",
    visionText: "From Riyadh's North Financial Corridor to Madinah Al-Munawwarah's holy city developments and Jeddah's Red Sea coast, we identify growth vectors before market prices shift.",
    visionQuote: "\"Saudi Arabia is experiencing the most dynamic real estate growth in the region. We position our clients at the forefront of this historic shift.\"",
    visionAuthor: "Asaheeb Executive Advisory",
    valuesTitle: "Our Core Principles",
    values: [
      { icon: "◈", title: "Transparency", body: "Full disclosure at every stage — pricing, legal structure, risk analysis, and projected ROI." },
      { icon: "◉", title: "Expertise", body: "Deep local knowledge across every prime Saudi corridor, from Giga-projects to off-market commercial land." },
      { icon: "◈", title: "Title Security", body: "100% legal title verification and RERA compliance guarantee on every transaction." },
      { icon: "◉", title: "Visionary Sourcing", body: "We operate inside Vision 2030, identifying high-yield assets before public market listing." },
    ],
    statsTitle: "Asaheeb by the Numbers",
    stats: [
      { val: "SAR 2.5B+", label: "Curated Deal Volume" },
      { val: "4", label: "Asset Classes" },
      { val: "100%", label: "Title Guarantee" },
      { val: "3", label: "Prime Cities" },
    ],
    timelineTitle: "Our Journey",
    timeline: [
      { year: "2020", title: "Founded in Jeddah", body: "Asaheeb Properties established with an exclusive focus on Vision 2030 growth corridors." },
      { year: "2021", title: "First Institutional Deal", body: "Secured our first institutional land deal near Madinah Al-Munawwarah prime corridor." },
      { year: "2022", title: "Riyadh Expansion", body: "Expanded operations to Riyadh and launched off-market luxury villa sourcing." },
      { year: "2023", title: "SAR 1B+ Milestone", body: "Crossed SAR 1 billion in total deal advisory volume." },
      { year: "2024", title: "Digital Advisory", body: "Launched bilingual digital platform for international and private wealth clients." },
      { year: "2025", title: "Vision 2030 Leader", body: "Surpassed SAR 2.5B in deal volume, shaping the future of Saudi real estate brokerage." },
    ],
    ctaTitle: "Ready to Build Your Saudi Real Estate Portfolio?",
    ctaSub: "Connect with our advisory team for a personalized investment briefing.",
    ctaBtn: "Book a Consultation",
  },
  ar: {
    badge: "من نحن",
    heroTitle: "مبنيون على الثقة.\nمدفوعون بالرؤية.",
    heroSub: "أصاهيب العقارية هي الوسيط العقاري الاستثماري الرائد في المملكة — نرشد المستثمرين والأفراد من الاستراتيجية الأولى وحتى نقل الملكية.",
    storyTitle: "قصتنا",
    storyHeading: "منتقون لأرقى العقارات السعودية",
    storyText: "تأسست أصاهيب العقارية مع فجر رؤية 2030 بمهمة واحدة: جعل الاستثمار العقاري في المملكة متاحاً وشفافاً ومجزياً لكل مستثمر — محلي أو دولي.",
    storyText2: "نحن لسنا سوقاً عشوائياً، بل نحن منتقون محترفون. كل أصل نقدمه تم فحصه واختباره بدقة من قِبَل فريقنا من خبراء العقارات السعوديين لتستثمر بثقة ورؤية واضحة.",
    storyBadgeTitle: "+2.5 مليار ر.س",
    storyBadgeSub: "حجم الصفقات المنسقة",
    visionTitle: "التوافق مع رؤية 2030",
    visionHeading: "نستثمر في قلب التحول التاريخي للمملكة",
    visionText: "من محور الرياض المالي الشمالي إلى سواحل نيوم الخلابة ومشاريع البحر الأحمر بجدة، نحدد مسارات النمو قبل تحرك أسعار السوق.",
    visionQuote: "\"تشهد المملكة العربية السعودية أسرع نمو عقاري في المنطقة. نضع عملاءنا في طليعة هذا التحول التاريخي.\"",
    visionAuthor: "إدارة أصاهيب الاستشارية",
    valuesTitle: "مبادؤنا الرئيسية",
    values: [
      { icon: "◈", title: "الشفافية الكاملة", body: "إفصاح شامل في كل مرحلة — التسعير، الهيكل القانوني، تحليل المخاطر، والعائد المتوقع." },
      { icon: "◉", title: "الخبرة المحلية", body: "معرفة عميقة بجميع المحاور السعودية الرئيسية، من المشاريع الكبرى إلى الأراضي التجاري." },
      { icon: "◈", title: "أمان صك الملكية", body: "فحص قانوني بنسبة 100% والالتزام الكامل بمتطلبات الهيئة العامة للعقار." },
      { icon: "◉", title: "الانتقاء الرؤيوي", body: "نعمل في قلب رؤية 2030، ونكشف عن الأصول عالية العائد قبل طرحها للعموم." },
    ],
    statsTitle: "أصاهيب بالأرقام",
    stats: [
      { val: "+2.5 مليار ر.س", label: "حجم الصفقات المنسقة" },
      { val: "4", label: "فئات الأصول" },
      { val: "100%", label: "ضمان الملكية" },
      { val: "3", label: "مدن رئيسية" },
    ],
    timelineTitle: "رحلتنا",
    timeline: [
      { year: "2020", title: "التأسيس في جدة", body: "تأسست أصاهيب العقارية بتركيز حصري على محاور نمو رؤية 2030." },
      { year: "2021", title: "أول صفقة مؤسسية", body: "إنجاز أول معاملة أرض تجارية كبرى بالقرب من بنية نيوم التحتية." },
      { year: "2022", title: "التوسع في الرياض", body: "توسيع العمليات إلى الرياض وإطلاق خدمة توفير الفلل الفاخرة." },
      { year: "2023", title: "تجاوز مليار ريال", body: "تجاوز مليار ريال سعودي في حجم الصفقات الاستشارية المنسقة." },
      { year: "2024", title: "المنصة الرقمية", body: "إطلاق منصة استشارية ثنائية اللغة للمستثمرين المحليين والدوليين." },
      { year: "2025", title: "ريادة رؤية 2030", body: "تجاوز 2.5 مليار ريال في الصفقات العقارية المنسقة." },
    ],
    ctaTitle: "مستعد لبناء محفظتك العقارية في السعودية؟",
    ctaSub: "تواصل مع فريقنا الاستشاري للحصول على جلسة إحاطة استثمارية مخصصة.",
    ctaBtn: "احجز استشارة استثمارية",
  },
};

// ─── Value Card Component ──────────────────────────────────────────────────────
function ValueCard({ icon, title, body, accent }: { icon: string; title: string; body: string; accent: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / rect.height) * 8;
    const ry = (x / rect.width) * 8;
    card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      className="value-card p-8 border transition-all duration-300 cursor-default relative group overflow-hidden rounded-sm"
      style={{
        borderColor: "rgba(184,135,59,0.25)",
        backgroundColor: "rgba(18,19,15,0.75)",
        backdropFilter: "blur(12px)",
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#B8873B]/10 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-30" />
      <div className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: accent }}>{icon}</div>
      <h3 className="font-display text-xl text-[#E8DFCE] mb-3 tracking-tight group-hover:text-[#B8873B] transition-colors">{title}</h3>
      <p className="font-sans text-sm text-[#8C8477] leading-relaxed">{body}</p>
    </div>
  );
}

// ─── Main About Page Component ─────────────────────────────────────────────────
export default function AboutPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;

  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        const heroEls = heroRef.current.querySelectorAll(".hero-el");
        if (heroEls.length > 0) {
          gsap.set(heroEls, { opacity: 0, y: 30 });
          gsap.to(heroEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" });
        }
      }

      // Story Section entrance - always visible on load
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current,
          { opacity: 0.5, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      // Vision Section entrance
      if (visionRef.current) {
        gsap.fromTo(
          visionRef.current,
          { opacity: 0.5, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      // Stats counter
      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll(".stat-item");
        if (statEls.length > 0) {
          gsap.set(statEls, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: statsRef.current,
            start: "top 85%",
            onEnter: () => {
              gsap.to(statEls, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
            },
          });
        }
      }

      // Timeline items
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(".timeline-item");
        if (items.length > 0) {
          gsap.set(items, { opacity: 0, x: isAr ? 30 : -30 });
          ScrollTrigger.create({
            trigger: timelineRef.current,
            start: "top 75%",
            onEnter: () => {
              gsap.to(items, { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" });
            },
          });
        }
      }

      // Values grid
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll(".value-card");
        if (cards.length > 0) {
          gsap.set(cards, { opacity: 0, y: 35 });
          ScrollTrigger.create({
            trigger: valuesRef.current,
            start: "top 75%",
            onEnter: () => {
              gsap.to(cards, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" });
            },
          });
        }
      }
    });
    return () => ctx.revert();
  }, [isAr]);

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── HERO SECTION WITH BACKGROUND IMAGE ────────────────────────────────────── */}
      <section className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-36 pb-20 px-6">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero-bg.png"
            alt="Saudi Arabia Modern Architectural Skyline"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-70 scale-105 transition-transform duration-1000"
          />
          {/* Multi-layered Gradients for Deep Dark Luxury Feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12130F] via-[#12130F]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#12130F]/60 via-transparent to-[#12130F]" />
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(184,135,59,0.25) 0%, transparent 70%)",
            }}
          />
        </div>

        <div ref={heroRef} className={`relative z-10 text-center max-w-4xl mx-auto ${isAr ? "text-right" : ""}`}>
          <div
            className="hero-el inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full backdrop-blur-md"
            style={{ borderColor: "rgba(184,135,59,0.4)", backgroundColor: "rgba(18,19,15,0.8)" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#B8873B] font-semibold">{c.badge}</span>
          </div>

          <h1
            className="hero-el font-display text-4xl sm:text-6xl lg:text-7xl text-[#E8DFCE] font-normal leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ whiteSpace: "pre-line" }}
          >
            {c.heroTitle.split("\n")[0]}{"\n"}
            <span className="italic text-[#B8873B]">{c.heroTitle.split("\n")[1]}</span>
          </h1>

          <p className={`hero-el font-sans text-base sm:text-lg text-[#8C8477] leading-relaxed max-w-2xl ${isAr ? "mr-auto" : "mx-auto"}`}>
            {c.heroSub}
          </p>
        </div>
      </section>

      {/* ── STORY SECTION WITH ADVISORY OFFICE IMAGE ─────────────────────────────── */}
      <section ref={storyRef} className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div className={`lg:col-span-6 ${isAr ? "lg:order-2 text-right" : ""}`}>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-3">{c.storyTitle}</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#E8DFCE] mb-6 tracking-tight leading-tight">{c.storyHeading}</h2>
            <p className="font-sans text-base sm:text-lg text-[#E8DFCE]/90 leading-[1.8] mb-6">{c.storyText}</p>
            <p className="font-sans text-sm sm:text-base text-[#8C8477] leading-[1.8] mb-8">{c.storyText2}</p>
            
            <div className={`flex flex-wrap items-center gap-6 pt-4 border-t border-[#B8873B]/20 ${isAr ? "justify-start" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B8873B]" />
                <span className="font-mono text-xs tracking-wider text-[#E8DFCE] uppercase">RERA Registered Brokerage</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7FA8B3]" />
                <span className="font-mono text-xs tracking-wider text-[#E8DFCE] uppercase">Vision 2030 Alignment</span>
              </div>
            </div>
          </div>

          {/* Image & Floating Badge Column */}
          <div className={`lg:col-span-6 relative ${isAr ? "lg:order-1" : ""}`}>
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-[#B8873B]/30 shadow-2xl group">
              <Image
                src="/images/about/office-story.png"
                alt="Asaheeb Advisory Executive Office in Riyadh"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12130F] via-transparent to-transparent opacity-60" />

              {/* Floating Stat Badge Overlay */}
              <div
                className={`absolute bottom-6 ${isAr ? "right-6" : "left-6"} p-5 border border-[#B8873B]/40 rounded-sm backdrop-blur-xl shadow-xl`}
                style={{ backgroundColor: "rgba(18,19,15,0.85)" }}
              >
                <div className="font-display text-2xl sm:text-3xl text-[#B8873B] font-bold">{c.storyBadgeTitle}</div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#8C8477] mt-1">{c.storyBadgeSub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION 2030 CORRIDOR SHOWCASE ────────────────────────────────────────── */}
      <section ref={visionRef} className="py-20 px-6 sm:px-12 lg:px-24 bg-[#171813] border-y border-[#B8873B]/15 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Vision Image */}
            <div className={`lg:col-span-6 relative ${isAr ? "lg:order-2" : ""}`}>
              <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden border border-[#7FA8B3]/30 shadow-2xl group">
                <Image
                  src="/images/about/vision-corridor.png"
                  alt="Saudi Arabia Vision 2030 Corridor Development"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#12130F] via-transparent to-transparent opacity-50" />
              </div>
            </div>

            {/* Vision Quote & Text */}
            <div className={`lg:col-span-6 ${isAr ? "lg:order-1 text-right" : ""}`}>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#7FA8B3] mb-3">{c.visionTitle}</p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#E8DFCE] mb-6 leading-tight">{c.visionHeading}</h2>
              <p className="font-sans text-sm sm:text-base text-[#8C8477] leading-relaxed mb-8">{c.visionText}</p>

              {/* Quote Block */}
              <div className="p-6 border-l-2 border-[#B8873B] bg-[#12130F]/60 backdrop-blur-md rounded-r-sm">
                <p className="font-display italic text-base sm:text-lg text-[#E8DFCE] leading-relaxed mb-3">{c.visionQuote}</p>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B]">{c.visionAuthor}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(to bottom, rgba(184,135,59,0.04) 0%, transparent 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <p className={`font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-12 ${isAr ? "text-right" : "text-center"}`}>
            {c.statsTitle}
          </p>
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {c.stats.map((s, i) => (
              <div
                key={i}
                className="stat-item text-center p-6 sm:p-8 border border-[#B8873B]/20 rounded-sm backdrop-blur-md hover:border-[#B8873B]/50 transition-all duration-300"
                style={{ backgroundColor: "rgba(18,19,15,0.6)" }}
              >
                <div className="font-display text-2xl sm:text-4xl text-[#B8873B] font-semibold mb-2">{s.val}</div>
                <div className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.22em] uppercase text-[#8C8477]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE JOURNEY ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto">
        <p className={`font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-16 ${isAr ? "text-right" : ""}`}>
          {c.timelineTitle}
        </p>
        <div ref={timelineRef} className="relative">
          <div className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#B8873B]/70 via-[#B8873B]/30 to-transparent ${isAr ? "right-[7px]" : "left-[7px]"}`} />
          <div className="space-y-12">
            {c.timeline.map((item, i) => (
              <div key={i} className={`timeline-item relative flex gap-6 sm:gap-8 ${isAr ? "flex-row-reverse" : ""}`}>
                <div className={`relative flex-shrink-0 ${isAr ? "order-last" : ""}`}>
                  <div className="w-4 h-4 rounded-full border-2 border-[#B8873B] bg-[#12130F] shadow-[0_0_15px_rgba(184,135,59,0.6)]" />
                </div>
                <div className={`flex-1 pb-2 ${isAr ? "text-right" : ""}`}>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#B8873B] font-semibold uppercase">{item.year}</span>
                  <h3 className="font-display text-xl text-[#E8DFCE] mt-1 mb-2 tracking-tight">{item.title}</h3>
                  <p className="font-sans text-xs sm:text-sm text-[#8C8477] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES SECTION ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto">
        <p className={`font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-12 ${isAr ? "text-right" : ""}`}>
          {c.valuesTitle}
        </p>
        <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {c.values.map((v, i) => (
            <ValueCard key={i} icon={v.icon} title={v.title} body={v.body} accent="#B8873B" />
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center border-t border-[#B8873B]/15 relative overflow-hidden" style={{ background: "linear-gradient(to top, rgba(184,135,59,0.08), transparent)" }}>
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="font-display text-3xl sm:text-5xl text-[#E8DFCE] mb-6 tracking-tight leading-tight">{c.ctaTitle}</h2>
          <p className="font-sans text-sm sm:text-base text-[#8C8477] mb-10 leading-relaxed">{c.ctaSub}</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase px-9 py-4 border border-[#B8873B] text-[#E8DFCE] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 font-semibold shadow-[0_0_25px_rgba(184,135,59,0.2)]"
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
