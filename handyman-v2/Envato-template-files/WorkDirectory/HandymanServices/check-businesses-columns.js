/**
 * Script to check if the businesses table exists and what columns it has
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkBusinessesTable() {
  try {
    console.log('Checking if businesses table exists...');
    
    // Try to select from the businesses table
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error checking businesses table:', error);
      
      if (error.code === 'PGRST204') {
        console.log('The businesses table does not exist.');
      } else {
        console.log('Unknown error checking businesses table.');
      }
      
      return;
    }
    
    console.log('The businesses table exists!');
    
    if (data && data.length > 0) {
      console.log('Columns in the businesses table:');
      console.log(Object.keys(data[0]));
      
      // Check if the enriched_data column exists
      if ('enriched_data' in data[0]) {
        console.log('The enriched_data column exists!');
      } else {
        console.log('The enriched_data column does not exist.');
      }
    } else {
      console.log('The businesses table is empty.');
      
      // Try to insert a record to see what columns are available
      console.log('Trying to insert a record to see what columns are available...');
      
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert({
          name: 'Test Business',
          description: 'Test description'
        })
        .select();
      
      if (insertError) {
        console.error('Error inserting record:', insertError);
      } else {
        console.log('Record inserted successfully!');
        console.log('Columns in the businesses table:');
        console.log(Object.keys(insertData[0]));
        
        // Check if the enriched_data column exists
        if ('enriched_data' in insertData[0]) {
          console.log('The enriched_data column exists!');
        } else {
          console.log('The enriched_data column does not exist.');
        }
        
        // Clean up the test record
        const { error: deleteError } = await supabase
          .from('businesses')
          .delete()
          .eq('id', insertData[0].id);
        
        if (deleteError) {
          console.error('Error deleting test record:', deleteError);
        } else {
          console.log('Test record deleted successfully!');
        }
      }
    }
  } catch (error) {
    console.error('Error checking businesses table:', error);
  }
}

// Run the function
checkBusinessesTable();
