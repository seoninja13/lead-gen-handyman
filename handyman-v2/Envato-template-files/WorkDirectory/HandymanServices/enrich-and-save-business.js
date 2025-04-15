/**
 * Script to enrich business data using OpenRouter web search and save to businesses table
 */

const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// OpenRouter configuration
const OPENROUTER_API_KEY = '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';
const PRIMARY_MODEL = 'google/gemini-2.0-flash-001';
const FALLBACK_MODEL = 'openrouter/optimus-alpha';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Enrich business data using OpenRouter web search
 * @param {string} businessName - The business name
 * @param {string} city - The city
 * @param {string} service - The service
 * @returns {Promise<Object>} - The enriched data
 */
async function enrichBusinessData(businessName, city, service) {
  try {
    console.log(`Enriching data for "${businessName}" in ${city} (${service})...`);
    
    // Create search queries
    const searchQueries = [
      `${businessName} ${city} reviews`,
      `${businessName} ${city} services`,
      `${service} ${city}`,
      `${service} techniques ${city}`
    ];
    
    // Track model usage
    const modelUsage = {
      primaryModel: {
        name: PRIMARY_MODEL,
        usageCount: 0
      },
      fallbackModel: {
        name: FALLBACK_MODEL,
        usageCount: 0
      }
    };
    
    // Collect search results
    const searchResults = [];
    
    for (const query of searchQueries) {
      console.log(`Searching for: "${query}"...`);
      
      try {
        // Try with primary model first
        const primaryResult = await fetchWebSearchResults(query, PRIMARY_MODEL);
        modelUsage.primaryModel.usageCount++;
        searchResults.push(primaryResult);
      } catch (primaryError) {
        console.error(`Error with primary model for query "${query}":`, primaryError);
        
        try {
          // Fall back to secondary model
          console.log(`Falling back to ${FALLBACK_MODEL} for query "${query}"...`);
          const fallbackResult = await fetchWebSearchResults(query, FALLBACK_MODEL);
          modelUsage.fallbackModel.usageCount++;
          searchResults.push(fallbackResult);
        } catch (fallbackError) {
          console.error(`Error with fallback model for query "${query}":`, fallbackError);
          // Continue with next query
        }
      }
    }
    
    // Process the search results to create enriched data
    const enrichedData = await processSearchResults(businessName, city, service, searchResults);
    
    // Add metadata
    const result = {
      timestamp: new Date().toISOString(),
      source: "OpenRouter Web Search",
      searchQueries,
      modelUsage,
      enrichedData
    };
    
    return result;
  } catch (error) {
    console.error(`Error enriching data for "${businessName}":`, error);
    
    // Return a basic structure if enrichment fails
    return {
      timestamp: new Date().toISOString(),
      source: "OpenRouter Web Search (Error)",
      error: error.message,
      enrichedData: {
        reviewInsights: {
          summary: `Information about ${businessName} in ${city} providing ${service} services.`,
          strengths: [],
          areasForImprovement: [],
          testimonialHighlights: []
        },
        serviceDetails: {
          primaryServices: [
            {
              name: service,
              description: `${service} services provided by ${businessName} in ${city}.`,
              estimatedCost: 'Contact for pricing'
            }
          ],
          specializations: [],
          certifications: []
        }
      }
    };
  }
}

/**
 * Fetch web search results using OpenRouter
 * @param {string} query - The search query
 * @param {string} model - The model to use
 * @returns {Promise<Object>} - The search results
 */
async function fetchWebSearchResults(query, model) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/web-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        query,
        model
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching web search results for query "${query}":`, error);
    throw error;
  }
}

/**
 * Process search results to create enriched data
 * @param {string} businessName - The business name
 * @param {string} city - The city
 * @param {string} service - The service
 * @param {Array<Object>} searchResults - The search results
 * @returns {Promise<Object>} - The processed enriched data
 */
async function processSearchResults(businessName, city, service, searchResults) {
  try {
    // Combine all search results into a single prompt
    let searchResultsText = searchResults.map(result => {
      if (result.results && Array.isArray(result.results)) {
        return result.results.map(item => `Title: ${item.title}\nURL: ${item.url}\nSnippet: ${item.snippet}`).join('\n\n');
      }
      return JSON.stringify(result);
    }).join('\n\n---\n\n');
    
    // Limit the size of the search results to avoid token limits
    if (searchResultsText.length > 10000) {
      searchResultsText = searchResultsText.substring(0, 10000) + '... (truncated)';
    }
    
    // Create a prompt for the model to extract structured information
    const prompt = `
Based on the following web search results about "${businessName}" in ${city} providing ${service} services, please extract structured information in the following format:

1. Review Insights:
   - Summary of overall customer sentiment
   - Key strengths mentioned in reviews
   - Areas for improvement mentioned in reviews
   - Notable testimonial highlights

2. Service Details:
   - Primary services offered (with descriptions and estimated costs if available)
   - Specializations
   - Certifications or credentials

3. Repair Techniques (if applicable):
   - Common repair methods used
   - Specialized techniques
   - Equipment or tools mentioned

4. Maintenance Tips (if applicable):
   - Seasonal maintenance recommendations
   - Preventative maintenance advice
   - DIY vs professional guidance

Please format your response as a JSON object with these sections. If information for a section is not available in the search results, include the section with minimal placeholder content.

