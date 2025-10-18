import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ppwixsyjzmwvjuwpwswp.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwd2l4c3lqem13dmp1d3B3c3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDkxMTUsImV4cCI6MjA3NjE4NTExNX0.7N6WRF3fuZFT86MhlQV-fqRmuWN7RgpLrgiSfyKNDTc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);