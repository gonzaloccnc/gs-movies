/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'randomuser.me'],
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**'
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**'
      }
    ]
  }
}

module.exports = nextConfig
