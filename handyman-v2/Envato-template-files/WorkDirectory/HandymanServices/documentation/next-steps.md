# Next Steps

This document outlines the planned next steps for the Handyman Services project. It serves as a roadmap for future development and enhancements.

## Table of Contents

1. [Data Storage and Integration](#data-storage-and-integration)
2. [User Interface Enhancements](#user-interface-enhancements)
3. [Performance Optimizations](#performance-optimizations)
4. [Security Enhancements](#security-enhancements)
5. [Analytics and Reporting](#analytics-and-reporting)

## Data Storage and Integration

### Save Enriched Data from OpenRouter Web Search to Supabase Database

**Priority: High**

The current implementation needs to be enhanced to reliably store enriched business data from OpenRouter web searches directly in the Supabase database.

**Tasks:**

1. **Implement Robust Database Storage**
   - Ensure the `enriched_data` column exists in the `businesses` table
   - Handle the `user_id` constraint properly when inserting new records
   - Implement proper error handling for database operations

2. **Create Scheduled Enrichment Jobs**
   - Implement a scheduled job to periodically update the enriched data for all businesses
   - Set up a queue system to handle large numbers of businesses
   - Add rate limiting to avoid exceeding API quotas

3. **Develop Admin Interface**
   - Create an admin interface for manually triggering enrichment for specific businesses
   - Add status indicators for the enrichment process
   - Implement a history log of enrichment operations

4. **Enhance Error Handling**
   - Implement retry logic for failed enrichment attempts
   - Create a notification system for critical failures
   - Add detailed logging for debugging purposes

**Implementation Details:**

```javascript
// Example implementation for saving enriched data to Supabase
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
      throw queryError;
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

## User Interface Enhancements

### Enhance UI for Displaying Enriched Data

**Priority: Medium**

Create a more user-friendly interface for displaying the enriched business data.

**Tasks:**

1. Create dedicated components for displaying different sections of the enriched data
2. Implement a tabbed interface for navigating between different sections
3. Add visual indicators for data freshness and quality
4. Implement responsive design for mobile devices

### Improve Search Experience

**Priority: Medium**

Enhance the search functionality to better utilize the enriched data.

**Tasks:**

1. Implement advanced filtering based on enriched data attributes
2. Add auto-suggestions based on popular searches
3. Improve search result ranking using enriched data
4. Add map-based search for location-specific queries

## Performance Optimizations

### Optimize API Calls

**Priority: Medium**

Improve the performance of API calls to the OpenRouter service.

**Tasks:**

1. Implement caching for API responses
2. Add request batching for multiple businesses
3. Optimize prompt engineering for better results
4. Implement progressive loading of enriched data

### Improve Database Performance

**Priority: Low**

Optimize database operations for better performance.

**Tasks:**

1. Add indexes for frequently queried columns
2. Implement connection pooling
3. Optimize JSON queries on the enriched_data column
4. Add database caching layer

## Security Enhancements

### Enhance API Key Management

**Priority: High**

Improve the security of API key management.

**Tasks:**

1. Move API keys to environment variables
2. Implement key rotation
3. Add usage monitoring and alerts
4. Implement IP-based restrictions

### Improve Data Validation

**Priority: Medium**

Enhance data validation for user inputs and API responses.

**Tasks:**

1. Implement schema validation for enriched data
2. Add input sanitization for user-provided data
3. Implement output validation for API responses
4. Add data integrity checks

## Analytics and Reporting

### Implement Usage Analytics

**Priority: Low**

Add analytics to track usage of the enrichment features.

**Tasks:**

1. Track API usage and costs
2. Monitor enrichment success rates
3. Analyze data quality and completeness
4. Generate monthly usage reports

### Add Business Intelligence

**Priority: Low**

Implement business intelligence features for analyzing the enriched data.

**Tasks:**

1. Create dashboards for visualizing enriched data trends
2. Implement comparative analysis between businesses
3. Add anomaly detection for identifying unusual patterns
4. Generate insights based on enriched data analysis
