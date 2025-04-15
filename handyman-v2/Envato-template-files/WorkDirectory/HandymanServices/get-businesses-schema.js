/**
 * Script to get the schema of the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getBusinessesSchema() {
  try {
    console.log('Getting schema of the businesses table...');
    
    // Try different column names to see what works
    const columnNames = [
      'id',
      'name',
      'business_name',
      'title',
      'description',
      'address',
      'phone',
      'email',
      'website',
      'enriched_data',
      'created_at',
      'updated_at'
    ];
    
    for (const columnName of columnNames) {
      try {
        console.log(`Trying to select ${columnName} column...`);
        
        const { data, error } = await supabase
          .from('businesses')
          .select(columnName)
          .limit(1);
        
        if (error) {
          console.error(`Error selecting ${columnName} column:`, error.message);
        } else {
          console.log(`✓ ${columnName} column exists!`);
        }
      } catch (columnError) {
        console.error(`Error checking ${columnName} column:`, columnError);
      }
    }
    
    // Try to insert with different column combinations
    const testRecords = [
      { id: 1, business_name: 'Test Business 1' },
      { id: 2, name: 'Test Business 2' },
      { id: 3, title: 'Test Business 3' },
      { id: 4, business_name: 'Test Business 4', enriched_data: { test: true } }
    ];
    
    for (const record of testRecords) {
      try {
        console.log(`Trying to insert record:`, record);
        
        const { data, error } = await supabase
          .from('businesses')
          .insert(record)
          .select();
        
        if (error) {
          console.error('Error inserting record:', error.message);
        } else {
          console.log('Record inserted successfully!');
          console.log('Columns in the businesses table:');
          console.log(Object.keys(data[0]));
          
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
          
          // We found a working combination, so we can stop
          break;
        }
      } catch (insertError) {
        console.error('Error inserting record:', insertError);
      }
    }
  } catch (error) {
    console.error('Error getting businesses schema:', error);
  }
}

// Run the function
getBusinessesSchema();
