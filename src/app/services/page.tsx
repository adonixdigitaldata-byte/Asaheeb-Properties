"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

// ─── Bilingual content ─────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    badge: "What We Offer",
    heroTitle: "Every Step.\nEvery Detail.\nCovered.",
    heroSub: "From market research to keys in hand — Asaheeb handles every layer of your Saudi real estate investment.",
    servicesTitle: "Our Services",
    services: [
      {
        id: "sourcing",
        icon: "◈",
        title: "Asset Sourcing",
        subtitle: "Finding the Right Property",
        body: "We don't list every property on the market — we curate. Our advisors scour off-market deals, developer pipelines, and distressed assets to surface opportunities that match your investment thesis.",
        points: ["Off-market deal access", "Developer pre-launch pricing", "Vision 2030 corridor focus", "Multi-city coverage (Riyadh, Jeddah, NEOM)"],
        accent: "#B8873B",
      },
      {
        id: "due-diligence",
        icon: "◉",
        title: "Due Diligence",
        subtitle: "Institutional-Grade Verification",
        body: "Every asset goes through our 40-point verification process — title deed, zoning, encumbrances, developer credentials, market comparables, and projected yield modelling.",
        points: ["Full title deed verification", "Zoning & planning checks", "Developer track record review", "Independent yield modelling"],
        accent: "#7FA8B3",
      },
      {
        id: "legal",
        icon: "◈",
        title: "Legal Support",
        subtitle: "100% Title Security",
        body: "We partner with RERA-registered legal teams to handle every document — from Offer to Purchase to final title transfer — in Arabic and English. Full transparency, no surprises.",
        points: ["Bilingual contract preparation", "RERA compliance assurance", "Title transfer management", "Dispute resolution support"],
        accent: "#B8873B",
      },
      {
        id: "advisory",
        icon: "◉",
        title: "Investment Advisory",
        subtitle: "Strategy Before Signature",
        body: "Before you invest, we help you build a strategy — asset class selection, entry timing, diversification across Vision 2030 corridors, and exit planning. Knowledge first.",
        points: ["Portfolio strategy design", "Corridor timing analysis", "Diversification advisory", "Long-term exit planning"],
        accent: "#7FA8B3",
      },
    ],
    processTitle: "How It Works",
    process: [
      { step: "01", title: "Initial Consultation", body: "Tell us your goals, budget, and timeline. We'll align immediately on the right strategy." },
      { step: "02", title: "Asset Curation", body: "We present 2–5 vetted opportunities matched to your investment thesis. No noise, no spam." },
      { step: "03", title: "Due Diligence", body: "Our team runs the full 40-point check on your shortlisted properties." },
      { step: "04", title: "Legal & Close", body: "We coordinate the legal team, draft agreements, and hand over keys — in Arabic and English." },
    ],
    whyTitle: "Why Asaheeb?",
    why: [
      { title: "No Marketplace Noise", body: "We only present properties we'd invest in ourselves." },
      { title: "Bilingual Advisory", body: "Full support in Arabic and English at every stage." },
      { title: "No Hidden Fees", body: "Transparent fee structure. You know exactly what you're paying." },
      { title: "Riyadh-Based Team", body: "On-ground access, Saudi regulatory knowledge, local relationships." },
    ],
    ctaBtn: "Book a Free Consultation",
  },
  ar: {
    badge: "ما نقدمه",
    heroTitle: "كل خطوة.\nكل تفصيل.\nتحت السيطرة.",
    heroSub: "من أبحاث السوق إلى تسليم المفاتيح — تتولى أصاهيب كل مرحلة من مراحل استثمارك العقاري في المملكة.",
    servicesTitle: "خدماتنا",
    services: [
      {
        id: "sourcing",
        icon: "◈",
        title: "البحث عن الأصول",
        subtitle: "العثور على العقار المناسب",
        body: "لا ندرج كل عقار في السوق — بل ننتقي. يمشط مستشارونا الصفقات خارج السوق وخطوط أنابيب المطورين والأصول المتعثرة للكشف عن الفرص التي تتوافق مع رؤيتك الاستثمارية.",
        points: ["الوصول إلى الصفقات خارج السوق", "تسعير ما قبل الإطلاق للمطورين", "التركيز على محاور رؤية 2030", "تغطية متعددة المدن (الرياض، جدة، نيوم)"],
        accent: "#B8873B",
      },
      {
        id: "due-diligence",
        icon: "◉",
        title: "العناية الواجبة",
        subtitle: "التحقق على المستوى المؤسسي",
        body: "يمر كل أصل عبر عملية التحقق المكونة من 40 نقطة — صك الملكية، التقسيم، الأعباء، بيانات اعتماد المطور، المقارنات السوقية، ونمذجة العائد المتوقع.",
        points: ["التحقق الكامل من صك الملكية", "فحوصات التقسيم والتخطيط", "مراجعة سجل المطور", "نمذجة العائد المستقلة"],
        accent: "#7FA8B3",
      },
      {
        id: "legal",
        icon: "◈",
        title: "الدعم القانوني",
        subtitle: "أمان ملكية 100%",
        body: "نتشارك مع فرق قانونية مسجلة لدى هيئة العقار لمعالجة كل وثيقة — من عرض الشراء إلى نقل الملكية النهائي — بالعربية والإنجليزية. شفافية كاملة، لا مفاجآت.",
        points: ["إعداد العقود بلغتين", "ضمان الامتثال لهيئة العقار", "إدارة نقل الملكية", "دعم حل النزاعات"],
        accent: "#B8873B",
      },
      {
        id: "advisory",
        icon: "◉",
        title: "الاستشارة الاستثمارية",
        subtitle: "الاستراتيجية قبل التوقيع",
        body: "قبل الاستثمار، نساعدك على بناء استراتيجية — اختيار فئة الأصول، توقيت الدخول، التنويع عبر محاور رؤية 2030، وتخطيط الخروج. المعرفة أولاً.",
        points: ["تصميم استراتيجية المحفظة", "تحليل توقيت الممرات", "استشارات التنويع", "تخطيط الخروج طويل الأمد"],
        accent: "#7FA8B3",
      },
    ],
    processTitle: "كيف نعمل",
    process: [
      { step: "01", title: "الاستشارة الأولية", body: "أخبرنا بأهدافك وميزانيتك وجدولك الزمني. سنتوافق فوراً على الاستراتيجية الصحيحة." },
      { step: "02", title: "انتقاء الأصول", body: "نقدم لك 2-5 فرص مدققة تتوافق مع رؤيتك الاستثمارية. لا ضوضاء، لا بريد مزعج." },
      { step: "03", title: "العناية الواجبة", body: "يجري فريقنا الفحص الكامل المكون من 40 نقطة على عقاراتك المختارة." },
      { step: "04", title: "الإغلاق القانوني", body: "ننسق مع الفريق القانوني ونصيغ الاتفاقيات ونسلم المفاتيح — بالعربية والإنجليزية." },
    ],
    whyTitle: "لماذا أصاهيب؟",
    why: [
      { title: "بلا ضوضاء السوق", body: "نقدم فقط العقارات التي سنستثمر فيها بأنفسنا." },
      { title: "استشارة بلغتين", body: "دعم كامل بالعربية والإنجليزية في كل مرحلة." },
      { title: "بلا رسوم خفية", body: "هيكل رسوم شفاف. تعرف بالضبط ما تدفعه." },
      { title: "فريق مقيم في الرياض", body: "وصول ميداني، معرفة بالتنظيم السعودي، علاقات محلية." },
    ],
    ctaBtn: "احجز استشارة مجانية",
  },
};

