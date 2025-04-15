/**
 * Script to create the enriched_business_profiles table in Supabase (CommonJS version)
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function createEnrichedBusinessProfilesTable() {
  try {
    console.log('Creating enriched_business_profiles table...');

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '..', 'sql', 'create_enriched_business_profiles_table.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

    // Execute the SQL query directly
    const { data, error } = await supabase.from('enriched_business_profiles').select('count');

    // If the table doesn't exist, we'll get an error
    if (error && error.code === '42P01') {
      console.log('Table does not exist. Creating it...');

      // Create the table using raw SQL
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

      // We'll use the SQL API endpoint instead
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
        console.error('Error creating table via API:', errorData);
        return;
      }

    } else if (error) {
      console.error('Error creating table:', error);
      return;
    } else {
      console.log('Table already exists!');
    }

    console.log('Table created successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
createEnrichedBusinessProfilesTable();
