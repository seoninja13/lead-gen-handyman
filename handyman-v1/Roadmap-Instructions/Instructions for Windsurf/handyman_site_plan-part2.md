# Handyman Website Development Plan

## **Objective**
Build a dynamically generated handyman website using **Next.js 14.2.23**, **ShadCN**, and **Tailwind CSS**, while ensuring high **SEO optimization** through programmatic content generation. The site will be **statically generated**, deployed using **Netlify**, and structured for **maximum efficiency**.

## **Development Approach**
### **1. Core Strategy**
- **Server-Side Rendering (SSR)**: Optimize data fetching and caching to prevent excessive API calls.
- **Programmatic Content Generation**: Generate index pages, sub-index pages, and individual pages dynamically based on CSV data.
- **Structured Data Storage**: Convert CSV data into JSON files for generating the website content.
- **SEO Optimization**: Implement automated **meta titles, descriptions, H1 tags, H2 tags**, and sitemap generation.
- **Performance Optimization**: Use **Incremental Static Regeneration (ISR)** for quick updates without full site rebuilds.

---

### **2. Data Management**
- **Data Source**: Read contractor details from a **CSV file**.
- **Data Processing**: Convert CSV into JSON for structured use in page generation.
- **Storage**: Store processed JSON files in a `data` folder within the project.
- **Build Command**: Run `npm run generate-data` to convert CSV data into JSON files before site build.

---

### **3. Page Generation**
#### **a. Index Pages (Category Listings)**
Programmatically generate pages using structured data:
- **/services/[type]/** → e.g., `/services/bathroom-remodeling/`
- **/location/[city]/** → e.g., `/location/san-diego/`
- **/contractors/[contractor-name]/** → e.g., `/contractors/italia1construction/`
- **/rebates/[state]/[city]/** → e.g., `/rebates/ca/san-diego/`
- **/guides/[topic]/** → e.g., `/guides/how-to-find-a-contractor/`

#### **b. Individual Contractor Pages**
Each contractor gets a unique dynamically generated page, including:
- Name, services, years of experience, certifications
- Location-based SEO content
- Customer reviews

#### **c. Sub-Index Pages**
- **Regional Pages**: `/location/california/`
- **Contractor Specialties**: `/services/kitchen-remodeling/`
- **Project Types**: `/guides/deck-installation/`

#### **d. Sitemap & SEO Automation**
- Split sitemaps into **5,000 URLs per file**.
- Use **dynamic slugs** for index pages.
- Implement **OpenAI-generated tags** for search optimization.

---

### **4. Deployment Strategy**
- **Static Generation**: Pre-build pages for optimal performance.
- **Deployment on Netlify**.
- **GitHub Repository**: Upload generated files without `.gitignore`.

---

### **5. Error Handling & Logging**
- **Typescript Errors**: Ensure robust error handling for null or malformed API responses.
- - **Console Logs**: Implement detailed logging to track build progress.
- **API Call Optimization**: Utilize rate limits efficiently (e.g., OpenAI's 500 calls per minute limit).

---

### **6. Example Code Snippet: Fetching and Processing Contractor Data**
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

### **7. UI Components (Example Layout using Next.js & ShadCN)**
```tsx
// File: pages/index.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Wrench, MapPin, Home } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Find Trusted Handymen in Your Area</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="mr-2" /> Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Browse professional handymen by service type.</p>
            <Link href="/services" className="text-blue-600 hover:underline">View Services</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" /> Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Find professionals near you.</p>
            <Link href="/locations" className="text-blue-600 hover:underline">Find Contractors</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="mr-2" /> Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Read expert advice on home improvement projects.</p>
            <Link href="/guides" className="text-blue-600 hover:underline">Explore Guides</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

### **8. Conclusion**
This plan ensures a highly efficient, **programmatically generated handyman website** with optimal SEO, structured data, and fast static page generation using **Next.js**, **Netlify**, and **OpenAI-generated metadata**. The website structure ensures maximum ranking potential on Google while delivering a seamless user experience.
