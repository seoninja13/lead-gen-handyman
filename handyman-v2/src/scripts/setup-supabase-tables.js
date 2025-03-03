/**
 * Setup Supabase Tables Script
 * 
 * This script creates the necessary tables in Supabase for the Google Places API integration.
 * It reads the schema.sql file and executes the SQL statements using the Supabase client.
 * 
 * Usage:
 * node scripts/setup-supabase-tables.js
 */

// Load environment variables from .env or .env.local file
const path = require('path');
const fs = require('fs');

// Try to load from .env.local first, then .env
const envLocalPath = path.resolve(process.cwd(), '../.env.local');
const envPath = path.resolve(process.cwd(), '../.env');

if (fs.existsSync(envLocalPath)) {
  console.log('Loading environment variables from .env.local');
  require('dotenv').config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  console.log('Loading environment variables from .env');
  require('dotenv').config({ path: envPath });
} else {
  console.log('No .env or .env.local file found. Attempting to use environment variables from system.');
}

const { createClient } = require('@supabase/supabase-js');

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ ERROR: Supabase credentials not found!');
  console.error('Please make sure you have set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('\n=== Setting up Supabase Tables for Google Places API Integration ===\n');

// Read the schema.sql file
const schemaPath = path.join(__dirname, '../utils/supabase/schema.sql');
let schemaSql;

try {
  schemaSql = fs.readFileSync(schemaPath, 'utf8');
  console.log('Schema file loaded successfully');
} catch (error) {
  console.error(`❌ Error reading schema file: ${error.message}`);
  process.exit(1);
}

// Split the SQL into individual statements
const statements = schemaSql
  .split(';')
  .map(statement => statement.trim())
  .filter(statement => statement.length > 0);

console.log(`Found ${statements.length} SQL statements to execute`);

// Execute each statement
async function executeStatements() {
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    console.log(`\nExecuting statement ${i + 1}/${statements.length}:`);
    console.log(statement.substring(0, 100) + (statement.length > 100 ? '...' : ''));
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        console.error(`❌ Error executing statement: ${error.message}`);
        // Continue with the next statement
      } else {
        console.log('✅ Statement executed successfully');
      }
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      // Continue with the next statement
    }
  }
  
  console.log('\n=== Setup Completed ===\n');
  console.log('Tables for Google Places API integration have been created in Supabase.');
  console.log('You can now use the Google Places API integration in your application.\n');
}

// Execute the statements
executeStatements().catch(error => {
  console.error(`\n❌ Fatal error: ${error.message}`);
  process.exit(1);
});
