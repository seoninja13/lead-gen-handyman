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
      
      <div className="row">
        <div className="col-12 mb-5">
          <div className="card">
            <div className="card-header">
              <h2>MCP Server Status</h2>
            </div>
            <div className="card-body">
              <McpStatusTest />
            </div>
          </div>
        </div>
        
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h2>Places Search MCP</h2>
            </div>
            <div className="card-body">
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
    </div>
  );
};

export default McpTestPage;
