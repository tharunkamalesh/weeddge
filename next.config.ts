import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This page injects classic scripts (Webflow, GSAP, Splide). Strict Mode's
  // dev double-mount would duplicate handlers and break carousels / timelines.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
