import type { MetadataRoute } from 'next';

import { BASE_URL } from '@constants/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 악의적 봇 블랙리스트: 콘텐츠 무단 수집·저작권 침해·스팸·보안 스캐닝 목적
      {
        userAgent: [
          'EmailCollector', // 이메일 주소 수집 목적의 스팸 하베스터
          'EmailSiphon', // 이메일 주소 수집 목적의 스팸 하베스터
          'EmailWolf', // 이메일 주소 수집 목적의 스팸 하베스터
          'ExtractorPro', // 이메일·콘텐츠 추출 목적의 레거시 하베스터
          'HTTrack', // 사이트 전체 복제·오프라인 미러링 도구
          'WebCopier', // 사이트 전체 복제·오프라인 미러링 도구
          'WebZIP', // 사이트 전체 복제·오프라인 미러링 도구
          'WebStripper', // 사이트 전체 복제·오프라인 미러링 도구
          'Teleport', // 사이트 전체 복제·오프라인 미러링 도구
          'Offline Explorer', // 사이트 전체 복제·오프라인 미러링 도구
          'Scrapy', // 범용 스크래핑 프레임워크, 콘텐츠 도용에 주로 사용
          'EtaoSpider', // robots.txt 무시로 악명 높은 타오바오 계열 봇
          'Bytespider', // ByteDance 봇, robots.txt 무시 사례 다수
          'img2dataset', // LAION 등 대규모 이미지 데이터셋 구축 전용 도구
          'omgili', // 동의 없는 대규모 웹 마이닝
          'VelenPublicWebCrawler', // 출처 불분명, 대규모 무단 수집 의심
          'ISSCyberRiskCrawler', // 악의적 스캐닝과 구분 어려운 사이버 리스크 수집
          'wpbot', // WordPress 스팸 공격에 주로 활용
          'aiHitBot', // 출처 불분명, aggressive한 AI 학습 크롤러
          'Sidetrade indexer bot', // 동의 없는 B2B 영업 데이터 수집
          'iaskspider', // 과도한 크롤링으로 보고된 중국 검색 봇
        ],
        disallow: ['/'],
      },
      // 기본: 명시되지 않은 모든 봇 허용 (SEO · GEO · AEO 전면 개방)
      // 아래 봇들은 와일드카드로 통과됨:
      //   주요 검색엔진  : Googlebot, Googlebot-Image, Storebot-Google, Bingbot,
      //                    Slurp, DuckDuckBot, YandexRenderResourcesBot, Yeti
      //   AI 인용·답변   : Applebot, facebookexternalhit, Twitterbot, OAI-SearchBot,
      //                    ChatGPT-User, Claude-User, Claude-SearchBot,
      //                    Gemini-Deep-Research, Perplexity-User, DuckAssistBot
      //   AI 학습·색인   : GPTBot, ClaudeBot, Google-Extended, CCBot, PerplexityBot,
      //                    Amazonbot, Ai2Bot, Ai2Bot-Dolma, meta-externalagent,
      //                    meta-externalfetcher, meta-extern-agent, Google-CloudVertexBot,
      //                    MistralAI-User, cohere-ai, Diffbot, YouBot, PetalBot,
      //                    FriendlyCrawler, Devin, SemrushBot-SWA, Timpibot,
      //                    Thinkbot, Brightbot, PanguBot
      {
        userAgent: '*',
        allow: ['/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
