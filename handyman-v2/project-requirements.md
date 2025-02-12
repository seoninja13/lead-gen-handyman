# Handyman v2 Project Requirements (using FindHouse Template)

## Overview

This document outlines the requirements for the Handyman v2 project, which is based on the FindHouse real estate React/Next.js template. The goal is to adapt this template for a handyman services website, integrate Supabase for database operations, and potentially connect to OpenAI for features like enriched content generation.

## Project Structure

### 1. Core Architecture

-   **Framework:** Next.js (from FindHouse template)
-   **UI Libraries:**
    -   TailwindCSS (from FindHouse template)
    -   Any other UI components included in the FindHouse template
-   **Database:** Supabase
-   **Deployment:** Netlify (to be determined)

### 2. Website Structure (Initial - To be adapted from FindHouse)

The initial website structure will be based on the FindHouse template. This structure will need to be adapted to suit the needs of a handyman services website. Details will be added as the project progresses.

## Project Phases

### Phase 1: Run the Existing FindHouse Application

1.  **Explore Project:** Briefly explore the `@handyman-v2/Envato-template-files/themeforest-findhouse-real-estate-react-nextjs-template` directory to understand the basic structure.
2.  **Read Documentation:** Check for any README or documentation files in the `findhouse` directory or its parent `documentation` directory for setup instructions.
3.  **Install Dependencies:** Run `npm install` in the `findhouse` directory to install project dependencies.
4.  **Run in Development Mode:** Use `npm run dev` to start the FindHouse application locally.
5.  **Verify Application:** Access the application in your browser (likely at `http://localhost:3000` or `http://localhost:3001` if port 3000 is in use) and ensure the base FindHouse template is running correctly without errors.

### Phase 2: Integrate Supabase

1.  **Database Setup:** Define and set up the Supabase database schema for Handyman v2.
2.  **Supabase Client:** Integrate the Supabase client into the application.
3.  **Implement Basic CRUD:** Implement basic CRUD operations (like the `Todos` example) to test the Supabase connection.

### Phase 3: Integrate OpenAI and Generate Content

1.  **OpenAI Client:** Integrate the OpenAI API client.
2.  **Content Generation Functions:** Create functions to generate content using OpenAI.
3.  **Dynamic Content Integration:** Integrate OpenAI-generated content into the FindHouse template.

### Phase 4: Template Adaptation and Customization

1.  **Replace Placeholder Content:** Replace FindHouse template content with Handyman-specific content.
2.  **UI/UX Customization:** Customize the UI/UX for the Handyman service.
3.  **SEO Optimization:** Implement SEO best practices.

## Future Steps (Detailed Breakdown within Phases)

-   **Define Data Model:** (Phase 2)
    -   Determine the necessary tables and relationships for `businesses`, `cities`, `services`, etc.
-   **Implement CRUD for Core Entities:** (Phase 2 & 3)
    -   Create, read, update, and delete operations for core entities in Supabase.
-   **OpenAI Integration:** (Phase 3)
    -   Explore and implement OpenAI integration for content generation.
-   **SEO Optimization:** (Phase 4)
    -   Implement SEO best practices throughout the application.
-   **Adapt FindHouse Template:** (Phase 4)
    -   Replace placeholder content and customize UI/UX.

## SEO Requirements
- [URL Structure](cci:7://file:///C:/Users/IvoD/repos/lead-gen-handyman/handyman-v2/documentation/seo-mapping.md)
- Meta tag conventions

## Documentation Structure
```mermaid
graph TD
    A[project-requirements.md] --> B[CONVERSION_GUIDELINES.md]
    A --> C[new-developer-instructions.md]
    A --> D[@tracking-progress.md]
    B --> E[Image Replacement Protocol]
    C --> F[Setup Instructions]
    D --> G[Component Conversion Log]
```
- [Conversion Guidelines](cci:7://file:///C:/Users/IvoD/repos/lead-gen-handyman/handyman-v2/CONVERSION_GUIDELINES.md)
- [Developer Instructions](cci:7://file:///C:/Users/IvoD/repos/lead-gen-handyman/handyman-v2/new-developer-instructions.md)
- [Edge Cases](cci:7://file:///C:/Users/IvoD/repos/lead-gen-handyman/handyman-v2/documentation/edge-cases.md)
- [Implementation Examples](cci:7://file:///C:/Users/IvoD/repos/lead-gen-handyman/handyman-v2/documentation/implementation-examples.md)
- [SEO Audits](cci:7://file:///C:/Users/IvoD/repos/lead-gen-handyman/handyman-v2/documentation/seo-audit.md)

## Project Documentation

-   This file (`project-requirements.md`) will serve as the main entry point for project requirements.
-   `NEXT_STEPS.md` will track the immediate next steps and progress.

## Getting Started

1.  Review this file (`project-requirements.md`).
2.  Review `NEXT_STEPS.md`.
3.  Familiarize yourself with the FindHouse template structure.
4.  Start with the "Immediate Steps" outlined above.

**Important Notes:**

*   The `handyman-v2/Envato-template-files/Original template files-do-not-edit` directory contains the original FindHouse template files. These files should **not** be directly edited.
*   This directory is provided for reference purposes only, to help understand the original template structure and styling.
*   When making changes to the Handyman v2 project, always work within the `handyman-v2/Envato-template-files/themeforest-findhouse-real-estate-react-nextjs-template/findhouse` directory.
