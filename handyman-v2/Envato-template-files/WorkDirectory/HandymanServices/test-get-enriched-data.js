/**
 * Test script for retrieving enriched data
 *
 * This script tests retrieving enriched data for a business from the local JSON file.
 *
 * Run with: node test-get-enriched-data.js
 */

const { getEnrichedDataFromBusinesses } = require('./utils/saveEnrichedDataToFile');

// Business name to retrieve enriched data for
const businessName = 'Sacramento Handyman Services';

/**
 * Retrieve and display enriched data for a business
 */
async function testGetEnrichedData(businessName) {
  console.log(`\n===== Retrieving Enriched Data for: ${businessName} =====`);
  
  try {
    // Get the enriched data
    const enrichedData = await getEnrichedDataFromBusinesses(businessName);
    
    // Display the enriched data
    console.log('\nEnriched Data:');
    console.log(JSON.stringify(enrichedData, null, 2));
    
    return enrichedData;
  } catch (error) {
    console.error('ERROR retrieving enriched data:', error.message);
    return null;
  }
}

// Run the test
testGetEnrichedData(businessName).catch(error => {
  console.error('Error running test:', error);
});
