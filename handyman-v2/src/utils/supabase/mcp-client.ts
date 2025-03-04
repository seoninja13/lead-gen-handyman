/**
 * Supabase MCP Client
 * 
 * This module provides utility functions for interacting with Supabase
 * through the Model Context Protocol (MCP) server.
 * 
 * It simplifies database operations and provides a standardized interface
 * for working with the database.
 */

import { PlaceData } from '../../lib/google-places-client';
import { MCP_ENDPOINTS, getMcpRequestOptions, handleMcpError } from '../../config/mcp-config';

/**
 * Execute a SQL query using the Supabase MCP server
 * 
 * @param sql The SQL query to execute
 * @returns Promise resolving to the query results
 */
export async function executeQuery(sql: string): Promise<any> {
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
 * @param sql The SQL query to execute
 * @returns Promise resolving to the query results
 */
export async function executeQueryDirect(sql: string): Promise<any> {
  try {
    const response = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql }));
    
    if (!response.ok) {
      throw new Error(`MCP server error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.rows || [];
  } catch (error) {
    throw handleMcpError(error);
  }
}

/**
 * Get a place from the database by its Google Place ID
 * 
 * @param placeId The Google Place ID
 * @returns Promise resolving to the place data or null if not found
 */
export async function getPlaceById(placeId: string): Promise<PlaceData | null> {
  try {
    const sql = `
      SELECT * FROM places 
      WHERE place_id = '${placeId}'
    `;
    
    const results = await executeQuery(sql);
    
    if (!results || results.length === 0) {
      return null;
    }
    
    const place = results[0];
    
    // Transform database data to PlaceData format
    return {
      place_id: place.place_id,
      name: place.name,
      formatted_address: place.address,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      description: place.description,
      phone_number: place.phone_number,
      website: place.website,
      geometry: place.latitude && place.longitude ? {
        location: {
          lat: place.latitude,
          lng: place.longitude
        }
      } : undefined,
      cached: true
    };
  } catch (error) {
    console.error('Error in getPlaceById:', error);
    return null;
  }
}

/**
 * Save a place to the database
 * 
 * @param place The place data to save
 * @returns Promise resolving to true if successful, false otherwise
 */
export async function savePlace(place: PlaceData): Promise<boolean> {
  try {
    if (!place || !place.place_id) {
      console.error('Invalid place data');
      return false;
    }

    // Use parameterized query to prevent SQL injection
    const sql = `
      INSERT INTO places (
        place_id, name, address, rating, user_ratings_total, 
        description, phone_number, website, latitude, longitude, last_updated
      ) VALUES (
        '${place.place_id}', 
        '${(place.name || '').replace(/'/g, "''")}', 
        '${(place.formatted_address || '').replace(/'/g, "''")}', 
        ${place.rating || 'NULL'}, 
        ${place.user_ratings_total || 'NULL'}, 
        '${(place.description || '').replace(/'/g, "''")}', 
        '${(place.phone_number || '').replace(/'/g, "''")}', 
        '${(place.website || '').replace(/'/g, "''")}', 
        ${place.geometry?.location.lat || 'NULL'}, 
        ${place.geometry?.location.lng || 'NULL'}, 
        NOW()
      )
      ON CONFLICT (place_id) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        address = EXCLUDED.address,
        rating = EXCLUDED.rating,
        user_ratings_total = EXCLUDED.user_ratings_total,
        description = EXCLUDED.description,
        phone_number = EXCLUDED.phone_number,
        website = EXCLUDED.website,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        last_updated = NOW()
    `;
    
    await executeQuery(sql);
    return true;
  } catch (error) {
    console.error('Error in savePlace:', error);
    return false;
  }
}

/**
 * Get places by city from the database
 * 
 * @param city The city name
 * @param limit Maximum number of results to return
 * @returns Promise resolving to an array of place data
 */
export async function getPlacesByCity(city: string, limit: number = 10): Promise<PlaceData[]> {
  try {
    const sql = `
      SELECT * FROM places 
      WHERE address ILIKE '%${city.replace(/'/g, "''")}%' 
      ORDER BY rating DESC NULLS LAST 
      LIMIT ${limit}
    `;
    
    const results = await executeQuery(sql);
    
    if (!results || results.length === 0) {
      return [];
    }
    
    // Transform database data to PlaceData format
    return results.map((place: any) => ({
      place_id: place.place_id,
      name: place.name,
      formatted_address: place.address,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      description: place.description,
      phone_number: place.phone_number,
      website: place.website,
      geometry: place.latitude && place.longitude ? {
        location: {
          lat: place.latitude,
          lng: place.longitude
        }
      } : undefined,
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
 * @param latitude The latitude coordinate
 * @param longitude The longitude coordinate
 * @param radiusMiles The search radius in miles
 * @param limit Maximum number of results to return
 * @returns Promise resolving to an array of place data
 */
export async function getNearbyPlaces(
  latitude: number,
  longitude: number,
  radiusMiles: number = 25,
  limit: number = 10
): Promise<PlaceData[]> {
  try {
    // Convert miles to degrees (approximate)
    // 1 degree of latitude = ~69 miles, 1 degree of longitude = ~55 miles at 40° latitude
    const latDegrees = radiusMiles / 69;
    const lngDegrees = radiusMiles / 55;
    
    const sql = `
      SELECT *,
        (
          (latitude - ${latitude})^2 + 
          (longitude - ${longitude})^2
        ) AS distance_squared
      FROM places
      WHERE 
        latitude BETWEEN ${latitude - latDegrees} AND ${latitude + latDegrees} AND
        longitude BETWEEN ${longitude - lngDegrees} AND ${longitude + lngDegrees}
      ORDER BY distance_squared ASC
      LIMIT ${limit}
    `;
    
    const results = await executeQuery(sql);
    
    if (!results || results.length === 0) {
      return [];
    }
    
    // Transform database data to PlaceData format
    return results.map((place: any) => ({
      place_id: place.place_id,
      name: place.name,
      formatted_address: place.address,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      description: place.description,
      phone_number: place.phone_number,
      website: place.website,
      geometry: {
        location: {
          lat: place.latitude,
          lng: place.longitude
        }
      },
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
 * @param serviceArea The service area data to save
 * @returns Promise resolving to true if successful, false otherwise
 */
export async function saveServiceArea(serviceArea: any): Promise<boolean> {
  try {
    const sql = `
      INSERT INTO service_areas (
        provider_id, name, address, latitude, longitude, radius_miles, created_at
      ) VALUES (
        '${serviceArea.provider_id}', 
        '${serviceArea.name.replace(/'/g, "''")}', 
        '${serviceArea.address.replace(/'/g, "''")}', 
        ${serviceArea.latitude}, 
        ${serviceArea.longitude}, 
        ${serviceArea.radius_miles}, 
        NOW()
      )
      RETURNING id
    `;
    
    const result = await executeQuery(sql);
    return result && result.length > 0;
  } catch (error) {
    console.error('Error in saveServiceArea:', error);
    return false;
  }
}

/**
 * Get service areas for a provider
 * 
 * @param providerId The provider ID
 * @returns Promise resolving to an array of service areas
 */
export async function getServiceAreas(providerId: string): Promise<any[]> {
  try {
    const sql = `
      SELECT * FROM service_areas 
      WHERE provider_id = '${providerId}'
      ORDER BY created_at DESC
    `;
    
    const results = await executeQuery(sql);
    return results || [];
  } catch (error) {
    console.error('Error in getServiceAreas:', error);
    return [];
  }
}

/**
 * Delete a service area
 * 
 * @param areaId The service area ID
 * @returns Promise resolving to true if successful, false otherwise
 */
export async function deleteServiceArea(areaId: string): Promise<boolean> {
  try {
    const sql = `
      DELETE FROM service_areas 
      WHERE id = '${areaId}'
    `;
    
    await executeQuery(sql);
    return true;
  } catch (error) {
    console.error('Error in deleteServiceArea:', error);
    return false;
  }
}

/**
 * Add a service area for a provider
 * 
 * @param providerId The provider ID
 * @param placeId The Google Place ID
 * @param city The city name
 * @param state The state name
 * @param zipCode Optional zip code
 * @param radiusMiles Optional service radius in miles
 * @param isPrimary Optional flag indicating if this is the primary service area
 * @returns Promise resolving to true if successful, false otherwise
 */
export async function addServiceArea(
  providerId: string,
  placeId: string,
  city: string,
  state: string,
  zipCode?: string,
  radiusMiles: number = 25,
  isPrimary: boolean = false
): Promise<boolean> {
  try {
    const sql = `
      INSERT INTO service_areas (
        provider_id, place_id, city, state, zip_code, radius_miles, is_primary
      ) VALUES (
        '${providerId}', 
        '${placeId}', 
        '${city.replace(/'/g, "''")}', 
        '${state.replace(/'/g, "''")}', 
        ${zipCode ? `'${zipCode}'` : 'NULL'}, 
        ${radiusMiles}, 
        ${isPrimary}
      )
      ON CONFLICT (provider_id, place_id) 
      DO UPDATE SET 
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        zip_code = EXCLUDED.zip_code,
        radius_miles = EXCLUDED.radius_miles,
        is_primary = EXCLUDED.is_primary
    `;
    
    await executeQuery(sql);
    return true;
  } catch (error) {
    console.error('Error in addServiceArea:', error);
    return false;
  }
}
