/**
 * Script to execute SQL directly on Supabase
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function executeSql(sqlFilePath) {
  try {
    console.log(`Executing SQL from file: ${sqlFilePath}`);

    // Read the SQL file
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    console.log('SQL to execute:', sql);

    // First, try using the RPC function
    try {
      const { error } = await supabase.rpc('execute_sql', { query: sql });

      if (error) {
        console.error('Error executing SQL using RPC:', error);
        throw error;
      }

      console.log('SQL executed successfully using RPC!');
      return true;
    } catch (rpcError) {
      console.error('RPC method failed, trying alternative approach:', rpcError);

      // Try a different approach - create a test record with the enriched_data column
      const testData = {
        name: 'Test Business ' + new Date().toISOString(),
        description: 'Test description',
        enriched_data: { test: true }
      };

      const { data, error } = await supabase
        .from('businesses')
        .insert(testData)
        .select();

      if (error) {
        if (error.message.includes('column "enriched_data" does not exist')) {
          console.error('Column does not exist and cannot be added automatically.');
        } else {
          console.error('Error inserting test record:', error);
        }
        throw error;
      }

      console.log('Test record inserted successfully with enriched_data column!');

      // Clean up the test record
      const { error: deleteError } = await supabase
        .from('businesses')
        .delete()
        .eq('id', data[0].id);

      if (deleteError) {
        console.error('Error deleting test record:', deleteError);
      }

      return true;
    }
  } catch (error) {
    console.error('Error executing SQL:', error);
    return false;
  }
}

// Execute the SQL file
const sqlFilePath = process.argv[2];
if (!sqlFilePath) {
  console.error('Please provide the path to the SQL file as an argument.');
  process.exit(1);
}

executeSql(sqlFilePath).then(success => {
  if (success) {
    console.log('Operation completed successfully!');
  } else {
    console.error('Operation failed.');
    process.exit(1);
  }
});
