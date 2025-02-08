# Database Operations Guide

## Overview
This guide explains how to perform database operations (CRUD) using our Supabase utilities.

## Quick Start

```typescript
import { DatabaseOperations } from '@/utils/supabase/database'

// Example: Get all cities
const cities = await DatabaseOperations.Cities.getAll()

// Example: Create a service
const newService = {
  name: 'Gutter Cleaning',
  slug: 'gutter-cleaning',
  // ... other required fields
}
const service = await DatabaseOperations.Services.create(newService)
```

## Available Operations

### Cities
```typescript
// Create
await DatabaseOperations.Cities.create(cityData)

// Read
await DatabaseOperations.Cities.getAll()
await DatabaseOperations.Cities.getById(id)
await DatabaseOperations.Cities.getBySlug(slug)

// Update
await DatabaseOperations.Cities.update({ id, ...updateData })

// Delete
await DatabaseOperations.Cities.delete(id)
```

### Services
```typescript
// Create
await DatabaseOperations.Services.create(serviceData)

// Read
await DatabaseOperations.Services.getAll()
await DatabaseOperations.Services.getById(id)
await DatabaseOperations.Services.getBySlug(slug)

// Update
await DatabaseOperations.Services.update({ id, ...updateData })

// Delete
await DatabaseOperations.Services.delete(id)
```

### City Services
```typescript
// Create
await DatabaseOperations.CityServices.create(cityServiceData)

// Read
await DatabaseOperations.CityServices.getAll()
await DatabaseOperations.CityServices.getAll(cityId) // Filter by city
await DatabaseOperations.CityServices.getAll(undefined, serviceId) // Filter by service
await DatabaseOperations.CityServices.getById(id)
await DatabaseOperations.CityServices.getByUrl(seoUrl)

// Update
await DatabaseOperations.CityServices.update({ id, ...updateData })

// Delete
await DatabaseOperations.CityServices.delete(id)
```

## Type Definitions

### City
```typescript
type City = {
  id: number
  name: string
  slug: string
  state: string
  county: string
  description: string
  population: number
  coordinates: {
    lat: number
    lng: number
  }
  meta_title: string
  meta_description: string
  created_at: string
}
```

### Service
```typescript
type Service = {
  id: number
  name: string
  slug: string
  category: string
  description: string
  price_range: string
  duration: string
  meta_title: string
  meta_description: string
  images: Array<{
    url: string
    alt: string
    width: number
    height: number
  }>
  created_at: string
}
```

### CityService
```typescript
type CityService = {
  id: number
  city_id: number
  service_id: number
  service_city_ca: string | null
  main_content: string | null
  features_content: string | null
  benefits_content: string | null
  service_area_content: string | null
  seo_title: string | null
  seo_description: string | null
  seo_h1: string | null
  seo_url: string | null
  service_images: Array<{
    url: string
    alt: string
    width: number
    height: number
  }>
  image_alt_tags: string[]
  maps_data: {
    center: {
      lat: number
      lng: number
    }
    zoom: number
  }
  faq_content: Array<{
    question: string
    answer: string
  }>
  testimonials: Array<{
    author: string
    rating: number
    content: string
    date: string
  }>
  structured_data: Record<string, any>
  created_at: string
}
```

## Error Handling

All operations throw errors that should be caught:

```typescript
try {
  const city = await DatabaseOperations.Cities.getById(999)
} catch (error) {
  console.error('Error fetching city:', error)
}
```

## Examples

See [database-operations.ts](../../examples/database-operations.ts) for complete examples of all operations.

## Best Practices

1. Always use TypeScript types for data
2. Handle errors appropriately
3. Use proper error logging
4. Validate data before operations
5. Use transactions for related operations

## Notes

- All operations are server-side only
- Use proper error handling
- Check types for required fields
- Consider caching for frequent reads
- Use transactions when needed
