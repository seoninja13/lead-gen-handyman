/**
 * Google Places API MCP Client
 * 
 * This module provides a client for interacting with the Google Places API
 * using the Model Context Protocol (MCP) server.
 */

import { PlaceData } from './google-places-client';
import { savePlace } from '../utils/supabase/mcp-client';
import { MCP_ENDPOINTS, getMcpRequestOptions, handleMcpError } from '../config/mcp-config';

/**
 * Process API results into PlaceData format
 */
function processPlaceResults(results: any[]): PlaceData[] {
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
 * @param endpoint The MCP endpoint to call
 * @param params The parameters to send
 * @returns Promise resolving to the response data
 */
async function executeMapsRequest(endpoint: keyof typeof MCP_ENDPOINTS, params: any): Promise<any> {
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
 * @param query The search query
 * @param location Optional center point for the search
 * @param radius Search radius in meters (max 50000)
 * @param maxResults Maximum number of results to return
 * @returns Promise resolving to array of place data
 */
export async function searchPlaces(
  query: string, 
  location?: { latitude: number; longitude: number },
  radius: number = 50000,
  maxResults: number = 10
): Promise<PlaceData[]> {
  try {
    const response = await executeMapsRequest('MAPS_SEARCH_PLACES', {
      query,
      location,
      radius
    });

    if (!response || !response.results) {
      return [];
    }

    const places = processPlaceResults(response.results);
    
    // Save places to database in the background
    places.forEach(place => {
      savePlace(place).catch(error => {
        console.error('Error saving place to database:', error);
      });
    });

    return places.slice(0, maxResults);
  } catch (error) {
    console.error('Error in searchPlaces:', error);
    return [];
  }
}

/**
 * Get place details using Google Places API via MCP
 * 
 * @param placeId The Google Place ID
 * @returns Promise resolving to place details
 */
export async function getPlaceDetails(placeId: string): Promise<PlaceData | null> {
  try {
    const response = await executeMapsRequest('MAPS_PLACE_DETAILS', {
      place_id: placeId
    });

    if (!response || !response.result) {
      return null;
    }

    const place = processPlaceResults([response.result])[0];
    
    // Save place to database in the background
    savePlace(place).catch(error => {
      console.error('Error saving place to database:', error);
    });

    return place;
  } catch (error) {
    console.error('Error in getPlaceDetails:', error);
    return null;
  }
}

/**
 * Get directions between two places using Google Maps API via MCP
 * 
 * @param origin The origin address or coordinates
 * @param destination The destination address or coordinates
 * @param mode The travel mode (driving, walking, bicycling, transit)
 * @returns Promise resolving to directions data
 */
export async function getDirections(
  origin: string,
  destination: string,
  mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
): Promise<any> {
  try {
    const response = await executeMapsRequest('MAPS_DIRECTIONS', {
      origin,
      destination,
      mode
    });

    return response;
  } catch (error) {
    console.error('Error in getDirections:', error);
    throw error;
  }
}

/**
 * Get distance matrix between multiple origins and destinations using Google Maps API via MCP
 * 
 * @param origins Array of origin addresses or coordinates
 * @param destinations Array of destination addresses or coordinates
 * @param mode The travel mode (driving, walking, bicycling, transit)
 * @returns Promise resolving to distance matrix data
 */
export async function getDistanceMatrix(
  origins: string[],
  destinations: string[],
  mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
): Promise<any> {
  try {
    const response = await executeMapsRequest('MAPS_DISTANCE_MATRIX', {
      origins,
      destinations,
      mode
    });

    return response;
  } catch (error) {
    console.error('Error in getDistanceMatrix:', error);
    throw error;
  }
}

/**
 * Geocode an address using Google Maps API via MCP
 * 
 * @param address The address to geocode
 * @returns Promise resolving to geocoding data
 */
export async function geocodeAddress(address: string): Promise<any> {
  try {
    const response = await executeMapsRequest('MAPS_GEOCODE', {
      address
    });

    return response.results?.[0] || null;
  } catch (error) {
    console.error('Error in geocodeAddress:', error);
    throw error;
  }
}

/**
 * Reverse geocode coordinates using Google Maps API via MCP
 * 
 * @param latitude The latitude coordinate
 * @param longitude The longitude coordinate
 * @returns Promise resolving to reverse geocoding data
 */
export async function reverseGeocode(latitude: number, longitude: number): Promise<any> {
  try {
    const response = await executeMapsRequest('MAPS_REVERSE_GEOCODE', {
      latitude,
      longitude
    });

    return response.results?.[0] || null;
  } catch (error) {
    console.error('Error in reverseGeocode:', error);
    throw error;
  }
}
