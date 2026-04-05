import { notFound } from 'next/navigation';
import { getBlogPost } from '@utils/get-post';
import { getBlogPosts } from '@utils/get-posts';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
};

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(_req: Request, { params }: RouteParams) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return notFound();

  const frontmatter = [
    '---',
    `title: '${post.title}'`,
    `publishedAt: '${post.publishedAt}'`,
    post.updatedAt ? `updatedAt: '${post.updatedAt}'` : null,
    `description: '${post.description}'`,
    `tags: [${post.tags.map(t => `'${t}'`).join(', ')}]`,
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
