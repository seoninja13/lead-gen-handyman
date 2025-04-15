/**
 * Script to create a new enriched_businesses table to store enriched data
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Create a new enriched_businesses table
 */
async function createEnrichedBusinessesTable() {
  try {
    console.log('Creating enriched_businesses table...');
    
    // First, check if the enriched_businesses table exists
    const { data, error } = await supabase
      .from('enriched_businesses')
      .select('*')
      .limit(1);
    
    if (!error) {
      console.log('enriched_businesses table already exists.');
      return true;
    }
    
    console.log('enriched_businesses table does not exist. Creating it...');
    
    // Create a test record to create the table
    const testRecord = {
      business_name: 'Test Business',
      enriched_data: { test: true }
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('enriched_businesses')
      .insert(testRecord)
      .select();
    
    if (insertError) {
      console.error('Error creating enriched_businesses table:', insertError.message);
      return false;
    }
    
    console.log('enriched_businesses table created successfully!');
    console.log('Table columns:', Object.keys(insertData[0]));
    
    // Clean up the test record
    await supabase
      .from('enriched_businesses')
      .delete()
      .eq('id', insertData[0].id);
    
    return true;
  } catch (error) {
    console.error('Error in createEnrichedBusinessesTable:', error.message);
    return false;
  }
}

/**
 * Update the saveEnrichedDataToBusinesses utility to use the enriched_businesses table
 */
async function updateSaveEnrichedDataToBusinessesUtility() {
  try {
    console.log('Updating saveEnrichedDataToBusinesses utility...');
    
    // Create a new version of the utility that uses the enriched_businesses table
    const utilityCode = `/**
 * Utility to save enriched data to the enriched_businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Save enriched data to the enriched_businesses table
 * 
 * @param {string} businessName - The business name
 * @param {Object} enrichedData - The enriched data in the format provided
 * @returns {Promise<Object>} - The saved record
 */
async function saveEnrichedDataToBusinesses(businessName, enrichedData) {
  try {
    console.log(\`Saving enriched data for \${businessName} to enriched_businesses table...\`);
    
    // Check if a record with this business name already exists
    const { data: existingRecords, error: queryError } = await supabase
      .from('enriched_businesses')
      .select('id, business_name')
      .eq('business_name', businessName)
      .limit(1);
    
    if (queryError) {
      console.error('Error checking for existing record:', queryError);
      
      // If the table doesn't exist, create it
      console.log('Trying to create enriched_businesses table...');
      
      // Insert a record with the required columns
      const { data: insertData, error: insertError } = await supabase
        .from('enriched_businesses')
        .insert({
          business_name: businessName,
          enriched_data: enrichedData
        })
        .select();
      
      if (insertError) {
        console.error('Error creating enriched_businesses table:', insertError);
        throw insertError;
      }
      
      console.log('enriched_businesses table created and enriched data saved successfully!');
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
        .from('enriched_businesses')
        .update(record)
        .eq('id', existingRecords[0].id)
        .select();
      
      if (error) {
        console.error('Error updating enriched data:', error);
        throw error;
      }
      
      result = { data, updated: true };
      console.log(\`Updated enriched data for "\${businessName}" in enriched_businesses table\`);
    } 
    // Otherwise, insert a new record
    else {
      const { data, error } = await supabase
        .from('enriched_businesses')
        .insert(record)
        .select();
      
      if (error) {
        console.error('Error inserting enriched data:', error);
        throw error;
      }
      
      result = { data, updated: false };
      console.log(\`Inserted new enriched data for "\${businessName}" in enriched_businesses table\`);
    }
    
    return result;
  } catch (error) {
    console.error('Error in saveEnrichedDataToBusinesses:', error);
    throw error;
  }
}

/**
 * Get enriched data from the enriched_businesses table
 * 
 * @param {string} businessName - The business name
 * @returns {Promise<Object>} - The enriched data
 */
async function getEnrichedDataFromBusinesses(businessName) {
  try {
    console.log(\`Getting enriched data for \${businessName} from enriched_businesses table...\`);
    
    const { data, error } = await supabase
      .from('enriched_businesses')
      .select('*')
      .eq('business_name', businessName)
      .single();
    
    if (error) {
      console.error(\`Error getting enriched data for \${businessName}:\`, error);
      throw error;
    }
    
    return data.enriched_data;
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
    console.log('Starting process to create enriched_businesses table and update utility...');
    
    // Create the enriched_businesses table
    const tableResult = await createEnrichedBusinessesTable();
    if (!tableResult) {
      console.error('Failed to create enriched_businesses table.');
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
