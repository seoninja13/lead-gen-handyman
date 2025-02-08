import { Service } from '@/interfaces/services'

export const mockService = (overrides?: Partial<Service>): Service => ({
  id: 'svc-001',
  title: 'Basic Handyman Service',
  description: 'General repair and maintenance services',
  base_price: 75.0,
  category: 'General Repairs',
  availability: 'Available',
  slug: 'basic-handyman',
  cities: {
    name: 'Sacramento',
    coordinates: '38.5816,-121.4944'
  },
  service_images: [
    {
      url: '/images/services/basic.jpg',
      alt_text: 'Handyman at work'
    }
  ],
  ...overrides
})
