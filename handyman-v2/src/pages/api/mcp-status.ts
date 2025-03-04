/**
 * MCP Status API Route
 * 
 * This API route checks the status of the MCP servers.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { MCP_ENDPOINTS, getMcpRequestOptions } from '../../config/mcp-config';

/**
 * Handle API requests to check MCP server status
 * 
 * @param req The Next.js API request
 * @param res The Next.js API response
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    supabase: { status: 'unknown' },
    googleMaps: { status: 'unknown' },
    errors: []
  };

  try {
    // Check Supabase MCP server
    try {
      const supabaseQuery = `SELECT 1 as ping;`;
      
      const supabaseResponse = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: supabaseQuery }));
      
      if (!supabaseResponse.ok) {
        const errorData = await supabaseResponse.json();
        throw new Error(`Supabase MCP error: ${errorData.error || supabaseResponse.statusText}`);
      }
      
      const supabaseResult = await supabaseResponse.json();
      
      results.supabase = { 
        status: 'connected', 
        message: 'Supabase MCP server is available',
        data: supabaseResult
      };
    } catch (error: any) {
      results.errors.push({ server: 'supabase', message: error.message });
      results.supabase = { status: 'error', error: error.message };
    }
    
    // Check Google Maps MCP server
    try {
      // Simple query to test Google Maps MCP server
      const mapsResponse = await fetch(MCP_ENDPOINTS.MAPS_GEOCODE, getMcpRequestOptions({ 
        address: 'Test Address' 
      }));
      
      // We expect this to fail with a specific error (invalid API key or similar)
      // but not with a connection error
      const mapsResult = await mapsResponse.json();
      
      if (mapsResponse.ok) {
        results.googleMaps = { 
          status: 'connected', 
          message: 'Google Maps MCP server is available',
          data: mapsResult
        };
      } else {
        // If we get a specific API error, the server is still available
        if (mapsResult.error && (
          mapsResult.error.includes('API key') || 
          mapsResult.error.includes('apiKey') ||
          mapsResult.error.includes('invalid')
        )) {
          results.googleMaps = { 
            status: 'connected', 
            message: 'Google Maps MCP server is available (API key error)',
            error: mapsResult.error
          };
        } else {
          throw new Error(`Google Maps MCP error: ${mapsResult.error || mapsResponse.statusText}`);
        }
      }
    } catch (error: any) {
      results.errors.push({ server: 'googleMaps', message: error.message });
      results.googleMaps = { status: 'error', error: error.message };
    }
    
    // Calculate overall status
    const allServersConnected = 
      results.supabase.status === 'connected' && 
      results.googleMaps.status === 'connected';
    
    // Return results
    return res.status(200).json({
      ...results,
      status: allServersConnected ? 'connected' : 'partial',
      message: allServersConnected 
        ? 'All MCP servers are available' 
        : 'Some MCP servers are unavailable'
    });
  } catch (error: any) {
    console.error('Error checking MCP status:', error);
    return res.status(500).json({ 
      ...results,
      status: 'error',
      message: 'Error checking MCP status',
      error: error.message 
    });
  }
}
