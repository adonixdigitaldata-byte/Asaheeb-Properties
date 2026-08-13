"use client";

import { use } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { getWhatsAppLink } from "@/data/contactConfig";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

// ─── Complete Detailed Blog Posts Data ────────────────────────────────────────
import { BLOG_POSTS } from "@/data/blogData";
import { useState } from "react";
import ShareModal from "@/components/shared/ShareModal";

function BlogDetailContent({ id }: { id: string }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [showShareModal, setShowShareModal] = useState(false);

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
          {/* Breadcrumb & Share */}
          <div className={`flex items-center justify-between gap-4 mb-6 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8477] flex-wrap ${isAr ? "flex-row-reverse text-right" : ""}`}>
              <Link href="/" className="hover:text-[#B8873B] transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#B8873B] transition-colors">{isAr ? "المدونة" : "Blog"}</Link>
              <span>/</span>
              <span className="text-[#E8DFCE]">{isAr ? post.categoryAr : post.categoryEn}</span>
            </div>

            <button
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[#B8873B] border border-[#B8873B]/40 bg-[#B8873B]/10 px-3.5 py-1.5 hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 rounded-sm cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{isAr ? "مشاركة المقال" : "Share Article"}</span>
            </button>
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
                href={getWhatsAppLink(undefined, undefined, isAr)}
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
                <path d="M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{isAr ? "العودة للجميع المقالات" : "Back to All Articles"}</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={isAr ? post.titleAr : post.titleEn}
        text={isAr ? `مقال من مدونة أصاهيب العقارية: ${post.titleAr}` : `Article from Asaheeb Real Estate Blog: ${post.titleEn}`}
        url={typeof window !== "undefined" ? window.location.href : `https://www.asaheebrealestate.com/blog/${post.id}`}
        isAr={isAr}
        type="article"
      />

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
