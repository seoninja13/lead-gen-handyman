/**
 * Script to add a business with enriched data
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Add a business with enriched data
 */
async function addBusinessWithEnrichedData() {
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

    // First, check the structure of the businesses table
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error checking businesses table:', error.message);

      // If the table doesn't exist, create it
      console.log('Businesses table does not exist. Creating it...');

      // Create a test record
      const testRecord = {
        name: 'Sacramento Water Damage Pros',
        business_name: 'Sacramento Water Damage Pros',
        description: JSON.stringify(sampleEnrichedData)
      };

      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert(testRecord)
        .select();

      if (insertError) {
        console.error('Error creating businesses table:', insertError.message);

        // If the error is about the user_id column, try to get a valid user ID
        if (insertError.message.includes('user_id')) {
          console.log('Error with user_id. Trying to get a valid user ID...');

          // Try to get a valid user ID from the users table
          const { data: users, error: usersError } = await supabase
            .from('users')
            .select('id')
            .limit(1);

          if (usersError || !users || users.length === 0) {
            console.error('Error getting valid user ID:', usersError ? usersError.message : 'No users found');

            // Try to create a user
            console.log('Trying to create a user...');

            const { data: newUser, error: newUserError } = await supabase
              .from('users')
              .insert({
                email: 'test@example.com',
                name: 'Test User'
              })
              .select();

            if (newUserError) {
              console.error('Error creating user:', newUserError.message);
              return false;
            }

            console.log('User created successfully!');
            testRecord.user_id = newUser[0].id;
          } else {
            console.log('Found valid user ID:', users[0].id);
            testRecord.user_id = users[0].id;
          }

          // Try again with the user_id
          const { data: insertWithUserIdData, error: insertWithUserIdError } = await supabase
            .from('businesses')
            .insert(testRecord)
            .select();

          if (insertWithUserIdError) {
            console.error('Error creating businesses table with user_id:', insertWithUserIdError.message);
            return false;
          }

          console.log('Businesses table created with enriched data in description column!');
          console.log('Table columns:', Object.keys(insertWithUserIdData[0]));
          return true;
        }

        return false;
      }

      console.log('Businesses table created with enriched data in description column!');
      console.log('Table columns:', Object.keys(insertData[0]));
      return true;
    }

    console.log('Businesses table already exists.');

    // Get the table structure
    console.log('Getting table structure...');
    if (data.length > 0) {
      const columns = Object.keys(data[0]);
      console.log('Available columns in businesses table:', columns);

      // Check if there's already a record with the same name or business_name
      let existingRecords = [];
      let queryError = null;

      if (columns.includes('name') && columns.includes('business_name')) {
        const result = await supabase
          .from('businesses')
          .select('id, name, business_name')
          .or('name.eq.Sacramento Water Damage Pros,business_name.eq.Sacramento Water Damage Pros')
          .limit(1);

        existingRecords = result.data;
        queryError = result.error;
      } else if (columns.includes('name')) {
        const result = await supabase
          .from('businesses')
          .select('id, name')
          .eq('name', 'Sacramento Water Damage Pros')
          .limit(1);

        existingRecords = result.data;
        queryError = result.error;
      } else if (columns.includes('business_name')) {
        const result = await supabase
          .from('businesses')
          .select('id, business_name')
          .eq('business_name', 'Sacramento Water Damage Pros')
          .limit(1);

        existingRecords = result.data;
        queryError = result.error;
      } else {
        // Neither name nor business_name column exists
        console.log('Neither name nor business_name column exists in the businesses table');

        // Get all records to see what's in the table
        const result = await supabase
          .from('businesses')
          .select('*')
          .limit(10);

        console.log('Sample records:', result.data);

        // Just get the first record to update
        existingRecords = result.data && result.data.length > 0 ? [result.data[0]] : [];
        queryError = result.error;
      }

      if (queryError) {
        console.error('Error checking for existing record:', queryError.message);
        return false;
      }
    } else {
      console.log('Businesses table is empty. Creating a new record...');
      existingRecords = [];
    }

    // Prepare the record based on available columns
    const record = {};

    // Add name and business_name if the columns exist
    if (data.length > 0) {
      const columns = Object.keys(data[0]);

      if (columns.includes('name')) {
        record.name = 'Sacramento Water Damage Pros';
      }

      if (columns.includes('business_name')) {
        record.business_name = 'Sacramento Water Damage Pros';
      }

      // Store enriched data in the description column as JSON
      if (columns.includes('description')) {
        record.description = JSON.stringify(sampleEnrichedData);
      } else {
        // If description column doesn't exist, add it
        record.description = JSON.stringify(sampleEnrichedData);
      }
    } else {
      // If the table is empty, add basic fields
      record.name = 'Sacramento Water Damage Pros';
      record.business_name = 'Sacramento Water Damage Pros';
      record.description = JSON.stringify(sampleEnrichedData);
    }

    // Try to get a valid user ID if needed
    if (data.length > 0 && Object.keys(data[0]).includes('user_id')) {
      console.log('user_id column exists. Getting a valid user ID...');

      // Try to get a valid user ID from the users table
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id')
        .limit(1);

      if (usersError || !users || users.length === 0) {
        console.error('Error getting valid user ID:', usersError ? usersError.message : 'No users found');

        // Try to create a user
        console.log('Trying to create a user...');

        const { data: newUser, error: newUserError } = await supabase
          .from('users')
          .insert({
            email: 'test@example.com',
            name: 'Test User'
          })
          .select();

        if (newUserError) {
          console.error('Error creating user:', newUserError.message);
        } else {
          console.log('User created successfully!');
          record.user_id = newUser[0].id;
        }
      } else {
        console.log('Found valid user ID:', users[0].id);
        record.user_id = users[0].id;
      }
    }

    // If the record exists, update it
    if (existingRecords && existingRecords.length > 0) {
      console.log('Record already exists. Updating it...');

      const { data: updateData, error: updateError } = await supabase
        .from('businesses')
        .update(record)
        .eq('id', existingRecords[0].id)
        .select();

      if (updateError) {
        console.error('Error updating record:', updateError.message);

        // If the error is about the user_id column, try without it
        if (updateError.message.includes('user_id')) {
          console.log('Error with user_id. Trying without it...');

          delete record.user_id;

          const { data: noUserIdData, error: noUserIdError } = await supabase
            .from('businesses')
            .update(record)
            .eq('id', existingRecords[0].id)
            .select();

          if (noUserIdError) {
            console.error('Error updating without user_id:', noUserIdError.message);
            return false;
          }

          console.log('Record updated without user_id successfully!');
          console.log('Updated columns:', Object.keys(noUserIdData[0]));
          return true;
        }

        return false;
      }

      console.log('Record updated successfully!');
      console.log('Updated columns:', Object.keys(updateData[0]));
      return true;
    }
    // Otherwise, insert a new record
    else {
      console.log('Record does not exist. Creating it...');

      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert(record)
        .select();

      if (insertError) {
        console.error('Error inserting record:', insertError.message);

        // If the error is about the user_id column, try without it
        if (insertError.message.includes('user_id')) {
          console.log('Error with user_id. Trying without it...');

          delete record.user_id;

          const { data: noUserIdData, error: noUserIdError } = await supabase
            .from('businesses')
            .insert(record)
            .select();

          if (noUserIdError) {
            console.error('Error inserting without user_id:', noUserIdError.message);
            return false;
          }

          console.log('Record inserted without user_id successfully!');
          console.log('Inserted columns:', Object.keys(noUserIdData[0]));
          return true;
        }

        return false;
      }

      console.log('Record inserted successfully!');
      console.log('Inserted columns:', Object.keys(insertData[0]));
      return true;
    }
  } catch (error) {
    console.error('Error in addBusinessWithEnrichedData:', error.message);
    return false;
  }
}

// Run the function
addBusinessWithEnrichedData().then(success => {
  if (success) {
    console.log('Operation completed successfully!');
  } else {
    console.error('Operation failed.');
    process.exit(1);
  }
});
