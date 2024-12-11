import styles from './styles.module.css';

import { getPosts } from '@/lib/get-posts';
import { Suspense } from 'react';

import SearchPage from '@components/search/page';

export const metadata = {
  title: 'Blog ••• poodlepoodle',
  description:
    '새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.',
};

export default async function Page() {
  const posts = await getPosts();
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className={styles.layout}>
      <Suspense>
        <SearchPage posts={sortedPosts} />
      </Suspense>
    </section>
  );
}
