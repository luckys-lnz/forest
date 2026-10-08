import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Editorial food photography is served from Unsplash until Forest's own
    // shoot is ready. Swap paths in lib/data/* when real photography lands.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
