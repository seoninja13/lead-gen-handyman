/**
 * Test Dashboard Page
 * 
 * This page serves as a central hub for all testing components and tools.
 */

import { useState } from 'react';
import Link from 'next/link';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';

export default function TestDashboardPage() {
  const [mcpStatus, setMcpStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Check the status of the MCP servers
   */
  const checkMcpStatus = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/mcp-status');
      const data = await response.json();
      setMcpStatus(data);
    } catch (error) {
      console.error('Error checking MCP status:', error);
      setMcpStatus({ status: 'error', message: 'Error checking MCP status' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Test Dashboard
        </Typography>
        
        <Typography variant="h5" paragraph align="center" color="textSecondary">
          Testing tools and utilities for the Handyman Lead Generation platform
        </Typography>
        
        <Box my={6}>
          <Grid container spacing={4}>
            {/* Database Tests Card */}
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Database Tests
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Test database connections and CRUD operations.
                  </Typography>
                  <Box mt={2}>
                    <List>
                      <ListItem 
                        button 
                        component={Link} 
                        href="/test/supabase"
                        divider
                      >
                        <ListItemText 
                          primary="Supabase CRUD Test" 
                          secondary="Test create, read, update, and delete operations"
                        />
                      </ListItem>
                      <ListItem 
                        button 
                        component={Link} 
                        href="/api/test-supabase-crud"
                        divider
                      >
                        <ListItemText 
                          primary="Run API CRUD Test" 
                          secondary="Direct API test without UI"
                        />
                      </ListItem>
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* MCP Integration Card */}
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    MCP Integration
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Test and explore the Model Context Protocol (MCP) integration features.
                  </Typography>
                  <Box mt={2}>
                    <Button 
                      onClick={checkMcpStatus}
                      variant="contained" 
                      color="secondary"
                      fullWidth
                      disabled={loading}
                      sx={{ mb: 2 }}
                    >
                      {loading ? 'Checking...' : 'Check MCP Server Status'}
                    </Button>
                    
                    <Button 
                      component={Link}
                      href="/api/mcp-status"
                      variant="outlined" 
                      color="secondary"
                      fullWidth
                    >
                      View Raw MCP Status
                    </Button>
                  </Box>
                  
                  {mcpStatus && (
                    <Box mt={3}>
                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        MCP Status
                        <Chip 
                          label={mcpStatus.status} 
                          color={
                            mcpStatus.status === 'connected' ? 'success' : 
                            mcpStatus.status === 'partial' ? 'warning' : 'error'
                          }
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        {mcpStatus.message}
                      </Typography>
                      
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Paper elevation={1} sx={{ p: 1, bgcolor: mcpStatus.supabase?.status === 'connected' ? '#e8f5e9' : '#ffebee' }}>
                            <Typography variant="subtitle2">
                              Supabase MCP
                            </Typography>
                            <Typography variant="body2">
                              {mcpStatus.supabase?.status === 'connected' 
                                ? 'Connected' 
                                : mcpStatus.supabase?.error || 'Error'}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper elevation={1} sx={{ p: 1, bgcolor: mcpStatus.googleMaps?.status === 'connected' ? '#e8f5e9' : '#ffebee' }}>
                            <Typography variant="subtitle2">
                              Google Maps MCP
                            </Typography>
                            <Typography variant="body2">
                              {mcpStatus.googleMaps?.status === 'connected' 
                                ? 'Connected' 
                                : mcpStatus.googleMaps?.error || 'Error'}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        
        <Box textAlign="center" mt={4}>
          <Button 
            component={Link}
            href="/"
            variant="outlined"
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
