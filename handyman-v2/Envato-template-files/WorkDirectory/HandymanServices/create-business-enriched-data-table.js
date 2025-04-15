/**
 * Script to create a business_enriched_data table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Create a business_enriched_data table
 */
async function createBusinessEnrichedDataTable() {
  try {
    console.log('Creating business_enriched_data table...');
    
    // Sample enriched data in the specified format
    const sampleEnrichedData = {
      reviewInsights: {
        summary: "Based on web search results, this business has generally positive reviews highlighting their quick response times, professional service, and thorough work. Customers particularly appreciate their 24/7 availability for emergency situations and transparent pricing.",
        strengths: [
          "Fast response times in emergency situations",
          "Professional and knowledgeable technicians",
          "Thorough water extraction and drying processes",
          "Clear communication throughout the restoration process",
          "Transparent pricing with no hidden fees"
        ],
        areasForImprovement: [
          "Some customers mentioned scheduling challenges for non-emergency services",
          "A few reviews noted higher pricing compared to competitors"
        ],
        testimonialHighlights: [
          "They arrived within 30 minutes of my call and immediately got to work extracting water from my flooded basement.",
          "The technicians were extremely knowledgeable and explained every step of the process.",
          "Their mold remediation service was thorough and they provided documentation of all work completed."
        ]
      },
      serviceDetails: {
        certifications: [
          "IICRC Certified Firm",
          "EPA Lead-Safe Certified",
          "Applied Structural Drying Technicians",
          "Water Damage Restoration Technicians"
        ],
        primaryServices: [
          {
            name: "Emergency Water Extraction",
            description: "24/7 emergency service using industrial-grade pumps and extraction equipment to remove standing water quickly and efficiently.",
            estimatedCost: "$500-$1,500 depending on affected area size"
          },
          {
            name: "Structural Drying",
            description: "Complete drying of affected areas using professional air movers, dehumidifiers, and moisture monitoring equipment.",
            estimatedCost: "$1,000-$2,500 depending on scope"
          },
          {
            name: "Mold Remediation",
            description: "Comprehensive mold detection, containment, removal, and prevention services with antimicrobial treatments.",
            estimatedCost: "$1,500-$5,000 depending on severity"
          },
          {
            name: "Fire and Smoke Damage Restoration",
            description: "Cleaning, deodorizing, and restoring properties affected by fire and smoke damage.",
            estimatedCost: "$3,000-$10,000 depending on damage extent"
          }
        ],
        specializations: [
          "Basement flooding recovery",
          "Sewage backup cleanup",
          "Storm damage restoration",
          "Commercial water damage services"
        ]
      },
      remediationProcess: {
        removalPhase: {
          steps: [
            "Removal of porous materials with extensive mold growth",
            "HEPA vacuuming of surfaces to remove loose mold spores",
            "Damp wiping with antimicrobial solutions",
            "Detailed cleaning of all affected surfaces"
          ],
          description: "Safe removal of mold-infested materials and cleaning"
        },
        testingPhase: {
          steps: [
            "Visual inspection to confirm all visible mold has been removed",
            "Air sampling to verify reduced mold spore counts",
            "Surface sampling to confirm effectiveness of cleaning",
            "Moisture testing to ensure proper drying has been achieved"
          ],
          description: "Post-remediation verification of successful mold removal"
        },
        assessmentPhase: {
          steps: [
            "Visual inspection of affected and surrounding areas",
            "Moisture mapping using specialized equipment",
            "Identification of mold types and extent of contamination",
            "Development of detailed remediation plan"
          ],
          description: "Comprehensive inspection and assessment of mold damage"
        },
        preventionPhase: {
          steps: [
            "Addressing moisture sources and water intrusion issues",
            "Application of antimicrobial treatments to cleaned surfaces",
            "Installation of moisture barriers where appropriate",
            "Recommendations for humidity control and ventilation improvements"
          ],
          description: "Measures to prevent future mold growth"
        },
        containmentPhase: {
          steps: [
            "Installation of physical barriers using plastic sheeting",
            "Establishment of negative air pressure environment",
            "Protection of HVAC systems and unaffected areas",
            "Creation of decontamination chambers for worker entry/exit"
          ],
          description: "Isolation of affected areas to prevent cross-contamination"
        }
      },
      restorationTechniques: {
        dryingTechniques: [
          "Strategic placement of air movers to create high-velocity airflow across wet surfaces",
          "Commercial-grade LGR dehumidifiers to remove moisture from the air",
          "Desiccant dehumidifiers for specialized materials and cooler environments",
          "Injectidry systems for drying inside walls and hard-to-reach spaces"
        ],
        specializedEquipment: [
          "HEPA air scrubbers for air purification",
          "Hydroxyl generators for deodorization",
          "Antimicrobial fogging systems",
          "Floor drying mats for hardwood floor restoration"
        ],
        moistureDetectionTools: [
          "Infrared cameras to identify hidden moisture",
          "Moisture meters to measure moisture content in materials",
          "Hygrometers to monitor humidity levels",
          "Thermal imaging for comprehensive moisture mapping"
        ],
        waterExtractionMethods: [
          "Submersible pumps for deep water extraction",
          "Truck-mounted extraction units for efficient large-scale water removal",
          "Portable extractors for hard-to-reach areas",
          "Weighted extraction tools for water removal from carpets and padding"
        ]
      }
    };
    
    // Try to create the business_enriched_data table
    const testRecord = {
      business_name: 'Sacramento Water Damage Pros',
      enriched_data: sampleEnrichedData
    };
    
    const { data, error } = await supabase
      .from('business_enriched_data')
      .insert(testRecord)
      .select();
    
    if (error) {
      console.error('Error creating business_enriched_data table:', error.message);
      return false;
    }
    
    console.log('business_enriched_data table created successfully!');
    console.log('Table columns:', Object.keys(data[0]));
    return true;
  } catch (error) {
    console.error('Error in createBusinessEnrichedDataTable:', error.message);
    return false;
  }
}

