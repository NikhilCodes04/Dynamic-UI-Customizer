import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['three'],
  compress: false, // Disable compression for static assets
};

export default nextConfig;
