/**
 * Simple script to check the businesses table schema
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkBusinessesTable() {
  try {
    console.log('Checking businesses table...');
    
    // Try to insert a minimal test record
    const testRecord = {
      enriched_data: { test: true }
    };
    
    const { data, error } = await supabase
      .from('businesses')
      .insert(testRecord)
      .select();
    
    if (error) {
      console.error('Error inserting test record:', error);
    } else {
      console.log('Test record inserted successfully!');
      console.log('Businesses table schema:', Object.keys(data[0]));
      
      // Clean up the test record
      const { error: deleteError } = await supabase
        .from('businesses')
        .delete()
        .eq('id', data[0].id);
      
      if (deleteError) {
        console.error('Error deleting test record:', deleteError);
      } else {
        console.log('Test record deleted successfully!');
      }
    }
  } catch (error) {
    console.error('Error checking businesses table:', error);
  }
}

// Run the function
checkBusinessesTable();
