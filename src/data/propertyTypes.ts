export interface PropertyTypeOption {
  key: string;
  value: string;
  labelEn: string;
  labelAr: string;
  iconType: "apartments" | "villas" | "commercial" | "residential" | "land" | "custom" | "all";
  descEn?: string;
  descAr?: string;
}

export const STANDARD_PROPERTY_TYPES: PropertyTypeOption[] = [
  {
    key: "Apartments",
    value: "Apartments",
    labelEn: "Apartments",
    labelAr: "شقق سكنية",
    iconType: "apartments",
    descEn: "Luxury urban residences & apartments",
    descAr: "شقق سكنية ووحدات فاخرة",
  },
  {
    key: "Villas",
    value: "Villas",
    labelEn: "Villas",
    labelAr: "فلل سكنية",
    iconType: "villas",
    descEn: "Standalone luxury villas & townhouses",
    descAr: "فلل مستقلة وتاون هاوس راقي",
  },
  {
    key: "Commercial Buildings",
    value: "Commercial Buildings",
    labelEn: "Commercial Buildings",
    labelAr: "مباني تجارية",
    iconType: "commercial",
    descEn: "Office towers, retail & commercial plazas",
    descAr: "أبراج مكتبية ومراكز تجارية",
  },
  {
    key: "Residential Buildings",
    value: "Residential Buildings",
    labelEn: "Residential Buildings",
    labelAr: "عمائر سكنية",
    iconType: "residential",
    descEn: "Multi-family residential buildings",
    descAr: "عمائر سكنية ومجمعات متكاملة",
  },
  {
    key: "Land",
    value: "Land",
    labelEn: "Land",
    labelAr: "أراضي",
    iconType: "land",
    descEn: "Prime development plots & masterplans",
    descAr: "أراضٍ ومخططات استثمارية",
  },
];

/**
 * Normalizes property type string into one of the standard keys or returns the custom string.
 */
export function normalizePropertyType(typeStr?: string | null): string {
  if (!typeStr) return "Apartments";
  const t = typeStr.trim().toLowerCase();
  if (t === "apartments" || t === "apartment" || t.includes("apartment") || t.includes("شقق") || t.includes("شقة")) {
    return "Apartments";
  }
  if (t === "villas" || t === "villa" || t.includes("villa") || t.includes("فلل") || t.includes("فيلا")) {
    return "Villas";
  }
  if (
    t === "commercial buildings" ||
    t === "commercial building" ||
    t === "commercial" ||
    t.includes("commercial") ||
    t.includes("مباني تجارية") ||
    t.includes("تجاري")
  ) {
    return "Commercial Buildings";
  }
  if (
    t === "residential buildings" ||
    t === "residential building" ||
    t.includes("residential building") ||
    t.includes("عمائر") ||
    t.includes("مجمع سكني")
  ) {
    return "Residential Buildings";
  }
  if (t === "land" || t === "lands" || t.includes("land") || t.includes("أراض") || t.includes("ارض")) {
    return "Land";
  }
  return typeStr.trim();
}

/**
 * Checks if a project matches the requested property type filter key.
 */
export function matchesPropertyType(
  project: { typeEn?: string | null; typeAr?: string | null; type_en?: string | null; type_ar?: string | null },
  filterKey: string
): boolean {
  if (!filterKey || filterKey.toLowerCase() === "all") return true;

  const rawType = project.typeEn || (project as any).type_en || project.typeAr || (project as any).type_ar || "";
  const normalizedProj = normalizePropertyType(rawType);
  const normalizedFilter = normalizePropertyType(filterKey);

  if (normalizedFilter === "Apartments") {
    return normalizedProj === "Apartments";
  }
  if (normalizedFilter === "Villas") {
    return normalizedProj === "Villas";
  }
  if (normalizedFilter === "Commercial Buildings") {
    return normalizedProj === "Commercial Buildings" || rawType.toLowerCase().includes("commercial");
  }
  if (normalizedFilter === "Residential Buildings") {
    return normalizedProj === "Residential Buildings" || rawType.toLowerCase().includes("residential");
  }
  if (normalizedFilter === "Land") {
    return normalizedProj === "Land";
  }

  return rawType.toLowerCase().trim() === filterKey.toLowerCase().trim() || normalizedProj.toLowerCase() === filterKey.toLowerCase();
}
