/**
 * Script to list all tables in the Supabase database
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function listTables() {
  try {
    console.log('Listing all tables in the Supabase database...');

    // Try to access various tables to see which ones exist
    const tables = [
      'businesses',
      'test-delete',
      'test_delete',
      'services',
      'cities',
      'reviews',
      'bookings'
    ];

    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);

        if (error) {
          console.error(`Error accessing table ${table}:`, error.message);
        } else {
          console.log(`Table ${table} exists.`);

          // Try to get a sample record to see the schema
          const { data: sample, error: sampleError } = await supabase
            .from(table)
            .select('*')
            .limit(1);

          if (sampleError) {
            console.error(`Error getting sample from ${table}:`, sampleError.message);
          } else if (sample && sample.length > 0) {
            console.log(`Schema for ${table}:`, Object.keys(sample[0]));
          } else {
            console.log(`Table ${table} is empty.`);
          }
        }
      } catch (tableError) {
        console.error(`Error checking table ${table}:`, tableError);
      }
    }
  } catch (error) {
    console.error('Error listing tables:', error);
  }
}

// Run the function
listTables();
