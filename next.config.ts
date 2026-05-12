import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
        search: "?w=1000&q=80",
      },
    ],
  },
  turbopack: {
    root: "c:/Users/HillaryAmeyawOwusu/Downloads/fuit_app/my-app",
  },
};

export default nextConfig;
