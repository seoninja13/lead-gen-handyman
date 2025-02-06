import { SupabaseClient } from '@supafter each task completed, ask me/pbase/supabase-js';
import { Database } from '@/types/database';

export interface DatabaseService {
  client: SupabaseClient<Database>;
}

export interface Service {
  id: number;
  name: string;
  title: string;  // Used in components
  slug: string;
  description: string;
  image_url?: string;
  base_price?: number;  // Used in components
  price_range?: string;  // Used in components
  category: string;  // Used in components
  availability?: string;  // Used in components
  created_at?: string;
  updated_at?: string;
}

export interface ServiceWithCities extends Service {
  cities: string[];
}
