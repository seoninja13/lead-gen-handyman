-- Add enriched_data column to businesses table
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS enriched_data JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS last_enriched TIMESTAMP WITH TIME ZONE DEFAULT NULL;
