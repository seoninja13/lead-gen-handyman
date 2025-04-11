import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Check Supabase connection status
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      details: 'Only GET requests are supported'
    });
  }

  try {
    // Simple query to test connection
    const { data, error } = await supabase
      .from('test-delete')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return res.status(200).json({
        connected: false,
        message: 'Failed to connect to Supabase',
        error: error.message
      });
    }

    return res.status(200).json({
      connected: true,
      message: 'Successfully connected to Supabase'
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(200).json({
      connected: false,
      message: 'Failed to connect to Supabase',
      error: error.message
    });
  }
}
