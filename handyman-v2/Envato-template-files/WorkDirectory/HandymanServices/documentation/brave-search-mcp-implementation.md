# Brave Search MCP Implementation Documentation

## Overview

This document provides comprehensive documentation for the Brave Search MCP (Model Context Protocol) implementation in the Handyman Services project. The Brave Search MCP server enables the application to perform web searches using the Brave Search API, providing relevant results for handyman services and related queries.

## Table of Contents

1. [Architecture](#architecture)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [API Endpoints](#api-endpoints)
5. [Usage Examples](#usage-examples)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [Security Considerations](#security-considerations)
9. [Performance Optimization](#performance-optimization)
10. [Future Enhancements](#future-enhancements)

## Architecture

The Brave Search MCP implementation follows a client-server architecture:

- **Server**: A Node.js Express server that handles requests and communicates with the Brave Search API
- **Client**: JavaScript code in the Handyman Services application that makes requests to the server
- **API**: The Brave Search API that provides search results

### Directory Structure

```
HandymanServices/
├── MCP-Servers/
│   ├── brave-search-mcp-server/
│   │   ├── server.js           # Main server implementation
│   │   └── package.json        # Dependencies and configuration
├── test-brave-search-mcp.js    # Test script for the server
├── brave-search-test.html      # HTML test page for interactive testing
├── start-brave-search-mcp.bat  # Batch file to start the server
└── documentation/
    └── brave-search-mcp-implementation.md  # This documentation
```

### Dependencies

- **express**: Web server framework
- **cors**: Cross-Origin Resource Sharing middleware
- **body-parser**: Request body parsing middleware
- **node-fetch**: HTTP client for making requests to the Brave Search API

## Installation

### Prerequisites

- Node.js (v14 or later)
- Brave Search API key (obtained from [Brave Search API](https://brave.com/search/api/))

### Installation Steps

1. Navigate to the Brave Search MCP Server directory:
   ```bash
   cd MCP-Servers/brave-search-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API key (see [Configuration](#configuration))

4. Start the server:
   ```bash
   node server.js
   ```

Alternatively, use the provided batch file:
```bash
start-brave-search-mcp.bat
```

## Configuration

### API Key Configuration

The Brave Search API key is configured in the following locations:

1. **server.js**: Directly in the code
   ```javascript
   const BRAVE_SEARCH_API_KEY = 'BSALmjQFvJ1itVQ11AJiEb-qi1WDUNo';
   ```

2. **start-brave-search-mcp.bat**: As an environment variable
   ```bash
   set BRAVE_SEARCH_API_KEY=BSALmjQFvJ1itVQ11AJiEb-qi1WDUNo
   ```

3. **start-all-mcp-servers.bat**: As an environment variable
   ```bash
   set BRAVE_SEARCH_API_KEY=BSALmjQFvJ1itVQ11AJiEb-qi1WDUNo
   ```

### Server Configuration

The server is configured to run on port 8888 by default. This can be modified in the `server.js` file:

```javascript
const PORT = 8888;
```

## API Endpoints

The Brave Search MCP server exposes the following endpoints:

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

## Usage Examples

### JavaScript Example

```javascript
// Example of using the Brave Search MCP server in a JavaScript application
async function searchWithBrave(query) {
  try {
    const response = await fetch('http://localhost:8888/mcp4_brave_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        query,
        count: 10
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching with Brave:', error);
    throw error;
  }
}

// Usage
searchWithBrave('handyman services near me')
  .then(results => {
    console.log(`Found ${results.total} results`);
    results.results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.title}`);
      console.log(`   URL: ${result.url}`);
      console.log(`   ${result.description}`);
    });
  })
  .catch(error => {
    console.error('Search failed:', error);
  });
```

### React Component Example

```jsx
import React, { useState } from 'react';

function BraveSearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8888/mcp4_brave_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Brave Search</h2>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query..."
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <div className="results">
        {results.map((result, index) => (
          <div key={index} className="result">
            <h3>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </h3>
            <div className="url">{result.url}</div>
            <div className="description">{result.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BraveSearchComponent;
```

## Testing

### Automated Testing

The Brave Search MCP server can be tested using the provided test script:

```bash
node test-brave-search-mcp.js
```

This script performs a search for "handyman services near me" and displays the results.

### Interactive Testing

For interactive testing, open the HTML test page in a web browser:

```
brave-search-test.html
```

This page provides a user interface for entering search queries and viewing the results.

### Integration Testing

The Brave Search MCP server is also integrated into the main MCP testing script:

```bash
node test-mcp-servers.js
```

This script tests all MCP servers, including the Brave Search MCP server.

## Troubleshooting

### Common Issues

1. **API Key Not Configured**
   - Error: `BRAVE_SEARCH_API_KEY environment variable is not set`
   - Solution: Ensure the API key is correctly set in the server.js file or as an environment variable

2. **Server Not Running**
   - Error: `Connection refused`
   - Solution: Start the server using `node server.js` or the batch file

3. **Port Conflict**
   - Error: `EADDRINUSE: address already in use :::8888`
   - Solution: Change the port in server.js or stop the process using the port

### Debugging

To enable more detailed logging, add the following to the server.js file:

```javascript
// Enable debug logging
const DEBUG = true;

// Add this function
function debugLog(message, data) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`);
    if (data) console.log(JSON.stringify(data, null, 2));
  }
}
```

Then use the `debugLog` function throughout the code:

```javascript
debugLog('Request received', req.body);
```

## Security Considerations

### API Key Protection

The Brave Search API key is sensitive information and should be protected:

1. Do not commit the API key to version control
2. Use environment variables in production
3. Implement rate limiting to prevent abuse

### Input Validation

The server validates input to prevent security issues:

```javascript
// Validate query
if (!query) {
  return res.status(400).json({
    error: 'Missing required parameter: query'
  });
}
```

### Error Handling

The server implements proper error handling to prevent information leakage:

```javascript
try {
  // Code that might throw an error
} catch (error) {
  console.error('Error processing request:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
}
```

## Performance Optimization

### Caching

To improve performance, implement a caching mechanism:

```javascript
// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

// In the search endpoint
const cacheKey = `${query}-${count}-${offset}`;
if (cache.has(cacheKey)) {
  const { data, timestamp } = cache.get(cacheKey);
  if (Date.now() - timestamp < CACHE_TTL) {
    return res.json(data);
  }
}

// After getting results
cache.set(cacheKey, {
  data: results,
  timestamp: Date.now()
});
```

### Connection Pooling

For high-traffic applications, implement connection pooling:

```javascript
const http = require('http');
const agent = new http.Agent({ keepAlive: true });

// Use the agent in fetch requests
fetch(url, {
  agent,
  // other options
});
```

## Future Enhancements

1. **Advanced Search Options**
   - Add support for filtering by date, region, language, etc.
   - Implement faceted search

2. **Result Enrichment**
   - Add thumbnails and images to search results
   - Include metadata like publication date

3. **Analytics**
   - Track popular searches
   - Monitor API usage and performance

4. **User Preferences**
   - Allow users to save search preferences
   - Implement personalized search results

5. **Integration with Other Services**
   - Combine results from multiple search engines
   - Integrate with local business directories
