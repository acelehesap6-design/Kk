import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Attempt to enable static export output. Note: app-router features that require server
  // will not work with export. Prefer Vercel for full Next.js support.
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
