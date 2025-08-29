import type { Metadata } from 'next';

import styles from './styles.module.css';
import PostList from '@components/post-list';
import JsonLd from '@components/json-ld';
import { getBlogPosts } from '@utils/get-posts';
import { getTags } from '@utils/get-tags';
import { Suspense } from 'react';
import {
  METADATA_PRESET,
  METADATA_OG_WEBSITE_PRESET,
} from '@constants/metadata';
import { blogStructuredData } from '@constants/json-ld';

export const metadata: Metadata = {
  ...METADATA_PRESET,
  title: '포스트 ••• 푸들 블로그',
  alternates: {
    canonical: '/posts',
  },
  openGraph: {
    ...METADATA_OG_WEBSITE_PRESET,
    url: '/posts',
  },
};

export default async function Page() {
  const posts = await getBlogPosts();
  const tags = await getTags();
  const jsonLd = blogStructuredData(posts);

  return (
    <>
      <JsonLd structuredData={jsonLd} />
      <section className={styles.layout}>
        <Suspense>
          <PostList posts={posts} tags={tags} />
        </Suspense>
      </section>
    </>
  );
}
