import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@palawan-site-engine/schemas",
    "@palawan-site-engine/sections",
    "@palawan-site-engine/themes",
    "@palawan-site-engine/templates",
    "@palawan-site-engine/engine"
  ]
};

export default nextConfig;
