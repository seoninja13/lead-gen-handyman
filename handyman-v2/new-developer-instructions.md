# Instructions for New Developers

Welcome to the Handyman v2 project! This document will guide you through the initial setup and provide an overview of the project's architecture and key components.

## Getting Started

1.  **Read this file (`new-developer-instructions.md`).**
2.  **Read `project-requirements.md`:** This file outlines the overall project requirements and goals.
3.  **Read `handyman-v2/documentation/handyman-v2-documentation.md`:** This file provides a comprehensive overview of the project's architecture, data model, SEO strategy, UI/UX design, and technical implementation details.
4.  **Review `NEXT_STEPS.md`:** This file outlines the immediate next steps and progress, giving you a clear understanding of what needs to be done next.
5.  **Clone the repository:** Clone the project repository to your local machine.
6.  **Install dependencies:** ✓ DONE Navigate to the `handyman-v2/Envato-template-files/themeforest-findhouse-real-estate-react-nextjs-template/findhouse` directory and run `yarn install` to install the project dependencies.
7.  **Configure environment variables:** Create a `.env.local` file in the `findhouse` directory and add the necessary environment variables, including the Supabase URL and API key.
8.  **Run the development server:** Run `yarn dev` to start the development server.
9.  **Access the application:** Access the application in your browser at `http://localhost:3000`.

## Project Overview

The Handyman v2 project aims to create a website for handyman services based on the FindHouse real estate template. The project will utilize Next.js for the frontend, Supabase for the backend database, and potentially OpenAI for content generation.

## Key Files and Directories

*   `handyman-v1`: Contains the original Handyman v1 project, this is just for comparisson. and not to be use din live project.
*   `handyman-v2`: Contains the new Handyman v2 project.
    *   `handyman-v2/Envato-template-files/themeforest-fdkNKA8O-findhouse-real-estate-react-nextjs-template/findhouse`: Contains the Next.js application based on the FindHouse template.
        *   `data/properties.js`: Contains data for the handyman services listings.
        *   `data/findServices.js`: Contains data for the handyman service categories.
        *   `components/common/GlobalFilter.jsx`: Contains the global filter component. The keyword input and service category dropdown have been updated for handyman services.
        *   `components/home/FeaturedServices.jsx`: Contains the Featured Services component for the home page.
        *   `components/home/FindServices.jsx`: Contains the Find Services component for the home page.
    *   `handyman-v2/documentation/handyman-v2-documentation.md`: Central documentation hub.
*   `NEXT_STEPS.md`: Tracks immediate next steps and progress.
*   `project-requirements.md`: Outlines overall project requirements.

## Conversion Process
1. Review [CONVERSION_GUIDELINES.md](cci:7://file:///C:/Users/IvoD/repos/lead-gen-handyman/handyman-v2/CONVERSION_GUIDELINES.md)
2. Follow image replacement protocols

By following these instructions, you should be well-equipped to start contributing to the Handyman v2 project.
