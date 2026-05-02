import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import {
  getBlogPosts,
  getLogPosts,
  getPlaygroundPosts,
} from '@utils/get-posts';
import { BASE_URL, METADATA_PRESET } from '@constants/metadata';
import { convertToISODate } from '@utils/format-date';

export const dynamic = 'force-static';

function toRFC2822(isoDate: string): string {
  return new Date(isoDate).toUTCString();
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ]]> 시퀀스가 CDATA 섹션을 조기에 닫지 않도록 이스케이프
function cdata(str: string): string {
  return `<![CDATA[${str.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeStringify)
    .process(markdown);

  // 상대 경로 src/href를 절대 URL로 변환
  return String(file)
    .replace(/src="(\/[^"]+)"/g, `src="${BASE_URL}$1"`)
    .replace(/href="(\/[^"]+)"/g, `href="${BASE_URL}$1"`);
}

export async function GET() {
  const [blogPosts, logPosts, playgroundPosts] = await Promise.all([
    getBlogPosts(),
    getLogPosts(),
    getPlaygroundPosts(),
  ]);

  type FeedItem = {
    title: string;
    description?: string;
    url: string;
    publishedAt: string;
    tags: string[];
    content: string;
  };

  const allItems: FeedItem[] = [
    ...blogPosts.map(post => ({
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/posts/${post.slug}`,
      publishedAt: convertToISODate(post.publishedAt),
      tags: post.tags,
      content: post.content,
    })),
    ...logPosts.map(post => ({
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/logs/${post.slug}`,
      publishedAt: convertToISODate(post.publishedAt),
      tags: [] as string[],
      content: post.content,
    })),
    ...playgroundPosts.map(post => ({
      title: post.title,
      url: `${BASE_URL}/playgrounds/${post.slug}`,
      publishedAt: convertToISODate(post.publishedAt),
      tags: [] as string[],
      content: post.content,
    })),
  ].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const xmlItems = await Promise.all(
    allItems.map(async item => {
      const contentHtml = await markdownToHtml(item.content);
      const categoryTags = item.tags
        .map(tag => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');

      return [
        '    <item>',
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${item.url}</link>`,
        `      <guid isPermaLink="true">${item.url}</guid>`,
        `      <pubDate>${toRFC2822(item.publishedAt)}</pubDate>`,
        item.description
          ? `      <description>${cdata(item.description)}</description>`
          : '',
        `      <content:encoded>${cdata(contentHtml)}</content:encoded>`,
        categoryTags,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
  );

  const lastBuildDate = toRFC2822(
    allItems[0]?.publishedAt ?? new Date().toISOString()
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(String(METADATA_PRESET.title))}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(String(METADATA_PRESET.description))}</description>
    <language>ko</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${xmlItems.join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
