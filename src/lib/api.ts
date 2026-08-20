import { supabase } from "./supabase";
import type {
  Project,
  Blog,
  ProjectDetail,
  PostMetadata,
  BlogDetail,
  WebsiteInquiryPayload,
  LeadSubmissionPayload,
} from "@/types/database";

// ─── HELPER CONVERTERS (To ensure seamless compatibility with existing UI) ────

/**
 * Converts a Supabase Project (snake_case) to the frontend ProjectDetail format (camelCase).
 * Bilateral fallback: If Arabic is missing, use English; if English is missing, use Arabic.
 */
export function mapProjectToDetail(p: Project): ProjectDetail {
  const nameEn = p.name_en || p.name_ar || "";
  const nameAr = p.name_ar || p.name_en || "";
  const cityEn = p.city_en || p.city_ar || "";
  const cityAr = p.city_ar || p.city_en || "";
  const districtEn = p.district_en || p.district_ar || "";
  const districtAr = p.district_ar || p.district_en || "";
  const developerEn = p.developer_en || p.developer_ar;
  const developerAr = p.developer_ar || p.developer_en;
  const startingPriceEn = p.starting_price_en || p.starting_price_ar || "Price on Request";
  const startingPriceAr = p.starting_price_ar || p.starting_price_en || "السعر عند الطلب";
  const priceRangeEn = p.price_range_en || p.price_range_ar || startingPriceEn || "Contact for Price";
  const priceRangeAr = p.price_range_ar || p.price_range_en || startingPriceAr || "تواصل لمعرفة السعر";
  const sizeEn = p.size_en || p.size_ar || "";
  const sizeAr = p.size_ar || p.size_en || "";
  const typeEn = p.type_en || p.type_ar || "Residential";
  const typeAr = p.type_ar || p.type_en || "سكني";
  const statusEn = p.status_en || p.status_ar || "Available";
  const statusAr = p.status_ar || p.status_en || "متاح";
  const expectedDeliveryEn = p.expected_delivery_en || p.expected_delivery_ar;
  const expectedDeliveryAr = p.expected_delivery_ar || p.expected_delivery_en;
  const unitsCountEn = p.units_count_en || p.units_count_ar;
  const unitsCountAr = p.units_count_ar || p.units_count_en;
  const floorsEn = p.floors_en || p.floors_ar;
  const floorsAr = p.floors_ar || p.floors_en;
  const overviewEn = p.overview_en || p.overview_ar || "";
  const overviewAr = p.overview_ar || p.overview_en || "";
  const highlightsEn = (p.highlights_en && p.highlights_en.length > 0) ? p.highlights_en : (p.highlights_ar || []);
  const highlightsAr = (p.highlights_ar && p.highlights_ar.length > 0) ? p.highlights_ar : (p.highlights_en || []);

  const landmarks = (Array.isArray(p.landmarks) ? p.landmarks : []).map((lm) => ({
    nameEn: lm.nameEn || lm.nameAr || "",
    nameAr: lm.nameAr || lm.nameEn || "",
    distEn: lm.distEn || lm.distAr || "",
    distAr: lm.distAr || lm.distEn || "",
  }));

  const amenities = (Array.isArray(p.amenities) ? p.amenities : []).map((am) => ({
    badge: am.badge || "",
    titleEn: am.titleEn || am.titleAr || "",
    titleAr: am.titleAr || am.titleEn || "",
    descEn: am.descEn || am.descAr || "",
    descAr: am.descAr || am.descEn || "",
  }));

  const floorPlans = Array.isArray(p.floor_plans) ? p.floor_plans : [];
  const videoItems = Array.isArray(p.video_items) ? p.video_items : [];

  return {
    id: p.id,
    nameEn,
    nameAr,
    developerEn,
    developerAr,
    cityEn,
    cityAr,
    districtEn,
    districtAr,
    startingPriceEn,
    startingPriceAr,
    priceRangeEn,
    priceRangeAr,
    sizeEn,
    sizeAr,
    typeEn,
    typeAr,
    statusEn,
    statusAr,
    expectedDeliveryEn,
    expectedDeliveryAr,
    unitsCountEn,
    unitsCountAr,
    floorsEn,
    floorsAr,
    overviewEn,
    overviewAr,
    highlightsEn,
    highlightsAr,
    images: Array.isArray(p.images) ? p.images : [],
    videoUrl: p.video_url,
    videoItems,
    paymentTermsEn: p.payment_terms_en,
    paymentTermsAr: p.payment_terms_ar,
    floorPlans,
    brochureUrlEn: p.brochure_url_en,
    brochureUrlAr: p.brochure_url_ar,
    mapEmbedUrl: p.map_embed_url,
    googleMapsUrl: p.google_maps_url,
    landmarks,
    amenities,
    brochureUrl: p.brochure_url,
    brochureSizeEn: p.brochure_size_en || p.brochure_size_ar,
    brochureSizeAr: p.brochure_size_ar || p.brochure_size_en,
  };
}

