/**
 * Script to check the users table structure
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Check the users table structure
 */
async function checkUsersTable() {
  try {
    console.log('Checking users table structure...');
    
    // Try to get the structure of the users table
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error getting users table structure:', error.message);
      
      // Try to get a list of all tables
      console.log('\nTrying to get a list of all tables...');
      
      try {
        // This is a workaround to get table definition since Supabase JS client doesn't provide direct access to it
        const response = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`);
        const definitions = await response.json();
        
        console.log('Available tables:', Object.keys(definitions.definitions));
        
        // Check if the users table exists
        if (definitions.definitions.users) {
          console.log('Users table definition:', definitions.definitions.users);
          console.log('Users table properties:', Object.keys(definitions.definitions.users.properties));
        } else {
          console.log('Users table definition not found.');
        }
      } catch (definitionError) {
        console.error('Error getting table definition:', definitionError.message);
      }
      
      return;
    }
    
    console.log('Users table exists and is accessible.');
    
    if (data && data.length > 0) {
      console.log('Users table has data.');
      console.log('Number of records:', data.length);
      console.log('Columns:', Object.keys(data[0]));
      console.log('Sample record:', data[0]);
    } else {
      console.log('Users table is empty.');
      
      // Try to get the table structure
      console.log('\nTrying to get the table structure...');
      
      try {
        // This is a workaround to get table definition since Supabase JS client doesn't provide direct access to it
        const response = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`);
        const definitions = await response.json();
        
        // Check if the users table exists
        if (definitions.definitions.users) {
          console.log('Users table definition:', definitions.definitions.users);
          console.log('Users table properties:', Object.keys(definitions.definitions.users.properties));
        } else {
          console.log('Users table definition not found.');
        }
      } catch (definitionError) {
        console.error('Error getting table definition:', definitionError.message);
      }
    }
    
    // Try to create a simple user
    console.log('\nTrying to create a simple user...');
    
    const simpleUser = {
      email: 'simple@example.com',
      name: 'Simple User'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert(simpleUser)
      .select();
    
    if (insertError) {
      console.error('Error creating simple user:', insertError.message);
      
      // Try with different fields
      console.log('\nTrying with different fields...');
      
      const testFields = [
        { id: '00000000-0000-0000-0000-000000000001', email: 'test1@example.com', name: 'Test User 1' },
        { email: 'test2@example.com', name: 'Test User 2' },
        { username: 'testuser3', email: 'test3@example.com' },
        { user_name: 'testuser4', email: 'test4@example.com' }
      ];
      
      for (const fields of testFields) {
        console.log(`Trying with fields: ${JSON.stringify(fields)}`);
        
        const { data: testData, error: testError } = await supabase
          .from('users')
          .insert(fields)
          .select();
        
        if (testError) {
          console.error(`Error with fields ${JSON.stringify(fields)}:`, testError.message);
        } else {
          console.log(`Success with fields ${JSON.stringify(fields)}:`, testData);
          break;
        }
      }
    } else {
      console.log('Simple user created successfully!');
      console.log('User ID:', insertData[0].id);
    }
  } catch (error) {
    console.error('Error in checkUsersTable:', error.message);
  }
}

// Run the function
checkUsersTable();
