/**
 * Script to create a table using SQL
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Create a table using SQL
 */
async function createTableWithSQL() {
  try {
    console.log('Creating table using SQL...');
    
    // Try to execute SQL to create a table
    const { data, error } = await supabase.rpc('create_enriched_data_table');
    
    if (error) {
      console.error('Error creating table using SQL:', error.message);
      
      // Try to create a stored procedure first
      console.log('Trying to create a stored procedure...');
      
      const createProcedureSQL = `
        CREATE OR REPLACE FUNCTION create_enriched_data_table()
        RETURNS void AS $$
        BEGIN
          CREATE TABLE IF NOT EXISTS business_enriched_data (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            business_name TEXT NOT NULL,
            enriched_data JSONB,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
          );
        END;
        $$ LANGUAGE plpgsql;
      `;
      
      const { data: procData, error: procError } = await supabase.rpc('exec_sql', { sql: createProcedureSQL });
      
      if (procError) {
        console.error('Error creating stored procedure:', procError.message);
        
        // Try a different approach
        console.log('Trying a different approach...');
        
        // Try to create the table directly using the REST API
        const response = await fetch(`${SUPABASE_URL}/rest/v1/business_enriched_data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            business_name: 'Test Business',
            enriched_data: { test: true }
          })
        });
        
        if (!response.ok) {
          console.error('Error creating table using REST API:', await response.text());
          return false;
        }
        
        console.log('Table created successfully using REST API!');
        return true;
      }
      
      console.log('Stored procedure created successfully!');
      
      // Now try to execute the stored procedure
      const { data: execData, error: execError } = await supabase.rpc('create_enriched_data_table');
      
      if (execError) {
        console.error('Error executing stored procedure:', execError.message);
        return false;
      }
      
      console.log('Table created successfully using stored procedure!');
      return true;
    }
    
    console.log('Table created successfully using SQL!');
    return true;
  } catch (error) {
    console.error('Error in createTableWithSQL:', error.message);
    return false;
  }
}

// Run the function
createTableWithSQL().then(success => {
  if (success) {
    console.log('Operation completed successfully!');
  } else {
    console.error('Operation failed.');
    process.exit(1);
  }
});
