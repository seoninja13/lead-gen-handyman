/**
 * Simple script to create the enriched_business_profiles table in Supabase
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// SQL for creating the table
const createTableSQL = `
CREATE TABLE IF NOT EXISTS "enriched_business_profiles" (
  id SERIAL PRIMARY KEY,
  business_id INTEGER,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  hours JSONB,
  rating DECIMAL(3, 1),
  review_count INTEGER,
  categories JSONB,
  description TEXT,
  photos JSONB,
  attributes JSONB,
  enriched_data JSONB,
  last_enriched TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

async function createTable() {
  try {
    console.log('Creating enriched_business_profiles table...');
    
    // First check if the table exists
    const { error: checkError } = await supabase
      .from('enriched_business_profiles')
      .select('count')
      .limit(1);
    
    if (checkError && checkError.code === '42P01') {
      console.log('Table does not exist. Creating it...');
      
      // Create the table using SQL
      const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
      
      if (error) {
        console.error('Error creating table:', error);
        return;
      }
      
      console.log('Table created successfully!');
    } else if (checkError) {
      console.error('Error checking table:', checkError);
    } else {
      console.log('Table already exists!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
createTable();
