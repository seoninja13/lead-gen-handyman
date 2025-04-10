/**
 * Perplexity MCP Server
 * This server provides an API for accessing Perplexity's AI models for content generation and deep research
 */
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
  apiKey: process.env.PERPLEXITY_API_KEY || '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'
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
          model: 'sonar',
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
            model: 'sonar',
            sections: sections
          }
        };
      } catch (error) {
        console.error('Error performing deep research:', error);
        throw new Error(`Perplexity API error: ${error.message}`);
      }
    }
  }
];

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
        model: 'sonar',
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
          model: 'sonar',
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
