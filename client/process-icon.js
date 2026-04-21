import sharp from 'sharp';
import path from 'path';

const logoPath = './public/logo-icon-backup.png';
const outputPath = './public/logo-icon.png';

async function processIcon() {
  try {
    console.log('Processing icon...');
    await sharp(logoPath)
      .trim() // Remove white background padding automatically
      .toBuffer()
      .then(async (data) => {
        const metadata = await sharp(data).metadata();
        const size = Math.max(metadata.width, metadata.height);
        
        // Make it square with some padding
        await sharp(data)
          .extend({
            top: Math.floor((size - metadata.height) / 2) + 20,
            bottom: Math.ceil((size - metadata.height) / 2) + 20,
            left: Math.floor((size - metadata.width) / 2) + 20,
            right: Math.ceil((size - metadata.width) / 2) + 20,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .toFile(outputPath);
      });
    console.log('Icon processed and saved to:', outputPath);
  } catch (err) {
    console.error('Error processing icon:', err);
  }
}

processIcon();
