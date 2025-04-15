# Handyman Services Documentation

Welcome to the Handyman Services documentation. This is the main entry point for all documentation related to the project.

## Documentation Structure

This documentation follows a pyramid structure with a single entry point (this file) that branches out to more specific documentation:

1. **Project Overview** - High-level overview of the project
2. **Technical Architecture** - System architecture and components
3. **Feature Documentation** - Detailed documentation for specific features
4. **Implementation Guides** - Step-by-step guides for implementing features
5. **API Reference** - API documentation and usage examples

## Quick Links

- [Project Requirements](./project-requirements.md)
- [Technical Architecture](./technical-architecture.md)
- [Enriched Data Format](./enriched-data-format.md)
- [Code Changes for Enriched Data](./code-changes-for-enriched-data.md)
- [Next Steps](./next-steps.md)

## Project Overview

Handyman Services is a web application that connects users with handyman service providers. The application allows users to search for handyman services, view service details, and contact service providers.

### Key Features

- **Service Provider Listings** - Browse and search for handyman service providers
- **Enriched Business Data** - Detailed information about service providers
- **Search Functionality** - Find service providers by location, service type, etc.
- **Contact Forms** - Contact service providers directly through the application

## Technical Architecture

The application is built using the following technologies:

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Supabase
- **External Services**: OpenRouter API, Google Maps API

### Component Overview

- **MCP Servers** - Microservices for integrating with external APIs
- **Supabase Database** - Storage for application data
- **Next.js Application** - Frontend and backend application code

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository
2. Install dependencies with `yarn install`
3. Start the development server with `yarn dev`
4. Access the application at `http://localhost:3000`

## Next Steps

For detailed information about planned future enhancements, refer to the [Next Steps](./next-steps.md) documentation. This includes:

1. **Save Enriched Data from OpenRouter Web Search to Supabase Database**
   - Implement a robust solution to store enriched business data from OpenRouter web searches directly in the Supabase database
   - Create a scheduled job to periodically update the enriched data for all businesses
   - Add admin interface for manually triggering enrichment for specific businesses

2. **Enhance User Interface for Displaying Enriched Data**
   - Create dedicated components for displaying different sections of the enriched data
   - Implement a tabbed interface for navigating between different sections

3. **Implement Analytics for Enrichment Process**
   - Track API usage and costs
   - Monitor enrichment success rates

For more detailed information about these and other planned enhancements, see the [Next Steps](./next-steps.md) document.
