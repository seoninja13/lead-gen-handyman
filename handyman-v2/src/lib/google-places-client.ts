/**
 * Google Places API Client
 * 
 * This module provides a client for interacting with the Google Places API.
 * It includes functionality for searching businesses, retrieving place details,
 * and implements caching and rate limiting to optimize API usage.
 */

import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { RateLimiter } from 'limiter';

// Define the PlaceData interface
export interface PlaceData {
  place_id: string;
  name: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  cached?: boolean;
  description?: string;
  phone_number?: string;
  website?: string;
  photos?: string[];
  types?: string[];
  opening_hours?: {
    open_now?: boolean;
    periods?: any[];
    weekday_text?: string[];
  };
  geometry?: {
    location: {
      lat: number;
      lng: number;
    }
  };
}

// Define the fields we want to retrieve
// Using a minimal set of fields to minimize costs
const PLACES_FIELDS = [
  'id',                  // Basic field
  'displayName',         // Name of the place
  'formattedAddress',    // Address
  'primaryTypeDisplayName', // Type of business
  'rating',              // Rating
  'userRatingCount',     // Number of ratings
  'editorialSummary',    // Description
  'internationalPhoneNumber', // Phone number
  'websiteUri',          // Website
  'location',            // Geographic coordinates
  'businessStatus'       // Whether business is operational
];

// Cache duration in milliseconds (6 months)
const CACHE_DURATION = 180 * 24 * 60 * 60 * 1000;

// Cache directory
const CACHE_DIR = path.join(process.cwd(), '.cache', 'places');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Add rate limiting
const rateLimiter = new RateLimiter({
  tokensPerInterval: 50, // Adjust based on your API quota
  interval: 'minute'
});

/**
 * Generate a cache key from a search query
 */
function generateCacheKey(query: string): string {
  return crypto.createHash('md5').update(query).digest('hex');
}

/**
 * Get cached results for a search query
 */
async function getCachedResults(query: string): Promise<PlaceData[] | null> {
  try {
    const cacheKey = generateCacheKey(query);
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);
    
    // Check if cache file exists
    try {
      const stats = fs.statSync(cachePath);
      const cacheAge = Date.now() - stats.mtimeMs;
      
      // If cache is too old, return null
      if (cacheAge > CACHE_DURATION) {
        console.log(`Cache for "${query}" is too old (${Math.round(cacheAge / (24 * 60 * 60 * 1000))} days)`);
        return null;
      }
      
      // Read and parse cache file
      const cacheData = fs.readFileSync(cachePath, 'utf-8');
      const results = JSON.parse(cacheData);
      
      // Mark results as cached
      results.forEach((result: PlaceData) => {
        result.cached = true;
      });
      
      console.log(`Using cached data for "${query}" (${results.length} results)`);
      return results;
    } catch (error) {
      // File doesn't exist or other error
      return null;
    }
  } catch (error) {
    console.error('Error checking cache:', error);
    return null;
  }
}

/**
 * Cache search results
 */
async function cacheResults(query: string, results: PlaceData[]): Promise<void> {
  try {
    const cacheKey = generateCacheKey(query);
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);
    
    // Write results to cache file
    fs.writeFileSync(cachePath, JSON.stringify(results, null, 2));
    console.log(`Cached ${results.length} results for "${query}"`);
  } catch (error) {
    console.error('Error caching results:', error);
  }
}

/**
 * Process API results into PlaceData format
 */
function processResults(results: any[]): PlaceData[] {
  return results.map(place => {
    // Extract place ID from the name (format: "places/PLACE_ID")
    const placeId = place.name ? place.name.split('/').pop() : '';
    
    // Extract location if available
    const location = place.location ? {
      lat: place.location.latitude,
      lng: place.location.longitude
    } : undefined;
    
    return {
      place_id: placeId || place.id || '',
      name: place.displayName?.text || '',
      formatted_address: place.formattedAddress || '',
      rating: place.rating || 0,
      user_ratings_total: place.userRatingCount || 0,
      description: place.editorialSummary?.text || '',
      phone_number: place.internationalPhoneNumber || '',
      website: place.websiteUri || '',
      types: place.types || [],
      geometry: location ? { location } : undefined,
      cached: false
    };
  });
}

/**
 * Search for businesses using Google Places API
 * 
 * @param searchQuery The search query (e.g., "handyman services Sacramento CA")
 * @param maxResults Maximum number of results to return
 * @returns Promise resolving to array of place data
 */
