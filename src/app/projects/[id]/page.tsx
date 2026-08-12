"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
import { getProjectById } from "@/data/projectsData";
import { getProjectWhatsAppLink } from "@/data/contactConfig";

function ProjectDetailContent({ id }: { id: string }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const project = getProjectById(id);

  // Lightbox State
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const images = project.images || [];
  const extraCount = images.length > 3 ? images.length - 3 : 0;

  const handlePrevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null || images.length === 0) return;
    setActiveImageIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1));
  }, [activeImageIndex, images.length]);

  const handleNextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null || images.length === 0) return;
    setActiveImageIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1));
  }, [activeImageIndex, images.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowLeft") isAr ? handleNextImage() : handlePrevImage();
      if (e.key === "ArrowRight") isAr ? handlePrevImage() : handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, isAr, handleNextImage, handlePrevImage]);

  // Form State
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Project Detail Inquiry Form",
          projectName: `${project.nameEn} (${project.nameAr})`,
          name: form.name,
          phone: form.phone,
          email: form.email,
          budget: form.budget,
          message: form.message,
        }),
      });
    } catch (err) {
      console.error("Error submitting project lead:", err);
    }
  };

  const inputClass = (name: string) =>
    `w-full bg-[#12130F] border transition-all duration-300 px-4 py-3.5 text-sm font-sans text-[#E8DFCE] placeholder-[#8C8477]/50 focus:outline-none ${
      focused === name ? "border-[#B8873B] shadow-[0_0_15px_rgba(184,135,59,0.2)]" : "border-[rgba(184,135,59,0.2)]"
    }`;

  const labelClass = "block font-mono text-[10px] tracking-[0.22em] uppercase text-[#8C8477] mb-1.5";

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── BREADCRUMB & HERO ABOUT SECTION ──────────────────────────────── */}
      <section className="relative pt-24 sm:pt-36 pb-12 px-4 sm:px-10 lg:px-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8477] mb-6 flex-wrap ${isAr ? "flex-row-reverse text-right" : ""}`}>
            <Link href="/" className="hover:text-[#B8873B] transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-[#B8873B] transition-colors">{isAr ? "المشاريع" : "Projects"}</Link>
            <span>/</span>
            <span className="text-[#E8DFCE]">{isAr ? project.nameAr : project.nameEn}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            
            {/* Title & Overview */}
            <div className={`lg:col-span-8 ${isAr ? "text-right" : ""}`}>
              <div className={`flex items-center gap-2.5 mb-4 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#B8873B] px-3 py-1 border border-[#B8873B]/40 bg-[#B8873B]/10 font-semibold">
                  {isAr ? `${project.cityAr} ، ${project.districtAr}` : `${project.cityEn}, ${project.districtEn}`}
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-white/90 px-3 py-1 bg-white/10 border border-white/20">
                  {isAr ? project.statusAr : project.statusEn}
                </span>
                {project.expectedDeliveryEn && (
                  <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[#7FA8B3] px-3 py-1 border border-[#7FA8B3]/40 bg-[#7FA8B3]/10">
                    {isAr ? `التسليم: ${project.expectedDeliveryAr}` : `Delivery: ${project.expectedDeliveryEn}`}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#E8DFCE] font-normal leading-[1.1] tracking-[-0.02em] mb-4">
                {isAr ? project.nameAr : project.nameEn}
              </h1>

              {project.developerEn && (
                <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8C8477] mb-6">
                  {isAr ? `تطوير: ${project.developerAr}` : `Developed by: ${project.developerEn}`}
                </p>
              )}

              <p className="font-sans text-sm sm:text-base text-[#8C8477] leading-relaxed mb-6">
                {isAr ? project.overviewAr : project.overviewEn}
              </p>

              {/* Highlights Bullet List */}
              {project.highlightsEn && (
                <div className="p-5 sm:p-6 border-l-2 border-[#B8873B] bg-white/[0.02] space-y-2 mb-4">
                  {(isAr ? project.highlightsAr : project.highlightsEn)?.map((hl, i) => (
                    <div key={i} className={`flex items-start gap-2.5 text-xs sm:text-sm text-[#E8DFCE] ${isAr ? "flex-row-reverse text-right" : ""}`}>
                      <span className="text-[#B8873B] font-bold">◈</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions Card */}
            <div className="lg:col-span-4 p-6 sm:p-8 border border-[#B8873B]/30 bg-[#12130F] rounded-sm space-y-6">
              <div>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#8C8477] mb-1">
                  {isAr ? "نطاق الأسعار" : "Price Range"}
                </p>
                <p className="font-display text-2xl sm:text-3xl text-[#B8873B] font-bold">
                  {isAr ? project.priceRangeAr : project.priceRangeEn}
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div className="space-y-3">
                <a
                  href="#section-inquiry"
                  className="w-full block text-center py-3.5 font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold border border-[#B8873B] bg-[#B8873B] text-[#12130F] hover:bg-transparent hover:text-[#B8873B] transition-all duration-300"
                >
                  {isAr ? "استفسر عن هذا المشروع" : "Inquire For This Unit"}
                </a>
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold border border-[#25D366]/40 text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all duration-300"
                >
                  💬 {isAr ? "محادثة مباشرة عبر واتساب" : "Instant WhatsApp Chat"}
                </a>
              </div>
            </div>
          </div>

          {/* ── 4/5 KEY METRICS STATS BAR ────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-6 border-t border-white/10">
            {/* Price Range */}
            <div className="p-4 sm:p-5 border border-[#B8873B]/20 bg-[#12130F]">
              <div className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#8C8477] mb-1">
                {isAr ? "نطاق الأسعار" : "Price Range"}
              </div>
              <div className="font-display text-sm sm:text-base text-[#E8DFCE] font-semibold">
                {isAr ? project.priceRangeAr : project.priceRangeEn}
              </div>
            </div>

            {/* Size */}
            <div className="p-4 sm:p-5 border border-[#B8873B]/20 bg-[#12130F]">
              <div className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#8C8477] mb-1">
                {isAr ? "مساحة العقار" : "Property Size"}
              </div>
              <div className="font-display text-sm sm:text-base text-[#E8DFCE] font-semibold">
                {isAr ? project.sizeAr : project.sizeEn}
              </div>
            </div>

            {/* Type */}
            <div className="p-4 sm:p-5 border border-[#B8873B]/20 bg-[#12130F]">
              <div className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#8C8477] mb-1">
                {isAr ? "نوع الأصل" : "Property Type"}
              </div>
              <div className="font-display text-sm sm:text-base text-[#E8DFCE] font-semibold">
                {isAr ? project.typeAr : project.typeEn}
              </div>
            </div>

            {/* Status */}
            <div className="p-4 sm:p-5 border border-[#B8873B]/20 bg-[#12130F]">
              <div className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#8C8477] mb-1">
                {isAr ? "حالة المشروع" : "Project Status"}
              </div>
              <div className="font-display text-sm sm:text-base text-[#B8873B] font-semibold">
                {isAr ? project.statusAr : project.statusEn}
              </div>
            </div>

            {/* Expected Delivery or Units */}
            <div className="p-4 sm:p-5 border border-[#B8873B]/20 bg-[#12130F] col-span-2 sm:col-span-1">
              <div className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#8C8477] mb-1">
                {project.expectedDeliveryEn ? (isAr ? "التسليم المتوقع" : "Expected Delivery") : (isAr ? "عدد الوحدات" : "Total Units")}
              </div>
              <div className="font-display text-sm sm:text-base text-[#7FA8B3] font-semibold">
                {project.expectedDeliveryEn 
                  ? (isAr ? project.expectedDeliveryAr : project.expectedDeliveryEn)
                  : (isAr ? project.unitsCountAr || "متوفر" : project.unitsCountEn || "Available")}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 2: 1 LEFT + 3 RIGHT IMAGE GALLERY WITH OVERLAY ────────── */}
      <section className="py-14 px-4 sm:px-10 lg:px-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className={`mb-8 ${isAr ? "text-right" : ""}`}>
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] block mb-2">
              {isAr ? "معرض الصور المعمارية" : "Property Showcase"}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE]">
              {isAr ? "استكشف تفاصيل المشروع" : "Architectural & Interior Gallery"}
            </h2>
          </div>

          {/* 1 Large Main Image Left + 2 Stacked Secondary Images Right (1:2 ratio) */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
              
              {/* Left Column: 1 Large Hero Featured Image */}
              <div
                onClick={() => setActiveImageIndex(0)}
                className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden border border-white/10 group cursor-pointer rounded-sm"
              >
                <Image
                  src={images[0].url}
                  alt={isAr ? images[0].captionAr || project.nameAr : images[0].captionEn || project.nameEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12130F] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
                <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white/90 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                  <span className="bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-white/20 text-[10px] tracking-wider uppercase">
                    🔍 {isAr ? "عرض الصورة الرئيسية" : "View Main Photo"}
                  </span>
                  {images[0].captionEn && (
                    <span className="font-sans text-xs text-[#E8DFCE] hidden sm:inline-block">
                      {isAr ? images[0].captionAr : images[0].captionEn}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: 2 Stacked Images (or 2-column row on mobile) */}
              <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3.5 h-auto lg:h-[480px]">
                {images.slice(1, 3).map((img, i) => {
                  const actualIdx = i + 1;
                  const isLastSlot = i === 1; // 2nd right image slot
                  const showOverlay = isLastSlot && extraCount > 0;

                  return (
                    <div
                      key={actualIdx}
                      onClick={() => setActiveImageIndex(actualIdx)}
                      className="relative h-36 sm:h-44 lg:h-full overflow-hidden border border-white/10 group cursor-pointer rounded-sm"
                    >
                      <Image
                        src={img.url}
                        alt={isAr ? img.captionAr || project.nameAr : img.captionEn || project.nameEn}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        sizes="(max-width: 1024px) 50vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-300" />

                      {/* + N More Photos Overlay on the 2nd right image */}
                      {showOverlay ? (
                        <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-center p-2 group-hover:bg-black/60 transition-colors">
                          <span className="font-display text-2xl sm:text-3xl font-bold text-[#B8873B]">
                            +{extraCount + 1}
                          </span>
                          <span className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.2em] uppercase text-white font-medium mt-1">
                            {isAr ? "عرض جميع الصور" : "View All Photos"}
                          </span>
                        </div>
                      ) : (
                        img.captionEn && (
                          <div className={`absolute bottom-2.5 left-2.5 right-2.5 font-sans text-xs text-white/90 truncate hidden sm:block ${isAr ? "text-right" : ""}`}>
                            {isAr ? img.captionAr : img.captionEn}
                          </div>
                        )
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>
      </section>

      {/* ── HIGH Z-INDEX (z-[99999]) INTERACTIVE LIGHTBOX MODAL ──────────────── */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Bar with Counter & HIGH VISIBILITY CLOSE BUTTON */}
          <div className="w-full flex items-center justify-between z-[100000] pt-4 px-2" onClick={(e) => e.stopPropagation()}>
            <span className="font-mono text-xs tracking-[0.2em] text-[#B8873B] bg-black/80 px-4 py-2 border border-[#B8873B]/40 rounded-sm">
              {activeImageIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setActiveImageIndex(null)}
              className="font-mono text-xs tracking-[0.22em] text-[#12130F] bg-[#B8873B] hover:bg-white hover:text-[#12130F] font-bold border border-[#B8873B] px-6 py-2.5 rounded-sm transition-all duration-300 shadow-2xl cursor-pointer"
            >
              ✕ {isAr ? "إغلاق" : "CLOSE"}
            </button>
          </div>

          {/* Main Image Container & Navigation Arrows */}
          <div className="relative w-full max-w-5xl h-[70vh] mx-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Prev Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 bg-black/70 text-white hover:text-[#B8873B] hover:border-[#B8873B] flex items-center justify-center text-xl transition-all duration-300 shadow-xl cursor-pointer"
              title="Previous Image"
            >
              ‹
            </button>

            {/* Clickable Image itself advances to next */}
            <div className="relative w-full h-full cursor-pointer" onClick={handleNextImage}>
              <Image
                src={images[activeImageIndex].url}
                alt={project.nameEn}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 bg-black/70 text-white hover:text-[#B8873B] hover:border-[#B8873B] flex items-center justify-center text-xl transition-all duration-300 shadow-xl cursor-pointer"
              title="Next Image"
            >
              ›
            </button>
          </div>

          {/* Caption & Mobile Hint */}
          <div className="w-full text-center pb-4 z-10" onClick={(e) => e.stopPropagation()}>
            <p className="font-sans text-sm text-[#E8DFCE] mb-1">
              {isAr ? images[activeImageIndex].captionAr : images[activeImageIndex].captionEn}
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8477]">
              {isAr ? "استخدم الأسهم أو اضغط على الصورة للتنقل" : "Use Arrows or Tap Image to Next"}
            </p>
          </div>
        </div>
      )}

      {/* ── SECTION 3: COMPACT SLEEK YOUTUBE VIDEO TOUR ──────────────────── */}
      {project.videoUrl && (
        <section className="py-14 px-4 sm:px-10 lg:px-20 border-b border-white/10 bg-[#0A0C0F]">
          <div className="max-w-4xl mx-auto">
            <div className={`mb-6 text-center ${isAr ? "text-right sm:text-center" : ""}`}>
              <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] block mb-2">
                {isAr ? "الجولة المرئية" : "Video Walkthrough"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#E8DFCE]">
                {isAr ? "شاهد العرض الفيديوي للمشروع" : "Experience The Property In Motion"}
              </h2>
            </div>

            {/* Compact Video Container (max-w-3xl) */}
            <div className="max-w-3xl mx-auto relative w-full aspect-video border border-[#B8873B]/40 overflow-hidden shadow-2xl rounded-sm">
              <iframe
                src={project.videoUrl}
                title={project.nameEn}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 4: ARCHITECTURAL AMENITIES (NO BADGES / CLEAN STYLE) ──── */}
      <section className="py-16 px-4 sm:px-10 lg:px-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className={`mb-10 ${isAr ? "text-right" : ""}`}>
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] block mb-2">
              {isAr ? "المميزات والخدمات" : "Property Features & Amenities"}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE]">
              {isAr ? "مرافق ومعايير الحياة الفاخرة" : "Architectural Specifications & Lifestyle"}
            </h2>
          </div>

          {/* Clean Modern Architectural Cards (NO EMOJI BADGES) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.amenities.map((item, idx) => {
              const numStr = (idx + 1).toString().padStart(2, "0");
              return (
                <div
                  key={idx}
                  className={`p-6 border border-white/10 bg-[#12130F] hover:border-[#B8873B]/60 transition-all duration-300 relative group overflow-hidden ${
                    isAr ? "text-right" : ""
                  }`}
                >
                  {/* Subtle Top Gold Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B8873B] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

                  {/* Index Counter */}
                  <div className={`font-mono text-xs tracking-[0.25em] text-[#B8873B] font-semibold mb-3 ${isAr ? "text-right" : ""}`}>
                    {numStr}
                  </div>

                  <h3 className="font-display text-base sm:text-lg text-[#E8DFCE] font-medium mb-2 tracking-tight group-hover:text-[#B8873B] transition-colors">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#8C8477] leading-relaxed">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: LOCATION & MAP INTEGRATION ───────────────────────── */}
      <section className="py-16 px-4 sm:px-10 lg:px-20 border-b border-white/10 bg-[#0A0C0F]">
        <div className="max-w-6xl mx-auto">
          <div className={`mb-10 ${isAr ? "text-right" : ""}`}>
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] block mb-2">
              {isAr ? "موقع المشروع" : "Project Location"}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE] mb-3">
              {isAr ? `${project.districtAr} ، ${project.cityAr}` : `${project.districtEn}, ${project.cityEn}`}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8C8477] max-w-2xl leading-relaxed">
              {isAr
                ? "موقع استراتيجي يرتبط بأهم المحاور الرئيسية والوجهات الحيوية وسكك الحديد والمراكز التجارية."
                : "Strategically located with direct access to primary highways, railway hubs, universities, and commercial shopping malls."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Landmarks List */}
            <div className={`lg:col-span-5 space-y-4 ${isAr ? "text-right" : ""}`}>
              <h3 className="font-mono text-xs tracking-[0.25em] uppercase text-[#B8873B] mb-4">
                {isAr ? "المعالم والمحاور القريبة" : "Nearby Key Destinations"}
              </h3>
              
              <div className="space-y-3">
                {project.landmarks.map((lm, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border border-white/10 bg-[#12130F] flex items-center justify-between gap-4 ${
                      isAr ? "flex-row-reverse text-right" : ""
                    }`}
                  >
                    <span className="font-sans text-xs sm:text-sm text-[#E8DFCE] font-medium">
                      {isAr ? lm.nameAr : lm.nameEn}
                    </span>
                    <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[#B8873B] px-3 py-1 border border-[#B8873B]/30 bg-[#B8873B]/10 whitespace-nowrap">
                      {isAr ? lm.distAr : lm.distEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map Embed */}
            <div className="lg:col-span-7 border border-[#B8873B]/30 min-h-[320px] sm:min-h-[380px] relative overflow-hidden rounded-sm">
              {project.mapEmbedUrl ? (
                <iframe
                  src={project.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[320px] sm:min-h-[380px] border-0"
                  loading="lazy"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full min-h-[320px] flex items-center justify-center bg-[#12130F] text-[#8C8477] font-mono text-xs">
                  Interactive Map Container
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: BROCHURE DOWNLOAD ────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-10 lg:px-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div
            className={`p-6 sm:p-12 border border-[#B8873B]/40 text-center rounded-sm ${isAr ? "text-right sm:text-center" : ""}`}
            style={{ background: "linear-gradient(135deg, rgba(184,135,59,0.12) 0%, rgba(18,19,15,1) 100%)" }}
          >
            <div className="w-14 h-14 rounded-full border border-[#B8873B] bg-[#B8873B]/10 flex items-center justify-center text-2xl mx-auto mb-4 text-[#B8873B]">
              📄
            </div>

            <h3 className="font-display text-2xl sm:text-4xl text-[#E8DFCE] mb-3">
              {isAr ? "تحميل الكتيب التفيصلي للمشروع" : "Download Full Project Brochure"}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#8C8477] max-w-xl mx-auto mb-8 leading-relaxed">
              {isAr
                ? "احصل على الكتيب الشامل الذي يتضمن مخططات الطوابق والتصاميم الهندسية وجدول المواصفات."
                : "Get access to complete floor plans, architectural layouts, and full technical specifications."}
            </p>

            <a
              href={project.brochureUrl || "#"}
              download
              className="inline-flex items-center gap-3 px-8 py-4 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase border border-[#B8873B] bg-[#B8873B] text-[#12130F] font-bold hover:bg-transparent hover:text-[#B8873B] transition-all duration-300"
            >
              <span>{isAr ? "تحميل الملف (PDF)" : "Download PDF Brochure"}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V11M8 11L4.5 7.5M8 11L11.5 7.5M2 14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: INQUIRY & CALLBACK FORM ───────────────────────────── */}
      <section id="section-inquiry" className="py-16 sm:py-20 px-4 sm:px-10 lg:px-20 bg-[#0A0C0F]">
        <div className="max-w-3xl mx-auto">
          <div className={`text-center mb-10 ${isAr ? "text-right sm:text-center" : ""}`}>
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] block mb-2">
              {isAr ? "طلب استفسار أو معاودة اتصال" : "Quick Inquiry"}
            </span>
            <h2 className="font-display text-2xl sm:text-5xl text-[#E8DFCE] mb-4">
              {isAr ? `مهتم بمشروع ${project.nameAr}؟` : `Interested in ${project.nameEn}?`}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8C8477]">
              {isAr
                ? "أدخل بياناتك وسيتواصل معك مستشار أصاهيب الخاص بهذا المشروع خلال أقل من ساعتين."
                : "Share your details below and an Asaheeb property advisor will contact you within 2 hours."}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 border border-[#B8873B]/50 bg-[#12130F] text-center space-y-4 rounded-sm">
              <div className="text-4xl">✅</div>
              <h3 className="font-display text-2xl text-[#E8DFCE]">
                {isAr ? "تم استلام استفسارك بنجاح!" : "Inquiry Received Successfully!"}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#8C8477]">
                {isAr
                  ? `شكراً لتواصلك. قام فريقنا بتسجيل اهتمامك بمشروع ${project.nameAr} وسنتواصل معك قريباً.`
                  : `Thank you. Our team has registered your request for ${project.nameEn} and will reach out shortly.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8 border border-[#B8873B]/20 bg-[#12130F] rounded-sm">
              
              <div>
                <label className={labelClass}>{isAr ? "الاسم الكامل" : "Full Name"} *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder={isAr ? "اسمك الكامل" : "Your full name"}
                  className={inputClass("name")}
                  dir={isAr ? "rtl" : "ltr"}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{isAr ? "رقم الهاتف / الواتساب" : "Phone / WhatsApp"} *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    placeholder="+966 50 000 0000"
                    className={inputClass("phone")}
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className={labelClass}>{isAr ? "البريد الإلكتروني" : "Email Address"} *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="your@email.com"
                    className={inputClass("email")}
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>{isAr ? "الميزانية المتوقعة" : "Budget Range"}</label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  onFocus={() => setFocused("budget")}
                  onBlur={() => setFocused(null)}
                  placeholder={isAr ? project.priceRangeAr : project.priceRangeEn}
                  className={inputClass("budget")}
                  dir={isAr ? "rtl" : "ltr"}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold border border-[#B8873B] bg-[#B8873B] text-[#12130F] hover:bg-[#c99a49] transition-all duration-300 shadow-[0_0_30px_rgba(184,135,59,0.3)]"
              >
                {isAr ? "إرسال طلب الاستفسار" : "Submit Inquiry Request"}
              </button>

              <div className="pt-4 text-center border-t border-white/10">
                <a
                  href={getProjectWhatsAppLink(project.nameEn, project.nameAr, isAr)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#25D366] hover:underline"
                >
                  <span>💬 {isAr ? "أو تحدث معنا فوراً عبر واتساب" : "Or Chat Instantly via WhatsApp"}</span>
                </a>
              </div>

            </form>
          )}
        </div>
      </section>

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}

export default function DynamicProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <LanguageProvider>
      <ProjectDetailContent id={id} />
    </LanguageProvider>
  );
}
