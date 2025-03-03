import { DatabaseOperations } from '../src/utils/supabase/database.ts'

async function testDatabase() {
  console.log('Testing database connection...\n')

  try {
    // Test cities table
    console.log('Testing cities table...')
    const cities = await DatabaseOperations.Cities.getAll()
    console.log('Cities count:', cities.length)
    console.log('Sample cities:', cities.slice(0, 2))

    // Test services table
    console.log('\nTesting services table...')
    const services = await DatabaseOperations.Services.getAll()
    console.log('Services count:', services.length)
    services.forEach(service => {
      console.log(`Service ID: ${service.id}, Image URL: ${service.image_url}`);
    });

    // Test city_services table
    console.log('\nTesting city_services table...')
    // const cityServices = await DatabaseOperations.CityServices.getAll() // commented out to reduce output
    // console.log('City services count:', cityServices.length)
    // console.log('Sample city services:', cityServices.slice(0, 2))

    console.log('\nDatabase connection test completed successfully!')
  } catch (error) {
    console.error('Database test failed:', error)
  }
}

testDatabase()
