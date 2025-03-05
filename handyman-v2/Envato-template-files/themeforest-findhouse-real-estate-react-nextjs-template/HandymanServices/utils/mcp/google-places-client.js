/**
 * Google Places API MCP Client
 * 
 * This module provides a client for interacting with the Google Places API
 * using the Model Context Protocol (MCP) server.
 */

import { savePlace } from '../supabase/mcp-client';
import { MCP_ENDPOINTS, getMcpRequestOptions, handleMcpError } from './config';

/**
 * Process API results into PlaceData format
 * 
 * @param {Array} results The API results
 * @returns {Array} Processed place data
 */
function processPlaceResults(results) {
  return results.map(place => {
    return {
      place_id: place.place_id,
      name: place.name,
      formatted_address: place.formatted_address || place.vicinity,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      description: place.editorial_summary?.text || '',
      phone_number: place.formatted_phone_number || place.international_phone_number,
      website: place.website,
      types: place.types,
      geometry: place.geometry,
      cached: false
    };
  });
}

/**
 * Execute a request to the Google Maps MCP server
 * 
 * @param {string} endpoint The MCP endpoint to call
 * @param {Object} params The parameters to send
 * @returns {Promise<Object>} Promise resolving to the response data
 */
async function executeMapsRequest(endpoint, params) {
  try {
    const response = await fetch(MCP_ENDPOINTS[endpoint], getMcpRequestOptions(params));
    
    if (!response.ok) {
      throw new Error(`MCP server error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw handleMcpError(error);
  }
}

/**
 * Search for places using Google Places API via MCP
 * 
 * @param {string} query The search query
 * @param {Object} location Optional center point for the search
 * @param {number} radius Search radius in meters (max 50000)
 * @param {number} maxResults Maximum number of results to return
 * @returns {Promise<Array>} Promise resolving to array of place data
 */
export async function searchPlaces(
  query, 
  location = null,
  radius = 50000,
  maxResults = 10
) {
  try {
    // Prepare request parameters
    const params = { query };
    
    // Add location if provided
    if (location && location.latitude && location.longitude) {
      params.location = {
        latitude: location.latitude,
        longitude: location.longitude
      };
      params.radius = radius;
    }
    
    // Execute the request
    const response = await executeMapsRequest('MAPS_SEARCH_PLACES', params);
    
    // Process and cache results
    let results = [];
    
    if (response && response.results) {
      results = processPlaceResults(response.results);
      
      // Cache results in the database (async, don't wait)
      results.forEach(place => {
        savePlace(place).catch(error => {
          console.error('Error caching place:', error);
        });
      });
    }
    
    // Limit results
    return results.slice(0, maxResults);
  } catch (error) {
    console.error('Error in searchPlaces:', error);
    return [];
  }
}

/**
 * Get place details using Google Places API via MCP
 * 
 * @param {string} placeId The Google Place ID
 * @returns {Promise<Object|null>} Promise resolving to place details
 */
export async function getPlaceDetails(placeId) {
  try {
    // Execute the request
    const response = await executeMapsRequest('MAPS_PLACE_DETAILS', { place_id: placeId });
    
    if (response && response.result) {
      const placeData = {
        place_id: response.result.place_id,
        name: response.result.name,
        formatted_address: response.result.formatted_address,
        rating: response.result.rating,
        user_ratings_total: response.result.user_ratings_total,
        description: response.result.editorial_summary?.text || '',
        phone_number: response.result.formatted_phone_number || response.result.international_phone_number,
        website: response.result.website,
        types: response.result.types,
        geometry: response.result.geometry,
        cached: false
      };
      
      // Cache the place data (async, don't wait)
      savePlace(placeData).catch(error => {
        console.error('Error caching place details:', error);
      });
      
      return placeData;
    }
    
    return null;
  } catch (error) {
    console.error('Error in getPlaceDetails:', error);
    return null;
  }
}

/**
 * Get directions between two places using Google Maps API via MCP
 * 
 * @param {string} origin The origin address or coordinates
 * @param {string} destination The destination address or coordinates
 * @param {string} mode The travel mode (driving, walking, bicycling, transit)
 * @returns {Promise<Object>} Promise resolving to directions data
 */
export async function getDirections(
  origin,
  destination,
  mode = 'driving'
) {
  try {
    // Execute the request
    return await executeMapsRequest('MAPS_DIRECTIONS', {
      origin,
      destination,
      mode
    });
  } catch (error) {
    console.error('Error in getDirections:', error);
    throw error;
  }
}

/**
 * Get distance matrix between multiple origins and destinations using Google Maps API via MCP
 * 
 * @param {Array<string>} origins Array of origin addresses or coordinates
 * @param {Array<string>} destinations Array of destination addresses or coordinates
 * @param {string} mode The travel mode (driving, walking, bicycling, transit)
 * @returns {Promise<Object>} Promise resolving to distance matrix data
 */
export async function getDistanceMatrix(
  origins,
  destinations,
  mode = 'driving'
) {
  try {
    // Execute the request
    return await executeMapsRequest('MAPS_DISTANCE_MATRIX', {
      origins,
      destinations,
      mode
    });
  } catch (error) {
    console.error('Error in getDistanceMatrix:', error);
    throw error;
  }
}

/**
 * Geocode an address using Google Maps API via MCP
 * 
 * @param {string} address The address to geocode
 * @returns {Promise<Object>} Promise resolving to geocoding data
 */
export async function geocodeAddress(address) {
  try {
    // Execute the request
    return await executeMapsRequest('MAPS_GEOCODE', { address });
  } catch (error) {
    console.error('Error in geocodeAddress:', error);
    throw error;
  }
}

/**
 * Reverse geocode coordinates using Google Maps API via MCP
 * 
 * @param {number} latitude The latitude coordinate
 * @param {number} longitude The longitude coordinate
 * @returns {Promise<Object>} Promise resolving to reverse geocoding data
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    // Execute the request
    return await executeMapsRequest('MAPS_REVERSE_GEOCODE', {
      latitude,
      longitude
    });
  } catch (error) {
    console.error('Error in reverseGeocode:', error);
    throw error;
  }
}
