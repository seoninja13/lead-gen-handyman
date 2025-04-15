/**
 * Script to save existing enriched data from test-delete table to businesses table
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
 * @param {Object} enrichedData - The enriched data
 * @returns {Promise<Object>} - The result of the operation
 */
async function saveEnrichedDataToBusiness(businessName, enrichedData) {
  try {
    console.log(`Saving enriched data for "${businessName}" to businesses table...`);

    // First, try to get the table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('Error getting table structure:', tableError);
      throw tableError;
    }

    // Check what columns are available
    const columns = tableInfo.length > 0 ? Object.keys(tableInfo[0]) : [];
    console.log('Available columns in businesses table:', columns);

    // Prepare the record to insert based on available columns
    const record = {};

    // Set the business name using an available column
    if (columns.includes('business_name')) {
      record.business_name = businessName;
    } else if (columns.includes('name')) {
      record.name = businessName;
    } else if (columns.includes('title')) {
      record.title = businessName;
    } else {
      // If no suitable column is found, use the first column that's not 'id'
      const nonIdColumns = columns.filter(col => col !== 'id');
      if (nonIdColumns.length > 0) {
        record[nonIdColumns[0]] = businessName;
      } else {
        console.error('No suitable column found for business name.');
        throw new Error('No suitable column found for business name.');
      }
    }

    // Set the enriched data using an available column
    if (columns.includes('enriched_data')) {
      record.enriched_data = enrichedData;
    } else if (columns.includes('data')) {
      record.data = enrichedData;
    } else if (columns.includes('description')) {
      record.description = JSON.stringify(enrichedData);
    } else {
      // If no suitable column is found, use the first column that's not 'id' and not used for business name
      const businessNameColumn = Object.keys(record)[0];
      const nonIdColumns = columns.filter(col => col !== 'id' && col !== businessNameColumn);
      if (nonIdColumns.length > 0) {
        record[nonIdColumns[0]] = JSON.stringify(enrichedData);
      } else {
        console.error('No suitable column found for enriched data.');
        throw new Error('No suitable column found for enriched data.');
      }
    }

    console.log('Inserting record with columns:', Object.keys(record));

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
 * Main function
 */
async function main() {
  try {
    console.log('Starting process to save existing enriched data from test-delete to businesses table...');

    // Get records from test-delete table
    const { data: testDeleteRecords, error: selectError } = await supabase
      .from('test-delete')
      .select('*')
      .in('id', [7, 8]); // Only get records 7 and 8 which have JSON data

    if (selectError) {
      console.error('Error getting records from test-delete table:', selectError);
      return;
    }

    if (!testDeleteRecords || testDeleteRecords.length === 0) {
      console.log('No records found in test-delete table with IDs 7 and 8.');
      return;
    }

    console.log(`Found ${testDeleteRecords.length} records in test-delete table with enriched data.`);

    // Process each record
    for (const record of testDeleteRecords) {
      try {
        console.log(`Processing record ${record.id}: ${record.business}`);

        // Parse the service field as JSON
        let enrichedData;
        try {
          enrichedData = JSON.parse(record.service);
        } catch (parseError) {
          console.error(`Error parsing service field for record ${record.id}:`, parseError);
          continue;
        }

        // Save the enriched data to the businesses table
        await saveEnrichedDataToBusiness(record.business, enrichedData);
      } catch (recordError) {
        console.error(`Error processing record ${record.id}:`, recordError);
      }
    }

    console.log('Process completed successfully!');
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

// Run the main function
main();
