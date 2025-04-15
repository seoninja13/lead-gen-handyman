-- Add enriched_data column to businesses table
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS enriched_data JSONB;
