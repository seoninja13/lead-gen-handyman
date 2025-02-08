// @ts-nocheck
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const { createSupabaseServerClient } = require('../../src/utils/supabase/supabase.server');

(async () => {
  // Initialize Supabase client
  const supabase = createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Initialize OpenAI client
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Function to generate SEO content using ChatGPT 3.5 Turbo
  async function generateSeoContent(city, service) {
    console.log(`Generating SEO content for ${city} - ${service} in generateSeoContent`);
    try {
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

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      });

      console.log("OpenAI completion successful");
      const text = completion.data.choices[0].message.content;

      // Parse the generated text to extract the title, description, and H1
      const lines = text.split("\\n");
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

      return { seo_title, seo_description, seo_h1, main_content, features_content, benefits_content, service_area_content, faq_content, testimonials, structured_data, service_city_ca };
    } catch (error) {
      console.error("Error generating SEO content:", error);
      return { seo_title: "", seo_description: "", seo_h1: "", main_content: "", features_content: "", benefits_content: "", service_area_content: "", faq_content: "", testimonials: "", structured_data: "", service_city_ca: "" };
    }
  }

  // Function to update the city_service table
  async function populateCityService() {
    console.log("Starting populateCityService");
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
      const city = cityService.cities?.name;
      const service = cityService.services?.name;

        if (!city || !service) {
          console.warn(`Could not extract city or service name for city service ${cityService.id}. Skipping...`);
          continue;
        }

        console.log(`Generating SEO content for ${city} - ${service}`);
        // Generate SEO content
        const seoContent = await generateSeoContent(city, service);
        console.log(`Generated SEO content for ${city} - ${service}`);

        // Update the city_service table
        console.log(`Updating city service ${cityService.id}`);
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
            service_city_ca: seoContent.service_city_ca,
          })
          .eq('id', cityService.id);

        if (updateError) {
          console.error(`Error updating city service ${cityService.id}: ${updateError.message}`);
        } else {
          console.log(`Successfully updated city service ${cityService.id}`);
        }
        console.log(`Finished updating city service ${cityService.id}`);

        // Add a timeout between queries to avoid getting locked out
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log("Finished populating city service table.");
    } catch (error) {
      console.error(`An error occurred in populateCityService: ${error}`);
    }
  }

  // Initialize Supabase client
  populateCityService();
})();
