/**
 * Supabase Places Integration
 * 
 * This module provides functions for interacting with place data
 * stored in Supabase, integrating with the Google Places API.
 */

import { supabase } from '../utils/supabase/client';
import { PlaceData } from './google-places-client';

/**
 * Get a place from Supabase by its Google Place ID
 */
export async function getPlaceById(placeId: string): Promise<PlaceData | null> {
  try {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('place_id', placeId)
      .single();
      
    if (error) {
      console.error('Error fetching place from Supabase:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    // Transform Supabase data to PlaceData format
    return {
      place_id: data.place_id,
      name: data.name,
      formatted_address: data.address,
      rating: data.rating,
      user_ratings_total: data.user_ratings_total,
      description: data.description,
      phone_number: data.phone_number,
      website: data.website,
      geometry: data.latitude && data.longitude ? {
        location: {
          lat: data.latitude,
          lng: data.longitude
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
 * Save a place to Supabase
 */
export async function savePlaceToSupabase(place: PlaceData): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('places')
      .upsert({
        place_id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        user_ratings_total: place.user_ratings_total,
        description: place.description,
        phone_number: place.phone_number,
        website: place.website,
        latitude: place.geometry?.location.lat,
        longitude: place.geometry?.location.lng,
        last_updated: new Date().toISOString()
      }, {
        onConflict: 'place_id'
      });
      
    if (error) {
      console.error('Error saving place to Supabase:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in savePlaceToSupabase:', error);
    return false;
  }
}

/**
 * Get places by city from Supabase
 */
export async function getPlacesByCity(city: string, limit: number = 10): Promise<PlaceData[]> {
  try {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .ilike('address', `%${city}%`)
      .order('rating', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching places by city from Supabase:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Transform Supabase data to PlaceData format
    return data.map(item => ({
      place_id: item.place_id,
      name: item.name,
      formatted_address: item.address,
      rating: item.rating,
      user_ratings_total: item.user_ratings_total,
      description: item.description,
      phone_number: item.phone_number,
      website: item.website,
      geometry: item.latitude && item.longitude ? {
        location: {
          lat: item.latitude,
          lng: item.longitude
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
 * Get nearby places from Supabase
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
    
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .gte('latitude', latitude - latDegrees)
      .lte('latitude', latitude + latDegrees)
      .gte('longitude', longitude - lngDegrees)
      .lte('longitude', longitude + lngDegrees)
      .order('rating', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching nearby places from Supabase:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Transform Supabase data to PlaceData format
    return data.map(item => ({
      place_id: item.place_id,
      name: item.name,
      formatted_address: item.address,
      rating: item.rating,
      user_ratings_total: item.user_ratings_total,
      description: item.description,
      phone_number: item.phone_number,
      website: item.website,
      geometry: {
        location: {
          lat: item.latitude,
          lng: item.longitude
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
 * Add a service area for a provider
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
    // If this is the primary service area, update all existing areas to non-primary
    if (isPrimary) {
      await supabase
        .from('service_areas')
        .update({ is_primary: false })
        .eq('provider_id', providerId);
    }
    
    const { error } = await supabase
      .from('service_areas')
      .upsert({
        provider_id: providerId,
        place_id: placeId,
        city,
        state,
        zip_code: zipCode,
        radius_miles: radiusMiles,
        is_primary: isPrimary
      }, {
        onConflict: 'provider_id, place_id'
      });
      
    if (error) {
      console.error('Error adding service area to Supabase:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in addServiceArea:', error);
    return false;
  }
}

/**
 * Get service areas for a provider
 */
export async function getServiceAreas(providerId: string): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('service_areas')
      .select(`
        *,
        places:place_id (
          place_id,
          name,
          address,
          latitude,
          longitude
        )
      `)
      .eq('provider_id', providerId)
      .order('is_primary', { ascending: false });
      
    if (error) {
      console.error('Error fetching service areas from Supabase:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getServiceAreas:', error);
    return [];
  }
}

/**
 * Delete a service area
 */
export async function deleteServiceArea(
  providerId: string,
  placeId: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('service_areas')
      .delete()
      .eq('provider_id', providerId)
      .eq('place_id', placeId);
      
    if (error) {
      console.error('Error deleting service area from Supabase:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteServiceArea:', error);
    return false;
  }
}
