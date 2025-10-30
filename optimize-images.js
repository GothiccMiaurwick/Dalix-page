const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Script universal para optimizar imágenes
 * Uso: node optimize-images.js [carpeta] [calidad]
 * 
 * Ejemplos:
 * node optimize-images.js                    (optimiza todo /public/img con calidad 80)
 * node optimize-images.js public/productos   (optimiza carpeta específica)
 * node optimize-images.js public/img 90      (optimiza con calidad 90)
 */

async function optimizeImages(dir = './public/img', quality = 80) {
  console.log(`🔍 Buscando imágenes en: ${dir}\n`);

  if (!fs.existsSync(dir)) {
    console.error(`❌ La carpeta ${dir} no existe`);
    return;
  }

  const files = fs.readdirSync(dir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );

  if (imageFiles.length === 0) {
    console.log('⚠️  No se encontraron imágenes JPG/PNG para optimizar');
    return;
  }

  console.log(`📸 Encontradas ${imageFiles.length} imágenes para optimizar\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let processedCount = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(dir, file);
    const fileNameWithoutExt = path.parse(file).name;
    const outputPath = path.join(dir, `${fileNameWithoutExt}.webp`);

    try {
      // Obtener dimensiones originales
      const metadata = await sharp(inputPath).metadata();
      const maxWidth = metadata.width > 1920 ? 1920 : metadata.width;

      await sharp(inputPath)
        .resize(maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: parseInt(quality) })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

      totalOriginal += originalSize;
      totalOptimized += optimizedSize;
      processedCount++;

      console.log(`✅ ${file} → ${fileNameWithoutExt}.webp`);
      console.log(`   📊 ${(originalSize / 1024).toFixed(0)}KB → ${(optimizedSize / 1024).toFixed(0)}KB (${savings}% más ligero)\n`);
    } catch (error) {
      console.error(`❌ Error optimizando ${file}:`, error.message, '\n');
    }
  }

  // Resumen final
  if (processedCount > 0) {
    const totalSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Optimización completada!');
    console.log(`📈 ${processedCount} imágenes procesadas`);
    console.log(`💾 ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
    console.log(`🚀 Ahorro total: ${totalSavings}%`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
}

// Obtener argumentos de línea de comando
const args = process.argv.slice(2);
const directory = args[0] || './public/img';
const quality = args[1] || 80;

optimizeImages(directory, quality);