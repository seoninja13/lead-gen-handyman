/**
 * Script to save enriched Google Business Profiles data from test-delete table to businesses table
 *
 * This script reads all data from the test-delete table, parses the JSON data in the service column,
 * and saves it to the enriched_data column in the businesses table.
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Ensure the businesses table has an enriched_data column
 * @returns {Promise<boolean>} - Whether the column exists or was created successfully
 */
async function ensureEnrichedDataColumn() {
  try {
    console.log('Ensuring businesses table has enriched_data column...');

    // First, check if the businesses table exists
    const { data: tableData, error: tableError } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('Error checking businesses table:', tableError);

      // Create the businesses table with the enriched_data column
      console.log('Creating businesses table with enriched_data column...');

      // Create a simple record to test
      const testData = {
        name: 'Test Business',
        description: 'Test description',
        enriched_data: {
          reviewInsights: {
            summary: 'Test summary'
          }
        }
      };

      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert(testData)
        .select();

      if (insertError) {
        console.error('Error creating businesses table:', insertError);
        return false;
      }

      console.log('Businesses table created with enriched_data column!');

      // Clean up the test record
      const { error: deleteError } = await supabase
        .from('businesses')
        .delete()
        .eq('id', insertData[0].id);

      if (deleteError) {
        console.error('Error deleting test record:', deleteError);
      }

      return true;
    }

    // The table exists, now check if it has the enriched_data column
    console.log('Businesses table exists. Checking for enriched_data column...');

    // Try to update a record with the enriched_data column
    if (tableData && tableData.length > 0) {
      const { error: updateError } = await supabase
        .from('businesses')
        .update({ enriched_data: { test: true } })
        .eq('id', tableData[0].id);

      if (updateError && updateError.message.includes('column "enriched_data" does not exist')) {
        console.log('enriched_data column does not exist. Creating it...');

        // Create a new record with the enriched_data column
        const testData = {
          name: 'Test Business ' + new Date().toISOString(),
          description: 'Test description',
          enriched_data: {
            reviewInsights: {
              summary: 'Test summary'
            }
          }
        };

        const { data: insertData, error: insertError } = await supabase
          .from('businesses')
          .insert(testData)
          .select();

        if (insertError) {
          console.error('Error adding enriched_data column:', insertError);
          return false;
        }

        console.log('enriched_data column added successfully!');

        // Clean up the test record
        const { error: deleteError } = await supabase
          .from('businesses')
          .delete()
          .eq('id', insertData[0].id);

        if (deleteError) {
          console.error('Error deleting test record:', deleteError);
        }

        return true;
      } else if (updateError) {
        console.error('Error checking enriched_data column:', updateError);
        return false;
      }

      console.log('enriched_data column exists!');
      return true;
    } else {
      // No records in the table, try to insert one with the enriched_data column
      const testData = {
        name: 'Test Business',
        description: 'Test description',
        enriched_data: {
          reviewInsights: {
            summary: 'Test summary'
          }
        }
      };

      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert(testData)
        .select();

      if (insertError && insertError.message.includes('column "enriched_data" does not exist')) {
        console.error('Error adding enriched_data column:', insertError);
        return false;
      } else if (insertError) {
        console.error('Error checking enriched_data column:', insertError);
        return false;
      }

      console.log('enriched_data column exists!');

      // Clean up the test record
      const { error: deleteError } = await supabase
        .from('businesses')
        .delete()
        .eq('id', insertData[0].id);

      if (deleteError) {
        console.error('Error deleting test record:', deleteError);
      }

      return true;
    }
  } catch (error) {
    console.error('Error in ensureEnrichedDataColumn:', error);
    return false;
  }
}

/**
 * Save enriched data to the businesses table
 * @param {string} businessName - The business name
 * @param {Object} enrichedData - The enriched data
 * @returns {Promise<Object>} - The result of the operation
 */
async function saveEnrichedDataToBusiness(businessName, enrichedData) {
  try {
    console.log(`Saving enriched data for "${businessName}" to businesses table...`);

    // Check if a record with this business name already exists
    const { data: existingBusinesses, error: queryError } = await supabase
      .from('businesses')
      .select('id, name')
      .eq('name', businessName)
      .limit(1);

    if (queryError) {
      console.error('Error checking for existing business:', queryError);
      throw queryError;
    }

    // Prepare the record to insert or update
    const record = {
      name: businessName,
      enriched_data: enrichedData
    };

    let result;

    // If the record exists, update it
    if (existingBusinesses && existingBusinesses.length > 0) {
      const { data, error } = await supabase
        .from('businesses')
        .update(record)
        .eq('id', existingBusinesses[0].id)
        .select();

      if (error) {
        console.error(`Error updating enriched data for "${businessName}":`, error);
        throw error;
      }

      result = { data, updated: true };
      console.log(`Updated enriched data for "${businessName}" in businesses table`);
    }
    // Otherwise, insert a new record
    else {
      const { data, error } = await supabase
        .from('businesses')
        .insert(record)
        .select();

      if (error) {
        console.error(`Error inserting enriched data for "${businessName}":`, error);
        throw error;
      }

      result = { data, updated: false };
      console.log(`Inserted new record for "${businessName}" with enriched data in businesses table`);
    }

    return result;
  } catch (error) {
    console.error(`Error in saveEnrichedDataToBusiness for "${businessName}":`, error);
    throw error;
  }
}

