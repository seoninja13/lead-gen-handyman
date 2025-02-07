import { safeCompletion, openai } from '../lib/openai-client';
import { supabase } from '../utils/supabase/client'; // Assuming supabase client is set up

async function loadV1Data(tableName: string) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');
    if (error) {
      console.error('Error loading v1 data:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Failed to load v1 data', error);
    throw error;
  }
}

async function processWithGPT35(legacyData: any[]) {
  const processedData = [];
  for (const item of legacyData) {
    const prompt = `Generate a professional profile based on this data: ${JSON.stringify(item)}`;
    try {
      const response = await safeCompletion(prompt);
      if (response) {
        const professionalProfile = JSON.parse(response); // Assuming response is JSON
        processedData.push(professionalProfile);
      }
    } catch (error) {
      console.error('OpenAI processing failed for item:', item, error);
      // Handle error or skip item
    }
  }
  return processedData;
}

async function populateV2Professionals() {
  try {
    const legacyCities = await loadV1Data('cities_v1_legacy'); // Load cities data
    // For each city, generate professionals (example - adjust as needed)
    let allProfessionals = [];
    for (const city of legacyCities) {
      const prompt = `Generate a list of handyman professionals in ${city.name} with skills and hourly rates in JSON format.`;
      try {
        const response = await safeCompletion(prompt);
        if (response) {
          const professionals = JSON.parse(response); // Assuming response is JSON array of professionals
          allProfessionals = allProfessionals.concat(professionals);
        }
      } catch (error) {
        console.error('OpenAI processing failed for city:', city.name, error);
      }
    }


    if (allProfessionals.length > 0) {
      const { error: insertError } = await supabase
        .from('professionals')
        .insert(allProfessionals); // Insert all generated professionals

      if (insertError) {
        console.error('Error inserting data into professionals table:', insertError);
      } else {
        console.log('Successfully populated professionals table');
      }
    } else {
      console.log('No professionals data to insert.');
    }


  } catch (error) {
    console.error('Data population failed:', error);
  }
}


async function main() {
  await populateV2Professionals();
}

main().catch(error => console.error(error));
