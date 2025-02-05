import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'

interface CityRow {
  id: string
  name: string
  slug: string
  state: string
  county: string
  description: string
  population: string
  coordinates: string
  meta_title: string
  meta_description: string
  created_at: string
}

async function importCities() {
  try {
    console.log('Starting cities import...')
    
    // Read CSV file
    const csvPath = path.join(process.cwd(), 'Roadmap-Instructions', 'Suppabase', 'suppabase-cities_rows.csv')
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    
    // Parse CSV
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    }) as CityRow[]
    
    console.log(`Found ${records.length} cities to import`)
    
    // Initialize Supabase client
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    // Process each record
    for (const record of records) {
      try {
        // Parse coordinates from string to JSON
        const coordinates = JSON.parse(record.coordinates.replace(/'/g, '"'))
        
        // Format data for insertion
        const cityData = {
          id: parseInt(record.id),
          name: record.name,
          slug: record.slug,
          state: record.state,
          county: record.county,
          description: record.description,
          population: parseInt(record.population) || 0,
          coordinates,
          meta_title: record.meta_title,
          meta_description: record.meta_description,
          created_at: record.created_at
        }
        
        // Insert into Supabase
        const { error } = await supabase
          .from('cities')
          .upsert(cityData, {
            onConflict: 'id'
          })
        
        if (error) {
          console.error(`Error importing city ${record.name}:`, error)
          continue
        }
        
        console.log(`Successfully imported city: ${record.name}`)
      } catch (error) {
        console.error(`Error processing city ${record.name}:`, error)
        continue
      }
    }
    
    console.log('Cities import completed')
  } catch (error) {
    console.error('Import failed:', error)
    throw error
  }
}

// Run the import
importCities().catch(console.error)
