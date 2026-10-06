"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import PageNav from "@/components/shared/PageNav";
import PageFooter from "@/components/shared/PageFooter";
import MobileBottomNav from "@/components/sections/MobileBottomNav";
import { ProjectDetail } from "@/types/database";
import { submitWebsiteLead, getProjectVideos, getProjectBrochureUrl } from "@/lib/api";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { getProjectWhatsAppLink } from "@/data/contactConfig";
import ShareModal from "@/components/shared/ShareModal";
import PhoneInputWithCountry from "@/components/ui/PhoneInputWithCountry";
import { validatePhoneNumber } from "@/data/countriesData";
import { ProjectPromotionalHeroBanner } from "@/components/shared/ProjectPromotionalHeroBanner";
import { ProjectCardPriceAndOffer } from "@/components/shared/ProjectCardPriceAndOffer";
import { ZoomableLightboxStage } from "./ZoomableLightboxStage";

// ── Smart Floor Plan Parsing Helper ──────────────────────────────────────────
interface ParsedFloorPlan {
  originalIndex: number;
  url: string;
  categoryEn: string;
  categoryAr: string;
  modelEn: string;
  modelAr: string;
  areaEn: string;
  areaAr: string;
  specsEn: string;
  specsAr: string;
  featuresEn?: string[];
  featuresAr?: string[];
  bedrooms?: number | string;
  bathrooms?: number | string;
  startingPriceEn?: string;
  startingPriceAr?: string;
  captionEn?: string;
  captionAr?: string;
  fullCaptionEn: string;
  fullCaptionAr: string;
}

