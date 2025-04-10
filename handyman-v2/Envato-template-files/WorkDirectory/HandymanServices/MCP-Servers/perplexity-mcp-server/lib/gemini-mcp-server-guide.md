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
MCP Servers/
└── perplexity-mcp-server/
    ├── lib/
    │   └── perplexity-client.js
    ├── .env
    ├── package.json
    ├── server.js
    └── start.js
```

## Implementation Steps

### 1. Create the Project Structure

```bash
mkdir -p "MCP Servers/perplexity-mcp-server/lib"
cd "MCP Servers/perplexity-mcp-server"
```

### 2. Initialize the Project

```bash
npm init -y
```

### 3. Install Dependencies

```bash
npm install express cors body-parser dotenv node-fetch@2
npm install nodemon --save-dev
```

### 4. Create the Perplexity Client

Create a file at `lib/perplexity-client.js`:

```javascript
const fetch = require('node-fetch');

/**
 * Perplexity API client
 */
class PerplexityClient {
  /**
   * Create a new Perplexity client
   * @param {Object} options - Client options
   * @param {string} options.apiKey - Perplexity API key
   */
  constructor(options) {
    this.apiKey = options.apiKey;
    this.baseUrl = 'https://api.perplexity.ai';
  }
  
  /**
   * Send a query to Perplexity
   * @param {Object} options - Query options
   * @param {string} options.model - Model to use (e.g., 'mistral-7b-instruct', 'sonar')
   * @param {string} options.query - The query text
   * @param {boolean} options.search - Whether to use web search
   * @param {number} options.searchDepth - Search depth (1-5)
   * @returns {Promise<Object>} - Query response
   */
  async query(options) {
    const { model, query, search = false, searchDepth = 3 } = options;
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: 'You are a helpful assistant that provides accurate and detailed information.' },
            { role: 'user', content: query }
          ],
          options: {
            search: search,
            search_depth: searchDepth
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract sources from the response
      const sources = this.extractSources(data);
      
      return {
        text: data.choices[0].message.content,
        sources: sources,
        model: data.model,
        usage: data.usage
      };
    } catch (error) {
      console.error('Error querying Perplexity API:', error);
      throw error;
    }
  }
  
  /**
   * Extract sources from the response
   * @param {Object} response - API response
   * @returns {Array} - Extracted sources
   */
  extractSources(response) {
    try {
      // Check if the response has citations
      if (response.choices && 
          response.choices[0] && 
          response.choices[0].message && 
          response.choices[0].message.citations) {
        return response.choices[0].message.citations.map(citation => ({
          title: citation.title || '',
          url: citation.url || '',
          text: citation.text || ''
        }));
      }
      
      // If no structured citations, try to extract from the content
      if (response.choices && 
          response.choices[0] && 
          response.choices[0].message && 
          response.choices[0].message.content) {
        const content = response.choices[0].message.content;
        
        // Look for sources/references section
        const sourcesMatch = content.match(/sources:[\s\S]*?$/i) || 
                            content.match(/references:[\s\S]*?$/i);
        
        if (sourcesMatch) {
          // Extract URLs from the sources section
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          const urls = sourcesMatch[0].match(urlRegex) || [];
          
          return urls.map(url => ({
            url: url,
            title: '',
            text: ''
          }));
        }
      }
      
      return [];
    } catch (error) {
      console.error('Error extracting sources:', error);
      return [];
    }
  }
}

module.exports = { PerplexityClient };
```

### 5. Create the Server

Create a file at `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PerplexityClient } = require('./lib/perplexity-client');

