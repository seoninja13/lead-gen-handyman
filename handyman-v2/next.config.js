/**
 * @type {import('next').NextConfig}
 */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Add your path aliases here
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    };
    
    // Add support for font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
  // Add support for importing from the Envato template
  transpilePackages: [],
  
  // Configure image optimization
  images: {
    unoptimized: true, // Allow unoptimized images
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig;
