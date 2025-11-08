/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static HTML export for GitHub Pages
  output: "export",
  distDir: "out",
  // Add trailing slashes for cleaner URLs
  trailingSlash: true,
  // Use relative paths for assets since we are in a subdirectory
  basePath: "/Kk",
  assetPrefix: "/Kk",
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  // Skip type checking during builds for faster deployment
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  swcMinify: true,
  // experimental: {
  //   appDir: true  // This is now stable in Next.js 14
  // }
};

module.exports = nextConfig;
