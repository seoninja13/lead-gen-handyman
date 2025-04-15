@echo off
echo Starting OpenRouter MCP Server...

REM Create a directory for logs
mkdir logs 2>nul

REM Set your OpenRouter API key here
set OPENROUTER_API_KEY=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

REM Start the server
cd MCP-Servers\openrouter-mcp-server
npm install
node server.js > ..\..\logs\openrouter-mcp.log 2>&1

echo OpenRouter MCP Server started. Check logs\openrouter-mcp.log for details.
