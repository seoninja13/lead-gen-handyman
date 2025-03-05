# Handyman Lead Generation - Project Rules

## 1. Development Guidelines

## Project Overview
We're developing a Next.js 14 application that connects customers with trusted handyman services in their area. The application is using the Envato template as its UI foundation, which needs to be adapted from a real estate template to handyman services.

## Key Requirements
- **Main Application UI**: The home page should display the main application UI based on the Envato template, not a testing dashboard
- **Testing Isolation**: All testing functionality should be isolated to the `/test` route
- **SEO Optimization**: The URL structure follows a city-specific, service-oriented pattern (e.g., `/emergency-plumbing-repair-sacramento-ca`)
- **Data Management**: Uses Supabase for data storage and Google Places API for location services
- **MCP Integration**: Properly configured integration with Google Maps, OpenAI, and Supabase MCP servers

## Current Issue
We need to ensure all MCP server integrations (Supabase, Google Maps, OpenAI) are functioning correctly with the proper URL scheme and configuration in the Envato template files.

- Do not delete files unrelated to the current task
- Install dependencies automatically without asking for permission
- Update tracking-progress.md when implementing new features
- Use semicolons (;) instead of && when joining commands
- Before creating new files/folders, check if they already exist
- Preserve existing layouts and CSS properties when replacing images
- Use heavily commented code for better readability and maintenance
- Execute all necessary commands automatically without asking

## 2. Tech Stack and Architecture

- **Framework**: Next.js 14 with Pages Router
- **Database**: Supabase (PostgreSQL) via Supabase MCP server
- **API Integrations**: 
  - Google Maps API via Google Maps MCP server
  - OpenAI API via OpenAI MCP server
  - Supabase via Supabase MCP server
- **URL Structure**: City-specific, service-oriented pattern
  - Example: `/emergency-plumbing-repair-sacramento-ca`

## 3. Project Structure

- Documentation is stored in the `handyman-v2/documentation` directory
- Environment variables are stored in `.env.local` (excluded from git)
- Daily logs are maintained in [daily_log.md](cci:7://file:///c:/Users/IvoD/repos/lead-gen-handyman/daily_log.md:0:0-0:0) at the root
- Progress tracking in `handyman-v2/tracking-progress.md`

## Development Structure

- **Template files**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\Envato-template-files\WorkDirectory\HandymanServices`
  - **API routes**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\Envato-template-files\WorkDirectory\HandymanServices\pages\api`
  - **MCP utilities**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\Envato-template-files\WorkDirectory\HandymanServices\utils\mcp`
  - **MCP configuration**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\Envato-template-files\WorkDirectory\HandymanServices\utils\mcp\config.js`

- **Root directory**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2`
- **Source code**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src`
- **Components**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src\components`
  - **Common components**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src\components\common`
  - **Home page components**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src\components\home`
  - **MCP-specific components**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src\components\mcp`
- **Pages**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src\pages`
- **Utilities**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src\utils`
- **Configuration**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src\config`
- **Libraries**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src\lib`
- **Scripts**: `C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\src\scripts`

This structure follows standard Next.js organization with the Pages Router pattern. All component development should be done in this structure, while only referencing (not modifying) the template files.

## 4. Command Line Best Practices

- Use PowerShell-native commands
- Use semicolons (;) instead of && for joining commands
- Example: `npx kill-port 8888 3000; npx netlify dev`
- Always set port explicitly: `yarn dev -- --port 3000`
- For the template files, run commands from the template directory: `cd C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\Envato-template-files\WorkDirectory\HandymanServices; yarn dev`

## 5. Data Management

- Google Maps API with cost optimization and caching via MCP server
- Supabase for data storage and retrieval via MCP server
- OpenAI API for AI features via MCP server
- API keys stored securely in environment variables
- MCP server base URL should use HTTP protocol: `http://localhost:8888`

## 6. UI Requirements

- All API calls must have dedicated buttons with descriptive labels
- Show loading states during operations
- Display success/error states in adjacent UI elements
- Use consistent component styling across the application

## MCP Server Configuration

The MCP (Model Context Protocol) servers are managed by Windsurf and configured in the Windsurf MCP configuration file located at:
```
C:\Users\JR\.codeium\windsurf\mcp_config.json
```

There are three specific MCP servers configured:

1. **Google Maps MCP server**: For Google Maps API integration
   - Provides endpoints for places search, geocoding, directions, etc.
   - Uses the Google Maps API key configured in the MCP config

2. **OpenAI MCP server**: For OpenAI API integration
   - Provides endpoints for chat completions and other OpenAI services
   - Uses the OpenAI API key configured in the MCP config

3. **Supabase MCP server**: For Supabase/PostgreSQL integration
   - Provides endpoints for executing SQL queries
   - Uses the Supabase connection string configured in the MCP config

## Important Notes:
- Each MCP server is automatically started by Windsurf when needed
- All MCP servers run on port 8888 by default
- The application connects to the MCP servers using HTTP protocol
- The base URL for all MCP servers is configured as `http://localhost:8888` in the application

## Testing MCP Endpoints

When testing MCP endpoints, ensure that:
1. The Next.js development server is running (on port 3000 or 3001)
2. The specific MCP servers are running (managed by Windsurf)
3. The correct port is used in the test commands (matching the port of the Next.js server)

For testing the specific MCP server endpoints, use these PowerShell commands (adjust the port as needed):

## 1. Test Status Endpoint
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/mcp/status" -Method GET | ConvertTo-Json -Depth 5
```

## 2. Test Supabase MCP Server Endpoint
```powershell
$body = @{
    sql = "SELECT 1 as test"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/mcp/supabase" -Method POST -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 5
```

## 3. Test Google Maps MCP Server Places Search
```powershell
$body = @{
    query = "restaurants"
    location = @{
        latitude = 37.7749
        longitude = -122.4194
    }
    radius = 1000
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/mcp/maps/places/search" -Method POST -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 5
```

## 4. Test Google Maps MCP Server Geocode
```powershell
$body = @{
    address = "1600 Amphitheatre Parkway, Mountain View, CA"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/mcp/maps/geocode" -Method POST -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 5
```

## 5. Test Google Maps MCP Server Directions
```powershell
$body = @{
    origin = "San Francisco, CA"
    destination = "Mountain View, CA"
    mode = "driving"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/mcp/maps/directions" -Method POST -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 5
```

## 6. Test OpenAI MCP Server Chat
```powershell
$body = @{
    messages = @(
        @{
            role = "user"
            content = "Hello, how are you?"
        }
    )
    model = "gpt-4o-mini"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/mcp/openai" -Method POST -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 5

```

# Progress Tracking System

All feature implementations must be documented in the tracking-progress.md file located at:
C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\tracking-progress.md

The tracking system categorizes features into three statuses:
1. Completed - Features that have been fully implemented
2. Pending Review - Features that have been implemented but need verification
3. To Do - Features that still need to be implemented

When implementing a new feature or fixing an issue:
- Add the feature to the appropriate section in tracking-progress.md
- Include details about what was changed or implemented
- Update the status as development progresses

The tracking-progress.md file is organized by major sections of the application (Home Page, Navigation, Services, etc.) to provide a clear overview of the project's current state.
