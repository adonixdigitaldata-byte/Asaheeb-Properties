export interface ParsedFloorPlan {
  originalIndex: number;
  url: string;
  categoryEn: string;
  categoryAr: string;
  modelEn: string;
  modelAr: string;
  areaEn: string;
  areaAr: string;
  featuresEn: string[];
  featuresAr: string[];
  bedrooms?: number | string;
  bathrooms?: number | string;
  startingPriceEn?: string;
  startingPriceAr?: string;
  captionEn?: string;
  captionAr?: string;
  specsEn?: string;
  specsAr?: string;
  fullCaptionEn: string;
  fullCaptionAr: string;
}

export function stripEmojis(text?: string): string {
  if (!text) return "";
  return text
    .replace(/[\p{Extended_Pictographic}\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function parseFloorPlan(plan: any, idx: number): ParsedFloorPlan {
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

  // 5. Starting price
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

  // 6. Features tags
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
