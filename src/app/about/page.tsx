"use client";

import { useEffect, useRef } from "react";
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
    heroSub: "Asaheeb Properties is Saudi Arabia's premier real estate investment brokerage — guiding investors from first question to final signature.",
    storyTitle: "Our Story",
    storyText: "Founded at the dawn of Vision 2030, Asaheeb Properties was born with one mission: to make world-class Saudi real estate investments accessible, transparent, and rewarding for every investor — local and international.",
    storyText2: "We are not a marketplace. We are curators. Every asset we present has been sourced, vetted, and stress-tested by our team of Saudi real estate experts — so you invest with confidence, not guesswork.",
    valuesTitle: "Our Values",
    values: [
      { icon: "◈", title: "Transparency", body: "Full disclosure at every stage — pricing, legal structure, risks, and returns. No surprises." },
      { icon: "◉", title: "Expertise", body: "Deep local knowledge of every Saudi corridor from Riyadh's north ring to NEOM's coastline." },
      { icon: "◈", title: "Trust", body: "Every deal is backed by institutional-grade due diligence and full legal title guarantee." },
      { icon: "◉", title: "Vision", body: "We don't just track Vision 2030 — we operate inside it, identifying opportunities before prices move." },
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
      { year: "2020", title: "Founded", body: "Asaheeb Properties established in Jeddah, focused exclusively on Vision 2030 corridors." },
      { year: "2021", title: "First Major Deal", body: "Secured our first institutional-grade commercial land transaction near NEOM." },
      { year: "2022", title: "Expanded Coverage", body: "Expanded operations to Riyadh and launched villa sourcing division." },
      { year: "2023", title: "SAR 1B+ Milestone", body: "Crossed SAR 1 billion in total curated deal volume." },
      { year: "2024", title: "Digital Platform", body: "Launched bilingual digital advisory platform for international investors." },
      { year: "2025", title: "Vision Forward", body: "Over SAR 2.5B in curated deals. Shaping the future of Saudi real estate investment." },
    ],
    ctaTitle: "Ready to Invest?",
    ctaSub: "Join hundreds of investors building wealth in Saudi Arabia's transformation.",
    ctaBtn: "Start Your Investment Journey",
  },
  ar: {
    badge: "من نحن",
    heroTitle: "مبنيون على الثقة.\nمدفوعون بالرؤية.",
    heroSub: "أصاهيب العقارية هي الوسيط العقاري الاستثماري الرائد في المملكة — نرشدك من أول سؤال وحتى التوقيع النهائي.",
    storyTitle: "قصتنا",
    storyText: "تأسست أصاهيب العقارية مع فجر رؤية 2030 بمهمة واحدة: جعل الاستثمار العقاري في المملكة العربية السعودية متاحاً وشفافاً ومجزياً لكل مستثمر — محلي أو دولي.",
    storyText2: "نحن لسنا سوقاً عقارية، بل نحن منتقون محترفون. كل أصل نقدمه تم الحصول عليه وفحصه وااختباره بدقة من قِبَل فريقنا من خبراء العقارات السعوديين — لتستثمر بثقة وليس بالتخمين.",
    valuesTitle: "قيمنا",
    values: [
      { icon: "◈", title: "الشفافية", body: "إفصاح كامل في كل مرحلة — التسعير والهيكل القانوني والمخاطر والعوائد. لا مفاجآت." },
      { icon: "◉", title: "الخبرة", body: "معرفة محلية عميقة بكل ممر سعودي من الحلقة الشمالية بالرياض إلى ساحل نيوم." },
      { icon: "◈", title: "الثقة", body: "كل صفقة مدعومة بعناية واجبة على مستوى مؤسسي وضمان ملكية قانونية كامل." },
      { icon: "◉", title: "الرؤية", body: "لا نتابع رؤية 2030 فقط — بل نعمل في قلبها، ونحدد الفرص قبل أن تتحرك الأسعار." },
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
      { year: "2020", title: "التأسيس", body: "تأسست أصاهيب العقارية في جدة، تركز حصرياً على محاور رؤية 2030." },
      { year: "2021", title: "أول صفقة كبرى", body: "أتممنا أول معاملة أرض تجارية على مستوى مؤسسي قرب نيوم." },
      { year: "2022", title: "توسع التغطية", body: "توسعنا في الرياض وأطلقنا قسم توفير الفلل." },
      { year: "2023", title: "تجاوز مليار ريال", body: "تجاوزنا مليار ريال سعودي في حجم الصفقات المنسقة." },
      { year: "2024", title: "المنصة الرقمية", body: "أطلقنا منصة استشارية رقمية ثنائية اللغة للمستثمرين الدوليين." },
      { year: "2025", title: "رؤية للمستقبل", body: "أكثر من 2.5 مليار ريال في صفقات منسقة. نشكّل مستقبل الاستثمار العقاري السعودي." },
    ],
    ctaTitle: "مستعد للاستثمار؟",
    ctaSub: "انضم إلى مئات المستثمرين الذين يبنون ثرواتهم في تحول المملكة العربية السعودية.",
    ctaBtn: "ابدأ رحلتك الاستثمارية",
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
    const rx = -(y / rect.height) * 10;
    const ry = (x / rect.width) * 10;
    card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      className="value-card p-6 border transition-all duration-300 cursor-default"
      style={{
        borderColor: "rgba(184,135,59,0.2)",
        backgroundColor: "rgba(18,19,15,0.6)",
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease, box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-3xl mb-4" style={{ color: accent }}>{icon}</div>
      <h3 className="font-display text-xl text-[#E8DFCE] mb-3 tracking-tight">{title}</h3>
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

      // Stats counter
      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll(".stat-item");
        if (statEls.length > 0) {
          gsap.set(statEls, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: statsRef.current,
            start: "top 80%",
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
    <main
      className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0"
      dir={isAr ? "rtl" : "ltr"}
    >
      <PageNav />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-36 pb-16 px-6">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(to right, #B8873B 1px, transparent 1px), linear-gradient(to bottom, #B8873B 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%", left: isAr ? "auto" : "5%", right: isAr ? "5%" : "auto",
            width: "50vw", height: "50vw", maxWidth: 550, maxHeight: 550,
            background: "radial-gradient(circle, rgba(184,135,59,0.18) 0%, transparent 65%)",
            filter: "blur(30px)",
          }}
        />

        <div ref={heroRef} className={`relative z-10 text-center px-6 max-w-4xl mx-auto ${isAr ? "text-right" : ""}`}>
          <div className="hero-el inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full"
            style={{ borderColor: "rgba(184,135,59,0.4)", backgroundColor: "rgba(18,19,15,0.85)" }}>
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

      {/* ── STORY ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={isAr ? "lg:order-2 text-right" : ""}>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-4">{c.storyTitle}</p>
            <p className="font-sans text-base sm:text-lg text-[#E8DFCE]/90 leading-[1.9] mb-6">{c.storyText}</p>
            <p className="font-sans text-sm sm:text-base text-[#8C8477] leading-[1.9]">{c.storyText2}</p>
          </div>
          <div className={`relative ${isAr ? "lg:order-1" : ""}`}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 border border-[#B8873B]/20 rotate-3" />
              <div className="absolute inset-4 border border-[#B8873B]/10 -rotate-2" />
              <div
                className="absolute inset-8 flex flex-col items-center justify-center text-center p-8"
                style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.08) 0%, rgba(18,19,15,0.9) 100%)" }}
              >
                <div className="font-display text-5xl sm:text-6xl text-[#B8873B] font-bold mb-2">A</div>
                <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#8C8477]">Asaheeb Properties</div>
                <div className="w-8 h-px bg-[#B8873B]/50 my-4" />
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#8C8477]/60">Est. 2020 · Jeddah, KSA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(to bottom, rgba(184,135,59,0.04) 0%, transparent 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <p className={`font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-12 ${isAr ? "text-right" : "text-center"}`}>
            {c.statsTitle}
          </p>
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {c.stats.map((s, i) => (
              <div
                key={i}
                className="stat-item text-center p-6 sm:p-8 border border-[#B8873B]/15 hover:border-[#B8873B]/40 transition-colors duration-300"
                style={{ backgroundColor: "rgba(18,19,15,0.5)" }}
              >
                <div className="font-display text-2xl sm:text-4xl text-[#B8873B] font-semibold mb-2">{s.val}</div>
                <div className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.22em] uppercase text-[#8C8477]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto">
        <p className={`font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8873B] mb-16 ${isAr ? "text-right" : ""}`}>
          {c.timelineTitle}
        </p>
        <div ref={timelineRef} className="relative">
          <div className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#B8873B]/60 via-[#B8873B]/30 to-transparent ${isAr ? "right-[7px]" : "left-[7px]"}`} />
          <div className="space-y-10">
            {c.timeline.map((item, i) => (
              <div key={i} className={`timeline-item relative flex gap-6 sm:gap-8 ${isAr ? "flex-row-reverse" : ""}`}>
                <div className={`relative flex-shrink-0 ${isAr ? "order-last" : ""}`}>
                  <div className="w-4 h-4 rounded-full border-2 border-[#B8873B] bg-[#12130F] shadow-[0_0_12px_rgba(184,135,59,0.5)]" />
                </div>
                <div className={`flex-1 pb-2 ${isAr ? "text-right" : ""}`}>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#B8873B] font-semibold">{item.year}</span>
                  <h3 className="font-display text-lg sm:text-xl text-[#E8DFCE] mt-1 mb-2">{item.title}</h3>
                  <p className="font-sans text-xs sm:text-sm text-[#8C8477] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────────── */}
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

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(to top, rgba(184,135,59,0.06), transparent)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl text-[#E8DFCE] mb-4 tracking-tight">{c.ctaTitle}</h2>
          <p className="font-sans text-sm sm:text-base text-[#8C8477] mb-8 leading-relaxed">{c.ctaSub}</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase px-8 py-4 border border-[#B8873B] text-[#E8DFCE] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 font-semibold"
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
