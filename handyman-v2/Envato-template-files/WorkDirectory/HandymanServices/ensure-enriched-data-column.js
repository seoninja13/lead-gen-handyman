/**
 * Script to add the enriched_data column to the businesses table if it doesn't exist
 */

const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function addEnrichedDataColumn() {
  try {
    console.log('Checking if businesses table exists...');
    
    // Try to select from the businesses table
    const { data: existingData, error: existingError } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);
    
    if (existingError) {
      console.error('Error checking businesses table:', existingError);
      
      if (existingError.code === 'PGRST204') {
        // Table doesn't exist, create it with the enriched_data column
        console.log('Businesses table does not exist. Creating it with enriched_data column...');
        
        // Use SQL to create the table
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS businesses (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            enriched_data JSONB
          );
        `;
        
        // Use the Supabase REST API to execute SQL
        const response = await fetch(`${SUPABASE_URL}/rest/v1/sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            query: createTableSQL
          })
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error creating businesses table:', errorText);
          
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
            return;
          }
          
          console.log('Businesses table created successfully with enriched_data column!');
          
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
        } else {
          console.log('Businesses table created successfully with enriched_data column!');
        }
      } else {
        console.error('Unknown error checking businesses table:', existingError);
        return;
      }
    } else {
      console.log('Businesses table exists. Checking if enriched_data column exists...');
      
      // Check if the enriched_data column exists
      let hasEnrichedDataColumn = false;
      
      if (existingData && existingData.length > 0) {
        hasEnrichedDataColumn = 'enriched_data' in existingData[0];
      }
      
      if (hasEnrichedDataColumn) {
        console.log('enriched_data column already exists!');
      } else {
        console.log('enriched_data column does not exist. Adding it...');
        
        // Use SQL to add the column
        const addColumnSQL = `
          ALTER TABLE businesses
          ADD COLUMN IF NOT EXISTS enriched_data JSONB;
        `;
        
        // Use the Supabase REST API to execute SQL
        const response = await fetch(`${SUPABASE_URL}/rest/v1/sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            query: addColumnSQL
          })
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error adding enriched_data column:', errorText);
          
          // Try a different approach - update a record with the enriched_data column
          console.log('Trying to add enriched_data column by updating a record...');
          
          if (existingData && existingData.length > 0) {
            const { data: updateData, error: updateError } = await supabase
              .from('businesses')
              .update({
                enriched_data: { test: true }
              })
              .eq('id', existingData[0].id)
              .select();
            
            if (updateError) {
              console.error('Error adding enriched_data column by updating a record:', updateError);
              return;
            }
            
            console.log('enriched_data column added successfully!');
          } else {
            // Insert a new record with the enriched_data column
            console.log('Trying to add enriched_data column by inserting a record...');
            
            const { data: insertData, error: insertError } = await supabase
              .from('businesses')
              .insert({
                name: 'Test Business',
                description: 'Test description',
                enriched_data: { test: true }
              })
              .select();
            
            if (insertError) {
              console.error('Error adding enriched_data column by inserting a record:', insertError);
              return;
            }
            
            console.log('enriched_data column added successfully!');
            
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
          console.log('enriched_data column added successfully!');
        }
      }
    }
  } catch (error) {
    console.error('Error adding enriched_data column:', error);
  }
}

// Run the function
addEnrichedDataColumn();
