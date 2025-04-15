# Brave Search MCP Server Guide

This guide explains how to set up and use the Brave Search MCP Server for the Handyman Services project.

## Overview

The Brave Search MCP Server provides a simple interface for searching the web using the Brave Search API. It implements the Model Context Protocol (MCP) to make it easy to integrate with the Handyman Services application.

## Prerequisites

- Node.js (v14 or later)
- Brave Search API key (get one from [Brave Search API](https://brave.com/search/api/))

## Setup

1. Navigate to the Brave Search MCP Server directory:
   ```
   cd MCP-Servers/brave-search-mcp-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set your Brave Search API key as an environment variable:
   ```
   set BRAVE_SEARCH_API_KEY=your_brave_search_api_key_here
   ```

4. Start the server:
   ```
   node server.js
   ```

Alternatively, you can use the provided batch file:
```
start-brave-search-mcp.bat
```

## API Endpoints

The Brave Search MCP Server exposes the following endpoints:

### Health Check

- **URL**: `/`
- **Method**: `GET`
- **Description**: Returns the status of the server and available endpoints.
- **Response**:
  ```json
  {
    "status": "ok",
    "message": "Brave Search MCP Server is running",
    "endpoints": ["/mcp4_brave_search"]
  }
  ```

### Search

- **URL**: `/mcp4_brave_search`
- **Method**: `POST`
- **Description**: Searches the web using Brave Search API.
- **Request Body**:
  ```json
  {
    "query": "search query",
    "count": 10,  // optional, default: 10
    "offset": 0   // optional, default: 0
  }
  ```
- **Response**:
  ```json
  {
    "results": [
      {
        "title": "Result title",
        "url": "https://example.com",
        "description": "Result description"
      },
      ...
    ],
    "total": 1000
  }
  ```

## Testing

You can test the Brave Search MCP Server using the provided test script:

```
node test-brave-search-mcp.js
```

Or you can use the web interface:

```
brave-search-test.html
```

## Integration with Handyman Services

The Brave Search MCP Server is integrated with the Handyman Services application to provide search functionality. It can be used to:

1. Search for handyman services in specific locations
2. Find information about specific handyman tasks or repairs
3. Gather data about local businesses and service providers

## Troubleshooting

If you encounter issues with the Brave Search MCP Server, check the following:

1. Make sure the server is running on port 8888
2. Verify that your Brave Search API key is set correctly
3. Check the logs in `logs/brave-search-mcp.log` for error messages
4. Ensure that you have an active internet connection

## Resources

- [Brave Search API Documentation](https://brave.com/search/api/)
- [Model Context Protocol (MCP) Documentation](https://github.com/modelcontextprotocol/mcp)
- [Express.js Documentation](https://expressjs.com/)
