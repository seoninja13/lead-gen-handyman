/**
 * Simple script to save enriched data from test-delete to businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  try {
    console.log('Starting simple save enriched data process...');
    
    // 1. Get data from test-delete table
    console.log('Getting data from test-delete table...');
    const { data: testDeleteData, error: testDeleteError } = await supabase
      .from('test-delete')
      .select('*');
    
    if (testDeleteError) {
      console.error('Error getting data from test-delete table:', testDeleteError);
      return;
    }
    
    console.log(`Found ${testDeleteData.length} records in test-delete table.`);
    
    // 2. Process each record
    let successCount = 0;
    let errorCount = 0;
    
    for (const record of testDeleteData) {
      try {
        console.log(`Processing record for ${record.business}...`);
        
        // Try to parse the service field as JSON
        let enrichedData;
        try {
          if (typeof record.service === 'string' && (record.service.startsWith('{') || record.service.startsWith('['))) {
            enrichedData = JSON.parse(record.service);
          } else {
            // Create a simple structure for non-JSON service fields
            enrichedData = {
              service: record.service,
              city: record.city,
              business: record.business
            };
          }
        } catch (parseError) {
          console.error(`Error parsing service field for ${record.business}:`, parseError);
          enrichedData = {
            service: record.service,
            city: record.city,
            business: record.business
          };
        }
        
        // 3. Insert into businesses table
        const { data: insertData, error: insertError } = await supabase
          .from('businesses')
          .insert({
            // Try different column names that might exist
            title: record.business,
            name: record.business,
            business_name: record.business,
            description: JSON.stringify(enrichedData),
            enriched_data: enrichedData
          })
          .select();
        
        if (insertError) {
          console.error(`Error inserting data for ${record.business}:`, insertError);
          errorCount++;
        } else {
          console.log(`Successfully saved enriched data for ${record.business}`);
          successCount++;
        }
      } catch (recordError) {
        console.error(`Error processing record for ${record.business}:`, recordError);
        errorCount++;
      }
    }
    
    console.log(`Process completed. Success: ${successCount}, Errors: ${errorCount}`);
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

// Run the main function
main();
