import { DatabaseOperations } from '@/utils/supabase/database'
import type { City, Service, CityService } from '@/types/database'

/**
 * Example usage of Cities CRUD operations
 */
async function citiesExamples() {
  // Create a new city
  const newCity: Omit<City, 'id' | 'created_at'> = {
    name: 'Sacramento',
    slug: 'sacramento',
    state: 'CA',
    county: 'Sacramento County',
    description: 'Capital city of California',
    population: 500000,
    coordinates: { lat: 38.5816, lng: -121.4944 },
    meta_title: 'Sacramento Handyman Services',
    meta_description: 'Professional handyman services in Sacramento'
  }
  const createdCity = await DatabaseOperations.Cities.create(newCity)
  console.log('Created city:', createdCity)

  // Get all cities
  const allCities = await DatabaseOperations.Cities.getAll()
  console.log('All cities:', allCities)

  // Get city by ID
  const cityById = await DatabaseOperations.Cities.getById(1)
  console.log('City by ID:', cityById)

  // Get city by slug
  const cityBySlug = await DatabaseOperations.Cities.getBySlug('sacramento')
  console.log('City by slug:', cityBySlug)

  // Update city
  const updatedCity = await DatabaseOperations.Cities.update({
    id: 1,
    population: 525000
  })
  console.log('Updated city:', updatedCity)

  // Delete city
  const deleted = await DatabaseOperations.Cities.delete(1)
  console.log('City deleted:', deleted)
}

/**
 * Example usage of Services CRUD operations
 */
async function servicesExamples() {
  // Create a new service
  const newService: Omit<Service, 'id' | 'created_at'> = {
    name: 'Gutter Cleaning',
    slug: 'gutter-cleaning',
    category: 'Maintenance',
    description: 'Professional gutter cleaning service',
    price_range: '$100-$200',
    duration: '2-3 hours',
    meta_title: 'Professional Gutter Cleaning Services',
    meta_description: 'Expert gutter cleaning services in your area',
    images: [
      {
        url: '/images/services/gutter-cleaning-1.jpg',
        alt: 'Gutter cleaning service',
        width: 800,
        height: 600
      }
    ]
  }
  const createdService = await DatabaseOperations.Services.create(newService)
  console.log('Created service:', createdService)

  // Get all services
  const allServices = await DatabaseOperations.Services.getAll()
  console.log('All services:', allServices)

  // Get service by ID
  const serviceById = await DatabaseOperations.Services.getById(1)
  console.log('Service by ID:', serviceById)

  // Get service by slug
  const serviceBySlug = await DatabaseOperations.Services.getBySlug('gutter-cleaning')
  console.log('Service by slug:', serviceBySlug)

  // Update service
  const updatedService = await DatabaseOperations.Services.update({
    id: 1,
    price_range: '$150-$250'
  })
  console.log('Updated service:', updatedService)

  // Delete service
  const deleted = await DatabaseOperations.Services.delete(1)
  console.log('Service deleted:', deleted)
}

/**
 * Example usage of CityServices CRUD operations
 */
async function cityServicesExamples() {
  // Create a new city service
  const newCityService: Omit<CityService, 'id' | 'created_at'> = {
    city_id: 1,
    service_id: 1,
    service_city_ca: 'Sacramento, CA',
    main_content: 'Professional gutter cleaning in Sacramento',
    features_content: 'Thorough cleaning, debris removal',
    benefits_content: 'Prevent water damage, extend gutter life',
    service_area_content: 'Serving all Sacramento neighborhoods',
    seo_title: 'Gutter Cleaning Sacramento CA',
    seo_description: 'Professional gutter cleaning in Sacramento',
    seo_h1: 'Sacramento Gutter Cleaning Services',
    seo_url: 'gutter-cleaning-sacramento-ca',
    service_images: [
      {
        url: '/images/services/sacramento-gutter-1.jpg',
        alt: 'Gutter cleaning in Sacramento',
        width: 800,
        height: 600
      }
    ],
    image_alt_tags: ['Gutter cleaning service in Sacramento'],
    maps_data: {
      center: { lat: 38.5816, lng: -121.4944 },
      zoom: 12
    },
    faq_content: [
      {
        question: 'How often should gutters be cleaned?',
        answer: 'We recommend cleaning gutters twice a year.'
      }
    ],
    testimonials: [
      {
        author: 'John Doe',
        rating: 5,
        content: 'Excellent service, very professional.',
        date: '2024-02-01'
      }
    ],
    structured_data: {
      '@type': 'Service',
      name: 'Gutter Cleaning',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Sacramento Handyman'
      }
    }
  }
  const createdCityService = await DatabaseOperations.CityServices.create(newCityService)
  console.log('Created city service:', createdCityService)

  // Get all city services
  const allCityServices = await DatabaseOperations.CityServices.getAll()
  console.log('All city services:', allCityServices)

  // Get city services by city ID
  const cityServices = await DatabaseOperations.CityServices.getAll(1)
  console.log('City services for city 1:', cityServices)

  // Get city services by service ID
  const serviceLocations = await DatabaseOperations.CityServices.getAll(undefined, 1)
  console.log('Locations for service 1:', serviceLocations)

  // Get city service by ID
  const cityServiceById = await DatabaseOperations.CityServices.getById(1)
  console.log('City service by ID:', cityServiceById)

  // Get city service by URL
  const cityServiceByUrl = await DatabaseOperations.CityServices.getByUrl('gutter-cleaning-sacramento-ca')
  console.log('City service by URL:', cityServiceByUrl)

  // Update city service
  const updatedCityService = await DatabaseOperations.CityServices.update({
    id: 1,
    main_content: 'Updated content for gutter cleaning in Sacramento'
  })
  console.log('Updated city service:', updatedCityService)

  // Delete city service
  const deleted = await DatabaseOperations.CityServices.delete(1)
  console.log('City service deleted:', deleted)
}

// Example error handling
async function errorHandlingExample() {
  try {
    // Try to get a non-existent city
    const city = await DatabaseOperations.Cities.getById(999)
    console.log(city)
  } catch (error) {
    console.error('Error fetching city:', error)
  }

  try {
    // Try to create a city with invalid data
    const invalidCity = {
      name: 'Test',
      // Missing required fields
    }
    // @ts-ignore - Intentionally passing invalid data
    const city = await DatabaseOperations.Cities.create(invalidCity)
    console.log(city)
  } catch (error) {
    console.error('Error creating city:', error)
  }
}

export {
  citiesExamples,
  servicesExamples,
  cityServicesExamples,
  errorHandlingExample
}
