"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { getWhatsAppLink } from "@/data/contactConfig";

interface DigitalIdBookletProps {
  isAr: boolean;
}

const TOTAL_PAGES = 22;
const PDF_DOWNLOAD_URL = "https://res.cloudinary.com/diwqmlpr/image/upload/fl_attachment:Saudi_Digital_ID_Guide/v1791254389/step-by-step_guide.pdf";



function getPageImageUrl(pageNum: number, width: number = 1200): string {
  return `https://res.cloudinary.com/diwqmlpr/image/upload/w_${width},f_auto,q_auto,pg_${pageNum}/v1791254389/step-by-step_guide.jpg`;
}

export default function DigitalIdBooklet({ isAr }: DigitalIdBookletProps) {
  // Current page displayed (1-indexed)
  // On desktop, we display two pages at a time: leftPage & rightPage
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);

  // Determine left and right page in spread
  // Page 1 is Cover. On desktop:
  // If currentPage === 1 -> Cover view (Right page is Page 1, or single centered cover)
  // Else spread: leftPage = currentPage is even ? currentPage : currentPage - 1, rightPage = leftPage + 1
  const isCover = currentPage === 1;
  const leftPage = isCover ? null : currentPage % 2 === 0 ? currentPage : currentPage - 1;
  const rightPage = isCover ? 1 : leftPage ? (leftPage + 1 <= TOTAL_PAGES ? leftPage + 1 : null) : null;

  // Page navigation logic
  const handleNextPage = useCallback(() => {
    if (isFlipping) return;
    if (currentPage >= TOTAL_PAGES) return;

    setFlipDirection("next");
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentPage((prev) => {
        // Desktop dual page advance: if at cover (1), next is 2. Then +2 for dual spreads
        if (window.innerWidth >= 1024) {
          if (prev === 1) return 2;
          return Math.min(TOTAL_PAGES, prev + 2);
        }
        return Math.min(TOTAL_PAGES, prev + 1);
      });
      setIsFlipping(false);
    }, 280);
  }, [currentPage, isFlipping]);

  const handlePrevPage = useCallback(() => {
    if (isFlipping) return;
    if (currentPage <= 1) return;

    setFlipDirection("prev");
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentPage((prev) => {
        if (window.innerWidth >= 1024) {
          if (prev <= 3) return 1;
          return Math.max(1, prev - 2);
        }
        return Math.max(1, prev - 1);
      });
      setIsFlipping(false);
    }, 280);
  }, [currentPage, isFlipping]);

  // Jump directly to a page
  const handleJumpToPage = (targetPage: number) => {
    if (targetPage === currentPage || isFlipping) return;
    setFlipDirection(targetPage > currentPage ? "next" : "prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(targetPage);
      setIsFlipping(false);
    }, 250);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (isAr) handlePrevPage();
        else handleNextPage();
      } else if (e.key === "ArrowLeft") {
        if (isAr) handleNextPage();
        else handlePrevPage();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextPage, handlePrevPage, isAr, isFullscreen]);

  // Prevent background scroll when fullscreen modal is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe Right
        if (isAr) handleNextPage();
        else handlePrevPage();
      } else {
        // Swipe Left
        if (isAr) handlePrevPage();
        else handleNextPage();
      }
    }
  };

  // Preload adjacent page images for instant turning
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pagesToPreload = [
      currentPage - 2,
      currentPage - 1,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3
    ].filter((p) => p >= 1 && p <= TOTAL_PAGES);

    pagesToPreload.forEach((p) => {
      const img = new window.Image();
      img.src = getPageImageUrl(p, 1200);
    });
  }, [currentPage]);

  return (
    <section id="digital-id-handbook" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-[#0A0C08] relative overflow-hidden">
      {/* Subtle architectural ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#B8873B_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B8873B]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── HEADER BANNER ────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#B8873B]/10 border border-[#B8873B]/35 rounded-full mb-3.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B8873B] animate-pulse" />
            <span className="font-mono text-[9.5px] sm:text-[10px] tracking-[0.2em] uppercase text-[#E2B768] font-bold">
              {isAr ? "دليل الإجراءات الرسمية المعتمد · 22 صفحة" : "Official Kingdom Onboarding Handbook · 22 Pages"}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.75rem] text-[#FAF6EE] font-normal leading-[1.18] mb-3.5">
            {isAr ? (
              <>
                دليل المستثمر الأجنبي: <span className="italic text-[#B8873B]">الهوية الرقمية، أبشر، والحساب البنكي</span>
              </>
            ) : (
              <>
                Saudi Digital ID & Banking: <span className="italic text-[#B8873B]">The 7-Step Executive Masterclass</span>
              </>
            )}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "دليل تفصيلي بالصور والخطوات الرسمية للحصول على هويتك الرقمية عبر السفارة، تفعيل الشريحة الإلكترونية (eSIM)، التسجيل في منصة أبشر، وفتح حساب بنكي سعودي لتحويل واستثمار أموالك العقارية بأمان تام."
              : "A step-by-step verified walkthrough with real official portal screenshots: embassy biometric booking, eSIM activation (STC, Mobily, Zain), Absher facial matching, and opening your verified Saudi bank account."}
          </p>

          {/* Quick Metrics / Action Pills */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 mt-5 flex-wrap">
            <a
              href={PDF_DOWNLOAD_URL}
              download="Saudi_Digital_ID_Step_by_Step_Guide_Asaheeb.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8873B] text-[#080907] font-mono text-[10.5px] tracking-wider uppercase font-bold rounded-xs hover:bg-[#c99a49] transition-all shadow-md group cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              <span>{isAr ? "تحميل الدليل بصيغة PDF (1.8 MB)" : "Download Full PDF Guide (1.8 MB)"}</span>
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/[0.04] text-[#FAF6EE] hover:border-[#B8873B] hover:text-[#B8873B] font-mono text-[10.5px] tracking-wider uppercase font-medium rounded-xs transition-all cursor-pointer shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
              </svg>
              <span>{isAr ? "وضع ملء الشاشة المكبر" : "Immersive Fullscreen"}</span>
            </button>
          </div>
        </div>



        {/* ── 3D BOOKLET STAGE CONTAINER ───────────────────────────────── */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full rounded-sm bg-gradient-to-b from-[#131610] to-[#0D0F0B] border border-white/15 p-3 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
          style={{ perspective: "1600px" }}
        >
          {/* Top Bar inside Stage: Page Progress & Controls */}
          <div className={`flex items-center justify-between pb-3 mb-4 border-b border-white/10 ${isAr ? "flex-row-reverse" : ""}`}>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#E2B768] font-bold">
                {isCover ? (
                  isAr ? "غلاف الدليل الرسمي (الصفحة 1)" : "Official Cover (Page 1)"
                ) : (
                  <>
                    <span className="hidden lg:inline">
                      {isAr
                        ? `الصفحات ${leftPage || currentPage} - ${rightPage || currentPage} من أصل ${TOTAL_PAGES}`
                        : `Pages ${leftPage || currentPage}–${rightPage || currentPage} of ${TOTAL_PAGES}`}
                    </span>
                    <span className="lg:hidden">
                      {isAr
                        ? `الصفحة ${currentPage} من أصل ${TOTAL_PAGES}`
                        : `Page ${currentPage} of ${TOTAL_PAGES}`}
                    </span>
                  </>
                )}
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-[10px] text-[#A89F91] hidden sm:inline">
                {isAr ? "استخدم الأسهم أو اسحب للتصفح" : "Use arrow keys or swipe to turn pages"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="p-1.5 border border-white/15 hover:border-[#B8873B] text-[#FAF6EE] hover:text-[#B8873B] rounded-xs transition-colors cursor-pointer"
                title={isZoomed ? "Reset Zoom" : "Zoom Page"}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="p-1.5 border border-white/15 hover:border-[#B8873B] text-[#FAF6EE] hover:text-[#B8873B] rounded-xs transition-colors cursor-pointer"
                title="Fullscreen"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── THE 3D BOOK PAGES CANVAS ──────────────────────────────── */}
          <div className="relative w-full flex items-center justify-center my-2 select-none">
            
            {/* Desktop Open Hardcover Book (Dual Page Spread) */}
            <div
              className={`hidden lg:flex w-full max-w-5xl items-stretch justify-center transition-all duration-300 ${
                isFlipping ? "opacity-75 scale-[0.99] blur-[0.5px]" : "opacity-100 scale-100"
              }`}
              style={{
                filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.85))"
              }}
            >
              {isCover ? (
                /* Cover Page Presentation */
                <div className="relative w-[500px] h-[700px] bg-[#12140F] rounded-r-sm rounded-l-xs overflow-hidden border-2 border-[#B8873B]/50 shadow-2xl flex items-center justify-center group cursor-pointer" onClick={handleNextPage}>
                  <Image
                    key="cover"
                    src={getPageImageUrl(1, 1400)}
                    alt="Saudi Digital ID Guide Cover"
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="500px"
                    priority
                  />
                  {/* Subtle leather / glossy sheen on cover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
                  
                  {/* Click to open badge */}
                  <div className="absolute bottom-6 inset-x-0 flex justify-center">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 bg-[#B8873B] text-[#080907] font-bold rounded-xs shadow-xl flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                      <span>{isAr ? "انقر لفتح الدليل ←" : "Click to Open Handbook →"}</span>
                    </span>
                  </div>
                </div>
              ) : (
                /* Dual Spread: Left Page (Even) + Right Page (Odd) */
                <div className="relative flex w-full max-w-5xl h-[650px] xl:h-[700px] rounded-sm overflow-hidden bg-[#0c0d0a] border border-white/20 shadow-2xl">
                  
                  {/* Left Page */}
                  <div className="relative flex-1 bg-white h-full border-r border-black/15 overflow-hidden flex items-center justify-center shadow-inner">
                    {leftPage && (
                      <Image
                        key={`left-p${leftPage}`}
                        src={getPageImageUrl(leftPage, 1200)}
                        alt={`Page ${leftPage}`}
                        fill
                        unoptimized
                        className="object-contain p-2"
                        sizes="50vw"
                        priority
                      />
                    )}
                    {/* Spine crease shadow on left page edge */}
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/25 via-black/5 to-transparent pointer-events-none" />
                    
                    {/* Page number watermark */}
                    <div className="absolute bottom-2 left-4 font-mono text-[10px] text-black/60 font-semibold pointer-events-none">
                      {leftPage}
                    </div>
                  </div>

                  {/* Center Book Spine Separator with 3D Depth */}
                  <div className="w-1.5 bg-gradient-to-r from-black/60 via-[#181a14] to-black/60 shadow-lg relative z-10 shrink-0" />

                  {/* Right Page */}
                  <div className="relative flex-1 bg-white h-full overflow-hidden flex items-center justify-center shadow-inner">
                    {rightPage && (
                      <Image
                        key={`right-p${rightPage}`}
                        src={getPageImageUrl(rightPage, 1200)}
                        alt={`Page ${rightPage}`}
                        fill
                        unoptimized
                        className="object-contain p-2"
                        sizes="50vw"
                        priority
                      />
                    )}
                    {/* Spine crease shadow on right page edge */}
                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none" />
                    
                    {/* Page number watermark */}
                    <div className="absolute bottom-2 right-4 font-mono text-[10px] text-black/60 font-semibold pointer-events-none">
                      {rightPage}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile / Tablet Single Page View */}
            <div
              className={`lg:hidden relative w-full max-w-lg h-[500px] sm:h-[600px] bg-white rounded-xs overflow-hidden border border-white/25 shadow-2xl flex items-center justify-center transition-all duration-300 ${
                isFlipping ? "opacity-75 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <Image
                key={`mobile-p${currentPage}`}
                src={getPageImageUrl(currentPage, 1200)}
                alt={`Saudi Digital ID Guide - Page ${currentPage}`}
                fill
                unoptimized
                className={`object-contain p-2 transition-transform duration-300 ${isZoomed ? "scale-125 cursor-zoom-out" : "scale-100"}`}
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
                onClick={() => setIsZoomed((prev) => !prev)}
              />
              <div className="absolute bottom-2 right-3 font-mono text-[9.5px] text-black/60 font-bold bg-white/80 px-2 py-0.5 rounded-xs">
                {currentPage} / {TOTAL_PAGES}
              </div>
            </div>

            {/* Floating Left / Right Flip Arrow Triggers */}
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className={`absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-[#12140F]/90 text-[#FAF6EE] flex items-center justify-center hover:bg-[#B8873B] hover:text-[#080907] hover:border-[#B8873B] transition-all shadow-2xl disabled:opacity-20 disabled:pointer-events-none cursor-pointer group`}
              aria-label="Previous Page"
            >
              <span className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform">‹</span>
            </button>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= TOTAL_PAGES}
              className={`absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-[#12140F]/90 text-[#FAF6EE] flex items-center justify-center hover:bg-[#B8873B] hover:text-[#080907] hover:border-[#B8873B] transition-all shadow-2xl disabled:opacity-20 disabled:pointer-events-none cursor-pointer group`}
              aria-label="Next Page"
            >
              <span className="text-base sm:text-lg group-hover:translate-x-0.5 transition-transform">›</span>
            </button>
          </div>

          {/* ── BOTTOM STAGE CONTROLS & ADVISORY ROW ───────────────────── */}
          <div className={`mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 ${isAr ? "sm:flex-row-reverse" : ""}`}>
            
            {/* Page Scrubber Slider */}
            <div className="w-full sm:w-72 flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#A89F91]">1</span>
              <input
                type="range"
                min={1}
                max={TOTAL_PAGES}
                value={currentPage}
                onChange={(e) => handleJumpToPage(Number(e.target.value))}
                className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#B8873B]"
              />
              <span className="font-mono text-[10px] text-[#A89F91]">{TOTAL_PAGES}</span>
            </div>

            {/* Quick Action Buttons */}
            <div className={`flex items-center gap-2.5 w-full sm:w-auto justify-end ${isAr ? "flex-row-reverse" : ""}`}>
              <a
                href={PDF_DOWNLOAD_URL}
                download="Saudi_Digital_ID_Step_by_Step_Guide_Asaheeb.pdf"
                className="flex-1 sm:flex-initial px-3.5 py-2 border border-[#B8873B]/50 bg-[#B8873B]/10 hover:bg-[#B8873B] hover:text-[#080907] text-[#FAF6EE] font-mono text-[10px] tracking-wider uppercase font-semibold rounded-xs transition-all text-center"
              >
                {isAr ? "تحميل PDF" : "Download PDF"}
              </a>

              <a
                href={getWhatsAppLink(
                  `Hello Asaheeb Real Estate, I reviewed the Saudi Digital ID & Banking Handbook and would like guidance on completing my embassy biometrics and investor account onboarding.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-3.5 py-2 bg-[#B8873B] hover:bg-[#c99a49] text-[#080907] font-mono text-[10px] tracking-wider uppercase font-bold rounded-xs transition-all text-center shadow-sm"
              >
                {isAr ? "مساعدة المستشار" : "Advisor Concierge"}
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ── FULLSCREEN IMMERSIVE LIGHTBOX MODAL ───────────────────────── */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/98 backdrop-blur-xl flex flex-col p-3 sm:p-6 select-none"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Prominent Floating Close Button (Top Corner - Always Visible & Clickable Above Everything) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
            className="fixed top-4 right-4 rtl:right-auto rtl:left-4 z-[100000] px-4 py-2 bg-[#B8873B] text-[#080907] hover:bg-[#c99a49] font-mono text-xs tracking-wider uppercase font-bold rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 border border-black/30"
            aria-label="Close Fullscreen"
          >
            <span className="text-sm font-black leading-none">✕</span>
            <span>{isAr ? "إغلاق" : "Close"}</span>
          </button>

          {/* Modal Header Bar */}
          <div className="w-full max-w-6xl mx-auto flex items-center justify-between py-2.5 text-[#FAF6EE] mb-2 pr-28 rtl:pr-0 rtl:pl-28" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs sm:text-sm text-[#E2B768] font-bold">
                {isAr ? `الصفحة ${currentPage} من أصل ${TOTAL_PAGES}` : `Page ${currentPage} of ${TOTAL_PAGES}`}
              </span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="font-mono text-[10px] text-[#A89F91] hidden sm:inline">
                {isAr ? "ESC أو انقر على الخلفية للإغلاق" : "Press ESC or click backdrop to exit"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={PDF_DOWNLOAD_URL}
                download="Saudi_Digital_ID_Step_by_Step_Guide_Asaheeb.pdf"
                className="px-3.5 py-1.5 bg-[#B8873B] text-[#080907] font-mono text-[10.5px] uppercase font-bold rounded-xs shadow-sm hover:bg-[#c99a49] transition-all"
              >
                {isAr ? "تحميل PDF" : "Download PDF"}
              </a>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="px-3.5 py-1.5 border border-white/30 bg-white/10 hover:bg-white/20 text-[#FAF6EE] font-mono text-[10.5px] uppercase font-bold rounded-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>✕</span>
                <span>{isAr ? "إغلاق" : "Close"}</span>
              </button>
            </div>
          </div>

          {/* Modal Main Stage */}
          <div
            className="flex-1 w-full max-w-5xl mx-auto relative flex items-center justify-center overflow-hidden my-auto p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[75vh] max-h-[850px] bg-white rounded-xs shadow-2xl flex items-center justify-center overflow-hidden">
              <Image
                key={`modal-p${currentPage}`}
                src={getPageImageUrl(currentPage, 1600)}
                alt={`Page ${currentPage}`}
                fill
                unoptimized
                className="object-contain p-2"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Modal Arrow Controls */}
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/85 text-white border border-white/25 hover:bg-[#B8873B] hover:text-[#080907] flex items-center justify-center text-xl transition-all disabled:opacity-20 cursor-pointer shadow-2xl"
              aria-label="Previous Page"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= TOTAL_PAGES}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/85 text-white border border-white/25 hover:bg-[#B8873B] hover:text-[#080907] flex items-center justify-center text-xl transition-all disabled:opacity-20 cursor-pointer shadow-2xl"
              aria-label="Next Page"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
