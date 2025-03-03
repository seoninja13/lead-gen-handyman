import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export function createSupabaseServerClient(supabaseUrl: string, supabaseKey: string) {
  return createClient<Database>(supabaseUrl, supabaseKey);
}
