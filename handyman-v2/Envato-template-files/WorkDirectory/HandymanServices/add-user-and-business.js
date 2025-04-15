/**
 * Script to add a user and then add a business with enriched data
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Add a user to the users table
 * @returns {Promise<string|null>} - The user ID or null if failed
 */
async function addUser() {
  try {
    console.log('Adding user to users table...');
    
    // First, check if the users table exists
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error checking users table:', error.message);
      
      // Try to create the users table
      console.log('Trying to create users table...');
      
      // Create a test user
      const testUser = {
        email: 'test@example.com',
        name: 'Test User'
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert(testUser)
        .select();
      
      if (insertError) {
        console.error('Error creating users table:', insertError.message);
        return null;
      }
      
      console.log('User created successfully!');
      console.log('User ID:', insertData[0].id);
      return insertData[0].id;
    }
    
    console.log('Users table exists.');
    
    // Check if there are any users
    if (data && data.length > 0) {
      console.log('Found existing user.');
      console.log('User ID:', data[0].id);
      return data[0].id;
    }
    
    // Create a new user
    console.log('No users found. Creating a new user...');
    
    const testUser = {
      email: 'test@example.com',
      name: 'Test User'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert(testUser)
      .select();
    
    if (insertError) {
      console.error('Error creating user:', insertError.message);
      return null;
    }
    
    console.log('User created successfully!');
    console.log('User ID:', insertData[0].id);
    return insertData[0].id;
  } catch (error) {
    console.error('Error in addUser:', error.message);
    return null;
  }
}

/**
 * Add a business with enriched data
 * @param {string} userId - The user ID
 * @returns {Promise<boolean>} - Whether the operation was successful
 */
async function addBusinessWithEnrichedData(userId) {
  try {
    console.log('Adding business with enriched data...');
    
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
    
    // Create a business record
    const businessRecord = {
      business_name: 'Sacramento Water Damage Pros',
      description: JSON.stringify(sampleEnrichedData),
      enriched_description: JSON.stringify(sampleEnrichedData),
      user_id: userId,
      phone: '(916) 555-1234',
      website: 'https://sacramentowaterdamage.example.com',
      full_address: '1234 Main Street, Sacramento, CA 95814'
    };
    
    // Check if a business with this name already exists
    const { data: existingBusinesses, error: queryError } = await supabase
      .from('businesses')
      .select('id, business_name')
      .eq('business_name', 'Sacramento Water Damage Pros')
      .limit(1);
    
    if (queryError) {
      console.error('Error checking for existing business:', queryError.message);
      return false;
    }
    
    // If the business exists, update it
    if (existingBusinesses && existingBusinesses.length > 0) {
      console.log('Business already exists. Updating it...');
      
      const { data: updateData, error: updateError } = await supabase
        .from('businesses')
        .update(businessRecord)
        .eq('id', existingBusinesses[0].id)
        .select();
      
      if (updateError) {
        console.error('Error updating business:', updateError.message);
        return false;
      }
      
      console.log('Business updated successfully!');
      console.log('Business ID:', updateData[0].id);
      return true;
    }
    
    // Otherwise, insert a new business
    console.log('Business does not exist. Creating it...');
    
    const { data: insertData, error: insertError } = await supabase
      .from('businesses')
      .insert(businessRecord)
      .select();
    
    if (insertError) {
      console.error('Error creating business:', insertError.message);
      return false;
    }
    
    console.log('Business created successfully!');
    console.log('Business ID:', insertData[0].id);
    return true;
  } catch (error) {
    console.error('Error in addBusinessWithEnrichedData:', error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Add a user
    const userId = await addUser();
    if (!userId) {
      console.error('Failed to add user.');
      return false;
    }
    
    // Add a business with enriched data
    const result = await addBusinessWithEnrichedData(userId);
    if (!result) {
      console.error('Failed to add business with enriched data.');
      return false;
    }
    
    console.log('Successfully added user and business with enriched data!');
    return true;
  } catch (error) {
    console.error('Error in main:', error.message);
    return false;
  }
}

// Run the main function
main().then(success => {
  if (success) {
    console.log('Operation completed successfully!');
  } else {
    console.error('Operation failed.');
    process.exit(1);
  }
});
