import { createClient } from '@supabase/supabase-js';
export function createSupabaseServerClient(supabaseUrl, supabaseKey) {
    return createClient(supabaseUrl, supabaseKey);
}
