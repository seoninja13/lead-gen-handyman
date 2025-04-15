/**
 * Utility to save enriched data to a local JSON file
 */

const fs = require('fs');
const path = require('path');

// Path to the enriched data file
const ENRICHED_DATA_FILE = path.join(__dirname, '..', 'data', 'enriched_data.json');

/**
 * Ensure the data directory exists
 */
function ensureDataDirectoryExists() {
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Load enriched data from the file
 * @returns {Object} - The enriched data
 */
function loadEnrichedData() {
  ensureDataDirectoryExists();
  
  if (!fs.existsSync(ENRICHED_DATA_FILE)) {
    return {};
  }
  
  try {
    const data = fs.readFileSync(ENRICHED_DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading enriched data:', error.message);
    return {};
  }
}

/**
 * Save enriched data to the file
 * @param {Object} data - The enriched data
 */
function saveEnrichedData(data) {
  ensureDataDirectoryExists();
  
  try {
    fs.writeFileSync(ENRICHED_DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving enriched data:', error.message);
    throw error;
  }
}

/**
 * Save enriched data for a business
 * 
 * @param {string} businessName - The business name
 * @param {Object} enrichedData - The enriched data in the format provided
 * @returns {Promise<Object>} - The saved record
 */
async function saveEnrichedDataToBusinesses(businessName, enrichedData) {
  try {
    console.log(`Saving enriched data for ${businessName} to file...`);
    
    // Load existing data
    const data = loadEnrichedData();
    
    // Check if a record with this business name already exists
    const updated = data[businessName] !== undefined;
    
    // Add or update the record
    data[businessName] = {
      business_name: businessName,
      enriched_data: enrichedData,
      updated_at: new Date().toISOString()
    };
    
    // Save the data
    saveEnrichedData(data);
    
    console.log(`${updated ? 'Updated' : 'Inserted'} enriched data for "${businessName}" in file`);
    
    return { data: data[businessName], updated };
  } catch (error) {
    console.error('Error in saveEnrichedDataToBusinesses:', error.message);
    throw error;
  }
}

/**
 * Get enriched data for a business
 * 
 * @param {string} businessName - The business name
 * @returns {Promise<Object>} - The enriched data
 */
async function getEnrichedDataFromBusinesses(businessName) {
  try {
    console.log(`Getting enriched data for ${businessName} from file...`);
    
    // Load existing data
    const data = loadEnrichedData();
    
    // Check if a record with this business name exists
    if (!data[businessName]) {
      console.error(`No record found for ${businessName}`);
      throw new Error(`No record found for ${businessName}`);
    }
    
    return data[businessName].enriched_data;
  } catch (error) {
    console.error('Error in getEnrichedDataFromBusinesses:', error.message);
    throw error;
  }
}

module.exports = {
  saveEnrichedDataToBusinesses,
  getEnrichedDataFromBusinesses
};
