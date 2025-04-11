# Architecture Overview

This document provides a comprehensive overview of the Handyman Lead Generation Project's architecture, including system components, data flow, and design patterns.

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Database Schema](#database-schema)
- [Integration Points](#integration-points)
- [Security Architecture](#security-architecture)
- [Performance Considerations](#performance-considerations)

## System Overview

The Handyman Lead Generation Project is built as a Next.js application with the following key architectural components:

1. **Frontend Layer**: React components and pages built with Next.js
2. **API Layer**: Next.js API routes for server-side operations
3. **Data Layer**: Supabase (PostgreSQL) for data storage
4. **Integration Layer**: MCP servers for third-party service integration
5. **Authentication Layer**: Supabase Auth for user authentication

### High-Level Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client Browser │────▶│  Next.js App    │────▶│  Supabase       │
│                 │     │                 │     │  (PostgreSQL)   │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  MCP Servers    │
                        │  - Google Maps  │
                        │  - Perplexity   │
                        │  - Gemini       │
                        └─────────────────┘
```

## Component Architecture

The application follows a component-based architecture with the following structure:

### Page Components

- Located in the `pages/` directory
- Represent complete views/screens
- Handle routing and data fetching
- Compose smaller components

### UI Components

- Located in the `components/` directory
- Reusable UI elements
- Follow atomic design principles:
  - Atoms: Basic UI elements (buttons, inputs)
  - Molecules: Groups of atoms (form fields, cards)
  - Organisms: Complex UI sections (headers, search forms)
  - Templates: Page layouts

### Service Components

- Located in the `services/` directory
- Handle business logic and API interactions
- Provide data to UI components

## Data Flow

The application follows a unidirectional data flow pattern:

1. **User Interaction**: User interacts with UI components
2. **Action Dispatch**: Components dispatch actions/requests
3. **Data Fetching**: Services fetch data from APIs or Supabase
4. **State Update**: Component state is updated with new data
5. **UI Rendering**: Components re-render with updated state

### API Request Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │     │             │
│  Component  │────▶│  Service    │────▶│  API Route  │────▶│  Database   │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       ▲                                                           │
       │                                                           │
       └───────────────────────────────────────────────────────────┘
```

## Database Schema

The application uses Supabase (PostgreSQL) with the following main tables:

- **users**: User accounts and profiles
- **services**: Handyman service categories
- **providers**: Service provider information
- **listings**: Service listings
- **reviews**: User reviews for services
- **bookings**: Service booking information
- **test-delete**: Test table for CRUD operations

For detailed schema information, see the [Database Documentation](../database/README.md).

## Integration Points

The application integrates with several external services:

### Google Maps MCP Server

- Provides location-based services
- Geocoding for address lookup
- Maps visualization

### Perplexity MCP Server

- Enriches listings with additional information
- Provides AI-powered content generation
- Answers user queries about services

### Google Gemini MCP Server

- Alternative AI service for content generation
- Used for service description enhancement
- Provides intelligent search capabilities

## Security Architecture

The application implements several security measures:

1. **Authentication**: Supabase Auth for user authentication
2. **Authorization**: Row-level security in Supabase
3. **API Security**: Environment variables for API keys
4. **Data Validation**: Input validation on both client and server
5. **CORS Protection**: Configured in Next.js API routes

## Performance Considerations

The application is optimized for performance through:

1. **Static Generation**: Pre-rendering pages at build time
2. **Incremental Static Regeneration**: Updating static pages after deployment
3. **Image Optimization**: Next.js Image component for optimized images
4. **Code Splitting**: Automatic code splitting by Next.js
5. **Caching**: API response caching where appropriate
6. **Lazy Loading**: Components and data loaded only when needed

## ⏭️ Next Steps

Continue following our [Official Documentation Path](../documentation-path.md):

1. **[Task Tracking System](../task-tracking.md)**
   - Understand how we track and manage tasks
   - Learn how to update task status
   - Find tasks appropriate for your skill level

Refer to the [Documentation Path](../documentation-path.md) file for the complete documentation sequence.

### Additional Architecture Details

For more detailed information on specific components, see the following documentation:

- [Frontend Architecture](./frontend-architecture.md)
- [API Architecture](./api-architecture.md)
- [Database Schema](../database/schema.md)
- [Integration Architecture](./integration-architecture.md)
