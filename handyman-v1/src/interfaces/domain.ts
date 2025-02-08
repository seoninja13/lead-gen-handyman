// Domain interfaces representing our business entities

// Base interface for all entities
export interface Entity {
  id: string | number;
  created_at?: string;
  updated_at?: string;
}

// City entity
export interface City extends Entity {
  name: string;
  state: string;
  zip_codes?: string[];
  population?: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  meta_description?: string;
  service_area?: string[];
}

// Service entity
export interface Service extends Entity {
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  price_range?: string;
  duration?: string;
  category?: string;
  tags?: string[];
  image_url?: string;
  meta_description?: string;
}

// CityService junction entity
export interface CityService extends Entity {
  city_id: string | number;
  service_id: string | number;
  price_modifier?: number;
  availability?: boolean;
  custom_description?: string;
  service_area_radius?: number;
  main_content?: string;
  service_images?: ServiceImage[];
  meta_description?: string;
  cities?: City;    // Optional relation
  services?: Service; // Optional relation
}

// Service Image entity
export interface ServiceImage {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

// FAQ entity
export interface FAQ extends Entity {
  question: string;
  answer: string;
  category?: string;
  service_id?: string | number;
  city_id?: string | number;
  order?: number;
}

// Testimonial entity
export interface Testimonial extends Entity {
  author: string;
  content: string;
  rating: number;
  service_id?: string | number;
  city_id?: string | number;
  verified?: boolean;
  date?: string;
}

// Contact Form Submission
export interface ContactSubmission extends Entity {
  name: string;
  email: string;
  phone?: string;
  service_id?: string | number;
  city_id?: string | number;
  message: string;
  preferred_contact_method?: 'email' | 'phone';
  preferred_time?: string;
  status: 'new' | 'contacted' | 'completed' | 'archived';
}

// Service Request
export interface ServiceRequest extends Entity {
  contact_submission_id: string | number;
  service_id: string | number;
  city_id: string | number;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  scheduled_date?: string;
  notes?: string;
  price_quote?: number;
}

// Analytics Event
export interface AnalyticsEvent extends Entity {
  event_type: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  page_url?: string;
  user_agent?: string;
  ip_address?: string;
}

// SEO Content
export interface SeoContent extends Entity {
  page_type: 'home' | 'service' | 'city' | 'city-service';
  service_id?: string | number;
  city_id?: string | number;
  title: string;
  meta_description: string;
  keywords: string[];
  heading_1: string;
  main_content: string;
  schema_markup: string;
  canonical_url: string;
}

// Service Area
export interface ServiceArea extends Entity {
  city_id: string | number;
  name: string;
  zip_codes: string[];
  radius_miles: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  active: boolean;
}

// Price Guide
export interface PriceGuide extends Entity {
  service_id: string | number;
  city_id?: string | number;
  base_price: number;
  unit: string;
  minimum_charge?: number;
  factors: Array<{
    name: string;
    multiplier: number;
    description?: string;
  }>;
  notes?: string;
}
