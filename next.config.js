/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_PUBLIC_API_URL
      ? [
          process.env.NEXT_PUBLIC_API_URL,
          "example.com",
          "picsum.photos",
          "m.media-amazon.com",
          "img2.yeshen.cc",
        ]
      : [
          "aifeex-api.nu3kachi.site",
          "example.com",
          "picsum.photos",
          "m.media-amazon.com",
          "img2.yeshen.cc",
        ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://aifeex-api.nu3kachi.site/api/v1/:path*',
      },
    ]
  },
};

module.exports = nextConfig;