// ─── Service Card Component ───────────────────────────────────────────────────
function ServiceCard({ svc, isAr, isActive, onClick }: {
  svc: typeof CONTENT.en.services[0];
  isAr: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isActive) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / rect.height) * 8;
    const ry = (x / rect.width) * 8;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      className="service-card cursor-pointer border p-6 transition-all duration-300 rounded-sm"
      style={{
        borderColor: isActive ? svc.accent : "rgba(184,135,59,0.18)",
        backgroundColor: isActive ? "rgba(184,135,59,0.08)" : "rgba(18,19,15,0.6)",
        boxShadow: isActive ? `0 0 30px ${svc.accent}25` : "none",
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex items-start gap-4 ${isAr ? "flex-row-reverse text-right" : ""}`}>
        <div className="text-2xl flex-shrink-0" style={{ color: svc.accent }}>{svc.icon}</div>
        <div className="flex-1">
          <h3 className="font-display text-xl text-[#E8DFCE] mb-1">{svc.title}</h3>
          <p className="font-mono text-[9px] tracking-[0.22em] uppercase mb-3" style={{ color: svc.accent }}>{svc.subtitle}</p>
          <p className="font-sans text-sm text-[#8C8477] leading-relaxed">{svc.body}</p>
          {isActive && (
            <ul className="mt-4 space-y-2 pt-3 border-t border-white/5">
              {svc.points.map((p, i) => (
                <li key={i} className={`flex items-center gap-2 text-xs sm:text-sm text-[#E8DFCE]/90 font-sans ${isAr ? "flex-row-reverse" : ""}`}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: svc.accent }} />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Process Step Component ───────────────────────────────────────────────────
function ProcessStep({ step, title, body, isAr, isLast }: {
  step: string; title: string; body: string; isAr: boolean; isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const el = ref.current;
    gsap.set(el, { opacity: 0, y: 30 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }),
    });
    return () => trigger.kill();
  }, []);

  return (
    <div ref={ref} className={`relative flex gap-5 sm:gap-6 ${isAr ? "flex-row-reverse text-right" : ""}`}>
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-mono text-xs sm:text-sm font-bold"
          style={{ borderColor: "#B8873B", color: "#B8873B", backgroundColor: "#12130F", boxShadow: "0 0 20px rgba(184,135,59,0.3)" }}
        >
          {step}
        </div>
        {!isLast && <div className="flex-1 w-px bg-gradient-to-b from-[#B8873B]/50 to-transparent mt-2 min-h-[40px]" />}
      </div>
      <div className="flex-1 pb-8">
        <h3 className="font-display text-lg sm:text-xl text-[#E8DFCE] mb-2">{title}</h3>
        <p className="font-sans text-xs sm:text-sm text-[#8C8477] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ─── Main Services Page ────────────────────────────────────────────────────────
export default function ServicesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;
  const [activeService, setActiveService] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Safe GSAP checks on refs
      if (heroRef.current) {
        const heroLines = heroRef.current.querySelectorAll(".hero-line");
        if (heroLines.length > 0) {
          gsap.set(heroLines, { opacity: 0, y: 35 });
          gsap.to(heroLines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" });
        }
      }

      if (gridRef.current) {
        const svcCards = gridRef.current.querySelectorAll(".service-card");
        if (svcCards.length > 0) {
          gsap.set(svcCards, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: gridRef.current,
            start: "top 80%",
            onEnter: () => gsap.to(svcCards, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }),
          });
        }
      }

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

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-36 pb-16 px-6 sm:px-10 lg:px-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full opacity-[0.04]" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <polygon points="600,50 1150,750 50,750" fill="none" stroke="#B8873B" strokeWidth="1"/>
            <polygon points="600,150 1050,700 150,700" fill="none" stroke="#B8873B" strokeWidth="0.5"/>
            <polygon points="600,250 950,650 250,650" fill="none" stroke="#B8873B" strokeWidth="0.3"/>
            <circle cx="600" cy="400" r="300" fill="none" stroke="#7FA8B3" strokeWidth="0.5" strokeDasharray="8 12"/>
          </svg>
        </div>

        <div ref={heroRef} className={`relative z-10 max-w-4xl mx-auto ${isAr ? "text-right" : "text-center"}`}>
          <div className="hero-line inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full"
            style={{ borderColor: "rgba(184,135,59,0.4)", backgroundColor: "rgba(18,19,15,0.85)" }}>
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
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <p className={`font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] mb-10 ${isAr ? "text-right" : ""}`}>
            {c.servicesTitle}
          </p>
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.services.map((svc, i) => (
              <ServiceCard
                key={svc.id}
                svc={svc}
                isAr={isAr}
                isActive={activeService === i}
                onClick={() => setActiveService(activeService === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS SECTION ───────────────────────────────────────────────── */}
      <section
        className="py-20 px-6 sm:px-10 lg:px-20"
        style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.04) 0%, rgba(18,19,15,1) 60%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <p className={`font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] mb-12 ${isAr ? "text-right" : ""}`}>
            {c.processTitle}
          </p>
          <div className="space-y-0">
            {c.process.map((p, i) => (
              <ProcessStep
                key={p.step}
                step={p.step}
                title={p.title}
                body={p.body}
                isAr={isAr}
                isLast={i === c.process.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ASAHEEB ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <p className={`font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] mb-10 ${isAr ? "text-right" : ""}`}>
            {c.whyTitle}
          </p>
          <div ref={whyRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {c.why.map((w, i) => (
              <div
                key={i}
                className="why-card p-6 border border-[#B8873B]/15 hover:border-[#B8873B]/35 transition-all duration-300"
                style={{ backgroundColor: "rgba(18,19,15,0.4)" }}
              >
                <div className={`flex items-center gap-3 mb-3 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                  <div className="w-6 h-6 rounded-full border border-[#B8873B]/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#B8873B]" />
                  </div>
                  <h3 className="font-display text-lg text-[#E8DFCE]">{w.title}</h3>
                </div>
                <p className={`font-sans text-sm text-[#8C8477] leading-relaxed ${isAr ? "text-right" : ""}`}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase px-10 py-4.5 border border-[#B8873B] text-[#E8DFCE] hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 font-semibold shadow-[0_0_30px_rgba(184,135,59,0.15)]"
          >
            {c.ctaBtn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={isAr ? "rotate-180" : ""}>
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
