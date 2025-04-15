/**
 * Script to verify that the enriched data was saved in the specified format
 */

const { getEnrichedDataFormat } = require('./utils/saveEnrichedDataFormat');

// Sample business name
const businessName = 'Sacramento Water Damage Pros';

async function verifyFormat() {
  try {
    console.log(`Verifying enriched data format for ${businessName}...`);
    
    const enrichedData = await getEnrichedDataFormat(businessName);
    
    if (!enrichedData) {
      console.log(`No enriched data found for ${businessName}.`);
      return;
    }
    
    console.log('Enriched data retrieved successfully in the specified format!');
    
    // Verify the structure of the enriched data
    console.log('\nVerifying enriched data structure:');
    
    // Check reviewInsights
    if (enrichedData.reviewInsights) {
      console.log('✓ reviewInsights section exists');
      
      if (enrichedData.reviewInsights.summary) {
        console.log('  ✓ summary exists');
      } else {
        console.log('  ✗ summary is missing');
      }
      
      if (Array.isArray(enrichedData.reviewInsights.strengths)) {
        console.log(`  ✓ strengths exists with ${enrichedData.reviewInsights.strengths.length} items`);
      } else {
        console.log('  ✗ strengths is missing or not an array');
      }
      
      if (Array.isArray(enrichedData.reviewInsights.areasForImprovement)) {
        console.log(`  ✓ areasForImprovement exists with ${enrichedData.reviewInsights.areasForImprovement.length} items`);
      } else {
        console.log('  ✗ areasForImprovement is missing or not an array');
      }
      
      if (Array.isArray(enrichedData.reviewInsights.testimonialHighlights)) {
        console.log(`  ✓ testimonialHighlights exists with ${enrichedData.reviewInsights.testimonialHighlights.length} items`);
      } else {
        console.log('  ✗ testimonialHighlights is missing or not an array');
      }
    } else {
      console.log('✗ reviewInsights section is missing');
    }
    
    // Check serviceDetails
    if (enrichedData.serviceDetails) {
      console.log('✓ serviceDetails section exists');
      
      if (Array.isArray(enrichedData.serviceDetails.primaryServices)) {
        console.log(`  ✓ primaryServices exists with ${enrichedData.serviceDetails.primaryServices.length} items`);
        
        // Check the first primaryService
        const firstService = enrichedData.serviceDetails.primaryServices[0];
        if (firstService && firstService.name && firstService.description && firstService.estimatedCost) {
          console.log('  ✓ primaryServices have the correct structure (name, description, estimatedCost)');
        } else {
          console.log('  ✗ primaryServices do not have the correct structure');
        }
      } else {
        console.log('  ✗ primaryServices is missing or not an array');
      }
      
      if (Array.isArray(enrichedData.serviceDetails.specializations)) {
        console.log(`  ✓ specializations exists with ${enrichedData.serviceDetails.specializations.length} items`);
      } else {
        console.log('  ✗ specializations is missing or not an array');
      }
      
      if (Array.isArray(enrichedData.serviceDetails.certifications)) {
        console.log(`  ✓ certifications exists with ${enrichedData.serviceDetails.certifications.length} items`);
      } else {
        console.log('  ✗ certifications is missing or not an array');
      }
    } else {
      console.log('✗ serviceDetails section is missing');
    }
    
    // Check restorationTechniques
    if (enrichedData.restorationTechniques) {
      console.log('✓ restorationTechniques section exists');
      
      if (Array.isArray(enrichedData.restorationTechniques.waterExtractionMethods)) {
        console.log(`  ✓ waterExtractionMethods exists with ${enrichedData.restorationTechniques.waterExtractionMethods.length} items`);
      } else {
        console.log('  ✗ waterExtractionMethods is missing or not an array');
      }
      
      if (Array.isArray(enrichedData.restorationTechniques.dryingTechniques)) {
        console.log(`  ✓ dryingTechniques exists with ${enrichedData.restorationTechniques.dryingTechniques.length} items`);
      } else {
        console.log('  ✗ dryingTechniques is missing or not an array');
      }
      
      if (Array.isArray(enrichedData.restorationTechniques.moistureDetectionTools)) {
        console.log(`  ✓ moistureDetectionTools exists with ${enrichedData.restorationTechniques.moistureDetectionTools.length} items`);
      } else {
        console.log('  ✗ moistureDetectionTools is missing or not an array');
      }
      
      if (Array.isArray(enrichedData.restorationTechniques.specializedEquipment)) {
        console.log(`  ✓ specializedEquipment exists with ${enrichedData.restorationTechniques.specializedEquipment.length} items`);
      } else {
        console.log('  ✗ specializedEquipment is missing or not an array');
      }
    } else {
      console.log('✗ restorationTechniques section is missing');
    }
    
    // Check remediationProcess
    if (enrichedData.remediationProcess) {
      console.log('✓ remediationProcess section exists');
      
      const phases = ['assessmentPhase', 'containmentPhase', 'removalPhase', 'preventionPhase', 'testingPhase'];
      
      for (const phase of phases) {
        if (enrichedData.remediationProcess[phase]) {
          console.log(`  ✓ ${phase} exists`);
          
          if (enrichedData.remediationProcess[phase].description) {
            console.log(`    ✓ ${phase} has a description`);
          } else {
            console.log(`    ✗ ${phase} is missing a description`);
          }
          
          if (Array.isArray(enrichedData.remediationProcess[phase].steps)) {
            console.log(`    ✓ ${phase} has ${enrichedData.remediationProcess[phase].steps.length} steps`);
          } else {
            console.log(`    ✗ ${phase} is missing steps or steps is not an array`);
          }
        } else {
          console.log(`  ✗ ${phase} is missing`);
        }
      }
    } else {
      console.log('✗ remediationProcess section is missing');
    }
    
    console.log('\nEnriched data is in the correct format!');
  } catch (error) {
    console.error('Error verifying enriched data format:', error);
  }
}

// Run the function
verifyFormat();
