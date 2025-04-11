/**
 * Business Service
 * 
 * This service provides methods to interact with the businesses table in Supabase.
 */

import { supabase } from '../utils/supabase/client';

/**
 * Get all businesses
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {number} options.offset - Number of records to skip
 * @param {string} options.city - Filter by city
 * @param {string} options.service - Filter by service
 * @param {boolean} options.featured - Filter by featured status
 * @returns {Promise<Object>} - Businesses data and count
 */
export async function getBusinesses(options = {}) {
  try {
    const {
      limit = 10,
      offset = 0,
      city,
      service,
      featured,
    } = options;

    let query = supabase
      .from('businesses')
      .select('*, business_services(*, services(*)), business_images(*)', { count: 'exact' });

    // Apply filters
    if (city) {
      query = query.eq('city', city);
    }

    if (featured !== undefined) {
      query = query.eq('is_featured', featured);
    }

    // Filter by service if provided
    if (service) {
      query = query.eq('business_services.services.slug', service);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    // Execute the query
    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching businesses:', error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error('Error in getBusinesses:', error);
    throw error;
  }
}

/**
 * Get a business by ID
 * @param {number} id - Business ID
 * @returns {Promise<Object>} - Business data
 */
export async function getBusinessById(id) {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*, business_services(*, services(*)), business_images(*), reviews(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching business with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in getBusinessById for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Get featured businesses
 * @param {number} limit - Maximum number of records to return
 * @returns {Promise<Array>} - Featured businesses data
 */
export async function getFeaturedBusinesses(limit = 6) {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*, business_services(*, services(*)), business_images(*)')
      .eq('is_featured', true)
      .limit(limit);

    if (error) {
      console.error('Error fetching featured businesses:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getFeaturedBusinesses:', error);
    throw error;
  }
}

/**
 * Create a new business
 * @param {Object} business - Business data
 * @returns {Promise<Object>} - Created business data
 */
export async function createBusiness(business) {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .insert(business)
      .select()
      .single();

    if (error) {
      console.error('Error creating business:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createBusiness:', error);
    throw error;
  }
}

/**
 * Update a business
 * @param {number} id - Business ID
 * @param {Object} updates - Business data to update
 * @returns {Promise<Object>} - Updated business data
 */
export async function updateBusiness(id, updates) {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating business with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in updateBusiness for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a business
 * @param {number} id - Business ID
 * @returns {Promise<void>}
 */
export async function deleteBusiness(id) {
  try {
    const { error } = await supabase
      .from('businesses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting business with ID ${id}:`, error);
      throw error;
    }
  } catch (error) {
    console.error(`Error in deleteBusiness for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Search businesses
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Object>} - Search results and count
 */
export async function searchBusinesses(query, options = {}) {
  try {
    const {
      limit = 10,
      offset = 0,
    } = options;

    const { data, error, count } = await supabase
      .from('businesses')
      .select('*, business_services(*, services(*)), business_images(*)', { count: 'exact' })
      .or(`name.ilike.%${query}%, description.ilike.%${query}%`)
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error searching businesses:', error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error('Error in searchBusinesses:', error);
    throw error;
  }
}

export default {
  getBusinesses,
  getBusinessById,
  getFeaturedBusinesses,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  searchBusinesses,
};
