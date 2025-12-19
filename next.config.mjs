/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com'
    }]
  },
  reactCompiler: true,
};

export default nextConfig;
