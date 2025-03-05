const fs = require('fs-extra');
const path = require('path');

const sourceDir = 'handyman-v2/Envato-template-files/WorkDirectory/findhouse/public/assets/images';
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
