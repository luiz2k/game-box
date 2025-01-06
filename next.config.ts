import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shared.fastly.steamstatic.com",
        port: "",
        pathname: "/store_item_assets/steam/apps/**/**",
      },
    ],
  },
};

export default nextConfig;
