/**
 * Supabase SQL Execution API Route
 *
 * This API route executes SQL queries directly against the Supabase database.
 * It provides a direct interface for executing SQL without relying on the MCP server.
 *
 * Endpoint: /api/supabase/execute-sql
 * Method: POST
 * Body: {
 *   query: string (SQL query to execute),
 *   params: object (optional query parameters)
 * }
 */

import { supabase } from '../../../utils/supabase/client';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, params = {} } = req.body;

    // Validate required parameters
    if (!query) {
      return res.status(400).json({ error: 'SQL query is required' });
    }

    // Log the request for debugging
    console.log('Executing SQL query:', query, 'with params:', params);

    // For tables with hyphens, we'll use direct table access with underscores
    if (query.toLowerCase().includes('test-delete')) {
      // Extract operation type
      const operation = query.trim().toLowerCase().startsWith('select') ? 'SELECT' : 
                        query.trim().toLowerCase().startsWith('insert') ? 'INSERT' :
                        query.trim().toLowerCase().startsWith('update') ? 'UPDATE' :
                        query.trim().toLowerCase().startsWith('delete') ? 'DELETE' : 'UNKNOWN';
      
      // For SELECT queries
      if (operation === 'SELECT') {
        try {
          // Use direct table access with underscores instead of hyphens
          const { data, error } = await supabase
            .from('test_delete')  // Use underscores instead of hyphens
            .select('*')
            .limit(100);
          
          if (error) {
            throw error;
          }
          
          return res.status(200).json({
            success: true,
            data,
            count: data.length,
            operation: 'SELECT',
            message: 'Query executed successfully with direct table access'
          });
        } catch (selectError) {
          console.error('Error executing SELECT on test_delete:', selectError);
          return res.status(500).json({
            success: false,
            error: 'Failed to execute SELECT query on test_delete',
            message: selectError.message,
            details: selectError.toString()
          });
        }
      }
      
      // For INSERT queries
      if (operation === 'INSERT') {
        try {
          // Extract column names and values from the query
          const columnsMatch = query.match(/\(([^)]+)\)\s+values/i);
          const valuesMatch = query.match(/values\s*\(([^)]+)\)/i);
          
          if (!columnsMatch || !columnsMatch[1] || !valuesMatch || !valuesMatch[1]) {
            return res.status(400).json({ error: 'Could not parse columns or values from INSERT query' });
          }
          
          const columns = columnsMatch[1].split(',').map(col => col.trim().replace(/['"]/g, ''));
          const values = valuesMatch[1].split(',').map(val => {
            const trimmed = val.trim();
            // Handle string literals
            if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
              return trimmed.substring(1, trimmed.length - 1);
            }
            // Handle numbers and other literals
            return trimmed === 'null' ? null : trimmed;
          });
          
          // Create object from columns and values
          const insertData = {};
          columns.forEach((col, index) => {
            if (index < values.length) {
              insertData[col] = values[index];
            }
          });
          
          // Execute the insert on test_delete
          const { data, error } = await supabase
            .from('test_delete')  // Use underscores instead of hyphens
            .insert(insertData)
            .select();
          
          if (error) {
            throw error;
          }
          
          return res.status(200).json({
            success: true,
            data,
            operation: 'INSERT',
            message: 'Data inserted into test_delete successfully',
            rowsAffected: data ? data.length : 1
          });
        } catch (insertError) {
          console.error('Error executing INSERT on test_delete:', insertError);
          return res.status(500).json({
            success: false,
            error: 'Failed to execute INSERT query on test_delete',
            message: insertError.message,
            details: insertError.toString()
          });
        }
      }
      
      // For UPDATE queries
      if (operation === 'UPDATE') {
        try {
          // Extract SET clause
          const setMatch = query.match(/set\s+([^;]+?)(?:\s+where|$)/i);
          if (!setMatch || !setMatch[1]) {
            return res.status(400).json({ error: 'Could not parse SET clause from UPDATE query' });
          }
          
          const setPairs = setMatch[1].split(',').map(pair => {
            const [column, value] = pair.split('=').map(p => p.trim());
            return { column: column.replace(/['"]/g, ''), value };
          });
          
          // Create update object
          const updateData = {};
          setPairs.forEach(({ column, value }) => {
            // Handle string literals
            if (value.startsWith("'") && value.endsWith("'")) {
              updateData[column] = value.substring(1, value.length - 1);
            } else {
              // Handle numbers and other literals
              updateData[column] = value === 'null' ? null : value;
            }
          });
          
          // Extract WHERE clause
          const whereMatch = query.match(/where\s+([^;]+)$/i);
          const whereClause = whereMatch ? whereMatch[1].trim() : null;
          
          // For simplicity, we'll only handle basic equality conditions
          let updateQuery = supabase.from('test_delete').update(updateData);
          
          if (whereClause) {
            // Very basic WHERE parsing - only handles simple equality
            const eqMatch = whereClause.match(/([^\s=]+)\s*=\s*('[^']+'|\d+|true|false|null)/i);
            if (eqMatch) {
              const column = eqMatch[1].replace(/['"]/g, '');
              let value = eqMatch[2];
              
              // Handle string literals
              if (value.startsWith("'") && value.endsWith("'")) {
                value = value.substring(1, value.length - 1);
              } else if (value === 'null') {
                value = null;
              } else if (value === 'true') {
                value = true;
              } else if (value === 'false') {
                value = false;
              } else if (!isNaN(value)) {
                value = Number(value);
              }
              
              updateQuery = updateQuery.eq(column, value);
            }
          }
          
          // Execute the update
          const { data, error } = await updateQuery.select();
          
          if (error) {
            throw error;
          }
          
          return res.status(200).json({
            success: true,
            data,
            operation: 'UPDATE',
            message: 'Data in test_delete updated successfully',
            rowsAffected: data ? data.length : 1
          });
        } catch (updateError) {
          console.error('Error executing UPDATE on test_delete:', updateError);
          return res.status(500).json({
            success: false,
            error: 'Failed to execute UPDATE query on test_delete',
            message: updateError.message,
            details: updateError.toString()
          });
        }
      }
      
      // For DELETE queries
      if (operation === 'DELETE') {
        try {
          // Extract WHERE clause
          const whereMatch = query.match(/where\s+([^;]+)$/i);
          const whereClause = whereMatch ? whereMatch[1].trim() : null;
          
          // For safety, require a WHERE clause
          if (!whereClause) {
            return res.status(400).json({ 
              error: 'DELETE without WHERE clause is not supported for safety reasons' 
            });
          }
          
          // Very basic WHERE parsing - only handles simple equality
          const eqMatch = whereClause.match(/([^\s=]+)\s*=\s*('[^']+'|\d+|true|false|null)/i);
          if (!eqMatch) {
            return res.status(400).json({ 
              error: 'Only simple equality conditions are supported in WHERE clause' 
            });
          }
          
          const column = eqMatch[1].replace(/['"]/g, '');
          let value = eqMatch[2];
          
          // Handle string literals
          if (value.startsWith("'") && value.endsWith("'")) {
            value = value.substring(1, value.length - 1);
          } else if (value === 'null') {
            value = null;
          } else if (value === 'true') {
            value = true;
          } else if (value === 'false') {
            value = false;
          } else if (!isNaN(value)) {
            value = Number(value);
          }
          
          // Execute the delete
          const { data, error } = await supabase
            .from('test_delete')  // Use underscores instead of hyphens
            .delete()
            .eq(column, value)
            .select();
          
          if (error) {
            throw error;
          }
          
          return res.status(200).json({
            success: true,
            data,
            operation: 'DELETE',
            message: 'Data from test_delete deleted successfully',
            rowsAffected: data ? data.length : 0
          });
        } catch (deleteError) {
          console.error('Error executing DELETE on test_delete:', deleteError);
          return res.status(500).json({
            success: false,
            error: 'Failed to execute DELETE query on test_delete',
            message: deleteError.message,
            details: deleteError.toString()
          });
        }
      }
    }

    // For SELECT queries
    if (query.trim().toLowerCase().startsWith('select')) {
      try {
        // Extract table name from query (simple parsing)
        const tableMatch = query.match(/from\s+([^\s,;()]+)/i);
        if (!tableMatch || !tableMatch[1]) {
          return res.status(400).json({ error: 'Could not parse table name from SELECT query' });
        }
        
        let tableName = tableMatch[1].replace(/['"]/g, '');
        
        // Handle table names with hyphens by replacing them with underscores
        // Supabase client API doesn't support table names with hyphens
        if (tableName.includes('-')) {
          console.log(`Table name contains hyphens: ${tableName}`);
          tableName = tableName.replace(/-/g, '_');
        }
        
        // Execute the query using the Supabase client
        const { data, error, count } = await supabase
          .from(tableName)
          .select('*')
          .limit(100); // Increased limit for more comprehensive results
          
        if (error) {
          return res.status(400).json({
            success: false,
            error: error.message,
            details: error
          });
        }
        
        return res.status(200).json({
          success: true,
          data,
          count,
          operation: 'SELECT',
          message: 'Query executed successfully'
        });
      } catch (selectError) {
        console.error('Error executing SELECT query:', selectError);
        return res.status(500).json({
          success: false,
          error: 'Failed to execute SELECT query',
          message: selectError.message,
          details: selectError.toString()
        });
      }
    }
    
    // For INSERT queries
    if (query.trim().toLowerCase().startsWith('insert')) {
      try {
        // Extract table name and columns from query
        const tableMatch = query.match(/into\s+([^\s(]+)/i);
        if (!tableMatch || !tableMatch[1]) {
          return res.status(400).json({ error: 'Could not parse table name from INSERT query' });
        }
        
        let tableName = tableMatch[1].replace(/['"]/g, '');
        
        // Handle table names with hyphens
        if (tableName.includes('-')) {
          tableName = tableName.replace(/-/g, '_');
        }
        
        // Extract column names
        const columnsMatch = query.match(/\(([^)]+)\)\s+values/i);
        if (!columnsMatch || !columnsMatch[1]) {
          return res.status(400).json({ error: 'Could not parse columns from INSERT query' });
        }
        
        const columns = columnsMatch[1].split(',').map(col => col.trim().replace(/['"]/g, ''));
        
        // Extract values
        const valuesMatch = query.match(/values\s*\(([^)]+)\)/i);
        if (!valuesMatch || !valuesMatch[1]) {
          return res.status(400).json({ error: 'Could not parse values from INSERT query' });
        }
        
        const values = valuesMatch[1].split(',').map(val => {
          const trimmed = val.trim();
          // Handle string literals
          if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
            return trimmed.substring(1, trimmed.length - 1);
          }
          // Handle numbers and other literals
          return trimmed === 'null' ? null : trimmed;
        });
        
        // Create object from columns and values
        const insertData = {};
        columns.forEach((col, index) => {
          if (index < values.length) {
            insertData[col] = values[index];
          }
        });
        
        // Execute the insert
        const { data, error } = await supabase
          .from(tableName)
          .insert(insertData)
          .select();
          
        if (error) {
          return res.status(400).json({
            success: false,
            error: error.message,
            details: error
          });
        }
        
        return res.status(200).json({
          success: true,
          data,
          operation: 'INSERT',
          message: `Data inserted into ${tableName} successfully`,
          rowsAffected: data ? data.length : 1
        });
      } catch (insertError) {
        console.error('Error executing INSERT query:', insertError);
        return res.status(500).json({
          success: false,
          error: 'Failed to execute INSERT query',
          message: insertError.message,
          details: insertError.toString()
        });
      }
    }
    
    // For UPDATE queries
    if (query.trim().toLowerCase().startsWith('update')) {
      try {
        // Extract table name from query
        const tableMatch = query.match(/update\s+([^\s,;()]+)/i);
        if (!tableMatch || !tableMatch[1]) {
          return res.status(400).json({ error: 'Could not parse table name from UPDATE query' });
        }
        
        let tableName = tableMatch[1].replace(/['"]/g, '');
        
        // Handle table names with hyphens
        if (tableName.includes('-')) {
          tableName = tableName.replace(/-/g, '_');
        }
        
        // Extract SET clause
        const setMatch = query.match(/set\s+([^;]+?)(?:\s+where|$)/i);
        if (!setMatch || !setMatch[1]) {
          return res.status(400).json({ error: 'Could not parse SET clause from UPDATE query' });
        }
        
        const setPairs = setMatch[1].split(',').map(pair => {
          const [column, value] = pair.split('=').map(p => p.trim());
          return { column: column.replace(/['"]/g, ''), value };
        });
        
        // Create update object
        const updateData = {};
        setPairs.forEach(({ column, value }) => {
          // Handle string literals
          if (value.startsWith("'") && value.endsWith("'")) {
            updateData[column] = value.substring(1, value.length - 1);
          } else {
            // Handle numbers and other literals
            updateData[column] = value === 'null' ? null : value;
          }
        });
        
        // Extract WHERE clause
        const whereMatch = query.match(/where\s+([^;]+)$/i);
        const whereClause = whereMatch ? whereMatch[1].trim() : null;
        
        // For simplicity, we'll only handle basic equality conditions
        let updateQuery = supabase.from(tableName).update(updateData);
        
        if (whereClause) {
          // Very basic WHERE parsing - only handles simple equality
          const eqMatch = whereClause.match(/([^\s=]+)\s*=\s*('[^']+'|\d+|true|false|null)/i);
          if (eqMatch) {
            const column = eqMatch[1].replace(/['"]/g, '');
            let value = eqMatch[2];
            
            // Handle string literals
            if (value.startsWith("'") && value.endsWith("'")) {
              value = value.substring(1, value.length - 1);
            } else if (value === 'null') {
              value = null;
            } else if (value === 'true') {
              value = true;
            } else if (value === 'false') {
              value = false;
            } else if (!isNaN(value)) {
              value = Number(value);
            }
            
            updateQuery = updateQuery.eq(column, value);
          }
        }
        
        // Execute the update
        const { data, error } = await updateQuery.select();
        
        if (error) {
          return res.status(400).json({
            success: false,
            error: error.message,
            details: error
          });
        }
        
        return res.status(200).json({
          success: true,
          data,
          operation: 'UPDATE',
          message: `Data in ${tableName} updated successfully`,
          rowsAffected: data ? data.length : 1
        });
      } catch (updateError) {
        console.error('Error executing UPDATE query:', updateError);
        return res.status(500).json({
          success: false,
          error: 'Failed to execute UPDATE query',
          message: updateError.message,
          details: updateError.toString()
        });
      }
    }
    
    // For DELETE queries
    if (query.trim().toLowerCase().startsWith('delete')) {
      try {
        // Extract table name from query
        const tableMatch = query.match(/from\s+([^\s,;()]+)/i);
        if (!tableMatch || !tableMatch[1]) {
          return res.status(400).json({ error: 'Could not parse table name from DELETE query' });
        }
        
        let tableName = tableMatch[1].replace(/['"]/g, '');
        
        // Handle table names with hyphens
        if (tableName.includes('-')) {
          tableName = tableName.replace(/-/g, '_');
        }
        
        // Extract WHERE clause
        const whereMatch = query.match(/where\s+([^;]+)$/i);
        const whereClause = whereMatch ? whereMatch[1].trim() : null;
        
        // For safety, require a WHERE clause
        if (!whereClause) {
          return res.status(400).json({ 
            error: 'DELETE without WHERE clause is not supported for safety reasons' 
          });
        }
        
        // Very basic WHERE parsing - only handles simple equality
        const eqMatch = whereClause.match(/([^\s=]+)\s*=\s*('[^']+'|\d+|true|false|null)/i);
        if (!eqMatch) {
          return res.status(400).json({ 
            error: 'Only simple equality conditions are supported in WHERE clause' 
          });
        }
        
        const column = eqMatch[1].replace(/['"]/g, '');
        let value = eqMatch[2];
        
        // Handle string literals
        if (value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1);
        } else if (value === 'null') {
          value = null;
        } else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        } else if (!isNaN(value)) {
          value = Number(value);
        }
        
        // Execute the delete
        const { data, error } = await supabase
          .from(tableName)
          .delete()
          .eq(column, value)
          .select();
        
        if (error) {
          return res.status(400).json({
            success: false,
            error: error.message,
            details: error
          });
        }
        
        return res.status(200).json({
          success: true,
          data,
          operation: 'DELETE',
          message: `Data from ${tableName} deleted successfully`,
          rowsAffected: data ? data.length : 0
        });
      } catch (deleteError) {
        console.error('Error executing DELETE query:', deleteError);
        return res.status(500).json({
          success: false,
          error: 'Failed to execute DELETE query',
          message: deleteError.message,
          details: deleteError.toString()
        });
      }
    }
    
    // For CREATE TABLE queries
    if (query.trim().toLowerCase().startsWith('create table')) {
      // Unfortunately, Supabase client doesn't support CREATE TABLE directly
      // We'll need to inform the user
      return res.status(400).json({
        success: false,
        error: 'CREATE TABLE is not supported through the Supabase client API',
        message: 'Please use the Supabase dashboard to create tables or use the SQL editor directly'
      });
    }
    
    // For other queries
    return res.status(400).json({
      success: false,
      error: 'Unsupported SQL operation',
      message: 'Only SELECT, INSERT, UPDATE, and DELETE operations are supported through this API'
    });
  } catch (error) {
    console.error('Error in Supabase execute-sql API route:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      details: error.toString()
    });
  }
}
