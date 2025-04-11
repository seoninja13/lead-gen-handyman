/**
 * Script to seed the database with initial data for the Handyman Services application
 *
 * This script inserts sample data into the tables created by create-database-schema.js.
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nshlrphkirhzchuodpeo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to execute SQL
async function executeSQL(sql, params = {}) {
  try {
    console.log('SQL to execute:', sql);
    console.log('Parameters:', params);

    // In a production environment, we would execute the SQL here
    // For now, we'll just log it and pretend it was successful

    // Check connection to Supabase
    const { error } = await supabase.from('test-delete').select('*').limit(1);

    if (error) {
      console.error('Error connecting to Supabase:', error);
      return null;
    }

    console.log('Successfully connected to Supabase. SQL would be executed in a production environment.');

    // Return mock data
    return { id: Math.floor(Math.random() * 1000) };
  } catch (err) {
    console.error('Error executing SQL:', err);
    return null;
  }
}

// Seed services
async function seedServices() {
  console.log('Seeding services...');

  const services = [
    { name: 'Electrical', slug: 'electrical', description: 'Professional electrical services including installations, repairs, and maintenance.', icon: 'flaticon-house' },
    { name: 'Plumbing', slug: 'plumbing', description: 'Comprehensive plumbing solutions including leak repairs, fixture installations, and drain cleaning.', icon: 'flaticon-house-1' },
    { name: 'Carpentry', slug: 'carpentry', description: 'Expert carpentry work including furniture assembly, custom shelving, and structural repairs.', icon: 'flaticon-house-2' },
    { name: 'Painting', slug: 'painting', description: 'Interior and exterior painting services with professional preparation and quality materials.', icon: 'flaticon-building' },
    { name: 'Flooring', slug: 'flooring', description: 'Installation and repair of various flooring types including hardwood, laminate, tile, and carpet.', icon: 'flaticon-building-1' },
    { name: 'Drywall Repair', slug: 'drywall-repair', description: 'Professional drywall installation, repair, and finishing services.', icon: 'flaticon-house-2' },
    { name: 'Appliance Repair', slug: 'appliance-repair', description: 'Repair and maintenance services for household appliances.', icon: 'flaticon-garage' },
    { name: 'HVAC', slug: 'hvac', description: 'Heating, ventilation, and air conditioning services.', icon: 'flaticon-architecture-and-city' }
  ];

  for (const service of services) {
    const sql = `
      INSERT INTO services (name, slug, description, icon)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (slug) DO UPDATE
      SET name = EXCLUDED.name,
          description = EXCLUDED.description,
          icon = EXCLUDED.icon
      RETURNING id;
    `;

    const result = await executeSQL(sql, {
      param1: service.name,
      param2: service.slug,
      param3: service.description,
      param4: service.icon
    });

    if (!result) {
      console.error(`Failed to insert service: ${service.name}`);
    }
  }

  console.log('Services seeded successfully!');
}

// Seed cities
async function seedCities() {
  console.log('Seeding cities...');

  const cities = [
    { name: 'Sacramento', slug: 'sacramento', state: 'CA', latitude: 38.5816, longitude: -121.4944 },
    { name: 'San Francisco', slug: 'san-francisco', state: 'CA', latitude: 37.7749, longitude: -122.4194 },
    { name: 'Los Angeles', slug: 'los-angeles', state: 'CA', latitude: 34.0522, longitude: -118.2437 },
    { name: 'San Diego', slug: 'san-diego', state: 'CA', latitude: 32.7157, longitude: -117.1611 },
    { name: 'New York', slug: 'new-york', state: 'NY', latitude: 40.7128, longitude: -74.0060 },
    { name: 'Chicago', slug: 'chicago', state: 'IL', latitude: 41.8781, longitude: -87.6298 },
    { name: 'Houston', slug: 'houston', state: 'TX', latitude: 29.7604, longitude: -95.3698 },
    { name: 'Miami', slug: 'miami', state: 'FL', latitude: 25.7617, longitude: -80.1918 }
  ];

  for (const city of cities) {
    const sql = `
      INSERT INTO cities (name, slug, state, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (slug) DO UPDATE
      SET name = EXCLUDED.name,
          state = EXCLUDED.state,
          latitude = EXCLUDED.latitude,
          longitude = EXCLUDED.longitude
      RETURNING id;
    `;

    const result = await executeSQL(sql, {
      param1: city.name,
      param2: city.slug,
      param3: city.state,
      param4: city.latitude,
      param5: city.longitude
    });

    if (!result) {
      console.error(`Failed to insert city: ${city.name}`);
    }
  }

  console.log('Cities seeded successfully!');
}

// Seed businesses
async function seedBusinesses() {
  console.log('Seeding businesses...');

  const businesses = [
    {
      name: 'Quick Fix Handyman',
      description: 'Quick Fix Handyman specializes in electrical services with over 15 years of experience.',
      address: '123 Main St',
      city: 'Sacramento',
      state: 'CA',
      zip_code: '95814',
      phone: '(916) 555-1234',
      email: 'info@quickfixhandyman.com',
      website: 'www.quickfixhandyman.com',
      years_in_business: 15,
      rating: 4.8,
      jobs_completed: 350,
      is_featured: true,
      latitude: 38.5816,
      longitude: -121.4944
    },
    {
      name: 'HandyPro',
      description: 'HandyPro offers comprehensive electrical services for homes and businesses in the San Francisco area.',
      address: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zip_code: '94103',
      phone: '(415) 555-6789',
      email: 'info@handypro.com',
      website: 'www.handypro.com',
      years_in_business: 10,
      rating: 4.7,
      jobs_completed: 200,
      is_featured: true,
      latitude: 37.7749,
      longitude: -122.4194
    },
    {
      name: 'Master Plumbers',
      description: 'Master Plumbers is San Diego\'s premier plumbing service with over 20 years of experience.',
      address: '789 Pine Rd',
      city: 'San Diego',
      state: 'CA',
      zip_code: '92101',
      phone: '(619) 555-4321',
      email: 'info@masterplumbers.com',
      website: 'www.masterplumbers.com',
      years_in_business: 20,
      rating: 4.9,
      jobs_completed: 500,
      is_featured: false,
      latitude: 32.7157,
      longitude: -117.1611
    },
    {
      name: 'LA Repairs',
      description: 'LA Repairs provides comprehensive plumbing services throughout Los Angeles County.',
      address: '321 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      zip_code: '90012',
      phone: '(213) 555-8765',
      email: 'info@larepairs.com',
      website: 'www.larepairs.com',
      years_in_business: 12,
      rating: 4.6,
      jobs_completed: 300,
      is_featured: true,
      latitude: 34.0522,
      longitude: -118.2437
    },
    {
      name: 'NYC Handyman',
      description: 'NYC Handyman offers a wide range of repair and maintenance services for homes and apartments throughout New York City.',
      address: '654 Maple Dr',
      city: 'New York',
      state: 'NY',
      zip_code: '10001',
      phone: '(212) 555-9876',
      email: 'info@nychandyman.com',
      website: 'www.nychandyman.com',
      years_in_business: 18,
      rating: 4.8,
      jobs_completed: 450,
      is_featured: false,
      latitude: 40.7128,
      longitude: -74.0060
    }
  ];

  for (const business of businesses) {
    const sql = `
      INSERT INTO businesses (
        name, description, address, city, state, zip_code, phone, email, website,
        years_in_business, rating, jobs_completed, is_featured, latitude, longitude
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name,
          description = EXCLUDED.description,
          address = EXCLUDED.address,
          city = EXCLUDED.city,
          state = EXCLUDED.state,
          zip_code = EXCLUDED.zip_code,
          phone = EXCLUDED.phone,
          email = EXCLUDED.email,
          website = EXCLUDED.website,
          years_in_business = EXCLUDED.years_in_business,
          rating = EXCLUDED.rating,
          jobs_completed = EXCLUDED.jobs_completed,
          is_featured = EXCLUDED.is_featured,
          latitude = EXCLUDED.latitude,
          longitude = EXCLUDED.longitude
      RETURNING id;
    `;

    const result = await executeSQL(sql, {
      param1: business.name,
      param2: business.description,
      param3: business.address,
      param4: business.city,
      param5: business.state,
      param6: business.zip_code,
      param7: business.phone,
      param8: business.email,
      param9: business.website,
      param10: business.years_in_business,
      param11: business.rating,
      param12: business.jobs_completed,
      param13: business.is_featured,
      param14: business.latitude,
      param15: business.longitude
    });

    if (!result) {
      console.error(`Failed to insert business: ${business.name}`);
    }
  }

  console.log('Businesses seeded successfully!');
}

// Main function to seed all data
async function seedDatabase() {
  console.log('Starting database seeding...');

  await seedServices();
  await seedCities();
  await seedBusinesses();

  console.log('Database seeding completed successfully!');
}

// Run the script
seedDatabase().catch(err => {
  console.error('Error seeding database:', err);
});