/**
 * Process all records from test-delete table and save to businesses table
 * @returns {Promise<void>}
 */
async function processTestDeleteRecords() {
  try {
    console.log('Processing records from test-delete table...');

    // Get all records from test-delete table
    const { data: testDeleteRecords, error: selectError } = await supabase
      .from('test-delete')
      .select('*');

    if (selectError) {
      console.error('Error getting records from test-delete table:', selectError);
      return;
    }

    if (!testDeleteRecords || testDeleteRecords.length === 0) {
      console.log('No records found in test-delete table.');
      return;
    }

    console.log(`Found ${testDeleteRecords.length} records in test-delete table.`);

    // Process each record
    let successCount = 0;
    let errorCount = 0;

    for (const record of testDeleteRecords) {
      try {
        console.log(`Processing record ${record.id}: ${record.business}`);

        // Try to parse the service field as JSON
        let enrichedData;

        try {
          // Check if the service field is a JSON string
          if (typeof record.service === 'string' && (record.service.startsWith('{') || record.service.startsWith('['))) {
            enrichedData = JSON.parse(record.service);

            // Check if the parsed data has the expected structure
            if (enrichedData.enrichedData) {
              // If the data is nested under enrichedData, use that
              enrichedData = enrichedData.enrichedData;
            } else if (enrichedData.reviewInsights || enrichedData.serviceDetails ||
                      enrichedData.remediationProcess || enrichedData.restorationTechniques) {
              // Data already has the expected structure, use as is
            } else {
              // Wrap the data in the expected structure
              enrichedData = {
                reviewInsights: {
                  summary: `Data from ${record.business} in ${record.city}`,
                  strengths: [],
                  areasForImprovement: [],
                  testimonialHighlights: []
                },
                serviceDetails: {
                  primaryServices: [],
                  specializations: [],
                  certifications: []
                },
                originalData: enrichedData
              };
            }
          } else {
            // If the service field is not JSON, create a simple structure
            enrichedData = {
              reviewInsights: {
                summary: `${record.business} in ${record.city}`,
                strengths: [],
                areasForImprovement: [],
                testimonialHighlights: []
              },
              serviceDetails: {
                primaryServices: [
                  {
                    name: record.service || 'General Services',
                    description: `Services provided by ${record.business} in ${record.city}`,
                    estimatedCost: 'Contact for pricing'
                  }
                ],
                specializations: [],
                certifications: []
              }
            };
          }
        } catch (parseError) {
          console.error(`Error parsing service field for record ${record.id}:`, parseError);

          // Create a simple structure for non-JSON service fields
          enrichedData = {
            reviewInsights: {
              summary: `${record.business} in ${record.city}`,
              strengths: [],
              areasForImprovement: [],
              testimonialHighlights: []
            },
            serviceDetails: {
              primaryServices: [
                {
                  name: record.service || 'General Services',
                  description: `Services provided by ${record.business} in ${record.city}`,
                  estimatedCost: 'Contact for pricing'
                }
              ],
              specializations: [],
              certifications: []
            },
            originalService: record.service
          };
        }

        // Save the enriched data to the businesses table
        await saveEnrichedDataToBusiness(record.business, enrichedData);
        successCount++;
      } catch (recordError) {
        console.error(`Error processing record ${record.id}:`, recordError);
        errorCount++;
      }
    }

    console.log(`Processing complete. Success: ${successCount}, Errors: ${errorCount}`);
  } catch (error) {
    console.error('Error in processTestDeleteRecords:', error);
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting process to save enriched data from test-delete to businesses...');

    // Ensure the businesses table has an enriched_data column
    const columnExists = await ensureEnrichedDataColumn();

    if (!columnExists) {
      console.error('Failed to ensure enriched_data column exists. Aborting.');
      return;
    }

    // Process all records from test-delete table
    await processTestDeleteRecords();

    console.log('Process completed successfully!');
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

// Run the main function
main();
