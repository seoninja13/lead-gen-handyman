/**
 * Script to verify that the enriched data was saved correctly
 */

const { getEnrichedData } = require('./utils/saveEnrichedDataToTestDelete');

// Sample business name
const businessName = 'Sacramento Water Damage Pros';

async function verifyEnrichedData() {
  try {
    console.log(`Verifying enriched data for ${businessName}...`);
    
    const enrichedData = await getEnrichedData(businessName);
    
    if (!enrichedData) {
      console.log(`No enriched data found for ${businessName}.`);
      return;
    }
    
    console.log('Enriched data retrieved successfully!');
    
    // Display the review insights
    console.log('\nReview Insights:');
    console.log(`Summary: ${enrichedData.reviewInsights.summary}`);
    console.log('Strengths:');
    enrichedData.reviewInsights.strengths.forEach((strength, index) => {
      console.log(`  ${index + 1}. ${strength}`);
    });
    
    // Display the service details
    console.log('\nService Details:');
    console.log('Primary Services:');
    enrichedData.serviceDetails.primaryServices.forEach((service, index) => {
      console.log(`  ${index + 1}. ${service.name}`);
      console.log(`     Description: ${service.description}`);
      console.log(`     Estimated Cost: ${service.estimatedCost}`);
    });
    
    // Display the restoration techniques
    console.log('\nRestoration Techniques:');
    console.log('Water Extraction Methods:');
    enrichedData.restorationTechniques.waterExtractionMethods.forEach((method, index) => {
      console.log(`  ${index + 1}. ${method}`);
    });
    
    // Display the remediation process
    console.log('\nRemediation Process:');
    console.log(`Assessment Phase: ${enrichedData.remediationProcess.assessmentPhase.description}`);
    console.log('Steps:');
    enrichedData.remediationProcess.assessmentPhase.steps.forEach((step, index) => {
      console.log(`  ${index + 1}. ${step}`);
    });
  } catch (error) {
    console.error('Error verifying enriched data:', error);
  }
}

// Run the function
verifyEnrichedData();
