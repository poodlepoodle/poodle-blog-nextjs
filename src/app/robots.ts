import type { MetadataRoute } from 'next';

import { BASE_URL } from '@constants/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about', '/posts', '/logs', '/playgrounds'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
