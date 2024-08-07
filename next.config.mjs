/** @type {import('next').NextConfig} */
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "*" },
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
        has: [
          {
            type: "query",
            key: "ref",
          },
        ],
        destination: "/api/action/redirect?path=:path*&ref=:ref",
        permanent: true,
      },
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
