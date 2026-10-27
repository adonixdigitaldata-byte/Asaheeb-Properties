-- ==============================================================================
-- ASAHEEB REAL ESTATE: BLOG SEO MANAGEMENT & METADATA EXTENSION MIGRATION
-- Target: Supabase PostgreSQL (zqmrubwzhxpigncueqig)
-- Scope: Additive schema enhancements for SEO fields on public.blogs table
-- Safety: Preserves all 26 existing blogs, titles, slugs, and content without data loss
-- ==============================================================================

-- 1. Add backward-compatible SEO columns to public.blogs
ALTER TABLE public.blogs
ADD COLUMN IF NOT EXISTS seo_title_en TEXT,
ADD COLUMN IF NOT EXISTS seo_title_ar TEXT,
ADD COLUMN IF NOT EXISTS meta_description_en TEXT,
ADD COLUMN IF NOT EXISTS meta_description_ar TEXT,
ADD COLUMN IF NOT EXISTS focus_keyword_en TEXT,
ADD COLUMN IF NOT EXISTS focus_keyword_ar TEXT,
ADD COLUMN IF NOT EXISTS secondary_keywords_en TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS secondary_keywords_ar TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS cover_image_alt_en TEXT,
ADD COLUMN IF NOT EXISTS cover_image_alt_ar TEXT,
ADD COLUMN IF NOT EXISTS seo_review_status TEXT DEFAULT 'NEEDS_REVIEW'
  CHECK (seo_review_status IN ('NEEDS_REVIEW', 'IN_PROGRESS', 'OPTIMIZED', 'NEEDS_UPDATE')),
ADD COLUMN IF NOT EXISTS seo_reviewed_at TIMESTAMPTZ;

-- 2. Ensure cover_image_url exists
ALTER TABLE public.blogs
ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

-- 3. Document new columns for CRM and backend engineers
COMMENT ON COLUMN public.blogs.seo_title_en IS 'Custom SEO title tag (English). Overrides H1 title in search snippets if set.';
COMMENT ON COLUMN public.blogs.seo_title_ar IS 'Custom SEO title tag (Arabic). Overrides H1 title in search snippets if set.';
COMMENT ON COLUMN public.blogs.meta_description_en IS 'Search engine meta description tag (English). Fallbacks to excerpt_en if null.';
COMMENT ON COLUMN public.blogs.meta_description_ar IS 'Search engine meta description tag (Arabic). Fallbacks to excerpt_ar if null.';
COMMENT ON COLUMN public.blogs.focus_keyword_en IS 'Primary target keyword in English for content scoring.';
COMMENT ON COLUMN public.blogs.focus_keyword_ar IS 'Primary target keyword in Arabic for content scoring.';
COMMENT ON COLUMN public.blogs.secondary_keywords_en IS 'Array of secondary supporting keywords in English.';
COMMENT ON COLUMN public.blogs.secondary_keywords_ar IS 'Array of secondary supporting keywords in Arabic.';
COMMENT ON COLUMN public.blogs.cover_image_alt_en IS 'Descriptive alt text for cover image in English (Google Image SEO).';
COMMENT ON COLUMN public.blogs.cover_image_alt_ar IS 'Descriptive alt text for cover image in Arabic (Google Image SEO).';
COMMENT ON COLUMN public.blogs.seo_review_status IS 'Editorial status: NEEDS_REVIEW, IN_PROGRESS, OPTIMIZED, NEEDS_UPDATE';
COMMENT ON COLUMN public.blogs.seo_reviewed_at IS 'Timestamp of the last certified SEO audit.';

-- 4. Baseline Backfill for all 26 existing blogs
-- Safely seeds initial SEO titles, meta descriptions, and image alt text from existing verified copy
UPDATE public.blogs
SET 
  seo_title_en = COALESCE(seo_title_en, title_en),
  seo_title_ar = COALESCE(seo_title_ar, title_ar),
  meta_description_en = COALESCE(meta_description_en, excerpt_en),
  meta_description_ar = COALESCE(meta_description_ar, excerpt_ar),
  cover_image_alt_en = COALESCE(cover_image_alt_en, title_en),
  cover_image_alt_ar = COALESCE(cover_image_alt_ar, title_ar),
  seo_review_status = COALESCE(seo_review_status, 'NEEDS_REVIEW');

-- 5. Targeted High-Priority Backfill: Foreign Ownership & Non-Saudi / Non-Iqama Pillar Guide
-- Target URL: https://www.asaheebrealestate.com/blog/can-foreigners-buy-property-in-saudi-arabia-2026
UPDATE public.blogs
SET 
  seo_title_en = 'Can Foreigners Buy Property in Saudi Arabia Without an Iqama? 2026 Guide',
  seo_title_ar = 'هل يحق لغير السعوديين تملك العقار دون إقامة في السعودية؟ دليل 2026',
  meta_description_en = 'Learn if non-Saudis without an Iqama can buy property in Saudi Arabia in 2026. Complete guide on REGA rules, SAR 4M Premium Residency, Absher portal, and taxes.',
  meta_description_ar = 'تعرف على شروط تملك غير السعوديين للعقار بدون إقامة لعام 2026، وضوابط الهيئة العامة للعقار، ومسار الإقامة المميزة عبر شراء عقار بقيمة 4 ملايين ريال.',
  focus_keyword_en = 'Can a non-Saudi without an Iqama buy property in Saudi Arabia',
  focus_keyword_ar = 'شروط تملك غير السعوديين للعقار بدون إقامة',
  secondary_keywords_en = ARRAY[
    'can foreigners buy property in saudi arabia',
    'saudi property ownership non residents',
    'buy apartment in jeddah without iqama',
    'saudi real estate investment foreigner 2026',
    'rega foreign property ownership rules'
  ],
  secondary_keywords_ar = ARRAY[
    'شراء عقار في السعودية للأجانب',
    'تملك العقار لغير المقيمين',
    'منصة تملك العقار لغير السعوديين',
    'الإقامة المميزة تملك عقار'
  ],
  cover_image_alt_en = 'Can foreigners buy property in Saudi Arabia without an Iqama guide 2026',
  cover_image_alt_ar = 'دليل تملك الأجانب وغير المقيمين للعقار في المملكة العربية السعودية 2026',
  seo_review_status = 'OPTIMIZED',
  seo_reviewed_at = NOW()
WHERE id = 'can-foreigners-buy-property-in-saudi-arabia-2026';
