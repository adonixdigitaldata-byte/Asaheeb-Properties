-- ==============================================================================
-- ASAHEEB REAL ESTATE: MARKETING POPUPS & PROMOTIONS TABLE
-- Single Source of Truth for Homepage Advertising & Pre-Launch Campaign Modals
-- ==============================================================================

-- 1. Create marketing_popups table
CREATE TABLE IF NOT EXISTS public.marketing_popups (
    id TEXT PRIMARY KEY,
    is_active BOOLEAN NOT NULL DEFAULT true,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    subtitle_en TEXT,
    subtitle_ar TEXT,
    badge_en TEXT,
    badge_ar TEXT,
    image_url TEXT NOT NULL,
    target_url TEXT NOT NULL,
    cta_text_en TEXT DEFAULT 'Explore Priority Access',
    cta_text_ar TEXT DEFAULT 'استكشف أولوية الحجز',
    auto_dismiss_seconds INTEGER DEFAULT 6,
    sort_order INTEGER DEFAULT 1,
    frequency TEXT DEFAULT 'ONCE_PER_SESSION', -- 'ONCE_PER_SESSION' | 'ALWAYS' | 'ONCE_PER_DAY'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row-Level Security (RLS)
ALTER TABLE public.marketing_popups ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access (for website visitors to see active marketing popups)
DROP POLICY IF EXISTS "Allow public read access on marketing_popups" ON public.marketing_popups;
CREATE POLICY "Allow public read access on marketing_popups" 
ON public.marketing_popups 
FOR SELECT 
USING (true);

-- 4. Allow authenticated CRM / admin full access
DROP POLICY IF EXISTS "Allow authenticated full access on marketing_popups" ON public.marketing_popups;
CREATE POLICY "Allow authenticated full access on marketing_popups" 
ON public.marketing_popups 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 5. Seed / Upsert Active Fairmont Residences Pre-Launch Campaign
INSERT INTO public.marketing_popups (
    id,
    is_active,
    title_en,
    title_ar,
    subtitle_en,
    subtitle_ar,
    badge_en,
    badge_ar,
    image_url,
    target_url,
    cta_text_en,
    cta_text_ar,
    auto_dismiss_seconds,
    sort_order,
    frequency
) VALUES (
    'fairmont-residences-rua-al-madinah-launch',
    true,
    'Fairmont Residences Rua Al Madinah',
    'فيرمونت ريزيدنسز رؤى المدينة',
    'Directly adjacent to The Prophet''s Mosque • 120 Limited Branded Luxury Residences',
    'بجوار المسجد النبوي الشريف مباشرة • ١٢٠ وحدة سكنية فندقية حصرية',
    'EXCLUSIVE PRE-LAUNCH',
    'إطلاق حصري مبكر',
    'https://res.cloudinary.com/diwqmlpr/image/upload/v1788854134/asaheeb/projects/fairmont/jschdmsdvtlnqfmjbpak.png',
    '/new-launches/fairmont-residences-rua-al-madinah',
    'Explore Priority Access',
    'استكشف أولوية الحجز',
    6,
    1,
    'ONCE_PER_SESSION'
)
ON CONFLICT (id) DO UPDATE SET
    is_active = EXCLUDED.is_active,
    title_en = EXCLUDED.title_en,
    title_ar = EXCLUDED.title_ar,
    subtitle_en = EXCLUDED.subtitle_en,
    subtitle_ar = EXCLUDED.subtitle_ar,
    badge_en = EXCLUDED.badge_en,
    badge_ar = EXCLUDED.badge_ar,
    image_url = EXCLUDED.image_url,
    target_url = EXCLUDED.target_url,
    cta_text_en = EXCLUDED.cta_text_en,
    cta_text_ar = EXCLUDED.cta_text_ar,
    auto_dismiss_seconds = EXCLUDED.auto_dismiss_seconds,
    updated_at = NOW();
