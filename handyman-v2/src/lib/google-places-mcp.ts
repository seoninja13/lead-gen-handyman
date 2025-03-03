/**
 * Google Places API MCP Client
 * 
 * This module provides a client for interacting with the Google Places API
 * using the Model Context Protocol (MCP) server.
 */

import { PlaceData } from './google-places-client';
import { executeMapsRequest } from '../utils/mcp-helpers';
import { savePlace } from '../utils/supabase/mcp-client';

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
 * Search for places using Google Places API via MCP
 * 
 * @param query The search query
 * @param maxResults Maximum number of results to return
 * @returns Promise resolving to array of place data
 */
export async function searchPlaces(query: string, maxResults: number = 10): Promise<PlaceData[]> {
  try {
    const response = await executeMapsRequest('mcp0_maps_search_places', {
      query,
      radius: 50000 // 50km radius
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
    const response = await executeMapsRequest('mcp0_maps_place_details', {
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
    const response = await executeMapsRequest('mcp0_maps_directions', {
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
    const response = await executeMapsRequest('mcp0_maps_distance_matrix', {
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
    const response = await executeMapsRequest('mcp0_maps_geocode', {
      address
    });

    return response;
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
    const response = await executeMapsRequest('mcp0_maps_reverse_geocode', {
      latitude,
      longitude
    });

    return response;
  } catch (error) {
    console.error('Error in reverseGeocode:', error);
    throw error;
  }
}
