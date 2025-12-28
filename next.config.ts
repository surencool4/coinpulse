import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
      domains: ['coin-images.coingecko.com'],
      remotePatterns:[
          {
              protocol: "https",
              hostname: "assets.coingecko.com",
          },
          {
              protocol: "https",
              hostname: "coin-images.coingecko.com",
          }
      ]
  }

};

export default nextConfig;
