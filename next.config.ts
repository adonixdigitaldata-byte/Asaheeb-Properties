import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/under-construction",
        permanent: false,
      },
      {
        source: "/services",
        destination: "/under-construction",
        permanent: false,
      },
      {
        source: "/blog",
        destination: "/under-construction",
        permanent: false,
      },
      {
        source: "/blog/:path*",
        destination: "/under-construction",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/under-construction",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
