/**
 * Test Dashboard
 * 
 * This page serves as a central testing dashboard for all MCP and Supabase functionality.
 * It provides buttons for testing various features and displays the results.
 */

import React, { useState } from 'react';
import McpStatusTest from '../../components/mcp/McpStatusTest';
import PlacesSearchMcp from '../../components/mcp/PlacesSearchMcp';
import SupabaseTest from '../../components/mcp/SupabaseTest';
import Head from 'next/head';

/**
 * Test Dashboard Component
 * 
 * @returns {JSX.Element} Test Dashboard
 */
const TestDashboard = () => {
  const [activeTab, setActiveTab] = useState('mcp-status');
  const [results, setResults] = useState(null);

  /**
   * Handle place selection
   * 
   * @param {Object} place The selected place
   */
  const handlePlaceSelect = (place) => {
    setResults({
      type: 'place-select',
      data: place
    });
  };

  /**
   * Handle places found
   * 
   * @param {Array} places The found places
   */
  const handlePlacesFound = (places) => {
    setResults({
      type: 'places-found',
      data: places
    });
  };

  /**
   * Render the active tab content
   * 
   * @returns {JSX.Element} Tab content
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'mcp-status':
        return <McpStatusTest />;
      case 'places-search':
        return (
          <div>
            <PlacesSearchMcp 
              onPlaceSelect={handlePlaceSelect}
              onPlacesFound={handlePlacesFound}
              placeholder="Search for handyman services..."
              buttonText="Find Services"
            />
            {results && results.type === 'place-select' && (
              <div className="mt-4">
                <h3>Selected Place Details</h3>
                <pre className="bg-light p-3 rounded">
                  {JSON.stringify(results.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        );
      case 'supabase-crud':
        return <SupabaseTest />;
      default:
        return <McpStatusTest />;
    }
  };

  return (
    <>
      <Head>
        <title>Handyman Services - Test Dashboard</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </Head>
      
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <i className="fas fa-tools text-primary fa-2x me-3"></i>
                  <div>
                    <h1 className="h3 mb-1">Handyman Services Test Dashboard</h1>
                    <p className="text-muted mb-0">Test and debug MCP integration and Supabase functionality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="mb-3">
                  <i className="fas fa-vial text-primary me-2"></i>
                  Test Features
                </h5>
                <div className="nav nav-pills">
                  <button
                    className={`nav-link d-flex align-items-center ${activeTab === 'mcp-status' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mcp-status')}
                  >
                    <i className="fas fa-server me-2"></i>
                    MCP Status
                  </button>
                  <button
                    className={`nav-link d-flex align-items-center ms-2 ${activeTab === 'places-search' ? 'active' : ''}`}
                    onClick={() => setActiveTab('places-search')}
                  >
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Places Search
                  </button>
                  <button
                    className={`nav-link d-flex align-items-center ms-2 ${activeTab === 'supabase-crud' ? 'active' : ''}`}
                    onClick={() => setActiveTab('supabase-crud')}
                  >
                    <i className="fas fa-database me-2"></i>
                    Supabase CRUD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="mb-3">
                  <i className="fas fa-info-circle text-primary me-2"></i>
                  Documentation
                </h5>
                <p className="mb-0">
                  This dashboard provides tools to test the MCP integration and Supabase functionality. Select a feature from the navigation above to begin testing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="row">
          <div className="col-12">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestDashboard;
