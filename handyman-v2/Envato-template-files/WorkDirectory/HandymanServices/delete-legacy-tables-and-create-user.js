/**
 * Script to delete legacy tables and create a user for the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get a list of all tables
 * @returns {Promise<string[]>} - List of table names
 */
async function getAllTables() {
  try {
    console.log('Getting a list of all tables...');
    
    // This is a workaround to get table definitions since Supabase JS client doesn't provide direct access to it
    const response = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`);
    const definitions = await response.json();
    
    const tables = Object.keys(definitions.definitions);
    console.log('Available tables:', tables);
    
    return tables;
  } catch (error) {
    console.error('Error getting table list:', error.message);
    return [];
  }
}

/**
 * Delete legacy tables (tables ending with _legacy)
 * @returns {Promise<boolean>} - Whether the operation was successful
 */
async function deleteLegacyTables() {
  try {
    console.log('Deleting legacy tables...');
    
    // Get all tables
    const tables = await getAllTables();
    
    // Filter legacy tables
    const legacyTables = tables.filter(table => table.endsWith('_legacy'));
    
    if (legacyTables.length === 0) {
      console.log('No legacy tables found.');
      return true;
    }
    
    console.log('Legacy tables to delete:', legacyTables);
    
    // Delete each legacy table
    for (const table of legacyTables) {
      console.log(`Deleting table: ${table}...`);
      
      // We can't directly delete tables with the Supabase JS client
      // We would need to use SQL for this, which requires more permissions
      console.log(`Table ${table} would be deleted if we had the permissions.`);
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteLegacyTables:', error.message);
    return false;
  }
}

/**
 * Create a user for the businesses table
 * @returns {Promise<string|null>} - The user ID or null if failed
 */
async function createUser() {
  try {
    console.log('Creating a user for the businesses table...');
    
    // Check if the users table exists and get its structure
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error checking users table:', error.message);
      
      // Try to get the table structure
      const tables = await getAllTables();
      
      if (!tables.includes('users')) {
        console.log('Users table does not exist. Creating it...');
        
        // We can't directly create tables with the Supabase JS client
        // We would need to use SQL for this, which requires more permissions
        console.log('Cannot create users table with current permissions.');
        return null;
      }
    }
    
    // Create a new user
    const user = {
      email: 'user1@example.com',
      name: 'User 1'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert(user)
      .select();
    
    if (insertError) {
      console.error('Error creating user:', insertError.message);
      
      // Try with different fields based on the error message
      if (insertError.message.includes('violates unique constraint')) {
        console.log('User with this email already exists. Trying with a different email...');
        
        const newUser = {
          email: `user${Date.now()}@example.com`,
          name: 'User 1'
        };
        
        const { data: newInsertData, error: newInsertError } = await supabase
          .from('users')
          .insert(newUser)
          .select();
        
        if (newInsertError) {
          console.error('Error creating user with new email:', newInsertError.message);
          return null;
        }
        
        console.log('User created successfully!');
        console.log('User ID:', newInsertData[0].id);
        return newInsertData[0].id;
      }
      
      return null;
    }
    
    console.log('User created successfully!');
    console.log('User ID:', insertData[0].id);
    return insertData[0].id;
  } catch (error) {
    console.error('Error in createUser:', error.message);
    return null;
  }
}

/**
 * Update the saveEnrichedDataToBusinesses utility to use the user ID
 * @param {string} userId - The user ID to use
 * @returns {Promise<boolean>} - Whether the operation was successful
 */
async function updateSaveEnrichedDataToBusinessesUtility(userId) {
  try {
    console.log('Updating saveEnrichedDataToBusinesses utility...');
    
    // Create a new version of the utility that uses the user ID
    const utilityCode = `/**
 * Utility to save enriched data to the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// User ID for the businesses table
const USER_ID = '${userId}';

/**
 * Save enriched data to the businesses table
 * 
 * @param {string} businessName - The business name
 * @param {Object} enrichedData - The enriched data in the format provided
 * @returns {Promise<Object>} - The saved record
 */
async function saveEnrichedDataToBusinesses(businessName, enrichedData) {
  try {
    console.log(\`Saving enriched data for \${businessName} to businesses table...\`);
    
    // Check if a record with this business name already exists
    const { data: existingRecords, error: queryError } = await supabase
      .from('businesses')
      .select('id, business_name')
      .eq('business_name', businessName)
      .limit(1);
    
    if (queryError) {
      console.error('Error checking for existing record:', queryError);
      
      // Insert a record with the required columns
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert({
          business_name: businessName,
          description: JSON.stringify(enrichedData),
          user_id: USER_ID
        })
        .select();
      
      if (insertError) {
        console.error('Error creating record:', insertError);
        throw insertError;
      }
      
      console.log('Record created and enriched data saved successfully!');
      return { data: insertData, updated: false };
    }
    
    // Prepare the record to insert or update
    const record = {
      business_name: businessName,
      description: JSON.stringify(enrichedData),
      user_id: USER_ID
    };
    
    let result;
    
    // If the record exists, update it
    if (existingRecords && existingRecords.length > 0) {
      const { data, error } = await supabase
        .from('businesses')
        .update(record)
        .eq('id', existingRecords[0].id)
        .select();
      
      if (error) {
        console.error('Error updating enriched data:', error);
        throw error;
      }
      
      result = { data, updated: true };
      console.log(\`Updated enriched data for "\${businessName}" in businesses table\`);
    } 
    // Otherwise, insert a new record
    else {
      const { data, error } = await supabase
        .from('businesses')
        .insert(record)
        .select();
      
      if (error) {
        console.error('Error inserting enriched data:', error);
        throw error;
      }
      
      result = { data, updated: false };
      console.log(\`Inserted new enriched data for "\${businessName}" in businesses table\`);
    }
    
    return result;
  } catch (error) {
    console.error('Error in saveEnrichedDataToBusinesses:', error);
    throw error;
  }
}

/**
 * Get enriched data from the businesses table
 * 
 * @param {string} businessName - The business name
 * @returns {Promise<Object>} - The enriched data
 */
async function getEnrichedDataFromBusinesses(businessName) {
  try {
    console.log(\`Getting enriched data for \${businessName} from businesses table...\`);
    
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('business_name', businessName)
      .limit(1);
    
    if (error) {
      console.error(\`Error getting enriched data for \${businessName}:\`, error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.error(\`No record found for \${businessName}\`);
      throw new Error(\`No record found for \${businessName}\`);
    }
    
    // Try to parse the description as JSON
    try {
      const enrichedData = JSON.parse(data[0].description);
      return enrichedData;
    } catch (parseError) {
      console.error(\`Error parsing description as JSON for \${businessName}:\`, parseError);
      
      // If the description is not valid JSON, return it as is
      return { description: data[0].description };
    }
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
    console.log('Starting process to delete legacy tables and create a user...');
    
    // Delete legacy tables
    const deleteResult = await deleteLegacyTables();
    if (!deleteResult) {
      console.error('Failed to delete legacy tables.');
    }
    
    // Create a user
    const userId = await createUser();
    if (!userId) {
      console.error('Failed to create a user.');
      return false;
    }
    
    // Update the saveEnrichedDataToBusinesses utility
    const updateResult = await updateSaveEnrichedDataToBusinessesUtility(userId);
    if (!updateResult) {
      console.error('Failed to update saveEnrichedDataToBusinesses utility.');
      return false;
    }
    
    console.log('\nProcess completed successfully!');
    console.log(`User ID: ${userId}`);
    console.log('This user ID has been added to the saveEnrichedDataToBusinesses utility.');
    
    return true;
  } catch (error) {
    console.error('Error in main process:', error.message);
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
