import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logoPath = path.join(__dirname, '../public/logo-icon.png')
const publicDir = path.join(__dirname, '../public')

async function generateFavicons() {
  try {
    // Generate favicon.ico equivalent sizes
    await sharp(logoPath).resize(16, 16).toFile(path.join(publicDir, 'favicon-16x16.png'))
    await sharp(logoPath).resize(32, 32).toFile(path.join(publicDir, 'favicon-32x32.png'))
    await sharp(logoPath).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'))
    await sharp(logoPath).resize(192, 192).toFile(path.join(publicDir, 'icon-192.png'))
    await sharp(logoPath).resize(512, 512).toFile(path.join(publicDir, 'icon-512.png'))

    console.log('✅ Favicon files generated successfully')
  } catch (err) {
    console.error('❌ Error generating favicons:', err)
  }
}

generateFavicons()
