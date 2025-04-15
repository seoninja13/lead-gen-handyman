/**
 * Script to create the enriched_profiles table
 */

const fs = require('fs');
const path = require('path');
const executeSql = require('./utils/executeSql');

async function createEnrichedProfilesTable() {
  try {
    console.log('Creating enriched_profiles table...');
    
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'sql', 'create_enriched_profiles_table.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute the SQL
    await executeSql(sqlContent);
    
    console.log('Table created successfully!');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

// Run the function
createEnrichedProfilesTable();
