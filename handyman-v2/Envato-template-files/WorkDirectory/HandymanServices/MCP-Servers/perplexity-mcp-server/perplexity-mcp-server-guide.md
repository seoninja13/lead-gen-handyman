# Perplexity MCP Server Implementation Guide

## Overview
This guide documents the implementation of the Perplexity MCP Server for the Handyman Lead Generation project. The server provides AI-powered search, content generation, and deep research capabilities through the Perplexity API.

## Implementation Details

### Server Structure
The Perplexity MCP Server is built using Express.js and follows a modular architecture:

- `server.js`: Main server file that defines routes and model handlers
- `lib/perplexity-client.js`: Client library for communicating with the Perplexity API
- `test-perplexity-server.js`: Test script for verifying server functionality
- `start-perplexity-mcp.bat`: Batch file for starting the server with environment variables

### Model Implementation
The server implements three models:

1. **perplexity-online-mistral**
   - Uses Perplexity's 'sonar' model
   - Configured for web search with a search depth of 3
   - Returns formatted results with source citations

2. **perplexity-online-llama**
   - Uses Perplexity's 'sonar' model
   - Configured for web search with a search depth of 3
   - Returns formatted results with source citations

3. **perplexity-deep-research**
   - Uses Perplexity's 'sonar' model
   - Enhanced prompting for structured research output
   - Returns executive summary, key findings, detailed analysis, and recommendations
   - Includes source citations

### API Integration
The server communicates with the Perplexity API using the following parameters:

```javascript
{
  model: 'sonar',
  query: prompt,
  search: true,
  searchDepth: 3
}
```

### Source Extraction
The server extracts sources from Perplexity API responses and formats them for display:

```javascript
extractSources(response) {
  if (!response || !response.choices || !response.choices[0] || !response.choices[0].message || !response.choices[0].message.content) {
    return [];
  }
  
  const content = response.choices[0].message.content;
  const sources = [];
  
  // Extract sources from content using regex
  const sourceRegex = /\[(\d+)\](?:\(([^)]+)\))?/g;
  let match;
  
  while ((match = sourceRegex.exec(content)) !== null) {
    const sourceNumber = match[1];
    const sourceUrl = match[2] || '';
    
    // Add source if not already in the array
    if (!sources.some(s => s.title === `[${sourceNumber}]`)) {
      sources.push({
        title: `[${sourceNumber}]`,
        url: sourceUrl,
        text: `[${sourceNumber}]`
      });
    }
  }
  
  return sources;
}
```

## Testing Results

### Basic Query Test
When testing a basic query about handyman services, the server successfully returned:

1. A comprehensive response about the top 3 handyman services in high demand:
   - Plumbing Services
   - Drywall Repair and Installation
   - Painting (Interior and Exterior)

2. Source citations with numbered references in the text ([1], [2], etc.)

### Deep Research Test
When testing the deep research functionality, the server successfully returned:

1. A structured research report on handyman service trends for 2025, including:
   - Executive Summary
   - Key Findings
   - Detailed Analysis
   - Recommendations
   - Sources

2. Source citations with numbered references throughout the text

## Troubleshooting

### Common Issues and Solutions

1. **401 Unauthorized Error**
   - **Cause**: Invalid API key
   - **Solution**: Verify the API key in the environment variables or batch file

2. **404 Not Found Error**
   - **Cause**: Invalid model name
   - **Solution**: Use 'sonar' as the model name in API requests

3. **No Sources Returned**
   - **Cause**: Issue with source extraction or API response format
   - **Solution**: Check the search depth parameter and source extraction logic

## Future Enhancements

1. **Source Citation Improvements**
   - Enhance source extraction to include more metadata
   - Improve formatting of source citations in the response

2. **Performance Optimizations**
   - Implement caching for frequent queries
   - Add rate limiting to prevent API overuse

3. **UI Integration**
   - Create reusable components for displaying search results
   - Add source citation display in the UI
   - Implement loading states for better user experience

## Conclusion
The Perplexity MCP Server has been successfully implemented and tested. It provides powerful AI capabilities to the Handyman Lead Generation application, enabling web search, content generation, and deep research functionality with source citations.
