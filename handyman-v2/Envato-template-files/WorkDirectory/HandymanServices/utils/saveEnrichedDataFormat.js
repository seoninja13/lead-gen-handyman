/**
 * Utility to save enriched data in the specified format to the test-delete table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Save enriched data in the specified format to the test-delete table
 * 
 * @param {string} businessName - The business name
 * @param {Object} enrichedData - The enriched data in the format provided
 * @returns {Promise<Object>} - The saved record
 */
async function saveEnrichedDataFormat(businessName, enrichedData) {
  try {
    console.log(`Saving enriched data for ${businessName} to test-delete table...`);
    
    // Check if a record with this business name already exists
    const { data: existingRecords, error: queryError } = await supabase
      .from('test-delete')
      .select('id, business')
      .eq('business', businessName)
      .limit(1);
    
    if (queryError) {
      console.error('Error checking for existing record:', queryError);
      throw queryError;
    }
    
    // Prepare the record to insert or update
    const record = {
      city: 'Enriched Data',
      business: businessName,
      service: JSON.stringify(enrichedData)
    };
    
    let result;
    
    // If the record exists, update it
    if (existingRecords && existingRecords.length > 0) {
      const { data, error } = await supabase
        .from('test-delete')
        .update(record)
        .eq('id', existingRecords[0].id)
        .select();
      
      if (error) {
        console.error('Error updating enriched data:', error);
        throw error;
      }
      
      result = { data, updated: true };
      console.log(`Updated enriched data for "${businessName}" in test-delete table`);
    } 
    // Otherwise, insert a new record
    else {
      const { data, error } = await supabase
        .from('test-delete')
        .insert(record)
        .select();
      
      if (error) {
        console.error('Error inserting enriched data:', error);
        throw error;
      }
      
      result = { data, updated: false };
      console.log(`Inserted new enriched data for "${businessName}" in test-delete table`);
    }
    
    return result;
  } catch (error) {
    console.error('Error in saveEnrichedDataFormat:', error);
    throw error;
  }
}

/**
 * Get enriched data from the test-delete table
 * 
 * @param {string} businessName - The business name
 * @returns {Promise<Object>} - The enriched data
 */
async function getEnrichedDataFormat(businessName) {
  try {
    console.log(`Getting enriched data for ${businessName} from test-delete table...`);
    
    const { data, error } = await supabase
      .from('test-delete')
      .select('*')
      .eq('business', businessName)
      .single();
    
    if (error) {
      console.error(`Error getting enriched data for ${businessName}:`, error);
      throw error;
    }
    
    // Parse the enriched data from the service field
    try {
      const enrichedData = JSON.parse(data.service);
      return enrichedData;
    } catch (parseError) {
      console.error(`Error parsing enriched data for ${businessName}:`, parseError);
      return null;
    }
  } catch (error) {
    console.error('Error in getEnrichedDataFormat:', error);
    throw error;
  }
}

module.exports = {
  saveEnrichedDataFormat,
  getEnrichedDataFormat
};
