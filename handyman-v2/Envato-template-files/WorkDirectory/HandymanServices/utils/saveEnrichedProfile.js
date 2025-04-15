/**
 * Utility to save enriched business profile data to the enriched_profiles table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Save enriched business profile data to the enriched_profiles table
 * 
 * @param {Object} enrichedBusinessProfile - The enriched business profile data
 * @returns {Promise<Object>} - The saved record
 */
async function saveEnrichedProfile(enrichedBusinessProfile) {
  try {
    console.log('Saving enriched business profile to enriched_profiles table...');
    
    // Extract basic business data and enriched data
    const {
      name,
      address,
      phone,
      website,
      hours,
      rating,
      reviewCount,
      categories,
      description,
      photos,
      attributes,
      enriched
    } = enrichedBusinessProfile;
    
    // Check if a record with this name already exists
    const { data: existingProfiles, error: queryError } = await supabase
      .from('enriched_profiles')
      .select('id')
      .eq('business_name', name)
      .limit(1);
    
    if (queryError) {
      console.error('Error checking for existing profile:', queryError);
      throw queryError;
    }
    
    // Prepare the record to insert or update
    const record = {
      business_name: name,
      address,
      phone,
      website,
      hours,
      rating,
      review_count: reviewCount,
      categories,
      description,
      photos,
      attributes,
      enriched_data: enriched,
      last_enriched: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    let result;
    
    // If the record exists, update it
    if (existingProfiles && existingProfiles.length > 0) {
      const { data, error } = await supabase
        .from('enriched_profiles')
        .update(record)
        .eq('id', existingProfiles[0].id)
        .select();
      
      if (error) {
        console.error('Error updating enriched profile:', error);
        throw error;
      }
      
      result = { data, updated: true };
      console.log(`Updated enriched profile for "${name}"`);
    } 
    // Otherwise, insert a new record
    else {
      const { data, error } = await supabase
        .from('enriched_profiles')
        .insert({
          ...record,
          created_at: new Date().toISOString()
        })
        .select();
      
      if (error) {
        console.error('Error inserting enriched profile:', error);
        throw error;
      }
      
      result = { data, updated: false };
      console.log(`Inserted new enriched profile for "${name}"`);
    }
    
    return result;
  } catch (error) {
    console.error('Error in saveEnrichedProfile:', error);
    throw error;
  }
}

/**
 * Get all enriched profiles from the enriched_profiles table
 * 
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {number} options.offset - Number of records to skip
 * @returns {Promise<Object>} - The enriched profiles
 */
async function getEnrichedProfiles(options = {}) {
  try {
    const {
      limit = 10,
      offset = 0
    } = options;
    
    const { data, error, count } = await supabase
      .from('enriched_profiles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) {
      console.error('Error fetching enriched profiles:', error);
      throw error;
    }
    
    return { data, count };
  } catch (error) {
    console.error('Error in getEnrichedProfiles:', error);
    throw error;
  }
}

/**
 * Get an enriched profile by ID
 * 
 * @param {number} id - The profile ID
 * @returns {Promise<Object>} - The enriched profile
 */
async function getEnrichedProfileById(id) {
  try {
    const { data, error } = await supabase
      .from('enriched_profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching enriched profile with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error in getEnrichedProfileById for ID ${id}:`, error);
    throw error;
  }
}

module.exports = {
  saveEnrichedProfile,
  getEnrichedProfiles,
  getEnrichedProfileById
};
