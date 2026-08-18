"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
import { ProjectDetail } from "@/types/database";
import { submitWebsiteLead } from "@/lib/api";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { getProjectWhatsAppLink } from "@/data/contactConfig";
import ShareModal from "@/components/shared/ShareModal";

export function ProjectDetailView({ project }: { project: ProjectDetail | null }) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  // Lightbox & Share State
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const images = project?.images || [];
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await submitWebsiteLead({
        name: form.name,
        phone: form.phone,
        email: form.email,
        property_id: project.id,
        interest: `${project.nameEn} (${project.nameAr})`,
        budget: form.budget,
        message: form.message,
        source: "PROPERTY_INQUIRY",
        form_type: "Project Detail Inquiry Form",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting project lead:", err);
      setErrorMsg(isAr ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو مراسلتنا عبر واتساب." : "An error occurred while submitting. Please try again or reach out via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (name: string) =>
    `w-full bg-[#12130F] border transition-all duration-300 px-4 py-3.5 text-sm font-sans text-[#E8DFCE] placeholder-[#8C8477]/50 focus:outline-none ${
      focused === name ? "border-[#B8873B] shadow-[0_0_15px_rgba(184,135,59,0.2)]" : "border-[rgba(184,135,59,0.2)]"
    }`;

  const labelClass = "block font-mono text-[10px] tracking-[0.22em] uppercase text-[#8C8477] mb-1.5";

  if (!project) {
    return (
      <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
        <PageNav />
        <div className="max-w-4xl mx-auto pt-44 px-6 text-center py-20">
          <h1 className="font-display text-3xl text-[#E8DFCE] mb-4">
            {isAr ? "المشروع غير متوفر" : "Project Not Found"}
          </h1>
          <p className="font-sans text-sm text-[#C5BCAD] mb-8">
            {isAr ? "عذراً، لم يتم العثور على المشروع المطلوب." : "The requested project could not be found."}
          </p>
          <Link
            href="/projects"
            className="font-mono text-xs tracking-widest uppercase px-6 py-3 border border-[#B8873B] text-[#B8873B] hover:bg-[#B8873B] hover:text-[#12130F] transition-all"
          >
            {isAr ? "العودة إلى المشاريع" : "Back to Projects"}
          </Link>
        </div>
        <PageFooter />
      </main>
    );
  }

  return (
    <main className="relative bg-[#12130F] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── BREADCRUMB & HERO ABOUT SECTION ──────────────────────────────── */}
      <section className="relative pt-24 sm:pt-36 pb-12 px-4 sm:px-10 lg:px-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          
          {/* Breadcrumb & Share Button */}
          <div className={`flex items-center justify-between gap-4 mb-6 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8477] flex-wrap ${isAr ? "flex-row-reverse text-right" : ""}`}>
              <Link href="/" className="hover:text-[#B8873B] transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-[#B8873B] transition-colors">{isAr ? "المشاريع" : "Projects"}</Link>
              <span>/</span>
              <span className="text-[#E8DFCE]">{isAr ? project.nameAr : project.nameEn}</span>
            </div>

            <button
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[#B8873B] border border-[#B8873B]/40 bg-[#B8873B]/10 px-3.5 py-1.5 hover:bg-[#B8873B] hover:text-[#12130F] transition-all duration-300 rounded-sm cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{isAr ? "مشاركة العقار" : "Share Property"}</span>
            </button>
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
                  href={getProjectWhatsAppLink(project.nameEn, project.nameAr, isAr)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold border border-[#25D366]/40 text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all duration-300"
                >
                  💬 {isAr ? "محادثة مباشرة عبر واتساب" : "Instant WhatsApp Chat"}
                </a>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold border border-white/20 text-[#E8DFCE] hover:border-[#B8873B] hover:text-[#B8873B] transition-all duration-300 rounded-sm cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{isAr ? "مشاركة هذا العقار" : "Share Property"}</span>
                </button>
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
                  src={getOptimizedImageUrl(images[0].url, 1200)}
                  alt={isAr ? images[0].captionAr || project.nameAr : images[0].captionEn || project.nameEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  loading="eager"
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
                        src={getOptimizedImageUrl(img.url, 800)}
                        alt={isAr ? img.captionAr || project.nameAr : img.captionEn || project.nameEn}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        priority={actualIdx === 1}
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

      {/* ── SECTION 3: VIDEO OR 360 WALKTHROUGH ────────────────────────────── */}
      {project.videoUrl && (
        <section className="py-14 px-4 sm:px-10 lg:px-20 border-b border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className={`mb-8 ${isAr ? "text-right" : ""}`}>
              <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] block mb-2">
                {isAr ? "جولة افتراضية" : "Video Tour"}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE]">
                {isAr ? "شاهد الفيديو التعريفي للمشروع" : "Experience the Space in Motion"}
              </h2>
            </div>

            <div className="relative aspect-video w-full overflow-hidden border border-[#B8873B]/30 rounded-sm bg-black">
              <iframe
                src={project.videoUrl}
                title={isAr ? (project.nameAr || project.nameEn) : (project.nameEn || project.nameAr)}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 4: AMENITIES & FACILITIES (Comes after Gallery/Video) ─────── */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="py-14 px-4 sm:px-10 lg:px-20 border-b border-white/10 bg-[#0F1117]/50">
          <div className="max-w-6xl mx-auto">
            <div className={`mb-10 ${isAr ? "text-right" : ""}`}>
              <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] block mb-2">
                {isAr ? "المرافق والخدمات المتميزة" : "Amenities & Lifestyle"}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE]">
                {isAr ? "خدمات متكاملة لراحة المستثمر والساكن" : "Curated Living Facilities"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.amenities.map((am, i) => (
                <div
                  key={i}
                  className={`p-6 border border-white/10 hover:border-[#B8873B]/50 transition-all duration-300 rounded-sm bg-[#12130F] group ${isAr ? "text-right" : ""}`}
                >
                  <div className={`mb-2.5 ${isAr ? "text-right" : ""}`}>
                    <h3 className="font-display text-base sm:text-lg text-[#E8DFCE] font-semibold group-hover:text-[#B8873B] transition-colors">
                      {isAr ? (am.titleAr || am.titleEn) : (am.titleEn || am.titleAr)}
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-[#8C8477] leading-relaxed">
                    {isAr ? (am.descAr || am.descEn) : (am.descEn || am.descAr)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 5: LOCATION & STRATEGIC LANDMARKS (Comes after Amenities) ── */}
      <section className="py-14 px-4 sm:px-10 lg:px-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className={`mb-8 ${isAr ? "text-right" : ""}`}>
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] block mb-2">
              {isAr ? "الموقع الاستراتيجي والمعالم" : "Strategic Location"}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE]">
              {isAr
                ? `${project.cityAr || project.cityEn} — ${project.districtAr || project.districtEn}`
                : `${project.districtEn || project.districtAr}, ${project.cityEn || project.cityAr}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Map Embed */}
            <div className="lg:col-span-7 h-72 sm:h-96 lg:h-[420px] relative overflow-hidden border border-white/10 rounded-sm bg-[#12130F]">
              {project.mapEmbedUrl ? (
                <iframe
                  src={project.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Project Location Map"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-white/[0.02]">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#B8873B] mb-2">
                    📍 {isAr ? "خريطة الموقع" : "Location Map"}
                  </p>
                  <p className="font-sans text-sm text-[#8C8477]">
                    {isAr
                      ? `${project.cityAr || project.cityEn} ، ${project.districtAr || project.districtEn}`
                      : `${project.districtEn || project.districtAr}, ${project.cityEn || project.cityAr}`}
                  </p>
                </div>
              )}
            </div>

            {/* Proximity Landmarks List */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 border border-[#B8873B]/20 bg-[#12130F]">
                <h3 className={`font-mono text-[10px] tracking-[0.25em] uppercase text-[#B8873B] mb-4 font-semibold ${isAr ? "text-right" : ""}`}>
                  {isAr ? "المسافات والمعالم القريبة" : "Nearby Key Landmarks"}
                </h3>

                <div className="space-y-3">
                  {project.landmarks && project.landmarks.length > 0 ? (
                    project.landmarks.map((lm, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 border-b border-white/5 last:border-0 ${isAr ? "flex-row-reverse text-right" : ""}`}
                      >
                        <span className="font-sans text-xs sm:text-sm text-[#E8DFCE] font-medium">
                          {isAr ? (lm.nameAr || lm.nameEn) : (lm.nameEn || lm.nameAr)}
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs text-[#B8873B] px-2.5 py-1 border border-[#B8873B]/30 bg-[#B8873B]/10 rounded-sm shrink-0">
                          ⏱ {isAr ? (lm.distAr || lm.distEn) : (lm.distEn || lm.distAr)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="font-sans text-xs text-[#8C8477]">
                      {isAr ? "يقع بالقرب من أهم المحاور الرئيسية والمراكز الحيوية." : "Strategically connected to major arterial roads and metro links."}
                    </p>
                  )}
                </div>
              </div>

              {/* Direct Google Maps Direction Link */}
              {project.googleMapsUrl && (
                <a
                  href={project.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold border border-white/20 text-[#E8DFCE] hover:border-[#B8873B] hover:text-[#B8873B] transition-all duration-300"
                >
                  <span>📍 {isAr ? "الاتجاهات على خرائط جوجل" : "Open in Google Maps"}</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: BROCHURE DOWNLOAD ───────────────────────────────────── */}
      {project.brochureUrl && (
        <section className="py-14 px-4 sm:px-10 lg:px-20 border-b border-white/10">
          <div className="max-w-4xl mx-auto p-8 sm:p-12 border border-[#B8873B]/40 bg-gradient-to-r from-[#12130F] via-white/[0.02] to-[#12130F] rounded-sm text-center">
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] mb-2 block">
              {isAr ? "ملف المشروع والمخططات" : "Investment Factsheet"}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl text-[#E8DFCE] mb-4">
              {isAr ? "تحميل البروشور الرسمي والمخططات الهندسية" : "Download Official Floor Plans & Brochure"}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8C8477] max-w-lg mx-auto mb-8">
              {isAr
                ? "احصل على المستندات التفصيلية الكاملة وجداول المساحات ونماذج التشطيب المعتمدة."
                : "Get access to complete architectural layouts, finishing specifications, and payment breakdown schedules."}
            </p>

            <a
              href={project.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold border border-[#B8873B] bg-[#B8873B] text-[#12130F] hover:bg-[#c99a49] transition-all duration-300 shadow-[0_0_30px_rgba(184,135,59,0.3)]"
            >
              <span>{isAr ? "تحميل البروشور (PDF)" : "Download Brochure (PDF)"}</span>
              {project.brochureSizeEn && (
                <span className="opacity-80 text-[10px]">({isAr ? project.brochureSizeAr : project.brochureSizeEn})</span>
              )}
            </a>
          </div>
        </section>
      )}

      {/* ── SECTION 7: DEDICATED INQUIRY LEAD CAPTURE FORM ──────────────────── */}
      <section id="section-inquiry" className="py-20 px-4 sm:px-10 lg:px-20 bg-[#0F1117]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#B8873B] block mb-2">
              {isAr ? "احجز استشارتك الاستثمارية" : "Priority Allocation"}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#E8DFCE] mb-3">
              {isAr ? `طلب استفسار عن ${project.nameAr}` : `Inquire About ${project.nameEn}`}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8C8477]">
              {isAr
                ? "سيتواصل معك مستشار عقاري مرخص من أصاهيب خلال دقائق لتزويدك بكافة الخيارات والأسعار المتاحة."
                : "A licensed Asaheeb investment advisor will contact you within minutes with verified allocations and live pricing."}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-12 border border-[#B8873B]/50 bg-[#B8873B]/10 text-center space-y-4 rounded-sm">
              <div className="w-12 h-12 rounded-full bg-[#B8873B] text-[#12130F] flex items-center justify-center text-2xl mx-auto font-bold">
                ✓
              </div>
              <h3 className="font-display text-2xl text-[#E8DFCE]">
                {isAr ? "تم استلام طلبكم بنجاح" : "Inquiry Received Successfully"}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#C5BCAD] max-w-md mx-auto">
                {isAr
                  ? "شكراً لاهتمامكم. سيقوم مستشار أصاهيب العقاري بالتواصل معكم فوراً."
                  : "Thank you for reaching out. An Asaheeb advisor is reviewing your request and will connect shortly."}
              </p>
              <div className="pt-4">
                <a
                  href={getProjectWhatsAppLink(project.nameEn, project.nameAr, isAr)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#25D366] hover:underline font-bold"
                >
                  <span>💬 {isAr ? "أو تحدث معنا فوراً عبر واتساب" : "Chat on WhatsApp Now"}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 border border-white/10 bg-[#12130F] space-y-5 rounded-sm">
              
              <div>
                <label className={labelClass}>{isAr ? "الاسم الكامل *" : "Full Name *"}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder={isAr ? "محمد السعيد" : "Mohammed Al-Saeed"}
                  className={inputClass("name")}
                  dir={isAr ? "rtl" : "ltr"}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{isAr ? "رقم الهاتف / واتساب *" : "Phone / WhatsApp *"}</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    placeholder="+966 5X XXX XXXX"
                    className={inputClass("phone")}
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className={labelClass}>{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="investor@example.com"
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

              {errorMsg && (
                <div className="p-4 border border-red-500/40 bg-red-500/10 text-red-300 font-sans text-xs text-center rounded-xs">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold border border-[#B8873B] bg-[#B8873B] text-[#12130F] hover:bg-[#c99a49] transition-all duration-300 shadow-[0_0_30px_rgba(184,135,59,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-[#12130F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>{isAr ? "جاري الإرسال..." : "Submitting..."}</span>
                  </>
                ) : (
                  <span>{isAr ? "إرسال طلب الاستفسار" : "Submit Inquiry Request"}</span>
                )}
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

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={isAr ? project.nameAr : project.nameEn}
        text={isAr ? `فرصة استثمار عقاري في ${project.nameAr} - ${project.cityAr}` : `Real estate investment opportunity at ${project.nameEn} - ${project.cityEn}`}
        url={typeof window !== "undefined" ? window.location.href : `https://www.asaheebrealestate.com/projects/${project.id}`}
        isAr={isAr}
      />

      {/* ── FULLSCREEN LIGHTBOX MODAL ─────────────────────────────────────── */}
      {activeImageIndex !== null && images.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          onClick={() => setActiveImageIndex(null)}
          dir={isAr ? "rtl" : "ltr"}
        >
          {/* Top Bar: Counter, Caption & Close */}
          <div
            className="flex items-center justify-between z-30 pt-2 sm:pt-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-mono text-xs text-[#B8873B] tracking-widest uppercase">
              {isAr
                ? `صورة ${activeImageIndex + 1} من ${images.length}`
                : `Photo ${activeImageIndex + 1} of ${images.length}`}
            </div>

            <div className="font-sans text-xs text-[#C5BCAD] hidden sm:block max-w-md truncate text-center">
              {isAr
                ? images[activeImageIndex]?.captionAr || images[activeImageIndex]?.captionEn || project.nameAr
                : images[activeImageIndex]?.captionEn || images[activeImageIndex]?.captionAr || project.nameEn}
            </div>

            <button
              onClick={() => setActiveImageIndex(null)}
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white border border-white/20 hover:border-[#B8873B] rounded-sm bg-black/60 transition-all cursor-pointer font-mono text-lg"
              title={isAr ? "إغلاق (Esc)" : "Close (Esc)"}
            >
              ✕
            </button>
          </div>

          {/* Center Main Photo with Navigation Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-6 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/60 hover:bg-[#B8873B] text-white hover:text-[#12130F] border border-white/20 hover:border-[#B8873B] transition-all cursor-pointer rounded-sm"
                aria-label="Previous image"
              >
                <span className="text-xl">{isAr ? "→" : "←"}</span>
              </button>
            )}

            <div className="relative w-full h-full max-w-5xl max-h-[70vh] sm:max-h-[75vh]">
              <Image
                src={getOptimizedImageUrl(images[activeImageIndex].url, 1600)}
                alt={
                  isAr
                    ? images[activeImageIndex]?.captionAr || project.nameAr
                    : images[activeImageIndex]?.captionEn || project.nameEn
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/60 hover:bg-[#B8873B] text-white hover:text-[#12130F] border border-white/20 hover:border-[#B8873B] transition-all cursor-pointer rounded-sm"
                aria-label="Next image"
              >
                <span className="text-xl">{isAr ? "←" : "→"}</span>
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {images.length > 1 && (
            <div
              className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-30 pb-4 sm:pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-16 h-12 sm:w-20 sm:h-14 shrink-0 overflow-hidden border transition-all cursor-pointer rounded-xs ${
                    activeImageIndex === i
                      ? "border-[#B8873B] scale-105 shadow-[0_0_15px_rgba(184,135,59,0.5)]"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={getOptimizedImageUrl(img.url, 200)}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}

export default function DynamicProjectDetailClient({ project }: { project: ProjectDetail | null }) {
  return (
    <LanguageProvider>
      <ProjectDetailView project={project} />
    </LanguageProvider>
  );
}
