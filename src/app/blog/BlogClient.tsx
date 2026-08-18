"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
import { PostMetadata } from "@/types/database";
import { subscribeNewsletter } from "@/lib/api";

const CATEGORIES = [
  { key: "all", en: "All Topics", ar: "جميع المواضيع" },
  { key: "market", en: "Market Insights", ar: "رؤى السوق" },
  { key: "guide", en: "Investment Guides", ar: "أدلة الاستثمار" },
  { key: "legal", en: "Legal", ar: "قانوني" },
  { key: "lifestyle", en: "Lifestyle", ar: "أسلوب الحياة" },
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
  post: PostMetadata;
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
              <span className="font-mono text-[9px] text-[#C5BCAD]">{isAr ? post.dateAr : post.date}</span>
              <span className="font-mono text-[9px] text-[#C5BCAD]/80">• {isAr ? post.readTimeAr : post.readTime}</span>
            </div>

            <h3 className="font-display text-xl text-[#E8DFCE] mb-3 leading-snug tracking-tight group-hover:text-[#B8873B] transition-colors duration-300">
              {isAr ? post.titleAr : post.titleEn}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] leading-relaxed mb-6">
              {isAr ? post.excerptAr : post.excerptEn}
            </p>
          </div>

          <div className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-300 pt-3 border-t border-white/10 ${isAr ? "flex-row-reverse" : ""}`} style={{ color: post.accent }}>
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

// ─── Main Interactive Blog Client Component ─────────────────────────────────
export default function BlogClient({
  initialPosts = [],
  initialFeatured = null,
}: {
  initialPosts: PostMetadata[];
  initialFeatured: PostMetadata | null;
}) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const c = isAr ? CONTENT.ar : CONTENT.en;
  const [postsList] = useState<PostMetadata[]>(initialPosts);
  const [featuredPost] = useState<PostMetadata | null>(initialFeatured || (initialPosts.length > 0 ? initialPosts[0] : null));
  const [activeCategory, setActiveCategory] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || isSubmittingNewsletter) return;
    setIsSubmittingNewsletter(true);
    setNewsletterMsg(null);
    try {
      const res = await subscribeNewsletter({
        email: newsletterEmail,
        source: "BLOG_PAGE",
      });
      setNewsletterSent(true);
      if (res.alreadySubscribed) {
        setNewsletterMsg(isAr ? "أنت مشترك بالفعل في نشرتنا البريدية! شكراً لك." : "You are already subscribed to our briefing! Thank you.");
      } else {
        setNewsletterMsg(isAr ? "تم الاشتراك بنجاح! شكراً لاهتمامكم." : "Thank you! You have been subscribed successfully.");
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setNewsletterMsg(isAr ? "حدث خطأ أثناء الاشتراك. يرجى المحاولة لاحقاً." : "An error occurred. Please try again.");
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const nonFeatured = featuredPost ? postsList.filter((p) => p.id !== featuredPost.id) : postsList;
  const filtered = activeCategory === "all"
    ? nonFeatured
    : nonFeatured.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

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
        gsap.set(featuredRef.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: featuredRef.current,
          start: "top 80%",
          onEnter: () => gsap.to(featuredRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }),
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".blog-card");
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 30 });
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" });
      }
    }
  }, [activeCategory]);

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

          <p className="hero-el font-sans text-base sm:text-lg text-[#C5BCAD] leading-relaxed max-w-xl">{c.heroSub}</p>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ──────────────────────────────────────────────── */}
      {featuredPost && (
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
                    <span className="font-mono text-[9px] text-[#C5BCAD]">{isAr ? featuredPost.dateAr : featuredPost.date}</span>
                    <span className="font-mono text-[9px] text-[#C5BCAD]">• {isAr ? featuredPost.readTimeAr : featuredPost.readTime}</span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE] mb-4 leading-snug max-w-3xl group-hover:text-[#B8873B] transition-colors duration-300">
                    {isAr ? featuredPost.titleAr : featuredPost.titleEn}
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[#C5BCAD] leading-relaxed max-w-2xl mb-8">
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
      )}

      {/* ── FILTER TABS ───────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-10 lg:px-20 py-6">
        <div className={`max-w-5xl mx-auto ${isAr ? "text-right" : ""}`}>
          <p className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#C5BCAD] mb-4">{c.filterLabel}</p>
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
                    color: isActive ? "#B8873B" : "#D4C7B5",
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
      <section className="py-8 px-6 sm:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {filtered.length > 0 ? (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} isAr={isAr} readMore={c.readMore} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-[#8C8477]">
              <p className="font-mono text-sm uppercase tracking-widest">
                {isAr ? "لا توجد مقالات في هذا الموضوع حالياً" : "No articles found in this category"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER BRIEFING SECTION ───────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-10 lg:px-20 border-t border-white/10 bg-[#0F1117]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#B8873B] mb-3 block">
            {isAr ? "النشرة الإخبارية الدورية" : "MONTHLY BRIEFING"}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#E8DFCE] font-normal mb-4">
            {c.newsletterTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#C5BCAD] mb-8 max-w-xl mx-auto">
            {c.newsletterSub}
          </p>

          {newsletterSent ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 border border-[#B8873B]/50 bg-[#B8873B]/10 font-mono text-sm text-[#B8873B]">
              <span>✓</span>
              <span>{newsletterMsg || (isAr ? "تم الاشتراك بنجاح! شكراً لك." : "Thank you! You have been subscribed.")}</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={c.newsletterPlaceholder}
                disabled={isSubmittingNewsletter}
                className="flex-1 px-4 py-3.5 bg-[#12130F] border border-white/15 text-[#E8DFCE] font-sans text-sm placeholder-[#C5BCAD]/40 focus:outline-none focus:border-[#B8873B] transition-colors disabled:opacity-50"
                dir={isAr ? "rtl" : "ltr"}
              />
              <button
                type="submit"
                disabled={isSubmittingNewsletter}
                className="px-6 py-3.5 bg-[#B8873B] text-[#12130F] font-mono text-xs tracking-widest uppercase font-semibold hover:bg-[#c99a49] transition-all shadow-[0_0_20px_rgba(184,135,59,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmittingNewsletter ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-[#12130F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>{isAr ? "جاري..." : "Submitting..."}</span>
                  </>
                ) : (
                  <span>{c.newsletterBtn}</span>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}
