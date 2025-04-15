/**
 * Script to check the businesses table structure
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Check the businesses table structure
 */
async function checkBusinessesTable() {
  try {
    console.log('Checking businesses table structure...');
    
    // Try to get the structure of the businesses table
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error getting businesses table structure:', error.message);
      return;
    }
    
    console.log('Businesses table exists and is accessible.');
    
    if (data && data.length > 0) {
      console.log('Businesses table has data.');
      console.log('Number of records:', data.length);
      console.log('Columns:', Object.keys(data[0]));
      console.log('Sample record:', data[0]);
      
      // Check if the user_id column exists and is required
      if (Object.keys(data[0]).includes('user_id')) {
        console.log('user_id column exists.');
        
        // Try to insert a record without user_id to see if it's required
        console.log('\nTrying to insert a record without user_id...');
        
        const testRecord = {
          business_name: 'Test Business',
          description: 'Test description'
        };
        
        const { data: insertData, error: insertError } = await supabase
          .from('businesses')
          .insert(testRecord)
          .select();
        
        if (insertError) {
          console.error('Error inserting record without user_id:', insertError.message);
          
          if (insertError.message.includes('violates not-null constraint')) {
            console.log('user_id column is required (not nullable).');
          }
        } else {
          console.log('Record inserted without user_id successfully!');
          console.log('user_id column is not required (nullable).');
          
          // Clean up the test record
          await supabase
            .from('businesses')
            .delete()
            .eq('id', insertData[0].id);
        }
      } else {
        console.log('user_id column does not exist.');
      }
    } else {
      console.log('Businesses table is empty.');
      
      // Try to insert a record to see the structure
      console.log('\nTrying to insert a record to see the structure...');
      
      const testRecord = {
        business_name: 'Test Business',
        description: 'Test description'
      };
      
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert(testRecord)
        .select();
      
      if (insertError) {
        console.error('Error inserting record:', insertError.message);
        
        if (insertError.message.includes('violates not-null constraint')) {
          console.log('Some columns are required (not nullable).');
          
          // Try with different combinations of fields
          console.log('\nTrying with different combinations of fields...');
          
          const testRecords = [
            { business_name: 'Test Business', description: 'Test description', user_id: '00000000-0000-0000-0000-000000000001' },
            { name: 'Test Business', description: 'Test description' },
            { business_name: 'Test Business', name: 'Test Business', description: 'Test description' }
          ];
          
          for (const record of testRecords) {
            console.log(`Trying with fields: ${JSON.stringify(record)}`);
            
            const { data: testData, error: testError } = await supabase
              .from('businesses')
              .insert(record)
              .select();
            
            if (testError) {
              console.error(`Error with fields ${JSON.stringify(record)}:`, testError.message);
            } else {
              console.log(`Success with fields ${JSON.stringify(record)}:`, testData);
              
              // Clean up the test record
              await supabase
                .from('businesses')
                .delete()
                .eq('id', testData[0].id);
              
              break;
            }
          }
        }
      } else {
        console.log('Record inserted successfully!');
        console.log('Table columns:', Object.keys(insertData[0]));
        
        // Clean up the test record
        await supabase
          .from('businesses')
          .delete()
          .eq('id', insertData[0].id);
      }
    }
  } catch (error) {
    console.error('Error in checkBusinessesTable:', error.message);
  }
}

// Run the function
checkBusinessesTable();
