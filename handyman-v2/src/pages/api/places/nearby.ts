/**
 * API Route: /api/places/nearby
 * 
 * This endpoint finds nearby places using the Google Places API
 * based on geographic coordinates.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { findNearbyPlaces } from '../../../lib/google-places-client';
import { supabase } from '../../../utils/supabase/client';

// Define the response type
interface NearbyResponse {
  places?: any[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NearbyResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get query parameters
    const { lat, lng, radius, type, maxResults } = req.query;
    
    // Validate required parameters
    if (!lat || !lng) {
      return res.status(400).json({ 
        error: 'Missing required parameters: lat and lng' 
      });
    }
    
    // Parse parameters
    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);
    const searchRadius = radius ? parseInt(radius as string, 10) : 5000;
    const searchType = type as string || 'home_service';
    const limit = maxResults ? parseInt(maxResults as string, 10) : 10;
    
    // Validate coordinates
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ 
        error: 'Invalid coordinates: lat and lng must be numbers' 
      });
    }
    
    console.log(`Searching for nearby places at (${latitude}, ${longitude}) with radius ${searchRadius}m`);
    
    // Find nearby places
    const places = await findNearbyPlaces(
      latitude,
      longitude,
      searchRadius,
      searchType,
      limit
    );
    
    // Store search results in Supabase
    if (places.length > 0) {
      try {
        // Store the search parameters
        const { error } = await supabase
          .from('nearby_searches')
          .insert({
            latitude,
            longitude,
            radius: searchRadius,
            type: searchType,
            results_count: places.length,
            timestamp: new Date().toISOString()
          });
          
        if (error) {
          console.error('Error storing search in Supabase:', error);
        }
        
        // Store the place data
        for (const place of places) {
          const { error: placeError } = await supabase
            .from('places')
            .upsert({
              place_id: place.place_id,
              name: place.name,
              address: place.formatted_address,
              rating: place.rating,
              user_ratings_total: place.user_ratings_total,
              description: place.description,
              latitude: place.geometry?.location.lat,
              longitude: place.geometry?.location.lng,
              last_updated: new Date().toISOString()
            }, {
              onConflict: 'place_id'
            });
            
          if (placeError) {
            console.error('Error storing place in Supabase:', placeError);
          }
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue with the response even if database storage fails
      }
    }
    
    // Return the places
    return res.status(200).json({ places });
  } catch (error) {
    console.error('Error in /api/places/nearby:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
