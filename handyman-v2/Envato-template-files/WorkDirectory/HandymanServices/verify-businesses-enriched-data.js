/**
 * Script to verify that the enriched data was saved to the businesses table
 */

const { getBusinessesWithEnrichedData } = require('./utils/saveEnrichedBusinessData');

async function verifyData() {
  try {
    console.log('Retrieving businesses with enriched data...');

    const { data, count } = await getBusinessesWithEnrichedData();

    console.log(`Found ${count || 0} businesses with enriched data:`);

    if (data && data.length > 0) {
      // Display basic information for each business
      data.forEach((business, index) => {
        console.log(`\n${index + 1}. ${business.business}`);
        console.log(`   City: ${business.city}`);

        // Try to parse the enriched data from the service field
        try {
          const enrichedData = JSON.parse(business.service);
          console.log('   Enriched data:');
          console.log(`     - Source: ${enrichedData.source}`);
          console.log(`     - Timestamp: ${enrichedData.timestamp}`);
          console.log(`     - Search queries: ${enrichedData.searchQueries.length}`);

          // Check if reviewInsights exists
          if (enrichedData.enrichedData && enrichedData.enrichedData.reviewInsights) {
            console.log('     - Review insights:');
            console.log(`       * Summary: ${enrichedData.enrichedData.reviewInsights.summary.substring(0, 50)}...`);
            console.log(`       * Strengths: ${enrichedData.enrichedData.reviewInsights.strengths.length}`);
          }
        } catch (e) {
          console.log(`   Service: ${business.service}`);
        }
      });
    } else {
      console.log('No businesses with enriched data found.');
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

// Run the function
verifyData();
