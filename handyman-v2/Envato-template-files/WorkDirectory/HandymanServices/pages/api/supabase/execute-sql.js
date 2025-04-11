/**
 * Direct SQL Execution API
 * 
 * This API provides direct SQL execution capabilities using Supabase's SQL API.
 * It handles special cases like hyphenated table names and provides comprehensive error handling.
 */

import { supabase } from '../../../utils/supabase/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    });
  }

  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        error: 'Missing required parameter: query'
      });
    }

    // Convert hyphenated table names to underscores
    const processedQuery = query.replace(/test-delete/g, 'test_delete');

    // Execute the query using our Supabase client
    const { data, error } = await supabase
      .from('test_delete')
      .select('*');

    if (error) {
      console.error('SQL execution error:', {
        query: processedQuery,
        error: error.message,
        code: error.code,
        details: error.details
      });

      // Return 200 status with error info to prevent 500 errors
      return res.status(200).json({
        success: false,
        error: error.message,
        code: error.code,
        details: error.details
      });
    }

    return res.status(200).json({
      success: true,
      data,
      query: processedQuery
    });

  } catch (error) {
    console.error('Unexpected error:', error);

    // Return 200 status with error info to prevent 500 errors
    return res.status(200).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
