export const businesses = [
  {
    id: "handyman-pro",
    name: "Handyman Pro Services",
    owner: {
      name: "John Smith",
      title: "Owner & Master Craftsman",
      image: "/assets/images/team/owner.jpg"
    },
    rating: 4.9,
    reviewCount: 120,
    address: "1421 San Pedro St, Los Angeles, CA 90015",
    phone: "(213) 555-0123",
    email: "info@handymanpro.com",
    experience: "20+ Years",
    projectsCompleted: "1000+",
    satisfaction: "95%",
    description: `Handyman Pro Services is your trusted partner for all home repair and
    maintenance needs. With over 20 years of experience, our licensed and
    insured professionals deliver exceptional craftsmanship and reliable
    service to homeowners and businesses throughout Los Angeles.
    
    Our comprehensive range of services includes carpentry, plumbing,
    electrical work, painting, and general repairs. We take pride in our
    attention to detail, timely service, and commitment to customer
    satisfaction.`,
    services: [
      "Carpentry & Woodworking",
      "Electrical Repairs",
      "Plumbing Services",
      "Painting & Drywall",
      "Home Maintenance",
      "Emergency Repairs"
    ],
    hours: {
      "Monday - Friday": "8:00 AM - 6:00 PM",
      "Saturday": "9:00 AM - 5:00 PM",
      "Sunday": "Closed",
      "Emergency Service": "24/7"
    },
    serviceAreas: [
      "Downtown Los Angeles",
      "South LA",
      "East Los Angeles",
      "West LA",
      "San Fernando Valley"
    ],
    credentials: {
      licenses: [
        {
          name: "California Contractors State License",
          number: "#123456"
        },
        {
          name: "Master Electrician License",
          number: "#EL789"
        }
      ],
      certifications: [
        "EPA Lead-Safe Certified",
        "OSHA Safety Certified",
        "Green Building Professional"
      ],
      insurance: [
        "General Liability Insurance: $2M",
        "Workers Compensation Insurance"
      ]
    },
    gallery: [
      {
        image: "/assets/images/property/business1.jpg",
        title: "Workshop Overview"
      },
      {
        image: "/assets/images/property/business2.jpg",
        title: "Project in Progress"
      },
      {
        image: "/assets/images/property/business3.jpg",
        title: "Completed Work"
      }
    ],
    pastProjects: [
      {
        image: "/assets/images/property/project1.jpg",
        title: "Kitchen Remodeling",
        description: "Complete kitchen renovation with custom cabinets"
      },
      {
        image: "/assets/images/property/project2.jpg",
        title: "Bathroom Renovation",
        description: "Modern bathroom update with new fixtures"
      }
    ]
  }
];
