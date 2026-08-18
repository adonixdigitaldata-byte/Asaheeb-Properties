export interface ProjectImage {
  url: string;
  captionEn?: string;
  captionAr?: string;
}

export interface Landmark {
  nameEn: string;
  nameAr: string;
  distEn: string;
  distAr: string;
}

export interface Amenity {
  badge: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export interface Project {
  id: string; // Slug used for URL (e.g. "suhail-compound")
  name_en: string;
  name_ar: string;
  developer_en?: string;
  developer_ar?: string;
  city_en: string;
  city_ar: string;
  district_en: string;
  district_ar: string;
  starting_price_en?: string;
  starting_price_ar?: string;
  price_range_en?: string;
  price_range_ar?: string;
  size_en?: string;
  size_ar?: string;
  type_en?: string; // e.g. "Residential", "Commercial"
  type_ar?: string;
  status_en?: string; // e.g. "Off-Plan", "Under Construction", "Ready"
  status_ar?: string;
  expected_delivery_en?: string;
  expected_delivery_ar?: string;
  units_count_en?: string;
  units_count_ar?: string;
  floors_en?: string;
  floors_ar?: string;
  overview_en?: string;
  overview_ar?: string;
  highlights_en?: string[];
  highlights_ar?: string[];
  images?: ProjectImage[];
  video_url?: string;
  map_embed_url?: string;
  google_maps_url?: string;
  landmarks?: Landmark[];
  amenities?: Amenity[];
  brochure_url?: string;
  brochure_size_en?: string;
  brochure_size_ar?: string;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface BlogSection {
  heading: string;
  body: string;
  highlights?: string[];
}

export interface BlogStatBox {
  val: string;
  labelEn: string;
  labelAr: string;
}

export interface Blog {
  id: string; // Slug used for URL (e.g. "saudi-real-estate-investment-guide")
  category: "guide" | "market" | "lifestyle" | "legal" | string;
  category_en: string;
  category_ar: string;
  accent?: string; // Hex color (e.g. "#B8873B", "#7C3AED")
  date_en?: string;
  date_ar?: string;
  read_time_en?: string;
  read_time_ar?: string;
  author_en?: string;
  author_ar?: string;
  title_en: string;
  title_ar: string;
  excerpt_en?: string;
  excerpt_ar?: string;
  summary_en?: string[];
  summary_ar?: string[];
  sections_en?: BlogSection[];
  sections_ar?: BlogSection[];
  stat_box?: BlogStatBox[];
  quote_en?: string;
  quote_ar?: string;
  cover_image_url?: string;
  featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface WebsiteInquiryPayload {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  property_id?: string; // e.g. "shurfah"
  interest?: string; // e.g. "Shurfah (شرفة)" or "Apartments"
  budget?: string; // e.g. "Under SAR 1M"
  message?: string;
  source?: "WEBSITE_FORM" | "PROPERTY_INQUIRY" | "WHATSAPP";
  form_type?: string;
  notes?: string;
}

export type LeadSubmissionPayload = WebsiteInquiryPayload;

export interface ProjectDetail {
  id: string;
  nameEn: string;
  nameAr: string;
  developerEn?: string;
  developerAr?: string;
  cityEn: string;
  cityAr: string;
  districtEn: string;
  districtAr: string;
  startingPriceEn: string;
  startingPriceAr: string;
  priceRangeEn: string;
  priceRangeAr: string;
  sizeEn: string;
  sizeAr: string;
  typeEn: string;
  typeAr: string;
  statusEn: string;
  statusAr: string;
  expectedDeliveryEn?: string;
  expectedDeliveryAr?: string;
  unitsCountEn?: string;
  unitsCountAr?: string;
  floorsEn?: string;
  floorsAr?: string;
  overviewEn: string;
  overviewAr: string;
  highlightsEn: string[];
  highlightsAr: string[];
  images: ProjectImage[];
  videoUrl?: string;
  mapEmbedUrl?: string;
  googleMapsUrl?: string;
  landmarks: Landmark[];
  amenities: Amenity[];
  brochureUrl?: string;
  brochureSizeEn?: string;
  brochureSizeAr?: string;
}

export interface PostMetadata {
  id: string;
  category: string;
  categoryEn: string;
  categoryAr: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  date: string;
  dateAr: string;
  readTime: string;
  readTimeAr: string;
  accent: string;
  featured: boolean;
}

export interface BlogDetail {
  id: string;
  categoryEn: string;
  categoryAr: string;
  accent: string;
  dateEn: string;
  dateAr: string;
  readTimeEn: string;
  readTimeAr: string;
  authorEn: string;
  authorAr: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string[];
  summaryAr: string[];
  sectionsEn: BlogSection[];
  sectionsAr: BlogSection[];
  statBox?: BlogStatBox[];
  quoteEn?: string;
  quoteAr?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  source?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

