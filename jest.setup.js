// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn()
  })
}))

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key'

// Add custom matchers
expect.extend({
  toBeValidCity(received) {
    const pass = received &&
      typeof received.id === 'number' &&
      typeof received.name === 'string' &&
      typeof received.slug === 'string'
    return {
      pass,
      message: () => `expected ${received} to be a valid city object`
    }
  },
  toBeValidService(received) {
    const pass = received &&
      typeof received.id === 'number' &&
      typeof received.name === 'string' &&
      typeof received.slug === 'string'
    return {
      pass,
      message: () => `expected ${received} to be a valid service object`
    }
  },
  toBeValidCityService(received) {
    const pass = received &&
      typeof received.id === 'number' &&
      typeof received.city_id === 'number' &&
      typeof received.service_id === 'number'
    return {
      pass,
      message: () => `expected ${received} to be a valid city service object`
    }
  }
})