export async function searchBusinesses(
  searchQuery: string,
  maxResults: number = 10
): Promise<PlaceData[]> {
  // Check for cached data first
  const cachedData = await getCachedResults(searchQuery);
  if (cachedData) {
    return cachedData.slice(0, maxResults);
  }
  
  // If no cache or expired, make API request
  console.log(`Fetching data from Places API for query: ${searchQuery}`);
  
  // Try both environment variable names for backward compatibility
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('API key not found. Please set GOOGLE_MAPS_API_KEY in your .env file');
    throw new Error('Google Places API key is not configured. Please add GOOGLE_MAPS_API_KEY to your .env file.');
  }
  
  try {
    // Wait for rate limiter
    await rateLimiter.removeTokens(1);
    
    // Use the Places API endpoint
    const url = 'https://places.googleapis.com/v1/places:searchText';
    
    // Create the request body
    const requestBody = {
      textQuery: searchQuery,
      maxResultCount: 20, // Get max allowed results per request for better quality selection
    };
    
    // Create the field mask header
    const fieldMask = PLACES_FIELDS.map(field => `places.${field}`).join(',');
    
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Places API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.places || !Array.isArray(data.places)) {
      console.error('Invalid API Response:', data);
      throw new Error('Invalid response from Places API');
    }
    
    // Process the results
    const results = processResults(data.places);
    
    // Cache the results for future use
    await cacheResults(searchQuery, results);
    
    // Return the requested number of results
    return results.slice(0, maxResults);
  } catch (error) {
    console.error('Error searching businesses:', error);
    throw error;
  }
}

/**
 * Get businesses for a specific service in a city
 * 
 * @param service The service (e.g., "handyman")
 * @param city The city name (e.g., "Sacramento")
 * @param maxResults Maximum number of results to return
 * @returns Promise resolving to array of place data
 */
export async function getBusinessesForServiceInCity(
  service: string,
  city: string,
  maxResults: number = 10
): Promise<PlaceData[]> {
  const searchQuery = `${service} services in ${city}`;
  return searchBusinesses(searchQuery, maxResults);
}

/**
 * Get place details using Google Places API
 * 
 * @param placeId The Google Place ID
 * @returns Promise resolving to place details
 */
export async function getPlaceDetails(placeId: string): Promise<PlaceData | null> {
  // Check for cached data first
  const cacheKey = `place_${placeId}`;
  const cachedData = await getCachedResults(cacheKey);
  if (cachedData && cachedData.length > 0) {
    return cachedData[0];
  }
  
  // If no cache or expired, make API request
  console.log(`Fetching place details for: ${placeId}`);
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('API key not found. Please set GOOGLE_MAPS_API_KEY in your .env file');
    throw new Error('Google Places API key is not configured.');
  }
  
  try {
    // Wait for rate limiter
    await rateLimiter.removeTokens(1);
    
    // Use the Places API endpoint for place details
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    
    // Create the field mask
    const fieldMask = PLACES_FIELDS.join(',');
    
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Places API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    // Process the result
    const placeData = processResults([data])[0];
    
    // Cache the result for future use
    await cacheResults(cacheKey, [placeData]);
    
    return placeData;
  } catch (error) {
    console.error('Error getting place details:', error);
    throw error;
  }
}

/**
 * Find nearby places using Google Places API
 * 
 * @param latitude Latitude coordinate
 * @param longitude Longitude coordinate
 * @param radius Search radius in meters
 * @param type Optional place type to filter by
 * @param maxResults Maximum number of results to return
 * @returns Promise resolving to array of place data
 */
export async function findNearbyPlaces(
  latitude: number,
  longitude: number,
  radius: number = 5000,
  type: string = 'home_service',
  maxResults: number = 10
): Promise<PlaceData[]> {
  const cacheKey = `nearby_${latitude}_${longitude}_${radius}_${type}`;
  
  // Check for cached data first
  const cachedData = await getCachedResults(cacheKey);
  if (cachedData) {
    return cachedData.slice(0, maxResults);
  }
  
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('API key not found. Please set GOOGLE_MAPS_API_KEY in your .env file');
    throw new Error('Google Places API key is not configured.');
  }
  
  try {
    // Wait for rate limiter
    await rateLimiter.removeTokens(1);
    
    // Use the Places API nearby search endpoint
    const url = 'https://places.googleapis.com/v1/places:searchNearby';
    
    // Create the request body
    const requestBody = {
      locationRestriction: {
        circle: {
          center: {
            latitude,
            longitude
          },
          radius
        }
      },
      includedTypes: [type],
      maxResultCount: maxResults
    };
    
    // Create the field mask
    const fieldMask = PLACES_FIELDS.map(field => `places.${field}`).join(',');
    
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Places API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.places || !Array.isArray(data.places)) {
      console.error('Invalid API Response:', data);
      throw new Error('Invalid response from Places API');
    }
    
    // Process the results
    const results = processResults(data.places);
    
    // Cache the results for future use
    await cacheResults(cacheKey, results);
    
    return results.slice(0, maxResults);
  } catch (error) {
    console.error('Error finding nearby places:', error);
    throw error;
  }
}
