/**
 * Script to verify that the enriched business profile data was saved to the enriched_profiles table
 */

const { getEnrichedProfiles } = require('./utils/saveEnrichedProfile');

async function verifyData() {
  try {
    console.log('Retrieving enriched profiles from enriched_profiles table...');
    
    const { data, count } = await getEnrichedProfiles();
    
    console.log(`Found ${count || 0} enriched profiles:`);
    
    if (data && data.length > 0) {
      // Display basic information for each profile
      data.forEach((profile, index) => {
        console.log(`\n${index + 1}. ${profile.business_name}`);
        console.log(`   Address: ${profile.address}`);
        console.log(`   Rating: ${profile.rating}`);
        console.log(`   Description: ${profile.description}`);
        
        // Check if enriched_data exists
        if (profile.enriched_data) {
          console.log('   Enriched data:');
          console.log(`     - Source: ${profile.enriched_data.source}`);
          console.log(`     - Timestamp: ${profile.enriched_data.timestamp}`);
          console.log(`     - Search queries: ${profile.enriched_data.searchQueries.length}`);
          
          // Check if reviewInsights exists
          if (profile.enriched_data.enrichedData && profile.enriched_data.enrichedData.reviewInsights) {
            console.log('     - Review insights:');
            console.log(`       * Summary: ${profile.enriched_data.enrichedData.reviewInsights.summary.substring(0, 50)}...`);
            console.log(`       * Strengths: ${profile.enriched_data.enrichedData.reviewInsights.strengths.length}`);
          }
        }
      });
    } else {
      console.log('No enriched profiles found.');
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

// Run the function
verifyData();
