/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "public-files.gumroad.com" },
      { hostname: "assets.gumroad.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/actions.json',
        destination: '/api/action/json',
      },
    ];
  },
};

export default nextConfig;
