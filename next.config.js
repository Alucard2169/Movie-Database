/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "imgs.search.brave.com"],
  },
};

module.exports = nextConfig;
