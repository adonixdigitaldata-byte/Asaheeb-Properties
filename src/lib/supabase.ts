import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zqmrubwzhxpigncueqig.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbXJ1Ynd6aHhwaWduY3VlcWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3NjEwMjMsImV4cCI6MjEwMjMzNzAyM30.ZJvW2yLylqI8T5-5Xh3Rrb-4DYTEMmR5eN0QLfkDHso";

// Client for browser and anon reads
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client with service_role to bypass RLS for live settings, sync, and booking management
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : supabase;

