/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_DEV: process.env.URL_DEV,
  },
};

module.exports = nextConfig;
