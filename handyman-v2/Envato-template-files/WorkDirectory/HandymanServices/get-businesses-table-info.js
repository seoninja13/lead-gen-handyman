/**
 * Script to get information about the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get information about the businesses table
 */
async function getBusinessesTableInfo() {
  try {
    console.log('Getting information about the businesses table...');
    
    // Try to get the structure of the businesses table
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(10);
    
    if (error) {
      console.error('Error getting businesses table structure:', error.message);
      return;
    }
    
    console.log('Businesses table exists.');
    
    if (data && data.length > 0) {
      console.log('Businesses table has data.');
      console.log('Number of records:', data.length);
      console.log('Columns:', Object.keys(data[0]));
      console.log('Sample record:', data[0]);
    } else {
      console.log('Businesses table is empty.');
    }
    
    // Try to get the table definition
    console.log('\nTrying to get table definition...');
    
    try {
      // This is a workaround to get table definition since Supabase JS client doesn't provide direct access to it
      const response = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`);
      const definitions = await response.json();
      
      console.log('Available tables:', Object.keys(definitions.definitions));
      
      if (definitions.definitions.businesses) {
        console.log('Businesses table definition:', definitions.definitions.businesses);
        console.log('Businesses table properties:', Object.keys(definitions.definitions.businesses.properties));
      } else {
        console.log('Businesses table definition not found.');
      }
    } catch (definitionError) {
      console.error('Error getting table definition:', definitionError.message);
    }
    
    // Try to insert a record with just the description column
    console.log('\nTrying to insert a record with just the description column...');
    
    const { data: insertData, error: insertError } = await supabase
      .from('businesses')
      .insert({
        description: 'Test description'
      })
      .select();
    
    if (insertError) {
      console.error('Error inserting record with just description:', insertError.message);
      
      // Try to get more information about the error
      if (insertError.message.includes('violates not-null constraint')) {
        console.log('The table has not-null constraints. Trying to identify required columns...');
        
        // Try to insert with different combinations of columns
        const testColumns = ['id', 'name', 'business_name', 'user_id', 'created_at', 'updated_at'];
        
        for (const column of testColumns) {
          const testRecord = {
            description: 'Test description'
          };
          
          if (column === 'id') {
            testRecord.id = '00000000-0000-0000-0000-000000000001';
          } else if (column === 'name') {
            testRecord.name = 'Test Name';
          } else if (column === 'business_name') {
            testRecord.business_name = 'Test Business Name';
          } else if (column === 'user_id') {
            testRecord.user_id = '00000000-0000-0000-0000-000000000001';
          } else if (column === 'created_at') {
            testRecord.created_at = new Date().toISOString();
          } else if (column === 'updated_at') {
            testRecord.updated_at = new Date().toISOString();
          }
          
          console.log(`Trying with ${column}:`, testRecord);
          
          const { data: testData, error: testError } = await supabase
            .from('businesses')
            .insert(testRecord)
            .select();
          
          if (testError) {
            console.error(`Error inserting with ${column}:`, testError.message);
          } else {
            console.log(`Successfully inserted with ${column}:`, testData);
          }
        }
      }
    } else {
      console.log('Successfully inserted record with just description:', insertData);
    }
  } catch (error) {
    console.error('Error in getBusinessesTableInfo:', error.message);
  }
}

// Run the function
getBusinessesTableInfo();
