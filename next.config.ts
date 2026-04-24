import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    function markdownRewrite(prefix: string) {
      return {
        source: `${prefix}/:path*`,
        has: [
          {
            type: 'header' as const,
            key: 'accept',
            value: '(.*)text/markdown(.*)',
          },
        ],
        destination: `${prefix}/md/:path*`,
      };
    }
    function dotMdRewrite(prefix: string) {
      return {
        source: `${prefix}/:slug.md`,
        destination: `${prefix}/md/:slug`,
      };
    }
    return {
      beforeFiles: [
        markdownRewrite('/posts'),
        markdownRewrite('/logs'),
        markdownRewrite('/playgrounds'),
        dotMdRewrite('/posts'),
        dotMdRewrite('/logs'),
        dotMdRewrite('/playgrounds'),
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/posts',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/posts/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
