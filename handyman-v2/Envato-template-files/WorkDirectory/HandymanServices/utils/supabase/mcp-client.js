/**
 * Supabase MCP Client
 * 
 * This module provides utility functions for interacting with Supabase
 * through the Model Context Protocol (MCP) server.
 * 
 * It simplifies database operations and provides a standardized interface
 * for working with the database.
 */

import { MCP_ENDPOINTS, getMcpRequestOptions, handleMcpError } from '../mcp/config';

/**
 * Execute a SQL query using the Supabase MCP server
 * 
 * @param {string} sql The SQL query to execute
 * @returns {Promise<Array>} Promise resolving to the query results
 */
export async function executeQuery(sql) {
  try {
    // Call the MCP server to execute the query
    const response = await fetch('/api/mcp/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql }),
    });

    if (!response.ok) {
      throw new Error(`Error executing query: ${response.statusText}`);
    }

    const result = await response.json();
    return result.rows || [];
  } catch (error) {
    console.error('Error in executeQuery:', error);
    throw error;
  }
}

/**
 * Execute a SQL query directly using the Supabase MCP endpoint
 * 
 * @param {string} sql The SQL query to execute
 * @returns {Promise<Array>} Promise resolving to the query results
 */
export async function executeQueryDirect(sql) {
  try {
    const response = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql }));
    
    if (!response.ok) {
      throw new Error(`Error executing query: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.rows || [];
  } catch (error) {
    console.error('Error in executeQueryDirect:', error);
    throw handleMcpError(error);
  }
}

/**
 * Get a place from the database by its Google Place ID
 * 
 * @param {string} placeId The Google Place ID
 * @returns {Promise<Object|null>} Promise resolving to the place data or null if not found
 */
export async function getPlaceById(placeId) {
  try {
    const sql = `
      SELECT * FROM places
      WHERE place_id = '${placeId}'
      LIMIT 1
    `;
    
    const results = await executeQueryDirect(sql);
    
    if (results && results.length > 0) {
      return {
        ...results[0],
        cached: true
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error in getPlaceById:', error);
    return null;
  }
}

/**
 * Save a place to the database
 * 
 * @param {Object} place The place data to save
 * @returns {Promise<boolean>} Promise resolving to true if successful, false otherwise
 */
export async function savePlace(place) {
  try {
    // Check if place already exists
    const existingPlace = await getPlaceById(place.place_id);
    
    if (existingPlace) {
      // Update existing place
      const sql = `
        UPDATE places
        SET 
          name = '${place.name.replace(/'/g, "''")}',
          address = '${(place.formatted_address || '').replace(/'/g, "''")}',
          rating = ${place.rating || 'NULL'},
          user_ratings_total = ${place.user_ratings_total || 'NULL'},
          description = '${(place.description || '').replace(/'/g, "''")}',
          phone_number = '${(place.phone_number || '').replace(/'/g, "''")}',
          website = '${(place.website || '').replace(/'/g, "''")}',
          latitude = ${place.geometry?.location?.lat || 'NULL'},
          longitude = ${place.geometry?.location?.lng || 'NULL'}
        WHERE place_id = '${place.place_id}'
      `;
      
      await executeQueryDirect(sql);
      return true;
    } else {
      // Insert new place
      const sql = `
        INSERT INTO places (
          place_id, name, address, rating, user_ratings_total, 
          description, phone_number, website, latitude, longitude
        ) VALUES (
          '${place.place_id}',
          '${place.name.replace(/'/g, "''")}',
          '${(place.formatted_address || '').replace(/'/g, "''")}',
          ${place.rating || 'NULL'},
          ${place.user_ratings_total || 'NULL'},
          '${(place.description || '').replace(/'/g, "''")}',
          '${(place.phone_number || '').replace(/'/g, "''")}',
          '${(place.website || '').replace(/'/g, "''")}',
          ${place.geometry?.location?.lat || 'NULL'},
          ${place.geometry?.location?.lng || 'NULL'}
        )
      `;
      
      await executeQueryDirect(sql);
      return true;
    }
  } catch (error) {
    console.error('Error in savePlace:', error);
    return false;
  }
}

/**
 * Get places by city from the database
 * 
 * @param {string} city The city name
 * @param {number} limit Maximum number of results to return
 * @returns {Promise<Array>} Promise resolving to an array of place data
 */
export async function getPlacesByCity(city, limit = 10) {
  try {
    const sql = `
      SELECT * FROM places
      WHERE address ILIKE '%${city.replace(/'/g, "''")}%'
      ORDER BY rating DESC NULLS LAST
      LIMIT ${limit}
    `;
    
    const results = await executeQueryDirect(sql);
    
    return results.map(place => ({
      ...place,
      cached: true
    }));
  } catch (error) {
    console.error('Error in getPlacesByCity:', error);
    return [];
  }
}

/**
 * Get nearby places from the database
 * 
 * @param {number} latitude The latitude coordinate
 * @param {number} longitude The longitude coordinate
 * @param {number} radiusMiles The search radius in miles
 * @param {number} limit Maximum number of results to return
 * @returns {Promise<Array>} Promise resolving to an array of place data
 */
export async function getNearbyPlaces(latitude, longitude, radiusMiles = 25, limit = 10) {
  try {
    // Convert miles to degrees (approximate)
    // 1 degree of latitude = ~69 miles, 1 degree of longitude = ~55 miles at mid-latitudes
    const latDelta = radiusMiles / 69;
    const lngDelta = radiusMiles / 55;
    
    const sql = `
      SELECT *, 
        SQRT(
          POWER(latitude - ${latitude}, 2) + 
          POWER(longitude - ${longitude}, 2)
        ) AS distance
      FROM places
      WHERE 
        latitude BETWEEN ${latitude - latDelta} AND ${latitude + latDelta}
        AND longitude BETWEEN ${longitude - lngDelta} AND ${longitude + lngDelta}
      ORDER BY distance ASC
      LIMIT ${limit}
    `;
    
    const results = await executeQueryDirect(sql);
    
    return results.map(place => ({
      ...place,
      cached: true
    }));
  } catch (error) {
    console.error('Error in getNearbyPlaces:', error);
    return [];
  }
}

/**
 * Save a service area to the database
 * 
 * @param {Object} serviceArea The service area data to save
 * @returns {Promise<boolean>} Promise resolving to true if successful, false otherwise
 */
export async function saveServiceArea(serviceArea) {
  try {
    const sql = `
      INSERT INTO service_areas (
        provider_id, place_id, city, state, zip_code, radius_miles, is_primary
      ) VALUES (
        '${serviceArea.provider_id}',
        '${serviceArea.place_id}',
        '${serviceArea.city.replace(/'/g, "''")}',
        '${serviceArea.state.replace(/'/g, "''")}',
        '${(serviceArea.zip_code || '').replace(/'/g, "''")}',
        ${serviceArea.radius_miles || 25},
        ${serviceArea.is_primary || false}
      )
      ON CONFLICT (provider_id, place_id) DO UPDATE SET
        city = '${serviceArea.city.replace(/'/g, "''")}',
        state = '${serviceArea.state.replace(/'/g, "''")}',
        zip_code = '${(serviceArea.zip_code || '').replace(/'/g, "''")}',
        radius_miles = ${serviceArea.radius_miles || 25},
        is_primary = ${serviceArea.is_primary || false}
    `;
    
    await executeQueryDirect(sql);
    return true;
  } catch (error) {
    console.error('Error in saveServiceArea:', error);
    return false;
  }
}

/**
 * Get service areas for a provider
 * 
 * @param {string} providerId The provider ID
 * @returns {Promise<Array>} Promise resolving to an array of service areas
 */
export async function getServiceAreas(providerId) {
  try {
    const sql = `
      SELECT sa.*, p.name, p.address
      FROM service_areas sa
      JOIN places p ON sa.place_id = p.place_id
      WHERE sa.provider_id = '${providerId}'
      ORDER BY sa.is_primary DESC, sa.created_at DESC
    `;
    
    return await executeQueryDirect(sql);
  } catch (error) {
    console.error('Error in getServiceAreas:', error);
    return [];
  }
}

/**
 * Delete a service area
 * 
 * @param {string} areaId The service area ID
 * @returns {Promise<boolean>} Promise resolving to true if successful, false otherwise
 */
export async function deleteServiceArea(areaId) {
  try {
    const sql = `
      DELETE FROM service_areas
      WHERE id = ${areaId}
    `;
    
    await executeQueryDirect(sql);
    return true;
  } catch (error) {
    console.error('Error in deleteServiceArea:', error);
    return false;
  }
}

/**
 * Add a service area for a provider
 * 
 * @param {string} providerId The provider ID
 * @param {string} placeId The Google Place ID
 * @param {string} city The city name
 * @param {string} state The state name
 * @param {string} zipCode Optional zip code
 * @param {number} radiusMiles Optional service radius in miles
 * @param {boolean} isPrimary Optional flag indicating if this is the primary service area
 * @returns {Promise<boolean>} Promise resolving to true if successful, false otherwise
 */
export async function addServiceArea(
  providerId,
  placeId,
  city,
  state,
  zipCode = '',
  radiusMiles = 25,
  isPrimary = false
) {
  try {
    // If this is the primary service area, update all other areas to not be primary
    if (isPrimary) {
      const updateSql = `
        UPDATE service_areas
        SET is_primary = false
        WHERE provider_id = '${providerId}'
      `;
      
      await executeQueryDirect(updateSql);
    }
    
    // Add the new service area
    const serviceArea = {
      provider_id: providerId,
      place_id: placeId,
      city,
      state,
      zip_code: zipCode,
      radius_miles: radiusMiles,
      is_primary: isPrimary
    };
    
    return await saveServiceArea(serviceArea);
  } catch (error) {
    console.error('Error in addServiceArea:', error);
    return false;
  }
}
