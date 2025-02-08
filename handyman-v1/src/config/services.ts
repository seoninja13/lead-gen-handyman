import { ServiceConfig } from '@/providers/service.provider';

export const config: ServiceConfig = {
  defaultLimit: 10,
  defaultCategory: 'Home Improvement',
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
