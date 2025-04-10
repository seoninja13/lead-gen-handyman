/**
 * PerplexityTest Component
 * 
 * This component provides a UI for testing the Perplexity MCP server functionality,
 * including search, content generation, and deep research capabilities.
 */
import { useState } from 'react';

export default function PerplexityTest() {
  // State for search operation
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRecency, setSearchRecency] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  
  // State for content generation operation
  const [contentPrompt, setContentPrompt] = useState('');
  const [contentResults, setContentResults] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);
  
  // State for deep research operation
  const [researchTopic, setResearchTopic] = useState('');
  const [researchDepth, setResearchDepth] = useState('standard');
  const [researchResults, setResearchResults] = useState(null);
  const [researchLoading, setResearchLoading] = useState(false);
  
  // State for error handling
  const [error, setError] = useState(null);
  
  /**
   * Execute a search query using the Perplexity MCP server
   */
  const executeSearch = async () => {
    setError(null);
    setSearchLoading(true);
    
    try {
      const response = await fetch('/api/mcp/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operation: 'search',
          data: {
            query: searchQuery,
            recency: searchRecency || undefined
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to execute search query');
      }
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error executing search:', error);
      setError(`Search error: ${error.message}`);
    } finally {
      setSearchLoading(false);
    }
  };
  
  /**
   * Generate content using the Perplexity MCP server
   */
  const generateContent = async () => {
    setError(null);
    setContentLoading(true);
    
    try {
      const response = await fetch('/api/mcp/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operation: 'generateContent',
          data: {
            model: 'perplexity-online-llama',
            prompt: contentPrompt
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }
      
      const data = await response.json();
      setContentResults(data);
    } catch (error) {
      console.error('Error generating content:', error);
      setError(`Content generation error: ${error.message}`);
    } finally {
      setContentLoading(false);
    }
  };
  
  /**
   * Perform deep research using the Perplexity MCP server
   */
  const performResearch = async () => {
    setError(null);
    setResearchLoading(true);
    
    try {
      const response = await fetch('/api/mcp/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operation: 'deepResearch',
          data: {
            topic: researchTopic,
            depth: researchDepth
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to perform research');
      }
      
      const data = await response.json();
      setResearchResults(data);
    } catch (error) {
      console.error('Error performing research:', error);
      setError(`Research error: ${error.message}`);
    } finally {
      setResearchLoading(false);
    }
  };
  
  /**
   * Format sources for display
   */
  const formatSources = (sources) => {
    if (!sources || sources.length === 0) {
      return <p>No sources available</p>;
    }
    
    return (
      <ul className="list-disc pl-5">
        {sources.map((source, index) => (
          <li key={index} className="mb-2">
            {source.title && <strong>{source.title}</strong>}
            {source.url && (
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-2"
              >
                {source.url}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Perplexity MCP Server Test</h1>
      
      {/* Error display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Section */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">1. Web Search</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Search Query:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter search query"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Recency Filter:</label>
            <select
              value={searchRecency}
              onChange={(e) => setSearchRecency(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">No filter</option>
              <option value="hour">Past hour</option>
              <option value="day">Past day</option>
              <option value="week">Past week</option>
              <option value="month">Past month</option>
            </select>
          </div>
          
          <button
            onClick={executeSearch}
            disabled={!searchQuery || searchLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {searchLoading ? 'Searching...' : 'Search'}
          </button>
          
          {searchResults && (
            <div className="mt-4">
              <h3 className="font-semibold">Results:</h3>
              <div className="mt-2 max-h-80 overflow-y-auto">
                {searchResults.text && (
                  <div className="mb-4">
                    <p className="whitespace-pre-wrap">{searchResults.text}</p>
                  </div>
                )}
                
                {searchResults.answer && (
                  <div className="mb-4">
                    <p className="whitespace-pre-wrap">{searchResults.answer}</p>
                  </div>
                )}
                
                {searchResults.search_results && (
                  <div className="mt-4">
                    <h4 className="font-medium">Sources:</h4>
                    <ul className="list-disc pl-5 mt-2">
                      {searchResults.search_results.map((result, index) => (
                        <li key={index} className="mb-2">
                          <a 
                            href={result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {result.title}
                          </a>
                          <p className="text-sm text-gray-600">{result.snippet}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Content Generation Section */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">2. Content Generation</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Prompt:</label>
            <textarea
              value={contentPrompt}
              onChange={(e) => setContentPrompt(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows="5"
              placeholder="Enter prompt for content generation"
            ></textarea>
          </div>
          
          <button
            onClick={generateContent}
            disabled={!contentPrompt || contentLoading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {contentLoading ? 'Generating...' : 'Generate Content'}
          </button>
          
          {contentResults && (
            <div className="mt-4">
              <h3 className="font-semibold">Generated Content:</h3>
              <div className="mt-2 max-h-80 overflow-y-auto">
                <p className="whitespace-pre-wrap">{contentResults.result}</p>
                
                {contentResults.metadata && contentResults.metadata.sources && contentResults.metadata.sources.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium">Sources:</h4>
                    {formatSources(contentResults.metadata.sources)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Deep Research Section */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">3. Deep Research</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Research Topic:</label>
            <input
              type="text"
              value={researchTopic}
              onChange={(e) => setResearchTopic(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter research topic"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Research Depth:</label>
            <select
              value={researchDepth}
              onChange={(e) => setResearchDepth(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
          </div>
          
          <button
            onClick={performResearch}
            disabled={!researchTopic || researchLoading}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            {researchLoading ? 'Researching...' : 'Perform Research'}
          </button>
          
          {researchResults && (
            <div className="mt-4">
              <h3 className="font-semibold">Research Results:</h3>
              <div className="mt-2 max-h-80 overflow-y-auto">
                {researchResults.metadata && researchResults.metadata.sections && (
                  <div>
                    <h4 className="font-medium mt-2">Executive Summary:</h4>
                    <p className="whitespace-pre-wrap">{researchResults.metadata.sections.executiveSummary}</p>
                    
                    <h4 className="font-medium mt-4">Key Findings:</h4>
                    <p className="whitespace-pre-wrap">{researchResults.metadata.sections.keyFindings}</p>
                    
                    <h4 className="font-medium mt-4">Sources:</h4>
                    {formatSources(researchResults.metadata.sources)}
                  </div>
                )}
                
                {!researchResults.metadata?.sections && (
                  <p className="whitespace-pre-wrap">{researchResults.result}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
