import type { Metadata } from 'next';

import styles from './styles.module.css';
import PostList from '@components/post-list';
import { getPosts } from '@utils/get-posts';
import { getTags } from '@utils/get-tags';
import { Suspense } from 'react';
import {
  generateCommonMetadata,
  generateBlogJsonLd,
} from '@utils/generate-metadata';

export const metadata: Metadata = generateCommonMetadata({
  title: '포스트 ••• 푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
});

export default async function Page() {
  const posts = await getPosts();
  const tags = await getTags();
  const jsonLd = generateBlogJsonLd({
    title: '포스트 ••• 푸들 블로그',
    subUrl: `/posts`,
    posts,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <section className={styles.layout}>
        <Suspense>
          <PostList posts={posts} tags={tags} />
        </Suspense>
      </section>
    </>
  );
}
