/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.pexels.com', 'loremflickr.com', 'picsum.photos']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
