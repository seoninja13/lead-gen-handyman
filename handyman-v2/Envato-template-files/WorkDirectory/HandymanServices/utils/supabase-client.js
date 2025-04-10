/**
 * Supabase Client Utility
 * 
 * This file provides direct integration with Supabase using the Supabase JavaScript client.
 * It handles connection setup and provides utility functions for database operations.
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration from our config file
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Execute a SQL query against the Supabase database
 * @param {string} query - SQL query to execute
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise<Object>} - Query result
 */
export async function executeQuery(query, params = {}) {
  try {
    // Using the rpc function to execute SQL queries
    const { data, error } = await supabase.rpc('execute_sql', {
      query_text: query,
      params: params
    });

    if (error) {
      console.error('Error executing query:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to execute query:', error);
    throw error;
  }
}

/**
 * Check if a table exists in the database
 * @param {string} tableName - Name of the table to check
 * @param {string} schema - Schema name (default: 'public')
 * @returns {Promise<boolean>} - True if table exists, false otherwise
 */
export async function tableExists(tableName, schema = 'public') {
  try {
    const query = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = $1 
        AND table_name = $2
      );
    `;
    
    const { data, error } = await supabase.rpc('execute_sql', {
      query_text: query,
      params: { schema, tableName }
    });

    if (error) {
      console.error('Error checking table existence:', error);
      return false;
    }

    return data && data.length > 0 && data[0].exists;
  } catch (error) {
    console.error('Failed to check table existence:', error);
    return false;
  }
}

/**
 * Create a table if it doesn't exist
 * @param {string} tableName - Name of the table to create
 * @param {string} schema - Schema definition SQL
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export async function createTableIfNotExists(tableName, schema) {
  try {
    const exists = await tableExists(tableName);
    
    if (!exists) {
      const createQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${schema});`;
      await executeQuery(createQuery);
      console.log(`Table ${tableName} created successfully`);
      return true;
    }
    
    console.log(`Table ${tableName} already exists`);
    return true;
  } catch (error) {
    console.error(`Failed to create table ${tableName}:`, error);
    return false;
  }
}

/**
 * Insert data into a table
 * @param {string} table - Table name
 * @param {Object} data - Data to insert
 * @returns {Promise<Object>} - Inserted data
 */
export async function insert(table, data) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select();

    if (error) {
      console.error(`Error inserting into ${table}:`, error);
      throw error;
    }

    return result;
  } catch (error) {
    console.error(`Failed to insert into ${table}:`, error);
    throw error;
  }
}

/**
 * Update data in a table
 * @param {string} table - Table name
 * @param {Object} data - Data to update
 * @param {Object} match - Conditions to match
 * @returns {Promise<Object>} - Updated data
 */
export async function update(table, data, match) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .match(match)
      .select();

    if (error) {
      console.error(`Error updating ${table}:`, error);
      throw error;
    }

    return result;
  } catch (error) {
    console.error(`Failed to update ${table}:`, error);
    throw error;
  }
}

/**
 * Delete data from a table
 * @param {string} table - Table name
 * @param {Object} match - Conditions to match
 * @returns {Promise<Object>} - Result of the deletion
 */
export async function remove(table, match) {
  try {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match(match);

    if (error) {
      console.error(`Error deleting from ${table}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Failed to delete from ${table}:`, error);
    throw error;
  }
}

/**
 * Select data from a table
 * @param {string} table - Table name
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Selected data
 */
export async function select(table, options = {}) {
  try {
    let query = supabase.from(table).select(options.columns || '*');
    
    if (options.where) {
      query = query.match(options.where);
    }
    
    if (options.order) {
      query = query.order(options.order.column, { ascending: options.order.ascending });
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.offset) {
      query = query.offset(options.offset);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error(`Error selecting from ${table}:`, error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Failed to select from ${table}:`, error);
    throw error;
  }
}

/**
 * Get database connection status
 * @returns {Promise<Object>} - Connection status
 */
export async function getConnectionStatus() {
  try {
    // Simple query to test the connection
    const { data, error } = await supabase
      .from('pg_stat_activity')
      .select('count(*)')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // This error means the table doesn't exist but connection works
        return { 
          connected: true, 
          message: 'Connected to Supabase' 
        };
      }
      
      return { 
        connected: false, 
        message: `Connection error: ${error.message}` 
      };
    }

    return { 
      connected: true, 
      message: 'Connected to Supabase', 
      activeConnections: data?.count || 0 
    };
  } catch (error) {
    return { 
      connected: false, 
      message: `Connection error: ${error.message}` 
    };
  }
}

// Export the supabase client for direct use
export default supabase;
