import { City, Service, CityService } from '@/types/database'

// Mock data
const mockCity: City = {
  id: 1,
  name: 'Test Sacramento',
  slug: 'test-sacramento',
  state: 'CA',
  county: 'Test Sacramento County',
  description: 'Test capital city of California',
  population: 500000,
  coordinates: { lat: 38.5816, lng: -121.4944 },
  meta_title: 'Test Sacramento Handyman Services',
  meta_description: 'Test professional handyman services in Sacramento',
  created_at: new Date().toISOString()
}

const mockService: Service = {
  id: 1,
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
  ],
  created_at: new Date().toISOString()
}

const mockCityService: CityService = {
  id: 1,
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
  },
  created_at: new Date().toISOString()
}

// Mock Supabase client
export const mockSupabaseClient = {
  from: (table: string) => {
    const builder = {
      select: (query?: string) => ({
        ...builder,
        eq: (field: string, value: any) => ({
          ...builder,
          single: () => {
            if (value === 999999) {
              return Promise.resolve({ data: null, error: new Error('Record not found') })
            }
            return Promise.resolve({ data: getMockData(table, value), error: null })
          },
          order: (field: string, options: { ascending: boolean }) => ({
            ...builder,
            data: getMockDataList(table)
          })
        }),
        order: (field: string, options: { ascending: boolean }) => ({
          ...builder,
          data: getMockDataList(table)
        }),
        single: () => Promise.resolve({ data: getMockData(table), error: null })
      }),
      insert: (data: any) => ({
        select: () => ({
          single: () => {
            if (!isValidData(table, data)) {
              return Promise.resolve({ data: null, error: new Error('Invalid data') })
            }
            const mockData = getMockData(table)
            return Promise.resolve({ 
              data: { 
                ...mockData, 
                ...data, 
                id: mockData.id,
                created_at: new Date().toISOString() 
              }, 
              error: null 
            })
          }
        })
      }),
      update: (data: any) => ({
        eq: (field: string, value: any) => ({
          select: () => ({
            single: () => {
              if (value === 999999) {
                return Promise.resolve({ data: null, error: new Error('Record not found') })
              }
              const mockData = getMockData(table)
              return Promise.resolve({ 
                data: { 
                  ...mockData, 
                  ...data, 
                  id: value 
                }, 
                error: null 
              })
            }
          })
        })
      }),
      delete: () => ({
        eq: (field: string, value: any) => {
          if (value === 999999) {
            return Promise.resolve({ error: new Error('Record not found') })
          }
          return Promise.resolve({ error: null })
        }
      }),
      eq: (field: string, value: any) => ({
        ...builder,
        order: (field: string, options: { ascending: boolean }) => ({
          ...builder,
          data: getMockDataList(table).filter((item: any) => item[field] === value)
        })
      })
    }
    return builder
  }
}

// Helper function to validate data
function isValidData(table: string, data: any): boolean {
  switch (table) {
    case 'cities':
      return Object.keys(data).length > 1 || data.name !== 'Test'
    case 'services':
      return Object.keys(data).length > 1 || data.name !== 'Test'
    case 'city_services':
      return Object.keys(data).length > 1 || data.city_id !== 1
    default:
      return false
  }
}

// Helper functions
function getMockData(table: string, id?: number): any {
  switch (table) {
    case 'cities':
      return mockCity
    case 'services':
      return mockService
    case 'city_services':
      return mockCityService
    default:
      return null
  }
}

function getMockDataList(table: string): any[] {
  switch (table) {
    case 'cities':
      return [mockCity]
    case 'services':
      return [mockService]
    case 'city_services':
      return [mockCityService]
    default:
      return []
  }
}

// Mock createClient function
export const mockCreateClient = () => mockSupabaseClient
