import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    // Silence the "inferred workspace root" warning when pnpm-workspace.yaml
    // exists alongside other lockfiles higher in the directory tree.
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  async headers() {
    return [
      {
        // Homepage reads dynamic content from Blob; never let browsers/CDNs
        // cache the HTML. Static assets keep their default long cache headers.
        source: '/',
        headers: [{ key: 'Cache-Control', value: 'no-store, must-revalidate' }],
      },
      {
        // Belt-and-suspenders for the AIPA-preview subdomain noindex
        // requirement (docs/dns-strategy.md). The conditional flips off
        // automatically when the buyer migrates to a custom domain.
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: '(?<sub>.*)\\.aiprocessautomation\\.co',
          },
        ],
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },
}

export default nextConfig
