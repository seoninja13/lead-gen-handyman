/**
 * Script to check the schema of the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkBusinessesSchema() {
  try {
    console.log('Checking businesses table schema...');
    
    // Get a single record to check the schema
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error fetching businesses:', error);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('Businesses table schema:');
      console.log(Object.keys(data[0]));
    } else {
      console.log('No records found in businesses table.');
      
      // Try to get the table definition
      const { data: definition, error: defError } = await supabase
        .rpc('get_table_definition', { table_name: 'businesses' });
      
      if (defError) {
        console.error('Error getting table definition:', defError);
      } else {
        console.log('Table definition:', definition);
      }
    }
  } catch (error) {
    console.error('Error checking businesses schema:', error);
  }
}

// Run the function
checkBusinessesSchema();
