import { createClient } from '@supabase/supabase-js';

export const supabaseConnection = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);