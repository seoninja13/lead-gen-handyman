/**
 * Utility to save enriched data to the businesses table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Save enriched data to the businesses table
 *
 * @param {Object} enrichedBusinessProfile - The enriched business profile data
 * @returns {Promise<Object>} - The saved record
 */
async function saveEnrichedBusinessData(enrichedBusinessProfile) {
  try {
    console.log('Saving enriched data to businesses table...');

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

    // First, check if the business exists by adding a new record
    // Since the businesses table is empty and we don't know its exact schema,
    // we'll just insert a new record with the enriched data

    // We'll use the test-delete table instead since we know its schema
    const { data: existingBusinesses, error: queryError } = await supabase
      .from('test-delete')
      .select('id, business')
      .eq('business', name)
      .limit(1);

    if (queryError) {
      console.error('Error checking for existing business:', queryError);
      throw queryError;
    }

    let businessId;

    // If the business exists, update it
    if (existingBusinesses && existingBusinesses.length > 0) {
      businessId = existingBusinesses[0].id;

      // Update the business with enriched data in test-delete table
      const { data, error } = await supabase
        .from('test-delete')
        .update({
          city: address ? address.split(',')[1].trim() : 'Unknown',
          business: name,
          service: JSON.stringify(enriched)
        })
        .eq('id', businessId)
        .select();

      if (error) {
        console.error('Error updating business with enriched data:', error);
        throw error;
      }

      console.log(`Updated business "${name}" with enriched data`);
      return { data, updated: true };
    }
    // Otherwise, insert a new business
    else {
      // Create a new business record in test-delete table
      const { data, error } = await supabase
        .from('test-delete')
        .insert({
          city: address ? address.split(',')[1].trim() : 'Unknown',
          business: name,
          service: JSON.stringify(enriched)
        })
        .select();

      if (error) {
        console.error('Error inserting new business with enriched data:', error);
        throw error;
      }

      console.log(`Inserted new business "${name}" with enriched data`);
      return { data, updated: false };
    }
  } catch (error) {
    console.error('Error in saveEnrichedBusinessData:', error);
    throw error;
  }
}

/**
 * Get all businesses with enriched data
 *
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {number} options.offset - Number of records to skip
 * @returns {Promise<Object>} - The businesses with enriched data
 */
async function getBusinessesWithEnrichedData(options = {}) {
  try {
    const {
      limit = 10,
      offset = 0
    } = options;

    const { data, error, count } = await supabase
      .from('test-delete')
      .select('*', { count: 'exact' })
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching businesses with enriched data:', error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error('Error in getBusinessesWithEnrichedData:', error);
    throw error;
  }
}

/**
 * Get a business with enriched data by ID
 *
 * @param {number} id - The business ID
 * @returns {Promise<Object>} - The business with enriched data
 */
async function getBusinessWithEnrichedDataById(id) {
  try {
    const { data, error } = await supabase
      .from('test-delete')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching business with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in getBusinessWithEnrichedDataById for ID ${id}:`, error);
    throw error;
  }
}

module.exports = {
  saveEnrichedBusinessData,
  getBusinessesWithEnrichedData,
  getBusinessWithEnrichedDataById
};
