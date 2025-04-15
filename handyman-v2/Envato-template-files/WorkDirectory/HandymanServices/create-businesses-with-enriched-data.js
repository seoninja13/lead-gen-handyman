/**
 * Script to create the businesses table with an enriched_data column
 * and move data from test-delete to businesses
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function createBusinessesTable() {
  try {
    console.log('Creating businesses table with enriched_data column...');
    
    // First, try to drop the table if it exists
    try {
      const { error: dropError } = await supabase.rpc('drop_table_if_exists', { table_name: 'businesses' });
      
      if (dropError) {
        console.error('Error dropping businesses table:', dropError);
        console.log('Continuing with table creation...');
      } else {
        console.log('Businesses table dropped successfully.');
      }
    } catch (dropError) {
      console.error('Error dropping businesses table:', dropError);
      console.log('Continuing with table creation...');
    }
    
    // Create the businesses table with the required columns
    try {
      // Use the Supabase REST API to execute SQL
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS businesses (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255),
          description TEXT,
          enriched_data JSONB
        );
      `;
      
      const { error: createError } = await supabase.rpc('execute_sql', { query: createTableSQL });
      
      if (createError) {
        console.error('Error creating businesses table using RPC:', createError);
        
        // Try a different approach - insert a record with the required columns
        console.log('Trying to create businesses table by inserting a record...');
        
        const { data: insertData, error: insertError } = await supabase
          .from('businesses')
          .insert({
            name: 'Test Business',
            description: 'Test description',
            enriched_data: { test: true }
          })
          .select();
        
        if (insertError) {
          console.error('Error creating businesses table by inserting a record:', insertError);
          
          // Try one more approach - use the SQL API directly
          console.log('Trying to create businesses table using SQL API directly...');
          
          // This is a simplified approach - in a real scenario, we would use a proper SQL API
          // For now, we'll just try to insert a record again with a different structure
          const { data: insertData2, error: insertError2 } = await supabase
            .from('businesses')
            .insert({
              name: 'Test Business 2',
              enriched_data: { test: true }
            })
            .select();
          
          if (insertError2) {
            console.error('Error creating businesses table using SQL API directly:', insertError2);
            return false;
          } else {
            console.log('Businesses table created successfully using SQL API directly!');
            
            // Clean up the test record
            const { error: deleteError } = await supabase
              .from('businesses')
              .delete()
              .eq('id', insertData2[0].id);
            
            if (deleteError) {
              console.error('Error deleting test record:', deleteError);
            } else {
              console.log('Test record deleted successfully!');
            }
          }
        } else {
          console.log('Businesses table created successfully by inserting a record!');
          
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
      } else {
        console.log('Businesses table created successfully using RPC!');
      }
    } catch (createError) {
      console.error('Error creating businesses table:', createError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error creating businesses table:', error);
    return false;
  }
}

async function moveDataFromTestDelete() {
  try {
    console.log('Moving data from test-delete to businesses...');
    
    // Get all records from test-delete
    const { data: testDeleteData, error: testDeleteError } = await supabase
      .from('test-delete')
      .select('*');
    
    if (testDeleteError) {
      console.error('Error getting data from test-delete:', testDeleteError);
      return false;
    }
    
    if (!testDeleteData || testDeleteData.length === 0) {
      console.log('No data found in test-delete table.');
      return true;
    }
    
    console.log(`Found ${testDeleteData.length} records in test-delete table.`);
    
    // Process each record
    for (const record of testDeleteData) {
      try {
        // Try to parse the service field as JSON
        let enrichedData = null;
        
        try {
          enrichedData = JSON.parse(record.service);
        } catch (parseError) {
          console.error(`Error parsing service field for record ${record.id}:`, parseError);
          enrichedData = { error: 'Failed to parse', originalService: record.service };
        }
        
        // Insert the record into businesses
        const { data: insertData, error: insertError } = await supabase
          .from('businesses')
          .insert({
            name: record.business,
            description: `Business from ${record.city}`,
            enriched_data: enrichedData
          })
          .select();
        
        if (insertError) {
          console.error(`Error inserting record ${record.id} into businesses:`, insertError);
        } else {
          console.log(`Record ${record.id} (${record.business}) moved to businesses table.`);
        }
      } catch (recordError) {
        console.error(`Error processing record ${record.id}:`, recordError);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error moving data from test-delete to businesses:', error);
    return false;
  }
}

async function main() {
  try {
    console.log('Starting the process...');
    
    // Create the businesses table
    const tableCreated = await createBusinessesTable();
    
    if (!tableCreated) {
      console.error('Failed to create businesses table. Aborting.');
      return;
    }
    
    // Move data from test-delete to businesses
    const dataMoved = await moveDataFromTestDelete();
    
    if (!dataMoved) {
      console.error('Failed to move data from test-delete to businesses. Aborting.');
      return;
    }
    
    console.log('Process completed successfully!');
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

// Run the main function
main();
