import { ServiceConfig } from '@/providers/service.provider';

export const config: ServiceConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  defaultLimit: 10,
  defaultCategory: 'All',
  defaultLocation: 'Greater Sacramento',
  categories: [
    'Home Repair',
    'Maintenance',
    'Installation',
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
  ],
  locations: [
    'Greater Sacramento',
    'Placerville',
    'El Dorado Hills',
    'Folsom',
    'Roseville',
  ],
};
