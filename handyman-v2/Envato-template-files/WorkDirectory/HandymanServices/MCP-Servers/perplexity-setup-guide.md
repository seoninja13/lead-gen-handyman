# Perplexity MCP Server Implementation Guide

This guide provides detailed instructions for implementing a Perplexity MCP server in your project. The server allows you to use Perplexity's AI models for content generation and deep research.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Implementation Steps](#implementation-steps)
4. [Server Configuration](#server-configuration)
5. [Client Implementation](#client-implementation)
6. [API Routes](#api-routes)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Perplexity API key (obtain from [Perplexity AI](https://www.perplexity.ai/))
- Basic knowledge of Express.js

## Project Structure

```
MCP-Servers/
└── perplexity-mcp-server/
    ├── lib/
    │   └── perplexity-client.js
    ├── server.js
    ├── test-perplexity-server.js
    ├── start-perplexity-mcp.bat
    ├── package.json
    └── README.md
```

## Implementation Steps

### 1. Create the Project Structure

```bash
mkdir -p "MCP-Servers/perplexity-mcp-server/lib"
cd "MCP-Servers/perplexity-mcp-server"
```

### 2. Initialize the Project

```bash
npm init -y
```

### 3. Install Dependencies

```bash
npm install express cors body-parser dotenv node-fetch@2
npm install --save-dev nodemon
```

### 4. Create the Perplexity Client

Create a file at `lib/perplexity-client.js`:

```javascript
/**
 * Perplexity API client for the MCP server
 */
class PerplexityClient {
  /**
   * Create a new Perplexity client
   * @param {Object} options - Client options
   * @param {string} options.apiKey - Perplexity API key
   */
  constructor(options = {}) {
    this.apiKey = options.apiKey;
    this.baseUrl = 'https://api.perplexity.ai';
    this.defaultModel = 'sonar';
  }

  /**
   * Send a query to the Perplexity API
   * @param {Object} options - Query options
   * @param {string} options.model - Model name (default: sonar)
   * @param {string} options.query - Query text
   * @param {boolean} options.search - Whether to enable web search
   * @param {number} options.searchDepth - Search depth (1-5)
   * @returns {Promise<Object>} - API response
   */
  async query(options = {}) {
    const { model = this.defaultModel, query, search = false, searchDepth = 3 } = options;
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'user', content: query }
          ]
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Perplexity API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json();
      
      // Extract text and sources
      const text = data.choices[0]?.message?.content || '';
      const sources = this.extractSources(data);
      
      return { text, sources, raw: data };
    } catch (error) {
      console.error('Error querying Perplexity:', error);
      throw error;
    }
  }
  
  /**
   * Extract sources from the API response
   * @param {Object} response - API response
   * @returns {Array} - Extracted sources
   */
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
}

module.exports = PerplexityClient;
```

### 5. Create the Server

Create a file at `server.js`:

```javascript
/**
 * Perplexity MCP Server
 * This server provides an API for generating content using Perplexity's AI models
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PerplexityClient = require('./lib/perplexity-client');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Perplexity client
const perplexityClient = new PerplexityClient({
  apiKey: process.env.PERPLEXITY_API_KEY
});

// Define models
const models = [
  {
    id: 'perplexity-online-mistral',
    name: 'Perplexity Online Mistral',
    description: 'Perplexity Online Mistral model with web search capabilities',
    parameters: {
      prompt: {
        type: 'string',
        description: 'The prompt to send to Perplexity'
      }
    },
    handler: async (params) => {
      const { prompt } = params;
      
      try {
        const response = await perplexityClient.query({
          model: 'sonar',
          query: prompt,
          search: true,
          searchDepth: 3
        });
        
        return {
          result: response.text,
          metadata: {
            sources: response.sources || [],
            model: 'sonar'
          }
        };
      } catch (error) {
        console.error('Error querying Perplexity:', error);
        throw new Error(`Perplexity API error: ${error.message}`);
      }
    }
  },
  {
    id: 'perplexity-online-llama',
    name: 'Perplexity Online Llama',
    description: 'Perplexity Online Llama model with web search capabilities',
    parameters: {
      prompt: {
        type: 'string',
        description: 'The prompt to send to Perplexity'
      }
    },
    handler: async (params) => {
      const { prompt } = params;
      
      try {
        const response = await perplexityClient.query({
          model: 'sonar',
          query: prompt,
          search: true,
          searchDepth: 3
        });
        
        return {
          result: response.text,
          metadata: {
            sources: response.sources || [],
            model: 'sonar'
          }
        };
      } catch (error) {
        console.error('Error querying Perplexity:', error);
        throw new Error(`Perplexity API error: ${error.message}`);
      }
    }
  },
  {
    id: 'perplexity-deep-research',
    name: 'Perplexity Deep Research',
    description: 'Perplexity model for deep research with structured output',
    parameters: {
      topic: {
        type: 'string',
        description: 'The research topic'
      },
      depth: {
        type: 'string',
        description: 'Research depth (basic, intermediate, advanced)',
        enum: ['basic', 'intermediate', 'advanced'],
        default: 'basic'
      }
    },
    handler: async (params) => {
      const { topic, depth = 'basic' } = params;
      
      // Set search depth based on research depth
      let searchDepth = 3;
      if (depth === 'intermediate') searchDepth = 4;
      if (depth === 'advanced') searchDepth = 5;
      
      // Construct research prompt
      const prompt = `
        Conduct a comprehensive research on the following topic: "${topic}"
        
        Provide a well-structured report with the following sections:
        1. Executive Summary (brief overview)
        2. Key Findings (3-5 main points)
        3. Detailed Analysis (in-depth exploration)
        4. Recommendations (practical advice)
        5. Sources (list all sources used)
        
        Research depth: ${depth}
        Please cite all sources using numbered citations [1], [2], etc.
      `;
      
      try {
        const response = await perplexityClient.query({
          model: 'sonar',
          query: prompt,
          search: true,
          searchDepth: searchDepth
        });
        
        // Parse research result to extract sections
        const sections = parseResearchResult(response.text);
        
        return {
          result: response.text,
          metadata: {
            sources: response.sources || [],
            model: 'sonar',
            sections: sections
          }
        };
      } catch (error) {
        console.error('Error querying Perplexity:', error);
        throw new Error(`Perplexity API error: ${error.message}`);
      }
    }
  }
];

/**
 * Parse research result to extract sections
 * @param {string} text - Research result text
 * @returns {Object} - Extracted sections
 */
function parseResearchResult(text) {
  const sections = {
    executiveSummary: '',
    keyFindings: '',
    detailedAnalysis: '',
    recommendations: '',
    sources: ''
  };
  
  // Extract executive summary
  const execSummaryMatch = text.match(/(?:Executive Summary|Summary)[\s\n]*(.+?)(?=\n\s*(?:Key Findings|Findings|Key Points|Main Points|Detailed Analysis|Analysis|Recommendations|Sources|$))/is);
  if (execSummaryMatch) {
    sections.executiveSummary = execSummaryMatch[1].trim();
  }
  
  // Extract key findings
  const keyFindingsMatch = text.match(/(?:Key Findings|Findings|Key Points|Main Points)[\s\n]*(.+?)(?=\n\s*(?:Detailed Analysis|Analysis|Recommendations|Sources|$))/is);
  if (keyFindingsMatch) {
    sections.keyFindings = keyFindingsMatch[1].trim();
  }
  
  // Extract detailed analysis
  const analysisMatch = text.match(/(?:Detailed Analysis|Analysis)[\s\n]*(.+?)(?=\n\s*(?:Recommendations|Sources|$))/is);
  if (analysisMatch) {
    sections.detailedAnalysis = analysisMatch[1].trim();
  }
  
  // Extract recommendations
  const recommendationsMatch = text.match(/(?:Recommendations|Recommendation)[\s\n]*(.+?)(?=\n\s*(?:Sources|$))/is);
  if (recommendationsMatch) {
    sections.recommendations = recommendationsMatch[1].trim();
  }
  
  // Extract sources
  const sourcesMatch = text.match(/(?:Sources|References)[\s\n]*(.+?)$/is);
  if (sourcesMatch) {
    sections.sources = sourcesMatch[1].trim();
  }
  
  return sections;
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Generate endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { modelId, params } = req.body;
    
    // Validate request
    if (!modelId) {
      return res.status(400).json({ error: 'Model ID is required' });
    }
    
    // Find model
    const model = models.find(m => m.id === modelId);
    if (!model) {
      return res.status(404).json({ error: `Model ${modelId} not found` });
    }
    
    // Call the model handler
    let result;
    if (modelId === 'perplexity-online-mistral') {
      const { prompt } = params;
      const response = await perplexityClient.query({
        model: 'sonar',
        query: prompt,
        search: true,
        searchDepth: 3
      });
      
      result = {
        result: response.text,
        metadata: {
          sources: response.sources || [],
          model: 'sonar'
        }
      };
    } else if (modelId === 'perplexity-online-llama') {
      const { prompt } = params;
      const response = await perplexityClient.query({
        model: 'sonar',
        query: prompt,
        search: true,
        searchDepth: 3
      });
      
      result = {
        result: response.text,
        metadata: {
          sources: response.sources || [],
          model: 'sonar'
        }
      };
    } else if (modelId === 'perplexity-deep-research') {
      const { topic, depth = 'basic' } = params;
      
      // Set search depth based on research depth
      let searchDepth = 3;
      if (depth === 'intermediate') searchDepth = 4;
      if (depth === 'advanced') searchDepth = 5;
      
      // Construct research prompt
      const prompt = `
        Conduct a comprehensive research on the following topic: "${topic}"
        
        Provide a well-structured report with the following sections:
        1. Executive Summary (brief overview)
        2. Key Findings (3-5 main points)
        3. Detailed Analysis (in-depth exploration)
        4. Recommendations (practical advice)
        5. Sources (list all sources used)
        
        Research depth: ${depth}
        Please cite all sources using numbered citations [1], [2], etc.
      `;
      
      const response = await perplexityClient.query({
        model: 'sonar',
        query: prompt,
        search: true,
        searchDepth: searchDepth
      });
      
      // Parse research result to extract sections
      const sections = parseResearchResult(response.text);
      
      result = {
        result: response.text,
        metadata: {
          sources: response.sources || [],
          model: 'sonar',
          sections: sections
        }
      };
    } else {
      // Use the model handler for other models
      result = await model.handler(params);
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get models endpoint
app.get('/api/models', (req, res) => {
  const modelInfo = models.map(model => ({
    id: model.id,
    name: model.name,
    description: model.description,
    parameters: model.parameters
  }));
  
  res.json(modelInfo);
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Perplexity server running on port ${PORT}`);
});
```

### 6. Create the Test Script

Create a file at `test-perplexity-server.js`:

```javascript
/**
 * Test script for Perplexity MCP Server
 * This script tests the functionality of the Perplexity MCP server
 */
