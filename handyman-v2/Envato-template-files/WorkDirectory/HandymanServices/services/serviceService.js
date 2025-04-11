/**
 * Service Service
 * 
 * This service provides methods to interact with the services table in Supabase.
 */

import { supabase } from '../utils/supabase/client';

/**
 * Get all services
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {number} options.offset - Number of records to skip
 * @returns {Promise<Object>} - Services data and count
 */
export async function getServices(options = {}) {
  try {
    const {
      limit = 20,
      offset = 0,
    } = options;

    const { data, error, count } = await supabase
      .from('services')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching services:', error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error('Error in getServices:', error);
    throw error;
  }
}

/**
 * Get a service by slug
 * @param {string} slug - Service slug
 * @returns {Promise<Object>} - Service data
 */
export async function getServiceBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching service with slug ${slug}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in getServiceBySlug for slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Get businesses by service
 * @param {string} serviceSlug - Service slug
 * @param {Object} options - Query options
 * @returns {Promise<Object>} - Businesses data and count
 */
export async function getBusinessesByService(serviceSlug, options = {}) {
  try {
    const {
      limit = 10,
      offset = 0,
      city,
    } = options;

    let query = supabase
      .from('business_services')
      .select('businesses!inner(*), services!inner(*)', { count: 'exact' })
      .eq('services.slug', serviceSlug);

    if (city) {
      query = query.eq('businesses.city', city);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error(`Error fetching businesses for service ${serviceSlug}:`, error);
      throw error;
    }

    // Transform the data to return just the businesses
    const businesses = data.map(item => item.businesses);

    return { data: businesses, count };
  } catch (error) {
    console.error(`Error in getBusinessesByService for service ${serviceSlug}:`, error);
    throw error;
  }
}

/**
 * Create a new service
 * @param {Object} service - Service data
 * @returns {Promise<Object>} - Created service data
 */
export async function createService(service) {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();

    if (error) {
      console.error('Error creating service:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createService:', error);
    throw error;
  }
}

/**
 * Update a service
 * @param {string} slug - Service slug
 * @param {Object} updates - Service data to update
 * @returns {Promise<Object>} - Updated service data
 */
export async function updateService(slug, updates) {
  try {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      console.error(`Error updating service with slug ${slug}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in updateService for slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Delete a service
 * @param {string} slug - Service slug
 * @returns {Promise<void>}
 */
export async function deleteService(slug) {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('slug', slug);

    if (error) {
      console.error(`Error deleting service with slug ${slug}:`, error);
      throw error;
    }
  } catch (error) {
    console.error(`Error in deleteService for slug ${slug}:`, error);
    throw error;
  }
}

export default {
  getServices,
  getServiceBySlug,
  getBusinessesByService,
  createService,
  updateService,
  deleteService,
};
