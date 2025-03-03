const fs = require('fs-extra');
const path = require('path');

const sourceDir = 'handyman-v2/Envato-template-files/themeforest-findhouse-real-estate-react-nextjs-template/findhouse/public/assets/images';
const destDir = 'handyman-v2/public/assets/images';

async function copyImages() {
  try {
    await fs.copy(sourceDir, destDir, { recursive: true });
    console.log('Images copied successfully!');
  } catch (err) {
    console.error('Error copying images:', err);
  }
}

copyImages();
