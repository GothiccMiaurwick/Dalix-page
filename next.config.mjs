/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // Habilita compresión gzip/brotli
  
  images: {
    formats: ['image/avif', 'image/webp'], // Formatos modernos (esto está perfecto)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Tamaños de thumbnails
    minimumCacheTTL: 60, // Cache de imágenes optimizadas
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
    ],
  },
};

export default nextConfig;