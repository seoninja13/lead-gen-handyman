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
import { sqlLogger, OPERATION_TYPES } from '../../../utils/logging';

// Operation types
const OPERATION_TYPES = {
  SELECT: 'SELECT',
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  CREATE: 'CREATE',
  OTHER: 'OTHER',
};

/**
 * Determines the operation type from the SQL query
 */
function getOperationType(query) {
  const normalizedQuery = query.trim().toLowerCase();
  
  // Handle comments at the start of the query
  const queryWithoutComments = normalizedQuery
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n')
    .trim();

  if (queryWithoutComments.startsWith('select')) return OPERATION_TYPES.SELECT;
  if (queryWithoutComments.startsWith('insert')) return OPERATION_TYPES.INSERT;
  if (queryWithoutComments.startsWith('update')) return OPERATION_TYPES.UPDATE;
  if (queryWithoutComments.startsWith('delete')) return OPERATION_TYPES.DELETE;
  if (queryWithoutComments.startsWith('create')) return OPERATION_TYPES.CREATE;
  return OPERATION_TYPES.OTHER;
}

/**
 * Extracts table name from a SQL query
 */
function extractTableName(query) {
  const match = query.match(/(?:from|into|update|table)\s+['"]*([^'"\s(]+)['"]*\s*/i);
  if (!match) return null;
  return match[1].replace(/-/g, '_');
}

/**
 * Extracts values from an INSERT statement
 */
function extractInsertValues(statement) {
  // Remove comments
  const statementWithoutComments = statement
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');

  // Extract column names
  const columnsMatch = statementWithoutComments.match(/\(([^)]+)\)\s+values/i);
  if (!columnsMatch) {
    throw new Error('Could not parse columns from INSERT query');
  }
  
  const columns = columnsMatch[1].split(',').map(col => col.trim().replace(/['"]/g, ''));
  
  // Extract values
  const valuesMatch = statementWithoutComments.match(/values\s*\((.*)\)/i);
  if (!valuesMatch) {
    throw new Error('Could not parse values from INSERT query');
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
  
  return insertData;
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, params = {} } = req.body;
    const startTime = Date.now();

    // Validate required parameters
    if (!query) {
      return res.status(400).json({ error: 'SQL query is required' });
    }

    // Log operation start
    await sqlLogger.logOperationStart(
      getOperationType(query),
      query,
      params
    );

    // Split multiple SQL statements
    const statements = query.split(';').filter(stmt => stmt.trim());
    let results = [];

    for (const statement of statements) {
      if (!statement.trim()) continue;

      const operation = getOperationType(statement);
      
      try {
        let result;
        
        // For CREATE TABLE statements
        if (operation === OPERATION_TYPES.CREATE) {
          // For CREATE TABLE, use raw SQL execution
          result = await supabase.rpc('execute_sql', { query: statement });
        }
        // For INSERT statements
        else if (operation === OPERATION_TYPES.INSERT) {
          const tableMatch = statement.match(/insert\s+into\s+([^\s(]+)/i);
          if (!tableMatch) {
            throw new Error('Invalid INSERT syntax');
          }
          
          const tableName = tableMatch[1].trim().replace(/['"]/g, '').replace(/-/g, '_');
          const values = extractInsertValues(statement);
          
          result = await supabase
            .from(tableName)
            .insert(values)
            .select();
        }
        // For SELECT statements
        else if (operation === OPERATION_TYPES.SELECT) {
          const tableMatch = statement.match(/from\s+([^\s,;()]+)/i);
          if (!tableMatch) {
            throw new Error('Invalid SELECT syntax');
          }
          
          const tableName = tableMatch[1].trim().replace(/['"]/g, '').replace(/-/g, '_');
          result = await supabase
            .from(tableName)
            .select('*');
        }
        // For UPDATE statements
        else if (operation === OPERATION_TYPES.UPDATE) {
          const tableMatch = statement.match(/update\s+([^\s,;()]+)/i);
          if (!tableMatch) {
            throw new Error('Invalid UPDATE syntax');
          }
          
          const tableName = tableMatch[1].trim().replace(/['"]/g, '').replace(/-/g, '_');
          const setMatch = statement.match(/set\s+([^;]+?)(?:\s+where|$)/i);
          
          if (!setMatch || !setMatch[1]) {
            throw new Error('Invalid SET clause in UPDATE query');
          }
          
          const setPairs = setMatch[1].split(',').map(pair => {
            const [column, value] = pair.split('=').map(p => p.trim());
            return { column: column.replace(/['"]/g, ''), value };
          });
          
          const updateData = {};
          setPairs.forEach(({ column, value }) => {
            if (value.startsWith("'") && value.endsWith("'")) {
              updateData[column] = value.substring(1, value.length - 1);
            } else {
              updateData[column] = value === 'null' ? null : value;
            }
          });
          
          let query = supabase
            .from(tableName)
            .update(updateData);
            
          const whereMatch = statement.match(/where\s+([^;]+)$/i);
          if (whereMatch) {
            const whereClause = whereMatch[1].trim();
            const eqMatch = whereClause.match(/([^\s=]+)\s*=\s*('[^']+'|\d+|true|false|null)/i);
            
            if (eqMatch) {
              const column = eqMatch[1].replace(/['"]/g, '');
              let value = eqMatch[2];
              
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
              
              query = query.eq(column, value);
            }
          }
          
          result = await query.select();
        }
        // For DELETE statements
        else if (operation === OPERATION_TYPES.DELETE) {
          const tableMatch = statement.match(/from\s+([^\s,;()]+)/i);
          if (!tableMatch) {
            throw new Error('Invalid DELETE syntax');
          }
          
          const tableName = tableMatch[1].trim().replace(/['"]/g, '').replace(/-/g, '_');
          let query = supabase.from(tableName).delete();
          
          const whereMatch = statement.match(/where\s+([^;]+)$/i);
          if (whereMatch) {
            const whereClause = whereMatch[1].trim();
            const eqMatch = whereClause.match(/([^\s=]+)\s*=\s*('[^']+'|\d+|true|false|null)/i);
            
            if (eqMatch) {
              const column = eqMatch[1].replace(/['"]/g, '');
              let value = eqMatch[2];
              
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
              
              query = query.eq(column, value);
            }
          }
          
          result = await query.select();
        }
        else {
          throw new Error(`Operation ${operation} is not supported`);
        }

        if (result.error) {
          throw result.error;
        }

        results.push({
          operation,
          data: result.data,
          message: result.message,
          statement
        });
      } catch (error) {
        const duration = Date.now() - startTime;
        await sqlLogger.logOperationError(operation, statement, error);
        throw error;
      }
    }

    const duration = Date.now() - startTime;
    await sqlLogger.logOperationSuccess(getOperationType(query), query, duration, results);
    return res.status(200).json({ results });

  } catch (error) {
    await sqlLogger.logOperationError(OPERATION_TYPES.OTHER, req.body?.query || 'Unknown query', error);
    return res.status(500).json({ error: error.message });
  }
}
