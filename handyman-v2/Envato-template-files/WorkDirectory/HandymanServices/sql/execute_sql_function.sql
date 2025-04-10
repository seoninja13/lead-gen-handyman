-- Create a SQL function to execute raw SQL queries
-- This function will be exposed as an RPC endpoint in Supabase

CREATE OR REPLACE FUNCTION execute_sql(query_text TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Using security definer to run with the privileges of the function creator
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Execute the query and capture the result as JSON
  EXECUTE 'WITH query_result AS (' || query_text || ') SELECT to_jsonb(array_agg(row_to_json(query_result))) FROM query_result' INTO result;
  
  -- Handle NULL result (empty result set)
  IF result IS NULL THEN
    result := '[]'::JSONB;
  END IF;
  
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    -- Return error information as JSON
    RETURN jsonb_build_object(
      'error', SQLERRM,
      'detail', SQLSTATE,
      'query', query_text
    );
END;
$$;

-- Grant execute permissions to authenticated and anon users
GRANT EXECUTE ON FUNCTION execute_sql TO authenticated, anon;

-- Comment on the function
COMMENT ON FUNCTION execute_sql IS 'Executes a raw SQL query and returns the result as JSON. Use with caution as this allows arbitrary SQL execution.';
