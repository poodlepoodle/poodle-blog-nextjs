import type { Metadata } from 'next';
import type { MetadataOpenGraph } from '@/types';

import Article from '@components/article';
import { notFound } from 'next/navigation';
import { getPlaygroundPost } from '@utils/get-post';
import { getPlaygroundPosts } from '@utils/get-posts';
import { convertToISODate } from '@utils/format-date';
import { MDXContent } from '@components/mdx/mdx-content';
import { Suspense } from 'react';
// import { generatePostJsonLd } from '@utils/generate-metadata';
import {
  METADATA_PRESET,
  METADATA_OG_ARTICLE_PRESET,
} from '@constants/metadata';

export const generateStaticParams = async () => {
  const posts = await getPlaygroundPosts();
  return posts.map(post => ({ slug: post.slug }));
};

// correct
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPlaygroundPost(slug);
  if (!post) return notFound();

  return {
    ...METADATA_PRESET,
    alternates: {
      canonical: `/playground/${slug}`,
    },
    title: `${post.title} ••• 푸들 블로그`,

    openGraph: {
      ...METADATA_OG_ARTICLE_PRESET,
      url: `/playground/${slug}`,
      publishedTime: convertToISODate(post.publishedAt),
      modifiedTime: convertToISODate(post.publishedAt),
      images: [
        {
          url: `/playground/${slug}/thumbnail-large.jpg`,
          alt: 'poodle playground post thumbnail og image',
        },
      ],
    } as MetadataOpenGraph,
  } as Metadata;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPlaygroundPost(slug);
  if (!post) return notFound();

  // const jsonLd = generatePostJsonLd({ post });
  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      /> */}
      {/* <Article slug={slug} post={post}>
        <Suspense>
          <MDXContent source={post.content} />
        </Suspense>
      </Article> */}
    </>
  );
}