/**
 * Helper to ensure video URLs are embeddable (e.g. YouTube watch URLs converted to embed URLs)
 */
export function formatVideoEmbedUrl(url: string): string {
  if (!url) return "";
  let cleanUrl = url.trim();

  // YouTube standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID
  if (cleanUrl.includes("youtube.com/watch?v=")) {
    const videoId = cleanUrl.split("v=")[1]?.split("&")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  } else if (cleanUrl.includes("youtu.be/")) {
    const videoId = cleanUrl.split("youtu.be/")[1]?.split("?")[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  } else if (cleanUrl.includes("vimeo.com/") && !cleanUrl.includes("player.vimeo.com")) {
    const videoId = cleanUrl.split("vimeo.com/")[1]?.split("?")[0];
    if (videoId) return `https://player.vimeo.com/video/${videoId}`;
  }

  return cleanUrl;
}

/**
 * Context-aware helper to get project video list.
 * Supports new video_items array and falls back to legacy video_url field.
 */
export function getProjectVideos(project: any): Array<{ url: string; titleEn?: string; titleAr?: string }> {
  let list: Array<{ url: string; titleEn?: string; titleAr?: string }> = [];

  if (Array.isArray(project?.videoItems) && project.videoItems.length > 0) {
    list = project.videoItems;
  } else if (Array.isArray(project?.video_items) && project.video_items.length > 0) {
    list = project.video_items;
  } else {
    const singleUrl = project?.videoUrl || project?.video_url;
    if (singleUrl) {
      list = [{ url: singleUrl, titleEn: "Showcase Video", titleAr: "فيديو المشروع" }];
    }
  }

  return list
    .filter((item) => Boolean(item?.url))
    .map((item) => ({
      ...item,
      url: formatVideoEmbedUrl(item.url),
    }));
}

/**
 * Resolves the correct brochure link based on the user's active website language:
 * - If user is on Arabic website: checks brochure_url_ar -> fallback to brochure_url_en -> fallback to brochure_url
 * - If user is on English website: checks brochure_url_en -> fallback to brochure_url -> fallback to brochure_url_ar
 */
export function getProjectBrochureUrl(project: any, locale: "ar" | "en" = "en"): string | null {
  if (!project) return null;

  const urlAr = project.brochureUrlAr || project.brochure_url_ar;
  const urlEn = project.brochureUrlEn || project.brochure_url_en;
  const urlLegacy = project.brochureUrl || project.brochure_url;

  if (locale === "ar") {
    return urlAr || urlEn || urlLegacy || null;
  }

  return urlEn || urlLegacy || urlAr || null;
}

/**
 * Converts a Supabase Blog (snake_case) to the frontend PostMetadata format.
 * Bilateral fallback: If Arabic is missing, use English; if English is missing, use Arabic.
 */
export function mapBlogToMetadata(b: Blog): PostMetadata {
  const categoryEn = b.category_en || b.category_ar || b.category || "";
  const categoryAr = b.category_ar || b.category_en || b.category || "";
  const titleEn = b.title_en || b.title_ar || "";
  const titleAr = b.title_ar || b.title_en || "";
  const excerptEn = b.excerpt_en || b.excerpt_ar || "";
  const excerptAr = b.excerpt_ar || b.excerpt_en || "";
  const dateEn = b.date_en || b.date_ar || "Recently Published";
  const dateAr = b.date_ar || b.date_en || "نُشر مؤخراً";
  const readTimeEn = b.read_time_en || b.read_time_ar || "5 min read";
  const readTimeAr = b.read_time_ar || b.read_time_en || "٥ دقائق قراءة";

  return {
    id: b.id,
    category: b.category || "guide",
    categoryEn,
    categoryAr,
    titleEn,
    titleAr,
    excerptEn,
    excerptAr,
    date: dateEn,
    dateAr,
    readTime: readTimeEn,
    readTimeAr,
    accent: b.accent || "#B8873B",
    featured: Boolean(b.featured),
  };
}

/**
 * Converts a Supabase Blog (snake_case) to the frontend BlogDetail format.
 * Bilateral fallback: If Arabic is missing, use English; if English is missing, use Arabic.
 */
export function mapBlogToDetail(b: Blog): BlogDetail {
  const categoryEn = b.category_en || b.category_ar || b.category || "";
  const categoryAr = b.category_ar || b.category_en || b.category || "";
  const titleEn = b.title_en || b.title_ar || "";
  const titleAr = b.title_ar || b.title_en || "";
  const dateEn = b.date_en || b.date_ar || "";
  const dateAr = b.date_ar || b.date_en || "";
  const readTimeEn = b.read_time_en || b.read_time_ar || "";
  const readTimeAr = b.read_time_ar || b.read_time_en || "";
  const authorEn = b.author_en || b.author_ar || "Asaheeb Research Team · Riyadh, KSA";
  const authorAr = b.author_ar || b.author_en || "فريق أبحاث أصاهيب · الرياض، المملكة العربية السعودية";
  const summaryEn = (b.summary_en && b.summary_en.length > 0) ? b.summary_en : (b.summary_ar || []);
  const summaryAr = (b.summary_ar && b.summary_ar.length > 0) ? b.summary_ar : (b.summary_en || []);
  const sectionsEn = (b.sections_en && b.sections_en.length > 0) ? b.sections_en : (b.sections_ar || []);
  const sectionsAr = (b.sections_ar && b.sections_ar.length > 0) ? b.sections_ar : (b.sections_en || []);
  const quoteEn = b.quote_en || b.quote_ar;
  const quoteAr = b.quote_ar || b.quote_en;

  return {
    id: b.id,
    categoryEn,
    categoryAr,
    accent: b.accent || "#B8873B",
    dateEn,
    dateAr,
    readTimeEn,
    readTimeAr,
    authorEn,
    authorAr,
    titleEn,
    titleAr,
    summaryEn,
    summaryAr,
    sectionsEn,
    sectionsAr,
    statBox: b.stat_box,
    quoteEn,
    quoteAr,
  };
}

// ─── PROJECT QUERIES ─────────────────────────────────────────────────────────

/**
 * Fetch all published projects ordered by sort_order ascending.
 */
export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.warn("Supabase getPublishedProjects error:", error.message);
      return [];
    }

    return (data as Project[]) || [];
  } catch (err) {
    console.error("Exception fetching published projects:", err);
    return [];
  }
}

