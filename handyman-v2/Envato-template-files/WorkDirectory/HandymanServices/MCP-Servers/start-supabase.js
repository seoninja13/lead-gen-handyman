/**
 * Supabase MCP Server Launcher
 * 
 * This script launches the Supabase MCP server with the proper configuration
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the configuration file
const configPath = path.join(__dirname, 'supabase-config.json');
const configData = JSON.stringify(JSON.parse(fs.readFileSync(configPath, 'utf8')));

// Create a temporary batch file to run the command
const batchFilePath = path.join(__dirname, 'run-supabase-mcp.bat');
const command = `npx -y @smithery/cli@latest run @alexander-zuev/supabase-mcp-server --config "${configData.replace(/"/g, '\\"')}"`;

fs.writeFileSync(batchFilePath, command);
console.log('Starting Supabase MCP server...');
console.log('Command:', command);

try {
  // Execute the batch file
  execSync(`start cmd /k ${batchFilePath}`, { stdio: 'inherit' });
  console.log('Supabase MCP server started successfully!');
} catch (error) {
  console.error('Failed to start Supabase MCP server:', error.message);
}