// Create Express app
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
            search: true
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
            search: true
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
      description: 'Perplexity deep research with comprehensive web search and analysis',
      parameters: {
        topic: {
          type: 'string',
          description: 'The research topic'
        },
        depth: {
          type: 'string',
          description: 'Research depth (basic, standard, comprehensive)',
          default: 'standard'
        }
      },
      handler: async (params) => {
        const { topic, depth = 'standard' } = params;
        
        // Determine search depth
        let searchDepth = 3;
        if (depth === 'basic') searchDepth = 2;
        if (depth === 'comprehensive') searchDepth = 5;
        
        // Create research prompt
        const prompt = `
        I need you to perform deep research on the following topic:
        
        TOPIC: ${topic}
        
        Please follow these steps:
        1. Create a comprehensive research plan
        2. Gather information from multiple sources
        3. Analyze and synthesize the information
        4. Provide a detailed report with the following sections:
           - Executive Summary
           - Key Findings
           - Detailed Analysis
           - Recommendations
           - Sources
        
        Make sure to cite your sources and provide specific, factual information.
        `;
        
        try {
          const response = await perplexityClient.query({
            model: 'sonar-deep-research',
            query: prompt,
            search: true,
            searchDepth: searchDepth
          });
          
          // Parse the research result into sections
          const sections = parseResearchResult(response.text);
          
          return {
            result: response.text,
            metadata: {
              sources: response.sources || [],
              model: 'sonar-deep-research',
              sections: sections
            }
          };
        } catch (error) {
          console.error('Error performing deep research:', error);
          throw new Error(`Perplexity API error: ${error.message}`);
        }
      }
    }
  ]

// Parse research result into sections
function parseResearchResult(researchResult) {
  const sections = {
    executiveSummary: '',
    keyFindings: '',
    detailedAnalysis: '',
    recommendations: '',
    sources: ''
  };
  
  // Extract Executive Summary
  const executiveSummaryMatch = researchResult.match(/Executive Summary[:\\s]*([\s\S]*?)(?=Key Findings|$)/i);
  if (executiveSummaryMatch && executiveSummaryMatch[1]) {
    sections.executiveSummary = executiveSummaryMatch[1].trim();
  }
  
  // Extract Key Findings
  const keyFindingsMatch = researchResult.match(/Key Findings[:\\s]*([\s\S]*?)(?=Detailed Analysis|$)/i);
  if (keyFindingsMatch && keyFindingsMatch[1]) {
    sections.keyFindings = keyFindingsMatch[1].trim();
  }
  
  // Extract Detailed Analysis
  const detailedAnalysisMatch = researchResult.match(/Detailed Analysis[:\\s]*([\s\S]*?)(?=Recommendations|$)/i);
  if (detailedAnalysisMatch && detailedAnalysisMatch[1]) {
    sections.detailedAnalysis = detailedAnalysisMatch[1].trim();
  }
  
  // Extract Recommendations
  const recommendationsMatch = researchResult.match(/Recommendations[:\\s]*([\s\S]*?)(?=Sources|$)/i);
  if (recommendationsMatch && recommendationsMatch[1]) {
    sections.recommendations = recommendationsMatch[1].trim();
  }
  
  // Extract Sources
  const sourcesMatch = researchResult.match(/Sources[:\\s]*([\s\S]*?)$/i);
  if (sourcesMatch && sourcesMatch[1]) {
    sections.sources = sourcesMatch[1].trim();
  }
  
  return sections;
}

// API routes
app.post('/api/models', (req, res) => {
  res.json({ models });
});