/**
 * Fetch all published projects mapped to UI-ready ProjectDetail objects directly from Supabase.
 */
export async function getPublishedProjectDetails(): Promise<ProjectDetail[]> {
  const dbProjects = await getPublishedProjects();
  return dbProjects.map(mapProjectToDetail);
}

/**
 * Fetch projects filtered by city name.
 */
export async function getProjectsByCity(cityEn: string): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .ilike("city_en", cityEn)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return (data as Project[]) || [];
  } catch (err) {
    console.error("Error fetching projects by city:", err);
    return [];
  }
}

/**
 * Fetch a single published project by its slug (`id`).
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as Project;
  } catch (err) {
    console.error("Error fetching project by slug:", err);
    return null;
  }
}

/**
 * Fetch a single published project mapped to UI-ready ProjectDetail directly from Supabase.
 */
export async function getProjectDetailBySlug(slug: string): Promise<ProjectDetail | null> {
  const dbProject = await getProjectBySlug(slug);
  if (dbProject) {
    return mapProjectToDetail(dbProject);
  }
  return null;
}

// ─── BLOG QUERIES ─────────────────────────────────────────────────────────────

/**
 * Fetch the single featured blog article (or slot #1 fallback).
 */
export async function getFeaturedBlog(): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .eq("featured", true)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn("Error fetching featured blog:", error.message);
    }

    if (data) {
      return data as Blog;
    }

    // Fallback to slot #1 published article from Supabase
    const { data: firstBlog } = await supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();

    return (firstBlog as Blog) || null;
  } catch (err) {
    console.error("Exception fetching featured blog:", err);
    return null;
  }
}

/**
 * Fetch all published articles, optionally filtered by category.
 */
export async function getPublishedBlogs(category?: string): Promise<Blog[]> {
  try {
    let query = supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (category && category !== "ALL" && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.warn("Supabase getPublishedBlogs error:", error.message);
      return [];
    }

    return (data as Blog[]) || [];
  } catch (err) {
    console.error("Exception fetching blogs:", err);
    return [];
  }
}

