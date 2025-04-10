/**
 * Perplexity API client
 * This client handles communication with the Perplexity API for content generation and deep research
 */
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
    const { model = 'sonar', query, search = true, searchDepth = 3 } = options;
    
    try {
      console.log(`Querying Perplexity API with model: ${model}, search: ${search}, searchDepth: ${searchDepth}`);
      
      // Log the API key (first 5 chars only for security)
      const apiKeyPreview = this.apiKey ? `${this.apiKey.substring(0, 5)}...` : 'undefined';
      console.log(`Using API key: ${apiKeyPreview}`);
      
      // Create the request body with enhanced search options
      const requestBody = {
        model: model,
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant that provides accurate and detailed information. Always include sources for your information when available.' 
          },
          { role: 'user', content: query }
        ]
      };
      
      // Add search options if search is enabled
      if (search) {
        requestBody.options = {
          search_enable: true,
          search_depth: searchDepth
        };
      }
      
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error?.message || `HTTP error! Status: ${response.status}`;
        } catch (e) {
          errorMessage = `HTTP error! Status: ${response.status}, Response: ${errorText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Perplexity API response received successfully');
      console.log('Response data:', JSON.stringify(data, null, 2));
      
      // Extract sources from the response
      const sources = this.extractSources(data);
      console.log(`Extracted ${sources.length} sources from response`);
      
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
        console.log('Found structured citations in response');
        return response.choices[0].message.citations.map(citation => ({
          title: citation.title || '',
          url: citation.url || '',
          text: citation.text || ''
        }));
      }
      
      // Check for links in the message content
      if (response.choices && 
          response.choices[0] && 
          response.choices[0].message && 
          response.choices[0].message.content) {
        const content = response.choices[0].message.content;
        console.log('Attempting to extract sources from content');
        
        // Look for sources/references section
        const sourcesMatch = content.match(/sources:[\s\S]*?$/i) || 
                            content.match(/references:[\s\S]*?$/i) ||
                            content.match(/citations:[\s\S]*?$/i);
        
        if (sourcesMatch) {
          console.log('Found sources section in content');
          // Extract URLs from the sources section
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          const urls = sourcesMatch[0].match(urlRegex) || [];
          
          return urls.map(url => ({
            url: url,
            title: '',
            text: ''
          }));
        }
        
        // If no dedicated sources section, try to extract URLs from the entire content
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = content.match(urlRegex) || [];
        
        if (urls.length > 0) {
          console.log(`Found ${urls.length} URLs in content`);
          return urls.map(url => ({
            url: url,
            title: '',
            text: ''
          }));
        }
        
        // Look for numbered references like [1], [2], etc.
        const referenceRegex = /\[(\d+)\]\s*(.+?)(?=\[\d+\]|$)/g;
        const references = [];
        let match;
        
        while ((match = referenceRegex.exec(content)) !== null) {
          references.push({
            title: match[2].trim(),
            url: '',
            text: match[2].trim()
          });
        }
        
        if (references.length > 0) {
          console.log(`Found ${references.length} numbered references in content`);
          return references;
        }
      }
      
      console.log('No sources found in response');
      return [];
    } catch (error) {
      console.error('Error extracting sources:', error);
      return [];
    }
  }
}

module.exports = { PerplexityClient };
