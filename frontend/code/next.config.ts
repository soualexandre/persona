import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          transpilePackages: ['fabric'],
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
