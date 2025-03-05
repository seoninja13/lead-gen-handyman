-- Supabase Schema for Google Places API Integration
-- This file contains the SQL statements to create the necessary tables
-- for storing Google Places API data in Supabase.

-- Table for storing place data
CREATE TABLE IF NOT EXISTS places (
  id SERIAL PRIMARY KEY,
  place_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  rating NUMERIC(3,1),
  user_ratings_total INTEGER,
  description TEXT,
  phone_number TEXT,
  website TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on place_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_places_place_id ON places(place_id);

-- Create index on coordinates for geospatial queries
CREATE INDEX IF NOT EXISTS idx_places_coordinates ON places(latitude, longitude);

-- Table for storing search history
CREATE TABLE IF NOT EXISTS place_searches (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  results_count INTEGER NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing nearby search history
CREATE TABLE IF NOT EXISTS nearby_searches (
  id SERIAL PRIMARY KEY,
  latitude NUMERIC(10,7) NOT NULL,
  longitude NUMERIC(10,7) NOT NULL,
  radius INTEGER NOT NULL,
  type TEXT,
  results_count INTEGER NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing service areas
CREATE TABLE IF NOT EXISTS service_areas (
  id SERIAL PRIMARY KEY,
  provider_id UUID REFERENCES auth.users(id),
  place_id TEXT REFERENCES places(place_id),
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT,
  radius_miles INTEGER DEFAULT 25,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on provider_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_service_areas_provider_id ON service_areas(provider_id);

-- Create unique constraint to prevent duplicate service areas
ALTER TABLE service_areas ADD CONSTRAINT unique_provider_place 
  UNIQUE (provider_id, place_id);

-- Function to update the last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update last_updated on places table
CREATE TRIGGER update_places_last_updated
BEFORE UPDATE ON places
FOR EACH ROW
EXECUTE FUNCTION update_last_updated();

-- Comments for documentation
COMMENT ON TABLE places IS 'Stores place data from Google Places API';
COMMENT ON TABLE place_searches IS 'Stores search history for Google Places API';
COMMENT ON TABLE nearby_searches IS 'Stores nearby search history for Google Places API';
COMMENT ON TABLE service_areas IS 'Defines service coverage areas for service providers';
