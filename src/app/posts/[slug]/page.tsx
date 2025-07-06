import type { Metadata } from 'next';

import Article from '@components/article';
import { notFound } from 'next/navigation';
import { getPost } from '@utils/get-post';
import { getPosts } from '@utils/get-posts';
import { convertToISODate } from '@utils/format-date';
import { MDXContent } from '@components/mdx/mdx-content';
import { Suspense } from 'react';
import {
  generateCommonMetadata,
  generatePostJsonLd,
} from '@utils/generate-metadata';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();

  return generateCommonMetadata({
    title: `${post.title} ••• 푸들 블로그`,
    description: `${post.description}`,
    slug: slug,
    keywords: post.tags,
    images: [
      {
        url: `/posts/${slug}/thumbnail-large.jpg`,
        alt: 'post thumbnail opengraph image',
      },
    ],
    twitterImage: [
      {
        url: `/posts/${slug}/thumbnail-large.jpg`,
        alt: 'post thumbnail opengraph twitter image',
      },
    ],
    publishedDate: convertToISODate(post.publishedAt),
  });
}

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();

  const jsonLd = generatePostJsonLd({ post });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Article slug={slug} post={post}>
        <Suspense>
          <MDXContent source={post.content} />
        </Suspense>
      </Article>
    </>
  );
}