const fetch = require('node-fetch');

/**
 * Test the Perplexity server
 */
async function testPerplexityServer() {
  try {
    console.log('Testing Perplexity server...');
    
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3005/health');
    
    if (!healthResponse.ok) {
      throw new Error(`Health check failed with status: ${healthResponse.status}`);
    }
    
    const healthData = await healthResponse.json();
    console.log('Health check response:', healthData);
    
    // Test basic query
    console.log('\n2. Testing basic query...');
    const basicResponse = await fetch('http://localhost:3005/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modelId: 'perplexity-online-llama',
        params: {
          prompt: 'What are the top 3 handyman services in high demand?'
        }
      })
    });
    
    if (!basicResponse.ok) {
      const errorData = await basicResponse.json();
      throw new Error(errorData.error || `HTTP error! Status: ${basicResponse.status}`);
    }
    
    const basicData = await basicResponse.json();
    console.log('Basic query response:');
    console.log('- Result:', basicData.result.substring(0, 100) + '...');
    console.log('- Full Result:', basicData.result);
    console.log('- Sources:', JSON.stringify(basicData.metadata.sources, null, 2));
    console.log('- Sources count:', (basicData.metadata.sources || []).length);
    
    // Test deep research
    console.log('\n3. Testing deep research...');
    const researchResponse = await fetch('http://localhost:3005/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modelId: 'perplexity-deep-research',
        params: {
          topic: 'Latest trends in handyman services for 2025',
          depth: 'basic'
        }
      })
    });
    
    if (!researchResponse.ok) {
      const errorData = await researchResponse.json();
      throw new Error(errorData.error || `HTTP error! Status: ${researchResponse.status}`);
    }
    
    const researchData = await researchResponse.json();
    console.log('Deep research response:');
    console.log('- Executive Summary:', 
      researchData.metadata.sections.executiveSummary.substring(0, 100) + '...');
    console.log('- Full Response:', researchData.result);
    console.log('- Sources:', JSON.stringify(researchData.metadata.sources, null, 2));
    console.log('- Sources count:', (researchData.metadata.sources || []).length);
    
    console.log('\nAll tests passed successfully!');
  } catch (error) {
    console.error('Error testing Perplexity server:', error);
  }
}

