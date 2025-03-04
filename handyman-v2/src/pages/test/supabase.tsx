/**
 * Supabase CRUD Test Page
 * 
 * This page provides a UI for testing the Supabase CRUD operations.
 */

import { useState } from 'react';
import Link from 'next/link';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper, 
  CircularProgress, 
  Alert, 
  AlertTitle, 
  Divider 
} from '@mui/material';

export default function TestSupabasePage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Run the Supabase CRUD tests
   */
  const runTests = async (cleanup = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/test-supabase-crud${cleanup ? '?cleanup=true' : ''}`);
      const data = await response.json();
      
      setResults(data);
      
      if (!data.success) {
        setError('Some tests failed. Check the results for details.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while running the tests');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Render a test result section
   */
  const renderTestResult = (step: string, result: any) => {
    if (!result) return null;
    
    return (
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          {step.charAt(0).toUpperCase() + step.slice(1)}
        </Typography>
        
        {result.success ? (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {result.message}
          </Alert>
        ) : (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {result.error || 'Unknown error'}
          </Alert>
        )}
        
        {result.data && (
          <Box mt={1} p={1} bgcolor="#f5f5f5" borderRadius={1}>
            <Typography variant="body2" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(result.data, null, 2)}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Supabase CRUD Test
        </Typography>
        
        <Typography variant="body1" paragraph align="center">
          This page tests the CRUD operations for the Supabase database through the MCP API.
        </Typography>
        
        <Box display="flex" justifyContent="center" gap={2} mb={4}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => runTests(false)}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Run Tests'}
          </Button>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => runTests(true)}
            disabled={loading}
          >
            Run Tests & Cleanup
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        
        {results && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box mb={2}>
              <Typography variant="h5" gutterBottom>
                Test Results
              </Typography>
              
              <Alert severity={results.success ? 'success' : 'error'}>
                <AlertTitle>{results.success ? 'Success' : 'Failed'}</AlertTitle>
                {results.message}
              </Alert>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {renderTestResult('setup', results.setup)}
            {renderTestResult('create', results.create)}
            {renderTestResult('read', results.read)}
            {renderTestResult('update', results.update)}
            {renderTestResult('delete', results.delete)}
            {renderTestResult('cleanup', results.cleanup)}
            
            {results.errors && results.errors.length > 0 && (
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Errors
                </Typography>
                
                {results.errors.map((err: any, index: number) => (
                  <Alert key={index} severity="error" sx={{ mb: 1 }}>
                    <AlertTitle>{err.step}</AlertTitle>
                    {err.message}
                  </Alert>
                ))}
              </Box>
            )}
          </Paper>
        )}
        
        <Box textAlign="center" mt={4}>
          <Button 
            component={Link}
            href="/test"
            variant="outlined"
          >
            Back to Test Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
