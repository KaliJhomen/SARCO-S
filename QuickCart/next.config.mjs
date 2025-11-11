/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Compresión habilitada
  compress: true,
  // React strict mode
  reactStrictMode: true,
  // Optimización de producción
  productionBrowserSourceMaps: false,
  // Optimización de chunks
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
