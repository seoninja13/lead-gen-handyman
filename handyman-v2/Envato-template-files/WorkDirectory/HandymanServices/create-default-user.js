/**
 * Script to create a default user in the users table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Create a default user in the users table
 */
async function createDefaultUser() {
  try {
    console.log('Creating default user in users table...');
    
    // First, check if the users table exists
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error checking users table:', error.message);
      
      // If the table doesn't exist, create it
      console.log('Trying to create users table...');
      
      // Create a test user
      const testUser = {
        id: '00000000-0000-0000-0000-000000000000',
        email: 'default@example.com',
        name: 'Default User'
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert(testUser)
        .select();
      
      if (insertError) {
        console.error('Error creating users table:', insertError.message);
        return false;
      }
      
      console.log('Users table created with default user!');
      console.log('Default user ID:', insertData[0].id);
      return true;
    }
    
    console.log('Users table already exists.');
    
    // Check if the default user exists
    const { data: defaultUser, error: defaultUserError } = await supabase
      .from('users')
      .select('*')
      .eq('id', '00000000-0000-0000-0000-000000000000')
      .limit(1);
    
    if (defaultUserError) {
      console.error('Error checking for default user:', defaultUserError.message);
      return false;
    }
    
    if (defaultUser && defaultUser.length > 0) {
      console.log('Default user already exists.');
      console.log('Default user ID:', defaultUser[0].id);
      return true;
    }
    
    // Create the default user
    console.log('Default user does not exist. Creating it...');
    
    const defaultUserData = {
      id: '00000000-0000-0000-0000-000000000000',
      email: 'default@example.com',
      name: 'Default User'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert(defaultUserData)
      .select();
    
    if (insertError) {
      console.error('Error creating default user:', insertError.message);
      
      // If we can't insert with a specific ID, try without it
      console.log('Trying to create default user without specific ID...');
      
      const { data: autoIdData, error: autoIdError } = await supabase
        .from('users')
        .insert({
          email: 'default@example.com',
          name: 'Default User'
        })
        .select();
      
      if (autoIdError) {
        console.error('Error creating default user with auto ID:', autoIdError.message);
        return false;
      }
      
      console.log('Default user created with auto ID!');
      console.log('Default user ID:', autoIdData[0].id);
      return true;
    }
    
    console.log('Default user created!');
    console.log('Default user ID:', insertData[0].id);
    return true;
  } catch (error) {
    console.error('Error in createDefaultUser:', error.message);
    return false;
  }
}

// Run the function
createDefaultUser().then(success => {
  if (success) {
    console.log('Operation completed successfully!');
  } else {
    console.error('Operation failed.');
    process.exit(1);
  }
});
