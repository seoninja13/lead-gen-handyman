// @ts-nocheck
import { createClient } from '@/utils/supabase/server';
import { Database } from '@/types/database';
import { Configuration, OpenAIApi } from "openai";

// Initialize Supabase client
const supabase = createClient();

// Initialize OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to generate SEO content using ChatGPT 3.5 Turbo
async function generateSeoContent(city: string, service: string): Promise<{ seo_title: string, seo_description: string, seo_h1: string, main_content: string, features_content: string, benefits_content: string, service_area_content: string, faq_content: string, testimonials: string, structured_data: string }> {
  try {
    const prompt = `Generate SEO title, description, H1, main content, features content, benefits content, service area content, FAQ content, testimonials, and structured data for a page about ${service} in ${city}. The title should be concise and engaging, the description should be informative and entice users to click, the H1 should be clear and keyword-rich, the main content should be a detailed overview of the service, the features content should highlight the key features of the service, the benefits content should explain the benefits of using the service, the service area content should describe the area where the service is offered, the FAQ content should answer frequently asked questions about the service, the testimonials should include positive reviews from satisfied customers, and the structured data should be in JSON-LD format.`;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const text = completion.data.choices[0].text;

    // Parse the generated text to extract the title, description, and H1
    const lines = text.split("\\n");
    const seo_title = lines.find(line => line.startsWith("Title:"))?.substring(7).trim() || "";
    const seo_description = lines.find(line => line.startsWith("Description:"))?.substring(13).trim() || "";
    const seo_h1 = lines.find(line => line.startsWith("H1:"))?.substring(4).trim() || "";
    const main_content = lines.find(line => line.startsWith("Main Content:"))?.substring(13).trim() || "";
    const features_content = lines.find(line => line.startsWith("Features Content:"))?.substring(17).trim() || "";
    const benefits_content = lines.find(line => line.startsWith("Benefits Content:"))?.substring(17).trim() || "";
    const service_area_content = lines.find(line => line.startsWith("Service Area Content:"))?.substring(21).trim() || "";
    const faq_content = lines.find(line => line.startsWith("FAQ Content:"))?.substring(12).trim() || "";
    const testimonials = lines.find(line => line.startsWith("Testimonials:"))?.substring(13).trim() || "";
    const structured_data = lines.find(line => line.startsWith("Structured Data:"))?.substring(16).trim() || "";

    return { seo_title, seo_description, seo_h1, main_content, features_content, benefits_content, service_area_content, faq_content, testimonials, structured_data };
  } catch (error) {
    console.error("Error generating SEO content:", error);
    return { seo_title: "", seo_description: "", seo_h1: "", main_content: "", features_content: "", benefits_content: "", service_area_content: "", faq_content: "", testimonials: "", structured_data: "" };
  }
}

// Function to update the city_service table
async function populateCityService() {
  try {
    // Fetch all city services
    const { data: cityServices, error } = await supabase
      .from('city_services')
      .select(`
        id,
        city_id,
        service_id,
        cities (name, slug),
        services (name)
      `);

    if (error) {
      throw new Error(`Error fetching city services: ${error.message}`);
    }

    if (!cityServices) {
      console.log("No city services found.");
      return;
    }

    // Loop through each city service and populate the missing SEO content
    for (const cityService of cityServices) {
      if (cityService.seo_title && cityService.seo_description && cityService.seo_h1 && cityService.main_content && cityService.features_content && cityService.benefits_content && cityService.service_area_content && cityService.faq_content && cityService.testimonials && cityService.structured_data) {
        console.log(`City service ${cityService.id} already has SEO content. Skipping...`);
        continue;
      }

      // Extract city and service names
      const city = (cityService.cities as any)?.name;
      const service = (cityService.services as any)?.name;

      if (!city || !service) {
        console.warn(`Could not extract city or service name for city service ${cityService.id}. Skipping...`);
        continue;
      }

      // Generate SEO content
      const seoContent = await generateSeoContent(city, service);

      // Update the city_service table
      const { error: updateError } = await supabase
        .from('city_services')
        .update({
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
        })
        .eq('id', cityService.id);

      if (updateError) {
        console.error(`Error updating city service ${cityService.id}: ${updateError.message}`);
      } else {
        console.log(`Successfully updated city service ${cityService.id}`);
      }

      // Add a timeout between queries to avoid getting locked out
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("Finished populating city service table.");
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}

// Execute the script
populateCityService();
