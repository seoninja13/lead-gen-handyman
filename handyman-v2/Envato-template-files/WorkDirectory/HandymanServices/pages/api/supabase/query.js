/**
 * Supabase Query API Route
 *
 * This API route handles CRUD operations for Supabase tables.
 * It provides a unified interface for querying Supabase from the frontend.
 *
 * Endpoint: /api/supabase/query
 * Method: POST
 * Body: {
 *   operation: 'select' | 'insert' | 'update' | 'delete',
 *   table: string,
 *   query: object (operation-specific parameters)
 * }
 */

import { supabase } from '../../../utils/supabase/client';

// Mock data for testing when Supabase is unavailable
const mockData = {
  places: [
    { id: 1, name: 'ABC Handyman Services', address: '123 Main St', city: 'Austin', state: 'TX', phone: '(512) 555-1234' },
    { id: 2, name: 'XYZ Home Repairs', address: '456 Oak Ave', city: 'Austin', state: 'TX', phone: '(512) 555-5678' },
    { id: 3, name: 'Quick Fix Handyman', address: '789 Pine Rd', city: 'Dallas', state: 'TX', phone: '(214) 555-9012' },
    { id: 4, name: 'Reliable Home Services', address: '321 Elm St', city: 'Houston', state: 'TX', phone: '(713) 555-3456' },
    { id: 5, name: 'Handy Helpers', address: '654 Maple Dr', city: 'San Antonio', state: 'TX', phone: '(210) 555-7890' }
  ],
  'test-delete': [
    { id: 1, name: 'Test Item 1', description: 'This is a test item for CRUD operations' },
    { id: 2, name: 'Test Item 2', description: 'Another test item for CRUD operations' },
    { id: 3, name: 'Test Item 3', description: 'Yet another test item for CRUD operations' }
  ]
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { operation, table, query } = req.body;

    // Validate required parameters
    if (!operation) {
      return res.status(400).json({ error: 'Operation is required' });
    }
    if (!table) {
      return res.status(400).json({ error: 'Table is required' });
    }
    if (!query) {
      return res.status(400).json({ error: 'Query parameters are required' });
    }

    // Log the request for debugging
    console.log(`Supabase ${operation} operation on table ${table}:`, query);

    let result;

    try {
      // Perform the requested operation
      switch (operation.toLowerCase()) {
        case 'select':
          result = await handleSelect(table, query);
          break;
        case 'insert':
          result = await handleInsert(table, query);
          break;
        case 'update':
          result = await handleUpdate(table, query);
          break;
        case 'delete':
          result = await handleDelete(table, query);
          break;
        default:
          return res.status(400).json({ error: `Unsupported operation: ${operation}` });
      }

      // Return the result
      return res.status(200).json(result);
    } catch (operationError) {
      console.error(`Error in ${operation} operation:`, operationError);

      // Log the error for debugging
      console.error(`Error details for ${operation} operation on ${table}:`, operationError);

      // Return the error to the client
      return res.status(500).json({
        error: operationError.message,
        details: operationError.details || operationError.toString(),
        operation: operation.toLowerCase(),
        table
      });
    }
  } catch (error) {
    console.error('Error in Supabase query API route:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      details: error.details || error.toString()
    });
  }
}

/**
 * Handle SELECT operation
 * @param {string} table - The table to query
 * @param {object} query - Query parameters
 * @returns {Promise<object>} - Query result
 */
