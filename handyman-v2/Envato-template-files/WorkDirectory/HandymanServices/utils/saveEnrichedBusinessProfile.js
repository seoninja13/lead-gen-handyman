/**
 * Utility function to save enriched business profile data to Supabase
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Save enriched business profile data to Supabase
 * 
 * @param {Object} enrichedBusinessProfile - The enriched business profile data
 * @returns {Promise<Object>} - The saved record
 */
export async function saveEnrichedBusinessProfile(enrichedBusinessProfile) {
  try {
    console.log('Saving enriched business profile to Supabase...');
    
    // Extract basic business data and enriched data
    const {
      name,
      address,
      phone,
      website,
      hours,
      rating,
      reviewCount: review_count,
      categories,
      description,
      photos,
      attributes,
      enriched
    } = enrichedBusinessProfile;
    
    // Check if a record with this name already exists
    const { data: existingProfiles, error: queryError } = await supabase
      .from('enriched_business_profiles')
      .select('id')
      .eq('name', name)
      .limit(1);
    
    if (queryError) {
      console.error('Error checking for existing profile:', queryError);
      throw queryError;
    }
    
    // Prepare the record to insert or update
    const record = {
      name,
      address,
      phone,
      website,
      hours,
      rating,
      review_count,
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
        .from('enriched_business_profiles')
        .update(record)
        .eq('id', existingProfiles[0].id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating enriched business profile:', error);
        throw error;
      }
      
      result = { data, updated: true };
      console.log(`Updated enriched business profile for "${name}"`);
    } 
    // Otherwise, insert a new record
    else {
      const { data, error } = await supabase
        .from('enriched_business_profiles')
        .insert({
          ...record,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error inserting enriched business profile:', error);
        throw error;
      }
      
      result = { data, updated: false };
      console.log(`Inserted new enriched business profile for "${name}"`);
    }
    
    return result;
  } catch (error) {
    console.error('Error in saveEnrichedBusinessProfile:', error);
    throw error;
  }
}

/**
 * Get all enriched business profiles from Supabase
 * 
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {number} options.offset - Number of records to skip
 * @returns {Promise<Object>} - The enriched business profiles
 */
export async function getEnrichedBusinessProfiles(options = {}) {
  try {
    const {
      limit = 10,
      offset = 0
    } = options;
    
    const { data, error, count } = await supabase
      .from('enriched_business_profiles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) {
      console.error('Error fetching enriched business profiles:', error);
      throw error;
    }
    
    return { data, count };
  } catch (error) {
    console.error('Error in getEnrichedBusinessProfiles:', error);
    throw error;
  }
}

/**
 * Get an enriched business profile by ID
 * 
 * @param {number} id - The profile ID
 * @returns {Promise<Object>} - The enriched business profile
 */
export async function getEnrichedBusinessProfileById(id) {
  try {
    const { data, error } = await supabase
      .from('enriched_business_profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching enriched business profile with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error in getEnrichedBusinessProfileById for ID ${id}:`, error);
    throw error;
  }
}

export default {
  saveEnrichedBusinessProfile,
  getEnrichedBusinessProfiles,
  getEnrichedBusinessProfileById
};
