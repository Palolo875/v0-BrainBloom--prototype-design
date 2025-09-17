/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure dev server accepts all hosts - Next.js automatically accepts all hosts on 0.0.0.0
  devIndicators: {
    buildActivity: false,
  },
}

export default nextConfig