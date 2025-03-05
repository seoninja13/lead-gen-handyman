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
      addTestToHistory('Supabase', 'success', result);
    } catch (err) {
      console.error('Error testing Supabase MCP:', err);
      setError(err.message);
      setStatus('error');
      addTestToHistory('Supabase', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Test the Google Places MCP connection
   */
  const testPlacesMcp = async () => {
    setLoading(true);
    setError(null);
    setActiveTest('places');
    
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
        type: 'places',
        result: data
      };
      setDetails(result);
      setStatus('success');
      addTestToHistory('Places', 'success', result);
    } catch (err) {
      console.error('Error testing Places MCP:', err);
      setError(err.message);
      setStatus('error');
      addTestToHistory('Places', 'error', null, err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Test the Google Maps Directions MCP connection
   */
  const testDirectionsMcp = async () => {
    setLoading(true);
    setError(null);
    setActiveTest('directions');
    
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
        type: 'directions',
        result: data
      };
      setDetails(result);
      setStatus('success');
      addTestToHistory('Directions', 'success', result);
    } catch (err) {
      console.error('Error testing Directions MCP:', err);
      setError(err.message);
      setStatus('error');
      addTestToHistory('Directions', 'error', null, err.message);
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

        {/* Test Controls */}
        <div className="mb-4">
          <div className="btn-group">
            <button
              className={`btn ${activeTest === 'status' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={checkMcpStatus}
              disabled={loading}
            >
              <i className="fas fa-sync-alt me-2"></i>
              Check Status
            </button>
            <button
              className={`btn ${activeTest === 'supabase' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={testSupabaseMcp}
              disabled={loading}
            >
              <i className="fas fa-database me-2"></i>
              Test Supabase
            </button>
            <button
              className={`btn ${activeTest === 'places' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={testPlacesMcp}
              disabled={loading}
            >
              <i className="fas fa-map-marker-alt me-2"></i>
              Test Places
            </button>
            <button
              className={`btn ${activeTest === 'directions' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={testDirectionsMcp}
              disabled={loading}
            >
              <i className="fas fa-route me-2"></i>
              Test Directions
            </button>
          </div>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={clearResults}
            disabled={loading}
          >
            <i className="fas fa-trash-alt me-2"></i>
            Clear
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
                        <span className={`badge bg-${test.status === 'success' ? 'success' : 'danger'}`}>
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
