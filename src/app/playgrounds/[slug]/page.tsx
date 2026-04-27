import type { Metadata } from 'next';
import type { MetadataOpenGraph } from '@/types';

import { Article } from '@components/article';
import JsonLd from '@components/json-ld';
import { notFound } from 'next/navigation';
import { getPlaygroundPost } from '@utils/get-post';
import { getPlaygroundPosts } from '@utils/get-posts';
import { convertToISODate, getPostLastModifiedIso } from '@utils/format-date';
import { MDXContent, MDXSkeleton } from '@components/mdx';
import { Suspense } from 'react';
import { playgroundPostStructuredData } from '@constants/json-ld';
import {
  METADATA_PRESET,
  METADATA_OG_ARTICLE_PRESET,
} from '@constants/metadata';

export const generateStaticParams = async () => {
  const posts = await getPlaygroundPosts();
  return posts.map(post => ({ slug: post.slug }));
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPlaygroundPost(slug);
  if (!post) return notFound();

  return {
    ...METADATA_PRESET,
    alternates: {
      canonical: `/playgrounds/${slug}`,
      types: {
        'text/markdown': `/playgrounds/${slug}.md`,
      },
    },
    title: `${post.title} ••• 푸들 블로그`,

    openGraph: {
      ...METADATA_OG_ARTICLE_PRESET,
      url: `/playgrounds/${slug}`,
      publishedTime: convertToISODate(post.publishedAt),
      modifiedTime: getPostLastModifiedIso(post),
      images: [
        {
          url: `/playground/${slug}/thumbnail-large.jpg`,
          alt: 'poodle playground post thumbnail og image',
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
  const post = await getPlaygroundPost(slug);
  if (!post) return notFound();
  const jsonLd = playgroundPostStructuredData(post);
  const { content, ...metadata } = post;

  return (
    <>
      <JsonLd structuredData={jsonLd} />
      <Article slug={slug} post={metadata}>
        <Suspense fallback={<MDXSkeleton />}>
          <MDXContent source={content} isPlayground />
        </Suspense>
      </Article>
    </>
  );
}
