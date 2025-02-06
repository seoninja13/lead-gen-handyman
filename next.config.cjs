/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.cjs$/,
      include: [path.resolve(__dirname, 'scripts')],
      use: 'babel-loader',
    });

    return config;
  },
  transpilePackages: ['openai']
}

const path = require('path');

export default nextConfig
