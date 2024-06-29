/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "public-files.gumroad.com" },
      { hostname: "assets.gumroad.com" },
    ],
  },
};

export default nextConfig;
