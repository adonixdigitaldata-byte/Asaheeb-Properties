-- ==============================================================================
-- ASAHEEB REAL ESTATE: FOUNDER CONSULTATION & COMMUNITY MONETIZATION ENGINE
-- Target Database: Supabase PostgreSQL (zqmrubwzhxpigncueqig)
-- Architecture: 100% ISOLATED SYSTEM.
--               Does NOT touch, alter, or insert into public.leads.
--               Consultations live exclusively in their own dedicated tables
--               and distinct CRM tab.
-- ==============================================================================

-- 1. Create Enumerated Types for Consultations
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'consultation_status_enum') THEN
        CREATE TYPE public.consultation_status_enum AS ENUM (
            'PAYMENT_PENDING',
            'PAID_UNSCHEDULED',      -- Payment cleared, waiting for concierge coordination
            'SCHEDULED',             -- Meeting time, format & link confirmed with Nabeel
            'COMPLETED',             -- Session conducted successfully
            'CANCELLED_REFUNDED',    -- Refunded if unable to accommodate
            'NO_SHOW'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'consultation_meeting_mode_enum') THEN
        CREATE TYPE public.consultation_meeting_mode_enum AS ENUM (
            'ONLINE_VIDEO',          -- Google Meet / Zoom
            'IN_PERSON_OFFICE',      -- Matbouli Plaza VIP Lounge (Jeddah)
            'ON_SITE_WALKTHROUGH',   -- Direct development site meeting
            'FLEXIBLE'
        );
    END IF;
END $$;

-- 2. Function to Calculate Saturday-to-Thursday Consultation Cycle
CREATE OR REPLACE FUNCTION public.get_current_consultation_cycle()
RETURNS TEXT AS $$
DECLARE
    now_riyadh TIMESTAMP;
    dow INTEGER; -- 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    sat_date DATE;
    thu_date DATE;
BEGIN
    now_riyadh := (timezone('Asia/Riyadh', now()));
    dow := EXTRACT(DOW FROM now_riyadh);
    
    -- Work cycle runs Saturday (6) through Thursday (4). Sunday (0) is a holiday.
    IF dow = 6 THEN
        sat_date := now_riyadh::DATE;
    ELSE
        sat_date := (now_riyadh - ((dow + 1) || ' days')::INTERVAL)::DATE;
    END IF;
    
    thu_date := sat_date + INTERVAL '5 days';
    
    RETURN 'Sat ' || to_char(sat_date, 'Mon DD') || ' – Thu ' || to_char(thu_date, 'Mon DD, YYYY');
END;
$$ LANGUAGE plpgsql STABLE;

-- 3. Create Settings Table (Singleton Configuration for Fees, Cap & Scarcity)
CREATE TABLE IF NOT EXISTS public.consultation_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_active BOOLEAN NOT NULL DEFAULT true,
    consultation_title_en TEXT NOT NULL DEFAULT '1-on-1 Strategic Real Estate Advisory with Founder Nabeel',
    consultation_title_ar TEXT NOT NULL DEFAULT 'استشارة عقارية استراتيجية خاصة مع أ. نبيل (المؤسس)',
    fee_amount NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
    currency TEXT NOT NULL DEFAULT 'SAR',
    credit_multiplier NUMERIC(3, 1) NOT NULL DEFAULT 1.0, -- 1.0 = 100% refund voucher, 2.0 = 2x credit promo
    weekly_slot_capacity INTEGER NOT NULL DEFAULT 10,
    slots_booked_this_week INTEGER NOT NULL DEFAULT 0,
    operating_schedule TEXT NOT NULL DEFAULT 'SATURDAY_TO_THURSDAY', -- Saturday to Thursday
    holiday_days TEXT NOT NULL DEFAULT 'SUNDAY',                    -- Sunday holiday / off-day
    current_week_cycle TEXT NOT NULL DEFAULT 'Saturday – Thursday (Sunday Holiday)',
    overflow_mode TEXT NOT NULL DEFAULT 'NEXT_WEEK_PREBOOK',        -- 'NEXT_WEEK_PREBOOK', 'WAITLIST', 'CLOSED'
    custom_urgency_banner_en TEXT,
    custom_urgency_banner_ar TEXT,
    owner_notification_email TEXT NOT NULL DEFAULT 'nabeel@asaheebrealestate.com',
    cc_notification_email TEXT DEFAULT 'buy@asaheebrealestate.com',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 4. Seed Initial Settings Row (if table is empty)
