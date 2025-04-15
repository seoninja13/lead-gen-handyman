@echo off
echo Starting all MCP servers...

REM Create a directory for logs
mkdir logs 2>nul

REM Start Perplexity MCP Server
echo Starting Perplexity MCP Server...
start "Perplexity MCP Server" cmd /c "cd MCP-Servers\perplexity-mcp-server && npm install && set PERPLEXITY_API_KEY=ea6a680f-20bb-4968-bcaa-1568439806c4 && node server.js > ..\..\logs\perplexity-mcp.log 2>&1"

REM Start Google Maps MCP Server
echo Starting Google Maps MCP Server...
start "Google Maps MCP Server" cmd /c "set GOOGLE_MAPS_API_KEY=AIzaSyDkdyCVOTE2wGREO1wwh-MHQyzFLKtK00g && npx -y @modelcontextprotocol/server-google-maps > logs\google-maps-mcp.log 2>&1"

REM Start OpenAI MCP Server
echo Starting OpenAI MCP Server...
start "OpenAI MCP Server" cmd /c "set OPENAI_API_KEY=sk-proj-kQZbuj6VyWMBecYZASnqeDpMdEQ5zCsV1UZXhi9sxxnAqDPdSsLIicFdHJCLPXfZNs8XQh8ma25GG8er3PVCyOTbGQcVF757nKIzOVqTQHoHZ8Il62HmcA && npx -y @mzxrai/mcp-openai@latest > logs\openai-mcp.log 2>&1"

REM Start Supabase MCP Server
echo Starting Supabase MCP Server...
start "Supabase MCP Server" cmd /c "npx -y @smithery/cli@latest run @alexander-zuev/supabase-mcp-server --key 7e1d8c7d-a5a6-4e1b-9a1b-0e4c2f9e7d8c > logs\supabase-mcp.log 2>&1"

REM Start Brave Search MCP Server
echo Starting Brave Search MCP Server...
start "Brave Search MCP Server" cmd /c "cd MCP-Servers\brave-search-mcp-server && npm install && set BRAVE_SEARCH_API_KEY=BSALmjQFvJ1itVQ11AJiEb-qi1WDUNo && node server.js > ..\..\logs\brave-search-mcp.log 2>&1"

REM Start OpenRouter MCP Server
echo Starting OpenRouter MCP Server...
start "OpenRouter MCP Server" cmd /c "cd MCP-Servers\openrouter-mcp-server && npm install && set OPENROUTER_API_KEY=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 && node server.js > ..\..\logs\openrouter-mcp.log 2>&1"

echo All MCP servers have been started.
echo Check the logs directory for server output.
echo.
echo Press any key to start the Next.js development server...
pause > nul

REM Start Next.js development server
echo Starting Next.js development server...
npm run dev
