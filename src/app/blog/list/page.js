import styles from './styles.module.css';

import { getPosts } from '@/lib/get-posts';
import { Suspense } from 'react';

import SearchPage from '@components/search/page';

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
