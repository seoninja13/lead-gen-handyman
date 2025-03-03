import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const { data: services, error } = await supabase
    .from('services')
    .select('*')

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('All services:', services)
}

main()
