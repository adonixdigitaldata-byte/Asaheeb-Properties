"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

// ─── Blog posts ────────────────────────────────────────────────────────────────
const POSTS = [
  {
    id: "vision-2030-real-estate",
    category: "market",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    titleEn: "Vision 2030 & Real Estate: Where the Capital is Flowing in 2025",
    titleAr: "رؤية 2030 والعقارات: أين يتدفق رأس المال في 2025",
    excerptEn: "As Saudi Arabia's transformation accelerates, we break down the top investment corridors and which asset classes are outperforming the market.",
    excerptAr: "مع تسارع التحول في المملكة العربية السعودية، نستعرض أبرز ممرات الاستثمار وفئات الأصول التي تتفوق على السوق.",
    date: "July 2025",
    dateAr: "يوليو 2025",
    readTime: "6 min read",
    readTimeAr: "6 دقائق قراءة",
    accent: "#B8873B",
    featured: true,
  },
  {
    id: "neom-investment-guide",
    category: "guide",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    titleEn: "NEOM 2025: A Complete Investor's Guide to the World's Most Ambitious Project",
    titleAr: "نيوم 2025: الدليل الكامل للمستثمر في أكثر مشاريع العالم طموحاً",
    excerptEn: "NEOM is no longer a concept — it's under construction. We explain what investors need to know before the pricing reflects the hype.",
    excerptAr: "نيوم لم تعد مجرد فكرة — بل تحت الإنشاء. نشرح ما يحتاج المستثمرون معرفته قبل أن تعكس الأسعار المبالغة.",
    date: "June 2025",
    dateAr: "يونيو 2025",
    readTime: "10 min read",
    readTimeAr: "10 دقائق قراءة",
    accent: "#7FA8B3",
    featured: false,
  },
  {
    id: "riyadh-rental-yields",
    category: "market",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    titleEn: "Riyadh Rental Yields 2025: Where Are the 10%+ Returns Hiding?",
    titleAr: "عوائد الإيجار في الرياض 2025: أين تختبئ العوائد التي تتجاوز 10%؟",
    excerptEn: "North Riyadh is the headline, but savvy investors are finding 10%+ yields in districts most brokers are overlooking.",
    excerptAr: "شمال الرياض هو العنوان الرئيسي، لكن المستثمرين الأذكياء يجدون عوائد تتجاوز 10% في أحياء يتجاهلها معظم الوسطاء.",
    date: "May 2025",
    dateAr: "مايو 2025",
    readTime: "8 min read",
    readTimeAr: "8 دقائق قراءة",
    accent: "#B8873B",
    featured: false,
  },
  {
    id: "legal-guide-foreigners",
    category: "legal",
    categoryEn: "Legal",
    categoryAr: "قانوني",
    titleEn: "Buying Property in Saudi Arabia as a Foreigner: 2025 Legal Guide",
    titleAr: "شراء عقار في المملكة العربية السعودية كأجنبي: دليل قانوني 2025",
    excerptEn: "Can foreigners own real estate in Saudi Arabia? Yes — with conditions. Here is what you need to know before signing anything.",
    excerptAr: "هل يمكن للأجانب امتلاك عقارات في المملكة؟ نعم — مع شروط. إليك ما تحتاج معرفته قبل التوقيع على أي شيء.",
    date: "April 2025",
    dateAr: "أبريل 2025",
    readTime: "12 min read",
    readTimeAr: "12 دقيقة قراءة",
    accent: "#7FA8B3",
    featured: false,
  },
  {
    id: "villa-vs-apartment",
    category: "guide",
    categoryEn: "Investment Guide",
    categoryAr: "دليل الاستثمار",
    titleEn: "Villa vs. Apartment: Which Saudi Asset Class Wins in 2025?",
    titleAr: "فيلا أم شقة: أي فئة أصول سعودية تنتصر في 2025؟",
    excerptEn: "Capital growth vs. rental yield — we run the numbers on Saudi Arabia's two most popular residential asset classes.",
    excerptAr: "نمو رأس المال مقابل العائد الإيجاري — نستعرض الأرقام لفئتي الأصول السكنية الأكثر شعبية في المملكة.",
    date: "March 2025",
    dateAr: "مارس 2025",
    readTime: "7 min read",
    readTimeAr: "7 دقائق قراءة",
    accent: "#B8873B",
    featured: false,
  },
  {
    id: "commercial-land-timing",
    category: "market",
    categoryEn: "Market Insights",
    categoryAr: "رؤى السوق",
    titleEn: "Commercial Land Banking: Why Timing Still Matters in 2025",
    titleAr: "تخزين الأراضي التجارية: لماذا لا يزال التوقيت مهماً في 2025",
    excerptEn: "The window for below-market commercial land in Vision 2030 corridors is closing. Here's the data behind the urgency.",
    excerptAr: "نافذة شراء الأراضي التجارية بأسعار أقل من السوق في ممرات رؤية 2030 آخذة في الإغلاق. إليك البيانات وراء الإلحاح.",
    date: "February 2025",
    dateAr: "فبراير 2025",
    readTime: "9 min read",
    readTimeAr: "9 دقائق قراءة",
    accent: "#7FA8B3",
    featured: false,
  },
];