app.post('/api/generate', async (req, res) => {
  try {
    const { modelId, params } = req.body;
    
    // Find the model
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
        search: true
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
        search: true
      });
      
      result = {
        result: response.text,
        metadata: {
          sources: response.sources || [],
          model: 'sonar'
        }
      };
    } else if (modelId === 'perplexity-deep-research') {
      const { topic, depth = 'standard' } = params;
      
      // Determine search depth
      let searchDepth = 3;
      if (depth === 'basic') searchDepth = 2;
      if (depth === 'comprehensive') searchDepth = 5;
      
      // Create research prompt
      const prompt = `
      I need you to perform deep research on the following topic:
      
      TOPIC: ${topic}
      
      Please follow these steps:
      1. Create a comprehensive research plan
      2. Gather information from multiple sources
      3. Analyze and synthesize the information
      4. Provide a detailed report with the following sections:
         - Executive Summary
         - Key Findings
         - Detailed Analysis
         - Recommendations
         - Sources
      
      Make sure to cite your sources and provide specific, factual information.
      `;
      
      const response = await perplexityClient.query({
        model: 'sonar-deep-research',
        query: prompt,
        search: true,
        searchDepth: searchDepth
      });
      
      // Parse the research result into sections
      const sections = parseResearchResult(response.text);
      
      result = {
        result: response.text,
        metadata: {
          sources: response.sources || [],
          model: 'sonar-deep-research',
          sections: sections
        }
      };
    } else {
      return res.status(400).json({ error: `Model ${modelId} not supported` });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Perplexity server running on port ${PORT}`);
});
```

### 6. Create the Start Script

Create a file at `start.js`:

```javascript
require('dotenv').config();
const { spawn } = require('child_process');

// Start the Perplexity server
console.log('Starting Perplexity server...');
const server = spawn('node', ['server.js'], {
  env: {
    ...process.env,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY || 'your-perplexity-api-key',
    PORT: process.env.PORT || '3005'
  },
  stdio: 'inherit'
});

server.on('error', (error) => {
  console.error('Error starting Perplexity server:', error);
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('Stopping Perplexity server...');
  server.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Stopping Perplexity server...');
  server.kill();
  process.exit();
});
```

### 7. Create the Environment File

Create a file at `.env`:

```
PERPLEXITY_API_KEY=your-perplexity-api-key
PORT=3005
```

### 8. Update the Package.json

Update the `package.json` file:

```json
{
  "name": "perplexity-mcp-server",
  "version": "1.0.0",
  "description": "MCP server for Perplexity API integration",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "start:dotenv": "node start.js"
  },
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "node-fetch": "^2.6.7"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## Client Implementation

### 1. Create the Perplexity Client in Your Next.js Application

Create a file at `lib/perplexity-client.ts`:

```typescript
/**
 * Perplexity client for deep research
 */

// Default model
const DEFAULT_MODEL = 'sonar';

/**
 * Perform deep research using Perplexity
 * @param topic - The research topic
 * @param options - Additional options
 * @returns The research results
 */
export async function performDeepResearch(
  topic: string,
  options: {
    depth?: 'basic' | 'standard' | 'comprehensive';
  } = {}
): Promise<any> {
  try {
    const { depth = 'standard' } = options;
    
    // Call Perplexity API route
    const response = await fetch('/api/perplexity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operation: 'deepResearch',
        data: {
          topic,
          depth
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return {
      topic,
      ...data.data.metadata.sections,
      sources: data.data.metadata.sources,
      rawContent: data.data.result
    };
  } catch (error) {
    console.error('Error performing deep research with Perplexity:', error);
    throw error;
  }
}

/**
 * Generate business profile using Perplexity
 * @param data - The business data
 * @returns The generated profile
 */
export async function generateBusinessProfile(
  data: {
    name: string;
    city: string;
    state?: string;
    service: string;
  }
): Promise<any> {
  try {
    const { name, city, state = 'CA', service } = data;
    
    // Create prompt for business profile
    const prompt = `
    I need you to generate a comprehensive, SEO-optimized business profile for a water damage and mold removal company.
    
    BUSINESS NAME: ${name}
    CITY: ${city}, ${state}
    PRIMARY SERVICE: ${service}
    
    Please include the following sections:
    1. Business Description (200-300 words about the company)
    2. Services Offered (list of services with brief descriptions)
    3. Why Choose This Company (4-6 reasons)
    4. Service Area (information about their coverage in ${city} and surrounding areas)
    5. FAQs (3 frequently asked questions with answers)
    
    Make the content specific to ${name} in ${city}, ${state}.
    Optimize for SEO with natural keyword usage.
    
    Format the output as JSON with the following structure:
    {
      "description": "...",
      "servicesOffered": [
        { "name": "...", "description": "..." },
        ...
      ],
      "whyChoose": [
        { "title": "...", "description": "..." },
        ...
      ],
      "serviceArea": "...",
      "faqs": [
        { "question": "...", "answer": "..." },
        ...
      ]
    }
    `;
    
    // Call Perplexity API route
    const response = await fetch('/api/perplexity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operation: 'generateContent',
        data: {
          model: DEFAULT_MODEL,
          prompt
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }
    
    const responseData = await response.json();
    
    if (responseData.error) {
      throw new Error(responseData.error);
    }
    
    // Parse the JSON response
    let parsedContent;
    try {
      parsedContent = JSON.parse(responseData.data.result);
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      
      // Attempt to extract JSON from the response
      const jsonMatch = responseData.data.result.match(/{[\s\S]*}/);
      if (jsonMatch) {
        try {
          parsedContent = JSON.parse(jsonMatch[0]);
        } catch (innerError) {
          console.error('Error parsing extracted JSON:', innerError);
          throw new Error('Failed to parse Perplexity response as JSON');
        }
      } else {
        throw new Error('Failed to extract JSON from Perplexity response');
      }
    }
    
    return parsedContent;
  } catch (error) {
    console.error('Error generating business profile with Perplexity:', error);
    throw error;
  }
}
```

### 2. Create the API Route in Your Next.js Application

Create a file at `app/api/perplexity/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, data } = body;
    
    // Validate request
    if (!operation) {
      return NextResponse.json({ error: 'Operation is required' }, { status: 400 });
    }
    
    // Handle different operations
    switch (operation) {
      case 'generateContent':
        return await handleGenerateContent(data);
      case 'deepResearch':
        return await handleDeepResearch(data);
      default:
        return NextResponse.json({ error: `Unknown operation: ${operation}` }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error in Perplexity API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Handle generate content operation
 */
async function handleGenerateContent(data: any) {
  try {
    // Validate data
    if (!data.prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const { model = "perplexity-online-llama", prompt } = data;

    // Call Perplexity server
    const response = await fetch("http://localhost:3005/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelId: model,
        params: {
          prompt,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! Status: ${response.status}`
      );
    }

    const result = await response.json();

    return NextResponse.json({ data: result });
  } catch (error: any) {
    console.error("Error generating content with Perplexity:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Handle deep research operation
 */
async function handleDeepResearch(data: any) {
  try {
    // Validate data
    if (!data.topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const { topic, depth = "standard" } = data;

    // Call Perplexity server
    const response = await fetch("http://localhost:3005/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelId: "perplexity-deep-research",
        params: {
          topic,
          depth,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! Status: ${response.status}`
      );
    }

    const result = await response.json();

    return NextResponse.json({ data: result });
  } catch (error: any) {
    console.error("Error performing deep research with Perplexity:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

## Testing

### 1. Test the Perplexity MCP Server

Create a test script at `scripts/test-perplexity-server.js`:

```javascript
import fetch from 'node-fetch';

async function testPerplexityServer() {
  try {
    console.log('Testing Perplexity server...');
    
    const response = await fetch('http://localhost:3005/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modelId: 'perplexity-online-llama',
        params: {
          prompt: 'Hello, world!'
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error testing Perplexity server:', error);
  }
}

testPerplexityServer();
```

### 2. Run the Test

```bash
cd scripts
node test-perplexity-server.js
```

## Troubleshooting

### Common Issues

1. **API Key Issues**
   - Ensure your Perplexity API key is correctly set in the `.env` file
   - Verify the API key is valid and has not expired

2. **Model Name Issues**
   - Perplexity occasionally updates their model names
   - Check the [Perplexity API documentation](https://docs.perplexity.ai/guides/model-cards) for the latest model names
   - Update the model names in the server.js file if necessary

3. **Port Conflicts**
   - If port 3005 is already in use, change the PORT value in the `.env` file
   - Update the client API route to use the new port

4. **Connection Issues**
   - Ensure the Perplexity server is running before making requests
   - Check that the server URL in the API route is correct

## Conclusion

You now have a fully functional Perplexity MCP server that can be used for content generation and deep research. The server provides a simple API that can be integrated with any client application.

For more information, refer to the [Perplexity API documentation](https://docs.perplexity.ai/).