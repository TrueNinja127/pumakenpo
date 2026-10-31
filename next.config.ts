import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep links from the old WordPress site working.
  async redirects() {
    return [
      { source: "/register-user", destination: "/contact", permanent: true },
      { source: "/schedule2", destination: "/schedule", permanent: true },
      { source: "/basics", destination: "/news", permanent: true },
      { source: "/database-2", destination: "/news", permanent: true },
      { source: "/curriculum", destination: "/bios", permanent: true },
      { source: "/instructors", destination: "/bios", permanent: true },
      { source: "/training", destination: "/#classes", permanent: false },
    ];
  },
};

export default nextConfig;