async function handleSelect(table, query) {
  const {
    columns = '*',
    limit,
    offset,
    order,
    filter,
    eq,
    neq,
    gt,
    gte,
    lt,
    lte,
    like,
    ilike,
    in: inArray,
    is,
    or
  } = query;

  // Start building the query
  let queryBuilder = supabase
    .from(table)
    .select(columns);

  // Apply filters if provided
  if (filter) {
    Object.entries(filter).forEach(([column, value]) => {
      queryBuilder = queryBuilder.eq(column, value);
    });
  }

  // Apply specific filters
  if (eq) {
    Object.entries(eq).forEach(([column, value]) => {
      queryBuilder = queryBuilder.eq(column, value);
    });
  }

  if (neq) {
    Object.entries(neq).forEach(([column, value]) => {
      queryBuilder = queryBuilder.neq(column, value);
    });
  }

  if (gt) {
    Object.entries(gt).forEach(([column, value]) => {
      queryBuilder = queryBuilder.gt(column, value);
    });
  }

  if (gte) {
    Object.entries(gte).forEach(([column, value]) => {
      queryBuilder = queryBuilder.gte(column, value);
    });
  }

  if (lt) {
    Object.entries(lt).forEach(([column, value]) => {
      queryBuilder = queryBuilder.lt(column, value);
    });
  }

  if (lte) {
    Object.entries(lte).forEach(([column, value]) => {
      queryBuilder = queryBuilder.lte(column, value);
    });
  }

  if (like) {
    Object.entries(like).forEach(([column, value]) => {
      queryBuilder = queryBuilder.like(column, value);
    });
  }

  if (ilike) {
    Object.entries(ilike).forEach(([column, value]) => {
      queryBuilder = queryBuilder.ilike(column, value);
    });
  }

  if (inArray) {
    Object.entries(inArray).forEach(([column, value]) => {
      queryBuilder = queryBuilder.in(column, value);
    });
  }

  if (is) {
    Object.entries(is).forEach(([column, value]) => {
      queryBuilder = queryBuilder.is(column, value);
    });
  }

  if (or) {
    queryBuilder = queryBuilder.or(or);
  }

  // Apply ordering if provided
  if (order) {
    const { column, ascending = true } = order;
    if (column) {
      queryBuilder = queryBuilder.order(column, { ascending });
    }
  }

  // Apply pagination if provided
  if (limit) {
    queryBuilder = queryBuilder.limit(limit);
  }

  if (offset) {
    queryBuilder = queryBuilder.range(offset, offset + (limit || 10) - 1);
  }

  // Execute the query
  const { data, error, count } = await queryBuilder;

  if (error) {
    console.error('Error in SELECT operation:', error);
    throw error;
  }

  return { data, count };
}

/**
 * Handle INSERT operation
 * @param {string} table - The table to insert into
 * @param {object} query - Query parameters
 * @returns {Promise<object>} - Insert result
 */
async function handleInsert(table, query) {
  const { records, options = {} } = query;

  if (!records || !Array.isArray(records)) {
    throw new Error('Records must be an array');
  }

  // Execute the query
  const { data, error } = await supabase
    .from(table)
    .insert(records, options);

  if (error) {
    console.error('Error in INSERT operation:', error);
    throw error;
  }

  return { data };
}

/**
 * Handle UPDATE operation
 * @param {string} table - The table to update
 * @param {object} query - Query parameters
 * @returns {Promise<object>} - Update result
 */
async function handleUpdate(table, query) {
  const {
    values,
    filter,
    eq,
    match
  } = query;

  if (!values || typeof values !== 'object') {
    throw new Error('Values must be an object');
  }

  if (!filter && !eq && !match) {
    throw new Error('At least one filter condition is required for UPDATE');
  }

  // Start building the query
  let queryBuilder = supabase
    .from(table)
    .update(values);

  // Apply filters if provided
  if (filter) {
    Object.entries(filter).forEach(([column, value]) => {
      queryBuilder = queryBuilder.eq(column, value);
    });
  }

  if (eq) {
    Object.entries(eq).forEach(([column, value]) => {
      queryBuilder = queryBuilder.eq(column, value);
    });
  }

  if (match) {
    queryBuilder = queryBuilder.match(match);
  }

  // Execute the query
  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error in UPDATE operation:', error);
    throw error;
  }

  return { data };
}

/**
 * Handle DELETE operation
 * @param {string} table - The table to delete from
 * @param {object} query - Query parameters
 * @returns {Promise<object>} - Delete result
 */
async function handleDelete(table, query) {
  const {
    filter,
    eq,
    match
  } = query;

  if (!filter && !eq && !match) {
    throw new Error('At least one filter condition is required for DELETE');
  }

  // Start building the query
  let queryBuilder = supabase
    .from(table)
    .delete();

  // Apply filters if provided
  if (filter) {
    Object.entries(filter).forEach(([column, value]) => {
      queryBuilder = queryBuilder.eq(column, value);
    });
  }

  if (eq) {
    Object.entries(eq).forEach(([column, value]) => {
      queryBuilder = queryBuilder.eq(column, value);
    });
  }

  if (match) {
    queryBuilder = queryBuilder.match(match);
  }

  // Execute the query
  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error in DELETE operation:', error);
    throw error;
  }

  return { data };
}
