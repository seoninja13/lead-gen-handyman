/**
 * Copy Assets Script
 * 
 * This script copies the necessary assets from the HandymanServices template
 * to our project's public directory.
 */

const fs = require('fs-extra');
const path = require('path');

// Define source and destination paths
const SOURCE_ASSETS = path.resolve(__dirname, '../../Envato-template-files/themeforest-findhouse-real-estate-react-nextjs-template/HandymanServices/public/assets');
const DEST_ASSETS = path.resolve(__dirname, '../../public/assets');

console.log('Source path:', SOURCE_ASSETS);
console.log('Destination path:', DEST_ASSETS);

// Check if source directory exists
if (!fs.existsSync(SOURCE_ASSETS)) {
  console.error('Source directory does not exist:', SOURCE_ASSETS);
  process.exit(1);
}

// Ensure the destination directory exists
try {
  fs.ensureDirSync(DEST_ASSETS);
  console.log('Destination directory created/verified:', DEST_ASSETS);
} catch (error) {
  console.error('Error creating destination directory:', error);
  process.exit(1);
}

// Copy fonts directory
try {
  const sourceFonts = path.join(SOURCE_ASSETS, 'fonts');
  const destFonts = path.join(DEST_ASSETS, 'fonts');
  
  if (fs.existsSync(sourceFonts)) {
    console.log('Copying fonts directory...');
    fs.copySync(sourceFonts, destFonts, { overwrite: true });
    console.log('Fonts directory copied successfully!');
  } else {
    console.error('Source fonts directory does not exist:', sourceFonts);
  }
} catch (error) {
  console.error('Error copying fonts directory:', error);
}

// Copy scss directory
try {
  const sourceScss = path.join(SOURCE_ASSETS, 'scss');
  const destScss = path.join(DEST_ASSETS, 'scss');
  
  if (fs.existsSync(sourceScss)) {
    console.log('Copying scss directory...');
    fs.copySync(sourceScss, destScss, { overwrite: true });
    console.log('SCSS directory copied successfully!');
  } else {
    console.error('Source scss directory does not exist:', sourceScss);
  }
} catch (error) {
  console.error('Error copying scss directory:', error);
}

// Copy any missing images
try {
  const sourceImages = path.join(SOURCE_ASSETS, 'images');
  const destImages = path.join(DEST_ASSETS, 'images');
  
  if (fs.existsSync(sourceImages)) {
    console.log('Copying images directory...');
    fs.copySync(sourceImages, destImages, { overwrite: false }); // Don't overwrite existing images
    console.log('Images directory copied successfully!');
  } else {
    console.error('Source images directory does not exist:', sourceImages);
  }
} catch (error) {
  console.error('Error copying images directory:', error);
}

console.log('Assets copy process completed!');
