"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { POSTS } from "@/data/blogData";

export default function BlogCtaSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Take the latest 3 posts to showcase
  const featuredPosts = POSTS.slice(0, 3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Reveal header
      if (headRef.current) {
        gsap.fromTo(
          headRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Reveal blog cards
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".home-blog-card");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              delay: i * 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-blog-cta"
      className="relative w-full py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "#0C0D0A" }}
    >
      {/* Top border divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(184,135,59,0.25) 50%, transparent)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header */}
        <div ref={headRef} className={`mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 ${isAr ? "text-right flex-col-reverse md:flex-row-reverse" : ""}`}>
          <div>
            <div className={`flex items-center gap-3 mb-5 ${isAr ? "justify-end" : ""}`}>
              <div className="h-px w-10 bg-[#B8873B]/40" />
              <span className="font-mono text-[9px] tracking-[0.36em] uppercase text-[#B8873B]">
                {isAr ? "رؤى وأبحاث السوق" : "Market Intelligence"}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#E8DFCE] font-normal tracking-[-0.02em] leading-[1.1]">
              {isAr ? (
                <>
                  فكّر قبل أن <span className="italic text-[#B8873B]">تستثمر.</span>
                </>
              ) : (
                <>
                  Think Before You <span className="italic text-[#B8873B]">Invest.</span>
                </>
              )}
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#B8873B] border border-[#B8873B]/30 px-6 py-3 hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 self-start md:self-auto whitespace-nowrap"
          >
            {isAr ? "تصفح جميع المقالات" : "Explore All Articles"}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={isAr ? "rotate-180" : ""}>
              <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Blog Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="home-blog-card block group text-left cursor-pointer border border-[rgba(184,135,59,0.15)] hover:border-[rgba(184,135,59,0.45)] transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(18,19,15,0.9) 0%, rgba(12,13,10,1) 100%)",
              }}
              dir={isAr ? "rtl" : "ltr"}
            >
              {/* Highlight bar on card hover */}
              <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: post.accent }} />

              <div className={`p-8 flex flex-col justify-between h-full min-h-[280px] ${isAr ? "text-right" : ""}`}>
                <div>
                  <div className={`flex items-center gap-2.5 mb-4 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
                    <span
                      className="font-mono text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-0.5 font-medium"
                      style={{ color: post.accent, border: `1px solid ${post.accent}30`, backgroundColor: `${post.accent}10` }}
                    >
                      {isAr ? post.categoryAr : post.categoryEn}
                    </span>
                    <span className="font-mono text-[8.5px] text-[#8C8477]">{isAr ? post.dateAr : post.date}</span>
                  </div>

                  <h3 className="font-display text-xl text-[#E8DFCE] mb-4 leading-snug tracking-tight group-hover:text-[#B8873B] transition-colors duration-300">
                    {isAr ? post.titleAr : post.titleEn}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#8C8477] leading-relaxed mb-6 line-clamp-3">
                    {isAr ? post.excerptAr : post.excerptEn}
                  </p>
                </div>

                <div className={`inline-flex items-center gap-2 font-mono text-[9.5px] tracking-[0.18em] uppercase transition-all duration-300 pt-4 border-t border-white/5 ${isAr ? "flex-row-reverse" : ""}`} style={{ color: post.accent }}>
                  <span>{isAr ? "اقرأ المقال" : "Read Article"}</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-300 group-hover:${isAr ? "-translate-x-1" : "translate-x-1"}`}>
                    <path d={isAr ? "M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5" : "M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
