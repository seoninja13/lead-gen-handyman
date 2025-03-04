/**
 * Test MCP Integration
 * 
 * This script tests the integration with the Supabase and Google Maps MCP servers.
 * It verifies that the MCP servers are properly configured and accessible.
 */

const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Import MCP configuration
const { MCP_ENDPOINTS, getMcpRequestOptions } = require('../config/mcp-config');

/**
 * Test the Supabase MCP server
 */
async function testSupabaseMcp() {
  console.log('\n--- Testing Supabase MCP Server ---');
  
  try {
    // Simple query to test the connection
    const query = 'SELECT NOW() as current_time';
    
    console.log(`Executing query: ${query}`);
    
    const response = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: query }));
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    console.log('✅ Supabase MCP server is working correctly!');
    
    return true;
  } catch (error) {
    console.error('❌ Error testing Supabase MCP server:', error.message);
    return false;
  }
}

/**
 * Test the Google Maps MCP server
 */
async function testGoogleMapsMcp() {
  console.log('\n--- Testing Google Maps MCP Server ---');
  
  try {
    // Search for handyman services in Sacramento
    const query = 'handyman services Sacramento CA';
    
    console.log(`Searching for: ${query}`);
    
    const response = await fetch(MCP_ENDPOINTS.MAPS_SEARCH_PLACES, getMcpRequestOptions({ 
      query, 
      radius: 50000 // 50km radius
    }));
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Found ${data.results?.length || 0} results`);
    
    if (data.results && data.results.length > 0) {
      console.log('First result:', JSON.stringify(data.results[0], null, 2));
    }
    
    console.log('✅ Google Maps MCP server is working correctly!');
    
    return true;
  } catch (error) {
    console.error('❌ Error testing Google Maps MCP server:', error.message);
    return false;
  }
}

/**
 * Test saving a place to the database using the MCP server
 */
async function testSavePlaceToDatabase() {
  console.log('\n--- Testing Saving Place to Database ---');
  
  try {
    // First, search for a place
    const query = 'handyman services Sacramento CA';
    
    console.log(`Searching for: ${query}`);
    
    const searchResponse = await fetch(MCP_ENDPOINTS.MAPS_SEARCH_PLACES, getMcpRequestOptions({ 
      query, 
      radius: 50000 // 50km radius
    }));
    
    if (!searchResponse.ok) {
      throw new Error(`HTTP error! Status: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    
    if (!searchData.results || searchData.results.length === 0) {
      throw new Error('No places found to save');
    }
    
    const place = searchData.results[0];
    console.log(`Saving place: ${place.name}`);
    
    // Prepare place data for saving
    const placeData = {
      place_id: place.place_id,
      name: place.name,
      address: place.formatted_address || place.vicinity,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      description: place.editorial_summary?.text || '',
      phone_number: place.formatted_phone_number || place.international_phone_number || '',
      website: place.website || '',
      latitude: place.geometry?.location.lat,
      longitude: place.geometry?.location.lng
    };
    
    // Create SQL query to insert the place
    const sql = `
      INSERT INTO places (
        place_id, name, address, rating, user_ratings_total, 
        description, phone_number, website, latitude, longitude, last_updated
      ) VALUES (
        '${placeData.place_id}', 
        '${placeData.name.replace(/'/g, "''")}', 
        '${placeData.address.replace(/'/g, "''")}', 
        ${placeData.rating || 'NULL'}, 
        ${placeData.user_ratings_total || 'NULL'}, 
        '${placeData.description.replace(/'/g, "''")}', 
        '${placeData.phone_number.replace(/'/g, "''")}', 
        '${placeData.website.replace(/'/g, "''")}', 
        ${placeData.latitude || 'NULL'}, 
        ${placeData.longitude || 'NULL'}, 
        NOW()
      )
      ON CONFLICT (place_id) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        address = EXCLUDED.address,
        rating = EXCLUDED.rating,
        user_ratings_total = EXCLUDED.user_ratings_total,
        description = EXCLUDED.description,
        phone_number = EXCLUDED.phone_number,
        website = EXCLUDED.website,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        last_updated = NOW()
    `;
    
    const saveResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql }));
    
    if (!saveResponse.ok) {
      throw new Error(`HTTP error! Status: ${saveResponse.status}`);
    }
    
    // Verify the place was saved by querying it
    const verifyQuery = `SELECT * FROM places WHERE place_id = '${placeData.place_id}'`;
    
    const verifyResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: verifyQuery }));
    
    if (!verifyResponse.ok) {
      throw new Error(`HTTP error! Status: ${verifyResponse.status}`);
    }
    
    const verifyData = await verifyResponse.json();
    
    if (!verifyData.rows || verifyData.rows.length === 0) {
      throw new Error('Place was not saved correctly');
    }
    
    console.log('Saved place data:', JSON.stringify(verifyData.rows[0], null, 2));
    console.log('✅ Place saved to database successfully!');
    
    return true;
  } catch (error) {
    console.error('❌ Error saving place to database:', error.message);
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('=== MCP Integration Tests ===');
  console.log('Testing connection to MCP servers and functionality...');
  
  // Test Supabase MCP
  const supabaseResult = await testSupabaseMcp();
  
  // Test Google Maps MCP
  const googleMapsResult = await testGoogleMapsMcp();
  
  // Test saving a place
  const saveResult = await testSavePlaceToDatabase();
  
  // Print summary
  console.log('\n=== Test Summary ===');
  console.log(`Supabase MCP: ${supabaseResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Google Maps MCP: ${googleMapsResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Save Place: ${saveResult ? '✅ PASS' : '❌ FAIL'}`);
  
  if (supabaseResult && googleMapsResult && saveResult) {
    console.log('\n🎉 All tests passed! MCP integration is working correctly.');
  } else {
    console.log('\n❌ Some tests failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run the tests
runTests();
