/**
 * Script to save enriched Google Business Profiles data from test-delete table to businesses table
 * 
 * This script reads all data from the test-delete table, parses the JSON data in the service column,
 * and saves it to the description column in the businesses table.
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
 * @param {string} enrichedDataJson - The enriched data as a JSON string
 * @returns {Promise<Object>} - The result of the operation
 */
async function saveEnrichedDataToBusiness(businessName, enrichedDataJson) {
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
      description: enrichedDataJson
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
        await saveEnrichedDataToBusiness(record.business, record.service);
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
