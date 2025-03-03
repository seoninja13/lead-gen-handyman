export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          id: number
          name: string
          slug: string
          state: string
          county: string
          description: string
          population: number
          coordinates: Json
          meta_title: string
          meta_description: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['cities']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['cities']['Insert']>
      }
      services: {
        Row: {
          id: number
          name: string
          slug: string
          category: string
          description: string
          price_range: string
          duration: string
          meta_title: string
          meta_description: string
          images: Json
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      city_services: {
        Row: {
          id: number
          city_id: number | null
          service_id: number | null
          service_city_ca: string | null
          main_content: string | null
          features_content: string | null
          benefits_content: string | null
          service_area_content: string | null
          seo_title: string | null
          seo_description: string | null
          seo_h1: string | null
          seo_url: string | null
          service_images: Json
          image_alt_tags: Json
          maps_data: Json
          faq_content: Json
          testimonials: Json
          structured_data: Json
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['city_services']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['city_services']['Insert']>
      }
    }
  }
}

// Utility types for better type safety
export type City = Database['public']['Tables']['cities']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type CityService = Database['public']['Tables']['city_services']['Row']

// JSON field types as type aliases of Json
export type Coordinates = {
  lat: number
  lng: number
} & { [key: string]: Json | undefined }

export type ServiceImage = {
  url: string
  alt: string
  width: number
  height: number
} & { [key: string]: Json | undefined }

export type FAQ = {
  question: string
  answer: string
} & { [key: string]: Json | undefined }

export type Testimonial = {
  author: string
  rating: number
  content: string
  date: string
} & { [key: string]: Json | undefined }

export type MapsData = {
  center: Coordinates
  zoom: number
  markers?: Array<{
    position: Coordinates
    title: string
  }>
} & { [key: string]: Json | undefined }

// Type guards for JSON fields
export function isCoordinates(json: Json): json is Coordinates {
  if (
    typeof json !== 'object' ||
    json === null ||
    !('lat' in json) ||
    !('lng' in json)
  ) {
    return false
  }
  return typeof (json as any).lat === 'number' && typeof (json as any).lng === 'number'
}

export function isServiceImage(json: Json): json is ServiceImage {
  if (
    typeof json !== 'object' ||
    json === null ||
    !('url' in json) ||
    !('alt' in json) ||
    !('width' in json) ||
    !('height' in json)
  ) {
    return false
  }
  const img = json as any
  return (
    typeof img.url === 'string' &&
    typeof img.alt === 'string' &&
    typeof img.width === 'number' &&
    typeof img.height === 'number'
  )
}

export function isFAQ(json: Json): json is FAQ {
  if (
    typeof json !== 'object' ||
    json === null ||
    !('question' in json) ||
    !('answer' in json)
  ) {
    return false
  }
  const faq = json as any
  return typeof faq.question === 'string' && typeof faq.answer === 'string'
}

export function isTestimonial(json: Json): json is Testimonial {
  if (
    typeof json !== 'object' ||
    json === null ||
    !('author' in json) ||
    !('rating' in json) ||
    !('content' in json) ||
    !('date' in json)
  ) {
    return false
  }
  const testimonial = json as any
  return (
    typeof testimonial.author === 'string' &&
    typeof testimonial.rating === 'number' &&
    typeof testimonial.content === 'string' &&
    typeof testimonial.date === 'string'
  )
}

export function isMapsData(json: Json): json is MapsData {
  if (
    typeof json !== 'object' ||
    json === null ||
    !('center' in json) ||
    !('zoom' in json)
  ) {
    return false
  }
  const mapsData = json as any
  return (
    isCoordinates(mapsData.center) &&
    typeof mapsData.zoom === 'number' &&
    (!('markers' in mapsData) ||
      (Array.isArray(mapsData.markers) &&
        mapsData.markers.every(
          (marker: any) =>
            typeof marker === 'object' &&
            marker !== null &&
            isCoordinates(marker.position) &&
            typeof marker.title === 'string'
        )))
  )
}
