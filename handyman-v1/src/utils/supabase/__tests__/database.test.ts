import { DatabaseOperations } from '../database'
import { mockCreateClient } from '../__mocks__/supabase'
import {
  testCityData,
  testServiceData,
  testCityServiceData,
  testCityUpdate,
  testServiceUpdate,
  testCityServiceUpdate
} from '../__fixtures__/testdata'

// Mock createClient function
jest.mock('../server', () => ({
  createClient: () => mockCreateClient()
}))

// Mock cookies() function
jest.mock('next/headers', () => {
  return {
    cookies: () => ({
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn()
    })
  }
})

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks()
})

describe('Database Operations', () => {
  describe('Cities', () => {
    let createdCityId: number

    test('should create a city', async () => {
      const city = await DatabaseOperations.Cities.create(testCityData)
      expect(city).toBeDefined()
      if (!city) throw new Error('City not created')
      expect(city.name).toBe(testCityData.name)
      expect(city.slug).toBe(testCityData.slug)
      createdCityId = city.id
    })

    test('should get all cities', async () => {
      const cities = await DatabaseOperations.Cities.getAll()
      expect(Array.isArray(cities)).toBe(true)
      expect(cities.length).toBeGreaterThan(0)
    })

    test('should get city by ID', async () => {
      const city = await DatabaseOperations.Cities.getById(createdCityId)
      expect(city).toBeDefined()
      if (!city) throw new Error('City not found')
      expect(city.id).toBe(createdCityId)
    })

    test('should get city by slug', async () => {
      const city = await DatabaseOperations.Cities.getBySlug(testCityData.slug)
      expect(city).toBeDefined()
      if (!city) throw new Error('City not found')
      expect(city.slug).toBe(testCityData.slug)
    })

    test('should update city', async () => {
      const update = { ...testCityUpdate, id: createdCityId }
      const city = await DatabaseOperations.Cities.update(update)
      expect(city).toBeDefined()
      if (!city) throw new Error('City not updated')
      expect(city.population).toBe(update.population)
      expect(city.description).toBe(update.description)
    })

    test('should delete city', async () => {
      const result = await DatabaseOperations.Cities.delete(createdCityId)
      expect(result).toBe(true)
    })
  })

  describe('Services', () => {
    let createdServiceId: number

    test('should create a service', async () => {
      const service = await DatabaseOperations.Services.create(testServiceData)
      expect(service).toBeDefined()
      if (!service) throw new Error('Service not created')
      expect(service.name).toBe(testServiceData.name)
      expect(service.slug).toBe(testServiceData.slug)
      createdServiceId = service.id
    })

    test('should get all services', async () => {
      const services = await DatabaseOperations.Services.getAll()
      expect(Array.isArray(services)).toBe(true)
      expect(services.length).toBeGreaterThan(0)
    })

    test('should get service by ID', async () => {
      const service = await DatabaseOperations.Services.getById(createdServiceId)
      expect(service).toBeDefined()
      if (!service) throw new Error('Service not found')
      expect(service.id).toBe(createdServiceId)
    })

    test('should get service by slug', async () => {
      const service = await DatabaseOperations.Services.getBySlug(testServiceData.slug)
      expect(service).toBeDefined()
      if (!service) throw new Error('Service not found')
      expect(service.slug).toBe(testServiceData.slug)
    })

    test('should update service', async () => {
      const update = { ...testServiceUpdate, id: createdServiceId }
      const service = await DatabaseOperations.Services.update(update)
      expect(service).toBeDefined()
      if (!service) throw new Error('Service not updated')
      expect(service.price_range).toBe(update.price_range)
      expect(service.description).toBe(update.description)
    })

    test('should delete service', async () => {
      const result = await DatabaseOperations.Services.delete(createdServiceId)
      expect(result).toBe(true)
    })
  })

  describe('City Services', () => {
    let createdCityServiceId: number
    let cityId: number
    let serviceId: number

    beforeAll(async () => {
      // Create city and service for testing
      const city = await DatabaseOperations.Cities.create(testCityData)
      const service = await DatabaseOperations.Services.create(testServiceData)
      if (!city || !service) throw new Error('Failed to create test data')
      cityId = city.id
      serviceId = service.id
    })

    afterAll(async () => {
      // Clean up created city and service
      await DatabaseOperations.Cities.delete(cityId)
      await DatabaseOperations.Services.delete(serviceId)
    })

    test('should create a city service', async () => {
      const cityService = await DatabaseOperations.CityServices.create({
        ...testCityServiceData,
        city_id: cityId,
        service_id: serviceId
      })
      expect(cityService).toBeDefined()
      if (!cityService) throw new Error('City service not created')
      expect(cityService.city_id).toBe(cityId)
      expect(cityService.service_id).toBe(serviceId)
      createdCityServiceId = cityService.id
    })

    test('should get all city services', async () => {
      const cityServices = await DatabaseOperations.CityServices.getAll()
      expect(Array.isArray(cityServices)).toBe(true)
      expect(cityServices.length).toBeGreaterThan(0)
    })

    test('should get city services by city ID', async () => {
      const cityServices = await DatabaseOperations.CityServices.getAll(cityId)
      expect(Array.isArray(cityServices)).toBe(true)
      expect(cityServices[0].city_id).toBe(cityId)
    })

    test('should get city services by service ID', async () => {
      const cityServices = await DatabaseOperations.CityServices.getAll(undefined, serviceId)
      expect(Array.isArray(cityServices)).toBe(true)
      expect(cityServices[0].service_id).toBe(serviceId)
    })

    test('should get city service by ID', async () => {
      const cityService = await DatabaseOperations.CityServices.getById(createdCityServiceId)
      expect(cityService).toBeDefined()
      if (!cityService) throw new Error('City service not found')
      expect(cityService.id).toBe(createdCityServiceId)
    })

    test('should get city service by URL', async () => {
      const cityService = await DatabaseOperations.CityServices.getByUrl(testCityServiceData.seo_url!)
      expect(cityService).toBeDefined()
      if (!cityService) throw new Error('City service not found')
      expect(cityService.seo_url).toBe(testCityServiceData.seo_url)
    })

    test('should update city service', async () => {
      const update = { ...testCityServiceUpdate, id: createdCityServiceId }
      const cityService = await DatabaseOperations.CityServices.update(update)
      expect(cityService).toBeDefined()
      if (!cityService) throw new Error('City service not updated')
      expect(cityService.main_content).toBe(update.main_content)
      expect(cityService.seo_title).toBe(update.seo_title)
    })

    test('should delete city service', async () => {
      const result = await DatabaseOperations.CityServices.delete(createdCityServiceId)
      expect(result).toBe(true)
    })
  })

  describe('Error Handling', () => {
    test('should handle non-existent city', async () => {
      await expect(DatabaseOperations.Cities.getById(999999)).rejects.toThrow()
    })

    test('should handle non-existent service', async () => {
      await expect(DatabaseOperations.Services.getById(999999)).rejects.toThrow()
    })

    test('should handle non-existent city service', async () => {
      await expect(DatabaseOperations.CityServices.getById(999999)).rejects.toThrow()
    })

    test('should handle invalid city data', async () => {
      // @ts-ignore - Intentionally passing invalid data
      const result = await DatabaseOperations.Cities.create({ name: 'Test' })
      expect(result).toBeNull()
    })

    test('should handle invalid service data', async () => {
      // @ts-ignore - Intentionally passing invalid data
      const result = await DatabaseOperations.Services.create({ name: 'Test' })
      expect(result).toBeNull()
    })

    test('should handle invalid city service data', async () => {
      // @ts-ignore - Intentionally passing invalid data
      const result = await DatabaseOperations.CityServices.create({ city_id: 1 })
      expect(result).toBeNull()
    })
  })
})
