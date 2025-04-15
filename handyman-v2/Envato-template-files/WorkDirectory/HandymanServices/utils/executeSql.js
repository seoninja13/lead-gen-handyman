/**
 * Utility to execute SQL directly against the Supabase database
 */

const fetch = require('node-fetch');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

/**
 * Execute SQL directly against the Supabase database
 * 
 * @param {string} sql - The SQL to execute
 * @returns {Promise<Object>} - The result of the SQL execution
 */
async function executeSql(sql) {
  try {
    console.log('Executing SQL:', sql);
    
    // Make a request to the Supabase REST API
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/execute_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        query: sql
      })
    });
    
    // Check for errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SQL execution failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    // Parse the response
    const result = await response.json();
    
    return result;
  } catch (error) {
    console.error('Error executing SQL:', error);
    throw error;
  }
}

module.exports = executeSql;
