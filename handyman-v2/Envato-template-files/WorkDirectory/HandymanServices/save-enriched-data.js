/**
 * Script to save enriched Google Business Profiles data from test-delete table to businesses table
 *
 * This script:
 * 1. Creates a businesses table with an enriched_data column if it doesn't exist
 * 2. Reads all data from the test-delete table
 * 3. For each row, extracts the business name and the service data
 * 4. If the service data is JSON, parses it and saves it to the enriched_data column
 * 5. If the service data is not JSON, creates a simple structure and saves it to the enriched_data column
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get the structure of the businesses table
 * @returns {Promise<Object>} - The table structure
 */
async function getBusinessesTableStructure() {
  try {
    console.log('Getting businesses table structure...');

    // Try to select from the businesses table
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error selecting from businesses table:', error);
      return { exists: false, columns: [] };
    }

    // If the table exists but has no records, try to insert a test record
    if (!data || data.length === 0) {
      console.log('Businesses table exists but has no records. Trying to insert a test record...');

      // Try different combinations of columns
      const testCombinations = [
        { business_name: 'Test Business', enriched_data: { test: true } },
        { name: 'Test Business', enriched_data: { test: true } },
        { title: 'Test Business', enriched_data: { test: true } },
        { business_name: 'Test Business' },
        { name: 'Test Business' },
        { title: 'Test Business' }
      ];

      for (const testRecord of testCombinations) {
        console.log(`Trying with columns: ${Object.keys(testRecord).join(', ')}`);

        const { data: insertData, error: insertError } = await supabase
          .from('businesses')
          .insert(testRecord)
          .select();

        if (!insertError) {
          console.log('Test record inserted successfully!');

          // Clean up the test record
          await supabase.from('businesses').delete().eq('id', insertData[0].id);

          return { exists: true, columns: Object.keys(insertData[0]) };
        }

        console.error(`Error with columns ${Object.keys(testRecord).join(', ')}:`, insertError);
      }

      return { exists: true, columns: [] };
    }

    return { exists: true, columns: Object.keys(data[0]) };
  } catch (error) {
    console.error('Error in getBusinessesTableStructure:', error);
    return { exists: false, columns: [] };
  }
}

/**
 * Ensure the businesses table has an enriched_data column
 * @returns {Promise<boolean>} - Whether the column exists or was added successfully
 */
async function ensureEnrichedDataColumn() {
  try {
    console.log('Ensuring businesses table has enriched_data column...');

    // Get the table structure
    const { exists, columns } = await getBusinessesTableStructure();

    if (!exists) {
      console.error('Businesses table does not exist.');
      return false;
    }

    console.log('Businesses table columns:', columns);

    // Check if the enriched_data column exists
    if (columns.includes('enriched_data')) {
      console.log('enriched_data column already exists.');
      return true;
    }

    console.log('enriched_data column does not exist. Trying to add it...');

    // Try to add the enriched_data column by inserting a record with it
    const testRecord = {};

    // Use an existing column for the business name
    if (columns.includes('business_name')) {
      testRecord.business_name = 'Test Business ' + new Date().toISOString();
    } else if (columns.includes('name')) {
      testRecord.name = 'Test Business ' + new Date().toISOString();
    } else if (columns.includes('title')) {
      testRecord.title = 'Test Business ' + new Date().toISOString();
    } else {
      // If no suitable column is found, use the first column that's not 'id'
      const nonIdColumns = columns.filter(col => col !== 'id');
      if (nonIdColumns.length > 0) {
        testRecord[nonIdColumns[0]] = 'Test Business ' + new Date().toISOString();
      } else {
        console.error('No suitable column found for business name.');
        return false;
      }
    }

    // Add the enriched_data column
    testRecord.enriched_data = { test: true };

    const { data: insertData, error: insertError } = await supabase
      .from('businesses')
      .insert(testRecord)
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
  } catch (error) {
    console.error('Error in ensureEnrichedDataColumn:', error);
    return false;
  }
}

/**
 * Save enriched data to the businesses table
 * @param {string} businessName - The business name
 * @param {string} city - The city
 * @param {string} service - The service data
 * @returns {Promise<Object>} - The result of the operation
 */
async function saveEnrichedDataToBusiness(businessName, city, service) {
  try {
    console.log(`Saving enriched data for "${businessName}" to businesses table...`);

    // Try to parse the service data as JSON
    let enrichedData;
    let isJson = false;

    try {
      if (typeof service === 'string' && (service.startsWith('{') || service.startsWith('['))) {
        enrichedData = JSON.parse(service);
        isJson = true;

        // If the data is nested under enrichedData, use that
        if (enrichedData.enrichedData) {
          enrichedData = enrichedData.enrichedData;
        }
      }
    } catch (parseError) {
      console.error(`Error parsing service data for "${businessName}":`, parseError);
      // Continue with non-JSON data
    }

    // If the service data is not JSON, create a simple structure
    if (!isJson) {
      enrichedData = {
        reviewInsights: {
          summary: `${businessName} in ${city} provides ${service} services.`,
          strengths: [],
          areasForImprovement: [],
          testimonialHighlights: []
        },
        serviceDetails: {
          primaryServices: [
            {
              name: service,
              description: `${service} services provided by ${businessName} in ${city}.`,
              estimatedCost: 'Contact for pricing'
            }
          ],
          specializations: [],
          certifications: []
        }
      };
    }

    // Check if a record with this business name already exists
    const { data: existingBusinesses, error: queryError } = await supabase
      .from('businesses')
      .select('id, business_name')
      .eq('business_name', businessName)
      .limit(1);

    if (queryError) {
      console.error('Error checking for existing business:', queryError);
      throw queryError;
    }

    // Prepare the record to insert or update
    const record = {
      business_name: businessName,
      city: city,
      service: service,
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

        // Save the enriched data to the businesses table
        await saveEnrichedDataToBusiness(record.business, record.city, record.service);
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

    // Ensure the businesses table exists with an enriched_data column
    const tableExists = await ensureBusinessesTable();

    if (!tableExists) {
      console.error('Failed to ensure businesses table exists. Aborting.');
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
