/**
 * Script to create the businesses table with an enriched_data column
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
    const { error: dropError } = await supabase.rpc('drop_table_if_exists', { table_name: 'businesses' });
    
    if (dropError) {
      console.error('Error dropping businesses table:', dropError);
      console.log('Continuing with table creation...');
    } else {
      console.log('Businesses table dropped successfully.');
    }
    
    // Create the businesses table with the required columns
    const { error: createError } = await supabase.rpc('create_businesses_table');
    
    if (createError) {
      console.error('Error creating businesses table using RPC:', createError);
      
      // Try a different approach - insert a record with the required columns
      console.log('Trying to create businesses table by inserting a record...');
      
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert({
          name: 'Test Business',
          description: 'Test description',
          enriched_data: {
            reviewInsights: {
              summary: 'Test summary'
            }
          }
        })
        .select();
      
      if (insertError) {
        console.error('Error creating businesses table by inserting a record:', insertError);
        
        // Try one more approach - use the SQL API
        console.log('Trying to create businesses table using SQL API...');
        
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS businesses (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            enriched_data JSONB
          );
        `;
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            query: createTableSQL
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error creating businesses table using SQL API:', errorData);
          return;
        }
        
        console.log('Businesses table created successfully using SQL API!');
      } else {
        console.log('Businesses table created successfully by inserting a record!');
        console.log('Table schema:', Object.keys(insertData[0]));
        
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
  } catch (error) {
    console.error('Error creating businesses table:', error);
  }
}

// Run the function
createBusinessesTable();
