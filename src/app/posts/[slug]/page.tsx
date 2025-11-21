import type { Metadata } from 'next';
import type { MetadataOpenGraph } from '@/types';

import { Article } from '@components/article';
import JsonLd from '@components/json-ld';
import { notFound } from 'next/navigation';
import { getBlogPost } from '@utils/get-post';
import { getBlogPosts } from '@utils/get-posts';
import { convertToISODate } from '@utils/format-date';
import { MDXContent } from '@components/mdx';
import { Suspense } from 'react';
import { blogPostStructuredData } from '@constants/json-ld';
import {
  METADATA_PRESET,
  METADATA_OG_ARTICLE_PRESET,
} from '@constants/metadata';

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return notFound();

  return {
    ...METADATA_PRESET,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    title: `${post.title} ••• 푸들 블로그`,
    description: `${post.description}`,
    keywords: post.tags,

    openGraph: {
      ...METADATA_OG_ARTICLE_PRESET,
      url: `/posts/${slug}`,
      tags: post.tags,
      publishedTime: convertToISODate(post.publishedAt),
      modifiedTime: convertToISODate(post.publishedAt),
      images: [
        {
          url: `/posts/${slug}/thumbnail-large.jpg`,
          alt: 'poodle blog post thumbnail og image',
        },
      ],
    } as MetadataOpenGraph,
  } as Metadata;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return notFound();
  const jsonLd = blogPostStructuredData(post);

  return (
    <>
      <JsonLd structuredData={jsonLd} />
      <Article slug={slug} post={post}>
        <Suspense>
          <MDXContent source={post.content} />
        </Suspense>
      </Article>
    </>
  );
}
