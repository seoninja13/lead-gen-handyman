/**
 * MCP Test Page
 * 
 * This page is used to test the MCP integration.
 * It includes various components for testing different aspects of the MCP functionality.
 */

import React from 'react';
import McpStatusTest from '../../components/mcp/McpStatusTest';
import PlacesSearchMcp from '../../components/mcp/PlacesSearchMcp';

/**
 * MCP Test Page Component
 * 
 * @returns {JSX.Element} MCP Test Page
 */
const McpTestPage = () => {
  /**
   * Handle place selection
   * 
   * @param {Object} place The selected place
   */
  const handlePlaceSelect = (place) => {
    console.log('Selected place:', place);
  };

  /**
   * Handle places found
   * 
   * @param {Array} places The found places
   */
  const handlePlacesFound = (places) => {
    console.log('Found places:', places);
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">MCP Integration Tests</h1>
      <p className="lead mb-5">
        This page allows you to test the integration with the three MCP servers:
        Google Maps, Supabase, and OpenAI.
      </p>
      
      <div className="row">
        <div className="col-12 mb-5">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">MCP Server Status</h2>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">
                Test the status of all MCP servers and their specific endpoints.
                Each test will make a request to the corresponding MCP server and display the results.
              </p>
              <McpStatusTest />
            </div>
          </div>
        </div>
        
        <div className="col-12 mb-5">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h2 className="h4 mb-0">Google Maps MCP - Places Search</h2>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">
                Test the Google Maps Places API integration through the MCP server.
                Enter a search query to find places related to handyman services.
              </p>
              <PlacesSearchMcp 
                onPlaceSelect={handlePlaceSelect}
                onPlacesFound={handlePlacesFound}
                placeholder="Search for handyman services..."
                buttonText="Find Services"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h2 className="h4 mb-0">MCP Integration Documentation</h2>
            </div>
            <div className="card-body">
              <h3 className="h5 mb-3">Available MCP Servers</h3>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>MCP Server</th>
                      <th>Description</th>
                      <th>Endpoints</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="badge bg-success">Google Maps</span>
                      </td>
                      <td>Provides access to Google Maps APIs including Places, Directions, and Geocoding</td>
                      <td>
                        <ul className="mb-0">
                          <li><code>/api/mcp/places/search</code> - Search for places</li>
                          <li><code>/api/mcp/maps/directions</code> - Get directions between locations</li>
                          <li><code>/api/mcp/maps/geocode</code> - Convert address to coordinates</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="badge bg-info">Supabase</span>
                      </td>
                      <td>Provides access to the Supabase PostgreSQL database</td>
                      <td>
                        <ul className="mb-0">
                          <li><code>/api/mcp/supabase</code> - Execute SQL queries</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="badge bg-danger">OpenAI</span>
                      </td>
                      <td>Provides access to OpenAI's language models</td>
                      <td>
                        <ul className="mb-0">
                          <li><code>/api/mcp/openai</code> - Generate text using OpenAI models</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="h5 mb-3 mt-4">Environment Variables</h3>
              <p>The following environment variables are required for the MCP servers to function correctly:</p>
              <ul>
                <li><code>MCP_SERVER_BASE_URL</code> - The base URL of the MCP server</li>
                <li><code>GOOGLE_MAPS_API_KEY</code> - Google Maps API key for the Google Maps MCP server</li>
                <li><code>SUPABASE_URL</code> - Supabase URL for the Supabase MCP server</li>
                <li><code>SUPABASE_KEY</code> - Supabase API key for the Supabase MCP server</li>
                <li><code>OPENAI_API_KEY</code> - OpenAI API key for the OpenAI MCP server</li>
              </ul>
              
              <div className="alert alert-warning mt-4">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Note:</strong> Make sure all required environment variables are set before testing the MCP servers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McpTestPage;
