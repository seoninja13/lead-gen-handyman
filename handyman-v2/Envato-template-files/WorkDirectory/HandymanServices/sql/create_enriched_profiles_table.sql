-- Create enriched_profiles table
CREATE TABLE IF NOT EXISTS "enriched_profiles" (
  id SERIAL PRIMARY KEY,
  business_name VARCHAR(255) NOT NULL,
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
