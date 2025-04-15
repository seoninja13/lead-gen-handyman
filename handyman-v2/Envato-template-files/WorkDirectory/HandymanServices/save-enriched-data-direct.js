/**
 * Script to save enriched data directly to the businesses table
 */

const { saveEnrichedDataToBusinesses } = require('./utils/saveEnrichedDataToBusinesses');

// Sample enriched data from test-enrichment.js
const enrichedData = {
  timestamp: new Date().toISOString(),
  source: "OpenRouter Web Search",
  searchQueries: [
    "Sacramento Handyman Services reviews",
    "Sacramento Handyman Services services",
    "handyman services Sacramento",
    "home repair techniques Sacramento"
  ],
  modelUsage: {
    primaryModel: {
      name: "google/gemini-2.0-flash-001",
      usageCount: 4
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

// Business name
const businessName = "Sacramento Handyman Services";

// Save the enriched data to the businesses table
async function saveEnrichedData() {
  try {
    console.log(`Saving enriched data for ${businessName} to businesses table...`);
    
    // Save the enriched data to the businesses table
    const result = await saveEnrichedDataToBusinesses(businessName, enrichedData);
    
    console.log(`Saved to businesses table: ${result.updated ? 'Updated existing record' : 'Inserted new record'}`);
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error saving to businesses table:', error.message);
  }
}

// Run the function
saveEnrichedData();
