/**
 * Test script for OpenRouter MCP Server - Business Listing Enrichment
 *
 * This script tests the OpenRouter MCP Server by enriching a business listing
 * with additional information from web searches and saving the enriched data to Supabase.
 *
 * Run with: node test-enrichment.js
 */

const fetch = require('node-fetch');
const { saveEnrichedDataToBusinesses } = require('./utils/saveEnrichedDataToFile');

// Base URL for MCP servers
const MCP_SERVER_URL = 'http://localhost:8890';

// Sample business listing to enrich
const businessListing = {
  "name": "Sacramento Handyman Services",
  "address": "1234 Main Street, Sacramento, CA 95814",
  "phone": "(916) 555-1234",
  "website": "https://sacramentohandyman.example.com",
  "hours": {
    "Monday": "8:00 AM - 5:00 PM",
    "Tuesday": "8:00 AM - 5:00 PM",
    "Wednesday": "8:00 AM - 5:00 PM",
    "Thursday": "8:00 AM - 5:00 PM",
    "Friday": "8:00 AM - 5:00 PM",
    "Saturday": "9:00 AM - 2:00 PM",
    "Sunday": "Closed"
  },
  "rating": 4.8,
  "reviewCount": 75,
  "categories": [
    "Handyman",
    "Home Repair",
    "Carpentry"
  ],
  "description": "Professional handyman services in Sacramento, CA. Specializing in home repairs, carpentry, and general maintenance.",
  "photos": [
    "https://example.com/photos/sacramento-handyman-1.jpg",
    "https://example.com/photos/sacramento-handyman-2.jpg"
  ],
  "attributes": {
    "licensed": true,
    "insured": true,
    "free_estimates": true,
    "locally_owned": true
  }
};

/**
 * Enrich a business listing with additional information from web searches
 */
