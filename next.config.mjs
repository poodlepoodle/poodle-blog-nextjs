import createMDX from '@next/mdx';
// import fs from 'fs';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
  }, 
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
};

export default withMDX(nextConfig);
