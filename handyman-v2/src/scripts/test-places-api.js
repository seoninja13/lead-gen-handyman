/**
 * Test script for Google Places API integration
 * 
 * This script tests the Google Places API integration by making
 * a direct API call to verify that the API key is configured correctly.
 * 
 * Usage:
 * node scripts/test-places-api.js
 */

// Load environment variables from .env or .env.local file
const path = require('path');
const fs = require('fs');

// Try to load from .env.local first, then .env
const envLocalPath = path.resolve(process.cwd(), '../.env.local');
const envPath = path.resolve(process.cwd(), '../.env');

if (fs.existsSync(envLocalPath)) {
  console.log('Loading environment variables from .env.local');
  require('dotenv').config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  console.log('Loading environment variables from .env');
  require('dotenv').config({ path: envPath });
} else {
  console.log('No .env or .env.local file found. Attempting to use environment variables from system.');
}

// Check if API key is configured
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
if (!apiKey) {
  console.error('\n❌ ERROR: Google Maps API key not found!');
  console.error('Please make sure you have set GOOGLE_MAPS_API_KEY in your .env file\n');
  process.exit(1);
}

console.log('\n=== Google Places API Test ===\n');
console.log(`API Key: ${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 4)}`);

// Test search query
const searchQuery = 'handyman services in Sacramento';
console.log(`\nTesting search query: "${searchQuery}"`);

// Define the fields we want to retrieve
const PLACES_FIELDS = [
  'id',                  // Basic field
  'displayName',         // Name of the place
  'formattedAddress',    // Address
  'rating',              // Rating
];

// Create the field mask header
const fieldMask = PLACES_FIELDS.map(field => `places.${field}`).join(',');

// Make the API request
async function testPlacesAPI() {
  try {
    console.log('\nMaking API request...');
    
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask
      },
      body: JSON.stringify({
        textQuery: searchQuery,
        maxResultCount: 5
      })
    });
    
    console.log(`API Response Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('\n❌ API Error Response:', errorText);
      process.exit(1);
    }
    
    const data = await response.json();
    
    if (!data.places || !Array.isArray(data.places)) {
      console.error('\n❌ Invalid API Response:', data);
      process.exit(1);
    }
    
    console.log(`\n✅ Success! Found ${data.places.length} places:`);
    
    // Display the results
    data.places.forEach((place, index) => {
      console.log(`\n[${index + 1}] ${place.displayName?.text || 'Unknown'}`);
      console.log(`    Address: ${place.formattedAddress || 'N/A'}`);
      console.log(`    Rating: ${place.rating || 'N/A'}`);
    });
    
    console.log('\n=== Test Completed Successfully ===\n');
  } catch (error) {
    console.error('\n❌ Error testing Places API:', error);
    process.exit(1);
  }
}

// Run the test
testPlacesAPI();