INSERT INTO public.consultation_settings (
    is_active,
    consultation_title_en,
    consultation_title_ar,
    fee_amount,
    currency,
    credit_multiplier,
    weekly_slot_capacity,
    slots_booked_this_week,
    operating_schedule,
    holiday_days,
    current_week_cycle,
    overflow_mode,
    owner_notification_email
)
SELECT 
    true,
    '1-on-1 Strategic Real Estate Advisory with Founder Nabeel',
    'استشارة عقارية استراتيجية خاصة مع أ. نبيل (المؤسس)',
    500.00,
    'SAR',
    1.0,
    10,
    0,
    'SATURDAY_TO_THURSDAY',
    'SUNDAY',
    public.get_current_consultation_cycle(),
    'NEXT_WEEK_PREBOOK',
    'buy@asaheebrealestate.com'
WHERE NOT EXISTS (SELECT 1 FROM public.consultation_settings);

-- 4. Create Standalone Bookings & Voucher Transactions Table (NO LEADS TABLE DEPENDENCY)
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE NOT NULL,             -- e.g. 'ASB-VIP-2026-4821'
    
    -- Client Dossier
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    city_or_country TEXT DEFAULT 'Saudi Arabia',
    buyer_intent TEXT DEFAULT 'HIGH_RENTAL_YIELD',
    budget_range TEXT DEFAULT 'SAR 1M – 3M',
    preferred_meeting_mode public.consultation_meeting_mode_enum DEFAULT 'ONLINE_VIDEO',
    notes_or_questions TEXT,
    
    -- Payment & Financial Audit
    amount_paid NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
    currency TEXT NOT NULL DEFAULT 'SAR',
    payment_gateway TEXT DEFAULT 'MADA',               -- 'APPLE_PAY', 'MADA', 'CREDIT_CARD', 'MOYASAR', 'TAP'
    payment_transaction_id TEXT,
    payment_status TEXT NOT NULL DEFAULT 'SUCCESS',     -- 'PENDING', 'SUCCESS', 'FAILED'
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    
    -- Property Credit / Voucher Reconciliation
    voucher_code TEXT UNIQUE NOT NULL,                  -- e.g. 'VOUCHER-500-NBL-8921'
    credit_value NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
    voucher_status TEXT NOT NULL DEFAULT 'ACTIVE',      -- 'ACTIVE', 'REDEEMED', 'EXPIRED', 'REVOKED'
    redeemed_deal_id UUID,                              -- Deal ID when property is acquired
    redeemed_at TIMESTAMP WITH TIME ZONE,
    
    -- Executive Scheduling Details
    week_cycle TEXT NOT NULL,                           -- e.g. 'Week of Oct 28 – Nov 03'
    status public.consultation_status_enum NOT NULL DEFAULT 'PAID_UNSCHEDULED',
    scheduled_date TIMESTAMP WITH TIME ZONE,            -- Exact meeting time agreed upon
    confirmed_meeting_mode public.consultation_meeting_mode_enum,
    meeting_link_or_venue TEXT,                         -- Google Meet URL or Office Suite Address
    assigned_concierge_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    concierge_notes TEXT,                               -- Internal notes from concierge call
    
    -- Notification Timestamps
    client_email_sent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    owner_email_sent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Indexes for High-Performance Queries in CRM
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_status 
ON public.consultation_bookings(status);

CREATE INDEX IF NOT EXISTS idx_consultation_bookings_voucher 
ON public.consultation_bookings(voucher_code);

CREATE INDEX IF NOT EXISTS idx_consultation_bookings_created 
ON public.consultation_bookings(created_at DESC);

-- 6. Trigger Function to Update Weekly Slot Counter Automatically
CREATE OR REPLACE FUNCTION public.sync_consultation_slot_counter()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT' AND NEW.payment_status = 'SUCCESS') THEN
        UPDATE public.consultation_settings
        SET slots_booked_this_week = slots_booked_this_week + 1,
            updated_at = timezone('utc'::text, now())
        WHERE is_active = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_sync_consultation_slot_counter ON public.consultation_bookings;

CREATE TRIGGER trigger_sync_consultation_slot_counter
AFTER INSERT ON public.consultation_bookings
FOR EACH ROW
EXECUTE FUNCTION public.sync_consultation_slot_counter();

-- 7. Row Level Security (RLS) Policies
ALTER TABLE public.consultation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Settings Policies: Anyone can view active settings; Authenticated users (CRM Staff) can manage
CREATE POLICY "Public can view active consultation settings" 
ON public.consultation_settings FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage consultation settings" 
ON public.consultation_settings FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Bookings Policies: Public can insert new paid bookings; Authenticated CRM staff can view and update
CREATE POLICY "Public can insert consultation bookings" 
ON public.consultation_bookings FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated CRM staff can view all consultation bookings" 
ON public.consultation_bookings FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated CRM staff can update consultation bookings" 
ON public.consultation_bookings FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

COMMENT ON TABLE public.consultation_settings IS 'Configuration for Founder Consultation fee, weekly capacity, and multiplier';
COMMENT ON TABLE public.consultation_bookings IS '100% standalone VIP consultation transactions and credit vouchers. Does not touch public.leads.';
