import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const { data: cityServices, error } = await supabase
    .from('city_services')
    .select('*')
    .limit(1)

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('First city service:', cityServices[0])
  if (cityServices[0]?.service_images) {
    console.log('Service images:', cityServices[0].service_images)
  }
}

main()
