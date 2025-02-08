import { createClient } from './server'
import { cookies } from 'next/headers'

export async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Test cities table
    const { data: cities, error: citiesError } = await supabase
      .from('cities')
      .select('count')
      .limit(1)
    
    if (citiesError) {
      console.error('Error accessing cities table:', citiesError)
      throw citiesError
    }
    console.log('Cities table accessible')

    // Test services table
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('count')
      .limit(1)
    
    if (servicesError) {
      console.error('Error accessing services table:', servicesError)
      throw servicesError
    }
    console.log('Services table accessible')

    // Test city_services table
    const { data: cityServices, error: cityServicesError } = await supabase
      .from('city_services')
      .select('count')
      .limit(1)
    
    if (cityServicesError) {
      console.error('Error accessing city_services table:', cityServicesError)
      throw cityServicesError
    }
    console.log('City services table accessible')

    return {
      success: true,
      message: 'Successfully connected to all tables'
    }
  } catch (error) {
    console.error('Connection test failed:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    }
  }
}

// Test the connection
testConnection().then(result => {
  console.log('Connection test result:', result)
}).catch(error => {
  console.error('Test execution failed:', error)
})
