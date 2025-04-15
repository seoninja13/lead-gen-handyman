/**
 * Script to verify that the enriched business profile data was saved to Supabase
 */

const { getEnrichedBusinessProfiles } = require('./utils/saveEnrichedBusinessProfile.cjs');

async function verifyData() {
  try {
    console.log('Retrieving enriched business profiles from Supabase...');
    
    const { data, count } = await getEnrichedBusinessProfiles();
    
    console.log(`Found ${count} enriched business profiles:`);
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

// Run the function
verifyData();
