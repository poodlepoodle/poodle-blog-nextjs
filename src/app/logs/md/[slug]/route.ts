import { notFound } from 'next/navigation';
import { getLogPost } from '@utils/get-post';

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(_req: Request, { params }: RouteParams) {
  const { slug } = await params;
  const post = await getLogPost(slug);

  if (!post) return notFound();

  const frontmatter = [
    '---',
    `title: '${post.title}'`,
    `publishedAt: '${post.publishedAt}'`,
    post.updatedAt ? `updatedAt: '${post.updatedAt}'` : null,
    `description: '${post.description}'`,
    '---',
  ]
    .filter(Boolean)
    .join('\n');

  const content = `${frontmatter}\n\n${post.content}`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
