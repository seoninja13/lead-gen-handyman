/**
 * Supabase MCP API Route
 * 
 * This API route provides an interface for interacting with the Supabase database
 * through the Model Context Protocol (MCP) server.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { withMcpAuth } from '../../../utils/mcp-auth';
import { MCP_ENDPOINTS, getMcpRequestOptions, handleMcpError } from '../../../config/mcp-config';

/**
 * Handle API requests to the Supabase MCP server
 * 
 * @param req The Next.js API request
 * @param res The Next.js API response
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sql, operation, table, data, where } = req.body;

    // If SQL is provided directly, execute it
    if (sql && typeof sql === 'string') {
      // Check for dangerous SQL operations in non-development environments
      if (process.env.NODE_ENV !== 'development') {
        const dangerousOperations = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER'];
        const containsDangerousOperation = dangerousOperations.some(op => 
          sql.toUpperCase().includes(op)
        );
        
        if (containsDangerousOperation) {
          return res.status(403).json({ 
            error: 'Dangerous SQL operations are not allowed in production' 
          });
        }
      }

      // Execute the query using the MCP server
      const response = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql }));

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error || 'Error executing query' });
      }

      const result = await response.json();
      return res.status(200).json(result);
    } 
    // Otherwise, handle CRUD operations
    else if (operation && table) {
      let generatedSql = '';
      
      switch (operation.toUpperCase()) {
        case 'SELECT':
          // Handle SELECT operation
          const fields = req.body.fields || '*';
          const limit = req.body.limit || 100;
          const offset = req.body.offset || 0;
          const orderBy = req.body.orderBy || 'id';
          const orderDir = req.body.orderDir || 'ASC';
          
          generatedSql = `SELECT ${fields} FROM ${table}`;
          
          if (where) {
            generatedSql += ` WHERE ${buildWhereClause(where)}`;
          }
          
          generatedSql += ` ORDER BY ${orderBy} ${orderDir} LIMIT ${limit} OFFSET ${offset}`;
          break;
          
        case 'INSERT':
          // Handle INSERT operation
          if (!data || typeof data !== 'object') {
            return res.status(400).json({ error: 'Invalid data for INSERT operation' });
          }
          
          const columns = Object.keys(data);
          const values = Object.values(data).map(formatSqlValue);
          
          generatedSql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.join(', ')}) RETURNING *`;
          break;
          
        case 'UPDATE':
          // Handle UPDATE operation
          if (!data || typeof data !== 'object') {
            return res.status(400).json({ error: 'Invalid data for UPDATE operation' });
          }
          
          if (!where) {
            return res.status(400).json({ error: 'WHERE clause is required for UPDATE operation' });
          }
          
          const setClause = Object.entries(data)
            .map(([key, value]) => `${key} = ${formatSqlValue(value)}`)
            .join(', ');
          
          generatedSql = `UPDATE ${table} SET ${setClause} WHERE ${buildWhereClause(where)} RETURNING *`;
          break;
          
        case 'DELETE':
          // Handle DELETE operation
          if (!where) {
            return res.status(400).json({ error: 'WHERE clause is required for DELETE operation' });
          }
          
          // Extra safety check for DELETE operations
          if (process.env.NODE_ENV !== 'development' && !req.body.confirmDelete) {
            return res.status(403).json({ 
              error: 'DELETE operations require confirmation in production' 
            });
          }
          
          generatedSql = `DELETE FROM ${table} WHERE ${buildWhereClause(where)} RETURNING *`;
          break;
          
        default:
          return res.status(400).json({ error: `Unsupported operation: ${operation}` });
      }
      
      // Execute the generated SQL query
      const response = await fetch(MCP_ENDPOINTS.SUPABASE_QUERY, getMcpRequestOptions({ sql: generatedSql }));

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error || 'Error executing query' });
      }

      const result = await response.json();
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ error: 'Invalid request. Provide either SQL query or operation details.' });
    }
  } catch (error) {
    console.error('Error in Supabase MCP API route:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Format a value for use in SQL queries
 * 
 * @param value The value to format
 * @returns The formatted value
 */
function formatSqlValue(value: any): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  
  if (typeof value === 'number') {
    return value.toString();
  }
  
  if (typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE';
  }
  
  if (value instanceof Date) {
    return `'${value.toISOString()}'`;
  }
  
  // Escape single quotes in strings
  return `'${String(value).replace(/'/g, "''")}'`;
}

/**
 * Build a WHERE clause from a condition object
 * 
 * @param where The where conditions
 * @returns The WHERE clause string
 */
function buildWhereClause(where: any): string {
  if (typeof where === 'string') {
    return where;
  }
  
  if (typeof where !== 'object' || where === null) {
    throw new Error('Invalid WHERE clause');
  }
  
  return Object.entries(where)
    .map(([key, value]) => `${key} = ${formatSqlValue(value)}`)
    .join(' AND ');
}

// Export with authentication middleware
export default withMcpAuth(handler);
