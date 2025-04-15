/**
 * Script to add enriched_data column to businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function addEnrichedDataColumn() {
  try {
    console.log('Adding enriched_data column to businesses table...');

    // First, check if the businesses table exists
    const { data: existingData, error: existingError } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);

    if (existingError) {
      console.error('Error checking businesses table:', existingError);

      // If the table doesn't exist, create it
      console.log('Creating businesses table...');

      // Insert a test record to create the table with the enriched_data column
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert({
          business_name: 'Test Business',
          enriched_data: {
            reviewInsights: {
              summary: 'Test summary',
              strengths: ['Test strength 1', 'Test strength 2'],
              areasForImprovement: ['Test area 1', 'Test area 2'],
              testimonialHighlights: ['Test testimonial 1', 'Test testimonial 2']
            },
            serviceDetails: {
              primaryServices: [
                {
                  name: 'Test Service',
                  description: 'Test description',
                  estimatedCost: 'Test cost'
                }
              ],
              specializations: ['Test specialization 1', 'Test specialization 2'],
              certifications: ['Test certification 1', 'Test certification 2']
            },
            restorationTechniques: {
              waterExtractionMethods: ['Test method 1', 'Test method 2'],
              dryingTechniques: ['Test technique 1', 'Test technique 2'],
              moistureDetectionTools: ['Test tool 1', 'Test tool 2'],
              specializedEquipment: ['Test equipment 1', 'Test equipment 2']
            },
            remediationProcess: {
              assessmentPhase: {
                description: 'Test description',
                steps: ['Test step 1', 'Test step 2']
              },
              containmentPhase: {
                description: 'Test description',
                steps: ['Test step 1', 'Test step 2']
              },
              removalPhase: {
                description: 'Test description',
                steps: ['Test step 1', 'Test step 2']
              },
              preventionPhase: {
                description: 'Test description',
                steps: ['Test step 1', 'Test step 2']
              },
              testingPhase: {
                description: 'Test description',
                steps: ['Test step 1', 'Test step 2']
              }
            }
          }
        })
        .select();

      if (insertError) {
        console.error('Error creating businesses table:', insertError);
        return;
      }

      console.log('Businesses table created with enriched_data column!');
      console.log('Table schema:', Object.keys(insertData[0]));

      // Clean up the test record
      const { error: deleteError } = await supabase
        .from('businesses')
        .delete()
        .eq('id', insertData[0].id);

      if (deleteError) {
        console.error('Error deleting test record:', deleteError);
      } else {
        console.log('Test record deleted successfully!');
      }
    } else {
      console.log('Businesses table exists.');

      // Since the table exists but might be empty, try to insert a record with the enriched_data column
      console.log('Trying to insert a record with enriched_data column...');

      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert({
          enriched_data: {
            reviewInsights: {
              summary: 'Test summary',
              strengths: ['Test strength 1', 'Test strength 2'],
              areasForImprovement: ['Test area 1', 'Test area 2'],
              testimonialHighlights: ['Test testimonial 1', 'Test testimonial 2']
            }
          }
        })
        .select();

        if (insertError) {
          console.error('Error inserting record with enriched_data column:', insertError);
          return;
        }

        console.log('enriched_data column added successfully!');
        console.log('Table schema:', Object.keys(insertData[0]));

        // Clean up the test record
        const { error: deleteError } = await supabase
          .from('businesses')
          .delete()
          .eq('id', insertData[0].id);

        if (deleteError) {
          console.error('Error deleting test record:', deleteError);
        } else {
          console.log('Test record deleted successfully!');
        }
    }
  } catch (error) {
    console.error('Error adding enriched_data column:', error);
  }
}

// Run the function
addEnrichedDataColumn();