// ── Emoji Cleaner & Luxury Amenity Badge Helpers ─────────────────────────────
function stripEmojis(text?: string): string {
  if (!text) return "";
  return text
    .replace(/[\p{Extended_Pictographic}\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}


function parseFloorPlan(plan: any, idx: number): ParsedFloorPlan {
  const capEn = (plan.captionEn || plan.caption_en || plan.description_en || plan.descriptionEn || "").trim();
  const capAr = (plan.captionAr || plan.caption_ar || plan.description_ar || plan.descriptionAr || "").trim();
  const combined = `${capEn} ${capAr}`.toLowerCase();

  // 1. Model / Layout Name
  let modelEn = (plan.modelEn || plan.model_en || plan.name_en || plan.nameEn || plan.title_en || plan.titleEn || "").trim();
  let modelAr = (plan.modelAr || plan.model_ar || plan.name_ar || plan.nameAr || plan.title_ar || plan.titleAr || "").trim();
  if (!modelEn && capEn) {
    const parts = capEn.split(/—|-|·|:/);
    if (parts.length > 0 && parts[0].trim().length > 0) {
      modelEn = parts[0].trim();
    }
  }
  if (!modelAr && capAr) {
    const parts = capAr.split(/—|-|·|:/);
    if (parts.length > 0 && parts[0].trim().length > 0) {
      modelAr = parts[0].trim();
    }
  }
  if (!modelEn) modelEn = `Layout ${idx + 1}`;
  if (!modelAr) modelAr = `مخطط ${idx + 1}`;

  // 2. Category Resolution (Intelligent classification, avoids generic "Layout" or "مخطط")
  const rawCat = (plan.category || "").toLowerCase().trim();
  let categoryEn = (plan.categoryEn || plan.category_en || "").trim();
  let categoryAr = (plan.categoryAr || plan.category_ar || "").trim();

  const isGeneric =
    !categoryEn ||
    categoryEn.toLowerCase() === "layout" ||
    categoryEn.toLowerCase() === "executive layout" ||
    categoryEn.toLowerCase() === "all" ||
    categoryAr === "مخطط" ||
    categoryAr === "مخطط نموذجي";

  // If CRM explicitly set category (e.g. '2_bed') or categoryEn is generic, resolve to real category
  if (rawCat || isGeneric) {
    if (rawCat === "studio" || rawCat.includes("studio") || /studio|استوديو/.test(combined)) {
      categoryEn = "Studio";
      categoryAr = "استوديو";
    } else if (
      rawCat === "1_bed" ||
      rawCat === "1bed" ||
      rawCat.includes("1") ||
      rawCat.includes("one") ||
      /1\s*(?:bed|bedroom|room|غرفة)/.test(combined)
    ) {
      categoryEn = "1 Bedroom";
      categoryAr = "غرفة نوم واحدة";
    } else if (
      rawCat === "2_bed" ||
      rawCat === "2bed" ||
      rawCat.includes("2") ||
      rawCat.includes("two") ||
      rawCat.includes("غرفتا") ||
      rawCat.includes("غرفتين") ||
      /2\s*(?:bed|bedroom|room|غرفتين|غرفتا)/.test(combined)
    ) {
      categoryEn = "2 Bedrooms";
      categoryAr = "غرفتا نوم";
    } else if (
      rawCat === "3_bed" ||
      rawCat === "3bed" ||
      rawCat.includes("3") ||
      rawCat.includes("three") ||
      /3\s*(?:bed|bedroom|room|غرف)/.test(combined)
    ) {
      categoryEn = "3 Bedrooms";
      categoryAr = "٣ غرف نوم";
    } else if (
      rawCat === "4_bed" ||
      rawCat === "4bed" ||
      rawCat.includes("4") ||
      rawCat.includes("four") ||
      /4\s*(?:bed|bedroom|room|غرف)/.test(combined)
    ) {
      categoryEn = "4 Bedrooms";
      categoryAr = "٤ غرف نوم";
    } else if (rawCat.includes("duplex") || /duplex|دوبلكس/.test(combined)) {
      categoryEn = "Sky Duplex";
      categoryAr = "دوبلكس";
    } else if (rawCat.includes("penthouse") || /penthouse|روف|بنتهاوس/.test(combined)) {
      categoryEn = "Penthouse";
      categoryAr = "بنتهاوس";
    } else if (rawCat.includes("villa") || /villa|فيلا/.test(combined)) {
      categoryEn = "Luxury Villa";
      categoryAr = "فيلا فاخرة";
    } else if (isGeneric) {
      // Check bedrooms spec as fallback
      const bedCount = Number(plan.bedrooms ?? plan.bedroom_count ?? plan.beds);
      if (bedCount === 1) {
        categoryEn = "1 Bedroom";
        categoryAr = "غرفة نوم واحدة";
      } else if (bedCount === 2) {
        categoryEn = "2 Bedrooms";
        categoryAr = "غرفتا نوم";
      } else if (bedCount === 3) {
        categoryEn = "3 Bedrooms";
        categoryAr = "٣ غرف نوم";
      } else if (bedCount === 4) {
        categoryEn = "4 Bedrooms";
        categoryAr = "٤ غرف نوم";
      } else if (bedCount > 4) {
        categoryEn = `${bedCount} Bedrooms`;
        categoryAr = `${bedCount} غرف نوم`;
      } else {
        categoryEn = plan.category ? String(plan.category).replace(/_/g, " ") : "2 Bedrooms";
        categoryAr = "غرفتا نوم";
      }
    }
  }

  // 3. Area in m²
  let areaEn = "";
  let areaAr = "";
  const rawArea = plan.area_sqm || plan.areaSqm || plan.size_sqm || plan.size_en || plan.size;
  if (rawArea) {
    const num = String(rawArea).replace(/[^0-9.]/g, "");
    areaEn = `${num} m²`;
    areaAr = `${num} م²`;
  } else {
    const areaMatchEn = capEn.match(/(\d+(?:\.\d+)?)\s*(?:m²|m2|sqm|msq)/i);
    const areaMatchAr = capAr.match(/(\d+(?:\.\d+)?|[\u0660-\u0669]+(?:\.[\u0660-\u0669]+)?)\s*(?:م²|متر مربع|متر)/);
    areaEn = areaMatchEn ? `${areaMatchEn[1]} m²` : "";
    areaAr = areaMatchAr ? `${areaMatchAr[1]} م²` : areaEn;
  }

  // 4. Bedrooms & Bathrooms
  let beds = plan.bedrooms ?? plan.bedroom_count ?? plan.beds;
  if (!beds && capEn) {
    const bMatch = capEn.match(/(\d+)\s*(?:bed|bedroom)/i);
    if (bMatch) beds = bMatch[1];
  }
  let baths = plan.bathrooms ?? plan.bathroom_count ?? plan.baths;
  if (!baths && capEn) {
    const baMatch = capEn.match(/(\d+(?:\.\d+)?)\s*(?:bath|bathroom)/i);
    if (baMatch) baths = baMatch[1];
  }
  if (beds !== undefined && beds !== null) beds = stripEmojis(String(beds)).trim();
  if (baths !== undefined && baths !== null) baths = stripEmojis(String(baths)).trim();

  // 5. Starting price (Deterministic formatting prevents SSR vs client locale hydration mismatch)
  const rawPrice = plan.starting_price || plan.startingPrice || plan.startingPriceEn || plan.starting_price_en;
  let startingPriceEn = "";
  let startingPriceAr = "";
  if (rawPrice) {
    const strPrice = String(rawPrice).trim();
    if (strPrice.startsWith("SAR") || strPrice.includes("SAR") || strPrice.includes("ر.س")) {
      startingPriceEn = strPrice;
      startingPriceAr = strPrice;
    } else {
      const numeric = Number(strPrice.replace(/[^0-9]/g, ""));
      if (!isNaN(numeric) && numeric > 0) {
        const formattedNum = String(Math.floor(numeric)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        startingPriceEn = `SAR ${formattedNum}`;
        startingPriceAr = `${formattedNum} ر.س`;
      } else {
        startingPriceEn = strPrice;
        startingPriceAr = strPrice;
      }
    }
  }

  // 6. Features tags (handles array or comma-separated string)
  const parseFeatureList = (val: any): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val.map((s) => String(s).trim()).filter(Boolean);
    if (typeof val === "string") return val.split(",").map((s) => s.trim()).filter(Boolean);
    return [];
  };

  const featuresEn = parseFeatureList(plan.features_en || plan.featuresEn || plan.features);
  const featuresAr = parseFeatureList(plan.features_ar || plan.featuresAr);

  return {
    originalIndex: idx,
    url: plan.url,
    categoryEn,
    categoryAr,
    modelEn,
    modelAr,
    areaEn,
    areaAr,
    featuresEn,
    featuresAr,
    bedrooms: beds,
    bathrooms: baths,
    startingPriceEn,
    startingPriceAr,
    captionEn: capEn,
    captionAr: capAr,
    specsEn: capEn,
    specsAr: capAr,
    fullCaptionEn: capEn || modelEn,
    fullCaptionAr: capAr || modelAr,
  };
}

export function ProjectDetailView({
  project,
  similarProjects = [],
}: {
  project: ProjectDetail | null;
  similarProjects?: ProjectDetail[];
}) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  // Lightbox, Video & Share State
  const [activeHeroIndex, setActiveHeroIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [activeFloorPlanIndex, setActiveFloorPlanIndex] = useState<number | null>(null);
  const [activePaymentPlanIndex, setActivePaymentPlanIndex] = useState<number | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  // Mobile Lightbox Interactive Zoom state
  const [photoZoomScale, setPhotoZoomScale] = useState<number>(1);
  const [floorPlanZoomScale, setFloorPlanZoomScale] = useState<number>(1);
  const [paymentPlanZoomScale, setPaymentPlanZoomScale] = useState<number>(1);
  const lastPhotoTapRef = useRef<number>(0);
  const lastFloorPlanTapRef = useRef<number>(0);
  const lastPaymentPlanTapRef = useRef<number>(0);

  // Floor plan filter state
  const [selectedFloorPlanTab, setSelectedFloorPlanTab] = useState<string>("ALL");

  const images = project?.images || [];
  const extraCount = images.length > 3 ? images.length - 3 : 0;
  const rawFloorPlans = project?.floorPlans || (project as any)?.floor_plans || [];
  const videos = getProjectVideos(project);
  const brochureUrl = getProjectBrochureUrl(project, lang);

  // Lock body scroll when any lightbox or modal is active
  useEffect(() => {
    const isModalOpen =
      activeImageIndex !== null ||
      activeFloorPlanIndex !== null ||
      activePaymentPlanIndex !== null ||
      showBrochureModal ||
      showShareModal;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageIndex, activeFloorPlanIndex, activePaymentPlanIndex, showBrochureModal, showShareModal]);

  // Parse all floor plans with category & specs
  const parsedFloorPlans = useMemo(() => {
    return rawFloorPlans.map((plan: any, idx: number) => parseFloorPlan(plan, idx));
  }, [rawFloorPlans]);

  // Unique categories for tabs
  const floorPlanCategories = useMemo(() => {
    const cats: string[] = [];
    parsedFloorPlans.forEach((p: ParsedFloorPlan) => {
      const cat = isAr ? p.categoryAr : p.categoryEn;
      if (!cats.includes(cat)) cats.push(cat);
    });
    return cats;
  }, [parsedFloorPlans, isAr]);

  // Filtered floor plans
  const visibleFloorPlans = useMemo(() => {
    if (selectedFloorPlanTab === "ALL") return parsedFloorPlans;
    return parsedFloorPlans.filter((p: ParsedFloorPlan) =>
      isAr ? p.categoryAr === selectedFloorPlanTab : p.categoryEn === selectedFloorPlanTab
    );
  }, [parsedFloorPlans, selectedFloorPlanTab, isAr]);

  const paymentTerms = isAr
    ? project?.paymentTermsAr || (project as any)?.payment_terms_ar
    : project?.paymentTermsEn || (project as any)?.payment_terms_en;

  // Visual Payment Plan Images Gallery resolution
  const paymentPlanImages = useMemo(() => {
    const list: Array<{
      url: string;
      titleEn: string;
      titleAr: string;
      captionEn?: string;
      captionAr?: string;
    }> = [];

    // 1. Direct payment_plan_images / paymentPlanImages / payment_plans
    const direct =
      project?.paymentPlanImages ||
      (project as any)?.payment_plan_images ||
      (project as any)?.payment_plans ||
      (project as any)?.paymentPlans;

    if (Array.isArray(direct)) {
      direct.forEach((item: any, idx: number) => {
        const u = item?.url || item?.image_url || item?.image;
        if (u) {
          list.push({
            url: u,
            titleEn: item.titleEn || item.title_en || item.title || `Payment Plan Option 0${idx + 1}`,
            titleAr: item.titleAr || item.title_ar || item.title || `خطة سداد رقم 0${idx + 1}`,
            captionEn: item.captionEn || item.caption_en || item.descEn || item.milestone_en || "",
            captionAr: item.captionAr || item.caption_ar || item.descAr || item.milestone_ar || "",
          });
        }
      });
    }

    // 2. Check if payment_milestones has items with url
    const rawMilestones =
      project?.paymentMilestones ||
      (project as any)?.payment_milestones;

    if (Array.isArray(rawMilestones)) {
      rawMilestones.forEach((m: any, idx: number) => {
        const u = m?.url || m?.image_url || m?.image;
        if (u && !list.some((existing) => existing.url === u)) {
          list.push({
            url: u,
            titleEn: m.stage_en || m.titleEn || m.title || `Payment Stage 0${idx + 1}`,
            titleAr: m.stage_ar || m.titleAr || m.title || `مرحلة السداد 0${idx + 1}`,
            captionEn: m.milestone_en || m.captionEn || (m.percentage ? `${m.percentage} Milestone` : ""),
            captionAr: m.milestone_ar || m.captionAr || (m.percentage ? `دفعة ${m.percentage}` : ""),
          });
        }
      });
    }

    return list;
  }, [project]);

  const hasPaymentImages = paymentPlanImages.length > 0;
  const hasPaymentTerms = Boolean(paymentTerms && paymentTerms.trim().length > 0);
  const showPaymentSection = hasPaymentImages || hasPaymentTerms;

  // Dynamic Map Embed Resolution
  const rawMapUrl = project?.mapEmbedUrl || (project as any)?.map_embed_url;
  const mapQuery = encodeURIComponent(
    `${project?.nameEn || ""}, ${project?.districtEn || ""}, ${project?.cityEn || ""}, Saudi Arabia`
  );
  const mapEmbedSrc =
    rawMapUrl ||
    (project
      ? `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`
      : null);

  const handlePrevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setPhotoZoomScale(1);
      if (activeImageIndex === null || images.length === 0) return;
      setActiveImageIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1));
    },
    [activeImageIndex, images.length]
  );

  const handleNextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setPhotoZoomScale(1);
      if (activeImageIndex === null || images.length === 0) return;
      setActiveImageIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1));
    },
    [activeImageIndex, images.length]
  );

  const handlePrevFloorPlan = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setFloorPlanZoomScale(1);
      if (activeFloorPlanIndex === null || rawFloorPlans.length === 0) return;
      setActiveFloorPlanIndex((prev) => (prev! === 0 ? rawFloorPlans.length - 1 : prev! - 1));
    },
    [activeFloorPlanIndex, rawFloorPlans.length]
  );

  const handleNextFloorPlan = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setFloorPlanZoomScale(1);
      if (activeFloorPlanIndex === null || rawFloorPlans.length === 0) return;
      setActiveFloorPlanIndex((prev) => (prev! === rawFloorPlans.length - 1 ? 0 : prev! + 1));
    },
    [activeFloorPlanIndex, rawFloorPlans.length]
  );

  const handlePrevPaymentPlan = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setPaymentPlanZoomScale(1);
      if (activePaymentPlanIndex === null || paymentPlanImages.length === 0) return;
      setActivePaymentPlanIndex((prev) => (prev! === 0 ? paymentPlanImages.length - 1 : prev! - 1));
    },
    [activePaymentPlanIndex, paymentPlanImages.length]
  );

  const handleNextPaymentPlan = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setPaymentPlanZoomScale(1);
      if (activePaymentPlanIndex === null || paymentPlanImages.length === 0) return;
      setActivePaymentPlanIndex((prev) => (prev! === paymentPlanImages.length - 1 ? 0 : prev! + 1));
    },
    [activePaymentPlanIndex, paymentPlanImages.length]
  );

  // Mobile Touch Swipe & Tap Gesture Handlers
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartTimeRef.current = Date.now();
  };

  const createTouchEndHandler = (
    onSwipeNext: () => void,
    onSwipePrev: () => void,
    onTap?: () => void
  ) => {
    return (e: React.TouchEvent) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) return;
      const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      const duration = Date.now() - touchStartTimeRef.current;

      // Minimum swipe distance: 35px; horizontal movement dominates vertical
      if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
        if (deltaX > 0) {
          // Swiped left
          if (isAr) onSwipePrev();
          else onSwipeNext();
        } else {
          // Swiped right
          if (isAr) onSwipeNext();
          else onSwipePrev();
        }
      } else if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15 && duration < 450) {
        // Tap gesture detected on touchscreens
        if (onTap) {
          onTap();
        }
      }
      touchStartXRef.current = null;
      touchStartYRef.current = null;
    };
  };

  // Keyboard navigation & Escape key for Lightboxes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
        setActiveFloorPlanIndex(null);
        setActivePaymentPlanIndex(null);
        setShowBrochureModal(false);
        setShowShareModal(false);
      }
      if (activeImageIndex !== null) {
        if (e.key === "ArrowLeft") (isAr ? handleNextImage() : handlePrevImage());
        if (e.key === "ArrowRight") (isAr ? handlePrevImage() : handleNextImage());
      }
      if (activeFloorPlanIndex !== null) {
        if (e.key === "ArrowLeft") (isAr ? handleNextFloorPlan() : handlePrevFloorPlan());
        if (e.key === "ArrowRight") (isAr ? handlePrevFloorPlan() : handleNextFloorPlan());
      }
      if (activePaymentPlanIndex !== null) {
        if (e.key === "ArrowLeft") (isAr ? handleNextPaymentPlan() : handlePrevPaymentPlan());
        if (e.key === "ArrowRight") (isAr ? handlePrevPaymentPlan() : handleNextPaymentPlan());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeImageIndex,
    activeFloorPlanIndex,
    activePaymentPlanIndex,
    isAr,
    handleNextImage,
    handlePrevImage,
    handleNextFloorPlan,
    handlePrevFloorPlan,
    handleNextPaymentPlan,
    handlePrevPaymentPlan,
  ]);

  // Inquiry Form State
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

  // Dedicated Brochure Modal State
  const [brochureForm, setBrochureForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    budget: "",
  });
  const [isBrochureSubmitting, setIsBrochureSubmitting] = useState(false);
  const [brochureSuccessMsg, setBrochureSuccessMsg] = useState<string | null>(null);
  const [brochureErrorMsg, setBrochureErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || isSubmitting) return;

    const phoneCheck = validatePhoneNumber(form.phone);
    if (!phoneCheck.isValid) {
      setErrorMsg(
        isAr
          ? phoneCheck.errorMessageAr || "يرجى إدخال رقم هاتف صحيح للدولة المحددة"
          : phoneCheck.errorMessageEn || "Please enter a valid phone number for the selected country"
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await submitWebsiteLead({
        name: form.name,
        phone: phoneCheck.formattedInternational || form.phone,
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
      setErrorMsg(
        isAr
          ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو مراسلتنا عبر واتساب."
          : "An error occurred while submitting. Please try again or reach out via WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBrochureDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || isBrochureSubmitting) return;

    const phoneCheck = validatePhoneNumber(brochureForm.phone);
    if (!phoneCheck.isValid) {
      setBrochureErrorMsg(
        isAr
          ? phoneCheck.errorMessageAr || "يرجى إدخال رقم هاتف صحيح للدولة المحددة"
          : phoneCheck.errorMessageEn || "Please enter a valid phone number for the selected country"
      );
      return;
    }

    setIsBrochureSubmitting(true);
    setBrochureErrorMsg(null);

    const downloadUrl = getProjectBrochureUrl(project, lang);

    const triggerBrochureDownload = (url: string) => {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    try {
      const response = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: brochureForm.fullName.trim(),
          phone: phoneCheck.formattedInternational || brochureForm.phone.trim(),
          email: brochureForm.email?.trim() || null,
          city: project.cityEn,
          interest: `Brochure Download: ${project.nameEn}`,
          budget: brochureForm.budget.trim() || null,
          property_id: project.id,
          source: "PROPERTY_INQUIRY",
          notes: `Visitor downloaded brochure (${lang.toUpperCase()}) for project "${project.nameEn}" from website.`,
        }),
      });

      if (response.ok) {
        if (downloadUrl) {
          triggerBrochureDownload(downloadUrl);
        }
        setBrochureSuccessMsg(isAr ? "تم بدء التحميل بنجاح!" : "Brochure download started!");
        setTimeout(() => {
          setShowBrochureModal(false);
          setBrochureSuccessMsg(null);
          setBrochureForm({ fullName: "", phone: "", email: "", budget: "" });
        }, 1500);
      } else {
        throw new Error("Failed to submit lead");
      }
    } catch (error) {
      console.error("Error submitting brochure inquiry:", error);
      if (downloadUrl) {
        triggerBrochureDownload(downloadUrl);
        setShowBrochureModal(false);
      } else {
        setBrochureErrorMsg(isAr ? "حدث خطأ أثناء معالجة الطلب." : "Failed to process download request.");
      }
    } finally {
      setIsBrochureSubmitting(false);
    }
  };

  const handleInquireOnLayout = (plan: ParsedFloorPlan) => {
    const layoutNote = isAr
      ? `استفسار بخصوص: ${plan.modelAr} (${plan.areaAr || plan.categoryAr})`
      : `Inquiring about layout: ${plan.modelEn} (${plan.areaEn || plan.categoryEn})`;
    setForm((prev) => ({
      ...prev,
      message: prev.message ? `${prev.message}\n${layoutNote}` : layoutNote,
    }));
    const el = document.getElementById("section-inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const inputClass = (name: string) =>
    `w-full bg-[#0A0C08] border transition-all duration-300 px-3.5 py-2.5 text-xs font-sans text-[#FAF6EE] placeholder-[#8C8477]/40 focus:outline-none rounded-xs ${
      focused === name
        ? "border-[#B8873B] shadow-[0_0_12px_rgba(184,135,59,0.2)] bg-[#11130E]"
        : "border-[#B8873B]/20 hover:border-[#B8873B]/40"
    }`;

  const labelClass = "block font-mono text-[9px] tracking-[0.2em] uppercase text-[#C99A49] mb-1 font-semibold";

  if (!project) {
    return (
      <main className="relative bg-[#080907] min-h-screen text-[#FAF6EE] pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
        <PageNav />
        <div className="max-w-4xl mx-auto pt-44 px-6 text-center py-20">
          <h1 className="font-display text-3xl text-[#FAF6EE] mb-4">
            {isAr ? "المشروع غير متوفر" : "Project Not Found"}
          </h1>
          <p className="font-sans text-sm text-[#C5BCAD] mb-8">
            {isAr ? "عذراً، لم يتم العثور على المشروع المطلوب." : "The requested project could not be found."}
          </p>
          <Link
            href="/projects"
            className="font-mono text-xs tracking-widest uppercase px-6 py-3 border border-[#B8873B] text-[#B8873B] hover:bg-[#B8873B] hover:text-[#080907] transition-all rounded-xs"
          >
            {isAr ? "العودة إلى المشاريع" : "Return to Projects"}
          </Link>
        </div>
        <PageFooter />
      </main>
    );
  }

  return (
    <main className="relative bg-[#080907] text-[#FAF6EE] min-h-screen pb-20 md:pb-0" dir={isAr ? "rtl" : "ltr"}>
      <PageNav />

      {/* ── 1. HEADER & TOP HERO BENTO MEDIA GALLERY (ON TOP AS PREFERRED) ── */}
      <section className="relative pt-24 sm:pt-28 pb-8 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-gradient-to-b from-[#0F110D] to-[#080907]">
        <div className="max-w-6xl mx-auto">
          
          {/* Breadcrumb & Action Triggers */}
          <div className={`flex items-center justify-between gap-4 mb-4 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[#A89F91] flex-wrap ${isAr ? "flex-row-reverse text-right" : ""}`}>
              <Link href="/" className="hover:text-[#B8873B] transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
              <span className="text-[#B8873B]/40">/</span>
              <Link href="/projects" className="hover:text-[#B8873B] transition-colors">{isAr ? "المشاريع" : "Projects"}</Link>
              <span className="text-[#B8873B]/40">/</span>
              <span className="text-[#FAF6EE] font-semibold">{isAr ? project.nameAr : project.nameEn}</span>
            </div>

            <div className="flex items-center gap-2">
              {brochureUrl && (
                <button
                  type="button"
                  onClick={() => setShowBrochureModal(true)}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-[#080907] bg-[#B8873B] hover:bg-[#c99a49] px-3.5 py-1.5 transition-all duration-300 rounded-xs cursor-pointer font-bold shadow-sm"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  <span>{isAr ? "تحميل الكتيب" : "Brochure PDF"}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowShareModal(true)}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-[#FAF6EE] border border-[#B8873B]/40 bg-[#B8873B]/10 px-3 py-1.5 hover:bg-[#B8873B] hover:text-[#080907] transition-all duration-300 rounded-xs cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{isAr ? "مشاركة" : "Share"}</span>
              </button>
            </div>
          </div>

          {/* Promotional Hero Banner if Offer is Active */}
          <div className="mb-4">
            <ProjectPromotionalHeroBanner
              offer={project.discountOffer || project.discount_offer}
              locale={lang}
            />
          </div>

          {/* Project Title & Metadata Badges Header */}
          <div className={`mb-5 ${isAr ? "text-right" : ""}`}>
            <div className={`flex items-center gap-2 mb-2.5 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
              <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#E2B768] px-2.5 py-1 border border-[#B8873B]/40 bg-[#B8873B]/10 font-semibold rounded-xs">
                {isAr ? `${project.cityAr} ، ${project.districtAr}` : `${project.districtEn}, ${project.cityEn}`}
              </span>
              <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-white/90 px-2.5 py-1 bg-white/10 border border-white/20 rounded-xs font-medium">
                {isAr ? project.statusAr : project.statusEn}
              </span>
              {project.expectedDeliveryEn && (
                <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[#8FC3D1] px-2.5 py-1 border border-[#8FC3D1]/40 bg-[#8FC3D1]/10 rounded-xs">
                  {isAr ? `التسليم: ${project.expectedDeliveryAr}` : `Delivery: ${project.expectedDeliveryEn}`}
                </span>
              )}
              {paymentTerms && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.18em] uppercase text-[#FAF6EE] px-2.5 py-1 border border-[#B8873B]/40 bg-black/60 font-semibold rounded-xs">
                  <svg className="w-3 h-3 text-[#B8873B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                  <span>{paymentTerms}</span>
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.25rem] text-[#FAF6EE] font-normal leading-[1.12] tracking-tight mb-1.5">
              {isAr ? project.nameAr : project.nameEn}
            </h1>

            {project.developerEn && (
              <p className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#C99A49] font-medium">
                {isAr ? `تطوير: ${project.developerAr}` : `Developed by: ${project.developerEn}`}
              </p>
            )}
          </div>

          {/* ── BENTO PHOTO GALLERY (PLACED ON TOP AS REQUESTED) ─────────────── */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 mb-5">
              {/* Left Column: 1 Large Hero Featured Image */}
              <div
                onClick={() => {
                  setPhotoZoomScale(1);
                  setActiveImageIndex(activeHeroIndex);
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={createTouchEndHandler(
                  () => setActiveHeroIndex((prev) => (prev + 1) % images.length),
                  () => setActiveHeroIndex((prev) => (prev - 1 + images.length) % images.length),
                  () => {
                    setPhotoZoomScale(1);
                    setActiveImageIndex(activeHeroIndex);
                  }
                )}
                className="lg:col-span-8 relative h-[280px] sm:h-[400px] lg:h-[480px] overflow-hidden border border-white/15 group cursor-pointer rounded-sm bg-[#10120E] shadow-xl"
              >
                <Image
                  src={getOptimizedImageUrl(images[activeHeroIndex]?.url || images[0].url, 1600)}
                  alt={isAr ? images[activeHeroIndex]?.captionAr || images[0].captionAr || project.nameAr : images[activeHeroIndex]?.captionEn || images[0].captionEn || project.nameEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 67vw"
                  priority
                  loading="eager"
                />
                {/* Gradient overlay always visible at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                {/* Mobile touch swipe counter badge */}
                <div className={`absolute top-3 ${isAr ? "left-3" : "right-3"} sm:hidden z-10 pointer-events-none`}>
                  <span className="font-mono text-[9px] tracking-wider bg-black/80 backdrop-blur-xs text-[#E2B768] border border-[#B8873B]/50 px-2.5 py-0.5 rounded-full font-bold shadow-md">
                    {activeHeroIndex + 1} / {images.length}
                  </span>
                </div>

                {/* Bottom info bar */}
                <div className={`absolute bottom-0 left-0 right-0 p-3.5 flex items-end justify-between gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div className={`flex-1 min-w-0 ${isAr ? "text-right" : ""}`}>
                    {(images[activeHeroIndex]?.captionEn || images[0].captionEn) && (
                      <p className="font-sans text-xs sm:text-sm text-white/90 leading-snug line-clamp-2">
                        {isAr ? images[activeHeroIndex]?.captionAr || images[0].captionAr : images[activeHeroIndex]?.captionEn || images[0].captionEn}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoZoomScale(1);
                      setActiveImageIndex(activeHeroIndex);
                    }}
                    className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 border border-[#B8873B]/60 hover:border-[#B8873B] text-[10px] sm:text-[10.5px] tracking-wider uppercase text-[#E2B768] font-bold rounded-sm shadow-md shrink-0 hover:bg-[#B8873B] hover:text-[#080907] transition-all duration-300 cursor-pointer z-10"
                    aria-label={isAr ? "تكبير الصورة" : "Enlarge photo"}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span>{isAr ? "تكبير" : "Enlarge"}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: 2 Stacked Images */}
              <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5 h-auto lg:h-[480px]">
                {images.slice(1, 3).map((img, i) => {
                  const actualIdx = i + 1;
                  const isLastSlot = i === 1;
                  const showOverlay = isLastSlot && extraCount > 0;

                  return (
                    <div
                      key={actualIdx}
                      onClick={() => {
                        setPhotoZoomScale(1);
                        setActiveImageIndex(actualIdx);
                      }}
                      className="relative h-[130px] sm:h-[170px] lg:h-full overflow-hidden border border-white/15 group cursor-pointer rounded-sm bg-[#10120E] shadow-xl"
                    >
                      <Image
                        src={getOptimizedImageUrl(img.url, 1000)}
                        alt={isAr ? img.captionAr || project.nameAr : img.captionEn || project.nameEn}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        priority={actualIdx === 1}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

                      {/* Image Caption - Always Visible */}
                      {img.captionEn && (
                        <p
                          className={`absolute bottom-2.5 ${isAr ? "right-2.5 text-right" : "left-2.5"} ${
                            showOverlay
                              ? isAr
                                ? "left-28 sm:left-32"
                                : "right-28 sm:right-32"
                              : isAr
                              ? "left-2.5"
                              : "right-2.5"
                          } font-sans text-[10px] sm:text-[11px] text-white/90 line-clamp-2 bg-black/60 px-2 py-1 backdrop-blur-xs rounded-xs leading-snug`}
                        >
                          {isAr ? img.captionAr : img.captionEn}
                        </p>
                      )}

                      {/* + N More Photos Badge (Positioned at bottom-right so 3rd image is 100% visible) */}
                      {showOverlay && (
                        <div className={`absolute bottom-2.5 ${isAr ? "left-2.5" : "right-2.5"} z-10`}>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-black/85 hover:bg-[#B8873B] text-[#FAF6EE] hover:text-[#080907] border border-[#B8873B]/70 rounded-xs font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-bold shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-105">
                            <svg className="w-3.5 h-3.5 text-[#E2B768] group-hover:text-[#080907]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <path d="M21 15l-5-5L5 21" />
                            </svg>
                            <span>+{extraCount + 1} {isAr ? "صور" : "Photos"}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── 5-METRIC KEY SPECS RIBBON (DIRECTLY UNDER GALLERY) ──────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-1">
            {/* Price Range */}
            <div className="p-3 sm:p-4 border border-[#B8873B]/30 bg-[#12140F] rounded-sm shadow-sm hover:border-[#B8873B]/50 transition-colors">
              <div className="flex items-center gap-1.5 mb-1.5">
                <svg className="w-3 h-3 text-[#C99A49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#C99A49] font-semibold">{isAr ? "نطاق الأسعار" : "Price Range"}</span>
              </div>
              <div className="font-display text-sm sm:text-base text-[#E2B768] font-bold leading-tight">
                {isAr ? project.priceRangeAr || project.startingPriceAr : project.priceRangeEn || project.startingPriceEn}
              </div>
            </div>

            {/* Size */}
            <div className="p-3 sm:p-4 border border-[#B8873B]/30 bg-[#12140F] rounded-sm shadow-sm hover:border-[#B8873B]/50 transition-colors">
              <div className="flex items-center gap-1.5 mb-1.5">
                <svg className="w-3 h-3 text-[#C99A49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                </svg>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#C99A49] font-semibold">{isAr ? "مساحة الوحدات" : "Unit Sizes"}</span>
              </div>
              <div className="font-display text-sm sm:text-base text-[#FAF6EE] font-bold leading-tight">
                {isAr ? project.sizeAr : project.sizeEn}
              </div>
            </div>

            {/* Type */}
            <div className="p-3 sm:p-4 border border-[#B8873B]/30 bg-[#12140F] rounded-sm shadow-sm hover:border-[#B8873B]/50 transition-colors">
              <div className="flex items-center gap-1.5 mb-1.5">
                <svg className="w-3 h-3 text-[#C99A49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#C99A49] font-semibold">{isAr ? "نوع العقار" : "Property Type"}</span>
              </div>
              <div className="font-display text-sm sm:text-base text-[#FAF6EE] font-bold leading-tight">
                {isAr ? project.typeAr : project.typeEn}
              </div>
            </div>

            {/* Status */}
            <div className="p-3 sm:p-4 border border-[#B8873B]/30 bg-[#12140F] rounded-sm shadow-sm hover:border-[#B8873B]/50 transition-colors">
              <div className="flex items-center gap-1.5 mb-1.5">
                <svg className="w-3 h-3 text-[#C99A49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#C99A49] font-semibold">{isAr ? "حالة المشروع" : "Status"}</span>
              </div>
              <div className="font-display text-sm sm:text-base text-[#B8873B] font-bold leading-tight">
                {isAr ? project.statusAr : project.statusEn}
              </div>
            </div>

            {/* Delivery or Total Units */}
            <div className="p-3 sm:p-4 border border-[#B8873B]/30 bg-[#12140F] rounded-sm shadow-sm hover:border-[#B8873B]/50 transition-colors col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <svg className="w-3 h-3 text-[#C99A49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#C99A49] font-semibold">
                  {project.expectedDeliveryEn ? (isAr ? "التسليم المتوقع" : "Delivery") : (isAr ? "عدد الوحدات" : "Total Units")}
                </span>
              </div>
              <div className="font-display text-sm sm:text-base text-[#8FC3D1] font-bold leading-tight">
                {project.expectedDeliveryEn
                  ? (isAr ? project.expectedDeliveryAr : project.expectedDeliveryEn)
                  : (isAr ? project.unitsCountAr || "متوفر" : project.unitsCountEn || "Available")}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. OVERVIEW NARRATIVE & STICKY QUICK ACTION CARD (TWO COLUMNS) ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-[#080907]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (8 cols): Editorial Narrative & Highlights */}
          <div className={`lg:col-span-8 ${isAr ? "text-right" : ""}`}>
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-[#C99A49] block mb-1.5 font-semibold">
              {isAr ? "نظرة عامة على المشروع" : "Architectural Overview"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#FAF6EE] mb-5 font-normal">
              {isAr ? "استكشف تفاصيل ومميزات العقار" : "A Distinctive Living Landmark"}
            </h2>

            <p className="font-sans text-sm sm:text-[15px] text-[#D4CDC1] leading-relaxed mb-6">
              {isAr ? project.overviewAr : project.overviewEn}
            </p>

            {/* Highlights Bullet List */}
            {project.highlightsEn && (
              <div className="p-5 sm:p-6 border-l-2 border-[#B8873B] bg-[#12140F] rounded-r-xs space-y-3 mb-4 shadow-sm">
                <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#E2B768] font-bold mb-2">
                  {isAr ? "أبرز مميزات الاستثمار" : "Core Investment Highlights"}
                </h3>
                {(isAr ? project.highlightsAr : project.highlightsEn)?.map((hl, i) => (
                  <div key={i} className={`flex items-start gap-2.5 text-xs sm:text-sm text-[#FAF6EE] ${isAr ? "flex-row-reverse text-right" : ""}`}>
                    <span className="text-[#B8873B] font-bold text-xs shrink-0 mt-0.5">•</span>
                    <span className="leading-relaxed">{hl}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Action & Pricing Card */}
          <div className="lg:col-span-4 sticky top-24 p-5 sm:p-6 border border-[#B8873B]/35 bg-[#12140F] rounded-xs space-y-4 shadow-xl">
            <div>
              <p className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-[#A89F91] mb-1 font-semibold">
                {isAr ? "الأسعار والعروض المتاحة" : "Price & Live Allocation"}
              </p>
              <ProjectCardPriceAndOffer project={project} isAr={isAr} />
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-2.5">
              <a
                href="#section-inquiry"
                className="w-full block text-center py-3 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold border border-[#B8873B] bg-[#B8873B] text-[#080907] hover:bg-[#c99a49] transition-all duration-300 rounded-xs shadow-sm"
              >
                {isAr ? "استفسر عن هذا المشروع" : "Inquire For This Property"}
              </a>

              <a
                href={getProjectWhatsAppLink(project.nameEn, project.nameAr, isAr)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold border border-[#25D366]/40 text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all duration-300 rounded-xs"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>{isAr ? "محادثة عبر واتساب" : "WhatsApp Consultation"}</span>
              </a>

              {brochureUrl && (
                <button
                  type="button"
                  onClick={() => setShowBrochureModal(true)}
                  className="w-full flex items-center justify-center gap-1.5 py-3 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold border border-[#B8873B]/50 text-[#FAF6EE] bg-[#B8873B]/10 hover:bg-[#B8873B] hover:text-[#080907] transition-all duration-300 rounded-xs cursor-pointer"
                >
                  <span>{isAr ? "تحميل الكتيب الرسمي (PDF)" : "Download Brochure (PDF)"}</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. SHOWCASE VIDEOS (IF PRESENT) ─────────────────────────────────── */}
      {videos.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-[#0A0C08]">
          <div className="max-w-4xl mx-auto">
            <div className={`mb-5 ${isAr ? "text-right" : ""}`}>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C99A49] block mb-1 font-semibold">
                {isAr ? "الجولات المصورة والافتراضية" : "Showcase & Virtual Tours"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#FAF6EE]">
                {isAr ? "شاهد جولة الفيديو للمشروع" : "Cinematic Tour & Motion Showcase"}
              </h2>
            </div>

            {/* Video Selector Tabs if Multiple */}
            {videos.length > 1 && (
              <div className={`flex items-center gap-2 mb-4 overflow-x-auto pb-2 ${isAr ? "flex-row-reverse" : ""}`}>
                {videos.map((vid: any, i: number) => {
                  const title = isAr ? vid.titleAr || `فيديو ${i + 1}` : vid.titleEn || `Video ${i + 1}`;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveVideoIndex(i)}
                      className={`font-mono text-[10px] tracking-[0.18em] uppercase px-3.5 py-1.5 border transition-all shrink-0 cursor-pointer rounded-xs font-semibold ${
                        activeVideoIndex === i
                          ? "border-[#B8873B] bg-[#B8873B] text-[#080907] font-bold"
                          : "border-white/20 text-[#A89F91] hover:border-[#B8873B]/60"
                      }`}
                    >
                      {title}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Video Player Container */}
            <div className="relative aspect-video w-full border border-white/10 rounded-xs overflow-hidden bg-black shadow-xl">
              {videos[activeVideoIndex]?.url?.includes("embed") || videos[activeVideoIndex]?.url?.includes("player.vimeo") ? (
                <iframe
                  src={videos[activeVideoIndex].url}
                  title="Project Video Showcase"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videos[activeVideoIndex]?.url}
                  controls
                  className="w-full h-full object-cover"
                  playsInline
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. STYLISH & COMPACT ARCHITECTURAL FLOOR PLANS SHOWCASE ─────────── */}
      {parsedFloorPlans.length > 0 && (
        <section id="section-floor-plans" className="py-14 sm:py-18 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-[#0C0E0A]">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Header */}
            <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 ${isAr ? "md:flex-row-reverse text-right" : ""}`}>
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C99A49] block mb-1.5 font-semibold">
                  {isAr ? "المخططات الهندسية ونماذج الوحدات" : "Architectural Layouts & Floor Plans"}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-[#FAF6EE]">
                  {isAr ? "اختر المخطط والتوزيع الهندسي المناسب" : "Choose Your Layout & Configuration"}
                </h2>
              </div>

              {brochureUrl && (
                <button
                  type="button"
                  onClick={() => setShowBrochureModal(true)}
                  className="inline-flex items-center gap-2 font-mono text-[9.5px] tracking-[0.18em] uppercase text-[#FAF6EE] border border-[#B8873B]/50 bg-[#B8873B]/10 px-3.5 py-2 hover:bg-[#B8873B] hover:text-[#080907] transition-all rounded-xs shrink-0 cursor-pointer font-semibold shadow-sm"
                >
                  <span>{isAr ? "تحميل جميع المخططات (PDF)" : "Download All Blueprints (PDF)"}</span>
                </button>
              )}
            </div>

            {/* Smart Category Tabs (e.g. All, 2 Bed, 3 Bed, Penthouse) */}
            {floorPlanCategories.length > 1 && (
              <div className={`flex items-center gap-2 mb-6 overflow-x-auto pb-1.5 ${isAr ? "flex-row-reverse" : ""}`}>
                <button
                  type="button"
                  onClick={() => setSelectedFloorPlanTab("ALL")}
                  className={`font-mono text-[9.5px] tracking-[0.18em] uppercase px-3.5 py-1.5 border transition-all shrink-0 cursor-pointer rounded-xs font-bold ${
                    selectedFloorPlanTab === "ALL"
                      ? "border-[#B8873B] bg-[#B8873B] text-[#080907] shadow-sm"
                      : "border-white/15 text-[#A89F91] hover:border-white/40 hover:text-white"
                  }`}
                >
                  {isAr ? `جميع المخططات (${parsedFloorPlans.length})` : `All Layouts (${parsedFloorPlans.length})`}
                </button>

                {floorPlanCategories.map((cat: string) => {
                  const count = parsedFloorPlans.filter((p: ParsedFloorPlan) =>
                    isAr ? p.categoryAr === cat : p.categoryEn === cat
                  ).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedFloorPlanTab(cat)}
                      className={`font-mono text-[9.5px] tracking-[0.18em] uppercase px-3.5 py-1.5 border transition-all shrink-0 cursor-pointer rounded-xs font-bold ${
                        selectedFloorPlanTab === cat
                          ? "border-[#B8873B] bg-[#B8873B] text-[#080907] shadow-sm"
                          : "border-white/15 text-[#A89F91] hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Space-Saving Architectural Layout Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {visibleFloorPlans.map((plan: ParsedFloorPlan) => (
                <div
                  key={plan.originalIndex}
                  className="border border-white/15 hover:border-[#B8873B]/50 bg-gradient-to-b from-[#141711] to-[#0E100C] rounded-sm overflow-hidden flex flex-col sm:flex-row group transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
                >
                  {/* Left: Blueprint Preview Canvas */}
                  <div
                    onClick={() => setActiveFloorPlanIndex(plan.originalIndex)}
                    className="relative w-full sm:w-52 md:w-56 shrink-0 h-52 sm:h-auto min-h-[220px] bg-[#181B15] p-2.5 flex items-center justify-center cursor-pointer overflow-hidden border-b sm:border-b-0 sm:border-r border-white/10 rtl:sm:border-r-0 rtl:sm:border-l"
                  >
                    <div className="relative w-full h-full bg-white/97 rounded-xs p-2 flex items-center justify-center shadow-inner">
                      <Image
                        src={getOptimizedImageUrl(plan.url, 1200)}
                        alt={isAr ? plan.modelAr : plan.modelEn}
                        fill
                        className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 240px"
                      />
                    </div>

                    {/* Top Left: Category Badge */}
                    <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 bg-black/85 backdrop-blur-sm px-2 py-0.5 font-mono text-[9px] tracking-wider text-[#E2B768] border border-[#B8873B]/40 font-bold rounded-xs shadow-sm uppercase">
                      {isAr ? plan.categoryAr : plan.categoryEn}
                    </div>

                    {/* Hover Enlarge Overlay */}
                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 bg-[#B8873B] text-[#080907] font-bold shadow-lg rounded-xs flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        {isAr ? "تكبير" : "Enlarge"}
                      </span>
                    </div>
                  </div>

                  {/* Right: Architectural Content & Specs */}
                  <div className={`p-4 flex-1 flex flex-col justify-between ${isAr ? "text-right" : ""}`}>
                    <div className="w-full">
                      {/* 1. Model Title (Full Width - No crowded price eating space) */}
                      <h3 className="font-display text-lg sm:text-xl text-[#FAF6EE] font-bold leading-tight break-words mb-2">
                        {isAr ? plan.modelAr : plan.modelEn}
                      </h3>

                      {/* 2. Compact Specs using clear native monochrome icons (Zero verbose clutter, luxury gold styling) */}
                      <div className={`flex items-center gap-2 mb-3 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
                        {plan.bedrooms && (
                          <span
                            title={isAr ? `${plan.bedrooms} غرف نوم` : `${plan.bedrooms} Bedrooms`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-xs text-xs font-bold text-[#FAF6EE] shadow-xs"
                          >
                            <svg className="w-4 h-4 text-[#C99A49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 4v16" />
                              <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                              <path d="M2 17h20" />
                              <path d="M6 8v9" />
                            </svg>
                            <span>{plan.bedrooms}</span>
                          </span>
                        )}
                        {plan.bathrooms && (
                          <span
                            title={isAr ? `${plan.bathrooms} دورات مياه` : `${plan.bathrooms} Bathrooms`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-xs text-xs font-bold text-[#FAF6EE] shadow-xs"
                          >
                            <svg className="w-4 h-4 text-[#C99A49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-1.5C4.7 2 4 2.7 4 3.5V5" />
                              <path d="M2 12h20" />
                              <path d="M7 12v-2a2 2 0 0 1 2-2h1" />
                              <path d="M4 12v5a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-5" />
                              <path d="m6 19-1.5 2" />
                              <path d="m18 19 1.5 2" />
                            </svg>
                            <span>{plan.bathrooms}</span>
                          </span>
                        )}
                        {plan.areaEn && (
                          <span
                            title={isAr ? `المساحة ${isAr ? plan.areaAr : plan.areaEn}` : `Total Area ${plan.areaEn}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#B8873B]/10 border border-[#B8873B]/35 rounded-xs text-xs font-bold text-[#E2B768] shadow-xs"
                          >
                            <svg className="w-4 h-4 text-[#C99A49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21.17 19.34 4.66 2.83A1 1 0 0 0 3 3.53V20a1 1 0 0 0 1 1h16.47a1 1 0 0 0 .7-1.66z" />
                              <path d="M7 21v-3M11 21v-2M15 21v-3" />
                            </svg>
                            <span>{isAr ? plan.areaAr : plan.areaEn}</span>
                          </span>
                        )}
                      </div>

                      {/* 3. Features Pills */}
                      {((isAr ? plan.featuresAr : plan.featuresEn) || []).length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 mb-2.5 ${isAr ? "justify-end" : ""}`}>
                          {(isAr ? plan.featuresAr : plan.featuresEn)!.map((feat: string, fIdx: number) => (
                            <span key={fIdx} className="font-sans text-[10px] sm:text-[10.5px] text-[#FAF6EE]/80 px-2 py-0.5 border border-white/15 bg-white/[0.04] rounded-xs">
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 4. Full Architectural Description - Completely Visible */}
                      {(() => {
                        const rawDesc = (isAr ? plan.captionAr : plan.captionEn) || "";
                        const modelTitle = (isAr ? plan.modelAr : plan.modelEn) || "";
                        if (!rawDesc.trim() || rawDesc.trim().toLowerCase() === modelTitle.trim().toLowerCase()) return null;
                        return (
                          <div className="my-2 p-2.5 bg-black/30 border-l-2 border-[#B8873B]/70 rtl:border-l-0 rtl:border-r-2 rounded-xs">
                            <p className="font-sans text-xs text-[#D8D0C3] leading-relaxed break-words">
                              {rawDesc}
                            </p>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 5. Bottom Price & Action Buttons */}
                    <div className="pt-3 border-t border-white/10 mt-2">
                      {(isAr ? plan.startingPriceAr : plan.startingPriceEn) && (
                        <div className={`flex items-baseline justify-between mb-2.5 ${isAr ? "flex-row-reverse" : ""}`}>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#A89F91]">
                            {isAr ? "السعر" : "Price"}
                          </span>
                          <span className="font-sans text-lg sm:text-xl font-extrabold text-[#E2B768] tracking-tight">
                            {isAr ? plan.startingPriceAr : plan.startingPriceEn}
                          </span>
                        </div>
                      )}

                      <div className={`flex items-center gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
                        <button
                          type="button"
                          onClick={() => setActiveFloorPlanIndex(plan.originalIndex)}
                          className="flex-1 py-2 font-mono text-[10px] tracking-wider uppercase border border-white/20 text-[#FAF6EE] hover:border-[#B8873B] hover:text-[#B8873B] transition-all text-center rounded-xs cursor-pointer font-medium"
                        >
                          {isAr ? "تكبير المخطط" : "View Blueprint"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInquireOnLayout(plan)}
                          className="flex-1 py-2 font-mono text-[10px] tracking-wider uppercase bg-[#B8873B] text-[#080907] hover:bg-[#c99a49] font-bold transition-all text-center rounded-xs cursor-pointer shadow-sm"
                        >
                          {isAr ? "طلب حجز النموذج" : "Inquire Layout"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── 5. VISUAL PAYMENT PLAN IMAGE GALLERY (LAYOUT-SPECIFIC PAYMENT PLANS) ── */}
      {hasPaymentImages && (
        <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-[#080907]">
          <div className="max-w-6xl mx-auto">
            
            <div className={`mb-6 ${isAr ? "text-right" : ""}`}>
              <span className="font-mono text-[9.5px] tracking-[0.25em] uppercase text-[#C99A49] block mb-1 font-bold">
                {isAr ? "خطط السداد لكل نموذج" : "Payment Plans by Layout"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#FAF6EE] font-bold mb-1.5">
                {isAr ? "خطط السداد المخصصة لكل نموذج" : "Payment Plans for Each Layout"}
              </h2>
              <p className="font-sans text-xs sm:text-[13px] text-[#A89F91] max-w-xl">
                {isAr
                  ? "جداول وهياكل دفعات مخصصة ومطابقة لكل نموذج سكني مع تفاصيل دفعات الإسكرو والأقساط."
                  : "Tailored payment structures, installment milestones, and escrow terms customized for each unit layout."}
              </p>
            </div>

            {/* Visual Payment Plan Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paymentPlanImages.map((planImg, idx) => {
                const titleText = (isAr ? planImg.titleAr : planImg.titleEn) || (isAr ? `خطة سداد النموذج 0${idx + 1}` : `Layout Payment Plan 0${idx + 1}`);

                return (
                  <div
                    key={idx}
                    onClick={() => setActivePaymentPlanIndex(idx)}
                    className="border border-white/15 hover:border-[#B8873B]/60 bg-gradient-to-b from-[#141711] to-[#0E100C] rounded-xs overflow-hidden group transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)] cursor-pointer flex flex-col"
                  >
                    {/* Image Canvas with hover zoom */}
                    <div className="relative w-full h-56 sm:h-64 bg-[#181B15] p-2.5 flex items-center justify-center overflow-hidden border-b border-white/10">
                      <div className="relative w-full h-full bg-white/95 rounded-xs p-2 flex items-center justify-center shadow-inner">
                        <Image
                          src={getOptimizedImageUrl(planImg.url, 1200)}
                          alt={titleText}
                          fill
                          className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      {/* Hover Enlarge Badge */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase px-3.5 py-1.5 bg-[#B8873B] text-[#080907] font-bold shadow-lg rounded-xs flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                          {isAr ? "تكبير الخطة" : "Enlarge Plan"}
                        </span>
                      </div>
                    </div>

                    {/* Architectural Layout Payment Card Bar */}
                    <div className={`p-4 bg-[#12140F] flex flex-col justify-between flex-1 gap-2.5 ${isAr ? "text-right" : ""}`}>
                      <div>
                        <span className="inline-block font-mono text-[8.5px] tracking-wider uppercase text-[#C99A49] bg-[#B8873B]/10 border border-[#B8873B]/30 px-2 py-0.5 rounded-xs mb-1.5 font-semibold">
                          {isAr ? `خطة سداد النموذج 0${idx + 1}` : `Layout Payment Plan 0${idx + 1}`}
                        </span>
                        <h4 className="font-sans text-xs sm:text-sm text-[#FAF6EE] font-semibold line-clamp-2 leading-snug">
                          {titleText}
                        </h4>
                      </div>
                      <div className={`flex items-center justify-between pt-2 border-t border-white/10 ${isAr ? "flex-row-reverse" : ""}`}>
                        <span className="font-mono text-[9px] text-[#A89F91] uppercase tracking-wider">
                          {isAr ? "مخطط سداد تفصيلي" : "Full Payment Breakdown"}
                        </span>
                        <span className="font-mono text-[10px] text-[#E2B768] group-hover:text-white transition-colors font-bold flex items-center gap-1">
                          {isAr ? "عرض الخطة ←" : "View Plan →"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ── 6. AMENITIES & LIFESTYLE FACILITIES (ZERO EMOJIS, CLEAN LUXURY) ── */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="py-14 sm:py-18 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-[#0C0E0A]">
          <div className="max-w-6xl mx-auto">
            <div className={`mb-8 ${isAr ? "text-right" : ""}`}>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C99A49] block mb-1 font-semibold">
                {isAr ? "المرافق والخدمات الحصرية" : "Lifestyle & Amenities"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#FAF6EE]">
                {isAr ? "مرافق عالمية صممت لرفاهيتك" : "Curated Facilities & Wellness"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.amenities.map((am, i) => {
                const cleanTitle = stripEmojis(isAr ? am.titleAr : am.titleEn);
                const cleanDesc = stripEmojis(isAr ? am.descAr : am.descEn);

                return (
                  <div
                    key={i}
                    className={`p-5 border border-white/15 bg-[#12140F] rounded-xs hover:border-[#B8873B]/40 transition-colors shadow-sm ${
                      isAr ? "text-right" : ""
                    }`}
                  >
                    <h3 className="font-display text-base sm:text-lg text-[#FAF6EE] mb-2 font-semibold">
                      {cleanTitle}
                    </h3>
                    <p className="font-sans text-xs sm:text-[13px] text-[#A89F91] leading-relaxed">
                      {cleanDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. LOCATION & STRATEGIC LANDMARKS ──────────────────────────────── */}
      <section className="py-14 sm:py-18 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-[#080907]">
        <div className="max-w-6xl mx-auto">
          <div className={`mb-8 ${isAr ? "text-right" : ""}`}>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C99A49] block mb-1 font-semibold">
              {isAr ? "الموقع الاستراتيجي والمعالم" : "Strategic Location"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#FAF6EE]">
              {isAr
                ? `${project.cityAr || project.cityEn} — ${project.districtAr || project.districtEn}`
                : `${project.districtEn || project.districtAr}, ${project.cityEn || project.cityAr}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Interactive Map Embed */}
            <div className="lg:col-span-7 h-68 sm:h-84 lg:h-[380px] relative overflow-hidden border border-white/15 rounded-xs bg-[#12140F] shadow-lg">
              {mapEmbedSrc ? (
                <iframe
                  src={mapEmbedSrc}
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
                  <p className="font-mono text-xs uppercase tracking-widest text-[#B8873B] mb-1">
                    {isAr ? "خريطة الموقع" : "Location Map"}
                  </p>
                  <p className="font-sans text-xs text-[#A89F91]">
                    {isAr
                      ? `${project.cityAr || project.cityEn} ، ${project.districtAr || project.districtEn}`
                      : `${project.districtEn || project.districtAr}, ${project.cityEn || project.cityAr}`}
                  </p>
                </div>
              )}
            </div>

            {/* Proximity Landmarks List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-5 border border-[#B8873B]/25 bg-[#12140F] rounded-xs shadow-sm">
                <h3 className={`font-mono text-[9.5px] tracking-[0.25em] uppercase text-[#E2B768] mb-3 font-bold ${isAr ? "text-right" : ""}`}>
                  {isAr ? "المسافات والمعالم القريبة" : "Nearby Key Landmarks"}
                </h3>

                <div className="space-y-2.5">
                  {project.landmarks && project.landmarks.length > 0 ? (
                    project.landmarks.map((lm, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-2.5 border-b border-white/5 last:border-0 ${isAr ? "flex-row-reverse text-right" : ""}`}
                      >
                        <span className="font-sans text-xs sm:text-[13px] text-[#FAF6EE] font-medium">
                          {isAr ? lm.nameAr || lm.nameEn : lm.nameEn || lm.nameAr}
                        </span>
                        <span className="font-mono text-[9.5px] sm:text-[10px] text-[#E2B768] px-2 py-0.5 border border-[#B8873B]/35 bg-[#B8873B]/10 rounded-xs font-bold shrink-0">
                          {isAr ? lm.distAr || lm.distEn : lm.distEn || lm.distAr}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="font-sans text-xs text-[#A89F91]">
                      {isAr ? "يقع بالقرب من أهم المحاور الرئيسية والمراكز الحيوية." : "Strategically connected to major arterial roads and metro links."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. BROCHURE DOWNLOAD BANNER ────────────────────────────────────── */}
      {brochureUrl && (
        <section className="py-12 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-[#0C0E0A]">
          <div className="max-w-3xl mx-auto p-6 sm:p-8 border border-[#B8873B]/35 bg-[#12140F] rounded-xs text-center shadow-lg">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C99A49] mb-1.5 block font-semibold">
              {isAr ? "ملف المشروع والمخططات" : "Investment Factsheet"}
            </span>
            <h2 className="font-display text-xl sm:text-2xl text-[#FAF6EE] mb-2.5">
              {isAr ? "تحميل الكتيب الرسمي والمخططات الهندسية" : "Download Official Floor Plans & Brochure"}
            </h2>
            <p className="font-sans text-xs text-[#A89F91] max-w-md mx-auto mb-5">
              {isAr
                ? "احصل على المستندات التفصيلية الكاملة وجداول المساحات ونماذج التشطيب المعتمدة."
                : "Get access to complete architectural layouts, finishing specifications, and payment breakdown schedules."}
            </p>

            <button
              type="button"
              onClick={() => setShowBrochureModal(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold border border-[#B8873B] bg-[#B8873B] text-[#080907] hover:bg-[#c99a49] transition-all duration-300 shadow-md cursor-pointer rounded-xs"
            >
              <span>{isAr ? "تحميل البروشور (PDF)" : "Download Brochure (PDF)"}</span>
              {project.brochureSizeEn && (
                <span className="opacity-80 text-[9px]">({isAr ? project.brochureSizeAr : project.brochureSizeEn})</span>
              )}
            </button>
          </div>
        </section>
      )}

      {/* ── 9. DEDICATED INQUIRY VIP FORM (STREAMLINED 2-COLUMN LUXURY) ───── */}
      <section id="section-inquiry" className="py-10 sm:py-14 px-4 sm:px-8 lg:px-16 bg-[#080907] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ── LEFT PART: Architectural Image & Value Proposition Text ───── */}
            <div className={`lg:col-span-5 flex flex-col justify-between space-y-6 ${isAr ? "text-right" : ""}`}>
              <div>
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#C99A49] block mb-2 font-bold">
                  {isAr ? "حجز استشارة خاصة وتخصيص مباشر" : "Priority Allocation & Advisory"}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-[#FAF6EE] mb-3 leading-tight">
                  {isAr ? `استفسار عن ${project.nameAr}` : `Inquire About ${project.nameEn}`}
                </h2>
                <p className="font-sans text-xs sm:text-[13px] text-[#A89F91] leading-relaxed mb-5">
                  {isAr
                    ? "احصل على استشارة استثمارية خاصة من فريق أصاهيب العقارية المرخص للاطلاع على أحدث المخططات، خطط السداد الدقيقة، وحجز أفضل الوحدات المتاحة مباشرة."
                    : "Connect directly with our licensed Asaheeb portfolio advisors to access verified real-time availability, customized installment structures, and priority unit allocations."}
                </p>

                {/* Featured Architectural Project Image Card */}
                {images.length > 0 && (
                  <div className="relative h-48 sm:h-56 w-full rounded-sm overflow-hidden border border-white/15 shadow-xl mb-6 group">
                    <Image
                      src={getOptimizedImageUrl(images[0].url, 800)}
                      alt={isAr ? project.nameAr : project.nameEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className={`absolute bottom-3 left-3 right-3 flex items-center justify-between text-white ${isAr ? "flex-row-reverse" : ""}`}>
                      <span className="font-mono text-[9px] tracking-wider uppercase bg-black/75 backdrop-blur-xs text-[#E2B768] px-2.5 py-1 border border-[#B8873B]/40 rounded-xs font-bold">
                        {isAr ? `${project.districtAr} · ${project.cityAr}` : `${project.districtEn}, ${project.cityEn}`}
                      </span>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-white/80 font-medium">
                        {isAr ? "حساب ضمان وافي" : "Wafi Escrow"}
                      </span>
                    </div>
                  </div>
                )}

                {/* VIP Investor Guarantees & Benefits */}
                <div className="space-y-3 p-4 bg-[#12140F] border border-white/10 rounded-sm">
                  <h4 className="font-mono text-[9.5px] uppercase tracking-wider text-[#E2B768] font-bold">
                    {isAr ? "مزايا الحجز والاستشارة مع أصاهيب" : "Why Inquire Through Asaheeb"}
                  </h4>
                  <div className="space-y-2 text-xs text-[#FAF6EE]/85 font-sans">
                    <div className={`flex items-start gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
                      <span className="text-[#C99A49] text-sm leading-none shrink-0 font-bold">✓</span>
                      <span>{isAr ? "أسعار المطور الرسمية المباشرة بدون أي عمولة أو سعي." : "Direct developer pricing with zero brokerage fees or markups."}</span>
                    </div>
                    <div className={`flex items-start gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
                      <span className="text-[#C99A49] text-sm leading-none shrink-0 font-bold">✓</span>
                      <span>{isAr ? "أولوية تخصيص الوحدات المميزة والإطلالات الخاصة." : "Priority allocation for top-tier views and premium penthouse layouts."}</span>
                    </div>
                    <div className={`flex items-start gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
                      <span className="text-[#C99A49] text-sm leading-none shrink-0 font-bold">✓</span>
                      <span>{isAr ? "مستشار عقاري مرخص من الهيئة العامة للعقار (فال)." : "Accredited advisor certified by the General Authority for Real Estate (REGA)."}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT PART: Vertical Form Layout ───────────────────────────── */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 sm:p-10 border border-[#B8873B]/50 bg-[#12140F] text-center space-y-4 rounded-sm shadow-xl">
                  <div className="w-14 h-14 rounded-full bg-[#B8873B] text-[#080907] flex items-center justify-center text-2xl mx-auto font-bold shadow-lg">
                    ✓
                  </div>
                  <h3 className="font-display text-2xl text-[#FAF6EE]">
                    {isAr ? "تم استلام طلبكم بنجاح" : "Inquiry Received Successfully"}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#D4CDC1] max-w-md mx-auto leading-relaxed">
                    {isAr
                      ? "شكراً لاهتمامكم. سيقوم مستشار أصاهيب العقاري بالتواصل معكم فوراً لتزويدكم بكافة التفاصيل."
                      : "Thank you for reaching out. An Asaheeb investment advisor will contact you shortly with full documentation."}
                  </p>
                  <div className="pt-3">
                    <a
                      href={getProjectWhatsAppLink(project.nameEn, project.nameAr, isAr)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[10.5px] tracking-widest uppercase text-[#080907] bg-[#25D366] hover:bg-[#20bd5a] font-bold rounded-xs shadow-md transition-all"
                    >
                      <span>{isAr ? "متابعة المحادثة عبر واتساب" : "Continue Chat on WhatsApp"}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#12140F] p-6 sm:p-8 border border-white/15 rounded-sm shadow-xl space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans text-center rounded-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Clean Vertical Form Fields */}
                  <div>
                    <label className={labelClass}>{isAr ? "الاسم الكامل *" : "Full Name *"}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder={isAr ? "سلطان القحطاني" : "e.g. Abdullah Al-Otaibi"}
                      className={inputClass("name")}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>{isAr ? "رقم الهاتف / الواتساب *" : "Phone / WhatsApp Number *"}</label>
                    <PhoneInputWithCountry
                      value={form.phone}
                      onChange={(val) => setForm({ ...form, phone: val })}
                      isAr={isAr}
                      required
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
                      placeholder="name@domain.com"
                      className={inputClass("email")}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>{isAr ? "الميزانية التقريبية" : "Approximate Budget"}</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-[#0A0C08] border border-[#B8873B]/20 px-3.5 py-2.5 text-xs font-sans text-[#FAF6EE] focus:outline-none focus:border-[#B8873B] rounded-xs"
                    >
                      <option value="">{isAr ? "اختر نطاق الميزانية" : "Select budget range"}</option>
                      <option value="under_1m">{isAr ? "أقل من ١ مليون ريال" : "Under SAR 1M"}</option>
                      <option value="1m_2m">{isAr ? "١ – ٢ مليون ريال" : "SAR 1M – 2M"}</option>
                      <option value="2m_4m">{isAr ? "٢ – ٤ مليون ريال" : "SAR 2M – 4M"}</option>
                      <option value="above_4m">{isAr ? "أكثر من ٤ مليون ريال" : "Above SAR 4M"}</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>{isAr ? "ملاحظات أو استفسار خاص" : "Inquiry / Requirements"}</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder={
                        isAr
                          ? "هل ترغب في معرفة المخططات أو خطط التقسيط الخاصة بنموذج معين؟"
                          : "Interested in payment plan breakdown or specific unit layout?"
                      }
                      className={inputClass("message")}
                    />
                  </div>

                  {/* Actions & Privacy */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 font-mono text-[10.5px] sm:text-[11px] tracking-[0.2em] uppercase font-bold border border-[#B8873B] bg-[#B8873B] text-[#080907] hover:bg-[#c99a49] transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-md rounded-xs"
                    >
                      {isSubmitting
                        ? isAr ? "جاري الإرسال..." : "Submitting..."
                        : isAr ? "إرسال طلب الاستفسار" : "Submit Priority Inquiry"}
                    </button>

                    <a
                      href={getProjectWhatsAppLink(project.nameEn, project.nameAr, isAr)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-2 py-3 font-mono text-[10px] sm:text-[10.5px] tracking-[0.16em] uppercase font-semibold border border-[#25D366]/40 text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all duration-300 rounded-xs ${isAr ? "flex-row-reverse" : ""}`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>{isAr ? "استفسار مباشر عبر واتساب" : "Direct WhatsApp Inquiry"}</span>
                    </a>

                    {/* Privacy Badge */}
                    <div className={`flex items-center justify-center gap-1.5 text-[#A89F91] pt-1 ${isAr ? "flex-row-reverse" : ""}`}>
                      <svg className="w-3 h-3 text-[#B8873B] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <span className="font-sans text-[10px]">
                        {isAr ? "بياناتك مشفرة ومحمية بخصوصية وسرية تامة." : "Your information is strictly encrypted, confidential & never shared."}
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. SIMILAR LUXURY DEVELOPMENTS SHOWCASE (NEW AT BOTTOM) ───────── */}
      {similarProjects.length > 0 && (
        <section className="py-14 sm:py-18 px-4 sm:px-8 lg:px-16 border-b border-white/10 bg-[#0C0E0A]">
          <div className="max-w-6xl mx-auto">
            <div className={`mb-8 ${isAr ? "text-right" : ""}`}>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C99A49] block mb-1 font-semibold">
                {isAr ? "مشاريع مماثلة مختارة" : "Curated Portfolio"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#FAF6EE]">
                {isAr ? "استكشف المزيد من العقارات المميزة" : "Explore Similar Developments"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {similarProjects.map((sim) => {
                const simImg = sim.images?.[0]?.url || "https://www.asaheebrealestate.com/images/og-image.jpg";
                return (
                  <Link
                    key={sim.id}
                    href={`/projects/${sim.id}`}
                    prefetch={false}
                    className="border border-white/15 bg-[#12140F] rounded-xs overflow-hidden group hover:border-[#B8873B]/50 transition-all flex flex-col shadow-sm"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-black">
                      <Image
                        src={getOptimizedImageUrl(simImg, 800)}
                        alt={isAr ? sim.nameAr : sim.nameEn}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs px-2 py-0.5 font-mono text-[8.5px] tracking-wider text-[#E2B768] border border-[#B8873B]/40 uppercase font-bold rounded-xs">
                        {isAr ? `${sim.cityAr} · ${sim.districtAr}` : `${sim.districtEn}, ${sim.cityEn}`}
                      </div>
                    </div>

                    <div className={`p-4 flex-1 flex flex-col justify-between ${isAr ? "text-right" : ""}`}>
                      <div>
                        <h3 className="font-display text-sm sm:text-base text-[#FAF6EE] mb-1 font-medium group-hover:text-[#E2B768] transition-colors">
                          {isAr ? sim.nameAr : sim.nameEn}
                        </h3>
                        <p className="font-sans text-[11px] text-[#A89F91] line-clamp-1 mb-4">
                          {isAr ? sim.overviewAr : sim.overviewEn}
                        </p>
                      </div>

                      <div className={`flex items-center justify-between pt-2.5 border-t border-white/10 font-mono text-[10.5px] sm:text-xs ${isAr ? "flex-row-reverse" : ""}`}>
                        <span className="text-[#FAF6EE] font-bold text-xs sm:text-[13px]">
                          {isAr ? sim.startingPriceAr : sim.startingPriceEn}
                        </span>
                        <span className="text-[#E2B768] font-semibold group-hover:translate-x-1 transition-transform">
                          {isAr ? "التفاصيل" : "View Details"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── MODALS & LIGHTBOXES (Z-[9999] TO ALWAYS SIT ON TOP OF NAV Z-[200]) ─ */}

      {/* 1. Floor Plan Fullscreen Lightbox Modal */}
      {activeFloorPlanIndex !== null && rawFloorPlans.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-4 sm:p-6 select-none touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={createTouchEndHandler(handleNextFloorPlan, handlePrevFloorPlan)}
        >
          {/* Explicit Fullscreen Backdrop - clicking anywhere closes */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
            onClick={() => {
              setFloorPlanZoomScale(1);
              setActiveFloorPlanIndex(null);
            }}
          />

          {/* Prominent Floating Close Button in Top Right with z-[10000] */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFloorPlanZoomScale(1);
              setActiveFloorPlanIndex(null);
            }}
            className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[10000] flex items-center gap-1.5 px-4 py-2 bg-black/90 hover:bg-[#B8873B] text-[#FAF6EE] hover:text-[#080907] border border-white/30 hover:border-[#B8873B] rounded-full font-mono text-[11px] tracking-wider uppercase transition-all shadow-2xl cursor-pointer font-bold group"
          >
            <svg className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            <span>{isAr ? "إغلاق" : "Close"}</span>
          </button>

          {/* Top Bar with Info */}
          <div
            className={`relative z-10 w-full max-w-4xl flex items-start justify-between text-white/90 pt-2 gap-4 ${
              isAr ? "flex-row-reverse" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex-1 min-w-0 ${isAr ? "text-right" : ""}`}>
              <div className={`flex items-center gap-2 mb-1 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="font-mono text-[10px] text-[#E2B768] font-bold">
                  {isAr
                    ? `مخطط ${activeFloorPlanIndex + 1} من ${rawFloorPlans.length}`
                    : `Layout ${activeFloorPlanIndex + 1} of ${rawFloorPlans.length}`}
                </span>
                {(isAr
                  ? parsedFloorPlans[activeFloorPlanIndex]?.categoryAr
                  : parsedFloorPlans[activeFloorPlanIndex]?.categoryEn) && (
                  <span className="font-mono text-[9px] tracking-wider uppercase text-[#FAF6EE] bg-white/10 border border-white/20 px-2 py-0.5 rounded-xs">
                    {isAr ? parsedFloorPlans[activeFloorPlanIndex]?.categoryAr : parsedFloorPlans[activeFloorPlanIndex]?.categoryEn}
                  </span>
                )}
                {(isAr
                  ? parsedFloorPlans[activeFloorPlanIndex]?.startingPriceAr
                  : parsedFloorPlans[activeFloorPlanIndex]?.startingPriceEn) && (
                  <span className="font-mono text-[9.5px] font-bold text-[#E2B768] bg-[#B8873B]/20 border border-[#B8873B]/40 px-2 py-0.5 rounded-xs">
                    {isAr ? parsedFloorPlans[activeFloorPlanIndex]?.startingPriceAr : parsedFloorPlans[activeFloorPlanIndex]?.startingPriceEn}
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFloorPlanZoomScale((prev) => (prev > 1 ? 1 : 2));
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider font-bold border transition-all cursor-pointer ${
                    floorPlanZoomScale > 1
                      ? "bg-[#B8873B] text-[#080907] border-[#B8873B]"
                      : "bg-white/10 text-[#E2B768] border-[#B8873B]/50 hover:bg-white/20"
                  }`}
                  aria-label={floorPlanZoomScale > 1 ? "Reset zoom" : "Zoom blueprint"}
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    {floorPlanZoomScale === 1 ? (
                      <>
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </>
                    ) : (
                      <line x1="8" y1="11" x2="14" y2="11" />
                    )}
                  </svg>
                  <span>{floorPlanZoomScale > 1 ? (isAr ? "1x ضبط" : "1x Reset") : (isAr ? "2x تكبير" : "2x Zoom")}</span>
                </button>
              </div>
              <h3 className="font-display text-base sm:text-lg text-[#FAF6EE] font-bold leading-snug break-words">
                {isAr
                  ? parsedFloorPlans[activeFloorPlanIndex]?.modelAr || rawFloorPlans[activeFloorPlanIndex]?.captionAr || project.nameAr
                  : parsedFloorPlans[activeFloorPlanIndex]?.modelEn || rawFloorPlans[activeFloorPlanIndex]?.captionEn || project.nameEn}
              </h3>
              {/* Full Detailed Description in Blueprint Lightbox */}
              {(() => {
                const plan = parsedFloorPlans[activeFloorPlanIndex];
                const rawDesc = (isAr ? plan?.captionAr : plan?.captionEn) || (isAr ? rawFloorPlans[activeFloorPlanIndex]?.captionAr : rawFloorPlans[activeFloorPlanIndex]?.captionEn) || "";
                const modelTitle = (isAr ? plan?.modelAr : plan?.modelEn) || "";
                if (!rawDesc.trim() || rawDesc.trim().toLowerCase() === modelTitle.trim().toLowerCase()) return null;
                return (
                  <p className="font-sans text-xs text-[#D4CDC1] mt-1 leading-relaxed break-words">
                    {rawDesc}
                  </p>
                );
              })()}
            </div>
            <span className="font-mono text-[9px] text-[#A89F91] tracking-widest uppercase hidden sm:block shrink-0 pr-24 rtl:pr-0 rtl:pl-24">
              {isAr ? "ESC للإغلاق" : "ESC to close"}
            </span>
          </div>

          {/* Main Blueprint Stage with touch pinch, pan across all edges & double-tap zoom */}
          <ZoomableLightboxStage
            src={getOptimizedImageUrl(rawFloorPlans[activeFloorPlanIndex].url, 1600)}
            alt="Floor plan full view"
            priority
            scale={floorPlanZoomScale}
            onScaleChange={setFloorPlanZoomScale}
            onNext={handleNextFloorPlan}
            onPrev={handlePrevFloorPlan}
            isAr={isAr}
            bgWhite={true}
            stageClassName="max-w-4xl h-[55vh] sm:h-[65vh] my-3"
            imageClassName="object-contain p-2"
          />

          {/* Navigation Controls & Inquiry CTA */}
          <div
            className={`relative z-10 w-full max-w-4xl flex items-center justify-between gap-3 ${isAr ? "flex-row-reverse" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handlePrevFloorPlan}
              className="px-4 py-2 border border-white/20 text-[#FAF6EE] hover:border-[#B8873B] hover:text-[#B8873B] font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer rounded-xs font-medium"
            >
              ← {isAr ? "السابق" : "Prev"}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFloorPlanZoomScale((prev) => (prev > 1 ? 1 : 2))}
                className={`px-3 py-1.5 border font-mono text-[10px] tracking-wider uppercase transition-all rounded-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md ${
                  floorPlanZoomScale > 1
                    ? "bg-[#B8873B] text-[#080907] border-[#B8873B]"
                    : "bg-black/80 text-[#FAF6EE] border-white/20 hover:border-[#B8873B] hover:text-[#B8873B]"
                }`}
                aria-label={floorPlanZoomScale > 1 ? "Reset zoom" : "Zoom blueprint"}
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  {floorPlanZoomScale === 1 ? (
                    <>
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </>
                  ) : (
                    <line x1="8" y1="11" x2="14" y2="11" />
                  )}
                </svg>
                <span>{floorPlanZoomScale > 1 ? (isAr ? "1x ضبط" : "1x Reset") : (isAr ? "2x تكبير" : "2x Zoom")}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFloorPlanZoomScale(1);
                  setActiveFloorPlanIndex(null);
                  const plan = parsedFloorPlans[activeFloorPlanIndex];
                  if (plan) handleInquireOnLayout(plan);
                }}
                className="hidden sm:inline-block px-5 py-2 bg-[#B8873B] text-[#080907] font-mono text-[10px] tracking-wider uppercase font-bold hover:bg-[#c99a49] transition-all cursor-pointer rounded-xs shadow-md text-center"
              >
                {isAr ? "طلب حجز هذا النموذج" : "Inquire On This Layout"}
              </button>
            </div>

            <button
              type="button"
              onClick={handleNextFloorPlan}
              className="px-4 py-2 border border-white/20 text-[#FAF6EE] hover:border-[#B8873B] hover:text-[#B8873B] font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer rounded-xs font-medium"
            >
              {isAr ? "التالي" : "Next"} →
            </button>
          </div>
        </div>
      )}

      {/* 2. Photo Gallery Lightbox */}
      {activeImageIndex !== null && images.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-4 sm:p-6 select-none touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={createTouchEndHandler(handleNextImage, handlePrevImage)}
        >
          {/* Explicit Fullscreen Backdrop - clicking anywhere closes */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
            onClick={() => {
              setPhotoZoomScale(1);
              setActiveImageIndex(null);
            }}
          />

          {/* Prominent Floating Close Button in Top Right with z-[10000] */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPhotoZoomScale(1);
              setActiveImageIndex(null);
            }}
            className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[10000] flex items-center gap-1.5 px-4 py-2 bg-black/90 hover:bg-[#B8873B] text-[#FAF6EE] hover:text-[#080907] border border-white/30 hover:border-[#B8873B] rounded-full font-mono text-[11px] tracking-wider uppercase transition-all shadow-2xl cursor-pointer font-bold group"
          >
            <svg className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            <span>{isAr ? "إغلاق" : "Close"}</span>
          </button>

          {/* Top info bar with full caption & zoom toggle */}
          <div
            className={`relative z-10 w-full max-w-5xl flex items-start justify-between text-white/90 pt-2 gap-4 ${
              isAr ? "flex-row-reverse" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex-1 min-w-0 ${isAr ? "text-right" : ""}`}>
              <div className={`flex items-center gap-2.5 mb-1 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="font-mono text-[10px] text-[#E2B768] font-bold block">
                  {isAr
                    ? `صورة ${activeImageIndex + 1} من ${images.length}`
                    : `Photo ${activeImageIndex + 1} of ${images.length}`}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoZoomScale((prev) => (prev > 1 ? 1 : 2));
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider font-bold border transition-all cursor-pointer ${
                    photoZoomScale > 1
                      ? "bg-[#B8873B] text-[#080907] border-[#B8873B]"
                      : "bg-white/10 text-[#E2B768] border-[#B8873B]/50 hover:bg-white/20"
                  }`}
                  aria-label={photoZoomScale > 1 ? "Reset zoom" : "Zoom photo"}
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    {photoZoomScale === 1 ? (
                      <>
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </>
                    ) : (
                      <line x1="8" y1="11" x2="14" y2="11" />
                    )}
                  </svg>
                  <span>{photoZoomScale > 1 ? (isAr ? "1x ضبط" : "1x Reset") : (isAr ? "2x تكبير" : "2x Zoom")}</span>
                </button>
              </div>

              {images[activeImageIndex]?.captionEn && (
                <p className="font-sans text-sm text-[#FAF6EE] leading-snug break-words font-medium">
                  {isAr ? images[activeImageIndex].captionAr : images[activeImageIndex].captionEn}
                </p>
              )}
            </div>
            <span className="font-mono text-[9px] text-[#A89F91] tracking-widest uppercase hidden sm:block shrink-0 pr-24 rtl:pr-0 rtl:pl-24">
              {isAr ? "ESC للإغلاق" : "ESC to close"}
            </span>
          </div>

          {/* Main Stage with smooth Pinch, Pan across all corners, and Double-Tap Zoom */}
          <ZoomableLightboxStage
            src={getOptimizedImageUrl(images[activeImageIndex].url, 1600)}
            alt={isAr ? images[activeImageIndex]?.captionAr || project.nameAr : images[activeImageIndex]?.captionEn || project.nameEn}
            priority
            scale={photoZoomScale}
            onScaleChange={setPhotoZoomScale}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
            isAr={isAr}
            bgWhite={false}
            stageClassName="max-w-5xl h-[55vh] sm:h-[68vh] my-3"
            imageClassName="object-contain"
          />

          <div
            className={`relative z-10 w-full max-w-5xl flex items-center justify-between gap-3 ${isAr ? "flex-row-reverse" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handlePrevImage}
              className="px-4 py-2 border border-white/20 text-[#FAF6EE] hover:border-[#B8873B] hover:text-[#B8873B] font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer rounded-xs font-medium"
            >
              ← {isAr ? "السابق" : "Prev"}
            </button>

            {/* Bottom Zoom & Count Controls */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setPhotoZoomScale((prev) => (prev > 1 ? 1 : 2))}
                className={`px-3 py-1.5 border font-mono text-[10px] tracking-wider uppercase transition-all rounded-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md ${
                  photoZoomScale > 1
                    ? "bg-[#B8873B] text-[#080907] border-[#B8873B]"
                    : "bg-black/80 text-[#FAF6EE] border-white/20 hover:border-[#B8873B] hover:text-[#B8873B]"
                }`}
                aria-label={photoZoomScale > 1 ? "Reset zoom" : "Zoom photo"}
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  {photoZoomScale === 1 ? (
                    <>
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </>
                  ) : (
                    <line x1="8" y1="11" x2="14" y2="11" />
                  )}
                </svg>
                <span>{photoZoomScale > 1 ? (isAr ? "1x ضبط" : "1x Reset") : (isAr ? "2x تكبير" : "2x Zoom")}</span>
              </button>

              <span className="font-mono text-xs text-[#A89F91]">
                {activeImageIndex + 1} / {images.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNextImage}
              className="px-4 py-2 border border-white/20 text-[#FAF6EE] hover:border-[#B8873B] hover:text-[#B8873B] font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer rounded-xs font-medium"
            >
              {isAr ? "التالي" : "Next"} →
            </button>
          </div>
        </div>
      )}

      {/* 3. Visual Payment Plan Fullscreen Lightbox Modal */}
      {activePaymentPlanIndex !== null && paymentPlanImages.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-4 sm:p-6 select-none touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={createTouchEndHandler(handleNextPaymentPlan, handlePrevPaymentPlan)}
        >
          {/* Explicit Fullscreen Backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
            onClick={() => {
              setPaymentPlanZoomScale(1);
              setActivePaymentPlanIndex(null);
            }}
          />

          {/* Floating Close Button Top Right with z-[10000] */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPaymentPlanZoomScale(1);
              setActivePaymentPlanIndex(null);
            }}
            className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[10000] flex items-center gap-1.5 px-4 py-2 bg-black/90 hover:bg-[#B8873B] text-[#FAF6EE] hover:text-[#080907] border border-white/30 hover:border-[#B8873B] rounded-full font-mono text-[11px] tracking-wider uppercase transition-all shadow-2xl cursor-pointer font-bold group"
          >
            <svg className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            <span>{isAr ? "إغلاق" : "Close"}</span>
          </button>

          {/* Top Bar with Info */}
          <div
            className={`relative z-10 w-full max-w-4xl flex items-start justify-between text-white/90 pt-2 gap-4 ${
              isAr ? "flex-row-reverse" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex-1 min-w-0 ${isAr ? "text-right" : ""}`}>
              <div className={`flex items-center gap-2 mb-1 flex-wrap ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="font-mono text-[10px] text-[#E2B768] font-bold uppercase tracking-wider block">
                  {isAr
                    ? `خطة سداد النموذج ${activePaymentPlanIndex + 1} من ${paymentPlanImages.length}`
                    : `Layout Payment Plan ${activePaymentPlanIndex + 1} of ${paymentPlanImages.length}`}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaymentPlanZoomScale((prev) => (prev > 1 ? 1 : 2));
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider font-bold border transition-all cursor-pointer ${
                    paymentPlanZoomScale > 1
                      ? "bg-[#B8873B] text-[#080907] border-[#B8873B]"
                      : "bg-white/10 text-[#E2B768] border-[#B8873B]/50 hover:bg-white/20"
                  }`}
                  aria-label={paymentPlanZoomScale > 1 ? "Reset zoom" : "Zoom payment plan"}
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    {paymentPlanZoomScale === 1 ? (
                      <>
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </>
                    ) : (
                      <line x1="8" y1="11" x2="14" y2="11" />
                    )}
                  </svg>
                  <span>{paymentPlanZoomScale > 1 ? (isAr ? "1x ضبط" : "1x Reset") : (isAr ? "2x تكبير" : "2x Zoom")}</span>
                </button>
              </div>

              <p className="font-sans text-sm sm:text-base text-[#FAF6EE] font-semibold leading-snug break-words">
                {isAr
                  ? paymentPlanImages[activePaymentPlanIndex]?.titleAr
                  : paymentPlanImages[activePaymentPlanIndex]?.titleEn}
              </p>
              {paymentPlanImages[activePaymentPlanIndex]?.captionEn && (
                <p className="font-sans text-xs text-[#D4CDC1] mt-0.5 break-words">
                  {isAr ? paymentPlanImages[activePaymentPlanIndex].captionAr : paymentPlanImages[activePaymentPlanIndex].captionEn}
                </p>
              )}
            </div>
            <span className="font-mono text-[9px] text-[#A89F91] tracking-widest uppercase hidden sm:inline-block pr-24 rtl:pr-0 rtl:pl-24 shrink-0">
              {isAr ? "اضغط بالخارج أو زر ESC للإغلاق" : "Click outside or press ESC to close"}
            </span>
          </div>

          {/* Main Visual Image Stage with touch pinch, pan & double-tap zoom */}
          <ZoomableLightboxStage
            src={getOptimizedImageUrl(paymentPlanImages[activePaymentPlanIndex].url, 1600)}
            alt="Payment plan schedule diagram"
            priority
            scale={paymentPlanZoomScale}
            onScaleChange={setPaymentPlanZoomScale}
            onNext={handleNextPaymentPlan}
            onPrev={handlePrevPaymentPlan}
            isAr={isAr}
            bgWhite={true}
            stageClassName="max-w-4xl h-[65vh] my-auto"
            imageClassName="object-contain p-2"
          />

          {/* Navigation Controls */}
          <div
            className={`relative z-10 w-full max-w-4xl flex items-center justify-between gap-3 ${isAr ? "flex-row-reverse" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handlePrevPaymentPlan}
              className="px-4 py-2 border border-white/20 text-[#FAF6EE] hover:border-[#B8873B] hover:text-[#B8873B] font-mono text-[10.5px] tracking-wider uppercase transition-colors cursor-pointer rounded-xs font-semibold"
            >
              {isAr ? "← الخطة السابقة" : "← Previous Plan"}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaymentPlanZoomScale((prev) => (prev > 1 ? 1 : 2))}
                className={`px-3 py-1.5 border font-mono text-[10px] tracking-wider uppercase transition-all rounded-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md ${
                  paymentPlanZoomScale > 1
                    ? "bg-[#B8873B] text-[#080907] border-[#B8873B]"
                    : "bg-black/80 text-[#FAF6EE] border-white/20 hover:border-[#B8873B] hover:text-[#B8873B]"
                }`}
                aria-label={paymentPlanZoomScale > 1 ? "Reset zoom" : "Zoom payment plan"}
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  {paymentPlanZoomScale === 1 ? (
                    <>
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </>
                  ) : (
                    <line x1="8" y1="11" x2="14" y2="11" />
                  )}
                </svg>
                <span>{paymentPlanZoomScale > 1 ? (isAr ? "1x ضبط" : "1x Reset") : (isAr ? "2x تكبير" : "2x Zoom")}</span>
              </button>

              <span className="font-mono text-xs text-[#E2B768] font-bold">
                {activePaymentPlanIndex + 1} / {paymentPlanImages.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNextPaymentPlan}
              className="px-4 py-2 border border-white/20 text-[#FAF6EE] hover:border-[#B8873B] hover:text-[#B8873B] font-mono text-[10.5px] tracking-wider uppercase transition-colors cursor-pointer rounded-xs font-semibold"
            >
              {isAr ? "الخطة التالية →" : "Next Plan →"}
            </button>
          </div>
        </div>
      )}

      {/* 4. Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={isAr ? project.nameAr : project.nameEn}
        text={isAr ? project.overviewAr || project.nameAr : project.overviewEn || project.nameEn}
        url={`https://www.asaheebrealestate.com/projects/${project.id}`}
        isAr={isAr}
      />

      {/* 4. Dedicated Brochure Modal */}
      {showBrochureModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowBrochureModal(false)}
        >
          <div
            className={`bg-[#12140F] border border-[#B8873B]/50 p-6 sm:p-7 max-w-md w-full rounded-xs shadow-2xl relative ${
              isAr ? "text-right" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowBrochureModal(false)}
              className="absolute top-4 right-4 text-[#A89F91] hover:text-[#FAF6EE] text-base cursor-pointer"
            >
              ✕
            </button>

            <span className="font-mono text-[8.5px] tracking-[0.25em] uppercase text-[#E2B768] block mb-1 font-bold">
              {isAr ? "تحميل فوري للكتيب" : "Instant PDF Access"}
            </span>
            <h3 className="font-display text-lg text-[#FAF6EE] mb-1.5 font-medium">
              {isAr ? `كتيب ${project.nameAr}` : `${project.nameEn} Brochure`}
            </h3>
            <p className="font-sans text-xs text-[#A89F91] mb-5">
              {isAr
                ? "يرجى تأكيد بيانات الاتصال لبدء تحميل الكتيب الرسمي والمخططات الهندسية فوراً."
                : "Please confirm your contact details to start the direct PDF download immediately."}
            </p>

            {brochureSuccessMsg ? (
              <div className="p-3 bg-[#B8873B]/10 border border-[#B8873B] text-[#E2B768] font-sans text-xs text-center rounded-xs">
                ✓ {brochureSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleBrochureDownloadSubmit} className="space-y-3.5">
                {brochureErrorMsg && (
                  <div className="p-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans text-center rounded-xs">
                    {brochureErrorMsg}
                  </div>
                )}

                <div>
                  <label className={labelClass}>{isAr ? "الاسم الكامل *" : "Full Name *"}</label>
                  <input
                    type="text"
                    required
                    value={brochureForm.fullName}
                    onChange={(e) => setBrochureForm({ ...brochureForm, fullName: e.target.value })}
                    placeholder={isAr ? "محمد السالم" : "e.g. Sultan Al-Qasim"}
                    className={inputClass("fullName")}
                  />
                </div>

                <div>
                  <label className={labelClass}>{isAr ? "رقم الهاتف / الواتساب *" : "Phone / WhatsApp *"}</label>
                  <PhoneInputWithCountry
                    value={brochureForm.phone}
                    onChange={(val) => setBrochureForm({ ...brochureForm, phone: val })}
                    isAr={isAr}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
                  <input
                    type="email"
                    value={brochureForm.email}
                    onChange={(e) => setBrochureForm({ ...brochureForm, email: e.target.value })}
                    placeholder="name@domain.com"
                    className={inputClass("brochureEmail")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isBrochureSubmitting}
                  className="w-full py-3 font-mono text-[9.5px] tracking-[0.2em] uppercase font-bold border border-[#B8873B] bg-[#B8873B] text-[#080907] hover:bg-[#c99a49] transition-all disabled:opacity-50 cursor-pointer shadow-md rounded-xs"
                >
                  {isBrochureSubmitting
                    ? isAr ? "جاري التحميل..." : "Downloading..."
                    : isAr ? "بدء التحميل الآن (PDF)" : "Start Download Now (PDF)"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <PageFooter />
      <MobileBottomNav />
    </main>
  );
}

export default function DynamicProjectDetailClient({
  project,
  similarProjects = [],
}: {
  project: ProjectDetail | null;
  similarProjects?: ProjectDetail[];
}) {
  return (
    <LanguageProvider>
      <ProjectDetailView project={project} similarProjects={similarProjects} />
    </LanguageProvider>
  );
}