/**
 * Fetch all published blog post metadata directly from Supabase.
 */
export async function getPublishedPostMetadata(category?: string): Promise<PostMetadata[]> {
  const blogs = await getPublishedBlogs(category);
  return blogs.map(mapBlogToMetadata);
}

/**
 * Fetch a single blog article by slug (`id`).
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as Blog;
  } catch (err) {
    console.error("Error fetching blog by slug:", err);
    return null;
  }
}

/**
 * Fetch a single blog article detail mapped for UI display directly from Supabase.
 */
export async function getBlogDetailBySlug(slug: string): Promise<BlogDetail | null> {
  const dbBlog = await getBlogBySlug(slug);
  if (dbBlog) {
    return mapBlogToDetail(dbBlog);
  }
  return null;
}


// ─── LEAD & INQUIRY SUBMISSION ───────────────────────────────────────────────

export type { WebsiteInquiryPayload, LeadSubmissionPayload };

/**
 * Submit website lead or property inquiry to Supabase leads table with standard columns and dynamic form_data.
 */
export async function submitWebsiteLead(payload: WebsiteInquiryPayload) {
  // 1. Fetch first stage UUID dynamically from lead_stages
  const { data: stageData } = await supabase
    .from("lead_stages")
    .select("id")
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  const insertPayload: Record<string, any> = {
    name: payload.name.trim(),
    phone: payload.phone?.trim() || null,
    email: payload.email?.trim() || null,
    city: payload.city?.trim() || null,
    property_id: payload.property_id?.trim() || null,
    interest: payload.interest || payload.property_id || "General Property Inquiry",
    source: payload.source || "PROPERTY_INQUIRY",
    form_data: {
      budget: payload.budget || "",
      message: payload.message || payload.notes || "",
      project_name: payload.interest || payload.property_id || "",
      form_type: payload.form_type || payload.source || "PROPERTY_INQUIRY",
      submitted_at: new Date().toISOString(),
    },
  };

  // Only include stage_id if a valid UUID was fetched
  if (stageData?.id) {
    insertPayload.stage_id = stageData.id;
  }

  // Insert lead directly without .select().single() to allow anon insertions with RLS
  const { error } = await supabase
    .from("leads")
    .insert([insertPayload]);

  if (error) {
    console.error("Lead insertion error:", error.message);
    throw error;
  }

  // Trigger internal email route for inquiry leads (skipped for brochure downloads)
  if (!payload.skipEmail) {
    try {
      const baseUrl = typeof window !== "undefined"
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

      await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: payload.form_type || payload.source || "Website Lead",
          projectName: payload.interest || payload.property_id || "",
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          interest: payload.interest,
          budget: payload.budget,
          message: payload.message || payload.notes,
        }),
      });
    } catch (emailErr) {
      console.error("Email notification dispatch error:", emailErr);
    }
  }

  return { success: true };
}

/**
 * Backward compatibility alias for submitWebsiteLead
 */
export const submitLeadForm = submitWebsiteLead;

// ─── NEWSLETTER SUBSCRIPTIONS ────────────────────────────────────────────────

/**
 * Subscribe email directly to the newsletter_subscribers table in Supabase.
 */
export async function subscribeNewsletter({ email, source = "WEBSITE_FOOTER" }: { email: string; source?: string }) {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) throw new Error("Email is required");

  let dbRecorded = false;
  let alreadySubscribed = false;

  try {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email: cleanEmail,
          source,
          status: "SUBSCRIBED",
        },
      ]);

    if (error) {
      if (error.code === "23505" || error.message?.includes("duplicate key")) {
        alreadySubscribed = true;
        dbRecorded = true;
      } else {
        console.warn("Supabase newsletter insertion note:", error.message);
      }
    } else {
      dbRecorded = true;
    }
  } catch (err) {
    console.warn("Supabase newsletter subscription bypassed:", err);
  }

  // Send internal notification so subscriber is never lost
  try {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: alreadySubscribed ? "Newsletter Subscription (Existing)" : "Newsletter Subscription",
        name: "Newsletter Subscriber",
        email: cleanEmail,
        message: `New newsletter subscription from source: ${source}${alreadySubscribed ? " (Already on subscriber list)" : ""}`,
      }),
    });
  } catch (emailErr) {
    console.error("Newsletter email notification error:", emailErr);
  }

  return { success: true, email: cleanEmail, dbRecorded, alreadySubscribed };
}