/**
 * Update the saveEnrichedDataToBusinesses utility to use the business_enriched_data table
 */
async function updateSaveEnrichedDataToBusinessesUtility() {
  try {
    console.log('Updating saveEnrichedDataToBusinesses utility...');
    
    // Create a new version of the utility that uses the business_enriched_data table
    const utilityCode = `/**
 * Utility to save enriched data to the business_enriched_data table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Save enriched data to the business_enriched_data table
 * 
 * @param {string} businessName - The business name
 * @param {Object} enrichedData - The enriched data in the format provided
 * @returns {Promise<Object>} - The saved record
 */
async function saveEnrichedDataToBusinesses(businessName, enrichedData) {
  try {
    console.log(\`Saving enriched data for \${businessName} to business_enriched_data table...\`);
    
    // Check if a record with this business name already exists
    const { data: existingRecords, error: queryError } = await supabase
      .from('business_enriched_data')
      .select('id, business_name')
      .eq('business_name', businessName)
      .limit(1);
    
    if (queryError) {
      console.error('Error checking for existing record:', queryError);
      
      // If the table doesn't exist, create it
      console.log('Trying to create business_enriched_data table...');
      
      // Insert a record with the required columns
      const { data: insertData, error: insertError } = await supabase
        .from('business_enriched_data')
        .insert({
          business_name: businessName,
          enriched_data: enrichedData
        })
        .select();
      
      if (insertError) {
        console.error('Error creating business_enriched_data table:', insertError);
        throw insertError;
      }
      
      console.log('business_enriched_data table created and enriched data saved successfully!');
      return { data: insertData, updated: false };
    }
    
    // Prepare the record to insert or update
    const record = {
      business_name: businessName,
      enriched_data: enrichedData
    };
    
    let result;
    
    // If the record exists, update it
    if (existingRecords && existingRecords.length > 0) {
      const { data, error } = await supabase
        .from('business_enriched_data')
        .update(record)
        .eq('id', existingRecords[0].id)
        .select();
      
      if (error) {
        console.error('Error updating enriched data:', error);
        throw error;
      }
      
      result = { data, updated: true };
      console.log(\`Updated enriched data for "\${businessName}" in business_enriched_data table\`);
    } 
    // Otherwise, insert a new record
    else {
      const { data, error } = await supabase
        .from('business_enriched_data')
        .insert(record)
        .select();
      
      if (error) {
        console.error('Error inserting enriched data:', error);
        throw error;
      }
      
      result = { data, updated: false };
      console.log(\`Inserted new enriched data for "\${businessName}" in business_enriched_data table\`);
    }
    
    return result;
  } catch (error) {
    console.error('Error in saveEnrichedDataToBusinesses:', error);
    throw error;
  }
}

/**
 * Get enriched data from the business_enriched_data table
 * 
 * @param {string} businessName - The business name
 * @returns {Promise<Object>} - The enriched data
 */
async function getEnrichedDataFromBusinesses(businessName) {
  try {
    console.log(\`Getting enriched data for \${businessName} from business_enriched_data table...\`);
    
    const { data, error } = await supabase
      .from('business_enriched_data')
      .select('*')
      .eq('business_name', businessName)
      .limit(1);
    
    if (error) {
      console.error(\`Error getting enriched data for \${businessName}:\`, error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.error(\`No record found for \${businessName}\`);
      throw new Error(\`No record found for \${businessName}\`);
    }
    
    return data[0].enriched_data;
  } catch (error) {
    console.error('Error in getEnrichedDataFromBusinesses:', error);
    throw error;
  }
}

module.exports = {
  saveEnrichedDataToBusinesses,
  getEnrichedDataFromBusinesses
};
`;
    
    // Write the new utility to a file
    const fs = require('fs');
    const path = require('path');
    const utilityPath = path.join(__dirname, 'utils', 'saveEnrichedDataToBusinesses.js');
    
    fs.writeFileSync(utilityPath, utilityCode);
    
    console.log('saveEnrichedDataToBusinesses utility updated successfully!');
    return true;
  } catch (error) {
    console.error('Error in updateSaveEnrichedDataToBusinessesUtility:', error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting process to create business_enriched_data table and update utility...');
    
    // Create the business_enriched_data table
    const tableResult = await createBusinessEnrichedDataTable();
    if (!tableResult) {
      console.error('Failed to create business_enriched_data table.');
    }
    
    // Update the saveEnrichedDataToBusinesses utility
    const utilityResult = await updateSaveEnrichedDataToBusinessesUtility();
    if (!utilityResult) {
      console.error('Failed to update saveEnrichedDataToBusinesses utility.');
    }
    
    console.log('Process completed!');
  } catch (error) {
    console.error('Error in main process:', error.message);
  }
}

// Run the main function
main();
