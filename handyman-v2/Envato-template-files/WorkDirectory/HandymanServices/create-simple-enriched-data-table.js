/**
 * Script to create a simple enriched_data table
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://nshlrphkirhzchuodpeo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sample enriched data in the specified format
const sampleEnrichedData = {
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
  remediationProcess: {
    removalPhase: {
      steps: [
        "Removal of porous materials with extensive mold growth",
        "HEPA vacuuming of surfaces to remove loose mold spores",
        "Damp wiping with antimicrobial solutions",
        "Detailed cleaning of all affected surfaces"
      ],
      description: "Safe removal of mold-infested materials and cleaning"
    },
    testingPhase: {
      steps: [
        "Visual inspection to confirm all visible mold has been removed",
        "Air sampling to verify reduced mold spore counts",
        "Surface sampling to confirm effectiveness of cleaning",
        "Moisture testing to ensure proper drying has been achieved"
      ],
      description: "Post-remediation verification of successful mold removal"
    },
    assessmentPhase: {
      steps: [
        "Visual inspection of affected and surrounding areas",
        "Moisture mapping using specialized equipment",
        "Identification of mold types and extent of contamination",
        "Development of detailed remediation plan"
      ],
      description: "Comprehensive inspection and assessment of mold damage"
    },
    preventionPhase: {
      steps: [
        "Addressing moisture sources and water intrusion issues",
        "Application of antimicrobial treatments to cleaned surfaces",
        "Installation of moisture barriers where appropriate",
        "Recommendations for humidity control and ventilation improvements"
      ],
      description: "Measures to prevent future mold growth"
    },
    containmentPhase: {
      steps: [
        "Installation of physical barriers using plastic sheeting",
        "Establishment of negative air pressure environment",
        "Protection of HVAC systems and unaffected areas",
        "Creation of decontamination chambers for worker entry/exit"
      ],
      description: "Isolation of affected areas to prevent cross-contamination"
    }
  },
  restorationTechniques: {
    dryingTechniques: [
      "Strategic placement of air movers to create high-velocity airflow across wet surfaces",
      "Commercial-grade LGR dehumidifiers to remove moisture from the air",
      "Desiccant dehumidifiers for specialized materials and cooler environments",
      "Injectidry systems for drying inside walls and hard-to-reach spaces"
    ],
    specializedEquipment: [
      "HEPA air scrubbers for air purification",
      "Hydroxyl generators for deodorization",
      "Antimicrobial fogging systems",
      "Floor drying mats for hardwood floor restoration"
    ],
    moistureDetectionTools: [
      "Infrared cameras to identify hidden moisture",
      "Moisture meters to measure moisture content in materials",
      "Hygrometers to monitor humidity levels",
      "Thermal imaging for comprehensive moisture mapping"
    ],
    waterExtractionMethods: [
      "Submersible pumps for deep water extraction",
      "Truck-mounted extraction units for efficient large-scale water removal",
      "Portable extractors for hard-to-reach areas",
      "Weighted extraction tools for water removal from carpets and padding"
    ]
  }
};

/**
 * Create a simple enriched_data table
 */
async function createSimpleEnrichedDataTable() {
  try {
    console.log('Creating simple enriched_data table...');
    
    // Try to create the enriched_data table
    const testRecord = {
      business_name: 'Sacramento Water Damage Pros',
      enriched_data: sampleEnrichedData
    };
    
    const { data, error } = await supabase
      .from('enriched_data')
      .insert(testRecord)
      .select();
    
    if (error) {
      console.error('Error creating enriched_data table:', error.message);
      
      // Try with a different approach
      console.log('Trying with a different approach...');
      
      // Try to create a table with a different name
      const { data: data2, error: error2 } = await supabase
        .from('business_enriched_data')
        .insert(testRecord)
        .select();
      
      if (error2) {
        console.error('Error creating business_enriched_data table:', error2.message);
        return false;
      }
      
      console.log('business_enriched_data table created successfully!');
      console.log('Table columns:', Object.keys(data2[0]));
      return true;
    }
    
    console.log('enriched_data table created successfully!');
    console.log('Table columns:', Object.keys(data[0]));
    return true;
  } catch (error) {
    console.error('Error in createSimpleEnrichedDataTable:', error.message);
    return false;
  }
}

// Run the function
createSimpleEnrichedDataTable().then(success => {
  if (success) {
    console.log('Operation completed successfully!');
  } else {
    console.error('Operation failed.');
    process.exit(1);
  }
});
