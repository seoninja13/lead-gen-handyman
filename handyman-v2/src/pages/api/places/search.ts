/**
 * API Route: /api/places/search
 * 
 * This endpoint searches for businesses using the Google Places API.
 * It accepts search parameters and returns a list of businesses.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { searchBusinesses } from '../../../lib/google-places-client';
import { supabase } from '../../../utils/supabase/client';

// Define the response type
interface SearchResponse {
  businesses: any[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      businesses: [],
      error: 'Method not allowed' 
    });
  }

  try {
    // Get query parameters
    const { query, city, service, maxResults } = req.query;
    
    // Construct search query based on parameters
    let searchQuery = '';
    if (query) {
      searchQuery = query as string;
    } else if (city && service) {
      searchQuery = `${service} services in ${city}`;
    } else if (city) {
      searchQuery = `handyman services in ${city}`;
    } else {
      return res.status(400).json({
        businesses: [],
        error: 'Missing required parameters: query or city'
      });
    }
    
    // Parse maxResults parameter
    const limit = maxResults ? parseInt(maxResults as string, 10) : 10;
    
    console.log(`Searching for businesses with query: ${searchQuery}, limit: ${limit}`);
    
    // Search for businesses
    const businesses = await searchBusinesses(searchQuery, limit);
    
    // Store search results in Supabase for future reference
    if (businesses.length > 0) {
      try {
        // Store the search query and timestamp
        const { error } = await supabase
          .from('place_searches')
          .insert({
            query: searchQuery,
            results_count: businesses.length,
            timestamp: new Date().toISOString()
          });
          
        if (error) {
          console.error('Error storing search in Supabase:', error);
        }
        
        // Store the business data
        for (const business of businesses) {
          const { error: businessError } = await supabase
            .from('places')
            .upsert({
              place_id: business.place_id,
              name: business.name,
              address: business.formatted_address,
              rating: business.rating,
              user_ratings_total: business.user_ratings_total,
              description: business.description,
              last_updated: new Date().toISOString()
            }, {
              onConflict: 'place_id'
            });
            
          if (businessError) {
            console.error('Error storing business in Supabase:', businessError);
          }
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue with the response even if database storage fails
      }
    }
    
    // Return the businesses
    return res.status(200).json({ businesses });
  } catch (error) {
    console.error('Error in /api/places/search:', error);
    return res.status(500).json({
      businesses: [],
      error: 'Internal server error'
    });
  }
}
