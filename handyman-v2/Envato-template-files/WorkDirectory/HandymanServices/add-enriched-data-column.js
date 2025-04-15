/**
 * Script to add enriched_data column to businesses table
 */

const fs = require('fs');
const path = require('path');
const executeSql = require('./utils/executeSql');

async function addEnrichedDataColumn() {
  try {
    console.log('Adding enriched_data column to businesses table...');
    
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'sql', 'add_enriched_data_column.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute the SQL
    await executeSql(sqlContent);
    
    console.log('Column added successfully!');
  } catch (error) {
    console.error('Error adding column:', error);
  }
}

// Run the function
addEnrichedDataColumn();
