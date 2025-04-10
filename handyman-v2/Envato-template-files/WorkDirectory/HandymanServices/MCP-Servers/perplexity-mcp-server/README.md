# Perplexity MCP Server

## Overview
The Perplexity MCP Server is an implementation of a Model Control Protocol (MCP) server that connects to the Perplexity API. It provides advanced AI capabilities including web search, content generation, and deep research functionality to the Handyman Lead Generation application.

## Features
- **Web Search**: Performs web searches and returns results with source citations
- **Content Generation**: Generates high-quality content based on user prompts
- **Deep Research**: Conducts in-depth research on topics with structured output and source citations
- **Error Handling**: Comprehensive error handling for API failures
- **Source Extraction**: Extracts and formats sources from Perplexity API responses

## Models
The server implements three models:

1. **perplexity-online-mistral**
   - Uses Perplexity's 'sonar' model
   - Provides web search capabilities
   - Returns sources with citations

2. **perplexity-online-llama**
   - Uses Perplexity's 'sonar' model
   - Provides web search capabilities
   - Returns sources with citations

3. **perplexity-deep-research**
   - Uses Perplexity's 'sonar' model
   - Enhanced prompting for structured research output
   - Returns executive summary, key findings, detailed analysis, and recommendations
   - Includes source citations

## API Endpoints

### Health Check
- **Endpoint**: `/health`
- **Method**: GET
- **Response**: `{ "status": "ok" }`

### Generate Content
- **Endpoint**: `/api/generate`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "modelId": "perplexity-online-llama",
    "params": {
      "prompt": "What are the top 3 handyman services in high demand?"
    }
  }
  ```
- **Response**:
  ```json
  {
    "result": "Generated content...",
    "metadata": {
      "sources": [
        {
          "title": "Source Title",
          "url": "Source URL",
          "text": "Source Text"
        }
      ],
      "model": "sonar"
    }
  }
  ```

## Setup and Configuration

### Prerequisites
- Node.js 14+
- npm or yarn
- Valid Perplexity API key

### Environment Variables
- `PERPLEXITY_API_KEY`: Your Perplexity API key
- `PORT`: Server port (default: 3005)

### Installation
1. Navigate to the server directory
   ```
   cd MCP-Servers/perplexity-mcp-server
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the server
   ```
   npm start
   ```
   
   Or use the provided batch file:
   ```
   start-perplexity-mcp.bat
   ```

## Testing
A test script is included to verify server functionality:

```
node test-perplexity-server.js
```

The test script checks:
1. Health endpoint
2. Basic query functionality
3. Deep research functionality

## Integration with MCP Infrastructure
The Perplexity MCP server integrates with the existing MCP infrastructure through the MCP configuration file. It provides AI capabilities that can be accessed from any component in the application.

## Error Handling
The server includes comprehensive error handling for:
- Invalid API keys
- Rate limiting
- Network failures
- Invalid model IDs
- Malformed requests

## Future Enhancements
- Improve source citation formatting
- Add caching for frequent queries
- Implement rate limiting
- Add more specialized research templates
- Create reusable frontend components for displaying results

## Troubleshooting
- If you encounter 401 errors, check your API key
- If you encounter 404 errors, verify the model name
- If no sources are returned, check the search depth parameter

## License
This project is part of the Handyman Lead Generation application and is subject to its licensing terms.
