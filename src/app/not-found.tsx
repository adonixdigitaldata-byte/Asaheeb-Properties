"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";

function NotFoundContent() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <main className="relative bg-[#12130F] min-h-screen flex flex-col justify-between" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* Hero / Error Content */}
      <section className="relative pt-36 pb-24 px-6 sm:px-10 lg:px-20 flex-1 flex items-center justify-center overflow-hidden">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 60px, #B8873B 60px, #B8873B 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #B8873B 60px, #B8873B 61px)",
          }}
        />

        <div className={`relative z-10 max-w-3xl mx-auto text-center ${isAr ? "text-right" : ""}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border rounded-full border-[#B8873B]/40 bg-[#12130F]/90">
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#B8873B] font-semibold">
              {isAr ? "خطأ 404 — الصفحة غير موجودة" : "Error 404 — Location Not Found"}
            </span>
          </div>

          {/* 404 Large Display */}
          <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl text-[#E8DFCE] font-normal tracking-[-0.04em] leading-none mb-6">
            40<span className="italic text-[#B8873B]">4</span>
          </h1>

          <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE] font-normal tracking-tight mb-4">
            {isAr ? "العقار أو الصفحة التي تبحث عنها غير موجودة" : "The requested property or page could not be located"}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#C5BCAD] leading-relaxed max-w-lg mx-auto mb-10">
            {isAr
              ? "قد تكون الصفحة قد تم نقلها أو تغيير عنوانها. يمكنك العودة إلى الصفحة الرئيسية أو استكشاف مشاريعنا وأبحاث السوق المتاحة."
              : "The page you are trying to access may have been moved, renamed, or is temporarily unavailable. Return home or browse our curated investment portfolio."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 font-mono text-[11px] tracking-[0.2em] uppercase border border-[#B8873B] bg-[#B8873B] text-[#12130F] font-semibold hover:bg-transparent hover:text-[#B8873B] transition-all duration-300 shadow-[0_0_20px_rgba(184,135,59,0.2)]"
            >
              {isAr ? "العودة للرئيسية" : "Return to Homepage"}
            </Link>

            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-4 font-mono text-[11px] tracking-[0.2em] uppercase border border-white/20 text-[#E8DFCE] hover:border-[#B8873B] hover:text-[#B8873B] transition-all duration-300"
            >
              {isAr ? "استكشف المشاريع" : "Explore Projects"}
            </Link>

            <Link
              href="/blog"
              className="w-full sm:w-auto px-8 py-4 font-mono text-[11px] tracking-[0.2em] uppercase border border-white/20 text-[#E8DFCE] hover:border-[#B8873B] hover:text-[#B8873B] transition-all duration-300"
            >
              {isAr ? "رؤى السوق" : "Market Blog"}
            </Link>
          </div>
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}

export default function NotFound() {
  return (
    <LanguageProvider>
      <NotFoundContent />
    </LanguageProvider>
  );
}