const CATEGORIES = [
  { key: "all", en: "All Topics", ar: "جميع المواضيع" },
  { key: "market", en: "Market Insights", ar: "رؤى السوق" },
  { key: "guide", en: "Investment Guides", ar: "أدلة الاستثمار" },
  { key: "legal", en: "Legal", ar: "قانوني" },
];

const CONTENT = {
  en: {
    badge: "Insights & Research",
    heroTitle: "Think Before You Invest.",
    heroSub: "The Asaheeb blog covers Saudi real estate market intelligence, legal guides, Vision 2030 updates, and investment strategy — in Arabic and English.",
    filterLabel: "Browse by Topic",
    readMore: "Read Article",
    featuredLabel: "Featured Article",
    newsletterTitle: "Stay Ahead of the Market",
    newsletterSub: "Get Asaheeb's monthly market intelligence briefing — Vision 2030 updates, yield data, and investment alerts.",
    newsletterPlaceholder: "Your email address",
    newsletterBtn: "Subscribe",
  },
  ar: {
    badge: "رؤى وأبحاث",
    heroTitle: "فكّر قبل أن تستثمر.",
    heroSub: "تغطي مدونة أصاهيب ذكاء سوق العقارات السعودية والأدلة القانونية وتحديثات رؤية 2030 واستراتيجية الاستثمار — بالعربية والإنجليزية.",
    filterLabel: "تصفح حسب الموضوع",
    readMore: "اقرأ المقالة",
    featuredLabel: "المقالة المميزة",
    newsletterTitle: "ابقَ متقدماً على السوق",
    newsletterSub: "احصل على ملخص ذكاء السوق الشهري من أصاهيب — تحديثات رؤية 2030 وبيانات العائد وتنبيهات الاستثمار.",
    newsletterPlaceholder: "بريدك الإلكتروني",
    newsletterBtn: "اشترك",
  },
};

