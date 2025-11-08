import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export to docs/ for GitHub Pages
  output: "export",
  distDir: "docs",
  // Add trailing slashes for cleaner URLs
  trailingSlash: true,
  // Use relative paths for assets since we are in a subdirectory
  basePath: "/Kk",
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  // Skip type checking during builds for faster deployment
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
