@echo off
echo Starting Perplexity MCP Server...
set PERPLEXITY_API_KEY=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
set PORT=3005
cd /d "%~dp0"
npm install
node server.js