// ─── Post Card ─────────────────────────────────────────────────────────────────
function PostCard({ post, isAr, readMore }: {
  post: typeof POSTS[0];
  isAr: boolean;
  readMore: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
  };

  return (
    <Link
      href={`/blog/${post.id}`}
      className="block text-left group cursor-pointer"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div
        ref={cardRef}
        className="blog-card border border-[rgba(184,135,59,0.15)] hover:border-[rgba(184,135,59,0.45)] transition-all duration-300 rounded-sm h-full flex flex-col justify-between"
        style={{
          background: `linear-gradient(135deg, rgba(18,19,15,0.9) 0%, rgba(12,13,10,1) 100%)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: post.accent }} />

        <div className={`p-6 flex-1 flex flex-col justify-between ${isAr ? "text-right" : ""}`}>
          <div>
            <div className={`flex items-center gap-2.5 mb-3 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
              <span
                className="font-mono text-[9px] tracking-[0.22em] uppercase px-2.5 py-0.5 font-medium"
                style={{ color: post.accent, border: `1px solid ${post.accent}30`, backgroundColor: `${post.accent}10` }}
              >
                {isAr ? post.categoryAr : post.categoryEn}
              </span>
              <span className="font-mono text-[9px] text-[#8C8477]">{isAr ? post.dateAr : post.date}</span>
              <span className="font-mono text-[9px] text-[#8C8477]/50">• {isAr ? post.readTimeAr : post.readTime}</span>
            </div>

            <h3 className="font-display text-xl text-[#E8DFCE] mb-3 leading-snug tracking-tight group-hover:text-[#B8873B] transition-colors duration-300">
              {isAr ? post.titleAr : post.titleEn}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#8C8477] leading-relaxed mb-6">
              {isAr ? post.excerptAr : post.excerptEn}
            </p>
          </div>

          <div className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300 pt-3 border-t border-white/5 ${isAr ? "flex-row-reverse" : ""}`} style={{ color: post.accent }}>
            <span>{readMore}</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-300 group-hover:${isAr ? "-translate-x-1" : "translate-x-1"}`}>
              <path d={isAr ? "M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5" : "M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Blog Component ───────────────────────────────────────────────────────
export default function BlogPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;
  const [activeCategory, setActiveCategory] = useState("all");

  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const nonFeatured = POSTS.filter((p) => !p.featured);
  const filtered = activeCategory === "all"
    ? nonFeatured
    : nonFeatured.filter((p) => p.category === activeCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const heroEls = heroRef.current.querySelectorAll(".hero-el");
        if (heroEls.length > 0) {
          gsap.set(heroEls, { opacity: 0, y: 30 });
          gsap.to(heroEls, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" });
        }
      }

      if (featuredRef.current) {
        gsap.set(featuredRef.current, { opacity: 0, y: 35 });
        ScrollTrigger.create({
          trigger: featuredRef.current,
          start: "top 80%",
          onEnter: () => gsap.to(featuredRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }),
        });
      }
    });
    return () => ctx.revert();
  }, [isAr]);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".blog-card");
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 30 });
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" });
      }
    }
  }, [activeCategory]);

  const featuredPost = POSTS.find((p) => p.featured)!;

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden pt-28 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-20">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, #B8873B 60px, #B8873B 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #B8873B 60px, #B8873B 61px)",
          }}
        />

        <div ref={heroRef} className={`relative z-10 max-w-5xl ${isAr ? "mr-auto text-right" : ""}`}>
          <div className="hero-el inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full"
            style={{ borderColor: "rgba(184,135,59,0.4)", backgroundColor: "rgba(18,19,15,0.85)" }}>
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-ping" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#B8873B] font-semibold">{c.badge}</span>
          </div>

          <h1 className="hero-el font-display text-4xl sm:text-6xl lg:text-7xl text-[#E8DFCE] font-normal leading-[1.08] tracking-[-0.025em] mb-6">
            {c.heroTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="italic text-[#B8873B]">{c.heroTitle.split(" ").at(-1)}</span>
          </h1>

          <p className="hero-el font-sans text-base sm:text-lg text-[#8C8477] leading-relaxed max-w-xl">{c.heroSub}</p>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ──────────────────────────────────────────────── */}
      <section className="py-10 px-6 sm:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <p className={`font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] mb-5 ${isAr ? "text-right" : ""}`}>
            {c.featuredLabel}
          </p>

          <Link href={`/blog/${featuredPost.id}`} className="block group">
            <div
              ref={featuredRef}
              className="relative overflow-hidden border border-[#B8873B]/30 group-hover:border-[#B8873B]/70 transition-all duration-500 cursor-pointer"
              style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.08) 0%, rgba(18,19,15,0.95) 60%)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #B8873B, transparent)" }} />

              <div className={`p-8 sm:p-12 ${isAr ? "text-right" : ""}`}>
                <div className={`flex items-center gap-3 mb-5 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-3 py-1 font-medium" style={{ color: "#B8873B", border: "1px solid rgba(184,135,59,0.3)", backgroundColor: "rgba(184,135,59,0.1)" }}>
                    {isAr ? featuredPost.categoryAr : featuredPost.categoryEn}
                  </span>
                  <span className="font-mono text-[9px] text-[#8C8477]">{isAr ? featuredPost.dateAr : featuredPost.date}</span>
                  <span className="font-mono text-[9px] text-[#8C8477]">• {isAr ? featuredPost.readTimeAr : featuredPost.readTime}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE] mb-4 leading-snug max-w-3xl group-hover:text-[#B8873B] transition-colors duration-300">
                  {isAr ? featuredPost.titleAr : featuredPost.titleEn}
                </h2>

                <p className="font-sans text-sm sm:text-base text-[#8C8477] leading-relaxed max-w-2xl mb-8">
                  {isAr ? featuredPost.excerptAr : featuredPost.excerptEn}
                </p>

                <div className={`inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#B8873B] font-semibold ${isAr ? "flex-row-reverse" : ""}`}>
                  <span>{c.readMore}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-300 group-hover:${isAr ? "-translate-x-1" : "translate-x-1"}`}>
                    <path d={isAr ? "M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5" : "M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-20 py-6">
        <div className={`max-w-5xl mx-auto ${isAr ? "text-right" : ""}`}>
          <p className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#8C8477] mb-4">{c.filterLabel}</p>
          <div className={`flex flex-wrap gap-2 ${isAr ? "justify-end" : ""}`}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="px-5 py-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer font-medium"
                  style={{
                    borderBottom: isActive ? "2px solid #B8873B" : "2px solid transparent",
                    color: isActive ? "#B8873B" : "#8C8477",
                    backgroundColor: isActive ? "rgba(184,135,59,0.08)" : "transparent",
                  }}
                >
                  {isAr ? cat.ar : cat.en}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ARTICLES GRID ─────────────────────────────────────────────────── */}
      <section className="pb-24 px-6 sm:px-10 lg:px-20">
        <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} isAr={isAr} readMore={c.readMore} />
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER STRIP ──────────────────────────────────────────────── */}
      <section
        className="py-20 px-6 sm:px-10"
        style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.06) 0%, rgba(18,19,15,1) 100%)" }}
      >
        <div className={`max-w-2xl mx-auto ${isAr ? "text-right" : "text-center"}`}>
          <h2 className="font-display text-3xl sm:text-4xl text-[#E8DFCE] mb-4">{c.newsletterTitle}</h2>
          <p className="font-sans text-sm sm:text-base text-[#8C8477] mb-8 leading-relaxed">{c.newsletterSub}</p>
          <form className={`flex gap-3 flex-col sm:flex-row ${isAr ? "sm:flex-row-reverse" : ""}`} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={c.newsletterPlaceholder}
              className="flex-1 px-4 py-3.5 font-sans text-sm bg-transparent border border-[#B8873B]/30 text-[#E8DFCE] placeholder-[#8C8477] focus:outline-none focus:border-[#B8873B] transition-colors duration-300"
              dir={isAr ? "rtl" : "ltr"}
            />
            <button
              type="submit"
              className="px-8 py-3.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-[#B8873B] text-[#12130F] bg-[#B8873B] hover:bg-transparent hover:text-[#B8873B] transition-all duration-300 flex-shrink-0 font-semibold"
            >
              {c.newsletterBtn}
            </button>
          </form>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
