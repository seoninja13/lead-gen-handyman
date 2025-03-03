/**
 * City Service SEO Content Generator
 * City Service SEO Content Generator
 *
 * This script generates SEO content for city services using OpenAI's GPT-3.5 Turbo model.
 * It checks for city services that don't have content and generates:
 * - SEO metadata (title, description, H1)
 * - Content sections (main, features, benefits)
 * - Service area content
 * - FAQ content (JSON format)
 * - Testimonials (JSON format)
 * - Structured data
 * - California-specific info
 *
 * Current Status (as of Feb 6, 2025):
 * - All existing city services have content populated
 * - Script is ready for use with new city services
 *
 * Required Environment Variables (.env.local):
 * - NEXT_PUBLIC_SUPABASE_URL: Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase anonymous key
 * - OPENAI_API_KEY: OpenAI API key
 *
 * To run:
 * 1. Ensure environment variables are set
 * 2. Run: npx tsc scripts/populate-city-service.ts --esModuleInterop --skipLibCheck --module CommonJS --moduleResolution node --outDir build/scripts
 * 3. Run: node build/scripts/populate-city-service.js
 *
 * @see docs/development-progress.md for current status and next steps
 * @see TODO.md for planned improvements
 */

import { resolve } from 'path';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !OPENAI_KEY) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface CityService {
  id: number;
  city_id: number;
  service_id: number;
  cities?: Array<{ name: string; slug: string }> | null;
  services?: Array<{ name: string }> | null;
  seo_title?: string;
  seo_description?: string;
  seo_h1?: string;
  main_content?: string;
  features_content?: string;
  benefits_content?: string;
  service_area_content?: string;
  faq_content?: any;
  testimonials?: any;
  structured_data?: string;
  service_city_ca?: string;
}

const populateCityService = async () => { // Exported as a function
  // Function to generate SEO content using ChatGPT 3.5 Turbo
  const openai = new OpenAI({
    apiKey: OPENAI_KEY,
  });

  async function generateSeoContent(city: string, service: string): Promise<CityService | null> {
    try {
      console.log(`Generating SEO content for ${city} - ${service}`);
      let text = "";
      const prompt = `Generate the following content for a page about ${service} in ${city}:

    - SEO title: A concise and engaging title for the page.
    - SEO description: An informative description to entice users to click.
    - SEO H1: A clear and keyword-rich main heading for the page.
    - Main content: A detailed overview of the service.
    - Features content: Key features of the service.
    - Benefits content: Benefits of using the service.
    - Service area content: A description of the area where the service is offered.
    - FAQ content: Frequently asked questions about the service (in JSON format).
    - Testimonials: Positive reviews from satisfied customers (in JSON format).
    - Structured data: JSON-LD schema data for the service.
    - Service City CA: Information about the service specific to California.

    Please provide the FAQ content and Testimonials in JSON format.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      });

      console.log("OpenAI API call successful. Raw response:", JSON.stringify(completion));
      text = completion.choices[0].message?.content || "";

      const lines: string[] = text.split("\n");
      const seo_title = lines.find(line => line.startsWith("SEO title:"))?.substring(11).trim() || "";
      const seo_description = lines.find(line => line.startsWith("SEO description:"))?.substring(17).trim() || "";
      const seo_h1 = lines.find(line => line.startsWith("SEO H1:"))?.substring(7).trim() || "";
      const main_content = lines.find(line => line.startsWith("Main content:"))?.substring(13).trim() || "";
      const features_content = lines.find(line => line.startsWith("Features content:"))?.substring(17).trim() || "";
      const benefits_content = lines.find(line => line.startsWith("Benefits content:"))?.substring(17).trim() || "";
      const service_area_content = lines.find(line => line.startsWith("Service area content:"))?.substring(21).trim() || "";
      const faq_content = JSON.parse(lines.find(line => line.startsWith("FAQ content:"))?.substring(12).trim() || "[]");
      const testimonials = JSON.parse(lines.find(line => line.startsWith("Testimonials:"))?.substring(13).trim() || "[]");
      const structured_data = lines.find(line => line.startsWith("Structured data:"))?.substring(16).trim() || "";
      const service_city_ca = lines.find(line => line.startsWith("Service City CA:"))?.substring(17).trim() || "";

      return {
        id: 0,
        city_id: 0,
        service_id: 0,
        cities: null,
        services: null,
        seo_title,
        seo_description,
        seo_h1,
        main_content,
        features_content,
        benefits_content,
        service_area_content,
        faq_content,
        testimonials,
        structured_data,
        service_city_ca
      };
    } catch (error: any) {
      console.error("Error generating SEO content:", error.message || error);
      return null;
    }
  }

  async function populateCityServiceTable() {
    console.log("Starting populateCityService");
    const limit = 50;
    try {
      const { data: cityServices, error } = await supabase
        .from('city_services')
        .select(`
          id,
          city_id,
          service_id,
          seo_title,
          cities!inner (name, slug),
          services!inner (name)
        `)
        .is('seo_title', null)
        .limit(limit);

      if (error) {
        throw new Error(`Error fetching city services: ${error.message}`);
      }

      if (!cityServices) {
        console.log("No city services found.");
        return;
      }

      for (const cityService of cityServices) {
        console.log(`Processing city service ${cityService.id}`);
        if (cityService.id === 1603 || cityService.id === 1604) {
          console.log(`Detailed log for city service ID: ${cityService.id}`);
        }

        if (cityService.cities && cityService.services) {
          // Use optional chaining and type assertion to safely access properties
          const city = cityService.cities?.[0]?.name || '';
          const service = cityService.services?.[0]?.name || '';
          if (cityService.id === 1603 || cityService.id === 1604) {
            console.log(`City: ${city}, Service: ${service}`);
          }
          console.log(`Generating SEO content for ${city} - ${service}`);
          const seoContent = await generateSeoContent(city, service);

          const updatePayload = seoContent ? {
            seo_title: seoContent.seo_title,
            seo_description: seoContent.seo_description,
            seo_h1: seoContent.seo_h1,
            main_content: seoContent.main_content,
            features_content: seoContent.features_content,
            benefits_content: seoContent.benefits_content,
            service_area_content: seoContent.service_area_content,
            faq_content: seoContent.faq_content,
            testimonials: seoContent.testimonials,
            structured_data: seoContent.structured_data,
            service_city_ca: seoContent.service_city_ca,
          } : {};

          const { error: updateError } = await supabase
            .from('city_services')
            .update(updatePayload)
            .eq('id', cityService.id);

          if (updateError) {
            console.error(`Error updating city service ${cityService.id}: ${updateError.message}`);
          } else {
            console.log(`Successfully updated city service ${cityService.id}`);
          }

          // Add a timeout between queries to avoid getting locked out
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      console.log("Finished populating city service table.");
    } catch (error) {
      console.error(`An error occurred in populateCityService: ${error}`);
    }
  }

  // Initialize Supabase client
  populateCityServiceTable();

  // TODO: Set up monitoring for OpenAI API usage
};

export { populateCityService };
