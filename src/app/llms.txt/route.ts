import {
  getBlogPosts,
  getLogPosts,
  getPlaygroundPosts,
} from '@utils/get-posts';
import { BASE_URL, METADATA_PRESET } from '@constants/metadata';

export const dynamic = 'force-static';

export async function GET() {
  const [blogPosts, logPosts, playgroundPosts] = await Promise.all([
    getBlogPosts(),
    getLogPosts(),
    getPlaygroundPosts(),
  ]);

  const formatDate = (dateStr: string) => dateStr.replace(/\s/g, '');

  const blogSection = blogPosts
    .map(post => {
      const url = `${BASE_URL}/posts/${post.slug}.md`;
      const date = formatDate(post.publishedAt);
      const tags = post.tags.length > 0 ? ` [${post.tags.join(', ')}]` : '';
      return post.description
        ? `- [${post.title}](${url}) (${date}): ${post.description}${tags}`
        : `- [${post.title}](${url}) (${date})${tags}`;
    })
    .join('\n');

  const logSection = logPosts
    .map(post => {
      const url = `${BASE_URL}/logs/${post.slug}.md`;
      const date = formatDate(post.publishedAt);
      return post.description
        ? `- [${post.title}](${url}) (${date}): ${post.description}`
        : `- [${post.title}](${url}) (${date})`;
    })
    .join('\n');

  const playgroundSection = playgroundPosts
    .map(post => {
      const date = formatDate(post.publishedAt);
      return `- [${post.title}](${BASE_URL}/playgrounds/${post.slug}.md) (${date})`;
    })
    .join('\n');

  const content = `# ${METADATA_PRESET.title}

> ${METADATA_PRESET.description}

프론트엔드 개발, UI/UX, React, Next.js, TypeScript, Tailwind CSS 등의 주제를 다룹니다.
저자: 최어진 | GitHub: https://github.com/poodlepoodle

## 소개

- [소개](${BASE_URL}/about): 프론트엔드 개발자 최어진에 대한 소개, 포트폴리오, 연락처

## 블로그 포스트 (Frontend Development Articles)

> 프론트엔드 개발, UI/UX, React 생태계에 관한 심층 기술 글

${blogSection}

## 로그 (Short Technical Notes)

> 짧은 기술 메모, 팁 및 발견

${logSection}

## 플레이그라운드 (Interactive UI Demos)

> 인터랙티브 UI 컴포넌트 데모 및 CSS/애니메이션 실험

${playgroundSection}

## Optional

- [전체 블로그 포스트 목록](${BASE_URL}/posts): 블로그 포스트 전체 목록
- [전체 로그 목록](${BASE_URL}/logs): 로그 전체 목록
- [전체 플레이그라운드 목록](${BASE_URL}/playgrounds): 플레이그라운드 전체 목록
- [사이트맵](${BASE_URL}/sitemap.xml): XML 사이트맵
- [RSS 피드](${BASE_URL}/rss.xml): RSS 2.0 피드
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
