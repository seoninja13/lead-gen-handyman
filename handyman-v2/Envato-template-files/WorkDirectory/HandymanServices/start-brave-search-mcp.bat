@echo off
echo Starting Brave Search MCP Server...

REM Create a directory for logs
mkdir logs 2>nul

REM Set your Brave Search API key here
set BRAVE_SEARCH_API_KEY=BSALmjQFvJ1itVQ11AJiEb-qi1WDUNo

REM Start the server
cd MCP-Servers\brave-search-mcp-server
npm install
node server.js > ..\..\logs\brave-search-mcp.log 2>&1

echo Brave Search MCP Server started. Check logs\brave-search-mcp.log for details.
