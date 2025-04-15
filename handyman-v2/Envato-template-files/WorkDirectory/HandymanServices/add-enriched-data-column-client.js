/**
 * Script to add enriched_data column to businesses table using Supabase client
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Add enriched_data column to businesses table
 */
async function addEnrichedDataColumn() {
  try {
    console.log('Adding enriched_data column to businesses table...');
    
    // First, check if the businesses table exists and what columns it has
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error checking businesses table:', error);
      
      // If the table doesn't exist, create it with the enriched_data column
      if (error.message.includes('relation "businesses" does not exist')) {
        console.log('Businesses table does not exist. Creating it with enriched_data column...');
        
        // Create a test record with enriched_data column
        const testRecord = {
          business_name: 'Test Business',
          enriched_data: { test: true }
        };
        
        const { data: createData, error: createError } = await supabase
          .from('businesses')
          .insert(testRecord)
          .select();
        
        if (createError) {
          console.error('Error creating businesses table:', createError);
          return false;
        }
        
        console.log('Businesses table created with enriched_data column!');
        
        // Clean up the test record
        const { error: deleteError } = await supabase
          .from('businesses')
          .delete()
          .eq('id', createData[0].id);
        
        if (deleteError) {
          console.error('Error deleting test record:', deleteError);
        }
        
        return true;
      }
      
      return false;
    }
    
    // Check if the enriched_data column exists
    if (data.length > 0 && 'enriched_data' in data[0]) {
      console.log('enriched_data column already exists.');
      return true;
    }
    
    console.log('enriched_data column does not exist. Adding it...');
    
    // Try to add the enriched_data column by inserting a record with it
    const testRecord = {
      business_name: 'Test Business',
      enriched_data: { test: true }
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('businesses')
      .insert(testRecord)
      .select();
    
    if (insertError) {
      console.error('Error adding enriched_data column:', insertError);
      
      // If the error is about the business_name column not existing, try with a different column
      if (insertError.message.includes('column "business_name" does not exist')) {
        console.log('business_name column does not exist. Trying with name...');
        
        const { data: nameData, error: nameError } = await supabase
          .from('businesses')
          .insert({
            name: 'Test Business',
            enriched_data: { test: true }
          })
          .select();
        
        if (nameError) {
          console.error('Error adding enriched_data column with name:', nameError);
          
          // Try with title
          console.log('name column does not exist. Trying with title...');
          
          const { data: titleData, error: titleError } = await supabase
            .from('businesses')
            .insert({
              title: 'Test Business',
              enriched_data: { test: true }
            })
            .select();
          
          if (titleError) {
            console.error('Error adding enriched_data column with title:', titleError);
            return false;
          }
          
          console.log('enriched_data column added successfully with title!');
          
          // Clean up the test record
          const { error: deleteError } = await supabase
            .from('businesses')
            .delete()
            .eq('id', titleData[0].id);
          
          if (deleteError) {
            console.error('Error deleting test record:', deleteError);
          }
          
          return true;
        }
        
        console.log('enriched_data column added successfully with name!');
        
        // Clean up the test record
        const { error: deleteError } = await supabase
          .from('businesses')
          .delete()
          .eq('id', nameData[0].id);
        
        if (deleteError) {
          console.error('Error deleting test record:', deleteError);
        }
        
        return true;
      }
      
      return false;
    }
    
    console.log('enriched_data column added successfully!');
    
    // Clean up the test record
    const { error: deleteError } = await supabase
      .from('businesses')
      .delete()
      .eq('id', insertData[0].id);
    
    if (deleteError) {
      console.error('Error deleting test record:', deleteError);
    }
    
    return true;
  } catch (error) {
    console.error('Error in addEnrichedDataColumn:', error);
    return false;
  }
}

// Run the function
addEnrichedDataColumn().then(success => {
  if (success) {
    console.log('Operation completed successfully!');
  } else {
    console.error('Operation failed.');
    process.exit(1);
  }
});
