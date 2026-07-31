/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 16 builds with Turbopack by default. The two things the old webpack()
  // hook did are expressed natively below; keeping a webpack() hook would force
  // every build back onto the slower bundler.
  turbopack: {
    rules: {
      // Import .svg files as React components (see src/assets/*.svg).
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      }
    ]
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
