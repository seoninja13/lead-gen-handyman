/**
 * Script to test saving enriched data to the businesses table
 */

const { saveEnrichedDataToBusinesses } = require('./utils/saveEnrichedDataToBusinesses');

// Sample business name
const businessName = 'Sacramento Water Damage Pros';

// Sample enriched data in the specified format
const enrichedData = {
  reviewInsights: {
    summary: "Based on web search results, this business has generally positive reviews highlighting their quick response times, professional service, and thorough work. Customers particularly appreciate their 24/7 availability for emergency situations and transparent pricing.",
    strengths: [
      "Fast response times in emergency situations",
      "Professional and knowledgeable technicians",
      "Thorough water extraction and drying processes",
      "Clear communication throughout the restoration process",
      "Transparent pricing with no hidden fees"
    ],
    areasForImprovement: [
      "Some customers mentioned scheduling challenges for non-emergency services",
      "A few reviews noted higher pricing compared to competitors"
    ],
    testimonialHighlights: [
      "They arrived within 30 minutes of my call and immediately got to work extracting water from my flooded basement.",
      "The technicians were extremely knowledgeable and explained every step of the process.",
      "Their mold remediation service was thorough and they provided documentation of all work completed."
    ]
  },
  serviceDetails: {
    certifications: [
      "IICRC Certified Firm",
      "EPA Lead-Safe Certified",
      "Applied Structural Drying Technicians",
      "Water Damage Restoration Technicians"
    ],
    primaryServices: [
      {
        name: "Emergency Water Extraction",
        description: "24/7 emergency service using industrial-grade pumps and extraction equipment to remove standing water quickly and efficiently.",
        estimatedCost: "$500-$1,500 depending on affected area size"
      },
      {
        name: "Structural Drying",
        description: "Complete drying of affected areas using professional air movers, dehumidifiers, and moisture monitoring equipment.",
        estimatedCost: "$1,000-$2,500 depending on scope"
      },
      {
        name: "Mold Remediation",
        description: "Comprehensive mold detection, containment, removal, and prevention services with antimicrobial treatments.",
        estimatedCost: "$1,500-$5,000 depending on severity"
      },
      {
        name: "Fire and Smoke Damage Restoration",
        description: "Cleaning, deodorizing, and restoring properties affected by fire and smoke damage.",
        estimatedCost: "$3,000-$10,000 depending on damage extent"
      }
    ],
    specializations: [
      "Basement flooding recovery",
      "Sewage backup cleanup",
      "Storm damage restoration",
      "Commercial water damage services"
    ]
  },
  restorationTechniques: {
    waterExtractionMethods: [
      "Submersible pumps for deep water extraction",
      "Truck-mounted extraction units for efficient large-scale water removal",
      "Portable extractors for hard-to-reach areas",
      "Weighted extraction tools for water removal from carpets and padding"
    ],
    dryingTechniques: [
      "Strategic placement of air movers to create high-velocity airflow across wet surfaces",
      "Commercial-grade LGR dehumidifiers to remove moisture from the air",
      "Desiccant dehumidifiers for specialized materials and cooler environments",
      "Injectidry systems for drying inside walls and hard-to-reach spaces"
    ],
    moistureDetectionTools: [
      "Infrared cameras to identify hidden moisture",
      "Moisture meters to measure moisture content in materials",
      "Hygrometers to monitor humidity levels",
      "Thermal imaging for comprehensive moisture mapping"
    ],
    specializedEquipment: [
      "HEPA air scrubbers for air purification",
      "Hydroxyl generators for deodorization",
      "Antimicrobial fogging systems",
      "Floor drying mats for hardwood floor restoration"
    ]
  },
  remediationProcess: {
    assessmentPhase: {
      description: "Comprehensive inspection and assessment of mold damage",
      steps: [
        "Visual inspection of affected and surrounding areas",
        "Moisture mapping using specialized equipment",
        "Identification of mold types and extent of contamination",
        "Development of detailed remediation plan"
      ]
    },
    containmentPhase: {
      description: "Isolation of affected areas to prevent cross-contamination",
      steps: [
        "Installation of physical barriers using plastic sheeting",
        "Establishment of negative air pressure environment",
        "Protection of HVAC systems and unaffected areas",
        "Creation of decontamination chambers for worker entry/exit"
      ]
    },
    removalPhase: {
      description: "Safe removal of mold-infested materials and cleaning",
      steps: [
        "Removal of porous materials with extensive mold growth",
        "HEPA vacuuming of surfaces to remove loose mold spores",
        "Damp wiping with antimicrobial solutions",
        "Detailed cleaning of all affected surfaces"
      ]
    },
    preventionPhase: {
      description: "Measures to prevent future mold growth",
      steps: [
        "Addressing moisture sources and water intrusion issues",
        "Application of antimicrobial treatments to cleaned surfaces",
        "Installation of moisture barriers where appropriate",
        "Recommendations for humidity control and ventilation improvements"
      ]
    },
    testingPhase: {
      description: "Post-remediation verification of successful mold removal",
      steps: [
        "Visual inspection to confirm all visible mold has been removed",
        "Air sampling to verify reduced mold spore counts",
        "Surface sampling to confirm effectiveness of cleaning",
        "Moisture testing to ensure proper drying has been achieved"
      ]
    }
  }
};

async function testSaveToBusinesses() {
  try {
    console.log('Testing saving enriched data to businesses table...');
    
    const result = await saveEnrichedDataToBusinesses(businessName, enrichedData);
    
    console.log('Enriched data saved successfully to businesses table!');
    console.log('Result:', result.updated ? 'Updated existing record' : 'Inserted new record');
  } catch (error) {
    console.error('Error testing save enriched data to businesses table:', error);
  }
}

// Run the function
testSaveToBusinesses();
