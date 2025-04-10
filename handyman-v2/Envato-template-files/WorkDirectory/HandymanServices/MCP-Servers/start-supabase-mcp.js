/**
 * Start script for Supabase MCP server
 * 
 * This script starts the Supabase MCP server using the configuration from supabase-config.json
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the configuration file
const configPath = path.join(__dirname, 'supabase-config.json');

// Read the configuration file
try {
  const configContent = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(configContent);
  
  console.log('Starting Supabase MCP server with configuration:');
  console.log(JSON.stringify(config, null, 2));
  
  // Start the Supabase MCP server with the configuration
  const serverProcess = spawn('npx', [
    '-y',
    '@smithery/cli@latest',
    'run',
    '@alexander-zuev/supabase-mcp-server',
    '--config',
    configContent
  ], {
    stdio: 'inherit'
  });
  
  serverProcess.on('error', (error) => {
    console.error('Failed to start Supabase MCP server:', error);
  });
  
  console.log('Supabase MCP server started with PID:', serverProcess.pid);
} catch (error) {
  console.error('Error starting Supabase MCP server:', error.message);
}
