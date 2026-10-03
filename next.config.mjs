/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/CustomSign', destination: '/design', permanent: true },
      { source: '/CustomLogo', destination: '/logo', permanent: true },
    ];
  },
};

export default nextConfig;