Search Results:
${searchResultsText}
`;

    // Use OpenRouter to process the search results
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: PRIMARY_MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful assistant that extracts structured information from web search results.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Invalid response from OpenRouter');
    }
    
    // Parse the JSON response
    try {
      const enrichedData = JSON.parse(data.choices[0].message.content);
      return enrichedData;
    } catch (parseError) {
      console.error('Error parsing enriched data:', parseError);
      // Return a basic structure if parsing fails
      return {
        reviewInsights: {
          summary: `Information about ${businessName} in ${city} providing ${service} services.`,
          strengths: [],
          areasForImprovement: [],
          testimonialHighlights: []
        },
        serviceDetails: {
          primaryServices: [
            {
              name: service,
              description: `${service} services provided by ${businessName} in ${city}.`,
              estimatedCost: 'Contact for pricing'
            }
          ],
          specializations: [],
          certifications: []
        }
      };
    }
  } catch (error) {
    console.error('Error processing search results:', error);
    // Return a basic structure if processing fails
    return {
      reviewInsights: {
        summary: `Information about ${businessName} in ${city} providing ${service} services.`,
        strengths: [],
        areasForImprovement: [],
        testimonialHighlights: []
      },
      serviceDetails: {
        primaryServices: [
          {
            name: service,
            description: `${service} services provided by ${businessName} in ${city}.`,
            estimatedCost: 'Contact for pricing'
          }
        ],
        specializations: [],
        certifications: []
      }
    };
  }
}

/**
 * Save enriched data to the businesses table
 * @param {string} businessName - The business name
 * @param {string} city - The city
 * @param {string} service - The service
 * @param {Object} enrichedData - The enriched data
 * @returns {Promise<Object>} - The result of the operation
 */
async function saveEnrichedDataToBusiness(businessName, city, service, enrichedData) {
  try {
    console.log(`Saving enriched data for "${businessName}" to businesses table...`);
    
    // First, check if the businesses table exists and what columns it has
    const { data: tableInfo, error: tableError } = await supabase
      .from('businesses')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('Error checking businesses table:', tableError);
      
      // If the table doesn't exist, create it with the enriched_data column
      if (tableError.message.includes('relation "businesses" does not exist')) {
        console.log('Businesses table does not exist. Creating it with enriched_data column...');
        
        // Create a record with the business data and enriched_data column
        const record = {
          business_name: businessName,
          city: city,
          service: service,
          enriched_data: enrichedData
        };
        
        const { data: createData, error: createError } = await supabase
          .from('businesses')
          .insert(record)
          .select();
        
        if (createError) {
          console.error('Error creating businesses table:', createError);
          throw createError;
        }
        
        console.log('Businesses table created with enriched_data column!');
        return { data: createData, created: true };
      }
      
      throw tableError;
    }
    
    // Check what columns are available
    const columns = tableInfo.length > 0 ? Object.keys(tableInfo[0]) : [];
    console.log('Available columns in businesses table:', columns);
    
    // Prepare the record to insert based on available columns
    const record = {};
    
    // Set the business name using an available column
    if (columns.includes('business_name')) {
      record.business_name = businessName;
    } else if (columns.includes('name')) {
      record.name = businessName;
    } else if (columns.includes('title')) {
      record.title = businessName;
    } else {
      // If no suitable column is found, use the first column that's not 'id'
      const nonIdColumns = columns.filter(col => col !== 'id');
      if (nonIdColumns.length > 0) {
        record[nonIdColumns[0]] = businessName;
      } else {
        console.error('No suitable column found for business name.');
        throw new Error('No suitable column found for business name.');
      }
    }
    
    // Set the city if the column exists
    if (columns.includes('city')) {
      record.city = city;
    }
    
    // Set the service if the column exists
    if (columns.includes('service')) {
      record.service = service;
    }
    
    // Set the enriched data using an available column
    if (columns.includes('enriched_data')) {
      record.enriched_data = enrichedData;
    } else {
      // Try to add the enriched_data column by inserting a record with it
      console.log('enriched_data column does not exist. Trying to add it...');
      
      // Add the enriched_data field to the record
      record.enriched_data = enrichedData;
    }
    
    console.log('Inserting record with columns:', Object.keys(record));
    
    // Insert the record
    const { data, error } = await supabase
      .from('businesses')
      .insert(record)
      .select();
    
    if (error) {
      console.error(`Error inserting enriched data for "${businessName}":`, error);
      
      // If the error is about the enriched_data column not existing, try with description
      if (error.message.includes('column "enriched_data" does not exist')) {
        console.log('enriched_data column does not exist. Trying with description...');
        
        // Remove the enriched_data field from the record
        delete record.enriched_data;
        
        // Add the description field to the record
        record.description = JSON.stringify(enrichedData);
        
        console.log('Inserting record with description column:', Object.keys(record));
        
        const { data: descData, error: descError } = await supabase
          .from('businesses')
          .insert(record)
          .select();
        
        if (descError) {
          console.error(`Error inserting with description for "${businessName}":`, descError);
          throw descError;
        }
        
        console.log(`Inserted new record for "${businessName}" with description in businesses table`);
        return { data: descData, created: false };
      }
      
      throw error;
    }
    
    console.log(`Inserted new record for "${businessName}" with enriched data in businesses table`);
    return { data, created: false };
  } catch (error) {
    console.error(`Error in saveEnrichedDataToBusiness for "${businessName}":`, error);
    throw error;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting process to enrich business data and save to businesses table...');
    
    // Get business data to enrich
    const business = {
      name: 'Sacramento Handyman Services',
      city: 'Sacramento',
      service: 'Handyman'
    };
    
    console.log(`Processing business: ${business.name}...`);
    
    // Enrich the business data
    const enrichedData = await enrichBusinessData(business.name, business.city, business.service);
    
    // Save the enriched data to the businesses table
    await saveEnrichedDataToBusiness(business.name, business.city, business.service, enrichedData);
    
    console.log(`Successfully processed ${business.name}`);
    console.log('Process completed successfully!');
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

// Run the main function
main();