// Run the test
testPerplexityServer();
```

### 7. Create the Startup Script

Create a file at `start-perplexity-mcp.bat`:

```batch
@echo off
echo Starting Perplexity MCP Server...
set PERPLEXITY_API_KEY=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
set PORT=3005
cd /d "%~dp0"
npm install
node server.js
```

### 8. Configure package.json

Update the `package.json` file:

```json
{
  "name": "perplexity-mcp-server",
  "version": "1.0.0",
  "description": "MCP server for Perplexity AI",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node test-perplexity-server.js"
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "node-fetch": "^2.6.7"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```

## Testing

To test the Perplexity MCP server:

1. Start the server:
   ```bash
   ./start-perplexity-mcp.bat
   ```

2. Run the test script:
   ```bash
   npm test
   ```

The test script will check:
- Health endpoint
- Basic query functionality
- Deep research functionality

## Troubleshooting

### Common Issues

1. **401 Unauthorized Error**
   - **Cause**: Invalid API key
   - **Solution**: Verify the API key in the environment variables or batch file

2. **404 Not Found Error**
   - **Cause**: Invalid model name
   - **Solution**: Use 'sonar' as the model name in API requests

3. **No Sources Returned**
   - **Cause**: Issue with source extraction or API response format
   - **Solution**: Check the search depth parameter and source extraction logic

4. **Connection Refused**
   - **Cause**: Server not running
   - **Solution**: Start the server using the batch file or `npm start`

## Conclusion

You have successfully implemented a Perplexity MCP server that provides AI-powered content generation and deep research capabilities. The server can be integrated with your application to enhance its functionality with advanced AI features.