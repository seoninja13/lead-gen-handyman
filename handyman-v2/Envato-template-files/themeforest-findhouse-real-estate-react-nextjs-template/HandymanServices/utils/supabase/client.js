/**
 * Supabase Client
 * 
 * This module provides a client for interacting with Supabase.
 * It creates a Supabase client instance using environment variables
 * for the URL and API key.
 */

import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
