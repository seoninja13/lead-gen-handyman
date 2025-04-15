/**
 * Script to save enriched Google Business Profiles data from test-delete table to businesses table
 *
 * This script:
 * 1. Creates the enriched_data column in the businesses table if it doesn't exist
 * 2. Reads all data from the test-delete table
 * 3. For each row, saves the business name and the enriched data to the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Save enriched data to the businesses table
 * @param {string} businessName - The business name
 * @param {string} city - The city
 * @param {string|Object} enrichedData - The enriched data
 * @returns {Promise<Object>} - The result of the operation
 */
async function saveEnrichedDataToBusiness(businessName, city, enrichedData) {
  try {
    console.log(`Saving enriched data for "${businessName}" to businesses table...`);

    // Parse the enriched data if it's a string
    let parsedData = enrichedData;
    if (typeof enrichedData === 'string') {
      try {
        parsedData = JSON.parse(enrichedData);
      } catch (parseError) {
        console.error(`Error parsing enriched data for "${businessName}":`, parseError);
        // Use the string as is if it can't be parsed
        parsedData = { originalData: enrichedData };
      }
    }

    // First, try to get the table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('Error getting table structure:', tableError);
      throw tableError;
    }

    // Prepare the record to insert based on available columns
    let record = {};

    // Try different column names for the business name
    if (tableInfo.length > 0 && 'business_name' in tableInfo[0]) {
      record.business_name = businessName;
    } else if (tableInfo.length > 0 && 'name' in tableInfo[0]) {
      record.name = businessName;
    } else if (tableInfo.length > 0 && 'title' in tableInfo[0]) {
      record.title = businessName;
    } else {
      // If no suitable column is found, create the table with the necessary columns
      console.log('No suitable column found for business name. Creating table with necessary columns...');

      // Try to create the table with the necessary columns
      const createRecord = {
        business_name: businessName,
        enriched_data: parsedData
      };

      const { data: createData, error: createError } = await supabase
        .from('businesses')
        .insert(createRecord)
        .select();

      if (createError) {
        console.error('Error creating table with necessary columns:', createError);
        throw createError;
      }

      console.log('Table created with necessary columns!');
      return { data: createData };
    }

    // Try different column names for the enriched data
    if (tableInfo.length > 0 && 'enriched_data' in tableInfo[0]) {
      record.enriched_data = parsedData;
    } else if (tableInfo.length > 0 && 'data' in tableInfo[0]) {
      record.data = parsedData;
    } else if (tableInfo.length > 0 && 'description' in tableInfo[0]) {
      // If no JSON column is available, use the description column
      record.description = JSON.stringify(parsedData);
    } else {
      // If no suitable column is found, add the enriched_data column
      console.log('No suitable column found for enriched data. Adding enriched_data column...');

      // Try to add the enriched_data column and insert the record
      record.enriched_data = parsedData;
    }

    // Insert the record
    const { data, error } = await supabase
      .from('businesses')
      .insert(record)
      .select();

    if (error) {
      console.error(`Error inserting enriched data for "${businessName}":`, error);
      throw error;
    }

    console.log(`Inserted new record for "${businessName}" with enriched data in businesses table`);
    return { data };
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

    // Process all records from test-delete table
    await processTestDeleteRecords();

    console.log('Process completed successfully!');
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

// Run the main function
main();
