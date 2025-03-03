# AI Agent Instructions for Handyman Website Development

## **Overview**

This document provides detailed instructions for building a programmatically generated handyman website. The website should be optimized for SEO, dynamically structured, and built efficiently using **Next.js 14.2.23**, **ShadCN**, **Tailwind CSS**, and AI-assisted content generation. The site will be **statically generated**, deployed using **Netlify**, and structured for **maximum efficiency**.

---

## **Development Approach**

### **1. Core Strategy**
- **Server-Side Rendering (SSR)**: Optimize data fetching and caching to prevent excessive API calls.
- **Programmatic Content Generation**: Generate index pages, sub-index pages, and individual pages dynamically based on CSV data.
- **Structured Data Storage**: Convert CSV data into JSON files for generating the website content.
- **SEO Optimization**: Implement automated **meta titles, descriptions, H1 tags, H2 tags**, and sitemap generation.
- **Performance Optimization**: Use **Incremental Static Regeneration (ISR)** for quick updates without full site rebuilds.
- **AI Integration**: Use **gpt-4o-mini** for content generation and automation.

---

## **Website Structure**

### **1. Home Page**
- URL: `/`
- **Content:**
  - 3000+ words of SEO-optimized content.
  - 4-5 embedded videos.
  - FAQ section with schema markup.
  - Internal contextual links to all Tier 2 "Handyman Category" pages.

### **2. Handyman Category Pages (Tier 2)**
- Dedicated pages for each handyman service:
  - Gutter cleaning
  - Door repair
  - Furniture assembly
  - Ceiling fan installation
  - Drywall repair, etc.
- **Each page includes:**
  - 1500-2000 words of unique, SEO-rich content.
  - Internal links to the homepage and relevant Tier 3 pages.
  - 1-3 external authority links (e.g., Wikipedia, industry articles).

### **3. Handyman Category + City Pages (Tier 3)**
- Dynamically generated pages for every handyman category in every city in the Sacramento area.
- **Example URLs:**
  - `/service/gutter-cleaning-sacramento/`
  - `/service/door-repair-roseville/`
  - `/service/tile-installation-folsom/`
- **Content:**
  - Unique, city-specific details.
  - 2-5 internal links (10% to homepage, 50% to Tier 2, rest to other Tier 3 pages).

---

## **SEO Strategy**

### **Internal Linking:**
- Homepage → Tier 2 pages (contextually linked).
- Tier 2 pages → Relevant Tier 3 pages.
- Tier 3 pages → Internal contextual linking (2-5 links per page).

### **External Linking:**
- 1-3 external links per Tier 2 & Tier 3 page (authoritative sources only).

### **Programmatic SEO:**
- Auto-generate **meta titles, descriptions, H1, H2, and tags**.
- AI-generated category tags with dynamic sub-pages.

---

## **Technical Implementation**

### **Tech Stack:**
- **Framework**: Next.js 14.2.23
- **UI Libraries**: TailwindCSS, ShadCN
- **SSR & ISR**: Implement Incremental Static Regeneration (ISR) for fast updates.

### **Data Handling:**
- Read CSV file (`handyman-categories-cities.csv`).
- Generate JSON files dynamically in `/data` folder.
- Automate JSON generation using AI (`gpt-4o-mini`).

### **Build Process:**
- Run `npm run generate-data` to create JSON files.
- Build the website using `npm run build`.

### **Sitemap Optimization:**
- Divide sitemaps into separate files (2500 URLs each).
- Generate a sitemap index for better indexing.

---

## **Programmatic Page Generation**

### **Index Page Generation Examples**

#### **a. Index Pages (Category Listings)**
- `/services/[type]/` → e.g., `/services/bathroom-remodeling/`
- `/location/[city]/` → e.g., `/location/san-diego/`
- `/contractors/[contractor-name]/` → e.g., `/contractors/italia1construction/`
- `/rebates/[state]/[city]/` → e.g., `/rebates/ca/san-diego/`
- `/guides/[topic]/` → e.g., `/guides/how-to-find-a-contractor/`

#### **b. Individual Contractor Pages**
- Each contractor gets a unique dynamically generated page, including:
  - Name, services, years of experience, certifications
  - Location-based SEO content
  - Customer reviews

### **AI Integration for Content Generation**
- **Use AI (`gpt-4o-mini`) to:**
  - Generate structured, engaging handyman service descriptions.
  - Populate JSON files dynamically.
  - Automate the generation of category tags and meta information.

### **Batch Processing Strategy:**
- Optimize AI API calls by batching requests efficiently.
- Use caching and rate limiting to ensure smooth processing.

---

## **Error Handling & Logging**
- **Typescript Errors**: Ensure robust error handling for null or malformed API responses.
- **Console Logs**: Implement detailed logging to track build progress.
- **API Call Optimization**: Utilize rate limits efficiently (e.g., OpenAI's 500 calls per minute limit).

---

## **Example Code Snippet: Fetching and Processing Contractor Data**

```javascript
// File: scripts/generate_data.js
import fs from 'fs/promises';
import path from 'path';
import csvParser from 'csv-parser';

const DATA_PATH = path.join(process.cwd(), 'data');
const CSV_FILE = path.join(DATA_PATH, 'contractors.csv');
const JSON_OUTPUT = path.join(DATA_PATH, 'contractors.json');

async function processCSV() {
    const results = [];
    await fs.createReadStream(CSV_FILE)
        .pipe(csvParser())
        .on('data', (row) => results.push(row))
        .on('end', async () => {
            await fs.writeFile(JSON_OUTPUT, JSON.stringify(results, null, 2));
            console.log('CSV data successfully converted to JSON.');
        });
}

processCSV().catch(console.error);
```

---

## **Conclusion**
This plan ensures a highly efficient, **programmatically generated handyman website** with optimal SEO, structured data, and fast static page generation using **Next.js**, **Netlify**, and **OpenAI-generated metadata**. The website structure ensures maximum ranking potential on Google while delivering a seamless user experience.