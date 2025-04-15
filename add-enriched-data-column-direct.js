/**
 * Script to directly add the enriched_data column to the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Create a new businesses table with the enriched_data column
 */
async function createNewBusinessesTable() {
  try {
    console.log('Creating a new businesses table with enriched_data column...');
    
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
      
      console.log('enriched_data column does not exist. Will create a new table with this column.');
    }
    
    // Create a new table called businesses_new with the enriched_data column
    console.log('Creating businesses_new table...');
    
    // Get a valid user ID to use for the test record
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (usersError) {
      console.error('Error getting user ID:', usersError.message);
      return false;
    }
    
    if (!users || users.length === 0) {
      console.error('No users found in the users table.');
      return false;
    }
    
    const userId = users[0].id;
    console.log('Using user ID:', userId);
    
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
    console.error('Error in createNewBusinessesTable:', error.message);
    return false;
  }
}

/**
 * Create a new providers table with the enriched_data column
 */
async function createNewProvidersTable() {
  try {
    console.log('Creating a new providers table with enriched_data column...');
    
    // First, check if the providers table exists
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .limit(1);
    
    if (!error) {
      console.log('Providers table already exists. Getting its structure...');
      
      // Get the structure of the existing table
      const columns = data.length > 0 ? Object.keys(data[0]) : [];
      console.log('Existing columns:', columns);
      
      if (columns.includes('enriched_data')) {
        console.log('enriched_data column already exists in providers table. No action needed.');
        return true;
      }
      
      console.log('enriched_data column does not exist in providers table. Will create a new table with this column.');
    }
    
    // Create a new table called providers_new with the enriched_data column
    console.log('Creating providers_new table...');
    
    // Get a valid user ID to use for the test record
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (usersError) {
      console.error('Error getting user ID:', usersError.message);
      return false;
    }
    
    if (!users || users.length === 0) {
      console.error('No users found in the users table.');
      return false;
    }
    
    const userId = users[0].id;
    console.log('Using user ID:', userId);
    
    // Create a test record with the enriched_data column
    const testRecord = {
      business_name: 'Test Provider',
      description: 'Test description',
      enriched_data: { test: true },
      user_id: userId
    };
    
    // Insert the test record to create the table
    const { data: insertData, error: insertError } = await supabase
      .from('providers_new')
      .insert(testRecord)
      .select();
    
    if (insertError) {
      console.error('Error creating providers_new table:', insertError.message);
      return false;
    }
    
    console.log('providers_new table created successfully!');
    console.log('Table columns:', Object.keys(insertData[0]));
    
    // Clean up the test record
    await supabase
      .from('providers_new')
      .delete()
      .eq('id', insertData[0].id);
    
    return true;
  } catch (error) {
    console.error('Error in createNewProvidersTable:', error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting process to add enriched_data column to tables...');
    
    // Create a new businesses table with the enriched_data column
    const businessesResult = await createNewBusinessesTable();
    if (!businessesResult) {
      console.error('Failed to create new businesses table with enriched_data column.');
    }
    
    // Create a new providers table with the enriched_data column
    const providersResult = await createNewProvidersTable();
    if (!providersResult) {
      console.error('Failed to create new providers table with enriched_data column.');
    }
    
    console.log('Process completed!');
  } catch (error) {
    console.error('Error in main process:', error.message);
  }
}

// Run the main function
main();
