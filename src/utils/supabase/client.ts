import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Utility functions for client-side data fetching
export async function fetchCities() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

export async function fetchServices() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

export async function fetchCityServices(cityId?: number, serviceId?: number) {
  const supabase = createClient()
  let query = supabase
    .from('city_services')
    .select(`
      *,
      cities (*),
      services (*)
    `)
  
  if (cityId) {
    query = query.eq('city_id', cityId)
  }
  
  if (serviceId) {
    query = query.eq('service_id', serviceId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

export async function fetchCityServiceByUrl(seoUrl: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('city_services')
    .select(`
      *,
      cities (*),
      services (*)
    `)
    .eq('seo_url', seoUrl)
    .single()
  
  if (error) throw error
  return data
}

export async function fetchCityBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export async function fetchServiceBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}
