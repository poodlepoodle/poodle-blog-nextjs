import type { Metadata } from 'next';

import styles from './styles.module.css';
import PostList from '@components/post-list';
import { getBlogPosts } from '@utils/get-posts';
import { getTags } from '@utils/get-tags';
import { Suspense } from 'react';
import {
  METADATA_PRESET,
  METADATA_OG_WEBSITE_PRESET,
} from '@constants/metadata';
// import { generateBlogJsonLd } from '@utils/generate-metadata';

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
  // const jsonLd = generateBlogJsonLd({
  //   title: '포스트 ••• 푸들 블로그',
  //   subUrl: `/posts`,
  //   posts,
  // });

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      /> */}
      <section className={styles.layout}>
        <Suspense>
          <PostList posts={posts} tags={tags} />
        </Suspense>
      </section>
    </>
  );
}
