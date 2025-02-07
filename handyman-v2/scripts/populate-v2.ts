import { safeCompletion, openai } from '../src/lib/openai-client';
import { supabase } from '../src/utils/supabase/client';
import * as Papa from 'papaparse';
import fs from 'fs';
import { Businesses } from '../src/types/database';

interface PapaParseError { // Added interface for PapaParseError
  type: string;
  code: string;
  message: string;
  row: number;
}


async function loadCsvData(filePath: string): Promise<any[]> {
  const csvFile: string = fs.readFileSync(filePath, 'utf-8'); // Added type annotation here
  return new Promise<any[]>((resolve, reject) => { // Added type annotation here
    Papa.parse<any>(csvFile, {
      header: true,
      dynamicTyping: true,
      complete: (results: Papa.ParseResult<any>) => {
        resolve(results.data);
      },
      error: (error: any) => { // Changed type to any here
        reject(error);
      },
    });
  });
}

async function enrichDescriptionWithOpenAI(businessData: any): Promise<string | null> {
  const prompt: string = `Create an engaging and informative description for a handyman business profile based on the following information:\n\n${JSON.stringify(businessData)}\n\n Aim for approximately 100-150 words. Focus on highlighting their key services, unique selling points, and local appeal.`; // Added type annotation here

  try {
    const enrichedDescription = await safeCompletion(prompt);
    return enrichedDescription;
  } catch (error: any) {
    console.error('Error enriching description with OpenAI:', error);
    return null; // Return null or a default description in case of error
  }
}


async function populateBusinessesTable() {
  try {
    const csvData: any[] = await loadCsvData('handyman-v2/Feed Data/handyman-200_near-eldoardo_co-all-fields.csv'); // Added type annotation here
    
    for (const business of csvData) {
      try {
        const enriched_description: string | null = await enrichDescriptionWithOpenAI(business); // Added type annotation here
        
        const businessRecord: Businesses = { // Asserting type here
          ...business,
          enriched_description: enriched_description,
        } as Businesses;

        const { error } = await supabase
          .from('businesses')
          .insert<Businesses>([businessRecord]); // Added type Businesses for insert

        if (error) {
          console.error('Error inserting business record:', business.business_name, error);
        } else {
          console.log('Successfully inserted business record:', business.business_name);
        }
      } catch (error) {
        console.error('Error processing or inserting business:', business.business_name, error);
      }
    }

    console.log('Data population completed for businesses table.');

  } catch (error) {
    console.error('Error loading or processing CSV data:', error);
  }
}


async function main() {
  await populateBusinessesTable();
}

main().catch(error => console.error(error));
