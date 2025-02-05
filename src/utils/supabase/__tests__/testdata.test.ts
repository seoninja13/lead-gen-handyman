import {
  testCityData,
  testServiceData,
  testCityServiceData,
  testCityUpdate,
  testServiceUpdate,
  testCityServiceUpdate
} from '../__fixtures__/testdata'
import {
  isCoordinates,
  isServiceImage,
  isFAQ,
  isTestimonial,
  isMapsData
} from '@/types/database'

describe('Test Data', () => {
  describe('City Test Data', () => {
    test('should have all required fields', () => {
      expect(testCityData).toHaveProperty('name')
      expect(testCityData).toHaveProperty('slug')
      expect(testCityData).toHaveProperty('state')
      expect(testCityData).toHaveProperty('county')
      expect(testCityData).toHaveProperty('description')
      expect(testCityData).toHaveProperty('population')
      expect(testCityData).toHaveProperty('coordinates')
      expect(testCityData).toHaveProperty('meta_title')
      expect(testCityData).toHaveProperty('meta_description')
    })

    test('should have valid coordinates', () => {
      expect(isCoordinates(testCityData.coordinates)).toBe(true)
      const coordinates = testCityData.coordinates as { lat: number; lng: number }
      expect(typeof coordinates.lat).toBe('number')
      expect(typeof coordinates.lng).toBe('number')
    })

    test('should have valid update data', () => {
      expect(testCityUpdate).toHaveProperty('population')
      expect(testCityUpdate).toHaveProperty('description')
      expect(typeof testCityUpdate.population).toBe('number')
      expect(typeof testCityUpdate.description).toBe('string')
    })
  })

  describe('Service Test Data', () => {
    test('should have all required fields', () => {
      expect(testServiceData).toHaveProperty('name')
      expect(testServiceData).toHaveProperty('slug')
      expect(testServiceData).toHaveProperty('category')
      expect(testServiceData).toHaveProperty('description')
      expect(testServiceData).toHaveProperty('price_range')
      expect(testServiceData).toHaveProperty('duration')
      expect(testServiceData).toHaveProperty('meta_title')
      expect(testServiceData).toHaveProperty('meta_description')
      expect(testServiceData).toHaveProperty('images')
    })

    test('should have valid images', () => {
      expect(Array.isArray(testServiceData.images)).toBe(true)
      expect((testServiceData.images as any[]).length).toBeGreaterThan(0)
      const image = (testServiceData.images as any[])[0]
      expect(isServiceImage(image)).toBe(true)
    })

    test('should have valid update data', () => {
      expect(testServiceUpdate).toHaveProperty('price_range')
      expect(testServiceUpdate).toHaveProperty('description')
      expect(typeof testServiceUpdate.price_range).toBe('string')
      expect(typeof testServiceUpdate.description).toBe('string')
    })
  })

  describe('City Service Test Data', () => {
    test('should have all required fields', () => {
      expect(testCityServiceData).toHaveProperty('city_id')
      expect(testCityServiceData).toHaveProperty('service_id')
      expect(testCityServiceData).toHaveProperty('service_city_ca')
      expect(testCityServiceData).toHaveProperty('main_content')
      expect(testCityServiceData).toHaveProperty('features_content')
      expect(testCityServiceData).toHaveProperty('benefits_content')
      expect(testCityServiceData).toHaveProperty('service_area_content')
      expect(testCityServiceData).toHaveProperty('seo_title')
      expect(testCityServiceData).toHaveProperty('seo_description')
      expect(testCityServiceData).toHaveProperty('seo_h1')
      expect(testCityServiceData).toHaveProperty('seo_url')
      expect(testCityServiceData).toHaveProperty('service_images')
      expect(testCityServiceData).toHaveProperty('image_alt_tags')
      expect(testCityServiceData).toHaveProperty('maps_data')
      expect(testCityServiceData).toHaveProperty('faq_content')
      expect(testCityServiceData).toHaveProperty('testimonials')
      expect(testCityServiceData).toHaveProperty('structured_data')
    })

    test('should have valid service images', () => {
      expect(Array.isArray(testCityServiceData.service_images)).toBe(true)
      expect((testCityServiceData.service_images as any[]).length).toBeGreaterThan(0)
      const image = (testCityServiceData.service_images as any[])[0]
      expect(isServiceImage(image)).toBe(true)
    })

    test('should have valid maps data', () => {
      expect(isMapsData(testCityServiceData.maps_data)).toBe(true)
      const mapsData = testCityServiceData.maps_data as {
        center: { lat: number; lng: number }
        zoom: number
      }
      expect(isCoordinates(mapsData.center)).toBe(true)
      expect(typeof mapsData.zoom).toBe('number')
    })

    test('should have valid FAQ content', () => {
      expect(Array.isArray(testCityServiceData.faq_content)).toBe(true)
      expect((testCityServiceData.faq_content as any[]).length).toBeGreaterThan(0)
      const faq = (testCityServiceData.faq_content as any[])[0]
      expect(isFAQ(faq)).toBe(true)
    })

    test('should have valid testimonials', () => {
      expect(Array.isArray(testCityServiceData.testimonials)).toBe(true)
      expect((testCityServiceData.testimonials as any[]).length).toBeGreaterThan(0)
      const testimonial = (testCityServiceData.testimonials as any[])[0]
      expect(isTestimonial(testimonial)).toBe(true)
    })

    test('should have valid structured data', () => {
      const structuredData = testCityServiceData.structured_data as {
        '@type': string
        name: string
        provider: {
          '@type': string
          name: string
        }
      }
      expect(structuredData).toHaveProperty('@type')
      expect(structuredData).toHaveProperty('name')
      expect(structuredData).toHaveProperty('provider')
      expect(structuredData.provider).toHaveProperty('@type')
      expect(structuredData.provider).toHaveProperty('name')
    })

    test('should have valid update data', () => {
      expect(testCityServiceUpdate).toHaveProperty('main_content')
      expect(testCityServiceUpdate).toHaveProperty('seo_title')
      expect(typeof testCityServiceUpdate.main_content).toBe('string')
      expect(typeof testCityServiceUpdate.seo_title).toBe('string')
    })
  })
})
