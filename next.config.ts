import type {NextConfig} from 'next'
import {resolve} from 'node:path'

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Typescript and ESLint errors are checked in standalone steps during CI/CD pipelines, so it's not needed to check them here:
  typescript: {ignoreBuildErrors: true},
  eslint: {ignoreDuringBuilds: true},
  webpack: (config) => {
    config.resolve.alias['@smart-i18n/next/i18n-config'] = resolve('./src/i18n/config.ts')
    return config
  },
  experimental: {
    turbo: {
      resolveAlias: {'@smart-i18n/next/i18n-config': './src/i18n/config.ts'},
    },
  },
}
export default nextConfig
