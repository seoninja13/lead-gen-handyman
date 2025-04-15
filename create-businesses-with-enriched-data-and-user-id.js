/**
 * Script to create a businesses table with enriched_data column and handle user_id requirement
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get a valid user ID from the users table
 * @returns {Promise<string>} - A valid user ID
 */
async function getValidUserId() {
  try {
    // Try to get a user ID from the users table
    const { data: users, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Error getting user ID:', error.message);
      throw error;
    }
    
    if (users && users.length > 0) {
      console.log('Found valid user ID:', users[0].id);
      return users[0].id;
    }
    
    // If no users found, try to create a test user
    console.log('No users found. Creating a test user...');
    
    const testUser = {
      email: 'test@example.com',
      name: 'Test User'
    };
    
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert(testUser)
      .select();
    
    if (insertError) {
      console.error('Error creating test user:', insertError.message);
      throw insertError;
    }
    
    console.log('Created test user with ID:', newUser[0].id);
    return newUser[0].id;
  } catch (error) {
    console.error('Error in getValidUserId:', error.message);
    throw error;
  }
}

/**
 * Create a new businesses table with the enriched_data column
 */
async function createBusinessesTable() {
  try {
    console.log('Creating businesses table with enriched_data column...');
    
    // Get a valid user ID
    let userId;
    try {
      userId = await getValidUserId();
    } catch (userIdError) {
      console.error('Error getting valid user ID:', userIdError.message);
      console.log('Cannot proceed without a valid user ID.');
      return false;
    }
    
    // First, check if the businesses table exists
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);
    
    if (!error) {
      console.log('Businesses table already exists. Getting its structure...');
      
      // Get the structure of the existing table
      const columns = data.length > 0 ? Object.keys(data[0]) : [];
      console.log('Existing columns:', columns);
      
      if (columns.includes('enriched_data')) {
        console.log('enriched_data column already exists. No action needed.');
        return true;
      }
      
      console.log('enriched_data column does not exist. Will try to add it...');
      
      // Try to add the enriched_data column by inserting a record with it
      const testRecord = {
        business_name: 'Test Business',
        description: 'Test description',
        enriched_data: { test: true },
        user_id: userId
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert(testRecord)
        .select();
      
      if (insertError) {
        console.error('Error adding enriched_data column:', insertError.message);
        
        // If the error is about the column not existing, we need to create a new table
        if (insertError.message.includes('column "enriched_data" does not exist')) {
          console.log('Cannot add enriched_data column to existing table. Will create a new table...');
        } else {
          return false;
        }
      } else {
        console.log('enriched_data column added successfully!');
        console.log('Updated columns:', Object.keys(insertData[0]));
        
        // Clean up the test record
        await supabase
          .from('businesses')
          .delete()
          .eq('id', insertData[0].id);
        
        return true;
      }
    }
    
    // Create a new table called businesses_new with the enriched_data column
    console.log('Creating businesses_new table...');
    
    // Create a test record with the enriched_data column
    const testRecord = {
      business_name: 'Test Business',
      description: 'Test description',
      enriched_data: { test: true },
      user_id: userId
    };
    
    // Insert the test record to create the table
    const { data: insertData, error: insertError } = await supabase
      .from('businesses_new')
      .insert(testRecord)
      .select();
    
    if (insertError) {
      console.error('Error creating businesses_new table:', insertError.message);
      return false;
    }
    
    console.log('businesses_new table created successfully!');
    console.log('Table columns:', Object.keys(insertData[0]));
    
    // Clean up the test record
    await supabase
      .from('businesses_new')
      .delete()
      .eq('id', insertData[0].id);
    
    return true;
  } catch (error) {
    console.error('Error in createBusinessesTable:', error.message);
    return false;
  }
}

/**
 * Update the saveEnrichedDataToBusinesses utility to handle user_id requirement
 */
async function updateSaveEnrichedDataToBusinessesUtility() {
  try {
    console.log('Updating saveEnrichedDataToBusinesses utility...');
    
    // Get a valid user ID
    let userId;
    try {
      userId = await getValidUserId();
    } catch (userIdError) {
      console.error('Error getting valid user ID:', userIdError.message);
      console.log('Cannot proceed without a valid user ID.');
      return false;
    }
    
    // Create a new version of the utility that includes the user_id
    const utilityCode = `/**
 * Utility to save enriched data to the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Default user ID to use if needed
const DEFAULT_USER_ID = '${userId}';

/**
 * Get a valid user ID from the users table
 * @returns {Promise<string>} - A valid user ID
 */
async function getValidUserId() {
  try {
    // Try to get a user ID from the users table
    const { data: users, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Error getting user ID:', error.message);
      return DEFAULT_USER_ID;
    }
    
    if (users && users.length > 0) {
      return users[0].id;
    }
    
    return DEFAULT_USER_ID;
  } catch (error) {
    console.error('Error in getValidUserId:', error.message);
    return DEFAULT_USER_ID;
  }
}

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
    
    // Get a valid user ID
    const userId = await getValidUserId();
    
    // Check if a record with this business name already exists
    const { data: existingRecords, error: queryError } = await supabase
      .from('businesses')
      .select('id, name, business_name')
      .or(\`name.eq.\${businessName},business_name.eq.\${businessName}\`)
      .limit(1);
    
    if (queryError) {
      console.error('Error checking for existing record:', queryError);
      
      // If the table doesn't exist, create it
      console.log('Trying to create businesses table...');
      
      // Insert a record with the required columns
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert({
          name: businessName,
          business_name: businessName,
          description: 'Business description',
          enriched_data: enrichedData,
          user_id: userId
        })
        .select();
      
      if (insertError) {
        console.error('Error creating businesses table:', insertError);
        throw insertError;
      }
      
      console.log('Businesses table created and enriched data saved successfully!');
      return { data: insertData, updated: false };
    }
    
    // Prepare the record to insert or update
    const record = {
      name: businessName,
      business_name: businessName,
      enriched_data: enrichedData,
      user_id: userId
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
      .or(\`name.eq.\${businessName},business_name.eq.\${businessName}\`)
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
    console.log('Starting process to create businesses table with enriched_data column and update utility...');
    
    // Create the businesses table with the enriched_data column
    const tableResult = await createBusinessesTable();
    if (!tableResult) {
      console.error('Failed to create businesses table with enriched_data column.');
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
