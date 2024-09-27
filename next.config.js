/** @type {import('next').NextConfig} */
const nextConfig = {
  // Typescript and ESLint errors are checked in standalone steps during CI/CD pipelines, so it's not needed to check them here:
  typescript: {ignoreBuildErrors: true},
  eslint: {ignoreDuringBuilds: true},
}
export default nextConfig
