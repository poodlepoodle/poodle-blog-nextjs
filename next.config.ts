import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
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
