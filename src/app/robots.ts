import type { MetadataRoute } from 'next';

import { BASE_URL } from '@constants/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about', '/posts', '/logs', '/playgrounds'],
        crawlDelay: 5,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
