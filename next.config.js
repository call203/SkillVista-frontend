/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: ['image/avif', 'image/webp'],

  images: {
    deviceSizes: [786, 1024],

    domains: ['images.unsplash.com', 'i.ibb.co', 'avatars.githubusercontent.com'],
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com',
    },
  ],
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/user-dashboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
