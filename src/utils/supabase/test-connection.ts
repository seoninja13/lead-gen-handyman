import { createClient } from './client.js'
import { Database } from '../../types/database.js'

interface TestResult {
  success: boolean
  error?: string
}

type TestResults = Record<string, TestResult>

export async function testSupabaseConnection(): Promise<TestResults> {
  const supabase = createClient()
  const results: TestResults = {}

  // Test basic connection
  try {
    const { data, error } = await supabase.from('cities').select('count')
    if (error) throw error
    results.connection = { success: true }
  } catch (error) {
    results.connection = { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
    return results
  }

  // Test cities table
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .limit(1)
    if (error) throw error
    results.citiesTable = { success: true }
  } catch (error) {
    results.citiesTable = { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to query cities table' 
    }
  }

  // Test services table
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .limit(1)
    if (error) throw error
    results.servicesTable = { success: true }
  } catch (error) {
    results.servicesTable = { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to query services table' 
    }
  }

  // Test city_services table
  try {
    const { data, error } = await supabase
      .from('city_services')
      .select(`
        *,
        cities (*),
        services (*)
      `)
      .limit(1)
    if (error) throw error
    results.cityServicesTable = { success: true }
  } catch (error) {
    results.cityServicesTable = { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to query city_services table' 
    }
  }

  // Test JSON field parsing
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('coordinates')
      .limit(1)
    if (error) throw error
    
    if (data && data[0]) {
      const coordinates = data[0].coordinates
      if (typeof coordinates === 'object' && coordinates !== null) {
        results.jsonParsing = { success: true }
      } else {
        throw new Error('Invalid coordinates format')
      }
    } else {
      throw new Error('No data returned')
    }
  } catch (error) {
    results.jsonParsing = { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to parse JSON fields' 
    }
  }

  return results
}

// Helper function to print test results
export function printTestResults(results: TestResults): void {
  console.log('\nSupabase Connection Test Results:')
  console.log('================================')
  
  Object.entries(results).forEach(([test, result]) => {
    const status = result.success ? '✅ PASS' : '❌ FAIL'
    console.log(`\n${test}:`)
    console.log(`Status: ${status}`)
    if (!result.success && result.error) {
      console.log(`Error: ${result.error}`)
    }
  })
  
  const allPassed = Object.values(results).every(result => result.success)
  console.log('\n================================')
  console.log(`Overall Status: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`)
  console.log('================================\n')
}
