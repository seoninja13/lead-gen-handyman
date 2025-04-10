/**
 * Start script for Perplexity MCP Server
 * This script starts the Perplexity server with the appropriate environment variables
 */
require('dotenv').config();
const { spawn } = require('child_process');

// Start the Perplexity server
console.log('Starting Perplexity server...');
const server = spawn('node', ['server.js'], {
  env: {
    ...process.env,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY || 'ea6a680f-20bb-4968-bcaa-1568439806c4',
    PORT: process.env.PORT || '3005'
  },
  stdio: 'inherit'
});

server.on('error', (error) => {
  console.error('Error starting Perplexity server:', error);
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('Stopping Perplexity server...');
  server.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Stopping Perplexity server...');
  server.kill();
  process.exit();
});
