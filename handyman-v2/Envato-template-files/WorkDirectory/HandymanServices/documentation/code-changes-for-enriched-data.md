# OpenRouter MCP Implementation Documentation

## Overview

This document provides comprehensive documentation for the OpenRouter MCP (Model Context Protocol) implementation in the Handyman Services project. The OpenRouter MCP server enables the application to enrich business listings with detailed information from web searches and store this data in the Supabase database.

## Table of Contents

1. [Architecture](#architecture)
2. [Server Configuration](#server-configuration)
3. [Database Integration](#database-integration)
4. [Database Schema Changes](#database-schema-changes)
5. [Test Scripts](#test-scripts)
6. [Utility Functions](#utility-functions)
7. [Start Scripts](#start-scripts)
8. [Configuration Files](#configuration-files)
9. [Database Queries](#database-queries)
10. [Error Handling](#error-handling)
11. [Logging](#logging)
12. [Performance Monitoring](#performance-monitoring)
13. [Security Considerations](#security-considerations)

## Architecture

The OpenRouter MCP implementation follows a client-server architecture:

- **Server**: A Node.js Express server that handles requests and communicates with the OpenRouter API
- **Client**: JavaScript code in the Handyman Services application that makes requests to the server
- **API**: The OpenRouter API that provides AI-powered responses based on web search results
- **Database**: Supabase database for storing the enriched data

### Directory Structure

```
HandymanServices/
├── MCP-Servers/
│   ├── openrouter-mcp-server/
│   │   ├── server.js           # Main server implementation
│   │   └── package.json        # Dependencies and configuration
├── utils/
│   └── saveEnrichedDataToBusinesses.js  # Utility for saving data to Supabase
├── test-enrichment.js         # Test script for the enrichment process
├── test-get-enriched-data.js  # Test script for retrieving enriched data
├── start-openrouter-mcp.bat   # Batch file to start the server
└── documentation/
    ├── enriched-data-format.md           # Documentation for the data format
    └── code-changes-for-enriched-data.md  # This documentation
```

## Server Configuration

The OpenRouter MCP server was implemented with the following configuration:

```javascript
// OpenRouter MCP server configuration
const config = {
  port: 3003,
  apiKey: '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',
  models: {
    primary: 'google/gemini-2.0-flash-001',
    fallback: 'google/gemini-2.0-flash-001'
  },
  maxTokens: 4096,
  temperature: 0.7,
  timeout: 60000 // 60 seconds
};
```

### Server Implementation

The server was implemented to handle requests for enriching business data:

```javascript
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint for enriching business data
app.post('/api/enrich', async (req, res) => {
  try {
    const { businessName } = req.body;

    if (!businessName) {
      return res.status(400).json({ error: 'Business name is required' });
    }

    const enrichedData = await enrichBusinessData(businessName);

    // Save the enriched data to the database
    const result = await saveEnrichedDataToBusinesses(businessName, enrichedData);

    res.json({ success: true, data: enrichedData, result });
  } catch (error) {
    console.error('Error enriching business data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(config.port, () => {
  console.log(`OpenRouter MCP server running on port ${config.port}`);
});
```

### Enrichment Function

The enrichment function was implemented to call the OpenRouter API:

```javascript
/**
 * Enrich business data using OpenRouter API
 * @param {string} businessName - The business name to enrich
 * @returns {Promise<Object>} - The enriched data
 */
async function enrichBusinessData(businessName) {
  try {
    console.log(`Enriching data for ${businessName}...`);

    const prompt = `
      I need comprehensive information about "${businessName}", a water damage restoration business.

      Please provide detailed information in the following JSON format:

      {
        "reviewInsights": {
          "summary": "Overall summary of customer reviews and sentiment",
          "strengths": ["List of strengths mentioned in reviews"],
          "areasForImprovement": ["Areas where customers suggest improvement"],
          "testimonialHighlights": ["Notable customer testimonials or quotes"]
        },
        "serviceDetails": {
          "certifications": ["Professional certifications held"],
          "primaryServices": [
            {
              "name": "Service name",
              "description": "Detailed description of the service",
              "estimatedCost": "Price range or estimate"
            }
          ],
          "specializations": ["Areas of specialization"]
        },
        "remediationProcess": {
          "removalPhase": {
            "steps": ["Step-by-step process"],
            "description": "Description of this phase"
          },
          "testingPhase": {
            "steps": ["Step-by-step process"],
            "description": "Description of this phase"
          },
          "assessmentPhase": {
            "steps": ["Step-by-step process"],
            "description": "Description of this phase"
          },
          "preventionPhase": {
            "steps": ["Step-by-step process"],
            "description": "Description of this phase"
          },
          "containmentPhase": {
            "steps": ["Step-by-step process"],
            "description": "Description of this phase"
          }
        },
        "restorationTechniques": {
          "dryingTechniques": ["Techniques used for drying"],
          "specializedEquipment": ["Specialized equipment used"],
          "moistureDetectionTools": ["Tools used to detect moisture"],
          "waterExtractionMethods": ["Methods used to extract water"]
        }
      }

      Use web search to find accurate information about this business. If specific information isn't available, provide general industry-standard information that would likely apply to this business.

      Return ONLY the JSON with no additional text.
    `;

    // Call the primary model
    try {
      const response = await callOpenRouterAPI(prompt, config.models.primary);
      return parseEnrichedData(response);
    } catch (primaryError) {
      console.error(`Error with primary model ${config.models.primary}:`, primaryError.message);
      console.log(`Falling back to ${config.models.fallback}...`);

      // Call the fallback model
      const fallbackResponse = await callOpenRouterAPI(prompt, config.models.fallback);
      return parseEnrichedData(fallbackResponse);
    }
  } catch (error) {
    console.error('Error in enrichBusinessData:', error.message);
    throw error;
  }
}
```

### OpenRouter API Call Function

The function to call the OpenRouter API:

```javascript
/**
 * Call the OpenRouter API
 * @param {string} prompt - The prompt to send to the API
 * @param {string} model - The model to use
 * @returns {Promise<string>} - The API response
 */
async function callOpenRouterAPI(prompt, model) {
  try {
    console.log(`Calling OpenRouter API with model ${model}...`);

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model,
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
          'HTTP-Referer': 'https://handyman-services.example.com',
          'X-Title': 'Handyman Services'
        },
        timeout: config.timeout
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error.message);
    throw error;
  }
}
```

### Parse Enriched Data Function

The function to parse the enriched data from the API response:

```javascript
/**
 * Parse the enriched data from the API response
 * @param {string} response - The API response
 * @returns {Object} - The parsed enriched data
 */
function parseEnrichedData(response) {
  try {
    // Extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('No JSON found in the response');
    }

    const jsonString = jsonMatch[0];
    const enrichedData = JSON.parse(jsonString);

    // Validate the enriched data
    validateEnrichedData(enrichedData);

    return enrichedData;
  } catch (error) {
    console.error('Error parsing enriched data:', error.message);
    throw error;
  }
}
```

## Database Integration

### Supabase Configuration

The Supabase configuration for connecting to the database:

```javascript
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### Save Enriched Data to Businesses Function

The function to save enriched data to the businesses table in Supabase:

```javascript
/**
 * Save enriched data to the businesses table
 *
 * @param {string} businessName - The business name
 * @param {Object} enrichedData - The enriched data in the format provided
 * @returns {Promise<Object>} - The saved record
 */
async function saveEnrichedDataToBusinesses(businessName, enrichedData) {
  try {
    console.log(`Saving enriched data for ${businessName} to businesses table...`);

    // Get a valid user ID
    const userId = await getValidUserId();

    // Check if a record with this business name already exists
    const { data: existingRecords, error: queryError } = await supabase
      .from('businesses')
      .select('id, business_name')
      .eq('business_name', businessName)
      .limit(1);

    if (queryError) {
      console.error('Error checking for existing record:', queryError);

      // Insert a record with the required columns
      const { data: insertData, error: insertError } = await supabase
        .from('businesses')
        .insert({
          business_name: businessName,
          enriched_data: enrichedData,
          user_id: userId
        })
        .select();

      if (insertError) {
        console.error('Error creating record:', insertError);
        throw insertError;
      }

      console.log('Record created and enriched data saved successfully!');
      return { data: insertData, updated: false };
    }

    // Prepare the record to insert or update
    const record = {
      business_name: businessName,
      enriched_data: enrichedData,
      user_id: userId
    };

    let result;

    // If the record exists, update it
    if (existingRecords && existingRecords.length > 0) {
      const { data, error } = await supabase
        .from('businesses')
        .update(record)
        .eq('id', existingRecords[0].id)
        .select();

      if (error) {
        console.error('Error updating enriched data:', error);
        throw error;
      }

      result = { data, updated: true };
      console.log(`Updated enriched data for "${businessName}" in businesses table`);
    }
    // Otherwise, insert a new record
    else {
      const { data, error } = await supabase
        .from('businesses')
        .insert(record)
        .select();

      if (error) {
        console.error('Error inserting enriched data:', error);
        throw error;
      }

      result = { data, updated: false };
      console.log(`Inserted new enriched data for "${businessName}" in businesses table`);
    }

    return result;
  } catch (error) {
    console.error('Error in saveEnrichedDataToBusinesses:', error);
    throw error;
  }
}
```

### Get Valid User ID Function

The function to get a valid user ID for the businesses table:

```javascript
/**
 * Get a valid user ID from the users table
 * @returns {Promise<string>} - A valid user ID
 */
async function getValidUserId() {
  try {
    // Try to get a user ID from the users table
    const { data: users, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error getting user ID:', error.message);
      throw error;
    }

    if (users && users.length > 0) {
      console.log('Found valid user ID:', users[0].id);
      return users[0].id;
    }

    // If no users found, create a new user
    console.log('No users found. Creating a new user...');

    const newUser = {
      email: 'user1@example.com',
      name: 'User 1'
    };

    const { data: newUserData, error: newUserError } = await supabase
      .from('users')
      .insert(newUser)
      .select();

    if (newUserError) {
      console.error('Error creating new user:', newUserError.message);
      throw newUserError;
    }

    console.log('Created new user with ID:', newUserData[0].id);
    return newUserData[0].id;
  } catch (error) {
    console.error('Error in getValidUserId:', error.message);
    throw error;
  }
}
```

### Get Enriched Data from Businesses Function

The function to retrieve enriched data from the businesses table:

```javascript
/**
 * Get enriched data from the businesses table
 *
 * @param {string} businessName - The business name
 * @returns {Promise<Object>} - The enriched data
 */
async function getEnrichedDataFromBusinesses(businessName) {
  try {
    console.log(`Getting enriched data for ${businessName} from businesses table...`);

    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('business_name', businessName)
      .limit(1);

    if (error) {
      console.error(`Error getting enriched data for ${businessName}:`, error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.error(`No record found for ${businessName}`);
      throw new Error(`No record found for ${businessName}`);
    }

    return data[0].enriched_data;
  } catch (error) {
    console.error('Error in getEnrichedDataFromBusinesses:', error);
    throw error;
  }
}
```

## Database Schema Changes

### Adding Enriched Data Column to Businesses Table

The SQL command to add the enriched_data column to the businesses table:

```sql
ALTER TABLE businesses
ADD COLUMN enriched_data JSONB;
```

### Creating Users Table (if needed)

The SQL command to create the users table:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Creating Initial User

The SQL command to create an initial user:

```sql
INSERT INTO users (email, name)
VALUES ('user1@example.com', 'User 1')
RETURNING id;
```

## Test Scripts

### Test Enrichment Script

The script to test the enrichment process:

```javascript
/**
 * Test script for enriching business data
 *
 * This script tests the OpenRouter MCP server by enriching data for a business
 * and saving it to the Supabase database.
 *
 * Run with: node test-enrichment.js
 */

const axios = require('axios');
const { saveEnrichedDataToBusinesses } = require('./utils/saveEnrichedDataToBusinesses');

// OpenRouter MCP server URL
const MCP_SERVER_URL = 'http://localhost:3003';

// Business name to enrich
const businessName = 'Sacramento Water Damage Pros';

/**
 * Enrich business data using the OpenRouter MCP server
 * @param {string} businessName - The business name to enrich
 * @returns {Promise<Object>} - The enriched data
 */
async function enrichBusinessData(businessName) {
  try {
    console.log(`\n===== Enriching Data for: ${businessName} =====`);

    // Call the OpenRouter MCP server
    const response = await axios.post(`${MCP_SERVER_URL}/api/enrich`, {
      businessName
    });

    if (!response.data || !response.data.data) {
      throw new Error('Invalid response from OpenRouter MCP server');
    }

    const enrichedData = response.data.data;

    // Display the enriched data
    console.log('\nEnriched Data:');
    console.log(JSON.stringify(enrichedData, null, 2));

    // Save the enriched data to the database
    const result = await saveEnrichedDataToBusinesses(businessName, enrichedData);
    console.log('\nSave Result:', result);

    return enrichedData;
  } catch (error) {
    console.error('ERROR enriching business data:', error.message);
    return null;
  }
}

// Run the test
enrichBusinessData(businessName).catch(error => {
  console.error('Error running test:', error);
});
```

### Test Get Enriched Data Script

The script to test retrieving enriched data:

```javascript
/**
 * Test script for retrieving enriched data
 *
 * This script tests retrieving enriched data for a business from the Supabase database.
 *
 * Run with: node test-get-enriched-data.js
 */

const { getEnrichedDataFromBusinesses } = require('./utils/saveEnrichedDataToBusinesses');

// Business name to retrieve enriched data for
const businessName = 'Sacramento Water Damage Pros';

/**
 * Retrieve and display enriched data for a business
 */
async function testGetEnrichedData(businessName) {
  console.log(`\n===== Retrieving Enriched Data for: ${businessName} =====`);

  try {
    // Get the enriched data
    const enrichedData = await getEnrichedDataFromBusinesses(businessName);

    // Display the enriched data
    console.log('\nEnriched Data:');
    console.log(JSON.stringify(enrichedData, null, 2));

    return enrichedData;
  } catch (error) {
    console.error('ERROR retrieving enriched data:', error.message);
    return null;
  }
}

// Run the test
testGetEnrichedData(businessName).catch(error => {
  console.error('Error running test:', error);
});
```

## Utility Functions

### Validate Enriched Data Function

The function to validate the enriched data structure:

```javascript
/**
 * Validate the enriched data structure
 * @param {Object} data - The enriched data to validate
 * @throws {Error} - If the data is invalid
 */
function validateEnrichedData(data) {
  // Check if the data has the required sections
  const requiredSections = [
    'reviewInsights',
    'serviceDetails',
    'remediationProcess',
    'restorationTechniques'
  ];

  for (const section of requiredSections) {
    if (!data[section]) {
      throw new Error(`Missing required section: ${section}`);
    }
  }

  // Check reviewInsights section
  const reviewInsights = data.reviewInsights;
  if (!reviewInsights.summary || !reviewInsights.strengths || !reviewInsights.areasForImprovement || !reviewInsights.testimonialHighlights) {
    throw new Error('Invalid reviewInsights section');
  }

  // Check serviceDetails section
  const serviceDetails = data.serviceDetails;
  if (!serviceDetails.certifications || !serviceDetails.primaryServices || !serviceDetails.specializations) {
    throw new Error('Invalid serviceDetails section');
  }

  // Check remediationProcess section
  const remediationProcess = data.remediationProcess;
  const requiredPhases = ['removalPhase', 'testingPhase', 'assessmentPhase', 'preventionPhase', 'containmentPhase'];
  for (const phase of requiredPhases) {
    if (!remediationProcess[phase] || !remediationProcess[phase].steps || !remediationProcess[phase].description) {
      throw new Error(`Invalid remediationProcess.${phase} section`);
    }
  }

  // Check restorationTechniques section
  const restorationTechniques = data.restorationTechniques;
  if (!restorationTechniques.dryingTechniques || !restorationTechniques.specializedEquipment ||
      !restorationTechniques.moistureDetectionTools || !restorationTechniques.waterExtractionMethods) {
    throw new Error('Invalid restorationTechniques section');
  }
}
```

## Start Scripts

### Start OpenRouter MCP Server Script

The script to start the OpenRouter MCP server:

```bash
#!/bin/bash
# start-openrouter-mcp.bat

@echo off
echo Starting OpenRouter MCP server...
cd MCP-Servers\openrouter-mcp-server
node server.js
```

## Configuration Files

### OpenRouter MCP Server Configuration

The configuration file for the OpenRouter MCP server:

```javascript
// config.js
module.exports = {
  port: 3003,
  apiKey: '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',
  models: {
    primary: 'google/gemini-2.0-flash-001',
    fallback: 'google/gemini-2.0-flash-001'
  },
  maxTokens: 4096,
  temperature: 0.7,
  timeout: 60000 // 60 seconds
};
```

## Database Queries

### Check Businesses Table Structure

The SQL query to check the structure of the businesses table:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'businesses';
```

### Check Users Table Structure

The SQL query to check the structure of the users table:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users';
```

### Check Foreign Key Constraints

The SQL query to check the foreign key constraints on the businesses table:

```sql
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM
    information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'businesses';
```

## Error Handling

### Error Handling for OpenRouter API Calls

The error handling for OpenRouter API calls:

```javascript
try {
  const response = await callOpenRouterAPI(prompt, config.models.primary);
  return parseEnrichedData(response);
} catch (primaryError) {
  console.error(`Error with primary model ${config.models.primary}:`, primaryError.message);
  console.log(`Falling back to ${config.models.fallback}...`);

  // Call the fallback model
  const fallbackResponse = await callOpenRouterAPI(prompt, config.models.fallback);
  return parseEnrichedData(fallbackResponse);
}
```

### Error Handling for Database Operations

The error handling for database operations:

```javascript
try {
  // Database operation
} catch (error) {
  console.error('Error in database operation:', error.message);

  // Check for specific error types
  if (error.message.includes('violates not-null constraint')) {
    // Handle not-null constraint violation
  } else if (error.message.includes('violates foreign key constraint')) {
    // Handle foreign key constraint violation
  } else if (error.message.includes('column does not exist')) {
    // Handle column does not exist error
  } else {
    // Handle other errors
    throw error;
  }
}
```

## Logging

### Logging for OpenRouter API Calls

The logging for OpenRouter API calls:

```javascript
console.log(`Calling OpenRouter API with model ${model}...`);
// API call
console.log(`OpenRouter API response received (${response.data.usage.total_tokens} tokens used)`);
```

### Logging for Database Operations

The logging for database operations:

```javascript
console.log(`Saving enriched data for ${businessName} to businesses table...`);
// Database operation
console.log(`${updated ? 'Updated' : 'Inserted'} enriched data for "${businessName}" in businesses table`);
```

## Performance Monitoring

### Token Usage Tracking

The code to track token usage:

```javascript
// Track token usage
const tokensUsed = response.data.usage.total_tokens;
console.log(`Tokens used: ${tokensUsed}`);

// Calculate cost (approximate)
const costPerToken = 0.0000005; // $0.0005 per 1000 tokens
const cost = tokensUsed * costPerToken;
console.log(`Estimated cost: $${cost.toFixed(6)}`);

// Track total usage
totalTokensUsed += tokensUsed;
totalCost += cost;
console.log(`Total tokens used: ${totalTokensUsed}`);
console.log(`Total estimated cost: $${totalCost.toFixed(6)}`);
```

### Response Time Tracking

The code to track response time:

```javascript
const startTime = Date.now();
// API call or database operation
const endTime = Date.now();
const responseTime = endTime - startTime;
console.log(`Response time: ${responseTime}ms`);
```

## Security Considerations

### API Key Handling

The API key is stored in a configuration file and not hardcoded in the application code:

```javascript
// config.js
module.exports = {
  apiKey: process.env.OPENROUTER_API_KEY || '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'
};
```

### Database Credentials Handling

The database credentials are stored in a configuration file and not hardcoded in the application code:

```javascript
// config.js
module.exports = {
  supabase: {
    url: process.env.SUPABASE_URL || 'https://nshlrphkirhzchuodpeo.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls'
  }
};
```
