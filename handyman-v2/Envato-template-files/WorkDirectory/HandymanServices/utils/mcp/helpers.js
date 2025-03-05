/**
 * MCP Helpers
 * 
 * This module provides utility functions for interacting with
 * Model Context Protocol (MCP) servers.
 */

import { MCP_SERVER_BASE_URL } from './config';

/**
 * Get MCP request options
 * 
 * @param {Object} params Parameters for the MCP request
 * @param {string} params.tool The MCP tool to use
 * @param {Object} params.params The parameters for the tool
 * @returns {Object} The request options
 */
export function getMcpRequestOptions({ tool, params }) {
  const body = {
    name: `mcp${tool.startsWith('mcp') ? tool.substring(3) : `_${tool}`}`,
    params
  };

  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}

/**
 * Handle MCP error
 * 
 * @param {Error} error The error to handle
 * @returns {Error} The processed error
 */
export function handleMcpError(error) {
  console.error('MCP Error:', error);
  
  // Return a more user-friendly error
  return new Error(`MCP Server Error: ${error.message}`);
}

/**
 * Execute a SQL query using the Supabase MCP server
 * 
 * @param {string} sql The SQL query to execute
 * @returns {Promise<Array>} Promise resolving to the query results
 */
export async function executeMcpQuery(sql) {
  try {
    const options = getMcpRequestOptions({
      tool: 'query',
      params: { sql }
    });

    const response = await fetch(MCP_SERVER_BASE_URL, options);

    if (!response.ok) {
      throw new Error(`Error executing query: ${response.statusText}`);
    }

    const result = await response.json();
    return result.rows || [];
  } catch (error) {
    console.error('Error in executeMcpQuery:', error);
    throw handleMcpError(error);
  }
}

/**
 * Execute a Google Maps API request using the MCP server
 * 
 * @param {string} method The Maps MCP method to call
 * @param {Object} params The parameters for the method
 * @returns {Promise<Object>} Promise resolving to the API response
 */
export async function executeMapsRequest(method, params) {
  try {
    const options = getMcpRequestOptions({
      tool: `maps_${method}`,
      params
    });

    const response = await fetch(MCP_SERVER_BASE_URL, options);

    if (!response.ok) {
      throw new Error(`Error executing Maps request: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in executeMapsRequest (${method}):`, error);
    throw handleMcpError(error);
  }
}

/**
 * Execute an OpenAI API request using the MCP server
 * 
 * @param {Array} messages The messages to send to OpenAI
 * @param {string} model The model to use
 * @returns {Promise<Object>} Promise resolving to the API response
 */
export async function executeOpenAiRequest(messages, model = 'gpt-4o-mini') {
  try {
    const options = getMcpRequestOptions({
      tool: 'openai_chat',
      params: {
        messages,
        model
      }
    });

    const response = await fetch(MCP_SERVER_BASE_URL, options);

    if (!response.ok) {
      throw new Error(`Error executing OpenAI request: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in executeOpenAiRequest:', error);
    throw handleMcpError(error);
  }
}
