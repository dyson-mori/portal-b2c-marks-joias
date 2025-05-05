import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: ''
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
};

export default nextConfig;
