AI Agent Instructions for Handyman Website Development

Overview

This document provides detailed instructions for building a programmatically generated handyman website for Placerville, California, and the greater Sacramento area. The website should be optimized for SEO, dynamically structured, and built efficiently using Next.js and AI-assisted content generation.

Website Structure

1. Home Page (placervillehandyman.us)

Purpose: Serves as the primary landing page.

Content:

3000+ words of SEO-optimized content.

4-5 embedded videos.

FAQ section with schema markup.

Internal contextual links to all Tier 2 "Handyman Category" pages.

2. Handyman Category Pages (Tier 2)

Dedicated pages for each handyman service:

Gutter cleaning

Door repair

Furniture assembly

Ceiling fan installation

Drywall repair, etc.

Each page includes:

1500-2000 words of unique, SEO-rich content.

Internal links to the homepage and relevant Tier 3 pages.

1-3 external authority links (e.g., Wikipedia, industry articles).

3. Handyman Category + City Pages (Tier 3)

Dynamically generated pages for every handyman category in every city in the Sacramento area.

Example URLs:

gutter-cleaning-north-highlands-ca

door-repair-sacramento-ca

tile-installation-roseville-ca

Content:

Unique, city-specific details.

2-5 internal links (10% to homepage, 50% to Tier 2, rest to other Tier 3 pages).

SEO Strategy

Internal Linking:

Homepage → Tier 2 pages (contextually linked).

Tier 2 pages → Relevant Tier 3 pages.

Tier 3 pages → Internal contextual linking (2-5 links per page).

External Linking:

1-3 external links per Tier 2 & Tier 3 page (authoritative sources only).

Programmatic SEO:

Auto-generate meta titles, descriptions, H1, H2, and tags.

AI-generated category tags with dynamic sub-pages.

Technical Implementation

Tech Stack:

Framework: Next.js 14.2.23

UI Libraries: TailwindCSS, ShadCN

SSR & ISR: Implement Incremental Static Regeneration (ISR) for fast updates.

Data Handling:

Read CSV file (handyman-categories-cities.csv).

Generate JSON files dynamically in /data folder.

Automate JSON generation using AI (gpt-4o-mini).

Build Process:

Run npm run generate-data to create JSON files.

Build the website using npm run build.

Sitemap Optimization:

Divide sitemaps into separate files (2500 URLs each).

Generate a sitemap index for better indexing (e.g., /gutter-cleaning/, /door-repair/).

Programmatic Page Generation

Server-Side Rendering (SSR) ensures optimized performance with caching strategies.

Use <index_page_examples> to determine which pages need to be generated dynamically.

Use <csv_data> to create JSON files for programmatic page creation.

ISR Implementation: Ensures quick rebuilds when new data is added.

Maximize build efficiency to avoid Next.js timeouts.

Ensure modular architecture for scalability and maintainability.

Index Page Generation Examples

/service/[service]/
Examples:
/service/gutter-cleaning/
/service/door-repair/
/service/drywall-repair/

/location/[city]/
Examples:
/location/sacramento/
/location/folsom/
/location/roseville/

/service/[service]-[city]/
Examples:
/service/gutter-cleaning-sacramento/
/service/door-repair-roseville/
/service/tile-installation-folsom/

AI Integration for Content Generation

Use AI (gpt-4o-mini) to:

Generate structured, engaging handyman service descriptions.

Populate JSON files dynamically.

Automate the generation of category tags and meta information.

Batch Processing Strategy:

Optimize AI API calls by batching requests efficiently.

Use caching and rate limiting to ensure smooth processing.

Code and Development Best Practices

Create icons and SVGs as needed.

Avoid using the /src directory.

Provide file paths in comments for generated code.

Be mindful of TypeScript errors.

Handle null API responses gracefully.

Ensure generated static parameters are properly structured.

Implement detailed error logging and monitoring.

Summary

Fully automated content generation using AI and programmatic SEO.

Efficient website structure to maximize search engine ranking.

Scalable and modular implementation with JSON-based data handling.

Optimized internal linking strategy to enhance website authority and ranking.

Comprehensive error logging and build process monitoring.

This document serves as a blueprint for building a high-ranking handyman website that leverages automation, AI, and best SEO practices.

