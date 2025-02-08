-- Rename legacy tables
ALTER TABLE cities RENAME TO cities_v1_legacy;
ALTER TABLE services RENAME TO services_v1_legacy;
ALTER TABLE city_services RENAME TO city_services_v1_legacy;

-- Create v2 tables
CREATE TABLE businesses ( -- Renamed from professionals to businesses
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  business_name TEXT, -- Added business_name
  full_name TEXT NOT NULL,
  skills TEXT[],
  hourly_rate NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
