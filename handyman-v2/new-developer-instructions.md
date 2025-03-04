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

## Current CSS Issues and Troubleshooting

We're currently experiencing issues with CSS styling in the project. Here's what you need to know:

1. **CSS Integration Approach**:
   - We've created a script (`scripts/copy-template-css.js`) that copies CSS and font files from the original Envato template to the project
   - We've updated the `_app.js` file to import the template's CSS files
   - We've added SCSS support by installing the `sass` package
   - We've created an `index.scss` file that imports all necessary CSS files

2. **Current Issues**:
   - Some CSS styles are not being applied correctly
   - Font files might not be loading properly
   - The layout doesn't match the original template exactly

3. **Troubleshooting Steps**:
   - Compare the working HandymanServices template with our implementation
   - Check the CSS import order in `_app.js` and `index.scss`
   - Verify that all font files are correctly copied and referenced
   - Inspect the browser's developer tools to identify missing or conflicting styles
   - Consider using the `_document.js` approach to include CSS files directly in the HTML head

4. **Reference Implementation**:
   - The original HandymanServices template in `Envato-template-files/themeforest-findhouse-real-estate-react-nextjs-template/HandymanServices` is working correctly
   - Use this as a reference for CSS structure and implementation

## Conversion Process
1. Review [CONVERSION_GUIDELINES.md](cci:7://file:///C:/Users/IvoD/repos/lead-gen-handyman/handyman-v2/CONVERSION_GUIDELINES.md)
2. Follow image replacement protocols

## Next Steps

1. **Fix CSS Issues**:
   - Complete the CSS integration by resolving the remaining styling issues
   - Ensure all font files are correctly referenced and accessible

2. **Component Implementation**:
   - Implement HeaderMenuContent.jsx
   - Update MobileMenu.jsx to match the template
   - Test the application to ensure it renders correctly

3. **MCP Integration**:
   - Integrate the MCP functionality from the 03-03-AddPSEOEnrichment branch
   - Focus on MCP Configuration, Utility Functions, and Components

By following these instructions, you should be well-equipped to start contributing to the Handyman v2 project.
