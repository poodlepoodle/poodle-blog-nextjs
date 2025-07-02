import Article from '@components/article';
import { notFound } from 'next/navigation';
import { getPost } from '@utils/get-post';
import { getPosts } from '@utils/get-posts';
import { MDXContent } from '@components/mdx/mdx-content';
import { Suspense } from 'react';

type Params = Promise<{ slug: string }>;

export async function generateMetadata(
  { params }: { params: Params },
  parent: any
) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL('https://poodlepoodle.me'),
    title: `${post.title} ••• poodlepoodle`,
    description: `${post.description}`,
    openGraph: {
      images: [`/posts/${slug}/thumbnail-large.jpg`, ...previousImages],
    },
  };
}

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
};

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();

  return (
    <Article slug={slug} post={post}>
      <Suspense>
        <MDXContent source={post.content} />
      </Suspense>
    </Article>
  );
}
