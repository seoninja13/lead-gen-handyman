import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });
console.log('Environment variables loaded from:', resolve(process.cwd(), '.env.local'));

// Get Supabase credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function verifyData() {
  try {
    console.log('\nQuerying city_services table...');
    
    // Execute Supabase query
    const { data, error } = await supabase
      .from('city_services')
      .select('id, city_id, service_id, created_at')
      .order('id', { ascending: true })
      .limit(2053);

    if (error) throw error;
    
    if (!data || data.length === 0) {
      console.log('No records found in city_services table');
      return;
    }

    // Process results
    console.log(`Found ${data.length} records`);
    const ids = data.map(r => r.id).sort((a, b) => a - b);
    
    // Output formatted results
    console.log('\n=== VERIFICATION RESULTS ===');
    console.log(`First 5 IDs: [${ids.slice(0, 5).join(',')}]`);
    console.log(`Last 5 IDs:  [${ids.slice(-5).join(',')}]`);
    console.log(`Total records: ${ids.length}`);
    console.log(`Minimum ID: ${Math.min(...ids)}`);
    console.log(`Maximum ID: ${Math.max(...ids)}`); 
    console.log('=============================');

  } catch (error: any) {
    console.error('\nERROR:', error.message || error);
    if (error.details) console.error('Details:', error.details);
    process.exit(1);
  }
}

// Execute verification and handle errors
verifyData()
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
