/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost:8081", "127.0.0.1:8081", "127.0.0.1", "localhost"],
  },
};

module.exports = nextConfig;
