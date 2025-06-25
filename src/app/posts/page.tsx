import type { Metadata } from 'next';

import styles from './styles.module.css';
// import SearchPage from '@components/search/page';
import PostList from '@components/post-list';
import { getPosts } from '@utils/get-posts';
import { getTags } from '@utils/get-tags';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blog ••• poodlepoodle',
  description:
    '새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.',
};

export default async function Page() {
  const posts = await getPosts();
  const tags = await getTags();

  return (
    <section className={styles.layout}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <PostList posts={posts} tags={tags} />
      </Suspense>
    </section>
  );
}
