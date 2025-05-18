const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');
const MAX_WIDTH = 1200; // Maximum width for blog post images
const QUALITY = 80; // WebP quality setting

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calculate new dimensions while maintaining aspect ratio
    const width = Math.min(metadata.width, MAX_WIDTH);
    const height = Math.round((width / metadata.width) * metadata.height);

    // Optimize and convert to WebP
    await image
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    console.log(`Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(ASSETS_DIR);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(ASSETS_DIR, file);
      const outputPath = path.join(
        ASSETS_DIR,
        `${path.parse(file).name}.webp`
      );
      
      await optimizeImage(inputPath, outputPath);
    }
  }
}

optimizeAllImages().catch(console.error); 