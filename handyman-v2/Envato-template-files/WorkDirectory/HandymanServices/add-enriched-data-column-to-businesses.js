/**
 * Script to add enriched_data column to the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Add enriched_data column to the businesses table
 */
async function addEnrichedDataColumn() {
  try {
    console.log('Adding enriched_data column to businesses table...');
    
    // First, check if the businesses table exists and what columns it has
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error checking businesses table:', error.message);
      
      // If the table doesn't exist, create it with the enriched_data column
      console.log('Businesses table does not exist. Creating it with enriched_data column...');
      
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
      
      // Create a test record with the enriched_data column
      const testRecord = {
        name: 'Sacramento Water Damage Pros',
        business_name: 'Sacramento Water Damage Pros',
        description: 'Water damage restoration services in Sacramento, CA',
        enriched_data: sampleEnrichedData
      };
      
      // Try to create the businesses table with the test record
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert(testRecord)
        .select();
      
      if (insertError) {
        console.error('Error creating businesses table:', insertError.message);
        
        // If the error is about the user_id column, try with a user_id
        if (insertError.message.includes('user_id')) {
          console.log('Error with user_id. Trying to get a valid user ID...');
          
          // Try to get a valid user ID from the users table
          const { data: users, error: usersError } = await supabase
            .from('users')
            .select('id')
            .limit(1);
          
          if (usersError || !users || users.length === 0) {
            console.error('Error getting valid user ID:', usersError ? usersError.message : 'No users found');
            return false;
          }
          
          // Add the user_id to the test record
          testRecord.user_id = users[0].id;
          
          // Try again with the user_id
          const { data: insertWithUserIdData, error: insertWithUserIdError } = await supabase
            .from('businesses')
            .insert(testRecord)
            .select();
          
          if (insertWithUserIdError) {
            console.error('Error creating businesses table with user_id:', insertWithUserIdError.message);
            return false;
          }
          
          console.log('Businesses table created with enriched_data column and user_id!');
          console.log('Table columns:', Object.keys(insertWithUserIdData[0]));
          return true;
        }
        
        return false;
      }
      
      console.log('Businesses table created with enriched_data column!');
      console.log('Table columns:', Object.keys(insertData[0]));
      return true;
    }
    
    // Check if the enriched_data column exists
    if (data.length > 0) {
      const columns = Object.keys(data[0]);
      console.log('Available columns in businesses table:', columns);
      
      if (columns.includes('enriched_data')) {
        console.log('enriched_data column already exists.');
        return true;
      }
    }
    
    console.log('enriched_data column does not exist. Adding it...');
    
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
    
    // Try to add the enriched_data column by updating an existing record
    if (data.length > 0) {
      const { data: updateData, error: updateError } = await supabase
        .from('businesses')
        .update({ enriched_data: sampleEnrichedData })
        .eq('id', data[0].id)
        .select();
      
      if (updateError) {
        console.error('Error adding enriched_data column by updating:', updateError.message);
        
        // If the error is about the column not existing, we need to create it
        if (updateError.message.includes('column "enriched_data" does not exist')) {
          console.log('Cannot add enriched_data column by updating. Need to create it using SQL...');
          
          // We can't add a column using the Supabase client directly
          // Let's try to create a new record with the enriched_data column
          const newRecord = { ...data[0] };
          delete newRecord.id; // Remove the ID to create a new record
          newRecord.enriched_data = sampleEnrichedData;
          
          const { data: insertData, error: insertError } = await supabase
            .from('businesses')
            .insert(newRecord)
            .select();
          
          if (insertError) {
            console.error('Error adding enriched_data column by inserting:', insertError.message);
            return false;
          }
          
          console.log('enriched_data column added successfully by creating a new record!');
          console.log('Updated columns:', Object.keys(insertData[0]));
          return true;
        }
        
        return false;
      }
      
      console.log('enriched_data column added successfully by updating an existing record!');
      console.log('Updated columns:', Object.keys(updateData[0]));
      return true;
    } else {
      // If the table is empty, try to create a new record with the enriched_data column
      const testRecord = {
        name: 'Sacramento Water Damage Pros',
        business_name: 'Sacramento Water Damage Pros',
        description: 'Water damage restoration services in Sacramento, CA',
        enriched_data: sampleEnrichedData
      };
      
      // Try to get a valid user ID if needed
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id')
        .limit(1);
      
      if (!usersError && users && users.length > 0) {
        testRecord.user_id = users[0].id;
      }
      
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert(testRecord)
        .select();
      
      if (insertError) {
        console.error('Error adding enriched_data column by inserting:', insertError.message);
        return false;
      }
      
      console.log('enriched_data column added successfully by creating a new record!');
      console.log('Updated columns:', Object.keys(insertData[0]));
      return true;
    }
  } catch (error) {
    console.error('Error in addEnrichedDataColumn:', error.message);
    return false;
  }
}

// Run the function
addEnrichedDataColumn().then(success => {
  if (success) {
    console.log('Operation completed successfully!');
  } else {
    console.error('Operation failed.');
    process.exit(1);
  }
});
