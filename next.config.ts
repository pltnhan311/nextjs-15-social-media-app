import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  serverComponentsExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;