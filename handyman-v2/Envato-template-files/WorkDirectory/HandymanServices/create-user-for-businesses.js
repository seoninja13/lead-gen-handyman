/**
 * Script to create a user for the businesses table
 * 
 * This script will:
 * 1. Optionally clear the users table
 * 2. Create a new user
 * 3. Return the user ID for use with the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Configuration
const CLEAR_USERS_TABLE = true; // Set to true to clear the users table first
const NUM_USERS_TO_CREATE = 3;  // Number of users to create

/**
 * Clear the users table
 */
async function clearUsersTable() {
  try {
    console.log('Clearing users table...');
    
    // First, check if the users table exists
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      if (error.message.includes('does not exist')) {
        console.log('Users table does not exist. No need to clear it.');
        return true;
      }
      
      console.error('Error checking users table:', error.message);
      return false;
    }
    
    // Delete all records from the users table
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
    
    if (deleteError) {
      console.error('Error clearing users table:', deleteError.message);
      return false;
    }
    
    console.log('Users table cleared successfully!');
    return true;
  } catch (error) {
    console.error('Error in clearUsersTable:', error.message);
    return false;
  }
}

/**
 * Create a new user
 * @param {number} index - The index of the user to create
 * @returns {Promise<string|null>} - The user ID or null if failed
 */
async function createUser(index) {
  try {
    console.log(`Creating user${index}...`);
    
    // Create a new user
    const user = {
      email: `user${index}@example.com`,
      name: `User ${index}`
    };
    
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select();
    
    if (error) {
      console.error(`Error creating user${index}:`, error.message);
      return null;
    }
    
    console.log(`User${index} created successfully!`);
    console.log(`User ID: ${data[0].id}`);
    return data[0].id;
  } catch (error) {
    console.error(`Error in createUser(${index}):`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting process to create users for the businesses table...');
    
    // Clear the users table if configured to do so
    if (CLEAR_USERS_TABLE) {
      const clearResult = await clearUsersTable();
      if (!clearResult) {
        console.error('Failed to clear users table.');
      }
    }
    
    // Create the specified number of users
    const userIds = [];
    for (let i = 1; i <= NUM_USERS_TO_CREATE; i++) {
      const userId = await createUser(i);
      if (userId) {
        userIds.push(userId);
      }
    }
    
    if (userIds.length === 0) {
      console.error('Failed to create any users.');
      return false;
    }
    
    console.log('\nCreated users:');
    userIds.forEach((id, index) => {
      console.log(`User${index + 1} ID: ${id}`);
    });
    
    console.log('\nTo use these user IDs with the businesses table, update your code to include:');
    console.log(`const USER_ID = '${userIds[0]}';`);
    
    // Save the user IDs to a file for easy reference
    const fs = require('fs');
    fs.writeFileSync('user-ids.json', JSON.stringify(userIds, null, 2));
    console.log('\nUser IDs saved to user-ids.json');
    
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
