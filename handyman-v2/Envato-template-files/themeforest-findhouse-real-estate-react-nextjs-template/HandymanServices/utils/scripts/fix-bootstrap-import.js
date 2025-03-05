/**
 * Script to fix the Bootstrap import in main.css
 * This will replace the tilde import with a direct import
 */

const fs = require('fs');
const path = require('path');

// Path to the main.css file
const MAIN_CSS_PATH = path.join(__dirname, '../public/assets/scss/main.css');

// Read the main.css file
console.log('Reading main.css file...');
let mainCssContent = fs.readFileSync(MAIN_CSS_PATH, 'utf8');

// Replace the tilde import with a comment
console.log('Replacing tilde import...');
mainCssContent = mainCssContent.replace('@import "~bootstrap/scss/bootstrap";', '/* Bootstrap is imported in _app.js */');

// Write the updated content back to the file
console.log('Writing updated content to main.css...');
fs.writeFileSync(MAIN_CSS_PATH, mainCssContent);

console.log('Bootstrap import has been fixed in main.css!');
