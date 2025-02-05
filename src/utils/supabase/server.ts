import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookies in edge functions
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookies in edge functions
          }
        },
      },
    }
  )
}

// Utility functions for database queries
async function getCities() {
  try {
    console.log('Getting cities...')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('Error fetching cities:', error)
      throw error
    }
    
    console.log('Cities fetched:', data?.length)
    return data
  } catch (error) {
    console.error('getCities error:', error)
    throw error
  }
}

async function getServices() {
  try {
    console.log('Getting services...')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('Error fetching services:', error)
      throw error
    }
    
    console.log('Services fetched:', data?.length)
    return data
  } catch (error) {
    console.error('getServices error:', error)
    throw error
  }
}

async function getCityServices(cityId?: number, serviceId?: number) {
  try {
    console.log('Getting city services...')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
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
    
    if (error) {
      console.error('Error fetching city services:', error)
      throw error
    }
    
    console.log('City services fetched:', data?.length)
    return data
  } catch (error) {
    console.error('getCityServices error:', error)
    throw error
  }
}

async function getCityServiceByUrl(seoUrl: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
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

async function getCityBySlug(slug: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

async function getServiceBySlug(slug: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export {
  createClient,
  getCities,
  getServices,
  getCityServices,
  getCityServiceByUrl,
  getCityBySlug,
  getServiceBySlug
}
