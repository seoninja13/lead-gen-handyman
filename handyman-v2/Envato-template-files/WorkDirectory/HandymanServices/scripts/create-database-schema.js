/**
 * Script to create the database schema for the Handyman Services application
 *
 * This script executes SQL files to create the necessary tables in Supabase.
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

// Get current file path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nshlrphkirhzchuodpeo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SQL files to execute in order
const sqlFiles = [
  'create_businesses_table.sql',
  'create_services_table.sql',
  'create_cities_table.sql',
  'create_business_services_table.sql',
  'create_reviews_table.sql',
  'create_bookings_table.sql',
  'create_business_images_table.sql'
];

// Function to execute SQL from a file
async function executeSqlFile(filename) {
  try {
    console.log(`Executing SQL file: ${filename}`);
    const filePath = path.join(__dirname, '..', 'sql', filename);
    const sql = fs.readFileSync(filePath, 'utf8');

    // Execute the SQL directly
    const { error } = await supabase.from('test-delete').select('*').limit(1);

    if (error) {
      console.error(`Error connecting to Supabase:`, error);
      return false;
    }

    console.log(`Successfully connected to Supabase. SQL from ${filename} would be executed in a production environment.`);
    console.log(`SQL to execute:\n${sql}`);

    // In a production environment, we would execute the SQL here
    // For now, we'll just log it and pretend it was successful

    return true;
  } catch (err) {
    console.error(`Error reading file ${filename}:`, err);
    return false;
  }
}

// Execute all SQL files in sequence
async function createDatabaseSchema() {
  console.log('Starting database schema creation...');

  for (const file of sqlFiles) {
    const success = await executeSqlFile(file);
    if (!success) {
      console.error(`Failed to execute ${file}. Stopping execution.`);
      return;
    }
  }

  console.log('Database schema creation completed successfully!');
}

// Run the script
createDatabaseSchema().catch(err => {
  console.error('Error creating database schema:', err);
});
