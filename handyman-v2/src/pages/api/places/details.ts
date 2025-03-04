/**
 * API Route: /api/places/details
 * 
 * This endpoint retrieves detailed information about a specific place
 * using the Google Places API and stores it in Supabase.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getPlaceDetails } from '../../../lib/google-places-client';
import { supabase } from '../../../utils/supabase/client';

// Define the response type
interface DetailsResponse {
  place?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DetailsResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the place_id from the query parameters
    const { place_id } = req.query;
    
    if (!place_id) {
      return res.status(400).json({ error: 'Missing required parameter: place_id' });
    }
    
    console.log(`Fetching details for place_id: ${place_id}`);
    
    // First, check if we have this place in Supabase
    const { data: existingPlace, error: dbError } = await supabase
      .from('places')
      .select('*')
      .eq('place_id', place_id)
      .single();
      
    if (dbError && dbError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Database error:', dbError);
    }
    
    // If we have fresh data (less than 7 days old), use it
    if (existingPlace && existingPlace.last_updated) {
      const lastUpdated = new Date(existingPlace.last_updated);
      const now = new Date();
      const daysSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceUpdate < 7) {
        console.log(`Using cached place details from database (${daysSinceUpdate.toFixed(1)} days old)`);
        return res.status(200).json({ place: existingPlace });
      }
    }
    
    // Get place details from Google Places API
    const placeDetails = await getPlaceDetails(place_id as string);
    
    if (!placeDetails) {
      return res.status(404).json({ error: 'Place not found' });
    }
    
    // Store the place details in Supabase
    try {
      const { error } = await supabase
        .from('places')
        .upsert({
          place_id: placeDetails.place_id,
          name: placeDetails.name,
          address: placeDetails.formatted_address,
          rating: placeDetails.rating,
          user_ratings_total: placeDetails.user_ratings_total,
          description: placeDetails.description,
          phone_number: placeDetails.phone_number,
          website: placeDetails.website,
          latitude: placeDetails.geometry?.location.lat,
          longitude: placeDetails.geometry?.location.lng,
          last_updated: new Date().toISOString()
        }, {
          onConflict: 'place_id'
        });
        
      if (error) {
        console.error('Error storing place details in Supabase:', error);
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with the response even if database storage fails
    }
    
    // Return the place details
    return res.status(200).json({ place: placeDetails });
  } catch (error) {
    console.error('Error in /api/places/details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
