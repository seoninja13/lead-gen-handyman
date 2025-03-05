/**
 * MCP Status Test Component
 * 
 * This component tests the MCP server connection and displays the status.
 * It's a simple way to verify that the MCP integration is working correctly.
 */

import React, { useState, useEffect } from 'react';

/**
 * McpStatusTest Component
 * 
 * @returns {JSX.Element} MCP Status Test component
 */
const McpStatusTest = () => {
  const [status, setStatus] = useState('unknown');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(null);
  const [activeTest, setActiveTest] = useState(null);
  const [testHistory, setTestHistory] = useState([]);

  /**
   * Add a test result to the history
   * 
   * @param {string} testType The type of test
   * @param {string} status The test status
   * @param {Object} data The test data
   * @param {string} errorMessage Optional error message
   */
  const addTestToHistory = (testType, status, data, errorMessage = null) => {
    const timestamp = new Date().toISOString();
    setTestHistory(prevHistory => [
      {
        id: Date.now(),
        testType,
        status,
        data,
        error: errorMessage,
        timestamp
      },
      ...prevHistory.slice(0, 9) // Keep only the last 10 tests
    ]);
  };

  /**
   * Check the MCP server status
   */
  const checkMcpStatus = async () => {
    setLoading(true);
    setError(null);
    setActiveTest('status');
    
    try {
      const response = await fetch('/api/mcp/status');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setStatus(data.status);
      setDetails(data);
      addTestToHistory('MCP Status', data.status, data);
    } catch (err) {
      console.error('Error checking MCP status:', err);
      setError(err.message);
      setStatus('error');
      addTestToHistory('MCP Status', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Test the Supabase MCP connection
   */
  const testSupabaseMcp = async () => {
    setLoading(true);
    setError(null);
    setActiveTest('supabase');
    
    try {
      const response = await fetch('/api/mcp/supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: 'SELECT NOW() as current_time'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const result = {
        type: 'supabase',
        result: data
      };
      setDetails(result);
      setStatus('success');
      addTestToHistory('Supabase MCP', 'success', result);
    } catch (err) {
      console.error('Error testing Supabase MCP:', err);
      setError(err.message);
      setStatus('error');
      addTestToHistory('Supabase MCP', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Test the Google Maps Places MCP connection
   */
  const testGoogleMapsPlacesMcp = async () => {
    setLoading(true);
    setError(null);
    setActiveTest('maps-places');
    
    try {
      const response = await fetch('/api/mcp/places/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'handyman services'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const result = {
        type: 'google-maps-places',
        result: data
      };
      setDetails(result);
      setStatus('success');
      addTestToHistory('Google Maps Places', 'success', result);
    } catch (err) {
      console.error('Error testing Google Maps Places MCP:', err);
      setError(err.message);
      setStatus('error');
      addTestToHistory('Google Maps Places', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Test the Google Maps Directions MCP connection
   */
  const testGoogleMapsDirectionsMcp = async () => {
    setLoading(true);
    setError(null);
    setActiveTest('maps-directions');
    
    try {
      const response = await fetch('/api/mcp/maps/directions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: 'Sacramento, CA',
          destination: 'San Francisco, CA',
          mode: 'driving'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const result = {
        type: 'google-maps-directions',
        result: data
      };
      setDetails(result);
      setStatus('success');
      addTestToHistory('Google Maps Directions', 'success', result);
    } catch (err) {
      console.error('Error testing Google Maps Directions MCP:', err);
      setError(err.message);
      setStatus('error');
      addTestToHistory('Google Maps Directions', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Test the Google Maps Geocoding MCP connection
   */
  const testGoogleMapsGeocodingMcp = async () => {
    setLoading(true);
    setError(null);
    setActiveTest('maps-geocoding');
    
    try {
      const response = await fetch('/api/mcp/maps/geocode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: 'Sacramento, CA'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const result = {
        type: 'google-maps-geocoding',
        result: data
      };
      setDetails(result);
      setStatus('success');
      addTestToHistory('Google Maps Geocoding', 'success', result);
    } catch (err) {
      console.error('Error testing Google Maps Geocoding MCP:', err);
      setError(err.message);
      setStatus('error');
      addTestToHistory('Google Maps Geocoding', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Test the OpenAI MCP connection
   */
  const testOpenAiMcp = async () => {
    setLoading(true);
    setError(null);
    setActiveTest('openai');
    
    try {
      const response = await fetch('/api/mcp/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: 'Hello, can you help me find a handyman?'
            }
          ],
          model: 'gpt-4o-mini'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const result = {
        type: 'openai',
        result: data
      };
      setDetails(result);
      setStatus('success');
      addTestToHistory('OpenAI MCP', 'success', result);
    } catch (err) {
      console.error('Error testing OpenAI MCP:', err);
      setError(err.message);
      setStatus('error');
      addTestToHistory('OpenAI MCP', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear test results
   */
  const clearResults = () => {
    setStatus('unknown');
    setError(null);
    setDetails(null);
    setActiveTest(null);
    setTestHistory([]);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h5 className="mb-4">
          <i className="fas fa-server text-primary me-2"></i>
          MCP Server Status
        </h5>

        {/* MCP Server Status */}
        <div className="mb-4">
          <h6 className="mb-3">General MCP Status</h6>
          <button
            className={`btn ${activeTest === 'status' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={checkMcpStatus}
            disabled={loading}
          >
            <i className="fas fa-sync-alt me-2"></i>
            Check MCP Server Status
          </button>
        </div>

        {/* Google Maps MCP Tests */}
        <div className="mb-4">
          <h6 className="mb-3">
            <i className="fas fa-map text-success me-2"></i>
            Google Maps MCP Tests
          </h6>
          <div className="btn-group mb-2">
            <button
              className={`btn ${activeTest === 'maps-places' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={testGoogleMapsPlacesMcp}
              disabled={loading}
            >
              <i className="fas fa-map-marker-alt me-2"></i>
              Test Places API
            </button>
            <button
              className={`btn ${activeTest === 'maps-directions' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={testGoogleMapsDirectionsMcp}
              disabled={loading}
            >
              <i className="fas fa-route me-2"></i>
              Test Directions API
            </button>
            <button
              className={`btn ${activeTest === 'maps-geocoding' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={testGoogleMapsGeocodingMcp}
              disabled={loading}
            >
              <i className="fas fa-search-location me-2"></i>
              Test Geocoding API
            </button>
          </div>
        </div>

        {/* Supabase MCP Tests */}
        <div className="mb-4">
          <h6 className="mb-3">
            <i className="fas fa-database text-info me-2"></i>
            Supabase MCP Tests
          </h6>
          <button
            className={`btn ${activeTest === 'supabase' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={testSupabaseMcp}
            disabled={loading}
          >
            <i className="fas fa-table me-2"></i>
            Test SQL Query
          </button>
        </div>

        {/* OpenAI MCP Tests */}
        <div className="mb-4">
          <h6 className="mb-3">
            <i className="fas fa-brain text-danger me-2"></i>
            OpenAI MCP Tests
          </h6>
          <button
            className={`btn ${activeTest === 'openai' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={testOpenAiMcp}
            disabled={loading}
          >
            <i className="fas fa-comment-alt me-2"></i>
            Test Chat Completion
          </button>
        </div>

        {/* Clear Results Button */}
        <div className="mb-4">
          <button
            className="btn btn-outline-secondary"
            onClick={clearResults}
            disabled={loading}
          >
            <i className="fas fa-trash-alt me-2"></i>
            Clear Results
          </button>
        </div>

        {/* Status Display */}
        {loading && (
          <div className="alert alert-info">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Running test...
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        {details && !loading && !error && (
          <div className="alert alert-success">
            <i className="fas fa-check-circle me-2"></i>
            Test completed successfully!
            <pre className="mt-3 bg-light p-3 rounded">
              {JSON.stringify(details, null, 2)}
            </pre>
          </div>
        )}

        {/* Test History */}
        {testHistory.length > 0 && (
          <div className="mt-4">
            <h6 className="mb-3">
              <i className="fas fa-history text-primary me-2"></i>
              Test History
            </h6>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Test</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {testHistory.map(test => (
                    <tr key={test.id}>
                      <td>{new Date(test.timestamp).toLocaleTimeString()}</td>
                      <td>{test.testType}</td>
                      <td>
                        <span className={`badge bg-${test.status === 'success' ? 'success' : test.status === 'online' ? 'success' : 'danger'}`}>
                          {test.status}
                        </span>
                      </td>
                      <td>
                        {test.error ? (
                          <span className="text-danger">{test.error}</span>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setDetails(test.data)}
                          >
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default McpStatusTest;
