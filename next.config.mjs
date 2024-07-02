/** @type {import('next').NextConfig} */
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "public-files.gumroad.com" },
      { hostname: "i.ibb.co" },
      { hostname: "assets.gumroad.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/actions.json",
        destination: "/api/action/json",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/buy/:path*",
        destination:
          "https://actions.dialect.to/?action=solana-action:" +
          baseUrl +
          "/api/action/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
