/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Add your path aliases here
    };
    return config;
  },
  // Add support for importing from the Envato template
  transpilePackages: [],
}

module.exports = nextConfig;
