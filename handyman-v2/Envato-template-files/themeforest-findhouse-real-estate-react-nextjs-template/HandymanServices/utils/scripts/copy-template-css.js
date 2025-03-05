/**
 * Script to copy CSS files and fonts from the original Envato template
 * This will ensure that all necessary styles and assets are available in the project
 */

const fs = require('fs-extra');
const path = require('path');

// Source and destination paths for CSS
const SOURCE_CSS_DIR = path.join(__dirname, '../Envato-template-files/Original template files-do-not-edit/findhouse/public/assets/scss');
const DEST_CSS_DIR = path.join(__dirname, '../public/assets/scss');

// Source and destination paths for fonts
const SOURCE_FONTS_DIR = path.join(__dirname, '../Envato-template-files/Original template files-do-not-edit/findhouse/public/assets/fonts');
const DEST_FONTS_DIR = path.join(__dirname, '../public/assets/fonts');

// Create destination directories if they don't exist
fs.ensureDirSync(DEST_CSS_DIR);
fs.ensureDirSync(DEST_FONTS_DIR);

// Copy all CSS files from the source to destination
console.log('Copying CSS files from original template...');
fs.copySync(SOURCE_CSS_DIR, DEST_CSS_DIR, {
  filter: (src) => {
    // Skip directories named 'components' to avoid copying unnecessary files
    return !src.includes('components') || fs.statSync(src).isFile();
  }
});
console.log('CSS files copied successfully!');

// Copy all font files from the source to destination
console.log('Copying font files from original template...');
fs.copySync(SOURCE_FONTS_DIR, DEST_FONTS_DIR);
console.log('Font files copied successfully!');

// Create an index.scss file that imports all the necessary CSS files
const indexScssContent = `
// Import all necessary CSS files
@import 'main.css';
@import 'responsive.css';
@import 'menu.css';
@import 'megadropdown.css';
@import 'ace-responsive-menu.css';
@import 'dashbord_navitaion.css';
@import 'flaticon.css';
@import 'font-awesome.min.css';
@import 'font-awesome-animation.min.css';

// Custom overrides
body {
  font-family: 'Nunito', sans-serif;
}
`;

fs.writeFileSync(path.join(DEST_CSS_DIR, 'index.scss'), indexScssContent);
console.log('Created index.scss file');

console.log('All CSS and font files have been copied and set up successfully!');
