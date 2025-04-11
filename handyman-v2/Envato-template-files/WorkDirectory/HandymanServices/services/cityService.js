/**
 * City Service
 * 
 * This service provides methods to interact with the cities table in Supabase.
 */

import { supabase } from '../utils/supabase/client';

/**
 * Get all cities
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of records to return
 * @param {number} options.offset - Number of records to skip
 * @returns {Promise<Object>} - Cities data and count
 */
export async function getCities(options = {}) {
  try {
    const {
      limit = 20,
      offset = 0,
    } = options;

    const { data, error, count } = await supabase
      .from('cities')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error('Error in getCities:', error);
    throw error;
  }
}

/**
 * Get a city by slug
 * @param {string} slug - City slug
 * @returns {Promise<Object>} - City data
 */
export async function getCityBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching city with slug ${slug}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in getCityBySlug for slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Get businesses by city
 * @param {string} citySlug - City slug
 * @param {Object} options - Query options
 * @returns {Promise<Object>} - Businesses data and count
 */
export async function getBusinessesByCity(citySlug, options = {}) {
  try {
    const {
      limit = 10,
      offset = 0,
      service,
    } = options;

    // First get the city to get the name
    const { data: cityData, error: cityError } = await supabase
      .from('cities')
      .select('name')
      .eq('slug', citySlug)
      .single();

    if (cityError) {
      console.error(`Error fetching city with slug ${citySlug}:`, cityError);
      throw cityError;
    }

    const cityName = cityData.name;

    // Now get businesses in this city
    let query = supabase
      .from('businesses')
      .select('*, business_services(*, services(*)), business_images(*)', { count: 'exact' })
      .eq('city', cityName);

    // Filter by service if provided
    if (service) {
      query = query.eq('business_services.services.slug', service);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error(`Error fetching businesses for city ${cityName}:`, error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error(`Error in getBusinessesByCity for city ${citySlug}:`, error);
    throw error;
  }
}

/**
 * Create a new city
 * @param {Object} city - City data
 * @returns {Promise<Object>} - Created city data
 */
export async function createCity(city) {
  try {
    const { data, error } = await supabase
      .from('cities')
      .insert(city)
      .select()
      .single();

    if (error) {
      console.error('Error creating city:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createCity:', error);
    throw error;
  }
}

/**
 * Update a city
 * @param {string} slug - City slug
 * @param {Object} updates - City data to update
 * @returns {Promise<Object>} - Updated city data
 */
export async function updateCity(slug, updates) {
  try {
    const { data, error } = await supabase
      .from('cities')
      .update(updates)
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      console.error(`Error updating city with slug ${slug}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error in updateCity for slug ${slug}:`, error);
    throw error;
  }
}

/**
 * Delete a city
 * @param {string} slug - City slug
 * @returns {Promise<void>}
 */
export async function deleteCity(slug) {
  try {
    const { error } = await supabase
      .from('cities')
      .delete()
      .eq('slug', slug);

    if (error) {
      console.error(`Error deleting city with slug ${slug}:`, error);
      throw error;
    }
  } catch (error) {
    console.error(`Error in deleteCity for slug ${slug}:`, error);
    throw error;
  }
}

export default {
  getCities,
  getCityBySlug,
  getBusinessesByCity,
  createCity,
  updateCity,
  deleteCity,
};
