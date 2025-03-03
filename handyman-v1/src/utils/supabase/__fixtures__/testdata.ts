import { City, Service, CityService } from '@/types/database'

export const testCityData: Omit<City, 'id' | 'created_at'> = {
  name: 'Test Sacramento',
  slug: 'test-sacramento',
  state: 'CA',
  county: 'Test Sacramento County',
  description: 'Test capital city of California',
  population: 500000,
  coordinates: { lat: 38.5816, lng: -121.4944 },
  meta_title: 'Test Sacramento Handyman Services',
  meta_description: 'Test professional handyman services in Sacramento'
}

export const testCityUpdate: Partial<City> = {
  population: 550000,
  description: 'Updated test description for Sacramento'
}

export const testServiceData: Omit<Service, 'id' | 'created_at'> = {
  name: 'Test Gutter Cleaning',
  slug: 'test-gutter-cleaning',
  category: 'Test Maintenance',
  description: 'Test professional gutter cleaning service',
  price_range: '$100-$200',
  duration: '2-3 hours',
  meta_title: 'Test Professional Gutter Cleaning Services',
  meta_description: 'Test expert gutter cleaning services in your area',
  images: [
    {
      url: '/images/services/test-gutter-cleaning-1.jpg',
      alt: 'Test gutter cleaning service',
      width: 800,
      height: 600
    }
  ]
}

export const testServiceUpdate: Partial<Service> = {
  price_range: '$150-$250',
  description: 'Updated test description for gutter cleaning'
}

export const testCityServiceData: Omit<CityService, 'id' | 'created_at'> = {
  city_id: 1,
  service_id: 1,
  service_city_ca: 'Test Sacramento, CA',
  main_content: 'Test professional gutter cleaning in Sacramento',
  features_content: 'Test thorough cleaning, debris removal',
  benefits_content: 'Test prevent water damage, extend gutter life',
  service_area_content: 'Test serving all Sacramento neighborhoods',
  seo_title: 'Test Gutter Cleaning Sacramento CA',
  seo_description: 'Test professional gutter cleaning in Sacramento',
  seo_h1: 'Test Sacramento Gutter Cleaning Services',
  seo_url: 'test-gutter-cleaning-sacramento-ca',
  service_images: [
    {
      url: '/images/services/test-sacramento-gutter-1.jpg',
      alt: 'Test gutter cleaning in Sacramento',
      width: 800,
      height: 600
    }
  ],
  image_alt_tags: ['Test gutter cleaning service in Sacramento'],
  maps_data: {
    center: { lat: 38.5816, lng: -121.4944 },
    zoom: 12
  },
  faq_content: [
    {
      question: 'Test how often should gutters be cleaned?',
      answer: 'Test we recommend cleaning gutters twice a year.'
    }
  ],
  testimonials: [
    {
      author: 'Test John Doe',
      rating: 5,
      content: 'Test excellent service, very professional.',
      date: '2024-02-01'
    }
  ],
  structured_data: {
    '@type': 'Service',
    name: 'Test Gutter Cleaning',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Test Sacramento Handyman'
    }
  }
}

export const testCityServiceUpdate: Partial<CityService> = {
  main_content: 'Updated test content for gutter cleaning in Sacramento',
  seo_title: 'Updated Test Gutter Cleaning Sacramento CA'
}