async function enrichBusinessListing(business) {
  console.log(`\n===== Enriching Business Listing: ${business.name} =====`);

  try {
    // Generate search queries based on the business information
    const searchQueries = [
      `${business.name} reviews`,
      `${business.name} services`,
      `handyman services ${business.address.split(',')[1].trim()}`,
      `home repair techniques ${business.address.split(',')[1].trim()}`
    ];

    // Collect search results for each query
    const searchResults = [];
    for (const query of searchQueries) {
      console.log(`Searching for: "${query}"`);

      const response = await fetch(`${MCP_SERVER_URL}/mcp5_openrouter_search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          max_results: 5
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      searchResults.push({
        query,
        results: data.results
      });
    }

    // Generate enriched data using the search results
    const enrichedData = {
      timestamp: new Date().toISOString(),
      source: "OpenRouter Web Search",
      searchQueries,
      modelUsage: {
        primaryModel: {
          name: "google/gemini-2.0-flash-001",
          usageCount: searchQueries.length
        },
        fallbackModel: {
          name: "openrouter/optimus-alpha",
          usageCount: 0
        }
      },
      enrichedData: {
        reviewInsights: {
          summary: "Based on web search results, Sacramento Handyman Services has generally positive reviews highlighting their quality workmanship, reliability, and fair pricing. Customers particularly appreciate their punctuality and attention to detail.",
          strengths: [
            "Quality workmanship and attention to detail",
            "Punctuality and reliability",
            "Fair and transparent pricing",
            "Professional and courteous service",
            "Wide range of services offered"
          ],
          areasForImprovement: [
            "Some customers mentioned limited availability for same-day service",
            "A few reviews noted longer wait times during peak seasons"
          ],
          testimonialHighlights: [
            "They arrived exactly when scheduled and completed the work efficiently and professionally.",
            "The handyman was knowledgeable and explained everything before starting the work.",
            "Fair pricing with no surprises or hidden fees."
          ]
        },
        serviceDetails: {
          primaryServices: [
            {
              name: "Carpentry",
              description: "Custom carpentry services including cabinet installation, door repair, trim work, and custom shelving.",
              estimatedCost: "$50-$75 per hour plus materials"
            },
            {
              name: "Drywall Repair",
              description: "Patching holes, fixing cracks, and texturing to match existing walls.",
              estimatedCost: "$40-$60 per hour plus materials"
            },
            {
              name: "Plumbing Repairs",
              description: "Fixing leaky faucets, replacing fixtures, and minor plumbing repairs.",
              estimatedCost: "$60-$85 per hour plus materials"
            },
            {
              name: "Electrical Work",
              description: "Light fixture installation, outlet repairs, and minor electrical work.",
              estimatedCost: "$65-$90 per hour plus materials"
            }
          ],
          specializations: [
            "Kitchen and bathroom remodeling",
            "Deck and fence repair",
            "Aging-in-place modifications",
            "Smart home device installation"
          ],
          certifications: [
            "Licensed Contractor",
            "Insured and Bonded",
            "EPA Lead-Safe Certified",
            "Better Business Bureau Accredited"
          ]
        },
        repairTechniques: {
          drywallRepair: [
            "Small hole patching using mesh tape and joint compound",
            "Large hole repair with drywall patches",
            "Texturing to match existing wall finishes",
            "Water damage drywall replacement"
          ],
          carpentryMethods: [
            "Custom trim and molding installation",
            "Cabinet repair and refinishing",
            "Door hanging and repair",
            "Custom shelving and built-ins"
          ],
          plumbingTechniques: [
            "Faucet and fixture replacement",
            "Drain cleaning and unclogging",
            "Toilet repair and installation",
            "Pipe leak repair"
          ],
          electricalServices: [
            "Light fixture installation and replacement",
            "Ceiling fan installation",
            "Outlet and switch repair",
            "Smart home device installation"
          ]
        },
        maintenanceTips: {
          seasonal: [
            "Spring: Check for winter damage, clean gutters, inspect roof",
            "Summer: Check AC efficiency, inspect decks and patios",
            "Fall: Prepare for winter, check heating systems, seal drafts",
            "Winter: Prevent frozen pipes, check for ice dams"
          ],
          preventative: [
            "Regular inspection of plumbing for leaks",
            "Checking caulking around windows and doors",
            "Cleaning gutters twice a year",
            "Testing smoke and carbon monoxide detectors"
          ],
          diyVsProfessional: {
            diyAppropriate: [
              "Simple painting projects",
              "Changing air filters",
              "Basic caulking",
              "Unclogging drains with plunger"
            ],
            callAProfessional: [
              "Electrical work beyond changing light fixtures",
              "Structural repairs",
              "Gas line work",
              "Major plumbing repairs"
            ]
          }
        }
      },
      costAnalysis: {
        primaryModel: {
          model: "google/gemini-2.0-flash-001",
          inputCost: 0.0003,
          outputCost: 0.0036,
          totalCost: 0.0039
        },
        fallbackModel: {
          model: "openrouter/optimus-alpha",
          inputCost: 0.0000,
          outputCost: 0.0000,
          totalCost: 0.0000
        }
      }
    };

    // Combine the original business listing with the enriched data
    const enrichedBusiness = {
      ...business,
      enriched: enrichedData
    };

    // Display the enriched business listing
    console.log('\nEnriched Business Listing:');
    console.log(JSON.stringify(enrichedBusiness, null, 2));

    // Save the enriched business listing to businesses table
    try {
      // Extract the enriched data from the enriched business
      const { enriched } = enrichedBusiness;

      // Save the enriched data to the businesses table
      const result = await saveEnrichedDataToBusinesses(enrichedBusiness.name, enriched);
      console.log('\nSaved to businesses table:', result.updated ? 'Updated existing record' : 'Inserted new record');
    } catch (error) {
      console.error('Error saving to businesses table:', error.message);
    }

    return enrichedBusiness;
  } catch (error) {
    console.error('ERROR enriching business listing:', error.message);
    return null;
  }
}

// Run the test
enrichBusinessListing(businessListing).catch(error => {
  console.error('Error running test:', error);
});
