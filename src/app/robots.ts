import type { MetadataRoute } from 'next';

import { BASE_URL } from '@constants/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Group 1: 주요 검색엔진 - SEO 허용
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Storebot-Google',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'YandexRenderResourcesBot',
          'Yeti',
        ],
        allow: ['/'],
      },
      // Group 2: AI 인용·답변 봇 - GEO 노출 허용
      {
        userAgent: [
          'Applebot',
          'facebookexternalhit',
          'Twitterbot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'Claude-User',
          'Claude-SearchBot',
          'Perplexity-User',
          'DuckAssistBot',
        ],
        allow: ['/'],
      },
      // Group 3: AI 학습 봇 - 콘텐츠 무단 학습 방지
      {
        userAgent: [
          'GPTBot',
          'ClaudeBot',
          'Google-Extended',
          'CCBot',
          'PerplexityBot',
          'Bytespider',
          'Diffbot',
          'Amazonbot',
          'YouBot',
          'PetalBot',
          'FriendlyCrawler',
          'img2dataset',
          'VelenPublicWebCrawler',
          'cohere-ai',
          'Ai2Bot',
          'Ai2Bot-Dolma',
          'meta-externalagent',
          'meta-externalfetcher',
          'meta-extern-agent',
          'Google-CloudVertexBot',
          'Gemini-Deep-Research',
          'MistralAI-User',
          'Timpibot',
          'Thinkbot',
          'Brightbot',
          'PanguBot',
          'iaskspider',
          'omgili',
          'Sidetrade indexer bot',
          'ISSCyberRiskCrawler',
          'wpbot',
          'aiHitBot',
          'SemrushBot-SWA',
          'Devin',
          'Scrapy',
          'EtaoSpider',
        ],
        disallow: ['/'],
      },
      // Group 4: 기본 - 명시되지 않은 봇 허용
      {
        userAgent: '*',
        allow: ['/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
